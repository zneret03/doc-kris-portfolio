import { AboutPortrait } from "@/features/about/components/about-portrait";
import { aboutIntro, ethos } from "@/features/about/content";

// Long Document opening: title, lede, then the ethos as running prose.
export function AboutIntro() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1 className="text-headline-xl-mobile text-foreground md:text-headline-xl">
          {aboutIntro.title}
        </h1>
        <p className="text-body-lg text-muted-foreground">{aboutIntro.subtitle}</p>
      </header>

      <AboutPortrait className="mt-8 lg:hidden" />

      <section aria-labelledby="ethos-title" className="mt-12 flex flex-col gap-5">
        <h2 id="ethos-title" className="text-headline-sm text-foreground">
          {ethos.heading}
        </h2>
        {ethos.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body-md leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
        <dl className="flex flex-col gap-3">
          {ethos.tenets.map((tenet) => (
            <div key={tenet.title}>
              <dt className="inline font-semibold text-foreground">{tenet.title}. </dt>
              <dd className="inline text-muted-foreground">{tenet.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
