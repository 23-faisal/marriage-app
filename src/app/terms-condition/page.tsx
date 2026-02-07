"use client";
import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import { AlertTriangle, FileText, Shield, Users } from "lucide-react";
{/*import { FileText, Users, Shield, AlertTriangle, Scale } from "lucide-react";*/}

export default function TermsAndConditions() {
  const sections = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Eligibility & Membership",
      content: "You must be at least 18 years old to use our services. By creating an account, you confirm that you are legally eligible for marriage according to the laws of Bangladesh and that all information provided is accurate and truthful."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Member Conduct",
      content: "Members must maintain respectful and appropriate behavior. Any form of harassment, fake profiles, misleading information, or inappropriate content is strictly prohibited and may result in immediate account termination."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Profile Authenticity",
      content: "All profile information, including photos, must be genuine and recent. We conduct verification checks and reserve the right to suspend accounts with suspicious or fraudulent information."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Service Usage",
      content: "ShaadiMart BD is a platform for genuine matrimonial purposes only. Commercial use, spamming, or any illegal activities are strictly forbidden. We are not responsible for member interactions outside our platform."
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
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Please read these terms carefully before using our matrimonial services.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="text-center mb-12">
              <p className="text-white/60 text-lg">
                Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
              <p className="text-white/90 text-lg leading-relaxed">
                Welcome to ShaadiMart BD. These Terms and Conditions govern your use of our matrimonial services. 
                By accessing or using our platform, you agree to be bound by these terms and our Privacy Policy.
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

            {/* Payment & Subscription Terms */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Payment & Subscription Terms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80">
                <div>
                  <h4 className="font-semibold text-white mb-4">Subscription Plans</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>All payments are processed securely</li>
                    <li>Subscription auto-renews unless cancelled</li>
                    <li>Refunds processed as per policy</li>
                    <li>Plan features subject to change with notice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Cancellation Policy</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Cancel anytime from your dashboard</li>
                    <li>No refunds for used subscription periods</li>
                    <li>Service continues until current period ends</li>
                    <li>Contact support for billing issues</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 bg-rose-900/30 backdrop-blur-md rounded-2xl p-8 border border-rose-500/30">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Important Disclaimer
              </h3>
              <p className="text-white/80 text-center leading-relaxed">
                While we strive to verify member profiles and maintain a safe environment, 
                ShaadiMart BD is not responsible for the conduct of any member on or off the platform. 
                Members are encouraged to exercise due diligence and take necessary precautions when interacting with others.
              </p>
            </div>

            {/* Agreement */}
            <div className="mt-12 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Agreement to Terms
                </h3>
                <p className="text-white/80 mb-6">
                  By using ShaadiMart BD, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and Conditions.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-semibold hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Support
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