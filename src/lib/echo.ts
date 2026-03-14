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
import { API_URL } from "@/lib/config";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

let echoInstance: Echo<any> | null = null;

export const resetEchoInstance = () => {
  if (echoInstance) {
    try {
      echoInstance.disconnect();
    } catch {}
    echoInstance = null;
  }
};

export const getEchoInstance = (): Echo<any> => {
  if (echoInstance) return echoInstance;

  if (typeof window === "undefined") {
    throw new Error("Echo can only be used in the browser");
  }

  // Attach Pusher to window (required by laravel-echo)
  window.Pusher = Pusher;

  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found for Echo authorization");
  }

  const forceTLS = process.env.NEXT_PUBLIC_REVERB_SCHEME === "https";
  const port = parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "6001");

  console.log("🌐 Creating Echo instance:", {
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    host: process.env.NEXT_PUBLIC_REVERB_HOST,
    port,
    forceTLS,
    authEndpoint: `${API_URL}/broadcasting/auth`,
  });

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
    wsPort: port,
    wssPort: port,
    forceTLS,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${API_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  (window as any).Echo = echoInstance;

  const pusher = echoInstance.connector.pusher;

  pusher.connection.bind("connected", () => {
    console.log("✅ Reverb connected! Socket ID:", pusher.connection.socket_id);
  });

  pusher.connection.bind("error", (err: any) => {
    console.error("❌ Reverb connection error:", err);
    // Reset so next call to getEchoInstance() creates a fresh connection
    resetEchoInstance();
  });

  pusher.connection.bind("disconnected", () => {
    console.warn("⚠️ Reverb disconnected. Will reconnect on next subscription.");
    resetEchoInstance();
  });

  pusher.connection.bind("state_change", (states: any) => {
    console.log("🔄 Connection state:", states.current);
  });

  return echoInstance;
};
