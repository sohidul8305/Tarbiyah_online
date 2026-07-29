import React, { useState } from "react";
import { Link } from "react-router";
import AlemiyahBanner from "../../image/allemiyahkidsbanner.jpeg";
import AlemyahCourse from "../../image/allemiyahcourse.jpeg";
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
  FaChild,
  FaBook,
  FaLightbulb,
  FaClock,
  FaCalendarAlt,
  FaVideo,
  FaCertificate,
  FaRocket,
  FaArrowRight,
  FaUserTie,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaQuestionCircle,
  FaRegListAlt,
  FaRegCalendarCheck,
  FaRegClipboard,
  FaDownload as FaRegDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const AlimiyahKidsDetails = () => {
  const [openSemester, setOpenSemester] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  // Alimiyah Kids এর ইনস্ট্রাক্টর
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

  // Alimiyah Kids এর মূল ডাটা
  const courseDetails = {
    title: "Alimiyah for Kids",
    subtitle: "বাচ্চাদের জন্য ইসলামিক শিক্ষা",
    description: `
     Alimiyah Basic Islam Course is basically designed for Muslim children and teenagers. Which will help the student to acquire basic knowledge of Islam as well as to implement it. This course will play a great role in knowing the Islamic solutions and procedures in all the necessary areas based on the 10 basic subjects. This course will develop positive mindset in children.
    `,
    objectives: [
      "ছোটদের সিরাহ",
      "বিশুদ্ধ আকিদাহ সম্পর্কিত জ্ঞানলাভ",
      "ব্যাসিক মাসাআলা-মাসায়েল",
      "ছোটদের উপযোগী দ্বীনের মৌলিক জ্ঞানার্জন",
      "ছোটদের আরবি ভাষায় শিক্ষার আসর",
      "সম্পূর্ণ অনলাইন ভিত্তিক কোর্স",
      "লাইভ ক্লাস, মাশক্ব, লেকচার শীট ও রেকর্ডেড ক্লাস",
    ],
    benefits: [
      "প্রবাসে বসবাসের ফলে যারা দ্বীনী শিক্ষার্জনের সুবিধা হতে বঞ্চিত",
      "ইংলিশ মিডিয়ামের শিক্ষার্থীদের জন্য রয়েছে প্রফেশনাল ইংলিশ ভার্সন",
      "জেনারেল শিক্ষার পাশাপাশি যারা দ্বীনি শিক্ষার আগ্রহ লালন করেন",
      "৮-১২ বছরের সকল শিক্ষার্থীর জন্য এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে",
      "যারা নিজেদের সন্তানকে প্র্যাক্টিসিং মুসলিম হিসেবে গড়ে তুলতে চান",
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

  // Materials Included (ইমেজের ডাটা অনুযায়ী)
  const materialsData = [
    {
      text: "সপ্তাহে ২ দিন ৪টি ক্লাস",
      icon: <FaClock className="text-[#00ADD2]" />,
    },
    {
      text: "প্রতিটি ক্লাস ৪০ মিনিট",
      icon: <FaClock className="text-[#00ADD2]" />,
    },
    {
      text: "প্রতিটি ক্লাসের লাইভ ক্লাস রেকর্ড",
      icon: <FaVideo className="text-[#00ADD2]" />,
    },
    {
      text: "প্রতিটি ক্লাসের রেকর্ডেড ভিডিও",
      icon: <FaRegDownload className="text-[#00ADD2]" />,
    },
    {
      text: "কুইজ ও মিডটার্ম পরীক্ষা",
      icon: <FaQuestionCircle className="text-[#00ADD2]" />,
    },
    {
      text: "সেমিস্টার ফাইনাল পরীক্ষা",
      icon: <FaRegClipboard className="text-[#00ADD2]" />,
    },
    {
      text: "কোর্স ডিউরেশন এর নোট",
      icon: <FaFileAlt className="text-[#00ADD2]" />,
    },
    {
      text: "সার্টিফিকেট ও ইজাযাহ প্রদান",
      icon: <FaCertificate className="text-[#00ADD2]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/alemiah"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">আলিমিয়াহ পেজে ফিরে যান</span>
          </Link>

          {/* Banner Image - Same size as Diploma */}
          <img
            src={AlemiyahBanner}
            alt="Alimiyah Kids Banner"
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner (Same structure as Diploma) */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center gap-4 py-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaShare className="text-lg" />
                <span className="font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaBookmark className="text-lg" />
                <span className="font-medium">Wishlist</span>
              </button>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-[#00ADD2] mb-3">
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
                  এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ABOUT COURSE
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {courseDetails.description}
                </p>
              </div>

              {/* 2. WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    WHAT YOU WILL GAIN
                  </h2>
                </div>
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

              {/* 3. Ready To Apply Button */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    Ready To Apply Your Course
                  </h3>
                  <p className="text-gray-600 text-sm">
                    এখনই এনরোল করুন এবং আপনার শেখার যাত্রা শুরু করুন।
                  </p>
                </div>
                <Link to="/Course-apply-from">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    Start Now
                  </button>
                </Link>
              </div>

              {/* 4. TARGET AUDIENCE (Exactly as before) */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  TARGET AUDIENCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courseDetails.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-[#00ADD2] mt-1 text-xs">●</span>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. MATERIALS INCLUDED (From Screenshot Style) */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  MATERIALS INCLUDED
                </h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  {materialsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-lg">{item.icon}</div>
                      <span className="text-[#002b2b] text-[15px] font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. COURSE CURRICULUM (From Screenshot Style with Working YouTube Links) */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  COURSE CURRICULUM
                </h2>
                <div className="border border-gray-300 rounded-sm">
                  {/* Curriculum Item 1 */}
                  <div className="border-b border-gray-300">
                    <div
                      onClick={() => toggleSemester(1)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 1 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        কুরআন
                      </span>
                    </div>
                    {openSemester === 1 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p className="font-semibold text-[#002b2b]">
                          আরবি বর্ণমালা পরিচিতি
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          আরবি বর্ণমালার বিশুদ্ধ উচ্চারণ
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          তাজবিদের সাধারণ বিষয় ও বিশুদ্ধ তিলাওয়াত
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          সালাতে পড়া সূরাগুলো মুখস্থ করা
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 2 */}
                  <div className="border-b border-gray-300">
                    <div
                      onClick={() => toggleSemester(2)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 2 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        হিফজুল হাদিস
                      </span>
                    </div>
                    {openSemester === 2 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <a
                          href="https://youtu.be/ISn4YoagkLA?si=xb21YNXxplHDjIOt"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#00ADD2] underline hover:text-[#002b2b] transition-colors mb-2"
                        >
                          <FaExternalLinkAlt className="text-xs" /> ভিডিও লিংক
                          দেখুন
                        </a>
                        <p>
                          ২০ টি জীবনঘনিষ্ট হাদিস মুখস্তকরণ
                          <br /> অর্থসহ সহীহ হাদিসের মৌলিক শিক্ষা <br />
                          আকিদা-আখলাক ও আত্মিক বিশুদ্ধতায় হাদিসের প্রভাব
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 3 */}
                  <div className="border-b border-gray-300">
                    <div
                      onClick={() => toggleSemester(3)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 3 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        ছোটদের আকিদাহ
                      </span>
                    </div>
                    {openSemester === 3 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p className="text-[#002b2b]">
                          আল্লাহ ও মালাইকা সম্পর্কে মৌলিক আকিদাহ <br /> রাসুল ও
                          কিতাব সম্পর্কে সঠিক আকিদাহ <br /> মালাইকা ও রাসুলদের
                          সম্পর্কে সঠিক আকিদাহ <br /> আখিরাত ও তাকদীর ও তার
                          কিতাব সম্পর্কে সঠিক আকিদাহ
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 4 */}
                  <div className="border-b border-gray-300">
                    <div
                      onClick={() => toggleSemester(4)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 4 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        ইসলামিক ছালাত ও ইবাদতের দুয়া
                      </span>
                    </div>
                    {openSemester === 4 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <a
                          href="https://youtu.be/iYVjpe_ySWg?si=HXVb32bhb8ofy5AW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#00ADD2] underline hover:text-[#002b2b] transition-colors mb-2"
                        >
                          <FaExternalLinkAlt className="text-xs" /> ভিডিও লিংক
                          দেখুন
                        </a>
                        <p>
                          সুন্নাহভিত্তিক জীবন যাপনের মৌলিক ধারণা
                          <br /> প্রতি কাজে সুন্নাহ মেনে চলা
                          <br /> ঘুমোতে যাওয়া ও ঘুম থেকে ওঠার নিয়ম ও দুয়া
                          <br /> ওয়াশরুমে যাওয়া ও বের হবার নিয়ম ও দুয়া <br />
                          মসজিদে প্রবেশ ও বের হবার নিয়ম ও দুয়া
                          <br /> কথা বলার আদব ও শিষ্টাচার
                          <br /> অন্যের ঘরে প্রবেশের আদব, ইত্যাদি
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 5 */}
                  <div>
                    <div
                      onClick={() => toggleSemester(5)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 5 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        সিরাহ
                      </span>
                    </div>
                    {openSemester === 5 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p className="text-[#002b2b]">
                          রাসুলের বংশ পরিচিতি <br />
                          আরব ও আরবজাতীর জীবন দর্শন <br />
                          রাসুলের জন্মকালীন আশ্চর্য ঘটনাপ্রবাহ
                          <br /> রাসুলের বাল্যকাল ও শৈশব
                          <br /> রাসুলের তারুণ্য ও বিবাহ
                          <br />
                          নবুওয়াতপ্রাপ্তি ও দাওয়াত
                          <br /> সংগ্রামী কর্মজীবন ও পরলোকগমন
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 7. FEE STRUCTURE (From Screenshot Style) */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  FEE STRUCTURE
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  {/* Left Column - Bangla Medium */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      বাংলা মিডিয়াম:
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
                          মাসিক ফি ২০০০ টাকা (৬ মাস)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - English Medium */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      ইংরেজি মিডিয়াম:
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          ভর্তি ফি ৩০০০ টাকা
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          মাসিক ফি ৩০০০ টাকা (৬ মাস)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Note below fee structure */}
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    * সেমিস্টার ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদান করার
                    সুযোগ আছে।
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1 Column (Unchanged) */}
            <div className="space-y-4 -mt-[305px]">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={AlemyahCourse}
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
              {/* Enrollment & Info Card (New Design from Image) */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                {/* Enrollment & Info Card (New Design from Image) */}
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                  <h1 className="text-2xl font-bold text-[#007a91] mb-5">
                    ENROLL NOW
                  </h1>

                  {/* Split Button with Links */}
                  <div className="flex items-center justify-center mb-6 relative">
                    {/* Left Half - Link */}
                    <Link to="/enroll/bangla-version" className="w-1/2">
                      <button className="w-full bg-[#007a91] text-white font-bold py-3 rounded-l-md hover:opacity-90 transition">
                        Bangla Version
                      </button>
                    </Link>

                    {/* Middle Or Circle */}
                    <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                      Or
                    </div>

                    {/* Right Half - Link */}
                    <Link to="/enroll/english-version" className="w-1/2">
                      <button className="w-full bg-[#003d3d] text-white font-bold py-3 rounded-r-md hover:opacity-90 transition">
                        English Version
                      </button>
                    </Link>
                  </div>

                  {/* Info Details */}
                  <div className="space-y-3 text-left px-1 text-[#002b2b]">
                    <div className="flex items-center gap-2 text-[15px]">
                      <span className="font-medium">Course Level:</span>
                      <span className="font-bold">Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2 text-[15px]">
                      <span className="font-medium">Enrolled:</span>
                      <span className="font-bold">325</span>
                    </div>
                    <div className="flex items-center gap-2 text-[15px]">
                      <span className="font-medium">Last Updated:</span>
                      <span className="font-bold">12/24/2024</span>
                    </div>
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
