import Link from "next/link";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button, buttonVariants } from "@/components/ui/button";

describe("Button", () => {
  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save changes</Button>);

    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ignores presses while disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("buttonVariants", () => {
  // Base UI's Button always sets role="button", so links get the styles via
  // buttonVariants instead of <Button render={<a />}>.
  it("styles a Next.js link without changing its role", () => {
    render(
      <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
        Get in touch
      </Link>,
    );

    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Used directly on links, so it has to resolve conflicts itself
  it("lets extra classes override the base styles", () => {
    const classes = buttonVariants({ size: "xl", className: "hidden sm:inline-flex" }).split(" ");

    expect(classes).toContain("hidden");
    expect(classes).not.toContain("inline-flex");
    expect(classes).not.toContain("text-sm");
    expect(classes).toContain("text-label-lg");
  });
});
