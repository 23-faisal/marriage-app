function getToken() {
  return localStorage.getItem("accessToken");
}

// GET ALL IMAGES
export async function fetchGallery(): Promise<[]> {
  const token = getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_FETCH_ALL_GALLERY_IMAGE_API!,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  console.log(result);

  if (!res.ok) {
    throw new Error(result.message || "Failed to load gallery");
  }

  return result.data;
}

// DELETE IMAGE
export async function deleteGalleryImage(id: number) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not logged in");

  const res = await fetch(
    `https://test.shaadimartbd.com/api/profile/gallery/${id}`,
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
