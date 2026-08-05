import React, { useState } from "react";
import { Link } from "react-router";
// Swiper এবং প্রয়োজনীয় মডিউল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper-এর CSS ফাইলগুলো ইমপোর্ট করুন
import "swiper/css";
import "swiper/css/pagination";

import {
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaAngleDoubleRight,
  FaStar,
  FaPlayCircle,
  FaVideo,
  FaUserTie,
  FaHeadset,
  FaGlobe,
  FaCertificate,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

const OneToOneDetails = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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

  // Why Tarbiyah Quran Studies features with icons
  const whyFeatures = [
    {
      icon: <FaUserTie className="text-xl" />,
      text: "কিডস ফেন্ডলি উস্তাদ",
    },
    {
      icon: <FaVideo className="text-xl" />,
      text: "লাইভ ক্লাস",
    },
    {
      icon: <FaCheckCircle className="text-xl" />,
      text: "মাসিক মূল্যায়ন",
    },
    {
      icon: <FaGlobe className="text-xl" />,
      text: "ব্যক্তিগত অগ্রগতি পর্যবেক্ষণ",
    },
    {
      icon: <FaHeadset className="text-xl" />,
      text: "ওয়ান-টু-ওয়ান সাপোর্ট",
    },
    {
      icon: <FaCertificate className="text-xl" />,
      text: "সার্টিফিকেট",
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
        "কুরআন শিক্ষার পাশাপাশি আমার সন্তানেরাও এই কোর্স থেকে উপকৃত হয়েছে। উস্তাদের শিক্ষা পদ্ধতি সত্যিই অসাধারণ।",
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
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
    {
      id: 2,
      title: "ভিডিও ২",
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
    {
      id: 3,
      title: "ভিডিও ৩",
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
    {
      id: 4,
      title: "ভিডিও ৪",
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
    {
      id: 5,
      title: "ভিডিও ৫",
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
    {
      id: 6,
      title: "ভিডিও ৬",
      thumbnail: "https://img.youtube.com/vi/NI8VoGYDtYs/hqdefault.jpg",
      url: "https://youtu.be/NI8VoGYDtYs?si=Z_FxwYJJuUgzeliU",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "এই কোর্সটি কাদের জন্য?",
      answer:
        "এই কোর্সটি শুদ্ধ মাত্রায় কুরআন পড়তে পারে এমন শিক্ষার্থীদের জন্য। যে কোনো বয়সের যে কেউ হাফেজ হতে পারে। কর্মব্যস্ত জীবনের পাশাপাশি ঘরে বসে কুরআন হিফজ করতে আগ্রহীদের জন্য।",
    },
    {
      question: "ক্লাসগুলো কীভাবে পরিচালিত হয়?",
      answer:
        "ক্লাসগুলো সম্পূর্ণ অনলাইনে লাইভ পরিচালিত হয়। প্রতিটি ক্লাসের রেকর্ডিংও সংরক্ষণ করা হয়, যাতে শিক্ষার্থীরা প্রয়োজন অনুযায়ী আবার দেখতে পারেন।",
    },
    {
      question: "কোর্স শেষে কী পাওয়া যাবে?",
      answer:
        "সফলভাবে কোর্স সম্পন্নকারীদের Tarbiyah Online Madrasah-এর পক্ষ থেকে সার্টিফিকেট প্রদান করা হবে।",
    },
    {
      question: "ভর্তি ফি কত?",
      answer: "ভর্তি ফি ২০০০ টাকা এবং মাসিক ফি ২০০০ টাকা।",
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

              {/* ========== LAST 3 SECTIONS ========== */}

              {/* 1. কেন তারবিয়াহ কুরআন স্টাডিজ ? */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    কেন তারবিয়াহ কুরআন স্টাডিজ ?
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
                      Enroll Now
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
