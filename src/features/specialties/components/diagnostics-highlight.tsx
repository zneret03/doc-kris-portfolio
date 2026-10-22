import Image from "next/image";

import { diagnostics } from "@/features/specialties/content";

// Split row continuing the page's alternation: text left, photography right.
export function DiagnosticsHighlight() {
  return (
    <section
      aria-labelledby="diagnostics-title"
      className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12"
    >
      <div className="flex flex-col items-start gap-4 lg:col-span-5">
        <h2 id="diagnostics-title" className="text-headline-md text-foreground sm:text-headline-lg">
          {diagnostics.title}
        </h2>
        <p className="max-w-[58ch] text-body-md text-muted-foreground">{diagnostics.description}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {diagnostics.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-surface-high px-2.5 py-1 text-label-md text-foreground">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:col-span-7">
        {diagnostics.images.map((image) => (
          <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 350px, (min-width: 1024px) 28vw, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
