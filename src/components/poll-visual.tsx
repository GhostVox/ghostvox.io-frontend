import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PollVisualization = () => {
  // Sample poll data
  const pollData = {
    question: "What's your favorite gaming platform?",
    category: "Gaming",
    totalVotes: 2347,
    options: [
      { label: "PC", votes: 982, percentage: 41.8 },
      { label: "PlayStation", votes: 687, percentage: 29.3 },
      { label: "Xbox", votes: 452, percentage: 19.3 },
      { label: "Nintendo Switch", votes: 226, percentage: 9.6 },
    ],
  };

  // Function to determine bar color based on position
  const getBarColor = (index: number) => {
    const colors = ["bg-purple-600", "bg-blue-500", "bg-cyan-500", "bg-indigo-500"];
    return colors[index % colors.length];
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="text-sm font-medium bg-white/20 rounded-full px-3 py-1 w-fit mb-2">
          {pollData.category}
        </div>
        <CardTitle className="text-xl font-bold">{pollData.question}</CardTitle>
        <div className="text-sm mt-2">{pollData.totalVotes.toLocaleString()} votes</div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {pollData.options.map((option, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{option.label}</span>
                <span className="text-gray-500">
                  {option.votes.toLocaleString()} votes ({option.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${getBarColor(index)} transition-all duration-500`}
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PollVisualization;
