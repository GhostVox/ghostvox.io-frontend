import { MyPoll } from "@/types/polls";
import { createContext, useContext, useState } from "react";

type UsersPollsContextType = {
  usersPolls: Map<number, MyPoll[]>;
  setUsersPolls: React.Dispatch<React.SetStateAction<Map<number, MyPoll[]>>>;
};

const UsersPollsCtx = createContext<UsersPollsContextType>({
  usersPolls: new Map(),
  setUsersPolls: () => {},
});

export const useUsersPollsCtx = () => useContext(UsersPollsCtx);

export function UsersPollsProvider({ children }: { children: React.ReactNode }) {
  const [usersPolls, setUsersPolls] = useState<Map<number, MyPoll[]>>(new Map());

  const value = {
    usersPolls,
    setUsersPolls,
  };

  return <UsersPollsCtx.Provider value={value}>{children}</UsersPollsCtx.Provider>;
}
