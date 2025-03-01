export type User = {
  id: string;
  email: string;
  name: string;
  role: Roles;
  avatar: string;
  first_name?: string;
  last_name?: string;
};
export type Roles = "admin" | "moderator";
