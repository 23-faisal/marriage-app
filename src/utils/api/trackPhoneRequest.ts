export async function trackPhoneRequest(viewedUserId: number) {
    try {
        const token = localStorage.getItem("accessToken");
        const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL;

        const res = await fetch(`${apiBase}/api/track-phone-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ viewed_user_id: viewedUserId }),
        });

        let data;
        const text = await res.text(); // read response as text first

        try {
            data = JSON.parse(text); // try parsing as JSON
        } catch (jsonError) {
            console.error("Failed to parse JSON, response text:", text);
            return { success: false, message: "Invalid response from server" };
        }

        console.log("Phone request response status:", res.status);
        console.log("Phone request response:", data);

        return data;
    } catch (error) {
        console.error("Phone request error:", error);
        return { success: false, message: "Network error" };
    }
}
