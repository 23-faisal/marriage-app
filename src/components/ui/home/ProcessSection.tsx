import { CreditCard, MessageCircle, UserPlus } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign up with Email",
      description: "Register for yourself or your close one",
      features: [
        "Register for yourself or your close one",
        "Give your full information",
        "Complete each step carefully",
      ],
    },
    {
      icon: CreditCard,
      title: "Become a premium member",
      description: "Pay via card and bKash",
      features: [
        "Pay via card and bKash",
        "Search bride/groom",
        "Send request to see full bio-data",
      ],
    },
    {
      icon: MessageCircle,
      title: "Communicate and marry",
      description: "Send communication request",
      features: [
        "Send communication request",
        "Send message",
        "Meet and get married",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to find your perfect life partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              <div className="space-y-3">
                {step.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
