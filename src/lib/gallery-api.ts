import { API_URL } from "@/lib/config";

function getToken() {
  return localStorage.getItem("accessToken");
}

// GET ALL IMAGES
export async function fetchGallery(): Promise<[]> {
  const token = getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_FETCH_ALL_GALLERY_IMAGE_API || `${API_URL}/profile/gallery`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  // If server error (e.g. user has no profile yet), return empty array gracefully
  if (!res.ok) {
    const result = await res.json().catch(() => ({}));
    console.warn("Gallery fetch warning:", result.message || res.status);
    return [] as unknown as [];
  }

  const result = await res.json();
  return (result.data ?? []) as [];
}

// DELETE IMAGE
export async function deleteGalleryImage(id: number) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not logged in");

  const res = await fetch(
    `${API_URL}/profile/gallery/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  const result = await res.json();

  // Check the backend response
  if (!res.ok || !result.status) {
    throw new Error(result.message || "Delete failed");
  }

  return result;
}
