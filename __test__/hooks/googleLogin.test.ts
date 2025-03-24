import { googleLogin } from "@/hooks/googleLogin";

// Mock window.location
const originalLocation = window.location;

describe("googleLogin Hook", () => {
  beforeEach(() => {
    // Mock window.location.href using Object.defineProperty
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });

    // Setup process.env
    process.env.NEXT_PUBLIC_API_URL = "https://example.com/api/v1";
  });

  afterEach(() => {
    // Restore original window.location
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    });

    // Clean up env
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  test("redirects to the correct Google login URL", async () => {
    await googleLogin();

    expect(window.location.href).toBe("https://example.com/api/v1/auth/google/login");
  });

  test("throws error when API URL is not defined", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    await expect(googleLogin()).rejects.toThrow("NEXT_PUBLIC_API_URL is not defined");
  });
});
