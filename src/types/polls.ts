export interface PollOption {
  ID: string;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
  PollID: string;
  Count: number;
}
interface PollVote {
  ID: string;
  UserID: string;
  PollID: string;
  OptionID: string;
}
export interface Poll {
  id: string;
  title: string;
  creator: string;
  description: string;
  category: string;
  status: "Active" | "Archived";
  options: PollOption[];
  votes: number;
  comments: number;
  expiresAt: string;
  userVote: PollVote | null;
}

export interface FinishedPoll extends Poll {
  endedAt: string;
  winner: string;
}

export interface ActivePoll extends Poll {
  daysLeft: number;
  winner: boolean;
}

export type MyPoll = FinishedPoll | ActivePoll;
