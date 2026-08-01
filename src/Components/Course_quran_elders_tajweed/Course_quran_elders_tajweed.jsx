import React, { useState } from "react";
import { Link } from "react-router-dom";
import TajwidbannerImg from "../../image/tajweedbanner - Copy.png";
import TajwidcourseImg from "../../image/tajweedcourse.png";
import {
  FaArrowLeft,
  FaUsers,
  FaStar,
  FaMosque,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaVideo,
  FaCertificate,
  FaGraduationCap,
  FaUserTie,
  FaBook,
  FaPlayCircle,
  FaChild,
  FaLightbulb,
  FaHands,
  FaRocket,
  FaArrowRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Course_quran_elders_tajweed = () => {
  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  // Tajweed Course এর ইনস্ট্রাক্টর
  const instructors = [
    {
      id: 1,
      name: "হাফেজ মাওলানা আব্দুর রহমান",
      title: "প্রধান তাজবিদ শিক্ষক",
      subtitle: "বিশেষজ্ঞ: তাজবিদ ও কিরাত",
      image: "https://i.pravatar.cc/150?img=11",
      expertise: "তাজবিদ ও কিরাত",
    },
    {
      id: 2,
      name: "মাওলানা সাদিকুর রহমান",
      title: "তাজবিদ কোচ",
      subtitle: "বিশেষজ্ঞ: মাখরাজ ও সিফাত",
      image: "https://i.pravatar.cc/150?img=14",
      expertise: "মাখরাজ ও সিফাত",
    },
  ];

  // Tajweed Course Data
  const courseDetails = {
    title: "তাজবিদ কোর্স",
    description: `Narrated by Abu Hurairah [RA]: The Messenger of Allah [SAW] said, "Whoever does not recite the Qur'an with proper pronunciation is not considered part of my Ummah." - Sahih Bukhari 7527. Therefore, it is essential for all of us to learn how to recite the Qur'an correctly. This Tajweed course is specially designed for those who want to learn the rules of Tajweed and apply them in their Quran recitation. The course covers all the essential rules of Tajweed with practical application.`,
    objectives: [
      "মসজিদে নববীর পদ্ধতিতে তাজবিদ শিক্ষা",
      "ধাপে ধাপে তাজবিদের সকল নিয়ম",
      "মাখরাজ ও সিফাতের সঠিক উচ্চারণ",
      "তাজবিদের সব নিয়ম প্রাকটিক্যালি প্রয়োগ",
      "কুরআন তিলাওয়াতে তাজবিদের প্রয়োগ",
      "তাজবিদের সকল গুরুত্বপূর্ণ বিষয়",
      "প্রাকটিক্যাল তাজবিদ প্রশিক্ষণ",
      "তাজবিদ সহ কুরআন তিলাওয়াতের দক্ষতা অর্জন",
    ],
  };

  // Curriculum Data for Tajweed
  const semestersData = [
    { title: "তাজবিদের পরিচয় ও গুরুত্ব" },
    { title: "মাখরাজের পরিচিতি ও অনুশীলন" },
    { title: "সিফাতের পরিচিতি ও অনুশীলন" },
    { title: "হারাকাত ও তানউইনের বিস্তারিত" },
    { title: "নুন সাকিন ও তানউইনের নিয়মাবলী" },
    { title: "মীম সাকিনের নিয়মাবলী" },
    { title: "গুন্নাহ ও ইখফার বিস্তারিত" },
    { title: "ইদগাম ও ইকলাবের নিয়ম" },
    { title: "মাদ্দের প্রকারভেদ ও প্রয়োগ" },
    { title: "ক্বলকালাহ ও তাফখীমের নিয়ম" },
    { title: "সূরা ফাতিহার তাজবিদ বিশ্লেষণ" },
    { title: "ছোট সূরার তাজবিদ বিশ্লেষণ" },
    { title: "কুরআন তিলাওয়াতে তাজবিদের প্রয়োগ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/kids"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স পেজে ফিরে যান</span>
          </Link>

          {/* Hero Section Banner */}
          <img
            src={TajwidbannerImg}
            alt="Tajweed Banner"
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist & Ratings */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaShare className="text-lg" />
                  <span className="font-medium">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaBookmark className="text-lg" />
                  <span className="font-medium">Wishlist</span>
                </button>
              </div>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-[#007a91] mb-3 uppercase">
              {courseDetails.title}
            </h1>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all ${
                  activeTab === "info"
                    ? "border-[#002b2b] text-[#002b2b] font-semibold"
                    : "border-transparent text-gray-500 hover:text-[#002b2b]"
                }`}
              >
                <FaInfoCircle />
                <span>Course Info</span>
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all ${
                  activeTab === "reviews"
                    ? "border-[#002b2b] text-[#002b2b] font-semibold"
                    : "border-transparent text-gray-500 hover:text-[#002b2b]"
                }`}
              >
                <FaCommentDots />
                <span>Reviews</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-center">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>

          {/* Main Content Layout: Left 2 Columns, Right 1 Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. ABOUT COURSE */}
              <div className="p-8 mt-10">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  ABOUT COURSE
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {courseDetails.description}
                </p>
              </div>

              {/* 2. WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  WHAT YOU WILL GAIN
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetails.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-1 rounded-xl transition-colors"
                    >
                      <FaAngleDoubleRight className="text-[#00ADD2] text-base flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium">
                        {objective}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Ready To Apply Your Course */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    Ready To Apply Your Course
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enroll now and start your structured learning journey.
                  </p>
                </div>
                <Link to="/Course-apply-from">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    Start Now
                  </button>
                </Link>
              </div>

              {/* 4. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  TARGET AUDIENCE
                </h2>
                <div className="space-y-2">
                  {[
                    "যারা কুরআন তিলাওয়াতে তাজবিদ শিখতে আগ্রহী",
                    "যারা নিজেদের তিলাওয়াতকে আরও সুন্দর করতে চান",
                    "যারা তাজবিদের সকল নিয়ম শিখতে চান",
                    "যারা তাজবিদ সহ কুরআন তিলাওয়াত করতে চান",
                    "যারা তাজবিদের প্রাকটিক্যাল প্রয়োগ শিখতে চান",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="text-[#00ADD2] text-xs">●</span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. MATERIALS INCLUDED */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  MATERIALS INCLUDED
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {[
                    "কোর্সের মেয়াদঃ ৪ মাস (প্রতিটি সেশন)",
                    "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    "ক্লাসের সময়কাল: 90 মিনিট (প্রতি ক্লাস)",
                    "পরীক্ষা: মিডটার্ম এবং ফাইনাল",
                    "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    "কোর্স শেষে সার্টিফিকেট প্রদান",
                    "তাজবিদ প্রশিক্ষণের জন্য বিশেষ ক্লাস",
                    "কুরআন তিলাওয়াতের প্র্যাকটিস সেশন",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. COURSE CURRICULUM */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  COURSE CURRICULUM
                </h2>
                <div className="border border-gray-300 rounded-sm">
                  {semestersData.map((sem, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-300 last:border-b-0 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSemester(index)}
                        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 text-left font-medium text-[#002b2b] transition-colors text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#00ADD2] text-xs">
                            {openSemester === index ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </span>
                          {sem.title}
                        </span>
                      </button>
                      {openSemester === index && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                          এই মডিউলের বিস্তারিত পাঠ পরিকল্পনা এখানে দেওয়া হবে।
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. COURSE FEE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  COURSE FEE
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  {/* Left Column - Bangla */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      বাংলামিডিয়াম কোর্স
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          ভর্তি ফি ১৩০০ টাকা
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          মাসিক ফি ১৩০০ টাকা
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - English */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      ইন্ডিয়ান কোর্স
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          ভর্তি ফি ২০০০ টাকা
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          মাসিক ফি ২০০০ টাকা
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    * সেমিস্টারে ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদান করা
                    যাবে।
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1 Column */}
            <div className="space-y-4 -mt-[305px]">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={TajwidcourseImg}
                  alt="Course Video"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-12 h-12 bg-[#008080] rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                    <svg
                      className="w-6 h-6 fill-current translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Pricing & Enrollment Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h1 className="text-2xl font-bold text-[#007a91] mb-5">
                  ENROLL NOW
                </h1>

                {/* Split Button with Links */}
                <div className="flex items-center justify-center mb-6 relative">
                  <Link
                    to="/course/kids/tajweed/enrollbnagla"
                    className="w-1/2"
                  >
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      Bangla Version
                    </button>
                  </Link>

                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    Or
                  </div>

                  <Link to="/enroll/tajweed/english-version" className="w-1/2">
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 text-xs rounded-r-md hover:opacity-90 transition">
                      English Version
                    </button>
                  </Link>
                </div>

                {/* Info Details */}
                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Course Level:</span>
                    <span className="font-bold">Beginner to Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Enrolled:</span>
                    <span className="font-bold">200</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Last Updated:</span>
                    <span className="font-bold">07/24/2025</span>
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

export default Course_quran_elders_tajweed;
