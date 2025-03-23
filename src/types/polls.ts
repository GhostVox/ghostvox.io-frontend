export interface PollOption {
  ID: string;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
  PollID: string;
  votes?: number;
}

export interface Poll {
  id: string;
  title: string;
  creator: string;
  description: string;
  category: string;
  options: PollOption[];
  votes: number;
  comments: number;
  expiresAt: string;
}

export interface FinishedPoll extends Poll {
  endedAt: string;
  winner: string;
}

export interface ActivePoll extends Poll {
  daysLeft: number;
}
