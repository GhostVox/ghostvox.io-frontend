import Link from "next/link";
import { Home, BarChart } from "lucide-react";
import { DrawLink } from "./drawLink";
export const Drawer = () => {
  return (
    <div>
      <div>
        <DrawLink href="/dashboard" text={"Home"}>
          {" "}
          <Home />{" "}
        </DrawLink>
        <DrawLink href="/polls/active" text="Active Polls">
          {" "}
          <BarChart />{" "}
        </DrawLink>
        <DrawLink href="/polls/finished" text="Finished Polls">
          <BarChart />
        </DrawLink>
      </div>
      <div>
        <h3>polls</h3>
        <Link href="/polls/{userId}/create">Create a poll</Link>
        <Link href="/polls/{userId}">My polls</Link>
      </div>
    </div>
  );
};
