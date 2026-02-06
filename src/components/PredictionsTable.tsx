'use client';

import ScrollReveal from './ScrollReveal';

const predictions = [
  { tier: 'High Confidence (by 2035)', countries: [
    { name: 'India', currentTfr: 2.00, note: 'Already at replacement', emoji: '🇮🇳' },
    { name: 'Indonesia', currentTfr: 2.10, note: 'At the boundary', emoji: '🇮🇩' },
    { name: 'Vietnam', currentTfr: 1.90, note: 'Already collapsed', emoji: '🇻🇳' },
    { name: 'Bangladesh', currentTfr: 1.95, note: 'Already collapsed', emoji: '🇧🇩' },
    { name: 'Egypt', currentTfr: 2.41, note: 'Urban areas already below', emoji: '🇪🇬' },
    { name: 'Malaysia', currentTfr: 1.80, note: 'Already collapsed', emoji: '🇲🇾' },
  ]},
  { tier: 'Moderate Confidence (by 2040)', countries: [
    { name: 'Algeria', currentTfr: 2.70, note: 'Rapid urbanization', emoji: '🇩🇿' },
    { name: 'Jordan', currentTfr: 2.60, note: 'High internet, urban', emoji: '🇯🇴' },
    { name: 'Saudi Arabia', currentTfr: 2.40, note: '99% internet, fast decline', emoji: '🇸🇦' },
  ]},
  { tier: 'Entering Danger Zone (2035-2040)', countries: [
    { name: 'Nigeria', currentTfr: 4.80, note: 'Lagos already at 3.6', emoji: '🇳🇬' },
    { name: 'Kenya', currentTfr: 3.20, note: 'Urban Kenya declining fast', emoji: '🇰🇪' },
    { name: 'Ghana', currentTfr: 3.60, note: 'High internet for Africa', emoji: '🇬🇭' },
  ]},
];

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  'High Confidence (by 2035)': { bg: 'bg-danger/10', border: 'border-danger/30', text: 'text-danger' },
  'Moderate Confidence (by 2040)': { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent' },
  'Entering Danger Zone (2035-2040)': { bg: 'bg-blue-accent/10', border: 'border-blue-accent/30', text: 'text-blue-accent' },
};

export default function PredictionsTable() {
  return (
    <section id="predictions" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Projections</div>
          <h2 className="section-title">What Comes Next</h2>
          <p className="section-subtitle">
            Countries approaching the modernization threshold — and likely to cross it within 10-15 years.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {predictions.map((tier, i) => {
            const colors = tierColors[tier.tier];
            return (
              <ScrollReveal key={tier.tier} delay={i * 0.15}>
                <div className={`glass-card ${colors.bg} border ${colors.border}`}>
                  <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>{tier.tier}</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tier.countries.map((country) => (
                      <div key={country.name} className="flex items-center justify-between p-3 bg-bg/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.emoji}</span>
                          <div>
                            <span className="text-sm font-medium text-text-primary">{country.name}</span>
                            <p className="text-xs text-muted">{country.note}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-text-primary">{country.currentTfr.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
