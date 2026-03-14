"use client";

import { getEchoInstance } from "@/lib/echo";
import { ChatItem, Message } from "@/types";
import { useEffect, useRef } from "react";

interface UseChatListenerProps {
  currentUserId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
}

export const useChatListener = ({
  currentUserId,
  setMessages,
  setChats,
}: UseChatListenerProps) => {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!currentUserId) {
      console.warn("⚠️ No currentUserId provided, skipping chat listener.");
      return;
    }

    let echo: any;
    try {
      echo = getEchoInstance();
      console.log("🌟 Echo instance obtained.");
    } catch (error) {
      console.error("❌ Failed to get Echo instance:", error);
      return;
    }

    const pusher = echo.connector.pusher;

    pusher.connection.bind("connected", () => {
      console.log("✅ Pusher connected! Socket ID:", pusher.connection.socket_id);
    });
    pusher.connection.bind("disconnected", () => {
      console.warn("⚠️ Pusher disconnected!");
    });
    pusher.connection.bind("error", (err: any) => {
      console.error("❌ Pusher connection error:", err);
    });

    const channelName = `chat.${currentUserId}`;
    console.log(`🔔 Subscribing to private channel: ${channelName}`);

    const channel = echo.private(channelName);
    channelRef.current = channel;

    channel
      .subscribed(() => {
        console.log(`✅ Subscribed to channel: ${channelName}`);
      })
      .error((error: any) => {
        console.error(`❌ Channel subscription error for ${channelName}:`, error);
        if (error.status === 403) console.error("⚠️ Auth failed - check auth endpoint and token");
        if (error.status === 404) console.error("⚠️ Channel not found");
      });

    channel.listen(".message.sent", (payload: any) => {
      try {
        console.log("💬 Incoming message payload:", payload);

        // Skip messages sent by the current user — already added optimistically
        if (payload.sender_id === currentUserId) {
          console.log("🔄 Skipping own message echo (already in UI via optimistic update)");
          return;
        }

        const newMsg: Message = {
          sender: "them",
          text: payload.message,
          time: new Date(payload.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, newMsg]);
        console.log("📨 Receiver message added to state:", newMsg);

        // Update last message in the chat list
        setChats((prev) =>
          prev.map((chat) =>
            chat.userId === payload.sender_id
              ? {
                  ...chat,
                  lastMsg: payload.message,
                  timeOrDate: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }
              : chat
          )
        );
      } catch (err) {
        console.error("❌ Error processing incoming message:", err, payload);
      }
    });

    return () => {
      console.log(`🧹 Cleaning up chat listener for: ${channelName}`);
      if (channelRef.current) {
        channelRef.current.stopListening(".message.sent");
        echo.leave(channelName);
        channelRef.current = null;
      }
    };
  // Only re-subscribe when the current user changes, NOT on every state update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);
};
