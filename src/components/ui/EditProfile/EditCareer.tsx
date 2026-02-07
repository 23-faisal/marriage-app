"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

interface CareerForm {
  id?: number;
  profession: string;
  job_title: string;
  company: string;
  annual_income: number | string;
}

export default function EditCareer() {
  const [formData, setFormData] = useState<CareerForm>({
    profession: "",
    job_title: "",
    company: "",
    annual_income: "",
  });

  const [careerId, setCareerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await fetch("/api/user/careers");
        const data = await res.json();

        if (res.ok && data.data) {
          const career = data.data;
          setFormData({
            profession: career.profession || "",
            job_title: career.job_title || "",
            company: career.company || "",
            annual_income: career.annual_income || "",
            id: career.id,
          });
          setCareerId(career.id);
        }
      } catch (err) {
        console.error("Failed to load career:", err);
        toast.error("Failed to load career info");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareer();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const method = careerId ? "PUT" : "POST";
      const url = `/api/user/careers`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(careerId ? "Career updated successfully" : "Career added successfully");
      } else {
        toast.error(data.message || "Failed to save career");
      }
    } catch (err) {
      console.error("Career save error:", err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-20 min-h-[250px]">
        <svg
          className="animate-spin h-10 w-10 text-rose-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">Career Details</h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Update your profession, job title, company, and annual income.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-7">
          <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Employment Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
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
          <div className="mt-4">
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
          <div className="mt-4">
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

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save & Continue &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
