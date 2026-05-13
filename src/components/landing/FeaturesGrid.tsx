import { MapPin, Layers, Brain, Rocket, type LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  hue: string;
};

const FEATURES: Feature[] = [
  {
    icon: MapPin,
    title: 'GIS Geospatial AI',
    tagline: 'Outdoor marketing intelligence.',
    body:
      'A geo-aware AI built specifically for OOH planning. Bill-Ads understands street networks, audience movement, commuter corridors and neighborhood character — so every placement is informed by where your customers actually live, work and travel. Plan media at street-level, not at city-level.',
    hue: 'from-spectrum-pink to-spectrum-violet',
  },
  {
    icon: Layers,
    title: 'OOH Refit Intelligence',
    tagline: 'One ad, every billboard.',
    body:
      'Upload a single creative and our refit engine auto-adapts it to any billboard — landscape, portrait, ultrawide, LED, static, day or night. Bill-Ads recomposes layout, scales typography, balances brightness and protects safe zones, so your brand looks intentional everywhere. No design rework, no wasted hours.',
    hue: 'from-spectrum-violet to-spectrum-indigo',
  },
  {
    icon: Brain,
    title: 'Environment & RWI Awareness',
    tagline: 'Decisions grounded in the real world.',
    body:
      'Real World Index (RWI) blends weather, footfall, events, dwell time, traffic and surrounding context into a single live signal. Bill-Ads surfaces the placements where context is on your side — so your spend follows attention, not assumptions.',
    hue: 'from-spectrum-indigo to-spectrum-cyan',
  },
  {
    icon: Rocket,
    title: 'Manage & Track Campaigns',
    tagline: 'From your couch to the world stage.',
    body:
      'Build, launch, manage and track full campaigns inside one app. Pause, swap creatives, expand to new cities, and watch live impressions, spend, reach and dwell — across every billboard, in every market, in real time.',
    hue: 'from-spectrum-cyan to-spectrum-mint',
  },
];

const FeaturesGrid = () => (
  <section id="features" className="relative py-16 md:py-20" aria-label="Features">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Platform</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
          The intelligence layer for{' '}
          <span className="text-gradient-spectrum">outdoor advertising</span>.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {FEATURES.map(({ icon: Icon, title, tagline, body, hue }) => (
          <article
            key={title}
            className="group relative surface-glass rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-border hover:-translate-y-1"
          >
            <div className={`absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br ${hue} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
            <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${hue} text-primary-foreground shadow-[0_8px_30px_hsl(var(--spectrum-violet)/0.3)]`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="relative mt-6 font-display text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="relative mt-2 text-sm text-gradient-spectrum font-medium">{tagline}</p>
            <p className="relative mt-4 text-muted-foreground leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;

