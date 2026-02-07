// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface EducationForm {
//   id?: number;
//   Heighets_degree: string;
//   institute_name: string;
//   graduation_year: string;
//   additional_certificates: string;
// }

// export default function EditEducation() {
//   const [form, setForm] = useState<EducationForm>({
//     Heighets_degree: "",
//     institute_name: "",
//     graduation_year: "",
//     additional_certificates: "",
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEducation = async () => {
//       try {
//         const res = await fetch(`/api/user/education`); // call proxy route
//         const data = await res.json();

//         if (res.ok && data.success && data.data) {
//           setForm(data.data); // directly set the single object
//         }
//       } catch (error) {
//         console.error("Fetch education error:", error);
//         toast.error("Failed to load education info");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEducation();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`/api/user/education`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (res.ok) toast.success("Education updated successfully");
//       else toast.error(data.message || "Update failed");
//     } catch (error) {
//       console.error("Update education error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   if (loading) return <p>Loading education info...</p>;

//   return (
//     <div className="bg-white shadow p-5 rounded-xl">
//       <h3 className="text-xl font-semibold mb-3">Education Details</h3>
//       <div className="space-y-3">
//         <Input
//           name="Heighets_degree"
//           placeholder="Degree"
//           value={form.Heighets_degree || ""}
//           onChange={handleChange}
//         />
//         <Input
//           name="institute_name"
//           placeholder="Institution"
//           value={form.institute_name || ""}
//           onChange={handleChange}
//         />
//         <Input
//           name="graduation_year"
//           placeholder="Year of Passing"
//           value={form.graduation_year || ""}
//           onChange={handleChange}
//         />
//         <Input
//           name="additional_certificates"
//           placeholder="Additional Certificates"
//           value={form.additional_certificates || ""}
//           onChange={handleChange}
//         />
//       </div>
//       <Button
//         className="mt-4 bg-rose-500 hover:bg-rose-600"
//         onClick={handleSave}
//       >
//         Save Changes
//       </Button>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, ChangeEvent } from "react";
import { toast } from "sonner";

interface EducationForm {
  id?: number;
  Heighets_degree: string;
  institute_name: string;
  graduation_year: string;
  additional_certificates: string;
}

export default function EditEducation() {
  const [form, setForm] = useState<EducationForm>({
    Heighets_degree: "",
    institute_name: "",
    graduation_year: "",
    additional_certificates: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`/api/user/education`); // proxy route
        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setForm(data.data);
        }
      } catch (error) {
        console.error("Fetch education error:", error);
        toast.error("Failed to load education info");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/user/education`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) toast.success("Education updated successfully");
      else toast.error(data.message || "Update failed");
    } catch (error) {
      console.error("Update education error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            Education Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Tell us about your educational background.
          </p>
        </div>

        {loading ? (
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
            <p className="ml-3 text-lg text-gray-600">Loading profile data...</p>
          </div>
        ) : (
          <form className="p-6 sm:p-8 space-y-7">
            <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">
              Academic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Highest Degree
                </label>
                <Input
                  type="text"
                  name="Heighets_degree"
                  value={form.Heighets_degree}
                  onChange={handleChange}
                  placeholder="e.g., Masters, BSc Engineering"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Graduation Year
                </label>
                <Input
                  type="number"
                  name="graduation_year"
                  value={form.graduation_year}
                  onChange={handleChange}
                  placeholder="e.g., 2018"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Institute Name
              </label>
              <Input
                type="text"
                name="institute_name"
                value={form.institute_name}
                onChange={handleChange}
                placeholder="e.g., Dhaka University"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Certificates / Training (Optional)
              </label>
              <textarea
                name="additional_certificates"
                value={form.additional_certificates || ""}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., Certified in Software Development, PMP"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
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
