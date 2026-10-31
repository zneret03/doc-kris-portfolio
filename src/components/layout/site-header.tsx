import { User } from "lucide-react";

import { BookingLink } from "@/components/booking-link";
import { Logo } from "@/components/layout/logo";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";

// N5 floating pill (design.md): detached from the edges and content-sized
// on desktop; a full-width corner chip below lg. The blur is the only glass on
// the site, because the pill floats over content.
export function SiteHeader() {
  return (
    <header className="fixed inset-x-3 top-3 z-50 flex justify-center sm:inset-x-4 sm:top-4">
      <div className="flex w-full items-center justify-between gap-4 rounded-full bg-popover/80 py-1.5 pr-1.5 pl-4 shadow-float backdrop-blur-xl backdrop-saturate-150 lg:w-auto lg:gap-6">
        <Logo />
        <MainNav className="hidden lg:block" />
        <div className="flex items-center gap-2">
          <BookingLink
            className={buttonVariants({ size: "lg", className: "hidden rounded-full px-4 lg:inline-flex" })}
          >
            Book consultation
          </BookingLink>
          {site.patientPortalUrl && (
            <a
              href={site.patientPortalUrl}
              aria-label="Patient portal"
              className="flex size-9 items-center justify-center rounded-full bg-surface-high text-primary transition-colors hover:bg-surface-highest focus-ring"
            >
              <User aria-hidden className="size-4.5" />
            </a>
          )}
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
