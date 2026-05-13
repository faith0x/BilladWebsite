import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const WaitlistCTA = () => {
  const [email, setEmail] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list. We'll be in touch.");
    setEmail('');
  };

  return (
    <section id="waitlist" className="relative py-24 md:py-32" aria-label="Join waitlist">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden surface-glass p-10 md:p-20 text-center">
          <div className="absolute inset-0 bg-aurora opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-7xl font-bold leading-[1.02]">
              Put your art on{' '}
              <span className="text-gradient-spectrum">the world's billboards</span>.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Join the waitlist. Early members get launch credits and priority access to premium inventory.
            </p>
            <form onSubmit={onSubmit} className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="h-12 rounded-full bg-background/60 border-border/60 px-5"
              />
              <Button
                type="submit"
                className="h-12 rounded-full bg-spectrum text-primary-foreground border-0 hover:opacity-90 px-6 glow-primary"
              >
                Join waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
