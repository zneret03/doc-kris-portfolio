import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("MainNav", () => {
  it("links to each section by its short name; the wordmark covers home", () => {
    jest.mocked(usePathname).mockReturnValue("/");
    render(<MainNav />);

    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Specialties" })).toHaveAttribute("href", "/specialties");
    expect(screen.getByRole("link", { name: "Clinic" })).toHaveAttribute("href", "/clinic");
    expect(screen.queryByRole("link", { name: "Overview" })).not.toBeInTheDocument();
  });

  it("marks the current page", () => {
    jest.mocked(usePathname).mockReturnValue("/specialties");
    render(<MainNav />);

    expect(screen.getByRole("link", { name: "Specialties" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
  });
});
