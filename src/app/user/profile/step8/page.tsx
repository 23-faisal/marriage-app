"use client";

import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// All imports used as provided
import { getProfilePictures, uploadProfilePicture } from "../../../../service/ProfilePictureService";

export default function Step8ProfileUpload() {
  const [pictures, setPictures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Initial loading for fetching data
  const [uploading, setUploading] = useState(false); // Loading for upload process
  const router = useRouter();

  const fetchPictures = async () => {
    try {
      setLoading(true);
      const res = await getProfilePictures();
      if (res?.success && Array.isArray(res.data)) {
        setPictures(res.data);
      }
    } catch (err) {
      console.error("Error fetching pictures:", err);
      toast.error("Failed to load profile pictures.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await uploadProfilePicture(formData);
      if (res?.success) {
        toast.success("Profile picture uploaded successfully!");
        fetchPictures(); // Refresh list
      } else {
        toast.error(res?.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong while uploading.");
    } finally {
      setUploading(false);
      // Reset input value to allow uploading the same file again if needed
      e.target.value = ''; 
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/user/profileProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({
          completed_step: 8,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile progress");
      }

      router.push("/user/dashboard"); // Navigate after successful completion
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to complete your profile");
    }
  };

  
  // --- Navigation Handler (Previous Step) ---
  const handlePreviousStep = () => {
    router.push("/user/profile/step7");
  };
  // ------------------------------------------

  useEffect(() => {
    fetchPictures();
  }, []);

  // --- DESIGN: Central Loading Screen ---
  if (loading)
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
                <h2 className="text-3xl font-extrabold text-white">Step 8: Profile Picture</h2>
            </div>
            <div className="flex justify-center items-center p-20 min-h-[300px]">
                <Loader2 className="animate-spin text-rose-600" size={32} />
                <p className="ml-3 text-lg text-gray-600">Loading existing pictures...</p>
            </div>
        </div>
      </div>
    );

  // --- DESIGN IMPLEMENTATION STARTS HERE (Main Content) ---
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 8:</span> Profile Picture (Final Step)
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Upload a clear photo to complete your profile and start matching.
          </p>
        </div>
        
        {/* FORM BODY (Structured for Centered Content) */}
        <div className="p-6 sm:p-8 space-y-7 text-center">
            
            <h4 className="text-lg font-bold text-gray-700 pb-2">Your Current Photo</h4>

            {pictures.length > 0 ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
                        <Image
                        src={pictures[0]?.url || '/placeholder.png'} 
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full object-cover border-4 border-rose-500 shadow-xl"
                        unoptimized // Use unoptimized for external sources if needed
                        />
                    </div>

                    <p className="text-gray-500 text-sm">
                        You can upload a new picture to replace the current one.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 py-8">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                        <Upload className="text-gray-400" size={48} />
                    </div>
                    <p className="text-gray-600 font-medium">No profile picture yet. Please upload one.</p>
                </div>
            )}

            <h4 className="text-lg font-bold text-gray-700 pt-4 pb-2 border-t border-gray-100">Upload New Photo</h4>
            
            {/* Upload Button */}
            <label
                className={`inline-flex items-center justify-center w-64 gap-2 bg-rose-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-rose-700 cursor-pointer transition 
                           shadow-md shadow-rose-400/50 mx-auto ${
                uploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
                {uploading ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    Uploading...
                </>
                ) : (
                <>
                    <Upload size={20} />
                    Upload New Picture
                </>
                )}
                <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
                />
            </label>


            {/* SUBMIT BUTTONS (Justify Between) */}
            <div className="pt-8 flex justify-between border-t border-gray-100 mt-8">
              
              {/* Previous Step Button */}
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-gray-300 transition duration-300 ease-in-out shadow-md shadow-gray-400/30"
              >
                &larr; Previous Step
              </button>
              
              {/* Submit & Finish Button (Styled with Green for Finality) */}
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg 
                           hover:bg-green-700 transition duration-300 ease-in-out shadow-lg shadow-green-500/30 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit & Finish &rarr;
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}