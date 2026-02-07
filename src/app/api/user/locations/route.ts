import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: fetch location details by profileId
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies(); // ✅ await here
    const userData = cookieStore.get("userData")?.value;
    
    const profile_id = userData ? JSON.parse(userData).profile_id : null;


    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${BASE_URL}/api/locations/profile/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy fetch error (locations GET):", err);
    return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
  }
}

// PUT: update location details
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies(); // ✅ await here
    const userData = cookieStore.get("userData")?.value;
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";
    const body = await req.json();

    // Ensure profile_id is in body
    body.profile_id = profile_id;

    const res = await fetch(`${BASE_URL}/api/locations`, {
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
    console.error("Proxy fetch error (locations PUT):", err);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}
