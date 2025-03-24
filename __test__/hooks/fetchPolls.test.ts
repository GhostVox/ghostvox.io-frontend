import { FetchPolls } from "@/hooks/fetchPolls";
import { LIMIT } from "@/state/pollState";

// Mock fetch
global.fetch = jest.fn();

describe("FetchPolls Hook", () => {
  const mockSetLoading = jest.fn();
  const mockSetHasMore = jest.fn();
  const mockSetPolls = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "https://example.com/api/v1";
  });

  const defaultParams = {
    page: 1,
    selectedCategory: "All Categories",
    setLoading: mockSetLoading,
    setHasMore: mockSetHasMore,
    setPolls: mockSetPolls,
    setError: mockSetError,
    url: "/polls/active",
  };

  test("should call fetch with correct URL for first page without category filter", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: "1", title: "Test Poll" }]),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls(defaultParams);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://example.com/api/v1//polls/active?limit=${LIMIT}&offset=0`,
    );
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetPolls).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith(null);
  });

  test("should call fetch with correct URL for first page with category filter", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: "1", title: "Test Poll" }]),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls({
      ...defaultParams,
      selectedCategory: "Gaming",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://example.com/api/v1//polls/active?limit=${LIMIT}&offset=0&category=Gaming`,
    );
  });

  test("should call fetch with correct offset for second page", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: "1", title: "Test Poll" }]),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls({
      ...defaultParams,
      page: 2,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://example.com/api/v1//polls/active?limit=${LIMIT}&offset=${LIMIT}`,
    );
  });

  test("should set hasMore to false when fewer results than limit returned", async () => {
    const mockData = Array(LIMIT - 1).fill({ id: "1", title: "Test Poll" });
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls(defaultParams);

    expect(mockSetHasMore).toHaveBeenCalledWith(false);
  });

  test("should set hasMore to true when limit number of results returned", async () => {
    const mockData = Array(LIMIT).fill({ id: "1", title: "Test Poll" });
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls(defaultParams);

    expect(mockSetHasMore).toHaveBeenCalledWith(true);
  });

  test("should replace polls for first page", async () => {
    const mockData = [{ id: "1", title: "Test Poll" }];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls(defaultParams);

    expect(mockSetPolls).toHaveBeenCalledWith(mockData);
  });

  test("should append polls for second page", async () => {
    const mockData = [{ id: "2", title: "Test Poll 2" }];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls({
      ...defaultParams,
      page: 2,
    });

    // Check that setPolls was called with a function
    expect(mockSetPolls).toHaveBeenCalled();
    const setStateCallback = mockSetPolls.mock.calls[0][0];
    expect(typeof setStateCallback).toBe("function");

    // Simulate the function call with previous state
    const prevState = [{ id: "1", title: "Test Poll 1" }];
    const newState = setStateCallback(prevState);

    // Verify expected result
    expect(newState).toEqual([...prevState, ...mockData]);
  });

  test("should handle error from fetch", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const mockResponse = {
      ok: false,
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await FetchPolls(defaultParams);

    expect(mockSetError).toHaveBeenCalledWith("Error loading polls. Please try again.");
    expect(mockSetLoading).toHaveBeenCalledWith(false);

    console.error = originalConsoleError;
  });
  test("should handle network error", async () => {
    // Temporarily suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    try {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      await FetchPolls(defaultParams);
      expect(mockSetError).toHaveBeenCalledWith("Error loading polls. Please try again.");
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    } finally {
      // Restore console.error
      console.error = originalError;
    }
  });
});
