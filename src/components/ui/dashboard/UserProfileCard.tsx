"use client";
import { Crown, ArrowRight } from "lucide-react";

interface UserProfileCardProps {
  userName?: string;
  isPremium?: boolean;
}

const UserProfileCard = ({ userName = "User", isPremium = false }: UserProfileCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-3 ring-4 ring-white shadow-lg">
          {userName.charAt(0).toUpperCase()}
        </div>
        
        {/* User Name and Status */}
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            online
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>FREE Member</span>
            <span className="text-rose-500 font-semibold">Premium Member</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>

        {!isPremium && (
          <>
            <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all mb-2 flex items-center justify-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>Upgrade to Premium</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;

