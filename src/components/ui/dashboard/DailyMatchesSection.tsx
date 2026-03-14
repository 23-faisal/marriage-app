"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookUser, Calendar, Eye, GraduationCap, MapPin, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface Match {
  id: number;
  user_id: number;
  user_name: string;
  dob: string;
  gender: string;
  religion: string;
  marital_status: string;
  photo?: string;
  education?: { Heighets_degree?: string; institute_name?: string }[];
  career?: { profession?: string; job_title?: string }[];
  location?: { city?: string; present_address?: string };
}

const fallbackImage = "/default-avatar.svg";

const getAge = (dob: string) => {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
};

const DailyMatchesSection = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const userData = localStorage.getItem("userData");
        const user = userData ? JSON.parse(userData) : null;
        const userId = user?.id;
        const userGender = user?.gender;

        const oppositeGender = userGender === "male" ? "female" : userGender === "female" ? "male" : "female";

        // Fetch user's profile to get religion & marital_status (required by search API)
        let religion = "islam";
        let maritalStatus = "UnMarried";

        if (userId) {
          const profileRes = await fetch(`/api/user/profile?user_id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const profile = profileData.data;
            if (profile?.religion) religion = profile.religion;
            if (profile?.marital_status) maritalStatus = profile.marital_status;
          }
        }

        const res = await fetch("/api/user/search", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            gender: oppositeGender,
            age_from: 18,
            age_to: 50,
            religion,
            marital_status: maritalStatus,
          }),
        });

        const data = await res.json();
        if (data.success) {
          const list = Array.isArray(data.data?.data) ? data.data.data : [];
          const shuffled = list.sort(() => Math.random() - 0.5).slice(0, 3);
          setMatches(shuffled);
        }
      } catch (err) {
        console.error("Failed to fetch daily matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
        <Zap className="h-6 w-6 text-amber-500" />
        Your Daily Match Picks
      </h2>

      <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No matches found. Try updating your profile.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <div
                key={match.id}
                className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-40 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={match.photo?.trim() ? match.photo : fallbackImage}
                    alt={match.user_name || `Profile ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                    <h3 className="text-lg font-bold leading-tight drop-shadow-md truncate">
                      {match.user_name}
                    </h3>
                    <p className="text-xs text-gray-200 drop-shadow-sm">{match.religion}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-md">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-gray-700 font-medium">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      {getAge(match.dob)} yrs
                    </span>
                    <span className="flex items-center gap-2 truncate">
                      <GraduationCap className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      {match.education?.[0]?.Heighets_degree || match.education?.[0]?.institute_name || "N/A"}
                    </span>
                    <span className="col-span-2 flex items-center gap-2 truncate">
                      <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      {match.location?.city || match.location?.present_address || "N/A"}
                    </span>
                    <span className="col-span-2 flex items-center gap-2 truncate">
                      <BookUser className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      {match.career?.[0]?.profession || match.career?.[0]?.job_title || "N/A"}
                    </span>
                  </div>
                </div>

                {/* View Profile Button */}
                <Link href={`/user/view-profile/${match.user_id}`} className="block p-4 pt-0">
                  <Button
                    size="lg"
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-base text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Eye className="h-5 w-5" /> View Profile
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <a
            href="/user/search"
            className="text-base font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-2 transition-colors"
          >
            Explore All Matches
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default DailyMatchesSection;
