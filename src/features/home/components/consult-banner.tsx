import Link from "next/link";

import { CtaPanel } from "@/components/cta-panel";
import { textLinkClassName } from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";
import { site, telHref } from "@/config/site";
import { consultBanner } from "@/features/home/content";

export function ConsultBanner() {
  return (
    <CtaPanel
      title={consultBanner.title}
      description={consultBanner.description}
      actions={
        <>
          <Link href={site.bookingHref} className={buttonVariants({ size: "xl" })}>
            {consultBanner.cta}
          </Link>
          <a href={telHref(site.contact.phone)} className={textLinkClassName}>
            <span className="sr-only">Call </span>
            {site.contact.phone.display}
          </a>
        </>
      }
    />
  );
}
