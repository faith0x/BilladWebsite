import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollProgress, range, lerp } from '@/hooks/useScrollProgress';

const VIDEO_SRC =
  'https://res.cloudinary.com/dnkzhdbo1/video/upload/v1778661661/lv_0_20260513091536_mf8rhd.mp4';
const VIDEO_DURATION = 15;

// ─── Layout ───────────────────────────────────────────────────────────────────
const NAVBAR_PX = 64;
const CARD_VH = 75;          // hero card height (shows content below)
const SCROLL_VH = 140;       // scroll distance for full 15s video scrub
const SECTION_VH = CARD_VH + SCROLL_VH; // 215vh total — zero dead space

const LINES = ['Put your Brand', 'on any billboard', 'in the world.'];
const LINE_PEAKS = [0.12, 0.42, 0.72];

// ─── Inline Gradient Orbs ───────────────────────────────────────────────────
const GradientOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-spectrum-violet/30 blur-[120px] animate-orb-drift" />
    <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-spectrum-pink/25 blur-[120px] animate-orb-drift [animation-delay:-4s]" />
    <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-spectrum-cyan/25 blur-[120px] animate-orb-drift [animation-delay:-8s]" />
    <div className="absolute -bottom-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-spectrum-mint/20 blur-[120px] animate-orb-drift [animation-delay:-2s]" />
  </div>
);

// ─── Inline Powered By Marquee ────────────────────────────────────────────────
const PARTNERS = [
  'OpenStreetMap', 'OSM Highway Tags', 'USDOT HPMS / State DOTs',
  'U.S. Census Bureau Gazetteer', 'ONS Office of National Statistics',
  'UK Government (MHCLG)', 'WorldPop', 'Facebook', 'Mapbox',
];

const PoweredByMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos += speed;
      const firstChild = track.firstElementChild as HTMLElement | null;
      if (firstChild && pos >= firstChild.offsetWidth + 16) {
        pos -= firstChild.offsetWidth + 16;
        track.appendChild(firstChild);
      }
      track.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = Array.from({ length: 4 }).flatMap(() => PARTNERS);

  return (
    <section className="relative py-8 md:py-10 overflow-hidden" aria-label="Powered by">
      <div className="container mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
          Powered by
        </p>
      </div>
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="flex overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-4 will-change-transform">
            {items.map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full surface-glass border border-border/40 whitespace-nowrap shrink-0 min-w-[10rem]"
              >
                <span className="text-[13px] font-semibold text-foreground tracking-wide text-center leading-snug">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(CARD_VH, NAVBAR_PX);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Wait for video before seeking
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    if (v.readyState >= 2) setVideoReady(true);
    else {
      v.addEventListener('loadeddata', onReady);
      v.addEventListener('canplay', onReady);
    }
    return () => {
      v.removeEventListener('loadeddata', onReady);
      v.removeEventListener('canplay', onReady);
    };
  }, []);

  // Scroll-scrubbed video with keyframe snap
  useEffect(() => {
    if (!videoReady) return;
    const raw = progress * VIDEO_DURATION;
    const nearest = Math.round(raw / 0.9) * 0.9;
    const target = raw * 0.7 + nearest * 0.3;
    targetTimeRef.current = Math.min(VIDEO_DURATION - 0.01, Math.max(0, target));

    if (rafRef.current != null) return;
    const tick = () => {
      const v = videoRef.current;
      if (!v) { rafRef.current = null; return; }
      const diff = targetTimeRef.current - v.currentTime;
      if (Math.abs(diff) < 0.005) { rafRef.current = null; return; }
      v.currentTime += diff * 0.18;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [progress, videoReady]);

  useEffect(() => {
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, []);

  // 3D text line animations
  const lineStyle = (i: number) => {
    const peak = LINE_PEAKS[i];
    const start = Math.max(0, peak - 0.18);
    const t = range(progress, start, peak);
    const yVh = lerp(54, 0, t);
    const rx = lerp(42, 0, t);
    const scale = lerp(0.5, 1, t);
    const opacity = t === 0 ? 0 : lerp(0, 1, Math.min(1, t * 1.4));
    const blur = lerp(10, 0, t);
    const fadeOutStart = i < 2 ? LINE_PEAKS[i + 1] - 0.05 : 0.92;
    const fadeOutEnd = i < 2 ? LINE_PEAKS[i + 1] + 0.05 : 1.0;
    const out = range(progress, fadeOutStart, fadeOutEnd);
    return {
      transform: `translate3d(0, ${yVh}%, 0) rotateX(${rx}deg) scale(${scale})`,
      opacity: opacity * (1 - out),
      filter: `blur(${blur}px)`,
      transformStyle: 'preserve-3d' as const,
    };
  };

  const ctaProgress = range(progress, 0.82, 0.96);

  return (
    <>
      {/* Scroll-scrub hero section */}
      <section
        ref={ref}
        className="relative"
        style={{ height: `${SECTION_VH}vh` }}
        aria-label="Hero"
      >
        <div
          className="sticky top-16 w-full overflow-hidden flex flex-col items-center justify-start px-3 md:px-6 pt-3 md:pt-4"
          style={{ height: `${CARD_VH}vh` }}
        >
          <GradientOrbs />

          <div
            className="relative w-full rounded-2xl md:rounded-3xl bg-black overflow-hidden shadow-[0_40px_120px_-20px_hsl(var(--spectrum-violet)/0.55)]"
            style={{
              aspectRatio: '16 / 9',
              maxHeight: '100%',
              maxWidth: `calc((${CARD_VH}vh - 1.5rem) * 16 / 9)`,
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/60 pointer-events-none" />

            <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/80 border border-white/15">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-spectrum-mint mr-2 animate-pulse-glow align-middle" />
              Out-of-home, on-demand
            </div>

            <h1
              className="absolute inset-0 z-10 flex flex-col items-center justify-center font-display font-bold text-center px-4 pointer-events-none"
              style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
            >
              {LINES.map((line, i) => (
                <span
                  key={line}
                  className="block text-[clamp(1.6rem,6vw,5.5rem)] leading-[1.05] text-gradient-spectrum will-change-transform"
                  style={lineStyle(i)}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div
              className="absolute inset-x-0 bottom-5 md:bottom-8 z-10 flex flex-col items-center gap-3 md:gap-4 px-4 text-center"
              style={{
                opacity: ctaProgress,
                transform: `translateY(${lerp(20, 0, ctaProgress)}px)`,
              }}
            >
              <p className="max-w-xl text-xs md:text-sm text-white/80">
                A global billboard marketplace — powered by geospatial AI.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-spectrum text-primary-foreground hover:opacity-90 border-0 rounded-full px-5 md:px-7 h-10 md:h-11 font-medium glow-primary"
                >
                  <a href="#waitlist">
                    Join waitlist <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full px-5 h-10 md:h-11 border-neutral-300 text-neutral-800 hover:bg-neutral-100 bg-white"
                >
                  <a href="#how">
                    <Play className="mr-2 h-4 w-4" /> How it works
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div
            className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            style={{ opacity: lerp(1, 0, range(progress, 0, 0.1)) }}
          >
            Scroll to explore
          </div>
        </div>
      </section>

      {/* Powered by — zero gap, immediately follows */}
      <PoweredByMarquee />
    </>
  );
};

export default Hero;
