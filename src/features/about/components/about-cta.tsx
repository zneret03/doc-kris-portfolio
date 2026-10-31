import { BookingLink } from "@/components/booking-link";
import { textLinkClassName } from "@/components/text-link";
import { site, telHref } from "@/config/site";
import { aboutCta } from "@/features/about/content";

// Long Document close: the action is a typographic link inside the prose.
export function AboutCta() {
  return (
    <section aria-labelledby="consult-title" className="mt-14 flex flex-col gap-4">
      <h2 id="consult-title" className="text-headline-sm text-foreground">
        {aboutCta.title}
      </h2>
      <p className="text-body-md leading-relaxed text-muted-foreground">{aboutCta.description}</p>
      <p className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
        <BookingLink className={textLinkClassName}>
          {aboutCta.cta}
          <span aria-hidden>→</span>
        </BookingLink>
        <a href={telHref(site.contact.phone)} className={textLinkClassName}>
          Call {site.contact.phone.display}
        </a>
      </p>
      <p className="text-body-sm text-muted-foreground">{aboutCta.note}</p>
    </section>
  );
}
