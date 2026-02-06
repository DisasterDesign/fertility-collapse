'use client';

import ScrollReveal from './ScrollReveal';
import { israelPopulations, warBabyBoom } from '@/data/israel';

export default function IsraelAnomaly() {
  return (
    <section id="israel" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">The Outlier</div>
          <h2 className="section-title">The Israel Anomaly</h2>
          <p className="section-subtitle">
            The model predicts Israel should have collapsed. It didn&apos;t. This is the most important data point in the dataset.
          </p>
        </ScrollReveal>

        {/* Main stat */}
        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass-card text-center py-8">
              <p className="text-muted text-sm mb-2">Model Prediction</p>
              <p className="font-mono text-5xl font-bold text-danger">87%</p>
              <p className="text-muted text-sm mt-2">P(Collapse)</p>
            </div>
            <div className="glass-card text-center py-8">
              <p className="text-muted text-sm mb-2">Actual TFR</p>
              <p className="font-mono text-5xl font-bold text-safe">2.90</p>
              <p className="text-muted text-sm mt-2">Well above replacement</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sub-population table */}
        <ScrollReveal delay={0.2}>
          <div className="glass-card mb-12">
            <h3 className="text-lg font-bold mb-6">Sub-Population Breakdown</h3>
            <div className="space-y-3">
              {israelPopulations.map((pop) => (
                <div
                  key={pop.group}
                  className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border-l-4"
                  style={{ borderLeftColor: pop.color }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-text-primary w-24">{pop.group}</span>
                    <span className="font-mono text-2xl font-bold" style={{ color: pop.color }}>
                      {pop.tfr.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      pop.trend === 'Rising' ? 'bg-safe/20 text-safe' :
                      pop.trend === 'Declining' ? 'bg-accent/20 text-accent' :
                      'bg-danger/20 text-danger'
                    }`}>
                      {pop.trend === 'Rising' ? '↑' : pop.trend === 'Declining' ? '↓' : '↓↓'} {pop.trend}
                    </span>
                    <span className="font-mono text-muted w-16 text-right">{pop.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* War Baby Boom */}
        <ScrollReveal delay={0.3}>
          <div className="glass-card mb-12">
            <h3 className="text-lg font-bold mb-4">2024 War Baby Boom</h3>
            <p className="text-muted text-sm mb-6">
              Following the October 7th attack and war, Israel experienced a measurable baby boom — the opposite of Ukraine&apos;s response to war.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <p className="text-muted text-xs mb-1">Sept 2023</p>
                <p className="font-mono text-2xl font-bold text-text-primary">
                  {warBabyBoom.sept2023births.toLocaleString()}
                </p>
                <p className="text-muted text-xs">births</p>
              </div>
              <div className="text-center p-4 bg-surface/50 rounded-lg border border-accent/30">
                <p className="text-muted text-xs mb-1">Sept 2024</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  {warBabyBoom.sept2024births.toLocaleString()}
                </p>
                <p className="text-muted text-xs">births</p>
              </div>
              <div className="text-center p-4 bg-safe/10 rounded-lg border border-safe/30">
                <p className="text-muted text-xs mb-1">Change</p>
                <p className="font-mono text-2xl font-bold text-safe">{warBabyBoom.change}</p>
                <p className="text-muted text-xs">increase</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Israel vs Ukraine */}
        <ScrollReveal delay={0.4}>
          <div className="glass-card">
            <h3 className="text-lg font-bold mb-4">Same Stimulus, Opposite Response</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-safe/5 rounded-lg border border-safe/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🇮🇱</span>
                  <span className="font-bold text-text-primary">Israel</span>
                </div>
                <p className="text-sm text-muted mb-2">October 7 attack → existential war</p>
                <p className="font-mono text-lg">
                  TFR: <span className="text-safe font-bold">3.06 → 3.19</span>
                </p>
                <p className="text-xs text-safe mt-1">↑ Fertility increased during war</p>
              </div>
              <div className="p-5 bg-danger/5 rounded-lg border border-danger/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🇺🇦</span>
                  <span className="font-bold text-text-primary">Ukraine</span>
                </div>
                <p className="text-sm text-muted mb-2">Russian invasion → existential war</p>
                <p className="font-mono text-lg">
                  TFR: <span className="text-danger font-bold">1.16 → 0.90</span>
                </p>
                <p className="text-xs text-danger mt-1">↓ Fertility collapsed further</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
