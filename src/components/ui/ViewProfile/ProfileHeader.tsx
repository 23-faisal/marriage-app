"use client";

import { MessageSquare, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import AlertModal from "@/components/share/AlertModal";
import ChatModal from "@/components/share/ChatModal";
import ConfirmPhoneModal from "@/components/share/ConfirmPhoneModal";
import PaymentFlowModal from "@/components/ui/home/PaymentFlowModal";
import { ProfileData } from "@/types";
import { trackPhoneRequest } from "@/utils/api/trackPhoneRequest";

interface ProfileHeaderProps {
  profile: ProfileData;
  primaryPhotoUrl: string;
  age: string;
  phoneNumber: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  primaryPhotoUrl,
  age,
  phoneNumber,
}) => {
  const router = useRouter();

  // Modal states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    actionLabel: "",
  });
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Phone stats
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [alreadyViewed, setAlreadyViewed] = useState<boolean>(false);

  // Visible phone & loading
  const [visiblePhone, setVisiblePhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // User plan
  const [userPlan, setUserPlan] = useState<string>("");

  // Stats fetching loader
  const [fetchingStats, setFetchingStats] = useState(true);

  // Load user plan from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserPlan(parsed?.plan?.plan_name || "");
      } catch {}
    }
  }, []);

  // Auto-fetch phone stats on component load
  useEffect(() => {
    const fetchStats = async () => {
      setFetchingStats(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Unauthorized");

        const res = await fetch(
          `/api/phone/stats?viewed_user_id=${profile.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          setCurrentCount(data.current_count ?? 0);
          setLimit(data.limit ?? 0);
          setRemaining(
            Math.max(0, (data.limit ?? 0) - (data.current_count ?? 0)),
          );
          setAlreadyViewed(data.already_viewed ?? false);
        } else {
          console.error("Stats fetch failed:", data.message);
        }
      } catch (err) {
        console.error("Fetch stats error:", err);
      } finally {
        setFetchingStats(false);
      }
    };

    fetchStats();
  }, [profile.user_id]);

  // Reveal phone temporarily
  const revealPhoneTemporarily = () => {
    setVisiblePhone(phoneNumber);
    setTimeout(() => setVisiblePhone(null), 60_000);
  };

  // Handle "Get Phone Number" click
  const openConfirm = () => {
    if (userPlan === "Basics") {
      setAlertData({
        title: "Upgrade Required",
        message: "You're on the Basics plan. Upgrade to view phone numbers.",
        actionLabel: "View Plans",
      });
      setAlertOpen(true);
      return;
    }

    if (alreadyViewed) {
      revealPhoneTemporarily();
      return;
    }

    if (remaining <= 0) {
      setAlertData({
        title: "Limit Reached",
        message: "You have no remaining phone views this month.",
        actionLabel: "Upgrade Plan",
      });
      setAlertOpen(true);
      return;
    }

    setConfirmOpen(true);
  };

  // Confirm phone view
  const onConfirmView = async () => {
    setConfirmOpen(false);
    setLoading(true);

    try {
      const res = await trackPhoneRequest(profile.user_id);
      console.log("trackPhoneRequest response:", res);

      if (!res.success && res.allowed === false) {
        setAlertData({
          title: "Limit Reached",
          message: `You have reached your limit of ${res.limit} phone views.`,
          actionLabel: "Upgrade Plan",
        });
        setAlertOpen(true);
        return;
      }

      if (res.success && res.allowed === true) {
        revealPhoneTemporarily();
        setCurrentCount(res.current_count ?? currentCount);
        setLimit(res.limit ?? limit);
        setRemaining(
          Math.max(
            0,
            (res.limit ?? limit) - (res.current_count ?? currentCount),
          ),
        );
        setAlreadyViewed(true);
      } else {
        setAlertData({
          title: "Error",
          message: res.message || "Unable to view number",
          actionLabel: "OK",
        });
        setAlertOpen(true);
      }
    } catch (err) {
      console.error("trackPhoneRequest error:", err);
      setAlertData({
        title: "Error",
        message: "Network error",
        actionLabel: "OK",
      });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Chat modal handler
  const handleChat = () => {
    if (userPlan === "Basics") {
      setAlertData({
        title: "Upgrade Required",
        message: "You need to upgrade to start chatting.",
        actionLabel: "View Plans",
      });
      setAlertOpen(true);
      return;
    }
    setChatModalOpen(true);
  };

  // Alert modal action
  const handleAlertAction = () => {
    setAlertOpen(false);
    setPaymentModalOpen(true);
  };

  const name = profile?.user?.name || "Unknown User";
  const profession = profile?.career?.profession || "Not Specified";
  const bio = profile?.bio?.trim() || "No bio provided yet.";
  const userId = profile?.user_id || 0;

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-10">
        {/* Full-header loader overlay */}
        {fetchingStats && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="p-8 sm:p-10 bg-gradient-to-br from-rose-100 to-orange-200 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0 transform hover:scale-[1.05] transition duration-300">
            <img
              src={primaryPhotoUrl}
              alt={name}
              className="rounded-full object-cover border-4 border-rose-600 shadow-2xl w-full h-full"
            />
          
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {name}
              <span className="ml-3 inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full align-middle">
                Verified 
              </span>
            </h1>

            <p className="text-2xl text-rose-700 font-bold mt-2">
              {profession} | {age || "N/A"} Years Old
            </p>

            <p className="text-gray-600 mt-3 italic max-w-xl mx-auto md:mx-0 text-lg">
              "{bio.substring(0, 150)}
              {bio.length > 150 ? "..." : ""}"
            </p>

            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button
                onClick={openConfirm}
                disabled={loading}
                className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition shadow-xl"
              >
                <Phone size={20} />
                <span className="font-semibold">
                  {visiblePhone || "Get Phone Number"}
                </span>
              </button>

              <button
                onClick={handleChat}
                className="flex items-center gap-2 border border-orange-500 text-orange-600 bg-white px-6 py-3 rounded-full hover:bg-orange-50 transition shadow-lg"
              >
                <MessageSquare size={20} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Phone Modal */}
      <ConfirmPhoneModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirmView}
        remaining={remaining ?? 0}
        willRemain={Math.max(0, (remaining ?? 1) - 1)}
        viewedName={name}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertData.title}
        message={alertData.message}
        actionLabel={alertData.actionLabel}
        onAction={handleAlertAction}
      />

      {/* Payment Flow Modal */}
      {paymentModalOpen && (
        <PaymentFlowModal
          plan={{ id: 2, plan_name: "Premium", price: "$9.99" }}
          onClose={() => setPaymentModalOpen(false)}
        />
      )}

      {/* Chat Modal */}
      {chatModalOpen && (
        <ChatModal
          onClose={() => setChatModalOpen(false)}
          receiverId={userId}
        />
      )}
    </>
  );
};

export default ProfileHeader;
