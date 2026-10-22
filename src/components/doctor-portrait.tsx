import Image from "next/image";

import { doctorFullName, site } from "@/config/site";
import { cn } from "@/lib/utils";

type DoctorPortraitProps = {
  sizes: string;
  /** Preload when the portrait is the largest thing above the fold */
  preload?: boolean;
  /** Overrides site.doctor.portrait (tests, previews) */
  src?: string | null;
  className?: string;
};

// The image box only. Captions sit below it in a <figcaption>, never as a
// card floating on top of the photo.
export function DoctorPortrait({
  sizes,
  preload = false,
  src = site.doctor.portrait,
  className,
}: DoctorPortraitProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-surface-low", className)}>
      {src ? (
        <Image
          src={src}
          alt={`Portrait of ${doctorFullName}`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover object-top"
        />
      ) : (
        <MonogramPlaceholder initials={site.doctor.initials} />
      )}
    </div>
  );
}

// Stands in until a real portrait is set in src/config/site.ts.
function MonogramPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden
      data-testid="portrait-placeholder"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="absolute size-[86%] rounded-full border border-surface-high" />
      <div className="absolute size-[64%] rounded-full border border-surface-high" />
      <span className="relative -mt-[8%] text-[clamp(4.5rem,16vw,8.5rem)] leading-none font-bold tracking-tighter text-primary">
        {initials}
      </span>
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[62%] h-[12%] w-full text-primary/40"
        fill="none"
      >
        <path
          d="M0 30h150l12-18 16 38 14-46 12 26h196"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
