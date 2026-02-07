"use client";
import { MessageCircle, Shield, Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const [searchData, setSearchData] = useState({
    lookingFor: "",
    ageFrom: "",
    ageTo: "",
    religion: "",
    marital_status: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      gender: searchData.lookingFor,
      age_from: searchData.ageFrom,
      age_to: searchData.ageTo,
      religion: searchData.religion,
      marital_status: searchData.marital_status,
    }).toString();

    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (!accessToken) {
      const redirectUrl = encodeURIComponent(`/user/search?${query}`);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    router.push(`/user/search?${query}`);
  };

  const ageOptions = Array.from({ length: 43 }, (_, i) => i + 18);

  return (
    <section
      id="home"
      className="min-h-screen pt-16 relative flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto pb-10 md:pb-0">
        <div className="text-center mb-8 mt-24 md:mt-0 p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Most Trusted Matrimony Service
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in">
            For NRIs in Bangladesh
          </p>
          <p className="text-lg text-white/80 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            Find your perfect life partner with our trusted platform. Join
            thousands of successful couples who found love through our
            comprehensive matchmaking service with verified profiles and
            personalized support.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">2M+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">100% Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Safe & Secure</span>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="px-4 md:px-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 w-full backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 relative z-30"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
              {/* Looking For */}
              <div className="relative flex-1">
                <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Looking For
                </label>
                <div className="relative">
                  <select
                    value={searchData.lookingFor}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        lookingFor: e.target.value,
                      })
                    }
                    className="w-full h-16 px-4 pr-10 bg-white/15 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-medium shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:border-pink-400 focus:outline-none appearance-none"
                  >
                    <option className="bg-white border-b text-gray-800">
                      Gender
                    </option>
                    <option value="male" className="bg-gray-800">
                      Male
                    </option>
                    <option value="female" className="bg-gray-800">
                      Female
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Age From */}
              <div className="relative flex-1">
                <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Age From
                </label>
                <select
                  value={searchData.ageFrom}
                  onChange={(e) =>
                    setSearchData({ ...searchData, ageFrom: e.target.value })
                  }
                  className="w-full h-16 px-4 pr-10 bg-white/15 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-medium shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:border-blue-400 focus:outline-none appearance-none"
                >
                  <option className="bg-white border-b text-gray-800">
                    Min Age
                  </option>
                  {ageOptions.map((age) => (
                    <option
                      key={`from-${age}`}
                      value={age}
                      className="bg-gray-800"
                    >
                      {age} years
                    </option>
                  ))}
                </select>
              </div>

              {/* Age To */}
              <div className="relative flex-1">
                <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Age To
                </label>
                <select
                  value={searchData.ageTo}
                  onChange={(e) =>
                    setSearchData({ ...searchData, ageTo: e.target.value })
                  }
                  className="w-full h-16 px-4 pr-10 bg-white/15 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-medium shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:border-green-400 focus:outline-none appearance-none"
                >
                  <option className="bg-white border-b text-gray-800">
                    Max Age
                  </option>
                  {ageOptions.map((age) => (
                    <option key={`to-${age}`} value={age} className="bg-gray-800">
                      {age} years
                    </option>
                  ))}
                </select>
              </div>

              {/* Religion */}
              <div className="relative flex-1">
                <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Religion
                </label>
                <select
                  value={searchData.religion}
                  onChange={(e) =>
                    setSearchData({ ...searchData, religion: e.target.value })
                  }
                  className="w-full h-16 px-4 pr-10 bg-white/15 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-medium shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:border-purple-400 focus:outline-none appearance-none"
                >
                  <option className="bg-white border-b text-gray-800">
                    Religion
                  </option>
                  <option value="islam" className="bg-gray-800">
                    Islam
                  </option>
                  <option value="hinduism" className="bg-gray-800">
                    Hinduism
                  </option>
                  <option value="christianity" className="bg-gray-800">
                    Christianity
                  </option>
                  <option value="buddhism" className="bg-gray-800">
                    Buddhism
                  </option>
                  <option value="other" className="bg-gray-800">
                    Other
                  </option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="relative flex-1">
                <label className="block text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Marital Status
                </label>
                <select
                  value={searchData.marital_status}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      marital_status: e.target.value,
                    })
                  }
                  className="w-full h-16 px-4 pr-10 bg-white/15 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-medium shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:border-orange-400 focus:outline-none appearance-none"
                >
                  <option className="bg-white border-b text-gray-800">
                    Select
                  </option>
                  <option value="UnMarried" className="bg-gray-800">
                    UnMarried
                  </option>
                  <option value="Married" className="bg-gray-800">
                    Married
                  </option>
                  <option value="Divorced" className="bg-gray-800">
                    Divorced
                  </option>
                  <option value="Widowed" className="bg-gray-800">
                    Widowed
                  </option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="h-16 w-full bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 text-white px-6 py-2 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="text-white animate-fade-in">
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-white/80">Happy Couples</div>
          </div>
          <div className="text-white animate-fade-in">
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              2M+
            </div>
            <div className="text-white/80">Registered Users</div>
          </div>
          <div className="text-white animate-fade-in">
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              15+
            </div>
            <div className="text-white/80">Years of Trust</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
