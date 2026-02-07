"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfilePictures } from "@/service/ProfilePictureService"; 
import {
  Bell,
  CircleDot,
  Image,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Message {
  sender: "me" | "them";
  text: string;
  time: string;
  tempId?: string;
  failed?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  activeUser: {
    name: string;
    image: string;
    id: number;
  };
  currentUserId: number;
  onSendMessage: (text: string) => void;
}

const ChatWindow = ({
  messages,
  activeUser,
  currentUserId,
  onSendMessage,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [currentUserImage, setCurrentUserImage] = useState<string | null>(null);

  // Auto-scroll whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch current user's profile picture on component mount
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const result = await getProfilePictures(); // Use your existing service
        
        if (result?.success && result.data && result.data.length > 0) {
          // Find the primary picture or use the first one
          const primaryPic = result.data.find((pic: any) => pic.is_primary);
          const profilePic = primaryPic || result.data[0];
          setCurrentUserImage(profilePic.url);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  const [inputText, setInputText] = useState("");
  const myBubbleColor = "bg-[#4CAF50]";
  const theirBubbleColor = "bg-[#9C274B]";
  const messageTextColor = "text-white";
  
  // Use fetched profile picture or fallback
  const myAvatar = currentUserImage || "https://i.pravatar.cc/100?img=11";

  const handleSend = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    onSendMessage(trimmedText);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="hidden lg:flex p-4 border-b border-gray-100 items-center justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={activeUser.image}
            alt={activeUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{activeUser.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CircleDot className="h-2 w-2 fill-green-500 text-green-500" />
              Online
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="rounded-md h-8 w-8 p-0 text-gray-400 hover:bg-gray-200"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-gray-100 p-4 lg:p-6 space-y-4"
        style={{ minHeight: 0 }}
      >
        <div className="flex justify-center text-xs text-gray-400">
          Today
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "them" && (
              <img
                src={activeUser.image}
                alt={activeUser.name}
                className="h-7 w-7 rounded-full object-cover mr-2 flex-shrink-0"
              />
            )}

            <div
              className={`px-4 py-2 max-w-xs lg:max-w-sm text-sm leading-relaxed shadow-sm ${
                msg.sender === "me"
                  ? `${myBubbleColor} ${messageTextColor} rounded-t-lg rounded-bl-lg`
                  : `${theirBubbleColor} ${messageTextColor} rounded-t-lg rounded-br-lg`
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 ${
                  msg.sender === "me" ? "text-white/80 text-right" : "text-white/70 text-left"
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === "me" && (
              <img
                src={myAvatar}
                alt="You"
                className="h-7 w-7 rounded-full object-cover ml-2 flex-shrink-0"
              />
            )}
          </div>
        ))}

        <div className="flex justify-center text-xs text-gray-400 pt-2">
          End of conversation
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-rose-400 transition-all">
          <Smile className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500 flex-shrink-0" />
          <Paperclip className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500 flex-shrink-0" />
          <Input
            placeholder="Type a message..."
            className="flex-1 border-none focus-visible:ring-0 text-sm px-2 min-w-0"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
            <Image className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
          </div>
          <Button
            onClick={handleSend}
            className="bg-rose-500 hover:bg-rose-600 text-white h-9 w-9 lg:h-10 lg:w-10 rounded-md flex items-center justify-center shadow-md transition flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;