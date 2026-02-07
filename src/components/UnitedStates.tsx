'use client';

import {
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, Tooltip, Area, AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ─── Data ────────────────────────────────────────────────────────────

const cboTimeline = [
  { date: 'January 2022', predictedYear: 2043, gap: null },
  { date: 'January 2025', predictedYear: 2033, gap: '10 years closer' },
  { date: 'September 2025', predictedYear: 2031, gap: '2 more years' },
  { date: 'January 2026', predictedYear: 2030, gap: '1 more year' },
];

/** Natural increase (births−deaths) vs CBO immigration assumption, in thousands */
const growthBreakdown = [
  { year: 2025, natural: 550,  immigration: 800 },
  { year: 2027, natural: 350,  immigration: 800 },
  { year: 2029, natural: 100,  immigration: 800 },
  { year: 2030, natural: 0,    immigration: 800 },
  { year: 2032, natural: -150, immigration: 800 },
  { year: 2036, natural: -350, immigration: 800 },
  { year: 2040, natural: -500, immigration: 800 },
  { year: 2045, natural: -650, immigration: 800 },
  { year: 2050, natural: -750, immigration: 800 },
  { year: 2056, natural: -800, immigration: 800 },
];

const scenarios = [
  {
    name: '🏛️ CBO Official',
    subtitle: 'January 2026',
    tfr: 'Stable at 1.53',
    immigration2025: '+400,000',
    immigration2026: 'Returns to ~800K by 2030',
    deathsExceedBirths: '2030',
    populationPeak: '364M in 2056',
    population2060: '~364M (flat)',
    keyFlaw: 'Assumes TFR floor at 1.53 + full immigration recovery — neither has historical precedent',
    color: '#888899',
    border: 'border-muted/30',
    textColor: 'text-muted',
    faded: true,
  },
  {
    name: '📊 Adjusted — Moderate',
    subtitle: 'Moderate decline model',
    tfr: '-1.5%/year decline',
    immigration2025: '~0 (Brookings midpoint)',
    immigration2026: 'Gradual recovery to 500K',
    deathsExceedBirths: '2029',
    populationPeak: '~341M in 2033',
    population2060: '~300M',
    keyFlaw: 'Moderate TFR decline + partial immigration recovery',
    color: '#D4880F',
    border: 'border-accent/30',
    textColor: 'text-accent',
    faded: false,
  },
  {
    name: '🔴 Adjusted — Realistic',
    subtitle: 'Historical trajectory',
    tfr: '-2%/year decline',
    immigration2025: '-150,000 (Brookings)',
    immigration2026: 'Stays near zero through 2029',
    deathsExceedBirths: '2028',
    populationPeak: '~340M in 2025 (already passed)',
    population2060: '~285M',
    keyFlaw: 'Historical TFR trajectory + Brookings immigration data — most consistent with current trends',
    color: '#C0392B',
    border: 'border-danger/40',
    textColor: 'text-danger',
    faded: false,
  },
];

const feedbackSteps = [
  { label: 'Fewer women of childbearing age', icon: '👩', color: 'text-muted' },
  { label: 'Fewer births (even at the same TFR)', icon: '👶', color: 'text-accent' },
  { label: 'Smaller next generation', icon: '📉', color: 'text-danger/80' },
  { label: 'Even fewer women of childbearing age', icon: '👩', color: 'text-danger' },
  { label: 'TFR continues to fall (cultural momentum)', icon: '↓', color: 'text-danger' },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const tooltipStyle = {
  backgroundColor: '#1a1a3e',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#E8E6E3',
};

// ─── Component ───────────────────────────────────────────────────────
export default function UnitedStates() {
  return (
    <section id="united-states" className="py-24">
      <div className="section-container">

        {/* ══════════════════════════════════════════════════════════════
            Header
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Case Study</div>
          <h2 className="section-title">The United States Story</h2>
          <p className="section-subtitle">
            Official projections keep getting worse. The math says they&apos;re still too optimistic.
          </p>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 1 — The CBO Keeps Revising Down
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.1}>
          <h3 className="text-xl font-bold text-text-primary mb-2">The CBO Keeps Revising Down</h3>
          <p className="text-sm text-muted mb-8">
            When does the CBO think deaths will exceed births? The answer keeps changing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cboTimeline.map((step, i) => {
              const yearSizes = ['text-2xl text-muted', 'text-3xl text-accent', 'text-4xl text-danger/80', 'text-5xl text-danger'];
              return (
                <div key={step.date} className="glass-card text-center">
                  <p className="text-xs text-muted font-mono mb-3">{step.date}</p>
                  <p className={`font-mono font-bold mb-2 ${yearSizes[i]}`}>
                    {step.predictedYear}
                  </p>
                  {step.gap ? (
                    <p className="text-xs text-danger/70 font-medium">{step.gap}</p>
                  ) : (
                    <p className="text-xs text-muted/50">original estimate</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mb-14">
            <p className="font-mono text-lg text-danger font-bold mb-1">
              13 years of revision in 4 years of forecasting.
            </p>
            <p className="text-sm text-muted italic">
              Every new CBO report brings the crossover closer. The pattern is clear.
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 2 — Why the CBO Is Still Wrong
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card border-l-4 border-accent mb-14">
            <div className="flex items-start gap-3 mb-5">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Why the CBO Is Still Wrong</h3>
                <p className="text-sm text-muted">
                  The January 2026 projection assumes TFR stabilizes at <span className="font-mono font-bold text-accent">1.53</span> indefinitely.
                  This has <span className="text-text-primary font-medium">never happened</span> in any developed country that fell below 1.6.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-muted text-xs mb-1">CBO Assumes</p>
                <p className="font-mono text-3xl font-bold text-accent">1.53</p>
                <p className="text-muted text-xs mt-1">Constant through 2056</p>
              </div>
              <div className="p-4 bg-surface/50 rounded-lg border border-muted/20">
                <p className="text-muted text-xs mb-1">Historical Pattern</p>
                <p className="text-sm text-text-primary font-medium mt-2">
                  Every country that crossed 1.6 kept falling. South Korea went from 1.6 → 0.72 in 18 years. No country has found the floor.
                </p>
              </div>
              <div className="text-center p-4 bg-danger/10 rounded-lg border border-danger/20">
                <p className="text-muted text-xs mb-1">Actual 2024 TFR</p>
                <p className="font-mono text-3xl font-bold text-danger">1.599</p>
                <p className="text-muted text-xs mt-1">CDC NCHS — and still falling</p>
              </div>
            </div>

            <p className="text-xs text-muted/60 italic">
              Additional factor: the fertile generation is shrinking. Fewer women of childbearing age = fewer births even at the same TFR.
              The 2000s birth cohort entering peak fertility is already significantly smaller than the 1990s cohort.
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 3 — The Big Lie
        ══════════════════════════════════════════════════════════════ */}

        {/* 3a: Title */}
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-10">
            <div className="text-sm text-danger font-mono mb-4 tracking-wider uppercase">The Big Lie</div>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              Where the Growth Actually Comes From
            </h3>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              The CBO projects the US will grow to 364 million by 2056. Here&apos;s what they&apos;re not saying out loud.
            </p>
          </div>
        </ScrollReveal>

        {/* 3b: Stacked area chart */}
        <ScrollReveal delay={0.15}>
          <div className="glass-card mb-8">
            <h3 className="text-lg font-bold text-text-primary mb-1">Population Growth: Natural vs. Immigration</h3>
            <p className="text-sm text-muted mb-6">
              CBO projection decomposed — all growth after 2030 is immigration
            </p>

            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={growthBreakdown} margin={{ top: 10, right: 30, bottom: 10, left: 10 }}>
                <defs>
                  <linearGradient id="usNaturalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C0392B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C0392B" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="usImmigrationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A90D9" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#4A90D9" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" />
                <XAxis dataKey="year" tick={{ fill: '#888899', fontSize: 12 }} stroke="#333355" />
                <YAxis
                  tick={{ fill: '#888899', fontSize: 12 }}
                  stroke="#333355"
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(1)}M` :
                    v > 0 ? `+${v}K` :
                    v === 0 ? '0' :
                    `${v}K`
                  }
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    `${Number(value) > 0 ? '+' : ''}${value}K`,
                    name === 'natural' ? 'Natural Increase' : 'Net Immigration (CBO assumed)',
                  ]}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  labelFormatter={(label: any) => `Year ${label}`}
                />
                <ReferenceLine
                  y={0}
                  stroke="#E8E6E3"
                  strokeDasharray="6 3"
                  label={{ value: 'Deaths = Births', fill: '#E8E6E3', fontSize: 11, position: 'insideTopLeft' }}
                />
                <Area
                  type="monotone"
                  dataKey="immigration"
                  stroke="#4A90D9"
                  strokeWidth={2}
                  fill="url(#usImmigrationGradient)"
                  name="immigration"
                />
                <Area
                  type="monotone"
                  dataKey="natural"
                  stroke="#C0392B"
                  strokeWidth={3}
                  fill="url(#usNaturalGradient)"
                  name="natural"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4A90D9]" />
                <span className="text-muted">Net Immigration (CBO assumed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <span className="text-muted">Natural Increase (births − deaths)</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3c: Danger callout */}
        <ScrollReveal delay={0.15}>
          <div className="glass-card border-2 border-danger/40 bg-danger/5 mb-8 py-8 px-6">
            <p className="text-center text-lg md:text-xl text-text-primary leading-relaxed mb-4 max-w-3xl mx-auto italic">
              &ldquo;After 2030, the CBO&apos;s growth projection is not a birth rate forecast.
              It&apos;s an <span className="text-danger font-bold">immigration forecast</span>.
              They&apos;re projecting that <span className="font-mono font-bold text-danger">~800,000</span> people
              per year will choose to move to the United States, every year, for 26 straight years.&rdquo;
            </p>
            <p className="text-center text-sm text-muted">
              The entire 19 million increase from 345M to 364M is 100% immigration. Not a single net birth.
            </p>
          </div>
        </ScrollReveal>

        {/* 3d: Three problems */}
        <ScrollReveal delay={0.2}>
          <h3 className="text-lg font-bold text-text-primary mb-4">Three Problems With That Assumption</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="glass-card border-t-4 border-danger">
              <h4 className="font-bold text-danger mb-3">1. It&apos;s Not Happening Now</h4>
              <p className="text-sm text-muted leading-relaxed">
                Net migration in 2025 is <span className="text-danger font-medium">negative</span> for the first time in 50 years.
                The CBO assumes it bounces back to +800K. Why?
              </p>
            </div>
            <div className="glass-card border-t-4 border-accent">
              <h4 className="font-bold text-accent mb-3">2. Source Countries Are Drying Up</h4>
              <p className="text-sm text-muted leading-relaxed">
                The countries that historically supplied US immigration are themselves collapsing.
                Mexico&apos;s TFR is already <span className="text-accent font-mono font-bold">1.6</span> (was 6.8 in 1970).
                China is at <span className="text-danger font-mono font-bold">1.0</span>.
                Where will 800K people/year come from by 2040?
              </p>
            </div>
            <div className="glass-card border-t-4 border-muted/50">
              <h4 className="font-bold text-text-primary mb-3">3. They Stop Having Kids</h4>
              <p className="text-sm text-muted leading-relaxed">
                Immigrants adopt host-country fertility within one generation.
                Immigration doesn&apos;t fix the birth rate — it delays the math by 20–25 years.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3e: Muted closing */}
        <ScrollReveal delay={0.2}>
          <p className="text-center text-sm text-muted/60 italic mb-14">
            Strip away the immigration assumption, and the CBO&apos;s own model shows the US population
            peaking right now and declining from 2030 onwards.
          </p>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 4 — Three Scenarios
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.15}>
          <h3 className="text-xl font-bold text-text-primary mb-2">Three Projections</h3>
          <p className="text-sm text-muted mb-6">
            The CBO&apos;s official forecast vs. what the data actually suggests.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {scenarios.map((s) => (
              <div
                key={s.name}
                className={`glass-card border ${s.border} ${s.faded ? 'opacity-60' : ''} ${
                  s.name.includes('Realistic')
                    ? 'shadow-[0_0_20px_rgba(192,57,43,0.15)]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <h4 className={`font-bold ${s.textColor}`}>{s.name}</h4>
                </div>
                <p className="text-xs text-muted mb-5">{s.subtitle}</p>

                <div className="space-y-3">
                  {[
                    { label: 'TFR Assumption', value: s.tfr },
                    { label: 'Net Immigration 2025', value: s.immigration2025 },
                    { label: 'Net Immigration 2026+', value: s.immigration2026 },
                    { label: 'Deaths > Births', value: s.deathsExceedBirths, large: true },
                    { label: 'Population Peak', value: s.populationPeak, large: true },
                    { label: 'Population 2060', value: s.population2060, large: true },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                      <span className="text-xs text-muted">{metric.label}</span>
                      <span className={`font-mono font-bold ${s.textColor} ${metric.large ? 'text-sm' : 'text-xs'}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-surface/30 rounded-lg border-l-2" style={{ borderLeftColor: s.color }}>
                  <p className="text-xs text-muted italic">{s.keyFlaw}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 5 — Already Shrinking (Brookings Data)
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.15}>
          <div className="glass-card text-center py-10 mb-14 border-2 border-accent/30">
            <p className="text-sm text-accent font-mono tracking-wider uppercase mb-4">Brookings Institution, January 2026</p>
            <p className="font-mono text-3xl md:text-5xl font-bold text-danger mb-2">
              Negative Net Migration
            </p>
            <p className="text-muted text-lg mb-8">
              2025: First time in 50 years more people left than entered
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="p-4 bg-surface/50 rounded-lg">
                <p className="text-xs text-muted mb-1">Net Migration</p>
                <p className="font-mono text-lg font-bold text-danger">−10K to −295K</p>
              </div>
              <div className="p-4 bg-surface/50 rounded-lg">
                <p className="text-xs text-muted mb-1">Natural Increase</p>
                <p className="font-mono text-lg font-bold text-accent">+~550K</p>
                <p className="text-xs text-muted">(narrowing fast)</p>
              </div>
              <div className="p-4 bg-surface/50 rounded-lg">
                <p className="text-xs text-muted mb-1">Combined Growth</p>
                <p className="font-mono text-lg font-bold text-text-primary">~250K–540K</p>
                <p className="text-xs text-muted">Slowest since the Great Depression</p>
              </div>
              <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
                <p className="text-xs text-muted mb-1">Realistic Scenario</p>
                <p className="font-mono text-lg font-bold text-danger">Peaked</p>
                <p className="text-xs text-muted">US population peaked in 2025</p>
              </div>
            </div>

            <p className="text-xs text-muted/50">
              Sources: Brookings Institution (Jan 2026), CDC NCHS, Census Bureau
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════════════════════
            Part 6 — The Feedback Loop
        ══════════════════════════════════════════════════════════════ */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-text-primary mb-2">The Demographic Feedback Loop</h3>
            <p className="text-sm text-muted">Once it starts, it accelerates itself</p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              className="space-y-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {feedbackSteps.map((step, i) => (
                <motion.div key={step.label} variants={staggerItem}>
                  <div className={`flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm border border-white/5 ${
                    i === 0 ? 'rounded-t-xl' : ''
                  } ${i === feedbackSteps.length - 1 ? 'rounded-b-xl' : 'border-b-0'}`}>
                    <span className="text-2xl flex-shrink-0">{step.icon}</span>
                    <p className={`font-medium text-sm ${step.color}`}>{step.label}</p>
                  </div>
                  {i < feedbackSteps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <span className="text-muted/40 text-lg">↓</span>
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div variants={staggerItem} className="flex justify-center pt-3">
                <div className="text-center">
                  <span className="text-danger text-3xl">↻</span>
                  <p className="text-xs text-danger font-mono mt-1">Loop accelerates</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* ── Sources ── */}
        <div className="mt-14 pt-6 border-t border-muted/10">
          <p className="text-xs text-muted/40 leading-relaxed">
            Sources: CBO &ldquo;The Demographic Outlook: 2026 to 2056&rdquo; (Jan 2026) &bull;
            CBO &ldquo;An Update to the Demographic Outlook, 2025 to 2055&rdquo; (Sep 2025) &bull;
            CBO &ldquo;The Demographic Outlook: 2025 to 2055&rdquo; (Jan 2025) &bull;
            CBO &ldquo;The Demographic Outlook: 2022 to 2052&rdquo; (Jan 2022) &bull;
            CDC NCHS Final Birth Data 2024 (Jul 2025): 3,628,934 births, TFR 1.599 &bull;
            CDC NCHS Provisional Death Data 2024: 3,072,039 deaths &bull;
            Brookings Institution (Jan 2026): Net migration estimates &bull;
            Census Bureau: US population ~342M mid-2025 &bull;
            INEGI ENADID 2023: Mexico TFR 1.60 &bull; UN WPP 2024
          </p>
        </div>

      </div>
    </section>
  );
}
