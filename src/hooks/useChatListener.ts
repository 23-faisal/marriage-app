"use client";

import { getEchoInstance } from "@/lib/echo";
import { ChatItem, Message } from "@/types";
import { useEffect, useRef } from "react";

interface UseChatListenerProps {
  currentUserId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  pendingMessages?: Set<string>;
  setPendingMessages?: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const useChatListener = ({
  currentUserId,
  setMessages,
  setChats,
  pendingMessages = new Set(),
  setPendingMessages
}: UseChatListenerProps) => {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!currentUserId) {
      console.warn("⚠️ No currentUserId provided, skipping chat listener.");
      return;
    }

    let echo;
    try {
      echo = getEchoInstance();
      console.log("🌟 Echo instance created successfully.");
    } catch (error) {
      console.error("❌ Failed to get Echo instance:", error);
      return;
    }

    const pusher = echo.connector.pusher;

    // --- Global Pusher / connection events ---
    pusher.connection.bind("connected", () => {
      console.log("✅ Pusher connected! Socket ID:", pusher.connection.socket_id);
    });

    pusher.connection.bind("disconnected", () => {
      console.warn("⚠️ Pusher disconnected!");
    });

    pusher.connection.bind("error", (err: any) => {
      console.error("❌ Pusher connection error:", err);
    });

    pusher.connection.bind("state_change", (states: any) => {
      console.log("🔄 Connection state changed:", states);
    });

    const channelName = `chat.${currentUserId}`;
    console.log(`🔔 Attempting to subscribe to private channel: ${channelName}`);

    // Subscribe to channel
    const channel = echo.private(channelName);
    channelRef.current = channel;

    // Channel subscription events
    channel.subscribed(() => {
      console.log(`✅ Successfully subscribed to channel: ${channelName}`);
    }).error((error: any) => {
      console.error(`❌ Channel subscription error for ${channelName}:`, error);
      if (error.status === 403) console.error("⚠️ Auth failed - check auth endpoint");
      if (error.status === 404) console.error("⚠️ Channel not found - check channel name");
    });

    // Global event logger for this channel
    if (channel.bind_global) {
      channel.bind_global((event: string, payload: any) => {
        console.log(`🌐 [Global event] ${event}:`, payload);
      });
    }

    // Message listener
    channel.listen(".message.sent", (payload: any) => {
      try {
        console.log("💬 Incoming message:", payload);

        const messageId = payload.id?.toString();
        const messageText = payload.message;

        // Duplicate check
        const isDuplicate = Array.from(pendingMessages).some(tempId => {
          const isSameContent = messageText === payload.message;
          const isRecent = Math.abs(Date.now() - parseInt(tempId.split('-')[0])) < 5000;
          return isSameContent && isRecent;
        });

        if (isDuplicate) {
          console.log("🔄 Skipping duplicate message");
          if (setPendingMessages) {
            setPendingMessages(prev => {
              const newSet = new Set(prev);
              Array.from(prev).forEach(tempId => {
                if (Math.abs(Date.now() - parseInt(tempId.split('-')[0])) < 5000) {
                  newSet.delete(tempId);
                }
              });
              return newSet;
            });
          }
          return;
        }

        const newMsg: Message = {
          sender: payload.sender_id === currentUserId ? "me" : "them",
          text: payload.message,
          time: new Date(payload.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages(prev => [...prev, newMsg]);
        console.log("📨 Message added to state:", newMsg);

        setChats(prev =>
          prev.map(chat =>
            chat.userId === payload.sender_id || chat.userId === payload.receiver_id
              ? { ...chat, lastMsg: payload.message, updated_at: new Date().toISOString() }
              : chat
          )
        );

      } catch (err) {
        console.error("❌ Error processing incoming message:", err, payload);
      }
    });

    return () => {
      console.log(`🧹 Cleaning up chat listener for channel: ${channelName}`);
      if (channelRef.current) {
        channelRef.current.stopListening(".message.sent");
        echo.leave(channelName);
      }
    };
  }, [currentUserId, setMessages, setChats, pendingMessages, setPendingMessages]);
};
