import { getSession } from "@/utils/getSession";
import { getAccessTokenAndReturnUser } from "@/utils/parseToken";
import { User } from "@/types/user";

// Mock the parseToken utility
jest.mock("@/utils/parseToken", () => ({
  getAccessTokenAndReturnUser: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

describe("getSession", () => {
  // Save original environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: "https://example.com/api/v1" };
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  it("should return a user when authentication is successful", async () => {
    // Mock user to be returned
    const mockUser: User = {
      id: "user-123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      picture: "https://example.com/avatar.jpg",
      role: "user",
    };

    // Mock successful API response
    const mockResponse = {
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue("Bearer test-token"),
      },
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Mock successful token parsing
    (getAccessTokenAndReturnUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await getSession();

    // Check that the fetch was called correctly
    expect(fetch).toHaveBeenCalledWith("https://example.com/api/v1/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Check that token was parsed
    expect(getAccessTokenAndReturnUser).toHaveBeenCalledWith(mockResponse);

    // Check result is the expected user
    expect(result).toEqual(mockUser);
  });

  it("should throw an error when API request fails", async () => {
    // Mock failed API response
    const mockResponse = {
      ok: false,
      statusText: "Unauthorized",
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Use expect().rejects for cleaner async error testing
    await expect(getSession()).rejects.toThrow("Unauthorized");
  });

  it("should return null when token parsing returns null", async () => {
    // Mock successful API response
    const mockResponse = {
      ok: true,
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Mock token parsing returning null
    (getAccessTokenAndReturnUser as jest.Mock).mockResolvedValue(null);

    const result = await getSession();

    expect(result).toBeNull();
  });

  it("should handle network errors", async () => {
    // Mock network error
    const networkError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValue(networkError);

    // Use expect().rejects for cleaner async error testing
    await expect(getSession()).rejects.toThrow("Network error");
  });
});
