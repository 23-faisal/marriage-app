"use client";

import ProfileCard from "@/components/ui/ProfileCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Profile {
  id: number;
  user_name: string;
  user_id: number;
  dob: string;
  gender: string;
  religion: string;
  marital_status: string;
  verified?: boolean;
  photo?: string;
  education?: { Heighets_degree?: string; institute_name?: string }[];
  location?: { present_address?: string; city?: string };
  career?: { profession?: string; job_title?: string }[];
}

interface Filters {
  gender: string;
  marital_status: string;
  religion: string;
  age_from: number;
  age_to: number;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Derive initial gender from logged-in user (opposite gender)
  const getDefaultGender = () => {
    try {
      const userData = localStorage.getItem("userData");
      const userGender = userData ? JSON.parse(userData)?.gender : null;
      return userGender === "male" ? "female" : userGender === "female" ? "male" : "";
    } catch {
      return "";
    }
  };

  const [filters, setFilters] = useState<Filters>({
    gender: searchParams.get("gender") || "",
    marital_status: searchParams.get("marital_status") || "",
    religion: searchParams.get("religion") || "",
    age_from: Number(searchParams.get("age_from") || 18),
    age_to: Number(searchParams.get("age_to") || 50),
  });

  // On mount: populate gender from user data if not in URL
  useEffect(() => {
    if (!filters.gender) {
      setFilters((f) => ({ ...f, gender: getDefaultGender() }));
    }
  }, []);

  // Auto-search if all required fields are present in URL params
  useEffect(() => {
    const g = searchParams.get("gender");
    const m = searchParams.get("marital_status");
    const r = searchParams.get("religion");
    if (g && m && r) {
      runSearch({ gender: g, marital_status: m, religion: r, age_from: Number(searchParams.get("age_from") || 18), age_to: Number(searchParams.get("age_to") || 50) });
    }
  }, [searchParams]);

  const runSearch = async (params: Filters) => {
    setLoading(true);
    setError("");
    setSearched(true);
    const token = localStorage.getItem("accessToken") || "";

    try {
      const res = await fetch("/api/user/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(params),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(Array.isArray(data.data?.data) ? data.data.data : []);
      } else {
        setProfiles([]);
        setError(data.message || "No profiles found.");
      }
    } catch {
      setProfiles([]);
      setError("Failed to fetch profiles.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.gender || !filters.marital_status || !filters.religion) {
      setError("Please fill in Gender, Marital Status, and Religion to search.");
      return;
    }
    // Push params to URL so the search is shareable/bookmarkable
    const params = new URLSearchParams({
      gender: filters.gender,
      marital_status: filters.marital_status,
      religion: filters.religion,
      age_from: String(filters.age_from),
      age_to: String(filters.age_to),
    });
    router.push(`/user/search?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Form */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Search className="h-6 w-6 text-rose-500" />
            Find Your Match
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            {/* Gender */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Looking For <span className="text-rose-500">*</span></label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Marital Status <span className="text-rose-500">*</span></label>
              <select
                value={filters.marital_status}
                onChange={(e) => setFilters((f) => ({ ...f, marital_status: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              >
                <option value="">Select</option>
                <option value="UnMarried">Unmarried</option>
                <option value="divorced">Divorced</option>
                <option value="widow">Widow/Widower</option>
                <option value="separated">Separated</option>
              </select>
            </div>

            {/* Religion */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Religion <span className="text-rose-500">*</span></label>
              <select
                value={filters.religion}
                onChange={(e) => setFilters((f) => ({ ...f, religion: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              >
                <option value="">Select</option>
                <option value="islam">Islam</option>
                <option value="hinduism">Hinduism</option>
                <option value="christianity">Christianity</option>
                <option value="buddhism">Buddhism</option>
                <option value="sikhism">Sikhism</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age From */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Age From</label>
              <input
                type="number"
                min={18}
                max={80}
                value={filters.age_from}
                onChange={(e) => setFilters((f) => ({ ...f, age_from: Number(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            {/* Age To */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Age To</label>
              <input
                type="number"
                min={18}
                max={80}
                value={filters.age_to}
                onChange={(e) => setFilters((f) => ({ ...f, age_to: Number(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results area */}
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Not searched yet */}
        {!searched && !loading && (
          <div className="text-center py-16 text-gray-400">
            <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Select your search criteria above and click Search.</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-gray-600 text-lg font-medium">Searching profiles...</p>
          </div>
        )}

        {/* Error */}
        {!loading && searched && error && (
          <div className="bg-white border border-gray-200 shadow rounded-xl p-8 text-center max-w-md mx-auto">
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {/* No results */}
        {!loading && searched && !error && profiles.length === 0 && (
          <div className="bg-white border border-gray-200 shadow rounded-xl p-8 text-center max-w-md mx-auto">
            <p className="text-lg font-bold text-gray-700 mb-2">No Profiles Found</p>
            <p className="text-gray-500">Try broadening your search criteria.</p>
          </div>
        )}

        {/* Results */}
        {!loading && profiles.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {profiles.length} profile{profiles.length !== 1 ? "s" : ""} found
            </h2>
            <div className="flex flex-col gap-5">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-gray-500">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
