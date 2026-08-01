import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

const OneToOneDetails = () => {
  const [activeTab, setActiveTab] = useState("info");

  const courseDetails = {
    title: "অনলাইন হিফজ কোর্স",
    description: `
      আল্লাহ তায়ালা বলেন, আমিই যিকর (কুরআন) নাযিল করেছি এবং আমিই উহার সংরক্ষণ। 
      হিফজ- অধ্যায়: এটি সর্বসাকুল্যে precious বরকত পূর্ণ সমৃদ্ধ বিষয় তথা ক্ষেত্র। তাই 
      প্রত্যেক মুসলিম হিসেবে আল্লাহর কালামের সঠিক কুরআনুল কারীমকে মুখস্থ করার মাধ্যমে হেফাযত 
      করা। কুরআনুল কারীম হিফযকরণের সওয়াব ও ফজিলত অনেক বেশি। তাই আমরা 
      প্রস্তুত করেছি "অনলাইন কুরআন তরতিব হিফজ" এই প্রজেক্টটি। প্রজেক্টের মাধ্যমে একজন 
      শিক্ষার্থী খুব সহজেই কুরআনুল কারীম হিফজ সমাপ্ত করতে পারার ইনশাআল্লাহ।
    `,
    objectives: [
      "হিফজের বিষয়াবলী ও অনুশীলনী",
      "ব্যবহারিক তাজবিদ ও সার্টিফাইড ইন্সট্রাক্টর",
      "সাপ্তাহিক সেশন ও মাসিক মূল্যায়ন",
      "নিয়মিত প্রগ্রেস ও মৌখিক টিপস",
    ],
    interCourses: [
      "পূর্ণ কুরআন হিফজ",
      "৩০ পাড়া সম্পূর্ণ হিফজ",
      "অ্যারাবিক সুয় হিফজ",
    ],
    targetAudience: [
      "যাঁরা শুদ্ধ মাত্রায় কুরআনকে পড়তে পারে এমন শিক্ষার্থীদের জন্য।",
      "যে কোনো বয়সের যে কেউ হাজী বা হাফেজ হতে পারে।",
      "বসে না থেকে ঘরে বসে কুরআন হিফজ করতে আগ্রহী।",
      "কর্মব্যস্ত জীবনের পাশাপাশি ঘরে কুরআন হিফজ প্রতি আগ্রহীদের জন্য।",
    ],
    materials: [
      "প্রোডাক্ট হোপ্লেট || ক্লাস ভিডিও রেকর্ডিং",
      "ক্লাসের সময়কাল: ১২০ মিনিট প্রতি ক্লাস",
      "সার্টিফিকেট ও ইনরাইট প্রদান",
      "পরীক্ষা: সিলেক্টিভ এবং ট্রায়াল",
      "সাপ্তাহিক ক্লাসের দিন: ৪ দিন [নিয়মিত ব্যাচের জন্য]",
      "সাপ্তাহিক ক্লাসের দিন: ২ দিন [ভিপিসী ব্যাচের জন্য]",
    ],
    feeStructure: ["ভর্তি ফি ২০০০ টাকা", "মাসিক ফি ২০০০ টাকা"],
  };

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

          {/* Hero Section Banner (Matching HifzDetail style & spacing) */}
          <div className="w-full max-w-3xl h-24 sm:h-32 md:h-40 rounded-2xl border border-gray-100 ml-8 mr-72 relative overflow-hidden bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-900 p-6 text-white flex items-center justify-between shadow-md">
            <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-between items-center px-4">
              <img
                src={KidsImg}
                alt="decoration"
                className="w-24 h-24 object-cover rounded-full hidden sm:block"
              />
              <img
                src={KidsImg}
                alt="decoration"
                className="w-24 h-24 object-cover rounded-full hidden sm:block"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold relative z-10">
              {courseDetails.title}
            </h1>
          </div>

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
              <div className="text-sm text-gray-500">⭐ 0 (0 Ratings)</div>
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
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  About Course
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                  {courseDetails.description}
                </p>
                <button className="text-[#00ADD2] text-sm font-medium mt-3 hover:underline cursor-pointer">
                  – কম প্রদর্শন করুন
                </button>
              </div>

              {/* 2. WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  What You Will Gain
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
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2 uppercase">
                    Earn A Certificate
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add this certificate to your resume to demonstrate your
                    skills & increase your chances of getting noticed.
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2 shrink-0">
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
                <Link to="/course/kids/one-to-one/enroll">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer">
                    Start Now
                  </button>
                </Link>
              </div>

              {/* INTER COURSES */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  Inter Courses
                </h2>
                <div className="flex flex-wrap gap-4">
                  {courseDetails.interCourses.map((item, index) => (
                    <span
                      key={index}
                      className="bg-teal-100/60 text-[#007a91] px-4 py-2 rounded-md font-medium text-sm border border-teal-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  Target Audience
                </h2>
                <div className="space-y-2">
                  {courseDetails.targetAudience.map((feature, index) => (
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
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  Materials Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.materials.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. COURSE FEE / FEE STRUCTURE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  Fee Structure
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  <div>
                    {courseDetails.feeStructure.map((fee, index) => (
                      <div key={index} className="flex items-start gap-3 mb-2">
                        <FaCheckCircle className="text-[#00ADD2] mt-1" />
                        <span className="block text-[#002b2b] font-medium">
                          {fee}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1 Column (Using exact negative margin matching HifzDetail) */}
            <div className="space-y-4 -mt-[305px]">
              {/* Instructor / Course Preview Image Card */}
              <div className="block relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white p-2">
                <img
                  src="https://i.pravatar.cc/300?img=11"
                  alt="Instructor Preview"
                  className="w-full h-44 object-cover rounded-xl"
                />
              </div>

              {/* Pricing & Enrollment Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h2 className="text-xl font-bold text-[#007a91] mb-5">
                  Apply This Course
                </h2>
                <div className="flex items-center justify-center mb-2">
                  <Link to="/course/kids/one-to-one/enroll" className="w-full">
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

export default OneToOneDetails;
