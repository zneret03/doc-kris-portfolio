---
name: shadcn-ui
description: Add, compose, customize and theme shadcn/ui components in this repo (Base UI primitives, base-nova style, Lucide icons, Clinical Midnight theme). Use whenever UI needs a button, input, form control, dialog, sheet, menu, card, tabs, toast or any other primitive, before writing one by hand, and when changing the theme or a file in src/components/ui.
---

# shadcn/ui in this repo

## Setup (from `components.json`)

- Primitives come from **Base UI** (`@base-ui/react`), not Radix. Style `base-nova`, icons from `lucide-react`, theming through CSS variables in `src/app/globals.css`.
- The CLI writes components to `src/components/ui/` and hooks to `src/hooks/`, with kebab-case file names.
- Everything imports `cn` from `@/lib/utils`. That `cn` registers the custom theme scales; the stock `"cn"` package treats `text-label-sm` as a color and drops it next to `text-primary`. ESLint rejects direct `"cn"` imports.
- The CLI is a project dependency. Run it through yarn so the pinned version is used: `yarn shadcn <command>`.

## Workflow

1. **Check what exists:** `ls src/components/ui`. In use: badge, button, field, input, label, native-select, radio-group, separator, sheet, textarea.
2. **Find the right item:** `yarn shadcn search @shadcn -q "<term>"` lists components, blocks and examples.
3. **Read its docs before using it:** `yarn shadcn docs <name>` prints the docs URL. Fetch the Markdown version with `curl -sL -H "Accept: text/markdown" https://ui.shadcn.com/docs/components/base/<name>.md`. Use the **base** docs; the Radix pages show a different API.
4. **Preview, then add:** `yarn shadcn add <name> --dry-run`, then `yarn shadcn add <name>`.
5. **Fix the generated `cn` import**, then confirm with lint:

   ```bash
   sed -i 's|import { cn } from "cn"|import { cn } from "@/lib/utils"|' src/components/ui/<name>.tsx
   yarn lint
   ```

6. **Review what it wrote:** new files, new dependencies in `package.json`, changes to `globals.css`. Undo any change that resets the Clinical Midnight tokens.
7. **Compose it** in a feature component (`src/features/<feature>/components/`) or a shared one (`src/components/`). App-specific composites never go in `components/ui/`.
8. **Test** the component that uses it (`ui-testing` skill), then run `yarn lint && yarn typecheck && yarn test`.

## Base UI rules

- Composition uses the `render` prop, not `asChild`:

  ```tsx
  <DialogTrigger render={<Button variant="outline" />}>Edit details</DialogTrigger>
  ```

- Links that look like buttons get the button styles; don't wrap them in `Button`:

  ```tsx
  import Link from "next/link";

  import { buttonVariants } from "@/components/ui/button";

  <Link href="/clinic#request-consultation" className={buttonVariants({ size: "xl" })}>
    Book consultation
  </Link>;
  ```

  Never use `<Button render={<a />} nativeButton={false}>` for navigation. Base UI's Button always sets `role="button"`, which hides the link from assistive technology.
- Icons inside a button take `data-icon="inline-start"` or `data-icon="inline-end"` so spacing is right. The button sets their size.
- A Radio renders a focusable `<span role="radio">` plus a hidden `<input>`, so it submits with the form. For card or segmented-control styling, wrap each item in a `<Label>`, hide the item with `sr-only`, and style the label with `has-data-checked:` and `has-focus-visible:`. See `src/features/clinic/components/consultation-form.tsx`.
- Base UI modules ship their own `"use client"`. A Server Component can render them, but passing event handlers needs a Client Component parent.
- Open, closed and checked states are exposed as data attributes. Style them with the `data-open:`, `data-closed:` and `data-checked:` variants that `shadcn/tailwind.css` defines.

## Customizing

- One-off adjustment: pass `className` at the call site. Primitives merge it with `cn`.
- **The `dark:` trap.** `<html>` always has `class="dark"`, so primitives' `dark:bg-input/30`-style classes are active and beat a plain `bg-*` on specificity. Override backgrounds at the call site with the dark variant: `dark:bg-surface-container dark:hover:bg-surface-high/60`.
- `NativeSelect` puts `className` on its wrapper. Reach the `<select>` with child variants: `[&>select]:h-12 [&>select]:dark:bg-surface-container`.
- A variant the whole site needs: add it to the primitive's `cva` variants in `src/components/ui/<name>.tsx`. These files are ours to edit; keep the upstream structure so later updates stay mergeable.
- Local changes to keep when updating primitives:
  - `button.tsx` adds the `xl` pill size and the cyan hover on `default` (no glow, and no blur on `secondary`), animates `transition-colors` only, and wraps `buttonVariants()` in `cn` so links resolve conflicts like `<Button>` does.
  - Focus: button, badge, input, textarea, native-select and radio-group use the `focus-ring` utility (a 2 px teal outline from `globals.css`) in place of upstream's `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`. Box-shadow rings vanish in forced-colors mode, so re-apply this after adding or updating a primitive.
  - Every primitive imports `cn` from `@/lib/utils`.
- Before updating a primitive, compare with upstream: `yarn shadcn add <name> --diff`. `--overwrite` throws away local edits, so only use it on unmodified files.
- Never copy a primitive into a feature folder or create `button-2.tsx`. Extend the original.
- If you change a primitive's behavior, cover it in a colocated test (see `src/components/ui/button.test.tsx`).

## Theming (Clinical Midnight)

- Tokens live in `src/app/globals.css`, in `:root` (the site is dark only). They're mapped to Tailwind in `@theme inline` and `@theme`.
- Surfaces, darkest to lightest: `bg-surface-lowest`, `bg-background`, `bg-surface-low`, `bg-surface-container` (= `bg-card`), `bg-surface-high`, `bg-surface-highest`. `primary` (teal) is the only accent; `info` (cyan) is reserved for the primary button's hover and the second canvas bloom. Each has a `-foreground`. Text: `text-foreground`, `text-muted-foreground`; placeholders use `text-outline`.
- Type scale: `text-display-lg` (+ `text-display-lg-mobile` below `md`), `text-headline-xl` (+ `-mobile`), `text-headline-lg/md/sm`, `text-title-md`, `text-body-lg/md/sm`, `text-label-lg/md/sm`. Each sets size, line height, tracking and weight together.
- Elevation comes from surface lightness. The only shadow token is `shadow-float`, on the floating nav pill, which is also the only element with a backdrop blur. No glow and no glass cards (`design.md`).
- Components use these tokens only. No raw palette classes (`bg-zinc-900`) or colour literals. Values needed outside CSS (metadata, manifest, share images) come from `src/config/brand-colors.ts`.
- A new token: add the variable to `:root`, map it in `@theme inline` (colors) or `@theme` (sizes, shadows), and register any new `--text-*` or `--shadow-*` name in `src/lib/utils.ts`. `utils.test.ts` fails until you do.
- Fonts come from `next/font` in `src/app/layout.tsx`. The sans font registers `variable: "--font-sans"`, because `globals.css` maps `--font-sans: var(--font-sans)`.
- Don't add `tailwind.config.*` or `postcss.config.*`. Tailwind v4 is configured in CSS here and compiled by `@tailwindcss/turbopack` (see `next.config.ts`).
