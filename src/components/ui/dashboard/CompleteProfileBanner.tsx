// "use client";

// import { AlertCircle, ArrowRight } from "lucide-react";
// import Link from "next/link";

// const CompleteProfileBanner = () => {
//   const progress = 60; // example value (you can make this dynamic)

//   return (
//     <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 mb-6 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 shadow-lg">
//       {/* Overlay for visual depth */}
//       <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

//       <div className="relative flex flex-col gap-4 md:gap-5 text-white">
//         {/* Header section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* Left Side */}
//           <div className="flex items-center gap-3">
//             <div className="relative bg-amber-300/20 rounded-full p-2.5 flex items-center justify-center shadow-inner">
//               <AlertCircle className="h-6 w-6 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
//             </div>
//             <div>
//               <h3 className="text-xl md:text-xl font-bold leading-tight tracking-wide">
//                 Complete Your Profile
//               </h3>
//               <p className="text-white/85 text-sm md:text-[15px]">
//                 Add your personal details to unlock better recommendations.
//               </p>
//             </div>
//           </div>

//           {/* Right Side Button */}
//           <Link
//             href="/user/profile/step1"
//             className="group flex items-center gap-2 bg-white text-rose-600 px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
//           >
//             <span>Finish Now</span>
//             <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
//           </Link>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full mt-2">
//           <div className="h-2 bg-white/30 rounded-full overflow-hidden">
//             <div
//               className="h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-700 ease-in-out"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="flex justify-end text-xs text-white mt-1 font-bold tracking-wide">
//             {progress}% Completed
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfileBanner;



"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const CompleteProfileBanner = () => {
  const [progress, setProgress] = useState<number>(0);
  const [lastStep, setLastStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileProgress = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch("/api/user/profileProgress", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        
        if (res.ok && data.success) {
          setProgress(data.profile_completion || 0);
          setLastStep(data.last_completed_step);
        } else {
          console.error("Failed to fetch progress:", data.message);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileProgress();
  }, []);

  // Determine the next step dynamically
  const nextStep = lastStep >= 8 ? 8 : lastStep + 1;

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 mb-6 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 shadow-lg">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

      <div className="relative flex flex-col gap-4 md:gap-5 text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div className="relative bg-amber-300/20 rounded-full p-2.5 flex items-center justify-center shadow-inner">
              <AlertCircle className="h-6 w-6 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            </div>
            <div>
              <h3 className="text-xl md:text-xl font-bold leading-tight tracking-wide">
                {progress === 100
                  ? "Profile Completed 🎉"
                  : "Complete Your Profile"}
              </h3>
              <p className="text-white/85 text-sm md:text-[15px]">
                {progress === 100
                  ? "Your profile is fully complete!"
                  : "Add your personal details to unlock better recommendations."}
              </p>
            </div>
          </div>

          {/* Right Side Button */}
          {progress < 100 && (
            <Link
              href={`/user/profile/step${nextStep}`}
              className="group flex items-center gap-2 bg-white text-rose-600 px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
            >
              <span>Finish Now</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-2">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-end text-xs text-white mt-1 font-bold tracking-wide">
            {loading ? "Loading..." : `${progress}% Completed`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileBanner;
