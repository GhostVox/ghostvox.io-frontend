import { redirect } from "next/navigation";
type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type FormState = {
  errors: Errors;
};

export const CreateUser = async (previousState: FormState, formData: FormData) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const createUserEndpoint: string | undefined = process.env.CREATE_USER_ENDPOINT;

  const errors: Errors = {};
  if (!createUserEndpoint) {
    throw Error("Create user endpoint is not defined");
  }
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }
  if (password && typeof password === "string" && password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (password && typeof password === "string" && password.length > 20) {
    errors.password = "Password must be less than 20 characters long";
  }
  if (password && typeof password === "string" && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const user: user = {
    firstName: firstName as string,
    lastName: lastName as string,
    email: email as string,
    password: password as string,
  };

  const response = await fetch(createUserEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return redirect("/dashboard");
};
