import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from "@/components/ui/primaryButton";

describe("PrimaryButton Component", () => {
  test("renders a button with the correct text", () => {
    render(<PrimaryButton text="Test Button" />);

    const button = screen.getByText("Test Button");
    expect(button).toBeInTheDocument();
  });

  test("calls the action function when clicked", () => {
    const mockAction = jest.fn();
    render(<PrimaryButton text="Click Me" action={mockAction} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test("has the correct tailwind classes", () => {
    render(<PrimaryButton text="Styled Button" />);

    const button = screen.getByText("Styled Button").closest("button");
    const span = screen.getByText("Styled Button");

    expect(button).toHaveClass("relative");
    // The gradient class is on the button element itself, not on the span
    expect(button).toHaveClass("bg-gradient-to-br");
    expect(span).toHaveClass("px-5");
    expect(span).toHaveClass("py-2.5");
  });
});
