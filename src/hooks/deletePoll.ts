export async function deletePoll(pollId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete poll");
  }
  return true
}
