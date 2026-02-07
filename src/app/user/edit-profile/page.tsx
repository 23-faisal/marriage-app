"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import EditCareer from "@/components/ui/EditProfile/EditCareer";
import EditEducation from "@/components/ui/EditProfile/EditEducation";
import EditFamily from "@/components/ui/EditProfile/EditFamily";
import EditLifestyle from "@/components/ui/EditProfile/EditLifestyle";
import EditLocation from "@/components/ui/EditProfile/EditLocation";
import EditPartnerPreference from "@/components/ui/EditProfile/EditPartnerPreference";

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a small wait for all child components to load nicely
    const timer = setTimeout(() => setLoading(false), 1000); // 800ms minimum wait
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center p-20 min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-rose-600" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen space-y-10">
      {/* Section 1: Location */}
      <section>
        <EditLocation />
      </section>

      {/* Section 2: Lifestyle */}
      <section>
        <EditLifestyle />
      </section>

      {/* Section 3: Career & Education */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <EditCareer />
        </div>
        <div>
          <EditEducation />
        </div>
      </section>

      {/* Section 4: Family */}
      <section>
        <EditFamily />
      </section>

      {/* Section 5: Partner Preferences */}
      <section>
        <EditPartnerPreference />
      </section>
    </div>
  );
}
