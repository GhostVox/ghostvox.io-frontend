import { parseToken, getAccessTokenAndReturnUser } from "@/utils/parseToken";

// Create a real JWT token for testing
const createTestJWT = () => {
  // Create a simple JWT with header, payload, and signature parts
  // The payload contains our test user data
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "user-123",
      email: "test@example.com",
      first_name: "Test",
      last_name: "User",
      picture_url: "https://example.com/avatar.jpg",
      role: "user",
    }),
  );
  const signature = "test-signature"; // Doesn't need to be valid for our tests

  return `${header}.${payload}.${signature}`;
};

describe("parseToken", () => {
  test("should parse a JWT token into a user object", async () => {
    const token = createTestJWT();

    const user = await parseToken(token);

    expect(user).toEqual({
      id: "user-123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      picture: "https://example.com/avatar.jpg",
      role: "user",
    });
  });

  test("should throw an error if token format is invalid", async () => {
    const invalidToken = "invalid-token-format";

    await expect(() => parseToken(invalidToken)).rejects.toThrow("Invalid token");
  });
});

describe("getAccessTokenAndReturnUser", () => {
  test("should extract access token from response header and return user", async () => {
    const token = createTestJWT();
    const mockResponse = {
      headers: {
        get: jest.fn().mockReturnValue(`Bearer ${token}`),
      },
    } as unknown as Response;

    const user = await getAccessTokenAndReturnUser(mockResponse);

    expect(mockResponse.headers.get).toHaveBeenCalledWith("Authorization");
    expect(user).toEqual({
      id: "user-123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      picture: "https://example.com/avatar.jpg",
      role: "user",
    });
  });

  test("should throw an error if no Authorization header exists", async () => {
    const mockResponse = {
      headers: {
        get: jest.fn().mockReturnValue(null),
      },
    } as unknown as Response;

    await expect(getAccessTokenAndReturnUser(mockResponse)).rejects.toThrow("No token found");
  });

  test("should throw an error if Authorization header does not contain a token", async () => {
    const mockResponse = {
      headers: {
        get: jest.fn().mockReturnValue("Bearer "),
      },
    } as unknown as Response;

    await expect(getAccessTokenAndReturnUser(mockResponse)).rejects.toThrow("No token found");
  });
});
