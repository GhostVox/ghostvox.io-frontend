import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ActivePoll } from "@/types/polls";
import { Clock } from "lucide-react";
import { OptionSection } from "./optionSection";

interface ActivePollCardProps {
  poll: ActivePoll;
  isDetailView?: boolean;
  onVote?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedOption?: string | null;
  setSelectedOption?: (optionId: string) => void;
  votingLoading?: boolean;
}

export function ActivePollCard({
  poll,
  isDetailView = false,
  onVote,
  selectedOption,
  setSelectedOption,
  votingLoading = false,
}: ActivePollCardProps) {
  const hasVoted = poll?.userVoted !== null;

  return (
    <Card
      key={poll.id}
      className={`overflow-hidden transition-all hover:shadow-md ${isDetailView ? "shadow-lg" : ""}`}
    >
      <CardHeader
        className={`p-4 ${isDetailView ? "bg-gradient-to-r from-purple-700 to-blue-700 text-white" : ""}`}
      >
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded ${isDetailView ? "bg-white/20" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"}`}
          >
            {poll.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className={`h-3 w-3 mr-1 ${isDetailView ? "text-white/80" : ""}`} />
            {poll.daysLeft >= 0 ? (
              <span className={isDetailView ? "text-white/80" : ""}>
                {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
              </span>
            ) : (
              <span className="text-amber-600">Expired</span>
            )}
          </div>
        </div>
        <CardTitle
          className={`line-clamp-2 ${isDetailView ? "text-2xl mb-1 text-white" : "text-lg mb-1"}`}
        >
          {poll.title}
        </CardTitle>
        <p
          className={`text-sm ${isDetailView ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
        >
          by {poll.creator}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {poll.description && (
          <p
            className={`text-sm text-gray-600 dark:text-gray-300 mb-3 ${isDetailView ? "" : "line-clamp-2"}`}
          >
            {poll.description}
          </p>
        )}

        {/* Poll Options */}
        {isDetailView && !hasVoted ? (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cast Your Vote</h3>

            <div className="space-y-4">
              {poll.options.map((option) => (
                <div key={option.ID} className="space-y-2">
                  <div className="flex items-center">
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="pollOption"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        value={option.ID}
                        checked={selectedOption === option.ID}
                        onChange={() => setSelectedOption && setSelectedOption(option.ID)}
                      />
                      <span className="ml-2 flex-1 text-gray-800 dark:text-gray-200">
                        {option.Name}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={onVote}
                disabled={!selectedOption || votingLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {votingLoading ? "Submitting..." : "Submit Vote"}
              </button>
            </div>
          </div>
        ) : (
          <OptionSection
            poll={{
              ...poll,
              winner: typeof poll.winner === "boolean" ? undefined : poll.winner,
            }}
            isDetailView={isDetailView}
          />
        )}
      </CardContent>
    </Card>
  );
}
