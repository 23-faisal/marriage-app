// import { NextResponse } from "next/server";

// // GET /api/proxy/user/:id
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const token = req.headers.get("authorization");
//     const userId = params.id;
    

//     if (!userId) {
//       return NextResponse.json(
//         { error: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`,
//       {
//         headers: {
//           Authorization: token || "",
//           "Content-Type": "application/json",
//         },
//       }
//     );
    

//     const data = await res.json();
//     console.log("Fetched user data:", data);
//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     console.error("Proxy fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch user data" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";

// GET /api/user/other/:id
export async function GET(req: NextRequest) {
  try {
    // Access the route params via `req.nextUrl`
    const segments = req.nextUrl.pathname.split("/");
    const userId = segments[segments.length - 1]; // last segment is [id]

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const token = req.headers.get("authorization");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
