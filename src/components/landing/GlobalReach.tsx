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

        {/* faux world dots */}
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

export default GlobalReach;
