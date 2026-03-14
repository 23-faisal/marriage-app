import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id is required" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    const res = await fetch(`${API_URL}/profiles/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (profile GET by user):", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
