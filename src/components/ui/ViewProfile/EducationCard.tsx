"use client";
import React from "react";
import DetailCard from "./DetailCard";
import { BookOpen } from "lucide-react";
import { ProfileData } from "@/types";

interface Props { profile: ProfileData; }

const EducationCard: React.FC<Props> = ({ profile }) => (
    <DetailCard icon={<BookOpen className="text-blue-600" size={24} />} title="Education" accentColorClass="text-blue-600">
      {/* Note: Assuming 'highest_degree' is used on the client-side for consistency, 
          but using 'Heighets_degree' as per your provided component code if refactoring 
          was not yet complete in types/util. */}
      <div>Highest Degree: {profile.education?.Heighets_degree || "N/A"}</div> 
      <div>Institute: {profile.education?.institute_name || "N/A"}</div>
      <div>Graduation Year: {profile.education?.graduation_year || "N/A"}</div>
    </DetailCard>
);

export default EducationCard;