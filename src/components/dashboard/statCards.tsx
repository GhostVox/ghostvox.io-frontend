import { Card, CardContent } from "../card";
import { BarChart2, Users, Bell } from "lucide-react";

const userStats = {
  pollsCreated: 12,
  totalVotes: 478,
  commentsReceived: 32,
};

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-9 mb-8">
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
  );
};
