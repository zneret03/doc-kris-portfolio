import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/layout/mobile-nav";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// jsdom can't navigate; stop link clicks from trying while keeping React's handlers
const preventNavigation = (event: MouseEvent) => event.preventDefault();

beforeEach(() => {
  jest.mocked(usePathname).mockReturnValue("/about");
  document.addEventListener("click", preventNavigation);
});

afterEach(() => {
  document.removeEventListener("click", preventNavigation);
});

describe("MobileNav", () => {
  it("opens a menu with every section and the booking actions", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const dialog = await screen.findByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About & credentials" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Book consultation (opens SeriousMD in a new tab)" }),
    ).toHaveAttribute(
      "href",
      "https://seriousmd.com/doc/kris-raymund-francisco",
    );
    expect(screen.getByRole("link", { name: "0943-497-7849" })).toHaveAttribute(
      "href",
      "tel:+639434977849",
    );
  });

  it("closes after choosing a destination", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(await screen.findByRole("link", { name: "Clinic & booking" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes with the close button", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(await screen.findByRole("button", { name: "Close" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
