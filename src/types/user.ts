export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string | null;
  role: string;
};
export type Roles = "admin" | "moderator";
