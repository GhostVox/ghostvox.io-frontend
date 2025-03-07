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
