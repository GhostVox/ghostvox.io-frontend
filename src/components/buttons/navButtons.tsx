"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primaryButton";
import { useRouter } from "next/navigation";


/**
 * Navigation buttons component that displays "sign in" and "sign up" buttons when the user is not authenticated,
 * and "dashboard" and "sign out" buttons when the user is authenticated.
 * The buttons have a hover effect that changes their opacity.
 */
const NavButtons = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setUser(null);
    router.push("/");
  }
  return (
    <div className="flex space-x-2 hover:opacity-100 opacity-100 transition-opacity duration-300"> {user == null && (
      <>
        <Link href="/sign-in">
          <PrimaryButton text="sign in" />
        </Link>
        <Link href="/sign-up">
          <PrimaryButton text="sign up" />
        </Link>
      </>
    )}
      {user && (
        <>
          <Link href="/dashboard">
            <PrimaryButton text="dashboard" />
          </Link>
          <PrimaryButton action={handleLogout} text="sign out" />
        </>
      )}
    </div>
  );
};

export default NavButtons;
