export async function googleLogin() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  window.location.href = `${baseUrl}/auth/google/login`;
}
