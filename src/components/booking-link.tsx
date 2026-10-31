import { site } from "@/config/site";

type BookingLinkProps = Omit<React.ComponentProps<"a">, "href" | "target" | "rel"> & {
  /** Defaults to the SeriousMD profile behind every "Book consultation" link */
  href?: string;
  /** The booking site, named for screen readers */
  service?: string;
};

// Booking happens on SeriousMD, so these links open a new tab and say so to
// screen readers, like the directions link.
export function BookingLink({
  href = site.bookingHref,
  service = "SeriousMD",
  children,
  ...props
}: BookingLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens {service} in a new tab)</span>
    </a>
  );
}
