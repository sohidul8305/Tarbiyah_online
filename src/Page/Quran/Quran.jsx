import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Quranforeldersbanner from "../../image/Quranforeldersbanner.jpg";
import Adalthifzbanner from "../../image/adalthifzbanner.jpg";
import adaltsbannerImg from "../../image/tajweedbanner - Copy.png";
import AdvancedtajweedImg from "../../image/tajweedbanner - Copy.png";
import Qurannajeracover from "../../image/najeracover.jpg";
import Quidanuraniyah from "../../image/quidanuraniyahcover.png";
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
  FaUserTie,
  FaBook,
  FaPen,
  FaMemory,
  FaSync,
  FaSmile,
  FaUserPlus,
} from "react-icons/fa";
import QuraneldersImg from "../../image/quranforelders (2).jpg";

// Language Hook
export const useLanguage = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "bn",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "bn");
    };

    window.addEventListener("languageChange", handleStorageChange);
    return () => {
      window.removeEventListener("languageChange", handleStorageChange);
    };
  }, []);

  const t = (translations) => {
    return translations[language] || translations["bn"];
  };

  const switchLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
    window.dispatchEvent(new Event("languageChange"));
  };

  return { language, t, switchLanguage };
};

const Quran = () => {
  const { language, switchLanguage, t } = useLanguage();

  // Text content (Bengali & English)
  const content = {
    badge: { bn: "ভর্তি চলছে সীমিত আসন", en: "Admissions Open Limited Seats" },
    titlePart1: { bn: "কুরআন ফর", en: "Quran for" },
    titlePart2: { bn: "এল্ডার্স", en: "Elders" },
    description: {
      bn: "সময়, বয়স ও ব্যস্ততার সীমাবদ্ধতা পেরিয়ে প্রাপ্তবয়স্কদের জন্য আধুনিক অনলাইন কুরআন শিক্ষা। কায়দা, তাজউইদ, নাজেরা ও হিফজ শেখার বিশ্বস্ত প্ল্যাটফর্ম।",
      en: "Modern online Quran education for adults overcoming time, age, and busy schedules. A trusted platform to learn Qaida, Tajweed, Nazera, and Hifz.",
    },
    statsLive: { bn: "ক্লাস", en: "Classes" },
    statsLiveVal: { bn: "লাইভ", en: "Live" },
    statsStudents: { bn: "ছাত্র", en: "Students" },
    statsStudentsVal: { bn: "১,৪০০+", en: "1,400+" },
    statsCert: { bn: "সার্টিফিকেট", en: "Certificate" },
    statsCertVal: { bn: "ভেরিফাইড", en: "Verified" },
    statsRating: { bn: "রেটিং", en: "Rating" },
    statsRatingVal: { bn: "৪.৯/৫", en: "4.9/5" },
    coursesTitle: { bn: "আমাদের", en: "Our" },
    coursesTitleHighlight: { bn: "কোর্সসমূহ", en: "Courses" },
    coursesSubtitle: {
      bn: "দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম",
      en: "Reliable online platform for acquiring religious knowledge",
    },
    detailsBtn: { bn: "বিস্তারিত", en: "Details" },
    whyTitle: { bn: "কেন", en: "Why" },
    whyTitleHighlight: { bn: "আমাদের", en: "Choose Us?" },
    whySubtitle: {
      bn: "প্রবীণদের জন্য বিশেষ যত্ন ও ধৈর্যশীল শিক্ষাপদ্ধতি",
      en: "Special care and patient teaching methods for elders",
    },
  };

  // Courses (with custom link for "Bakarah Hifz")
  const courses = [
    {
      id: "elders-quida",
      title: { bn: "কায়দায়ে নূরানিয়্যাহ", en: "Qaida Nuraniyah" },
      subtitle: {
        bn: "সহি কুরআন শিক্ষার প্রথম ধাপ।",
        en: "First step to correct Quran learning.",
      },
      image: Quidanuraniyah,
    },
    {
      id: "elders-nazera",
      title: { bn: "কুরআন নাজেরা", en: "Quran Nazera" },
      subtitle: {
        bn: "তারতীলের সাথে সাবলীল কুরআন তিলাওয়াত।",
        en: "Fluent Quran recitation with Tartil.",
      },
      image: Qurannajeracover,
    },
    {
      id: "elders-hifz",
      title: { bn: "বাকারা হিফজ ", en: "Bakarah Hifz" },
      subtitle: {
        bn: "নিয়মিত মাশকের মাধ্যমে ধাপে ধাপে সম্পূর্ণ বাকারা হিফজ প্রোগ্রাম।",
        en: "Step-by-step complete Surah Al-Baqarah through regular practice.",
      },
      image: Adalthifzbanner,
      link: "/course/Albakarah/details", // Custom route for Bakarah Hifz
    },
    {
      id: "elders-tajweed",
      title: { bn: "বেসিক তাজউইদ (লেভেল–১)", en: "Basic Tajweed (Level-1)" },
      subtitle: {
        bn: "শুদ্ধ মাখরাজ ও তাজউইদের নিয়ম সহজভাবে শেখা।",
        en: "Easy learning of correct Makhraj and Tajweed rules.",
      },
      image: adaltsbannerImg,
    },
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: <FaUserTie />,
      title: { bn: "অভিজ্ঞ শিক্ষক", en: "Experienced Teachers" },
      desc: {
        bn: "প্রবীণদের জন্য বিশেষ প্রশিক্ষিত শিক্ষক",
        en: "Specially trained teachers for elders",
      },
    },
    {
      icon: <FaHeart />,
      title: { bn: "ধৈর্য ও মমতা", en: "Patience & Care" },
      desc: {
        bn: "অত্যন্ত ধীর ও সাবলীল পদ্ধতি",
        en: "Extremely patient and fluent method",
      },
    },
    {
      icon: <FaHands />,
      title: { bn: "ব্যক্তিগত যত্ন", en: "Personal Attention" },
      desc: {
        bn: "এক-একজন শিক্ষার্থীর জন্য বিশেষ মনোযোগ",
        en: "Special attention for each individual student",
      },
    },
    {
      icon: <FaShieldAlt />,
      title: { bn: "নিরাপদ পরিবেশ", en: "Secure Environment" },
      desc: {
        bn: "১০০% সম্মানজনক অনলাইন ক্লাস",
        en: "100% respectful online classes",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl w-full max-w-md lg:max-w-none">
                <img
                  src={QuraneldersImg}
                  alt="Quran for Elders Banner"
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="space-y-3 flex flex-col items-center lg:items-start">
                <span className="inline-block bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-400/30">
                  {t(content.badge)}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {t(content.titlePart1)} <br />
                  <span className="text-yellow-400 relative inline-block mt-1">
                    {t(content.titlePart2)}
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

              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t(content.description)}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaBook className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t(content.statsLive)}
                  </p>
                  <p className="text-sm font-bold">{t(content.statsLiveVal)}</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t(content.statsStudents)}
                  </p>
                  <p className="text-sm font-bold">
                    {t(content.statsStudentsVal)}
                  </p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t(content.statsCert)}
                  </p>
                  <p className="text-sm font-bold">{t(content.statsCertVal)}</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">
                    {t(content.statsRating)}
                  </p>
                  <p className="text-sm font-bold">
                    {t(content.statsRatingVal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              {t(content.coursesTitle)}{" "}
              <span className="text-yellow-500">
                {t(content.coursesTitleHighlight)}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              {t(content.coursesSubtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => {
              // Determine the link: use custom link if provided, else fallback to default
              const linkTo = course.link || `/course/quran/${course.id}`;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={course.image}
                      alt={t(course.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#002b2b] mb-2">
                        {t(course.title)}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {t(course.subtitle)}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
                      <Link to={linkTo}>
                        <button className="bg-[#002b2b] text-white font-bold px-4 py-2 rounded-full hover:bg-[#003d3d] transition-all transform hover:scale-105 flex items-center gap-1 text-xs cursor-pointer">
                          <span>{t(content.detailsBtn)}</span>
                          <FaArrowRight className="text-[10px]" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
