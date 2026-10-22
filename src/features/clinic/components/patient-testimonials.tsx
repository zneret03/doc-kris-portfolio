import { BadgeCheck } from "lucide-react";

import { StarRating } from "@/components/star-rating";
import { testimonialsIntro, type ClinicTestimonial } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

export function PatientTestimonials({
  testimonials,
  className,
}: {
  testimonials: ClinicTestimonial[];
  className?: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-2">
        <h2 id="testimonials-title" className="text-headline-md text-foreground sm:text-headline-lg">
          {testimonialsIntro.title}
        </h2>
        <p className="text-body-sm text-muted-foreground">{testimonialsIntro.satisfaction}</p>
      </div>
      <ul className="flex flex-col gap-8">
        {testimonials.map((testimonial) => (
          <li key={testimonial.author}>
            <figure className="flex flex-col gap-3">
              <StarRating rating={testimonial.rating} className="[&_svg]:size-4" />
              <blockquote className="max-w-[60ch] text-body-lg text-foreground">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-muted-foreground">
                <span className="text-foreground">— {testimonial.author}</span>
                <span>{testimonial.treated}</span>
                <span className="flex items-center gap-1">
                  <BadgeCheck aria-hidden className="size-4 text-primary" />
                  Verified patient
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
