import { API_URL } from "@/lib/config";

export async function uploadProfilePicture(file: File): Promise<string> {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("Not logged in");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    process.env.NEXT_PUBLIC_PROFILE_PIC_UPLOAD_API || `${API_URL}/profile-pictures/upload`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Upload failed");
  }

  return result.data.url;
}
