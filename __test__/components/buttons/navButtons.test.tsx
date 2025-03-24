import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavButtons from "@/components/buttons/navButtons";
import { authCtx } from "@/context/AuthContext";
import { User } from "@/types/user";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock fetch function
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
    }) as Promise<Response>,
);

describe("NavButtons Component", () => {
  const mockSetUser = jest.fn();

  const renderWithAuth = (user: User | null) => {
    return render(
      <authCtx.Provider value={{ user, setUser: mockSetUser }}>
        <NavButtons />
      </authCtx.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sign in and sign up buttons when user is null", () => {
    renderWithAuth(null);

    expect(screen.getByText("sign in")).toBeInTheDocument();
    expect(screen.getByText("sign up")).toBeInTheDocument();
    expect(screen.queryByText("dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("sign out")).not.toBeInTheDocument();
  });

  test("renders dashboard and sign out buttons when user is logged in", () => {
    const mockUser: User = {
      id: "123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      picture: "",
      role: "user",
    };

    renderWithAuth(mockUser);

    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("sign out")).toBeInTheDocument();
    expect(screen.queryByText("sign in")).not.toBeInTheDocument();
    expect(screen.queryByText("sign up")).not.toBeInTheDocument();
  });

  test("calls logout API and clears user when sign out is clicked", async () => {
    const mockUser: User = {
      id: "123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      picture: "",
      role: "user",
    };

    renderWithAuth(mockUser);

    const signOutButton = screen.getByText("sign out");
    fireEvent.click(signOutButton);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    );

    // Wait for state update to complete
    await Promise.resolve();

    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
