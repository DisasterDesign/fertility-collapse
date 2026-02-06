'use client';

import ScrollReveal from './ScrollReveal';

const deadEnds = [
  {
    title: '"Fight for Country"',
    subtitle: 'Willingness to defend doesn\'t predict fertility',
    icon: '⚔️',
    examples: [
      { country: 'Morocco', value: '94%', tfr: '1.97', note: 'highest willingness, collapsed' },
      { country: 'Japan', value: '11%', tfr: '1.20', note: 'lowest willingness, collapsed' },
      { country: 'Vietnam', value: '89%', tfr: '1.90', note: 'high willingness, collapsed' },
    ],
    conclusion: 'Countries at both extremes of patriotic willingness have collapsed. The variable adds noise, not signal.',
  },
  {
    title: '"Welfare State"',
    subtitle: 'Money and benefits can\'t buy babies',
    icon: '💰',
    examples: [
      { country: 'Sweden', value: '$52K GDP', tfr: '1.50', note: '480 days parental leave' },
      { country: 'Norway', value: '$65K GDP', tfr: '1.40', note: 'world\'s best welfare' },
      { country: 'Bangladesh', value: '$2.8K GDP', tfr: '1.95', note: 'minimal welfare, still collapsed' },
    ],
    conclusion: 'Nordic countries prove that even perfect welfare states cannot maintain replacement fertility. Bangladesh proves poverty doesn\'t protect either.',
  },
  {
    title: '"Religion"',
    subtitle: 'Faith doesn\'t prevent collapse',
    icon: '🕊️',
    examples: [
      { country: 'Iran', value: 'Islamic Republic', tfr: '2.08', note: 'theocracy, barely above replacement' },
      { country: 'Italy', value: 'Catholic heartland', tfr: '1.20', note: 'seat of Vatican' },
      { country: 'Thailand', value: '95% Buddhist', tfr: '1.10', note: 'deeply religious, deeply collapsed' },
    ],
    conclusion: 'Every major religion has populations below replacement. Modernization overpowers religious pronatalism in every case tested.',
  },
];

export default function DeadEnds() {
  return (
    <section id="dead-ends" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Falsified Hypotheses</div>
          <h2 className="section-title">Dead Ends</h2>
          <p className="section-subtitle">
            Three popular explanations for fertility decline. Each one fails the data.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {deadEnds.map((dead, i) => (
            <ScrollReveal key={dead.title} delay={i * 0.15}>
              <div className="glass-card h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{dead.icon}</span>
                  <div>
                    <h3 className="font-bold text-text-primary text-lg">{dead.title}</h3>
                    <p className="text-xs text-muted">{dead.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {dead.examples.map((ex) => (
                    <div key={ex.country} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-text-primary">{ex.country}</span>
                        <span className="text-xs text-muted ml-2">{ex.value}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-danger">{ex.tfr}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-muted/10 pt-4 mt-auto">
                  <div className="flex items-start gap-2">
                    <span className="text-danger text-lg">✕</span>
                    <p className="text-sm text-muted leading-relaxed">{dead.conclusion}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
