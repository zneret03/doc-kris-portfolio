import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  ConsultationForm,
  type ConsultationFormAction,
} from "@/features/clinic/components/consultation-form";
import type { ConsultationFormState } from "@/features/clinic/consultation-request";

function setup(result: ConsultationFormState) {
  const action = jest.fn<ReturnType<ConsultationFormAction>, Parameters<ConsultationFormAction>>(
    async () => result,
  );
  const user = userEvent.setup();
  render(<ConsultationForm action={action} />);
  return { action, user };
}

describe("ConsultationForm", () => {
  it("submits every field, including the chosen consultation type", async () => {
    const { action, user } = setup({ status: "success", message: "Request sent." });

    await user.click(screen.getByRole("radio", { name: "Telehealth" }));
    await user.type(screen.getByLabelText(/Full name/), "Kenneth Sterling");
    await user.type(screen.getByLabelText(/Phone number/), "5550102030");
    await user.type(screen.getByLabelText(/Email address/), "kenneth@example.com");
    await user.selectOptions(
      screen.getByLabelText(/Preferred time window/),
      "Afternoon (3:00 – 5:00 PM)",
    );
    await user.type(screen.getByLabelText(/Reason for visit/), "Second opinion");
    await user.click(screen.getByRole("button", { name: "Request appointment" }));

    expect(action).toHaveBeenCalledTimes(1);
    const formData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual(
      expect.objectContaining({
        modality: "telehealth",
        fullName: "Kenneth Sterling",
        phone: "5550102030",
        email: "kenneth@example.com",
        timeWindow: "afternoon",
        reason: "Second opinion",
      }),
    );
  });

  it("starts with an in-person visit selected", () => {
    setup({ status: "idle" });

    expect(screen.getByRole("radio", { name: "In-person" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Telehealth" })).not.toBeChecked();
  });

  it("confirms a delivered request", async () => {
    const { user } = setup({ status: "success", message: "Request sent." });

    await user.click(screen.getByRole("button", { name: "Request appointment" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Request sent.");
  });

  it("shows errors next to the fields that need attention and keeps what was typed", async () => {
    const { user } = setup({
      status: "error",
      message: "Some details need attention.",
      fieldErrors: { email: "Enter an email like name@example.com." },
      values: { fullName: "Kenneth Sterling", email: "kenneth@" },
    });

    await user.click(screen.getByRole("button", { name: "Request appointment" }));

    const email = await screen.findByLabelText(/Email address/);
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Enter an email like name@example.com.");
    expect(email).toHaveValue("kenneth@");
    expect(screen.getByLabelText(/Full name/)).toHaveValue("Kenneth Sterling");
    expect(screen.getByLabelText(/Full name/)).not.toHaveAttribute("aria-invalid");
    expect(
      screen.getAllByRole("alert").some((alert) => alert.textContent?.includes("Some details need attention.")),
    ).toBe(true);
  });

  it("marks the required fields for assistive technology", () => {
    setup({ status: "idle" });

    for (const label of [/Full name/, /Phone number/, /Email address/, /Preferred date/, /Preferred time window/]) {
      expect(screen.getByLabelText(label)).toBeRequired();
    }
    expect(screen.getByLabelText(/Reason for visit/)).not.toBeRequired();
  });
});
