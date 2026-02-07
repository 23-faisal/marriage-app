// "use client";

// import { XCircle } from "lucide-react";

// interface PaymentFlowModalProps {
//   plan: {
//     id: number;
//     plan_name: string;
//     price: string;
//   } | null;
//   onClose: () => void;
// }

// export default function PaymentFlowModal({ plan, onClose }: PaymentFlowModalProps) {
//   if (!plan) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-2xl max-w-lg w-full mx-4 shadow-2xl relative text-white animate-fadeIn">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
//         >
//           <XCircle className="w-6 h-6" />
//         </button>

//         {/* Title */}
//         <h3 className="text-2xl font-bold mb-4 text-center">
//           Payment Process for {plan.plan_name} Plan
//         </h3>

//         <p className="text-white/80 mb-6 text-sm text-center">
//           Please follow the steps below to complete your payment securely.
//         </p>

//         {/* Step-by-step Instructions */}
//         <div className="space-y-4 text-white/90">
//           <div className="bg-white/10 p-4 rounded-lg border border-white/20">
//             <h4 className="font-semibold text-lg mb-2">Step 1: Send Payment</h4>
//             <p>
//               Send <span className="font-bold">{plan.price}</span> via{" "}
//               <span className="font-semibold text-pink-400">bKash</span>,{" "}
//               <span className="font-semibold text-pink-400">Nagad</span>,{" "}
//               <span className="font-semibold text-pink-400">Rocket</span>, or{" "}
//               <span className="font-semibold text-pink-400">Card Payment</span>.
//             </p>
//           </div>

//           <div className="bg-white/10 p-4 rounded-lg border border-white/20">
//             <h4 className="font-semibold text-lg mb-2">Step 2: Log in to Your Account</h4>
//             <p>
//               After successful payment, log in to your account. You’ll find a{" "}
//               <span className="font-semibold text-pink-400">“Payment”</span> option on your sidebar.
//             </p>
//           </div>

//           <div className="bg-white/10 p-4 rounded-lg border border-white/20">
//             <h4 className="font-semibold text-lg mb-2">Step 3: Fill the Payment Form</h4>
//             <ul className="list-disc list-inside text-sm space-y-1">
//               <li>Enter the amount and transaction ID</li>
//               <li>Upload screenshot (optional)</li>
//               <li>Select your plan: {plan.plan_name}</li>
//               <li>Click “Submit”</li>
//             </ul>
//           </div>

//           <div className="bg-white/10 p-4 rounded-lg border border-white/20">
//             <h4 className="font-semibold text-lg mb-2">Step 4: Verification</h4>
//             <p>
//               Our finance team will verify your payment. Once approved, you’ll get instant
//               access to all premium features for the{" "}
//               <span className="font-semibold">{plan.plan_name}</span> plan.
//             </p>
//           </div>
//         </div>

//         {/* Close Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={onClose}
//             className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300"
//           >
//             Got It, Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { XCircle } from "lucide-react";

interface PaymentFlowModalProps {
  plan: {
    id: number;
    plan_name: string;
    price: string;
  } | null;
  onClose: () => void;
}

export default function PaymentFlowModal({ plan, onClose }: PaymentFlowModalProps) {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl max-w-lg w-full mx-auto shadow-2xl relative text-white animate-fadeIn flex flex-col max-h-[95vh]">
        {/* Header - Fixed */}
        <div className="p-5 border-b border-white/20 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-center">
                Payment Process for {plan.plan_name} Plan
              </h3>
              <p className="text-white/80 mt-2 text-sm text-center">
                Please follow the steps below to complete your payment securely.
              </p>
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors ml-4 flex-shrink-0"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Payment Information - Highlighted Section */}
          <div className="bg-yellow-500/20 border border-yellow-400/40 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3 text-yellow-300 text-center">
              💰 Payment Accounts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                <span className="font-semibold text-pink-400">bKash:</span>
                <span className="font-mono">01712878794</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                <span className="font-semibold text-green-400">Nagad:</span>
                <span className="font-mono">01712878794</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                <span className="font-semibold text-blue-400">Rocket:</span>
                <span className="font-mono">01741664082</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                <span className="font-semibold text-purple-400">Bank:</span>
                <span className="font-mono">0100243763775</span>
              </div>
            </div>
            <p className="text-yellow-200 text-xs text-center mt-3">
              💡 Send exact amount: <span className="font-bold">{plan.price}</span>
            </p>
          </div>

          {/* Step-by-step Instructions */}
          <div className="space-y-4 text-white/90">
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h4 className="font-semibold text-lg mb-2">Step 1: Send Payment</h4>
              <p>
                Send <span className="font-bold">{plan.price}</span> via{" "}
                <span className="font-semibold text-pink-400">bKash</span>,{" "}
                <span className="font-semibold text-green-400">Nagad</span>,{" "}
                <span className="font-semibold text-blue-400">Rocket</span>, or{" "}
                <span className="font-semibold text-purple-400">Bank Transfer</span>.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h4 className="font-semibold text-lg mb-2">Step 2: Go to Payment Option</h4>
              <p>
                After successful login, You'll find a{" "}
                <span className="font-semibold text-pink-400">"Payment"</span> option on your sidebar.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h4 className="font-semibold text-lg mb-2">Step 3: Fill the Payment Form</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Enter the amount and transaction ID</li>
                <li>Upload screenshot (optional but recommended)</li>
                <li>Select your plan: {plan.plan_name}</li>
                <li>Click "Submit"</li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h4 className="font-semibold text-lg mb-2">Step 4: Verification</h4>
              <p>
                Our finance team will verify your payment. Once approved, you'll get instant
                access to all premium features for the{" "}
                <span className="font-semibold">{plan.plan_name}</span> plan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300"
            >
              Got It, Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}