"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { getSession } from "@/utils/getSession";
import { redirect } from "next/navigation";

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

  useEffect(() => {
    if (user !== null) {
      return;
    }
    async function loadUserFromCookie() {
      try {
        const userData = await getSession();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user from cookie:", error);
        redirect("/sign-in");
      } finally {
        setLoading(false);
      }
    }
    loadUserFromCookie();
  }, [setUser, user]);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}
