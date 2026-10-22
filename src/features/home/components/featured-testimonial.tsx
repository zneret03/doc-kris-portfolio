import { StarRating } from "@/components/star-rating";
import type { Testimonial } from "@/features/home/content";

// T1 pull quote with marginalia: the quote in the wide column, set roman;
// who said it sits in the narrow margin.
export function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial | null }) {
  if (!testimonial) return null;

  return (
    <section aria-label="Patient story" className="py-12">
      <figure className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
        <blockquote className="text-balance text-headline-md font-normal text-foreground md:text-headline-lg md:font-normal lg:order-2 lg:col-span-9">
          <p className="max-w-[38ch]">“{testimonial.quote}”</p>
        </blockquote>
        <figcaption className="flex flex-col gap-2 text-body-sm text-muted-foreground lg:order-1 lg:col-span-3 lg:pt-2">
          <StarRating rating={testimonial.rating} className="[&_svg]:size-4" />
          <span className="text-title-md font-semibold text-foreground">{testimonial.author}</span>
          <span>{testimonial.context}</span>
        </figcaption>
      </figure>
    </section>
  );
}
