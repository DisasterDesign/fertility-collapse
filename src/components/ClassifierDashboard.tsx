'use client';

import { useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import CountryScatter from './CountryScatter';
import { modelComparison, isModernized } from '@/lib/classifier';
import { countries } from '@/data/countries';

export default function ClassifierDashboard() {
  const thresholdStats = useMemo(() => {
    const modernized = countries.filter(c => isModernized(c));
    const collapsed = modernized.filter(c => c.collapsed);
    const survivors = modernized.filter(c => !c.collapsed);
    return { total: modernized.length, collapsed: collapsed.length, survivors };
  }, []);

  return (
    <section id="classifier" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Analysis</div>
          <h2 className="section-title">The Classifier</h2>
          <p className="section-subtitle">
            Three logistic regression models were tested. The simplest one — just 3 features — performed best.
            Adding more variables made it worse.
          </p>
        </ScrollReveal>

        {/* Model Comparison Table */}
        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-muted/20">
                  <th className="text-left py-3 px-4 text-muted font-medium">Model</th>
                  <th className="text-left py-3 px-4 text-muted font-medium">Features</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">LOO-CV Accuracy</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Misclassified</th>
                </tr>
              </thead>
              <tbody>
                {modelComparison.map((model) => (
                  <tr
                    key={model.name}
                    className={`border-b border-muted/10 ${model.highlighted ? 'bg-accent/10' : ''}`}
                  >
                    <td className={`py-4 px-4 font-medium ${model.highlighted ? 'text-accent font-bold' : 'text-text-primary'}`}>
                      {model.name}
                    </td>
                    <td className="py-4 px-4 text-muted font-mono text-xs">{model.features}</td>
                    <td className={`py-4 px-4 text-right font-mono font-bold ${model.highlighted ? 'text-accent' : 'text-text-primary'}`}>
                      {model.accuracy}%
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-muted">{model.misclassified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Threshold Test */}
        <ScrollReveal delay={0.2}>
          <div className="glass-card mb-12">
            <h3 className="text-lg font-bold mb-4">Modernization Threshold Test</h3>
            <p className="text-muted text-sm mb-6">
              Countries where urbanization &gt; 65% AND internet penetration &gt; 70%
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="h-8 rounded-full overflow-hidden flex bg-surface">
                  <div
                    className="bg-danger h-full flex items-center justify-center text-xs font-mono font-bold text-white"
                    style={{ width: `${(thresholdStats.collapsed / thresholdStats.total) * 100}%` }}
                  >
                    {thresholdStats.collapsed} collapsed
                  </div>
                  <div
                    className="bg-safe h-full flex items-center justify-center text-xs font-mono font-bold text-white"
                    style={{ width: `${(thresholdStats.survivors.length / thresholdStats.total) * 100}%` }}
                  >
                    {thresholdStats.survivors.length} surviving
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-danger">
                  {Math.round((thresholdStats.collapsed / thresholdStats.total) * 100)}%
                </span>
                <span className="text-muted text-sm block">collapsed</span>
              </div>
            </div>

            <p className="text-sm text-muted mb-3">
              Of {thresholdStats.total} modernized countries, {thresholdStats.collapsed} have collapsed below replacement.
              The {thresholdStats.survivors.length} survivors:
            </p>
            <div className="flex flex-wrap gap-2">
              {thresholdStats.survivors.map((c) => (
                <span
                  key={c.iso3}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    c.iso3 === 'ISR'
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'bg-safe/20 text-safe border border-safe/30'
                  }`}
                >
                  {c.name} ({c.tfr.toFixed(2)})
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Scatter Plot */}
        <ScrollReveal delay={0.3}>
          <div className="glass-card">
            <h3 className="text-lg font-bold mb-2">P(Collapse) vs Actual TFR</h3>
            <p className="text-muted text-sm mb-4">
              Israel stands out as the largest anomaly — high predicted probability of collapse, yet the highest TFR among developed nations.
            </p>
            <CountryScatter defaultX="pCollapse" defaultY="tfr" showAxisSelector={false} height={450} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
