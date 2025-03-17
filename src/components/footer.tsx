import Link from "next/link";

export const Footer = () => {
  return (
    <div className="  w-screen ">
      <div className="flex justify-center items-center gap-4 ">
        <Link href="https://github.com/GhostVox"></Link>
        <p>© {new Date().getFullYear()} GhostVox</p>
      </div>
    </div>
  );
};
