import { render, screen } from "@testing-library/react";

import { DoctorPortrait } from "@/components/doctor-portrait";

describe("DoctorPortrait", () => {
  it("shows the monogram placeholder until a portrait is configured", () => {
    render(<DoctorPortrait src={null} sizes="400px" />);

    expect(screen.getByTestId("portrait-placeholder")).toHaveTextContent("JV");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows the configured portrait with descriptive alt text", () => {
    render(<DoctorPortrait src="/images/portrait.jpg" sizes="400px" />);

    expect(
      screen.getByRole("img", { name: "Portrait of Dr. Julian Vance, MD, FACS" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("portrait-placeholder")).not.toBeInTheDocument();
  });
});
