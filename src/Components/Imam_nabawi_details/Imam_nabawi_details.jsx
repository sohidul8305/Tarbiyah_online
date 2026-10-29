import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
  FaArrowLeft,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
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

const API_BASE = "https://api.tarbiyahonline.com/api";

// ✅ YouTube ID extract helper
const extractYoutubeId = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/]+)/,
  );
  return match ? match[1] : "";
};

// ✅ YouTube thumbnail URL — maxres (16:9) with hq fallback
const getYoutubeThumb = (url, quality = "maxresdefault") => {
  const id = extractYoutubeId(url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
};

// ✅ Image with automatic fallback (maxres → hqdefault)
const YoutubeThumbImg = ({ url, alt, className }) => (
  <img
    src={getYoutubeThumb(url, "maxresdefault")}
    alt={alt}
    className={className}
    onError={(e) => {
      if (!e.target.dataset.fallback) {
        e.target.dataset.fallback = "true";
        e.target.src = getYoutubeThumb(url, "hqdefault");
      }
    }}
  />
);

// Import banner image
import chollisCoverImg from "../../image/40radiscover.jpg";
import ProfessorImg from "../../image/profile.jpg";

// --- Language Hook ---
import { useState as useStateHook } from "react";

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

const ImamNabawiDetails = () => {
  const { t } = useLanguage();

  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  // ✅ Login state — now accepts ID or Phone
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loggedStudent, setLoggedStudent] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recorded_student");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLoggedStudent(parsed.student);
        setCourseVideos(parsed.videos || []);
      } catch (e) {
        console.error("Parse error:", e);
      }
    }
  }, []);

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      Swal.fire({
        icon: "warning",
        title: "সব ঘর পূরণ করুন",
        text: "Student ID / Phone এবং পাসওয়ার্ড দিন।",
      });
      return;
    }

    setLoginLoading(true);
    try {
      const idValue = loginIdentifier.trim();
      const res = await fetch(`${API_BASE}/recorded-course/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: idValue,
          phone: idValue,
          studentId: idValue,
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setLoggedStudent(data.student);
        setCourseVideos(data.videos || []);
        localStorage.setItem(
          "recorded_student",
          JSON.stringify({ student: data.student, videos: data.videos }),
        );

        Swal.fire({
          icon: "success",
          title: "লগইন সফল! 🎉",
          text: `${data.totalVideos} টি ভিডিও পাওয়া গেছে।`,
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "লগইন ব্যর্থ",
          text: data.message || "আবার চেষ্টা করুন।",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: err.message,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedStudent(null);
    setCourseVideos([]);
    setLoginIdentifier("");
    setLoginPassword("");
    localStorage.removeItem("recorded_student");
    Swal.fire({
      icon: "success",
      title: "লগআউট সফল",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const instructors = [
    {
      id: 1,
      name: t({ en: "Shaykh Mokhtar Ahmad", bn: "শায়খ মোখতার আহমদ" }),
      title: t({ en: "Senior Instructor", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Hadith & Quran", bn: "হাদিস ও কুরআন" }),
      image: ProfessorImg,
    },
  ];

  // ✅ কোর্স ফি ১০০০ করা হয়েছে
  const courseDetails = {
    title: t({
      en: "Imam Nabawi's 40 Hadiths Course",
      bn: "ইমাম নববীর ৪০ হাদিস কোর্স",
    }),
    subtitle: t({
      en: "Recorded Course on the 40 Hadiths of Imam Nawawi",
      bn: "ইমাম নববীর ৪০ হাদিসের রেকর্ডেড কোর্স",
    }),
    description: t({
      en: "Imam Nawawi's collection of 40 Hadiths presents the core teachings of Islam—belief, worship, character, ethics, and daily life—in a concise yet profound manner. In this recorded course, each hadith is explained with Arabic text, word meanings, translation, commentary, and practical application in an easy and clear style. The course is designed for self-paced learning from anywhere, at any time.",
      bn: "ইমাম নববী (রহ.) সংকলিত ৪০ হাদিস ইসলামের মৌলিক শিক্ষা, আকীদাহ, ইবাদত, আখলাক, চরিত্র গঠন এবং দৈনন্দিন জীবনের গুরুত্বপূর্ণ বিষয়গুলোকে সংক্ষিপ্ত অথচ গভীরভাবে তুলে ধরেছে। এই রেকর্ডেড কোর্সে প্রতিটি হাদিসের আরবি পাঠ, শব্দার্থ, অনুবাদ, ব্যাখ্যা, শিক্ষা ও বাস্তব জীবনে প্রয়োগ সহজ ও প্রাঞ্জলভাবে উপস্থাপন করা হবে। নিজের সুবিধামতো সময়ে, যেকোনো স্থান থেকে, ধাপে ধাপে ৪০ হাদিস অধ্যয়ন করার জন্য কোর্সটি বিশেষভাবে সাজানো হয়েছে।",
    }),
    objectives: [
      t({
        en: "Gain knowledge of 40 important Hadiths of Imam Nawawi",
        bn: "ইমাম নববীর ৪০টি গুরুত্বপূর্ণ হাদিস সম্পর্কে জ্ঞান অর্জন করবেন",
      }),
      t({
        en: "Understand the core message and teachings of each Hadith",
        bn: "হাদিসের মূল বার্তা ও শিক্ষা বুঝতে পারবেন",
      }),
      t({
        en: "Develop a clear understanding of fundamental Islamic topics",
        bn: "ইসলামের মৌলিক বিষয়গুলো সম্পর্কে সুস্পষ্ট ধারণা লাভ করবেন",
      }),
      t({
        en: "Receive practical guidance on implementing Hadith teachings in daily life",
        bn: "দৈনন্দিন জীবনে হাদিসের শিক্ষা বাস্তবায়নের দিকনির্দেশনা পাবেন",
      }),
      t({
        en: "Gain deep insight into faith, worship, and character",
        bn: "ঈমান, ইবাদত ও আখলাক সম্পর্কে গভীর উপলব্ধি অর্জন করবেন",
      }),
      t({
        en: "Apply Islamic teachings in family, society, and personal life",
        bn: "পরিবার, সমাজ ও ব্যক্তিজীবনে ইসলামের শিক্ষা প্রয়োগ করতে পারবেন",
      }),
    ],
    targetAudience: [
      t({
        en: "Those who want to start studying Hadith",
        bn: "যারা হাদিস অধ্যয়ন শুরু করতে চান",
      }),
      t({
        en: "Those interested in learning the fundamentals of Islam",
        bn: "যারা ইসলামের মৌলিক বিষয়গুলো জানতে আগ্রহী",
      }),
      t({
        en: "Students, employees, businessmen, and general learners",
        bn: "ছাত্র, চাকরিজীবী, ব্যবসায়ী ও সাধারণ শিক্ষার্থী",
      }),
      t({
        en: "Those who prefer recorded classes at their own pace",
        bn: "যারা নিজের সুবিধামতো সময়ে রেকর্ডেড ক্লাস করতে চান",
      }),
      t({
        en: "Those who wish to apply Hadith teachings in family and society",
        bn: "যারা পরিবার ও সমাজে হাদিসের শিক্ষা বাস্তবায়ন করতে চান",
      }),
    ],
    feeStructure: {
      monthly: t({
        en: "Course Fee: ৳1,000 only",
        bn: "কোর্স ফি: ৳১,০০০ মাত্র",
      }),
      oneTime: {
        title: t({ en: "One-Time Payment", bn: "এককালীন পেমেন্ট" }),
        description: t({
          en: "Pay the full course fee and get lifetime access + certificate.",
          bn: "সম্পূর্ণ কোর্স ফি প্রদান করুন এবং লাইফটাইম অ্যাক্সেস + সার্টিফিকেট পান।",
        }),
        offer: "৳১,০০০",
      },
    },
    materials: [
      t({ en: "Complete recorded course", bn: "সম্পূর্ণ রেকর্ডেড কোর্স" }),
      t({ en: "Lifetime access", bn: "লাইফটাইম অ্যাক্সেস" }),
      t({
        en: "Study at your own convenience",
        bn: "নিজের সুবিধামতো সময়ে অধ্যয়নের সুযোগ",
      }),
      t({
        en: "Explanation and necessary discussion of each Hadith",
        bn: "প্রতিটি হাদিসের ব্যাখ্যা ও প্রয়োজনীয় আলোচনা",
      }),
      t({
        en: "Access from mobile, tablet, and computer",
        bn: "মোবাইল, ট্যাব ও কম্পিউটার থেকে ক্লাস দেখার সুবিধা",
      }),
      t({
        en: "Certificate upon completion",
        bn: "কোর্স সম্পন্নকারীদের জন্য সার্টিফিকেট",
      }),
    ],
    curriculum: Array.from({ length: 40 }, (_, i) => ({
      title: t({
        en: `Hadith ${i + 1}: Lesson ${i + 1}`,
        bn: `হাদিস ${i + 1}: লেসন ${i + 1}`,
      }),
    })),
    extraObjectivesNote: t({
      en: "This is a self-paced recorded course with lifetime access.",
      bn: "এটি একটি স্ব-গতির রেকর্ডেড কোর্স যার লাইফটাইম অ্যাক্সেস রয়েছে।",
    }),
  };

  const whyDescription = t({
    en: "Imam Nabawi's 40 Hadiths is not just a collection of hadiths; it is a concise and rich curriculum of the fundamental teachings of Islam. Through this course, you will be able to learn the teachings of Hadith in easy language and find ways to implement them in your own life.",
    bn: "ইমাম নববীর ৪০ হাদিস শুধু একটি হাদিস সংকলন নয়; বরং ইসলামের মৌলিক শিক্ষার একটি সংক্ষিপ্ত ও সমৃদ্ধ পাঠ্যক্রম। এই কোর্সের মাধ্যমে আপনি সহজ ভাষায় হাদিসের শিক্ষা জানতে পারবেন এবং তা নিজের জীবনে বাস্তবায়নের পথ খুঁজে পাবেন।",
  });

  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Promo Video", bn: "প্রোমো ভিডিও" }),
      thumbnail: getYoutubeThumb(
        "https://youtu.be/6gMZDMTMEDk",
        "maxresdefault",
      ),
      url: "https://youtu.be/6gMZDMTMEDk?si=YtR0LQ690HuOS-Sd",
    },
  ];

  const faqs = [
    {
      question: t({
        en: "Is this course suitable for beginners?",
        bn: "এই কোর্সটি কি শিক্ষানবিসদের জন্য উপযোগী?",
      }),
      answer: t({
        en: "Yes, it is designed for all levels, especially for those who want to start studying Hadith.",
        bn: "হ্যাঁ, এটি সকল স্তরের জন্য তৈরি, বিশেষ করে যারা হাদিস অধ্যয়ন শুরু করতে চান।",
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
        en: "Is there any certificate after completion?",
        bn: "সমাপ্তির পর কোনো সার্টিফিকেট দেওয়া হয়?",
      }),
      answer: t({
        en: "Yes, you will receive a certificate upon completing the course.",
        bn: "হ্যাঁ, কোর্স শেষে আপনাকে একটি সার্টিফিকেট প্রদান করা হবে।",
      }),
    },
    {
      question: t({
        en: "Can I access the course on mobile?",
        bn: "আমি কি মোবাইলে কোর্স অ্যাক্সেস করতে পারব?",
      }),
      answer: t({
        en: "Yes, you can access from mobile, tablet, or computer.",
        bn: "হ্যাঁ, আপনি মোবাইল, ট্যাব বা কম্পিউটার থেকে অ্যাক্সেস করতে পারবেন।",
      }),
    },
    {
      question: t({
        en: "What is the fee structure?",
        bn: "ফি কাঠামো কী?",
      }),
      answer: t({
        en: "The total course fee is ৳1,000 only, which gives lifetime access and certificate.",
        bn: "মোট কোর্স ফি মাত্র ৳১,০০০, যা লাইফটাইম অ্যাক্সেস ও সার্টিফিকেট প্রদান করে।",
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ================= LEFT COLUMN (2/3 width) ================= */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Banner (এখন ভিডিওর সমান 16:9 অনুপাতে থাকবে) */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src={chollisCoverImg}
                  alt={t({
                    en: "Imam Nabawi 40 Hadiths Banner",
                    bn: "ইমাম নববীর ৪০ হাদিস ব্যানার",
                  })}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Course Info Section */}
              <div>
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

              {/* ABOUT COURSE */}
              <div className="pt-4">
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

              {/* WHAT YOU WILL GAIN */}
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
                <p className="text-sm text-gray-600 mt-2 italic">
                  {courseDetails.extraObjectivesNote}
                </p>
              </div>

              {/* Ready To Apply */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    {t({
                      en: "Ready To Apply Your Course",
                      bn: "আপনার কোর্সে আবেদন করতে প্রস্তুত",
                    })}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t({
                      en: "Enroll now and start your structured learning journey.",
                      bn: "এখনই এনরোল করুন এবং আপনার শেখার যাত্রা শুরু করুন।",
                    })}
                  </p>
                </div>
                <Link to="/admission-now">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                  </button>
                </Link>
              </div>

              {/* TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "TARGET AUDIENCE", bn: "লক্ষ্য দর্শক" })}
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

              {/* MATERIALS INCLUDED */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "MATERIALS INCLUDED", bn: "অন্তর্ভুক্ত উপকরণ" })}
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

              {/* COURSE VIDEOS — Login + Videos */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-teal-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#00ADD2] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "Course Videos (42 Sessions)",
                      bn: "কোর্স ভিডিও (৪২ সেশন)",
                    })}
                  </h2>
                </div>

                {!loggedStudent ? (
                  // ─── LOGIN FORM ───
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200 shadow-sm">
                      <div className="text-center mb-5">
                        <div className="w-16 h-16 bg-[#002b2b] rounded-full mx-auto flex items-center justify-center mb-3">
                          <FaPlayCircle className="text-3xl text-white" />
                        </div>
                        <h3 className="font-bold text-[#002b2b] text-lg mb-1">
                          🔐{" "}
                          {t({
                            en: "Login to watch videos",
                            bn: "ভিডিও দেখতে লগইন করুন",
                          })}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {t({
                            en: "Use your Student ID or password provided by admin",
                            bn: "এডমিন দেওয়া Student ID বা পাসওয়ার্ড দিয়ে লগইন করুন",
                          })}
                        </p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            🆔{" "}
                            {t({
                              en: "Student ID ",
                              bn: "স্টুডেন্ট আইডি",
                            })}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., ID"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-teal-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            🔑 {t({ en: "Password", bn: "পাসওয়ার্ড" })}
                          </label>
                          <input
                            type="password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-teal-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loginLoading}
                          className="w-full bg-[#002b2b] hover:bg-teal-900 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition"
                        >
                          {loginLoading ? "⏳ লোড হচ্ছে..." : "🚀 লগইন করুন"}
                        </button>
                      </form>

                      <div className="mt-4 pt-4 border-t border-teal-200 text-center">
                        <p className="text-[11px] text-gray-500">
                          {t({
                            en: "Not enrolled yet?",
                            bn: "এখনো enroll করেননি?",
                          })}{" "}
                          <Link
                            to="/admission-now"
                            className="text-[#00ADD2] font-bold hover:underline"
                          >
                            {t({ en: "Enroll Now", bn: "এখনই enroll করুন" })}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ─── VIDEO GRID ───
                  <>
                    <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] text-white rounded-xl p-4 mb-5 flex justify-between items-center flex-wrap gap-3">
                      <div>
                        <p className="text-sm font-bold">
                          👋 {t({ en: "Welcome", bn: "স্বাগতম" })},{" "}
                          {loggedStudent.name}
                        </p>
                        <p className="text-xs opacity-90 mt-0.5">
                          🆔 {loggedStudent.studentId || "-"} • 📱{" "}
                          {loggedStudent.phone} • 🎬 {courseVideos.length}{" "}
                          {t({ en: "Videos", bn: "ভিডিও" })}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition"
                      >
                        Logout
                      </button>
                    </div>

                    {courseVideos.length === 0 ? (
                      <div className="text-center py-10">
                        <FaPlayCircle className="text-6xl text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">
                          {t({
                            en: "Videos are being uploaded. Please check back soon.",
                            bn: "ভিডিও এখনো যোগ করা হয়নি। শীঘ্রই জানানো হবে।",
                          })}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {courseVideos.map((video, index) => (
                          <a
                            key={video._id || index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                          >
                            {/* ✅ 16:9 thumbnail — same height as video */}
                            <div className="relative aspect-video bg-gray-200 overflow-hidden">
                              <YoutubeThumbImg
                                url={video.url}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                                  <FaPlayCircle className="text-3xl" />
                                </div>
                              </div>
                              <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                {index + 1}
                              </div>
                            </div>
                            <div className="p-3 bg-white">
                              <p className="text-sm font-semibold text-[#002b2b] truncate">
                                {video.title}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-0.5">
                                ▶{" "}
                                {t({
                                  en: "Click to watch",
                                  bn: "দেখতে ক্লিক করুন",
                                })}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* COURSE FEE */}
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
                  <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                    <h3 className="font-bold text-cyan-800 text-sm mb-2">
                      {courseDetails.feeStructure.oneTime.title}
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {courseDetails.feeStructure.oneTime.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      <span className="text-green-600 font-bold">
                        {courseDetails.feeStructure.oneTime.offer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Course? */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({ en: "Why This Course?", bn: "কেন এই কোর্স?" })}
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-700 text-center max-w-3xl mx-auto text-base leading-relaxed">
                  {whyDescription}
                </p>
              </div>

              {/* VIDEO GALLERY */}
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
                      className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <YoutubeThumbImg
                          url={video.url}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                            <FaPlayCircle className="text-3xl" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <p className="text-sm font-semibold text-[#002b2b] truncate">
                          {video.title}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          ▶{" "}
                          {t({ en: "Click to watch", bn: "দেখতে ক্লিক করুন" })}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
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

            {/* ================= RIGHT SIDEBAR (1/3 width) ================= */}
            <div className="space-y-6">
              {/* ✅ Promo Video Thumbnail (ব্যানারের সাথে সমান উচ্চতায় থাকবে) */}
              <a
                href="https://youtu.be/6gMZDMTMEDk?si=YtR0LQ690HuOS-Sd"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-sm border border-gray-100 cursor-pointer aspect-video"
              >
                <YoutubeThumbImg
                  url="https://youtu.be/6gMZDMTMEDk"
                  alt={t({ en: "Course Video", bn: "কোর্স ভিডিও" })}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                    <FaPlayCircle className="text-3xl" />
                  </div>
                </div>
              </a>

              {/* Pricing & Enrollment Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h1 className="text-2xl font-bold text-[#007a91] mb-6">
                  {t({ en: "ENROLL NOW", bn: "এখনই নিবন্ধন করুন" })}
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
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
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

export default ImamNabawiDetails;
