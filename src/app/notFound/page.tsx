"use client";

import { Clock, Heart, Home, Mail } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Heart Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-rose-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <Heart className="h-24 w-24 text-rose-500 relative animate-bounce" />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-8xl sm:text-9xl font-bold text-white mb-4">
              404
            </h1>
            <div className="w-24 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          {/* Coming Soon Message */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-rose-400 mb-4">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="text-lg font-semibold">This page is coming...</span>
            </div>
            <p className="text-xl text-white/80 font-medium">
              Stay tuned! We're working on something amazing.
            </p>
          </div>

          {/* Description */}
          <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist yet, but we're cooking up something special. 
            Good things take time, especially when it comes to helping you find your perfect match!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/50 text-sm">
              While you wait, why not explore our existing features? 
              You might find your perfect match sooner than you think!
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="mt-12 flex justify-center space-x-8 text-white/30">
          <div className="animate-float">
            <Heart className="h-8 w-8" />
          </div>
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Heart className="h-6 w-6" />
          </div>
          <div className="animate-float" style={{ animationDelay: '2s' }}>
            <Heart className="h-8 w-8" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ShaadiMart BD. All rights reserved.
          </p>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}