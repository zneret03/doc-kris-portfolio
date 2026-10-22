import { DoctorPortrait } from "@/components/doctor-portrait";
import { aboutIntro } from "@/features/about/content";
import { cn } from "@/lib/utils";

// The portrait with its caption: inline after the lede on small screens, in
// the margin column on wide ones.
export function AboutPortrait({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <DoctorPortrait
        sizes="(min-width: 1024px) 30vw, calc(100vw - 2.5rem)"
        className="aspect-[4/5] w-full rounded-2xl"
      />
      <figcaption className="text-body-sm text-muted-foreground">
        <span className="block text-foreground">{aboutIntro.leadership.role}</span>
        {aboutIntro.certification.label}, {aboutIntro.certification.status}
      </figcaption>
    </figure>
  );
}
