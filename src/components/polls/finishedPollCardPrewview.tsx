import { FinishedPoll } from "@/types/polls";
import { formatEndDate } from "@/utils/formatEndDate";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OptionSection } from "./optionSection";

/**
 * @interface FinishedPollCardProps
 */
interface FinishedPollCardProps {
  /** The finished poll data to be displayed in the card. */
  poll: FinishedPoll;
  /** Indicates if the card is being viewed in detail mode. */
  isDetailView?: boolean;
}

export function FinishedPollCard({ poll, isDetailView = false }: FinishedPollCardProps) {
  return (
    <Card
      key={poll.id}
      className={` p-3 overflow-hidden transition-all hover:shadow-md ${isDetailView ? "shadow-lg" : ""}`}
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
            <span className={isDetailView ? "text-white/80" : ""}>
              Ended {formatEndDate(poll.endedAt)}
            </span>
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

        {/* Results Badge */}
        {poll.winner && (
          <div className="mb-3">
            <div className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium px-2.5 py-1 rounded">
              {poll.winner === "draw" ? (
                "Result: Draw"
              ) : (
                <>
                  Winner: {poll.options.find((o) => o.id === poll.winner)?.name} (
                  {(
                    ((poll.options.find((o) => o.id === poll.winner)?.count || 0) / poll.votes) *
                    100
                  ).toFixed(1)}
                  %)
                </>
              )}
            </div>
          </div>
        )}

        {/* Poll Options Preview */}
        <OptionSection poll={poll} isDetailView={isDetailView} />
      </CardContent>
    </Card>
  );
}
