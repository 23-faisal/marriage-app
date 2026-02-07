"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { getCurrentUser } from "../../../../service/authService/index";
import { createPreference, getPreferenceByProfile, updatePreference } from "../../../../service/PartnerPreferenceService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  preferred_age_min: number | "";
  preferred_age_max: number | "";
  preferred_height_min: number | "";
  preferred_height_max: number | "";
  preferred_religion: string;
  preferred_caste: string;
  preferred_education: string;
  preferred_country: string;
  preferred_profession: string;
  other_expectations: string;
}

export default function Step7Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------

  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    preferred_age_min: "",
    preferred_age_max: "",
    preferred_height_min: "",
    preferred_height_max: "",
    preferred_religion: "",
    preferred_caste: "",
    preferred_education: "",
    preferred_country: "",
    preferred_profession: "",
    other_expectations: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [preferenceId, setPreferenceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPreference = async () => {
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

      const preference = await getPreferenceByProfile(profile.id);
      if (preference) {
        setFormData({
          preferred_age_min: preference.preferred_age_min || "",
          preferred_age_max: preference.preferred_age_max || "",
          preferred_height_min: preference.preferred_height_min || "",
          preferred_height_max: preference.preferred_height_max || "",
          preferred_religion: preference.preferred_religion || "",
          preferred_caste: preference.preferred_caste || "",
          preferred_education: preference.preferred_education || "",
          preferred_country: preference.preferred_country || "",
          preferred_profession: preference.preferred_profession || "",
          other_expectations: preference.other_expectations || "",
        });
        setPreferenceId(preference.id);
      }
      
      // Set loading to false after data is fetched/processed
      setIsLoading(false);
    };

    fetchPreference();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      if (preferenceId) {
        await updatePreference(preferenceId, payload);
      } else {
        const response = await createPreference(payload);
        if (response?.id) setPreferenceId(response.id);
      }

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 7, 
        }),
      });

      router.push("/user/profile/step8"); // next step
    } catch (error) {
      console.error("Preference submission failed:", error);
    }
  };

  // --- Navigation Handler ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step6");
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
            <span className="opacity-90">Step 7:</span> Partner Preferences
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Define your requirements for a potential partner.
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
            <p className="ml-3 text-lg text-gray-600">Loading preference data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Physical Traits</h4>

            <div className="grid grid-cols-2 gap-6">
              {/* Preferred Age (Min) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Age (Min)</label>
                <input
                  type="number"
                  name="preferred_age_min"
                  value={formData.preferred_age_min}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Preferred Age (Max) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Age (Max)</label>
                <input
                  type="number"
                  name="preferred_age_max"
                  value={formData.preferred_age_max}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pb-7 border-b border-gray-100">
              {/* Preferred Height (Min) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Height (Min, cm/in)</label>
                <input
                  type="number"
                  name="preferred_height_min"
                  value={formData.preferred_height_min}
                  onChange={handleChange}
                  placeholder="e.g., 160"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Preferred Height (Max) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Height (Max, cm/in)</label>
                <input
                  type="number"
                  name="preferred_height_max"
                  value={formData.preferred_height_max}
                  onChange={handleChange}
                  placeholder="e.g., 175"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Background Preferences</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Religion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Religion</label>
                  <input
                    type="text"
                    name="preferred_religion"
                    value={formData.preferred_religion}
                    onChange={handleChange}
                    placeholder="e.g., Islam, Hinduism"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>

                {/* Preferred Caste */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Caste</label>
                  <input
                    type="text"
                    name="preferred_caste"
                    value={formData.preferred_caste}
                    onChange={handleChange}
                    placeholder="e.g., Sunni, Kayastha"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>
                
                {/* Preferred Education */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Education</label>
                  <input
                    type="text"
                    name="preferred_education"
                    value={formData.preferred_education}
                    onChange={handleChange}
                    placeholder="e.g., Masters, BSc"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>

                {/* Preferred Profession */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Profession</label>
                  <input
                    type="text"
                    name="preferred_profession"
                    value={formData.preferred_profession}
                    onChange={handleChange}
                    placeholder="e.g., Doctor, Software Engineer"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>
            </div>

            <div className="pb-7 border-b border-gray-100">
                {/* Preferred Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Country</label>
                  <input
                    type="text"
                    name="preferred_country"
                    value={formData.preferred_country}
                    onChange={handleChange}
                    placeholder="e.g., Bangladesh, USA, Canada"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>
            </div>


            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Additional Expectations</h4>
            
            {/* Other Expectations */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Other Expectations</label>
              <textarea
                name="other_expectations"
                value={formData.other_expectations}
                onChange={handleChange}
                placeholder="Specify any other key expectations or values."
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
                rows={3}
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