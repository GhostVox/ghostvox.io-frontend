import { render, screen, fireEvent } from "@testing-library/react";
import { DesktopToggleBtn } from "@/components/drawers/desktopToggleBtn";

describe("DesktopToggleBtn Component", () => {
  const mockToggleDrawer = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct classes for desktop visibility", () => {
    const { container } = render(
      <DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />,
    );

    // Check that the container has the correct classes for desktop-only visibility
    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass("hidden");
    expect(toggleContainer).toHaveClass("lg:block");
    expect(toggleContainer).toHaveClass("absolute");
  });

  it('renders with the "Collapse sidebar" aria-label when drawer is open', () => {
    render(<DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Collapse sidebar");
  });

  it('renders with the "Expand sidebar" aria-label when drawer is closed', () => {
    render(<DesktopToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Expand sidebar");
  });

  it("calls toggleDrawer when the button is clicked", () => {
    render(<DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
  });

  it("renders the collapse icon (left arrow) when drawer is open", () => {
    const { container } = render(
      <DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />,
    );

    // Find the SVG and check the path data indicates a left-pointing arrow
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const path = svg?.querySelector("path");
    expect(path).toHaveAttribute("d", "M15 19l-7-7 7-7");
  });

  it("renders the expand icon (right arrow) when drawer is closed", () => {
    const { container } = render(
      <DesktopToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />,
    );

    // Find the SVG and check the path data indicates a right-pointing arrow
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const path = svg?.querySelector("path");
    expect(path).toHaveAttribute("d", "M9 5l7 7-7 7");
  });

  it("applies correct styling to the button", () => {
    render(<DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-1");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("shadow-md");
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("transition-colors");
  });

  it("has the correct positioning styles", () => {
    const { container } = render(
      <DesktopToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />,
    );

    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass("-right-7");
    expect(toggleContainer).toHaveClass("top-12");
  });
});
