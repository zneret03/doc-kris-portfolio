import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
};

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of ${max}`}
      className={cn("flex items-center gap-1 text-primary", className)}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn("size-5", index < rating ? "fill-current" : "opacity-30")}
        />
      ))}
    </div>
  );
}
