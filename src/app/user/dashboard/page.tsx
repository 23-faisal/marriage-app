"use client";

import CompleteProfileBanner from "@/components/ui/dashboard/CompleteProfileBanner";
import DailyMatchesSection from "@/components/ui/dashboard/DailyMatchesSection";
import MyShortlistedCard from "@/components/ui/dashboard/MyShortlistedCard";
import SearchProfileForm from "@/components/ui/dashboard/SearchProfileForm";
import TipsCard from "@/components/ui/dashboard/TipCard";
import WhoViewedProfileCard from "@/components/ui/dashboard/WhoViewedProfileCard";


const DashboardPage = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <CompleteProfileBanner />
          <SearchProfileForm />
          <DailyMatchesSection />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <TipsCard />
          <WhoViewedProfileCard />
          <MyShortlistedCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
