import React, { useState } from "react";
import { Link } from "react-router-dom";
import KidsImg from "../../image/kids.jpg";
import NazeracourseImg from "../../image/najeracourse.png";
import NazeraBannerImg from "../../image/najerabanner.png";
import {
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const NazeraDetails = () => {
  const [openSemester, setOpenSemester] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const courseDetails = {
    title: "তারবিয়াহ নাজেরা কোর্স",
    description: `আবু হুরাইরা রাদি. থেকে বর্ণিত : রাসূলুল্লাহ সল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন, যে ব্যক্তি কুরআন সুন্দর উচ্চরণে পড়ে না সে আমার উম্মতের অন্তর্ভূক্ত নয় - সহীহ বুখারী-৭৫২৭। তাইতো আমাদের সকলের উচিত বিশুদ্ধভাবে কুরআন তিলাওয়াত শিক্ষা করা এবং সন্তানদেরকে বিশুদ্ধভাবে কুরআন তিলাওয়াত শেখার সুব্যবস্থা করে দেওয়া। বিশুদ্ধভাবে কুরআন তিলাওয়াত শেখার সুব্যবস্থা হিসেবে আমরা অফার করছি “নাজেরা ফর জুনিওরস” কোর্সটি। যার মাধ্যমে একজন শিক্ষার্থী ঘরে বসেই সল্প সময়ে বিশুদ্ধভাবে কুরআন তিলাওয়াত শিখতে পারবে ইনশাল্লাহ। এখানে আপনি তাজবীদের নিয়ম-কানুন সহ সঠিক আচার-আচরণে অল্প সময়ের মধ্যে আপনার তেলাওয়াত শুদ্ধ করতে পারেন। এই প্রোগ্রামটি সম্পূর্ণ অনলাইন এবং খণ্ডকালীন। তরবিয়াহ অনলাইন নাজিরা প্রোগ্রামটি শিশু, তরুণ প্রজন্ম এবং প্রাপ্তবয়স্কদের (যারা সঠিকভাবে কুরআন তেলাওয়াত করতে পারে না) এবং যারা মুখস্থ করার স্বপ্ন দেখে তাদের জন্য ডিজাইন করা হয়েছে। এই প্রোগ্রামে আমরা আপনাকে সূরা ইয়াসিন, সূরা আর রহমান, সূরা মুলকের মতো গুরুত্বপূর্ণ সূরা সহ ৩০ তম জুজ এবং ২৯ তম জুজ নাজিরা বা পূর্ণ কুরআন নাজেরা শেখাব। এ ছাড়া তাজবিদদের মৌলিক নিয়ম ও ১৫টি ছোট সূরা মুখস্থ করা হবে ।`,
    objectives: [
      "সঠিক পদ্ধিতিতে তিলাওয়াত শিক্ষা",
      "২৯ তম জুয এবং ৩০ তম জুয সম্পূর্ণ নাজেরা",
      "গুরুত্বপূর্ণ সূরা সমূহ নাজেরা",
      "বেসিক তাজউইদ লেভেল-২",
      "হুসনে সওতের নিয়মিত অনুশীলন",
      "শেষ ১৫টি ছোট সূরা হিফয",
      "নিয়মিত মাশক্ব ও কুরআনিক দুআ শিক্ষা",
    ],
  };

  const semestersData = [
    {
      title: "কায়েদাহ নূরানিয়্যাহর পর্যালোচনা",
      content: "বিস্তারিত আলোচনা ও মৌলিক ধারণা...",
    },
    {
      title: "সহজ শব্দ ও বাক্য গঠন",
      content: "সহজ ও সাবলীলভাবে গঠন প্রণালী...",
    },
    {
      title: "তাজউইদের মূলনীতি শিক্ষা ও প্রয়োগ",
      content: "নিয়মকানুন ও প্রায়োগিক অনুশীলন...",
    },
    {
      title: "কুরআন তিলাওয়াত (প্রাথমিক স্তর) ছোট সূরা-সমূহ",
      content: "ছোট সূরাগুলোর তিলাওয়াত ও অনুশীলন...",
    },
    {
      title: "কুরআন তিলাওয়াত (উন্নত স্তর): বড় সূরা ও আয়াতসমূহ",
      content: "বড় সূরার তিলাওয়াত ও অর্থসহ পাঠ...",
    },
    {
      title: "হুসনে সওতের প্রশিক্ষন",
      content: "মাখরাজ ও সিফাত ভিত্তিক সঠিক উচ্চারণ...",
    },
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
            src={NazeraBannerImg}
            alt="Nazera Banner"
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors cursor-pointer">
                  <FaShare className="text-lg" />
                  <span className="font-medium">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors cursor-pointer">
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
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all cursor-pointer ${
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
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all cursor-pointer ${
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

          {/* Main Content Layout */}
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

              {/* EARN A CERTIFICATE */}
              <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2">
                    EARN A CERTIFICATE
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add this certificate to your resume to demonstrate your
                    skills & increase your chances of getting noticed.
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                  Selected template preview
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
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer">
                    Start Now
                  </button>
                </Link>
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
                    "ক্লাসের সময়কাল: 120 মিনিট (প্রতি ক্লাস)",
                    "পরীক্ষা: মিডটার্ম এবং ফাইনাল",
                    "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    "কোর্স শেষে সার্টিফিকেট প্রদান",
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
                        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 text-left font-medium text-[#002b2b] transition-colors text-sm cursor-pointer"
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
                          {sem.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  TARGET AUDIENCE
                </h2>
                <div className="space-y-2">
                  {[
                    "দেশ ও প্রবাসে যারা কুরআনের শিক্ষা ও হিফজ করতে আগ্রহী",
                    "জেনারেল শিক্ষার পাশাপাশি যারা কুরআন শিক্ষার প্রতি আগ্রহ লালন করেন",
                    "৬-১৪ বছরের সকল শিক্ষার্থীর জন্য এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে",
                    "যারা নিজেদের সন্তানকে প্র্যাক্টিসিং মুসলিম হিসেবে গড়ে তুলতে চান",
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

              {/* 7. COURSE FEE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  FEE STRUCTURE
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      বাংলাদেশীদের জন্য
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <span className="block text-[#002b2b] font-medium">
                        ভর্তি ফি ১০০০ টাকা
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <span className="block text-[#002b2b] font-medium">
                        মাসিক ফি ১০০০ টাকা
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      প্রবাসীর জন্য
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <span className="block text-[#002b2b] font-medium">
                        ভর্তি ফি ২০০০ টাকা
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <span className="block text-[#002b2b] font-medium">
                        মাসিক ফি ২০০০ টাকা
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1 Column */}
            <div className="space-y-4 -mt-[305px]">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={NazeracourseImg}
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
                <h1 className="text-xl font-bold text-[#007a91] mb-5">
                  Apply This Course
                </h1>

                <div className="flex items-center justify-center mb-6 relative">
                  <Link to="/course/kids/nazera/enroll" className="w-full">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-md hover:opacity-90 transition cursor-pointer">
                      Apply Now
                    </button>
                  </Link>
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

export default NazeraDetails;
