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

  // কোর্সের মডিউলসমূহ
  const modules = [
    {
      id: 1,
      title: "কুরআন শিক্ষা",
      topics: ["তাজবিদ", "তাফসির", "ক্বিরাত"],
      duration: "৩ মাস",
    },
    {
      id: 2,
      title: "হাদীস শিক্ষা",
      topics: ["হাদীস পরিচিতি", "মুস্তালাহ", "মুহাদ্দিসগণ"],
      duration: "২ মাস",
    },
    {
      id: 3,
      title: "ফিকহ শিক্ষা",
      topics: ["ইবাদত", "মুয়ামালাত", "আহওয়াল শাখসিয়্যাহ"],
      duration: "৩ মাস",
    },
    {
      id: 4,
      title: "আকাইদ শিক্ষা",
      topics: ["ইসলামী আকিদা", "শিরক-বিদয়াত", "তাওহিদ"],
      duration: "২ মাস",
    },
    {
      id: 5,
      title: "ইসলামের ইতিহাস",
      topics: ["সীরাত", "খুলাফায়ে রাশেদীন", "ইসলামি সভ্যতা"],
      duration: "২ মাস",
    },
  ];

  // সুবিধাসমূহ
  const features = [
    {
      icon: <FaUserTie />,
      title: "অভিজ্ঞ শিক্ষক",
      desc: "দক্ষ ওলামায়ে কেরামের ক্লাস",
    },
    {
      icon: <FaVideo />,
      title: "লাইভ ক্লাস",
      desc: "প্রতিটি ক্লাস লাইভ ও রেকর্ডেড",
    },
    {
      icon: <FaComments />,
      title: "কমিউনিটি সাপোর্ট",
      desc: "প্রাইভেট ফেসবুক গ্রুপ",
    },
    {
      icon: <FaHeadset />,
      title: "২৪/৭ সাপোর্ট",
      desc: "যেকোনো প্রশ্নের উত্তর",
    },
    {
      icon: <FaCertificate />,
      title: "সার্টিফিকেট",
      desc: "আন্তর্জাতিক মানের সার্টিফিকেট",
    },
    {
      icon: <FaMobileAlt />,
      title: "মোবাইল অ্যাপ",
      desc: "যেকোনো ডিভাইসে ক্লাস",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Enhanced */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
              🔥 Limited Offer
            </span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ 4.9/5 Rating
            </span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            {/* Image with Multiple Badges */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src="https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg"
                  alt="Islamic Studies Banner"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                    <FaPlay className="text-black text-3xl ml-1" />
                  </div>
                </div>
                {/* Student Count Badge */}
                <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <FaUsers className="text-yellow-500" />
                  <span className="font-bold">1,200+</span>
                  <span className="text-sm">ছাত্র</span>
                </div>
              </div>
            </div>

            {/* Content */}
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

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaClock className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সময়কাল</p>
                  <p className="text-sm font-bold">১২ মাস</p>
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

              {/* CTA Buttons */}
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

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              কেন এই কোর্সটি{" "}
              <span className="text-yellow-500">বেছে নেবেন?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              অভিজ্ঞ শিক্ষকমণ্ডলী ও আধুনিক শিক্ষাপদ্ধতিতে তৈরি করা হয়েছে এই
              কোর্সটি
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:border-yellow-400 group"
              >
                <div className="text-4xl text-yellow-500 mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-[#002b2b] text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content with Tabs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left & Center: Tab Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100 flex flex-wrap gap-2">
              {["overview", "modules", "instructors", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                    activeTab === tab
                      ? "bg-[#002b2b] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "overview" && "ওভারভিউ"}
                  {tab === "modules" && "মডিউলসমূহ"}
                  {tab === "instructors" && "ইন্সট্রাক্টর"}
                  {tab === "reviews" && "রিভিউ"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 min-h-[400px]">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#002b2b] mb-4 flex items-center gap-3">
                    <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                    কোর্স সম্পর্কে বিস্তারিত
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    আমাদের এই ডিপ্লোমা কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে সেইসব
                    ভাই-বোনদের জন্য যারা কর্মব্যস্ততার মাঝেও দ্বীনের মৌলিক জ্ঞান
                    অর্জন করতে চান। এখানে অভিজ্ঞ ওলামায়ে কেরামের তত্ত্বাবধানে
                    প্রতিটি বিষয় সহজভাবে উপস্থাপিত হয়।
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "কুরআন তিলাওয়াত ও তাফসির",
                      "হাদীস শাস্ত্রের পরিচিতি",
                      "ফিকহ বা ইসলামী আইনশাস্ত্র",
                      "আকাইদ ও আমল",
                      "তাজবিদ ও ক্বিরাত",
                      "ইসলামের ইতিহাস",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-yellow-50 transition-colors group"
                      >
                        <FaCheckCircle className="text-yellow-500 text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "modules" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#002b2b] mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                    কোর্স মডিউলসমূহ
                  </h2>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div
                        key={module.id}
                        className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-[#002b2b] text-lg flex items-center gap-2">
                            <FaBook className="text-yellow-500" />
                            {module.title}
                          </h4>
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                            {module.duration}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "instructors" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#002b2b] mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                    আমাদের ইন্সট্রাক্টরগণ
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "মাওলানা আব্দুর রহমান",
                        role: "কুরআন ও তাফসির বিশেষজ্ঞ",
                        exp: "১৫ বছর",
                      },
                      {
                        name: "মাওলানা মuhammad আলী",
                        role: "হাদীস ও ফিকহ বিশেষজ্ঞ",
                        exp: "১২ বছর",
                      },
                      {
                        name: "শায়েখ আহমাদ হোসেন",
                        role: "আকাইদ ও ইসলামি ইতিহাস",
                        exp: "১০ বছর",
                      },
                    ].map((instructor, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-yellow-50 transition-all border border-gray-100"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {instructor.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#002b2b]">
                            {instructor.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {instructor.role}
                          </p>
                          <p className="text-xs text-yellow-600">
                            ⏳ {instructor.exp} অভিজ্ঞতা
                          </p>
                        </div>
                        <FaUserGraduate className="text-yellow-500 text-2xl" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#002b2b] mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                    ছাত্রদের রিভিউ
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "মো: রফিকুল ইসলাম",
                        review:
                          "অসাধারণ একটি কোর্স! দ্বীনের জ্ঞান অর্জনে সহায়ক।",
                        rating: 5,
                      },
                      {
                        name: "ফাতেমা আক্তার",
                        review: "আলহামদুলিল্লাহ, খুবই উপকারী একটি কোর্স।",
                        rating: 5,
                      },
                      {
                        name: "আব্দুল্লাহ আল মামুন",
                        review: "শিক্ষকদের অভিজ্ঞতা ও শিক্ষাপদ্ধতি চমৎকার।",
                        rating: 4,
                      },
                    ].map((review, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#002b2b]">
                                {review.name}
                              </h4>
                              <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            ২ দিন আগে
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Testimonials */}
            <div className="bg-gradient-to-r from-[#002b2b] to-[#004d4d] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <FaUsers className="text-3xl text-yellow-400" />
                <h3 className="text-xl font-bold">ছাত্রদের মতামত</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="flex text-yellow-400 mb-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-gray-200">
                    "অসাধারণ একটি কোর্স! দ্বীনের জ্ঞান অর্জনে সহায়ক।"
                  </p>
                  <p className="text-xs text-yellow-300 mt-2">
                    - মো: রফিকুল ইসলাম
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="flex text-yellow-400 mb-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-gray-200">
                    "আলহামদুলিল্লাহ, খুবই উপকারী একটি কোর্স।"
                  </p>
                  <p className="text-xs text-yellow-300 mt-2">
                    - ফাতেমা আক্তার
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Course Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-200">
                  <FaBookOpen className="text-4xl text-[#002b2b]" />
                </div>
                <h3 className="text-2xl font-bold text-[#002b2b]">
                  কোর্সের তথ্য
                </h3>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-500" />
                    সময়কাল
                  </span>
                  <span className="font-semibold text-[#002b2b]">১২ মাস</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaVideo className="text-yellow-500" />
                    ক্লাসের ধরণ
                  </span>
                  <span className="font-semibold text-[#002b2b]">
                    লাইভ অনলাইন
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaTime className="text-yellow-500" />
                    ক্লাস সময়
                  </span>
                  <span className="font-semibold text-[#002b2b]">
                    রাত ৮-১০টা
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaGlobe className="text-yellow-500" />
                    ভাষা
                  </span>
                  <span className="font-semibold text-[#002b2b]">বাংলা</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaFileAlt className="text-yellow-500" />
                    মোট ক্লাস
                  </span>
                  <span className="font-semibold text-[#002b2b]">৪৮টি</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaCertificate className="text-yellow-500" />
                    সার্টিফিকেট
                  </span>
                  <span className="font-semibold text-green-600">
                    ✓ ভেরিফাইড
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">কোর্স ফি</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    ৫,০০০ টাকা
                  </p>
                  <p className="text-xs text-gray-500 line-through">
                    ১০,০০০ টাকা
                  </p>
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    সেভ ৫০%
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-xl border-2 border-teal-200">
                <div className="flex items-center gap-3">
                  <img
                    src={diplomaImg}
                    alt="Trusted Institute"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#002b2b] shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-[#002b2b] text-sm flex items-center gap-1">
                      <FaShieldAlt className="text-green-600 text-xs" />
                      ১০০% বিশ্বস্ত ইনস্টিটিউট
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      অভিজ্ঞ ওলামায়ে কেরামের সরাসরি তত্ত্বাবধান
                    </p>
                  </div>
                </div>
              </div>

              {/* Enroll Button */}
              <Link to="/course/diploma/enroll">
                <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group">
                  <span>🎯 এখনই এনরোল করুন</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#002b2b] mb-3">
            আজই আপনার যাত্রা শুরু করুন
          </h3>
          <p className="text-[#002b2b]/80 mb-6 max-w-2xl mx-auto">
            দ্বীনের জ্ঞান অর্জনের সুযোগ হাতছাড়া করবেন না। অভিজ্ঞ শিক্ষকদের কাছ
            থেকে শিখুন।
          </p>
          <Link to="/course/diploma/enroll">
            <button className="bg-[#002b2b] text-white px-10 py-3 rounded-full font-bold hover:bg-[#003d3d] transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              ফ্রি ট্রায়াল ক্লাস বুক করুন
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Diploma;
