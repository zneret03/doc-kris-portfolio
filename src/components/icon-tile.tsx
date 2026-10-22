import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-9 [&_svg]:size-5",
  md: "size-10 [&_svg]:size-5",
} as const;

type IconTileProps = {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
};

// A small icon square beside contact details. Not for feature cards: an icon
// tile above a heading is a templated tell (design.md, banned list).
export function IconTile({ icon: Icon, size = "md", className }: IconTileProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-surface-high text-primary",
        sizes[size],
        className,
      )}
    >
      <Icon />
    </span>
  );
}
