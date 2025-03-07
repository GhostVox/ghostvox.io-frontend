export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: string;
};
export type Roles = "admin" | "moderator";

//UpdateUser Route
//Requires a access token cookie
export type updateUserRequest = {
  password?: string;
  email?: string;
  name?: string;
  picture?: string;
  first_name?: string;
  last_name?: string;
  provider?: string;
  provider_id?: string;
};
export type updateUserResponse = {
  headers: {
    "Content-Type": "application/json";
    authorization: string;
  };
  body: {
    message?: string;
    error?: string;
  };
};
