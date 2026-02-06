'use client';

import {
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, Tooltip, Area, AreaChart
} from 'recharts';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { druzeTrajectory, druzeChecklist } from '@/data/israel';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

export default function DruzePuzzle() {
  return (
    <section id="druze" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-danger font-mono mb-4 tracking-wider uppercase">Key Finding</div>
          <h2 className="section-title">The Druze Puzzle</h2>
          <p className="section-subtitle">
            The most important finding in this research. A population that should have the highest
            fertility in Israel — by every theory — has among the lowest.
          </p>
        </ScrollReveal>

        {/* Trajectory Chart */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card mb-12">
            <h3 className="text-lg font-bold mb-2">Druze Fertility Trajectory</h3>
            <p className="text-muted text-sm mb-6">
              From 7.9 children per woman to 1.66 — a collapse steeper than any modernized nation.
            </p>

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={druzeTrajectory} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                <defs>
                  <linearGradient id="tfrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E74C3C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#E74C3C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: '#888899', fontSize: 12 }}
                  stroke="#333355"
                />
                <YAxis
                  domain={[0, 9]}
                  tick={{ fill: '#888899', fontSize: 12 }}
                  stroke="#333355"
                />
                <ReferenceLine
                  y={2.1}
                  stroke="#F1C40F"
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                  label={{ value: 'Replacement (2.1)', fill: '#F1C40F', fontSize: 11, position: 'right' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a3e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#E8E6E3',
                  }}
                  formatter={(value) => [Number(value).toFixed(2), 'TFR']}
                />
                <Area
                  type="monotone"
                  dataKey="tfr"
                  stroke="#E74C3C"
                  strokeWidth={3}
                  fill="url(#tfrGradient)"
                  dot={{ fill: '#E74C3C', stroke: '#E74C3C', r: 4 }}
                  activeDot={{ r: 6, fill: '#D4880F' }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex justify-between text-sm mt-4">
              <div>
                <span className="text-muted">1964:</span>{' '}
                <span className="font-mono text-safe font-bold">7.90</span>
              </div>
              <div>
                <span className="text-muted">2024:</span>{' '}
                <span className="font-mono text-danger font-bold">1.66</span>
              </div>
              <div>
                <span className="text-muted">Change:</span>{' '}
                <span className="font-mono text-danger font-bold">-79%</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Checklist */}
        <ScrollReveal delay={0.2}>
          <div className="glass-card mb-12">
            <h3 className="text-lg font-bold mb-2">Every Protective Factor Present</h3>
            <p className="text-muted text-sm mb-6">
              By every mainstream theory, the Druze should have the highest fertility in Israel.
            </p>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {druzeChecklist.map((item) => (
                <motion.div key={item.factor} variants={staggerItem}>
                  <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        item.present ? 'bg-safe/20 text-safe' : 'bg-danger/20 text-danger'
                      }`}>
                        {item.present ? '✓' : '✕'}
                      </div>
                      <div>
                        <span className="font-medium text-text-primary">{item.factor}</span>
                        <span className="text-xs text-muted ml-2">→ {item.expected}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-lg font-bold text-danger">{item.actual}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Result */}
              <motion.div variants={staggerItem}>
                <div className="mt-6 p-5 bg-danger/10 border border-danger/20 rounded-lg flex items-start gap-3">
                  <span className="text-danger text-2xl">✕</span>
                  <div>
                    <p className="text-danger font-bold">Result: Below replacement, shrinking 0.9% annually</p>
                    <p className="text-muted text-sm mt-1">
                      Population: 148,000 → declining
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Key Quote */}
        <ScrollReveal delay={0.3}>
          <div className="glass-card border-l-4 border-accent">
            <blockquote className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed">
              &ldquo;If every theory says this population should have the highest fertility in Israel,
              and it has among the lowest — <span className="text-accent">every theory is wrong.</span>&rdquo;
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
