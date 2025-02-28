export async function search({ query }: { query: string }) {
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  return data;
}
