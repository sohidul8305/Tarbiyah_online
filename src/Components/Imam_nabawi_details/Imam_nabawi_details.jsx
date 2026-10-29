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
  FaTimes,
  FaLock,
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

// ✅ YouTube thumbnail URL
const getYoutubeThumb = (url, quality = "maxresdefault") => {
  const id = extractYoutubeId(url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
};

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

import chollisCoverImg from "../../image/40radiscover.jpg";
import ProfessorImg from "../../image/profile.jpg";

import { useState as useStateHook } from "react";

// ✅ ৪২টি ভিডিওর ডামি লিস্ট (মডিউল দেখানোর জন্য)
const HADITH_40_VIDEOS = Array.from({ length: 42 }, (_, i) => ({
  title: `Session ${i + 1}`,
  url: `https://youtu.be/dummy_video_${i + 1}`,
}));

// ✅ ৮টি মডিউলের টাইটেল (English & Bangla)
const MODULE_TITLES = [
  {
    en: "01. Intention, Faith & Fundamentals of Islam",
    bn: "০১. নিয়ত, ঈমান ও ইসলামের মৌলিক পক্ষ",
  },
  {
    en: "02. Taqwa & Self-Purification",
    bn: "০২. তাকওয়া ও আত্মশুদ্ধি",
  },
  {
    en: "03. Worship & Obedience to Allah",
    bn: "০৩. ইবাদত ও আল্লাহর আনুগত্য",
  },
  {
    en: "04. Halal-Haram & Shariah Rulings",
    bn: "০৪. হালাল-হারাম ও শরীয়তের বিধান",
  },
  {
    en: "05. Good Character & Self-Control",
    bn: "০৫. উত্তম চরিত্র ও আত্মসংযম",
  },
  {
    en: "06. Human Rights & Social Responsibility",
    bn: "০৬. মানুষের অধিকার ও সামাজিক দায়িত্ব",
  },
  {
    en: "07. Welfare, Justice & Reform",
    bn: "০৭. কল্যাণ, ন্যায়বিচার ও সংস্কার",
  },
  {
    en: "08. Allah's Mercy & the Hereafter",
    bn: "০৮. আল্লাহর রহমত ও পরকাল",
  },
];

export const useLanguage = () => {
  // ✅ ডিফল্ট ভাষা ইংরেজি ("en") করে দেওয়া হয়েছে
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

  // ✅ মডিউল ওপেন/ক্লোজ স্টেট
  const [openModule, setOpenModule] = useState(0);

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loggedStudent, setLoggedStudent] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);

  // ✅ ভিডিও প্লেয়ার স্টেট
  const [activeVideo, setActiveVideo] = useState(null);

  // ✅ সিকিউরিটি স্টেট
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);

  // ✅ সিকিউরিটি ইফেক্ট
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowFocused(false);
        if (activeVideo) setShowSecurityWarning(true);
      } else {
        setIsWindowFocused(true);
        setShowSecurityWarning(false);
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        if (
          document.activeElement &&
          document.activeElement.tagName === "IFRAME"
        ) {
          return;
        }
        setIsWindowFocused(false);
        if (activeVideo) setShowSecurityWarning(true);
      }, 200);
    };

    const handleFocus = () => {
      setIsWindowFocused(true);
      setShowSecurityWarning(false);
    };

    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["S", "s"].includes(e.key)) ||
        (e.ctrlKey && e.key === "p") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(
              "Screenshot Blocked by Security Policy!",
            );
          }
        } catch (err) {}

        Swal.fire({
          icon: "warning",
          title: t({ en: "Warning!", bn: "সতর্কতা!" }),
          text: t({
            en: "Video content screenshot or recording is strictly prohibited.",
            bn: "ভিডিও কন্টেন্ট স্ক্রিনশট বা রেকর্ড করা কঠোরভাবে নিষিদ্ধ।",
          }),
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo, t]);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      Swal.fire({
        icon: "warning",
        title: t({ en: "Fill all fields", bn: "সব ঘর পূরণ করুন" }),
        text: t({
          en: "Please enter Student ID / Phone and Password.",
          bn: "Student ID / Phone এবং পাসওয়ার্ড দিন।",
        }),
      });
      return;
    }

    setLoginLoading(true);
    try {
      const idValue = loginIdentifier.trim();
      let deviceId = localStorage.getItem("tarbiyah_device_id");
      if (!deviceId) {
        deviceId =
          "DEV-" +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        localStorage.setItem("tarbiyah_device_id", deviceId);
      }

      const res = await fetch(`${API_BASE}/recorded-course/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: idValue,
          phone: idValue,
          studentId: idValue,
          password: loginPassword.trim(),
          deviceId: deviceId,
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
          title: t({ en: "Login Successful! 🎉", bn: "লগইন সফল! 🎉" }),
          text: t({
            en: `${data.totalVideos} videos found.`,
            bn: `${data.totalVideos} টি ভিডিও পাওয়া গেছে।`,
          }),
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t({ en: "Login Failed", bn: "লগইন ব্যর্থ" }),
          text:
            data.message ||
            t({ en: "Please try again.", bn: "আবার চেষ্টা করুন।" }),
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t({ en: "Network Error", bn: "নেটওয়ার্ক সমস্যা" }),
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
      title: t({ en: "Logout Successful", bn: "লগআউট সফল" }),
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // ✅ লকড ভিডিওতে ক্লিক করলে যা হবে
  const handleLockedVideoClick = () => {
    Swal.fire({
      icon: "info",
      title: t({ en: "Video is Locked!", bn: "ভিডিও লক করা আছে!" }),
      text: t({
        en: "After enrolling, you can watch the videos from the student dashboard.",
        bn: "কোর্সে এনরোল করার পর স্টুডেন্ট ড্যাশবোর্ড থেকে ভিডিওগুলো দেখতে পারবেন।",
      }),
      confirmButtonText: t({ en: "Enroll Now", bn: "এনরোল করুন" }),
      confirmButtonColor: "#007a91",
      showCancelButton: true,
      cancelButtonText: t({ en: "Later", bn: "পরে দেখব" }),
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/admission-now";
      }
    });
  };

  const instructors = [
    {
      id: 1,
      name: t({
        en: "Instructor  <br> Shaykh Mokhter Ahmad Chairman <br> Tarbiyah Education Network",
        bn: "ইনস্ট্রাক্টর শায়খ মোখতার আহমাদ, চেয়ারম্যান,<br> তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),

      subtitle: t({ en: "Hadith & Quran", bn: "হাদিস ও কুরআন" }),
      image: ProfessorImg,
    },
  ];

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
          en: "Pay the full course fee and get lifetime access.",
          bn: "সম্পূর্ণ কোর্স ফি প্রদান করুন এবং লাইফটাইম অ্যাক্সেস পান।",
        }),
        offer: "৳1,000",
        originalPrice: "৳4,000",
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

  // ✅ FAQ (Default English, switches to Bangla)
  const faqs = [
    {
      question: t({
        en: "Do you want to learn the fundamental aspects of the religion sequentially?",
        bn: "দ্বীনের মৌলিক বিষয়গুলো ধারাবাহিকভাবে শিখতে চান?",
      }),
      answer: t({
        en: "Yes, this course is an excellent platform to learn the fundamental aspects of Islam sequentially and systematically.",
        bn: "হ্যাঁ, এই কোর্সটি দ্বীনের মৌলিক বিষয়গুলো ধারাবাহিকভাবে শেখার জন্য একটি চমৎকার প্ল্যাটফর্ম।",
      }),
    },
    {
      question: t({
        en: "Do you want to understand the teachings of Hadith and apply them in your own life?",
        bn: "হাদিসের শিক্ষা বুঝে নিজের জীবনে কাজে লাগাতে চান?",
      }),
      answer: t({
        en: "Absolutely. The explanation of each Hadith and its practical application in real life are discussed in detail here.",
        bn: "অবশ্যই। প্রতিটি হাদিসের ব্যাখ্যা ও বাস্তব জীবনে তার প্রয়োগ এখানে বিস্তারিত আলোচনা করা হয়েছে।",
      }),
    },
    {
      question: t({
        en: "Comprehend relevant teachings regarding Faith, Intention, Worship, Character, and Mutual Behavior.",
        bn: "ঈমান, নিয়ত, ইবাদত, আখলাক ও পারস্পরিক আচরণ বিষয়ে প্রাসঙ্গিক শিক্ষা অনুধাবন।",
      }),
      answer: t({
        en: "This course provides deep and relevant Islamic knowledge on these specific topics.",
        bn: "এই কোর্সে এসব বিষয়ে গভীর ও প্রাসঙ্গিক ইসলামি জ্ঞান প্রদান করা হবে।",
      }),
    },
    {
      question: t({
        en: "Create awareness about applying the teachings of Hadith in daily life.",
        bn: "দৈনন্দিন জীবনে হাদিসের শিক্ষা প্রয়োগের বিষয়ে সচেতনতা তৈরি।",
      }),
      answer: t({
        en: "The course will make you conscious and inspired to apply the teachings of Hadith in your everyday life.",
        bn: "কোর্সটি আপনাকে দৈনন্দিন জীবনে হাদিসের শিক্ষা প্রয়োগে সচেতন ও উদ্বুদ্ধ করবে।",
      }),
    },
    {
      question: t({
        en: "Inspiration to develop a habit of regularly acquiring Islamic knowledge.",
        bn: "নিয়মিত ইসলামি জ্ঞান অর্জনের একটি অধ্যয়ন-অভ্যাস গড়ে তোলার অনুপ্রেরণা।",
      }),
      answer: t({
        en: "This course will inspire you to build a consistent habit of studying and practicing Islamic knowledge.",
        bn: "নিয়মিত ইসলামি জ্ঞান চর্চার অভ্যাস গড়ে তুলতে এই কোর্সটি আপনাকে অনুপ্রাণিত করবে।",
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
      question: t({ en: "What is the fee structure?", bn: "ফি কাঠামো কী?" }),
      answer: t({
        en: "The total course fee is ৳1,000 only, which gives lifetime access and certificate.",
        bn: "মোট কোর্স ফি মাত্র ৳১,০০০, যা লাইফটাইম অ্যাক্সেস ও সার্টিফিকেট প্রদান করে।",
      }),
    },
  ];

  // ✅ মডিউল তৈরি করা
  const groupedModules = MODULE_TITLES.map((module, index) => {
    const start = index * 5;
    const end = index === 7 ? 42 : start + 5;
    return {
      moduleId: index,
      title: t(module),
      videos: HADITH_40_VIDEOS.slice(start, end),
    };
  });

  return (
    <div
      className="min-h-screen bg-[#f8fafc] select-none font-sans"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Navbar />
      <div className="py-6 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/course/kids"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm md:text-base">
              {t({ en: "Back to Course Page", bn: "কোর্স পেজে ফিরে যান" })}
            </span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Banner */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-lg relative group">
                <img
                  src={chollisCoverImg}
                  alt="Banner"
                  className="w-full h-full object-cover object-top pointer-events-none group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between py-3 gap-2">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md">
                      <FaShare className="text-sm" />{" "}
                      <span className="text-xs font-semibold">
                        {t({ en: "Share", bn: "শেয়ার" })}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md">
                      <FaBookmark className="text-sm" />{" "}
                      <span className="text-xs font-semibold">
                        {t({ en: "Wishlist", bn: "উইশলিস্ট" })}
                      </span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-[#007a91] mb-4 uppercase mt-2 tracking-tight">
                  {courseDetails.title}
                </h1>

                <div className="flex items-center gap-6 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex items-center gap-2 px-2 py-3 border-b-2 transition-all text-sm md:text-base font-medium ${
                      activeTab === "info"
                        ? "border-[#002b2b] text-[#002b2b]"
                        : "border-transparent text-gray-500 hover:text-[#002b2b]"
                    }`}
                  >
                    <FaInfoCircle />{" "}
                    <span>{t({ en: "Course Info", bn: "কোর্স তথ্য" })}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center gap-2 px-2 py-3 border-b-2 transition-all text-sm md:text-base font-medium ${
                      activeTab === "reviews"
                        ? "border-[#002b2b] text-[#002b2b]"
                        : "border-transparent text-gray-500 hover:text-[#002b2b]"
                    }`}
                  >
                    <FaCommentDots />{" "}
                    <span>{t({ en: "Reviews", bn: "রিভিউ" })}</span>
                  </button>
                </div>

                {activeTab === "reviews" && (
                  <div className="mt-4 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                    <FaCommentDots className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm font-medium">
                      {t({
                        en: "No reviews yet. Be the first to review!",
                        bn: "এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!",
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00ADD2] rounded-full inline-block"></span>
                  {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
                </h2>
                <h3 className="text-lg font-bold text-[#007a91] mb-3">
                  {courseDetails.subtitle}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {courseDetails.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 space-y-5 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00ADD2] rounded-full inline-block"></span>
                  {t({ en: "WHAT YOU WILL GAIN", bn: "আপনি কী পাবেন" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetails.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <FaAngleDoubleRight className="text-[#00ADD2] text-base flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm font-medium leading-relaxed">
                        {objective}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#007a91] mt-4 italic font-medium bg-teal-50 p-3 rounded-lg border border-teal-100">
                  ✨ {courseDetails.extraObjectivesNote}
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#002b2b]">
                    {t({
                      en: "Ready To Apply Your Course",
                      bn: "আপনার কোর্সে আবেদন করতে প্রস্তুত",
                    })}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 font-medium">
                    {t({
                      en: "Enroll now and start your structured learning journey.",
                      bn: "এখনই এনরোল করুন এবং আপনার শেখার যাত্রা শুরু করুন।",
                    })}
                  </p>
                </div>
                <Link to="/admission-now" className="w-full sm:w-auto">
                  <button className="w-full bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                  </button>
                </Link>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00ADD2] rounded-full inline-block"></span>
                  {t({ en: "TARGET AUDIENCE", bn: "লক্ষ্য দর্শক" })}
                </h2>
                <div className="space-y-3">
                  {courseDetails.targetAudience.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                    >
                      <span className="text-[#00ADD2] text-lg">●</span>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00ADD2] rounded-full inline-block"></span>
                  {t({ en: "MATERIALS INCLUDED", bn: "অন্তর্ভুক্ত উপকরণ" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.materials.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      <span className="text-green-500 mt-1 font-bold">✔</span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ NEW: COURSE MODULES & VIDEOS (LOCKED) */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-teal-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50"></div>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-1.5 h-8 bg-[#00ADD2] rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "Course Modules & Videos",
                      bn: "কোর্স মডিউল ও ভিডিও",
                    })}
                  </h2>
                </div>

                <div className="space-y-4 relative z-10">
                  {groupedModules.map((module, mIndex) => (
                    <div
                      key={mIndex}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                    >
                      {/* Module Header */}
                      <button
                        onClick={() =>
                          setOpenModule(openModule === mIndex ? null : mIndex)
                        }
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-[#e6f7f9] transition-colors text-left"
                      >
                        <span className="font-bold text-[#002b2b] text-sm md:text-[15px]">
                          {module.title}
                        </span>
                        <span className="text-[#00ADD2]">
                          {openModule === mIndex ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      </button>

                      {/* Module Videos (Locked) */}
                      {openModule === mIndex && (
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white border-t border-gray-100">
                          {module.videos.map((video, index) => (
                            <div
                              key={video._id || index}
                              onClick={handleLockedVideoClick}
                              className="group block overflow-hidden rounded-xl shadow-sm border border-gray-100 cursor-pointer bg-white relative"
                            >
                              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                  <FaPlayCircle className="text-4xl text-gray-600" />
                                </div>

                                {/* Lock Overlay */}
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-colors flex flex-col items-center justify-center">
                                  <FaLock className="text-white text-2xl mb-2" />
                                  <span className="text-white text-[10px] font-bold bg-red-600 px-2 py-0.5 rounded-full">
                                    {t({ en: "LOCKED", bn: "লকড" })}
                                  </span>
                                </div>

                                <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                  {video.title.replace("Session ", "")}
                                </div>
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-semibold text-[#002b2b] truncate">
                                  {video.title}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                                  <FaLock className="text-red-500" />{" "}
                                  {t({
                                    en: "Enroll to watch",
                                    bn: "দেখতে এনরোল করুন",
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* COURSE FEE */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00ADD2] rounded-full inline-block"></span>
                  {t({ en: "COURSE FEE", bn: "কোর্স ফি" })}
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#00ADD2] mt-1 text-lg" />
                    <span className="block text-[#002b2b] font-bold text-base">
                      {courseDetails.feeStructure.monthly}
                    </span>
                  </div>
                  <div className="mt-4 p-6 bg-gradient-to-br from-cyan-50 to-white rounded-xl border border-cyan-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-cyan-900 text-lg">
                          {courseDetails.feeStructure.oneTime.title}
                        </h3>
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                          {t({
                            en: "Website Launch Offer",
                            bn: "ওয়েবসাইট লঞ্চ অফার",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                        {courseDetails.feeStructure.oneTime.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end bg-white px-4 py-2 rounded-lg border border-cyan-100 shadow-sm">
                      <span className="text-gray-400 line-through text-sm font-medium">
                        {courseDetails.feeStructure.oneTime.originalPrice}
                      </span>

                      <span className="text-green-600 font-extrabold text-3xl">
                        {courseDetails.feeStructure.oneTime.offer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Course? */}
              <div className="bg-gradient-to-br from-[#002b2b] to-[#004d4d] rounded-2xl shadow-xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10">
                  <FaBook className="text-[150px]" />
                </div>
                <div className="text-center mb-6 relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-400">
                    {t({ en: "Why This Course?", bn: "কেন এই কোর্স?" })}
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-200 text-center max-w-3xl mx-auto text-base leading-relaxed relative z-10 font-medium">
                  {whyDescription}
                </p>
              </div>

              {/* VIDEO GALLERY */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "Video Gallery", bn: "ভিডিও গ্যালারি" })}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {videoGallery.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className="group block overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer bg-white transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <YoutubeThumbImg
                          url={video.url}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#008080] rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                            <FaPlayCircle className="text-2xl" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5">
                        <p className="text-sm font-bold text-[#002b2b] truncate">
                          {video.title}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1 font-medium flex items-center gap-1">
                          <FaPlayCircle className="text-[#00ADD2]" />{" "}
                          {t({ en: "Click to watch", bn: "দেখতে ক্লিক করুন" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "FAQ", bn: "প্রায়শই জিজ্ঞাসিত প্রশ্ন" })}
                  </h2>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                        openFaq === index
                          ? "border-[#00ADD2] shadow-md bg-white"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer"
                      >
                        <span
                          className={`font-bold text-sm md:text-base pr-4 ${openFaq === index ? "text-[#007a91]" : "text-[#002b2b]"}`}
                        >
                          {index + 1}. {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === index ? "bg-[#00ADD2] text-white" : "bg-white text-[#00ADD2] border border-gray-200"}`}
                        >
                          {openFaq === index ? (
                            <FaChevronUp size={12} />
                          ) : (
                            <FaChevronDown size={12} />
                          )}
                        </div>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          openFaq === index
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 md:p-5 pt-0 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR (Scrolls naturally now) */}
            <div className="space-y-6 lg:mt-0 mt-8">
              <div className="space-y-6">
                <div
                  onClick={() => setActiveVideo(videoGallery[0])}
                  className="block relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 cursor-pointer aspect-video transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <YoutubeThumbImg
                    url="https://youtu.be/6gMZDMTMEDk"
                    alt="Promo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                    <div className="w-16 h-16 bg-[#008080]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl text-white transition-transform group-hover:scale-110 border-4 border-white/20">
                      <FaPlayCircle className="text-4xl ml-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#007a91]">
                  <h1 className="text-xl md:text-2xl font-extrabold text-[#007a91] mb-6 text-center tracking-wide">
                    {t({ en: "ENROLL NOW", bn: "এখনই নিবন্ধন করুন" })}
                  </h1>

                  {/* Price Highlight */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-4 mb-6 text-center shadow-inner">
                    <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">
                      {t({ en: "Special Discount", bn: "বিশেষ ডিসকাউন্ট" })}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-gray-400 line-through text-lg">
                        {courseDetails.feeStructure.oneTime.originalPrice}
                      </span>
                      <span className="text-green-600 font-black text-3xl">
                        {courseDetails.feeStructure.oneTime.offer}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-6 relative">
                    <Link to="/admission-now" className="w-1/2">
                      <button className="w-full bg-[#007a91] hover:bg-[#006a7e] text-white font-bold py-3.5 text-xs md:text-sm rounded-l-xl transition-all shadow-md">
                        {t({ en: "Bangla", bn: "বাংলা" })}
                      </button>
                    </Link>
                    <div className="absolute w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-bold shadow-md z-10 text-[10px] md:text-xs border-2 border-gray-100">
                      {t({ en: "Or", bn: "অথবা" })}
                    </div>
                    <Link to="/admission-now" className="w-1/2">
                      <button className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-bold py-3.5 text-xs md:text-sm rounded-r-xl transition-all shadow-md">
                        {t({ en: "English", bn: "ইংরেজি" })}
                      </button>
                    </Link>
                  </div>

                  <div className="space-y-4 text-left px-1 text-[#002b2b] bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between text-sm md:text-base border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-500 flex items-center gap-2">
                        <FaBook className="text-gray-400" />{" "}
                        {t({ en: "Course Level:", bn: "কোর্স লেভেল:" })}
                      </span>{" "}
                      <span className="font-bold text-[#007a91]">
                        {t({ en: "All Levels", bn: "সকলের জন্য" })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-500 flex items-center gap-2">
                        <FaUserTie className="text-gray-400" />{" "}
                        {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                      </span>{" "}
                      <span className="font-bold text-green-600">180+</span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="font-medium text-gray-500 flex items-center gap-2">
                        <FaInfoCircle className="text-gray-400" />{" "}
                        {t({ en: "Updated:", bn: "আপডেট:" })}
                      </span>{" "}
                      <span className="font-bold">09/07/2026</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#002b2b] mb-4 border-b pb-2 flex items-center gap-2">
                    <FaUserTie className="text-[#00ADD2]" />{" "}
                    {t({ en: "Faculty", bn: "অনুষদ" })}
                  </h3>
                  <div className="space-y-4">
                    {instructors.map((instructor) => (
                      <div
                        key={instructor.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <img
                          src={instructor.image}
                          alt="Instructor"
                          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0 shadow-sm"
                        />
                        <div className="overflow-hidden">
                          <h4
                            className="font-bold text-sm text-[#002b2b] leading-tight"
                            dangerouslySetInnerHTML={{
                              __html: instructor.name,
                            }}
                          />
                          <p className="text-xs text-gray-500 mt-1 font-medium bg-white inline-block px-2 py-0.5 rounded border border-gray-200">
                            {instructor.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ভিডিও প্লেয়ার মোডাল (প্রোমো ভিডিওর জন্য) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-20 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110"
            >
              <FaTimes size={18} />
            </button>

            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <div
                className={`w-full h-full transition-all duration-300 ${!isWindowFocused || showSecurityWarning ? "blur-2xl brightness-50 pointer-events-none" : ""}`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${extractYoutubeId(activeVideo.url)}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                  title={activeVideo.title}
                  className="w-full h-full border-none pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  disablePictureInPicture
                  controlsList="nodownload"
                ></iframe>
              </div>

              {(!isWindowFocused || showSecurityWarning) && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 text-white p-4 text-center backdrop-blur-md">
                  <FaShieldAlt className="text-7xl text-red-500 mb-6 animate-pulse" />
                  <h2 className="text-3xl font-bold mb-3">
                    {t({ en: "Video Locked!", bn: "ভিডিও লক করা হয়েছে!" })}
                  </h2>
                  <p className="text-base max-w-md text-gray-300 leading-relaxed">
                    {t({
                      en: "You switched tabs or opened a screen recording tool. Please return to this tab to watch the video.",
                      bn: "আপনি অন্য ট্যাবে গেছেন বা স্ক্রিন রেকর্ডিং টুল ওপেন করেছেন। ভিডিও দেখতে অনুগ্রহ করে এই ট্যাবে ফিরে আসুন।",
                    })}
                  </p>
                </div>
              )}

              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-30">
                <div className="absolute top-1/4 left-1/4 text-white font-mono text-xl md:text-3xl font-bold tracking-widest drop-shadow-lg animate-[ping_4s_ease-in-out_infinite]">
                  ID: {loggedStudent?.studentId || "STUDENT"}
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-white font-mono text-xl md:text-3xl font-bold tracking-widest drop-shadow-lg animate-[bounce_5s_infinite]">
                  PHONE: {loggedStudent?.phone || "01XXXXXXXXX"}
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/40 font-extrabold text-5xl md:text-7xl rotate-12 drop-shadow-2xl">
                  Tarbiyah Academy
                </div>
              </div>
            </div>

            <div className="p-4 md:p-5 bg-[#1a1a1a] text-white flex justify-between items-center border-t border-gray-800">
              <h3 className="font-bold text-base md:text-xl truncate pr-4">
                {activeVideo.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-gray-800 px-3 py-1 rounded-full">
                <FaShieldAlt className="text-green-500" />{" "}
                {t({ en: "Protected Content", bn: "সুরক্ষিত কন্টেন্ট" })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ImamNabawiDetails;
