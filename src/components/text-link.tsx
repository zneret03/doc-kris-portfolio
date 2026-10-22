import Link from "next/link";

import { cn } from "@/lib/utils";

// C3 typographic link (design.md): words, a trailing arrow, a 1px underline
// that thickens on hover. Single line at every width (Hallmark gate 49).
export const textLinkClassName =
  "inline-flex items-baseline gap-1 rounded-sm whitespace-nowrap text-label-lg text-primary underline decoration-primary/40 decoration-1 underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2 focus-ring motion-reduce:transition-none";

type TextLinkProps = React.ComponentProps<typeof Link> & {
  arrow?: boolean;
};

export function TextLink({ className, children, arrow = true, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkClassName, className)} {...props}>
      {children}
      {arrow && <span aria-hidden>→</span>}
    </Link>
  );
}
