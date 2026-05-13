import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'surface-glass border-b border-border/50'
          : 'bg-background/40 backdrop-blur-sm border-b border-border/20'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="h-6 w-6 rounded-md bg-spectrum shadow-[0_0_20px_hsl(var(--spectrum-violet)/0.6)]" />
          <span className="text-lg">Bill-Ads</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#about" className="hover:text-foreground transition-colors">About us</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact us</a>
        </div>
        <Button
          asChild
          className="bg-spectrum text-primary-foreground hover:opacity-90 border-0 rounded-full px-5"
        >
          <a href="#waitlist">Join waitlist</a>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
