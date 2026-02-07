"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatModalProps {
  onClose: () => void;
  receiverId: number; // only receiver id is required now
}

export default function ChatModal({ onClose, receiverId }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/user/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: receiverId,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Send message failed:", text);
        return;
      }

      setMessage("");
      router.refresh(); // refresh chat list if needed
      onClose();
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6 relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">Send a Message</h2>

        <textarea
          className="w-full border rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}
