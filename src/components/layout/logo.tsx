import Link from "next/link";

import { doctorName } from "@/config/site";
import { cn } from "@/lib/utils";

// Pulse-line mark. src/app/icon.svg is the same drawing with fixed colors.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("size-8", className)}>
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="9"
        className="fill-primary/10 stroke-primary/40"
        strokeWidth="1.5"
      />
      <path
        d="M6 17h5l2.5-6 4 11 3-8 1.5 3H26"
        className="stroke-primary"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The wordmark doubles as the home link.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-full whitespace-nowrap focus-ring",
        className,
      )}
    >
      <BrandMark />
      <span className="text-title-md font-semibold tracking-tight text-foreground">{doctorName}</span>
    </Link>
  );
}
