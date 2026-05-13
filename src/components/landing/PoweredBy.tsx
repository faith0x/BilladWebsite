import { useRef, useEffect } from 'react';

const PARTNERS = [
  { name: 'OpenStreetMap', logo: null },
  { name: 'OSM Highway Tags', logo: null },
  { name: 'USDOT HPMS / State DOTs', logo: null },
  { name: 'U.S. Census Bureau Gazetteer', logo: null },
  { name: 'ONS Office of National Statistics', logo: null },
  { name: 'UK Government (MHCLG)', logo: null },
  { name: 'WorldPop', logo: null },
  { name: 'Facebook', logo: 'facebook' },
  { name: 'Mapbox', logo: 'mapbox' },
];

/* Duplicate N times so the track always overflows viewport */
const REPEAT = 4;

const PoweredBy = () => {  
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

  const items = Array.from({ length: REPEAT }).flatMap(() => PARTNERS);

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
                key={`${p.name}-${i}`}
                className="flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full surface-glass border border-border/40 whitespace-nowrap shrink-0 min-w-[10rem]"
              >
                <span className="text-[13px] font-semibold text-foreground tracking-wide text-center leading-snug">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoweredBy;

