import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: fetch partner preferences by profile ID
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${BASE_URL}/api/partner-preferences/profile/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    // console.log("Proxy fetch (partner GET) response data:", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy fetch error (partner GET):", err);
    return NextResponse.json({ error: "Failed to fetch partner preferences" }, { status: 500 });
  }
}

// PUT: update partner preferences by ID
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";
    const body = await req.json();

    // Ensure profile_id is included
    body.profile_id = profile_id;

    if (!body.id) {
      return NextResponse.json({ error: "PartnerPreference ID is required" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/api/partner-preferences/${body.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy update error (partner PUT):", err);
    return NextResponse.json({ error: "Failed to update partner preferences" }, { status: 500 });
  }
}
