"use client";
import React, { useState, useEffect } from "react";
import { FinishedPoll } from "@/types/polls";
import { usePolls } from "@/hooks/usePolls"; // Import the custom hook
import { SearchBar } from "@/components/polls/searchBar";
import { sortPolls, filterPolls } from "@/utils/polls";
import ErrorCard from "@/components/cards/errorCard";
import { Header } from "@/components/polls/header";
import { Loading } from "@/components/polls/loading";
import { LoadMorePolls } from "@/components/polls/loadMorePolls";
import { NoPollsFound } from "@/components/polls/noPollsFound";
import { FinishedPollCard } from "@/components/polls/finishedPollCardPrewview";

export default function FinishedPollsPage() {
  // State for UI filters and pagination
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");

  // Use the custom hook to get data and state for finished polls
  const { polls, loading, error, hasMore } = usePolls<FinishedPoll>(
    "/polls/finished", // The specific API endpoint
    page,
    selectedCategory
  );

  // Effect to reset the page number when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // Apply client-side filtering and sorting
  const filteredPolls = filterPolls(polls, searchQuery);
  const sortedPolls = sortPolls(sortBy, filteredPolls);

  // Event handlers for filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const loadMorePolls = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-6 p-6 pt-16 lg:pt-6 transition-all duration-300 flex flex-col grow">
      <Header title="Finished Polls" description="Explore all finished polls." />

      <SearchBar
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        sortBy={sortBy}
        selectedCategory={selectedCategory}
      />

      {/* Loading state for the initial page load */}
      {loading && page === 1 && (
        <Loading>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading...</p>
        </Loading>
      )}

      {/* Error state */}
      {error && (
        <ErrorCard
          title={"Failed to load polls"}
          message={error}
          onDismiss={() => window.location.reload()}
        />
      )}

      {/* Poll Grid - Render if not loading on page 1 */}
      {(!loading || page > 1) && sortedPolls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPolls.map((poll) => (
            <FinishedPollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}

      {/* No Polls Found state - Render if not loading and no polls exist */}
      {!loading && sortedPolls.length === 0 && <NoPollsFound />}

      {/* Load More Button */}
      {hasMore && !loading && <LoadMorePolls loadMorePolls={loadMorePolls} />}

      {/* Loading indicator for subsequent pages */}
      {loading && page > 1 && (
        <Loading>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading more polls...</p>
        </Loading>
      )}
    </div>
  );
}
