import { render, screen, fireEvent } from "@testing-library/react";
import { AppNav } from "@/components/drawers/appNav";

// Mock the next/link component
jest.mock("next/link", () => {
  return function NextLinkMock({
    children,
    href,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    className?: string;
  }) {
    return (
      <a href={href} onClick={onClick} className={className} data-testid="nav-link">
        {children}
      </a>
    );
  };
});

// Mock the lucide-react icons
jest.mock("lucide-react", () => ({
  Home: () => <span data-testid="home-icon">HomeIcon</span>,
  BarChart: () => <span data-testid="bar-chart-icon">BarChartIcon</span>,
  PieChart: () => <span data-testid="pie-chart-icon">PieChartIcon</span>,
  Plus: () => <span data-testid="plus-icon">PlusIcon</span>,
}));

describe("AppNav Component", () => {
  // Mock function for setIsOpen
  const mockSetIsOpen = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all navigation links correctly", () => {
    render(<AppNav isMobile={false} setIsOpen={mockSetIsOpen} />);

    // Check section headings
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Your Polls")).toBeInTheDocument();

    // Check all navigation links
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Active Polls")).toBeInTheDocument();
    expect(screen.getByText("Finished Polls")).toBeInTheDocument();
    expect(screen.getByText("Create New Poll")).toBeInTheDocument();
    expect(screen.getByText("My Polls")).toBeInTheDocument();

    // Check icons are rendered
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("bar-chart-icon").length).toBe(2); // Used twice
    expect(screen.getByTestId("pie-chart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("verifies all links have the correct href values", () => {
    render(<AppNav isMobile={false} setIsOpen={mockSetIsOpen} />);

    // Get all links and check their href attributes
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    const activePollsLink = screen.getByText("Active Polls").closest("a");
    const finishedPollsLink = screen.getByText("Finished Polls").closest("a");
    const createPollLink = screen.getByText("Create New Poll").closest("a");
    const myPollsLink = screen.getByText("My Polls").closest("a");

    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    expect(activePollsLink).toHaveAttribute("href", "/polls/active");
    expect(finishedPollsLink).toHaveAttribute("href", "/polls/finished");
    expect(createPollLink).toHaveAttribute("href", "/dashboard/create-poll");
    expect(myPollsLink).toHaveAttribute("href", "/polls/my-polls");
  });

  it("does not call setIsOpen when links are clicked in desktop mode", () => {
    render(<AppNav isMobile={false} setIsOpen={mockSetIsOpen} />);

    // Click all links and verify setIsOpen is not called
    fireEvent.click(screen.getByText("Dashboard"));
    fireEvent.click(screen.getByText("Active Polls"));
    fireEvent.click(screen.getByText("Finished Polls"));
    fireEvent.click(screen.getByText("Create New Poll"));
    fireEvent.click(screen.getByText("My Polls"));

    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it("calls setIsOpen(false) when links are clicked in mobile mode", () => {
    render(<AppNav isMobile={true} setIsOpen={mockSetIsOpen} />);

    // Click all links and verify setIsOpen is called with false
    fireEvent.click(screen.getByText("Dashboard"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    mockSetIsOpen.mockClear();

    fireEvent.click(screen.getByText("Active Polls"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    mockSetIsOpen.mockClear();

    fireEvent.click(screen.getByText("Finished Polls"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    mockSetIsOpen.mockClear();

    fireEvent.click(screen.getByText("Create New Poll"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    mockSetIsOpen.mockClear();

    fireEvent.click(screen.getByText("My Polls"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("applies correct styling classes to navigation elements", () => {
    render(<AppNav isMobile={false} setIsOpen={mockSetIsOpen} />);

    // Check for specific styling classes on headings
    const mainHeading = screen.getByText("Main");
    expect(mainHeading).toHaveClass("text-xs");
    expect(mainHeading).toHaveClass("uppercase");
    expect(mainHeading).toHaveClass("font-semibold");

    // Now with our updated mock, we can check the classes on the links
    const links = screen.getAllByTestId("nav-link");
    links.forEach((link) => {
      expect(link.className).toContain("flex");
      expect(link.className).toContain("items-center");
      expect(link.className).toContain("rounded-md");
      expect(link.className).toContain("transition-colors");
    });
  });
});
