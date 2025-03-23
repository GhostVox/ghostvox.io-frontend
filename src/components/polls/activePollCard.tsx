import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ActivePoll } from "@/types/polls";
import { Clock } from "lucide-react";
import { OptionSection } from "./optionSection";
export function ActivePollCard({ poll }: { poll: ActivePoll }) {
  return (
    <Card key={poll.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            {poll.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {poll.daysLeft >= 0 ? (
              <span>
                {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
              </span>
            ) : (
              <span className="text-amber-600">Expired</span>
            )}
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg mb-1">{poll.title}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">by {poll.creator}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {poll.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {poll.description}
          </p>
        )}

        {/* Poll Options Preview */}
        <OptionSection poll={poll} />
      </CardContent>
    </Card>
  );
}
