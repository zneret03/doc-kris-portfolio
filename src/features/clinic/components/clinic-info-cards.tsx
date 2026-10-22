import type { LucideIcon } from "lucide-react";
import { Accessibility, Clock, MapPin } from "lucide-react";

import { textLinkClassName } from "@/components/text-link";
import { directionsUrl, formatAddressLines, site } from "@/config/site";
import { accessibilityNote } from "@/features/clinic/content";

function Detail({ icon: Icon, term, children }: { icon: LucideIcon; term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="flex items-center gap-2 text-title-md font-semibold text-foreground">
        <Icon aria-hidden className="size-5 shrink-0 text-primary" />
        {term}
      </dt>
      <dd className="flex flex-col gap-1 pl-7 text-body-md text-muted-foreground">{children}</dd>
    </div>
  );
}

// Visit details as a spec sheet: location, hours and access in one list.
export function ClinicInfoCards({ className }: { className?: string }) {
  const regularHours = site.hours.filter((row) => !("highlight" in row && row.highlight));

  return (
    <section aria-label="Location, hours and access" className={className}>
      <dl className="flex flex-col gap-8">
        <Detail icon={MapPin} term="Pavilion location">
          <span className="text-foreground">{site.location.building}</span>
          <address className="not-italic">
            {formatAddressLines().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <span>{site.location.entrance}</span>
          <a
            href={directionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textLinkClassName} mt-1 self-start`}
          >
            Get directions
            <span className="sr-only"> (opens Google Maps in a new tab)</span>
            <span aria-hidden>→</span>
          </a>
        </Detail>
        <Detail icon={Clock} term="Office hours">
          {regularHours.map((row) => (
            <span key={row.label}>
              {row.label}: {row.value}
            </span>
          ))}
          <span>
            <span className="text-foreground">24/7 on-call surgical coverage</span> for urgent case
            referrals
          </span>
        </Detail>
        <Detail icon={Accessibility} term="Arrival">
          <span>{accessibilityNote.text}</span>
          <span className="text-foreground">{accessibilityNote.highlight}</span>
        </Detail>
      </dl>
    </section>
  );
}
