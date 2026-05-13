import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useScrollProgress, range, lerp } from '@/hooks/useScrollProgress';
import GradientOrbs from './GradientOrbs';

const LINES = ['Put your Brand', 'on any billboard', 'in the world.'];
const VIDEO_SRC =
  'https://res.cloudinary.com/dnkzhdbo1/video/upload/v1778661661/lv_0_20260513091536_mf8rhd.mp4';
const VIDEO_DURATION = 15; // seconds
const KEYFRAME_STEP = 0.9; // seconds — sync points

// ─── Layout constants ───────────────────────────────────────────────────────
// The sticky card occupies this fraction of the viewport height.
// ~72 vh leaves ~28 vh below it (minus navbar) so the next section peeks.
const CARD_VH = 72; // vh

// Tall enough that the user has plenty of room to scrub the full video.
// scrollable height = SECTION_VH - 100vh.  At 550 vh → 450 vh to scrub.
const SECTION_VH = 550;

const Hero = () => {
  // lockUntilComplete=true → wheel/touch are intercepted until progress===1
  const { ref, progress } = useScrollProgress<HTMLDivElement>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Map scroll progress → video time with soft keyframe snap
  useEffect(() => {
    const raw = progress * VIDEO_DURATION;
    const nearest = Math.round(raw / KEYFRAME_STEP) * KEYFRAME_STEP;
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
  }, [progress]);

  useEffect(() => {
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Text lines synced to video keyframes
  const LINE_PEAKS = [0.12, 0.42, 0.72];
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
    const fadeOutEnd   = i < 2 ? LINE_PEAKS[i + 1] + 0.05 : 1.0;
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
    <section
      ref={ref}
      className="relative"
      // Tall section — user must scroll through the whole thing
      style={{ height: `${SECTION_VH}vh` }}
      aria-label="Hero"
    >
      {/*
        Sticky wrapper — shorter than 100 vh so the section below peeks.
        top-16 accounts for the fixed navbar (64 px).
        Height = CARD_VH vh → card is fully visible + next section shows below.
      */}
      <div
        className="sticky top-16 w-full overflow-hidden flex flex-col items-center justify-start px-3 md:px-6 pt-3 md:pt-4"
        style={{ height: `${CARD_VH}vh` }}
      >
        <GradientOrbs />

        {/* 16:9 card — fills available sticky height */}
        <div
          className="relative w-full rounded-2xl md:rounded-3xl bg-black overflow-hidden shadow-[0_40px_120px_-20px_hsl(var(--spectrum-violet)/0.55)]"
          style={{
            // Maintain 16:9 but never exceed the sticky container height.
            // We use aspect-ratio and let height be the constraint.
            aspectRatio: '16 / 9',
            maxHeight: '100%',
            maxWidth: `calc((${CARD_VH}vh - 1.5rem) * 16 / 9)`,
          }}
        >
          {/* Scroll-scrubbed video */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/60 pointer-events-none" />

          {/* Eyebrow */}
          <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/80 border border-white/15">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-spectrum-mint mr-2 animate-pulse-glow align-middle" />
            Out-of-home, on-demand
          </div>

          {/* 3D stacked headline */}
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

          {/* Sub-copy + CTAs */}
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

        {/* Scroll hint — fades out as soon as user starts scrolling */}
        <div
          className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          style={{ opacity: lerp(1, 0, range(progress, 0, 0.1)) }}
        >
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default Hero;
