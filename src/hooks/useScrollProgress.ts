import { useEffect, useRef, useState } from 'react';

/**
 * Returns sticky-section scroll progress (0 → 1).
 *
 * @param lockUntilComplete   intercept wheel/touch until progress === 1
 * @param stickyHeightVh      height of the sticky container in vh (default 100)
 * @param stickyOffsetPx      top offset in px (e.g. 64 for a top-16 navbar)
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  lockUntilComplete = false,
  stickyHeightVh = 100,
  stickyOffsetPx = 0
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
      const stickyHeight = (stickyHeightVh / 100) * vh;
      // Total distance the section must travel before the sticky card unpins
      const scrollable = Math.max(1, rect.height - stickyHeight - stickyOffsetPx);
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const update = () => {
      setProgress(getProgress());
    };

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (!lockUntilComplete) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const p = getProgress();
      // Lock only while the section is in view and we haven't finished scrubbing
      const inView = rect.top <= stickyOffsetPx && rect.bottom >= window.innerHeight;

      if (!inView) return;

      if (p < 1) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, behavior: 'instant' });
      }
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
      const inView = rect.top <= stickyOffsetPx && rect.bottom >= window.innerHeight;

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
  }, [lockUntilComplete, stickyHeightVh, stickyOffsetPx]);

  return { ref, progress };
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const range = (v: number, inMin: number, inMax: number) =>
  clamp((v - inMin) / (inMax - inMin));
