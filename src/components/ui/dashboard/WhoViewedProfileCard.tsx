"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Users } from "lucide-react";

const WhoViewedProfileCard = () => {
  return (
    <div className="space-y-2">
      {/* Section Title (outside card) */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <Eye className="h-6 w-6 text-rose-500" />
          Profile View
        </h2>
      </div>

      {/* Card Content */}
      <Card className="relative overflow-hidden rounded-lg border border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 w-[95%] mx-auto">
        <div className="p-4 flex flex-col items-center text-center">
          {/* Stats */}
          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mb-1">
            17
          </div>
          <p className="text-gray-500 text-xs font-medium mb-3">
            New profile viewers this week
          </p>

          {/* Avatars */}
          <div className="flex items-center justify-center -space-x-2 mb-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-white shadow-sm bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-semibold text-xs"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border border-white bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-semibold shadow-inner">
              +14
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className="w-full py-1.5 text-sm bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 font-medium"
          >
            <Users className="h-4 w-4" />
            <span>View All</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WhoViewedProfileCard;
