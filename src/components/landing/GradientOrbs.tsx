const GradientOrbs = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
    <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-spectrum-violet/30 blur-[120px] animate-orb-drift" />
    <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-spectrum-pink/25 blur-[120px] animate-orb-drift [animation-delay:-4s]" />
    <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-spectrum-cyan/25 blur-[120px] animate-orb-drift [animation-delay:-8s]" />
    <div className="absolute -bottom-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-spectrum-mint/20 blur-[120px] animate-orb-drift [animation-delay:-2s]" />
  </div>
);

export default GradientOrbs;
