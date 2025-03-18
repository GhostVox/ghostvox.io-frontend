export type poll = {
  id: string; //
  title: string; //
  creator: string; //
  description: string; //
  daysLeft: number; //
  options: option[];
  votes: number;
  comments: number;
};

type option = {
  id: string;
  text: string;
  votes: number;
};

export async function getActivePolls(limit: number = 20, offset: number = 0) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseURL}/polls/active?limit=${limit}&offset=${offset}`);
    const data: poll[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
