"use client";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { MyPoll, ActivePoll } from "@/types/polls";
import { useAuth } from "@/context/AuthContext";
import { filterPolls, sortPolls } from "@/utils/polls";
import ErrorCard from "@/components/cards/errorCard";
import { LoadMorePolls } from "@/components/polls/loadMorePolls";
import { Loading } from "@/components/polls/loading";
import { NoPollsFound } from "@/components/polls/noPollsFound";
import { SearchBar } from "@/components/polls/searchBar";
import { Header } from "@/components/polls/header";
import { TabSelection, Selection } from "@/components/polls/tabSelection";
import { FetchPolls } from "@/hooks/fetchPolls";
import { ActivePollCard } from "@/components/polls/activePollCardPreview";
import { FinishedPollCard } from "@/components/polls/finishedPollCardPrewview";

export default function MyPollsPage() {
  const { user } = useAuth();

  // State hooks for the component
  const [polls, setPolls] = useState<MyPoll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabView, setTabView] = useState<Selection>(Selection.All);

  // Fetch polls from API when page, category, or tab changes

  useEffect(() => {
    if (!user?.id) return;

    FetchPolls<MyPoll>({
      page,
      selectedCategory,
      setLoading,
      setHasMore,
      setPolls,
      setError,
      url: `/polls/by-user/${user.id}`,
    });
  }, [page, selectedCategory, tabView, user?.id]);
  // After fetching in useEffect
  const filteredByTabPolls =
    tabView === Selection.All ? polls : polls.filter((poll) => poll.status === tabView);

  // Then apply search filtering to the tab-filtered polls
  const filteredPolls = filterPolls(filteredByTabPolls, searchQuery);

  // Apply client-side sorting
  const sortedPolls = sortPolls(sortBy, filteredPolls);

  // Check if poll is active or finished
  const isPollActive = (poll: MyPoll): poll is ActivePoll => {
    return poll.status === "Active";
  };

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

  const changeTab = (tab: Selection) => {
    setTabView(tab);
    setPage(1); // Reset to first page when changing tabs
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-16 lg:pt-6 transition-all duration-300">
      <Header title="My Polls" description="Manage and track your created polls" />

      {/* Tabs */}
      <TabSelection tab={tabView} changeTab={changeTab} />

      <SearchBar
        searchQuery={searchQuery}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        sortBy={sortBy}
      />

      {/* Loading and Error States */}
      {loading && page === 1 && (
        <Loading>
          <p>loading...</p>
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
              const isActive = isPollActive(poll);

              return isActive ? (
                <ActivePollCard key={poll.id} poll={poll} />
              ) : (
                <FinishedPollCard key={poll.id} poll={poll} />
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12">
              <NoPollsFound>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {tabView === "all"
                    ? "You haven't created any polls yet"
                    : `You don't have any ${tabView} polls`}
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
        </div>
      )}

      {/* Load More Button */}
      {sortedPolls.length > 0 && hasMore && !loading && (
        <LoadMorePolls loadMorePolls={loadMorePolls} />
      )}

      {/* Loading indicator for pagination */}
      {loading && page > 1 && (
        <Loading>
          {" "}
          <p>Loading...</p>
        </Loading>
      )}
    </div>
  );
}
