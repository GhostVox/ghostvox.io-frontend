"use client";
import { User } from "@/types/user";
export async function parseToken(token: string): Promise<User> {
  const parts: string[] = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");

  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
  const user: User = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    role: payload.role,
  };
  return user;
}

export async function getAccessTokenAndReturnUser(response: Response): Promise<User | Error> {
  const bearerString = response.headers.get("Authorization");
  if (!bearerString) throw new Error("No token found");
  const accessToken = bearerString.split(" ")[1];
  if (!accessToken) throw new Error("No token found");

  const user = parseToken(accessToken);
  return user;
}
