import type { LucideIcon } from "lucide-react";
import { Lock, Mail, PhoneCall } from "lucide-react";

import { IconTile } from "@/components/icon-tile";
import { site, telHref } from "@/config/site";
import { assistance } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  // The email needs the whole row on the narrowest phones: when the row's
  // content box is under 18rem (a 320px screen) the decorative tile steps
  // aside and the value drops a size, so it stays on one line (gate 49).
  return (
    <a
      href={href}
      className="@container group flex items-center gap-4 rounded-xl bg-surface-low p-4 transition-colors hover:bg-surface-container focus-ring motion-reduce:transition-none"
    >
      <IconTile icon={icon} className="hidden @2xs:inline-flex" />
      <span className="min-w-0">
        <span className="block text-body-sm text-muted-foreground">{label}</span>
        <span className="block text-body-md font-semibold [overflow-wrap:anywhere] text-foreground @2xs:text-title-md">
          {value}
        </span>
      </span>
    </a>
  );
}

// One layer: the contact rows are the only surfaces; the note is text.
export function AssistancePanel({ className }: { className?: string }) {
  const { phone, email } = site.contact;

  return (
    <section aria-labelledby="assistance-title" className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-3">
        <h2 id="assistance-title" className="text-headline-md text-foreground sm:text-headline-lg">
          {assistance.title}
        </h2>
        <p className="max-w-[52ch] text-body-md text-muted-foreground">{assistance.description}</p>
      </div>
      <ul className="flex flex-col gap-3">
        <li>
          <ContactLink
            href={telHref(phone)}
            icon={PhoneCall}
            label={assistance.phoneLabel}
            value={phone.display}
          />
        </li>
        <li>
          <ContactLink href={`mailto:${email}`} icon={Mail} label={assistance.emailLabel} value={email} />
        </li>
      </ul>
      <p className="flex items-start gap-3 text-body-sm text-muted-foreground">
        <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>
          <span className="text-foreground">{assistance.privacy.title}.</span>{" "}
          {assistance.privacy.description}
        </span>
      </p>
    </section>
  );
}
