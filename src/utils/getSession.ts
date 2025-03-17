import { getAccessTokenAndReturnUser } from "@/utils/parseToken";
import { User } from "@/types/user";
export async function getSession(): Promise<User | null> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseURL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    console.log("Unauthorized");
    throw new Error("Unauthorized");

    return null;
  }
  const user = await getAccessTokenAndReturnUser(response);
  if (!user) return null;
  return user as User;
}
