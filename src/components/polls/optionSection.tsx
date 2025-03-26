import { PollOption } from "@/types/polls";
import { BarChart2, MessageSquare } from "lucide-react";
import { VoteButton } from "./voteButton";
export function OptionSection<
  T extends {
    options: PollOption[];
    votes: number;
    winner?: string;
    comments?: number;
    id: string;
  },
>({ poll }: { poll: T }) {
  return (
    <div className="mt-2 mb-4 space-y-2">
      {poll.options.slice(0, 3).map((option) => (
        <div key={option.ID} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium">{option.Name}</span>
            <span className="text-gray-500">
              {poll.votes > 0 ? Math.round(((option.votes || 0) / poll.votes) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${option.ID === poll.winner ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-indigo-600"} transition-all duration-500`}
              style={{
                width: `${poll.votes > 0 ? ((option.votes || 0) / poll.votes) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ))}
      {poll.options.length > 3 && (
        <div className="text-xs text-purple-600 dark:text-purple-400">
          + {poll.options.length - 3} more options
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{poll.votes.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{poll.comments} comments</span>
          </div>
        </div>
        <VoteButton poll={poll} />
      </div>
    </div>
  );
}
