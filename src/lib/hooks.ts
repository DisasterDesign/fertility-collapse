'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);
    setWidth(ref.current.clientWidth);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

export function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  decimals: number = 2,
) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const start = useCallback(() => setHasStarted(true), []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { value: Number(value.toFixed(decimals)), ref, start };
}

export function getTfrColor(tfr: number): string {
  if (tfr < 1.0) return '#8B0000';
  if (tfr < 1.5) return '#C0392B';
  if (tfr < 2.0) return '#E67E22';
  if (tfr < 2.1) return '#F1C40F';
  if (tfr < 3.0) return '#82E0AA';
  if (tfr < 5.0) return '#27AE60';
  return '#1B7A3D';
}

export function getTfrLabel(tfr: number): string {
  if (tfr < 1.0) return 'Critical';
  if (tfr < 1.5) return 'Severe';
  if (tfr < 2.0) return 'Below replacement';
  if (tfr < 2.1) return 'Near replacement';
  if (tfr < 3.0) return 'Above replacement';
  if (tfr < 5.0) return 'High';
  return 'Very high';
}
