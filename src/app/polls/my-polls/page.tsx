"use client";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { MyPoll, ActivePoll } from "@/types/polls";
import { useAuth } from "@/context/AuthContext";
import { filterPolls, sortPolls } from "@/utils/polls";
import { usePolls } from "@/hooks/usePolls"; // Import the custom hook
import ErrorCard from "@/components/cards/errorCard";
import { LoadMorePolls } from "@/components/polls/loadMorePolls";
import { Loading } from "@/components/polls/loading";
import { NoPollsFound } from "@/components/polls/noPollsFound";
import { SearchBar } from "@/components/polls/searchBar";
import { Header } from "@/components/polls/header";
import { TabSelection, Selection } from "@/components/polls/tabSelection";
import { ActivePollCard } from "@/components/polls/activePollCardPreview";
import { FinishedPollCard } from "@/components/polls/finishedPollCardPrewview";

export default function MyPollsPage() {
  const { user } = useAuth();

  // State for UI filters and pagination
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [tabView, setTabView] = useState<Selection>(Selection.All);

  // Construct the API URL. The hook will not run if this is null.
  const apiUrl = user ? `/users/${user.id}/polls` : null;

  // Use the custom hook to get data and state
  const { polls, loading, error, hasMore } = usePolls<MyPoll>(apiUrl, page, selectedCategory);

  // Effect to reset the page number when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, tabView]);

  // Client-side filtering and sorting
  const filteredByTabPolls = tabView === Selection.All ? polls : polls.filter((poll) => poll.status === tabView);
  const filteredPolls = filterPolls(filteredByTabPolls, searchQuery);
  const sortedPolls = sortPolls(sortBy, filteredPolls);

  // Helper function to check poll status
  const isPollActive = (poll: MyPoll): poll is ActivePoll => poll.status === "Active";

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value);
  const changeTab = (tab: Selection) => setTabView(tab);

  const loadMorePolls = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-16 lg:pt-6">
      <Header title="My Polls" description="Manage and track your created polls" />
      <TabSelection tab={tabView} changeTab={changeTab} />
      <SearchBar
        searchQuery={searchQuery}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        sortBy={sortBy}
      />

      {/* Loading state for the initial page load */}
      {loading && page === 1 && <Loading><p>loading...</p></Loading>}

      {/* Error state */}
      {error && <ErrorCard title="Failed to load polls" message={error} onDismiss={() => window.location.reload()} />}

      {/* Poll Grid - Render if not loading on page 1 */}
      {(!loading || page > 1) && sortedPolls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPolls.map((poll) => (
            isPollActive(poll) ? (
              <ActivePollCard key={poll.id} poll={poll} />
            ) : (
              <FinishedPollCard key={poll.id} poll={poll} />
            )
          ))}
        </div>
      )}

      {/* No Polls Found state - Render if not loading and no polls exist */}
      {!loading && sortedPolls.length === 0 && (
        <div className="col-span-3 text-center py-12">
          <NoPollsFound>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery ? "No polls match your search." : "You haven't created any polls yet."}
            </p>
            <Link href="/dashboard/create-poll" className="inline-flex items-center">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors">
                <Plus className="h-4 w-4" />
                Create Your First Poll
              </button>
            </Link>
          </NoPollsFound>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && <LoadMorePolls loadMorePolls={loadMorePolls} />}

      {/* Loading indicator for subsequent pages */}
      {loading && page > 1 && <Loading><p>Loading...</p></Loading>}
    </div>
  );
}
