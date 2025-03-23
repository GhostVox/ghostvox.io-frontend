export function LoadMorePolls({ loadMorePolls }: { loadMorePolls: () => void }) {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={loadMorePolls}
        className="px-6 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-md transition-colors dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
      >
        Load More Polls
      </button>
    </div>
  );
}
