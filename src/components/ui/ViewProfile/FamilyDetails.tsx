"use client";
import { ProfileData } from "@/types";
import { Users } from "lucide-react";
import React from "react";
import DetailCard from "./DetailCard";

interface Props { profile: ProfileData; }

const FamilyDetails: React.FC<Props> = ({ profile }) => (
  <DetailCard icon={<Users className="text-purple-600" size={24} />} title="Family Details" accentColorClass="text-purple-600">
    <div className="font-extrabold">Parents</div>
    {/* Combining key-value pairs for clean display in DetailCard */}
    <div>Father: {profile.family_detail?.father_name || "N/A"}</div>
    <div>Father Occupation: {profile.family_detail?.father_occupation || "N/A"}</div>
    <div>Mother: {profile.family_detail?.mother_name || "N/A"}</div>
    <div>Mother Occupation: {profile.family_detail?.mother_occupation || "N/A"}</div>

    <div className="pt-3 font-extrabold">Siblings</div>
    <div>Married Brothers: {profile.family_detail?.brothers_married || 0}</div>
    <div>Unmarried Brothers: {profile.family_detail?.brothers_unmarried || 0}</div>
    <div>Married Sisters: {profile.family_detail?.sisters_married || 0}</div>
    <div>Unmarried Sisters: {profile.family_detail?.sisters_unmarried || 0}</div>
  </DetailCard>
);

export default FamilyDetails;