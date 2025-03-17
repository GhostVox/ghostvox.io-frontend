import React from "react";
import PrimaryButton from "@/components/ui/primaryButton";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex-1  xl:p-8 p-6 pt-16 lg:pt-6 lg:ml-4 transition-all duration-300">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your polls.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/create-poll">
              <PrimaryButton text="Create New Poll" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
