import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-4 items-center pt-4  ">
      <h1 className="text-5xl "> Welcome to GhostVox</h1>
      <p className="text-xl ">
        GhostVox is a platform where communties come to vote on a wide range of
        topics to get a general census of public discourse.
      </p>
      <div className="flex">
        <SignIn />
        <Image
          src="/ghostvox-logo.png"
          alt="Ghostvox Logo"
          height={400}
          width={400}
        />
      </div>
    </div>
  );
}
