"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

const FeaturesSection = () => {
  const features = [
    "Register for Free!",
    "100% human verified profiles",
    "Chat, Voice & Video calling",
    "Private, personalized, and highly confidential service",
    "Halal, safe and secured Matrimony site in Bangladesh",
  ];

  return (
    <>
      {/* Main Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center ">
            {/* Left side - Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Why choose <span className="text-red-600">ShaadiMart BD</span>
                </h2>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/login" className="pt-6">
                <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Find Your Partner
                </button>
              </Link>
            </div>

            {/* Right side removed */}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
