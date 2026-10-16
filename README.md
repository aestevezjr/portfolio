# Agustín Estévez — Portfolio

Personal portfolio of a senior full-stack engineer and technical lead, in English and Spanish.

**Live:** https://agustinestevez.vercel.app

![Open Graph card](https://agustinestevez.vercel.app/en/og.png)

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**, built as a fully static export (`output: "export"`)
- **Tailwind CSS v4** with design tokens for light and dark themes
- **Motion** for animations
- Hosted on **Vercel**

## What's inside

- **Bilingual routes:** `/en/` and `/es/` are pre-rendered from JSON dictionaries (`src/content/*.json`), with `hreflang` alternates, per-language metadata and Person structured data. `/` forwards to `/en/`.
- **Featured case study:** an animated data-flow diagram of a production system (Android → REST API → Spring → Oracle PL/SQL → commercial system), with packets travelling along the links and metrics counting up when they scroll into view.
- **Project demos:** each project card plays a short muted demo video (WebM + MP4). Only the visible clip plays, and only while the card is on screen; the active theme picks the light or dark recording.
- **Light and dark themes:** follow the OS preference, remember the visitor's choice and apply it before first paint (no flash). First-time visitors get a one-off hint on the theme toggle.
- **Accessibility:** semantic sections, skip link, visible focus, and `prefers-reduced-motion` respected everywhere (CSS entrance, Motion animations, demo videos).
- **SEO and sharing:** generated `sitemap.xml` and `robots.txt`, and a 1200×630 Open Graph image per language rendered at build time (`/en/og.png`, `/es/og.png`).

### Performance notes

The hero entrance is plain CSS so the largest contentful paint does not wait for hydration. It starts at `opacity: 0.01` instead of `0`, because Chrome ignores elements first painted fully transparent when choosing the LCP element.

Measured on the live site with a simulated mid-range phone (4× CPU slowdown, Fast 4G): **LCP 1.46 s, CLS 0**. Lighthouse scores **100** for accessibility and best practices.

## Project structure

```
src/
  app/
    (root)/            "/" → redirect to /en/
    [lang]/            localized page, layout/metadata, og.png route
    sitemap.ts, robots.ts
  components/
    Sections.tsx       hero, about, case study, projects, experience, skills, contact
    Header.tsx, ThemeToggle.tsx, ProjectVideo.tsx
    motion/            Reveal, FactLine, Schematic, CountUp (client components)
  content/             en.json, es.json — all copy lives here
  lib/                 i18n, fonts, site config
public/
  cv/                  downloadable CV
  projects/            demo videos and posters
```

Server components are the default; only animated or interactive parts are client components.

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run lint
```

To preview the production build, serve `out/` with any static server (for example `npx serve out`).

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, sitemap and Open Graph | `https://agustinestevez.vercel.app` |
| `NEXT_PUBLIC_INDEXABLE` | Set to `true` to let search engines index the site | unset (pages are `noindex`) |

## Editing content

All text, in both languages, is in `src/content/en.json` and `src/content/es.json`. Both files must keep the same structure. Project cards take an optional `image` (light/dark posters) and `video` (light/dark WebM + MP4 sources).
