import Link from "next/link";
import { Home, BarChart, PieChart, Plus } from "lucide-react";
export function AppNav({
  isMobile,
  setIsOpen,
}: {
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <nav className="flex-1">
      <div className="px-3 py-2">
        <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-3 mb-2">
          Main
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <Home className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/polls/active"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <BarChart className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
              <span>Active Polls</span>
            </Link>
          </li>
          <li>
            <Link
              href="/polls/finished"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <PieChart className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
              <span>Finished Polls</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-3 py-2 mt-6">
        <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-3 mb-2">
          Your Polls
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/create-poll"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <Plus className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
              <span>Create New Poll</span>
            </Link>
          </li>
          <li>
            <Link
              href="/polls/my-polls"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <BarChart className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
              <span>My Polls</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
