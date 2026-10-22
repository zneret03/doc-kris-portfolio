# Design — doc-kris-portfolio (Clinical Midnight)

A locked design system for this site. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

Produced by `hallmark redesign` (multi-page) after the audit in `.claude/hallmark-audit.md`. The palette and type come from the owner's Stitch design system ("Clinical Midnight"); Hallmark preserved them and replaced the structure.

## Genre

atmospheric — dark canvas, two quiet blooms, one accent, plain-English display.

## Macrostructure family

- **Marketing pages** (`/`, `/specialties`, `/clinic`): **Split Studio**. Content blocks divide the row: text on one side, proof (portrait, photography, a highlights list, the form) on the other, alternating direction down the page. Archetypes that vary per page: H2 split hero, T4 stat strip, F3 spec rows, T1 pull quote, F4 step sequence. No archetype repeats within a page.
- **Content pages** (`/about`, `/privacy`, `/medical-disclaimer`): **Long Document**. A single 65ch column, inline section heads, typographic links instead of buttons. `/about` carries the portrait in a margin column on wide screens.
- **App pages**: none.

## Theme

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `oklch(18.9% 0.030 268.5)` | paper (canvas) |
| `--surface-lowest` | `oklch(16.7% 0.031 268.0)` | footer, wells |
| `--surface-low` | `oklch(22.5% 0.030 269.7)` | paper-2: bands, rows, form card |
| `--surface-container` | `oklch(24.2% 0.030 269.9)` | paper-3: hover, inputs |
| `--surface-high` | `oklch(28.7% 0.029 270.2)` | raised controls |
| `--surface-highest` | `oklch(32.8% 0.029 273.8)` | segmented-control track |
| `--foreground` | `oklch(91.6% 0.028 276.8)` | ink |
| `--muted-foreground` | `oklch(82.5% 0.019 175.2)` | ink-2 |
| `--outline` | `oklch(65.3% 0.018 178.0)` | placeholders |
| `--primary` | `oklch(87.2% 0.133 181.9)` | accent (teal) |
| `--primary-foreground` | `oklch(30.2% 0.054 183.2)` | accent-ink |
| `--info` | `oklch(82.1% 0.106 234.3)` | accent hover (cyan), second bloom |
| `--destructive` | `oklch(83.8% 0.089 26.8)` | errors |
| `--ring` | `= --primary` | focus |

Accent placement: primary CTA fill, links, small tags, the availability dot, focus rings. Never on display text, never as a second card colour.

## Typography

- Display: Plus Jakarta Sans 700 (`text-display-lg`) and 600 (`text-headline-*`), roman only, tracking −0.03em to −0.01em.
- Body: Plus Jakarta Sans 400 (`text-body-*`), labels 600 (`text-label-*`).
- Mono: none. One family is the atmospheric voice.
- Type scale anchor: `--text-display-lg` = 3.5rem (2.25rem below `md`). Full scale in `src/app/globals.css` `@theme`.
- Sentence case for every label. No tracked uppercase, no italic headings or quotes.

## Spacing

Tailwind's 4-point scale. Sections vary their rhythm (hero `pt-6 pb-14 → lg:pt-10 lg:pb-20`, bottom-heavy so it sits into the page; bands `py-12`; long sections `py-16`). Elevation changes separate sections; no hairline rules.

## Motion

- No reveals. The page is just there.
- Colour transitions only (`transition-colors`, 150 ms). No hover scale, lift or slide.
- Reduced motion: sheet and colour transitions switch off (`motion-reduce:transition-none`).

## Microinteractions stance

- Silent success; the form confirms inline, no toasts.
- One hover signal per element: surface lightness on rows, underline on links, cyan fill on the primary button.
- Focus is a 2 px teal outline, offset 2 px, shown instantly: the `focus-ring` utility in `globals.css`. Never a box-shadow ring (it vanishes in forced-colors mode), never transitioned. The resting `outline-color` already matches, so `transition-colors` has nothing to fade.
- Fields keep a 1 px border in every state; focus and error change colour only. Each field reserves one line under it for its error, and error copy is written to fit that line ("Enter an email like name@example.com.").

## CTA voice

- Primary: filled teal pill (`rounded-full`), verb-first label ("Book consultation"), hover to cyan. One per view.
- Secondary: C3 typographic link — words, a trailing →, a 1 px underline that thickens on hover. Phone numbers are typographic links too.

## Chrome

- Nav: **N5 Floating pill** — detached from the edges, content-sized (≤ 720 px), blur backdrop (the only glass on the site, because it floats over content). Wordmark doubles as the home link. Below `lg` it becomes a corner chip: wordmark left, menu button right; the sheet menu carries every link plus booking and phone.
- Footer: **Ft5 Statement** — closing line "Precision in the theater, warmth at the bedside.", then a muted meta row: name, address, phone, hours, legal links, copyright. No columns, no rule.
- Canvas: two fixed radial blooms (teal top-right, cyan bottom-left), rendered once by `AmbientGlow` in the root layout. No other orbs.

## Per-page allowances

- Marketing pages MAY use the portrait and facility photography as the proof half of a split.
- Content pages: typography only (plus the margin portrait on `/about`).
- Icons: Lucide only, inline with text or in a small tile beside contact details — never a tile above a heading. A contact tile steps aside (container query, `@2xs`) when the row is too narrow to keep its value on one line.

## What pages MUST share

- The wordmark (pulse mark + name).
- The accent and its placement (≤ 5 % of any viewport, excluding the blooms).
- Plus Jakarta Sans, roman.
- The CTA voice (pill primary, typographic secondary).
- Section heading rhythm: S2 hanging heads — an `h2`, optionally a one-line lede. **No eyebrows.**
- N5 nav and Ft5 footer.

## What pages MAY differ on

- Macrostructure within the page-type family.
- Archetype mix per section (never repeated within one page).
- Whether a split row puts text left or right.

## Banned on this project

Eyebrows and kickers · gradient text · italic display or quotes · glass cards · decorative orbs · icon tiles above headings · equal three-column card grids · pulsing or pinging decorative dots · `transition-all` · a second accent colour per view · hover scale or lift.

## Exports

Drop-in formats for re-using this design system elsewhere. The live source is `src/app/globals.css`.

### tokens.css

```css
:root {
  --color-paper:      oklch(18.9% 0.030 268.5);
  --color-paper-2:    oklch(22.5% 0.030 269.7);
  --color-paper-3:    oklch(24.2% 0.030 269.9);
  --color-ink:        oklch(91.6% 0.028 276.8);
  --color-ink-2:      oklch(82.5% 0.019 175.2);
  --color-rule:       oklch(28.7% 0.029 270.2);
  --color-accent:     oklch(87.2% 0.133 181.9);
  --color-accent-ink: oklch(30.2% 0.054 183.2);
  --color-accent-hover: oklch(82.1% 0.106 234.3);
  --color-focus:      oklch(87.2% 0.133 181.9);

  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-body:    "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg: 2rem;
  --space-xl:  3rem;     --space-2xl: 4rem;    --space-3xl: 6rem;

  --text-display: 3.5rem; --text-headline-xl: 2.5rem; --text-headline-lg: 2rem;
  --text-headline-md: 1.5rem; --text-body-lg: 1.125rem; --text-body-md: 1rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 150ms;
  --radius-card: 0.7rem; --radius-pill: 9999px; --radius-input: 0.5rem;
}
```

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper:   oklch(18.9% 0.030 268.5);
  --color-ink:     oklch(91.6% 0.028 276.8);
  --color-accent:  oklch(87.2% 0.133 181.9);
  --font-display:  "Plus Jakarta Sans", sans-serif;
  --font-body:     "Plus Jakarta Sans", sans-serif;
  --text-display-lg: 3.5rem;
  --text-display-lg--line-height: 4rem;
  --text-display-lg--letter-spacing: -0.03em;
  --text-display-lg--font-weight: 700;
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`

```json
{
  "color": {
    "paper":  { "$value": "oklch(18.9% 0.030 268.5)", "$type": "color" },
    "ink":    { "$value": "oklch(91.6% 0.028 276.8)", "$type": "color" },
    "accent": { "$value": "oklch(87.2% 0.133 181.9)", "$type": "color" },
    "accent-ink": { "$value": "oklch(30.2% 0.054 183.2)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Plus Jakarta Sans", "$type": "fontFamily" },
    "body":    { "$value": "Plus Jakarta Sans", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background:         oklch(18.9% 0.030 268.5);
  --foreground:         oklch(91.6% 0.028 276.8);
  --card:               oklch(24.2% 0.030 269.9);
  --popover:            oklch(22.5% 0.030 269.7);
  --primary:            oklch(87.2% 0.133 181.9);
  --primary-foreground: oklch(30.2% 0.054 183.2);
  --secondary:          oklch(28.7% 0.029 270.2);
  --muted:              oklch(24.2% 0.030 269.9);
  --muted-foreground:   oklch(82.5% 0.019 175.2);
  --border:             oklch(28.7% 0.029 270.2);
  --input:              oklch(39.5% 0.019 176.1);
  --ring:               oklch(87.2% 0.133 181.9);
  --radius:             0.5rem;
}
```
