"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { Loader2 } from "lucide-react"; // Imported for the loading spinner
import { createProfileStep1, getProfileByUser, updateProfileStep1 } from "../../../../service/ProfileService";
import { getCurrentUser } from "../../../../service/authService/index";

interface FormData {
  gender: string;
  dob: string;
  marital_status: string;
  height_feet: string;
  weight_kg: string;
  blood_group: string;
  mother_tongue: string;
  religion: string;
  caste: string;
  sub_caste: string;
  bio: string;
}

export default function Step1Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------

  const [formData, setFormData] = useState<FormData>({
    gender: "",
    dob: "",
    marital_status: "",
    height_feet: "",
    weight_kg: "",
    blood_group: "",
    mother_tongue: "",
    religion: "",
    caste: "",
    sub_caste: "",
    bio: "",
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getCurrentUser();
      if (!user?.id) {
        setIsLoading(false);
        return router.push("/login");
      }

      setUserId(user.id);

      const profile = await getProfileByUser(user.id);
      if (profile) {
        setFormData({
          gender: profile.gender || "",
          dob: profile.dob || "",
          marital_status: profile.marital_status || "",
          height_feet: profile.height_feet?.toString() || "",
          weight_kg: profile.weight_kg?.toString() || "",
          blood_group: profile.blood_group || "",
          mother_tongue: profile.mother_tongue || "",
          religion: profile.religion || "",
          caste: profile.caste || "",
          sub_caste: profile.sub_caste || "",
          bio: profile.bio || "",
        });
        setProfileId(profile.id);
      }
      
      // Set loading to false after data is fetched/processed
      setIsLoading(false);
    };

    fetchProfile();
  }, [router]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) return;

    try {
      let response;
      if (profileId) {
        response = await updateProfileStep1(profileId, { ...formData, user_id: userId });
      } else {
        response = await createProfileStep1({ ...formData, user_id: userId });
        if (response?.id) setProfileId(response.id);
      }
      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 1, 
        }),
      });

      if (response) router.push("/user/profile/step2");
    } catch (error) {
      console.error("Profile submission failed:", error);
    }
  };
  
  // --- Navigation Handler: Back Button ---
  const handleBack = () => {
    router.push("/user/dashboard");
  };
  // ------------------------------------------

  // --- DESIGN IMPLEMENTATION STARTS HERE ---
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 1:</span> Basic Profile Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Start building your profile—these details are key for matchmaking.
          </p>
        </div>

        {/* CONDITIONAL RENDERING: Loading Spinner or Form */}
        {isLoading ? (
          // Spinner centered in the card body area
          <div className="flex justify-center items-center p-20 min-h-[300px]">
            <Loader2 className="animate-spin h-10 w-10 text-rose-600" size={32} />
            <p className="ml-3 text-lg text-gray-600">Loading profile data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            {/* Section 1: Core Identity (Gender & DOB) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-7">
              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none bg-white"
                  required
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                />
              </div>
            </div>


            {/* Section 2: Physical & Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-7">
              {/* Marital Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Marital Status</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none bg-white"
                >
                  <option value="" disabled>Select</option>
                  <option value="UnMarried">UnMarried</option>
                  <option value="divorced">Divorced</option>
                  <option value="widow">Widow</option>
                  <option value="separated">Separated</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Height (in feet)</label>
                <input
                  type="number"
                  name="height_feet"
                  value={formData.height_feet}
                  onChange={handleChange}
                  placeholder="e.g., 5.5 (for 5 feet 6 inches)"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  placeholder="e.g., 65"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>
            
            {/* Section 3: Background & Origin (Mother Tongue & Religion now dropdowns) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-7">
              {/* Mother Tongue (NOW DROPDOWN) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mother Tongue</label>
                <select
                  name="mother_tongue"
                  value={formData.mother_tongue}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none bg-white"
                >
                  <option value="" disabled>Select Tongue</option>
                  <option value="bengali">Bengali</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="urdu">Urdu</option>
                  <option value="tamil">Tamil</option>
                  <option value="punjabi">Punjabi</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Religion (NOW DROPDOWN) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none bg-white"
                >
                  <option value="" disabled>Select Religion</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="christianity">Christianity</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="sikhism">Sikhism</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Caste */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Caste</label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              
              {/* Sub-Caste */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sub-Caste</label>
                <input
                  type="text"
                  name="sub_caste"
                  value={formData.sub_caste}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>
            
            {/* Section 4: Bio & Blood Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blood Group */}
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group</label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none bg-white"
                >
                  <option value="" disabled>Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              
              {/* Bio (takes up 2 columns) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
                  placeholder="Tell us something about yourself, your hobbies, and what you are looking for in a partner (max 500 characters)..."
                />
              </div>
            </div>


            {/* SUBMIT BUTTONS (Justify Between) */}
            <div className="pt-6 flex justify-between gap-4">
              
              {/* Back Button (Previous Step Logic) */}
              <button
                type="button" 
                onClick={handleBack}
                className="w-full sm:w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-gray-300 transition duration-300 ease-in-out shadow-md shadow-gray-400/30"
              >
                &larr; Back to Dashboard
              </button>
              
              {/* Save & Continue Button */}
              <button
                type="submit"
                className="w-full sm:w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg 
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