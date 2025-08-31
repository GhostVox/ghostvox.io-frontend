import { useCurrentPoll } from "@/context/currentPollContext";
import { PollOption } from "@/types/polls";
import { redirect } from "next/navigation";

/**
 * Button component that navigates to a poll's detail page and sets it as the current poll.
 * 
 * Used by poll cards throughout the application to provide a consistent "View Poll" action.
 * Sets the poll in global context and navigates to the poll detail page.
 * 
 * @template T - Poll type that extends the required poll properties
 * @param poll - The poll object to navigate to and set as current
 * @param text - The button text to display
 * 
 * @example
 * ```tsx
 * <VoteButton poll={myPoll} text="View Poll" />
 * ```
 * 
 * @example
 * ```tsx
 * // Used in poll cards
 * <VoteButton poll={activePoll} text="Vote Now" />
 * ```
 */
export function VoteButton<
  T extends {
    options: PollOption[];
    votes: number;
    winner?: string;
    comments?: number;
    id: string;
    status?: string;
  },
>({ poll, text }: { poll: T; text: string }) {
  const pollCtx = useCurrentPoll();

  const handleclick = () => {
    pollCtx.setPoll(poll as unknown as Parameters<typeof pollCtx.setPoll>[0]);
    if (poll.status == "Archived") {
      redirect("/polls/" + poll.id);
    } else {
      redirect("/polls/" + poll.id);
    }
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
