"use client";
import UsernameForm from "@/components/usernameForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetupUsernamePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to sign in
    if (!user) {
      const timer = setTimeout(() => {
        router.push("/sign-in");
      }, 1000); // 1 second delay
      return () => clearTimeout(timer);
    }

    // If user already has a username, redirect to dashboard
    if (user && user.username) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Only render the username form if user exists but doesn't have a username
  return (
    <>
      <UsernameForm />
    </>
  );
}
