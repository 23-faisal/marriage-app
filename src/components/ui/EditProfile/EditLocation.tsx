"use client";

import { getCurrentUser } from "@/service/authService/index";
import { getLocationByProfile, updateLocation } from "@/service/LocationService";
import { getProfileByUser } from "@/service/ProfileService";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface LocationForm {
  present_address: string;
  permanent_address: string;
  city: string;
  address: string;
  nationality: string;
  residence_status: string;
  living_status: string;
}

export default function EditLocation() {
  const router = useRouter();
  const [formData, setFormData] = useState<LocationForm>({
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
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
      } catch (error) {
        console.error("Failed to fetch location:", error);
        toast.error("Failed to load location data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      let response;
      if (locationId) {
        response = await updateLocation(locationId, payload);
        console.log("Location updated:", response);
      } else {
        response = await fetch("/api/user/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((res) => res.json());
        console.log("Location created:", response);
        if (response?.id) setLocationId(response.id);
      }

      toast.success("Location saved successfully");
    } catch (error) {
      console.error("Failed to save location:", error);
      toast.error("Something went wrong");
    }
  };

  const handlePreviousStep = () => router.back();

  if (isLoading) return <p>Loading location...</p>;

  return (
    <div className="w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            Edit Location
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Update your address and residence details below.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-7">
          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
            Address Information
          </h4>

          {/* Present Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Present Address
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Permanent Address
            </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Dhaka"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* General Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address
              </label>
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

          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
            Geographic Status
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nationality */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nationality
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Residence Status
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Living Status
              </label>
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

          <div className="pt-6 flex justify-between">
            {/* <button
              type="button"
              onClick={handlePreviousStep}
              className="w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-300 transition duration-300 ease-in-out shadow-md shadow-gray-400/30"
            >
              &larr; Previous
            </button> */}

            <button
              type="submit"
              className="w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
