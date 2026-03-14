import { API_URL } from "@/lib/config";

interface GalleryUploadResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    path: string;
  }[];
}

export async function uploadGalleryImages(files: File[]): Promise<string[]> {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("Not logged in");

  if (!files.length || files.length > 4) {
    throw new Error("You can upload 1–4 images only");
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images[]", file, file.name);
  });

  const response = await fetch(
    process.env.NEXT_PUBLIC_GALLERY_IMAGE_UPLOAD_API || `${API_URL}/profile/gallery/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    },
  );

  const result: GalleryUploadResponse = await response.json();

  if (!response.ok || !result.status) {
    console.error("Upload error:", result);
    throw new Error(result.message || "Upload failed");
  }

  // return uploaded paths
  return result.data.map((img) => img.path);
}
