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
  FaMemory,
  FaSync,
  FaUserTie,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSmile,
  FaPaintBrush,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

const HifzRevisionDetails = () => {
  const course = {
    title: "হিফজ রিভিশন",
    subtitle: "মুখস্থ কুরআন পুনর্বীক্ষণ",
    description: `
      মুখস্থকৃত কুরআন পাকা ও মজবুত করার জন্য 
      বিশেষ রিভিশন প্রোগ্রাম।
    `,
    objectives: [
      "পূর্ণ কুরআনের পুনরাবৃত্তি করা",
      "দূর্বল স্থান চিহ্নিত করা",
      "তাজবিদের উন্নতি করা",
      "মাশায়েখদের তত্ত্বাবধানে পড়া",
      "হিফজ মজবুত করা",
    ],
    benefits: [
      "অভিজ্ঞ মাশায়েখদের সরাসরি তত্ত্বাবধান",
      "লাইভ অনলাইন ক্লাস ও রেকর্ডেড সেশন",
      "প্রাইভেট ফেসবুক গ্রুপে কমিউনিটি সাপোর্ট",
      "ব্যক্তিগত ফিডব্যাক",
      "হিফজ মজবুত করার বিশেষ টেকনিক",
    ],
    schedule: {
      duration: "৬-১২ মাস",
      classes: "সপ্তাহে ৫ দিন",
      time: "সন্ধ্যা ৬:০০ - ৮:০০",
      totalClasses: "২৪০টি ক্লাস",
    },
    price: {
      original: "৫,০০০ টাকা",
      discount: "৪,০০০ টাকা",
      save: "২০%",
    },
    icon: <FaSync className="text-4xl text-blue-600" />,
    color: "from-blue-500 to-cyan-600",
    age: "হিফজ সম্পন্ন",
    students: "৬০০+",
    rating: "৪.৭",
  };

  const instructors = [
    {
      id: 1,
      name: "হাফেজ মাওলানা ইউনুস আলী",
      title: "হিফজ বিভাগের প্রধান",
      subtitle: "বিশেষজ্ঞ: হিফজ ও রিভিশন",
      image: "https://i.pravatar.cc/150?img=13",
      expertise: "হিফজ ও রিভিশন",
    },
    {
      id: 2,
      name: "মাওলানা আব্দুল্লাহ আল মামুন",
      title: "রিভিশন বিশেষজ্ঞ",
      subtitle: "বিশেষজ্ঞ: তাজবিদ ও রিভিশন টেকনিক",
      image: "https://i.pravatar.cc/150?img=15",
      expertise: "তাজবিদ ও রিভিশন",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/course/kids"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স পেজে ফিরে যান</span>
          </Link>

          <div
            className={`bg-gradient-to-br ${course.color} rounded-3xl shadow-2xl overflow-hidden text-white p-8 md:p-12`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {course.icon}
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {course.subtitle}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {course.title}
                </h1>
                <p className="text-white/80 text-lg mt-1">{course.subtitle}</p>
              </div>
              <div className="flex gap-3">
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaAward className="text-yellow-300" />
                  {course.age}
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaUsers className="text-yellow-300" />
                  {course.students}
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10 flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  {course.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  কোর্সের বিবরণ
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  শেখার উদ্দেশ্য
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <FaCheckCircle className="text-blue-500 text-lg flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                  <FaLightbulb className="text-yellow-500 text-3xl" />
                  বিশেষ সুবিধাসমূহ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
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
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                    <FaUserTie className="text-blue-500" />
                    আমাদের ইন্সট্রাক্টরগণ
                  </h3>
                </div>

                <div className="space-y-4">
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 p-[2px]">
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

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-blue-800 text-sm truncate group-hover:text-blue-600 transition-colors">
                            {instructor.name}
                          </h4>
                          <p className="text-xs text-gray-600 font-medium">
                            {instructor.title}
                          </p>
                          {instructor.subtitle && (
                            <p className="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
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

                        <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaChalkboardTeacher className="text-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-200">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">
                    কোর্সের তথ্য
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaClock className="text-blue-500" /> সময়কাল
                    </span>
                    <span className="font-semibold">
                      {course.schedule.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" /> ক্লাস
                    </span>
                    <span className="font-semibold">
                      {course.schedule.classes}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaVideo className="text-blue-500" /> সময়
                    </span>
                    <span className="font-semibold">
                      {course.schedule.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaFileAlt className="text-blue-500" /> মোট ক্লাস
                    </span>
                    <span className="font-semibold">
                      {course.schedule.totalClasses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaCertificate className="text-blue-500" /> সার্টিফিকেট
                    </span>
                    <span className="font-semibold text-green-600">
                      ✓ রিভিশন সনদ
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">কোর্স ফি</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {course.price.discount}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      {course.price.original}
                    </p>
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                      সেভ {course.price.save}
                    </span>
                  </div>
                </div>

                <Link to="/course/kids/revision/enroll">
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3">
                    <FaRocket /> <span>এনরোল করুন</span>
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HifzRevisionDetails;
