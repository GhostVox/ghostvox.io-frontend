export function DesktopToggleBtn({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
}) {
  return (
    <div className="hidden lg:block absolute -right-7 top-12">
      <button
        onClick={toggleDrawer}
        className="p-1 rounded-full bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
