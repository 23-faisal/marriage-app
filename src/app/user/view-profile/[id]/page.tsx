"use client";

import { Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";

import CareerCard from "@/components/ui/ViewProfile/CareerCard";
import EducationCard from "@/components/ui/ViewProfile/EducationCard";
import FamilyDetails from "@/components/ui/ViewProfile/FamilyDetails";
import Lifestyle from "@/components/ui/ViewProfile/Lifestyle";
import LocationBackground from "@/components/ui/ViewProfile/LocationBackground";
import PartnerPreferences from "@/components/ui/ViewProfile/PartnerPreferences";
import ProfileHeader from "@/components/ui/ViewProfile/ProfileHeader";
import { ProfileData } from "@/types";
import { calculateAge, getUserProfile } from "@/utils/profileUtils";

export default function ViewProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap params using React.use()
  const { id: profileId } = use(params);
  console.log("Viewing profile ID:", profileId);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const data = await getUserProfile(profileId);
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [profileId]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-20 min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-rose-600" />
      </div>
    );

  if (!profile)
    return (
      <div className="p-10 text-center text-xl font-bold">
        Profile Not Found
      </div>
    );


  
  const age = calculateAge(profile.dob);
  const primaryPhotoUrl =
    profile.photos?.find((p) => p.is_primary)?.url ||
    profile.photos?.[0]?.url ||
    "";


  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      {/* <ProfileHeader profile={profile} primaryPhotoUrl={primaryPhotoUrl} age={age} /> */}
      <ProfileHeader 
          profile={profile} 
          primaryPhotoUrl={primaryPhotoUrl} 
          age={age} 
          phoneNumber={profile.user?.phone_number}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="space-y-8 lg:order-1 order-2">
          <LocationBackground profile={profile} age={age} />
          <Lifestyle profile={profile} />
        </div>

        <div className="lg:col-span-2 space-y-8 lg:order-2 order-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CareerCard profile={profile} />
            <EducationCard profile={profile} />
          </div>
          <FamilyDetails profile={profile} />
          <PartnerPreferences profile={profile} />
        </div>
      </div>
    </div>
  );
}
