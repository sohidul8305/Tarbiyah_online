import React from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaUserGraduate,
  FaBookOpen,
  FaVideo,
  FaCalendarAlt,
  FaAward,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaFileAlt,
  FaCertificate,
  FaMosque,
  FaQuran,
  FaHands,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaChild,
  FaBook,
  FaPen,
  FaSmile,
  FaUsers as FaUsersIcon,
  FaChalkboardTeacher,
  FaUserTie,
  FaGraduationCap,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const AlimiyahKidsDetails = () => {
  const courseDetails = {
    title: "আলিমিয়াহ ফর কিডস",
    subtitle: "বাচ্চাদের জন্য ইসলামিক শিক্ষা",
    description: `
      বাচ্চাদের কুরআন, হাদীস, আরবি ভাষা ও ইসলামি আকিদার মৌলিক শিক্ষা 
      প্রদান করা হয় এই কোর্সে। সহজ ও আনন্দদায়ক পদ্ধতিতে ইসলামি জ্ঞান 
      অর্জন। খেলার ছলে শেখানো হয় ইসলামের মৌলিক বিষয়সমূহ।
    `,
    objectives: [
      "কুরআন তিলাওয়াত ও তাজবিদ শেখা",
      "আরবি বর্ণমালা ও মৌলিক শব্দ শেখা",
      "ইসলামি আদব ও আখলাক শিক্ষা",
      "নবীদের গল্প ও ইসলামি ইতিহাস জানা",
      "সহজ হাদীস ও দোয়া শিক্ষা",
    ],
    benefits: [
      "অভিজ্ঞ ও প্রশিক্ষিত শিক্ষকমণ্ডলী",
      "খেলার ছলে আনন্দদায়ক শিক্ষা",
      "প্রাইভেট ফেসবুক গ্রুপে অভিভাবক সাপোর্ট",
      "মাসিক প্রগ্রেস রিপোর্ট",
      "সার্টিফিকেট ও পুরস্কার",
    ],
    schedule: {
      duration: "২ বছর",
      classes: "সপ্তাহে ৩ দিন",
      time: "সকাল ১০:০০ - ১১:৩০",
      totalClasses: "২৪০টি ক্লাস",
    },
    price: {
      original: "৮,০০০ টাকা",
      discount: "৫,৫০০ টাকা",
      save: "৩১%",
    },
  };

  // কিডস প্রোগ্রামের ইনস্ট্রাক্টর
  const instructors = [
    {
      id: 1,
      name: "মাওলানা আব্দুর রহমান",
      title: "কিডস প্রোগ্রাম কো-অর্ডিনেটর",
      subtitle: "বিশেষজ্ঞ: বাল্য শিক্ষা ও তাজবিদ",
      image: "https://i.pravatar.cc/150?img=11",
      expertise: "বাল্য শিক্ষা",
    },
    {
      id: 2,
      name: "শায়েখা ফাতেমা বিনতে আহমদ",
      title: "প্রধান শিক্ষিকা",
      subtitle: "বিশেষজ্ঞ: শিশু মনোবিজ্ঞান ও ইসলামি শিক্ষা",
      image: "https://i.pravatar.cc/150?img=12",
      expertise: "শিশু মনোবিজ্ঞান",
    },
    {
      id: 3,
      name: "হাফেজ মাওলানা ইউনুস আলী",
      title: "কুরআন শিক্ষক",
      subtitle: "বিশেষজ্ঞ: নূরানী পদ্ধতি ও তাজবিদ",
      image: "https://i.pravatar.cc/150?img=13",
      expertise: "কুরআন শিক্ষা",
    },
    {
      id: 4,
      name: "মাওলানা সাদিকুর রহমান",
      title: "আরবি ভাষা শিক্ষক",
      subtitle: "বিশেষজ্ঞ: আরবি ভাষা ও সাহিত্য",
      image: "https://i.pravatar.cc/150?img=14",
      expertise: "আরবি ভাষা",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/course/alemiah"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">আলেমিয়াহ পেজে ফিরে যান</span>
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] rounded-3xl shadow-2xl overflow-hidden text-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaChild className="text-yellow-400 text-2xl" />
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                    কিডস প্রোগ্রাম
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {courseDetails.title}
                </h1>
                <p className="text-yellow-400 text-lg mt-1">
                  {courseDetails.subtitle}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaUsers className="text-yellow-400" />
                  ৫০০+ ছাত্র
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  ৪.৮ রেটিং
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#002b2b] mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  কোর্সের বিবরণ
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {courseDetails.description}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#002b2b] mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  শেখার উদ্দেশ্য
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetails.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl hover:bg-yellow-50 transition-colors"
                    >
                      <FaCheckCircle className="text-yellow-500 text-lg flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-[#002b2b] mb-4 flex items-center gap-3">
                  <FaLightbulb className="text-yellow-500 text-3xl" />
                  বিশেষ সুবিধাসমূহ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetails.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/70 p-3 rounded-xl"
                    >
                      <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#002b2b] mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  সম্পূর্ণ পাঠ্যক্রম
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      module: "পর্ব ১: কুরআন শিক্ষা",
                      topics: [
                        "নূরানী পদ্ধতি",
                        "তাজবিদের প্রাথমিক ধারণা",
                        "ছোট সূরা সমূহ",
                      ],
                    },
                    {
                      module: "পর্ব ২: আরবি ভাষা",
                      topics: [
                        "আরবি বর্ণমালা",
                        "মৌলিক শব্দভাণ্ডার",
                        "সহজ বাক্য গঠন",
                      ],
                    },
                    {
                      module: "পর্ব ৩: ইসলামি আদব",
                      topics: [
                        "দৈনন্দিন দোয়া",
                        "ইসলামি আচরণ",
                        "পাঁচ ওয়াক্ত নামাজ",
                      ],
                    },
                    {
                      module: "পর্ব ৪: নবীদের গল্প",
                      topics: [
                        "আদম থেকে মুহাম্মদ ﷺ",
                        "ইসলামি ইতিহাস",
                        "সাহাবীদের জীবনী",
                      ],
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-4 rounded-xl hover:bg-yellow-50 transition-all border border-gray-100"
                    >
                      <h4 className="font-bold text-[#002b2b] mb-2 flex items-center gap-2">
                        <FaBook className="text-yellow-500" />
                        {item.module}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, i) => (
                          <span
                            key={i}
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
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Instructors Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-[#002b2b] flex items-center gap-2">
                    <FaUserTie className="text-yellow-500" />
                    আমাদের ইন্সট্রাক্টরগণ
                  </h3>
                </div>

                <div className="space-y-4">
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-yellow-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Profile Image */}
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white overflow-hidden">
                              <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    instructor.name,
                                  )}&background=random&size=64`;
                                }}
                              />
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                            <FaCheckCircle className="text-white text-xs" />
                          </div>
                        </div>

                        {/* Instructor Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#002b2b] text-sm truncate group-hover:text-yellow-600 transition-colors">
                            {instructor.name}
                          </h4>
                          <p className="text-xs text-gray-600 font-medium">
                            {instructor.title}
                          </p>
                          {instructor.subtitle && (
                            <p className="text-xs text-yellow-600 mt-0.5 flex items-center gap-1">
                              <FaGraduationCap className="text-[10px]" />
                              {instructor.subtitle}
                            </p>
                          )}
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {instructor.expertise}
                            </span>
                          </div>
                        </div>

                        <div className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaChalkboardTeacher className="text-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-center text-sm text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center justify-center gap-2 group">
                  <span>সকল ইন্সট্রাক্টর দেখুন</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-200">
                    <FaChild className="text-4xl text-[#002b2b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    কোর্সের তথ্য
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaClock className="text-yellow-500" /> সময়কাল
                    </span>
                    <span className="font-semibold">
                      {courseDetails.schedule.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-500" /> ক্লাস
                    </span>
                    <span className="font-semibold">
                      {courseDetails.schedule.classes}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaVideo className="text-yellow-500" /> সময়
                    </span>
                    <span className="font-semibold">
                      {courseDetails.schedule.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaFileAlt className="text-yellow-500" /> মোট ক্লাস
                    </span>
                    <span className="font-semibold">
                      {courseDetails.schedule.totalClasses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaCertificate className="text-yellow-500" /> সার্টিফিকেট
                    </span>
                    <span className="font-semibold text-green-600">
                      ✓ ভেরিফাইড
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">কোর্স ফি</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {courseDetails.price.discount}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      {courseDetails.price.original}
                    </p>
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                      সেভ {courseDetails.price.save}
                    </span>
                  </div>
                </div>

                <Link to="/course/alemiah/kids/enroll">
                  <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3">
                    <FaRocket /> <span>এনরোল করুন</span>
                    <FaArrowRight />
                  </button>
                </Link>

                <button className="w-full mt-3 bg-white border-2 border-[#002b2b] text-[#002b2b] font-medium py-3 px-4 rounded-xl hover:bg-[#002b2b] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  <FaVideo className="text-yellow-500" />
                  ফ্রি ট্রায়াল ক্লাস
                </button>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-xl border-2 border-teal-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-teal-300">
                    <FaHands className="text-teal-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002b2b] text-sm flex items-center gap-1">
                      <FaCheckCircle className="text-green-600 text-xs" />
                      ১০০% বিশ্বস্ত ইনস্টিটিউট
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      অভিজ্ঞ ওলামায়ে কেরামের সরাসরি তত্ত্বাবধান ও মানসম্মত
                      শিক্ষা
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlimiyahKidsDetails;
