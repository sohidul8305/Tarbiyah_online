import React, { useState } from "react";
import diplomabanner from "../../image/Course-Thumb.png";
import diplomacover from "../../image/diplomacover.png";
import { Link } from "react-router";
import { useLanguage } from "../../context/useLanguage";
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

  // ভাষা কন্টেক্সট নিরাপদ ব্যবহার
  const languageContext = useLanguage();
  const language = languageContext ? languageContext.language : "en";

  // শুধুমাত্র title ও subtitle সহ ডিপ্লোমা কোর্স ডাটা (ভাষা অনুযায়ী পরিবর্তনশীল)
  const diplomaCourse = {
    id: 1,
    image: diplomabanner,
    title:
      language === "bn"
        ? "ডিপ্লোমা ইন ইসলামিক স্টাডিজ"
        : "Diploma in Islamic Studies",
    subtitle:
      language === "bn"
        ? "২ বছরের পূর্ণাঙ্গ ইসলামিক স্টাডিজ প্রোগ্রাম"
        : "2-Year Comprehensive Islamic Studies Program",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce text-center">
              {language === "bn" ? (
                <>
                  ভর্তি চলছে <br /> সীমিত আসন
                </>
              ) : (
                <>
                  Admission <br /> Ongoing
                </>
              )}
            </span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src={diplomacover}
                  alt="Islamic Studies Banner"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                    <FaPlay className="text-black text-2xl sm:text-3xl ml-1" />
                  </div>
                </div>
                <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <FaUsers className="text-yellow-500" />
                  <span className="font-bold">1,200+</span>
                  <span className="text-sm">
                    {language === "bn" ? "ছাত্র" : "Students"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2"></div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
                  {language === "bn" ? "ডিপ্লোমা ইন" : "Diploma in"} <br />
                  <span className="text-yellow-400 relative inline-block">
                    {language === "bn" ? "ইসলামিক স্টাডিজ" : "Islamic Studies"}
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

              <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                {language === "bn"
                  ? "আকিদা, ফিকহ, তাফসির, হাদিস, সিরাহসহ ইসলামি জ্ঞানের বিভিন্ন শাখায় সুসংগঠিত উচ্চতর শিক্ষা।"
                  : "Structured higher education in various branches of Islamic knowledge including Aqeedah, Fiqh, Tafseer, Hadith, and Seerah."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-xl sm:text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {language === "bn" ? "রেটিং" : "Rating"}
                  </p>
                  <p className="text-sm font-bold">
                    {language === "bn" ? "৪.৯ (৫)" : "4.9 (5)"}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaLaptop className="text-yellow-400 text-xl sm:text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {language === "bn" ? "ক্লাস" : "Classes"}
                  </p>
                  <p className="text-sm font-bold">
                    {language === "bn" ? "লাইভ" : "Live"}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-xl sm:text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {language === "bn" ? "সার্টিফিকেট" : "Certificate"}
                  </p>
                  <p className="text-sm font-bold">
                    {language === "bn" ? "ভেরিফাইড" : "Verified"}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-xl sm:text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {language === "bn" ? "ছাত্র" : "Students"}
                  </p>
                  <p className="text-sm font-bold">
                    {language === "bn" ? "১২০০+" : "1200+"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Course Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002b2b] mb-3">
              {language === "bn" ? "আমাদের কোর্স সমূহ" : "Our Courses"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {language === "bn"
                ? "দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম"
                : "Reliable online platform for acquiring Islamic knowledge"}
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
              </div>

              {/* Card Body - Title, Subtitle and Details Button */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#002b2b]">
                    {diplomaCourse.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {diplomaCourse.subtitle}
                  </p>
                </div>

                {/* Button Footer */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-end">
                  <Link to="/course/diploma/details">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-md">
                      <span>{language === "bn" ? "বিস্তারিত" : "Details"}</span>
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
