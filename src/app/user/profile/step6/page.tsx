"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { getCurrentUser } from "../../../../service/authService/index";
import {
  createLifestyle,
  getLifestyleByProfile,
  updateLifestyle,
} from "../../../../service/LifestyleService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  diet: string;
  smoking: string;
  drinking: string;
  hobbies: string;
}

export default function Step6Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------

  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    diet: "",
    smoking: "",
    drinking: "",
    hobbies: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [lifestyleId, setLifestyleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLifestyle = async () => {
      const user = await getCurrentUser();
      if (!user?.id) {
        setIsLoading(false);
        return router.push("/login");
      }

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) {
        setIsLoading(false);
        return console.error("Profile not found");
      }

      setProfileId(profile.id);

      const lifestyle = await getLifestyleByProfile(profile.id);
      if (lifestyle) {
        setFormData({
          diet: lifestyle.diet || "",
          smoking: lifestyle.smoking || "",
          drinking: lifestyle.drinking || "",
          hobbies: lifestyle.hobbies || "",
        });
        setLifestyleId(lifestyle.id);
      }
      
      // Set loading to false after data is fetched/processed
      setIsLoading(false);
    };

    fetchLifestyle();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      let response;
      if (lifestyleId) {
        response = await updateLifestyle(lifestyleId, payload);
        console.log("Lifestyle updated:", response);
      } else {
        response = await createLifestyle(payload);
        console.log("Lifestyle created:", response);
        if (response?.id) setLifestyleId(response.id);
      }

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 6, 
        }),
      });

      router.push("/user/profile/step7"); // next step
    } catch (error) {
      console.error("Lifestyle submission failed:", error);
    }
  };
  
  // --- Navigation Handler ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step5");
  };
  // --------------------------

  // --- DESIGN IMPLEMENTATION STARTS HERE ---
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 6:</span> Lifestyle Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Share details about your daily habits and interests.
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
            <p className="ml-3 text-lg text-gray-600">Loading lifestyle data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Habits</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Diet */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Diet</label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                >
                  <option value="">Select</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="halal">Halal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Smoking */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Smoking</label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>

              {/* Drinking */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Drinking</label>
                <select
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Interests</h4>

            {/* Hobbies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hobbies (Separate with commas)</label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="e.g., Reading, traveling, coding, gardening"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
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