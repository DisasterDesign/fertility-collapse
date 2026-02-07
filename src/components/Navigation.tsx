'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'universe25', label: 'Universe 25' },
  { id: 'world-map', label: 'World Map' },
  { id: 'classifier', label: 'Classifier' },
  { id: 'features', label: 'Features' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'dead-ends', label: 'Dead Ends' },
  { id: 'israel', label: 'Israel' },
  { id: 'druze', label: 'Druze' },
  { id: 'united-states', label: 'USA' },
  { id: 'shrinking', label: 'Shrinking' },
  { id: 'predictions', label: 'Predictions' },
  { id: 'closing', label: 'Closing' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  const activeIndex = useMemo(
    () => sections.findIndex(s => s.id === activeSection),
    [activeSection]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.15, rootMargin: '-20% 0px -35% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end">
      {/* Title */}
      <a href="#hero" className="flex items-center gap-2 mb-5 group">
        <span className="text-lg">🌍</span>
        <span className="text-xs font-mono text-accent tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">
          Fertility<br />Collapse
        </span>
      </a>

      {/* Sections with progress line */}
      <div className="relative flex flex-col gap-1">
        {/* Progress track (background) */}
        <div className="absolute right-[5px] top-[6px] bottom-[6px] w-px bg-muted/15" />
        {/* Progress fill (active portion) */}
        <motion.div
          className="absolute right-[5px] top-[6px] w-px bg-accent/60"
          animate={{ height: `${(activeIndex / Math.max(sections.length - 1, 1)) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          style={{ maxHeight: 'calc(100% - 12px)' }}
        />

        {sections.map(({ id, label }, i) => {
          const isActive = activeSection === id;
          const isPast = i <= activeIndex;

          return (
            <a
              key={id}
              href={`#${id}`}
              className="group flex items-center gap-3 justify-end py-[6px] relative"
            >
              {/* Label — always visible */}
              <span
                className={`text-[11px] whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'text-accent font-medium'
                    : isPast
                      ? 'text-muted/70'
                      : 'text-muted/35 group-hover:text-muted/70'
                }`}
              >
                {label}
              </span>

              {/* Dot */}
              <motion.div
                className={`relative z-10 rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'bg-accent ring-[3px] ring-accent/25'
                    : isPast
                      ? 'bg-muted/60'
                      : 'bg-muted/25 group-hover:bg-muted/50'
                }`}
                animate={{
                  width: isActive ? 11 : 7,
                  height: isActive ? 11 : 7,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
