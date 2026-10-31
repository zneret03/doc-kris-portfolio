import { research } from "@/features/about/content";

// Each study as a citation: the title (set roman, like all type here), the
// authors and year, then where it was presented or recognised.
export function ResearchList() {
  return (
    <section aria-labelledby="research-title" className="mt-14 flex flex-col gap-5">
      <h2 id="research-title" className="text-headline-sm text-foreground">
        Research
      </h2>
      <ul className="flex flex-col gap-6">
        {research.map((study) => (
          <li key={study.title} className="flex flex-col gap-1">
            <cite className="text-body-md font-semibold not-italic text-foreground">{study.title}</cite>
            <p className="text-body-sm text-muted-foreground">
              {study.authors}, {study.year}
            </p>
            {study.recognition.map((line) => (
              <p key={line} className="text-body-md leading-relaxed text-muted-foreground">
                {line}.
              </p>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
