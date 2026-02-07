"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LifestyleForm {
  id?: number;
  diet?: string;
  smoking?: string;
  drinking?: string;
  hobbies?: string;
}

export default function EditLifestyle() {
  const [form, setForm] = useState<LifestyleForm>({
    diet: "",
    smoking: "",
    drinking: "",
    hobbies: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLifestyle = async () => {
      try {
        const res = await fetch("/api/user/lifestyles");
        const data = await res.json();
        if (res.ok && data) setForm(data || {});
      } catch (error) {
        console.error("Fetch lifestyle error:", error);
        toast.error("Failed to load lifestyle details");
      } finally {
        setLoading(false);
      }
    };
    fetchLifestyle();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/lifestyles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) toast.success("Lifestyle updated successfully");
      else toast.error(data.message || "Update failed");
    } catch (error) {
      console.error("Update lifestyle error:", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p>Loading lifestyle details...</p>;

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">Lifestyle Details</h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Share your lifestyle habits and hobbies.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
          
          {/* Habits Section */}
          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Habits</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diet */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Diet</label>
              <select
                name="diet"
                value={form.diet}
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
                value={form.smoking}
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
                value={form.drinking}
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

          {/* Interests Section */}
          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Interests</h4>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hobbies (Separate with commas)</label>
            <input
              type="text"
              name="hobbies"
              value={form.hobbies || ""}
              onChange={handleChange}
              placeholder="e.g., Reading, traveling, coding, gardening"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
            />
          </div>

          {/* Save Button */}
          <div className="pt-6 flex justify-end">
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
