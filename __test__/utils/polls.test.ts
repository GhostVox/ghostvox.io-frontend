import { sortPolls, filterPolls } from "@/utils/polls";
import { Poll, PollOption, FinishedPoll, ActivePoll } from "@/types/polls";

// Mock data for testing
const createPollOption = (id: string, name: string, pollId: string): PollOption => ({
  ID: id,
  Name: name,
  CreatedAt: new Date("2023-01-01").toISOString(),
  UpdatedAt: new Date("2023-01-01").toISOString(),
  PollID: pollId,
  votes: Math.floor(Math.random() * 10),
});

// Base poll
const basePoll: Poll = {
  id: "1",
  title: "First Poll",
  creator: "user1",
  description: "Description 1",
  category: "General",
  options: [createPollOption("opt1", "Option 1", "1"), createPollOption("opt2", "Option 2", "1")],
  votes: 10,
  comments: 5,
  expiresAt: new Date("2023-01-15").toISOString(),
};

// Create mock polls using the proper interfaces
const mockPolls: Poll[] = [
  {
    ...basePoll,
    id: "1",
    title: "First Poll",
    votes: 10,
    comments: 5,
    expiresAt: new Date("2023-01-15").toISOString(),
  },
  {
    ...basePoll,
    id: "2",
    title: "Second Poll with Specific Term",
    votes: 20,
    comments: 2,
    expiresAt: new Date("2023-02-15").toISOString(),
  } as FinishedPoll,
  {
    ...basePoll,
    id: "3",
    title: "Third Poll",
    votes: 5,
    comments: 15,
    expiresAt: new Date("2023-03-15").toISOString(),
  } as ActivePoll,
];

// Add specific properties for finished polls
(mockPolls[1] as FinishedPoll).endedAt = new Date("2023-02-15").toISOString();
(mockPolls[1] as FinishedPoll).winner = "Option 1";

// Add specific properties for active polls
(mockPolls[2] as ActivePoll).daysLeft = 30;

describe("sortPolls", () => {
  test("should sort polls by newest (default)", () => {
    const sorted = sortPolls("newest", mockPolls);

    expect(sorted[0].id).toBe("3"); // Latest expiresAt
    expect(sorted[1].id).toBe("2"); // Second latest endedAt/expiresAt
    expect(sorted[2].id).toBe("1"); // Earliest expiresAt
  });

  test("should sort polls by oldest", () => {
    const sorted = sortPolls("oldest", mockPolls);

    expect(sorted[0].id).toBe("1"); // Earliest expiresAt
    expect(sorted[1].id).toBe("2"); // Second earliest endedAt/expiresAt
    expect(sorted[2].id).toBe("3"); // Latest expiresAt
  });

  test("should sort polls by most votes", () => {
    const sorted = sortPolls("most-votes", mockPolls);

    expect(sorted[0].id).toBe("2"); // 20 votes
    expect(sorted[1].id).toBe("1"); // 10 votes
    expect(sorted[2].id).toBe("3"); // 5 votes
  });

  test("should sort polls by most comments", () => {
    const sorted = sortPolls("most-comments", mockPolls);

    expect(sorted[0].id).toBe("3"); // 15 comments
    expect(sorted[1].id).toBe("1"); // 5 comments
    expect(sorted[2].id).toBe("2"); // 2 comments
  });

  test("should use newest sort for unknown sort criteria", () => {
    const sorted = sortPolls("invalid-sort", mockPolls);

    expect(sorted[0].id).toBe("3"); // Latest expiresAt
    expect(sorted[1].id).toBe("2"); // Second latest endedAt/expiresAt
    expect(sorted[2].id).toBe("1"); // Earliest expiresAt
  });

  test("should handle empty arrays", () => {
    const sorted = sortPolls("newest", []);
    expect(sorted).toEqual([]);
  });

  test("should handle a mix of finished and active polls", () => {
    // A mix of ActivePoll and FinishedPoll
    const mixedPolls = [
      {
        ...basePoll,
        id: "4",
        title: "Active Poll",
        daysLeft: 5,
        expiresAt: new Date("2023-04-15").toISOString(),
      } as ActivePoll,
      {
        ...basePoll,
        id: "5",
        title: "Finished Poll",
        endedAt: new Date("2023-04-10").toISOString(),
        winner: "Option 2",
        expiresAt: new Date("2023-04-10").toISOString(),
      } as FinishedPoll,
    ];

    const sorted = sortPolls("newest", mixedPolls);

    expect(sorted[0].id).toBe("4"); // Latest expiresAt
    expect(sorted[1].id).toBe("5"); // Earlier endedAt
  });
});

describe("filterPolls", () => {
  test("should return all polls when search query is empty", () => {
    const filtered = filterPolls(mockPolls, "");
    expect(filtered.length).toBe(3);
  });

  test("should filter polls by title match (case insensitive)", () => {
    const filtered = filterPolls(mockPolls, "first");
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe("1");
  });

  test("should filter polls by partial title match", () => {
    const filtered = filterPolls(mockPolls, "spec");
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe("2");
  });

  test("should return empty array if no matches found", () => {
    const filtered = filterPolls(mockPolls, "nonexistent");
    expect(filtered.length).toBe(0);
  });

  test("should handle case differences", () => {
    const filtered = filterPolls(mockPolls, "THIRD");
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe("3");
  });

  test("should handle empty arrays", () => {
    const filtered = filterPolls([], "test");
    expect(filtered).toEqual([]);
  });
});
