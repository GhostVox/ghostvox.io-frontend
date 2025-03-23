import Link from "next/link";
import { BarChart2, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/primaryButton";

interface PollCardProps {
  poll: {
    id: string;
    question: string;
    category: string;
    votes: number;
    comments: number;
    daysLeft: number;
  };
}

export default function PollCard({ poll }: PollCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            {poll.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {poll.daysLeft} {poll.daysLeft === 1 ? "day" : "days"} left
          </span>
        </div>
        <CardTitle className="line-clamp-2 h-12">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-4">
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{poll.votes} votes</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{poll.comments} comments</span>
          </div>
        </div>
        <Link href={`/polls/${poll.id}`} className="block">
          <PrimaryButton text="Vote Now" />
        </Link>
      </CardContent>
    </Card>
  );
}
