import { Drawer } from "@/components/drawers/drawer";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "GhostVox polls",
  description:
    "A platform where communities come to vote on a wide range of topics to get a general census of public discourse.",
};
export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className=" relative min-h-screen bg-gray-50 dark:bg-gray-900 m-0 ">
      <div className="flex gap-10 transition-all duration-300 ease-in-out">
        <Drawer />
        {children}
      </div>
    </div>
  );
}
