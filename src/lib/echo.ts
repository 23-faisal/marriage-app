// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo<any>;
//   }
// }

// window.Pusher = Pusher;

// let echoInstance: Echo<any> | null = null;

// export const getEchoInstance = () => {
//   if (echoInstance) return echoInstance;

//   const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (!token) throw new Error("No access token found for Echo authorization");

//   echoInstance = new Echo({
//     broadcaster: "reverb",
//     key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//     wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
//     wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
//     wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
//     forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https'),
//     disableStats: true,
//     enabledTransports: ["ws", "wss"],
//     authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     },
//   });

//   echoInstance.connector.pusher.connection.bind('connected', () => {
//     console.log('✅ Reverb connected successfully!');
//   });

//   echoInstance.connector.pusher.connection.bind('error', (error: any) => {
//     console.error('❌ Reverb connection error:', error);
//   });

//   return echoInstance;
// };

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo<any>;
//   }
// }

// window.Pusher = Pusher;

// let echoInstance: Echo<any> | null = null;

// export const getEchoInstance = () => {
//   if (echoInstance) return echoInstance;

//   const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (!token) {
//     console.error("❌ No access token found for Echo authorization");
//     throw new Error("No access token found for Echo authorization");
//   }

//   // Debug environment variables
//   console.log("🌐 Echo config:");
//   console.log("🔑 APP KEY:", process.env.NEXT_PUBLIC_REVERB_APP_KEY);
//   console.log("🌍 WS HOST:", process.env.NEXT_PUBLIC_REVERB_HOST);
//   console.log("🔌 WS PORT:", process.env.NEXT_PUBLIC_REVERB_PORT);
//   console.log("🔒 Force TLS:", process.env.NEXT_PUBLIC_REVERB_SCHEME === "https");

//   echoInstance = new Echo({
//     broadcaster: "reverb",
//     key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//     wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
//     wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "6001"),
//     wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "6001"),
//     forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
//     disableStats: true,
//     enabledTransports: ["ws", "wss"],
//     authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     },
//   });

//   const pusher = echoInstance.connector.pusher;

//   // Connection events
//   pusher.connection.bind("connected", () => {
//     console.log("✅ Reverb connected successfully!", pusher.connection.socket_id);
//   });

//   pusher.connection.bind("error", (err: any) => {
//     console.error("❌ Reverb connection error:", err);
//   });

//   pusher.connection.bind("disconnected", () => {
//     console.warn("⚠️ Echo disconnected!");
//   });

//   pusher.connection.bind("state_change", (states: any) => {
//     console.log("🔄 Connection state changed:", states);
//   });

//   // Optional: auth test
//   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   })
//     .then(res => res.json())
//     .then(data => console.log("🔑 Auth endpoint test response:", data))
//     .catch(err => console.error("❌ Auth endpoint test failed:", err));

//   return echoInstance;
// };


import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

window.Pusher = Pusher;

let echoInstance: Echo<any> | null = null;

export const getEchoInstance = () => {
  if (echoInstance) return echoInstance;

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const userData = typeof window !== "undefined"? localStorage.getItem("userData"): null;
  const userId = userData? JSON.parse(userData).id : null;  
  if (!token) {
    console.error("❌ No access token found for Echo authorization");
    throw new Error("No access token found for Echo authorization");
  }

  // Debug environment variables
  console.log("🌐 Echo config:");
  console.log("🔑 APP KEY:", process.env.NEXT_PUBLIC_REVERB_APP_KEY);
  console.log("🌍 WS HOST:", process.env.NEXT_PUBLIC_REVERB_HOST);
  console.log("🔌 WS PORT:", process.env.NEXT_PUBLIC_REVERB_PORT);
  console.log("🔒 Force TLS:", process.env.NEXT_PUBLIC_REVERB_SCHEME === "https");

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
    wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "6001"),
    wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "6001"),
    forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  (window as any).Echo = echoInstance;

  const pusher = echoInstance.connector.pusher;

  // Connection events
  pusher.connection.bind("connected", () => {
    console.log("✅ Reverb connected successfully!");
    console.log("🔑 Socket ID:", pusher.connection.socket_id);

    // Example: test auth for a sample private channel
    const channelName = `private-chat.${userId}`; // change this to your actual private channel
    console.log("📡 Testing auth for channel:", channelName);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        socket_id: pusher.connection.socket_id,
        channel_name: channelName,
      }),
    })
      .then(res => res.json())
      .then(data => console.log("🔑 Auth test response:", data))
      .catch(err => console.error("❌ Auth test failed:", err));
  });

  pusher.connection.bind("error", (err: any) => {
    console.error("❌ Reverb connection error:", err);
  });

  pusher.connection.bind("disconnected", () => {
    console.warn("⚠️ Echo disconnected!");
  });

  pusher.connection.bind("state_change", (states: any) => {
    console.log("🔄 Connection state changed:", states);
  });

  return echoInstance;
};
