// "use client";

// import ChatList from "@/components/ui/Message/ChatList";
// import ChatWindow, { Message } from "@/components/ui/Message/ChatWindow";
// import { useEffect, useState } from "react";
// import { useChatListener } from "@/hooks/useChatListener";

// interface ChatItem {
//   id: number;
//   name: string;
//   lastMsg: string;
//   image: string;
//   timeOrDate: string;
//   isActive: boolean;
//   userId: number;
// }

// // Logger utility
// const log = {
//   info: (msg: string, ...args: any[]) => console.info(`%cℹ️ ${msg}`, "color: blue; font-weight: bold;", ...args),
//   success: (msg: string, ...args: any[]) => console.log(`%c✅ ${msg}`, "color: green; font-weight: bold;", ...args),
//   warn: (msg: string, ...args: any[]) => console.warn(`%c⚠️ ${msg}`, "color: orange; font-weight: bold;", ...args),
//   error: (msg: string, ...args: any[]) => console.error(`%c❌ ${msg}`, "color: red; font-weight: bold;", ...args),
// };

// export default function MessagePage() {
//   const [chats, setChats] = useState<ChatItem[]>([]);
//   const [activeChatId, setActiveChatId] = useState<number | null>(null);
//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pendingMessages, setPendingMessages] = useState<Set<string>>(new Set()); // Track pending messages

//   // --- Fetch conversations on mount ---
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await fetch("/api/user/chat/conversation", {
//           credentials: "include",
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("Failed to fetch conversations");

//         const data = await res.json();
//         if (!Array.isArray(data)) throw new Error("Invalid conversation data format");

//         const apiCurrentUserId = data[0]?.current_user_id ?? null;
//         setCurrentUserId(apiCurrentUserId);

//         const formatted: ChatItem[] = data.map((conv: any, i: number) => ({
//           id: conv.id,
//           name: conv.other_user?.name || "Unknown User",
//           image:
//             conv.other_user?.profile_photo ||
//             "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//           lastMsg: conv.last_message || "No messages yet",
//           timeOrDate: conv.updated_at
//             ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//             : "",
//           isActive: i === 0,
//           userId: conv.other_user?.id || 0,
//         }));

//         setChats(formatted);
//         if (formatted.length) setActiveChatId(formatted[0].id);

//         log.success("Conversations loaded successfully", formatted);
//       } catch (err) {
//         log.error("Error fetching conversations:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConversations();
//   }, []);

//   // --- Fetch messages for the active chat ---
//   useEffect(() => {
//     if (!activeChatId || !currentUserId) return;

//     const fetchMessages = async () => {
//       try {
//         const chat = chats.find(c => c.id === activeChatId);
//         if (!chat) return;

//         const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
//           credentials: "include",
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("Failed to fetch messages");

//         const data = await res.json();
//         if (!Array.isArray(data)) throw new Error("Invalid messages data format");

//         const formatted: Message[] = data.map((m: any) => ({
//           sender: m.sender_id === currentUserId ? "me" : "them",
//           text: m.message,
//           time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         }));

//         setMessages(formatted);
//         log.success(`Messages loaded for chat ${chat.id}`, formatted);
//       } catch (err) {
//         log.error("Error fetching messages:", err);
//       }
//     };

//     fetchMessages();
//   }, [activeChatId, currentUserId, chats]);

//   // --- Enhanced Real-time chat listener with deduplication ---
//   useChatListener({ 
//     currentUserId, 
//     setMessages, 
//     setChats,
//     pendingMessages,
//     setPendingMessages
//   });

//   // --- Select chat ---
//   const handleSelectChat = (chatId: number) => {
//     setActiveChatId(chatId);
//     setChats(prev => prev.map(c => ({ ...c, isActive: c.id === chatId })));
//     log.info(`Chat selected: ${chatId}`);
//   };

//   // --- Send message (HYBRID: Optimistic + Real-time) ---
//   const handleSendMessage = async (text: string) => {
//     if (!activeChatId || !currentUserId) return;

//     const chat = chats.find(c => c.id === activeChatId);
//     if (!chat) return;

//     const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const tempId = `${Date.now()}-${Math.random()}`; // Unique ID for pending message
    
//     const newMessage: Message = { 
//       sender: "me", 
//       text, 
//       time: timestamp,
//       tempId // Add temporary ID for tracking
//     };

//     // 1. INSTANT UI UPDATE (Optimistic)
//     setMessages(prev => [...prev, newMessage]);
//     setPendingMessages(prev => new Set([...prev, tempId]));
    
//     log.info("Optimistic update - message added instantly:", newMessage);

//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await fetch("/api/user/chat/send", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json", 
//           Authorization: `Bearer ${token || ""}` 
//         },
//         body: JSON.stringify({ 
//           receiver_id: chat.userId, 
//           message: text 
//         }),
//       });
      
//       if (!res.ok) throw new Error("Send failed");

//       log.success("Message sent to server - waiting for real-time confirmation");
      
//       // The real-time event will handle the final confirmation
//       // If real-time fails, we keep the optimistic message (it's already in the DB)
      
//     } catch (err) {
//       log.error("Error sending message:", err);
//       // Optional: Mark message as failed in UI
//       setMessages(prev => prev.map(msg => 
//         msg.tempId === tempId ? { ...msg, failed: true } : msg
//       ));
//     }
//   };

//   // --- Beautiful Loading Spinner (Same as your step2 page) ---
//   if (loading) {
//     return (
//       <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center space-y-4">
//           <svg 
//             className="animate-spin h-12 w-12 text-rose-600" 
//             xmlns="http://www.w3.org/2000/svg" 
//             fill="none" 
//             viewBox="0 0 24 24"
//           >
//             <circle 
//               className="opacity-25" 
//               cx="12" 
//               cy="12" 
//               r="10" 
//               stroke="currentColor" 
//               strokeWidth="4"
//             ></circle>
//             <path 
//               className="opacity-75" 
//               fill="currentColor" 
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           <p className="text-lg text-gray-600 font-medium">Loading your conversations...</p>
//           <p className="text-sm text-gray-400">Getting your messages ready</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
//       <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
//         {chats.length ? (
//           <ChatList chats={chats} onSelect={handleSelectChat} />
//         ) : (
//           <div className="p-10 text-gray-400 text-center">
//             You don't have any conversations yet.
//           </div>
//         )}
//       </div>

//       <div className="flex-1 bg-white">
//         {activeChatId ? (
//           <ChatWindow
//             messages={messages}
//             activeUser={{
//               name: chats.find(c => c.id === activeChatId)?.name || "Unknown User",
//               image: chats.find(c => c.id === activeChatId)?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//               id: chats.find(c => c.id === activeChatId)?.userId || 0,
//             }}
//             currentUserId={currentUserId || 0}
//             onSendMessage={handleSendMessage}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import ChatList from "@/components/ui/Message/ChatList";
import ChatWindow, { Message } from "@/components/ui/Message/ChatWindow";
import { useEffect, useState } from "react";
import { useChatListener } from "@/hooks/useChatListener";
import {CircleDot } from "lucide-react";

interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  timeOrDate: string;
  isActive: boolean;
  userId: number;
}

// Logger utility
const log = {
  info: (msg: string, ...args: any[]) => console.info(`%cℹ️ ${msg}`, "color: blue; font-weight: bold;", ...args),
  success: (msg: string, ...args: any[]) => console.log(`%c✅ ${msg}`, "color: green; font-weight: bold;", ...args),
  warn: (msg: string, ...args: any[]) => console.warn(`%c⚠️ ${msg}`, "color: orange; font-weight: bold;", ...args),
  error: (msg: string, ...args: any[]) => console.error(`%c❌ ${msg}`, "color: red; font-weight: bold;", ...args),
};

export default function MessagePage() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingMessages, setPendingMessages] = useState<Set<string>>(new Set()); // Track pending messages
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // Mobile modal state

  // --- Fetch conversations on mount ---
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/user/chat/conversation", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch conversations");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid conversation data format");

        const apiCurrentUserId = data[0]?.current_user_id ?? null;
        setCurrentUserId(apiCurrentUserId);

        const formatted: ChatItem[] = data.map((conv: any, i: number) => ({
          id: conv.id,
          name: conv.other_user?.name || "Unknown User",
          image:
            conv.other_user?.profile_photo ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          lastMsg: conv.last_message || "No messages yet",
          timeOrDate: conv.updated_at
            ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "",
          isActive: i === 0,
          userId: conv.other_user?.id || 0,
        }));

        setChats(formatted);
        if (formatted.length) setActiveChatId(formatted[0].id);

        log.success("Conversations loaded successfully", formatted);
      } catch (err) {
        log.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // --- Fetch messages for the active chat ---
  useEffect(() => {
    if (!activeChatId || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const chat = chats.find(c => c.id === activeChatId);
        if (!chat) return;

        const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid messages data format");

        const formatted: Message[] = data.map((m: any) => ({
          sender: m.sender_id === currentUserId ? "me" : "them",
          text: m.message,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        setMessages(formatted);
        log.success(`Messages loaded for chat ${chat.id}`, formatted);
      } catch (err) {
        log.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [activeChatId, currentUserId, chats]);

  // --- Enhanced Real-time chat listener with deduplication ---
  useChatListener({ 
    currentUserId, 
    setMessages, 
    setChats,
    pendingMessages,
    setPendingMessages
  });

  // --- Select chat ---
  const handleSelectChat = (chatId: number) => {
    setActiveChatId(chatId);
    setChats(prev => prev.map(c => ({ ...c, isActive: c.id === chatId })));
    
    // On mobile, open the chat modal
    if (window.innerWidth < 1024) { // lg breakpoint
      setIsMobileChatOpen(true);
    }
    
    log.info(`Chat selected: ${chatId}`);
  };

  // --- Close mobile chat ---
  const handleCloseMobileChat = () => {
    setIsMobileChatOpen(false);
  };

  // --- Send message (HYBRID: Optimistic + Real-time) ---
  const handleSendMessage = async (text: string) => {
    if (!activeChatId || !currentUserId) return;

    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const tempId = `${Date.now()}-${Math.random()}`; // Unique ID for pending message
    
    const newMessage: Message = { 
      sender: "me", 
      text, 
      time: timestamp,
      tempId // Add temporary ID for tracking
    };

    // 1. INSTANT UI UPDATE (Optimistic)
    setMessages(prev => [...prev, newMessage]);
    setPendingMessages(prev => new Set([...prev, tempId]));
    
    log.info("Optimistic update - message added instantly:", newMessage);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/user/chat/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token || ""}` 
        },
        body: JSON.stringify({ 
          receiver_id: chat.userId, 
          message: text 
        }),
      });
      
      if (!res.ok) throw new Error("Send failed");

      log.success("Message sent to server - waiting for real-time confirmation");
      
      // The real-time event will handle the final confirmation
      // If real-time fails, we keep the optimistic message (it's already in the DB)
      
    } catch (err) {
      log.error("Error sending message:", err);
      // Optional: Mark message as failed in UI
      setMessages(prev => prev.map(msg => 
        msg.tempId === tempId ? { ...msg, failed: true } : msg
      ));
    }
  };

  // --- Beautiful Loading Spinner (Same as your step2 page) ---
  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <svg 
            className="animate-spin h-12 w-12 text-rose-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg text-gray-600 font-medium">Loading your conversations...</p>
          <p className="text-sm text-gray-400">Getting your messages ready</p>
        </div>
      </div>
    );
  }

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Chat List - Always visible */}
      <div className="w-full lg:w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
        {chats.length ? (
          <ChatList chats={chats} onSelect={handleSelectChat} />
        ) : (
          <div className="p-10 text-gray-400 text-center">
            You don't have any conversations yet.
          </div>
        )}
      </div>

      {/* Desktop Chat Window - Hidden on mobile */}
      <div className="flex-1 bg-white hidden lg:block">
        {activeChatId ? (
          <ChatWindow
            messages={messages}
            activeUser={{
              name: activeChat?.name || "Unknown User",
              image: activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              id: activeChat?.userId || 0,
            }}
            currentUserId={currentUserId || 0}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Mobile Chat Modal */}
      {/* Mobile Chat Modal */}
{isMobileChatOpen && activeChatId && (
  <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
    {/* Mobile Header with Back Button */}
    <div className="flex items-center p-4 border-b border-gray-200 bg-white flex-shrink-0">
      <button
        onClick={handleCloseMobileChat}
        className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex items-center gap-3 flex-1">
        <img
          src={activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt={activeChat?.name || "Unknown User"}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{activeChat?.name || "Unknown User"}</p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <CircleDot className="h-2 w-2 fill-green-500 text-green-500" />
            Online
          </p>
        </div>
      </div>
    </div>
    
    {/* Chat Window - Takes remaining space */}
    <div className="flex-1 min-h-0">
      <ChatWindow
        messages={messages}
        activeUser={{
          name: activeChat?.name || "Unknown User",
          image: activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          id: activeChat?.userId || 0,
        }}
        currentUserId={currentUserId || 0}
        onSendMessage={handleSendMessage}
      />
    </div>
  </div>
)}
    </div>
  );
}