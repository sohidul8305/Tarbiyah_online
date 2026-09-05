import React from "react";
import { Link } from "react-router";
import KidsImg from "../../image/kids.jpg";
import NuraniyaCourseImg from "../../image/nuranicourse.jpg";
import NuraniyaBannerIMG from "../../image/nuranibanner.jpg";
import NazerakidsImg from "../../image/Thumb.jpg";
import HifjulBannerImg from "../../image/hifjulbanner.png";
import courseImg from "../../image/hifzthumbal.jpg";
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
  FaChild,
  FaBook,
  FaPen,
  FaMemory,
  FaSync,
  FaUserTie,
  FaSmile,
  FaPaintBrush,
} from "react-icons/fa";

const Kids = () => {
  // কোর্সের তথ্য
  const courses = [
    {
      id: "quida-nurani",
      title: "কায়দা নুরানী",
      subtitle: "শিশুদের কুরআন শিক্ষার প্রথম ধাপ।",
      image: NuraniyaBannerIMG,
    },
    {
      id: "nazera",
      title: "নাজেরা",
      subtitle: "সহি তাজউইথ ও সুন্দরভাবে কুরআন তিলাওয়াত শেখা।",
      image: NazerakidsImg,
    },
    {
      id: "hifz",
      title: "হিফজুল কুরআন",
      subtitle: "ধাপে ধাপে সম্পূর্ণ কুরআন মুখস্থ করার প্রোগ্রাম।",
      image: courseImg,
    },
    {
      id: "hifz-revision",
      title: "হিফজ রিভিশন",
      subtitle: "মুখস্থ কুরআনকে দৃঢ় ও নির্ভুল রাখার নিয়মিত অনুশীলন",
      image: KidsImg,
    },
    {
      id: "one-to-one",
      title: "ওয়ান টু ওয়ান",
      subtitle: "ফ্লেক্সিবল সময়ে পার্সোনালাইজড কুরআন লার্নিং",
      image: KidsImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 h-56 sm:h-72 bg-teal-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 sm:p-8 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
                <img
                  src={KidsImg}
                  alt="Kids Program Banner"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="space-y-3 flex flex-col items-center lg:items-start">
                <span className="inline-block bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-400/35">
                  ভর্তি চলছে <br /> সীমিত আসন
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  তারবিয়াহ <br />
                  <span className="text-yellow-300 relative inline-block mt-1">
                    কুরআন স্টাডিজ
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

              <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
                শিশুদের জন্য আনন্দময়, সহায়ক ও কিডস ফেন্ডলি পরিবেশে বিশুদ্ধ
                তিলাওয়াত, তাজউথদ, নাজেরা ও হিফজ শিক্ষার বিশ্বস্ত প্ল্যাটফর্ম।
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaBook className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">লাইভ</p>
                  <p className="text-sm font-bold">ক্লাস</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
                  <p className="text-sm font-bold">৪,০০০+</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সার্টিফিকেট</p>
                  <p className="text-sm font-bold">ভেরিফাইড</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">রেটিং</p>
                  <p className="text-sm font-bold">৪.৯/৫</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-3">
              আমাদের <span className="text-yellow-500">কোর্সসমূহ</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Course Image - Fixed with object-contain or matching background */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-900 flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-teal-800 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
                    <Link to={`/course/kids/${course.id}`}>
                      <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold px-4 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-1 text-xs">
                        <span>বিস্তারিত</span>
                        <FaArrowRight className="text-[10px]" />
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

export default Kids;
