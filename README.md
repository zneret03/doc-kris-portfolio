# doc-kris-portfolio

Portfolio and consultation-booking website for Dr. Kris Raymund A. Francisco, MD, DPBO, FPOA, an orthopaedic surgeon in Iloilo City, built with Next.js 16, shadcn/ui and Tailwind CSS v4.

> **Content status.** Credentials, training, hospitals, awards and research come from the doctor's 2026 CV. Before launch, confirm the contact details, clinic address and hours, and replace the two illustration photos on the specialties page; see [Updating the content](#updating-the-content).

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero, practice facts, core clinical focus, a featured testimonial (hidden until there is one), a consultation call to action |
| `/about` | Background and approach, credentials, education and training, hospital affiliations, awards, research, continuing education |
| `/specialties` | Specialties, diagnosis, who the practice helps, the care journey |
| `/clinic` | Location, hours and access, phone and email, online booking through NowServing, testimonials (hidden until there are some) |
| `/privacy`, `/medical-disclaimer` | Legal pages |

The site also generates `sitemap.xml`, `robots.txt`, a web manifest, icons, a 404 page and a social share image for every page.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components), React 19, TypeScript in strict mode
- [Tailwind CSS v4](https://tailwindcss.com), configured in `src/app/globals.css` (there is no `tailwind.config`)
- [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com), with [Lucide](https://lucide.dev) icons
- Plus Jakarta Sans through `next/font`
- [Jest](https://jestjs.io) 30 and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Yarn 1

## Getting started

You need Node.js 20.9 or later and Yarn 1.22.

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are needed in development. To try other settings locally, copy `.env.example` to `.env.local`.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Starts the development server on port 3000 |
| `yarn build` | Builds for production and checks that every route prerenders |
| `yarn start` | Serves the production build |
| `yarn lint` | Runs ESLint |
| `yarn typecheck` | Generates route types, then runs `tsc --noEmit` |
| `yarn test` | Runs the unit tests (also `yarn test:watch` and `yarn test:coverage`) |
| `yarn shadcn add <component>` | Adds a shadcn/ui component to `src/components/ui` |

Before pushing, run `yarn lint && yarn typecheck && yarn test && yarn build`.

## Environment variables

| Variable | Needed | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | The canonical origin, such as `https://www.example.com`. Canonical URLs, the sitemap, structured data and share images all use it; social networks need it to load the preview image. Falls back to the Vercel production URL, then `http://localhost:3000`. |
| `CONSULTATION_WEBHOOK_URL` | When the request form is back | Where consultation requests are sent. Without it, the live form tells patients to call instead of pretending the request went through. |
| `CONSULTATION_WEBHOOK_SECRET` | Optional | Sent as `Authorization: Bearer <secret>` with every request, so the endpoint can reject anything else. |
| `GOOGLE_SITE_VERIFICATION` | Optional | The `content` value of Google Search Console's HTML-tag verification. Not needed when the domain is verified through DNS. |

### Booking and consultation requests

Patients book on SeriousMD. Every "Book consultation" link opens the doctor's SeriousMD profile (`bookingHref` in `src/config/site.ts`) in a new tab, and the clinic page links to NowServing's online-clinic booking (`onlineBookingHref`). NowServing can't be embedded in the site: its `Content-Security-Policy` only allows SeriousMD's own domains to frame it.

The site's own request form is parked: the code and tests remain (`src/features/clinic/`), but it isn't on the clinic page until requests have somewhere to go. In development it accepts requests without sending them anywhere and notes that in the server console. When it's back, each request is validated on the server, then sent to `CONSULTATION_WEBHOOK_URL` as one JSON `POST`. An inbox relay, a CRM webhook or an automation tool can receive it:

```json
{
  "type": "consultation-request",
  "submittedAt": "2026-10-22T09:15:00.000Z",
  "modality": "telehealth",
  "fullName": "Kenneth Sterling",
  "phone": "+1 555 010 2030",
  "email": "kenneth@example.com",
  "preferredDate": "2026-12-01",
  "timeWindow": "morning",
  "reason": "Second opinion"
}
```

- `modality` is `in-person` or `telehealth`.
- `timeWindow` is `morning`, `afternoon` or `earliest`, matching the clinic hours.
- `reason` is optional and may be empty.

A 2xx response counts as delivered. Any other response, or no answer within 10 seconds, shows the patient the clinic's phone number instead. A hidden honeypot field quietly drops spam bots.

Requests contain health information. The endpoint, and wherever it stores requests, must meet the privacy rules of the practice's jurisdiction, and the privacy policy should say how requests are handled.

## Project structure

```text
src/
├── app/          # routes only: pages, layouts and metadata files (share images, sitemap, robots, icons)
├── components/   # shared UI: ui/ holds the shadcn primitives, layout/ the header, menu and footer
├── config/       # site.ts holds the practice facts; brand-colors.ts the theme colours for images and metadata
├── features/     # one folder per area (home, about, specialties, clinic, legal, seo): components, copy and logic
└── lib/          # helpers such as cn() and the site URL
```

Pages in `src/app` stay thin and compose components from their feature folder. Each component's tests sit next to it as `*.test.tsx`. The full conventions are in [`CLAUDE.md`](CLAUDE.md).

## Updating the content

| What | Where |
| --- | --- |
| Doctor's name, credentials and specialty, contact details, address, hours, availability, navigation | `src/config/site.ts` |
| Portrait | Add the image to `public/images/` and set `doctor.portrait` in `src/config/site.ts` |
| Page copy, statistics and testimonials | `src/features/<page>/content.ts` |
| Facility photos | `public/images/`; the clinic page has no photo row until real ones exist |
| Privacy policy and medical disclaimer | `src/features/legal/content.ts` |
| Patient portal link and social profiles (optional) | `patientPortalUrl` and `sameAs` in `src/config/site.ts` |

Before launch:

- Back every statistic and outcome claim with evidence, or remove it.
- Get written consent for each testimonial, and check that the jurisdiction allows testimonials at all. In Australia, for example, AHPRA prohibits testimonials about clinical care in health advertising.
- Have the legal pages reviewed.
- Replace the illustration photos on the specialties page (an AI-generated sample and a stock crop) with real ones.

The full launch checklist is in [`.claude/priorities-and-action-items.md`](.claude/priorities-and-action-items.md).

## Design

The design system, "Clinical Midnight" (dark only), is locked in [`design.md`](design.md). It sets the colour tokens and typography, the layout for each type of page, the style of calls to action, and the patterns the site avoids. The tokens themselves are OKLCH values in `src/app/globals.css`.

The design started from Stitch mockups. It was then audited for generic, AI-template design with the [Hallmark](https://github.com/Nutlope/hallmark) skill and reworked; the findings and fixes are in [`.claude/hallmark-audit.md`](.claude/hallmark-audit.md).

## SEO and social previews

- Every page sets its own title, description and canonical URL through `pageMetadata()` in `src/features/seo/metadata.ts`.
- Every page has its own `opengraph-image.tsx` and `twitter-image.tsx`, rendered at build time as 1200×630 cards. Links pasted into Facebook, LinkedIn, X, WhatsApp, Slack or iMessage show a preview. `share-images.test.ts` fails if a page is missing one.
- Structured data (JSON-LD) describes the practice as a `Physician` and the site as a `WebSite`, with breadcrumbs and a type for each page, such as `ProfilePage` and `MedicalWebPage`.
- Vercel preview deployments are kept out of search engines automatically.
- Search titles and descriptions use "orthopedic", the spelling people search with ("Orthopedic Surgeon in Iloilo City"), while page copy keeps the official "Orthopaedic" of the doctor's credentials. Google treats the two spellings as the same word. `searchTitle` and `description` in `src/config/site.ts` hold the home page's.
- Ranking for a local search such as "orthopedic doctor in Iloilo" depends mostly on things outside this code: a Google Business Profile for the clinic that links to the site, the same name, address, phone and hours everywhere (site, SeriousMD, Facebook), the site's domain registered in Google Search Console with `sitemap.xml` submitted, and links to the site from the doctor's other profiles.

## Deployment

Any host that runs Next.js 16 works, and Vercel needs no extra configuration.

1. Set `NEXT_PUBLIC_SITE_URL`. Once the request form is back, also set `CONSULTATION_WEBHOOK_URL`, plus `CONSULTATION_WEBHOOK_SECRET` if the endpoint checks it.
2. Deploy, then check that the booking links open SeriousMD and NowServing (and, with the form back, send a test request and confirm it arrives).
3. Check the share previews with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), and the structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## Working with Claude Code

- [`CLAUDE.md`](CLAUDE.md) holds the project conventions: folder structure, Next.js 16 rules, UI and testing rules.
- [`AGENTS.md`](AGENTS.md) is maintained by `next dev`. It points coding agents to the Next.js docs bundled in `node_modules`.
- `.claude/skills/` has project skills for adding routes, adding shadcn/ui components and writing tests.
- `.agents/skills/hallmark` has the Hallmark design-audit skill. Claude Code doesn't load it automatically, so ask for it by path.
