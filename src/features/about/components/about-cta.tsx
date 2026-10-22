import { TextLink, textLinkClassName } from "@/components/text-link";
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
        <TextLink href={site.bookingHref}>{aboutCta.cta}</TextLink>
        <a href={telHref(site.contact.referralPhone)} className={textLinkClassName}>
          Call {site.contact.referralPhone.display}
        </a>
      </p>
      <p className="text-body-sm text-muted-foreground">{aboutCta.note}</p>
    </section>
  );
}
