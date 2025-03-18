"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, Clock, MessageSquare, Filter, Search } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primaryButton";

// Define the types to match the backend response
interface PollOption {
  ID: string;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
  PollID: string;
  votes?: number; // This might be added by your backend
}

interface ActivePoll {
  id: string;
  title: string;
  creator: string;
  description: string;
  category: string;
  daysLeft: number;
  options: PollOption[];
  votes: number;
  comments: number;
}

// List of categories to display in the filter dropdown
const categories = [
  "All Categories",
  "Politics",
  "Gaming",
  "Movies",
  "Technology",
  "Sports",
  "Music",
  "Food",
  "Travel",
  "Health",
  "Education",
  "Business",
  "Social Media",
  "Entertainment",
  "Other",
];

// Sort options for the dropdown
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "ending-soon", label: "Ending Soon" },
  { value: "most-votes", label: "Most Votes" },
  { value: "most-comments", label: "Most Comments" },
];

export default function ActivePollsPage() {
  // State hooks for the component
  const [polls, setPolls] = useState<ActivePoll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const LIMIT = 20;

  // Fetch polls from API when page or category changes
  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        // Calculate offset based on page
        const offset = (page - 1) * LIMIT;

        // Build query parameters
        let url = `${process.env.NEXT_PUBLIC_API_URL}/polls/active?limit=${LIMIT}&offset=${offset}`;

        // Add category filter if selected
        if (selectedCategory !== "All Categories") {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
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
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        // If it's the first page, replace polls, otherwise append
        if (page === 1) {
          setPolls(data);
        } else {
          setPolls((prev) => [...prev, ...data]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching polls:", err);
        setError("Error loading polls. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [page, selectedCategory]);

  // Apply client-side filtering based on search query
  const filteredPolls = polls.filter((poll) => {
    // Apply search filter
    if (searchQuery && !poll.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Apply client-side sorting
  const sortedPolls = [...filteredPolls].sort((a, b) => {
    switch (sortBy) {
      case "ending-soon":
        // Handle negative daysLeft values (expired polls) by putting them at the end
        if (a.daysLeft < 0 && b.daysLeft >= 0) return 1;
        if (a.daysLeft >= 0 && b.daysLeft < 0) return -1;
        return a.daysLeft - b.daysLeft;
      case "most-votes":
        return b.votes - a.votes;
      case "most-comments":
        return b.comments - a.comments;
      case "newest":
      default:
        // Assuming newer polls have higher IDs or we can add createdAt to sorting
        return 0; // The backend already sorts by newest
    }
  });

  // Event handlers for filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1); // Reset to first page when changing category
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const loadMorePolls = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-16 lg:pt-6 transition-all duration-300">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Active Polls</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Browse and vote on current polls from the community
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/create-poll">
              <PrimaryButton text="Create New Poll" />
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search polls..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BarChart2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-700"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading and Error States */}
      {loading && page === 1 && (
        <div className="col-span-3 text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading polls...</p>
        </div>
      )}

      {error && (
        <div className="col-span-3 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center my-6">
          <div className="text-red-500 dark:text-red-400 mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Error</h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Poll Grid */}
      {(!loading || page > 1) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPolls.length > 0 ? (
            sortedPolls.map((poll) => (
              <Card key={poll.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {poll.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {poll.daysLeft >= 0 ? (
                        <span>
                          {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
                        </span>
                      ) : (
                        <span className="text-amber-600">Expired</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg mb-1">{poll.title}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">by {poll.creator}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {poll.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {poll.description}
                    </p>
                  )}

                  {/* Poll Options Preview */}
                  <div className="mt-2 mb-4 space-y-2">
                    {poll.options.slice(0, 3).map((option) => (
                      <div key={option.ID} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">{option.Name}</span>
                          <span className="text-gray-500">
                            {poll.votes > 0
                              ? Math.round(((option.votes || 0) / poll.votes) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500`}
                            style={{
                              width: `${poll.votes > 0 ? ((option.votes || 0) / poll.votes) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {poll.options.length > 3 && (
                      <div className="text-xs text-purple-600 dark:text-purple-400">
                        + {poll.options.length - 3} more options
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        <span>{poll.votes.toLocaleString()} votes</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{poll.comments} comments</span>
                      </div>
                    </div>
                    <Link href={`/polls/${poll.id}`}>
                      <button className="px-4 py-1 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors">
                        Vote
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No polls found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Load More Button */}
      {sortedPolls.length > 0 && hasMore && !loading && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMorePolls}
            className="px-6 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-md transition-colors dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
          >
            Load More Polls
          </button>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {loading && page > 1 && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading more polls...</p>
        </div>
      )}
    </div>
  );
}
