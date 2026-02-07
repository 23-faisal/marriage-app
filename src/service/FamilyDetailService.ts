"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface FamilyDetailResponse {
  id?: number;
  profile_id?: number;
  father_name?: string;
  father_occupation?: string;
  mother_name?: string;
  mother_occupation?: string;
  brothers_unmarried?: number;
  brothers_married?: number;
  sisters_unmarried?: number;
  sisters_married?: number;
  family_details?: string;
  success?: boolean;
  message?: string;
}

// ✅ Get family details by profile_id
export const getFamilyDetailByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/family-details/profile/${profileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data; // actual family detail object
  } catch (err) {
    console.error("getFamilyDetailByProfile error:", err);
    return null;
  }
};

// ✅ Create new family detail
export const createFamilyDetail = async (formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/family-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create family detail: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("createFamilyDetail error:", err.message);
    return { success: false, message: err.message };
  }
};

// ✅ Update existing family detail
export const updateFamilyDetail = async (id: number, formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/family-details/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update family detail: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateFamilyDetail error:", err.message);
    return { success: false, message: err.message };
  }
};
