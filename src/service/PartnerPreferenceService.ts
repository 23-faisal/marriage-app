"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// Get partner preference by profile
export const getPreferenceByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/partner-preferences/profile/${profileId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("getPreferenceByProfile error:", err);
    return null;
  }
};

// Create preference
export const createPreference = async (formData: FieldValues) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/partner-preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to create preference");

    return await res.json();
  } catch (err) {
    console.error("createPreference error:", err);
    return null;
  }
};

// Update preference
export const updatePreference = async (id: number, formData: FieldValues) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/partner-preferences/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to update preference");

    return await res.json();
  } catch (err) {
    console.error("updatePreference error:", err);
    return null;
  }
};
