import React, { useState } from "react";
import { Link } from "react-router";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HifzBannerImg from "../../image/banner (2).jpg";
import HIfzThumbalImg from "../../image/hifzthumbal.jpg";

// Swiper CSS
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
  FaDownload,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

// Import certificate image (same as other pages)
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

// --- Instructor Images ---
import MujahidImg from "../../image/Mujahid.png";
import SalmanImg from "../../image/salman.png";
import AbunumanImg from "../../image/Abunoman.jpg";
import MahmudulImg from "../../image/mahmudul.png";
import Ahmedjaber from "../../image/Ahamed jabe.png";
import Avator from "../../image/arartor.png";

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

const HifzDetail = () => {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- INSTRUCTORS (6 specific teachers) ---
  const instructors = [
    {
      id: 1,
      name: t({ en: "Mujahidul Islam", bn: "মুজাহিদুল ইসলাম" }),
      title: t({ en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: MujahidImg,
    },
    {
      id: 2,
      name: t({ en: "Salman Ahmad", bn: "সালমান আহমেদ" }),
      title: t({ en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: SalmanImg,
    },
    {
      id: 3,
      name: t({ en: "Abu Noman", bn: "আবু নোমান" }),
      title: t({ en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: AbunumanImg,
    },
    {
      id: 4,
      name: t({ en: "Mahmudur Rahman", bn: "মাহমুদুর রহমান" }),
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: MahmudulImg,
    },
    {
      id: 5,
      name: t({ en: "Ahmad Jaber", bn: "আহমেদ জাবের" }),
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: Ahmedjaber,
    },
    {
      id: 6,
      name: t({ en: "Suraiya Akhtar", bn: "সুরাইয়া আক্তার" }),
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran Studies", bn: "কুরআন স্টাডিজ" }),
      image: Avator,
    },
  ];

  // Course Details (translated)
  const courseDetails = {
    title: t({ en: "ONLINE QURAN TARTIB HIFZ", bn: "অনলাইন কুরআন তরতিব হিফজ" }),
    description: t({
      en: "Allah Ta'ala says, 'Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian.' The chapter of Hifz is a blessed and precious field of knowledge. Therefore, every Muslim should memorize and protect the Quran through proper recitation. The reward and virtue of memorizing the Quran are immense. That is why we have prepared this 'Online Quran Tartib Hifz' project. Through this project, a student can easily complete the memorization of the Quran, Insha'Allah.",
      bn: "আল্লাহ তায়ালা বলেন, আমিই যিকর (কুরআন) নাযিল করেছি এবং আমিই উহার সংরক্ষণ। হিফজ অধ্যায়টি সর্বসাকুল্যে precious বরকত পূর্ণ সমৃদ্ধ বিষয় তথা ক্ষেত্র। তাই প্রত্যেক মুসলিম হিসেবে আল্লাহর কালামের সঠিক কুরআনুল কারীমকে মুখস্থ করার মাধ্যমে হেফাযত করা। কুরআনুল কারীম হিফযকরণের সওয়াব ও ফজিলত অনেক বেশি। তাই আমরা প্রস্তুত করেছি 'অনলাইন কুরআন তরতিব হিফজ' এই প্রজেক্টটি। প্রজেক্টের মাধ্যমে একজন শিক্ষার্থী খুব সহজেই কুরআনুল কারীম হিফজ সমাপ্ত করতে পারার ইনশাআল্লাহ।",
    }),
    objectives: [
      t({
        en: "Memorization techniques and practice",
        bn: "হিফজের বিষয়াবলী ও অনুশীলনী",
      }),
      t({
        en: "Practical Tajweed with certified instructors",
        bn: "ব্যবহারিক তাজবিদ ও সার্টিফাইড ইন্সট্রাক্টর",
      }),
      t({
        en: "Weekly sessions and monthly evaluations",
        bn: "সাপ্তাহিক সেশন ও মাসিক মূল্যায়ন",
      }),
      t({
        en: "Regular progress tracking and oral tips",
        bn: "নিয়মিত প্রগ্রেস ও মৌখিক টিপস",
      }),
    ],
    interCourses: [
      t({ en: "Complete Quran Hifz", bn: "পূর্ণ কুরআন হিফজ" }),
      t({ en: "Complete 30 Juz Hifz", bn: "৩০ পাড়া সম্পূর্ণ হিফজ" }),
      t({ en: "Arabic Suy Hifz", bn: "অ্যারাবিক সুয় হিফজ" }),
    ],
    targetAudience: [
      t({
        en: "For students who can recite the Quran with correct pronunciation.",
        bn: "যাঁরা শুদ্ধ মাত্রায় কুরআনকে পড়তে পারে এমন শিক্ষার্থীদের জন্য।",
      }),
      t({
        en: "Anyone of any age who wants to become a Hafiz or Hafiza.",
        bn: "যে কোনো বয়সের যে কেউ হাজী বা হাফেজ হতে পারে।",
      }),
      t({
        en: "Those who want to memorize the Quran from home without leaving their place.",
        bn: "বসে না থেকে ঘরে বসে কুরআন হিফজ করতে আগ্রহী।",
      }),
      t({
        en: "For those who are interested in Quran Hifz alongside their busy work life.",
        bn: "কর্মব্যস্ত জীবনের পাশাপাশি ঘরে কুরআন হিফজ প্রতি আগ্রহীদের জন্য।",
      }),
    ],
    materials: [
      t({
        en: "Class video recordings",
        bn: "প্রোডাক্ট হোপ্লেট || ক্লাস ভিডিও রেকর্ডিং",
      }),
      t({
        en: "Class duration: 120 minutes per class",
        bn: "ক্লাসের সময়কাল: ১২০ মিনিট প্রতি ক্লাস",
      }),
      t({
        en: "Certificate and Ijazah provided",
        bn: "সার্টিফিকেট ও ইনরাইট প্রদান",
      }),
      t({
        en: "Exams: Selective and Trial",
        bn: "পরীক্ষা: সিলেক্টিভ এবং ট্রায়াল",
      }),
      t({
        en: "Weekly classes: 4 days (regular batch)",
        bn: "সাপ্তাহিক ক্লাসের দিন: ৪ দিন [নিয়মিত ব্যাচের জন্য]",
      }),
      t({
        en: "Weekly classes: 2 days (VIP batch)",
        bn: "সাপ্তাহিক ক্লাসের দিন: ২ দিন [ভিপিসী ব্যাচের জন্য]",
      }),
    ],
    feeStructure: [
      t({ en: "Admission Fee 2000 TK", bn: "ভর্তি ফি ২০০০ টাকা" }),
      t({ en: "Monthly Fee 2000 TK", bn: "মাসিক ফি ২০০০ টাকা" }),
    ],
  };

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
      text: t({ en: "Monthly Assessments", bn: "মাসিক মূল্যায়ন" }),
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
      text: t({ en: "One-to-One Support", bn: "ওয়ান-টু-ওয়ান সাপোর্ট" }),
    },
    {
      icon: <FaCertificate className="text-xl" />,
      text: t({ en: "Certificate", bn: "সার্টিফিকেট" }),
    },
  ];

  // --- TESTIMONIALS: 3 new + 3 from QuidaNurani = 6 total ---
  const testimonials = [
    // New 3 from screenshots
    {
      id: 1,
      name: "ZAREEN TASNIM SILVIA",
      designation: "FATHER: DEWAN SAYEDUL HAQUE MANU",
      quote: "আলহামদুলিল্লাহ উস্তাদ আন্তরিকতার সাথেই পড়াচ্ছেন।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 2,
      name: "NAZDA CHOWDHURY",
      designation: "FATHER: CM MARUF",
      quote: "আলহামদুলিল্লাহ খুব সুন্দর মজলিস। কুরআন মজিদ পড়ানোর মান।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 3,
      name: "ARIZ BIN AZAD",
      designation: "FATHER: ABUL KALAM AZAD MAZUMDAR",
      quote: "আলহামদুলিল্লাহ উস্তাদ এবং শিক্ষাদান পদ্ধতি নিয়ে আমরা সন্তুষ্ট।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    // 3 from QuidaNurani
    {
      id: 4,
      name: "MARYUM BINTE HASAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "আলহামদুলিল্লাহ এটা আমার মেয়ের প্রথম শিক্ষা প্রতিষ্ঠান। উস্তাদ খুব সুন্দর করে ক্লাস নেন। আমার বাবু ক্লাস করতে খুব আনন্দ পায় আলহামদুলিল্লাহ। মারগিয়াম তো ক্লাসের এক ঘন্টা আগে থেকে অপেক্ষা করে। আলহামদুলিল্লাহ আমাদের সন্তানের খুশিই আমাদের সবচেয়ে বড় পাওয়া।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 5,
      name: "MARYAM BINT RAIHAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "আলহামদুলিল্লাহ আমার সন্তানদের পড়া ভালোভাবে হচ্ছে। পড়ানোর পদ্ধতি আলহামদুলিল্লাহ ভালো।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 6,
      name: "RAIYAN IBN RAIYAN",
      designation: t({ en: "Parent of Student", bn: "শিক্ষার্থীর অভিভাবক" }),
      quote:
        "মাশাল্লাহ আপনাদের এই অনলাইন প্রোগ্রামটি অনেক ভালো লেগেছে আমার। উস্তাদ মাশাল্লাহ অনেক ভালো এবং আন্তরিকভাবে পাঠদান করেন।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
  ];

  // --- VIDEO GALLERY (6 videos: 2 new + 4 from QuidaNurani) ---
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/dkXJOsVKqsQ/hqdefault.jpg",
      url: "https://youtu.be/dkXJOsVKqsQ?si=FPdD6Pec957idJVG",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/fqafW3frdx8/hqdefault.jpg",
      url: "https://youtu.be/fqafW3frdx8?si=s0T6R_T0X-J-eJfp",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/6rhnPlznFeQ/hqdefault.jpg",
      url: "https://youtu.be/6rhnPlznFeQ?si=YM31PCCeBwGLH1es",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/JkXBVpTIf40/hqdefault.jpg",
      url: "https://youtu.be/JkXBVpTIf40?si=Aj36hCF4Xe4394ro",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/nac8NN4iEew/hqdefault.jpg",
      url: "https://youtu.be/nac8NN4iEew?si=BAVe1pSlh83aD07N",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/hl-JdFk5_Z4/hqdefault.jpg",
      url: "https://youtu.be/hl-JdFk5_Z4?si=r0tKdVVx98t8Nbpl",
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
        bn: "আমাদের শিক্ষকরা শিশুদের বয়স ও মানসিকতা অনুযায়ী ধৈর্য, আন্তরিকতা ও উৎসাহের সঙ্গে পাঠদান করেন, যাতে তারা আনন্দের সঙ্গে শিখতে পারে।",
      }),
    },
    {
      question: t({
        en: "Tell us about the success of your Hifz Department.",
        bn: "আপনাদের হিফজ ডিপার্টমেন্টের সাফল্য সম্পর্কে বলুন।",
      }),
      answer: t({
        en: "Our Hifz Department has numerous students from home and abroad who have successfully completed Nazerah, Hifz, and Hifz revision and remain regularly connected to the Qur'an.",
        bn: "আমাদের হিফজ ডিপার্টমেন্টে দেশ-বিদেশের অসংখ্য শিক্ষার্থী সফলভাবে নাজেরা, হিফজ ও হিফজ রিভিশন সম্পন্ন করেছে এবং নিয়মিত কুরআনের সঙ্গে সংযুক্ত রয়েছে।",
      }),
    },
    {
      question: t({
        en: "From what age can children start?",
        bn: "কত বছর বয়স থেকে বাচ্চারা শুরু করতে পারে?",
      }),
      answer: t({
        en: "Generally, children can start Qur'an education from age 4-5. However, the appropriate course is selected according to the child's readiness.",
        bn: "সাধারণত ৪-৫ বছর বয়স থেকে শিশুদের কুরআন শিক্ষা শুরু করা যায়। তবে শিশুর প্রস্তুতি অনুযায়ী উপযুক্ত কোর্স নির্বাচন করা হয়।",
      }),
    },
    {
      question: t({
        en: "Why should parents choose Tarbiyah?",
        bn: "অভিভাবকরা কেন তারবিয়াহকে বেছে নেবেন?",
      }),
      answer: t({
        en: "Because we not only teach the Qur'an but also emphasize the child's recitation, manners, regular practice, and progress tracking.",
        bn: "কারণ আমরা শুধু কুরআন শেখাই না; বরং শিশুর তিলাওয়াত, আদব-আখলাক, নিয়মিত অনুশীলন এবং শেখার অগ্রগতির ওপর সমান গুরুত্ব দিই।",
      }),
    },
    {
      question: t({
        en: "Is it possible to do Hifz alongside school/college studies?",
        bn: "স্কুল কলেজের পড়াশোনার পাশাপাশি কি হিফজ করা সম্ভব?",
      }),
      answer: t({
        en: "Yes. Our class schedule is designed so that students can continue Hifz alongside their general education.",
        bn: "হ্যাঁ। আমাদের ক্লাস রুটিন এমনভাবে পরিকল্পিত, যাতে শিক্ষার্থীরা জেনারেল শিক্ষার পাশাপাশি হিফজ চালিয়ে যেতে পারে।",
      }),
    },
    {
      question: t({
        en: "Why is it important to have children memorize the Qur'an?",
        bn: "বাচ্চাদের হিফজ করানো কেন গুরুত্বপূর্ণ?",
      }),
      answer: t({
        en: "Childhood is the best time for memorization. Memorizing the Qur'an at this time makes it easier to retain it long-term and plays a positive role in the child's moral, spiritual, and intellectual development.",
        bn: "শৈশব হলো মুখস্থ করার সর্বোত্তম সময়। এই সময়ে কুরআন হিফজ করলে তা দীর্ঘমেয়াদে সংরক্ষণ সহজ হয় এবং শিশুর নৈতিক, আত্মিক ও বুদ্ধিবৃত্তিক বিকাশেও ইতিবাচক ভূমিকা রাখে।",
      }),
    },
  ];

  // --- PROSPECTUS LINK (same as QuidaNurani) ---
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
            src={HifzBannerImg}
            alt={t({ en: "Hifz Banner", bn: "হিফজ ব্যানার" })}
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors cursor-pointer">
                  <FaShare className="text-lg" />
                  <span className="font-medium">
                    {t({ en: "Share", bn: "শেয়ার" })}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors cursor-pointer">
                  <FaBookmark className="text-lg" />
                  <span className="font-medium">
                    {t({ en: "Wishlist", bn: "উইশলিস্ট" })}
                  </span>
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
                <span>{t({ en: "Course Info", bn: "কোর্স তথ্য" })}</span>
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

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. ABOUT COURSE */}
              <div className="p-8 mt-10">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "About Course", bn: "কোর্স সম্পর্কে" })}
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                  {courseDetails.description}
                </p>
              </div>

              {/* 2. EARN A CERTIFICATE */}
              <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2 uppercase">
                    {t({
                      en: "Earn A Certificate",
                      bn: "সার্টিফিকেট অর্জন করুন",
                    })}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t({
                      en: "Add this certificate to your resume to demonstrate your skills & increase your chances of getting noticed.",
                      bn: "আপনার দক্ষতা প্রদর্শন ও নজরে আসার সম্ভাবনা বাড়াতে এই সার্টিফিকেট আপনার জীবনবৃত্তান্তে যুক্ত করুন。",
                    })}
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2 shrink-0">
                  <img
                    src={AllimiyahCertificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  />
                </div>
              </div>

              {/* 3. WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "What You Will Gain", bn: "আপনি কী পাবেন" })}
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
                      bn: "এখনই এনরোল করুন এবং আপনার শেখার যাত্রা শুরু করুন。",
                    })}
                  </p>
                </div>
                <Link to="/admission-now">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer">
                    {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                  </button>
                </Link>
              </div>

              {/* 5. INTER COURSES */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "Inter Courses", bn: "ইন্টার কোর্স" })}
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

              {/* 6. TARGET AUDIENCE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "Target Audience", bn: "লক্ষ্য দর্শক" })}
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

              {/* 7. MATERIALS INCLUDED */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "Materials Included", bn: "অন্তর্ভুক্ত উপকরণ" })}
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

              {/* 8. COURSE FEE / FEE STRUCTURE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4 uppercase">
                  {t({ en: "Fee Structure", bn: "ফি কাঠামো" })}
                </h2>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {courseDetails.feeStructure.map((fee, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <span className="block text-[#002b2b] font-medium">
                        {fee}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========== LAST 4 SECTIONS ========== */}

              {/* 1. কেন তারবিয়াহ কুরআন স্টাডিজ ? */}
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

              {/* 2. Student & Parent Experiences (6 testimonials) */}
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

              {/* 3. ভিডিও গ্যালারি (6 videos) */}
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
              {/* Course Preview Thumbnail with Play Button */}
              <a
                href="https://youtu.be/NI8VoGYDtYs?si=J-qJ2ujOuvw7Urad"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white p-2 cursor-pointer"
              >
                <img
                  src={HIfzThumbalImg}
                  alt={t({
                    en: "Course Preview Thumbnail",
                    bn: "কোর্স প্রিভিউ থাম্বনেইল",
                  })}
                  className="w-full h-44 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                    <FaPlayCircle className="text-4xl" />
                  </div>
                </div>
              </a>

              {/* Pricing & Enrollment Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h2 className="text-xl font-bold text-[#007a91] mb-5">
                  {t({ en: "Apply This Course", bn: "এই কোর্সে আবেদন করুন" })}
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <Link to="/admission-now" className="w-full">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-md hover:opacity-90 transition cursor-pointer">
                      {t({ en: "Enroll Now", bn: "এখনই নিবন্ধন করুন" })}
                    </button>
                  </Link>
                </div>

                {/* Prospectus Download Button */}
                <div className="flex items-center justify-center">
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
              </div>

              {/* Faculty List (6 teachers) */}
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

export default HifzDetail;
