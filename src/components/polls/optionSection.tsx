import { BarChart2, MessageSquare } from "lucide-react";
import { calculatePercentage } from "@/utils/polls";
import { VoteButton } from "./voteButton";
import { PollOption, PollVote } from "@/types/polls";

export interface OptionSectionProps<T> {
  poll: T;
  isDetailView?: boolean;
}

export function OptionSection<
  T extends {
    options: PollOption[];
    votes: number;
    winner?: string;
    comments?: number;
    id: string;
    userVote?: PollVote | null;
    status?: string;
  },
>({ poll, isDetailView = false }: OptionSectionProps<T>) {
  return (
    <div className="mt-2 mb-4 space-y-2">
      {/* Show all options in detail view, otherwise show just the first 3 */}
      {(isDetailView ? poll.options : poll.options.slice(0, 3)).map((option) => (
        <div key={option.ID} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium">
              {option.Name}
              {poll.userVote?.OptionID === option.ID && isDetailView && (
                <span className="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-0.5 rounded-full">
                  Your vote
                </span>
              )}
            </span>
            <span className="text-gray-500">
              {isDetailView ? `${option.Count} votes - ` : ""}
              {calculatePercentage(option.Count || 0, poll.votes).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${option.ID === poll.winner ? "bg-green-500" : poll.userVote?.OptionID === option.ID ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-purple-500 to-indigo-500 opacity-70"} transition-all duration-500`}
              style={{
                width: `${calculatePercentage(option.Count || 0, poll.votes)}%`,
              }}
            />
          </div>
        </div>
      ))}
      {!isDetailView && poll.options.length > 3 && (
        <div className="text-xs text-purple-600 dark:text-purple-400">
          + {poll.options.length - 3} more options
        </div>
      )}
      <div className="flex  gap-4 items-center flex-wrap justify-between mt-4">
        <div className="flex  items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{poll.votes.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{poll.comments} comments</span>
          </div>
        </div>
        {!isDetailView && <VoteButton poll={poll} text={poll.userVote ? "View Results" : "Vote"} />}
      </div>
    </div>
  );
}
