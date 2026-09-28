# Baxtiyorov Shaxriyor — Portfolio

A bento-grid personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **GSAP**, implemented from the [Bento Grid Portfolio](https://www.figma.com/design/Qwd0sttv5MT6i4CavVwX7e/Bento-Grid-Portfolio--Community-) Figma design: a dark, violet-accented one-screen dashboard on desktop that re-flows into a stacked bento on tablet and mobile. Includes an admin panel (`/admin`) for editing content and viewing visit statistics.

**Contents:** [Tech stack](#tech-stack) · [Local development](#local-development) · [Deploy from scratch](#deploy-from-scratch-vercel) · [Environment variables](#environment-variables) · [Updating](#updating-the-site) · [Troubleshooting](#troubleshooting) · [Admin panel](#admin-panel-admin) · [SEO](#seo) · [Project structure](#project-structure)

## Tech stack

- **Next.js 15** (App Router, React 19, RSC + client islands)
- **Tailwind CSS v4** (CSS-first `@theme` tokens taken from the Figma colour sheet)
- **GSAP** (`useGSAP`, ScrollTrigger, Flip) — card reveals, rolling counters, role ticker,
  marquees, project filter transitions, modal timeline, loading screens
- **Postgres** (Neon) via **Drizzle ORM** — editable content and visit analytics
- **Vercel Blob** — image uploads from the admin panel
- **next/font** (Manrope) and **next/image**; icons from `react-icons` (Remix + Simple Icons)

## Design notes

- On screens ≥ 1440px the home grid renders at the exact Figma frame size (1512×784) and is
  scaled to fit the viewport via `--bento-scale` (set before first paint in `layout.tsx`),
  like Figma's prototype view. Below that, `.bento` in `globals.css` switches to 3-, 2- and
  1-column grid-area layouts.
- The Figma "Testimonials" and "Clients" cards are adapted into an education **Journey** feed
  and a **Toolbox** logo wall, since there is no testimonial or client data yet.

---

## Local development

Requirements: **Node.js 20+** and npm.

```bash
git clone https://github.com/baxtiyorovdev/portfolio.git
cd portfolio
npm install
npm run dev          # http://localhost:3010
```

This works with **no configuration at all**: without a database the site shows the static
content from `src/data/portfolioData.ts`, analytics is off and the admin panel explains what
is missing. To work against the real database, link the project and pull its variables
(step 7 below), which writes them to `.env.local`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3010 |
| `npm run build` / `npm run start` | Production build / serve it on port 3010 |
| `npm run lint` | ESLint |
| `npm run db:push` | Create / update the database tables from `src/db/schema.ts` |
| `npm run db:studio` | Browse the database in Drizzle Studio |

> Secrets go in `.env.local` (git-ignored), never in `.env` or the code. `.env.example`
> lists every variable.

---

## Deploy from scratch (Vercel)

About 20 minutes. You need a [GitHub](https://github.com) account with this repository and a
[Vercel](https://vercel.com) account (the free Hobby plan is enough). Neon and Blob have free
tiers and are created from inside Vercel.

### 1. Import the repository

1. Vercel dashboard → **Add New… → Project** → **Import** `baxtiyorovdev/portfolio`.
2. Framework preset: **Next.js** (auto-detected). Root directory `./`, build and output
   settings: leave the defaults.
3. Click **Deploy**. The first deploy works without any variables — you get a
   `*.vercel.app` URL showing the site with its static content.
4. **Settings → Git → Production Branch:** `main`. Every push to `main` now deploys to
   production; every other branch / pull request gets a preview URL.

### 2. Create the database (Neon Postgres)

1. Project → **Storage** tab → **Create Database** → **Neon** (Serverless Postgres).
2. Pick the **Free** plan and a region close to your visitors (e.g. Frankfurt for Central Asia).
3. When connecting it to the project, select **all environments** (Production, Preview,
   Development) and keep the default variable prefix, so the app gets `DATABASE_URL`
   (pooled — used by the app) and `DATABASE_URL_UNPOOLED` (direct — used for schema changes).

### 3. Create image storage (Vercel Blob)

1. Project → **Storage** → **Create Database** → **Blob**.
2. Access: **Public** (the site needs public image URLs).
3. Connect it to **all environments** with the default prefix **`BLOB`**. Newer stores
   create `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` and authenticate through Vercel OIDC;
   older stores create `BLOB_READ_WRITE_TOKEN`. The app supports both.
   ⚠️ With a custom prefix (e.g. `BLOB_READ_WRITE_`) the names change and uploads won't find them.

### 4. Create the Telegram bot (contact form)

1. In Telegram, message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the **token**.
2. Send any message to your new bot, then get your chat id from
   [@userinfobot](https://t.me/userinfobot).
3. If an older token was ever committed to git, revoke it in @BotFather (`/revoke`) and use
   the new one — anything in git history must be treated as public.

### 5. Generate the admin secrets

```bash
# Session secret (64 hex chars)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Choose a long, unique `ADMIN_PASSWORD` (a password manager's 20+ character password is ideal).

### 6. Add environment variables

Project → **Settings → Environment Variables**. Add each for **Production** and **Preview**
(and Development if you want to use them locally), marking secrets as **Sensitive**:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | your admin password |
| `ADMIN_SESSION_SECRET` | the 64-char hex string from step 5 |
| `TELEGRAM_BOT_TOKEN` | bot token from step 4 |
| `TELEGRAM_CHAT_ID` | chat id from step 4 |
| `NEXT_PUBLIC_SITE_URL` | `https://baxtiyorov.dev` (your final domain, no trailing slash) |

`DATABASE_URL*` and `BLOB_*` were added automatically in steps 2–3. Optional variables are in
the [reference table](#environment-variables).

### 7. Create the database tables

Run once from your computer (and again whenever `src/db/schema.ts` changes):

```bash
npm i -g vercel            # Vercel CLI
vercel login
vercel link                # choose the portfolio project
vercel env pull .env.local # writes DATABASE_URL etc. (git-ignored)
npm run db:push            # creates site_content, page_views, login_attempts
```

No CLI? Copy the connection string from the Neon dashboard (**Connect** → direct connection)
into `.env.local` as `DATABASE_URL=...` and run `npm run db:push`.

### 8. Redeploy

Variables only apply to new deployments: **Deployments** → latest → **⋯ → Redeploy**
(or push any commit to `main`).

### 9. Connect the domain

1. Project → **Settings → Domains** → add `baxtiyorov.dev`, then `www.baxtiyorov.dev`.
2. Set `www.baxtiyorov.dev` to **Redirect to** `baxtiyorov.dev` with **308 Permanent Redirect**
   (a temporary 307 keeps the `www` copy in search results).
3. At your domain registrar, create the DNS records Vercel shows (an `A` record for the apex,
   a `CNAME` for `www`) — or switch the domain to Vercel's nameservers. HTTPS certificates are
   issued automatically once DNS resolves.

### 10. First login and content

1. Open `https://baxtiyorov.dev/admin` → log in with `ADMIN_PASSWORD`.
2. A banner says the site still shows content from code — **the first save in any section
   copies everything into the database**. From then on, edit content only in the admin panel.
3. Upload real images in **Projects** / **Profile**.

### 11. Verify

- [ ] Home, `/projects`, `/resume`, `/contact` load on the domain; `www` redirects to the apex
- [ ] `/admin` redirects to the login page when signed out; wrong passwords show an error
- [ ] Saving in the admin panel updates the public page within seconds
- [ ] Image upload works (Profile → Avatar → **Загрузить**)
- [ ] Open the site from your phone (while logged out) → **Статистика** shows the visit with
      country, region and city
- [ ] Contact form message arrives in Telegram
- [ ] `https://baxtiyorov.dev/sitemap.xml` and `/robots.txt` open

Then follow the [SEO](#seo) steps (Search Console, profile links).

---

## Environment variables

| Variable | Required | Where it comes from | Used for |
| --- | --- | --- | --- |
| `DATABASE_URL` | for admin + stats | Neon integration (pooled) | Content and analytics storage |
| `DATABASE_URL_UNPOOLED` | optional | Neon integration (direct) | `npm run db:push` (falls back to `DATABASE_URL`) |
| `ADMIN_PASSWORD` | for admin | you | Admin login |
| `ADMIN_SESSION_SECRET` | for admin | you (≥ 32 chars) | Signing the session cookie; salt for visitor hashes |
| `BLOB_STORE_ID` + `BLOB_WEBHOOK_PUBLIC_KEY` | for uploads | Blob integration (OIDC stores) | Image uploads |
| `BLOB_READ_WRITE_TOKEN` | for uploads | Blob integration (older stores) | Image uploads |
| `TELEGRAM_BOT_TOKEN` | for contact form | @BotFather | Sending contact messages |
| `TELEGRAM_CHAT_ID` | for contact form | @userinfobot | Where messages arrive |
| `NEXT_PUBLIC_SITE_URL` | recommended | you | Canonical URLs, sitemap, structured data (default `https://baxtiyorov.dev`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional | Google Search Console (HTML tag) | Ownership check |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | optional | Yandex Webmaster | Ownership check |
| `NEXT_PUBLIC_BING_VERIFICATION` | optional | Bing Webmaster Tools | Ownership check |
| `ANALYTICS_SALT` | optional | you | Separate salt for visitor hashes |

Changing a variable needs a **redeploy**; `NEXT_PUBLIC_*` values are baked in at build time.
Changing `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` signs every admin session out.

---

## Updating the site

- **Content** (texts, projects, skills, images): in the admin panel — no deploy needed.
- **Code:** push to a branch → Vercel builds a preview URL → merge the pull request into
  `main` → production deploys automatically.
- **Database schema** (after editing `src/db/schema.ts`): run `npm run db:push` against the
  production database (`vercel env pull .env.local` first), then deploy.
- **SEO name/title/description** live in `src/lib/site.ts` (not in the admin panel).

---

## Troubleshooting

| Symptom | Cause → fix |
| --- | --- |
| Login page says «Админка ещё не настроена» | `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` missing, or the secret is shorter than 32 chars → set them and redeploy |
| Banner «База данных не подключена» | `DATABASE_URL` missing in this environment → connect Neon to it and redeploy |
| Saving fails with `relation "site_content" does not exist` | Tables not created → step 7 (`npm run db:push`) |
| Upload button disabled | Blob not connected, or connected with a custom prefix → reconnect with prefix `BLOB`, redeploy |
| Upload error mentioning OIDC | Enable OIDC for the project (Settings → Security) and redeploy; locally re-run `vercel env pull` (the OIDC token expires after ~12 h) |
| Stats show «Неизвестно» for location | Normal locally — country/region/city come from Vercel's geo headers and only exist on Vercel |
| No visits recorded | Your own visits while logged in aren't counted; neither are bots or browsers with Do Not Track / GPC |
| «Слишком много попыток» on login | 5 failed attempts in 15 minutes → wait, or run `DELETE FROM login_attempts;` in Neon's SQL editor |
| Contact form: "Contact service is not configured." | `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` missing → add and redeploy |
| A `NEXT_PUBLIC_*` change has no effect | It's inlined at build time → redeploy |

---

## Admin panel (`/admin`)

Edit all site content (profile, projects with image uploads, resume, home cards) and see
visit statistics — views, visitors, countries, regions/cities, pages, referrers, devices.

- Content is one JSON document in `site_content`, validated with zod on every save
  (`src/lib/content-schema.ts`). Until the first save — or without `DATABASE_URL` — the site
  shows the static defaults from `src/data/portfolioData.ts`. Saving regenerates every page.
- Visits are sent by a small beacon (`sendBeacon` → `/api/track`). Country, region and city
  come from Vercel's edge geo headers. No IP address is stored: visitors are counted with a
  salted hash that rotates daily. Bots, Do Not Track / Global Privacy Control users and your
  own visits while logged in are not counted.
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
4. Keep `www` → apex as a **308 permanent** redirect (deploy step 9).

## Project structure

```
src/
  app/                 # routes: / · /projects · /resume · /contact · 404 · api/contact · api/track
    admin/             # login, (panel)/ stats · profile · projects · resume · home, server actions
    api/admin/upload/  # Vercel Blob upload tokens / presigned URLs
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
drizzle.config.ts      # used by npm run db:push / db:studio
```

Static images live in `public/`; uploaded ones in Vercel Blob.

## Accessibility & performance

- Honors `prefers-reduced-motion`: every GSAP animation is gated by `gsap.matchMedia()`,
  and marquees turn into scrollable strips.
- Focus-trapped modal, keyboard nav, semantic landmarks, AA-minded contrast.
- `next/image` + `next/font`, transform/opacity-only animation, on-demand modal.
