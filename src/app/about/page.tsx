"use client";

import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import { Globe, Heart, Shield, Star, Target, Users } from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-rose-600" />,
      title: "Our Mission",
      description: "To create meaningful connections that lead to lifelong partnerships through a trusted and secure platform."
    },
    {
      icon: <Target className="h-8 w-8 text-rose-600" />,
      title: "Our Vision",
      description: "To be the most trusted matrimonial platform in Bangladesh, helping millions find their perfect life partners."
    },
    {
      icon: <Shield className="h-8 w-8 text-rose-600" />,
      title: "Safe & Secure",
      description: "We prioritize your privacy and security with verified profiles and advanced safety measures."
    },
    {
      icon: <Users className="h-8 w-8 text-rose-600" />,
      title: "Community First",
      description: "Building a community where families can connect with trust, respect, and cultural understanding."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Successful Matches" },
    { number: "50,000+", label: "Happy Members" },
    { number: "100+", label: "Cities Covered" },
    { number: "5+", label: "Years of Trust" }
  ];

  return (
    <>
      <Navbar />
        {/* Hero Section - Darker for better header visibility */}
        <section className="relative bg-gradient-to-r from-rose-950 to-pink-800 text-white py-32">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About ShaadiMart BD</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
              Your trusted partner in the journey to find lifelong happiness
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Welcome to ShaadiMart BD
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  ShaadiMart BD is Bangladesh's leading matrimonial platform, dedicated to helping 
                  individuals find their perfect life partners. We understand the importance of 
                  marriage in our culture and strive to make this journey beautiful, secure, and successful.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our platform combines traditional values with modern technology to create a space 
                  where families can connect with confidence and trust.
                </p>
                <div className="flex items-center space-x-2 text-rose-600">
                  <Globe className="h-6 w-6" />
                  <span className="text-lg font-semibold">Serving the Bangladeshi Community Worldwide</span>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/about-hero.jpg"
                  alt="Happy couple"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback decorative element */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                    <p className="text-rose-600 text-lg font-semibold">Building Lasting Relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose ShaadiMart BD?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We are committed to making your search for a life partner simple, safe, and successful
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-100"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trust</h3>
                <p className="text-gray-600">
                  We build relationships based on trust, transparency, and authenticity.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Respect</h3>
                <p className="text-gray-600">
                  We honor cultural values and treat every member with dignity and respect.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commitment</h3>
                <p className="text-gray-600">
                  We are committed to your happiness and success in finding the right partner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-rose-700 to-pink-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Join thousands of happy couples who found their perfect match through ShaadiMart BD
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-white text-rose-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Free Profile
              </a>
              <a
                href="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-rose-700 transition-all duration-300"
              >
                Sign In
              </a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        < Footer />
    </>
  );
}