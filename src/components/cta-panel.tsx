import { useId } from "react";

import { cn } from "@/lib/utils";

type CtaPanelProps = {
  title: string;
  description: React.ReactNode;
  /** One primary pill and, at most, one typographic link */
  actions: React.ReactNode;
  /** Trust markers or a short note under the copy */
  footnote?: React.ReactNode;
  className?: string;
};

// The consultation band that closes the marketing pages: one elevated
// surface, text on one side and the action on the other.
export function CtaPanel({ title, description, actions, footnote, className }: CtaPanelProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn("rounded-2xl bg-surface-low px-6 py-10 sm:px-10 sm:py-12", className)}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-3 lg:col-span-7">
          <h2
            id={titleId}
            className="text-balance text-headline-md text-foreground sm:text-headline-lg"
          >
            {title}
          </h2>
          <p className="max-w-[60ch] text-body-md text-muted-foreground">{description}</p>
          {footnote}
        </div>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
          {actions}
        </div>
      </div>
    </section>
  );
}
