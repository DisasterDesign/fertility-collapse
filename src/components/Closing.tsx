'use client';

import ScrollReveal from './ScrollReveal';

export default function Closing() {
  return (
    <section id="closing" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/30 to-bg" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="space-y-8 text-2xl md:text-3xl leading-relaxed">
              <p className="text-muted">
                Calhoun ran it <span className="text-text-primary font-bold">25 times.</span>
              </p>
              <p className="text-muted">
                Every time: <span className="text-danger font-bold">extinction.</span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="my-20 w-px h-20 bg-muted/20 mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-8 text-2xl md:text-3xl leading-relaxed">
              <p className="text-muted">
                The human experiment is running <span className="text-accent font-bold">once.</span>
              </p>
              <p className="text-muted">
                62 data points say we&apos;re on the <span className="text-danger font-bold">same curve.</span>
              </p>
              <p className="text-text-primary font-medium">
                1 data point says we{' '}
                <span className="text-safe font-bold" style={{ textShadow: '0 0 20px rgba(46, 204, 113, 0.3)' }}>
                  might not have to be.
                </span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="my-20 w-px h-20 bg-muted/20 mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-xl text-accent/80 max-w-xl mx-auto">
              We don&apos;t yet understand what makes that one different.
            </p>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal delay={0.8}>
          <footer className="mt-32 pt-16 border-t border-muted/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Col 1 — About */}
              <div>
                <a href="#hero" className="flex items-center gap-2.5 mb-4 group">
                  <span className="text-2xl">🌍</span>
                  <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium group-hover:text-text-primary transition-colors">
                    Fertility<br />Collapse
                  </span>
                </a>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  An interactive exploration of the global fertility collapse as a phase transition.
                  Binary classification across 62 countries reveals a stark pattern — and one unexplained anomaly.
                </p>
                <p className="text-sm text-muted">
                  Built by{' '}
                  <a
                    href="https://www.fuzionwebz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-text-primary transition-colors"
                  >
                    FuzionWebz
                  </a>
                </p>
              </div>

              {/* Col 2 — Data Sources */}
              <div>
                <h4 className="text-sm font-mono text-accent mb-4 tracking-wider uppercase font-medium">Data Sources</h4>
                <ul className="text-sm text-muted space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    World Bank Open Data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    UN Population Division
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    WIN/Gallup International Survey
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    Israel Central Bureau of Statistics (CBS)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    Taub Center for Social Policy Studies
                  </li>
                </ul>
              </div>

              {/* Col 3 — Methodology */}
              <div>
                <h4 className="text-sm font-mono text-accent mb-4 tracking-wider uppercase font-medium">Methodology</h4>
                <ul className="text-sm text-muted space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    Binary logistic regression with LOO-CV
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    62-country cross-sectional analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    Collapse threshold: TFR &lt; 2.1
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    Modernization: Urban &gt; 65% &amp; Internet &gt; 70%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">—</span>
                    79% classification accuracy
                  </li>
                </ul>
              </div>

              {/* Col 4 — Contact */}
              <div>
                <h4 className="text-sm font-mono text-accent mb-4 tracking-wider uppercase font-medium">Contact</h4>
                <div className="space-y-4">
                  <a
                    href="mailto:davidalelad@gmail.com"
                    className="flex items-center gap-2.5 text-sm text-muted hover:text-text-primary transition-colors group"
                  >
                    <svg className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    davidalelad@gmail.com
                  </a>
                  <a
                    href="https://www.fuzionwebz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-muted hover:text-text-primary transition-colors group"
                  >
                    <svg className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    fuzionwebz.com
                  </a>
                  <a
                    href="mailto:davidalelad@gmail.com"
                    className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 text-sm font-medium rounded-full border border-accent/50 text-accent hover:bg-accent hover:text-bg transition-all duration-200"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-16 pt-6 border-t border-muted/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted/40">
                Fertility Collapse as Phase Transition — A Binary Classification Model Across 62 Countries
              </p>
              <p className="text-xs text-muted/40">
                &copy; {new Date().getFullYear()}{' '}
                <a
                  href="https://www.fuzionwebz.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/50 hover:text-accent transition-colors"
                >
                  FuzionWebz
                </a>
              </p>
            </div>
          </footer>
        </ScrollReveal>
      </div>
    </section>
  );
}
