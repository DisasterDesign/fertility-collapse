'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts';
import { globalTfrTimeline } from '@/data/globalTfr';

const stats = [
  { value: '62', label: 'Countries Analyzed', color: 'text-blue-accent' },
  { value: '79%', label: 'Classification Accuracy', color: 'text-accent' },
  { value: '85%', label: 'Modernized Countries Collapsed', color: 'text-danger' },
  { value: '1', label: 'Unexplained Anomaly: Israel', color: 'text-safe' },
];

// Default to the latest data point
const DEFAULT_INDEX = globalTfrTimeline.length - 1;

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const activePoint = globalTfrTimeline[activeIndex];

  // Calculate position from mouse/touch X relative to chart area
  const getIndexFromX = useCallback((clientX: number) => {
    if (!chartRef.current) return DEFAULT_INDEX;
    const rect = chartRef.current.getBoundingClientRect();
    // Recharts left margin + YAxis width ~40px, right margin ~10px
    const chartLeft = rect.left + 40;
    const chartRight = rect.right - 10;
    const chartWidth = chartRight - chartLeft;
    const relX = Math.max(0, Math.min(1, (clientX - chartLeft) / chartWidth));
    const idx = Math.round(relX * (globalTfrTimeline.length - 1));
    return Math.max(0, Math.min(globalTfrTimeline.length - 1, idx));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!hasInteracted) setHasInteracted(true);
    setActiveIndex(getIndexFromX(e.clientX));
  }, [getIndexFromX, hasInteracted]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!hasInteracted) setHasInteracted(true);
    setIsDragging(true);
    const touch = e.touches[0];
    setActiveIndex(getIndexFromX(touch.clientX));
  }, [getIndexFromX, hasInteracted]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Prevent scroll while dragging on touch
  useEffect(() => {
    if (!isDragging) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', prevent, { passive: false });
    return () => document.removeEventListener('touchmove', prevent);
  }, [isDragging]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/50 to-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <motion.div style={{ opacity, y }} className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Fertility Collapse as
            <br />
            <span className="text-accent">Phase Transition</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
            A Binary Classification Model Across 62 Countries
          </p>
        </motion.div>

        {/* Interactive TFR Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="glass-card px-4 py-6 md:px-8 md:py-8">
            {/* Header with live value */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted text-sm tracking-wider uppercase font-mono">
                Global Total Fertility Rate
              </p>
              <div className="text-right">
                <span className="text-accent font-bold text-3xl md:text-4xl font-mono">
                  {activePoint.tfr.toFixed(2)}
                </span>
                <span className="text-muted text-sm ml-2 font-mono">{activePoint.year}</span>
              </div>
            </div>

            {/* Chart with overlay for persistent cursor */}
            <div
              ref={chartRef}
              className="w-full relative cursor-crosshair select-none"
              style={{ height: 300 }}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={globalTfrTimeline}
                  margin={{ top: 10, right: 10, bottom: 5, left: -10 }}
                >
                  <defs>
                    <linearGradient id="heroTfrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4880F" stopOpacity={0.4} />
                      <stop offset="70%" stopColor="#D4880F" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#D4880F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1a1a3e"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: '#888899', fontSize: 11 }}
                    stroke="#333355"
                    tickLine={false}
                    ticks={[1800, 1850, 1900, 1950, 2000]}
                  />
                  <YAxis
                    domain={[0, 7]}
                    tick={{ fill: '#888899', fontSize: 11 }}
                    stroke="#333355"
                    tickLine={false}
                    ticks={[1, 2, 3, 4, 5, 6]}
                    width={30}
                  />
                  <ReferenceLine
                    y={2.1}
                    stroke="#C0392B"
                    strokeDasharray="6 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Replacement Level (2.1)',
                      position: 'right',
                      fill: '#C0392B',
                      fontSize: 10,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tfr"
                    stroke="#D4880F"
                    strokeWidth={2.5}
                    fill="url(#heroTfrGradient)"
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                  {/* Persistent vertical cursor line */}
                  <ReferenceLine
                    x={activePoint.year}
                    stroke="#D4880F"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    strokeOpacity={0.6}
                  />
                  {/* Active dot on the curve */}
                  <ReferenceDot
                    x={activePoint.year}
                    y={activePoint.tfr}
                    r={6}
                    fill="#D4880F"
                    stroke="#0a0a1a"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Drag handle indicator — shows arrows on first load, fades after interaction */}
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="flex items-center gap-3 bg-bg/80 backdrop-blur-sm rounded-full px-5 py-2.5 border border-muted/20">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-muted text-xs font-mono">Drag to explore</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-3">
              <p className="text-muted/40 text-xs font-mono">1800</p>
              <p className="text-muted/50 text-xs">
                Source: UN World Population Prospects, Gapminder
              </p>
              <p className="text-muted/40 text-xs font-mono">2024</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              className="glass-card text-center py-4 px-3"
            >
              <div className={`stat-number ${stat.color} mb-1`}>{stat.value}</div>
              <p className="text-muted text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <motion.a
            href="#universe25"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block text-muted hover:text-accent transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
