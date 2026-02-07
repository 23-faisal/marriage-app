// "use server";
// import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";

// interface ProfileStep1Response {
//   id?: number;
//   user_id?: number;
//   gender?: string;
//   dob?: string;
//   marital_status?: string;
//   height_feet?: number;
//   weight_kg?: number;
//   blood_group?: string;
//   mother_tongue?: string;
//   religion?: string;
//   caste?: string;
//   sub_caste?: string;
//   bio?: string;
//   success?: boolean;
//   message?: string;
// }

// export const createProfileStep1 = async (
//   formData: FieldValues
// ): Promise<ProfileStep1Response> => {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profiles`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(`Failed to create profile: ${res.status} - ${text}`);
//     }

//     const data = await res.json();
//     return data as ProfileStep1Response;
//   } catch (err: any) {
//     console.error("createProfileStep1 error:", err.message);
//     return { success: false, message: err.message };
//   }
// };


"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface ProfileStep1Response {
  id?: number;
  user_id?: number;
  gender?: string;
  dob?: string;
  marital_status?: string;
  height_feet?: number;
  weight_kg?: number;
  blood_group?: string;
  mother_tongue?: string;
  religion?: string;
  caste?: string;
  sub_caste?: string;
  bio?: string;
  success?: boolean;
  message?: string;
}

// ✅ Get profile by user_id
export const getProfileByUser = async (userId: number) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profiles/user/${userId}`, {
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
    return data.data; // actual profile object
  } catch (err) {
    console.error("getProfileByUser error:", err);
    return null;
  }
};


// ✅ Create new profile
export const createProfileStep1 = async (formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create profile: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("createProfileStep1 error:", err.message);
    return { success: false, message: err.message };
  }
};

// ✅ Update existing profile
export const updateProfileStep1 = async (profileId: number, formData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profiles/${profileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update profile: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error("updateProfileStep1 error:", err.message);
    return { success: false, message: err.message };
  }
};
