import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center items-centermin-h-screen py-2">
      <h1 className="font-extrabold text-4xl shadow-md">Welcome to Ghostvox</h1>
      <p>
        Ghostvox is a platform for society to come together and vote on issues happening in our
        community.
      </p>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
