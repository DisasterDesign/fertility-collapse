'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from './useScrollProgress';
import { getPhaseState } from './phases';

// ─── Simplex 3D Noise (compact) ─────────────────────────────────
const F3 = 1 / 3, G3 = 1 / 6;
const grad3 = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
];
const perm = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();

function noise3D(x: number, y: number, z: number): number {
  const s = (x + y + z) * F3;
  const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
  const t = (i + j + k) * G3;
  const X0 = x - (i - t), Y0 = y - (j - t), Z0 = z - (k - t);
  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
  if (X0 >= Y0) {
    if (Y0 >= Z0) { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0; }
    else if (X0 >= Z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1; }
    else { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1; }
  } else {
    if (Y0 < Z0) { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1; }
    else if (X0 < Z0) { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1; }
    else { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0; }
  }
  const x1=X0-i1+G3,y1=Y0-j1+G3,z1=Z0-k1+G3;
  const x2=X0-i2+2*G3,y2=Y0-j2+2*G3,z2=Z0-k2+2*G3;
  const x3=X0-1+3*G3,y3=Y0-1+3*G3,z3=Z0-1+3*G3;
  const ii=i&255,jj=j&255,kk=k&255;
  let n = 0;
  const calc = (tx: number, ty: number, tz: number, gi: number) => {
    const tt = 0.6-tx*tx-ty*ty-tz*tz;
    if (tt < 0) return 0;
    const g = grad3[gi % 12];
    return tt*tt*tt*tt*(g[0]*tx+g[1]*ty+g[2]*tz);
  };
  n += calc(X0,Y0,Z0,perm[ii+perm[jj+perm[kk]]]);
  n += calc(x1,y1,z1,perm[ii+i1+perm[jj+j1+perm[kk+k1]]]);
  n += calc(x2,y2,z2,perm[ii+i2+perm[jj+j2+perm[kk+k2]]]);
  n += calc(x3,y3,z3,perm[ii+1+perm[jj+1+perm[kk+1]]]);
  return 32 * n;
}

// ─── Fibonacci Sphere ─────────────────────────────────────────
function fibSphere(count: number, radius: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * i / phi;
    const cosP = 1 - 2 * (i + 0.5) / count;
    const sinP = Math.sqrt(1 - cosP * cosP);
    pos[i * 3]     = radius * Math.cos(theta) * sinP;
    pos[i * 3 + 1] = radius * Math.sin(theta) * sinP;
    pos[i * 3 + 2] = radius * cosP;
  }
  return pos;
}

// ─── Shaders ──────────────────────────────────────────────────
const vertexShader = `
attribute float aAlpha;
attribute float aIsCore;
varying float vAlpha;
varying float vIsCore;

void main() {
  vAlpha = aAlpha;
  vIsCore = aIsCore;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (aIsCore > 0.5 ? 4.5 : 2.5) * (250.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = `
uniform float uColorMix;
varying float vAlpha;
varying float vIsCore;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  vec3 amber = vec3(0.831, 0.533, 0.059);
  vec3 cold = vec3(0.290, 0.565, 0.851);
  vec3 col = vIsCore > 0.5 ? amber : mix(amber, cold, uColorMix);
  gl_FragColor = vec4(col, vAlpha * glow);
}
`;

// ─── Constants ────────────────────────────────────────────────
const BASE_RADIUS = 2.5;
const GRID_FLOOR = -5.0;
const CORE_COUNT = 80;

// ─── Component ────────────────────────────────────────────────
export default function ParticleSystem() {
  const scrollRef = useScrollProgress();
  const { camera } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const count = useMemo(() => {
    if (typeof window === 'undefined') return 2500;
    return window.innerWidth < 768 ? 1200 : 2500;
  }, []);

  // Particle data (computed once)
  const { basePositions, isCore, phaseOffsets, velocities, fallen } = useMemo(() => {
    const base = fibSphere(count, BASE_RADIUS);
    const core = new Float32Array(count);
    const offsets = new Float32Array(count);
    const vel = new Float32Array(count * 3);
    const fell = new Uint8Array(count);

    // Mark core particles — those closest to center
    const distances: { i: number; d: number }[] = [];
    for (let i = 0; i < count; i++) {
      const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
      distances.push({ i, d: Math.sqrt(x * x + y * y + z * z) });
      offsets[i] = Math.random() * 0.05;
    }
    distances.sort((a, b) => a.d - b.d);
    for (let j = 0; j < Math.min(CORE_COUNT, count); j++) {
      core[distances[j].i] = 1.0;
    }

    return { basePositions: base, isCore: core, phaseOffsets: offsets, velocities: vel, fallen: fell };
  }, [count]);

  // Geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(basePositions.length);
    positions.set(basePositions);

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count).fill(1.0), 1));
    geo.setAttribute('aIsCore', new THREE.BufferAttribute(isCore, 1));

    return geo;
  }, [basePositions, isCore, count]);

  // Material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColorMix: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Reset velocities when scrolling back
  const prevScroll = useRef(0);

  // Smooth scroll for camera
  const smoothScroll = useRef(0);

  useFrame(() => {
    if (!pointsRef.current || !materialRef.current) return;

    const scroll = scrollRef.current;
    const phase = getPhaseState(scroll);

    // Smooth scroll for camera movement
    smoothScroll.current += (scroll - smoothScroll.current) * 0.05;

    // Update camera Z
    (camera as THREE.PerspectiveCamera).position.z += (phase.cameraZ - camera.position.z) * 0.02;

    // Update color mix uniform
    materialRef.current.uniforms.uColorMix.value += (phase.colorMix - materialRef.current.uniforms.uColorMix.value) * 0.03;

    // Rotate points group
    pointsRef.current.rotation.y += phase.rotationSpeed;

    // If scrolling back up, reset fallen particles
    if (scroll < prevScroll.current - 0.01) {
      for (let i = 0; i < count; i++) {
        if (fallen[i]) {
          fallen[i] = 0;
          velocities[i * 3] = 0;
          velocities[i * 3 + 1] = 0;
          velocities[i * 3 + 2] = 0;
        }
      }
    }
    prevScroll.current = scroll;

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const alphaAttr = geometry.getAttribute('aAlpha') as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    const alphas = alphaAttr.array as Float32Array;

    const time = performance.now() * 0.001;
    const radiusScale = phase.sphereRadius / BASE_RADIUS;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const staggered = scroll - phaseOffsets[i];
      const isCoreP = isCore[i] > 0.5;

      const bx = basePositions[i3] * radiusScale;
      const by = basePositions[i3 + 1] * radiusScale;
      const bz = basePositions[i3 + 2] * radiusScale;

      if (isCoreP) {
        // Core particles: tight orbit around center
        const coreRadius = Math.max(0.3, phase.sphereRadius * 0.25);
        const angle = time * 0.3 + (i * 2.399);
        const elevation = Math.sin(time * 0.5 + i * 0.8) * coreRadius * 0.4;
        const dist = coreRadius * (0.6 + 0.4 * Math.sin(i * 1.7 + time * 0.2));

        const tx = Math.cos(angle) * dist;
        const ty = elevation;
        const tz = Math.sin(angle) * dist;

        positions[i3]     += (tx - positions[i3]) * 0.02;
        positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.02;

        // Pulsing alpha
        const pulse = 0.85 + 0.15 * Math.sin(time * 2.0 + i * 0.5);
        alphas[i] += (phase.coreAlpha * pulse - alphas[i]) * 0.03;
      } else if (fallen[i]) {
        // Fallen: stay on floor, fade out
        alphas[i] += (0.0 - alphas[i]) * 0.02;
      } else if (staggered > 0.45 && phase.gravityStrength > 0) {
        // Falling phase
        velocities[i3 + 1] -= phase.gravityStrength;
        // Small horizontal drift
        velocities[i3]     += (Math.random() - 0.5) * 0.00005;
        velocities[i3 + 2] += (Math.random() - 0.5) * 0.00005;

        positions[i3]     += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        alphas[i] += (phase.nonCoreAlpha - alphas[i]) * 0.01;

        if (positions[i3 + 1] < GRID_FLOOR) {
          positions[i3 + 1] = GRID_FLOOR;
          velocities[i3 + 1] = 0;
          fallen[i] = 1;
        }
      } else if (staggered > 0.22) {
        // Fragmentation: scatter with noise
        const noiseScale = 0.3;
        const nx = noise3D(bx * noiseScale + time * 0.1, by * noiseScale, bz * noiseScale);
        const ny = noise3D(bx * noiseScale, by * noiseScale + time * 0.1, bz * noiseScale + 100);
        const nz = noise3D(bx * noiseScale + 200, by * noiseScale, bz * noiseScale + time * 0.1);

        const scatter = phase.scatterStrength;
        const tx = bx + nx * phase.noiseAmplitude * scatter;
        const ty = by + ny * phase.noiseAmplitude * scatter;
        const tz = bz + nz * phase.noiseAmplitude * scatter;

        positions[i3]     += (tx - positions[i3]) * 0.015;
        positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.015;
        positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.015;

        alphas[i] += (phase.nonCoreAlpha - alphas[i]) * 0.02;
      } else {
        // Sphere phase: hold formation with gentle noise
        const noiseVal = noise3D(
          bx * 0.5 + time * 0.05,
          by * 0.5 + time * 0.05,
          bz * 0.5
        );
        const tx = bx + noiseVal * phase.noiseAmplitude * 0.3;
        const ty = by + noiseVal * phase.noiseAmplitude * 0.3;
        const tz = bz + noiseVal * phase.noiseAmplitude * 0.3;

        positions[i3]     += (tx - positions[i3]) * 0.02;
        positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.02;

        alphas[i] += (phase.nonCoreAlpha - alphas[i]) * 0.03;
      }
    }

    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive ref={materialRef} object={material} attach="material" />
    </points>
  );
}
