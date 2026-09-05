import React, { useState } from "react";
import { Link } from "react-router";
import AlemiyahBanner from "../../image/alemiyahkidscover.png";
import AlemyahCourse from "../../image/alemiyahkidsthumball.png";
// Swiper এবং প্রয়োজনীয় মডিউল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import girlavator from "../../image/arartor.png";
import MamunImg from "../../image/Abdullahmanun.jpg";
import MahmudImg from "../../image/Hridoy-Ustaz-01.png";
import MarjanaImg from "../../image/arartor.png";
import Certificate from "../../image/allimiyahcertificate.png";

// Swiper-এর CSS ফাইলগুলো ইমপোর্ট করুন
import "swiper/css";
import "swiper/css/pagination";

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
  FaHeadset,
  FaGlobe,
  FaPlayCircle,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ImamhussainImg from "../../image/Emam Hussain.png";
import AtiqullahImg from "../../image/atikullah.png";
import JubaerImg from "../../image/jubair.png";
import AlaminImg from "../../image/Alamin.png";

// --- Language Hook (self-contained) ---
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

const AlimiyahKidsDetails = () => {
  const { t } = useLanguage();

  const [openSemester, setOpenSemester] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Alimiyah Kids এর ইনস্ট্রাক্টর (ট্রান্সলেটেড)
  const instructors = [
    {
      id: 1,
      name: "Abdullah Al Mamun",
      title: t({ en: "Co Ordinator", bn: "সমন্বয়ক" }),
      subtitle: t({
        en: "Tarbiyah Education Network",
        bn: "তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: MamunImg,
    },
    {
      id: 2,
      name: "Hussain Mohammad Hidoy",
      title: t({ en: "Coordinator", bn: "সমন্বয়ক" }),
      subtitle: t({
        en: "Department of Islamic Studies, Tarbiyah Education Network",
        bn: "ইসলামিক স্টাডিজ বিভাগ, তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: MahmudImg,
    },
    {
      id: 3,
      name: "Emam hussain",
      title: t({ en: "Junior Faculty", bn: "জুনিয়র অনুষদ সদস্য" }),
      subtitle: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: ImamhussainImg,
    },
    {
      id: 4,
      name: "Marjan Ahmad",
      title: t({ en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({
        en: "Tarbiyah Education Network",
        bn: "তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: MarjanaImg,
    },
    {
      id: 5,
      name: "Atiqullah Sahid",
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Allimiyah", bn: "আলিমিয়াহ" }),
      image: AtiqullahImg,
    },
    {
      id: 6,
      name: "Jubair Hussain",
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Allimiyah", bn: "আলিমিয়াহ" }),
      image: JubaerImg,
    },
    {
      id: 7,
      name: "Al Amin",
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Allimiyah", bn: "আলিমিয়াহ" }),
      image: AlaminImg,
    },
  ];

  // Alimiyah Kids এর মূল ডাটা (ট্রান্সলেটেড)
  const courseDetails = {
    title: t({ en: "Alimiyah for Kids", bn: "আলিমিয়াহ ফর কিডস" }),
    subtitle: t({
      en: "Islamic education for children",
      bn: "বাচ্চাদের জন্য ইসলামিক শিক্ষা",
    }),
    description: t({
      en: "Alimiyah Basic Islam Course is basically designed for Muslim children and teenagers. Which will help the student to acquire basic knowledge of Islam as well as to implement it. This course will play a great role in knowing the Islamic solutions and procedures in all the necessary areas based on the 10 basic subjects. This course will develop positive mindset in children.",
      bn: "আলিমিয়াহ বেসিক ইসলাম কোর্সটি মূলত মুসলিম শিশু ও কিশোরদের জন্য ডিজাইন করা হয়েছে। যা শিক্ষার্থীকে ইসলামের মৌলিক জ্ঞান অর্জনের পাশাপাশি তা বাস্তবায়নে সাহায্য করবে। এই কোর্সটি ১০টি মৌলিক বিষয়ের ভিত্তিতে প্রয়োজনীয় সকল ক্ষেত্রে ইসলামি সমাধান ও পদ্ধতি জানতে গুরুত্বপূর্ণ ভূমিকা পালন করবে। এই কোর্সটি শিশুদের মধ্যে ইতিবাচক মানসিকতা গড়ে তুলবে।",
    }),
    objectives: [
      t({
        en: "Knowledge of pure Aqeedah",
        bn: "বিশুদ্ধ আকিদাহ সম্পর্কিত জ্ঞানলাভ",
      }),
      t({ en: "Basic Masaa'il (issues)", bn: "ব্যাসিক মাসাআলা-মাসায়েল" }),
      t({
        en: "Basic Islamic knowledge suitable for children",
        bn: "ছোটদের উপযোগী দ্বীনের মৌলিক জ্ঞানার্জন",
      }),
      t({
        en: "Arabic language learning sessions for children",
        bn: "ছোটদের আরবি ভাষায় শিক্ষার আসর",
      }),
      t({ en: "Fully online course", bn: "সম্পূর্ণ অনলাইন ভিত্তিক কোর্স" }),
      t({
        en: "Live classes, homework, lecture sheets & recorded classes",
        bn: "লাইভ ক্লাস, মাশক্ব, লেকচার শীট ও রেকর্ডেড ক্লাস",
      }),
      t({ en: "Complete Qa'idah practice", bn: "সম্পূর্ণ কায়দা অনুশীলন" }),
      t({
        en: "Arabic language learning sessions for children",
        bn: "ছোটদের আরবি ভাষা শিক্ষার আসর",
      }),
      t({
        en: "Hadith & Sunnah practice for children",
        bn: "ছোটদের হাদিস ও সুন্নাহ চর্চা",
      }),
      t({
        en: "Du'a and Ibadah practice for children",
        bn: "ছোটদের দোয়া ও ইবাদত চর্চা",
      }),
      t({ en: "Akhlaq and Adab for children", bn: "ছোটদের আখলাক ও আদব" }),
    ],
    benefits: [
      t({
        en: "Those living abroad who are deprived of Islamic education",
        bn: "প্রবাসে বসবাসের ফলে যারা দ্বীনী শিক্ষার্জনের সুবিধা হতে বঞ্চিত",
      }),
      t({
        en: "Professional English version for English medium students",
        bn: "ইংলিশ মিডিয়ামের শিক্ষার্থীদের জন্য রয়েছে প্রফেশনাল ইংলিশ ভার্সন",
      }),
      t({
        en: "Those who are interested in Islamic education alongside general education",
        bn: "জেনারেল শিক্ষার পাশাপাশি যারা দ্বীনি শিক্ষার আগ্রহ লালন করেন",
      }),
      t({
        en: "This course is specially designed for students aged 6-12",
        bn: "৬-১২ বছরের সকল শিক্ষার্থীর জন্য এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে",
      }),
      t({
        en: "Those who want to raise their children as practicing Muslims",
        bn: "যারা নিজেদের সন্তানকে প্র্যাক্টিসিং মুসলিম হিসেবে গড়ে তুলতে চান",
      }),
    ],
    schedule: {
      duration: t({ en: "2 Years", bn: "২ বছর" }),
      classes: t({ en: "3 days a week", bn: "সপ্তাহে ৩ দিন" }),
      time: t({ en: "10:00 AM - 11:30 AM", bn: "সকাল ১০:০০ - ১১:৩০" }),
      totalClasses: t({ en: "240 classes", bn: "২৪০টি ক্লাস" }),
    },
    price: {
      original: t({ en: "8,000 TK", bn: "৮,০০০ টাকা" }),
      discount: t({ en: "5,500 TK", bn: "৫,৫০০ টাকা" }),
      save: t({ en: "31%", bn: "৩১%" }),
    },
  };

  // Materials Included (ট্রান্সলেটেড)
  const materialsData = [
    {
      text: t({
        en: "3 classes per week (2 days)",
        bn: "সপ্তাহে ২ দিন ৩টি ক্লাস",
      }),
      icon: <FaClock className="text-[#00ADD2]" />,
    },
    {
      text: t({ en: "Each class 40 minutes", bn: "প্রতিটি ক্লাস ৪০ মিনিট" }),
      icon: <FaClock className="text-[#00ADD2]" />,
    },
    {
      text: t({
        en: "Live class recording for each class",
        bn: "প্রতিটি ক্লাসের লাইভ ক্লাস রেকর্ড",
      }),
      icon: <FaVideo className="text-[#00ADD2]" />,
    },
    {
      text: t({
        en: "Recorded video for each class",
        bn: "প্রতিটি ক্লাসের রেকর্ডেড ভিডিও",
      }),
      icon: <FaRegDownload className="text-[#00ADD2]" />,
    },
    {
      text: t({
        en: "Quizzes and Midterm exams",
        bn: "কুইজ ও মিডটার্ম পরীক্ষা",
      }),
      icon: <FaQuestionCircle className="text-[#00ADD2]" />,
    },
    {
      text: t({ en: "Semester final exams", bn: "সেমিস্টার ফাইনাল পরীক্ষা" }),
      icon: <FaRegClipboard className="text-[#00ADD2]" />,
    },
    {
      text: t({ en: "Course duration notes", bn: "কোর্স ডিউরেশন এর নোট" }),
      icon: <FaFileAlt className="text-[#00ADD2]" />,
    },
    {
      text: t({
        en: "Certificate and Ijazah",
        bn: "সার্টিফিকেট ও ইজাযাহ প্রদান",
      }),
      icon: <FaCertificate className="text-[#00ADD2]" />,
    },
  ];

  // Why Tarbiyah features (ট্রান্সলেটেড)
  const whyFeatures = [
    {
      icon: <FaCheckCircle />,
      text: t({
        en: "Authentic Aqeedah-based curriculum",
        bn: "বিশুদ্ধ আকিদাভিত্তিক পাঠক্রম",
      }),
    },
    {
      icon: <FaUserTie />,
      text: t({
        en: "Renowned Islamic scholars",
        bn: "দেশবরেণ্য ইসলামি স্কলার",
      }),
    },
    {
      icon: <FaVideo />,
      text: t({ en: "Live and recorded classes", bn: "লাইভ ও রেকর্ডেড ক্লাস" }),
    },
    {
      icon: <FaHeadset />,
      text: t({
        en: "Regular academic support",
        bn: "নিয়মিত একাডেমিক সাপোর্ট",
      }),
    },
    {
      icon: <FaCertificate />,
      text: t({ en: "Ijazah and Certificate", bn: "ইজাযাহ ও সার্টিফিকেট" }),
    },
    {
      icon: <FaGlobe />,
      text: t({
        en: "Participate from anywhere in the world",
        bn: "বিশ্বের যেকোনো দেশ থেকে অংশগ্রহণ",
      }),
    },
  ];

  // Testimonials (এগুলো বাংলায় থাকবে, ট্রান্সলেট করা হয়নি – যেমনটি আছে)
  const testimonials = [
    {
      id: 1,
      name: "Sabikun Nahar",
      designation: "STUDENT ID: TDIS25B1128, BATCH: 11",
      quote:
        "আলহামদুলিল্লাহ জীবনে অনেক ক্লাস করেছি কিন্তু কুরআন শিক্ষার জন্য আমার মনে হয় আজকের ক্লাস টা বেস্ট। যারা জেন হন নি প্লিজ তাড়াতাড়ি জেন হন। অনেক গুরুত্বপূর্ণ আলোচনা হচ্ছে আলহামদুলিল্লাহ।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 2,
      name: "আহলিয়া হাসান",
      designation: "STUDENT ID: TDIS24B8008, BATCH: 08",
      quote:
        "শায়খ প্রফেসর মোখতার স্যারের ভিডিওর মাধ্যমে। তারপর আমার মেয়েকে কুরআন ফর কিডস এ দিয়েছি। এখন আমার ছয় বছরের পাখিটা সহি শুদ্ধ করে কুরআন পড়তে পারে আলহামদুলিল্লাহ।। এবং সারাদিন একবার এই আয়াত একবার ওই আয়াত আনমনেই বলতে থাকে আলহামদুলিল্লাহ আলহামদুলিল্লাহ। এমনকি ওর সামনে কেউ তেলাওয়াত করতে গেলে তার ভুলও ধরে। আলহামদুলিল্লাহ অনেক অনেক দোয়া এবং ভালোবাসা এই প্রতিষ্ঠানের জন্য।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 3,
      name: "Mehedi Hasan",
      designation: "STUDENT ID: TDIS23B6056, BATCH: 5&6",
      quote:
        "আসসালামু আলাইকুম। আমার বাচ্চার ৯ বছর আলিমিয়ান ফর কিডস বেসিক কোর্সটি সম্পন্ন করেছে। তাই আমি চাচ্ছি দ্বিতীয় কোর্সে একটু তাড়াতাড়ি ভর্তি করতে। আমাকে এ ব্যাপারে সাহায্য করবেন দয়া করে। ছয় মাসের কোর্সের মাধ্যমে এতটা উপকৃত হব আমি কখনো ভাবি নি আস্থা ছিল আপনাদের প্রতিষ্ঠানের উপর। আমরা ছাচ্ছি পরবর্তী কোর্সগুলো যদি ওদের কথা চিন্তা করে আপনারা কোনো কোর্সের উদ্যোগ নেন তাহলে আমরা উপকৃত হব।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 4,
      name: "MST SONEA KHATUN",
      designation: "STUDENT ID: TDIS25B1128, BATCH: 11",
      quote:
        "আমার সবগুলোই ভালো লেগেছে। কারণ, দ্বীন পালনের ক্ষেত্রে প্রত্যেকটাই সমান জরুরি। নির্দিষ্ট কোন একটাকে বাদ দিলে বা কম পছন্দের মনে করলে, কোর্সটি যেন অসম্পূর্ণ থেকে যাবে।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 5,
      name: "MEHEDI HASAN",
      designation: "STUDENT ID: TDIS24B8008, BATCH: 08",
      quote:
        "চলমান সেমিস্টারে আমার সবচেয়ে ভালো লেগেছে সিরাহ কোর্সটি। এই কোর্সে মহানবী হযরত মুহাম্মদ (সা.) এর জীবন ও চরিত্র সম্পর্কে গভীরভাবে জানতে পেরেছি। তাঁর ধৈর্য, ন্যায়বিচার, দাওয়াতি পদ্ধতি ও নৈতিকতা আমার জীবনে অনুপ্রেরণা জুগিয়েছে। এ কারণে সিরাহ কোর্সটি আমার কাছে সবচেয়ে প্রিয়।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 6,
      name: "TAHMINA TARIN",
      designation: "STUDENT ID: TDIS23B6056, BATCH: 5&6",
      quote:
        "লাস্ট সেমিস্টার এ আমার সবচেয়ে ভালো লেগেছে কমপারেটিভ রিলিজিওন। উস্তাদ ডঃ আবু বকর যাকারিয়া এতো সুন্দর করে ভেঙ্গে ভেঙ্গে দ্বীন, ধর্ম, রিলিজিওন এর পার্থক্য এবং বিভিন্ন ধর্মগুলো এতো নিখুঁত ভাবে উপস্থাপন করেছেন যে আমাদের মন এবং মস্তিষ্কে তা গভীরভাবে গেথে গিয়েছে। আলহামদুলিল্লাহ। আমি শ্রদ্ধেয় উস্তাদগণের দীর্ঘায়ু কামনা করছি। পাশাপাশি তারবিয়া একাডেমি কে ধন্যবাদ জানাবো আমাদের জন্য এতো সুন্দর, ওয়েল অর্গানাইজড একটা কোর্স করার সুযোগ করে দেওয়ার জন্য। জাযাকুমুল্লাহ খাইরান।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
  ];

  // Video Gallery (ট্রান্সলেটেড)
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/I1ibIcH35k4/hqdefault.jpg",
      url: "https://youtu.be/I1ibIcH35k4?si=l6ig1yuVRai-OtXj",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/D5Ov8e2aDh0/hqdefault.jpg",
      url: "https://youtu.be/D5Ov8e2aDh0?si=LG7MHGRQBIw4pSxA",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/VvWiI0H_1aM/hqdefault.jpg",
      url: "https://youtu.be/VvWiI0H_1aM?si=4KyGDgdCGqgj-dvG",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/BfQfFoEYpl4/hqdefault.jpg",
      url: "https://youtu.be/BfQfFoEYpl4?si=dSmxcRERYRmTDSD7",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/e3PX_VdD_jI/hqdefault.jpg",
      url: "https://youtu.be/e3PX_VdD_jI?si=qeCYrxke3um9G1yg",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/EbcUT8uqW8g/hqdefault.jpg",
      url: "https://youtu.be/EbcUT8uqW8g?si=yFGWV7Q6FicA-Dyz",
    },
  ];

  // FAQ (ট্রান্সলেটেড)
  const faqs = [
    {
      question: t({
        en: "What is the purpose of this program?",
        bn: "এই প্রোগ্রামের উদ্দেশ্য কী?",
      }),
      answer: t({
        en: "To build children and teenagers with sound Aqeedah, Qur'an-Sunnah based knowledge, and excellent character alongside general education.",
        bn: "জেনারেল শিক্ষার পাশাপাশি শিশু-কিশোরদের সহিহ আকীদা, কুরআন-সুন্নাহভিত্তিক জ্ঞান ও উত্তম চরিত্রে গড়ে তোলা।",
      }),
    },
    {
      question: t({
        en: "What age group can enroll in this program?",
        bn: "কত বছরের শিক্ষার্থীরা এই প্রোগ্রামে ভর্তি হতে পারবে?",
      }),
      answer: t({
        en: "Students aged 6–12 can enroll.",
        bn: "৬–১২ বছর বয়সী শিক্ষার্থীরা এই প্রোগ্রামে ভর্তি হতে পারবে।",
      }),
    },
    {
      question: t({
        en: "What subjects will be taught in this program?",
        bn: "এই প্রোগ্রামে কোন কোন বিষয় পড়ানো হবে?",
      }),
      answer: t({
        en: "Aqeedah, Qur'an, Hadith, Fiqh, Seerah, Arabic language, Adab-Akhlaq, and essential Islamic topics.",
        bn: "আকীদাহ, কুরআন, হাদিস, ফিকহ, সীরাহ, আরবি ভাষা, আদব-আখলাক এবং প্রয়োজনীয় ইসলামি বিষয়সমূহ।",
      }),
    },
    {
      question: t({
        en: "Why should parents choose Tarbiyah?",
        bn: "অভিভাবকরা কেন তারবিয়াহকে বেছে নেবেন?",
      }),
      answer: t({
        en: "Because here we ensure a kid-friendly curriculum, experienced teachers, regular assessments, and parent-friendly support through modern online education methods.",
        bn: "কারণ এখানে আধুনিক অনলাইন শিক্ষাপদ্ধতির মাধ্যমে কিডস ফেন্ডলি কারিকুলাম, অভিজ্ঞ শিক্ষক, নিয়মিত মূল্যায়ন এবং অভিভাবকবান্ধব সাপোর্ট নিশ্চিত করা হয়।",
      }),
    },
    {
      question: t({
        en: "What is the duration of this program?",
        bn: "এটি কত বছরের প্রোগ্রাম?",
      }),
      answer: t({
        en: "It is a 6-month Alimiyah for Kids program.",
        bn: "এটি একটি ৬ মাস মেয়াদি আলিমিয়্যাহ ফর কিডস প্রোগ্রাম।",
      }),
    },
    {
      question: t({
        en: "What will be the outcome for students after completing the course?",
        bn: "কোর্স শেষে শিক্ষার্থীদের আউটকাম কী হবে?",
      }),
      answer: t({
        en: "Students will gain basic to intermediate knowledge of Islam, strengthen their Aqeedah and Ibadah foundations, and be prepared for higher Islamic studies.",
        bn: "শিক্ষার্থীরা ইসলাম সম্পর্কে মৌলিক ও মধ্যম স্তরের জ্ঞান অর্জন করবে, সহিহ আকীদা ও ইবাদতের ভিত্তি দৃঢ় হবে এবং ভবিষ্যতের উচ্চতর ইসলামি শিক্ষার জন্য প্রস্তুত হবে।",
      }),
    },
    {
      question: t({
        en: "Will a certificate be given after the course?",
        bn: "কোর্স শেষে সার্টিফিকেট দেওয়া হবে কি?",
      }),
      answer: t({
        en: "Yes. Successful graduates will be awarded a certificate from Tarbiyah Online Madrasah.",
        bn: "হ্যাঁ। সফলভাবে কোর্স সম্পন্নকারীদের Tarbiyah Online Madrasah-এর পক্ষ থেকে সার্টিফিকেট প্রদান করা হবে।",
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
            to="/course/alemiah"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">
              {t({
                en: "Back to Alimiyah Page",
                bn: "আলিমিয়াহ পেজে ফিরে যান",
              })}
            </span>
          </Link>

          {/* Banner Image */}
          <img
            src={AlemiyahBanner}
            alt={t({
              en: "Alimiyah Kids Banner",
              bn: "আলিমিয়াহ কিডস ব্যানার",
            })}
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center gap-4 py-3">
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
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
                    {t({ en: "WHAT YOU WILL GAIN", bn: "আপনি কী পাবেন" })}
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

              {/* EARN A CERTIFICATE */}
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
                    src={Certificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  />
                </div>
              </div>

              {/* 3. Ready To Apply Button */}
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

              {/* 4. TARGET AUDIENCE */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  {t({ en: "TARGET AUDIENCE", bn: "লক্ষ্য দর্শক" })}
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

              {/* 5. MATERIALS INCLUDED */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  {t({ en: "MATERIALS INCLUDED", bn: "অন্তর্ভুক্ত উপকরণ" })}
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

              {/* 6. COURSE CURRICULUM */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE CURRICULUM", bn: "কোর্স পাঠ্যসূচি" })}
                </h2>
                <div className="border border-gray-300 rounded-sm">
                  {/* Curriculum Item 1: কুরআন */}
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
                        {t({ en: "Qur'an", bn: "কুরআন" })}
                      </span>
                    </div>
                    {openSemester === 1 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Introduction to Arabic Alphabets",
                            bn: "আরবি বর্ণমালা পরিচিতি",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Correct Pronunciation of Arabic Letters",
                            bn: "আরবি বর্ণমালার বিশুদ্ধ উচ্চারণ",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Arabic Diacritics (Harakat & Tanween)",
                            bn: "এরাবিক ডায়াক্রিটিক্স (হারাকাত ও তানবিন)",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Reading Arabic with Spelling",
                            bn: "বানান করে আরবি পাঠ",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Reading Arabic without Spelling",
                            bn: "বানান ছাড়া আরবি পাঠ",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Basic Practical Knowledge of Makharij & Sifaat",
                            bn: "মাখরাজ ও সিফাতের মৌলিক প্রায়োগিক জ্ঞান",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Reciting Qur'an with Tajweed",
                            bn: "তাজবিদের সমন্বয়ে বিশুদ্ধ কুরআন তিলাওয়াত",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "Memorizing Surahs recited in Salah",
                            bn: "সালাতে পঠিত সূরাগুলো মুখস্থকরণ",
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 2: হিফজুল হাদিস */}
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
                        {t({ en: "Hifdhul Hadith", bn: "হিফজুল হাদিস" })}
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
                          <FaExternalLinkAlt className="text-xs" />{" "}
                          {t({ en: "Watch Video", bn: "ভিডিও লিংক দেখুন" })}
                        </a>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: t({
                              en: "Memorization of 50 life-related Hadiths with meanings, <br>basic teachings of authentic Hadith, <br>and impact of Hadith on Aqeedah-Akhlaq and spiritual purification.",
                              bn: "৫০ টি জীবনঘনিষ্ঠ হাদিস মুখস্থকরণ, অর্থসহ সহীহ হাদিসের মৌলিক শিক্ষা, আকিদা-আখলাক ও আত্মিক বিশুদ্ধতায় হাদিসের প্রভাব",
                            }),
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 3: বিশুদ্ধ আকিদাহ ও আদাব */}
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
                        {t({
                          en: "Pure Aqeedah & Adab",
                          bn: "বিশুদ্ধ আকিদাহ ও আদাব",
                        })}
                      </span>
                    </div>
                    {openSemester === 3 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p
                          className="text-[#002b2b]"
                          dangerouslySetInnerHTML={{
                            __html: t({
                              en: "Introduction to correct Aqeedah, importance of studying correct Aqeedah, <br>correct and flawless Aqeedah about Allah and His Book, <br>correct and flawless Aqeedah about Angels and Messengers, <br>correct and flawless Aqeedah about the Hereafter and Destiny.",
                              bn: "সহীহ আকিদাহর পরিচয়, সহীহ আকিদাহ পাঠের গুরুত্ব, <br>আল্লাহ ও তার কিতাব সম্পর্কে সঠিক ও ত্রুটিমুক্ত আকিদাহ, <br>মালাইকা ও রাসুলদের সম্পর্কে সঠিক ও ত্রুটিমুক্ত আকিদাহ, <br>আখিরাত ও তাকদীর সম্পর্কে সঠিক ও ত্রুটিমুক্ত আকিদাহ",
                            }),
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 4: দু'আ এন্ড ইবাদাহ */}
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
                        {t({ en: "Du'a & Ibadah", bn: "দু'আ এন্ড ইবাদাহ" })}
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
                          <FaExternalLinkAlt className="text-xs" />{" "}
                          {t({ en: "Watch Video", bn: "ভিডিও লিংক দেখুন" })}
                        </a>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: t({
                              en: "Rules and Du'as for sleeping and waking up, <br>entering and leaving the toilet, entering and leaving the mosque, <br>basic knowledge of purity and cleanliness, importance of being tidy in Islam, <br>Islamic rules of Wudu and Ghusl, lessons on Adhan and Iqamah, <br>practical understanding of Salah.",
                              bn: "ঘুমাতে যাওয়া ও ঘুম থেকে ওঠার নিয়ম ও দুয়া, ওয়াশরুমে যাওয়া ও বের হবার নিয়ম ও দুয়া, মসজিদে প্রবেশ ও বের হবার নিয়ম ও দুয়া, <br>পবিত্রতা ও পরিচ্ছন্নতার মৌলিক জ্ঞান, ইসলামে পরিপাটি থাকার গুরুত্ব, <br>অযু-গোসলের ইসলামিক নিয়ম, আজান-ইকামাতের শিক্ষা, <br>প্র্যাক্টিক্যাল সালাতের সামগ্রিক ধারণা",
                            }),
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 5: বেসিক এরাবিক */}
                  <div className="border-b border-gray-300">
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
                        {t({
                          en: "Basic Arabic (Spoken & Reading)",
                          bn: "বেসিক এরাবিক (স্পোকেন ও রাইডিং এরাবিক)",
                        })}
                      </span>
                    </div>
                    {openSemester === 5 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "1. Spoken Arabic",
                            bn: "১. স্পোকেন এরাবিক",
                          })}
                        </p>
                        <p className="font-semibold text-[#002b2b]">
                          {t({
                            en: "2. Reading Arabic:",
                            bn: "২. রাইডিং এরাবিক:",
                          })}
                        </p>
                        <p className="pl-4">
                          {t({
                            en: "- Memorizing Arabic vocabulary\n- Names of numbers and colors in Arabic\n- Names of Arabic days and months\n- Introducing oneself and basic conversation\n- Frequently used Arabic conversation in daily life",
                            bn: "- আরবি শব্দমালা মুখস্থকরণ\n- আরবিতে সংখ্যা ও রঙের নাম\n- আরবি দিন ও মাসের নাম\n- নিজের পরিচয় প্রদান ও প্রাথমিক কথোপকথন\n- দৈনন্দিন জীবনের বহুল ব্যবহৃত আরবি কথোপকথন",
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Curriculum Item 6: ইসলামিক ম্যানার্স */}
                  <div>
                    <div
                      onClick={() => toggleSemester(6)}
                      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                      <span className="text-[#00ADD2] text-sm">
                        {openSemester === 6 ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      <span className="text-[#002b2b] font-semibold">
                        {t({ en: "Islamic Manners", bn: "ইসলামিক ম্যানার্স" })}
                      </span>
                    </div>
                    {openSemester === 6 && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-2">
                        <p
                          className="text-[#002b2b]"
                          dangerouslySetInnerHTML={{
                            __html: t({
                              en: "Greeting and Salam, etiquette of speaking, <br>etiquette of eating, respect for parents and elders, <br>humility and purity (politeness and cleanliness), <br>cooperation and charity.",
                              bn: "অভিবাদন ও সালাম, কথা বলার আদব, খাওয়ার আদব, <br>পিতা-মাতা ও মুরব্বিদের সম্মান, নম্রতা ও পরিচ্ছন্নতা, <br>সহযোগিতা ও দানশীলতা",
                            }),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 7. FEE STRUCTURE */}
              <div>
                <h2 className="text-lg font-bold text-[#00ADD2] mb-4">
                  {t({ en: "FEE STRUCTURE", bn: "ফি কাঠামো" })}
                </h2>
                <div className="grid grid-cols-2 gap-10 text-sm">
                  {/* Left Column - Bangla Medium */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      {t({ en: "Bangla Medium:", bn: "বাংলা মিডিয়াম:" })}
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
                            en: "Monthly Fee 2000 TK (6 months)",
                            bn: "মাসিক ফি ২০০০ টাকা (৬ মাস)",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - English Medium */}
                  <div>
                    <p className="text-[#002b2b] font-medium mb-3">
                      {t({ en: "English Medium:", bn: "ইংরেজি মিডিয়াম:" })}
                    </p>
                    <div className="flex items-start gap-3 mb-2">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Admission Fee 3000 TK",
                            bn: "ভর্তি ফি ৩০০০ টাকা",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#00ADD2] mt-1" />
                      <div>
                        <span className="block text-[#002b2b] font-medium">
                          {t({
                            en: "Monthly Fee 3000 TK (6 months)",
                            bn: "মাসিক ফি ৩০০০ টাকা (৬ মাস)",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    {t({
                      en: "* Semester fee can be paid through monthly installments.",
                      bn: "* সেমিস্টার ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদান করার সুযোগ আছে।",
                    })}
                  </p>
                </div>
              </div>

              {/* ========== LAST 4 SECTIONS ========== */}
              {/* 1. কেন তারবিয়াহ আলিমিয়াহ ফর কিডস ? */}
              <div className="bg-gradient-to-br from-[#fff] via-[#fff] to-[#fff] text-black rounded-3xl shadow-2xl p-6 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Tarbiyah Alimiyah for Kids?",
                      bn: "কেন তারবিয়াহ আলিমিয়াহ ফর কিডস ?",
                    })}
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    {
                      text: t({
                        en: "Kid-friendly Teachers",
                        bn: "কিডস ফেন্ডলি ওস্তাদ",
                      }),
                    },
                    {
                      text: t({
                        en: "Live & Recorded Classes",
                        bn: "লাইভ ও রেকর্ডেড ক্লাস",
                      }),
                    },
                    {
                      text: t({
                        en: "One-to-One Academic Support",
                        bn: "ওয়ান-টু-ওয়ান একাডেমিক সাপোর্ট",
                      }),
                    },
                    {
                      text: t({
                        en: "Environment for Character Building",
                        bn: "উওম চরিত্র গঠনের পরিবেশ",
                      }),
                    },
                    {
                      text: t({
                        en: "Kid-friendly Curriculum",
                        bn: "কিডস ফেন্ডলি কারিকুলাম",
                      }),
                    },
                    { text: t({ en: "Certificate", bn: "সার্টিফিকেট" }) },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition-all shadow-md"
                    >
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/25 text-yellow-600 flex items-center justify-center shrink-0 text-xl font-bold">
                        ✓
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-black">
                        {feature.text}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা (বাংলায় থাকবে) */}
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

              {/* 3. ভিডিও গ্যালারি */}
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
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
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
              <a
                href="https://www.youtube.com/watch?v=r0JH4X805mE&feature=youtu.be"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={AlemyahCourse}
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

              {/* Enrollment & Info Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h1 className="text-2xl font-bold text-[#007a91] mb-5">
                  {t({ en: "ENROLL NOW", bn: "এখনই নিবন্ধন করুন" })}
                </h1>

                {/* Split Button with Links */}
                <div className="flex items-center justify-center mb-6 relative">
                  <Link to="/enroll/bangla-version" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>
                  <Link to="/enroll/english-version" className="w-1/2">
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 rounded-r-md hover:opacity-90 transition">
                      {t({ en: "English Version", bn: "ইংরেজি ভার্সন" })}
                    </button>
                  </Link>
                </div>

                {/* Separate Download Button for Prospectus */}
                <div className="flex items-center justify-center mb-6">
                  <a
                    href="https://drive.google.com/file/d/1UfiIPqcdwYa8rxuDO-0RC07PYbTy5ynj/view?usp=sharing"
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
                      {t({ en: "Basic", bn: "বেসিক" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">525</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">03/09/2026</span>
                  </div>
                </div>
              </div>

              {/* Instructors List */}
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

export default AlimiyahKidsDetails;
