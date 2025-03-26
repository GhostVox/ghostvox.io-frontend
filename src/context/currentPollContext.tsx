import { createContext, useContext, useState } from "react";
import { MyPoll } from "@/types/polls";

type CurrentPollContextType = {
  poll: MyPoll | null;
  setPoll: React.Dispatch<React.SetStateAction<MyPoll | null>>;
};

export const currentPollContext = createContext<CurrentPollContextType>({
  poll: null,
  setPoll: () => {},
});

export const useCurrentPoll = () => useContext(currentPollContext);

export function CurrentPollProvider({ children }: { children: React.ReactNode }) {
  const [poll, setPoll] = useState<MyPoll | null>(null);

  const value = {
    poll,
    setPoll,
  };

  return <currentPollContext.Provider value={value}>{children}</currentPollContext.Provider>;
}
