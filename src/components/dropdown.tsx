// components/SearchBar/Dropdown.tsx
"use client";

import { useState } from "react";

interface DropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Dropdown = ({
  selectedCategory,
  onCategoryChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["Mockups", "Templates", "Design", "Logos"];

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      >
        {selectedCategory}
        <svg
          className={`w-2.5 h-2.5 ms-2.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
