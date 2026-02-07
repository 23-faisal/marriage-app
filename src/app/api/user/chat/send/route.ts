import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {
  try {
    // Get token and user data from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    const userData = cookieStore.get("userData")?.value;
    console.log("User data from cookies (chat send POST):", userData);

    if (!token || !userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedUser = JSON.parse(userData);
    const senderId = parsedUser?.id;
    console.log("Sender ID extracted from cookies:", senderId);

    if (!senderId) {
      return NextResponse.json({ error: "Missing sender ID" }, { status: 400 });
    }

    // Parse request body
    const body = await req.json();
    const { receiver_id, message } = body;

    if (!receiver_id || !message) {
      return NextResponse.json(
        { error: "Receiver ID and message are required" },
        { status: 400 }
      );
    }

    // Send chat message to backend
    const response = await fetch(`${BASE_URL}/api/chat/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json", // ensures backend returns JSON
      },
      body: JSON.stringify({
        sender_id: senderId,
        receiver_id,
        message,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      const text = await response.text(); // read error HTML or text
      console.error("Backend error sending chat message:", text);
      return NextResponse.json(
        { error: "Failed to send message", backendError: text },
        { status: response.status }
      );
    }

    // Parse JSON safely
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      const text = await response.text();
      console.warn("Failed to parse JSON from backend, received:", text);
      return NextResponse.json(
        { error: "Backend returned invalid JSON", backendResponse: text },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error sending chat message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
