import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import PrimaryButton from "@/components/button";
import Link from "next/link";
export const Navigation = () => {
  return (
    <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-semibold text-[var(--foreground) ] hover:text-gray-500">
                GhostVox
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <PrimaryButton text="Sign In" />
              </SignInButton>
              <SignUpButton>
                <PrimaryButton text="Sign up" />
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/user-profile">Profile</Link>
              <SignOutButton />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};
