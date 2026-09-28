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

## Admin panel (`/admin`)

Edit all site content (profile, projects with image uploads, resume, home cards) and see
visit statistics — views, visitors, countries, regions/cities, pages, referrers, devices.

**Setup on Vercel**

1. **Database:** Project → Storage → create a **Neon** Postgres database and connect it.
   Copy the *pooled* connection string into `DATABASE_URL` (Production + Development).
2. **Images:** Storage → create a **Blob** store and connect it (adds `BLOB_READ_WRITE_TOKEN`).
3. **Login:** add `ADMIN_PASSWORD` (long and unique) and `ADMIN_SESSION_SECRET`
   (≥ 32 random chars: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
4. Locally, put the same values in `.env.local`, then create the tables once:
   ```bash
   npm run db:push     # creates site_content, page_views, login_attempts
   ```
5. Redeploy and open `https://<your-domain>/admin`.

**How it works**

- Content is one JSON document in `site_content`, validated with zod on every save
  (`src/lib/content-schema.ts`). Until the first save — or without `DATABASE_URL` — the site
  shows the static defaults from `src/data/portfolioData.ts`. Saving regenerates every page.
- Visits are sent by a small beacon (`sendBeacon` → `/api/track`). Country, region and city
  come from Vercel's edge geo headers, so they are empty in local development. No IP address
  is stored: visitors are counted with a salted hash that rotates daily. Bots, Do Not Track /
  Global Privacy Control users and your own visits while logged in are not counted.
- Security: signed httpOnly session cookie (changing the password signs every session out),
  middleware + per-action checks, and login is locked for 15 minutes after 5 failed attempts.

## SEO

Name, handle, spelling variants, title and description live in `src/lib/site.ts` and feed
the `<title>`, meta description, Open Graph profile tags, the OG/Twitter image, sitemap and
JSON-LD (`Person` with `alternateName` + `sameAs`, `WebSite`, `ProfilePage`, breadcrumbs).
Search engines and Lighthouse get the page without the preloader or entrance animations.

Off-site steps that matter most for ranking on "Baxtiyorov Shaxriyor" / "baxtiyorovdev":

1. **Google Search Console** → add the domain property `baxtiyorov.dev`, submit
   `https://baxtiyorov.dev/sitemap.xml`, and request indexing for `/`, `/resume`, `/projects`.
   (HTML-tag verification: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.)
2. **Link every profile back to the site** — GitHub (name + Website field + profile README),
   Telegram and Instagram bios, LinkedIn. These match the `sameAs` links in the structured data.
3. **Yandex Webmaster** and **Bing Webmaster Tools** (`NEXT_PUBLIC_YANDEX_VERIFICATION`,
   `NEXT_PUBLIC_BING_VERIFICATION`) — submit the same sitemap.
4. In Vercel → Domains, make `www.baxtiyorov.dev` redirect to the apex with **308 (permanent)**.

## Project structure

```
src/
  app/                 # routes: / · /projects · /resume · /contact · 404 · api/contact · api/track
    admin/             # login, (panel)/ stats · profile · projects · resume · home, server actions
    layout.tsx         # metadata, font, boot script (js flag + --bento-scale + preloader)
    page.tsx           # the home bento grid
    globals.css        # design tokens, @theme, responsive .bento grid areas
  components/
    admin/             # admin forms, dashboard, chart
    bento/             # BentoCard, CardHeader, primitives, Marquee, Odometer, RoleCycler, RevealGroup
    home/              # one component per home card (Profile, Stats, Stacks, Journey, …)
    layout/            # PageShell (sub-page frame, header, footer), SiteNav, SiteChrome
    loading/           # GSAP preloader, route loader, shimmer skeleton
    projects/          # ProjectsView (filter + Flip), ProjectCard, ProjectModal
    analytics/ · resume/ · contact/ · seo/
  data/portfolioData.ts  # default content (used until the first admin save)
  db/                  # Drizzle schema + Postgres client
  lib/                 # content loading, auth, analytics, site config, gsap, helpers
  middleware.ts        # protects /admin and /api/admin
  types/
```

Edit content in the admin panel (or, without a database, in `src/data/portfolioData.ts`).
Static images live in `public/`; uploaded ones in Vercel Blob.

## Deployment (Vercel)

Push the branch and import the repo into Vercel (zero config for Next.js). Add the two
environment variables above. No `vercel.json` rewrites are needed — Next handles routing.

## Accessibility & performance

- Honors `prefers-reduced-motion`: every GSAP animation is gated by `gsap.matchMedia()`,
  and marquees turn into scrollable strips.
- Focus-trapped modal, keyboard nav, semantic landmarks, AA-minded contrast.
- `next/image` + `next/font`, transform/opacity-only animation, on-demand modal.
