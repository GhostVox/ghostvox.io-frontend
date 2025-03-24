import { Menu, X } from "lucide-react";

export function MobileToggleBtn({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
}) {
  return (
    <div className="lg:hidden fixed top-4 left-4 z-30">
      <button
        onClick={toggleDrawer}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
}
