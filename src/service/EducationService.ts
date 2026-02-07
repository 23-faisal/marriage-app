"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface EducationResponse {
  id?: number;
  profile_id?: number;
  Heighets_degree?: string;
  institute_name?: string;
  graduation_year?: number;
  additional_certificates?: string;
  success?: boolean;
  message?: string;
}

// ✅ Get education by profile_id
export const getEducationByProfile = async (profileId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/educations/profile/${profileId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return null;
    }
    console.log("got data", res)

    const data = await res.json();
    return data.data; // actual education object
  } catch (err) {
    console.error("getEducationByProfile error:", err);
    return null;
  }
};

// ✅ Create new education
export const createEducation = async (formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/educations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create education: ${res.status} - ${text}`);
    }
    console.log("response",res)

    return await res.json();
  } catch (err: any) {
    console.error("createEducation error:", err.message);
    return { success: false, message: err.message };
  }
};

// ✅ Update existing education
export const updateEducation = async (educationId: number, formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/educations/${educationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update education: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateEducation error:", err.message);
    return { success: false, message: err.message };
  }
};
