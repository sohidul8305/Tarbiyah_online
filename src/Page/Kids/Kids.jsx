import React from "react";
import { Link } from "react-router";
import KidsImg from "../../image/kids.jpg";
import NuraniyaCourseImg from "../../image/nuranicourse.jpg";
import NuraniyaBannerIMG from "../../image/nuranibanner.jpg";
import NazeraBannerImg from "../../image/najerabanner.png";
import HifjulBannerImg from "../../image/hifjulbanner.png";
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
  // কোর্সের তথ্য (শুধুমাত্র title ও subtitle রাখা হয়েছে)
  const courses = [
    {
      id: "quida-nurani",
      title: "কায়দা নুরানী",
      subtitle: "কুরআন শেখার প্রথম ধাপ",
      image: NuraniyaBannerIMG,
    },
    {
      id: "nazera",
      title: "নাজেরা",
      subtitle: "কুরআন তিলাওয়াত প্রশিক্ষণ",
      image: NazeraBannerImg,
    },
    {
      id: "hifz",
      title: "হিফজুল কুরআন",
      subtitle: "পবিত্র কুরআন মুখস্থকরণ",
      image: HifjulBannerImg,
    },
    {
      id: "hifz-revision",
      title: "হিফজ রিভিশন",
      subtitle: "মুখস্থ কুরআন পুনর্বীক্ষণ",
      image: KidsImg,
    },
    {
      id: "one-to-one",
      title: "ওয়ান টু ওয়ান",
      subtitle: "ব্যক্তিগত কুরআন শিক্ষা",
      image: KidsImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-teal-500 via-emerald-600 to-teal-700 text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src={KidsImg}
                  alt="Kids Program Banner"
                  className="w-full max-w-[250px] h-auto object-contain rounded-xl shadow-xl"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  🕌 তারবিয়াহ কুরআন স্টাডিজ
                </div>
                <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur-sm text-teal-800 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <FaQuran className="text-emerald-600 text-xl" />
                  <span className="font-bold">৫টি কোর্স</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <span className="inline-block bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-400/30">
                  📖 কুরআন শিক্ষা প্রোগ্রাম
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  তারবিয়াহ <br />
                  <span className="text-yellow-300 relative">
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

              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                কুরআন শিক্ষার সকল স্তরের জন্য পূর্ণাঙ্গ প্রোগ্রাম। নূরানী পদ্ধতি
                থেকে শুরু করে হিফজ ও রিভিশন পর্যন্ত সবকিছু একই প্ল্যাটফর্মে।
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaBook className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">কোর্স</p>
                  <p className="text-sm font-bold">৫টি</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-300 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
                  <p className="text-sm font-bold">৪,৬০০+</p>
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
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-teal-800 mb-3">
              আমাদের <span className="text-yellow-500">কোর্সসমূহ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আপনার প্রয়োজন অনুযায়ী সঠিক কোর্সটি বেছে নিন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mt-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Content - Only Subtitle and Details Button */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="mb-4">
                    <p className="text-sm text-yellow-600 font-semibold">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="pt-3 border-t border-gray-100 flex justify-end">
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

        {/* Why Choose Section */}
        <div className="mt-16 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">
              কেন <span className="text-yellow-300">আমাদের</span> বেছে নেবেন?
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              অভিজ্ঞ শিক্ষকমণ্ডলী ও আধুনিক শিক্ষাপদ্ধতিতে তৈরি করা হয়েছে এই
              প্রোগ্রামটি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserTie />,
                title: "অভিজ্ঞ শিক্ষক",
                desc: "দক্ষ ওলামায়ে কেরামের ক্লাস",
              },
              {
                icon: <FaLaptop />,
                title: "লাইভ ক্লাস",
                desc: "প্রতিটি ক্লাস লাইভ ও রেকর্ডেড",
              },
              {
                icon: <FaHands />,
                title: "ব্যক্তিগত যত্ন",
                desc: "প্রতিটি শিক্ষার্থীর জন্য বিশেষ মনোযোগ",
              },
              {
                icon: <FaAward />,
                title: "সার্টিফিকেট",
                desc: "আন্তর্জাতিক মানের সার্টিফিকেট",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-4xl text-yellow-300 mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;
