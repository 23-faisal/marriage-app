import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/profile-pictures/${id}/set-primary`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (profile-pictures set-primary POST):", err);
    return NextResponse.json(
      { error: "Failed to set primary picture" },
      { status: 500 }
    );
  }
}
