"use client";
import React from "react";
import DetailCard from "./DetailCard";
import { Coffee } from "lucide-react";
import { ProfileData } from "@/types";

interface Props { profile: ProfileData; }

const Lifestyle: React.FC<Props> = ({ profile }) => (
  <DetailCard icon={<Coffee className="text-amber-600" size={24} />} title="Lifestyle" accentColorClass="text-amber-600">
    <div>Diet: {profile.lifestyle?.diet || "N/A"}</div>
    <div>Smoking: {profile.lifestyle?.smoking || "N/A"}</div>
    <div>Drinking: {profile.lifestyle?.drinking || "N/A"}</div>
    <div>
      <strong>Hobbies:</strong> {profile.lifestyle?.hobbies || "N/A"}
    </div>
  </DetailCard>
);

export default Lifestyle;
