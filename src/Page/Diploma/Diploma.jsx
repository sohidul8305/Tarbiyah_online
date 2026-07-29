import React, { useState } from "react";
import diplomaImg from "../../image/diploma.jpg";
import { Link } from "react-router";
import {
  FaCheckCircle,
  FaClock,
  FaLaptop,
  FaAward,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaGraduationCap,
  FaVideo,
  FaFileAlt,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock as FaTime,
  FaCertificate,
  FaGlobe,
  FaMobileAlt,
  FaHeadset,
  FaShieldAlt,
  FaPlay,
  FaUserTie,
  FaComments,
  FaBook,
  FaQuran,
  FaMosque,
} from "react-icons/fa";

const Diploma = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // শুধুমাত্র title ও subtitle সহ ডিপ্লোমা কোর্স ডাটা
  const diplomaCourse = {
    id: 1,
    image:
      "https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg",
    topBadge: "Islamic Diploma",
    title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    subtitle:
      "কুরআন, সুন্নাহ এবং শরীয়াহর মৌলিক জ্ঞান অর্জনের মাধ্যমে পূর্ণাঙ্গ ইসলামিক শিক্ষা।",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
              🔥 Limited Offer
            </span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ 4.9/5 Rating
            </span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src="https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg"
                  alt="Islamic Studies Banner"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                    <FaPlay className="text-black text-3xl ml-1" />
                  </div>
                </div>
                <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <FaUsers className="text-yellow-500" />
                  <span className="font-bold">1,200+</span>
                  <span className="text-sm">ছাত্র</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-500/30">
                    🎓 প্রফেশনাল ডিপ্লোমা
                  </span>
                  <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-500/30">
                    📚 ১২ মাসের কোর্স
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  ডিপ্লোমা ইন <br />
                  <span className="text-yellow-400 relative">
                    ইসলামিক স্টাডিজ
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-2"
                      viewBox="0 0 200 10"
                    >
                      <path
                        d="M0 5 Q50 10 100 5 T200 5"
                        stroke="#FBBF24"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>
              </div>

              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                ইসলামিক জ্ঞান অর্জনের একটি পূর্ণাঙ্গ এবং পরিকল্পিত কোর্স। কুরআন,
                সুন্নাহ এবং শরীয়াহর মৌলিক জ্ঞান অর্জনের মাধ্যমে নিজেকে গড়ে
                তুলুন।
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">রেটিং</p>
                  <p className="text-sm font-bold">৪.৯ (৫)</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaLaptop className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ক্লাস</p>
                  <p className="text-sm font-bold">লাইভ</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সার্টিফিকেট</p>
                  <p className="text-sm font-bold">ভেরিফাইড</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
                  <p className="text-sm font-bold">১২০০+</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/course/diploma/details">
                  <button className="group relative bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3">
                    <span>কোর্স ডিটেইলস</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
                <Link to="/course/diploma/enroll">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 border border-white/20 flex items-center gap-3">
                    <span>এনরোল করুন</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Course Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              আমাদের কোর্স
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আপনার ইসলামিক জ্ঞান অর্জনের যাত্রা শুরু করুন সঠিক কোর্সের মাধ্যমে
            </p>
          </div>

          {/* Single Course Card Display */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
              {/* Top Image Banner with Overlays */}
              <div className="relative h-48 w-full">
                <img
                  src={diplomaCourse.image}
                  alt={diplomaCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white text-xs font-semibold">
                  <span className="flex items-center gap-1 drop-shadow">
                    {diplomaCourse.topBadge}{" "}
                    <FaStar className="text-yellow-400 inline" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">
                    {diplomaCourse.title}
                  </h3>
                </div>
              </div>

              {/* Card Body with Only Subtitle and Details Button */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {diplomaCourse.subtitle}
                  </p>
                </div>

                {/* Button Footer */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-end">
                  <Link to="/course/diploma/details">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-md">
                      <span>বিস্তারিত</span>
                      <FaArrowRight className="text-xs" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diploma;
