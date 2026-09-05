import React from "react";
import alemiyahbanner from "../../image/alemiyahkidsbanner.png";
import alemiaImg from "../../image/Coursecover.png";
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
  FaChild,
  FaMosque,
  FaQuran,
  FaHands,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaUserGraduate,
  FaCalendarAlt,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

// --- Language Hook (copied from DiplomaDetails for consistency) ---
import { useState as useStateHook, useEffect } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useStateHook(
    () => localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChange", handleStorageChange);
    return () => {
      window.removeEventListener("languageChange", handleStorageChange);
    };
  }, []);

  const t = (translations) => {
    return translations[language] || translations["en"];
  };

  return { language, t };
};
// ---------------------------------------------------------

const Alemiah = () => {
  const { t } = useLanguage();

  // Courses data with translated titles and subtitles
  const courses = [
    {
      id: "alimiyah-kids",
      title: t({
        en: "Alimiyah for Kids",
        bn: "আলিমিয়াহ ফর কিডস",
      }),
      subtitle: t({
        en: "Reliable online platform for acquiring Islamic knowledge",
        bn: "দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম",
      }),
      image: alemiyahbanner,
    },
    {
      id: "alimiyah-program",
      title: t({
        en: "Alimiyah Program",
        bn: "আলিমিয়াহ প্রোগ্রাম",
      }),
      subtitle: t({
        en: "Reliable online platform for acquiring Islamic knowledge",
        bn: "দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম",
      }),
      image: "https://i.ibb.co.com/7xnC6p7d/banner-2.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            {/* Image Container */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src={alemiaImg}
                  alt={t({
                    en: "Alemiah Program Banner",
                    bn: "আলেমিয়াহ প্রোগ্রাম ব্যানার",
                  })}
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-500/30 ml-100">
                  {t({
                    en: "Admissions Open • Limited Seats",
                    bn: "ভর্তি চলছে • সীমিত আসন",
                  })}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {t({
                    en: "Alimiyah",
                    bn: "আলেমিয়াহ",
                  })}{" "}
                  <br />
                  <span className="text-yellow-400 relative">
                    {t({
                      en: "Program",
                      bn: "প্রোগ্রাম",
                    })}
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
                {t({
                  en: "Alongside school/college studies, a structured online program to learn Qur'an, Hadith, Aqidah, Fiqh, Arabic language, Sirah, and Islamic manners.",
                  bn: "স্কুল-কলেজের পড়াশোনার পাশাপাশি কুরআন, হাদিস, আকিদা, ফিকহ, আরবি ভাষা, সিরাহ ও ইসলামি আদব শেখার একটি সুসংগঠিত অনলাইন প্রোগ্রাম",
                })}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t({ en: "Rating", bn: "রেটিং" })}
                  </p>
                  <p className="text-sm font-bold">৪.৯ (৫)</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaGraduationCap className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t({ en: "Programs", bn: "প্রোগ্রাম" })}
                  </p>
                  <p className="text-sm font-bold">
                    {t({ en: "2", bn: "২টি" })}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  </p>
                  <p className="text-sm font-bold">
                    {t({
                      en: "Alimiyah Sanad",
                      bn: "আলেমিয়াহ সনদ",
                    })}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t({ en: "Students", bn: "ছাত্র" })}
                  </p>
                  <p className="text-sm font-bold">১৩০০+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              {t({
                en: "Our Programs",
                bn: "আমাদের প্রোগ্রামসমূহ",
              })}{" "}
              <span className="text-yellow-500">
                {t({
                  en: "",
                  bn: "",
                })}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t({
                en: "Choose the right program according to your needs",
                bn: "আপনার প্রয়োজন অনুযায়ী সঠিক প্রোগ্রামটি বেছে নিন",
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Top Image Banner with Overlays */}
                <div className="relative h-48 w-full">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white text-xs font-semibold">
                    <span className="flex items-center gap-1 drop-shadow bg-yellow-500 text-black px-2.5 py-1 rounded-full font-bold">
                      {t({ en: "Top", bn: "শীর্ষ" })}{" "}
                      <FaStar className="text-black inline" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body with Only Subtitle and Details Button */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Button Footer */}
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-end">
                    <Link to={`/course/alemiah/${course.id}`}>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-md">
                        <span>{t({ en: "Details", bn: "বিস্তারিত" })}</span>
                        <FaArrowRight className="text-xs" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alemiah;
