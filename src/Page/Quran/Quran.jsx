import React from "react";
import { Link } from "react-router";
import Quranforeldersbanner from "../../image/Quranforeldersbanner.jpg";
// import Najeraadlatsbanner from "../../image/Najeraadlatsbanner.png";
import Adalthifzbanner from "../../image/adalthifzbanner.jpg";
import adaltsbannerImg from "../../image/tajweedbanner - Copy.png";
import AdvancedtajweedImg from "../../image/tajweedbanner - Copy.png";
import Qurannajeracover from "../../image/najeracover.jpg";
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
import QuraneldersImg from "../../image/quraneldars.jpg";

const Quran = () => {
  // কোর্সের তথ্য
  const courses = [
    {
      id: "elders-quida",
      title: "কায়দায়ে নূরানিয়্যাহ",
      subtitle: "সহি কুরআন শিক্ষার প্রথম ধাপ।",
      image: Quranforeldersbanner,
    },
    {
      id: "elders-nazera",
      title: "কুরআন নাজেরা",
      subtitle: "তারতীলের সাথে সাবলীল কুরআন তিলাওয়াত।",
      image: Qurannajeracover,
    },
    {
      id: "elders-hifz",
      title: "হিফজুল কুরআন",
      subtitle:
        "নিয়মিত মাশকের মাধ্যমে ধাপে ধাপে সম্পূর্ণ কুরআন মুখস্থ করার প্রোগ্রাম।",
      image: Adalthifzbanner,
    },
    {
      id: "elders-tajweed",
      title: "বেসিক তাজউইদ (লেভেল–১)",
      subtitle: "শুদ্ধ মাখরাজ ও তাজউইদের নিয়ম সহজভাবে শেখা।",
      image: adaltsbannerImg,
    },
    {
      id: "elders-advanced-tajweed",
      title: "অ্যাডভান্সড তাজউইদ",
      subtitle: "তাজউইদের গভীর নিয়মে ধাপে ধাপে দক্ষতা অর্জন",
      image: AdvancedtajweedImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src={QuraneldersImg}
                  alt="Quran for Elders Banner"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <span className="inline-block ml-80 mr-90 bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-400/30">
                  ভর্তি চলছে <br></br>সীমিত আসন
                </span>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  কুরআন ফর <br />
                  <span className="text-yellow-400 relative">
                    এল্ডার্স
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
                সময়, বয়স ও ব্যস্ততার সীমাবদ্ধতা পেরিয়ে প্রাপ্তবয়স্কদের জন্য
                আধুনিক অনলাইন কুরআন শিক্ষা। কায়দা, তাজউইদ, নাজেরা ও হিফজ শেখার
                বিশ্বস্ত প্ল্যাটফর্ম।
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaBook className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">লাইভ</p>
                  <p className="text-sm font-bold">ক্লাস</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
                  <p className="text-sm font-bold">১,৪০০+</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সার্টিফিকেট</p>
                  <p className="text-sm font-bold">ভেরিফাইড</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">রেটিং</p>
                  <p className="text-sm font-bold">৪.৯/৫</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              আমাদের <span className="text-yellow-500">কোর্সসমূহ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              দ্বীনি ইলম অর্জনের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#002b2b] mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
                    <Link to={`/course/quran/${course.id}`}>
                      <button className="bg-[#002b2b] text-white font-bold px-4 py-2 rounded-full hover:bg-[#003d3d] transition-all transform hover:scale-105 flex items-center gap-1 text-xs">
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

        {/* Why Choose Section */}
        <div className="mt-16 bg-gradient-to-br from-[#002b2b] to-[#004d4d] rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">
              কেন <span className="text-yellow-400">আমাদের</span> বেছে নেবেন?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              প্রবীণদের জন্য বিশেষ যত্ন ও ধৈর্যশীল শিক্ষাপদ্ধতি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserTie />,
                title: "অভিজ্ঞ শিক্ষক",
                desc: "প্রবীণদের জন্য বিশেষ প্রশিক্ষিত শিক্ষক",
              },
              {
                icon: <FaHeart />,
                title: "ধৈর্য ও মমতা",
                desc: "অত্যন্ত ধীর ও সাবলীল পদ্ধতি",
              },
              {
                icon: <FaHands />,
                title: "ব্যক্তিগত যত্ন",
                desc: "এক-একজন শিক্ষার্থীর জন্য বিশেষ মনোযোগ",
              },
              {
                icon: <FaShieldAlt />,
                title: "নিরাপদ পরিবেশ",
                desc: "১০০% সম্মানজনক অনলাইন ক্লাস",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-4xl text-yellow-400 mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
