import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PollVisualization } from "@/components/poll-visual";
import Link from "next/link";

export const DataVisual = () => {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-xl">Poll Insights</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <PollVisualization />
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Link href="/polls/active">
                <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition-colors">
                  Browse Active Polls
                </button>
              </Link>
              <Link href="/dashboard/create-poll">
                <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition-colors">
                  Create New Poll
                </button>
              </Link>
              <Link href="/user-profile">
                <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition-colors">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
