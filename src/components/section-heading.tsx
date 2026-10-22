import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: React.ReactNode;
  /** One short lede under the heading, capped at 60ch */
  description?: React.ReactNode;
  /** Shown beside the heading from md up (a link or a short note) */
  aside?: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

// S2 hanging head (design.md): a heading in its own space, no eyebrow or
// kicker above it, left-aligned. Collapses to one column on small screens.
export function SectionHeading({
  title,
  description,
  aside,
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        aside && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-3">
        <Heading
          id={id}
          className={cn(
            "text-balance text-foreground",
            Heading === "h1"
              ? "text-headline-xl-mobile md:text-headline-xl"
              : "text-headline-md sm:text-headline-lg",
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className="max-w-[60ch] text-body-md text-muted-foreground">{description}</p>
        )}
      </div>
      {aside && <div className="shrink-0 md:max-w-sm">{aside}</div>}
    </div>
  );
}
