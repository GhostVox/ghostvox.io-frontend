import { Poll } from "@/types/polls";

export function sortPolls<
  T extends { endedAt?: string | Date; expiresAt?: string | Date; votes: number; comments: number },
>(sortBy: string, polls: T[]): T[] {
  const sortedPolls = [...polls].sort((a, b) => {
    switch (sortBy) {
      case "oldest": {
        const aDate = new Date(a.endedAt || a.expiresAt || 0).getTime();
        const bDate = new Date(b.endedAt || b.expiresAt || 0).getTime();
        return aDate - bDate;
      }
      case "most-votes":
        return b.votes - a.votes;
      case "most-comments":
        return b.comments - a.comments;
      case "newest":
      default: {
        const aDate = new Date(a.endedAt || a.expiresAt || 0).getTime();
        const bDate = new Date(b.endedAt || b.expiresAt || 0).getTime();
        return bDate - aDate;
      }
    }
  });
  return sortedPolls;
}

export function filterPolls<T extends Poll>(polls: T[], searchQuery: string): T[] {
  const filteredPolls = polls.filter((poll) => {
    // Apply search filter
    if (searchQuery && !poll.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  return filteredPolls;
}
