import React from "react";
import alemiaImg from "../../image/alemiyah.jpg";
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

const Alemiah = () => {
  // শুধুমাত্র title ও subtitle সহ কোর্স ডাটা
  const courses = [
    {
      id: "alimiyah-kids",
      title: "আলিমিয়াহ ফর কিডস",
      subtitle: "বাচ্চাদের জন্য ইসলামিক শিক্ষা",
      image:
        "https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg",
      topBadge: "Kids Program",
    },
    {
      id: "alimiyah-program",
      title: "আলিমিয়াহ প্রোগ্রাম",
      subtitle: "পূর্ণাঙ্গ ইসলামি উচ্চ শিক্ষা",
      image:
        "https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg",
      topBadge: "Allemiyah Program",
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
                  alt="Alemiah Program Banner"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ✨ বিশেষ প্রোগ্রাম
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-500/30">
                  🕌 তারবিয়াহ আলেমিয়াহ
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  আলেমিয়াহ <br />
                  <span className="text-yellow-400 relative">
                    প্রোগ্রাম
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
                গভীর জ্ঞান ও আত্মশুদ্ধির সমন্বয়ে একটি বিশেষায়িত প্রোগ্রাম।
                ইসলামি জ্ঞান অর্জনের মাধ্যমে নিজেকে ও সমাজকে আলোকিত করতে আমাদের
                এই আলেমিয়াহ প্রোগ্রামে যোগ দিন।
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaStar className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">রেটিং</p>
                  <p className="text-sm font-bold">৪.৯ (৫)</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaGraduationCap className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">প্রোগ্রাম</p>
                  <p className="text-sm font-bold">২টি</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সার্টিফিকেট</p>
                  <p className="text-sm font-bold">আলেমিয়াহ সনদ</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
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
              আমাদের <span className="text-yellow-500">প্রোগ্রামসমূহ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আপনার প্রয়োজন অনুযায়ী সঠিক প্রোগ্রামটি বেছে নিন
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
                      {course.topBadge} <FaStar className="text-black inline" />
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
                        <span>বিস্তারিত</span>
                        <FaArrowRight className="text-xs" />
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
              কেন <span className="text-yellow-400">আলেমিয়াহ</span> বেছে নেবেন?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              অভিজ্ঞ শিক্ষকমণ্ডলী ও আধুনিক শিক্ষাপদ্ধতিতে তৈরি করা হয়েছে এই
              প্রোগ্রামটি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserGraduate />,
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
                title: "আলেমিয়াহ সনদ",
                desc: "আন্তর্জাতিক মানের সার্টিফিকেট",
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

export default Alemiah;
