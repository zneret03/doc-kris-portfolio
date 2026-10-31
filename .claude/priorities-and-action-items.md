# Clinical Midnight build: priorities and action items

Source: Stitch export `stitch_modern_doctor_portfolio`. It contains four dark-mode screens (home, about, specialties, clinic and booking) and the "Clinical Midnight" design system (`clinical_midnight/DESIGN.md`).

The mockups use a sample persona, **Dr. Julian Vance, MD, FACS** (a cardiothoracic surgeon in New York). The build uses that sample content, but every doctor-specific fact lives in data files, so the real details can replace it without code changes (see section 6).

**Hallmark pass (2026-10-22).** An AI-slop audit with the Hallmark skill replaced the mockups' structure (eyebrows, the gradient headline, glass cards, orbs, icon-card grids, the full-width nav and four-column footer). The palette, type, copy intent and information architecture were kept. `design.md` is now the source of truth for design, and it wins over the mockups where they disagree. Findings and fixes: `.claude/hallmark-audit.md`.

Legend: `[x]` done · `[ ]` to do · **P0** blocks launch · **P1** soon after launch · **P2** optional

## 1. Pages and routes

| Mockup screen             | Route          | Sections                                                                                                                             |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Home (Overview)           | `/`            | Hero with portrait and availability badge, impact metrics, core clinical focus (3 specialties), featured testimonial, consult banner |
| About & Credentials       | `/about`       | Intro with portrait, background and approach, credentials (3), education and training (5), hospital affiliations (9), awards, research, continuing education, consult CTA |
| Specialties & Services    | `/specialties` | Header (outcome strip hidden until figures are verified), specialties (4), diagnosis, who we help (3), care journey (3 steps), inquiries CTA |
| Clinic & Booking          | `/clinic`      | Header with availability; location, hours, access and contacts beside the NowServing booking card; testimonials (hidden while empty). The facility gallery is gone until real photos exist, and the request form is parked |

Supporting routes, not in the mockups but needed: `/privacy`, `/medical-disclaimer`, a 404 page, `sitemap.xml`, `robots.txt`, a web manifest, icons, and an Open Graph image for every page.

Every "Book consultation" or "Schedule…" CTA goes to the doctor's SeriousMD profile (`site.bookingHref`), where patients book online. They open in a new tab. The clinic page links to NowServing's online-clinic booking instead of the on-site request form, which is parked until requests have a destination (it can't be embedded: NowServing's CSP allows only SeriousMD's domains as frame ancestors). Specialty links go to `/specialties#<specialty>`.

## 2. Design system translation

| Design                                                                 | Implementation                                                                                      |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Background `#0e1321`, text `#dee2f6`, muted text `#bacac5`             | shadcn `--background`, `--foreground`, `--muted-foreground`                                         |
| Surface scale `#090e1c` `#161b2a` `#1a1f2e` `#252a39` `#303444`        | `bg-surface-lowest`, `-low`, `-container`, `-high`, `-highest` (CSS variables in `globals.css`)     |
| Primary teal `#57f1db` on `#003731`                                    | `--primary` / `--primary-foreground`, `--ring`                                                      |
| Secondary bio-cyan `#7bd0ff`                                           | `--info`, used only for the primary button's hover and the second canvas bloom (one accent per view). Tertiary `#67f0dc` is nearly identical to primary, so it maps to primary |
| Outline `#859490` (placeholders), error `#ffb4ab`                      | `--outline` → `placeholder:text-outline`, `--destructive`                                           |
| Plus Jakarta Sans for everything                                       | `next/font/google` registered as `--font-sans`; Geist removed                                       |
| 14-step type scale (display-lg … label-sm), with mobile display sizes  | `text-display`, `text-headline-xl` … `text-label-sm` in `@theme`; display and headline-xl step down below `md` |
| Radius: controls 8px, cards 12px, media 16px, pills full               | `--radius: 0.5rem` → `rounded-lg` 8px, `rounded-xl` ≈ 11px, `rounded-2xl` ≈ 14px                     |
| Elevation: tonal layers, frosted cards, teal glow instead of shadows   | Tonal layers only. The Hallmark pass cut the glass, glow and orbs; blur stays on the floating nav, and two fixed canvas blooms remain |
| Material Symbols icon font                                             | Lucide SVG icons (the shadcn icon library); mapping lives in each component                         |
| Dark only (`<html class="dark">`)                                      | `class="dark"` on `<html>`, `color-scheme: dark`, `theme-color #0e1321`                             |

Since the Hallmark pass, `globals.css` stores these colours as OKLCH equivalents, and `src/config/brand-colors.ts` keeps the hex values for metadata and image routes.

## 3. Parity decisions (where the build departs from the mockups, and why)

1. **Mobile navigation added.** The mockups hide the nav below `lg` and offer no menu, so phones can't reach other pages. The build adds a Sheet menu.
2. **Icon font replaced with Lucide.** Material Symbols is a large render-blocking font that shows ligature text (`calendar_month`) until it loads. Lucide is tree-shaken SVG.
3. **Portrait and logo.** Both are private Stitch assets (HTTP 403) and the portrait shows a fictional person. The build uses a monogram portrait placeholder that switches to a photo once `doctor.portrait` is set, and an SVG pulse logo that also serves as the favicon.
4. **Contact data consolidated.** The mockups use three phone numbers, two clinic addresses (Suite 740 / Suite 400) and two conflicting schedules. One set lives in `src/config/site.ts`.
5. **Dead links wired up.** All `#` links point to real routes or anchors. "Patient Portal" (footer) and the avatar icon (header) only render once a portal URL is configured, so no link goes nowhere.
6. **Semantics fixed.** Metric cards used `h3` straight after `h1`, and the footer used `h4`. Heading levels now follow the outline, decorative icons are hidden from screen readers, star ratings have a text label, and there's a skip link.
7. **Motion respects `prefers-reduced-motion`.** Since the Hallmark pass the only motion left is colour transitions, the menu sheet and the submit spinner; the mockups' pulsing and ping dots, image hover zoom and card lifts are gone.
8. **Responsive type.** The mockup HTML uses 56px display type on phones. The build applies the mobile sizes from DESIGN.md.
9. **Booking form works.** It validates on the server, shows errors next to fields, keeps input after errors, has a pending state and a spam honeypot, and never reports success unless the request was delivered.
10. **The copyright year is computed**, not hardcoded as "2025".

Decided during the build:

11. **The active nav link keeps the same size as the others.** The mockup enlarges it to 18px, which shifts the layout between pages; in the floating pill nav it sits on a raised surface instead.
12. **No hover arrow on the specialties.** The mockup fades an arrow in on hover, but the specialty rows don't lead anywhere, so it would promise a link that doesn't exist. Home's focus rows do link to their specialty, through a typographic link with an arrow.
13. **One shared CTA panel.** Home and specialties close with the same split `CtaPanel`, so their backgrounds differ slightly less than in the mockups; about closes with typographic links.
14. **The hero's two trust markers name different places.** "Memorial Surgical Pavilion" became the sample's second hospital, so the hero doesn't repeat the practice badge on the portrait.
15. **Full text on small screens.** The about-page leadership badge and the email card wrap instead of truncating.
16. **Every page has its own share card**, including the legal pages, because Next.js metadata doesn't inherit images into pages that set their own Open Graph fields.

## 4. Priorities

### P0: required for launch

- Foundation: tokens, fonts, layout shell, responsive navigation, footer.
- All four pages built to `design.md` (the Hallmark redesign of the mockups), responsive from 320px to 1440px.
- A consultation form with server validation and a delivery target (see the owner inputs).
- SEO: `metadataBase`, a title template, a unique title and description per page, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD, noindex on preview deployments.
- Social previews: a branded 1200×630 Open Graph/Twitter image for every page, with alt text, so links pasted into Facebook, LinkedIn, X, WhatsApp, Slack or iMessage render a card.
- Accessibility floor: contrast, keyboard focus, labels, landmarks, reduced motion.
- Real content and legal review (section 6). The sample persona must not ship.

### P1: soon after launch

- Real facility photos. The Vance-branded and cardiac samples are deleted; the specialties page still uses two illustrations (an AI sample and a crop of a stock photo).
- A favicon set and web manifest polished with the real logo.
- Analytics and Search Console verification, once the domain is known (DNS, or `GOOGLE_SITE_VERIFICATION`), then submit `sitemap.xml`.
- Local search: claim or create the Google Business Profile for the clinic (category "Orthopedic surgeon"), link it to the site, and keep its name, address, phone and hours identical to the site and SeriousMD, which disagree today. Add the Facebook page's URL to `sameAs` in `src/config/site.ts`, and link the site from the Facebook page and SeriousMD profile.
- Performance budget check on the deployed URL: LCP under 2.5s, CLS under 0.1.

### P2: optional refinements (owner's call)

The Hallmark pass removed the templated tells the `frontend-design` skill had flagged (eyebrow labels, the gradient headline phrase); the metric cards became a stat strip, whose figures still need verifying. Still the owner's call:

- A light theme or a theme toggle. Clinical Midnight is dark only.
- Publications, research, or case-study pages, which DESIGN.md's audience notes mention.

## 5. Action items

### Phase 1: Foundation

- [x] Clinical Midnight tokens in `src/app/globals.css` (colors, surface scale, type scale, radius, glow utilities)
- [x] Plus Jakarta Sans via `next/font`; `html.dark`, `color-scheme`, `theme-color`
- [x] `src/config/site.ts`: doctor identity, contact, address, hours, availability, navigation, practice areas
- [x] shadcn primitives: sheet, badge, input, textarea, label, field, native-select, radio-group, separator
- [x] Shared components: section heading, icon tile, star rating, CTA panel, status dot, ambient glow, logo, portrait
- [x] Site header (desktop nav with active state, CTA, mobile Sheet menu) and footer
- [x] Skip link and `main` landmark
- [x] Theme-aware `cn` (custom text sizes and shadows registered; ESLint blocks the stock import; a test catches unregistered tokens)

### Phase 2: Pages

- [x] Home: hero, metrics, clinical focus, featured testimonial, consult banner
- [x] About: intro and ethos, credentials, timeline, privileges, CTA
- [x] Specialties: header metrics, specialty cards with anchors, diagnostics highlight, who we help, care journey, CTA
- [x] Clinic: header, info cards, gallery, testimonials, assistance panel
- [x] Privacy policy and medical disclaimer pages (template copy, flagged for review)
- [x] 404 page

### Phase 3: Consultation request

- [x] Form UI: modality toggle, name, phone, email, date, time window, reason
- [x] Server action: validation, honeypot, delivery through `CONSULTATION_WEBHOOK_URL`, honest failure when it isn't configured
- [x] Pending, success and error states; field errors announced to screen readers
- [x] `.env.example` documenting the environment variables

### Phase 4: SEO and social sharing

- [x] Root metadata: `metadataBase` from `NEXT_PUBLIC_SITE_URL` (Vercel URL fallback), title template, defaults, robots
- [x] Per-page metadata with canonical URLs
- [x] JSON-LD: `Physician` practice and `WebSite` (site-wide), `ProfilePage` + `Person` (about), `BreadcrumbList` (subpages), `MedicalWebPage` with `MedicalProcedure` items (specialties), `ContactPage` (clinic). No review or rating markup, because Google treats self-serving reviews as ineligible
- [x] `opengraph-image` and `twitter-image` for every page, including `/privacy` and `/medical-disclaimer`
- [x] `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon.svg`, `apple-icon`, `favicon.ico`

### Phase 5: Quality

- [x] Unit tests for interactive and logic components (header nav, mobile menu, form, validation, delivery, rating, portrait, testimonials, JSON-LD, metadata, share-image coverage)
- [x] `yarn lint && yarn typecheck && yarn test && yarn build` green
- [x] Visual QA screenshots at 1440px and 390px against the mockups; no horizontal overflow on any page
- [x] Rendered HTML check: titles, canonical, OG and Twitter tags, JSON-LD, sitemap, robots
- [x] Form checked in a real browser: label and keyboard selection, field errors, input kept after errors, honest failure without a webhook
- [x] CLAUDE.md and the project skills updated with the conventions from this build
- [x] Hallmark AI-slop audit and multi-page redesign: `.claude/hallmark-audit.md`, `design.md`, `.hallmark/`
- [x] Re-checked after the redesign at 320, 375, 414 and 768px (no sideways scroll, no two-line clickable text), with a visible keyboard focus outline on every control

### Remaining before launch (needs the owner, see section 6)

- [x] Replace the sample persona with Dr. Kris Raymund A. Francisco's CV (2026-10-31): credentials, training, hospitals, awards, research, recent courses, languages, contact details and a portrait cropped from `public/images/doc-kris-profile.jpg`. Sample testimonials and outcome figures are removed; their sections hide while empty
- [ ] Confirm with the doctor: publishing the CV's mobile number and Gmail address (or a clinic line instead), the clinic address and hours, and the conditions listed under each specialty
- [ ] Two CV entries disagree with themselves: "Most Outstanding Orthopaedic Resident" nominee is dated November 2020 but named the POA 70th convention (the 71st was 2020), and "Outstanding Surgery Intern" says C.Y. 2015–2016 though the clerkship ran April 2014 – March 2015. The site shows 2020 for the first and no year for the second
- [ ] Real logo and facility photos
- [ ] Set `NEXT_PUBLIC_SITE_URL` in production
- [ ] Bring back the on-site request form (`ConsultationRequestCard` with the `requestConsultation` action) once requests have a destination: set `CONSULTATION_WEBHOOK_URL`, restore the privacy policy's form section, and send a test request end to end
- [ ] Legal review of the privacy policy, disclaimer, testimonials and outcome claims for the practice's jurisdiction
- [ ] Check share previews on the live domain with each platform's debugger (Facebook Sharing Debugger, LinkedIn Post Inspector), and validate structured data with Google's Rich Results Test

## 6. Owner inputs needed

These block launch but not the build. Each one maps to a file.

| Input                                                                  | Where it goes                                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Doctor's name, post-nominals, specialty, registration or board details | `src/config/site.ts`                                                      |
| Professional portrait (at least 1200px, square-friendly) and a logo, if any | `public/images/` + `doctor.portrait` in `site.ts`                    |
| Clinic address, map location, phone numbers, email, hours, hospital affiliations | `src/config/site.ts`, `src/features/about/content.ts`           |
| Verified statistics, or approval to remove them                       | `src/features/home/content.ts`, `src/features/specialties/content.ts`     |
| Testimonials, with written consent and a jurisdiction check            | `src/features/home/content.ts`, `src/features/clinic/content.ts`          |
| Production domain                                                      | `NEXT_PUBLIC_SITE_URL`                                                    |
| Where consultation requests go (inbox, CRM or scheduling tool)         | `CONSULTATION_WEBHOOK_URL`                                                |
| Patient portal URL and social profiles (optional)                      | `src/config/site.ts`                                                      |
| Privacy policy and medical disclaimer, reviewed for the jurisdiction   | `src/features/legal/content.ts`                                           |

### Content risks to resolve before launch

- **Outcome claims**: the sample figures are removed. The home strip shows CV facts (fellowships, hospitals, languages); success rates or patient numbers need a source before they go back in.
- **Testimonials** are restricted in some places. In Australia, AHPRA prohibits testimonials about clinical care in health advertising, and in the US the FTC requires them to be genuine and representative. Each testimonial section hides itself when its list is empty.
- **Privacy claims**: the sample "HIPAA compliant" and "256-bit encryption" lines are removed (HIPAA is US law). The form collects health information, so the privacy policy, which now cites the Philippine Data Privacy Act of 2012, has to describe how requests are really handled.
- **Personal data from the CV**: the birth date, home address and referees' phone numbers are deliberately left off the site, and so is the PRC license number (patients can verify it with the PRC instead).
