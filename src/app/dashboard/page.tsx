import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/statCards";
import { RecentPolls } from "@/components/dashboard/recentPolls";
import { DataVisual } from "@/components/dashboard/dataVisual";
export default function DashboardPage() {
  // Sample data for your dashboar

  return (
    <div className="p-6 pt-16 lg:pt-6 lg:ml-4 transition-all duration-300">
      <Header />
      <StatCards />
      {/* Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Most Recent Polls */}
        <RecentPolls />
        {/* Right Column - Poll Visualization */}
        <DataVisual />
      </div>
    </div>
  );
}
