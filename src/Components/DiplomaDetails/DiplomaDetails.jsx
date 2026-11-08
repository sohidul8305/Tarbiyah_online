import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import BannerImg from "../../image/diplomacover.png";
import CourseImg from "../../image/diplomathumball.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProfessorImg from "../../image/profile.jpg";
import abubakkerImg from "../../image/DRABMjakariya.png";
import JubairEhsanImg from "../../image/Zubair.jpeg";
import MonjurImg from "../../image/Monjur.png";
import motiulImg from "../../image/Motiul Islam .jpeg";
import UbadullahImg from "../../image/Ubaydullah.png";
import JakariyamasudImg from "../../image/jakariyah.png";
import Mohammadhidoy from "../../image/Hridoy-Ustaz-01.png";
import AbdullahMamunImg from "../../image/Abdullahmanun.jpg";
import AbunomanImg from "../../image/Abunoman.jpg";
import Abdullahkafi from "../../image/Abdullah Kafi.png";
import ImamhossainImg from "../../image/Emam Hussain.png";
import Avatorboys from "../../image/Avatorboys.png";
import Certificate from "../../image/certificate.png";
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
  FaVideo,
  FaHeadset,
  FaCertificate,
  FaGlobe,
  FaPlayCircle,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// ---------- Language Hook ----------
export const useLanguage = () => {
  const [language, setLanguage] = useState(
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

  const t = (translations) => translations[language] || translations["en"];

  return { language, t };
};
// -----------------------------------

const DiplomaDetails = () => {
  const { t } = useLanguage();

  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "ViewContent",
      course_name: "Diploma in Islamic Studies",
    });
  }, []);

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  // ---------- Instructors ----------
  const instructors = [
    {
      id: 1,
      name: "Professor Mokhter Ahmad",
      title: t({
        en: "Chairman, Tarbiyah Education Network",
        bn: "চেয়ারম্যান, তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: ProfessorImg,
    },
    {
      id: 2,
      name: "Dr. Abu Bakr Muhammad Zakaria",
      title: t({
        en: "Prof. Islamic University, Kushtia",
        bn: "অধ্যাপক, ইসলামী বিশ্ববিদ্যালয়, কুষ্টিয়া",
      }),
      subtitle: t({
        en: "Comparative Theology and Aqeedah",
        bn: "তুলনামূলক ধর্মতত্ত্ব ও আকীদাহ",
      }),
      image: abubakkerImg,
    },
    {
      id: 3,
      name: "Dr. Zubair Ehsanul Haque",
      title: t({
        en: "Department Head, Dhaka University",
        bn: "বিভাগীয় প্রধান, ঢাকা বিশ্ববিদ্যালয়",
      }),
      subtitle: t({
        en: "Subject: Arabic Language",
        bn: "বিষয়: আরবি ভাষা",
      }),
      image: JubairEhsanImg,
    },
    {
      id: 4,
      name: "Dr. Mir Manzoor Mahmud",
      title: t({
        en: "Prof. Manarat Int. University",
        bn: "অধ্যাপক, মানারাত ইন্টারন্যাশনাল ইউনিভার্সিটি",
      }),
      subtitle: t({
        en: "Subject: Seerah and History of Islam",
        bn: "বিষয়: সীরাহ ও ইসলামের ইতিহাস",
      }),
      image: MonjurImg,
    },
    {
      id: 5,
      name: "Dr. Matiul Islam",
      title: t({
        en: "Bangladesh Islamic University",
        bn: "বাংলাদেশ ইসলামী বিশ্ববিদ্যালয়",
      }),
      subtitle: t({
        en: "Subject: Hadith Studies",
        bn: "বিষয়: হাদিস অধ্যয়ন",
      }),
      image: motiulImg,
    },
    {
      id: 6,
      name: "Dr. Mohammad Obaidullah",
      title: t({
        en: "Bangladesh Islamic University",
        bn: "বাংলাদেশ ইসলামী বিশ্ববিদ্যালয়",
      }),
      subtitle: t({
        en: "School of Arts and Humanities, Manarat International University",
        bn: "কলা ও মানবিক অনুষদ, মানারাত ইন্টারন্যাশনাল ইউনিভার্সিটি",
      }),
      image: UbadullahImg,
    },
    {
      id: 7,
      name: "Ustad Zakaria Masud",
      title: t({
        en: "Writer, Islamic writer and thinker",
        bn: "লেখক, ইসলামিক লেখক ও চিন্তাবিদ",
      }),
      subtitle: t({ en: "Subject: Seerah", bn: "বিষয়: সীরাহ" }),
      image: JakariyamasudImg,
    },
    {
      id: 8,
      name: "Ustad Hossain Mohammad Hridoy",
      title: t({ en: "Coordinator", bn: "সমন্বয়ক" }),
      subtitle: t({
        en: "Department of Islamic Studies, Tarbiyah Education Network",
        bn: "ইসলামিক স্টাডিজ বিভাগ, তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: Mohammadhidoy,
    },
    {
      id: 9,
      name: "Ustad Abdullah Al Mamun",
      title: t({ en: "Faculty", bn: "অনুষদ সদস্য" }),
      subtitle: t({
        en: "Tarbiyah Education Network",
        bn: "তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: AbdullahMamunImg,
    },
    {
      id: 10,
      name: "Ustad Abu Noman",
      title: t({ en: "Coordinator", bn: "সমন্বয়ক" }),
      subtitle: t({
        en: "Department of Quranic Studies, Tarbiyah Education Network",
        bn: "কুরআনিক স্টাডিজ বিভাগ, তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      }),
      image: AbunomanImg,
    },
    {
      id: 11,
      name: "Dr Abdullah Al kafi",
      title: t({ en: "Senior Faculty", bn: "সিনিয়র অনুষদ সদস্য" }),
      subtitle: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: Abdullahkafi,
    },
    {
      id: 12,
      name: "Emam Hussain",
      title: t({ en: "Junior Faculty", bn: "জুনিয়র অনুষদ সদস্য" }),
      subtitle: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: ImamhossainImg,
    },
    {
      id: 13,
      name: "Sarder Al Mahmud",
      title: t({ en: "Faculty", bn: "অনুষদ সদস্য" }),
      subtitle: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: Avatorboys,
    },
    {
      id: 14,
      name: "Sayed Al Amin",
      title: t({ en: "Junior Faculty", bn: "জুনিয়র অনুষদ সদস্য" }),
      subtitle: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: Avatorboys,
    },
  ];

  // ---------- Semesters ----------
  const semestersData = [
    {
      title: t({ en: "1st Year - Semester 1", bn: "১ম বর্ষ - সেমিস্টার ১" }),
      subjects: [
        t({
          en: "101 – Qa'idah Nooraniyah and Basic Tajweed",
          bn: "১০১ – ক্বায়েদা নূরানিয়্যাহ ও প্রাথমিক তাজবীদ",
        }),
        t({
          en: "102 – Fundamentals of Aqeedah",
          bn: "১০২ – আকীদাহর মৌলিক বিষয়",
        }),
        t({ en: "103 – Fiqh of Taharah", bn: "১০৩ – পবিত্রতার ফিকহ" }),
        t({
          en: "104 – Imam Nawawi's 40 Hadith",
          bn: "১০৪ – ইমাম নববীর ৪০ হাদিস",
        }),
        t({
          en: "105 – The Makkan Life of the Prophet (ﷺ)",
          bn: "১০৫ – নবী (ﷺ)-এর মক্কী জীবন",
        }),
        t({
          en: "106 – Madinah Arabic Reader-1",
          bn: "১০৬ – মদিনা আরবি রিডার-১",
        }),
      ],
    },
    {
      title: t({ en: "1st Year - Semester 2", bn: "১ম বর্ষ - সেমিস্টার ২" }),
      subjects: [
        t({ en: "201 – Nazirah Juz 'Amma", bn: "২০১ – নাযিরাহ জুয 'আম্মা" }),
        t({
          en: "202 – Aqeedah of the Saved Sect",
          bn: "২০২ – নাজাতপ্রাপ্ত দলের আকীদাহ",
        }),
        t({ en: "203 – Fiqh of Salah", bn: "২০৩ – সালাতের ফিকহ" }),
        t({
          en: "204 – Mukhtasar Sahih al-Bukhari",
          bn: "২০৪ – মুখতাসার সহীহ আল-বুখারী",
        }),
        t({
          en: "205 – The Madinan Life of the Prophet (ﷺ)",
          bn: "২০৫ – নবী (ﷺ)-এর মাদানী জীবন",
        }),
        t({
          en: "206 – Madinah Arabic Reader-2",
          bn: "২০৬ – মদিনা আরবি রিডার-২",
        }),
      ],
    },
    {
      title: t({ en: "1st Year - Semester 3", bn: "১ম বর্ষ - সেমিস্টার ৩" }),
      subjects: [
        t({
          en: "301 – Nazirah Juz' Tabarak",
          bn: "৩০১ – নাযিরাহ জুয তাবারাক",
        }),
        t({
          en: "302 – Fiqh al-Asma wa al-Sifat",
          bn: "৩০২ – ফিকহ আল-আসমা ওয়াস সিফাত",
        }),
        t({ en: "303 – Fiqh of Zakah", bn: "৩০৩ – যাকাতের ফিকহ" }),
        t({
          en: "304 – Mukhtasar Sahih al-Bukhari",
          bn: "৩০৪ – মুখতাসার সহীহ আল-বুখারী",
        }),
        t({ en: "305 – Khulafa' al-Rashidun", bn: "৩০৫ – খুলাফায়ে রাশিদীন" }),
        t({
          en: "306 – Madinah Arabic Reader-3",
          bn: "৩০৬ – মদিনা আরবি রিডার-৩",
        }),
      ],
    },
    {
      title: t({ en: "2nd Year - Semester 4", bn: "২য় বর্ষ - সেমিস্টার ৪" }),
      subjects: [
        t({
          en: "401 – Nazirah: Surah al-Baqarah",
          bn: "৪০১ – নাযিরাহ: সূরা আল-বাকারাহ",
        }),
        t({ en: "402 – Firqah Batilah", bn: "৪০২ – ফিরকাহ বাতিলাহ" }),
        t({
          en: "403 – Fiqh of Fasting and Hajj",
          bn: "৪০৩ – সিয়াম ও হজের ফিকহ",
        }),
        t({
          en: "404 – Mukhtasar Sahih al-Bukhari",
          bn: "৪০৪ – মুখতাসার সহীহ আল-বুখারী",
        }),
        t({
          en: "405 – The Umayyad and Abbasid Caliphates",
          bn: "৪০৫ – উমাইয়া ও আব্বাসীয় খিলাফত",
        }),
        t({
          en: "406 – Madinah Arabic Reader-4",
          bn: "৪০৬ – মদিনা আরবি রিডার-৪",
        }),
      ],
    },
    {
      title: t({ en: "2nd Year - Semester 5", bn: "২য় বর্ষ - সেমিস্টার ৫" }),
      subjects: [
        t({ en: "501 – Principles of Qur'an", bn: "৫০১ – কুরআনের মূলনীতি" }),
        t({
          en: "502 – Comparative Religion",
          bn: "৫০২ – তুলনামূলক ধর্মতত্ত্ব",
        }),
        t({ en: "503 – Fiqhul Muamalat", bn: "৫০৩ – ফিকহুল মুআমালাত" }),
        t({
          en: "504 – Mukhtasar Sahih al-Bukhari",
          bn: "৫০৪ – মুখতাসার সহীহ আল-বুখারী",
        }),
        t({
          en: "505 – Principles of Da'wah and the Da'i",
          bn: "৫০৫ – দাওয়াহ ও দায়ীর মূলনীতি",
        }),
        t({
          en: "506 – Madinah Arabic Reader-5",
          bn: "৫০৬ – মদিনা আরবি রিডার-৫",
        }),
      ],
    },
    {
      title: t({ en: "2nd Year - Semester 6", bn: "২য় বর্ষ - সেমিস্টার ৬" }),
      subjects: [
        t({
          en: "601 – Tafsir al-Qur'an: Surah al-Kahf",
          bn: "৬০১ – তাফসীর আল-কুরআন: সূরা আল-কাহফ",
        }),
        t({ en: "602 – Principles of Fiqh", bn: "৬০২ – ফিকহের মূলনীতি" }),
        t({
          en: "603 – Law of Inheritance and Penal Code",
          bn: "৬০৩ – উত্তরাধিকার আইন ও দণ্ডবিধি",
        }),
        t({
          en: "604 – Mukhtasar Sahih al-Bukhari",
          bn: "৬০৪ – মুখতাসার সহীহ আল-বুখারী",
        }),
        t({
          en: "605 – Productive Muslim (Philosophy of a Successful Muslim Life)",
          bn: "৬০৫ – প্রোডাক্টিভ মুসলিম (সফল মুসলিম জীবনের দর্শন)",
        }),
        t({
          en: "606 – Madinah Arabic Reader-6",
          bn: "৬০৬ – মদিনা আরবি রিডার-৬",
        }),
      ],
    },
  ];

  // ---------- Program Structure ----------
  const programStructure = {
    duration: t({ en: "2 Years (6 Semesters)", bn: "২ বছর (৬ সেমিস্টার)" }),
    classMethod: t({ en: "Online (Zoom)", bn: "অনলাইন (জুম)" }),
    time: t({
      en: "8:00 PM – 10:00 PM (Bangladesh Time)",
      bn: "রাত ৮:০০ – ১০:০০ (বাংলাদেশ সময়)",
    }),
    classesPerWeek: t({
      en: "3 Days (2 Classes per day)",
      bn: "৩ দিন (প্রতিদিন ২টি ক্লাস)",
    }),
    sessionsPerSemester: t({ en: "96 Sessions", bn: "৯৬টি সেশন" }),
    language: t({
      en: "Bangla (with Arabic & English terminology)",
      bn: "বাংলা (আরবি ও ইংরেজি পরিভাষা সহ)",
    }),
  };

  const prospectusLink =
    "https://acrobat.adobe.com/id/urn:aaid:sc:ap:6475bc81-d81e-455d-9716-81cdba6bf4f4";

  const handleDownloadPDF = () => window.open(prospectusLink, "_blank");

  const whyFeatures = [
    {
      icon: <FaCheckCircle />,
      text: t({
        en: "Authentic Aqeedah-based Curriculum",
        bn: "বিশুদ্ধ আকিদাভিত্তিক পাঠক্রম",
      }),
    },
    {
      icon: <FaUserTie />,
      text: t({
        en: "Renowned Islamic Scholars",
        bn: "দেশবরেণ্য ইসলামি স্কলার",
      }),
    },
    {
      icon: <FaVideo />,
      text: t({ en: "Live and Recorded Classes", bn: "লাইভ ও রেকর্ডেড ক্লাস" }),
    },
    {
      icon: <FaHeadset />,
      text: t({
        en: "Regular Academic Support",
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
        en: "Participate from Anywhere in the World",
        bn: "বিশ্বের যেকোনো দেশ থেকে অংশগ্রহণ",
      }),
    },
  ];

  // ---------- Testimonials ----------
  const testimonials = [
    {
      id: 1,
      name: "MST SONEA KHATUN",
      designation: "STUDENT ID: TDIS25B1128, BATCH: 11",
      quote:
        "আমার সবগুলোই ভালো লেগেছে। কারণ, দ্বীন পালনের ক্ষেত্রে প্রত্যেকটাই সমান জরুরি। নির্দিষ্ট কোন একটাকে বাদ দিলে বা কম পছন্দের মনে করলে, কোর্সটি যেন অসম্পূর্ণ থেকে যাবে।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 2,
      name: "MEHEDI HASAN",
      designation: "STUDENT ID: TDIS24B8008, BATCH: 08",
      quote:
        "চলমান সেমিস্টারে আমার সবচেয়ে ভালো লেগেছে সিরাহ কোর্সটি। এই কোর্সে মহানবী হযরত মুহাম্মদ (সা.) এর জীবন ও চরিত্র সম্পর্কে গভীরভাবে জানতে পেরেছি। তাঁর ধৈর্য, ন্যায়বিচার, দাওয়াতি পদ্ধতি ও নৈতিকতা আমার জীবনে অনুপ্রেরণা জুগিয়েছে। এ কারণে সিরাহ কোর্সটি আমার কাছে সবচেয়ে প্রিয়।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 3,
      name: "TAHMINA TARIN",
      designation: "STUDENT ID: TDIS23B6056, BATCH: 5&6",
      quote:
        "লাস্ট সেমিস্টার এ আমার সবচেয়ে ভালো লেগেছে কমপারেটিভ রিলিজিওন। উস্তাদ ডঃ আবু বকর যাকারিয়া এতো সুন্দর করে ভেঙ্গে ভেঙ্গে দ্বীন, ধর্ম, রিলিজিওন এর পার্থক্য এবং বিভিন্ন ধর্মগুলো এতো নিখুঁত ভাবে উপস্থাপন করেছেন যে আমাদের মন এবং মস্তিষ্কে তা গভীরভাবে গেথে গিয়েছে। আলহামদুলিল্লাহ। আমি শ্রদ্ধেয় উস্তাদগণের দীর্ঘায়ু কামনা করছি। পাশাপাশি তারবিয়া একাডেমি কে ধন্যবাদ জানাবো আমাদের জন্য এতো সুন্দর, ওয়েল অর্গানাইজড একটা কোর্স করার সুযোগ করে দেওয়ার জন্য। জাযাকুমুল্লাহ খাইরান।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 4,
      name: "Asma Akter Roma",
      designation:
        "স্টুডেন্ট: ৫ম সেমিস্টার, ডিপার্টমেন্ট: ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      quote:
        "আলহামদুলিল্লাহ আমাদের সকল উস্তায খুবই বিনয়ের সাথে ক্লাস বুঝিয়ে দিয়ে থাকেন, বিশেষ করে উস্তায ডঃ যুবায়েরের ইহসান তার ক্লাসে পড়া বুঝিয়ে দেন এবং পড়াগুলো ক্লাসেই আদায় করে নেন। মাঝে মাঝে গুগল ফর্মে HW দিয়ে থাকেন। উস্তাযের পড়ানোর এই নিয়ম নীতি আমার কাছে খুবই ভালো লাগে।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 5,
      name: "Umme Musa",
      designation:
        "Former Assistant Professor, Dept. of CSE, BUBT (স্টুডেন্ট: ১ম সেমিস্টার, ডিপ্লোমা ইন ইসলামিক স্টাডিজ)",
      quote:
        "হাদিস- ক্লাসের রেকর্ড অনেক গোছানো, নোট আছে। সিরাহ কোর্সের মতই সমসাময়িক বিষয়ে হাদিসগুলোর প্রয়োগ বুঝতে পেরেছি। এই কোর্সের বড় একটা ভালো দিক- প্রতিটা লেসনের শেষে Sample Question আছে। এতে করে পরীক্ষা ভীতি দূর হয়েছে। আলহামদুলিল্লাহ।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 6,
      name: "জান্নাতি মহল মিলোরা",
      designation: "শিক্ষার্থী: ডিপ্লোমা ইন ইসলামিক স্টাডিজ, ২য় সেমিস্টার",
      quote:
        "আলহামদুলিল্লাহ প্রত্যেক ওস্তাদের ক্লাস অত্যন্ত আনন্দের সাথে করছি। আমার কাছে প্রত্যেক ওস্তাদকেই ভীষণ ভালো লাগে এবং আমি মহান আল্লাহ তায়ালার কাছে শুকরিয়া জ্ঞাপন করছি যে আল্লাহ তায়ালা আমাকে এই কোর্স করার তৌফিক দান করেছেন।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
  ];

  // ---------- Video Gallery ----------
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/OFXVzYi_lLo/hqdefault.jpg",
      url: "https://youtu.be/OFXVzYi_lLo",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/4cTt9SmRK_8/hqdefault.jpg",
      url: "https://youtu.be/4cTt9SmRK_8",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/RiUeYS8DWAA/hqdefault.jpg",
      url: "https://youtu.be/RiUeYS8DWAA",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/KR59dFBOpbg/hqdefault.jpg",
      url: "https://youtu.be/KR59dFBOpbg",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/dorXizH7iR0/hqdefault.jpg",
      url: "https://youtu.be/dorXizH7iR0",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/_IU75TfdGTM/hqdefault.jpg",
      url: "https://youtu.be/_IU75TfdGTM",
    },
  ];

  // ---------- FAQ ----------
  const faqs = [
    {
      question: t({
        en: "Who is this Diploma program for?",
        bn: "ডিপ্লোমা প্রোগ্রামটি কাদের জন্য?",
      }),
      answer: t({
        en: "This program is open to all – men and women. Students, professionals, entrepreneurs, expatriates, and anyone interested in Islamic knowledge can participate.",
        bn: "এই প্রোগ্রামটি নারী-পুরুষ সকলের জন্য উন্মুক্ত। শিক্ষার্থী, চাকরিজীবী, ব্যবসায়ী, প্রবাসী এবং দ্বীনি জ্ঞানচর্চায় আগ্রহী যে কেউ এতে অংশগ্রহণ করতে পারবেন।",
      }),
    },
    {
      question: t({
        en: "What subjects will be taught in this program?",
        bn: "এই প্রোগ্রামে কী কী বিষয় পড়ানো হবে?",
      }),
      answer: t({
        en: "Aqidah, Fiqh, Hadith, Tafsir, Seerah, Usul al-Fiqh, Islamic history, Arabic language, Da'wah, manners and morals – all the essential topics needed to become a practicing Muslim and a caller to Islam will be taught step by step.",
        bn: "আকীদাহ, ফিকহ, হাদিস, তাফসির, সীরাহ, উসূলুল ফিকহ, ইসলামের ইতিহাস, আরবি ভাষা, দাওয়াহ, আদব-আখলাকসহ একজন প্রাকটিসিং মুসলিম ও দায়ী হিসেবে গড়ে ওঠার জন্য প্রয়োজনীয় বিষয়সমূহ ধাপে ধাপে পড়ানো হবে।",
      }),
    },
    {
      question: t({
        en: "Tell me about the instructors.",
        bn: "ওস্তাদগণের সম্পর্কে জানতে চাই।",
      }),
      answer: t({
        en: "Our teachers are renowned Islamic scholars from reputed universities of the country, along with a group of young scholars. They are experts in their respective fields and have been involved in Islamic education and research for a long time.",
        bn: "আমাদের শিক্ষকবৃন্দ দেশের স্বনামধন্য বিশ্ববিদ্যালয়ের ইসলামিক স্কলার ও এক ঝাঁক তরুণ আলেম। তাঁরা নিজ নিজ বিষয়ে দক্ষ এবং দীর্ঘদিন ধরে দ্বীনি শিক্ষা ও গবেষণার সঙ্গে সম্পৃক্ত।",
      }),
    },
    {
      question: t({
        en: "What is the duration of this program?",
        bn: "এটি কত বছরের প্রোগ্রাম?",
      }),
      answer: t({
        en: "It is a 2-year Diploma program, conducted in 6 semesters step by step.",
        bn: "এটি একটি ২ বছর মেয়াদি ডিপ্লোমা প্রোগ্রাম, যা ধাপে ধাপে ৬ সেমিস্টারে পরিচালিত হয়।",
      }),
    },
    {
      question: t({
        en: "How are the classes conducted?",
        bn: "ক্লাসগুলো কীভাবে পরিচালিত হয়?",
      }),
      answer: t({
        en: "Live online classes, recorded videos, class notes, regular assessments, and an integrated teacher-student support system.",
        bn: "লাইভ অনলাইন ক্লাস, রেকর্ডেড ভিডিও, ক্লাস নোট, নিয়মিত মূল্যায়ন এবং শিক্ষক-শিক্ষার্থীর সমন্বিত সাপোর্ট সিস্টেমের মাধ্যমে পাঠদান পরিচালিত হয়।",
      }),
    },
    {
      question: t({
        en: "Why is your course fee relatively higher?",
        bn: "আপনাদের কোর্স ফি তুলনামূলক বেশি কেন?",
      }),
      answer: t({
        en: "We do not just provide video courses; we ensure renowned Islamic scholars, an advanced curriculum, regular assessments, live classes, academic support, and quality education. This integrated system maintains the standard of the course.",
        bn: "আমরা শুধু ভিডিও কোর্স প্রদান করি না; দেশের স্বনামধন্য ইসলামিক স্কলার, উন্নত কারিকুলাম, নিয়মিত মূল্যায়ন, লাইভ ক্লাস, একাডেমিক সাপোর্ট এবং মানসম্মত শিক্ষা নিশ্চিত করি।",
      }),
    },
    {
      question: t({
        en: "What is the outcome of this course?",
        bn: "এই কোর্সের আউটকাম কী?",
      }),
      answer: t({
        en: "Students will gain organized knowledge of Islam, be able to implement it in their personal and family lives, and build the necessary foundation for Da'wah and Islamic service.",
        bn: "শিক্ষার্থীরা ইসলাম সম্পর্কে সুসংগঠিত জ্ঞান অর্জন করবে, ব্যক্তিগত ও পারিবারিক জীবনে তা বাস্তবায়ন করতে পারবে এবং দাওয়াহ ও দ্বীনি খেদমতের জন্য প্রয়োজনীয় ভিত্তি তৈরি হবে।",
      }),
    },
    {
      question: t({
        en: "Will a certificate be given at the end of the course?",
        bn: "কোর্স শেষে সার্টিফিকেট দেওয়া হবে কি?",
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
      <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/diploma"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-4 sm:mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm sm:text-base">
              {t({ en: "Back to Diploma Page", bn: "ডিপ্লোমা পেজে ফিরে যান" })}
            </span>
          </Link>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* =========== LEFT / MAIN COLUMN =========== */}
            <div className="lg:col-span-2 space-y-6">
              {/* Banner */}
              <img
                src={BannerImg}
                alt={t({ en: "Diploma Banner", bn: "ডিপ্লোমা ব্যানার" })}
                className="w-full h-auto max-h-40 sm:max-h-48 md:max-h-56 object-cover rounded-2xl border border-gray-100"
              />

              {/* Share & Wishlist */}
              <div className="flex items-center gap-4 py-2">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaShare className="text-lg" />
                  <span className="font-medium text-sm sm:text-base">
                    {t({ en: "Share", bn: "শেয়ার" })}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                  <FaBookmark className="text-lg" />
                  <span className="font-medium text-sm sm:text-base">
                    {t({ en: "Wishlist", bn: "উইশলিস্ট" })}
                  </span>
                </button>
              </div>

              {/* Course Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-[#007a91]">
                {t({
                  en: "Diploma In Islamic Studies",
                  bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
                })}
              </h1>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all text-sm sm:text-base ${
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
                  className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all text-sm sm:text-base ${
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
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-center text-sm sm:text-base">
                    {t({
                      en: "No reviews yet. Be the first to review!",
                      bn: "এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!",
                    })}
                  </p>
                </div>
              )}

              {/* ===== ABOUT COURSE (নতুন বাইলিঙ্গুয়াল কনটেন্ট) ===== */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  <p>
                    {t({
                      en: "In an age of rapid advancement in knowledge, technology, and civilization, the need for moral values, spiritual development, and a sound understanding of life has become increasingly important. The healthy development of individuals, families, and society requires sound faith, authentic knowledge, and a correct understanding of Islam.",
                      bn: "বর্তমান যুগে জ্ঞান, প্রযুক্তি ও সভ্যতার ব্যাপক অগ্রগতির পাশাপাশি মানুষের জীবনে নৈতিকতা, আত্মিক উন্নয়ন এবং সঠিক জীবনদর্শনের প্রয়োজনীয়তা ক্রমেই বৃদ্ধি পাচ্ছে। ব্যক্তি, পরিবার ও সমাজের সুন্দর ও কল্যাণময় বিকাশের জন্য প্রয়োজন বিশুদ্ধ ঈমান, প্রামাণ্য জ্ঞান এবং ইসলামের সঠিক উপলব্ধি।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "Both Muslim men and women need to develop their lives in accordance with the teachings and values of Islam. However, amid the demands and changing realities of modern life, it is often difficult for many people to pursue Islamic knowledge in a structured and continuous manner. This creates an increasing need for sound knowledge of Aqeedah, worship, the Qur'an and Hadith, Seerah, Islamic history, and other aspects of daily life.",
                      bn: "একজন মুসলিম নারী ও পুরুষ উভয়েরই জীবনের প্রতিটি ক্ষেত্রে ইসলামের শিক্ষা ও মূল্যবোধের আলোকে নিজেকে পরিচালিত করা প্রয়োজন। কিন্তু ব্যস্ত ও পরিবর্তনশীল জীবনের বাস্তবতায় অনেকের পক্ষেই সুসংহত ও ধারাবাহিকভাবে ইসলামি জ্ঞান অর্জন করা সম্ভব হয়ে ওঠে না। ফলে আকীদাহ, ইবাদত, কুরআন-হাদীস, সীরাত, ইসলামের ইতিহাস এবং দৈনন্দিন জীবনের বিভিন্ন বিষয়ে সঠিক জ্ঞান অর্জনের প্রয়োজন অনুভূত হয়।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "With this need in mind, Tarbiyah Online's \"Diploma in Islamic Studies\" is a structured, systematic, and authentic Islamic learning program. It is not merely a program for earning a diploma; rather, it is a meaningful academic journey of developing knowledge, faith, practice, and character in the light of the Qur'an and Sunnah.",
                      bn: "এই প্রয়োজনকে সামনে রেখে তারবিয়াহ অনলাইনের “Diploma in Islamic Studies” একটি সুসংহত, ধারাবাহিক ও প্রামাণ্য ইসলামি শিক্ষাপ্রোগ্রাম। এটি শুধু একটি ডিপ্লোমা অর্জনের কোর্স নয়; বরং কুরআন ও সুন্নাহর আলোকে জ্ঞান, ঈমান, আমল এবং ব্যক্তিত্বের বিকাশের একটি সুন্দর শিক্ষাযাত্রা।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "The program offers a systematic study of Qur'an Studies and Tajweed, Islamic Aqeedah, Fiqhul Ibadah, Hadith Studies, the Seerah of the Prophet Muhammad ﷺ, Islamic History, the Arabic Language, and other important areas of Islamic knowledge. Beginning with foundational subjects and progressing through important areas of study, the curriculum aims to help students build a strong and balanced foundation in Islamic knowledge.",
                      bn: "এই প্রোগ্রামে কুরআন স্টাডিজ ও তাজউইদ, ইসলামি আকীদাহ, ফিকহুল ইবাদাহ, হাদীস স্টাডিজ, সীরাতুন্নবী ﷺ, ইসলামের ইতিহাস, আরবি ভাষা এবং অন্যান্য গুরুত্বপূর্ণ ইসলামি বিষয়সমূহ ধারাবাহিকভাবে অধ্যয়নের সুযোগ রয়েছে। মৌলিক জ্ঞান থেকে শুরু করে বিভিন্ন গুরুত্বপূর্ণ বিষয়ে পর্যায়ক্রমে শিক্ষা প্রদানের মাধ্যমে শিক্ষার্থীদের একটি সুদৃঢ় ও ভারসাম্যপূর্ণ ইসলামি জ্ঞানের ভিত্তি গড়ে তোলার চেষ্টা করা হয়।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "Tarbiyah Online believes that authentic Islamic knowledge does more than provide information—it shapes a person's thoughts, character, behaviour, and outlook on life. The combination of sound knowledge and faith helps a Muslim live with greater awareness and contribute positively to the well-being of the family, society, and the Ummah.",
                      bn: "তারবিয়াহ অনলাইন বিশ্বাস করে, প্রামাণ্য ইসলামি জ্ঞান একজন মানুষকে শুধু তথ্যসমৃদ্ধ করে না; বরং তার চিন্তা, চরিত্র, আচরণ ও জীবনদৃষ্টিকে প্রভাবিত করে। সঠিক জ্ঞান ও ঈমানের সমন্বয় একজন মুসলিমকে নিজের জীবনকে সুন্দরভাবে পরিচালিত করতে এবং পরিবার, সমাজ ও উম্মাহর কল্যাণে ইতিবাচক ভূমিকা রাখতে সহায়তা করে।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "Diploma in Islamic Studies is a meaningful educational journey for both men and women—an opportunity to develop oneself as a conscious, responsible, and principled Muslim through authentic knowledge, sound faith, and the practical application of Islamic teachings in everyday life.",
                      bn: "Diploma in Islamic Studies নারী ও পুরুষ উভয়ের জন্য এমন একটি শিক্ষাযাত্রা—যেখানে প্রামাণ্য জ্ঞান, বিশুদ্ধ ঈমান এবং বাস্তব জীবনে ইসলামের শিক্ষার প্রয়োগের মাধ্যমে একজন সচেতন, দায়িত্বশীল ও আদর্শবান মুসলিম হিসেবে নিজেকে গড়ে তোলার সুযোগ রয়েছে।",
                    })}
                  </p>
                  <p className="font-semibold text-[#002b2b] text-center pt-2 italic">
                    {t({
                      en: "A meaningful journey of knowledge, faith, and practice.",
                      bn: "জ্ঞান, ঈমান ও আমলের সমন্বয়ে—একটি সুন্দর ও অর্থবহ ইসলামি শিক্ষাযাত্রা।",
                    })}
                  </p>
                </div>
              </div>

              {/* ===== EARN A CERTIFICATE ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#00ADD2] mb-2">
                    {t({
                      en: "EARN A CERTIFICATE",
                      bn: "সার্টিফিকেট অর্জন করুন",
                    })}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t({
                      en: "Add this certificate to your resume to demonstrate your skills & increase your chances of getting noticed.",
                      bn: "আপনার দক্ষতা প্রদর্শন ও নজরে আসার সম্ভাবনা বাড়াতে এই সার্টিফিকেট আপনার জীবনবৃত্তান্তে যুক্ত করুন।",
                    })}
                  </p>
                </div>
                <div className="w-40 h-28 sm:w-48 sm:h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  <img
                    src={Certificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* ===== Ready To Apply ===== */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-4 sm:p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#002b2b]">
                    {t({
                      en: "Ready To Apply Your Course",
                      bn: "আপনার কোর্সে আবেদন করতে প্রস্তুত",
                    })}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t({
                      en: "Enroll now and start your structured learning journey.",
                      bn: "এখনই নিবন্ধন করুন এবং আপনার সুশৃঙ্খল শিক্ষাযাত্রা শুরু করুন।",
                    })}
                  </p>
                </div>
                <Link to="/admission-now">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                  </button>
                </Link>
              </div>

              {/* ===== WHAT YOU WILL GAIN ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "WHAT YOU WILL GAIN", bn: "আপনি কী পাবেন" })}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t({
                    en: "The Diploma in Islamic Studies is a comprehensive two-year online program, specially designed for both men and women—enabling them to pursue institutional Islamic education from home, even amid busy and responsibility-filled lives.",
                    bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ একটি পূর্ণাঙ্গ দ্বিবার্ষিক অনলাইন প্রোগ্রাম, যা বিশেষভাবে নারী-পুরুষ উভয়ের জন্য ডিজাইন করা হয়েছে—যাতে তারা ব্যস্ত ও দায়িত্বপূর্ণ জীবনযাপনের মধ্যেও ঘরে বসে প্রাতিষ্ঠানিক ইসলামি শিক্ষা গ্রহণ করতে পারেন।",
                  })}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t({
                    en: "This is not merely a course; it is a bridge between self-development, leadership, and academic excellence.",
                    bn: "এটি কেবল একটি কোর্স নয়; এটি আত্ম-উন্নয়ন, নেতৃত্ব ও একাডেমিক শ্রেষ্ঠত্বের মধ্যে একটি সেতু।",
                  })}
                </p>
                <p className="text-gray-700 font-semibold text-[#002b2b] text-sm sm:text-base">
                  {t({
                    en: 'Program Slogan: "Seminary to Academia; Basic to Advance"',
                    bn: 'প্রোগ্রাম স্লোগান: "মাদ্রাসা থেকে একাডেমিয়া; শুরু থেকে উচ্চ "',
                  })}
                </p>

                <ul className="list-disc list-inside space-y-1 text-gray-700 pl-2 text-sm sm:text-base"></ul>
              </div>

              {/* ===== MISSION ===== */}
              <div className="bg-gradient-to-br from-[#002b2b] to-[#003d3d] rounded-3xl p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {t({ en: "MISSION", bn: "মিশন" })}
                  </h2>
                </div>
                <ul className="space-y-3 text-white text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>
                    {t({
                      en: "To provide Muslim men and women with simple, structured, and institutional Islamic education, from foundational to advanced levels",
                      bn: "মৌলিক থেকে উন্নত স্তর পর্যন্ত মুসলিম নারী-পুরুষের জন্য সহজ, সুশৃঙ্খল ও প্রাতিষ্ঠানিক ইসলামি শিক্ষা প্রদান করা",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>
                    {t({
                      en: "Memorizing and explaining authentic hadiths",
                      bn: "প্রামাণ্য হাদিস মুখস্থ করা ও ব্যাখ্যা করা",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>
                    {t({
                      en: "Learning about the correct creed",
                      bn: "সঠিক আকীদাহ সম্পর্কে জানা",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>
                    {t({
                      en: "Acquire reading, writing and speaking skills in Arabic",
                      bn: "আরবি ভাষায় পড়া, লেখা ও কথা বলার দক্ষতা অর্জন",
                    })}
                  </li>
                </ul>
              </div>

              {/* ===== VISION (নতুন বাইলিঙ্গুয়াল কনটেন্ট) ===== */}
              <div className="bg-gradient-to-br from-[#003d3d] to-[#004d4d] rounded-3xl p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {t({ en: "VISION", bn: "ভিশন" })}
                  </h2>
                </div>
                <div className="space-y-4 text-white leading-relaxed text-sm sm:text-base">
                  <p>
                    {t({
                      en: "Allah, the Almighty, says in the Holy Qur'an:",
                      bn: "আল্লাহ পবিত্র কুরআনে বলেন-",
                    })}
                  </p>
                  <p className="text-center text-base sm:text-lg font-semibold">
                    <span className="block text-xl sm:text-2xl mb-2" dir="rtl">
                      اِنَّ الدِّیۡنَ عِنۡدَ اللّٰهِ الۡاِسۡلَامُ
                    </span>
                    {t({
                      en: '"Indeed, the religion in the sight of Allah is Islam." (Surah Aal-e-Imran, 3:19)',
                      bn: '"নিশ্চয় ইসলাম আল্লাহর মনোনীত জীবন ব্যবস্থা"। (আল ইমরান, ৩:১৯)',
                    })}
                  </p>
                  <p>
                    {t({
                      en: "Yet, in the pursuit of success within the prevailing social system, many people have drifted far away from the Deen. In striving for worldly and so-called success, people are gradually falling behind in attaining the true success prescribed by Allah.",
                      bn: "অথচ মানুষ প্রচলিত সমাজ ব্যবস্থায় সফলতা অর্জনের নামে দ্বীন থেকে বহু দূরে। মানুষ পার্থিব তথাকথিত সফলতা অর্জনের জন্য আল্লাহ প্রদত্ত সফলতা থেকে পিছিয়ে যাচ্ছে।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: "At the same time, many individuals are becoming increasingly interested in learning about the Deen in order to attain the success granted by Allah. However, despite having a genuine desire to learn, many are unable to pursue Islamic education due to their general educational background, age, and the complexities associated with accessing suitable platforms for learning the Deen. Many others also wish that, regardless of their age, they could have the opportunity to pursue Islamic education in a structured and institutional manner.",
                      bn: "এর মাঝে অনেকে আবার আল্লাহ প্রদত্ত সফলতা অর্জনের জন্য দ্বীন শিক্ষার প্রতি আগ্রহী হয়ে উঠছেন। কিন্তু অনেকে জেনারেল শিক্ষিত, বয়স ও দ্বীন শিক্ষার প্লাটফর্মের জটিলতার কারণে আগ্রহ থাকার পরেও দ্বীন শিখতে পারছেন না। আবার অনেকে ভাবছেন বয়সের গন্ডি পেরিয়ে যদি প্রাতিষ্ঠানিক ভাবে দ্বীন শিক্ষার সুযোগ পেতেন।",
                    })}
                  </p>
                  <p>
                    {t({
                      en: 'Taking all these realities into consideration, Tarbiyah Academy has taken a timely and contemporary initiative by launching the online-based "Diploma in Islamic Studies" program for those who are eager to acquire Islamic knowledge. In this program, brothers and sisters from general education backgrounds, various professions, and different age groups will have the opportunity to acquire authentic Islamic knowledge, InshaAllah.',
                      bn: "এসব কিছু বিবেচনা করে “তারবিয়্যাহ একাডেমী” দ্বীনের জ্ঞানপিপাসুদের জন্য যুগোপযোগী সিদ্ধান্ত নিয়ে চালু করেছে অনলাইনভিত্তিক “ডিপ্লোমা ইন ইসলামিক স্টাডিজ” প্রোগ্রাম। এখানে জেনারেল শিক্ষিত, বিভিন্ন শ্রেণী-পেশা ও বিভিন্ন বয়সী ভাইবোনেরা অংশগ্রহণ করে প্রকৃত দ্বীনের জ্ঞান অর্জনের সুযোগ পাবেন, ইনশাআল্লাহ।",
                    })}
                  </p>
                </div>
              </div>

              {/* ===== KEY FEATURES ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "KEY FEATURES OF THE PROGRAM",
                      bn: "প্রোগ্রামের মূল বৈশিষ্ট্য",
                    })}
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    t({
                      en: "Fully online program with live, interactive classes",
                      bn: "লাইভ ও ইন্টারেক্টিভ ক্লাসসহ সম্পূর্ণ অনলাইন প্রোগ্রাম",
                    }),
                    t({
                      en: "Instruction under the supervision of experienced local and international Islamic scholars",
                      bn: "দক্ষ দেশি-বিদেশি ইসলামি স্কলারদের তত্ত্বাবধানে শিক্ষাদান",
                    }),
                    t({
                      en: "Curriculum structured in alignment with university B.A. (Honours) in Islamic Studies frameworks",
                      bn: "বিশ্ববিদ্যালয়ের বি.এ. (অনার্স) ইন ইসলামিক স্টাডিজ ফ্রেমওয়ার্কের সাথে সামঞ্জস্যপূর্ণ পাঠক্রম",
                    }),

                    t({
                      en: "Specialized courses in Qur'an, Hadith, Fiqh, Aqidah, Sirah, Arabic, along with personal development, entrepreneurship, business, management, leadership, and skill development",
                      bn: "কুরআন, হাদিস, ফিকহ, আকীদাহ, সীরাহ, আরবি সহ ব্যক্তিগত উন্নয়ন, উদ্যোক্তা, ব্যবসা, ব্যবস্থাপনা, নেতৃত্ব ও দক্ষতা উন্নয়ন বিষয়ে বিশেষ কোর্স",
                    }),
                    t({
                      en: "Regular homework, midterm, and final examinations",
                      bn: "নিয়মিত হোমওয়ার্ক, মিডটার্ম ও ফাইনাল পরীক্ষা",
                    }),
                    t({
                      en: "Access to class recordings, group study sessions, and personal counseling",
                      bn: "ক্লাস রেকর্ডিং, গ্রুপ স্টাডি সেশন ও ব্যক্তিগত কাউন্সেলিং-এর সুযোগ",
                    }),
                    t({
                      en: "Motivational and spiritual sessions",
                      bn: "মোটিভেশনাল ও আধ্যাত্মিক সেশন",
                    }),
                    t({
                      en: "Scholarship opportunities",
                      bn: "স্কলারশিপের সুযোগ",
                    }),
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors"
                    >
                      <span className="text-yellow-500 font-bold text-lg leading-none">
                        »
                      </span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== PROGRAM STRUCTURE ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "PROGRAM STRUCTURE", bn: "প্রোগ্রামের কাঠামো" })}
                  </h2>
                </div>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#00ADD2]">
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Item", bn: "বিষয়" })}
                        </th>
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Description", bn: "বর্ণনা" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({ en: "Duration", bn: "মেয়াদ" })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.duration}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({ en: "Class Method", bn: "ক্লাস পদ্ধতি" })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.classMethod}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({ en: "Time", bn: "সময়" })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.time}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({
                            en: "Classes per Week",
                            bn: "প্রতি সপ্তাহে ক্লাস",
                          })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.classesPerWeek}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({
                            en: "Sessions per Semester",
                            bn: "প্রতি সেমিস্টারে সেশন",
                          })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.sessionsPerSemester}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({
                            en: "Language of Instruction",
                            bn: "শিক্ষার ভাষা",
                          })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {programStructure.language}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "Curriculum", bn: "পাঠ্যসূচি" })}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {semestersData.map((sem, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleSemester(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gray-50 hover:bg-gray-100 text-left font-bold text-[#002b2b] transition-colors"
                      >
                        <span className="flex items-center gap-2 text-sm sm:text-base">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0"></span>
                          {sem.title}
                        </span>
                        {openSemester === index ? (
                          <FaChevronUp className="text-gray-500 shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-500 shrink-0" />
                        )}
                      </button>
                      {openSemester === index && (
                        <div className="p-4 sm:p-5 bg-white border-t border-gray-200 space-y-2">
                          {sem.subjects.map((sub, sIndex) => (
                            <div
                              key={sIndex}
                              className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm py-1 border-b border-gray-50 last:border-none"
                            >
                              <span className="text-yellow-500 font-bold">
                                ✔
                              </span>
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== WHAT STUDENTS WILL GAIN ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "WHAT STUDENTS WILL GAIN",
                      bn: "শিক্ষার্থীরা কী পাবে",
                    })}
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>
                    {t({
                      en: "A strong foundation in Islamic knowledge based on the Qur'an and authentic (Ṣaḥīḥ) Hadith",
                      bn: "কুরআন ও প্রামাণ্য (সহীহ) হাদিসের ভিত্তিতে ইসলামি জ্ঞানের দৃঢ় ভিত্তি",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>
                    {t({
                      en: "Firm grounding in Aqidah, Fiqh, Adab, and Akhlaq",
                      bn: "আকীদাহ, ফিকহ, আদব ও আখলাকে দৃঢ় ভিত্তি",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>
                    {t({
                      en: "An Islamic perspective on family and social life",
                      bn: "পারিবারিক ও সামাজিক জীবন সম্পর্কে ইসলামি দৃষ্টিভঙ্গি",
                    })}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>
                    {t({
                      en: "Understanding the relevance of Islamic thought in the modern world",
                      bn: "আধুনিক বিশ্বে ইসলামি চিন্তার প্রাসঙ্গিকতা বোঝা",
                    })}
                  </li>
                </ul>
              </div>

              {/* ===== ADMISSION REQUIREMENTS ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "ADMISSION REQUIREMENTS",
                      bn: "ভর্তির প্রয়োজনীয়তা",
                    })}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#002b2b]">
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Requirement", bn: "শর্ত" })}
                        </th>
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Details", bn: "বিবরণ" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({
                            en: "Minimum Education",
                            bn: "সর্বনিম্ন শিক্ষাগত যোগ্যতা",
                          })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {t({
                            en: "18+ years of age. Anyone who wishes to learn the Deen may apply — no prior Islamic education required.",
                            bn: "১৮+ বয়স। দ্বীন শিখতে ইচ্ছুক যে কেউ আবেদন করতে পারবেন — পূর্বে দ্বীনি শিক্ষার কোনো প্রয়োজন নেই।",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({ en: "Suitable For", bn: "যাদের জন্য উপযুক্ত" })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {t({
                            en: "Working professionals, expatriates, students, and those planning higher Islamic studies",
                            bn: "চাকরিজীবী, পেশাজীবী, প্রবাসী, শিক্ষার্থী এবং যারা উচ্চতর ইসলামি শিক্ষা গ্রহণের পরিকল্পনা করছেন",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ===== FEE STRUCTURE ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#002b2b]">
                    {t({ en: "FEE STRUCTURE (BDT)", bn: "ফি কাঠামো (বিডিটি)" })}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#00ADD2]">
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Item", bn: "বিষয়" })}
                        </th>
                        <th className="py-3 px-2 sm:px-4 font-bold">
                          {t({ en: "Amount", bn: "পরিমাণ" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="py-3 px-2 sm:px-4 font-semibold">
                          {t({
                            en: "Per Semester Fee",
                            bn: "প্রতি সেমিস্টার ফি",
                          })}
                        </td>
                        <td className="py-3 px-2 sm:px-4">12,000 TK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ===== SCHOLARSHIP ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "SCHOLARSHIP OPPORTUNITIES",
                      bn: "স্কলারশিপের সুযোগ",
                    })}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t({
                    en: "Need- and merit-based scholarships are available for academically talented and financially disadvantaged students. (Funded through donations and Zakat funds)",
                    bn: "শিক্ষাগতভাবে প্রতিভাবান ও আর্থিকভাবে অস্বচ্ছল শিক্ষার্থীদের জন্য প্রয়োজন- ও মেধাভিত্তিক স্কলারশিপ পাওয়া যায়। (দান ও যাকাত তহবিলের মাধ্যমে অর্থায়িত)",
                  })}
                </p>
              </div>

              {/* ===== ADMISSION PROCESS ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "ADMISSION PROCESS", bn: "ভর্তি প্রক্রিয়া" })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Apply online at: www.tarbiyahonline.com/apply",
                        bn: "অনলাইনে আবেদন করুন: www.tarbiyahonline.com/apply",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Upload required documents (certificates, photograph, ID)",
                        bn: "প্রয়োজনীয় নথি আপলোড করুন (সার্টিফিকেট, ছবি, আইডি)",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Receive confirmation email and class access links",
                        bn: "নিশ্চিতকরণ ইমেইল ও ক্লাস অ্যাক্সেস লিঙ্ক গ্রহণ করুন",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Academic session begins through an orientation class",
                        bn: "ওরিয়েন্টেশন ক্লাসের মাধ্যমে একাডেমিক সেশন শুরু হয়",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== ASSESSMENT ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "ASSESSMENT & CERTIFICATION",
                      bn: "মূল্যায়ন ও সার্টিফিকেশন",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Evaluation based on class performance, homework, and attendance",
                        bn: "ক্লাস পারফরম্যান্স, হোমওয়ার্ক ও উপস্থিতির ভিত্তিতে মূল্যায়ন",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Midterm and final examinations (written + oral)",
                        bn: "মিডটার্ম ও ফাইনাল পরীক্ষা (লিখিত + মৌখিক)",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Certificate awarded upon successful completion of the diploma",
                        bn: "ডিপ্লোমা সফলভাবে সম্পন্ন করার পর সার্টিফিকেট প্রদান",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students will receive Diploma Certificates from Tarbiyah Online",
                        bn: "শিক্ষার্থীরা তারবিয়াহ অনলাইন এবং সংশ্লিষ্ট বিশ্ববিদ্যালয় থেকে ডিপ্লোমা সার্টিফিকেট পাবে",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== CODE OF CONDUCT ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "CODE OF CONDUCT & ACADEMIC POLICY",
                      bn: "আচরণবিধি ও একাডেমিক নীতি",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Attendance target: 95%",
                        bn: "উপস্থিতির লক্ষ্য: ৯৫%",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students who miss classes may complete lessons via recorded sessions",
                        bn: "যেসব শিক্ষার্থী ক্লাস মিস করে তারা রেকর্ডেড সেশনের মাধ্যমে পাঠ সম্পন্ন করতে পারে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Confidentiality of students, teachers, and content must be strictly maintained",
                        bn: "শিক্ষার্থী, শিক্ষক ও বিষয়বস্তুর গোপনীয়তা কঠোরভাবে বজায় রাখতে হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Sharing class recordings or materials without permission is prohibited",
                        bn: "অনুমতি ছাড়া ক্লাস রেকর্ডিং বা উপকরণ শেয়ার করা নিষিদ্ধ",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Maintaining academic integrity and ethical standards is mandatory",
                        bn: "একাডেমিক সততা ও নৈতিক মান বজায় রাখা বাধ্যতামূলক",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== OTHER PROGRAMS ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "OTHER PROGRAMS & ACTIVITIES",
                      bn: "অন্যান্য প্রোগ্রাম ও কার্যক্রম",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Tarbiyah Academy offers various courses under two academic divisions:",
                        bn: "তারবিয়াহ একাডেমি দুটি একাডেমিক বিভাগের অধীনে বিভিন্ন কোর্স অফার করে:",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Alimiyyah Studies and Qur'an Studies",
                        bn: "আলিমিয়্যাহ স্টাডিজ ও কুরআন স্টাডিজ",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Cultural and educational activities for children's intellectual development",
                        bn: "শিশুদের বুদ্ধিবৃত্তিক বিকাশের জন্য সাংস্কৃতিক ও শিক্ষামূলক কার্যক্রম",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Availability of subject-based recorded courses",
                        bn: "বিষয়ভিত্তিক রেকর্ডেড কোর্সের প্রাপ্যতা",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Separate Bangla and English versions for Bangla- and English-speaking students",
                        bn: "বাংলা ও ইংরেজি ভাষাভাষী শিক্ষার্থীদের জন্য আলাদা বাংলা ও ইংরেজি সংস্করণ",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Special counseling programs to enhance students' moral and character development",
                        bn: "শিক্ষার্থীদের নৈতিক ও চরিত্র বিকাশের জন্য বিশেষ কাউন্সেলিং প্রোগ্রাম",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Parenting courses aimed at increasing parental awareness and responsibility",
                        bn: "পিতামাতার সচেতনতা ও দায়িত্ব বৃদ্ধির লক্ষ্যে প্যারেন্টিং কোর্স",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== INSTITUTIONAL POLICY ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "INSTITUTIONAL POLICY STATEMENT",
                      bn: "প্রাতিষ্ঠানিক নীতি বিবৃতি",
                    })}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                  {t({
                    en: "Tarbiyah Academy firmly believes in positivity and inclusivity. Equal opportunities, facilities, and rights are ensured for all students in both academic and co-curricular matters.",
                    bn: "তারবিয়াহ একাডেমি ইতিবাচকতা ও অন্তর্ভুক্তিতে দৃঢ়ভাবে বিশ্বাস করে। একাডেমিক ও সহ-পাঠ্যক্রমিক বিষয়ে সকল শিক্ষার্থীর জন্য সমান সুযোগ, সুবিধা ও অধিকার নিশ্চিত করা হয়।",
                  })}
                </p>
                <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "All students are treated with fairness and equality",
                        bn: "সকল শিক্ষার্থীর সাথে ন্যায্য ও সমান আচরণ করা হয়",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Support is provided in matters of education and character building",
                        bn: "শিক্ষা ও চরিত্র গঠনের বিষয়ে সহায়তা প্রদান করা হয়",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students are encouraged to maintain a positive and proactive role",
                        bn: "শিক্ষার্থীদের ইতিবাচক ও সক্রিয় ভূমিকা পালনে উৎসাহিত করা হয়",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students unable to attend live classes may complete lessons through class recordings",
                        bn: "যেসব শিক্ষার্থী লাইভ ক্লাসে অংশগ্রহণ করতে পারে না তারা ক্লাস রেকর্ডিংয়ের মাধ্যমে পাঠ সম্পন্ন করতে পারে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Student success is recognized and evaluated",
                        bn: "শিক্ষার্থীর সাফল্য স্বীকৃত ও মূল্যায়ন করা হয়",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Student needs are always treated with utmost importance",
                        bn: "শিক্ষার্থীদের চাহিদাকে সর্বোচ্চ গুরুত্ব দেওয়া হয়",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== DISCIPLINE ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "DISCIPLINE & ATTENDANCE REGULATIONS",
                      bn: "শৃঙ্খলা ও উপস্থিতি বিধিমালা",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Tarbiyah Academy is committed to delivering quality education and believes that regular attendance is a prerequisite for academic excellence.",
                        bn: "তারবিয়াহ একাডেমি মানসম্মত শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ এবং বিশ্বাস করে যে নিয়মিত উপস্থিতি একাডেমিক শ্রেষ্ঠত্বের পূর্বশর্ত।",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Attendance in all classes is mandatory",
                        bn: "সকল ক্লাসে উপস্থিতি বাধ্যতামূলক",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Class links will be shared in the WhatsApp group at least 30 minutes before class",
                        bn: "ক্লাসের কমপক্ষে ৩০ মিনিট আগে হোয়াটসঅ্যাপ গ্রুপে ক্লাস লিঙ্ক শেয়ার করা হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students must join before the scheduled start time",
                        bn: "শিক্ষার্থীদের নির্ধারিত শুরুর সময়ের আগেই যোগ দিতে হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Joining 10 minutes after the scheduled time will be considered late",
                        bn: "নির্ধারিত সময়ের ১০ মিনিট পরে যোগ দিলে তা দেরি হিসেবে গণ্য হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Regular and disciplined students will receive proper academic evaluation",
                        bn: "নিয়মিত ও শৃঙ্খলাবদ্ধ শিক্ষার্থীরা সঠিক একাডেমিক মূল্যায়ন পাবে",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== HOMEWORK ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "HOMEWORK & ASSIGNMENTS",
                      bn: "হোমওয়ার্ক ও অ্যাসাইনমেন্ট",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Education is not limited to classroom instruction alone. Tarbiyah Academy provides students with various academic activities and processes.",
                        bn: "শিক্ষা কেবল শ্রেণিকক্ষের নির্দেশনার মধ্যে সীমাবদ্ধ নয়। তারবিয়াহ একাডেমি শিক্ষার্থীদের বিভিন্ন একাডেমিক কার্যক্রম ও প্রক্রিয়া প্রদান করে।",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students will have regular homework, assignments, and tasks",
                        bn: "শিক্ষার্থীদের নিয়মিত হোমওয়ার্ক, অ্যাসাইনমেন্ট ও কাজ থাকবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "All activities will be assessed and evaluated as part of academic performance",
                        bn: "সকল কার্যকলাপ একাডেমিক পারফরম্যান্সের অংশ হিসেবে মূল্যায়ন করা হবে",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== E-SAFETY ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "GENERAL E-SAFETY POLICY",
                      bn: "সাধারণ ই-সুরক্ষা নীতি",
                    })}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "All classes are conducted online via Zoom Cloud",
                        bn: "সকল ক্লাস জুম ক্লাউডের মাধ্যমে অনলাইনে পরিচালিত হয়",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students must attend classes from a quiet and suitable environment",
                        bn: "শিক্ষার্থীদের শান্ত ও উপযুক্ত পরিবেশ থেকে ক্লাসে অংশগ্রহণ করতে হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Audio and video controls will remain with the instructors",
                        bn: "অডিও ও ভিডিও নিয়ন্ত্রণ ইন্সট্রাক্টরদের কাছে থাকবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Classes will be recorded for official and promotional purposes, and copyright will remain solely with Tarbiyah Academy",
                        bn: "অফিসিয়াল ও প্রমোশনাল উদ্দেশ্যে ক্লাস রেকর্ড করা হবে এবং কপিরাইট এককভাবে তারবিয়াহ একাডেমির থাকবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Recorded lectures, lesson sheets, presentations, and worksheets may be used only for academic purposes",
                        bn: "রেকর্ডেড লেকচার, পাঠ্যপত্র, উপস্থাপনা ও ওয়ার্কশীট শুধুমাত্র একাডেমিক উদ্দেশ্যে ব্যবহার করা যেতে পারে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Sharing, transferring, or publishing materials without permission is strictly prohibited",
                        bn: "অনুমতি ছাড়া উপকরণ শেয়ার, স্থানান্তর বা প্রকাশ করা কঠোরভাবে নিষিদ্ধ",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Disclosure of any personal information of teachers, staff, students, or guardians is considered an offense",
                        bn: "শিক্ষক, কর্মচারী, শিক্ষার্থী বা অভিভাবকের কোনো ব্যক্তিগত তথ্য প্রকাশ করা অপরাধ হিসেবে বিবেচিত হবে",
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      {t({
                        en: "Students must not share their ID/password or class links with anyone",
                        bn: "শিক্ষার্থীদের তাদের আইডি/পাসওয়ার্ড বা ক্লাস লিঙ্ক কারও সাথে শেয়ার করা উচিত নয়",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== WHY TARBIYAH ===== */}
              <div className="bg-gradient-to-br text-black rounded-3xl shadow-2xl p-4 sm:p-6 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Tarbiyah Diploma in Islamic Studies?",
                      bn: "কেন তারবিয়াহ ডিপ্লোমা ইন ইসলামিক স্ট্রাডিজ ?",
                    })}
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                  {whyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 hover:bg-gray-100 transition-all shadow-md"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500/20 text-yellow-600 flex items-center justify-center shrink-0 text-lg sm:text-xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-black">
                        {feature.text}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== TESTIMONIALS ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
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
                  pagination={{ clickable: true, dynamicBullets: true }}
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

              {/* ===== VIDEO GALLERY ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "Video Gallery", bn: "ভিডিও গ্যালারি" })}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

              {/* ===== FAQ ===== */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00ADD2]">
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
                        onClick={() =>
                          setOpenSemester(
                            openSemester === `faq-${index}`
                              ? null
                              : `faq-${index}`,
                          )
                        }
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                      >
                        <span className="font-bold text-[#002b2b] text-sm sm:text-base pr-2">
                          {index + 1}. {faq.question}
                        </span>
                        {openSemester === `faq-${index}` ? (
                          <FaChevronUp className="text-gray-500 shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-500 shrink-0" />
                        )}
                      </button>
                      {openSemester === `faq-${index}` && (
                        <div className="p-4 bg-white border-t border-gray-200 text-gray-700 text-sm sm:text-base">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =========== RIGHT SIDEBAR =========== */}
            <div className="space-y-4">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/66DgxQACWd4"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={CourseImg}
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

              {/* Pricing Card */}
              <div className="bg-white rounded-3xl text-center p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-[#002b2b] mb-4">
                  ৳ 12,000
                </div>
                <Link to="/admission-now">
                  <button className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-3 rounded-xl shadow-md transition-all mb-3">
                    {t({ en: "Enroll Now", bn: "এখনই নিবন্ধন করুন" })}
                  </button>
                </Link>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-semibold py-3 rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                >
                  <FaDownload /> {t({ en: "Prospectus", bn: "প্রসপেক্টাস" })}
                </button>
              </div>

              {/* Instructors */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-[#002b2b] mb-4 border-b pb-2">
                  {t({ en: "Faculty", bn: "অনুষদ" })}
                </h3>
                <div className="space-y-3">
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

export default DiplomaDetails;
