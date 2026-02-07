"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { getCurrentUser } from "../../../../service/authService/index";
import { createCareer, getCareerByProfile, updateCareer } from "../../../../service/CareerService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  profession: string;
  job_title: string;
  company: string;
  annual_income: number;
}

export default function Step3Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------
  
  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    profession: "",
    job_title: "",
    company: "",
    annual_income: 0,
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [careerId, setCareerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCareer = async () => {
      
      const user = await getCurrentUser();
      if (!user?.id) {
        setIsLoading(false); // Stop loading if user isn't found
        return router.push("/login");
      }

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) {
        setIsLoading(false); // Stop loading if profile isn't found
        return console.error("Profile not found");
      }

      setProfileId(profile.id);

      const career = await getCareerByProfile(profile.id);
      if (career) {
        setFormData({
          profession: career.profession,
          job_title: career.job_title,
          company: career.company,
          annual_income: career.annual_income,
        });
        setCareerId(career.id);
      }
      
      // Set loading to false after data is fetched/processed
      setIsLoading(false);
    };

    fetchCareer();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      let response;
      if (careerId) {
        response = await updateCareer(careerId, payload);
        console.log("Career updated:", response);
      } else {
        response = await createCareer(payload);
        console.log("Career created:", response);
        if (response?.id) setCareerId(response.id);
      }

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 3, 
        }),
      });

      router.push("/user/profile/step4"); // next step
    } catch (error) {
      console.error("Career submission failed:", error);
    }
  };
  
  // --- NEW: Previous Step Handler ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step2");
  };
  // -----------------------------------

  // --- DESIGN IMPLEMENTATION STARTS HERE ---
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 3:</span> Career Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Provide details about your profession and financial standing.
          </p>
        </div>
        
        {/* CONDITIONAL RENDERING: Loading Spinner or Form */}
        {isLoading ? (
          // Spinner centered in the card body area
          <div className="flex justify-center items-center p-20 min-h-[300px]">
            <svg className="animate-spin h-10 w-10 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-3 text-lg text-gray-600">Loading career data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Employment Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profession */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer, Doctor, Teacher"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  required
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Developer, GP"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  required
                />
              </div>
            </div>
            
            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company / Organization</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google, City Hospital"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                required
              />
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Income (e.g., in BDT)</label>
              <input
                type="number"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                placeholder="e.g., 50,000"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                required
              />
            </div>

            {/* SUBMIT BUTTONS (Justify Between) */}
            <div className="pt-6 flex justify-between">
              
              {/* Previous Step Button */}
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-gray-300 transition duration-300 ease-in-out shadow-md shadow-gray-400/30"
              >
                &larr; Previous Step
              </button>
              
              {/* Save & Continue Button */}
              <button
                type="submit"
                className="w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Continue &rarr;
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}