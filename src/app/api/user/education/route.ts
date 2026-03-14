import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const profileId = url.searchParams.get("profile_id");

  if (!profileId) {
    return NextResponse.json({ error: "profile_id is required" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    const res = await fetch(`${API_URL}/educations/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (education GET):", err);
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    const body = await req.json();

    const res = await fetch(`${API_URL}/educations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (education POST):", err);
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const educationId = url.searchParams.get("id");

  if (!educationId) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      "";

    const body = await req.json();

    const res = await fetch(`${API_URL}/educations/${educationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (education PUT):", err);
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
  }
}
