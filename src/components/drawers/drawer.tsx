"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, BarChart, PieChart, Plus, Settings, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Drawer = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile screen size and handle drawer state
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);

      // Only automatically change the drawer state when the view type changes
      // This prevents resetting the user's preference when just resizing within the same view type
      if (isMobileView !== isMobile) {
        setIsOpen(!isMobileView); // Open on desktop, closed on mobile by default
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setUser(null);
    router.push("/");
  }

  return (
    <>
      {/* Mobile Toggle Button - Shown only on mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile - only shown when drawer is open on mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Drawer content */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 lg:static lg:translate-x-0 z-20 h-full w-64 bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          !isOpen && !isMobile ? "lg:-translate-x-full lg:w-0" : ""
        }`}
      >
        {/* Toggle Button for Desktop - Shown only on desktop */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto">
          {/* User Profile Section */}
          {user && (
            <div className="p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={`"${user.firstName} ${user.lastName}" || "User"`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {user.firstName?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {`${user.firstName} ${user.lastName}` || "User"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
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
                    href="/polls/create"
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

          {/* Bottom Section */}
          <div className="mt-auto p-4 border-t dark:border-gray-700">
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
        </div>
      </div>
    </>
  );
};
