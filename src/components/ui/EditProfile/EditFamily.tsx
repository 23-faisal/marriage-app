"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FamilyForm {
  id?: number;
  father_name?: string;
  father_occupation?: string;
  mother_name?: string;
  mother_occupation?: string;
  brothers_unmarried?: number;
  brothers_married?: number;
  sisters_unmarried?: number;
  sisters_married?: number;
  family_details?: string | null;
  [key: string]: any;
}

export default function EditFamily() {
  const [formData, setFormData] = useState<FamilyForm>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const res = await fetch("/api/user/family-details");
        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setFormData(data.data); // populate single object
        }
      } catch (err) {
        console.error("Fetch family details error:", err);
        toast.error("Failed to load family details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamily();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name.includes("brothers") || name.includes("sisters") ? Number(value) : value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/family-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) toast.success("Family details updated successfully");
      else toast.error(data.message || "Update failed");
    } catch (err) {
      console.error("Update family details error:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-20 min-h-[300px]">
        <svg className="animate-spin h-10 w-10 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-lg text-gray-600">Loading family data...</p>
      </div>
    );

  return (
    <div className="w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">Family Details</h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">Provide details about your parents and siblings.</p>
        </div>

        <form className="p-6 sm:p-8 space-y-7" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Parents' Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name || ""}
                onChange={handleChange}
                placeholder="Full Name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Occupation</label>
              <input
                type="text"
                name="father_occupation"
                value={formData.father_occupation || ""}
                onChange={handleChange}
                placeholder="e.g., Engineer, Business Owner"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-7 border-b border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name || ""}
                onChange={handleChange}
                placeholder="Full Name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Occupation</label>
              <input
                type="text"
                name="mother_occupation"
                value={formData.mother_occupation || ""}
                onChange={handleChange}
                placeholder="e.g., Homemaker, Teacher"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Siblings Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brothers (Unmarried)</label>
              <input
                type="number"
                name="brothers_unmarried"
                value={formData.brothers_unmarried || 0}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brothers (Married)</label>
              <input
                type="number"
                name="brothers_married"
                value={formData.brothers_married || 0}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sisters (Unmarried)</label>
              <input
                type="number"
                name="sisters_unmarried"
                value={formData.sisters_unmarried || 0}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sisters (Married)</label>
              <input
                type="number"
                name="sisters_married"
                value={formData.sisters_married || 0}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Family Details</label>
            <textarea
              name="family_details"
              value={formData.family_details || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your family values, background, or social status briefly."
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 hover:border-gray-400 resize-none transition duration-150 ease-in-out"
            />
          </div>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-700 shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
