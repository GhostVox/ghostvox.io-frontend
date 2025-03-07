import { Drawer } from "@/components/drawers/drawer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PollVisualization from "@/components/poll-visual";
import Link from "next/link";
import { ArrowRight, BarChart2, Users, Bell, PlusCircle, Clock } from "lucide-react";
import PrimaryButton from "@/components/ui/primaryButton";

export default function DashboardPage() {
  // Sample data for your dashboar
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

  const userStats = {
    pollsCreated: 12,
    totalVotes: 478,
    commentsReceived: 32,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen">
        {/* Drawer component will handle its own positioning */}
        <Drawer />

        {/* Main content - with padding to account for fixed drawer toggle on mobile */}
        <div className="flex-1 p-6 pt-16 lg:pt-6 lg:ml-4 transition-all duration-300">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Welcome back! Here's what's happening with your polls.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/polls/create">
                  <PrimaryButton text="Create New Poll" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Your Polls</p>
                    <h3 className="text-3xl font-bold mt-1">{userStats.pollsCreated}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Total Votes</p>
                    <h3 className="text-3xl font-bold mt-1">{userStats.totalVotes}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Comments</p>
                    <h3 className="text-3xl font-bold mt-1">{userStats.commentsReceived}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Bell className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Most Recent Polls */}
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

            {/* Right Column - Data Visualization */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-xl">Poll Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <PollVisualization />
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <Link href="/polls/active">
                        <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition-colors">
                          Browse Active Polls
                        </button>
                      </Link>
                      <Link href="/polls/create">
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
          </div>
        </div>
      </div>
    </div>
  );
}
