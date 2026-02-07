"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

/**
 * ===========================
 * SIGN UP USER
 * ===========================
 */
export const SignUpUser = async (userData: FieldValues) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/signup`;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    
    // Check if registration was successful based on response data
    if (result.status === true || result.success === true || result.message?.includes("successfully") || result.user) {
      return { 
        success: true, 
        message: result.message || "Registration successful!",
        user: result.user || result.data 
      };
    }

    // If we get here, registration failed
    return { 
      success: false, 
      message: result.message || "Registration failed" 
    };
    
  } catch (error: any) {
    console.error("SignUpUser error:", error.message);
    
    // Check if it's actually a success case with weird error
    if (error.message?.includes("successfully")) {
      return { 
        success: true, 
        message: "Registration successful!" 
      };
    }
    
    return { 
      success: false, 
      message: error.message || "Unknown error occurred" 
    };
  }
};

/**
 * ===========================
 * LOGIN USER
 * ===========================
 */
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    console.log("Login result:", result);

    if (result?.status && result?.token) {
      const cookieStore = await cookies();

      // Store access token securely
      cookieStore.set("accessToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Store user data (id, email, profile_id, plan, etc.)
      if (result?.data) {
        cookieStore.set("userData", JSON.stringify(result.data), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      // Optional: sync to localStorage client-side
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", result.token);
        localStorage.setItem("userData", JSON.stringify(result.data));
        console.log("LocalStorage updated with accessToken and userData", result.data);
      }

      revalidateTag("loginUser");
    }

    return result;
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { status: false, message: error.message || "Login failed" };
  }
};

/**
 * ===========================
 * CHANGE PASSWORD
 * ===========================
 */
export const PasswordChange = async (payload: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    revalidateTag("loginUser");
    return data;
  } catch (error: any) {
    console.error("PasswordChange error:", error.message);
    return { status: false, message: error.message };
  }
};

/**
 * ===========================
 * GET CURRENT USER (Optimized)
 * ===========================
 */
export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const userDataCookie = cookieStore.get("userData")?.value;

    if (!accessToken) {
      console.log("No access token found");
      return null;
    }

    // 1️⃣ First try cookie cache
    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie);
        return userData;
      } catch {
        console.warn("Invalid userData cookie. Fetching from backend...");
      }
    }

    // 2️⃣ Fallback to backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      next: { tags: ["loginUser"] },
    });

    if (!res.ok) {
      console.error("Failed to fetch user data", res.status);
      return null;
    }

    const responseData = await res.json();

    if (responseData?.success || responseData?.status) {
      const data = responseData.data || responseData.user || responseData;
      cookieStore.set("userData", JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};

/**
 * ===========================
 * LOGOUT
 * ===========================
 */
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");
  revalidateTag("loginUser");

  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
  }

  return { success: true };
};