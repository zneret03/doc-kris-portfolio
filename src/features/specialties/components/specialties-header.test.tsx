import { render, screen } from "@testing-library/react";

import { SpecialtiesHeader } from "@/features/specialties/components/specialties-header";

describe("SpecialtiesHeader", () => {
  it("shows only the page heading until outcome figures are verified", () => {
    render(<SpecialtiesHeader outcomes={[]} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Specialties & clinical services" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("term")).not.toBeInTheDocument();
  });

  it("lists each outcome with its label and unit", () => {
    render(<SpecialtiesHeader outcomes={[{ value: "3", unit: "days", label: "Median hospital stay" }]} />);

    expect(screen.getByRole("term")).toHaveTextContent("Median hospital stay");
    expect(screen.getByRole("definition")).toHaveTextContent("3 days");
  });
});
