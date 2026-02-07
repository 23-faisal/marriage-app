import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("BACKEND_URL not defined");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // ✅ Decode `features` if it's a stringified JSON
    if (data?.plans?.length) {
      data.plans = data.plans.map((plan: any) => ({
        ...plan,
        features:
          typeof plan.features === "string"
            ? JSON.parse(plan.features)
            : plan.features,
        popular: plan.popular === 1 || plan.popular === true,
      }));
    }
    // console.log("Processed plans data:", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Error fetching plans:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
