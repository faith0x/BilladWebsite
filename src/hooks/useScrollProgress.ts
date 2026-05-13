import { useEffect, useRef, useState } from 'react';

/**
 * Returns sticky-section scroll progress (0 → 1) for an element taller than the viewport.
 * 0 = element top is aligned with the viewport top
 * 1 = element has scrolled through all of its extra height
 *
 * lockUntilComplete: when true, prevents the page from scrolling past the
 * sticky section until progress reaches 1 (i.e. the full scroll-effect plays).
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  lockUntilComplete = false
) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const getProgress = () => {
      const el = ref.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollable = Math.max(1, rect.height - vh);
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const update = () => {
      setProgress(getProgress());
    };

    // ── Scroll-lock wheel / touch handler ──────────────────────────────────
    // When the hero is in view and progress < 1, we intercept wheel/touch
    // events and manually drive window.scrollY instead of letting the browser
    // free-scroll. Once progress hits 1 we release.
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (!lockUntilComplete) return;
      const el = ref.current;
      if (!el) return;
      const p = getProgress();

      const rect = el.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inView) return; // user has already passed or not yet reached hero

      if (p < 1) {
        // Consume the event so the browser doesn't also scroll
        e.preventDefault();
        const delta = e.deltaY;
        window.scrollBy({ top: delta, behavior: 'instant' });
      }
      // At p === 1 we let the browser handle it naturally (flow past the hero)
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockUntilComplete) return;
      const el = ref.current;
      if (!el) return;
      const p = getProgress();

      const rect = el.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inView) return;

      if (p < 1) {
        e.preventDefault();
        const dy = touchStartY - e.touches[0].clientY;
        window.scrollBy({ top: dy * 1.5, behavior: 'instant' });
        touchStartY = e.touches[0].clientY;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (lockUntilComplete) {
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (lockUntilComplete) {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
      }
    };
  }, [lockUntilComplete]);

  return { ref, progress };
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const range = (v: number, inMin: number, inMax: number) =>
  clamp((v - inMin) / (inMax - inMin));
