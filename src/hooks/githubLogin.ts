export async function githubLogin() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("BASE_URL is not defined");
  }
  window.location.href = `${baseURL}/auth/github/login`;
}
