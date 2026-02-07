import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const viewedUserId = url.searchParams.get("viewed_user_id");
    if (!viewedUserId) {
      return NextResponse.json({ success: false, message: "viewed_user_id required" }, { status: 422 });
    }

    // Forward token from client
    const token = req.headers.get("authorization") || "";

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      `${BACKEND}/api/track-phone-request/stats?viewed_user_id=${encodeURIComponent(viewedUserId)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error (phone stats):", err);
    return NextResponse.json({ success: false, message: "Proxy error" }, { status: 500 });
  }
}
