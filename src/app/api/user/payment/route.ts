import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get token from headers sent by client
    const token = req.headers.get("Authorization")?.replace("Bearer ", "") || "";

    // Convert request FormData to backend FormData
    const formData = await req.formData();
    const backendFormData = new FormData();
    formData.forEach((value, key) => {
      backendFormData.append(key, value as string | Blob);
    });

    // Call Laravel backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: backendFormData,
    });

    // Ensure backend returns JSON
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("Backend returned non-JSON response:", text);
      return NextResponse.json(
        { success: false, message: "Backend returned non-JSON response" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Payment submit error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
