"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, ChangeEvent } from "react";
import { toast } from "sonner";

interface PartnerPreferenceForm {
  id?: number;
  preferred_age_min?: number;
  preferred_age_max?: number;
  preferred_height_min?: number;
  preferred_height_max?: number;
  preferred_religion?: string;
  preferred_caste?: string;
  preferred_education?: string;
  preferred_profession?: string;
  preferred_country?: string;
  other_expectations?: string;
  [key: string]: any;
}

export default function EditPartnerPreference() {
  const [formData, setFormData] = useState<PartnerPreferenceForm>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch("/api/user/partner-preferences"); // proxy route
        const data = await res.json();

        if (res.ok && data) {
          setFormData(data); // single object as per your API response
        }
      } catch (error) {
        console.error("Fetch partner preferences error:", error);
        toast.error("Failed to load partner preferences");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/partner-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) toast.success("Partner preferences updated successfully");
      else toast.error(data.message || "Update failed");
    } catch (error) {
      console.error("Update partner preferences error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">Partner Preferences</h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Specify the preferences for your potential partner.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-20 min-h-[300px]">
            <svg
              className="animate-spin h-10 w-10 text-rose-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="ml-3 text-lg text-gray-600">Loading partner preferences...</p>
          </div>
        ) : (
          <form className="p-6 sm:p-8 space-y-7">
            {/* Physical Traits */}
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
              Physical Traits
            </h4>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Age (Min)
                </label>
                <Input
                  type="number"
                  name="preferred_age_min"
                  value={formData.preferred_age_min || ""}
                  onChange={handleChange}
                  placeholder="e.g., 20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Age (Max)
                </label>
                <Input
                  type="number"
                  name="preferred_age_max"
                  value={formData.preferred_age_max || ""}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Height (Min)
                </label>
                <Input
                  type="number"
                  name="preferred_height_min"
                  value={formData.preferred_height_min || ""}
                  onChange={handleChange}
                  placeholder="e.g., 160"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Height (Max)
                </label>
                <Input
                  type="number"
                  name="preferred_height_max"
                  value={formData.preferred_height_max || ""}
                  onChange={handleChange}
                  placeholder="e.g., 175"
                />
              </div>
            </div>

            {/* Background Preferences */}
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
              Background Preferences
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Religion
                </label>
                <Input
                  type="text"
                  name="preferred_religion"
                  value={formData.preferred_religion || ""}
                  onChange={handleChange}
                  placeholder="e.g., Islam"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Caste
                </label>
                <Input
                  type="text"
                  name="preferred_caste"
                  value={formData.preferred_caste || ""}
                  onChange={handleChange}
                  placeholder="e.g., Sunni"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Education
                </label>
                <Input
                  type="text"
                  name="preferred_education"
                  value={formData.preferred_education || ""}
                  onChange={handleChange}
                  placeholder="e.g., Masters"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Profession
                </label>
                <Input
                  type="text"
                  name="preferred_profession"
                  value={formData.preferred_profession || ""}
                  onChange={handleChange}
                  placeholder="e.g., Doctor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Country
                </label>
                <Input
                  type="text"
                  name="preferred_country"
                  value={formData.preferred_country || ""}
                  onChange={handleChange}
                  placeholder="e.g., Bangladesh"
                />
              </div>
            </div>

            {/* Additional Expectations */}
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
              Additional Expectations
            </h4>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Other Expectations
              </label>
              <textarea
                name="other_expectations"
                value={formData.other_expectations || ""}
                onChange={handleChange}
                placeholder="Specify any other key expectations or values."
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
                rows={3}
              />
            </div>

            {/* Save Button */}
            <div className="pt-6 flex justify-end">
              <Button
                type="button"
                className="w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
