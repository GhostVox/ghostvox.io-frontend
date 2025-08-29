import { Search, Filter, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CardContent } from "../ui/card";
import { categories, sortOptions } from "@/state/pollState";

/**
 * SearchBar component for capturing user filtering and sorting prefrences, updates current pages
 * state to reflect the preferences.
 * 
 * Props:
 * - searchQuery: Current search query string.
 * - handleSearchChange: Function to handle changes in the search input.
 * - selectedCategory: Currently selected category for filtering.
 * - handleCategoryChange: Function to handle changes in the category select.
 * - sortBy: Current sorting option.
 * - handleSortChange: Function to handle changes in the sort select.
 */
export function SearchBar({
  searchQuery,
  selectedCategory,
  sortBy,
  handleSearchChange,
  handleCategoryChange,
  handleSortChange,
}: {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSortBy?: (value: string) => void;
}) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search polls..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-700"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-700"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
