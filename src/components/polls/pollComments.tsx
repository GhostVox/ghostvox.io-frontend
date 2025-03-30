"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { formatDistance } from "date-fns";
import Image from "next/image";

type Comment = {
  id: string;
  userId: string;
  username: string;
  userPicture: string | null;
  content: string;
  createdAt: string;
};

interface PollCommentsProps {
  pollId: string;
}

export default function PollComments({ pollId }: PollCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments when component mounts or pollId changes
  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/comments`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setComments(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (pollId) {
      fetchComments();
    }
  }, [pollId]);

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      redirect(`/sign-in?redirect=/polls/${pollId}`);
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setCommentLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: user.username,
          content: comment,
          userPicture: user.picture,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      // Add new comment to the list
      const newComment = await response.json();
      if (comments.length >= 0) {
        setComments((prev) => [newComment, ...prev]);
        setComment(""); // Clear comment input
      } else {
        setComments([newComment]);
        setComment("");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to submit comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  // Format time for comment display
  const formatCommentTime = (dateString: string) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (e) {
      console.log(e);
      return "some time ago";
    }
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-gray-800">
        <CardTitle className="flex items-center text-xl">
          <MessageSquare className="h-5 w-5 mr-2" />
          Discussion
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Comment form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="mb-3">
            <textarea
              placeholder={user ? "Add your thoughts..." : "Please sign in to comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!user || commentLoading}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-20 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!user || !comment.trim() || commentLoading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
        </form>

        {/* Comments list */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading comments...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {comment.userPicture ? (
                      <Image
                        width={40}
                        height={40}
                        src={comment.userPicture}
                        alt={comment.username}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {comment.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        {comment.username}
                      </h4>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatCommentTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>

        {/* Load more comments button (if needed) */}
        {comments.length > 0 && comments.length % 10 === 0 && (
          <div className="mt-6 text-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              Load More Comments
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
