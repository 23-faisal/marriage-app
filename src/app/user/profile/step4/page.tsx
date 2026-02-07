"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { getCurrentUser } from "../../../../service/authService/index";
import {
  createFamilyDetail,
  getFamilyDetailByProfile,
  updateFamilyDetail,
} from "../../../../service/FamilyDetailService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  brothers_unmarried: number;
  brothers_married: number;
  sisters_unmarried: number;
  sisters_married: number;
  family_details: string;
}

export default function Step4Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------
  
  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    brothers_unmarried: 0,
    brothers_married: 0,
    sisters_unmarried: 0,
    sisters_married: 0,
    family_details: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [familyId, setFamilyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFamily = async () => {
      
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

      const family = await getFamilyDetailByProfile(profile.id);
      if (family) {
        setFormData({
          father_name: family.father_name || "",
          father_occupation: family.father_occupation || "",
          mother_name: family.mother_name || "",
          mother_occupation: family.mother_occupation || "",
          brothers_unmarried: family.brothers_unmarried || 0,
          brothers_married: family.brothers_married || 0,
          sisters_unmarried: family.sisters_unmarried || 0,
          sisters_married: family.sisters_married || 0,
          family_details: family.family_details || "",
        });
        setFamilyId(family.id);
      }
      
      // Set loading to false after data is fetched/processed
      setIsLoading(false);
    };

    fetchFamily();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (familyId) {
        response = await updateFamilyDetail(familyId, payload);
        console.log("Family detail updated:", response);
      } else {
        response = await createFamilyDetail(payload);
        console.log("Family detail created:", response);
        if (response?.id) setFamilyId(response.id);
      }

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 4, 
        }),
      });

      router.push("/user/profile/step5"); // next step
    } catch (error) {
      console.error("Family detail submission failed:", error);
    }
  };

  // --- Navigation Handler ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step3");
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
            <span className="opacity-90">Step 4:</span> Family Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Tell us about your family and siblings.
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
            <p className="ml-3 text-lg text-gray-600">Loading family data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Parents' Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Father's Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Father's Occupation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Occupation</label>
                <input
                  type="text"
                  name="father_occupation"
                  value={formData.father_occupation}
                  onChange={handleChange}
                  placeholder="e.g., Retired, Business Owner"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-7 border-b border-gray-100">
              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                <input
                  type="text"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Mother's Occupation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Occupation</label>
                <input
                  type="text"
                  name="mother_occupation"
                  value={formData.mother_occupation}
                  onChange={handleChange}
                  placeholder="e.g., Homemaker, Teacher"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Siblings Details</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Brothers Unmarried */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Brothers (Unmarried)</label>
                <input
                  type="number"
                  name="brothers_unmarried"
                  value={formData.brothers_unmarried}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Brothers Married */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Brothers (Married)</label>
                <input
                  type="number"
                  name="brothers_married"
                  value={formData.brothers_married}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              
              {/* Sisters Unmarried */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sisters (Unmarried)</label>
                <input
                  type="number"
                  name="sisters_unmarried"
                  value={formData.sisters_unmarried}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Sisters Married */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sisters (Married)</label>
                <input
                  type="number"
                  name="sisters_married"
                  value={formData.sisters_married}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>

            {/* Additional Family Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Family Details</label>
              <textarea
                name="family_details"
                value={formData.family_details}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your family values, background, or social status briefly."
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
              ></textarea>
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