import Link from "next/link";
import { cacheLife } from "next/cache";

import { Container } from "@/components/container";
import { StatusDot } from "@/components/status-dot";
import { TextLink, textLinkClassName } from "@/components/text-link";
import {
  directionsUrl,
  doctorFullName,
  formatAddressLines,
  site,
  telHref,
} from "@/config/site";
import { cn } from "@/lib/utils";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const metaLinkClass =
  "rounded-sm underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-ring";

// Ft5 statement (design.md): the page closes on one sentence; the practice
// details sit beneath it in muted small type. No columns, no sitemap.
export async function SiteFooter() {
  const year = await getCopyrightYear();
  const { doctor, location, contact } = site;

  return (
    <footer className="mt-16 bg-surface-lowest">
      <Container className="flex flex-col gap-12 pt-16 pb-10 sm:pt-20">
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-[28ch] text-balance text-headline-xl-mobile text-foreground md:text-headline-xl">
            {site.statement}
          </p>
          <TextLink href={site.bookingHref}>Book a consultation</TextLink>
        </div>

        <div className="grid grid-cols-1 gap-8 text-body-sm text-muted-foreground md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="flex flex-col gap-2">
            <p className="text-label-lg text-foreground">
              {doctor.givenName} {doctor.familyName}, {doctor.postNominals}
            </p>
            <address className="not-italic">
              {location.name}, {formatAddressLines(location).join(", ")}
            </address>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {site.hours.map((row) => (
                <li key={row.label}>
                  {row.label}: {row.value}
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              <a href={telHref(contact.phone)} className={cn(textLinkClassName, "text-label-md")}>
                {contact.phone.display}
              </a>
              <a
                href={directionsUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(textLinkClassName, "text-label-md")}
              >
                Directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              {site.availability.acceptingPatients && (
                <span className="flex items-center gap-2">
                  <StatusDot />
                  {site.availability.label}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              <li>
                <Link href="/privacy" className={metaLinkClass}>
                  Privacy policy
                </Link>
              </li>
              {site.patientPortalUrl && (
                <li>
                  <a href={site.patientPortalUrl} className={metaLinkClass}>
                    Patient portal
                  </a>
                </li>
              )}
              <li>
                <Link href="/medical-disclaimer" className={metaLinkClass}>
                  Medical disclaimer
                </Link>
              </li>
            </ul>
            <p>
              © {year} {doctorFullName}. All clinical and surgical rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
