import { ProfileData } from "@/types";

/** ✅ Convert snake_case or lowercase string to Title Case */
export const toTitleCase = (str: string) =>
  str
    ? str
        .toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

/** ✅ Extract query parameter from URL */
export const getQueryParam = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
};

/** ✅ Fetch user profile (supports authenticated route) */
export const getUserProfile = async (profileId: string): Promise<ProfileData | null> => {
  if (!profileId) return null;
  console.log("Fetching profile for ID:", profileId);

  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const res = await fetch(`/api/user/other/${profileId}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store", // 🚀 Ensures always fresh data
    });

    if (!res.ok) {
      console.warn(`❌ Failed to fetch profile: ${res.status} ${res.statusText}`);
      return null;
    }

    const result = await res.json();
    console.log("Profile fetch result:", result);
    if (result?.success && result?.data) {
      return result.data as ProfileData;
    }

    console.warn("⚠️ Profile fetch response invalid:", result);
    return null;
  } catch (err) {
    console.error("🔥 Error fetching user profile:", err);
    return null;
  }
};

/** ✅ Calculate age from date string */
export const calculateAge = (dobString: string): string => {
  if (!dobString) return "N/A";

  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age.toString();
};
