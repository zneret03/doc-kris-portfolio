import { render, screen } from "@testing-library/react";

import { StarRating } from "@/components/star-rating";

describe("StarRating", () => {
  it("describes the rating to assistive technology", () => {
    render(<StarRating rating={4} />);

    expect(screen.getByRole("img", { name: "Rated 4 out of 5" })).toBeInTheDocument();
  });

  it("supports a different scale", () => {
    render(<StarRating rating={3} max={3} />);

    expect(screen.getByRole("img", { name: "Rated 3 out of 3" })).toBeInTheDocument();
  });
});
