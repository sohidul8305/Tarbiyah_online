import React, { useState } from "react";
import { Link } from "react-router-dom";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

import TajwidbannerImg from "../../image/tajweedbanner - Copy.png";
import TajwidcourseImg from "../../image/tajweedcourse.png";
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
  FaVideo,
  FaUserTie,
  FaHeadset,
  FaGlobe,
  FaCertificate,
  FaAngleDoubleRight,
  FaPlayCircle,
  FaBook,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Import certificate image (same as other pages)
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

// --- Import faculty images (2 teachers) ---
import JUbairImg from "../../image/jubayer.png";
import SumaiyaImg from "../../image/arartor.png";

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

const Course_quran_elders_tajweed = () => {
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

  // --- Faculty list (2 teachers) ---
  const instructors = [
    {
      id: 1,
      name: t({ en: "Jubayer Ahmad", bn: "যুবায়ের আহমেদ" }),
      title: t({ en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" }),
      image: JUbairImg,
    },
    {
      id: 2,
      name: t({ en: "Sumaiya Afrin Mim", bn: "সুরাইয়া আক্তার" }),
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" }),
      image: SumaiyaImg,
    },
  ];

  // --- Updated Course Details from Pasted text.txt ---
  const courseDetails = {
    title: t({
      en: "Tajweed Course",
      bn: "তাজউইদুল কুরআন",
    }),
    subtitle: t({
      en: "Tajweedul Quran",
      bn: "তাজউইদুল কুরআন",
    }),
    description: t({
      en: "Qur'an recitation is not just about reading—reciting it correctly is also an important trust. The Tajweedul Quran course is designed so that students learn the essential Tajweed rules of Qur'an recitation and recite with correct pronunciation and rules. In this course, the essential basic topics of Tajweed, the rules of Qur'an recitation, and Makharij and related topics will be taught through practice. The course is online-based and will be conducted in separate batches for men and women.",
      bn: "কুরআন তিলাওয়াত শুধু পড়ার বিষয় নয়—শুদ্ধভাবে পড়াও একটি গুরুত্বপূর্ণ আমানত। তাজউইদুল কুরআন কোর্স এমনভাবে সাজানো হয়েছে, যাতে শিক্ষার্থীরা কুরআন তিলাওয়াতের প্রয়োজনীয় তাজউইদ বিষয়গুলো শিখে সঠিক উচ্চারণ ও নিয়মের সঙ্গে তিলাওয়াত করতে পারেন। এই কোর্সে তাজউইদের প্রয়োজনীয় মৌলিক বিষয়, কুরআন তিলাওয়াতের নিয়ম এবং মাখারিজ ও সংশ্লিষ্ট বিষয়গুলো অনুশীলনের মাধ্যমে শেখানো হবে। কোর্সটি অনলাইনভিত্তিক এবং পুরুষ ও নারীদের জন্য পৃথক ব্যাচে পরিচালিত হবে।",
    }),
    objectives: [
      t({
        en: "Learn the essential rules of Tajweed for Qur'an recitation",
        bn: "কুরআন তিলাওয়াতের প্রয়োজনীয় তাজউইদের নিয়ম জানতে পারবেন",
      }),
      t({
        en: "Apply the rules of Tajweed in Qur'an recitation",
        bn: "তাজউইদের নিয়মগুলো কুরআন তিলাওয়াতে প্রয়োগ করতে শিখবেন",
      }),
      t({
        en: "Gain understanding of correct pronunciation of letters and related topics",
        bn: "হরফের সঠিক উচ্চারণ ও সংশ্লিষ্ট বিষয়গুলো সম্পর্কে ধারণা অর্জন করবেন",
      }),
      t({
        en: "Develop skills to identify and correct mistakes in Qur'an recitation",
        bn: "কুরআন তিলাওয়াতের ভুলগুলো চিহ্নিত ও সংশোধনের বিষয়ে দক্ষতা অর্জন করবেন",
      }),
      t({
        en: "Improve the ability to recite correctly through regular practice",
        bn: "নিয়মিত অনুশীলনের মাধ্যমে শুদ্ধ তিলাওয়াতের সক্ষমতা বাড়াতে পারবেন",
      }),
      t({
        en: "Get the opportunity to apply learned topics in real recitation",
        bn: "শেখা বিষয়গুলো বাস্তব তিলাওয়াতে প্রয়োগ করার সুযোগ পাবেন",
      }),
    ],
    extraNote: t({
      en: "The course curriculum includes various basic topics of Tajweed and their proper application in Qur'an recitation.",
      bn: "কোর্সের পাঠ্যবিষয়ের মধ্যে তাজউইদের বিভিন্ন মৌলিক বিষয় এবং কুরআন তিলাওয়াতে সেগুলোর যথাযথ প্রয়োগ অন্তর্ভুক্ত রয়েছে।",
    }),
    targetAudience: [
      t({
        en: "Those who want to correct their Qur'an recitation",
        bn: "যারা কুরআন তিলাওয়াত শুদ্ধ করতে চান",
      }),
      t({
        en: "Those who do not know the rules of Tajweed or want to learn better",
        bn: "যারা তাজউইদের নিয়ম জানেন না বা আরও ভালোভাবে শিখতে চান",
      }),
      t({
        en: "Those who want to correct their recitation mistakes",
        bn: "যারা তিলাওয়াতের ভুলগুলো সংশোধন করতে চান",
      }),
      t({
        en: "Those looking for a systematic opportunity to learn Tajweed",
        bn: "যারা নিয়মতান্ত্রিকভাবে তাজউইদ শেখার সুযোগ খুঁজছেন",
      }),
      t({
        en: "Those who want to apply the rules of Tajweed in actual recitation",
        bn: "যারা কুরআন তিলাওয়াতে তাজউইদের নিয়মগুলো বাস্তবে প্রয়োগ করতে চান",
      }),
      t({
        en: "Those interested in learning Tajweed through regular online classes and practice",
        bn: "যারা অনলাইনে নিয়মিত ক্লাস ও অনুশীলনের মাধ্যমে তাজউইদ শিখতে আগ্রহী",
      }),
    ],
    classSchedule: t({
      en: "Class Days: Saturday & Tuesday\nTime: 3:00 PM – 4:30 PM and 8:00 PM – 9:30 PM\nNote: Separate batches for men and women.",
      bn: "ক্লাসের সময়\nশনি ও মঙ্গলবার\n- দুপুর ৩:০০টা – ৪:৩০টা\n- রাত ৮:০০টা – ৯:৩০টা\nনোট: পুরুষ ও নারীদের জন্য পৃথক ব্যাচ পরিচালিত হবে।",
    }),
    feeStructure: {
      monthly: t({ en: "Monthly Fee: ৳1,000", bn: "মাসিক ফি: ৳১,০০০" }),
      admission: t({ en: "Admission Fee: ৳1,000", bn: "ভর্তি ফি: ৳১,০০০" }),
      oneTime: {
        title: t({ en: "One-Time Payment", bn: "এককালীন পেমেন্ট" }),
        description: t({
          en: "Pay the course's fixed monthly fee and admission fee together to get a special discount.",
          bn: "কোর্সের নির্ধারিত মাসিক ফি ও ভর্তি ফি একসাথে প্রদান করলে বিশেষ ছাড় প্রযোজ্য।",
        }),
        regular: "৳৫,০০০",
        discount: "৳৫০০",
        offer: "৳৪,৫০০",
      },
    },
    materials: [
      t({
        en: "Essential learning materials for the course",
        bn: "ক্লাসের প্রয়োজনীয় লার্নিং ম্যাটেরিয়াল",
      }),
      t({
        en: "Tajweed practice resources",
        bn: "তাজউইদ অনুশীলনের উপকরণ",
      }),
      t({
        en: "Regular homework and practice",
        bn: "নিয়মিত হোমওয়ার্ক ও প্র্যাকটিস",
      }),
      t({
        en: "Class-based necessary guidance",
        bn: "ক্লাসভিত্তিক প্রয়োজনীয় নির্দেশনা",
      }),
      t({
        en: "Direct learning and practice opportunity in online classes",
        bn: "অনলাইন ক্লাসে সরাসরি শেখা ও অনুশীলনের সুযোগ",
      }),
    ],
    features: [
      t({
        en: "Structured online Tajweed course",
        bn: "একটি কাঠামোবদ্ধ অনলাইন তাজউইদ কোর্স",
      }),
      t({ en: "Regular live classes", bn: "নিয়মিত লাইভ ক্লাস" }),
      t({
        en: "Practice and activity-based learning",
        bn: "প্র্যাকটিস ও অ্যাক্টিভিটি-ভিত্তিক শেখার সুযোগ",
      }),
      t({ en: "Homework", bn: "হোমওয়ার্ক" }),
      t({
        en: "Direct learning from teachers",
        bn: "সরাসরি উস্তাদ/উস্তাযাহর কাছ থেকে শেখার সুযোগ",
      }),
      t({ en: "Online class convenience", bn: "অনলাইন ক্লাসের সুবিধা" }),
      t({
        en: "Separate batches for men and women",
        bn: "পুরুষ ও নারীদের পৃথক ব্যাচ",
      }),
      t({
        en: "Opportunity to apply learned topics in recitation",
        bn: "শেখা বিষয়গুলো তিলাওয়াতে প্রয়োগের সুযোগ",
      }),
    ],
    whyThisCourse: t({
      en: "It's not just about memorizing the rules of Tajweed—one of the main goals of this course is to understand, practice, and apply them correctly in Qur'an recitation. Through regular classes, homework, practice, and necessary feedback, the course is designed to make the students' recitation more accurate and beautiful.",
      bn: "শুধু তাজউইদের নিয়ম মুখস্থ করাই নয়—সঠিকভাবে বুঝে, অনুশীলন করে এবং কুরআন তিলাওয়াতে প্রয়োগ করাই এই কোর্সের অন্যতম লক্ষ্য। নিয়মিত ক্লাস, হোমওয়ার্ক, অনুশীলন ও প্রয়োজনীয় ফিডব্যাকের মাধ্যমে শিক্ষার্থীদের তিলাওয়াতকে আরও শুদ্ধ ও সুন্দর করার জন্য কোর্সটি সাজানো হয়েছে।",
    }),
    // Keep the original curriculum data (unchanged)
    curriculum: [
      {
        title: t({
          en: "Introduction to Tajweed & its importance",
          bn: "তাজবিদের পরিচয় ও গুরুত্ব",
        }),
      },
      {
        title: t({
          en: "Introduction to Makharij & Practice",
          bn: "মাখরাজের পরিচিতি ও অনুশীলন",
        }),
      },
      {
        title: t({
          en: "Introduction to Sifaat & Practice",
          bn: "সিফাতের পরিচিতি ও অনুশীলন",
        }),
      },
      {
        title: t({
          en: "Detailed Harakat & Tanween",
          bn: "হারাকাত ও তানউইনের বিস্তারিত",
        }),
      },
      {
        title: t({
          en: "Rules of Noon Sakin & Tanween",
          bn: "নুন সাকিন ও তানউইনের নিয়মাবলী",
        }),
      },
      { title: t({ en: "Rules of Meem Sakin", bn: "মীম সাকিনের নিয়মাবলী" }) },
      {
        title: t({
          en: "Gunnah & Ikhfa in detail",
          bn: "গুন্নাহ ও ইখফার বিস্তারিত",
        }),
      },
      {
        title: t({
          en: "Rules of Idgham & Iqlab",
          bn: "ইদগাম ও ইকলাবের নিয়ম",
        }),
      },
      {
        title: t({
          en: "Types of Madd & their application",
          bn: "মাদ্দের প্রকারভেদ ও প্রয়োগ",
        }),
      },
      {
        title: t({
          en: "Rules of Qalqalah & Tafkheem",
          bn: "ক্বলকালাহ ও তাফখীমের নিয়ম",
        }),
      },
      {
        title: t({
          en: "Tajweed analysis of Surah Fatihah",
          bn: "সূরা ফাতিহার তাজবিদ বিশ্লেষণ",
        }),
      },
      {
        title: t({
          en: "Tajweed analysis of small Surahs",
          bn: "ছোট সূরার তাজবিদ বিশ্লেষণ",
        }),
      },
      {
        title: t({
          en: "Application of Tajweed in Qur'an recitation",
          bn: "কুরআন তিলাওয়াতে তাজবিদের প্রয়োগ",
        }),
      },
    ],
  };

  // Why Tarbiyah Quran for Elders features (translated)
  const whyFeatures = [
    {
      icon: <FaUserTie className="text-xl" />,
      text: t({
        en: "Experienced Ijazah-certified Teachers",
        bn: "ইজাজাহপ্রাপ্ত অভিজ্ঞ উস্তাদ ও উস্তাযাহ",
      }),
    },
    {
      icon: <FaVideo className="text-xl" />,
      text: t({ en: "Live + Recorded Classes", bn: "লাইভ + রেকর্ডেড ক্লাস" }),
    },
    {
      icon: <FaBook className="text-xl" />,
      text: t({
        en: "Elder-friendly Curriculum",
        bn: "এল্ডার্স ফেন্ডলি কারিকুলাম",
      }),
    },
    {
      icon: <FaHeadset className="text-xl" />,
      text: t({ en: "One-to-One Guidance", bn: "ওয়ান-টু-ওয়ান গাইডলাইন" }),
    },
    {
      icon: <FaCertificate className="text-xl" />,
      text: t({ en: "Certificate", bn: "সার্টিফিকেট" }),
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      text: t({ en: "Safe Environment", bn: "নিরাপদ পরিবেশ" }),
    },
  ];

  // --- TESTIMONIALS (copied from HifzDetail) ---
  const testimonials = [
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
    {
      id: 4,
      name: "MARYUM BINTE HASAN",
      designation: "FATHER: KAMRUL HASAN",
      quote:
        "আলহামদুলিল্লাহ এটা আমার মেয়ের প্রথম শিক্ষা প্রতিষ্ঠান। উস্তাদ খুব সুন্দর করে ক্লাস নেন। আমার বাবু ক্লাস করতে খুব আনন্দ পায় আলহামদুলিল্লাহ। মারগিয়াম তো ক্লাসের এক ঘন্টা আগে থেকে অপেক্ষা করে। আলহামদুলিল্লাহ আমাদের সন্তানের খুশিই আমাদের সবচেয়ে বড় পাওয়া।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 5,
      name: "MARYAM BINT RAIHAN",
      designation: "FATHER: RAIHAN UDDIN",
      quote:
        "আলহামদুলিল্লাহ আমার সন্তানদের পড়া ভালোভাবে হচ্ছে। পড়ানোর পদ্ধতি আলহামদুলিল্লাহ ভালো।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 6,
      name: "RAIYAN IBN RAIYAN",
      designation: "FATHER: MD RAYHAN KIBRIA RONEE",
      quote:
        "মাশাল্লাহ আপনাদের এই অনলাইন প্রোগ্রামটি অনেক ভালো লেগেছে আমার। উস্তাদ মাশাল্লাহ অনেক ভালো এবং আন্তরিকভাবে পাঠদান করেন।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
  ];

  // --- VIDEO GALLERY (with correct thumbnails) ---
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/dkXJOsVKqsQ/hqdefault.jpg",
      url: "https://youtu.be/dkXJOsVKqsQ?si=7qHlpzi3ZK5Yx6j1",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/mNiiwJrCJu0/hqdefault.jpg",
      url: "https://youtu.be/mNiiwJrCJu0?si=Vg8r2aQNjrma5zZk",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/BAdMojqCMLo/hqdefault.jpg",
      url: "https://youtu.be/BAdMojqCMLo?si=Keq_R93pFN0Eg6py",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/mX466vxKa6E/hqdefault.jpg",
      url: "https://youtu.be/mX466vxKa6E?si=RUmcdgriOMXwEYns",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/BAdMojqCMLo/hqdefault.jpg",
      url: "https://youtu.be/BAdMojqCMLo?si=KpW88asKgnPVutxP",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/JkYmxApemvs/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=JkYmxApemvs",
    },
  ];

  // FAQ Data (translated)
  const faqs = [
    {
      question: t({
        en: "I am very old. Can I take this course?",
        bn: "আমার বয়স অনেক বেশি, আমি কি এই কোর্সটি করতে পারব?",
      }),
      answer: t({
        en: "Absolutely. Age is not a barrier to learning Tajweed. This course is specially designed for adults.",
        bn: "অবশ্যই। তাজবিদ শেখার জন্য বয়স কোনো বাধা নয়। এই কোর্সটি বিশেষভাবে প্রাপ্তবয়স্কদের প্রয়োজন বিবেচনায় তৈরি করা হয়েছে।",
      }),
    },
    {
      question: t({
        en: "What is the main objective of this course?",
        bn: "এই কোর্সের মূল উদ্দেশ্য কী?",
      }),
      answer: t({
        en: "To teach the correct Makharij and Tajweed rules and enable you to apply them in Qur'an recitation.",
        bn: "সঠিক মাখরাজ ও তাজবিদের নিয়ম শেখানো এবং কুরআন তিলাওয়াতে তা প্রয়োগ করতে সক্ষম করে তোলা।",
      }),
    },
    {
      question: t({
        en: "How long does it take to learn Tajweed?",
        bn: "তাজবিদ শিখতে কত সময় লাগে?",
      }),
      answer: t({
        en: "This is a 4-month program. However, the time may vary depending on the student's ability.",
        bn: "এই কোর্সটি ৪ মাসের একটি প্রোগ্রাম। তবে শিক্ষার্থীর সক্ষমতার উপর ভিত্তি করে সময় পরিবর্তন হতে পারে।",
      }),
    },
    {
      question: t({
        en: "After completing this course, will I be able to learn Tajweed?",
        bn: "কোর্স শেষে আমি কি তাজবিদ শিখতে পারব?",
      }),
      answer: t({
        en: "Yes. After completing this course, you will be able to learn all the rules of Tajweed and apply them in Qur'an recitation.",
        bn: "হ্যাঁ। এই কোর্সটি সম্পূর্ণ করার পর আপনি তাজবিদের সকল নিয়ম শিখতে এবং কুরআন তিলাওয়াতে তা প্রয়োগ করতে সক্ষম হবেন।",
      }),
    },
    {
      question: t({
        en: "Why should I enroll in your program?",
        bn: "আমি কেন আপনাদের প্রোগ্রামে ভর্তি হব?",
      }),
      answer: t({
        en: "Experienced Ijazah-certified teachers, elder-friendly curriculum, live and recorded classes, one-to-one support, and a step-by-step teaching method make our program unique.",
        bn: "ইজাজাহপ্রাপ্ত অভিজ্ঞ উস্তাদ ও উস্তাযাহ, এল্ডার্স ফেন্ডলি কারিকুলাম, লাইভ ও রেকর্ডেড ক্লাস, ওয়ান টু ওয়ান সাপোর্ট এবং ধাপে ধাপে শেখানোর পদ্ধতি আমাদের প্রোগ্রামকে আলাদা করেছে।",
      }),
    },
    {
      question: t({
        en: "What are the qualifications of your teachers?",
        bn: "আপনাদের ওস্তাদ–উস্তাযাহদের যোগ্যতা কী?",
      }),
      answer: t({
        en: "Our teachers are Ijazah-certified, experienced, and trained in Tajweed education. They have been teaching both online and offline for a long time.",
        bn: "আমাদের শিক্ষকবৃন্দ ইজাজাহপ্রাপ্ত, অভিজ্ঞ এবং তাজবিদ শিক্ষাদানে প্রশিক্ষিত। তাঁরা দীর্ঘদিন ধরে অনলাইন ও অফলাইন উভয় মাধ্যমে পাঠদান করছেন।",
      }),
    },
  ];

  // --- PROSPECTUS LINK ---
  const prospectusLink =
    "https://drive.google.com/file/d/1BdmiwkGklcCnr9n-30EhnzG64d5njJtT/view?usp=sharing";

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
            to="/course/quran"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">
              {t({ en: "Back to Course Page", bn: "কোর্স পেজে ফিরে যান" })}
            </span>
          </Link>

          {/* Hero Section Banner */}
          <img
            src={TajwidbannerImg}
            alt={t({ en: "Tajweed Banner", bn: "তাজবিদ ব্যানার" })}
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
                <h3 className="text-lg font-bold text-[#007a91] mb-2">
                  {courseDetails.subtitle}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {courseDetails.description}
                </p>
                {/* Why This Course? placed as a separate paragraph */}
                <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <h4 className="font-bold text-cyan-800 text-sm mb-1">
                    {t({ en: "Why This Course?", bn: "কেন এই কোর্স?" })}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {courseDetails.whyThisCourse}
                  </p>
                </div>
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
                <p className="text-sm text-gray-600 mt-2 italic">
                  {courseDetails.extraNote}
                </p>
              </div>

              {/* 3. EARN A CERTIFICATE */}
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
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2 shrink-0">
                  <img
                    src={AllimiyahCertificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                    className="w-full h-full object-contain"
                  />
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
                {/* Class Schedule */}
                <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200 whitespace-pre-line text-sm text-gray-700">
                  {courseDetails.classSchedule}
                </div>
              </div>

              {/* 6. COURSE FEATURES (NEW) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE FEATURES", bn: "কোর্সের বৈশিষ্ট্য" })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.features.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">✔</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. MATERIALS INCLUDED */}
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

              {/* 8. COURSE CURRICULUM */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE CURRICULUM", bn: "কোর্স পাঠ্যসূচি" })}
                </h2>
                <div className="border border-gray-300 rounded-sm">
                  {courseDetails.curriculum.map((sem, index) => (
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

              {/* 9. COURSE FEE */}
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
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#00ADD2] mt-1" />
                    <span className="block text-[#002b2b] font-medium">
                      {courseDetails.feeStructure.admission}
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
                      <span className="line-through text-gray-400">
                        {courseDetails.feeStructure.oneTime.regular}
                      </span>
                      <span className="text-green-600 font-bold">
                        {courseDetails.feeStructure.oneTime.offer}
                      </span>
                      <span className="text-yellow-600 font-semibold">
                        {t({ en: "Save", bn: "ছাড়" })}{" "}
                        {courseDetails.feeStructure.oneTime.discount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========== LAST 4 SECTIONS ========== */}

              {/* 1. কেন তারবিয়াহ কুরআন ফর এল্ডার্স */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Tarbiyah Quran for Elders?",
                      bn: "কেন তারবিয়াহ কুরআন ফর এল্ডার্স ?",
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

              {/* 2. শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা */}
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
              {/* Video Thumbnail (corrected link) */}
              <a
                href="https://youtu.be/MmVYqS63BBw?si=wTtR_FV7bJwZLevL"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={TajwidcourseImg}
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
                  <Link to="/admission-now" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>
                  <Link to="/admission-now" className="w-1/2">
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
                      {t({
                        en: "Beginner to Intermediate",
                        bn: "শুরু থেকে ইন্টারমিডিয়েট",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">200</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">07/24/2025</span>
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

export default Course_quran_elders_tajweed;
