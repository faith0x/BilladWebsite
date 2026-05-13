
# Billboard Marketplace Landing Page

A bold, dark, editorial landing page for an OOH (Out-of-Home) billboard marketplace startup. The aesthetic is **dark base with luminous, smooth multicolor gradients** — like a pixel spectrum glowing through a black canvas (Linear / Vercel / Arc Browser, but louder).

## Design direction

- **Base**: deep near-black (`hsl(240 20% 4%)`) with subtle grain.
- **Spectrum gradients**: smooth eased sweeps pink → violet → indigo → cyan → mint, used for glows, blurred orbs, text gradients, section accents. Aurora, never flat.
- **Typography**: Sora (display, tight tracking, very large) + Manrope (body).
- **Surfaces**: glassy cards (`backdrop-blur`, low-opacity borders, soft glow).
- **Motion**: scroll-driven 3D hero, parallax orbs, fade/slide on enter — pure CSS + a small `useScroll` hook (no new deps).
- All colors as HSL semantic tokens in `index.css` + `tailwind.config.ts` (no raw hex in components).

## Hero — 3D scroll-pinned intro (the centerpiece)

A **pinned, full-viewport hero** that drives a scroll-storytelling sequence before the rest of the page begins.

**Behavior**
- Hero section is `~300vh` tall; the inner stage is `position: sticky; top: 0; height: 100vh` so it pins while the user scrolls.
- A scroll-progress value (0 → 1) is computed from the section's bounding rect via a lightweight `useScrollProgress` hook (rAF + `getBoundingClientRect`, no library).
- **Stage 0 (progress 0 → 0.15)** — Initial state, **3 stacked headline lines** sit at the bottom of the viewport, slightly tilted back in 3D (`perspective: 1200px; rotateX(35deg)`), dim and small. They read like billboard panels waiting to rise:
  1. "Your gallery."
  2. "Every street."
  3. "The world's stage."
- **Stage 1 (0.15 → 0.55)** — On scroll, the 3 texts **slide upward from bottom to center**, each with a staggered delay, rotating from `rotateX(35deg)` → `rotateX(0)`, scaling up, brightening, and gradient-filling. They land centered, stacked as one big headline.
- **Stage 2 (0.55 → 0.85)** — Headline locks; the **isometric city illustration fades/zooms in** behind it, gradient orbs drift, sub-copy and dual CTAs ("Join waitlist" / "See how it works") fade in, plus floating glass stat chips ("120+ cities", "8.4k billboards", "Live").
- **Stage 3 (0.85 → 1)** — Whole hero gently scales/fades to release the pin and hand off to the next section.
- Honors `prefers-reduced-motion`: skips transforms, shows final composed state immediately.

**Illustration**: custom isometric city street at dusk — buildings with glowing billboards displaying colorful ads, hovering geo-pins, subtle map grid, ambient orbs. Generated via `imagegen` (standard tier, 1536×1024, transparent PNG).

## Page structure (top → bottom)

1. **Sticky Nav** — wordmark left, links (Features, How it works, Waitlist), CTA "Join waitlist". Background turns from transparent → blurred glass past hero.
2. **Hero** (3D scroll sequence above).
3. **"Coming soon on mobile"** — slim band: copy left, disabled App Store / Google Play badges with "Notify me", small phone mockup right.
4. **Features — 2×2 grid**, each card with gradient icon, title, 2-line description, hover glow:
   - **GIS Geospatial AI** — Outdoor Marketing Intelligence. Geo-aware AI for OOH planning.
   - **OOH Refit Intelligence** — One ad, every billboard. Auto-adapts your creative to any size, ratio, lighting.
   - **Environment & RWI Awareness** — Decisions grounded in the real world. City RWI + context surface the best placements.
   - **Create, Launch, Manage & Track** — From your couch to the world's stage. Build, launch, manage and track campaigns in-app.
5. **How it works — 3 steps** — horizontal stepper with gradient connector and nodes:
   1. Upload your creative.
   2. AI refits it to any billboard, any city.
   3. Launch & track campaigns worldwide.
6. **Global reach band** — subtle world-map SVG with pulsing gradient pins and counters (cities / billboards / impressions).
7. **Waitlist CTA** — large gradient panel: headline, email input + "Join waitlist", micro-copy.
8. **Footer** — wordmark, tagline, columns (Product, Company, Legal), socials, copyright.

## Files to create / modify

- `src/index.css` — dark theme tokens, spectrum gradient vars (`--gradient-spectrum`, `--gradient-aurora`, `--glow-primary`, `--surface-glass`), Sora + Manrope @import, base body font.
- `tailwind.config.ts` — extend semantic colors, `fontFamily` (display: Sora, sans: Manrope), `backgroundImage` gradients, glow `boxShadow`s, keyframes (`fade-in`, `orb-drift`, `pulse-glow`, `shimmer`).
- `src/hooks/useScrollProgress.ts` — rAF-based scroll progress for a ref'd element (returns 0→1).
- `src/pages/Index.tsx` — replace placeholder, compose all sections.
- `src/components/landing/Navbar.tsx`
- `src/components/landing/Hero.tsx` — pinned 3D scroll sequence, 3 stacked texts → centered headline.
- `src/components/landing/MobileComingSoon.tsx`
- `src/components/landing/FeaturesGrid.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/GlobalReach.tsx`
- `src/components/landing/WaitlistCTA.tsx`
- `src/components/landing/Footer.tsx`
- `src/components/landing/GradientOrbs.tsx` — reusable animated background blobs.
- `src/assets/hero-isometric-city.png` — generated isometric city illustration.
- `index.html` — title, meta description, OG tags for SEO.

## Technical notes

- 3D transforms wrapped in a `perspective` parent; each text line uses `transform: translate3d() rotateX() scale()` interpolated from scroll progress (inline style updated via rAF).
- `will-change: transform, opacity` on animated layers; cleanup on unmount.
- `prefers-reduced-motion: reduce` short-circuits the scroll choreography.
- lucide-react for icons; existing shadcn `Button`, `Input`, `Card` primitives restyled via variants.
- Single H1 (composed from the 3 lines, visually grouped, semantically one heading). Semantic `<section>` + aria-labels, alt text on hero image, lazy-load below-the-fold imagery.
- Fully responsive: 2×2 → single column under `md`; hero scroll sequence keeps same choreography but reduces text scale on mobile.
- No backend wired (waitlist is visual only) — Lovable Cloud can be added later for real signup storage.
