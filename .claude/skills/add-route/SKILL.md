---
name: add-route
description: Scaffold a new page or route following this repo's structure, with the route file in src/app, UI and content in src/features/<feature>, SEO metadata, share images, structured data, Cache Components–safe data loading, and colocated tests. Use when asked to add a page, section, URL or detail route (such as a case study), or when unsure where new route files belong.
argument-hint: "[route path, e.g. /work/[slug]]"
---

# Add a route

Route to add: $ARGUMENTS

If that's empty, take the route from the conversation, or ask for the URL path and what the page is for.

## 1. Map the route to files

| URL            | Route folder               |
| -------------- | -------------------------- |
| `/about`       | `src/app/about/`           |
| `/work`        | `src/app/work/`            |
| `/work/[slug]` | `src/app/work/[slug]/`     |

Choose the feature that owns the page: a domain noun such as `projects`, `about` or `contact`. Reuse a folder in `src/features/` when one fits. The URL and the feature name don't have to match (`/work` can be served by `features/projects`).

A typical set of files:

```text
src/app/work/[slug]/page.tsx                          # thin route file + metadata
src/app/work/[slug]/opengraph-image.tsx               # share card (required)
src/app/work/[slug]/twitter-image.tsx                 # re-exports the share card (required)
src/features/projects/content.ts                      # static copy and data
src/features/projects/data.ts                         # async loading, only if the data isn't static
src/features/projects/components/project-detail.tsx   # the UI
src/features/projects/components/project-detail.test.tsx
```

## 2. Content and data

Static copy and lists go in `src/features/<feature>/content.ts` as plain exports. Facts about the practice (name, phone, address, hours, navigation) come from `src/config/site.ts`; don't repeat them.

Data that's loaded (MDX files, a CMS, an API) goes in `data.ts`:

```ts
// src/features/projects/data.ts
import "server-only";
import { cacheLife } from "next/cache";

import type { Project } from "@/features/projects/types";

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("days");
  return loadProjects(); // MDX files, JSON or a CMS
}

export async function getProject(slug: string): Promise<Project | undefined> {
  "use cache";
  cacheLife("days");
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
```

- `"use cache"` must be the first statement in the function. Always pair it with a `cacheLife` profile: `minutes`, `hours`, `days`, `weeks` or `max`.
- Request-time data (`cookies()`, `headers()`, `searchParams`) and the current time can't be read during prerendering. Cache it as above, or read it in a component wrapped in `<Suspense>`.

## 3. UI

Write the page UI as sync components that receive data as props, which keeps them testable. Read `design.md` first: it assigns the macrostructure (Split Studio for marketing pages, Long Document in a 65ch column for content pages), and no archetype repeats within a page. Build from the shared pieces before writing new ones: `SectionHeading` (an S2 head, no eyebrow), `TextLink` (the typographic secondary action), `CtaPanel`, `Pill`, `StatusDot`, `StarRating`, `IconTile` (only beside contact details), `Container` (all in `src/components/`), plus shadcn primitives (`shadcn-ui` skill). The root layout already renders `AmbientGlow`; pages never add orbs. Use the Clinical Midnight tokens (`bg-surface-*`, `text-primary`, `text-headline-*`…), sentence case for every label, and the `frontend-design` skill for copy and direction.

```tsx
// src/features/projects/components/project-detail.tsx
import type { Project } from "@/features/projects/types";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <h1 className="text-headline-xl-mobile text-foreground md:text-headline-xl">{project.title}</h1>
      <p className="text-body-lg text-muted-foreground">{project.summary}</p>
    </article>
  );
}
```

## 4. Route file

A static page:

```tsx
// src/app/about/page.tsx
import { Container } from "@/components/container";
import { AboutIntro } from "@/features/about/components/about-intro";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd } from "@/features/seo/structured-data";

const title = "About & Credentials";

export const metadata = pageMetadata({
  title,
  description: "One or two sentences, under 160 characters, saying what the page offers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="flex flex-col pb-10">
      <AboutIntro />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path: "/about" },
        ])}
      />
    </Container>
  );
}
```

A dynamic page whose content is known at build time:

```tsx
// src/app/work/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/features/projects/components/project-detail";
import { getProject, getProjects } from "@/features/projects/data";
import { pageMetadata } from "@/features/seo/metadata";

// Build-time content: the whole route must stay static, and unknown slugs
// render fully before responding, so notFound() sends a real 404
export const ensureStatic = "navigation";

// With Cache Components this must return at least one entry
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project
    ? pageMetadata({ title: project.title, description: project.summary, path: `/work/${slug}` })
    : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
```

- `pageMetadata` sets the canonical URL and restates the Open Graph fields, which a page would otherwise lose (its `openGraph` replaces the parent's). Never pass `images`; that overrides the route's image files.
- `PageProps<"…">` and `LayoutProps<"…">` are global types, and the string must match the route. `yarn typecheck` regenerates route types before checking.
- Keep `ensureStatic = "navigation"` on routes whose content is fixed at build time. Without it, Partial Prefetching streams the App Shell for an unknown slug before `notFound()` runs, so the response is a 200 with the not-found UI and a `noindex` tag. With it, the response is a 404, and the build fails if the route ever reads request-time data. `dynamicParams` no longer exists under Cache Components.
- Without `generateStaticParams`, params are request-time data: render the part that reads them inside `<Suspense>`, or add `loading.tsx`. See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`.
- Add `loading.tsx` only for request-time data, `error.tsx` (it must start with `"use client"`) only when the route can fail in a way worth explaining, and `not-found.tsx` for a custom 404 inside the segment.
- Chrome shared by several routes goes in a `layout.tsx`. Use a route group `(name)/layout.tsx` only when sibling routes need different layouts.

## 5. Share images

Every page needs both files; `src/features/seo/share-images.test.ts` fails otherwise.

```tsx
// src/app/about/opengraph-image.tsx
import { doctorFullName } from "@/config/site";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `About ${doctorFullName}: credentials, career and hospital privileges`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "About & credentials",
    title: "About Dr. Julian Vance",
    description: "One short sentence; it shows under the title on the card.",
  });
}
```

```tsx
// src/app/about/twitter-image.tsx
export { default, alt, size, contentType } from "./opengraph-image";
```

In a dynamic route, the image receives `params`. Export `generateStaticParams` from the image file as well, or each card renders on demand instead of at build time:

```tsx
// src/app/work/[slug]/opengraph-image.tsx
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return renderOgImage({ section: "Case study", title: project?.title ?? "Case study", description: project?.summary ?? "" });
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}
```

## 6. Wire it up

- Public routes in `site.nav` appear in the header, mobile menu and `sitemap.xml` automatically. Add any other public route to `src/app/sitemap.ts`.
- Link to the page with `next/link`.
- Check that only special files landed in `src/app`, that no feature imports another feature, and that every import uses `@/`.

## 7. Test and verify

- Give each new component with content or behavior a colocated test (`ui-testing` skill). Route files themselves aren't unit-tested.
- Run `yarn lint && yarn typecheck && yarn test`, then `yarn build`. The build prerenders the route and, if request-time data escapes a `<Suspense>` or cache boundary, fails with a list of fixes. Apply the fix that suits the page instead of opting out of the check.
- Check the rendered `<head>`: a unique `<title>`, a description, a canonical link, and `og:image` / `twitter:image` pointing at this route's cards.
