import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function GET(req: Request) {
  try {
    // Forward the Authorization header from client
    const token = req.headers.get("authorization");

    const res = await fetch(`${API_URL}/user/me`, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
        Accept: "application/json",
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
