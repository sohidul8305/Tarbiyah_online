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
  FaUserTie,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaMicrophone,
  FaGlobeAsia,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const DiplomaDetails = () => {
  // কোর্সের বিস্তারিত তথ্য
  const courseDetails = {
    title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    subtitle: "পূর্ণাঙ্গ ইসলামিক শিক্ষা কোর্স",
    description: `
      এই ডিপ্লোমা কোর্সটি ইসলামিক জ্ঞানের সকল শাখায় পূর্ণাঙ্গ শিক্ষা প্রদানের 
      জন্য ডিজাইন করা হয়েছে। কুরআন, হাদীস, ফিকহ, আকাইদ ও ইসলামি ইতিহাসের 
      মৌলিক ও উন্নত বিষয়সমূহ এখানে অন্তর্ভুক্ত রয়েছে।
    `,
    objectives: [
      "কুরআনের সঠিক তিলাওয়াত ও তাফসির শেখা",
      "হাদীসের মৌলিক বিষয়সমূহ আয়ত্ত করা",
      "ইসলামী আইন ও ফিকহের মৌলিক ধারণা অর্জন",
      "সঠিক আকিদা ও ইসলামি বিশ্বাস সম্পর্কে জ্ঞান লাভ",
      "ইসলামের ইতিহাস ও সভ্যতা সম্পর্কে জানা",
    ],
    benefits: [
      "অভিজ্ঞ ওলামায়ে কেরামের সরাসরি তত্ত্বাবধান",
      "লাইভ অনলাইন ক্লাস ও রেকর্ডেড সেশন",
      "প্রাইভেট ফেসবুক গ্রুপে কমিউনিটি সাপোর্ট",
      "২৪/৭ প্রশ্নোত্তর সুবিধা",
      "আন্তর্জাতিক মানের সার্টিফিকেট",
    ],
    schedule: {
      duration: "১২ মাস",
      classes: "সপ্তাহে ৪ দিন",
      time: "রাত ৮:০০ - ১০:০০",
      totalClasses: "৪৮টি ক্লাস",
    },
    price: {
      original: "১০,০০০ টাকা",
      discount: "৫,০০০ টাকা",
      save: "৫০%",
    },
  };

  // ইনস্ট্রাক্টরদের তথ্য
  const instructors = [
    {
      id: 1,
      name: "Professor Mokhter Ahmad",
      title: "Chairman, Tarbiyah Academy",
      image: "https://i.pravatar.cc/150?img=1",
      expertise: "Islamic Studies",
    },
    {
      id: 2,
      name: "Dr. Abu Bakr Muhammad Zakaria",
      title: "Prof. Islamic University, Kushtia",
      subtitle: "Comparative Theology and Aqeedah",
      image: "https://i.pravatar.cc/150?img=2",
      expertise: "Comparative Theology",
    },
    {
      id: 3,
      name: "Dr. Zubair Ehsanul Haque",
      title: "Department Head, Dhaka University",
      subtitle: "Subject: Arabic Language",
      image: "https://i.pravatar.cc/150?img=3",
      expertise: "Arabic Language",
    },
    {
      id: 4,
      name: "Dr. Mir Manzoor Mahmud",
      title: "Prof. Manarat Int. University",
      subtitle: "Subject: Seerah and History of Islam",
      image: "https://i.pravatar.cc/150?img=4",
      expertise: "Seerah & History",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/diploma"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">ডিপ্লোমা পেজে ফিরে যান</span>
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] rounded-3xl shadow-2xl overflow-hidden text-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaMosque className="text-yellow-400 text-2xl" />
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                    কোর্স ডিটেইলস
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
                  ১২০০+ ছাত্র
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  ৪.৯ রেটিং
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
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
                  কোর্সের উদ্দেশ্য
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
                  কেন এই কোর্সটি?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetails.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/70 p-3 rounded-xl backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Curriculum */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#002b2b] mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  সম্পূর্ণ পাঠ্যক্রম
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      module: "মডিউল ১: কুরআন শিক্ষা",
                      topics: [
                        "তাজবিদ ও ক্বিরাত",
                        "তাফসিরুল কুরআন",
                        "কুরআনের ভাষা",
                      ],
                    },
                    {
                      module: "মডিউল ২: হাদীস শিক্ষা",
                      topics: [
                        "হাদীস পরিচিতি",
                        "মুস্তালাহুল হাদীস",
                        "মুহাদ্দিসগণের জীবনী",
                      ],
                    },
                    {
                      module: "মডিউল ৩: ফিকহ শিক্ষা",
                      topics: [
                        "ইবাদতসমূহ",
                        "মুয়ামালাত",
                        "আহওয়াল শাখসিয়্যাহ",
                      ],
                    },
                    {
                      module: "মডিউল ৪: আকাইদ শিক্ষা",
                      topics: [
                        "ইসলামী আকিদা",
                        "শিরক ও বিদয়াত",
                        "তাওহিদের গুরুত্ব",
                      ],
                    },
                    {
                      module: "মডিউল ৫: ইসলামের ইতিহাস",
                      topics: [
                        "সীরাতুন্নবী",
                        "খুলাফায়ে রাশেদীন",
                        "ইসলামি সভ্যতা",
                      ],
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-4 rounded-xl hover:bg-yellow-50 transition-all border border-gray-100"
                    >
                      <h4 className="font-bold text-[#002b2b] mb-2 flex items-center gap-2">
                        <FaQuran className="text-yellow-500" />
                        {item.module}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200 hover:border-yellow-400 transition-colors"
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

            {/* Right Sidebar - 1 Column */}
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
                        {/* Profile Image with Gradient Border */}
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

                        {/* Expertise Icon */}
                        <div className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaChalkboardTeacher className="text-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* All Instructors Link */}
                <button className="w-full mt-4 text-center text-sm text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center justify-center gap-2 group">
                  <span>সকল ইন্সট্রাক্টর দেখুন</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-200">
                    <FaBookOpen className="text-4xl text-[#002b2b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    কোর্সের তথ্য
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaClock className="text-yellow-500" />
                      সময়কাল
                    </span>
                    <span className="font-semibold text-[#002b2b]">
                      {courseDetails.schedule.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-500" />
                      ক্লাস
                    </span>
                    <span className="font-semibold text-[#002b2b]">
                      {courseDetails.schedule.classes}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaVideo className="text-yellow-500" />
                      সময়
                    </span>
                    <span className="font-semibold text-[#002b2b]">
                      {courseDetails.schedule.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaFileAlt className="text-yellow-500" />
                      মোট ক্লাস
                    </span>
                    <span className="font-semibold text-[#002b2b]">
                      {courseDetails.schedule.totalClasses}
                    </span>
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

                {/* Price */}
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

                {/* Enroll Button */}
                <Link to="/course/diploma/enroll">
                  <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group">
                    <FaRocket className="group-hover:translate-y-[-2px] transition-transform" />
                    <span>এনরোল করুন</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>

                {/* Free Trial */}
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

export default DiplomaDetails;
