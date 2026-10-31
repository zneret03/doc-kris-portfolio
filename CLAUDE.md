@AGENTS.md

# doc-kris-portfolio

Portfolio website for an orthopaedic surgeon, **Dr. Kris Raymund A. Francisco, MD, DPBO, FPOA** (sports medicine and hip and knee replacement, Iloilo City), built from the Stitch "Clinical Midnight" mockups (dark only). Credentials, training, hospitals, awards and research come from the doctor's 2026 CV. Every practice fact lives in `src/config/site.ts` and in each feature's `content.ts`. Plan and the owner inputs still needed: `.claude/priorities-and-action-items.md`. The design system is locked in `design.md` at the root; `.claude/hallmark-audit.md` records the AI-slop audit that produced it.

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript (strict)
- `cacheComponents` and `partialPrefetching` are on in `next.config.ts` (see Next.js rules)
- Tailwind CSS v4 through `@tailwindcss/turbopack`. There is no `tailwind.config` or `postcss.config`; the theme lives in `src/app/globals.css`
- shadcn/ui on **Base UI** (`base-nova` style, Lucide icons), configured in `components.json`
- Plus Jakarta Sans via `next/font`
- Jest 30 + React Testing Library (jsdom) for unit tests
- yarn 1. Use `yarn` only, never npm or pnpm, so `yarn.lock` stays the single lockfile

## Commands

```bash
yarn dev                      # dev server on http://localhost:3000
yarn build                    # production build; also validates prerendering (Cache Components)
yarn lint                     # ESLint
yarn typecheck                # next typegen + tsc --noEmit
yarn test                     # unit tests; narrow with `yarn test <path>` or `yarn test -t "<name>"`
yarn test:watch
yarn test:coverage
yarn shadcn add <component>   # add a shadcn/ui component
```

Before calling work done, run `yarn lint && yarn typecheck && yarn test`. Also run `yarn build` after touching routes, layouts, metadata or data loading.

Environment variables are documented in `.env.example`: `NEXT_PUBLIC_SITE_URL` (canonical origin for metadata and share images) and `CONSULTATION_WEBHOOK_URL` / `CONSULTATION_WEBHOOK_SECRET` (where consultation requests go).

## Project structure

```text
src/
├── app/                  # routes only: Next.js special files
├── components/
│   ├── ui/               # shadcn primitives, added with `yarn shadcn add`
│   ├── layout/           # site chrome: header, mobile menu, footer
│   └── *.tsx             # shared composites: section heading, CTA panel, text link, pill…
├── config/
│   ├── site.ts           # practice facts: doctor, contact, location, hours, nav
│   └── brand-colors.ts   # hex mirror of the theme for metadata, manifest and image routes
├── features/
│   └── <feature>/        # home, about, specialties, clinic, legal, seo
│       ├── components/   # UI used only by this feature, tests beside each file
│       ├── content.ts    # static copy and data for the feature
│       ├── data.ts       # async data loading ("server-only", "use cache"), when needed
│       ├── actions.ts    # server actions ("use server")
│       └── types.ts
├── hooks/                # shared client hooks: use-<name>.ts
└── lib/                  # shared helpers; utils.ts exports cn()
```

`public/` holds static files and config stays at the repo root, next to `design.md` (the locked design system) and `.hallmark/` (Hallmark's run log and pre-flight cache). Create a folder when its first file needs it. This tree is the complete list of top-level `src/` folders; if something truly doesn't fit, update this section before adding one.

### Where a file goes

| You're adding                                      | Put it in                                                    |
| -------------------------------------------------- | ------------------------------------------------------------ |
| A page or URL                                      | `src/app/<segment>/page.tsx`                                 |
| That page's share image                            | `opengraph-image.tsx` + `twitter-image.tsx` beside `page.tsx` |
| That route's layout, loading, error                | Beside its `page.tsx`                                        |
| A practice fact (name, phone, address, hours, nav) | `src/config/site.ts`                                         |
| A colour used outside CSS (metadata, image routes) | `src/config/brand-colors.ts`, mirroring `globals.css`        |
| Copy or data for one page section                  | `src/features/<feature>/content.ts`                          |
| A shadcn primitive (button, dialog, sheet…)        | `src/components/ui/` via `yarn shadcn add`, never by hand    |
| Header, footer, navigation                         | `src/components/layout/`                                     |
| A component used by one feature                    | `src/features/<feature>/components/`                         |
| A component used by two or more features           | `src/components/`, moved there when the second use appears   |
| Async data loading                                 | `src/features/<feature>/data.ts`                             |
| A server action                                    | `src/features/<feature>/actions.ts`                          |
| A shared hook or helper                            | `src/hooks/` or `src/lib/`                                   |
| A test                                             | Next to the file it tests: `<name>.test.tsx`                 |
| Images, a CV PDF, other static files               | `public/`                                                    |

### Structure rules

- `src/app` holds only Next.js special files (`page`, `layout`, `loading`, `error`, `not-found`, `template`, `default`, `route`, and metadata files such as `opengraph-image`, `twitter-image`, `icon`, `sitemap`, `robots`, `manifest`) plus `globals.css` and `favicon.ico`. No components, helpers, tests or `_private` folders.
- Pages stay thin: compose feature components, pass in data and server actions, export metadata.
- Route folders are kebab-case URL segments (`/case-studies` becomes `case-studies/`). Add a route group `(name)` only when a set of routes needs its own layout, never just to tidy up.
- Imports flow one way: `app` → `features` → `components`, `config`, `hooks`, `lib`. A feature never imports from another feature; compose them in the page.
- Import through the `@/` alias (maps to `src/`), never `../../`. No barrel `index.ts` files; import the file itself.
- File names are kebab-case (`project-card.tsx`, `use-media-query.ts`). Components are PascalCase named exports; default exports only where Next.js requires them.

## Next.js rules

AGENTS.md applies: read the relevant guide in `node_modules/next/dist/docs/` before using a Next.js API. The traps that matter most here:

- Server Components by default. Put `"use client"` on the smallest interactive leaf, never on a page or layout.
- With Cache Components, request-time data (`cookies()`, `headers()`, `searchParams`, uncached `fetch`) and the current time (`new Date()`) must sit inside `<Suspense>` or be cached with `"use cache"` plus `cacheLife()` from `next/cache`. When `yarn build` fails on prerendering, apply one of the fixes it prints and read the linked page.
- Dynamic routes with build-time content (case studies, posts) use `generateStaticParams`, which must return at least one entry, plus `export const ensureStatic = "navigation"` so unknown slugs get a real 404 from `notFound()` (details in the `add-route` skill).
- `params` and `searchParams` are Promises. Type them with the global `PageProps<"/work/[slug]">` and `LayoutProps<"/">` helpers; no import needed.
- `next/image` uses `preload`, not the deprecated `priority`.
- Request interception lives in `src/proxy.ts`. `middleware.ts` is the old name.
- Don't edit `next-env.d.ts`, `.next/`, or the managed blocks in `AGENTS.md`.

## SEO and social sharing

- Every page exports `metadata = pageMetadata({ title, description, path })` from `@/features/seo/metadata`. It sets the canonical URL and restates the Open Graph fields, because a page's `openGraph` replaces its parent's.
- Every page has its own `opengraph-image.tsx` (call `renderOgImage` from `@/features/seo/og-image`) and a `twitter-image.tsx` that re-exports it. `share-images.test.ts` fails when one is missing. Never set `images` in metadata; it overrides the route's image files.
- Structured data goes through `<JsonLd>` and the builders in `@/features/seo/structured-data` (Physician and WebSite site-wide, plus per-page types). Never mark up reviews or ratings.
- `sitemap.ts` is built from `site.nav`. Add new public routes there if they aren't in the nav.
- Production needs `NEXT_PUBLIC_SITE_URL` (or a Vercel URL); otherwise share images point at localhost. Preview deployments are noindexed automatically.

## UI

- **Components:** shadcn/ui first. Check `src/components/ui/`, otherwise `yarn shadcn add <name>`. The `shadcn-ui` skill covers Base UI details; the ones that bite most often:
  - compose with the `render` prop (`<DialogTrigger render={<Button />}>`), not `asChild`
  - links that look like buttons put `buttonVariants()` on a `<Link>`; never `<Button render={<a />}>`, because Base UI forces `role="button"`. Our `buttonVariants()` already merges classes, so `buttonVariants({ size: "xl", className: "w-full" })` is safe
  - `import { cn } from "@/lib/utils"`, never from `"cn"` (lint enforces). After `shadcn add`, fix the generated import
- **Design:** `design.md` is the locked design system. Read it before any visual change; where it disagrees with the Stitch mockups, it wins. A new page takes the macrostructure `design.md` assigns to its type (Split Studio for marketing pages, Long Document for content pages) and never repeats an archetype within the page. Use the `frontend-design` skill for copy and direction, then check the result against the Hallmark slop test (`.agents/skills/hallmark/references/slop-test.md`).
- **Theme (Clinical Midnight):** OKLCH tokens live in `src/app/globals.css`. Surfaces step `bg-background` → `bg-surface-lowest`, `-low`, `-container`, `-high`, `-highest`, and elevation comes from that lightness, not shadows (`shadow-float` on the nav pill is the only one). Teal `primary` is the only accent: CTA fill, links, small tags, the availability dot, focus. Cyan `info` is only the primary button's hover and the second canvas bloom. Type uses the design scale: `text-display-lg` (pair it with `text-display-lg-mobile` below `md`), `text-headline-*`, `text-title-md`, `text-body-*`, `text-label-*`. No raw palette classes or colour literals in components; values needed outside CSS come from `src/config/brand-colors.ts`. A new `--text-*` or `--shadow-*` token must also be registered in `src/lib/utils.ts`; `utils.test.ts` checks this.
- **Chrome and calls to action:** the header is the N5 floating pill (`site-header.tsx`), the footer is the Ft5 statement (`site-footer.tsx`), and `<AmbientGlow />` renders the canvas blooms once in the root layout. One primary action per view: a teal pill from `buttonVariants({ size: "xl" })`. Secondary actions are typographic links: `<TextLink>` or `textLinkClassName` from `@/components/text-link`.
- **Never:** eyebrows or kickers above headings, gradient text, italic display type or quotes, glass cards (blur only on the floating nav), decorative orbs or pulsing dots, icon tiles above headings (`IconTile` sits only beside contact details), equal three-column card grids, `transition-all`, hover scale or lift, Title Case or tracked-uppercase labels. Labels are sentence case. Motion is colour transitions only and respects `prefers-reduced-motion` (`motion-reduce:transition-none`, `motion-safe:`).
- **Accessibility floor:** semantic landmarks and headings, labelled controls, alt text, a skip link, and no content cut off by `truncate` on small screens. Focus uses the `focus-ring` utility (a 2 px outline); never a `ring-*` box-shadow focus style, which vanishes in forced-colors mode. Clickable text never wraps to two lines between 320 and 1920 px: shorten the label or add `whitespace-nowrap`. Form fields reserve one line for their error message.

## Testing

- Every component with logic, interaction or conditional content gets a colocated `*.test.tsx`. Only `src/**/*.test.{ts,tsx}` runs.
- Test what a user sees and does: `getByRole` queries, `userEvent`, jest-dom matchers. No class-name assertions or large snapshots.
- Jest can't render async Server Components. Keep data loading in the page or an async wrapper and test the sync component that receives the data as props.
- `useRouter()` throws outside the App Router; mock `next/navigation` using the pattern in the `ui-testing` skill.
- `jest.setup.ts` stubs `PointerEvent`, which jsdom lacks and Base UI needs. Tests of server-side code that uses `fetch` opt into `/** @jest-environment node */`.
- Reference tests: `src/components/ui/button.test.tsx`, `src/features/clinic/components/consultation-form.test.tsx`.

## Skills

Project skills live in `.claude/skills/`:

- `frontend-design`: visual direction, typography and copy for new or reshaped UI
- `shadcn-ui`: finding, adding, composing and theming shadcn components
- `ui-testing`: writing and debugging Jest + Testing Library tests
- `add-route`: scaffolding a page and its feature folder in this structure

The Hallmark skill (`.agents/skills/hallmark`, pinned in `skills-lock.json`) audits pages for AI-slop design and redesigns them (verbs `audit`, `redesign`). Claude Code doesn't load `.agents/skills` automatically, so ask for it by path; it reads `design.md` and `.hallmark/` first.
