# Josh Swid — Personal Brand Website

A premium, immersive personal brand website for tattoo artist **Josh Swid**, inspired by [Monolith Studio](https://monolithstudio.com). Built with Next.js 14, Framer Motion, Lenis, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router)
- **Framer Motion** — scroll-driven animations & transitions
- **Lenis** — buttery smooth scrolling
- **Tailwind CSS** — custom design system
- **React Three Fiber + Three.js** *(planned — 3D statue placeholder currently in place)*

## Site Sections

1. **Hero** — Full-viewport, giant "JOSH SWID" headline behind 3D statue placeholder
2. **Statue Section** — Scroll-driven sticky section with About, Sidenote, and Philosophy text
3. **Marquee** — Infinite ticker bar with style tags
4. **Portfolio** — "THE WORK." masonry grid (placeholder images)
5. **Booking CTA** — Giant typographic call to action
6. **Process** — 4-step process grid
7. **Philosophy** — Dark quote section with portrait placeholder
8. **Studio** — "ZEN TATTOO." with studio image placeholders
9. **Availability** — Reserve your spot + details table
10. **Instagram Feed** — Scattered grid placeholders
11. **Testimonials** — "Collectors Say" horizontal scroll cards
12. **Footer** — Email subscribe, navigate, connect, details

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

| Token | Value |
|---|---|
| Background light | `#f5f2ee` |
| Background dark | `#111111` |
| Background stone | `#e8e4e0` |
| Accent (gold) | `#c9a96e` |

## Planned Enhancements

- Replace 3D statue placeholder with a real `.glb` model via React Three Fiber
- Replace all image placeholders with Josh's actual portfolio photos
- Connect Instagram API for live feed
- Add ambient audio file to `/public/audio/ambient.mp3`
- Connect booking form to a backend or Calendly embed

## Deployment

Deployed to **Vercel** — push to `main` to deploy.
