import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();
    console.log("Sending params to backend:", body);


    const backendUrl = API_URL;

    const res = await fetch(`${backendUrl}/profiles/search`, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
        Accept: "application/json",
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
