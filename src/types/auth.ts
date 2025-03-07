type responseStatus = "200" | "201" | "500" | "401" | "400";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  headers: {
    authorization: string;
    status: responseStatus;
  };
  body: {
    message?: string;
    error?: string;
  };
};

export type RegisterRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export type RegisterResponse = {
  headers: {
    authorization: string;
    status: responseStatus;
  };
  body: {
    message?: string;
    error?: string;
  };
};

export type RefreshRequest = {
  message?: string;
};

export type RefreshResponse = {
  headers: {
    authorization: string;
    status: responseStatus;
  };
  body: {
    message?: string;
    error?: string;
  };
};

export type LogoutRequest = {
  body: {
    message?: string;
  };
};

export type LogoutResponse = {
  headers: {
    statuscode: responseStatus;
  };
  body: {
    message?: string;
    error?: string;
  };
};
