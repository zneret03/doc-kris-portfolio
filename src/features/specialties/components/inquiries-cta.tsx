import { BookingLink } from "@/components/booking-link";
import { CtaPanel } from "@/components/cta-panel";
import { textLinkClassName } from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";
import { site, telHref } from "@/config/site";
import { inquiriesCta } from "@/features/specialties/content";

export function InquiriesCta() {
  return (
    <CtaPanel
      title={inquiriesCta.title}
      description={inquiriesCta.description}
      footnote={
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-label-md text-muted-foreground">
          {inquiriesCta.trust.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon aria-hidden className="size-4 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      }
      actions={
        <>
          <BookingLink className={buttonVariants({ size: "xl" })}>{inquiriesCta.cta}</BookingLink>
          <a href={telHref(site.contact.phone)} className={textLinkClassName}>
            <span className="sr-only">Call </span>
            {site.contact.phone.display}
          </a>
        </>
      }
    />
  );
}
