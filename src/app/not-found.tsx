import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { Container } from "@/components/container";
import { TextLink } from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 pt-16 pb-24 md:pt-24 md:pb-32">
      <h1 className="text-balance text-headline-xl-mobile text-foreground md:text-headline-xl">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-[52ch] text-body-lg text-muted-foreground">
        The link may be out of date, or the page may have moved. Go back to the overview, or book a
        consultation directly.
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
        <BookingLink className={buttonVariants({ size: "xl" })}>Book consultation</BookingLink>
        <TextLink href="/">Go to overview</TextLink>
      </div>
    </Container>
  );
}
