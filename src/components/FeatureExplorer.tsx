'use client';

import ScrollReveal from './ScrollReveal';
import CountryScatter from './CountryScatter';

export default function FeatureExplorer() {
  return (
    <section id="features" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Explore</div>
          <h2 className="section-title">Feature Explorer</h2>
          <p className="section-subtitle">
            Select any two variables to see how they correlate across 62 countries.
            Israel is always highlighted — it defies every trend line.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card">
            <CountryScatter defaultX="urban" defaultY="tfr" showAxisSelector={true} height={500} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
