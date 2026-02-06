'use client';

import ScrollReveal from './ScrollReveal';

const timelineEvents = [
  { day: 'Day 0', label: '8 mice introduced', value: '4M, 4F', color: 'text-safe' },
  { day: 'Day 315', label: 'Population doubles every 55 days', value: '620', color: 'text-blue-accent' },
  { day: 'Day 560', label: 'Peak population (capacity: 4,000)', value: '2,200', color: 'text-accent' },
  { day: 'Day 600+', label: '"Beautiful ones" emerge', value: 'Refuse to mate', color: 'text-muted' },
  { day: 'Day 920', label: 'Last birth recorded', value: '0 births', color: 'text-danger' },
  { day: '1973', label: 'Final mouse dies', value: 'Extinction', color: 'text-danger' },
];

export default function Universe25() {
  return (
    <section id="universe25" className="py-24 relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Prologue</div>
          <h2 className="section-title">Universe 25</h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 mt-12">
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-text-primary/90">
                In 1968, ethologist <span className="text-accent font-medium">John B. Calhoun</span> built
                a paradise for mice at NIMH, Maryland. A 4.5-foot metal cube with unlimited food, unlimited
                water, zero predators, zero disease. The perfect conditions for life.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg leading-relaxed text-text-primary/90">
                He introduced 8 mice — 4 males, 4 females. The population doubled every 55 days.
                By day 560, there were 2,200 mice. The space could hold 4,000.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg leading-relaxed text-text-primary/90">
                Then something broke. A generation emerged that Calhoun called the
                {' '}<span className="text-accent font-medium">&ldquo;beautiful ones&rdquo;</span> —
                mice that refused to mate, refused to fight, spent their time obsessively grooming.
                They were physically perfect and behaviorally dead.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-lg leading-relaxed text-text-primary/90">
                The last birth occurred on day 920. The population spiraled to zero.
                On May 23, 1973, the final mouse died.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <blockquote className="border-l-2 border-accent pl-6 py-2 text-muted italic text-lg">
                &ldquo;I shall largely speak of mice, but my thoughts are on man.&rdquo;
                <span className="block text-sm mt-2 not-italic text-muted/60">— John B. Calhoun</span>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="glass-card mt-8">
                <p className="text-accent font-mono text-sm mb-3">Calhoun ran it 25 times.</p>
                <p className="text-2xl font-bold">Every time: extinction.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            <ScrollReveal delay={0.2}>
              <h3 className="text-xl font-bold mb-6 text-muted">Experiment Timeline</h3>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-muted/20" />

              {timelineEvents.map((event, i) => (
                <ScrollReveal key={event.day} delay={0.2 + i * 0.1}>
                  <div className="relative pl-8 pb-8 last:pb-0">
                    <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                      event.color === 'text-danger' ? 'border-danger bg-danger/20' :
                      event.color === 'text-accent' ? 'border-accent bg-accent/20' :
                      event.color === 'text-safe' ? 'border-safe bg-safe/20' :
                      event.color === 'text-blue-accent' ? 'border-blue-accent bg-blue-accent/20' :
                      'border-muted bg-muted/20'
                    }`} />
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-accent whitespace-nowrap">{event.day}</span>
                      <span className={`font-mono text-lg font-bold ${event.color}`}>{event.value}</span>
                    </div>
                    <p className="text-muted text-sm mt-1">{event.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.9}>
              <div className="mt-8 glass-card">
                <h4 className="text-sm text-muted mb-4 font-mono uppercase tracking-wider">Modern Parallel</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { country: 'South Korea', tfr: '0.75', emoji: '🇰🇷' },
                    { country: 'Japan', tfr: '1.20', emoji: '🇯🇵' },
                    { country: 'China', tfr: '1.00', emoji: '🇨🇳' },
                  ].map((c) => (
                    <div key={c.country} className="text-center">
                      <div className="text-2xl mb-1">{c.emoji}</div>
                      <div className="font-mono text-danger text-xl font-bold">{c.tfr}</div>
                      <div className="text-xs text-muted">{c.country}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
