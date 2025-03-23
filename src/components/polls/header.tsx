import React from "react";
import PrimaryButton from "../ui/primaryButton";
import Link from "next/link";

export function Header({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/create-poll">
            <PrimaryButton text="Create New Poll" />
          </Link>
        </div>
      </div>
    </div>
  );
}
