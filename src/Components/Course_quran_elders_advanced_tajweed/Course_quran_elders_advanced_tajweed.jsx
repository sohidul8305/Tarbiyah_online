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
  FaCheckCircle,
  FaStar,
  FaCertificate,
  FaChevronDown,
  FaChevronUp,
  FaShareAlt,
  FaRegHeart,
  FaPlay,
  FaUserTie,
  FaVideo,
  FaHeadset,
  FaGlobe,
  FaPlayCircle,
  FaBook,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

const Course_quran_elders_advanced_tajweed = () => {
  const [showMore, setShowMore] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const course = {
    title: "অ্যাডভান্সড তাজউইদ",
    subtitle: "তাজউইদের গভীর নিয়মে ধাপে ধাপে দক্ষতা অর্জন",
    description: `তাজউইদ হলো কুরআন তিলাওয়াতের বিজ্ঞান। অ্যাডভান্সড তাজউইদ কোর্সটি তাদের জন্য যারা ইতিমধ্যে বেসিক তাজউইদ সম্পন্ন করেছেন এবং কুরআন তিলাওয়াতে আরও গভীরতা ও দক্ষতা অর্জন করতে চান। এই কোর্সে আপনি তাজউইদের জটিল নিয়মাবলী, মাখরাজের সূক্ষ্মতা, সিফাতের গভীরতা এবং কুরআন তিলাওয়াতের শৈলী সম্পর্কে বিস্তারিত জানতে পারবেন।`,
    shortDesc: `তাজউইদের গভীর নিয়মে ধাপে ধাপে দক্ষতা অর্জন। অ্যাডভান্সড তাজউইদ কোর্সটি তাদের জন্য যারা ইতিমধ্যে বেসিক তাজউইদ সম্পন্ন করেছেন...`,
    objectives: [
      "তাজউইদের জটিল নিয়মাবলী সম্পর্কে গভীর জ্ঞান অর্জন",
      "মাখরাজ ও সিফাতের সূক্ষ্মতা সম্পর্কে বিস্তারিত জানা",
      "কুরআন তিলাওয়াতের বিভিন্ন শৈলী ও পদ্ধতি শেখা",
      "হুসনে তিলাওয়াত ও সুরের উন্নয়ন",
      "প্র্যাকটিক্যাল তাজউইদ প্রয়োগের দক্ষতা বৃদ্ধি",
      "কুরআন তিলাওয়াতে আত্মবিশ্বাস অর্জন",
    ],
    materials: [
      "লাইভ জুম ক্লাস ও ভিডিও রেকর্ডিং (প্রতিটি ক্লাস)",
      "প্রাইভেট টেলিগ্রাম বা জুম গ্রুপ সাপোর্ট",
      "সাপ্তাহিক প্র্যাকটিস সেশন ও টেস্ট",
      "প্র্যাকটিক্যাল তাজবীদ এবং মাখরাজ",
      "বিস্তারিত লেকচার শীট ও নোট",
      "কোর্স শেষে সার্টিফিকেট প্রদান",
    ],
    curriculum: [
      {
        title: "মাখরাজের সূক্ষ্মতা ও বিস্তারিত আলোচনা",
        desc: "হরফগুলোর সঠিক মাখরাজ ও উচ্চারণের গভীর বিশ্লেষণ।",
      },
      {
        title: "সিফাতের গভীরতা ও প্রয়োগ",
        desc: "সিফাতসমূহের বিস্তারিত আলোচনা ও প্রায়োগিক অনুশীলন।",
      },
      {
        title: "তাজউইদের জটিল নিয়মাবলী",
        desc: "ইদগাম, ইখফা, ইকলাব, ক্বালক্বালাহ সহ জটিল নিয়মসমূহ।",
      },
      {
        title: "হুসনে তিলাওয়াত ও সুরের উন্নয়ন",
        desc: "তিলাওয়াতের সৌন্দর্য ও সুরের নিয়ম সম্পর্কে বিস্তারিত।",
      },
      {
        title: "প্র্যাকটিক্যাল তাজউইদ অনুশীলন",
        desc: "প্রতিটি নিয়মের প্রায়োগিক অনুশীলন ও ফিডব্যাক।",
      },
      {
        title: "কুরআন তিলাওয়াতের বিভিন্ন শৈলী",
        desc: "কিরাআতের বিভিন্ন শৈলী ও তাদের প্রয়োগ পদ্ধতি।",
      },
    ],
    targetAudience: [
      "যারা বেসিক তাজউইদ সম্পন্ন করেছেন",
      "যারা কুরআন তিলাওয়াতে আরও গভীরতা ও দক্ষতা অর্জন করতে চান",
      "যারা হুসনে তিলাওয়াত ও সুরের উন্নয়ন করতে চান",
      "যারা কুরআন তিলাওয়াতকে আরও সুন্দর ও শুদ্ধ করতে চান",
    ],
    feeStructure: {
      bd: {
        title: "বাংলাদেশী ছাত্র",
        admission: "ভর্তি ফি: ১৫০০ টাকা",
        monthly: "মাসিক ফি: ২০০০ টাকা",
      },
      overseas: {
        title: "প্রবাসী ছাত্র",
        admission: "ভর্তি ফি: ২৫০০ টাকা",
        monthly: "মাসিক ফি: ৩৫০০ টাকা",
      },
    },
    rating: "0 (0 Ratings)",
  };

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
        "আলহামদুলিল্লাহ, এই কোর্সটি আমার তাজউইদ জ্ঞানকে অনেক গভীর করেছে। উস্তাদের নির্দেশনায় আমি তাজউইদের জটিল নিয়মগুলো সহজে বুঝতে পেরেছি।",
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
        "অ্যাডভান্সড তাজউইদ কোর্সটি আমার তিলাওয়াতের মান অনেক উন্নত করেছে। উস্তাদের শিক্ষা পদ্ধতি সত্যিই অসাধারণ।",
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/course/quran"
          className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 mb-4 transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          <span>কোর্স পেজে ফিরে যান</span>
        </Link>

        {/* Main Grid Layout with Sidebar Alignment Correction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Banner Image */}
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md bg-cyan-900 relative">
              <img
                src={KidsImg}
                alt={course.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {course.title}
                </h1>
              </div>
            </div>

            {/* Share, Wishlist, Rating bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
              <div className="flex items-center gap-4 text-cyan-700">
                <button className="flex items-center gap-1.5 hover:underline font-medium">
                  <FaShareAlt /> Share
                </button>
                <button className="flex items-center gap-1.5 hover:underline font-medium">
                  <FaRegHeart /> Wishlist
                </button>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-600 text-xs ml-1">
                  {course.rating}
                </span>
              </div>
            </div>

            {/* ABOUT COURSE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-3 tracking-wide">
                ABOUT COURSE
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {showMore ? course.description : course.shortDesc}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-cyan-600 text-sm font-semibold mt-3 hover:underline flex items-center gap-1"
              >
                {showMore ? "- Show Less" : "+ Show More"}
              </button>
            </div>

            {/* WHAT YOU WILL GAIN */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                WHAT YOU WILL GAIN
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold leading-tight">
                      »
                    </span>
                    <span className="leading-snug">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EARN A CERTIFICATE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-cyan-700 font-bold text-lg mb-2 tracking-wide">
                  EARN A CERTIFICATE
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Add this certificate to your resume to demonstrate your skills
                  & increase your chances of getting noticed.
                </p>
              </div>
              <div className="w-48 bg-cyan-50 border border-cyan-200 rounded-lg p-3 shadow-inner text-center flex-shrink-0">
                <div className="w-full h-28 bg-white border border-cyan-300 rounded flex flex-col items-center justify-center text-cyan-800 text-xs font-bold shadow-sm p-2">
                  <FaCertificate className="text-3xl text-cyan-600 mb-1" />
                  <span className="text-[10px] text-gray-500">
                    কোর্স সার্টিফিকেট
                  </span>
                </div>
              </div>
            </div>

            {/* Ready To Apply Banner */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
              <span className="text-cyan-800 font-bold text-base md:text-lg">
                Ready To Apply Your Course
              </span>
              <Link to="/course/quran/elders-advanced-tajweed/enroll">
                <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition-all">
                  Start Now
                </button>
              </Link>
            </div>

            {/* MATERIALS INCLUDED */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                MATERIALS INCLUDED
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs md:text-sm text-gray-700">
                {course.materials.map((mat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-cyan-600 text-sm flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COURSE CURRICULUM (Accordion) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                COURSE CURRICULUM
              </h2>
              <div className="space-y-3">
                {course.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="border border-cyan-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-3.5 bg-cyan-50/50 hover:bg-cyan-50 text-cyan-800 font-semibold text-sm transition-colors text-left"
                    >
                      <span>- {item.title}</span>
                      {openAccordion === index ? (
                        <FaChevronUp className="text-xs flex-shrink-0 ml-2" />
                      ) : (
                        <FaChevronDown className="text-xs flex-shrink-0 ml-2" />
                      )}
                    </button>
                    {openAccordion === index && (
                      <div className="p-3.5 bg-white text-xs md:text-sm text-gray-600 border-t border-cyan-100">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TARGET AUDIENCE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                TARGET AUDIENCE
              </h2>
              <div className="space-y-2.5 text-xs md:text-sm text-gray-700">
                {course.targetAudience.map((target, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold leading-tight">
                      »
                    </span>
                    <span className="leading-snug">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FEE STRUCTURE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                FEE STRUCTURE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {course.feeStructure.bd.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.bd.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.bd.monthly}
                  </p>
                </div>
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {course.feeStructure.overseas.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.overseas.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.overseas.monthly}
                  </p>
                </div>
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
                          <FaStar key={i} className="text-yellow-400 text-sm" />
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

          {/* Right Sidebar (Video Preview & Apply Card) - Aligned to top with left column */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-md p-4 border border-cyan-100">
              {/* Thumbnail / Video Box */}
              <div className="relative rounded-lg overflow-hidden shadow mb-4 bg-black group cursor-pointer h-40">
                <img
                  src={KidsImg}
                  alt="Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-cyan-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-cyan-600 transition-colors">
                    <FaPlay className="text-xs ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-cyan-800 tracking-wider uppercase block mb-1">
                  Apply This Course
                </span>
              </div>

              <Link to="/course/quran/elders-advanced-tajweed/enroll">
                <button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 rounded-lg shadow transition-all text-sm flex items-center justify-center gap-2">
                  <span>Enroll Now</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Course_quran_elders_advanced_tajweed;
