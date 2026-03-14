import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/profile-pictures`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (profile-pictures GET):", err);
    return NextResponse.json(
      { error: "Failed to fetch profile pictures" },
      { status: 500 }
    );
  }
}
