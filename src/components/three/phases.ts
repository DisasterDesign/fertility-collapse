export interface PhaseState {
  sphereRadius: number;
  noiseAmplitude: number;
  colorMix: number;       // 0 = amber, 1 = cold blue
  rotationSpeed: number;
  cameraZ: number;
  coreAlpha: number;
  nonCoreAlpha: number;
  gravityStrength: number;
  scatterStrength: number;
}

const phases: { t: number; state: PhaseState }[] = [
  {
    t: 0.0,
    state: {
      sphereRadius: 2.5,
      noiseAmplitude: 0.0,
      colorMix: 0.0,
      rotationSpeed: 0.002,
      cameraZ: 8,
      coreAlpha: 1.0,
      nonCoreAlpha: 1.0,
      gravityStrength: 0,
      scatterStrength: 0,
    },
  },
  {
    t: 0.10,
    state: {
      sphereRadius: 6.0,
      noiseAmplitude: 0.3,
      colorMix: 0.15,
      rotationSpeed: 0.0015,
      cameraZ: 9,
      coreAlpha: 1.0,
      nonCoreAlpha: 0.9,
      gravityStrength: 0,
      scatterStrength: 0,
    },
  },
  {
    t: 0.22,
    state: {
      sphereRadius: 5.5,
      noiseAmplitude: 1.2,
      colorMix: 0.35,
      rotationSpeed: 0.001,
      cameraZ: 11,
      coreAlpha: 1.0,
      nonCoreAlpha: 0.6,
      gravityStrength: 0,
      scatterStrength: 1.5,
    },
  },
  {
    t: 0.45,
    state: {
      sphereRadius: 5.0,
      noiseAmplitude: 1.5,
      colorMix: 0.6,
      rotationSpeed: 0.0005,
      cameraZ: 10,
      coreAlpha: 1.0,
      nonCoreAlpha: 0.3,
      gravityStrength: 0.0003,
      scatterStrength: 2.0,
    },
  },
  {
    t: 0.60,
    state: {
      sphereRadius: 4.0,
      noiseAmplitude: 0.5,
      colorMix: 0.8,
      rotationSpeed: 0.0003,
      cameraZ: 7,
      coreAlpha: 0.95,
      nonCoreAlpha: 0.08,
      gravityStrength: 0.0005,
      scatterStrength: 2.5,
    },
  },
  {
    t: 0.75,
    state: {
      sphereRadius: 3.0,
      noiseAmplitude: 0.2,
      colorMix: 0.85,
      rotationSpeed: 0.0004,
      cameraZ: 6,
      coreAlpha: 0.9,
      nonCoreAlpha: 0.03,
      gravityStrength: 0.0006,
      scatterStrength: 3.0,
    },
  },
  {
    t: 0.88,
    state: {
      sphereRadius: 1.8,
      noiseAmplitude: 0.1,
      colorMix: 0.9,
      rotationSpeed: 0.0006,
      cameraZ: 5,
      coreAlpha: 0.92,
      nonCoreAlpha: 0.0,
      gravityStrength: 0.0008,
      scatterStrength: 3.5,
    },
  },
  {
    t: 1.0,
    state: {
      sphereRadius: 1.2,
      noiseAmplitude: 0.05,
      colorMix: 0.9,
      rotationSpeed: 0.0008,
      cameraZ: 4.5,
      coreAlpha: 0.9,
      nonCoreAlpha: 0.0,
      gravityStrength: 0.001,
      scatterStrength: 4.0,
    },
  },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpState(a: PhaseState, b: PhaseState, t: number): PhaseState {
  return {
    sphereRadius: lerp(a.sphereRadius, b.sphereRadius, t),
    noiseAmplitude: lerp(a.noiseAmplitude, b.noiseAmplitude, t),
    colorMix: lerp(a.colorMix, b.colorMix, t),
    rotationSpeed: lerp(a.rotationSpeed, b.rotationSpeed, t),
    cameraZ: lerp(a.cameraZ, b.cameraZ, t),
    coreAlpha: lerp(a.coreAlpha, b.coreAlpha, t),
    nonCoreAlpha: lerp(a.nonCoreAlpha, b.nonCoreAlpha, t),
    gravityStrength: lerp(a.gravityStrength, b.gravityStrength, t),
    scatterStrength: lerp(a.scatterStrength, b.scatterStrength, t),
  };
}

export function getPhaseState(scroll: number): PhaseState {
  const s = Math.max(0, Math.min(1, scroll));

  for (let i = 0; i < phases.length - 1; i++) {
    if (s <= phases[i + 1].t) {
      const range = phases[i + 1].t - phases[i].t;
      const t = range > 0 ? (s - phases[i].t) / range : 0;
      return lerpState(phases[i].state, phases[i + 1].state, t);
    }
  }

  return phases[phases.length - 1].state;
}
