"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { BookingLink } from "@/components/booking-link";
import { BrandMark } from "@/components/layout/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { doctorFullName, site, telHref } from "@/config/site";
import { isActivePath } from "@/lib/is-active-path";
import { cn } from "@/lib/utils";

// Below lg the floating pill becomes a corner chip; this sheet carries every
// destination plus the booking and phone actions.
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open menu"
            className={cn("rounded-full text-foreground", className)}
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 border-border bg-surface-low motion-reduce:transition-none sm:max-w-sm"
      >
        <SheetHeader className="flex-row items-center gap-3 p-5 pr-14">
          <BrandMark />
          <div>
            <SheetTitle className="text-title-md font-semibold">Menu</SheetTitle>
            <SheetDescription className="text-body-sm text-balance">{doctorFullName}</SheetDescription>
          </div>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex rounded-lg px-4 py-3 text-headline-sm transition-colors focus-ring motion-reduce:transition-none",
                      active ? "bg-surface-high text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SheetFooter className="gap-3 p-5">
          <BookingLink onClick={close} className={buttonVariants({ size: "xl", className: "w-full" })}>
            Book consultation
          </BookingLink>
          <a
            href={telHref(site.contact.phone)}
            className={buttonVariants({ variant: "secondary", size: "xl", className: "w-full" })}
          >
            <Phone data-icon="inline-start" className="text-primary" />
            {site.contact.phone.display}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
