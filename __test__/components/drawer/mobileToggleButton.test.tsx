import { render, screen, fireEvent } from "@testing-library/react";
import { MobileToggleBtn } from "@/components/drawers/mobileToggleBtn";

// Mock the lucide-react icons
jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon">MenuIcon</div>,
  X: () => <div data-testid="close-icon">CloseIcon</div>,
}));

describe("MobileToggleBtn Component", () => {
  const mockToggleDrawer = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct classes for mobile visibility", () => {
    const { container } = render(
      <MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />,
    );

    // Check that the container has the correct classes for mobile-only visibility
    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass("lg:hidden");
    expect(toggleContainer).toHaveClass("fixed");
    expect(toggleContainer).toHaveClass("z-30");
  });

  it("has the correct positioning styles", () => {
    const { container } = render(
      <MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />,
    );

    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass("top-4");
    expect(toggleContainer).toHaveClass("left-4");
  });

  it('renders with the "Close menu" aria-label when drawer is open', () => {
    render(<MobileToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Close menu");
  });

  it('renders with the "Open menu" aria-label when drawer is closed', () => {
    render(<MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Open menu");
  });

  it("calls toggleDrawer when the button is clicked", () => {
    render(<MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
  });

  it("renders the X icon when drawer is open", () => {
    render(<MobileToggleBtn isOpen={true} toggleDrawer={mockToggleDrawer} />);

    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-icon")).not.toBeInTheDocument();
  });

  it("renders the Menu icon when drawer is closed", () => {
    render(<MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("close-icon")).not.toBeInTheDocument();
  });

  it("applies correct styling to the button", () => {
    render(<MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-2");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("shadow-md");
    expect(button).toHaveClass("transition-colors");
  });

  it("has hover styles for user interaction feedback", () => {
    render(<MobileToggleBtn isOpen={false} toggleDrawer={mockToggleDrawer} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-gray-100");
    expect(button).toHaveClass("dark:hover:bg-gray-700");
  });
});
