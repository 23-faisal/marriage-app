"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// All imports used as provided
import { getCurrentUser } from "../../../../service/authService/index";
import {
  createLocation,
  getLocationByProfile,
  updateLocation,
} from "../../../../service/LocationService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  present_address: string;
  permanent_address: string;
  city: string;
  address: string;
  nationality: string;
  residence_status: string;
  living_status: string;
}

export default function Step5Page() {
  const router = useRouter();

  // --- NEW STATE: Loading indicator ---
  const [isLoading, setIsLoading] = useState(true); 
  // ------------------------------------

  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    present_address: "",
    permanent_address: "",
    city: "",
    address: "",
    nationality: "",
    residence_status: "",
    living_status: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  useEffect(() => {
  const fetchLocation = async () => {
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

    const location = await getLocationByProfile(profile.id);
    console.log("Fetched location:", location); // <-- debug
    if (location) {
      setFormData({
        present_address: location.present_address || "",
        permanent_address: location.permanent_address || "",
        city: location.city || "",
        address: location.address || "",
        nationality: location.nationality || "",
        residence_status: location.residence_status || "",
        living_status: location.living_status || "",
      });
      setLocationId(location.id);
    }
    
    // Set loading to false after data is fetched/processed
    setIsLoading(false);
  };

  fetchLocation();
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
      if (locationId) {
        response = await updateLocation(locationId, payload);
        console.log("Location updated:", response);
      } else {
        response = await createLocation(payload);
        console.log("Location created:", response);
        if (response?.id) setLocationId(response.id);
      }

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 5, 
        }),
      });

      router.push("/user/profile/step6"); // next step
    } catch (error) {
      console.error("Location submission failed:", error);
    }
  };

  // --- Navigation Handler ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step4");
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
            <span className="opacity-90">Step 5:</span> Location Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Provide details about your current and permanent residences.
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
            <p className="ml-3 text-lg text-gray-600">Loading location data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Address Information</h4>

            {/* Present Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Present Address</label>
              <input
                type="text"
                name="present_address"
                value={formData.present_address}
                onChange={handleChange}
                placeholder="Street, locality, country"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* Permanent Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Permanent Address</label>
              <input
                type="text"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                placeholder="Street, locality, country"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-7 border-b border-gray-100">
                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>

                {/* General Address (Duplication of address field retained from original code) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="General address notes"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>
            </div>

            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Geographic Status</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nationality */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="e.g., Bangladeshi"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  />
                </div>

                {/* Residence Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Residence Status</label>
                  <select
                    name="residence_status"
                    value={formData.residence_status}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="citizen">Citizen</option>
                    <option value="permanent_resident">Permanent Resident</option>
                    <option value="work_permit">Work Permit</option>
                    <option value="student_visa">Student Visa</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Living Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Living Status</label>
                  <select
                    name="living_status"
                    value={formData.living_status}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="renting">Renting</option>
                    <option value="owned">Owned</option>
                    <option value="with_family">With Family</option>
                    <option value="other">Other</option>
                  </select>
                </div>
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