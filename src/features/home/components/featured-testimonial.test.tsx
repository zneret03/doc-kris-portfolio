import { render, screen } from "@testing-library/react";

import { FeaturedTestimonial } from "@/features/home/components/featured-testimonial";

describe("FeaturedTestimonial", () => {
  it("renders nothing when no testimonial is set", () => {
    const { container } = render(<FeaturedTestimonial testimonial={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the quote and who said it", () => {
    render(
      <FeaturedTestimonial
        testimonial={{
          quote: "Back walking my dogs in five days.",
          author: "Arthur M., 62",
          context: "Mitral repair • 1-Year Follow-up",
          rating: 5,
        }}
      />,
    );

    expect(screen.getByRole("region", { name: "Patient story" })).toBeInTheDocument();
    expect(screen.getByText("“Back walking my dogs in five days.”")).toBeInTheDocument();
    expect(screen.getByText("Arthur M., 62")).toBeInTheDocument();
    expect(screen.getByText("Mitral repair • 1-Year Follow-up")).toBeInTheDocument();
  });
});
