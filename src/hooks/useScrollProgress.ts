import { useEffect, useRef, useState } from 'react';

export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  stickyHeightVh: number,
  offsetPx: number = 0
) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const stickyHeight = (stickyHeightVh / 100) * vh;
      const scrollable = Math.max(1, rect.height - stickyHeight);
      const scrolled = offsetPx - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollable));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [stickyHeightVh, offsetPx]);

  return { ref, progress };
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const range = (v: number, inMin: number, inMax: number) =>
  clamp((v - inMin) / (inMax - inMin));
