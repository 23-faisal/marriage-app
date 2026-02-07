import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: fetch career details for logged-in user
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    console.log("User data from cookies (careers GET):", userData);
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${BASE_URL}/api/careers/profile/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
  
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy fetch error (careers GET):", err);
    return NextResponse.json({ error: "Failed to fetch career data" }, { status: 500 });
  }
}

// POST: create career entry
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";
    const body = await req.json();

    // attach profile_id to request body
    body.profile_id = profile_id;

    const res = await fetch(`${BASE_URL}/api/careers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy fetch error (careers POST):", err);
    return NextResponse.json({ error: "Failed to submit career data" }, { status: 500 });
  }
}

// PUT: update career entry
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

    if (!body.id) {
      return NextResponse.json({ error: "Career ID is required" }, { status: 400 });
    }

    // attach profile_id
    body.profile_id = profile_id;

    const res = await fetch(`${BASE_URL}/api/careers/${body.id}`, {
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
    console.error("Proxy fetch error (careers PUT):", err);
    return NextResponse.json({ error: "Failed to update career data" }, { status: 500 });
  }
}
