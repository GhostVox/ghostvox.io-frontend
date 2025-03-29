import { useCurrentPoll } from "@/context/currentPollContext";
import { PollOption } from "@/types/polls";
import { redirect } from "next/navigation";

export function VoteButton<
  T extends {
    options: PollOption[];
    votes: number;
    winner?: string;
    comments?: number;
    id: string;
  },
>({ poll, text }: { poll: T; text: string }) {
  const pollCtx = useCurrentPoll();

  const handleclick = () => {
    pollCtx.setPoll(poll as unknown as Parameters<typeof pollCtx.setPoll>[0]);
    redirect("/polls/" + poll.id);
  };

  return (
    <button
      className="px-4 py-1 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
      onClick={handleclick}
    >
      {text}
    </button>
  );
}
