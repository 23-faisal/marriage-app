// "use client";

// import { ReactNode } from "react";
// import { createPortal } from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   // Optional: portal to body to avoid z-index issues
//   return createPortal(
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       {/* Backdrop with blur */}
//       <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

//       {/* Modal content */}
//       <div
//         className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10"
//         onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//       >
//         {/* Close button */}
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         {/* Render any children */}
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;


"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6" // Added padding for small devices
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal content container: Apply max-height and scrolling here */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg z-10 
                   max-h-[90vh] overflow-y-auto" // Key Changes
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          className="sticky top-0 right-0 z-20 m-4 text-gray-500 hover:text-gray-700 text-3xl font-light leading-none" // Made sticky and slightly larger
          onClick={onClose}
        >
          &times;
        </button>

        {/* Render children: Added padding to content area */}
        <div className="p-6 pt-0"> 
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;