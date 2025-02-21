import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { Nosifer } from "next/font/google";
import PrimaryButton from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./searchbar";

const nosifer = Nosifer({
  weight: "400", // Nosifer only comes in weight 400
  subsets: ["latin"],
});

export const Navigation = () => {
  return (
    <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1
                className={`text-xl   flex gap-3 justify-center items-center font-semibold text-[var(--foreground) ] hover:text-gray-500 ${nosifer.className}`}
              >
                <Image
                  src="/ghostvox-logo-transparent.png"
                  width={40}
                  height={40}
                  alt="Ghostvox Logo"
                />
                GHOSTVOX
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
              <SearchBar />
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
