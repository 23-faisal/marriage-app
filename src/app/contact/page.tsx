"use client";

import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+8801741664082",
      description: "Mon to Fri 9am to 6pm"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "shaadimart1@gmail.com",
      description: "Send us your query anytime!"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: "Dhaka, Bangladesh",
      description: "Visit our office"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timing",
      details: "9:00 AM - 6:00 PM",
      description: "Saturday to Thursday"
    }
  ];

  return (
    <>
      <Navbar />
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-rose-800 to-pink-800 text-white py-28">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
              Get in touch with us - We're here to help you find your perfect match
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions about our services? Need assistance with your profile? 
                  We're here to help you every step of the way in your journey to find love.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-rose-100 p-3 rounded-full">
                        <div className="text-rose-600">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-700 font-medium">{item.details}</p>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-rose-50 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageCircle className="h-6 w-6 text-rose-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Quick Support</h3>
                  </div>
                  <p className="text-gray-600">
                    For urgent matters, you can also reach us through our live chat support 
                    available on our website during business hours.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I create a profile?
                </h3>
                <p className="text-gray-600">
                  Click on the "Sign Up" button and fill in your basic information. 
                  You can complete your profile with photos and additional details after registration.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is my personal information safe?
                </h3>
                <p className="text-gray-600">
                  Yes, we take privacy very seriously. Your personal information is protected 
                  with advanced security measures and will never be shared without your consent.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I upgrade my membership?
                </h3>
                <p className="text-gray-600">
                  You can upgrade your membership from your dashboard under the "Payment" section. 
                  We offer various plans to suit your needs.
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