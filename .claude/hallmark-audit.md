# Hallmark audit: AI-slop scan

Run on 2026-10-22 with the `hallmark` skill (`.agents/skills/hallmark`, v1.1.0), verb `audit`, over every page: `/`, `/about`, `/specialties`, `/clinic`, `/privacy`, `/medical-disclaimer` and the 404 page. The fix pass that followed is recorded in [Resolution](#resolution).

## Pre-flight findings

- Font stack: Plus Jakarta Sans (next/font, `src/app/layout.tsx` L2, L14), one family for display and body. Italic files load only for testimonials (L18).
- Palette: hex custom properties in `src/app/globals.css` `:root` (L109+), mapped through Tailwind v4 `@theme inline` (L7) and `@theme` (L48). Anchor: teal `#57f1db`, second accent cyan `#7bd0ff`, blue-tinted slate surfaces.
- Motion: no motion library (`package.json`); `tw-animate-css` (L24) only serves shadcn primitives. Motion-cut project.
- Spacing: Tailwind's default 4-point scale; no custom spacing tokens.
- Framework: Next.js 16.4 App Router (`package.json` L20), shadcn/ui on Base UI (L16), Lucide icons (L19).
- No `design.md`, no `.hallmark/` history, no Hallmark stamp.

Hallmark preserves the palette, the font, the spacing scale, the routes, the copy intent and the information architecture. It introduces a macrostructure per page type, nav and footer archetypes, and slop-test discipline.

Genre is **atmospheric**, from the dark-mode signal.

Inferred context (no answers were given, so these are inferred from the owner's DESIGN.md):

- **Audience:** prospective cardiac-surgery patients, their families, and referring physicians.
- **Use case:** request a consultation.
- **Tone:** calm, clinical, quietly authoritative.

## Punch list

Many of these tells came from the Stitch mockup itself (eyebrows, the gradient headline, glass cards, orbs, pulsing dots, equal icon-card grids, the four-column footer). The build reproduced them for parity. Hallmark treats its structural rules as overriding parity instructions.

### Critical (ships as slop)

```
[critical] The gradient headline — src/features/home/components/home-hero.tsx:33, src/components/doctor-portrait.tsx:58
  `bg-clip-text` teal→cyan fill on "Grounded in Empathy" and on the monogram; gate 2 bans gradient text in every genre
  → solid ink; carry emphasis with weight or a line break
[critical] Generic AI page template — src/app/page.tsx:20-29, src/app/specialties/page.tsx
  hero → stat cards → three feature cards → testimonial → CTA → footer, no asymmetry (gate 8)
  → Split Studio macrostructure for marketing pages, Long Document for content pages
[critical] The 3-column feature grid — clinical-focus.tsx:29, patient-cohorts.tsx:17, care-journey.tsx:15, clinic-info-cards.tsx:41, impact-metrics.tsx:10, credentials-grid.tsx:14 (4-up)
  equal columns, icon tile above a heading above body copy, six times across the site (gate 3)
  → alternating split rows, spec-sheet rows, a step sequence and a stat strip; no tiles above headings
[critical] Floating-orb decoration — 13 <AmbientGlow> orbs in home-hero (3), about-intro (2), specialties-header, specialty-cards, clinic-header, assistance-panel, featured-testimonial, cta-panel, not-found
  blurred circles added "for depth", no semantic role (gates 29, 45)
  → cut all of them; keep at most the two fixed canvas blooms the atmospheric genre allows
[critical] Card-in-card — hospital-privileges.tsx:15-38, assistance-panel.tsx:48-90, home-hero.tsx:73-87
  an inner "Title" panel inside each privilege card, contact cards inside the assistance card, a glass badge card inside the portrait card (gate 4)
  → one containment layer: rows and definition lists inside a single surface
[critical] The AI nav — src/components/layout/site-header.tsx:13-38
  wordmark left, four centred links, CTA right, full-width fixed bar (gate 42)
  → N5 Floating pill (atmospheric default), corner chip on mobile
[critical] The AI footer — src/components/layout/site-footer.tsx:30-131
  four columns (brand · practice areas · hours · centre) plus a copyright strip catalogues the site instead of closing it (gate 43)
  → Ft5 Statement: one closing sentence, practice details in a muted meta row
[critical] Wrap-to-two-lines clickable text — measured at 320/375/414/768 px
  logo tagline (320), home focus-card title links (320, 375, 768), clinic contact links (320, 375), consultation-type toggle (320–414) (gate 49)
  → shorter labels ("In-person", "Telehealth", "Referral line"), single-line CTA links, `white-space: nowrap` on affordances
```

### Major (looks AI-generated)

```
[major] Eyebrow on every section — 15 kickers: home-hero.tsx:21, clinical-focus.tsx:13, consult-banner.tsx:13, about-intro.tsx:18 and :65, credentials-grid.tsx:10, career-timeline.tsx:10, hospital-privileges.tsx:10, about-cta.tsx:14, specialties-header.tsx:13, specialty-cards.tsx:15, patient-cohorts.tsx:12, care-journey.tsx:10, inquiries-cta.tsx:14, clinic-header.tsx:15, clinic-info-cards.tsx:44/59/76, patient-testimonials.tsx:16, consultation-request-card.tsx:17, not-found.tsx:18
  uppercase kicker above nearly every heading; when every section is "chaptered", none is
  → zero eyebrows; numerals only where the content is a real sequence (care journey, training)
[major] Italic headers — featured-testimonial.tsx:14 (display-size italic quote), patient-testimonials.tsx:41, italic font loaded at layout.tsx:18
  italic display type is a top AI tell (gate 38a)
  → roman quotes; stop loading the italic files
[major] Glassmorphism without purpose — impact-metrics.tsx:14, clinical-focus.tsx:33, specialties-header.tsx:31, home-hero.tsx:73, about-intro.tsx:38, button.tsx secondary variant
  frosted panels as decoration; the atmospheric genre bans glass
  → solid elevated surfaces; keep blur only on the nav, which floats over content
[major] Shadow-glow on dark — button.tsx:11 (permanent teal halo), pills at home-hero.tsx:21 and specialties-header.tsx:13, heavy shadow-xl/2xl/portrait at home-hero.tsx:70, cta-panel.tsx:36, consultation-request-card.tsx:14, featured-testimonial.tsx:10, about-intro.tsx:36
  coloured halos and big shadows on dark surfaces
  → elevation by surface lightness; no glow
[major] Icon-tile feature card — IconTile in 10 places (metrics, focus, credentials, cohorts, journey, clinic info, hero badge, about badge, assistance)
  coloured square icon above every heading
  → drop icons from content blocks; keep small tiles only beside contact details
[major] Centred everything — specialties-header.tsx:12, clinic-header.tsx:12, patient-cohorts.tsx (centred head), cta-panel.tsx:49 (about CTA), not-found.tsx:16
  page heads with badge, title, lede and stats all on one centred axis
  → left-biased page heads
[major] Decorative status pulses — home-hero.tsx:22 and :84, specialties-header.tsx:14, about-intro.tsx:19, assistance-panel.tsx:95, clinic-header.tsx:29, site-footer.tsx:42
  pulsing and pinging dots on labels that aren't live status (gate 45)
  → one static availability dot where availability is the content
[major] Two accent hues juggled — specialties content (CABG card, outcome stats), cohorts, hospital privileges in cyan `info`
  teal and cyan alternate card by card; atmospheric allows one accent
  → teal is the only accent; cyan survives as the primary button's hover state
[major] Stacked hover effects and uniform hover-scale — clinical-focus.tsx:33-58 (background, shadow, icon fill, arrow slide at once), scale on credentials-grid.tsx:24, specialty-cards.tsx:51, assistance-panel.tsx:30, facility-gallery.tsx:18, lift on clinic-info-cards.tsx:19, career-timeline.tsx:21 (gates 11, 13)
  → one signal per element: surface lightness or underline
[major] transition-all — button.tsx:6, badge.tsx:7, clinical-focus.tsx:33
  animates everything, including the focus ring (gates 10, 15)
  → named properties only; focus rings appear instantly
[major] Hero floats off the page — home-hero.tsx:15
  symmetric `py-10 lg:py-24` (gate 44a)
  → bottom padding at least 1.3× the top
[major] Mobile floor — src/app/globals.css
  no `overflow-x: clip` on html/body (gate 34) and display headings without `overflow-wrap: anywhere; min-width: 0` (gate 51). No overflow was observed, but both are required
  → add both to the base layer
```

### Minor (small taste issues)

```
[minor] Three periods instead of an ellipsis — consultation-form.tsx:207 → "…"
[minor] Tracked uppercase chrome and middle-dot meta strings — logo.tsx:44 ("MD, FACS • CARDIOTHORACIC"), site-footer.tsx:49/58/78, patient-cohorts.tsx:33, specialties-header.tsx:33, assistance-panel.tsx:33 → sentence case
[minor] Inline colour outside tokens — site-header.tsx:13 rgb shadow; hex repeated in layout.tsx:43, manifest.ts:12-13, og-image.tsx, apple-icon.tsx (gate 48) → one token module for non-CSS consumers
[minor] Every section padded the same — `py-10` on most sections (gate 9) → vary the rhythm; let surface changes separate sections
[minor] Prose wider than 75ch — about-intro.tsx:69-73, cta-panel.tsx description (gate 25) → cap at 65ch
[minor] Error slot collapses when empty — consultation-form.tsx field errors (gate 39) → reserve one line
[minor] No Hallmark stamp, design.md or log (gate 20) → stamp globals.css, write design.md and .hallmark/log.json
[minor] Colours declared in hex — globals.css :root → OKLCH equivalents
[minor] "→" on most links → arrows only on typographic CTAs
```

### Passing gates

1 (Plus Jakarta Sans isn't a default face, and one family is the atmospheric voice) · 5 · 7 · 12 · 14 · 16–19 · 21 · 22 (neutrals are blue-tinted) · 30 (Lucide only) · 33 · 35–37 · 40–41 (lowest key pair 5.19:1) · 47 · 50 (Tailwind grids use `minmax(0,1fr)`) · 52–57.

Note on gate 46 (invented metrics): the figures (9,000+, 99%, 98.9%, 0%…) were supplied by the owner's mockup, not made up by the model. They're still unverified sample numbers and stay on the launch-blocker list in `priorities-and-action-items.md`.

```
Summary — 8 critical · 12 major · 9 minor
Verdict — ships as slop
```

## Resolution

Fixed on 2026-10-22 with Hallmark `redesign` (multi-page), under the system locked in [`design.md`](../design.md). A pre-fix copy of the project was kept outside the repo. No files were deleted; the `Eyebrow` export was retired, and `text-link.tsx`, `brand-colors.ts` and `about-portrait.tsx` are new. Every finding above is closed:

| Finding | Status | What changed |
| --- | --- | --- |
| Gradient headline | fixed | Solid ink everywhere; the hero carries emphasis with a line break, the monogram is solid teal. No `bg-clip-text` in `src/`. |
| Generic AI page template | fixed | Split Studio on `/`, `/specialties`, `/clinic`; Long Document on `/about`, `/privacy`, `/medical-disclaimer`. |
| 3-column feature grids | fixed | F3 spec rows (focus, cohorts), F4 step sequence (care journey), definition lists (credentials, clinic details, privileges), T4 stat strips. The only 3/4-column grids left are the two stat strips. |
| Floating orbs | fixed | One `<AmbientGlow />` in the root layout: two fixed canvas blooms, nothing else. |
| Card-in-card | fixed | One containment layer: privileges and clinic details are lists on one surface, the assistance rows are the only surfaces in their section, the hero badge is gone. |
| AI nav | fixed | N5 floating pill; corner chip and sheet below `lg`. |
| AI footer | fixed | Ft5 statement ("Precision in the theater, warmth at the bedside.") over a muted meta row. |
| Two-line clickable text | fixed | Shorter labels, `white-space: nowrap` on affordances, and the contact-row icon steps aside below an 18rem row (container query) so the email stays on one line at 320 px. |
| Eyebrows | fixed | None left; the share cards' small label is now `section`, in sentence case. |
| Italic headers | fixed | Roman quotes; the italic font files are no longer loaded. |
| Glassmorphism | fixed | Blur only on the floating nav. |
| Shadow-glow | fixed | Elevation by surface lightness; one `shadow-float` token, on the nav pill only. |
| Icon-tile feature cards | fixed | `IconTile` survives only beside the clinic contact details. |
| Centred everything | fixed | Left-biased page heads; no `text-center` outside UI primitives. |
| Decorative pulses | fixed | One static availability dot; the only animation is the submit spinner (`motion-safe`). |
| Two accents | fixed | Teal is the only accent; cyan is the primary button's hover and the second bloom. |
| Stacked hovers, hover-scale | fixed | One signal per element (surface lightness, underline or fill); no scale or lift. |
| `transition-all` | fixed | Named properties only (`transition-colors`). |
| Hero floats off the page | fixed | `pt-6 pb-14` → `lg:pt-10 lg:pb-20`, bottom-heavy. |
| Mobile floor | fixed | `overflow-x: clip` on `html, body`; `overflow-wrap: anywhere; min-width: 0` on `h1–h3`. |
| Ellipsis | fixed | "…" |
| Uppercase and middot chrome | fixed | Sentence case everywhere, share cards included; no `uppercase` in `src/`. |
| Inline colour outside tokens | fixed | `src/config/brand-colors.ts` feeds metadata, manifest and image routes; no colour literals elsewhere. |
| Equal section padding | fixed | Varied rhythm (bands `py-12`, long sections `py-16`, bottom-heavy hero) plus surface shifts. |
| Prose wider than 75ch | fixed | Long Document column at 65ch; ledes capped at 52–60ch. |
| Error slot collapses | fixed | Each field reserves one line; error copy shortened to fit it. |
| No stamp, design.md or log | fixed | Stamp at the top of `globals.css`, `design.md` at the root, `.hallmark/log.json` and `.hallmark/preflight.json`. |
| Hex colours | fixed | OKLCH in `:root`. |
| Arrows on most links | fixed | "→" only on typographic CTAs. |

### Found during the fix pass

```
[major] Focus rings built from box-shadow — 5 shadcn primitives (button, input, textarea, native-select, radio-group), badge, and 8 custom links (gate 39, focus sub-check)
  `outline-none` + `ring-3` vanishes in forced-colors mode, where box-shadows are dropped
  → fixed: one `focus-ring` utility (2 px teal outline, 2 px offset, instant) on every control, the skip link included
[minor] Share-card kicker in Title Case — src/app/**/opengraph-image.tsx
  → fixed: renamed `eyebrow` → `section`, sentence case
[minor] Email contact row wrapped at 320 px — assistance-panel.tsx (gate 49)
  → fixed: container query hides the decorative tile below an 18rem row
```

### Re-measured

- Gates 34 and 49: pass at 320, 375, 414 and 768 px on all seven routes, the 404 included.
- Gate 39: borders stay 1 px in every state, focus is an outline, inputs and the submit button share 48 px, error slots are reserved, and the pending submit uses the native `disabled` attribute plus opacity and a "Sending request…" label.
- Gate 44: the home hero's headline, lede, CTA and portrait fit a 1280×800 screen (CTA bottom at 526 px).
- Gates 30, 47, 48: Lucide only, no emoji, no re-drawn chrome, no colour literals outside tokens.
- Gates 40–41: palette unchanged since the audit (lowest key pair 5.19:1); the teal focus outline is about 13:1 against the canvas.
- Gate 46 still depends on the owner: the figures come from their mockup and stay on the launch list.
- Checks: `yarn lint`, `yarn typecheck`, `yarn test` and `yarn build` pass, and every route is static.

```
Pre-emit critique — P4 H4 E4 S4 R4 V5
Summary — 0 critical · 0 major · 0 minor open
Verdict — ships
```
