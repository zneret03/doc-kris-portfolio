import { render, screen } from "@testing-library/react";

import { PatientTestimonials } from "@/features/clinic/components/patient-testimonials";

describe("PatientTestimonials", () => {
  it("renders nothing when there are no testimonials", () => {
    const { container } = render(<PatientTestimonials testimonials={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each quote with its author, date and rating", () => {
    render(
      <PatientTestimonials
        testimonials={[
          { quote: "Back walking in three days.", author: "Robert K.", treated: "Treated Oct 2023", rating: 5 },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Patient stories" })).toBeInTheDocument();
    expect(screen.getByText("“Back walking in three days.”")).toBeInTheDocument();
    expect(screen.getByText("— Robert K.")).toBeInTheDocument();
    expect(screen.getByText("Treated Oct 2023")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Rated 5 out of 5" })).toBeInTheDocument();
  });
});
