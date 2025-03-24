/** eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { UserProfileSection } from "@/components/drawers/userProfileSection";
import { User } from "@/types/user";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // Using img in a mock is acceptable as we're not concerned with Next.js optimizations in tests
    return <img {...props} alt={props.alt || "Image"} data-testid="profile-image" />;
  },
}));

describe("UserProfileSection Component", () => {
  // Sample user data for tests
  const userWithPicture: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    picture: "/profile-picture.jpg",
    role: "user",
  };

  const userWithoutPicture: User = {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    picture: null,
    role: "user",
  };

  const userWithEmptyName: User = {
    id: "3",
    firstName: "",
    lastName: "",
    email: "anonymous@example.com",
    picture: null,
    role: "user",
  };

  it("renders user information correctly with picture", () => {
    render(<UserProfileSection user={userWithPicture} />);

    // Verify user name is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Verify email is displayed
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();

    // Verify image is rendered with correct props
    const profileImage = screen.getByTestId("profile-image");
    expect(profileImage).toHaveAttribute("src", "/profile-picture.jpg");
    expect(profileImage).toHaveAttribute("alt", '"John Doe" || "User"');
    expect(profileImage).toHaveAttribute("width", "40");
    expect(profileImage).toHaveAttribute("height", "40");
    expect(profileImage).toHaveClass("rounded-full");
    expect(profileImage).toHaveClass("object-cover");
    expect(profileImage).toHaveClass("w-10");
    expect(profileImage).toHaveClass("h-10");
  });

  it("displays an avatar with initial when user has no picture", () => {
    render(<UserProfileSection user={userWithoutPicture} />);

    // Verify user name is displayed
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Verify email is displayed
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();

    // No image should be rendered
    expect(screen.queryByTestId("profile-image")).not.toBeInTheDocument();

    // Instead, a div with initial should be rendered
    const avatarDiv = screen.getByText("J");
    expect(avatarDiv).toBeInTheDocument();
    expect(avatarDiv).toHaveClass("rounded-full");
    expect(avatarDiv).toHaveClass("bg-gradient-to-r");
    expect(avatarDiv).toHaveClass("from-purple-600");
    expect(avatarDiv).toHaveClass("to-blue-500");
    expect(avatarDiv).toHaveClass("flex");
    expect(avatarDiv).toHaveClass("items-center");
    expect(avatarDiv).toHaveClass("justify-center");
  });

  it("handles empty name fields and displays fallback", () => {
    render(<UserProfileSection user={userWithEmptyName} />);

    const nameElement = screen.getByRole("heading", { level: 3 });
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe("User"); // Empty string

    // Verify email is displayed
    expect(screen.getByText("anonymous@example.com")).toBeInTheDocument();

    // Avatar should show "U" as fallback
    const avatarDiv = screen.getByText("U");
    expect(avatarDiv).toBeInTheDocument();
  });

  it("applies correct container styling", () => {
    const { container } = render(<UserProfileSection user={userWithPicture} />);

    // Container should have padding and margin bottom
    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass("p-4");
    expect(containerDiv).toHaveClass("mb-6");

    // Inner container should have flex and spacing
    const innerDiv = container.querySelector(".flex");
    expect(innerDiv).toHaveClass("items-center");
    expect(innerDiv).toHaveClass("space-x-3");
    expect(innerDiv).toHaveClass("mb-3");
  });

  it("applies correct text styling", () => {
    render(<UserProfileSection user={userWithPicture} />);

    // Name should have appropriate styling
    const nameHeading = screen.getByText("John Doe");
    expect(nameHeading).toHaveClass("font-medium");
    expect(nameHeading).toHaveClass("text-gray-900");
    expect(nameHeading).toHaveClass("dark:text-white");

    // Email should be smaller and lighter
    const emailParagraph = screen.getByText("john.doe@example.com");
    expect(emailParagraph).toHaveClass("text-xs");
    expect(emailParagraph).toHaveClass("text-gray-500");
    expect(emailParagraph).toHaveClass("dark:text-gray-400");
  });
});
