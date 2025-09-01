import { Drawer } from "@/components/drawers/drawer";
export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className=" relative min-h-screen bg-gray-50 dark:bg-gray-900 m-0 ">
      <div className="flex gap-10 transition-all duration-300 ease-in-out">
        <Drawer />
        {children}
      </div>
    </div>
  );
}
