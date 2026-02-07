"use client";

import AlertModal from "@/components/share/AlertModal";
import PaymentFlowModal from "@/components/ui/home/PaymentFlowModal";
import { Check, Crown, Gem, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Plan {
  id: number;
  plan_name: string;
  price: string;
  duration: string;
  popular: boolean;
  button_text: string;
  features: string[];
}

const iconMap: Record<string, any> = {
  Basics: Star,
  Premium: Crown,
  Elite: Gem,
  VIP: Crown,
};

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans/public");
        const data = await res.json();
        if (data.success) setPlans(data.plans);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setShowPayment(true);  // Show payment modal
      setShowAlert(false);
    } else {
      setShowAlert(true);    // Show alert modal
      setShowPayment(false);
    }
  };

  const handleSignUpAction = () => {
    window.location.href = "/register";
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setSelectedPlan(null);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <p className="text-white text-xl">Loading plans...</p>
      </div>
    );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find the plan that suits your needs and start your journey to
            finding true love
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const PlanIcon = iconMap[plan.plan_name] || Star;
            return (
              <div
                key={plan.id}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular
                    ? "border-red-500 bg-white/15"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full mb-4">
                    <PlanIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.plan_name}
                  </h3>
                  <div className="text-white/80">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.price.toLowerCase() !== "free" && (
                      <span className="text-sm">/{plan.duration}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                      : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                  }`}
                >
                  {plan.button_text}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/80 text-lg">
            All plans include our satisfaction guarantee. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Modals */}
      {selectedPlan && showPayment && (
        <PaymentFlowModal plan={selectedPlan} onClose={handleClosePayment} />
      )}

      <AlertModal
        isOpen={showAlert}
        onClose={handleCloseAlert}
        title="Create Account First"
        message={`To purchase the ${selectedPlan?.plan_name} membership, please create a free account first. After signing up and logging in, you can go to the payment section in your dashboard to purchase your preferred membership plan.`}
        actionLabel="Sign Up Now"
        onAction={handleSignUpAction}
      />
    </section>
  );
}
