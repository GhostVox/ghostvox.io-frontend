import { LIMIT } from "@/state/pollState";
type FetchPollsParams<T> = {
  page: number;
  selectedCategory: string;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setPolls: (polls: T[] | ((prev: T[]) => T[])) => void;
  setError: (error: string | null) => void;
  url: string;
};

export async function FetchPolls<T>(params: FetchPollsParams<T>) {
  params.setLoading(true);
  try {
    // Calculate offset based on page
    const offset = (params.page - 1) * LIMIT;

    // Build query parameters
    let url = `${process.env.NEXT_PUBLIC_API_URL}/${params.url}?limit=${LIMIT}&offset=${offset}`;

    // Add category filter if selected
    if (params.selectedCategory !== "All Categories") {
      url += `&category=${encodeURIComponent(params.selectedCategory)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch polls");
    }

    const data = await response.json();
    if (!data) {
      return;
    }
    // If we got fewer results than limit, we've reached the end
    if (data.length < LIMIT) {
      params.setHasMore(false);
    } else {
      params.setHasMore(true);
    }

    // If it's the first page, replace polls, otherwise append
    if (params.page === 1) {
      params.setPolls(data);
    } else {
      params.setPolls((prev: T[]) => [...prev, ...data]);
    }

    params.setError(null);
  } catch (err) {
    console.error("Error fetching polls:", err);
    params.setError("Error loading polls. Please try again.");
  } finally {
    params.setLoading(false);
  }
}
