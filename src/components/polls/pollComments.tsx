"use client";
import {useState, useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {redirect} from "next/navigation";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {MessageSquare, XIcon} from "lucide-react";
import {formatDistance} from "date-fns";
import Image from "next/image";

type Comment = {
    ID: string;
    UserID: string;
    PollID: string;
    Content: string;
    CreatedAt: string;
    UpdatedAt: string;
    Username: {
        String: string;
        Valid: boolean;
    };
    AvatarUrl?: {
        String: string;
        Valid: boolean;
    };
};

interface PollCommentsProps {
    pollId: string;
}

export default function PollComments({pollId}: PollCommentsProps) {
    const {user} = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch comments when component mounts or pollId changes
    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/comments`,
                    {credentials: "include"},
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const data = await response.json();
                console.log("Comments data:", data);
                if (data === null) {
                    setComments([]);
                    setError(null);
                    setLoading(false);
                    return;
                } else {
                    // Make sure data is an array
                    const commentsArray = Array.isArray(data) ? data : [data];
                    setComments(commentsArray);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching comments:", err);
                setError("Failed to load comments. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        if (pollId) {


            fetchComments();
            const intervalId = setInterval(fetchComments, 10000);
            return () => clearInterval(intervalId);
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
                    content: comment,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

            // Add new comment to the list
            const resp = await response.json();
            const newComment: Comment = resp;
            etComments((prev) => {
                // 2. Create a Set of existing IDs for O(1) lookup performance
                const existingIds = new Set(prev.map((c) => c.ID));

                // 3. Check if the newly created comment already exists in the state
                // (This prevents duplicates if the setInterval fetch beat this function to the punch)
                if (existingIds.has(newComment.ID)) {
                    return prev;
                }

                // 4. Prepend the new comment to the top of the list
                return [newComment, ...prev];
            });

            setComment(""); // Clear comment input
        } catch (err) {
            console.error("Error submitting comment:", err);
            setError("Failed to submit comment. Please try again.");
        } finally {
            setCommentLoading(false);
        }
    };

    const deleteComment = async (commentId: string) => {
        if (!user) {
            redirect(`/sign-in?redirect=/polls/${pollId}`);

        }
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/comments/${commentId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete comment");
            }

            // Remove deleted comment from the list
            setComments((prev) => prev.filter((comment) => comment.ID !== commentId));
        } catch (err) {
            console.error("Error deleting comment:", err);
            setError("Failed to delete comment. Please try again.");
        }
    }

    // Format time for comment display
    const formatCommentTime = (dateString: string) => {
        try {
            return formatDistance(new Date(dateString), new Date(), {addSuffix: true});
        } catch (e) {
            console.log(e);
            return "some time ago";
        }
    };

    // Get display name for a comment
    const getDisplayName = (comment: Comment) => {
        return comment?.Username && comment?.Username?.String && comment?.Username.Valid
            ? comment.Username.String
            : "Anonymous User";
    };

    // Get initial for avatar fallback
    const getInitial = (comment: Comment) => {
        const name = getDisplayName(comment);
        return name === "Anonymous User" ? "A" : name.charAt(0).toUpperCase();
    };

    return (
        <Card>
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
                <CardTitle className="flex items-center text-xl">
                    <MessageSquare className="h-5 w-5 mr-2"/>
                    Discussion ({comments.length})
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
                        <div
                            className="mt-3 p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md">
                            {error}
                        </div>
                    )}
                </form>

                {/* Comments list */}
                <div className="space-y-6">
                    {loading ? (
                        <div key="loading" className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading comments...</p>
                        </div>
                    ) : comments && comments.length > 0 ? (
                        comments.map((comment) => (
                            <div
                                key={comment?.ID}
                                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3">
                                        {comment?.AvatarUrl && comment?.AvatarUrl.Valid && comment?.AvatarUrl.String ? (
                                            <Image
                                                width={40}
                                                height={40}
                                                src={comment.AvatarUrl.String}
                                                alt={getDisplayName(comment)}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                {getInitial(comment)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center">
                                            <h4 className="font-medium text-gray-800 dark:text-white">
                                                {getDisplayName(comment)}
                                            </h4>
                                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatCommentTime(comment?.CreatedAt)}
                      </span>
                                        </div>
                                        <p className="mt-1 text-gray-700 dark:text-gray-300">{comment?.Content}</p>
                                    </div>
                                    <div className="ml-4">
                                        {((user && user.role == "admin") || (user && user.id === comment?.UserID)) && (
                                            <button
                                                onClick={() => deleteComment(comment?.ID)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >

                                                <div
                                                    className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                                    <XIcon className="h-4 w-4"/>
                                                </div>
                                            </button>
                                        )}
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
                {
                    comments.length > 0 && comments.length % 10 === 0 && (
                        <div className="mt-6 text-center">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                                Load More Comments
                            </button>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    );
}
