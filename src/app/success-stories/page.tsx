"use client";

import Navbar from "@/components/share/Navbar";
import Footer from "@/components/share/Footer";
import Image from "next/image";

interface Story {
  name: string;
  description: string;
  photo: string;
}

export default function SuccessStories() {
  // We'll use 12 photos and sample bride names/descriptions
  const stories: Story[] = Array.from({ length: 12 }, (_, i) => ({
    name: `Bride ${i + 1}`,
    description: `Found her soulmate through ShaadiMart BD and began a beautiful journey together.`,
    photo: `/photos/photo${i + 1}.jpeg`,
  }));

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Real couples who found love through ShaadiMart BD. Celebrate their
            journeys and get inspired.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={story.photo}
                  alt={story.name}
                  fill
                  className="object-cover"
                  priority={idx < 4} // lazy load only after first few
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
              <p className="text-white/80 text-sm">{story.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
