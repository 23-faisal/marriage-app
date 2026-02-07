"use client";

import { Search } from "lucide-react"; // Assuming lucide-react is installed

// Re-using the current version's interfaces (with the addition of optional status for design)
interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  timeOrDate: string;
  isActive: boolean;
  userId: number;
  // Adding 'status' back as it was part of the original design's profile image
  status?: "online" | "offline"; 
}

interface ChatListProps {
  chats: ChatItem[];
  onSelect: (chatId: number) => void;
}

// NOTE on Card: Since I don't have access to your specific `Card` component, 
// I'll implement its styling directly on a `div` for the chat list container.
const ChatList = ({ chats, onSelect }: ChatListProps) => {
  if (!chats.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
        You don’t have any chats yet.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 pt-6 pl-6 pr-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-gray-800">
        <Search className="h-5 w-5 text-rose-500" />
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>

      {/* Chat List - Styled as the Card container from the previous design */}
      <div 
        className="p-0 bg-white gap-0 rounded-xl overflow-hidden max-h-[80vh] overflow-y-auto shadow-md"
      >
        {chats.map((chat, index) => (
          <div
            key={chat.id}
            // Use the current version's logic for selection
            onClick={() => onSelect(chat.id)} 
            className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
              ${
                // Use the previous version's active state styling
                chat.isActive
                  ? "bg-[#ffebee] rounded-t-lg" // Background color for active
                  : "hover:bg-gray-50"
              }
              ${index === 0 && chat.isActive ? "rounded-t-xl" : ""}
            `}
            style={
              // Use the previous version's active state border
              chat.isActive
                ? { borderRight: "4px solid #F44369" }
                : {}
            }
          >
            {/* Profile Image + Status */}
            <div className="relative flex-shrink-0">
              <img
                src={chat.image}
                alt={chat.name}
                // Increased size and border as in the previous design
                className="h-11 w-11 rounded-full object-cover border border-gray-100"
                // Re-added the onError handler for the image fallback
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png")
                }
              />
              {/* Re-added the status indicator logic (using optional 'status' prop) */}
              {chat.status === "online" && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
              {chat.status === "offline" && (
                 <div className="absolute bottom-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-white"></div>
              )}
              {/* NOTE: If 'status' is not present in your data, 
                  you might want to remove the status indicator divs entirely. */}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Adjusted typography for name and message */}
              <span className="font-semibold text-gray-800 text-sm truncate block">
                {chat.name}
              </span>
              <span className="text-gray-500 text-xs block truncate max-w-[150px]">
                {chat.lastMsg}
              </span>
            </div>

            {/* Time / Date */}
            <div className="flex-shrink-0 text-right h-full pt-1">
              {/* Adjusted typography for time */}
              <span className="text-xs text-gray-400">
                {chat.timeOrDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;