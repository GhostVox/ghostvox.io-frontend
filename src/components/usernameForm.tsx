"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/formInput";
import { useAuth } from "@/context/AuthContext";

export default function UsernameForm() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError("Username can only contain letters, numbers, underscores and hyphens");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(username),
      });

      if (!response.ok) {
        const data = await response.json();

        if (data.errors && data.errors.Conflict) {
          setError("This username is already taken. Please choose another one.");
        } else {
          setError(data.error || "Failed to update username. Please try again.");
        }
        return;
      }

      // The backend will set new cookies with updated user info
      if (user) {
        // Update local user state with the new username
        setUser({
          ...user,
          username: username,
        });
      }

      // Redirect to dashboard after successful username setup
      router.push("/dashboard");
    } catch (error) {
      console.error("Error setting username:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-700 to-blue-700 text-white">
          <CardTitle className="text-2xl">Choose Your Username</CardTitle>
          <p className="text-white/80 mt-2">Select a unique username for your GhostVox account</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Your username will be displayed publicly on polls and comments you create. Choose
                something unique that represents you!
              </p>
            </div>

            <FormInput
              name="username"
              inputType="text"
              label="Username"
              value={username}
              error={error}
              onChange={handleUsernameChange}
            />

            <div className="flex pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Setting username..." : "Continue"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
