"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

/**
 * 🔹 Fetch all profile pictures
 */
export const getProfilePictures = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log("getProfilePictures: accessToken =", accessToken);

    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${API_BASE}/profile-pictures`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("getProfilePictures response status:", res.status);

    if (!res.ok) throw new Error(`Failed to fetch pictures: ${res.status}`);

    const data = await safeJson(res);
    console.log("getProfilePictures data:", data);
    return data;
  } catch (err) {
    console.error("getProfilePictures error:", err);
    return null;
  }
};

/**
 * 🔹 Upload a new profile picture
 */
export const uploadProfilePicture = async (formData: FormData) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log("uploadProfilePicture: accessToken =", accessToken);

    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${API_BASE}/profile-pictures/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    console.log("uploadProfilePicture response status:", res.status);

    if (!res.ok) throw new Error(`Failed to upload picture: ${res.status}`);

    const data = await safeJson(res);
    console.log("uploadProfilePicture data:", data);
    return data;
  } catch (err) {
    console.error("uploadProfilePicture error:", err);
    return null;
  }
};

/**
 * 🔹 Delete a profile picture
 */
export const deleteProfilePicture = async (id: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log("deleteProfilePicture: accessToken =", accessToken);

    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${API_BASE}/profile-pictures/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("deleteProfilePicture response status:", res.status);

    if (!res.ok) throw new Error(`Failed to delete picture: ${res.status}`);

    const data = await safeJson(res);
    console.log("deleteProfilePicture data:", data);
    return data;
  } catch (err) {
    console.error("deleteProfilePicture error:", err);
    return null;
  }
};

/**
 * 🔹 Set a profile picture as primary
 */
export const setPrimaryPicture = async (id: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log("setPrimaryPicture: accessToken =", accessToken);

    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${API_BASE}/profile-pictures/${id}/primary`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("setPrimaryPicture response status:", res.status);

    if (!res.ok) throw new Error(`Failed to set primary: ${res.status}`);

    const data = await safeJson(res);
    console.log("setPrimaryPicture data:", data);
    return data;
  } catch (err) {
    console.error("setPrimaryPicture error:", err);
    return null;
  }
};
