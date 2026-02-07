import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api";

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");

  try {
    const res = await fetch(`${API_BASE_URL}/api/profile/progress`, {
      method: "GET",
      headers: {
        Authorization: accessToken || "",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const accessToken = request.headers.get("authorization");
  const body = await request.json();

  try {
    const res = await fetch(`${API_BASE_URL}/api/profile/progress/update`, {
      method: "POST",
      headers: {
        Authorization: accessToken || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log("Response from backend:", res);

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}
