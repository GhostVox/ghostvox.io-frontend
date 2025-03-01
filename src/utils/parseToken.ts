"use server";
import { User } from "@/types/user";
import { cookies } from "next/headers";
export function parseToken(token: string): User {
  const parts: string[] = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");

  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
  const user = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
    role: payload.role,
  };
  return user;
}

export async function getTokenFromCookies(): Promise<string | Error> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) throw new Error("No token found");
  return token.value;
}
