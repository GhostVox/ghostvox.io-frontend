"use client";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Users, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "../polls/loading";

type UserStats = {
  TotalComments: number;
  TotalVotes: number;
  TotalPolls: number;
};

export const StatCards = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    TotalComments: 0,
    TotalVotes: 0,
    TotalPolls: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersStats = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(url + "/users/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data: UserStats = await response.json();
      setUserStats(data);
      setLoading(false);
    };
    fetchUsersStats();
  }, []);

  if (loading) {
    return (
      <Loading>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      </Loading>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-9 mb-8">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Your Polls</p>
              <h3 className="text-3xl font-bold mt-1">{userStats.TotalPolls}</h3>
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
              <h3 className="text-3xl font-bold mt-1">{userStats.TotalVotes}</h3>
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
              <h3 className="text-3xl font-bold mt-1">{userStats.TotalComments}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Bell className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
