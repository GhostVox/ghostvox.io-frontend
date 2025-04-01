"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { getSession } from "@/utils/getSession";
import { usePathname, useRouter } from "next/navigation"; // Changed import to next/navigation

// 1. Define the context type
type UserCtxType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// 2. Create the context with a default value
export const authCtx = createContext<UserCtxType>({
  user: null,
  setUser: () => {}, // Placeholder function
});

// 3. Create the custom hook to use this context
export function useAuth() {
  return useContext(authCtx);
}

// 4. Create the provider component
export function AuthCtxProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  const router = useRouter(); // This will now work correctly

  useEffect(() => {
    if (user !== null) {
      return;
    }

    async function loadUserFromCookie() {
      try {
        const userData = await getSession();
        console.log(userData);
        if (userData) {
          setUser(userData);
          // Only redirect to setup-username if user is logged in but missing username
          if (
            !userData.username &&
            path !== "/setup-username" &&
            path !== "/sign-in" &&
            path !== "/sign-up" &&
            path !== "/"
          ) {
            router.push("/setup-username");
          }
        } else if (
          path !== "/sign-in" &&
          path !== "/sign-up" &&
          path !== "/" &&
          path !== "/setup-username"
        ) {
          // Only redirect to sign-in if no user data and not on auth-related pages
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error loading user from cookie:", error);

        // Only redirect on errors if not on auth-related pages
        if (
          path !== "/sign-in" &&
          path !== "/sign-up" &&
          path !== "/" &&
          path !== "/setup-username"
        ) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    }

    loadUserFromCookie();
  }, [setUser, user, path, router]); // Added router to dependencies

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}
