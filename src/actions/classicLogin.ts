import { redirect } from "next/navigation";

type user = {
  email: string;
  password: string;
};

type errors = {
  email?: string;
  password?: string;
};

type FormState = {
  errors: errors;
};

export const classicSignIn = async (previousState: FormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const classicSignInURL = process.env.CLASSIC_SIGN_IN_URL;
  if (!classicSignInURL) throw new Error("Classic sign-in URL is not set");
  const errors: errors = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const user: user = {
    email: email as string,
    password: password as string,
  };

  const resp = await fetch(classicSignInURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!resp.ok) {
    throw new Error("Failed to sign in");
  }

  redirect("/dashboard");
};
