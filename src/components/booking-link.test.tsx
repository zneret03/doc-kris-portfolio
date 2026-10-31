import { render, screen } from "@testing-library/react";

import { BookingLink } from "@/components/booking-link";

describe("BookingLink", () => {
  it("opens the SeriousMD profile in a new tab and says so", () => {
    render(<BookingLink>Book consultation</BookingLink>);

    const link = screen.getByRole("link", { name: "Book consultation (opens SeriousMD in a new tab)" });
    expect(link).toHaveAttribute("href", "https://seriousmd.com/doc/kris-raymund-francisco");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("can point at another booking page", () => {
    render(
      <BookingLink href="https://nowserving.example/book" service="NowServing">
        Book on NowServing
      </BookingLink>,
    );

    expect(
      screen.getByRole("link", { name: "Book on NowServing (opens NowServing in a new tab)" }),
    ).toHaveAttribute("href", "https://nowserving.example/book");
  });
});
