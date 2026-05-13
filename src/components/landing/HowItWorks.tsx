import { PenTool, MapPin, Rocket } from 'lucide-react';

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

export default HowItWorks;
