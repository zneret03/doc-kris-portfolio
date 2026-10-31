import { continuingEducation } from "@/features/about/content";

export function ContinuingEducation() {
  return (
    <section aria-labelledby="education-title" className="mt-14 flex flex-col gap-5">
      <h2 id="education-title" className="text-headline-sm text-foreground">
        Continuing education
      </h2>
      <ul className="flex flex-col gap-3">
        {continuingEducation.map((course) => (
          <li key={course.title} className="text-body-md leading-relaxed text-muted-foreground">
            <span className="text-foreground">{course.title}.</span> {course.detail}.
          </li>
        ))}
      </ul>
    </section>
  );
}
