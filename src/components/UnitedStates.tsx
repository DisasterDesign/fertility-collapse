'use client';

import {
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, Tooltip, Area, AreaChart,
} from 'recharts';
import ScrollReveal from './ScrollReveal';

// ─── Data ────────────────────────────────────────────────────────────
const cboProjection = [
  { year: 2024, pop: 340 },
  { year: 2027, pop: 345 },
  { year: 2030, pop: 350 },
  { year: 2035, pop: 357 },
  { year: 2040, pop: 364 },
  { year: 2045, pop: 370 },
  { year: 2050, pop: 377 },
  { year: 2054, pop: 383 },
];

const usTfrDecline = [
  { year: 2007, tfr: 2.12 },
  { year: 2010, tfr: 1.93 },
  { year: 2012, tfr: 1.88 },
  { year: 2015, tfr: 1.84 },
  { year: 2017, tfr: 1.77 },
  { year: 2019, tfr: 1.71 },
  { year: 2020, tfr: 1.64 },
  { year: 2021, tfr: 1.66 },
  { year: 2022, tfr: 1.67 },
  { year: 2023, tfr: 1.62 },
];

const scenarios = [
  {
    name: 'CBO Official',
    tfr: '1.70',
    immigration: '1.1M',
    pop2054: '383M',
    workingAge: '59%',
    dependency: '70 : 100',
    color: '#D4880F',
    border: 'border-accent/30',
    bg: 'bg-accent/5',
    textColor: 'text-accent',
  },
  {
    name: 'Moderate Decline',
    tfr: '1.50',
    immigration: '800K',
    pop2054: '355M',
    workingAge: '56%',
    dependency: '79 : 100',
    color: '#888899',
    border: 'border-muted/30',
    bg: 'bg-surface/50',
    textColor: 'text-muted',
  },
  {
    name: 'Realistic Projection',
    tfr: '1.30',
    immigration: '600K',
    pop2054: '330M',
    workingAge: '52%',
    dependency: '92 : 100',
    color: '#C0392B',
    border: 'border-danger/30',
    bg: 'bg-danger/5',
    textColor: 'text-danger',
  },
];

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

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Case Study</div>
          <h2 className="section-title">The United States Story</h2>
          <p className="section-subtitle">
            The world&apos;s largest economy faces a demographic reckoning hidden beneath optimistic projections.
            What happens when the assumptions break?
          </p>
        </ScrollReveal>

        {/* ── CBO Population Projection Chart ── */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card mb-10">
            <h3 className="text-lg font-bold text-text-primary mb-1">CBO Population Projection</h3>
            <p className="text-sm text-muted mb-6">
              Congressional Budget Office projects steady growth through 2054
            </p>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={cboProjection} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                <defs>
                  <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4880F" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#D4880F" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" />
                <XAxis dataKey="year" tick={{ fill: '#888899', fontSize: 12 }} stroke="#333355" />
                <YAxis
                  domain={[320, 400]}
                  tick={{ fill: '#888899', fontSize: 12 }}
                  stroke="#333355"
                  tickFormatter={(v: number) => `${v}M`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number | undefined) => [`${value ?? 0}M`, 'Population']}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  labelFormatter={(label: any) => `Year ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="pop"
                  stroke="#D4880F"
                  strokeWidth={3}
                  fill="url(#popGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex justify-between text-sm mt-4 px-2">
              <div>
                <span className="text-muted">2024:</span>{' '}
                <span className="font-mono text-accent font-bold">340M</span>
              </div>
              <div>
                <span className="text-muted">2054:</span>{' '}
                <span className="font-mono text-accent font-bold">383M</span>
                <span className="text-muted ml-2">(+12.6%)</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── The Hidden Assumption ── */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card border-l-4 border-accent mb-10">
            <div className="flex items-start gap-3 mb-5">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-text-primary">The Hidden Assumption</h3>
                <p className="text-sm text-muted">
                  CBO&apos;s entire projection rests on a fertility rate that hasn&apos;t existed since 2019
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-muted text-xs mb-1">CBO Assumes</p>
                <p className="font-mono text-3xl font-bold text-accent">1.70</p>
                <p className="text-muted text-xs mt-1">TFR (constant through 2054)</p>
              </div>
              <div className="text-center p-4 bg-danger/10 rounded-lg border border-danger/20">
                <p className="text-muted text-xs mb-1">Actual (2023)</p>
                <p className="font-mono text-3xl font-bold text-danger">1.62</p>
                <p className="text-muted text-xs mt-1">TFR and still declining</p>
              </div>
            </div>

            <p className="text-sm text-muted mb-4">U.S. Total Fertility Rate — 2007 to 2023 (CDC)</p>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={usTfrDecline} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                <defs>
                  <linearGradient id="tfrUsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C0392B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#C0392B" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" />
                <XAxis dataKey="year" tick={{ fill: '#888899', fontSize: 12 }} stroke="#333355" />
                <YAxis
                  domain={[1.4, 2.3]}
                  tick={{ fill: '#888899', fontSize: 12 }}
                  stroke="#333355"
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number | undefined) => [(value ?? 0).toFixed(2), 'TFR']}
                />
                <ReferenceLine
                  y={2.1}
                  stroke="#27AE60"
                  strokeDasharray="8 4"
                  label={{ value: 'Replacement (2.1)', fill: '#27AE60', fontSize: 11, position: 'insideTopRight' }}
                />
                <ReferenceLine
                  y={1.7}
                  stroke="#D4880F"
                  strokeDasharray="6 3"
                  label={{ value: 'CBO Assumption (1.70)', fill: '#D4880F', fontSize: 11, position: 'insideBottomRight' }}
                />
                <Area
                  type="monotone"
                  dataKey="tfr"
                  stroke="#C0392B"
                  strokeWidth={3}
                  fill="url(#tfrUsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>

            <p className="text-xs text-muted/60 mt-3 text-center italic">
              CBO projects this will reverse to 1.70 and hold constant for 30 years
            </p>
          </div>
        </ScrollReveal>

        {/* ── Three Scenarios ── */}
        <ScrollReveal delay={0.15}>
          <h3 className="text-xl font-bold text-text-primary mb-2">Three Projections for 2054</h3>
          <p className="text-sm text-muted mb-6">
            What if the CBO&apos;s assumptions are wrong? Here&apos;s what the numbers look like under different fertility and immigration scenarios.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {scenarios.map((s) => (
              <div key={s.name} className={`glass-card border ${s.border}`}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <h4 className={`font-bold ${s.textColor}`}>{s.name}</h4>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'TFR Assumption', value: s.tfr },
                    { label: 'Net Immigration / yr', value: s.immigration },
                    { label: '2054 Population', value: s.pop2054 },
                    { label: 'Working-Age Share', value: s.workingAge },
                    { label: 'Dependency Ratio', value: s.dependency },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                      <span className="text-sm text-muted">{metric.label}</span>
                      <span className={`font-mono text-sm font-bold ${s.textColor}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Immigration Declining Too ── */}
        <ScrollReveal delay={0.15}>
          <div className="glass-card border-l-4 border-blue-accent mb-10">
            <div className="flex items-start gap-3 mb-5">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="text-lg font-bold text-blue-accent">Immigration Assumptions May Also Be Optimistic</h3>
                <p className="text-xs text-muted">Source: Brookings Institution, 2024</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <p className="text-muted text-xs mb-1">2010s Average</p>
                <p className="font-mono text-2xl font-bold text-text-primary">1.2M</p>
                <p className="text-muted text-xs">per year</p>
              </div>
              <div className="text-center p-4 bg-surface/50 rounded-lg">
                <p className="text-muted text-xs mb-1">2020–2023 Avg</p>
                <p className="font-mono text-2xl font-bold text-accent">950K</p>
                <p className="text-muted text-xs">per year</p>
              </div>
              <div className="text-center p-4 bg-danger/10 rounded-lg border border-danger/30">
                <p className="text-muted text-xs mb-1">Projected Trend</p>
                <p className="font-mono text-2xl font-bold text-danger">↓</p>
                <p className="text-muted text-xs">declining</p>
              </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              CBO assumes <span className="text-text-primary font-medium">1.1 million net immigrants annually</span> through 2054.
              Growing political polarization around immigration policy and aging populations in traditional source countries
              suggest this figure may be significantly optimistic.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
