# Baxtiyorov Shaxriyor — Portfolio

A bento-grid personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **GSAP**, implemented from the [Bento Grid Portfolio](https://www.figma.com/design/Qwd0sttv5MT6i4CavVwX7e/Bento-Grid-Portfolio--Community-) Figma design: a dark, violet-accented one-screen dashboard on desktop that re-flows into a stacked bento on tablet and mobile.

## Tech stack

- **Next.js 15** (App Router, React 19, RSC + client islands)
- **Tailwind CSS v4** (CSS-first `@theme` tokens taken from the Figma colour sheet)
- **GSAP** (`useGSAP`, ScrollTrigger, Flip) — card reveals, rolling counters, role ticker,
  marquees, project filter transitions, modal timeline
- **next/font** (Manrope) and **next/image**; icons from `react-icons` (Remix + Simple Icons)

## Design notes

- On screens ≥ 1440px the home grid renders at the exact Figma frame size (1512×784) and is
  scaled to fit the viewport via `--bento-scale` (set before first paint in `layout.tsx`),
  like Figma's prototype view. Below that, `.bento` in `globals.css` switches to 3-, 2- and
  1-column grid-area layouts.
- Card content comes from `src/data/portfolioData.ts`. The Figma "Testimonials" and "Clients"
  cards are adapted into an education **Journey** feed and a **Toolbox** logo wall, since there
  is no testimonial or client data yet.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3010
```

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint`.

## Environment variables

The contact form posts to a server route (`src/app/api/contact/route.ts`) that relays
messages to Telegram. The bot token is **server-only** and never shipped to the client.

| Variable              | Description                                  |
| --------------------- | -------------------------------------------- |
| `TELEGRAM_BOT_TOKEN`  | Bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID`    | Your chat id (e.g. via [@userinfobot](https://t.me/userinfobot)) |

> ⚠️ **Security:** the previous version hard-coded this token in client code and it
> was committed to git history — it should be considered public. **Rotate the token**
> in @BotFather and put the new value in `.env.local` (local) and Vercel project
> settings → Environment Variables (production).

## Project structure

```
src/
  app/                 # routes: / · /projects · /resume · /contact · 404 · api/contact
    layout.tsx         # metadata, font, boot script (js flag + --bento-scale)
    page.tsx           # the home bento grid
    globals.css        # design tokens, @theme, responsive .bento grid areas
  components/
    bento/             # BentoCard, CardHeader, primitives, Marquee, Odometer, RoleCycler, RevealGroup
    home/              # one component per home card (Profile, Stats, Stacks, Journey, …)
    layout/            # PageShell (sub-page frame, header, footer), SiteNav
    projects/          # ProjectsView (filter + Flip), ProjectCard, ProjectModal
    resume/ · contact/ · seo/
  data/portfolioData.ts  # all site content (single source of truth)
  lib/                 # site config, fonts, gsap, tech icons, derived-data helpers
  types/
```

Edit content in `src/data/portfolioData.ts`. Images live in `public/`.

## Deployment (Vercel)

Push the branch and import the repo into Vercel (zero config for Next.js). Add the two
environment variables above. No `vercel.json` rewrites are needed — Next handles routing.

## Accessibility & performance

- Honors `prefers-reduced-motion`: every GSAP animation is gated by `gsap.matchMedia()`,
  and marquees turn into scrollable strips.
- Focus-trapped modal, keyboard nav, semantic landmarks, AA-minded contrast.
- `next/image` + `next/font`, transform/opacity-only animation, on-demand modal.
