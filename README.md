# Baxtiyorov Shaxriyor — Portfolio

A premium, animation-rich personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **GSAP**. Warm gold/amber design system with dark (primary) and light themes, glassmorphism, animated gradient borders, 3D tilt cards and cinematic scroll effects.

## Tech stack

- **Next.js 15** (App Router, React 19, RSC + client islands)
- **Tailwind CSS v4** (CSS-first `@theme`, class-based dark mode)
- **Framer Motion** — reveals, route transitions, micro-interactions, modal
- **GSAP + ScrollTrigger** — hero parallax, timeline draw, entrance timelines
- **next-themes** — flash-free dark/light theme
- **next/font** (Sora · Inter · JetBrains Mono) and **next/image**

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
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
    layout.tsx         # metadata, fonts, providers, nav, background, footer
    template.tsx       # per-route enter transition
    globals.css        # design tokens, @theme, utilities, keyframes
  components/
    layout/            # Navbar, Footer, Background, Preloader
    ui/                # TiltCard, SpotlightCard, Magnetic, Button, Reveal, …
    sections/          # Hero, AboutIntro, FeaturedProjects, SkillsShowcase, …
    projects/          # ProjectCard, ProjectModal, ProjectGallery, ProjectsView
    resume/ · contact/ · skills/ · providers/
  data/portfolioData.ts  # all site content (single source of truth)
  lib/                 # site config, fonts, gsap, motion presets, helpers
  hooks/ · types/
```

Edit content in `src/data/portfolioData.ts`. Images live in `public/`.

## Deployment (Vercel)

Push the branch and import the repo into Vercel (zero config for Next.js). Add the two
environment variables above. No `vercel.json` rewrites are needed — Next handles routing.

## Accessibility & performance

- Honors `prefers-reduced-motion` (Framer `MotionConfig`, GSAP gating, CSS).
- Focus-trapped modal, keyboard nav, semantic landmarks, AA-minded contrast.
- `next/image` + `next/font`, transform/opacity-only animation, on-demand modal.
