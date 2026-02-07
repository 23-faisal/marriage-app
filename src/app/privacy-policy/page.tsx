"use client";

import Navbar from "@/components/share/Navbar";
import { Eye, Lock, Shield, UserCheck } from "lucide-react";
import Footer from "@/components/share/Footer";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, including profile details, photos, preferences, and communication data. This helps us create better matches and improve your experience."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: "Your information is used to provide personalized matches, facilitate communication between members, improve our services, and ensure platform security. We never sell your personal data to third parties."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Information Sharing",
      content: "We only share your profile information with other verified members as per your privacy settings. Your contact information and personal details remain confidential until you choose to share them."
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Your Rights & Controls",
      content: "You have full control over your data. You can edit, update, or delete your information at any time. You can also adjust your privacy settings to control who sees your profile."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your privacy and security are our top priorities. Learn how we protect and handle your personal information.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="text-center mb-12">
              <p className="text-white/60 text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
              <p className="text-white/90 text-lg leading-relaxed">
                At ShaadiMart BD, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our matrimonial services.
              </p>
            </div>

            {/* Main Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-rose-600 p-3 rounded-full flex-shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {section.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Data Security & Protection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Security Measures</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>End-to-end encryption for all messages</li>
                    <li>Secure SSL connections</li>
                    <li>Regular security audits</li>
                    <li>Two-factor authentication available</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Your Control</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Manage profile visibility</li>
                    <li>Control photo access</li>
                    <li>Set communication preferences</li>
                    <li>Download your data anytime</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Questions About Privacy?
                </h3>
                <p className="text-white/80 mb-6">
                  If you have any questions about our Privacy Policy or how we handle your data, 
                  please don't hesitate to contact our privacy team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Privacy Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        
      </div>
    </>
  );
}