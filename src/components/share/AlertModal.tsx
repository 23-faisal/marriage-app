"use client";

import React from "react";
import { X } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title = "Notice",
  message,
  actionLabel = "OK",
  onAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-white/10">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 text-rose-400 pr-8">{title}</h2>

        {/* Message */}
        <p className="text-sm text-gray-300 mb-8 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              if (onAction) onAction();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-md"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;