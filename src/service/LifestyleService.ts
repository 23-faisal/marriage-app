"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface LifestyleResponse {
  id?: number;
  profile_id?: number;
  diet?: string;
  smoking?: string;
  drinking?: string;
  hobbies?: string;
  success?: boolean;
  message?: string;
}

// Get lifestyle by profile
export const getLifestyleByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lifestyles/profile/${profileId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data; // adjust if your API wraps in {data: ...}
  } catch (err) {
    console.error("getLifestyleByProfile error:", err);
    return null;
  }
};

// Create lifestyle
export const createLifestyle = async (formData: FieldValues) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/lifestyles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create lifestyle: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("createLifestyle error:", err.message);
    return { success: false, message: err.message };
  }
};

// Update lifestyle
export const updateLifestyle = async (lifestyleId: number, formData: FieldValues) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/lifestyles/${lifestyleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update lifestyle: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateLifestyle error:", err.message);
    return { success: false, message: err.message };
  }
};
