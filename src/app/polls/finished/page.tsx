"use client";
import React, { useState, useEffect } from "react";
import { FinishedPoll } from "@/types/polls";
import { FetchPolls } from "@/hooks/fetchPolls";
import { SearchBar } from "@/components/polls/searchBar";
import { sortPolls, filterPolls } from "@/utils/polls";
import ErrorCard from "@/components/cards/errorCard";
import { Header } from "@/components/polls/header";
import { Loading } from "@/components/polls/loading";
import { LoadMorePolls } from "@/components/polls/loadMorePolls";
import { NoPollsFound } from "@/components/polls/noPollsFound";
import { FinishedPollCard } from "@/components/polls/finishedPollCardPrewview";

export default function FinishedPollsPage() {
  // State hooks for the component
  const [polls, setPolls] = useState<FinishedPoll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch polls from API when page or category changes
  useEffect(() => {
    FetchPolls<FinishedPoll>({
      page: page,
      selectedCategory,
      setLoading,
      setHasMore,
      setPolls,
      setError,
      url: "polls/finished",
      setUsersPolls: () => {}, // Add missing required property
    });
  }, [page, selectedCategory]);

  // Apply client-side filtering based on search query
  const filteredPolls = filterPolls(polls, searchQuery);

  // Apply client-side sorting
  const sortedPolls = sortPolls(sortBy, filteredPolls);

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

      {/* Loading and Error States */}
      {loading && page === 1 && (
        <Loading>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading...</p>
        </Loading>
      )}

      {error && (
        <ErrorCard
          title={"Failed to load polls"}
          message={error}
          onDismiss={() => {
            window.location.reload();
          }}
        />
      )}

      {/* Poll Grid */}
      {(!loading || page > 1) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPolls.length > 0 ? (
            sortedPolls.map((poll) => {
              return <FinishedPollCard key={poll.id} poll={poll} />;
            })
          ) : (
            <NoPollsFound />
          )}
        </div>
      )}

      {/* Load More Button */}
      {sortedPolls.length > 0 && hasMore && !loading && (
        <LoadMorePolls loadMorePolls={loadMorePolls} />
      )}

      {/* Loading indicator for pagination */}
      {loading && page > 1 && (
        <Loading>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading more polls...</p>
        </Loading>
      )}
    </div>
  );
}
