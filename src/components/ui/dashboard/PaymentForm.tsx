// "use client";

// import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// interface Plan {
//   id: number;
//   plan_name: string;
//   description?: string;
// }

// interface PaymentFormProps {
//   onSuccess?: () => void;
// }

// const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [selectedPlan, setSelectedPlan] = useState<number | "">("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [senderName, setSenderName] = useState("");
//   const [senderPhone, setSenderPhone] = useState("");
//   const [screenshot, setScreenshot] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   // Fetch plans from public API
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await fetch("/api/plans/public");
//         const data = await res.json();
//         if (res.ok && data.success) {
//           setPlans(data.plans);
//         } else {
//           console.error("Failed to fetch plans:", data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPlans();
//   }, []);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setScreenshot(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMsg(null);

//     if (!selectedPlan || !paymentMethod || !transactionId) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("plan_id", String(selectedPlan));
//     formData.append("payment_method", paymentMethod);
//     formData.append("transaction_id", transactionId);
//     if (senderName) formData.append("sender_name", senderName);
//     if (senderPhone) formData.append("sender_phone", senderPhone);
//     if (screenshot) formData.append("screenshot", screenshot);

//     setLoading(true);

//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       const res = await fetch("/api/user/payment", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken || ""}`, // send token from client
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Payment submission failed.");
//       } else {
//         setSuccessMsg(data.message || "Payment submitted successfully!");
//         if (onSuccess) onSuccess();
//         // Reset form
//         setSelectedPlan("");
//         setPaymentMethod("");
//         setTransactionId("");
//         setSenderName("");
//         setSenderPhone("");
//         setScreenshot(null);
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Select Plan *</label>
//         <select
//           value={selectedPlan}
//           onChange={(e) => setSelectedPlan(Number(e.target.value))}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
//           required
//         >
//           <option value="">-- Select a Plan --</option>
//           {plans.map((plan) => (
//             <option key={plan.id} value={plan.id}>
//               {plan.plan_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Payment Method *</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
//           required
//         >
//           <option value="">-- Select Payment Method --</option>
//           <option value="BKASH">BKASH</option>
//           <option value="ROCKET">ROCKET</option>
//           <option value="NAGAD">NAGAD</option>
//           <option value="CARD">CARD</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Transaction ID *</label>
//         <input
//           type="text"
//           value={transactionId}
//           onChange={(e) => setTransactionId(e.target.value)}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Sender Name</label>
//         <input
//           type="text"
//           value={senderName}
//           onChange={(e) => setSenderName(e.target.value)}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Sender Phone</label>
//         <input
//           type="text"
//           value={senderPhone}
//           onChange={(e) => setSenderPhone(e.target.value)}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Screenshot</label>
//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={handleFileChange}
//           className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md font-semibold transition-all"
//       >
//         {loading ? "Submitting..." : "Submit Payment"}
//       </button>
//     </form>

//   );
// };

// export default PaymentForm;

"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// Import your custom button component
import { Button } from "@/components/ui/button"; // <--- ASSUMED IMPORT PATH

interface Plan {
  id: number;
  plan_name: string;
  description?: string;
}

interface PaymentFormProps {
  onSuccess?: () => void;
}

const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  // --- (All state and hooks logic remains unchanged) ---
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch plans from public API (logic unchanged)
  useEffect(() => {
    const fetchPlans = async () => {
      // ... (fetch logic remains unchanged)
      try {
        const res = await fetch("/api/plans/public");
        const data = await res.json();
        if (res.ok && data.success) {
          setPlans(data.plans);
        } else {
          console.error("Failed to fetch plans:", data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlans();
  }, []);

  // Handlers (logic unchanged)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    // ... (submission logic remains unchanged)
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!selectedPlan || !paymentMethod || !transactionId) {
      setError("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("plan_id", String(selectedPlan));
    formData.append("payment_method", paymentMethod);
    formData.append("transaction_id", transactionId);
    if (senderName) formData.append("sender_name", senderName);
    if (senderPhone) formData.append("sender_phone", senderPhone);
    if (screenshot) formData.append("screenshot", screenshot);

    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch("/api/user/payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Payment submission failed.");
      } else {
        setSuccessMsg(data.message || "Payment submitted successfully!");
        if (onSuccess) onSuccess();
        // Reset form
        setSelectedPlan("");
        setPaymentMethod("");
        setTransactionId("");
        setSenderName("");
        setSenderPhone("");
        setScreenshot(null);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // --------------------------------------------------------

  return (
    <div className="pt-2">
      {/* GRADIENT TITLE IMPLEMENTATION */}
      <h3
        className="text-2xl font-extrabold mb-4 
                       bg-gradient-to-r from-rose-600 via-pink-500 to-orange-400 
                       text-transparent bg-clip-text"
      >
        Upgrade Membership Payment
      </h3>
      {/* Payment Account Info */}
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm space-y-2">
        <p className="font-bold text-yellow-700 mb-2">💰 Payment Accounts</p>
        <div className="flex justify-between">
          <span className="font-semibold text-pink-600">bKash:</span>
          <span className="font-mono text-gray-800">01712878794</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-green-600">Nagad:</span>
          <span className="font-mono text-gray-800">01712878794</span>
        </div>
        <div className="border-t border-yellow-200 pt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-purple-600">Bank A/C:</span>
            <span className="font-mono text-gray-800">0100243763775</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            জনতা ব্যাংক লিমিটেড — বরিশাল কর্পোরেশন শাখা, সদর রোড, বরিশাল
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 border-b pb-3">
        Fields marked with{" "}
        <span className="text-rose-500 font-semibold">*</span> are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error/Success Messages */}
        {error && (
          <p className="text-red-600 font-medium text-sm p-2 bg-red-50 rounded-lg border border-red-200">
            {error}
          </p>
        )}
        {successMsg && (
          <p className="text-green-600 font-medium text-sm p-2 bg-green-50 rounded-lg border border-green-200">
            {successMsg}
          </p>
        )}

        {/* Form Fields (Classes remain the same polished versions) */}

        {/* 1. Select Plan */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Plan <span className="text-rose-500">*</span>
          </label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-base transition duration-150 ease-in-out hover:border-gray-400"
            required
          >
            <option value="" disabled>
              -- Select a Plan --
            </option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.plan_name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Payment Method <span className="text-rose-500">*</span>
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-base transition duration-150 ease-in-out hover:border-gray-400"
            required
          >
            <option value="" disabled>
              -- Select Payment Method --
            </option>
            <option value="BKASH">BKASH</option>
            <option value="NAGAD">NAGAD</option>
            <option value="BANK">BANK TRANSFER</option>
          </select>
        </div>

        {/* 3. Transaction ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Transaction ID <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., KDS87A9A2Z"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-base transition duration-150 ease-in-out hover:border-gray-400"
            required
          />
        </div>

        {/* 4. Sender Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Sender Name
          </label>
          <input
            type="text"
            placeholder="Optional (e.g., John Doe)"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-base transition duration-150 ease-in-out hover:border-gray-400"
          />
        </div>

        {/* 5. Sender Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Sender Phone
          </label>
          <input
            type="text"
            placeholder="Optional (e.g., 01XXXXXXXXX)"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-base transition duration-150 ease-in-out hover:border-gray-400"
          />
        </div>

        {/* 6. Screenshot (File Input) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Proof of Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200 cursor-pointer"
          />
          <p className="mt-1 text-xs text-gray-500">
            Accepted formats: PNG, JPEG, JPG (Max size 5MB recommended)
          </p>
        </div>

        {/* Submit Button - Using the custom Button component */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="default" // Assuming 'default' gives the primary rose/red color
            size="lg" // Larger size for prominence
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700" // Override primary color if needed
          >
            {loading ? "Submitting..." : "Confirm & Submit Payment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
