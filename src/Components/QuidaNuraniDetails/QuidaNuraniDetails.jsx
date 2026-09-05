import React, { useState } from "react";
import { Link } from "react-router";
import KidsImg from "../../image/kids.jpg";
import NuraniyahcourseImg from "../../image/nuranicourse.jpg";
import NuraniyahbannerImg from "../../image/nuranibanner.jpg";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
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
  FaClock,
  FaVideo,
  FaCertificate,
  FaGraduationCap,
  FaUserTie,
  FaPlayCircle,
  FaHeadset,
  FaGlobe,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Import certificate image (same as Alimiyah pages)
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

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

const QuidaNuraniDetails = () => {
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

  // Instructors (translated)
  const instructors = [
    {
      id: 1,
      name: t({
        en: "Hafez Maulana Abdur Rahman",
        bn: "হাফেজ মাওলানা আব্দুর রহমান",
      }),
      title: t({ en: "Lead Qur'an Teacher", bn: "প্রধান কুরআন শিক্ষক" }),
      subtitle: t({
        en: "Expert in Tajweed & Qira'at",
        bn: "বিশেষজ্ঞ: তাজবিদ ও কিরাত",
      }),
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: t({ en: "Maulana Sadikur Rahman", bn: "মাওলানা সাদিকুর রহমান" }),
      title: t({ en: "Qa'idah Teacher", bn: "কায়দা শিক্ষক" }),
      subtitle: t({
        en: "Expert in Makharij & Sifaat",
        bn: "বিশেষজ্ঞ: মাখরাজ ও সিফাত",
      }),
      image: "https://i.pravatar.cc/150?img=14",
    },
  ];

  // Course Data (translated)
  const courseDetails = {
    title: t({ en: "QAIDA NURANIYAH COURSE", bn: "কায়দা নূরানিয়াহ কোর্স" }),
    description: t({
      en: "Narrated by Abu Hurairah [RA]: The Messenger of Allah [SAW] said, 'Whoever does not recite the Qur'an with proper pronunciation is not considered part of my Ummah.' - Sahih Bukhari 7527. Therefore, it is essential for all of us to learn how to recite the Qur'an correctly and to ensure that our children are taught proper recitation from the very beginning. This course is designed to teach correct pronunciation, basic Tajweed rules, and the foundation of Qur'anic recitation using the Qa'idah Nuraniyah method.",
      bn: "আবু হুরাইরা (রা.) থেকে বর্ণিত: রাসূলুল্লাহ (সা.) বলেছেন, 'যে ব্যক্তি কুরআনকে সঠিক উচ্চারণে পাঠ করে না, সে আমার উম্মতের অন্তর্ভুক্ত নয়।' - সহিহ বুখারি ৭৫২৭। তাই আমাদের সকলের জন্য কুরআন সঠিকভাবে পাঠ করা এবং আমাদের সন্তানদের প্রথম থেকেই সঠিক তিলাওয়াত শেখানো অত্যন্ত জরুরি। এই কোর্সটি কায়দা নূরানিয়াহ পদ্ধতিতে সঠিক উচ্চারণ, তাজবিদের মৌলিক নিয়ম এবং কুরআন তিলাওয়াতের ভিত্তি শেখানোর জন্য ডিজাইন করা হয়েছে।",
    }),
    objectives: [
      t({
        en: "Teaching according to the method of Masjid Nabawi",
        bn: "মসজিদে নববীর পদ্ধতিতে পাঠদান",
      }),
      t({
        en: "Step-by-step basic Tajweed education",
        bn: "ধাপে ধাপে বেসিক তাজউইদ শিক্ষা",
      }),
      t({
        en: "Practice of the last 10 short Surahs",
        bn: "শেষ ১০টি ছোট সূরা মাশক",
      }),
      t({
        en: "Practice and repetition for correct pronunciation",
        bn: "বিশুদ্ধ উচ্চারণ শিক্ষায় মাশক্ব ও তাল্ক্বীন",
      }),
      t({
        en: "Learning Du'as and daily practices in native language",
        bn: "মাতৃভাষার দোয়া ও আমলজাত শিক্ষা",
      }),
      t({ en: "Memorization of selected Hadiths", bn: "হাদীস মুখস্থ শিক্ষা" }),
    ],
  };

  // Curriculum Data (translated)
  const semestersData = [
    {
      title: t({
        en: "Individual Letters (Alphabet)",
        bn: "হুরুফুল হিজাইল মুফরাদাহ (বর্ণমালা শেখা)",
      }),
    },
    {
      title: t({
        en: "Compound Letters (Joined Letters)",
        bn: "হুরুফুল হিজাইল মুরাক্কাবাহ (যুক্তবর্ণ শেখা)",
      }),
    },
    {
      title: t({
        en: "Disjointed Letters (Muqatta'at)",
        bn: "হুরুফুল মুক্বাত্তাআ'ত",
      }),
    },
    {
      title: t({
        en: "Introduction to Harakat (Fathah, Kasrah, Dhammah)",
        bn: "হারাকাতের পরিচিতি (ফাতহা, কাসরা, দম্মাহ)",
      }),
    },
    { title: t({ en: "Introduction to Tanween", bn: "তানউইনের পরিচিতি" }) },
    {
      title: t({
        en: "Practice of Harakat & Tanween",
        bn: "হারাকাত ও তানউইনের অনুশীলন",
      }),
    },
    {
      title: t({
        en: "Small Alif, Small Ya, Small Waw",
        bn: "আলিফ সাগীরা, ইয়া সাগীরা, ওয়াও সাগীরা",
      }),
    },
    {
      title: t({
        en: "Madd & Leen Letters (Practice)",
        bn: "হুরুফুল মাদ্দ ও লীন (অনুশীলন)",
      }),
    },
    {
      title: t({
        en: "Introduction & Practice of Sukun",
        bn: "সূকূনের পরিচিতি ও অনুশীলন",
      }),
    },
    {
      title: t({
        en: "Introduction & Practice of Shaddah",
        bn: "সাদ্দাহ পরিচিতি ও অনুশীলন",
      }),
    },
    {
      title: t({
        en: "Madd with Sukun & Shaddah",
        bn: "সূকূন ও সাদ্দাহর সাথে মাদ্দ",
      }),
    },
    {
      title: t({
        en: "Practice of all Tajweed Rules",
        bn: "সকল তাজউইদের অনুশীলন",
      }),
    },
    {
      title: t({
        en: "Practice of short Surahs",
        bn: "ছোট সূরাহ সমূহের প্রাকটিস",
      }),
    },
  ];

  // Why Tarbiyah Quran Studies features (translated)
  const whyFeatures = [
    {
      icon: <FaUserTie className="text-xl" />,
      text: t({ en: "Kid-friendly Teachers", bn: "কিডস ফেন্ডলি উস্তাদ" }),
    },
    {
      icon: <FaVideo className="text-xl" />,
      text: t({ en: "Live Classes", bn: "লাইভ ক্লাস" }),
    },
    {
      icon: <FaCheckCircle className="text-xl" />,
      text: t({ en: "Monthly Assessments", bn: "মাসিক মূল্যায়ন" }),
    },
    {
      icon: <FaGlobe className="text-xl" />,
      text: t({
        en: "Personal Progress Tracking",
        bn: "ব্যক্তিগত অগ্রগতি পর্যবেক্ষণ",
      }),
    },
    {
      icon: <FaHeadset className="text-xl" />,
      text: t({ en: "One-to-One Support", bn: "ওয়ান-টু-ওয়ান সাপোর্ট" }),
    },
    {
      icon: <FaCertificate className="text-xl" />,
      text: t({ en: "Certificate", bn: "সার্টিফিকেট" }),
    },
  ];

  // Testimonials (from screenshots)
  const testimonials = [
    {
      id: 1,
      name: "MARYUM BINTE HASAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "আলহামদুলিল্লাহ এটা আমার মেয়ের প্রথম শিক্ষা প্রতিষ্ঠান। উস্তাদ খুব সুন্দর করে ক্লাস নেন। আমার বাবু ক্লাস করতে খুব আনন্দ পায় আলহামদুলিল্লাহ। মারগিয়াম তো ক্লাসের এক ঘন্টা আগে থেকে অপেক্ষা করে। আলহামদুলিল্লাহ আমাদের সন্তানের খুশিই আমাদের সবচেয়ে বড় পাওয়া।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 2,
      name: "MARYAM BINT RAIHAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "আলহামদুলিল্লাহ আমার সন্তানদের পড়া ভালোভাবে হচ্ছে। পড়ানোর পদ্ধতি আলহামদুলিল্লাহ ভালো।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 3,
      name: "RAIYAN IBN RAIYAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "মাশাল্লাহ আপনাদের এই অনলাইন প্রোগ্রামটি অনেক ভালো লেগেছে আমার। উস্তাদ মাশাল্লাহ অনেক ভালো এবং আন্তরিকভাবে পাঠদান করেন।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 4,
      name: "MUHAMMAD BIN JUBAYER",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "আপনাদের জন্য ধন্যবাদ। আলহামদুলিল্লাহ, আপনার শিক্ষাদান পদ্ধতি এবং শিক্ষকদের চেষ্টায় আমরা খুবই সন্তুষ্ট। আল্লাহ আপনাদের সকলকে উত্তম প্রতিদান দিন। জাযাকাল্লাহ খাইরান।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
  ];

  // --- NEW VIDEO GALLERY (6 specific YouTube videos) ---
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/6rhnPlznFeQ/hqdefault.jpg",
      url: "https://youtu.be/6rhnPlznFeQ?si=YM31PCCeBwGLH1es",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/JkXBVpTIf40/hqdefault.jpg",
      url: "https://youtu.be/JkXBVpTIf40?si=Aj36hCF4Xe4394ro",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/nac8NN4iEew/hqdefault.jpg",
      url: "https://youtu.be/nac8NN4iEew?si=BAVe1pSlh83aD07N",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/hl-JdFk5_Z4/hqdefault.jpg",
      url: "https://youtu.be/hl-JdFk5_Z4?si=r0tKdVVx98t8Nbpl",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/C2uz9KhrvEY/hqdefault.jpg",
      url: "https://youtu.be/C2uz9KhrvEY?si=u84aB2rEtUep01gr",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/YdODzy7Lthc/hqdefault.jpg",
      url: "https://youtu.be/YdODzy7Lthc?si=D3cO6wFbCRG8d9GM",
    },
  ];

  // FAQ Data (translated)
  const faqs = [
    {
      question: t({
        en: "Can this course be taken from Europe, America, or the Middle East?",
        bn: "ইউরোপ, আমেরিকা বা মধ্যপ্রাচ্য থেকে কি এই কোর্সটি করা যাবে?",
      }),
      answer: t({
        en: "Yes. This program can be attended online from anywhere in the world.",
        bn: "হ্যাঁ। বিশ্বের যেকোনো দেশ থেকে অনলাইনের মাধ্যমে এই প্রোগ্রামে অংশগ্রহণ করা যাবে।",
      }),
    },
    {
      question: t({
        en: "How do your teachers interact with children?",
        bn: "আপনাদের ওস্তাদরা বাচ্চাদের সঙ্গে কেমন আচরণ করেন?",
      }),
      answer: t({
        en: "Our teachers teach with patience, sincerity, and encouragement according to the age and mentality of the children, so that they can learn with joy.",
        bn: "আমাদের শিক্ষকরা শিশুদের বয়স ও মানসিকতা অনুযায়ী ধৈর্য, আন্তরিকতা ও উৎসাহের সঙ্গে পাঠদান করেন, যাতে তারা আনন্দের সঙ্গে শিখতে পারে।",
      }),
    },
    {
      question: t({
        en: "Tell us about the success of your Hifz Department.",
        bn: "আপনাদের হিফজ ডিপার্টমেন্টের সাফল্য সম্পর্কে বলুন।",
      }),
      answer: t({
        en: "Our Hifz Department has numerous students from home and abroad who have successfully completed Nazerah, Hifz, and Hifz revision and remain regularly connected to the Qur'an.",
        bn: "আমাদের হিফজ ডিপার্টমেন্টে দেশ-বিদেশের অসংখ্য শিক্ষার্থী সফলভাবে নাজেরা, হিফজ ও হিফজ রিভিশন সম্পন্ন করেছে এবং নিয়মিত কুরআনের সঙ্গে সংযুক্ত রয়েছে।",
      }),
    },
    {
      question: t({
        en: "From what age can children start?",
        bn: "কত বছর বয়স থেকে বাচ্চারা শুরু করতে পারে?",
      }),
      answer: t({
        en: "Generally, children can start Qur'an education from age 4-5. However, the appropriate course is selected according to the child's readiness.",
        bn: "সাধারণত ৪-৫ বছর বয়স থেকে শিশুদের কুরআন শিক্ষা শুরু করা যায়। তবে শিশুর প্রস্তুতি অনুযায়ী উপযুক্ত কোর্স নির্বাচন করা হয়।",
      }),
    },
    {
      question: t({
        en: "Why should parents choose Tarbiyah?",
        bn: "অভিভাবকরা কেন তারবিয়াহকে বেছে নেবেন?",
      }),
      answer: t({
        en: "Because we not only teach the Qur'an but also emphasize the child's recitation, manners, regular practice, and progress tracking.",
        bn: "কারণ আমরা শুধু কুরআন শেখাই না; বরং শিশুর তিলাওয়াত, আদব-আখলাক, নিয়মিত অনুশীলন এবং শেখার অগ্রগতির ওপর সমান গুরুত্ব দিই।",
      }),
    },
    {
      question: t({
        en: "Is it possible to do Hifz alongside school/college studies?",
        bn: "স্কুল কলেজের পড়াশোনার পাশাপাশি কি হিফজ করা সম্ভব?",
      }),
      answer: t({
        en: "Yes. Our class schedule is designed so that students can continue Hifz alongside their general education.",
        bn: "হ্যাঁ। আমাদের ক্লাস রুটিন এমনভাবে পরিকল্পিত, যাতে শিক্ষার্থীরা জেনারেল শিক্ষার পাশাপাশি হিফজ চালিয়ে যেতে পারে।",
      }),
    },
    {
      question: t({
        en: "Why is it important to have children memorize the Qur'an?",
        bn: "বাচ্চাদের হিফজ করানো কেন গুরুত্বপূর্ণ?",
      }),
      answer: t({
        en: "Childhood is the best time for memorization. Memorizing the Qur'an at this time makes it easier to retain it long-term and plays a positive role in the child's moral, spiritual, and intellectual development.",
        bn: "শৈশব হলো মুখস্থ করার সর্বোত্তম সময়। এই সময়ে কুরআন হিফজ করলে তা দীর্ঘমেয়াদে সংরক্ষণ সহজ হয় এবং শিশুর নৈতিক, আত্মিক ও বুদ্ধিবৃত্তিক বিকাশেও ইতিবাচক ভূমিকা রাখে।",
      }),
    },
  ];

  // --- PROSPECTUS LINK (same as Alimiyah Program) ---
  const prospectusLink =
    "https://drive.google.com/file/d/1mv0ponZWJ0Jb2cXSsvITdneTwYMQfXkv/view?usp=sharing";

  const handleDownloadPDF = () => {
    window.open(prospectusLink, "_blank");
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
            <span className="font-medium">
              {t({ en: "Back to Course Page", bn: "কোর্স পেজে ফিরে যান" })}
            </span>
          </Link>

          {/* Hero Section Banner */}
          <img
            src={NuraniyahbannerImg}
            alt={t({
              en: "Qa'idah Nuraniyah Banner",
              bn: "কায়দা নূরানিয়াহ ব্যানার",
            })}
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
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

            {/* Tab Content */}
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
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. ABOUT COURSE */}
              <div className="p-8 mt-10">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {courseDetails.description}
                </p>
              </div>

              {/* 2. EARN A CERTIFICATE (NEW) */}
              <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2">
                    {t({
                      en: "EARN A CERTIFICATE",
                      bn: "সার্টিফিকেট অর্জন করুন",
                    })}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t({
                      en: "Add this certificate to your resume to demonstrate your skills & increase your chances of getting noticed.",
                      bn: "আপনার দক্ষতা প্রদর্শন ও নজরে আসার সম্ভাবনা বাড়াতে এই সার্টিফিকেট আপনার জীবনবৃত্তান্তে যুক্ত করুন।",
                    })}
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                  <img
                    src={AllimiyahCertificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  />
                </div>
              </div>

              {/* 3. WHAT YOU WILL GAIN */}
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

              {/* 4. Ready To Apply Your Course */}
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

              {/* 5. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "TARGET AUDIENCE", bn: "লক্ষ্য দর্শক" })}
                </h2>
                <div className="space-y-2">
                  {[
                    t({
                      en: "Those interested in learning correct Qur'an recitation from home and abroad",
                      bn: "দেশ ও প্রবাস থেকে কুরআনের সঠিক তিলাওয়াত শিখতে আগ্রহী",
                    }),
                    t({
                      en: "Parents who want to raise their children as practicing Muslims",
                      bn: "যারা নিজেদের সন্তানকে প্র্যাক্টিসিং মুসলিম হিসেবে গড়ে তুলতে চান",
                    }),
                    t({
                      en: "Those who are interested in Qur'an education alongside general studies",
                      bn: "জেনারেল শিক্ষার পাশাপাশি যারা কুরআন শিক্ষার প্রতি আগ্রহ লালন করেন",
                    }),
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

              {/* 6. MATERIALS INCLUDED */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "MATERIALS INCLUDED", bn: "অন্তর্ভুক্ত উপকরণ" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {[
                    t({
                      en: "Course Duration: 4 months (each session)",
                      bn: "কোর্সের মেয়াদঃ ৪ মাস (প্রতিটি সেশন)",
                    }),
                    t({
                      en: "Weekly classes: 4 days (regular batch)",
                      bn: "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    }),
                    t({
                      en: "Class duration: 120 minutes (per class)",
                      bn: "ক্লাসের সময়কাল: 120 মিনিট (প্রতি ক্লাস)",
                    }),
                    t({
                      en: "Exams: Midterm and Final",
                      bn: "পরীক্ষা: মিডটার্ম এবং ফাইনাল",
                    }),
                    t({
                      en: "Weekly classes: 4 days (regular batch)",
                      bn: "সাপ্তাহিক ক্লাসের দিন: 4 দিন (নিয়মিত ব্যাচের জন্য)",
                    }),
                    t({
                      en: "Certificate upon course completion",
                      bn: "কোর্স শেষে সার্টিফিকেট প্রদান",
                    }),
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. COURSE CURRICULUM */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE CURRICULUM", bn: "কোর্স পাঠ্যসূচি" })}
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
                          {t({
                            en: "Detailed lesson plan for this module will be provided here.",
                            bn: "এই মডিউলের বিস্তারিত পাঠ পরিকল্পনা এখানে দেওয়া হবে।",
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. COURSE FEE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE FEE", bn: "কোর্স ফি" })}
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  {/* Left Column - Bangla */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      {t({
                        en: "Bangla Medium Course",
                        bn: "বাংলা মিডিয়াম কোর্স",
                      })}
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Admission Fee 1000 TK",
                            bn: "ভর্তি ফি ১০০০ টাকা",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Monthly Fee 1000 TK",
                            bn: "মাসিক ফি ১০০০ টাকা",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - English/International */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      {t({
                        en: "International Course",
                        bn: "আন্তর্জাতিক কোর্স",
                      })}
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Admission Fee 2000 TK",
                            bn: "ভর্তি ফি ২০০০ টাকা",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Monthly Fee 2000 TK",
                            bn: "মাসিক ফি ২০০০ টাকা",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    {t({
                      en: "* Semester fee can be paid through monthly installments.",
                      bn: "* সেমিস্টারে ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদান করা যাবে।",
                    })}
                  </p>
                </div>
              </div>

              {/* ========== LAST 4 SECTIONS ========== */}

              {/* 1. Why Tarbiyah Quran Studies */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Tarbiyah Quran Studies?",
                      bn: "কেন তারবিয়াহ কুরআন স্টাডিজ ?",
                    })}
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

              {/* 2. Student & Parent Experiences */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "Student & Parent Experiences",
                      bn: "শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা",
                    })}
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
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
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

              {/* 3. Video Gallery (UPDATED with 6 videos) */}
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

              {/* 4. FAQ */}
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
              {/* Video Thumbnail */}
              <a
                href="https://www.facebook.com/share/v/19Gy21NzZQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={NuraniyahcourseImg}
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
                  {t({ en: "ENROLL NOW", bn: "এখনই নিবন্ধন করুন" })}
                </h1>

                {/* Split Button with Links */}
                <div className="flex items-center justify-center mb-6 relative">
                  <Link to="/course/kids/quida/enrollbnagla" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>

                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>

                  <Link to="/enroll/quida/english-version" className="w-1/2">
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 text-xs rounded-r-md hover:opacity-90 transition">
                      {t({ en: "English Version", bn: "ইংরেজি ভার্সন" })}
                    </button>
                  </Link>
                </div>

                {/* Prospectus Download Button */}
                <div className="flex items-center justify-center mb-6">
                  <a
                    href={prospectusLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-semibold py-3 rounded-xl shadow flex items-center justify-center gap-2 transition-all">
                      <FaDownload />{" "}
                      {t({ en: "Prospectus", bn: "প্রসপেক্টাস" })}
                    </button>
                  </a>
                </div>

                {/* Info Details */}
                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Course Level:", bn: "কোর্স লেভেল:" })}
                    </span>
                    <span className="font-bold">
                      {t({ en: "Beginner", bn: "শুরু" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">405</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">09/05/2026</span>
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

export default QuidaNuraniDetails;
