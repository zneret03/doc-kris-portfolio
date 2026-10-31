import { awards } from "@/features/about/content";

export function AwardsList() {
  return (
    <section aria-labelledby="awards-title" className="mt-14 flex flex-col gap-5">
      <h2 id="awards-title" className="text-headline-sm text-foreground">
        Awards and recognition
      </h2>
      <ul className="flex flex-col gap-3">
        {awards.map((award) => (
          <li key={award.title} className="text-body-md leading-relaxed text-muted-foreground">
            <span className="text-foreground">{award.title}.</span> {award.detail}.
          </li>
        ))}
      </ul>
    </section>
  );
}
