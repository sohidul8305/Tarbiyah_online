import React, { useState } from "react";
import { Link } from "react-router-dom";
// Swiper এবং প্রয়োজনীয় মডিউল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper-এর CSS ফাইলগুলো ইমপোর্ট করুন
import "swiper/css";
import "swiper/css/pagination";

import ElderscourseImg from "../../image/Quranforelderscourse.jpg";
import EldersbannerImg from "../../image/Quranforeldersbanner.jpg";
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
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const EldersQuidaDetails = () => {
  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Elders Quida এর ইনস্ট্রাক্টর
  const instructors = [
    {
      id: 1,
      name: "হাফেজ মাওলানা আব্দুর রহমান",
      title: "প্রধান কুরআন শিক্ষক",
      subtitle: "বিশেষজ্ঞ: তাজবিদ ও কিরাত",
      image: "https://i.pravatar.cc/150?img=11",
      expertise: "তাজবিদ ও কিরাত",
    },
    {
      id: 2,
      name: "মাওলানা সাদিকুর রহমান",
      title: "কায়দা শিক্ষক",
      subtitle: "বিশেষজ্ঞ: মাখরাজ ও সিফাত",
      image: "https://i.pravatar.cc/150?img=14",
      expertise: "মাখরাজ ও সিফাত",
    },
  ];

  // Elders Quida এর Course Data
  const courseDetails = {
    title: "কুরআন স্টাডিজ ফর এল্ডার্স",
    description: `Narrated by Abu Hurairah [RA]: The Messenger of Allah [SAW] said, "Whoever does not recite the Qur'an with proper pronunciation is not considered part of my Ummah." - Sahih Bukhari 7527. Therefore, it is essential for all of us to learn how to recite the Qur'an correctly and to ensure that our elders can also learn the Quran with proper tajweed and pronunciation. This course is specially designed for elderly people who want to learn Quran from the basics.`,
    objectives: [
      "মসজিদে নববীর পদ্ধতিতে পাঠদান",
      "ধাপে ধাপে বেসিক তাজউইদ শিক্ষা",
      "শেষ ১০টি ছোট সূরা মাশক",
      "বিশুদ্ধ উচ্চারণ শিক্ষায় মাশক্ব ও তাল্ক্বীন",
      "মাতৃভাষার দোয়া ও আমলজাত শিক্ষা",
      "হাদীস মুখস্থ শিক্ষা",
      "বয়স্কদের জন্য বিশেষ পাঠদান পদ্ধতি",
    ],
  };

  // Curriculum Data for Elders
  const semestersData = [
    { title: "হুরুফুল হিজাইল মুফরাদাহ (বর্ণমালা শেখা)" },
    { title: "হুরুফুল হিজাইল মুরাক্কাবাহ (যুক্তবর্ণ শেখা)" },
    { title: "হুরুফুল মুক্বাত্তাআ'ত" },
    { title: "হারাকাতের পরিচিতি (ফাতহা, কাসরা, দম্মাহ)" },
    { title: "তানউইনের পরিচিতি" },
    { title: "হারাকাত ও তানউইনের অনুশীলন" },
    { title: "আলিফ সাগীরা, ইয়া সাগীরা, ওয়াও সাগীরা" },
    { title: "হুরুফুল মাদ্দ ও লীন (অনুশীলন)" },
    { title: "সূকূনের পরিচিতি ও অনুশীলন" },
    { title: "সাদ্দাহ পরিচিতি ও অনুশীলন" },
    { title: "সূকূন ও সাদ্দাহর সাথে মাদ্দ" },
    { title: "সকল তাজউইদের অনুশীলন" },
    { title: "ছোট সূরাহ সমূহের প্রাকটিস" },
  ];

  // Why Tarbiyah Quran for Elders features
  const whyFeatures = [
    {
      icon: <FaUserTie className="text-xl" />,
      text: "ইজাজাহপ্রাপ্ত অভিজ্ঞ উস্তাদ ও উস্তাযাহ",
    },
    {
      icon: <FaVideo className="text-xl" />,
      text: "লাইভ + রেকর্ডেড ক্লাস",
    },
    {
      icon: <FaBook className="text-xl" />,
      text: "এল্ডার্স ফেন্ডলি কারিকুলাম",
    },
    {
      icon: <FaHeadset className="text-xl" />,
      text: "ওয়ান-টু-ওয়ান গাইডলাইন",
    },
    {
      icon: <FaCertificate className="text-xl" />,
      text: "সার্টিফিকেট",
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      text: "নিরাপদ পরিবেশ",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "আব্দুল্লাহ আল মামুন",
      designation: "শিক্ষার্থী, ঢাকা",
      quote:
        "আলহামদুলিল্লাহ, এই কোর্সটি আমার কুরআন শিক্ষার যাত্রাকে অনেক সহজ করে দিয়েছে। উস্তাদের নির্দেশনায় আমি খুব দ্রুত তাজবিদ শিখতে পেরেছি।",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "মোঃ সাইফুল ইসলাম",
      designation: "প্রবাসী, যুক্তরাজ্য",
      quote:
        "ব্যস্ত জীবনের মাঝেও আমি এই কোর্সটি সম্পন্ন করতে পেরেছি। লাইভ ক্লাস ও রেকর্ডেড ভিডিওগুলোর কারণে সময়ানুবর্তিতা বজায় রাখা সম্ভব হয়েছে।",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      name: "মোঃ হাসান মিয়া",
      designation: "ব্যবসায়ী, চট্টগ্রাম",
      quote:
        "কুরআন শিক্ষার পাশাপাশি আমার প্রবীণ বাবাও এই কোর্স থেকে উপকৃত হয়েছেন। উস্তাদের শিক্ষা পদ্ধতি সত্যিই অসাধারণ।",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 4,
      name: "আমিনুল ইসলাম",
      designation: "শিক্ষার্থী, সিলেট",
      quote:
        "শায়খ প্রফেসর মোখতার আহমাদের তত্ত্বাবধানে পড়ার সুযোগ পাওয়া আমার জন্য একটি বড় প্রাপ্তি। কারিকুলাম অত্যন্ত সুসংগঠিত।",
      image: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: 5,
      name: "মোঃ নাজমুল হক",
      designation: "চাকরিজীবী, রাজশাহী",
      quote:
        "সপ্তাহে মাত্র ৩ দিন ক্লাস থাকায় চাকরির সাথে তাল মিলিয়ে পড়াশোনা করতে পারছি। একাডেমিক সাপোর্ট দল সবসময় পাশে আছে।",
      image: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 6,
      name: "মোঃ ইব্রাহিম খলিল",
      designation: "শিক্ষার্থী, খুলনা",
      quote:
        "ইজাজাহ ও সার্টিফিকেট পাওয়ার সুযোগ এই কোর্সকে আরও মূল্যবান করেছে। ইনশাআল্লাহ, উচ্চশিক্ষার পথ সুগম হবে।",
      image: "https://i.pravatar.cc/150?img=16",
    },
  ];

  // Video Gallery Data
  const videoGallery = [
    {
      id: 1,
      title: "ভিডিও ১",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
    {
      id: 2,
      title: "ভিডিও ২",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
    {
      id: 3,
      title: "ভিডিও ৩",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
    {
      id: 4,
      title: "ভিডিও ৪",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
    {
      id: 5,
      title: "ভিডিও ৫",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
    {
      id: 6,
      title: "ভিডিও ৬",
      thumbnail: "https://img.youtube.com/vi/7gLTq-1fJFk/hqdefault.jpg",
      url: "https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "আমার বয়স অনেক বেশি, আমি কি এই কোর্সটি করতে পারব?",
      answer:
        "অবশ্যই। কুরআন শেখার জন্য বয়স কোনো বাধা নয়। এই কোর্সটি বিশেষভাবে প্রাপ্তবয়স্কদের প্রয়োজন বিবেচনায় তৈরি করা হয়েছে।",
    },
    {
      question: "এই কোর্সের মূল উদ্দেশ্য কী?",
      answer:
        "শুদ্ধ তাজউইদসহ কুরআন তিলাওয়াত শেখানো এবং নিয়মিত অনুশীলনের মাধ্যমে আত্মবিশ্বাসের সঙ্গে কুরআন পড়তে সক্ষম করে তোলা।",
    },
    {
      question:
        "অনেক জায়গায় ১ মাসে কুরআন শেখানো হয়, কিন্তু আপনাদের কোর্স ৪ মাসের কেন?",
      answer:
        "তাজউইদ ও শুদ্ধ তিলাওয়াত একটি দক্ষতা, যা সময়, অনুশীলন ও নিয়মিত মাশক ছাড়া অর্জন করা সম্ভব নয়। তাই আমরা স্থায়ী শেখাকে গুরুত্ব দিয়ে পর্যাপ্ত সময় নিয়ে পাঠদান করি।",
    },
    {
      question: "কোর্স শেষে আমি কি ওস্তাদ/উস্তাযাহ হতে পারব?",
      answer:
        "এই কোর্সটি মূলত ব্যক্তিগতভাবে শুদ্ধ তিলাওয়াত শেখার জন্য। তবে উচ্চতর প্রশিক্ষণ ও নির্ধারিত যোগ্যতা অর্জনের মাধ্যমে ভবিষ্যতে শিক্ষকতা করার সুযোগ তৈরি হতে পারে।",
    },
    {
      question: "আমি কেন আপনাদের প্রোগ্রামে ভর্তি হব?",
      answer:
        "ইজাজাহপ্রাপ্ত অভিজ্ঞ উস্তাদ ও উস্তাযাহ, এল্ডার্স ফেন্ডলি কারিকুলাম, লাইভ ও রেকর্ডেড ক্লাস, ওয়ান টু ওয়ান সাপোর্ট এবং ধাপে ধাপে শেখানোর পদ্ধতি আমাদের প্রোগ্রামকে আলাদা করেছে।",
    },
    {
      question: "আপনাদের ওস্তাদ–উস্তাযাহদের যোগ্যতা কী?",
      answer:
        "আমাদের শিক্ষকবৃন্দ ইজাজাহপ্রাপ্ত, অভিজ্ঞ এবং কুরআন শিক্ষাদানে প্রশিক্ষিত। তাঁরা দীর্ঘদিন ধরে অনলাইন ও অফলাইন উভয় মাধ্যমে পাঠদান করছেন।",
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
            src={EldersbannerImg}
            alt="Elders Quida Banner"
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
                    "দেশ ও প্রবাস থেকে কুরআনের সঠিক তিলাওয়াত শিখতে আগ্রহী প্রবীণ মুসলিম",
                    "যারা নিজেদের সন্তান ও নাতি-নাতনিদের কুরআন শিক্ষা দিতে চান",
                    "যারা বৃদ্ধ বয়সেও কুরআন শিক্ষার প্রতি আগ্রহ লালন করেন",
                    "জেনারেল শিক্ষার পাশাপাশি যারা কুরআন শিক্ষার প্রতি আগ্রহ লালন করেন",
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
                    "ক্লাসের সময়কাল: 120 মিনিট (প্রতি ক্লাস)",
                    "পরীক্ষা: মিডটার্ম এবং ফাইনাল",
                    "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    "কোর্স শেষে সার্টিফিকেট প্রদান",
                    "বয়স্কদের জন্য বিশেষ সাপোর্ট",
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
                          ভর্তি ফি ১০০০ টাকা
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          মাসিক ফি ১০০০ টাকা
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

              {/* ========== LAST 3 SECTIONS ========== */}

              {/* 1. কেন তারবিয়াহ কুরআন ফর এল্ডার্স */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    কেন তারবিয়াহ কুরআন ফর এল্ডার্স ?
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {whyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 p-5 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition-all shadow-md"
                    >
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-600 flex items-center justify-center shrink-0 text-xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-black">
                        {feature.text}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা
                  </h2>
                </div>

                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="testimonial-swiper"
                >
                  {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#002b2b] to-[#004d4d] mx-auto mb-4 flex items-center justify-center text-white text-3xl shadow-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="text-yellow-400 text-sm"
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm italic leading-relaxed">
                          "{item.quote}"
                        </p>
                        <p className="text-[#002b2b] font-bold mt-3">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {item.designation}
                        </p>
                        <div className="mt-3 flex justify-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 3. ভিডিও গ্যালারি */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ভিডিও গ্যালারি
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {videoGallery.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-48 bg-gray-200">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                            <FaPlayCircle className="text-3xl" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <p className="text-white text-sm font-semibold">
                            {video.title}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* 4. FAQ */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">FAQ</h2>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-[#002b2b]">
                          {index + 1}. {faq.question}
                        </span>
                        {openFaq === index ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="p-4 bg-white border-t border-gray-200 text-gray-700">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
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
                  src={ElderscourseImg}
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
                    to="/course/kids/quidaelders/enrollbnagla"
                    className="w-1/2"
                  >
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      Bangla Version
                    </button>
                  </Link>

                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    Or
                  </div>

                  <Link
                    to="/enroll/quidaelders/english-version"
                    className="w-1/2"
                  >
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 text-xs rounded-r-md hover:opacity-90 transition">
                      English Version
                    </button>
                  </Link>
                </div>

                {/* Info Details */}
                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Course Level:</span>
                    <span className="font-bold">Beginner</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Enrolled:</span>
                    <span className="font-bold">180</span>
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

export default EldersQuidaDetails;
