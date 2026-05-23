# AXIS — Cinematic Homepage

Premium institutional landing page with **scroll-driven solar orbit** — Earth circles the Sun as you scroll, with a cinematic camera that changes viewing angle through the journey.

## Homepage (per build spec)

- Fullscreen 3D solar system (scroll-controlled, not auto-spin)
- Minimal hero copy — no service sections, no crowded layout
- CTAs: **Start Strategic Diagnostic** · **Explore Axis**
- Desktop nav: Overview · Divisions · Insights · Diagnostic · Contact · **Apply Access**
- Fullscreen mobile menu with divisions + `operations@axisoperations.ca`
- Minimal footer

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3002**

## Textures (photoreal space)

NASA-based maps live in `public/textures/` ([Solar System Scope](https://www.solarsystemscope.com/textures/), CC BY 4.0). The scene uses a **Milky Way skybox**, PBR planets, Earth clouds + atmosphere, film bloom, and cinematic camera arcs.

To refresh or download higher-res assets:

```bash
npm run textures
```

For stock-grade Earth (4K day / clouds / night), re-run the script when you have a stable connection — files land in `public/textures/planets/` and `public/textures/space/`.

## Stack

- Next.js 16 · React Three Fiber · Framer Motion · TypeScript

## Next pages (not built yet)

Routes are wired in nav/CTAs for: `/overview`, `/divisions`, `/diagnostic`, `/insights`, `/contact`, `/alignment`, and division pages.
