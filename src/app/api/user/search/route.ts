import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();
    console.log("Sending params to backend:", body);


    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

    const res = await fetch(`${backendUrl}/api/profiles/search`, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("Proxy fetch response status:", res.status);
    const data = await res.json();
    console.log("Proxy fetch response data:", data);

    // Always return 200 to frontend so it can handle "no profiles" gracefully
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
