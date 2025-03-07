import { Drawer } from "@/components/drawers/drawer";
export default async function DashboardPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-xl text-gray-600">Welcome to your dashboard!</p>
      <div className="grid-rows-2 w-full ">
        <div className=" grid-cols-1  border-r-2border-r-white">
          <Drawer />
        </div>
      </div>
    </div>
  );
}
