import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(
  request: Request,
  paramsObj: { params: { otherUserId?: string | string[] } } | any
) {
  try {
    // ✅ Await cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    const userData = cookieStore.get("userData")?.value;

    if (!token || !userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedUser = JSON.parse(userData);
    if (!parsedUser?.id) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    // ✅ Await params if needed
    const awaitedParams = await paramsObj.params; // this is the key change
    let otherUserId: string | undefined;

    if (Array.isArray(awaitedParams.otherUserId)) {
      otherUserId = awaitedParams.otherUserId[0]; // first if array
    } else {
      otherUserId = awaitedParams.otherUserId;
    }

    if (!otherUserId) {
      return NextResponse.json({ error: "Missing otherUserId" }, { status: 400 });
    }

    console.log("Fetching messages for otherUserId:", otherUserId);

    const response = await fetch(`${BASE_URL}/api/chat/messages/${otherUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error fetching messages:", errorText);
      return NextResponse.json({ error: "Failed to fetch messages" }, { status: response.status });
    }

    const data = await response.json();
    // console.log(`Fetched messages for user ${otherUserId}:`, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
