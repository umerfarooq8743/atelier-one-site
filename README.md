# Atelier One — Marketing & Product Showcase Website

The public website for **Atelier One**, tailoring and fabric business management software by Umer Farooq
([product repository](https://github.com/umerfarooq8743/RobeApp)).

This is a separate, static Next.js site. It doesn't include or change the Atelier One application
(Angular + Express + MongoDB). It has no database, no authentication, no backend and no form submission server.
Inquiries open in WhatsApp (or the visitor's email app) with a pre-written message.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS 4** with CSS-variable design tokens (Graphite & Gold, light + dark)
- **Framer Motion** (`LazyMotion` + `m`, honours reduced motion) for interactive pieces
- **Lucide** icons · **Zod** contact validation · `next/font` (Outfit + Plus Jakarta Sans)
- **playwright-core** for automated QA (uses your installed Chrome)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the contact values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js config) |
| `npm test` | Unit tests for the WhatsApp message/URL builder (`node --test`) |
| `npm run check` | typecheck + lint + tests |
| `npm run qa` | End-to-end QA against a running server (see below) |

## Environment variables

All are optional and public (`NEXT_PUBLIC_*` values are built into the client bundle). See `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap and Open Graph. On Vercel it falls back to the production URL automatically. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format, digits only (e.g. `923001234567`). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email (contact page, footer, structured data). |
| `NEXT_PUBLIC_CONTACT_PHONE` | Public contact phone. |
| `NEXT_PUBLIC_BUSINESS_LOCATION` | Optional; only set when genuine. |

**No contact details are hard-coded.** If WhatsApp isn't configured, the form validates the input and then says plainly
that nothing was sent (offering email if one is set). It never shows a fake success. In development the contact page
also shows which variables are missing. **Set these before going live.**

## Deploying to Vercel

1. Push this folder to a Git repository and import it in Vercel (framework preset: Next.js, no extra settings).
2. Add the environment variables above under **Project → Settings → Environment Variables**.
3. Deploy. Every route is prerendered as static HTML.

Because `NEXT_PUBLIC_*` values are inlined at build time, **redeploy after changing them**.

## Project structure

```
src/
  app/                 routes: / features modules workflows screenshots reports technology about contact
                       + sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx, icon.svg
  components/
    layout/            Header, MobileNavigation, Footer, Splash (intro animation)
    sections/          homepage + shared page sections (Hero, Problem, Solution, Features, …)
    interactive/       client components: tabs, order lifecycle demo, gallery + lightbox, contact form, …
    mockups/           product-preview system: ProductWindow, primitives (StatCard, charts, tables…),
                       26 screens and a registry (registry.tsx)
    ui/                Button, Badge, Logo, SectionHeading, Reveal, ThemeToggle, Providers
  config/site.ts       name, URLs, owner, env-driven contact details
  data/                ALL marketing content: modules, features, reports, workflows, screenshots, faqs,
                       comparison, stories, sample data for previews
  lib/                 seo.ts (metadata + JSON-LD), whatsapp.ts, icons.ts, theme.ts, utils.ts
  styles/              mockups.css (preview system), splash.css
scripts/               qa.mjs, check-clipping.mjs, screenshot.mjs
tests/                 whatsapp.test.mts
```

### Editing content

Copy lives in `src/data/*`, not in components. One module entry powers the homepage tabs, the `/modules` page,
feature links and related-module suggestions. Every claim was checked against the product's `DOCUMENTATION.md` and source code.
**Don't add features, customers, numbers, testimonials, prices or certifications that aren't real.**

- **Real screenshots:** none exist yet, so the gallery uses illustrative previews rendered from code (labelled as such).
  To use real images, add them to `public/screenshots/` and render `next/image` in `ScreenGallery` for those entries.
- **Verified case studies / testimonials:** `src/data/stories.ts` explains how to add a verified story. The current one
  is labelled *Illustrative Business Workflow*.

### Product previews

The mockups in `components/mockups` are sized in `em` units off a container-query font size (`styles/mockups.css`).
They scale crisply to any width without JavaScript, and below about 640px they switch to the app's phone layout.
Colours mirror the app's real `_config.scss`. `ProductWindow` takes `theme="light" | "dark"` to force a preview theme.

### Theme, motion and the splash

- The theme is applied before first paint by an inline script in `app/layout.tsx` (stored in `localStorage` as `ao-theme`),
  so the page never flashes the wrong theme.
- Scroll reveals are plain HTML (`ui/Reveal.tsx`) driven by one observer (`ui/RevealObserver.tsx`) and CSS.
- The intro splash plays **once per browser session**, never with reduced motion, and can be skipped with a click or Esc.
  To disable it, remove `<Splash />` from `app/layout.tsx`.

## Quality assurance

```bash
npm run build && npx next start -p 3100     # in one terminal
npm run qa                                   # in another (QA_QUICK=1 for fewer widths)
EXPECT_WHATSAPP=923001234567 npm run qa      # when the build has NEXT_PUBLIC_WHATSAPP_NUMBER set
node scripts/check-clipping.mjs              # text overflowing its box (BASE_URL to override)
```

`scripts/qa.mjs` covers:
- every route at 10 widths (360 → 1920) in both themes, checking horizontal overflow and console errors
- per-page SEO: unique titles, descriptions, canonical URLs, OG/Twitter tags, valid JSON-LD, single H1, heading order
- internal links, sitemap, robots, OG image and the 404 page
- interactions: theme toggle and persistence, product menu, mobile drawer, module tabs (keyboard), order demo,
  dashboard switches, workspace switcher, FAQ, measurement variants, gallery filters, lightbox keyboard and focus return,
  contact validation and the WhatsApp hand-off
- the skip link, focus outline and reduced motion
