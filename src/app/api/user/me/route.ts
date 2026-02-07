import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Forward the Authorization header from client
    const token = req.headers.get("authorization");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    // Pass the backend response directly to the client
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
