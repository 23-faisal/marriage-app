import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    const userData = cookieStore.get("userData")?.value;
    console.log("Access user data from cookies:", userData);

    if (!token || !userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedUser = JSON.parse(userData);
    if (!parsedUser?.id) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    const response = await fetch(`${BASE_URL}/api/chat/conversations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error fetching conversations:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch conversations" },
        { status: response.status }
      );
    }

    const data = await response.json();
    // console.log("Fetched conversations from backend:", data);

    // No need to filter, backend already sends only relevant conversations
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



