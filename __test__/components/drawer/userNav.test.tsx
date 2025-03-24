import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserNav } from "@/components/drawers/userNav";

// Mock the next/link component
jest.mock("next/link", () => {
  return function MockLink({
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
  User: () => <div data-testid="user-icon">UserIcon</div>,
  Settings: () => <div data-testid="settings-icon">SettingsIcon</div>,
  LogOut: () => <div data-testid="logout-icon">LogOutIcon</div>,
}));

describe("UserNav Component", () => {
  // Mock functions
  const mockSetIsOpen = jest.fn();
  const mockHandleLogout = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all navigation links and logout button correctly", () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Check that all nav items exist
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();

    // Check that all icons are rendered
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
  });

  it("has correct structure with top border", () => {
    const { container } = render(
      <UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />,
    );

    // Check for the container classes
    const navContainer = container.firstChild;
    expect(navContainer).toHaveClass("mt-auto");
    expect(navContainer).toHaveClass("p-4");
    expect(navContainer).toHaveClass("border-t");

    // Check for the list structure
    const list = container.querySelector("ul");
    expect(list).toHaveClass("space-y-1");
  });

  it("verifies links have the correct hrefs", () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Profile link
    const profileLink = screen.getByText("Profile").closest("a");
    expect(profileLink).toHaveAttribute("href", "/user-profile");

    // Settings link
    const settingsLink = screen.getByText("Settings").closest("a");
    expect(settingsLink).toHaveAttribute("href", "/settings");
  });

  it("does not call setIsOpen when links are clicked in desktop mode", () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Click profile link
    fireEvent.click(screen.getByText("Profile"));
    expect(mockSetIsOpen).not.toHaveBeenCalled();

    // Click settings link
    fireEvent.click(screen.getByText("Settings"));
    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it("calls setIsOpen(false) when links are clicked in mobile mode", () => {
    render(<UserNav isMobile={true} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Click profile link
    fireEvent.click(screen.getByText("Profile"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    mockSetIsOpen.mockClear();

    // Click settings link
    fireEvent.click(screen.getByText("Settings"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("calls handleLogout when Sign Out button is clicked", async () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Find and click the sign out button
    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    // Check that handleLogout was called
    await waitFor(() => {
      expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    });
  });

  it("applies correct styling to navigation links", () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Check profile link styling
    const profileLink = screen.getByText("Profile").closest("a");
    expect(profileLink?.className).toContain("flex");
    expect(profileLink?.className).toContain("items-center");
    expect(profileLink?.className).toContain("rounded-md");
    expect(profileLink?.className).toContain("transition-colors");
    expect(profileLink?.className).toContain("hover:bg-purple-50");
  });

  it("applies different hover styling to the logout button", () => {
    render(<UserNav isMobile={false} setIsOpen={mockSetIsOpen} handleLogout={mockHandleLogout} />);

    // Check sign out button styling - should have red hover instead of purple
    const signOutButton = screen.getByText("Sign Out").closest("button");
    expect(signOutButton?.className).toContain("w-full");
    expect(signOutButton?.className).toContain("flex");
    expect(signOutButton?.className).toContain("hover:bg-red-50");
    expect(signOutButton?.className).not.toContain("hover:bg-purple-50");
  });
});
