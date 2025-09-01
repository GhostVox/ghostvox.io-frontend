
import { useState, useEffect, useCallback } from "react";
import { LIMIT } from "@/state/pollState"; // Assuming LIMIT is defined elsewhere

/**
 * A custom hook to fetch paginated polls from an API.
 * @param url The base URL to fetch polls from.
 * @param page The current page number for pagination.
 * @param category The category to filter by.
 * @returns An object with the polls data, loading state, error state, and hasMore flag.
 */
export function usePolls<T>(url: string | null, page: number, category: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polls, setPolls] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);

  // Effect to reset polls when filters change, triggering a new fetch from page 1
  useEffect(() => {
    setPolls([]);
  }, [category, url]);

  const fetchPolls = useCallback(async () => {
    if (!url) return; // Don't fetch if the URL isn't ready (e.g., user not loaded)

    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * LIMIT;
      let fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}?limit=${LIMIT}&offset=${offset}`;

      if (category !== "All Categories") {
        fetchUrl += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }

      const data = (await response.json()) as T[];

      setPolls((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === LIMIT);

    } catch (err) {
      console.error("Error fetching polls:", err);
      setError("Error loading polls. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, category, url]);

  // This effect triggers the fetch operation whenever the dependencies change
  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return { loading, error, polls, hasMore };
}

