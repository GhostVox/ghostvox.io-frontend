export enum Selection {
  All = "all",
  Active = "Active",
  Finished = "Archived",
}

export function TabSelection({
  changeTab,
  tab,
}: {
  changeTab: (tab: Selection) => void;
  tab: Selection;
}) {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        <li className="mr-2">
          <button
            onClick={() => changeTab(Selection.All)}
            className={`inline-block p-4 rounded-t-lg ${
              tab === Selection.All
                ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            All Polls
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => changeTab(Selection.Active)}
            className={`inline-block p-4 rounded-t-lg ${
              tab === Selection.Active
                ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Active Polls
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => changeTab(Selection.Finished)}
            className={`inline-block p-4 rounded-t-lg ${
              tab === Selection.Finished
                ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Finished Polls
          </button>
        </li>
      </ul>
    </div>
  );
}
