"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface FormData {
  Heighets_degree: string;
  institute_name: string;
  graduation_year: number;
  additional_certificates?: string;
}

export default function Step2Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- Logic remains completely unchanged ---
  const [formData, setFormData] = useState<FormData>({
    Heighets_degree: "",
    institute_name: "",
    graduation_year: new Date().getFullYear(),
    additional_certificates: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [educationId, setEducationId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      const token = localStorage.getItem("accessToken") || "";
      const userData = localStorage.getItem("userData");
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.id) {
        setIsLoading(false);
        router.push("/login");
        return;
      }

      // Get user's profile via API route
      const profileRes = await fetch(`/api/user/profile?user_id=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileRes.ok) {
        setIsLoading(false);
        toast.error("Profile not found. Please complete Step 1 first.");
        router.push("/user/profile/step1");
        return;
      }

      const profileData = await profileRes.json();
      const profile = profileData.data;

      if (!profile?.id) {
        setIsLoading(false);
        toast.error("Profile not found. Please complete Step 1 first.");
        router.push("/user/profile/step1");
        return;
      }

      setProfileId(profile.id);

      // Get existing education
      const eduRes = await fetch(`/api/user/education?profile_id=${profile.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (eduRes.ok) {
        const eduData = await eduRes.json();
        const edu = eduData.data;
        if (edu) {
          setFormData({
            Heighets_degree: edu.Heighets_degree || "",
            institute_name: edu.institute_name || "",
            graduation_year: edu.graduation_year || new Date().getFullYear(),
            additional_certificates: edu.additional_certificates || "",
          });
          setEducationId(edu.id);
        }
      }

      setIsLoading(false);
    };

    fetchEducation();
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

    if (!profileId) {
      toast.error("Profile not loaded yet. Please wait and try again.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken") || "";

    try {
      const payload = { ...formData, profile_id: profileId };

      let res: Response;
      if (educationId) {
        res = await fetch(`/api/user/education?id=${educationId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/user/education", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = errData?.message || `Server error (${res.status})`;
        toast.error(`Failed to save education: ${msg}`);
        setIsSubmitting(false);
        return;
      }

      const saved = await res.json();
      if (saved?.id && !educationId) setEducationId(saved.id);

      await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed_step: 2 }),
      });

      toast.success("Education details saved!");
      router.push("/user/profile/step3");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong.";
      console.error("Education submission failed:", error);
      toast.error(`Failed to save: ${msg}`);
      setIsSubmitting(false);
    }
  };

  const handlePreviousStep = () => {
    router.push("/user/profile/step1");
  };

  // --- DESIGN IMPLEMENTATION STARTS HERE ---
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 2:</span> Education Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Tell us about your educational background.
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
            <p className="ml-3 text-lg text-gray-600">Loading profile data...</p>
          </div>
        ) : (
          /* FORM BODY (Visible when not loading) */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Academic Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highest Degree */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Highest Degree</label>
                <input
                  type="text"
                  name="Heighets_degree"
                  value={formData.Heighets_degree}
                  onChange={handleChange}
                  placeholder="e.g., Masters, BSc Engineering"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  required
                />
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Graduation Year</label>
                <input
                  type="number"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  placeholder="e.g., 2018"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                  required
                />
              </div>
            </div>
            
            {/* Institute Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Institute Name</label>
              <input
                type="text"
                name="institute_name"
                value={formData.institute_name}
                onChange={handleChange}
                placeholder="e.g., Dhaka University"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
                required
              />
            </div>

            {/* Additional Certificates */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Certificates / Training (Optional)</label>
              <textarea
                name="additional_certificates"
                value={formData.additional_certificates || ""}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., Certified in Software Development, PMP"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
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
                disabled={isSubmitting}
                className="w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30 
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>Save & Continue &rarr;</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}