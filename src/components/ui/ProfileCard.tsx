"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookUser, Calendar, Eye, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";



interface Profile {
  id: number;
  user_name: string;
  user_id:number;
  name?: string;
  dob: string;
  gender: string;
  religion: string;
  marital_status: string;
  verified?: boolean;
  photo?: string;
  education?: { id: number; profile_id: number; Heighets_degree?: string; institute_name?: string; graduation_year?: string }[];
  location?: { id: number; profile_id: number; present_address?: string; permanent_address?: string; city?: string; nationality?: string };
  career?: { id: number; profile_id: number; profession?: string; designation?: string; company_name?: string; job_title?: string }[];
}

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const getAge = (dob: string) => {
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  };

  const profession = profile.career?.[0]?.profession || profile.career?.[0]?.job_title || "N/A";
  const education = profile.education?.[0]?.Heighets_degree || profile.education?.[0]?.institute_name || "N/A";
  const locationName = profile.location?.city || profile.location?.present_address || "N/A";

  return (
    <Card className="flex flex-col sm:flex-row w-4xl p-0 bg-white border  border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Avatar */}
      <div className="flex justify-center items-center sm:items-start sm:justify-start w-full sm:w-48 p-4 sm:p-5 relative">
        <div className="relative">
          <img
            src={profile.photo || fallbackImage}
            alt={profile.user_name || `Profile ${profile.id}`}
            className="w-32 h-32 sm:w-32 sm:h-32 rounded-full border-4 border-rose-500 object-cover object-center shadow-md"
          />
          {profile.verified && (
            <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full shadow-md">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <CardContent className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{profile.user_name}</h3>

          {/* Key Info */}
          <div className="flex flex-wrap gap-4 mt-2 text-gray-700 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-rose-500" /> {getAge(profile.dob)} yrs
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-rose-500" /> {profile.marital_status || "N/A"}
            </span>
          </div>

          {/* Career / Education / Location */}
          <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5">
              <BookUser className="h-4 w-4 text-purple-500" /> {profession}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-purple-500" /> {education}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-purple-500" /> {locationName}
            </span>
          </div>
        </div>
      </CardContent>

      <div className="w-1/5 flex p-5">
        <Link href={`/user/view-profile/${profile.user_id}`} className="w-full">
            <Button
            size="sm"
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-200"
            >
            <Eye className="h-4 w-4" /> View Profile
            </Button>
        </Link>
        </div>

    </Card>
  );
}


