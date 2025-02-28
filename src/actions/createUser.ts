type user = {
  first_name: string;
  last_name: string;
  email: string;
  user_token: string;
  role: string;
};

export const CreateUser = async ({ user }: { user: user }) => {
  try {
    const backendUrl: string | undefined = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not set");
    }
    await fetch(backendUrl, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    console.log("User creation completed");
  }
};
