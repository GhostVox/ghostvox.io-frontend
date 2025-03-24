import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormInput } from "@/components/ui/formInput";

describe("FormInput Component", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    name: "test-input",
    inputType: "text",
    label: "Test Label",
    value: "",
    error: null,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders with label and input", () => {
    render(<FormInput {...defaultProps} />);

    const label = screen.getByText("Test Label");
    const input = screen.getByLabelText("Test Label");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "test-input");
  });

  test("handles input change correctly", () => {
    render(<FormInput {...defaultProps} />);

    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("displays error message when provided", () => {
    render(<FormInput {...defaultProps} error="This field is required" />);

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-600");
  });

  test("renders with different input types", () => {
    render(<FormInput {...defaultProps} inputType="password" />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "password");
  });

  test("applies custom className to label when provided", () => {
    render(<FormInput {...defaultProps} className="custom-class" />);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });

  test("renders with ReactNode as label", () => {
    const labelNode = <span data-testid="custom-label">Custom Label</span>;
    render(<FormInput {...defaultProps} label={labelNode} />);

    const label = screen.getByTestId("custom-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Custom Label");
  });
});
