"use client";
import { ProfileData } from "@/types";
import { MapPin } from "lucide-react";
import React from "react";
import DetailCard from "./DetailCard";

interface Props { profile: ProfileData; age: string; }

const LocationBackground: React.FC<Props> = ({ profile, age }) => (
  <DetailCard icon={<MapPin className="text-rose-600" size={24} />} title="Location & Background" accentColorClass="text-rose-600">
    <div>Gender: {profile.gender}</div>
    <div>Age: {age} years</div>
    <div>Religion: {profile.religion}</div>
    <div>Marital Status: {profile.marital_status || "N/A"}</div>
    <div>Present Address: {profile.location?.present_address || "N/A"}</div>
    <div>Nationality: {profile.location?.nationality || "N/A"}</div>
  </DetailCard>
);

export default LocationBackground;


// "use client";

// import { ProfileData } from "@/types";
// import { MapPin } from "lucide-react";
// import React, { useState } from "react";
// import DetailCard from "./DetailCard";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// interface Props {
//   profile: ProfileData;
//   age: string;
//   editable?: boolean;
//   onSave?: (updatedData: Partial<ProfileData>) => void;
// }

// const LocationBackground: React.FC<Props> = ({
//   profile,
//   age,
//   editable = false,
//   onSave,
// }) => {
//   // Always initialize with strings to avoid TS errors
//   const [formData, setFormData] = useState({
//     gender: profile.gender || "",
//     religion: profile.religion || "",
//     marital_status: profile.marital_status || "",
//     present_address: profile.location?.present_address || "",
//     nationality: profile.location?.nationality || "",
//   });

//   const handleChange = (key: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSave = () => {
//     if (onSave) {
//       onSave({
//         ...profile,
//         gender: formData.gender,
//         religion: formData.religion,
//         marital_status: formData.marital_status,
//         location: {
//           present_address: formData.present_address,
//           nationality: formData.nationality,
//           city: profile.location?.city ?? "", // empty string fallback
//           residence_status: profile.location?.residence_status ?? "",
//         },
//       });
//     }
//   };

//   return (
//     <DetailCard
//       icon={<MapPin className="text-rose-600" size={24} />}
//       title="Location & Background"
//       accentColorClass="text-rose-600"
//     >
//       {editable ? (
//         <div className="space-y-4">
//           <div>
//             <label className="font-semibold">Gender:</label>
//             <Select
//               value={formData.gender}
//               onValueChange={(value) => handleChange("gender", value)}
//             >
//               <SelectTrigger className="w-full border rounded-md px-3 py-2">
//                 <SelectValue placeholder="Select Gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Male">Male</SelectItem>
//                 <SelectItem value="Female">Female</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="font-semibold">Religion:</label>
//             <Input
//               value={formData.religion}
//               onChange={(e) => handleChange("religion", e.target.value)}
//               placeholder="Enter religion"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Marital Status:</label>
//             <Input
//               value={formData.marital_status}
//               onChange={(e) => handleChange("marital_status", e.target.value)}
//               placeholder="Enter marital status"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Present Address:</label>
//             <Input
//               value={formData.present_address}
//               onChange={(e) => handleChange("present_address", e.target.value)}
//               placeholder="Enter present address"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Nationality:</label>
//             <Input
//               value={formData.nationality}
//               onChange={(e) => handleChange("nationality", e.target.value)}
//               placeholder="Enter nationality"
//             />
//           </div>

//           <Button className="mt-4 bg-rose-600" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </div>
//       ) : (
//         <div className="space-y-1">
//           <div>Gender: {profile.gender}</div>
//           <div>Age: {age} years</div>
//           <div>Religion: {profile.religion}</div>
//           <div>Marital Status: {profile.marital_status || "N/A"}</div>
//           <div>Present Address: {profile.location?.present_address || "N/A"}</div>
//           <div>Nationality: {profile.location?.nationality || "N/A"}</div>
//         </div>
//       )}
//     </DetailCard>
//   );
// };

// export default LocationBackground;
