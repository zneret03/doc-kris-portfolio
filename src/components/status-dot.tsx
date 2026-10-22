import { cn } from "@/lib/utils";

// A static availability marker. Use it only beside text that states a live
// status ("Accepting new patient referrals"), never as decoration.
export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 shrink-0 rounded-full bg-primary", className)}
    />
  );
}
