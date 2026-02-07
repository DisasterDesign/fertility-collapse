'use client';

import ScrollReveal from './ScrollReveal';

// ─── Data ────────────────────────────────────────────────────────────

const eastEurope = [
  { emoji: '🇧🇦', name: 'Bosnia & Herzegovina', decline: -21.9, detail: 'TFR 1.26' },
  { emoji: '🇦🇱', name: 'Albania', decline: -21.4, detail: '38% of the population lives abroad' },
  { emoji: '🇱🇻', name: 'Latvia', decline: -21.1, detail: 'Lost ~25% since peak. Below 1950 population level' },
  { emoji: '🇱🇹', name: 'Lithuania', decline: -20.7, detail: '3.7M peak → 2.9M now. Mass emigration since EU accession' },
  { emoji: '🇧🇬', name: 'Bulgaria', decline: -20.6, detail: 'Mass outbound migration is the largest contributor' },
  { emoji: '🇲🇩', name: 'Moldova', decline: -20, detail: 'Lost 1M people (25%) between 2020–2024' },
  { emoji: '🇭🇷', name: 'Croatia', decline: -18, detail: 'Peak 4.78M in 1991, declining ever since' },
  { emoji: '🇷🇸', name: 'Serbia', decline: -18, detail: '7.8M (1991) → 6.65M (2022 census). Top-10 fastest declining' },
  { emoji: '🇷🇴', name: 'Romania', decline: -15.8, detail: '3.5 million left between 2007–2015' },
  { emoji: '🇲🇰', name: 'N. Macedonia', decline: -10.9, detail: 'Population down 24.6% since independence in 1991' },
  { emoji: '🇽🇰', name: 'Kosovo', decline: -15, detail: 'Fastest proportional decline in the sub-region' },
  { emoji: '🇭🇺', name: 'Hungary', decline: -5, detail: 'Invested heavily in pronatalist policies. TFR briefly rose to ~1.6, now falling back' },
  { emoji: '🇵🇱', name: 'Poland', decline: -7, detail: 'TFR ~1.32' },
];

const maxDecline = 22; // for bar width scaling

// ─── Component ───────────────────────────────────────────────────────
export default function AlreadyShrinking() {
  return (
    <section id="shrinking" className="py-24">
      <div className="section-container">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Global Status</div>
          <h2 className="section-title">Already Shrinking</h2>
          <p className="section-subtitle">
            42 countries are losing population right now. 63 have already peaked. None have reversed it.
          </p>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 1: The Big Three — East Asia
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-14">

            {/* ── China ── */}
            <div className="glass-card border-t-4 border-danger">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🇨🇳</span>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">China</h3>
                  <span className="text-xs text-muted">Shrinking since 2022</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-muted">Peak population (2021)</span>
                <p className="font-mono text-3xl font-bold text-danger">1.43B</p>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Deaths &gt; Births (2024)</span>
                  <span className="font-mono text-sm font-bold text-danger">1.4M gap</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Projected loss by 2054</span>
                  <span className="font-mono text-sm font-bold text-danger">−204M</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-danger/10 rounded-lg border border-danger/20">
                  <span className="text-xs text-muted">Projected loss by 2100</span>
                  <span className="font-mono text-sm font-bold text-danger">−786M</span>
                </div>
              </div>

              <div className="bg-danger/5 border-l-4 border-danger/30 p-3 rounded-r-lg">
                <p className="text-sm text-muted italic leading-relaxed">
                  &ldquo;The second-largest economy on Earth is projected to lose more people
                  than the entire current population of Europe.&rdquo;
                </p>
              </div>
              <p className="text-xs text-muted/50 mt-3">Source: UN World Population Prospects 2024</p>
            </div>

            {/* ── South Korea ── */}
            <div className="glass-card border-t-4 border-danger">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🇰🇷</span>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">South Korea</h3>
                  <span className="text-xs text-muted">Shrinking since 2020</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-muted">TFR 2024 (Statistics Korea, Feb 2025)</span>
                <p className="font-mono text-3xl font-bold text-danger">0.75</p>
                <span className="text-xs text-muted">Lowest in the world</span>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Census Bureau estimate (Nov 2024)</span>
                  <span className="font-mono text-sm font-bold text-danger">0.68</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Seoul alone</span>
                  <span className="font-mono text-sm font-bold text-danger">0.58</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Decline in one decade</span>
                  <span className="font-mono text-sm font-bold text-danger">−43%</span>
                </div>
              </div>

              <div className="bg-danger/5 border-l-4 border-danger/30 p-3 rounded-r-lg">
                <p className="text-sm text-muted italic leading-relaxed">
                  &ldquo;Given the lack of evidence of a fertility rebound, our revised projections
                  no longer assume this.&rdquo;
                </p>
                <p className="text-xs text-muted/50 mt-1">— U.S. Census Bureau, Nov 2024</p>
              </div>
            </div>

            {/* ── Japan ── */}
            <div className="glass-card border-t-4 border-accent">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🇯🇵</span>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Japan</h3>
                  <span className="text-xs text-muted">Shrinking since 2011</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-muted">TFR</span>
                <p className="font-mono text-3xl font-bold text-accent">1.42</p>
                <span className="text-xs text-muted">First mover</span>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Current population</span>
                  <span className="font-mono text-sm font-bold text-text-primary">123.8M</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface/50 rounded-lg">
                  <span className="text-xs text-muted">Projected 2050</span>
                  <span className="font-mono text-sm font-bold text-accent">105.1M</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-accent/10 rounded-lg border border-accent/20">
                  <span className="text-xs text-muted">Decline</span>
                  <span className="font-mono text-sm font-bold text-accent">−15.1%</span>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                The first major economy to enter sustained decline. It has been trying to reverse
                the trend for over a decade. <span className="text-text-primary font-medium">It has not worked.</span>
              </p>
              <p className="text-xs text-muted/50 mt-3">Source: UN WPP 2024, World Population Review</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 2: Europe — Low Fertility Core
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14">
            <h3 className="text-xl font-bold text-text-primary mb-2">Europe — Low Fertility Core</h3>
            <p className="text-sm text-muted mb-5">
              Sustained low fertility and aging — not emigration — driving decline.
            </p>

            <div className="glass-card">
              <div className="space-y-3">
                {/* Italy — highlighted */}
                <div className="flex items-center justify-between p-3 bg-danger/5 rounded-lg border border-danger/20">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">🇮🇹</span>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-text-primary">Italy</span>
                      <p className="text-xs text-muted truncate">369,944 births in 2024 — lowest since Italian unification in 1861. 16th consecutive annual decline.</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-danger ml-3 flex-shrink-0">1.18</span>
                </div>

                {/* Spain */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇪🇸</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Spain</span>
                      <p className="text-xs text-muted">Among the lowest fertility in Europe alongside Malta</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-danger ml-3 flex-shrink-0">~1.16</span>
                </div>

                {/* Greece */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇬🇷</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Greece</span>
                      <p className="text-xs text-muted">Declining since 2011. Projected to lose 1M+ by 2050</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-danger ml-3 flex-shrink-0">~1.3</span>
                </div>

                {/* Portugal */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇵🇹</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Portugal</span>
                      <p className="text-xs text-muted">Projected −5.8% by 2050 (10.4M → 9.8M)</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-accent ml-3 flex-shrink-0">~1.4</span>
                </div>
              </div>

              <p className="text-xs text-muted/50 mt-4">Sources: ISTAT (March 2025), Eurostat, UN WPP 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 3: Eastern Europe — The Double Drain
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14">
            <h3 className="text-xl font-bold text-text-primary mb-1">Eastern Europe — The Double Drain</h3>
            <p className="text-sm text-muted italic mb-5">
              Low fertility. Young people leaving. The double drain.
            </p>

            <div className="glass-card">
              <div className="grid sm:grid-cols-2 gap-2">
                {eastEurope.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 p-3 bg-surface/50 rounded-lg">
                    <span className="text-lg flex-shrink-0">{c.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text-primary">{c.name}</span>
                        <span className="font-mono text-sm font-bold text-danger ml-2">
                          {c.decline > 0 ? '' : ''}
                          {c.decline}%
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">{c.detail}</p>
                      {/* Visual decline bar */}
                      <div className="mt-1.5 h-1 rounded-full overflow-hidden bg-surface">
                        <div
                          className="h-full rounded-full bg-danger/70"
                          style={{ width: `${(Math.abs(c.decline) / maxDecline) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted/50 mt-4">Projected decline 2024→2050. Sources: World Population Review (Jan 2026), OSW Centre for Eastern Studies</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 4: Former Soviet Union
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.15}>
          <div className="mb-14">
            <h3 className="text-xl font-bold text-text-primary mb-5">Former Soviet Union</h3>

            <div className="glass-card">
              <div className="space-y-3">
                {/* Russia */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇷🇺</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Russia</span>
                      <p className="text-xs text-muted">Projected to lose ~10M by 2054 (3rd largest after China and Japan). War accelerating decline.</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-danger ml-3 flex-shrink-0">−10M</span>
                </div>

                {/* Ukraine */}
                <div className="flex items-center justify-between p-3 bg-danger/5 rounded-lg border border-danger/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇺🇦</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Ukraine</span>
                      <p className="text-xs text-muted">43.7M (2020) → 37.9M (2024). War + pre-existing decline. 5.7M net migration out in 2022.</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-danger ml-3 flex-shrink-0">−5.8M</span>
                </div>

                {/* Georgia */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇬🇪</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Georgia</span>
                      <p className="text-xs text-muted">Shrinking since 1992. Projected −2.6% by 2050.</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-muted ml-3 flex-shrink-0">−2.6%</span>
                </div>

                {/* Belarus */}
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇧🇾</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Belarus</span>
                      <p className="text-xs text-muted">Low fertility + emigration.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted/50 mt-4">Sources: UN WPP 2024, The Economist</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 5: Other Categories
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.15}>
          <div className="mb-14">
            <div className="grid md:grid-cols-3 gap-4">
              {/* War / Conflict */}
              <div className="glass-card p-5">
                <h4 className="text-sm font-mono text-danger mb-3 tracking-wider uppercase font-medium">War / Conflict Zones</h4>
                <div className="flex flex-wrap gap-2">
                  {['Myanmar', 'Syria', 'Afghanistan', 'Palestine', 'Venezuela', 'Sudan', 'Yemen'].map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-full bg-danger/10 border border-danger/20 text-xs text-muted">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pacific Islands */}
              <div className="glass-card p-5">
                <h4 className="text-sm font-mono text-accent mb-3 tracking-wider uppercase font-medium">Pacific Islands</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Cook Islands', note: '−2.24%/yr' },
                    { name: 'Tuvalu', note: null },
                    { name: 'American Samoa', note: null },
                    { name: 'Tonga', note: null },
                  ].map((c) => (
                    <span key={c.name} className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs text-muted">
                      {c.name}{c.note && <span className="font-mono text-accent ml-1">{c.note}</span>}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted/50 mt-2">Emigration to Australia, NZ, and US</p>
              </div>

              {/* Caribbean */}
              <div className="glass-card p-5">
                <h4 className="text-sm font-mono text-muted mb-3 tracking-wider uppercase font-medium">Caribbean</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Cuba', note: 'TFR below replacement for decades + mass exodus' },
                    { name: 'Puerto Rico', note: 'Declining' },
                  ].map((c) => (
                    <span key={c.name} className="px-2.5 py-1 rounded-full bg-surface/50 border border-muted/20 text-xs text-muted">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted/60 italic mt-4 text-center">
              These cases involve conflict or geographic factors, not just demographic structure.
              But the result is the same: fewer people, every year.
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 6: The Three Numbers That Matter
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.2}>
          <h3 className="text-xl font-bold text-text-primary mb-6 text-center">The Three Numbers That Matter</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 786 million */}
            <div className="glass-card text-center py-8 border-l-4 border-danger">
              <p className="font-mono text-3xl md:text-4xl font-bold text-danger mb-3">786,000,000</p>
              <p className="text-sm font-medium text-text-primary mb-2">
                People China is projected to lose by 2100
              </p>
              <p className="text-xs text-muted leading-relaxed px-2">
                The UN medium scenario — which assumes TFR will <span className="text-text-primary">rise</span> from
                1.18 to 1.48. If it doesn&apos;t, the loss is even larger.
              </p>
              <p className="text-xs text-muted/40 mt-3">UN World Population Prospects 2024</p>
            </div>

            {/* 52 countries */}
            <div className="glass-card text-center py-8 border-l-4 border-accent">
              <p className="font-mono text-3xl md:text-4xl font-bold text-accent mb-3">52</p>
              <p className="text-sm font-medium text-text-primary mb-2">
                Countries where immigration is the only growth engine
              </p>
              <p className="text-xs text-muted leading-relaxed px-2">
                By 2054, 52 countries will depend on immigration to avoid shrinking.
                By 2100: 62. But immigrants adopt host-country fertility within one generation.
              </p>
              <p className="text-xs text-muted/40 mt-3">UN WPP 2024</p>
            </div>

            {/* Zero */}
            <div className="glass-card text-center py-8 border-l-4 border-muted">
              <p className="font-mono text-3xl md:text-4xl font-bold text-text-primary mb-3">0</p>
              <p className="text-sm font-medium text-text-primary mb-2">
                Countries that have reversed demographic decline
              </p>
              <p className="text-xs text-muted leading-relaxed px-2">
                Hungary tried cash incentives. Japan tried subsidies.
                South Korea has spent $270B+ over 18 years. None have returned to replacement fertility.
              </p>
              <p className="text-xs text-muted/40 mt-3">Historical record</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
