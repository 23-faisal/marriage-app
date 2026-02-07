import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: fetch education entries for the logged-in user
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    const profile_id = userData ? JSON.parse(userData).profile_id : null;

    if (!profile_id) {
      return NextResponse.json({ error: "Missing profile_id" }, { status: 401 });
    }

    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${BASE_URL}/api/educations/profile/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    // console.log("Education fetch response data:", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy fetch error (education GET):", err);
    return NextResponse.json({ error: "Failed to fetch education data" }, { status: 500 });
  }
}

// PUT: update education
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

    // Ensure profile_id is included in the request body
    body.profile_id = profile_id;

    if (!body.id) {
      return NextResponse.json({ error: "Education ID is required" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/api/educations/${body.id}`, {
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
    console.error("Proxy fetch error (education PUT):", err);
    return NextResponse.json({ error: "Failed to update education data" }, { status: 500 });
  }
}
