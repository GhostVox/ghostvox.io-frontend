import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";

export function UserNav({
  isMobile,
  setIsOpen,
  handleLogout,
}: {
  isMobile: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
}) {
  return (
    <div className="mt-auto p-4 border-t dark:border-gray-700 sm:h-screen">
      <ul className="space-y-1">
        <li>
          <Link
            href="/user-profile"
            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <User className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 group transition-colors"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <Settings className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-500 group-hover:text-red-600 dark:text-gray-400 dark:group-hover:text-red-400" />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
