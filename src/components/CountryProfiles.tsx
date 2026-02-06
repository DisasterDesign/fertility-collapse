'use client';

import ScrollReveal from './ScrollReveal';

const profiles = [
  {
    name: 'South Korea',
    emoji: '🇰🇷',
    tfr: 0.75,
    keyStat: 'Seoul: 0.55',
    narrative: '$270B in incentives. Zero effect. 63% of income goes to mortgage. The lowest fertility rate in recorded human history.',
    color: '#C0392B',
  },
  {
    name: 'Japan',
    emoji: '🇯🇵',
    tfr: 1.20,
    keyStat: '11% would fight',
    narrative: 'The lowest willingness to fight for country globally. Calhoun\'s "beautiful ones" — below replacement since 1974. 50 years and counting.',
    color: '#E74C3C',
  },
  {
    name: 'Iran',
    emoji: '🇮🇷',
    tfr: 2.08,
    keyStat: '7.0 → 1.7 → 2.08',
    narrative: 'Fastest decline ever recorded. The Islamic Revolution couldn\'t stop it. Slight bounce during economic crisis — stress sometimes raises fertility.',
    color: '#E67E22',
  },
  {
    name: 'Ukraine',
    emoji: '🇺🇦',
    tfr: 0.90,
    keyStat: 'War = accelerant',
    narrative: 'GDP collapsed, millions fled. War drove fertility lower. The exact opposite response to Israel\'s war baby boom. Same stimulus, opposite effect.',
    color: '#8B0000',
  },
  {
    name: 'Sweden',
    emoji: '🇸🇪',
    tfr: 1.50,
    keyStat: '$52K GDP, 480 days leave',
    narrative: 'The perfect welfare state. Universal healthcare, subsidized childcare, 480 days parental leave. Still below replacement. Welfare can\'t fix aspiration.',
    color: '#E67E22',
  },
  {
    name: 'Morocco',
    emoji: '🇲🇦',
    tfr: 1.97,
    keyStat: 'Collapsed at $3,800 GDP',
    narrative: 'A smartphone in Casablanca delivers the same aspiration as a penthouse in Stockholm. You don\'t need to be rich to stop having children.',
    color: '#F1C40F',
  },
  {
    name: 'Egypt',
    emoji: '🇪🇬',
    tfr: 2.41,
    keyStat: '5 governorates = 45% of births',
    narrative: 'A split country. Rose from 3.0 to 3.5 between 2006–2014, then fell again. Rural Egypt and urban Cairo are different civilizations.',
    color: '#27AE60',
  },
  {
    name: 'Nigeria',
    emoji: '🇳🇬',
    tfr: 4.80,
    keyStat: 'Lagos 3.6, Sokoto 7.2',
    narrative: 'The full model in one country. Southern Nigeria is modernizing and fertility is falling. Northern Nigeria looks like 1960. The entire thesis in miniature.',
    color: '#1B7A3D',
  },
  {
    name: 'Israel',
    emoji: '🇮🇱',
    tfr: 2.90,
    keyStat: 'P(collapse) = 87%',
    narrative: 'The anomaly. 93% urban, 90% internet, $42K GDP, 13 years education. Should have collapsed decades ago. It didn\'t. We don\'t know why.',
    color: '#D4880F',
  },
];

export default function CountryProfiles() {
  return (
    <section id="profiles" className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-sm text-accent font-mono mb-4 tracking-wider uppercase">Case Studies</div>
          <h2 className="section-title">Nine Countries, Nine Stories</h2>
          <p className="section-subtitle">
            Each country tells a different chapter of the same story.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-5 min-w-max">
              {profiles.map((profile) => (
                <div key={profile.name} className="glass-card w-[300px] flex-shrink-0 hover:border-accent/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{profile.emoji}</span>
                    <div>
                      <h3 className="font-bold text-text-primary">{profile.name}</h3>
                      <span className="font-mono text-xs text-muted">{profile.keyStat}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-mono text-3xl font-bold" style={{ color: profile.color }}>
                      {profile.tfr.toFixed(2)}
                    </span>
                    <span className="text-muted text-sm ml-2">TFR</span>
                  </div>

                  <p className="text-sm text-muted leading-relaxed">{profile.narrative}</p>

                  <div className="mt-4 h-1 rounded-full overflow-hidden bg-surface">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: profile.color,
                        width: `${Math.min((profile.tfr / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
