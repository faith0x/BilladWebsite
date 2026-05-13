import { Smartphone, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileComingSoon = () => (
  <section className="relative py-20 md:py-28" aria-label="Coming soon on mobile">
    <div className="container">
      <div className="surface-glass rounded-3xl p-8 md:p-12 grid md:grid-cols-[1.4fr,1fr] gap-10 items-center overflow-hidden relative">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-spectrum-pink/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 surface-glass rounded-full px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-5">
            <Smartphone className="h-3.5 w-3.5" /> Coming soon
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Coming soon on your <span className="text-gradient-spectrum">mobile device</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Launch and track campaigns from your pocket. iOS and Android apps land alongside our public release.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="outline" className="surface-glass border-border/60 rounded-xl h-12 px-5">
              <span className="mr-2 text-xs text-muted-foreground">Coming to</span>
              <span className="font-display font-semibold">App Store</span>
            </Button>
            <Button variant="outline" className="surface-glass border-border/60 rounded-xl h-12 px-5">
              <span className="mr-2 text-xs text-muted-foreground">Coming to</span>
              <span className="font-display font-semibold">Google Play</span>
            </Button>
            <Button className="bg-spectrum text-primary-foreground border-0 rounded-xl h-12 px-5 hover:opacity-90">
              <Bell className="mr-2 h-4 w-4" /> Notify me
            </Button>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto">
          <div className="relative w-[220px] h-[440px] rounded-[2.4rem] surface-glass border border-border/60 p-2 shadow-[0_30px_80px_-20px_hsl(var(--spectrum-violet)/0.5)]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-background/80" />
            <div className="h-full w-full rounded-[1.9rem] bg-spectrum p-[1px]">
              <div className="h-full w-full rounded-[1.85rem] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-3 text-center px-5">
                <div className="h-10 w-10 rounded-2xl bg-spectrum animate-pulse-glow" />
                <p className="font-display font-semibold">Hoarding</p>
                <p className="text-xs text-muted-foreground">Launch global OOH campaigns from anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MobileComingSoon;
