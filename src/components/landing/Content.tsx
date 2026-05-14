import { MapPin, Layers, Brain, Rocket, PenTool } from 'lucide-react';

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: MapPin,
    title: 'GIS Geospatial AI',
    tagline: 'Outdoor marketing intelligence.',
    body: 'A geo-aware AI built specifically for OOH planning. Bill-Ads understands street networks, audience movement, commuter corridors and neighborhood character — so every placement is informed by where your customers actually live, work and travel. Plan media at street-level, not at city-level.',
    hue: 'from-spectrum-pink to-spectrum-violet',
  },
  {
    icon: Layers,
    title: 'OOH Refit Intelligence',
    tagline: 'One ad, every billboard.',
    body: 'Upload a single creative and our refit engine auto-adapts it to any billboard — landscape, portrait, ultrawide, LED, static, day or night. Bill-Ads recomposes layout, scales typography, balances brightness and protects safe zones, so your brand looks intentional everywhere. No design rework, no wasted hours.',
    hue: 'from-spectrum-violet to-spectrum-indigo',
  },
  {
    icon: Brain,
    title: 'Environment & RWI Awareness',
    tagline: 'Decisions grounded in the real world.',
    body: 'Real World Index (RWI) blends weather, footfall, events, dwell time, traffic and surrounding context into a single live signal. Bill-Ads surfaces the placements where context is on your side — so your spend follows attention, not assumptions.',
    hue: 'from-spectrum-indigo to-spectrum-cyan',
  },
  {
    icon: Rocket,
    title: 'Manage & Track Campaigns',
    tagline: 'From your couch to the world stage.',
    body: 'Build, launch, manage and track full campaigns inside one app. Pause, swap creatives, expand to new cities, and watch live impressions, spend, reach and dwell — across every billboard, in every market, in real time.',
    hue: 'from-spectrum-cyan to-spectrum-mint',
  },
];

const Features = () => (
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

// ─── How It Works ───────────────────────────────────────────────────────────
const STEPS = [
  {
    icon: PenTool,
    title: 'Create a campaign',
    body: 'Set your brand, creative, goals and budget inside Bill-Ads. One brief, ready for any city.',
  },
  {
    icon: MapPin,
    title: 'Select a billboard',
    body: 'Browse global inventory by city, audience and RWI signals. Pick one billboard, or hundreds.',
  },
  {
    icon: Rocket,
    title: 'Pay & launch',
    body: 'Check out securely, and your ad goes live on the billboard. Track impressions in real time.',
  },
];

const HowItWorks = () => (
  <section id="how" className="relative py-24 md:py-32" aria-label="How it works">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">How it works</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
          Three steps. <span className="text-gradient-spectrum">One global stage.</span>
        </h2>
      </div>
      <div className="relative grid md:grid-cols-3 gap-6">
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-spectrum opacity-50" />
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="relative surface-glass rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-spectrum text-primary-foreground flex items-center justify-center font-display font-semibold">
                {i + 1}
              </div>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Global Reach ─────────────────────────────────────────────────────────────
const STATS = [
  { k: '120+', v: 'Cities online' },
  { k: '8,400', v: 'Connected billboards' },
  { k: '42M', v: 'Daily impressions' },
  { k: '24/7', v: 'Live monitoring' },
];

const GlobalReach = () => (
  <section className="relative py-24 md:py-32" aria-label="Global reach">
    <div className="container">
      <div className="surface-glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-40" aria-hidden />
        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Global reach</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              From your gallery to <span className="text-gradient-spectrum">every street that matters</span>.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              A growing network of premium OOH inventory — connected, audited and ready for your next campaign.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ k, v }) => (
              <div key={v} className="surface-glass rounded-2xl p-6">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-spectrum">{k}</div>
                <div className="text-sm text-muted-foreground mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-32 opacity-30 pointer-events-none"
          viewBox="0 0 800 100"
          aria-hidden
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 137) % 800}
              cy={(i * 53) % 100}
              r={1.5}
              fill="hsl(var(--spectrum-cyan))"
            />
          ))}
        </svg>
      </div>
    </div>
  </section>
);

// ─── Waitlist CTA ─────────────────────────────────────────────────────────────
const WaitlistCTA = () => (
  <section id="waitlist" className="relative py-24 md:py-32" aria-label="Waitlist">
    <div className="container">
      <div className="surface-glass rounded-3xl p-10 md:p-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-aurora opacity-40" aria-hidden />
        <div className="relative">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Get exclusive <span className="text-gradient-spectrum">early access</span>.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Join the waitlist for our upcoming global launch. We're selecting a limited number of brands for early access.
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-[240px] h-12 rounded-full border-border bg-card px-5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="h-12 px-6 rounded-full bg-gradient-spectrum text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
              Join waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Export ───────────────────────────────────────────────────────────────────
const Content = () => (
  <>
    <Features />
    <HowItWorks />
    <GlobalReach />
    <WaitlistCTA />
  </>
);

export default Content;

