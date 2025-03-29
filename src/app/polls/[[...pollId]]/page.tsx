"use client";
import { useUsersPollsCtx } from "@/context/usersPollsCtx";
import { MyPoll, ActivePoll, FinishedPoll } from "@/types/polls";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import ErrorCard from "@/components/cards/errorCard";
import { handleVote, voteRequest } from "@/hooks/handleVote";
import { useParams, useRouter } from "next/navigation";
import PollComments from "@/components/polls/pollComments";
import { ActivePollCard } from "@/components/polls/activePollCardPreview";
import { FinishedPollCard } from "@/components/polls/finishedPollCardPrewview";

export default function PollDetailPage() {
  const { usersPolls, setUsersPolls } = useUsersPollsCtx();
  const { user } = useAuth();
  const router = useRouter();
  const { page, pollId } = useParams();

  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [poll, setPoll] = useState<MyPoll | null>(null);
  const [votingLoading, setVotingLoading] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  const isActive = poll?.status === "Active";

  // Set the selected option based on user's previous vote (if any)
  useEffect(() => {
    const url = ` ${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}`;
    const fetchPollData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.errors || "Failed to fetch poll data");
          return;
        }

        const data = await response.json();
        setPoll(data.poll);
      } catch (e) {
        console.log(e);
        setError("Failed to fetch poll data ");
        return;
      }
    };

    fetchPollData();
  }, [pollId]);

  // Handle vote submission
  const submitVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const option = poll?.options.find((option) => option.ID === selectedOption);
    if (!option?.ID) return;

    const request: voteRequest<MyPoll> = {
      optionId: option.ID,
      page: Number(page) || 1,
      user: user,
      poll: poll,
      pollsOnPage: usersPolls.get(Number(page) || 1) || [],
      selectedOption: selectedOption,
      setVotingLoading: setVotingLoading,
      setVoteSuccess: setVoteSuccess,
      setError: setError,
      setPoll: setPoll,
      setUsersPolls: setUsersPolls,
    };

    handleVote(request);
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poll?.title || "Poll",
          text: `Check out this poll: ${poll?.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (error || !poll) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-16 lg:pt-6">
        <ErrorCard
          title="Failed to load poll"
          message={error || "Poll not found"}
          onDismiss={() => router.push("/polls/active")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-16 lg:pt-6 space-y-8">
      {/* Back button */}
      <div className="flex justify-between items-center">
        <Link href="/polls/active">
          <button className="flex items-center text-purple-600 dark:text-purple-400 hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Polls
          </button>
        </Link>

        <button
          onClick={handleShare}
          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center"
        >
          <Share2 className="h-4 w-4 mr-1" />
          <span>Share</span>
        </button>
      </div>

      {/* Poll Card - Using existing components */}
      <div className="poll-detail-card">
        {voteSuccess && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md">
            Your vote has been recorded successfully!
          </div>
        )}

        {isActive ? (
          <ActivePollCard
            poll={poll as ActivePoll}
            isDetailView={true}
            onVote={submitVote}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            votingLoading={votingLoading}
          />
        ) : (
          <FinishedPollCard poll={poll as FinishedPoll} isDetailView={true} />
        )}
      </div>

      {/* Comments Section */}
      <PollComments pollId={poll.id} />
    </div>
  );
}
