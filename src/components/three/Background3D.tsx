'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleSystem from './ParticleSystem';

export default function Background3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return;

    // Skip if prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.5, 8], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    >
      <ParticleSystem />
    </Canvas>
  );
}
