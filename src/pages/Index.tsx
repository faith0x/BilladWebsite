import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Content from '@/components/landing/Content';
import Footer from '@/components/landing/Footer';

const Index = () => (
  <main className="relative bg-background text-foreground overflow-x-hidden">
    <Navbar />
    <Hero />
    <Content />
    <Footer />
  </main>
);

export default Index;
