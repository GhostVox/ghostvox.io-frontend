"use server"

export async function DeleteAccount() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/users`
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) {
    return { error: "Failed to delete account" }
  }



}
