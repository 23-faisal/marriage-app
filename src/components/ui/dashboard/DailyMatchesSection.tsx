"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookUser, Calendar, Eye, GraduationCap, MapPin, ShieldCheck, Zap } from "lucide-react";

const DailyMatchesSection = () => {
  const matches = [
    { id: "M-101", name: "Ahmed Khan", age: 28, education: "Masters in Finance", location: "Dhaka", verified: true, imageUrl: "https://via.placeholder.com/150/FF6347/FFFFFF?text=A" },
    { id: "F-205", name: "Fatima Begum", age: 26, education: "B.Sc. Computer Science", location: "Chittagong", verified: true, imageUrl: "https://via.placeholder.com/150/FF69B4/FFFFFF?text=F" },
    { id: "M-312", name: "Rahim Ali", age: 30, education: "PhD in Physics", location: "Sylhet", verified: false, imageUrl: "" }, // fallback will work
  ];

  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
        <Zap className="h-6 w-6 text-amber-500" />
        Your Daily Match Picks
      </h2>

      <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <div
              key={match.id}
              className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image / Avatar */}
              <div className="relative h-40 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={match.imageUrl?.trim() ? match.imageUrl : fallbackImage}
                  alt={match.name || `Profile ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-bold leading-tight drop-shadow-md truncate">{match.name || `Match ID: ${match.id}`}</h3>
                  <p className="text-xs text-gray-200 drop-shadow-sm truncate">{match.id}</p>
                </div>

                {/* Verified Badge */}
                {match.verified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full text-xs font-bold shadow-md flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-rose-500 flex-shrink-0" /> {match.age} yrs
                  </span>
                  <span className="flex items-center gap-2 truncate">
                    <GraduationCap className="h-4 w-4 text-rose-500 flex-shrink-0" /> {match.education}
                  </span>
                  <span className="col-span-2 flex items-center gap-2 truncate">
                    <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" /> {match.location}
                  </span>
                  <span className="col-span-2 flex items-center gap-2 truncate">
                    <BookUser className="h-4 w-4 text-rose-500 flex-shrink-0" /> Profession: Engineer
                  </span>
                </div>
              </div>

              {/* View Profile Button */}
              <Button
                size="lg" // Use valid size: default, sm, lg, icon
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-base text-white font-bold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Eye className="h-5 w-5" />
                View Profile
              </Button>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <a
            href="/matches"
            className="text-base font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-2 transition-colors"
          >
            Explore All Matches
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default DailyMatchesSection;
