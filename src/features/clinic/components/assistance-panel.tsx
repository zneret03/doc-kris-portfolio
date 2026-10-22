import type { LucideIcon } from "lucide-react";
import { Clock, Lock, Mail, PhoneCall } from "lucide-react";

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
  // aside so the value stays on one line (gate 49).
  return (
    <a
      href={href}
      className="@container group flex items-center gap-4 rounded-xl bg-surface-low p-4 transition-colors hover:bg-surface-container focus-ring motion-reduce:transition-none"
    >
      <IconTile icon={icon} className="hidden @2xs:inline-flex" />
      <span className="min-w-0">
        <span className="block text-body-sm text-muted-foreground">{label}</span>
        <span className="block text-title-md font-semibold [overflow-wrap:anywhere] text-foreground">
          {value}
        </span>
      </span>
    </a>
  );
}

// One layer: the contact rows are the only surfaces; the notes are text.
export function AssistancePanel({ className }: { className?: string }) {
  const { referralPhone, email } = site.contact;

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
            href={telHref(referralPhone)}
            icon={PhoneCall}
            label={assistance.referralLabel}
            value={referralPhone.display}
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
      <p className="flex items-center gap-3 text-body-sm text-muted-foreground">
        <Clock aria-hidden className="size-4 shrink-0 text-primary" />
        <span>
          {assistance.responseLabel} <span className="text-foreground">{assistance.responseValue}</span>
        </span>
      </p>
    </section>
  );
}
