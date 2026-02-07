"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, User, Calendar, Droplet, Heart } from "lucide-react";

// Reusable input wrapper
const InputShell = ({
  children,
  icon: Icon,
  label,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      <Icon className="h-4 w-4 text-rose-500" />
      {label}
    </label>
    {children}
  </div>
);

// Mapping frontend values to backend-expected values
const genderMap: Record<string, string> = {
  Female: "female",
  Male: "male",
};

const religionMap: Record<string, string> = {
  Islam: "Islam",
  Christian: "Christian",
  Hindu: "Hindu",
  Buddhist: "Buddhist",
  Other: "Other",
};

const SearchProfileForm = () => {
  const router = useRouter();

  // Form state
  const [gender, setGender] = useState<"Female" | "Male">("Female");
  const [age, setAge] = useState<number>(25);
  const [religion, setReligion] = useState<keyof typeof religionMap>("Islam");
  const [maritalStatus, setMaritalStatus] = useState<
    "UnMarried" | "Married" | "Divorced" | "Widowed"
  >("UnMarried");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      gender: genderMap[gender],
      age_from: "18", // always start from 18
      age_to: age.toString(),
      religion: religionMap[religion],
      marital_status: maritalStatus,
    }).toString();

    router.push(`/user/search?${query}`);
  };

  const baseInputStyle =
    "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-rose-500 text-sm bg-white transition-all shadow-inner hover:border-rose-300";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
        <Search className="h-6 w-6 text-rose-500" />
        Find Your Match
      </h2>

      <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="p-6 grid gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4 items-center"
        >
          {/* Gender */}
          <InputShell label="Looking For" icon={User}>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              {Object.keys(genderMap).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g as "Female" | "Male")}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                    gender === g
                      ? "bg-white text-rose-600 shadow-md ring-1 ring-rose-500"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </InputShell>

          {/* Age Slider */}
          <InputShell label={`Age: ${age} Years`} icon={Calendar}>
            <input
              type="range"
              min={18}
              max={40}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 rounded-xl accent-rose-500 cursor-pointer appearance-none bg-gray-200 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-gray-500 px-1 mt-0.5">
              <span>18</span>
              <span>40</span>
            </div>
          </InputShell>

          {/* Religion */}
          <InputShell label="Religion" icon={Droplet}>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value as keyof typeof religionMap)}
              className={baseInputStyle}
            >
              {Object.keys(religionMap).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </InputShell>

          {/* Marital Status */}
          <InputShell label="Marital Status" icon={Heart}>
            <select
              value={maritalStatus}
              onChange={(e) =>
                setMaritalStatus(
                  e.target.value as "UnMarried" | "Married" | "Divorced" | "Widowed"
                )
              }
              className={baseInputStyle}
            >
              {["UnMarried", "Married", "Divorced", "Widowed"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </InputShell>

          {/* Search Button */}
          <div className="lg:col-span-4 col-span-2 mt-2">
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-lg text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl rounded-xl"
            >
              <Search className="h-5 w-5" />
              <span>Search Profiles</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SearchProfileForm;

