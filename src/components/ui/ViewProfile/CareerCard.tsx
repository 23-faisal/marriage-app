"use client";
import { ProfileData } from "@/types";
import { Briefcase } from "lucide-react";
import React from "react";
import DetailCard from "./DetailCard";

interface Props { profile: ProfileData; }

const CareerCard: React.FC<Props> = ({ profile }) => (
    <DetailCard icon={<Briefcase className="text-teal-600" size={24} />} title="Career & Income" accentColorClass="text-teal-600">
      <div>Profession: {profile.career?.profession || "N/A"}</div>
      <div>Job Title: {profile.career?.job_title || "N/A"}</div>
      <div>Company: {profile.career?.company || "N/A"}</div>
      <div>Annual Income: BDT {profile.career?.annual_income || "N/A"}</div>
    </DetailCard>
);

export default CareerCard;