"use client";

import { Card } from "@/components/ui/card";

const TipsCard = () => {
  return (
    <Card className="bg-amber-200 rounded-xl p-4 mx-2 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Tip content inline */}
      <h3 className="font-semibold text-black text-sm md:text-base inline">
        Tips:{" "}
        <span className="font-normal">
          Upgrade to premium to unlock advanced features and get up to <span className="font-bold">50%</span> more matches.
        </span>
      </h3>
    </Card>
  );
};

export default TipsCard;

