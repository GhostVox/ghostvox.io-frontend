import { MyPoll } from "@/types/polls";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export type voteRequest<T> = {
  optionId: string | null;
  page: number;
  user: User | null;
  poll: MyPoll | null;
  pollsOnPage: MyPoll[];
  selectedOption: string | null;
  setVotingLoading: Dispatch<SetStateAction<boolean>>;
  setVoteSuccess: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setUsersPolls: Dispatch<SetStateAction<Map<number, T[]>>>;
  setPoll: Dispatch<SetStateAction<T | null>>;
};

export async function handleVote(voteRequest: voteRequest<MyPoll>) {
  const {
    page,
    setUsersPolls,
    user,
    poll,
    optionId,
    selectedOption,
    setVotingLoading,
    setVoteSuccess,
    setError,
    setPoll,
  } = voteRequest;
  if (!user) {
    redirect(`/sign-in?redirect=/polls/${poll?.id}`);
  }

  if (!selectedOption) {
    return;
  }

  setVotingLoading(true);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/polls/${poll?.id}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ optionId: optionId, userId: user.id, pollId: poll?.id, poll }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit vote");
    }

    // Update poll data with new vote count
    const updatedPoll = await response.json();
    setVoteSuccess(true);

    setPoll((prev) => {
      if (!prev) return updatedPoll;
      return { ...prev, votes: updatedPoll.votes };
    });

    // check for page, if it is not null then user came from their poll's page and we need to update their poll context else they came from active  polls page to vote.
    if (page) {
      setUsersPolls((prev) => {
        const newMap = new Map(prev); // Create a copy of the previous Map
        const updatedPolls = [...(newMap.get(page) || [])]; // Get a copy of the polls for this page
        const index = updatedPolls.findIndex((p) => p.id === poll?.id);

        if (index !== -1) {
          updatedPolls[index] = updatedPoll; // Update the specific poll
          newMap.set(page, updatedPolls); // Set the updated polls for this page
        }

        return newMap; // Return the updated Map
      });
    }

    // Reset success message after 3 seconds
    setTimeout(() => {
      setVoteSuccess(false);
    }, 3000);
  } catch (err) {
    console.error("Error submitting vote:", err);
    setError("Failed to submit vote. Please try again.");
  } finally {
    setVotingLoading(false);
  }
}
