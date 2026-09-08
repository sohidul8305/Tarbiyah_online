import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaUserTie,
  FaBook,
  FaPlayCircle,
  FaArrowRight,
  FaAngleDoubleRight,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Import banner image
import surahmulkCoverImg from "../../image/surahmulk.png";

// Import instructor image (placeholder)
import NumanImg from "../../image/Abunoman.jpg"; // change to actual instructor image if available

// --- Language Hook ---
import { useState as useStateHook, useEffect } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useStateHook(
    () => localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("languageChange", handleStorageChange);
    return () => {
      window.removeEventListener("languageChange", handleStorageChange);
    };
  }, []);

  const t = (translations) => {
    return translations[language] || translations["en"];
  };

  return { language, t };
};
// -----------------------------------------------

const SurahmulkDetails = () => {
  const { t } = useLanguage();

  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- Instructor ---
  const instructors = [
    {
      id: 1,
      name: t({ en: "Ustadh Abu Noman", bn: "উস্তায আবু নোমান" }),
      title: t({ en: "Senior Instructor", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran & Tajweed", bn: "কুরআন ও তাজউইদ" }),
      image: NumanImg,
    },
  ];

  // --- Course Details (all text from your file) ---
  const courseDetails = {
    title: t({
      en: "Surah Al-Mulk Memorization Course",
      bn: "সূরা মুলক হিফজ কোর্স",
    }),
    subtitle: t({
      en: "Memorization & Tadabbur of Surah Al-Mulk",
      bn: "সূরা মুলকের হিফজ ও তাদাব্বুর",
    }),
    description: t({
      en: "Surah Al-Mulk is one of the most important surahs of the Qur'an. Instead of memorizing a few verses at a time, this course focuses on understanding the meaning, lesson, and message of each verse, making your relationship with the Qur'an deeper. In this course, each day you will memorize one verse along with its Tadabbur (reflection). That is, not just memorization, but also what the verse is saying, its core lesson, and what impact it should have on our lives – all explained in a simple way. The course is fully recorded, so you can learn one verse a day at your own pace and gradually memorize the entire Surah Al-Mulk.",
      bn: "সূরা মুলক কুরআনের অত্যন্ত গুরুত্বপূর্ণ একটি সূরা। মাত্র কয়েকটি আয়াত করে মুখস্থ করার পরিবর্তে প্রতিটি আয়াতের অর্থ, শিক্ষা ও বার্তা বুঝে হিফজ করলে কুরআনের সঙ্গে সম্পর্ক আরও গভীর হয়। এই কোর্সে প্রতিদিন একটি করে আয়াত নিয়ে হিফজের পাশাপাশি আয়াতের তাদাব্বুর করা হবে। অর্থাৎ শুধু মুখস্থ নয় আয়াতটি কী বলছে, এর মূল শিক্ষা কী এবং আমাদের জীবনে এর কী প্রভাব থাকা উচিত এসব বিষয়ও সহজভাবে তুলে ধরা হবে। কোর্সটি সম্পূর্ণ রেকর্ডেড, ফলে নিজের সুবিধামতো সময়ে প্রতিদিন একটি আয়াত শিখে ধীরে ধীরে পুরো সূরা মুলক হিফজ করা যাবে।",
    }),
    objectives: [
      t({
        en: "Gradually memorize the entire Surah Al-Mulk",
        bn: "সূরা মুলক ধীরে ধীরে সম্পূর্ণ হিফজ করতে পারবেন",
      }),
      t({
        en: "Understand the meaning and core message of each verse",
        bn: "প্রতিটি আয়াতের অর্থ ও মূল বক্তব্য বুঝতে পারবেন",
      }),
      t({
        en: "Develop the habit of Tadabbur (reflection) on the verses",
        bn: "আয়াতের শিক্ষা নিয়ে তাদাব্বুরের অভ্যাস গড়ে তুলতে পারবেন",
      }),
      t({
        en: "Learn to connect the Qur'anic verses with your own life",
        bn: "কুরআনের আয়াতকে নিজের জীবনের সঙ্গে সম্পৃক্ত করতে শিখবেন",
      }),
      t({
        en: "Build a daily habit of learning the Qur'an in small consistent steps",
        bn: "প্রতিদিন অল্প অল্প করে নিয়মিত কুরআন শেখার অভ্যাস তৈরি করতে পারবেন",
      }),
      t({
        en: "Get the opportunity to internalize the Qur'anic message along with memorization",
        bn: "মুখস্থ করার পাশাপাশি কুরআনের বার্তা হৃদয়ে ধারণ করার সুযোগ পাবেন",
      }),
    ],
    courseStructure: t({
      en: "Daily learning method: 1 verse → Memorization → Meaning → Tadabbur → Lesson → Application",
      bn: "প্রতিদিনের শেখার পদ্ধতি: ১ আয়াত → হিফজ → অর্থ → তাদাব্বুর → শিক্ষা → আমলের চিন্তা",
    }),
    structureNote: t({
      en: "Every day, only one verse will be covered step by step. This makes it easy to complete the course regularly even with a busy schedule.",
      bn: "প্রতিদিন মাত্র একটি আয়াত নিয়ে ধারাবাহিকভাবে এগিয়ে যাওয়া হবে। ফলে ব্যস্ততার মধ্যেও নিয়মিতভাবে কোর্সটি সম্পন্ন করা সহজ হবে।",
    }),
    targetAudience: [
      t({
        en: "Those who want to memorize Surah Al-Mulk with understanding",
        bn: "যারা সূরা মুলক বুঝে হিফজ করতে চান",
      }),
      t({
        en: "Those who wish to develop the habit of Tadabbur",
        bn: "যারা তাদাব্বুরের অভ্যাস গড়তে চান",
      }),
      t({
        en: "Students, employees, and busy individuals",
        bn: "ছাত্র, চাকরিজীবী ও ব্যস্ত ব্যক্তিরা",
      }),
      t({
        en: "Anyone who wants to connect with the Qur'an on a deeper level",
        bn: "যারা কুরআনের সঙ্গে গভীর সম্পর্ক গড়তে চান",
      }),
    ],
    feeStructure: {
      monthly: t({
        en: "Course Fee: Free! (Regular Fee: ৳1,000)",
        bn: "কোর্স ফি: সম্পূর্ণ ফ্রি! (নিয়মিত ফি: ৳১,০০০)",
      }),
      oneTime: {
        title: t({ en: "Completely Free", bn: "সম্পূর্ণ বিনামূল্যে" }),
        description: t({
          en: "This course is open to everyone completely free of charge to connect more people with the Qur'an. No course fee, no payment required. All you need is the eagerness to learn.",
          bn: "কুরআনের সঙ্গে আরও বেশি মানুষকে যুক্ত করার উদ্দেশ্যে সূরা মুলক হিফজ ও তাদাব্বুর কোর্সটি সবার জন্য সম্পূর্ণ বিনামূল্যে উন্মুক্ত। কোনো কোর্স ফি নেই। কোনো পেমেন্ট প্রয়োজন নেই। শুধু শেখার আগ্রহটুকু থাকলেই আপনিও যুক্ত হতে পারবেন।",
        }),
        offer: "৳০",
      },
    },
    // First Materials list (from top)
    materialsFirst: [
      t({ en: "Hifz + Tadabbur", bn: "হিফজ + তাদাব্বুর" }),
      t({ en: "One verse per day", bn: "প্রতিদিন একটি আয়াত" }),
      t({ en: "Complete recorded classes", bn: "সম্পূর্ণ রেকর্ডেড ক্লাস" }),
      t({ en: "Lifetime access", bn: "লাইফটাইম এক্সেস" }),
      t({
        en: "Learn at your own convenience",
        bn: "নিজের সুবিধামতো সময়ে শেখার সুযোগ",
      }),
      t({
        en: "Understand meaning and lessons along with memorization",
        bn: "হিফজের পাশাপাশি আয়াতের অর্থ ও শিক্ষা বোঝার সুযোগ",
      }),
      t({
        en: "Easy and consistent method to memorize Surah Al-Mulk",
        bn: "সহজ ও ধারাবাহিক পদ্ধতিতে সূরা মুলক হিফজ",
      }),
    ],
    // Second Materials list (after Course Structure)
    materialsSecond: [
      t({
        en: "Daily recorded video classes",
        bn: "প্রতিদিনের রেকর্ডেড ভিডিও ক্লাস",
      }),
      t({
        en: "Verse-wise memorization",
        bn: "আয়াতভিত্তিক হিফজ",
      }),
      t({
        en: "Meaning and explanation of verses",
        bn: "আয়াতের অর্থ ও ব্যাখ্যা",
      }),
      t({ en: "Tadabbur and lessons", bn: "তাদাব্বুর ও শিক্ষা" }),
      t({
        en: "Opportunity to strengthen memorization through repetition",
        bn: "পুনরাবৃত্তির মাধ্যমে হিফজ মজবুত করার সুযোগ",
      }),
      t({ en: "Lifetime access", bn: "লাইফটাইম এক্সেস" }),
    ],
    curriculum: Array.from({ length: 30 }, (_, i) => ({
      title: t({
        en: `Verse ${i + 1}: Memorization & Tadabbur`,
        bn: `আয়াত ${i + 1}: হিফজ ও তাদাব্বুর`,
      }),
    })),
    extraObjectivesNote: t({
      en: "Daily recorded video classes, verse‑wise memorization, meaning and explanation, Tadabbur and lessons, repetition for strengthening memorization, lifetime access.",
      bn: "প্রতিদিনের রেকর্ডেড ভিডিও ক্লাস, আয়াতভিত্তিক হিফজ, আয়াতের অর্থ ও ব্যাখ্যা, তাদাব্বুর ও শিক্ষা, পুনরাবৃত্তির মাধ্যমে হিফজ মজবুত করার সুযোগ, লাইফটাইম এক্সেস।",
    }),
  };

  // Why This Course – bullet style (as given)
  const whyDescription = t({
    en: "Memorize, Understand the meaning, Reflect (Tadabbur), Implement in life. Just one verse a day. Move forward step by step and hold the entire Surah Al-Mulk in your heart.",
    bn: "মুখস্থ করুন, অর্থ বুঝুন, তাদাব্বুর করুন, জীবনে বাস্তবায়ন করুন। প্রতিদিন মাত্র একটি আয়াত। অল্প অল্প করে এগিয়ে গিয়ে পুরো সূরা মুলককে নিজের হৃদয়ে ধারণ করুন।",
  });

  // Video Gallery – cover video
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Cover Video", bn: "কাভার ভিডিও" }),
      thumbnail: "https://img.youtube.com/vi/X9hkA_DvAys/hqdefault.jpg",
      url: "https://youtu.be/X9hkA_DvAys?si=vRbgM469Oi4irGl5",
    },
  ];

  // FAQ Data (customized for this course)
  const faqs = [
    {
      question: t({
        en: "Is this course really free?",
        bn: "এই কোর্সটি সত্যিই কি ফ্রি?",
      }),
      answer: t({
        en: "Yes, it is completely free. No payment is required at any stage.",
        bn: "হ্যাঁ, সম্পূর্ণ বিনামূল্যে। কোনো পর্যায়ে কোনো পেমেন্ট প্রয়োজন নেই।",
      }),
    },
    {
      question: t({
        en: "How long will I have access to the course?",
        bn: "কোর্সটিতে কতদিন অ্যাক্সেস পাব?",
      }),
      answer: t({
        en: "You will have lifetime access to all recorded content.",
        bn: "আপনার সকল রেকর্ডেড কন্টেন্টে লাইফটাইম অ্যাক্সেস থাকবে।",
      }),
    },
    {
      question: t({
        en: "Will I get a certificate?",
        bn: "সার্টিফিকেট পাব কি?",
      }),
      answer: t({
        en: "This free course does not include a certificate. It is designed purely for learning and reflection.",
        bn: "এই ফ্রি কোর্সে সার্টিফিকেট নেই। এটি শুধুমাত্র শেখা ও তাদাব্বুরের জন্য তৈরি।",
      }),
    },
    {
      question: t({
        en: "How much time do I need daily?",
        bn: "প্রতিদিন কত সময় দিতে হবে?",
      }),
      answer: t({
        en: "Only a few minutes per day – one verse at a time, so it fits easily into any schedule.",
        bn: "প্রতিদিন মাত্র কয়েক মিনিট – একবারে একটি আয়াত, তাই যেকোনো রুটিনে সহজেই মানিয়ে নেওয়া যায়।",
      }),
    },
    {
      question: t({
        en: "Is this suitable for beginners?",
        bn: "শিক্ষানবিসদের জন্য কি উপযোগী?",
      }),
      answer: t({
        en: "Yes, absolutely. The course is designed for anyone who wants to start memorizing the Qur'an with understanding.",
        bn: "হ্যাঁ, অবশ্যই। যারা বুঝে কুরআন হিফজ শুরু করতে চান, তাদের জন্য এই কোর্স তৈরি করা হয়েছে।",
      }),
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
            <span className="font-medium">
              {t({ en: "Back to Course Page", bn: "কোর্স পেজে ফিরে যান" })}
            </span>
          </Link>

          {/* Hero Banner */}
          <img
            src={surahmulkCoverImg}
            alt={t({
              en: "Surah Al-Mulk Memorization Banner",
              bn: "সূরা মুলক হিফজ ব্যানার",
            })}
            className="w-full max-w-3xl h-24 sm:h-60 md:h-60 object-cover object-top rounded-2xl border border-gray-100 ml-8 mr-72 -mt-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/1200x400/008080/FFFFFF?text=Surah+Al-Mulk+Memorization";
            }}
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaShare className="text-lg" />
                  <span className="font-medium">
                    {t({ en: "Share", bn: "শেয়ার" })}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaBookmark className="text-lg" />
                  <span className="font-medium">
                    {t({ en: "Wishlist", bn: "উইশলিস্ট" })}
                  </span>
                </button>
              </div>
            </div>

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
                <span>{t({ en: "Course Info", bn: "কোর্স তথ্য" })}</span>
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
                <span>{t({ en: "Reviews", bn: "রিভিউ" })}</span>
              </button>
            </div>

            {activeTab === "reviews" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-center">
                  {t({
                    en: "No reviews yet. Be the first to review!",
                    bn: "এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Main Content Layout: Left 2 Columns, Right 1 Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. ABOUT COURSE */}
              <div className="p-8 mt-10">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
                </h2>
                <h3 className="text-lg font-bold text-[#007a91] mb-2">
                  {courseDetails.subtitle}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {courseDetails.description}
                </p>
              </div>

              {/* 2. WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "WHAT YOU WILL GAIN", bn: "আপনি কী পাবেন" })}
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

              {/* 3. COURSE STRUCTURE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE STRUCTURE", bn: "কোর্স স্ট্রাকচার" })}
                </h2>
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                  <p className="text-gray-700 font-medium">
                    {courseDetails.courseStructure}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {courseDetails.structureNote}
                  </p>
                </div>
              </div>

              {/* 4. Ready To Apply (with free enrollment) */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    {t({
                      en: "Ready To Join This Free Course",
                      bn: "ফ্রি কোর্সে যুক্ত হতে প্রস্তুত",
                    })}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t({
                      en: "Enroll now and start your journey of memorization and reflection.",
                      bn: "এখনই নিবন্ধন করুন এবং আপনার হিফজ ও তাদাব্বুরের যাত্রা শুরু করুন।",
                    })}
                  </p>
                </div>
                <Link to="/admission-now">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    {t({ en: "Start Now (Free)", bn: "এখনই শুরু করুন (ফ্রি)" })}
                  </button>
                </Link>
              </div>

              {/* 5. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "TARGET AUDIENCE", bn: "লক্ষ্য দর্শক" })}
                </h2>
                <div className="space-y-2">
                  {courseDetails.targetAudience.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="text-[#00ADD2] text-xs">●</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. MATERIALS INCLUDED (First list) */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "MATERIALS INCLUDED", bn: "অন্তর্ভুক্ত উপকরণ" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.materialsFirst.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. MATERIALS INCLUDED (Second list - after Course Structure) */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE MATERIALS", bn: "কোর্স উপকরণ" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.materialsSecond.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. COURSE CURRICULUM (30 verses) */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE CURRICULUM", bn: "কোর্স পাঠ্যসূচি" })}
                </h2>
                <div className="border border-gray-300 rounded-sm">
                  {courseDetails.curriculum.map((item, index) => (
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
                          {item.title}
                        </span>
                      </button>
                      {openSemester === index && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                          {t({
                            en: "Video lesson for this verse will be available.",
                            bn: "এই আয়াতের ভিডিও লেসন এখানে পাওয়া যাবে।",
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. COURSE FEE (Free) */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE FEE", bn: "কোর্স ফি" })}
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#00ADD2] mt-1" />
                    <span className="block text-[#002b2b] font-medium">
                      {courseDetails.feeStructure.monthly}
                    </span>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <h3 className="font-bold text-green-800 text-sm mb-2">
                      {courseDetails.feeStructure.oneTime.title}
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {courseDetails.feeStructure.oneTime.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      <span className="text-green-600 font-bold text-base">
                        {courseDetails.feeStructure.oneTime.offer}
                      </span>
                      <span className="text-gray-400 line-through">
                        {t({ en: "Regular: ৳1,000", bn: "নিয়মিত: ৳১,০০০" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========== LAST SECTIONS ========== */}

              {/* 1. Why This Course? (paragraph + bullets) */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Join This Course?",
                      bn: "কেন এই কোর্সে যুক্ত হবেন?",
                    })}
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <div className="text-gray-700 text-center max-w-3xl mx-auto text-base leading-relaxed whitespace-pre-line">
                  {whyDescription}
                </div>
              </div>

              {/* 2. Video Gallery */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "Video Gallery", bn: "ভিডিও গ্যালারি" })}
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

              {/* 3. FAQ */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "FAQ", bn: "প্রায়শই জিজ্ঞাসিত প্রশ্ন" })}
                  </h2>
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
              {/* Video Thumbnail (Cover) */}
              <a
                href="https://youtu.be/X9hkA_DvAys?si=vRbgM469Oi4irGl5"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src="https://img.youtube.com/vi/X9hkA_DvAys/hqdefault.jpg"
                  alt={t({ en: "Course Video", bn: "কোর্স ভিডিও" })}
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
                  {t({
                    en: "ENROLL NOW (FREE)",
                    bn: "এখনই নিবন্ধন করুন (ফ্রি)",
                  })}
                </h1>

                <div className="flex items-center justify-center mb-6 relative">
                  <Link
                    to="/course/kids/quidaelders/enrollbnagla"
                    className="w-1/2"
                  >
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>
                  <Link
                    to="/enroll/quidaelders/english-version"
                    className="w-1/2"
                  >
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 text-xs rounded-r-md hover:opacity-90 transition">
                      {t({ en: "English Version", bn: "ইংরেজি ভার্সন" })}
                    </button>
                  </Link>
                </div>

                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Course Level:", bn: "কোর্স লেভেল:" })}
                    </span>
                    <span className="font-bold">
                      {t({ en: "All Levels", bn: "সকলের জন্য" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">180</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">09/07/2026</span>
                  </div>
                </div>
              </div>

              {/* Faculty List */}
              <div className="bg-white rounded-3xl">
                <h3 className="text-xl font-bold text-[#002b2b] mb-4 border-b pb-2">
                  {t({ en: "Faculty", bn: "অনুষদ" })}
                </h3>
                <div className="space-y-4">
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
                    >
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-12 h-12 rounded-full object-cover border border-yellow-500 flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-[#002b2b] truncate">
                          {instructor.name}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {instructor.title}
                        </p>
                        {instructor.subtitle && (
                          <p className="text-[11px] text-gray-500 truncate">
                            {instructor.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
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

export default SurahmulkDetails;
