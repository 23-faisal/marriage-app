"use client";

import { Phone, X } from "lucide-react"; // Added Phone icon for flair
import React from "react";

interface ConfirmPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Changed back to simple function signature
  remaining: number;
  willRemain: number;
  viewedName: string; 
}

const ConfirmPhoneModal: React.FC<ConfirmPhoneModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  remaining,
  willRemain,
  viewedName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Content - Dark Gradient Background */}
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 border border-white/10">
        
        {/* Accent Bar - Matches AlertModal */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500"></div>

        {/* Close Button - Matches AlertModal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 text-rose-400 pr-8 flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Confirm Phone View
        </h2>

        {/* Message Body */}
        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          You are about to view <span className="font-bold text-rose-300">{viewedName}</span>&apos;s phone number.
        </p>

        {/* Dedicated Info Block - Adapted for Dark Theme */}
        <div className="bg-gray-800 border-l-4 border-rose-500 p-4 mb-8 rounded-lg shadow-inner">
          <p className="text-sm font-medium text-gray-200">
            Current Views Remaining: 
            <span className="font-extrabold text-lg text-rose-400 ml-2">{remaining}</span>
          </p>
          <p className="text-sm font-medium text-red-400 mt-1">
            After viewing, you will have: 
            <span className="font-extrabold text-lg text-red-500 ml-2">{willRemain}</span> left.
          </p>
        </div>

        {/* Actions - Adapted to Dark Theme and Confirmation Structure */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            // Primary action button matching the AlertModal's gradient style
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-rose-900/50"
          >
            Yes, View Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPhoneModal;