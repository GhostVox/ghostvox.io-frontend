import { ArrowRight, Clock, BarChart2, PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

const recentPolls = [
  {
    id: "poll-1",
    question: "Which upcoming game are you most excited about?",
    category: "Gaming",
    votes: 1872,
    comments: 143,
    daysLeft: 3,
  },
  {
    id: "poll-2",
    question: "Should AI development be more strictly regulated?",
    category: "Technology",
    votes: 3241,
    comments: 492,
    daysLeft: 5,
  },
  {
    id: "poll-3",
    question: "What's the best streaming service in 2025?",
    category: "Entertainment",
    votes: 2156,
    comments: 217,
    daysLeft: 2,
  },
];

export const RecentPolls = () => {
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-xl">Recent Polls</CardTitle>
          <Link
            href="/polls/active"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center text-sm"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-5">
            {recentPolls.map((poll) => (
              <div
                key={poll.id}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    {poll.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {poll.question}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    <span>{poll.votes} votes</span>
                  </div>
                  <Link
                    href={`/polls/${poll.id}`}
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/polls/create">
              <button className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
                <PlusCircle className="h-4 w-4 mr-1" /> Create a New Poll
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
