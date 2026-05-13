import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import PoweredBy from '@/components/landing/PoweredBy';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import GlobalReach from '@/components/landing/GlobalReach';
import WaitlistCTA from '@/components/landing/WaitlistCTA';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <PoweredBy />
      <FeaturesGrid />
      <HowItWorks />
      <GlobalReach />
      <WaitlistCTA />
      <Footer />
    </main>
  );
};

export default Index;
