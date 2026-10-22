import type { LegalDocument } from "@/features/legal/content";

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <article className="mx-auto flex max-w-prose flex-col gap-8 py-12 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-headline-xl-mobile text-foreground md:text-headline-xl">
          {document.title}
        </h1>
        <p className="text-body-sm text-muted-foreground">Last updated {document.updated}</p>
        <p className="text-body-lg text-muted-foreground">{document.intro}</p>
      </header>
      {document.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2 className="text-headline-sm text-foreground">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body-md leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="flex list-disc flex-col gap-1 pl-5 text-body-md text-muted-foreground marker:text-primary">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
