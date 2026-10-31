import { BookingLink } from "@/components/booking-link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { onlineBooking } from "@/features/clinic/content";
import { cn } from "@/lib/utils";

// NowServing can't be embedded (its CSP only lets SeriousMD's own sites frame
// it), so the booking section links out in a new tab.
export function OnlineBookingCard({ className }: { className?: string }) {
  return (
    <section
      id="book-online"
      aria-labelledby="book-online-title"
      className={cn("flex flex-col items-start gap-6 rounded-2xl bg-surface-low p-6 sm:p-10", className)}
    >
      <div className="flex flex-col gap-3">
        <h2 id="book-online-title" className="text-headline-md text-foreground sm:text-headline-lg">
          {onlineBooking.title}
        </h2>
        <p className="max-w-[60ch] text-body-md text-muted-foreground">{onlineBooking.description}</p>
      </div>
      <BookingLink
        href={site.onlineBookingHref}
        service="NowServing"
        className={buttonVariants({ size: "xl" })}
      >
        {onlineBooking.cta}
      </BookingLink>
      <p className="text-body-sm text-muted-foreground">{onlineBooking.inPersonNote}</p>
    </section>
  );
}
