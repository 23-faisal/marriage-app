"use client";
import React from "react";
import DetailCard from "./DetailCard";
import { Heart } from "lucide-react";
import { ProfileData } from "@/types";

interface Props { profile: ProfileData; }

const PartnerPreferences: React.FC<Props> = ({ profile }) => (
  <DetailCard icon={<Heart className="text-red-600" size={24} />} title="Partner Preferences" accentColorClass="text-red-600">
    <div>
      Age Range: {profile.partner_preference?.preferred_age_min || "N/A"} - {profile.partner_preference?.preferred_age_max || "N/A"}
    </div>
    <div>Preferred Religion: {profile.partner_preference?.preferred_religion || "N/A"}</div>
    <div>Preferred Education: {profile.partner_preference?.preferred_education || "N/A"}</div>
    <div>Preferred Country: {profile.partner_preference?.preferred_country || "N/A"}</div>
  </DetailCard>
);

export default PartnerPreferences;
