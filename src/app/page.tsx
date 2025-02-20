import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>GhostVox</h1>
      <p>
        GhostVox is a platform where communties come to vote on a wide range of
        topics to get a general census of public discourse.
      </p>
      <Image src="/ghostvox.png" alt="GhostVox" width={500} height={500} />
    </div>
  );
}
