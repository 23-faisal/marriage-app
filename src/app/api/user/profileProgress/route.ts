import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";

const API_BASE_URL = API_URL;

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");

  try {
    const res = await fetch(`${API_BASE_URL}/profile/progress`, {
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
    const res = await fetch(`${API_BASE_URL}/profile/progress/update`, {
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
