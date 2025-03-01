import { Nosifer } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "@/components/ui/primaryButton";

const nosifer = Nosifer({
  weight: "400", // Nosifer only comes in weight 400
  subsets: ["latin"],
});

export const Navigation = () => {
  return (
    <nav className="flex justify-between p-4">
      <div className=" flex gap-4">
        <Link href="/">
          <Image src="/ghostvox-logo-transparent.png" width={40} height={40} alt="Ghostvox Logo" />
          <h1 className={nosifer.className}>GHOSTVOX</h1>
        </Link>
      </div>
      <div className="">
        <Link href="/sign-in">
          <PrimaryButton text="sign in" />
        </Link>
        <Link href="/sign-up">
          <PrimaryButton text="sign up" />
        </Link>
      </div>
    </nav>
  );
};
