"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface LocationResponse {
  id?: number;
  profile_id?: number;
  present_address?: string;
  permanent_address?: string;
  city?: string;
  address?: string;
  nationality?: string;
  residence_status?: string;
  living_status?: string;
  success?: boolean;
  message?: string;
}

export const getLocationByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/locations/profile/${profileId}`,
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
    // console.log("Location fetch response:", data);
    return data; // make sure it returns the object, not wrapped in {data: ...}
  } catch (err) {
    console.error("getLocationByProfile error:", err);
    return null;
  }
};

// ✅ Create new location
export const createLocation = async (formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create location: ${res.status} - ${text}`);
    }

    console.log("Create response",res)

    return await res.json();
  } catch (err: any) {
    console.error("createLocation error:", err.message);
    return { success: false, message: err.message };
  }
};

// ✅ Update existing location
export const updateLocation = async (locationId: number, formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update location: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateLocation error:", err.message);
    return { success: false, message: err.message };
  }
};
