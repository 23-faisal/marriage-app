// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// // Assuming you renamed the final horizontal card to a clearer name
// import ProfileCard from "@/components/ui/ProfileCard";

// interface Profile {
//   id: number;
//   user_name: string;
//   user_id:number;
//   name?: string;
//   dob: string;
//   gender: string;
//   religion: string;
//   marital_status: string;
//   verified?: boolean;
//   photo?: string;
//   education?: { id: number; profile_id: number; Heighets_degree?: string; institute_name?: string; graduation_year?: string }[];
//   location?: { id: number; profile_id: number; present_address?: string; permanent_address?: string; city?: string; nationality?: string };
//   career?: { id: number; profile_id: number; profession?: string; designation?: string; company_name?: string; job_title?: string }[];
// }

// // ... (fetchProfiles logic remains the same) ...

// export default function SearchResults() {
//   const searchParams = useSearchParams();
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       const params = {
//         gender: searchParams.get("gender") || "",
//         age_from: Number(searchParams.get("age_from") || 18),
//         age_to: Number(searchParams.get("age_to") || 40),
//         religion: searchParams.get("religion") || "",
//         marital_status: searchParams.get("marital_status") || "",
//       };

//       const token = localStorage.getItem("accessToken") || "";

//       try {
//         const res = await fetch("/api/user/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(params),
//         });

//         const data = await res.json();
//         if (res.ok && data.success) {
//           const profileList = Array.isArray(data.data?.data) ? data.data.data : [];
//           setProfiles(profileList);
//         } else {
//           setProfiles([]);
//           setError(data.message || "No profiles found");
//         }
//       } catch (err) {
//         console.error(err);
//         setProfiles([]);
//         setError("Failed to fetch profiles");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [searchParams]);

//   if (loading)
//     return (
//       <div className="flex justify-center p-12">
//           <p className="text-center text-gray-500 font-semibold text-lg">
//             Loading profiles...
//           </p>
//       </div>
//     );

//   if (error || profiles.length === 0)
//     return (
//       <div className="flex justify-center p-12">
//           <p className="text-center text-red-500 font-semibold text-lg">
//             {error || "No matching profiles found. Try broadening your search criteria."}
//           </p>
//       </div>
//     );

//   return (
//     // Outer container: Added `min-h-screen` and adjusted padding
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Showing {profiles.length} Matched Profiles
//       </h2>
      
//       {/* List Container: Uses a flex column with a fixed gap between cards */}
//       <div className="flex flex-col gap-5">
//         {profiles.map((profile) => (
//           // Use the final horizontal card component
//           <ProfileCard 
//             key={profile.id} 
//             profile={profile} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



// "use client";

// import ProfileCard from "@/components/ui/ProfileCard";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Profile {
//   id: number;
//   user_name: string;
//   user_id: number;
//   name?: string;
//   dob: string;
//   gender: string;
//   religion: string;
//   marital_status: string;
//   verified?: boolean;
//   photo?: string;
//   education?: { id: number; profile_id: number; Heighets_degree?: string; institute_name?: string; graduation_year?: string }[];
//   location?: { id: number; profile_id: number; present_address?: string; permanent_address?: string; city?: string; nationality?: string };
//   career?: { id: number; profile_id: number; profession?: string; designation?: string; company_name?: string; job_title?: string }[];
// }

// export default function SearchResults() {
//   const searchParams = useSearchParams();
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       const params = {
//         gender: searchParams.get("gender") || "",
//         age_from: Number(searchParams.get("age_from") || 18),
//         age_to: Number(searchParams.get("age_to") || 40),
//         religion: searchParams.get("religion") || "",
//         marital_status: searchParams.get("marital_status") || "",
//       };

//       const token = localStorage.getItem("accessToken") || "";

//       try {
//         const res = await fetch("/api/user/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(params),
//         });

//         const data = await res.json();
//         if (res.ok && data.success) {
//           const profileList = Array.isArray(data.data?.data) ? data.data.data : [];
//           setProfiles(profileList);
//         } else {
//           setProfiles([]);
//           setError(data.message || "No profiles found");
//         }
//       } catch (err) {
//         console.error(err);
//         setProfiles([]);
//         setError("Failed to fetch profiles");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [searchParams]);

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      
//       {/* Loading Spinner */}
//       {loading && (
//         <div className="flex flex-col items-center justify-center min-h-[300px]">
//           <svg
//             className="animate-spin h-12 w-12 text-rose-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           <p className="mt-3 text-gray-600 text-lg font-medium">Loading profiles...</p>
//         </div>
//       )}

//       {/* Error or No Profiles Found */}
//       {!loading && (error || profiles.length === 0) && (
//         <div className="flex justify-center">
//           <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 text-center max-w-md">
//             <h3 className="text-xl font-bold text-gray-700 mb-2">
//               {error ? "Oops!" : "No Profiles Found"}
//             </h3>
//             <p className="text-gray-500 mb-4">
//               {error || "No profiles match your search criteria. Try broadening your search."}
//             </p>
//             <svg
//               className="mx-auto h-16 w-16 text-rose-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M12 21a9 9 0 100-18 9 9 0 000 18z"
//               />
//             </svg>
//           </div>
//         </div>
//       )}

//       {/* Profiles List */}
//       {!loading && profiles.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Showing {profiles.length} Matched Profiles
//           </h2>
//           <div className="flex flex-col gap-5">
//             {profiles.map((profile) => (
//               <ProfileCard key={profile.id} profile={profile} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



"use client";

import ProfileCard from "@/components/ui/ProfileCard";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Profile {
  id: number;
  user_name: string;
  user_id: number;
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

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError("");

      const params = {
        gender: searchParams.get("gender") || "",
        age_from: Number(searchParams.get("age_from") || 18),
        age_to: Number(searchParams.get("age_to") || 40),
        religion: searchParams.get("religion") || "",
        marital_status: searchParams.get("marital_status") || "",
      };

      const token = localStorage.getItem("accessToken") || "";

      try {
        const res = await fetch("/api/user/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const profileList = Array.isArray(data.data?.data) ? data.data.data : [];
          setProfiles(profileList);
        } else {
          setProfiles([]);
          setError(data.message || "No profiles found");
        }
      } catch (err) {
        console.error(err);
        setProfiles([]);
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchParams]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <svg
            className="animate-spin h-12 w-12 text-rose-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
            />
          </svg>
          <p className="mt-3 text-gray-600 text-lg font-medium">Loading profiles...</p>
        </div>
      )}

      {/* Error or No Profiles Found */}
      {!loading && (error || profiles.length === 0) && (
        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 text-center max-w-md">
            <h3 className="text-xl font-bold text-gray-700 mb-2">{error ? "Oops!" : "No Profiles Found"}</h3>
            <p className="text-gray-500 mb-4">
              {error || "No profiles match your search criteria. Try broadening your search."}
            </p>
            <svg
              className="mx-auto h-16 w-16 text-rose-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5M12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
          </div>
        </div>
      )}

      {/* Profiles List */}
      {!loading && profiles.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Showing {profiles.length} Matched Profiles
          </h2>
          <div className="flex flex-col gap-5">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-gray-500">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
