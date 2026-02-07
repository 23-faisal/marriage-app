"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface CareerResponse {
  id?: number;
  profile_id?: number;
  profession?: string;
  job_title?: string;
  company?: string;
  annual_income?: number;
  success?: boolean;
  message?: string;
}

// ✅ Get career by profile_id
export const getCareerByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/careers/profile/${profileId}`,
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
    return data.data; // actual career object
  } catch (err) {
    console.error("getCareerByProfile error:", err);
    return null;
  }
};

// ✅ Create new career
export const createCareer = async (formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/careers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create career: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("createCareer error:", err.message);
    return { success: false, message: err.message };
  }
};

// ✅ Update existing career
export const updateCareer = async (careerId: number, formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/careers/${careerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update career: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateCareer error:", err.message);
    return { success: false, message: err.message };
  }
};
