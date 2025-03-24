import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthCtxProvider, useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { getSession } from "../../src/utils/getSession";

// Mock the getSession utility
jest.mock("@/utils/getSession", () => ({
  getSession: jest.fn().mockResolvedValue(null),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Test component that uses the auth context
const TestComponent = () => {
  const { user, setUser } = useAuth();

  return (
    <div>
      <div data-testid="user-status">{user ? "Logged In" : "Not Logged In"}</div>
      <div data-testid="user-email">{user?.email || "No email"}</div>
      <button
        data-testid="login-button"
        onClick={() =>
          setUser({
            id: "123",
            email: "test@example.com",
            firstName: "Test",
            lastName: "User",
            picture: "",
            role: "user",
          })
        }
      >
        Login
      </button>
      <button data-testid="logout-button" onClick={() => setUser(null)}>
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  test("provides null user by default", async () => {
    await act(async () => {
      render(
        <AuthCtxProvider>
          <TestComponent />
        </AuthCtxProvider>,
      );
    });

    expect(screen.getByTestId("user-status")).toHaveTextContent("Not Logged In");
    expect(screen.getByTestId("user-email")).toHaveTextContent("No email");
  });

  test("allows setting and clearing user", async () => {
    await act(async () => {
      render(
        <AuthCtxProvider>
          <TestComponent />
        </AuthCtxProvider>,
      );
    });

    // Initial state
    expect(screen.getByTestId("user-status")).toHaveTextContent("Not Logged In");

    // Set user
    await act(async () => {
      screen.getByTestId("login-button").click();
    });

    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged In");
    expect(screen.getByTestId("user-email")).toHaveTextContent("test@example.com");

    // Clear user
    await act(async () => {
      screen.getByTestId("logout-button").click();
    });

    expect(screen.getByTestId("user-status")).toHaveTextContent("Not Logged In");
    expect(screen.getByTestId("user-email")).toHaveTextContent("No email");
  });

  test("loads user from session on mount", async () => {
    // Update the mock to return a user
    const mockUser: User = {
      id: "456",
      email: "session@example.com",
      firstName: "Session",
      lastName: "User",
      picture: "",
      role: "user",
    };

    const getSessionMock = getSession;
    getSessionMock.mockResolvedValueOnce(mockUser);

    await act(async () => {
      render(
        <AuthCtxProvider>
          <TestComponent />
        </AuthCtxProvider>,
      );
    });

    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged In");
    expect(screen.getByTestId("user-email")).toHaveTextContent("session@example.com");
  });
});
