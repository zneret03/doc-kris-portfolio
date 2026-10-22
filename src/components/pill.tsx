import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  raised: "bg-surface-high text-muted-foreground",
} as const;

type PillProps = React.ComponentProps<typeof Badge> & {
  tone?: keyof typeof tones;
};

// Small sentence-case tags (a specialty's focus, "Verified patient").
// Never used as an eyebrow above a heading.
export function Pill({ tone = "primary", className, ...props }: PillProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto gap-1.5 rounded-full border-transparent px-2.5 py-1 text-label-md whitespace-normal",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
