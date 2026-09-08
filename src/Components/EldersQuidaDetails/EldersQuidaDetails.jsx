import React, { useState } from "react";
import { Link } from "react-router-dom";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

import ElderscourseImg from "../../image/quidanuraniyahcourse.png";
import EldersbannerImg from "../../image/quidanuraniyahbanner.png";
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
  FaClock,
  FaCalendarAlt,
  FaVideo,
  FaCertificate,
  FaGraduationCap,
  FaUserTie,
  FaBook,
  FaPlayCircle,
  FaChild,
  FaLightbulb,
  FaHands,
  FaRocket,
  FaArrowRight,
  FaAngleDoubleRight,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Import certificate image (same as HifzDetail)
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

// --- Import faculty images (6 teachers) ---
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

const EldersQuidaDetails = () => {
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

  // --- Faculty list (6 teachers) ---
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

  // --- Updated Course Details from About Course.txt ---
  const courseDetails = {
    title: t({
      en: "Quran Studies for Elders",
      bn: "কুরআন স্টাডিজ ফর এল্ডার্স",
    }),
    subtitle: t({
      en: "Qa'idah Nuraniyah for Elders",
      bn: "কায়দাহ নূরানিয়্যাহ ফর এল্ডার্স",
    }),
    description: t({
      en: "There is no end to learning the Qur'an, and there is no age to start. Life's busyness, age, or not having had the opportunity to learn the Qur'an before should not be an obstacle to learning the Qur'an. Through the Qa'idah Nuraniyah for Elders course, specially designed for adults, you have the opportunity to learn to recite the Qur'an correctly, as well as gain knowledge of basic Tajweed, Makharij, and Sifaat. This is a 4-month certificate course with a total of 32 live classes, 2 classes per week, and regular practice and activities. Online classes are conducted via Zoom.",
      bn: "কুরআন শেখার শেষ নেই, শুরু করার বয়সও নেই। জীবনের ব্যস্ততা, বয়স কিংবা পূর্বে কুরআন শেখার সুযোগ না থাকা কোনোটিই কুরআন শেখার পথে বাধা হওয়া উচিত নয়। প্রাপ্তবয়স্কদের জন্য বিশেষভাবে সাজানো কায়দাহ নূরানিয়্যাহ ফর এল্ডার্স কোর্সের মাধ্যমে শুদ্ধভাবে কুরআন তিলাওয়াত শেখার পাশাপাশি প্রয়োজনীয় মৌলিক তাজউইদ, মাখারিজ ও সিফাত সম্পর্কে জ্ঞান অর্জনের সুযোগ রয়েছে। এটি একটি ৪ মাসের সার্টিফিকেট কোর্স, যেখানে রয়েছে মোট ৩২টি লাইভ ক্লাস, সপ্তাহে ২ দিন ক্লাস এবং নিয়মিত প্র্যাকটিস ও অ্যাক্টিভিটি। অনলাইন ক্লাস পরিচালিত হবে Zoom-এর মাধ্যমে।",
    }),
    objectives: [
      t({
        en: "Gain the ability to recite the Qur'an correctly",
        bn: "কুরআন শুদ্ধভাবে তিলাওয়াত করার সক্ষমতা অর্জন করবেন",
      }),
      t({
        en: "Strengthen the foundation of Qur'an reading through Qa'idah Nuraniyah",
        bn: "কায়দাহ নূরানিয়্যাহর মাধ্যমে কুরআন পড়ার ভিত্তি মজবুত করবেন",
      }),
      t({
        en: "Learn and apply basic Tajweed",
        bn: "বেসিক তাজউইদ সম্পর্কে জানতে ও তা প্রয়োগ করতে শিখবেন",
      }),
      t({
        en: "Learn about Makharij and Sifaat of Arabic letters",
        bn: "আরবি হরফের মাখারিজ ও সিফাত সম্পর্কে জানতে পারবেন",
      }),
      t({
        en: "Practice correct pronunciation of letters",
        bn: "হরফের সঠিক উচ্চারণ অনুশীলন করতে পারবেন",
      }),
      t({
        en: "Learn proper application of Makharij and Sifaat in recitation",
        bn: "তিলাওয়াতে মাখারিজ ও সিফাতের যথাযথ প্রয়োগ শিখবেন",
      }),
      t({
        en: "Strengthen learning through regular practice and Mashq",
        bn: "নিয়মিত প্র্যাকটিস ও মাশকের মাধ্যমে শেখা বিষয়গুলো দৃঢ় করতে পারবেন",
      }),
      t({
        en: "Assess your progress through Midterm and Final exams",
        bn: "মিডটার্ম ও ফাইনাল পরীক্ষার মাধ্যমে নিজের অগ্রগতি যাচাই করতে পারবেন",
      }),
      t({
        en: "Participate in direct Halaqah, seminars, and live Q&A sessions",
        bn: "সরাসরি হালাকাহ, সেমিনার ও লাইভ প্রশ্নোত্তর সেশনে অংশগ্রহণের সুযোগ পাবেন",
      }),
    ],
    // Extra line after objectives (concluding sentence)
    extraObjectivesNote: t({
      en: "The course includes 32 live sessions, 32 recorded videos, 4 practice classes, 4 Mashq sessions, and 2 exams.",
      bn: "কোর্সে রয়েছে ৩২টি লাইভ সেশন, ৩২টি রেকর্ডেড ভিডিও, ৪টি প্র্যাকটিস ক্লাস, ৪টি মাশক সেশন এবং ২টি পরীক্ষা।",
    }),
    targetAudience: [
      t({ en: "Men and women aged 18–60", bn: "১৮–৬০ বছর বয়সী নারী ও পুরুষ" }),
      t({
        en: "Those who cannot read the Qur'an or want to read it correctly",
        bn: "যারা কুরআন পড়তে পারেন না বা শুদ্ধভাবে পড়তে চান",
      }),
      t({
        en: "Those who want to start learning the Qur'an again after a long time",
        bn: "যারা দীর্ঘদিন পর আবার কুরআন শেখা শুরু করতে চান",
      }),
      t({
        en: "Those who want to correct their recitation mistakes",
        bn: "যারা নিজের তিলাওয়াতের ভুলগুলো সংশোধন করতে চান",
      }),
      t({
        en: "Those interested in learning Makharij, Sifaat, and basic Tajweed",
        bn: "যারা মাখারিজ, সিফাত ও মৌলিক তাজউইদ শিখতে আগ্রহী",
      }),
      t({
        en: "Those who have stayed behind from learning Qur'an due to age",
        bn: "যারা বয়সের কারণে কুরআন শেখা থেকে পিছিয়ে ছিলেন",
      }),
      t({
        en: "Those looking for a regular and structured method of learning the Qur'an",
        bn: "যারা নিয়মিত ও কাঠামোবদ্ধ পদ্ধতিতে কুরআন শেখার সুযোগ খুঁজছেন",
      }),
    ],
    targetAudienceNote: t({
      en: "Separate batches for men and women.",
      bn: "নারী ও পুরুষদের জন্য পৃথক ব্যাচের ব্যবস্থা রয়েছে।",
    }),
    feeStructure: {
      monthly: t({ en: "Monthly Fee: ৳1,000", bn: "মাসিক ফি: ৳১,০০০" }),
      admission: t({ en: "Admission Fee: ৳1,000", bn: "ভর্তি ফি: ৳১,০০০" }),
      oneTime: {
        title: t({ en: "One-Time Payment", bn: "এককালীন পেমেন্ট" }),
        description: t({
          en: "Pay the 4-month course fee + admission fee together and save ৳500",
          bn: "৪ মাসের কোর্স ফি + ভর্তি ফি একসাথে প্রদান করলে নিয়মিত মূল্য: ৳৫,০০০, ছাড়: ৳৫০০, অফার মূল্য: ৳৪,৫০০ মাত্র",
        }),
        regular: "৳৫,০০০",
        discount: "৳৫০০",
        offer: "৳৪,৫০০",
      },
    },
    materials: [
      t({
        en: "Qa'idah Nuraniyah Textbook (published and approved by Al-Furqan Center, Jeddah, Saudi Arabia)",
        bn: "কায়দাহ নূরানিয়্যাহ টেক্সটবুক (আল-ফুরকান সেন্টার, জেদ্দা, সৌদি আরব কর্তৃক প্রকাশিত ও অনুমোদিত)",
      }),
      t({
        en: "Practice and Mashq materials for each class",
        bn: "ক্লাসের প্রয়োজনীয় প্র্যাকটিস ও মাশক",
      }),
      t({ en: "32 recorded class videos", bn: "৩২টি রেকর্ডেড ক্লাস ভিডিও" }),
      t({
        en: "Regular practice opportunities",
        bn: "নিয়মিত প্র্যাকটিসের সুযোগ",
      }),
      t({
        en: "All necessary learning materials related to the course",
        bn: "ক্লাস-সম্পর্কিত প্রয়োজনীয় শিক্ষাসামগ্রী",
      }),
    ],
    // Keep the original curriculum data (unchanged)
    curriculum: [
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

  // Video Gallery (keep as before, but translate titles)
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
        en: "Absolutely. Age is not a barrier to learning the Qur'an. This course is specially designed for adults.",
        bn: "অবশ্যই। কুরআন শেখার জন্য বয়স কোনো বাধা নয়। এই কোর্সটি বিশেষভাবে প্রাপ্তবয়স্কদের প্রয়োজন বিবেচনায় তৈরি করা হয়েছে।",
      }),
    },
    {
      question: t({
        en: "What is the main objective of this course?",
        bn: "এই কোর্সের মূল উদ্দেশ্য কী?",
      }),
      answer: t({
        en: "To teach Qur'an recitation with proper Tajweed and enable you to recite the Qur'an with confidence through regular practice.",
        bn: "শুদ্ধ তাজউইদসহ কুরআন তিলাওয়াত শেখানো এবং নিয়মিত অনুশীলনের মাধ্যমে আত্মবিশ্বাসের সঙ্গে কুরআন পড়তে সক্ষম করে তোলা।",
      }),
    },
    {
      question: t({
        en: "Many places teach the Qur'an in 1 month. Why is your course 4 months?",
        bn: "অনেক জায়গায় ১ মাসে কুরআন শেখানো হয়, কিন্তু আপনাদের কোর্স ৪ মাসের কেন?",
      }),
      answer: t({
        en: "Tajweed and correct recitation are skills that cannot be acquired without time, practice, and regular Mashq. Therefore, we prioritize long-term learning and give adequate time for teaching.",
        bn: "তাজউইদ ও শুদ্ধ তিলাওয়াত একটি দক্ষতা, যা সময়, অনুশীলন ও নিয়মিত মাশক ছাড়া অর্জন করা সম্ভব নয়। তাই আমরা স্থায়ী শেখাকে গুরুত্ব দিয়ে পর্যাপ্ত সময় নিয়ে পাঠদান করি।",
      }),
    },
    {
      question: t({
        en: "After completing this course, can I become a teacher?",
        bn: "কোর্স শেষে আমি কি ওস্তাদ/উস্তাযাহ হতে পারব?",
      }),
      answer: t({
        en: "This course is primarily for personal learning of correct recitation. However, with further training and required qualifications, you may have the opportunity to teach in the future.",
        bn: "এই কোর্সটি মূলত ব্যক্তিগতভাবে শুদ্ধ তিলাওয়াত শেখার জন্য। তবে উচ্চতর প্রশিক্ষণ ও নির্ধারিত যোগ্যতা অর্জনের মাধ্যমে ভবিষ্যতে শিক্ষকতা করার সুযোগ তৈরি হতে পারে।",
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
        en: "Our teachers are Ijazah-certified, experienced, and trained in Qur'an education. They have been teaching both online and offline for a long time.",
        bn: "আমাদের শিক্ষকবৃন্দ ইজাজাহপ্রাপ্ত, অভিজ্ঞ এবং কুরআন শিক্ষাদানে প্রশিক্ষিত। তাঁরা দীর্ঘদিন ধরে অনলাইন ও অফলাইন উভয় মাধ্যমে পাঠদান করছেন।",
      }),
    },
  ];

  // --- PROSPECTUS LINK (same as other pages) ---
  const prospectusLink =
    "https://drive.google.com/file/d/1-l8KU-x35e3hj5OnUAJtGXeikndUZYsm/view?usp=sharing";

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
            src={EldersbannerImg}
            alt={t({
              en: "Elders Quida Banner",
              bn: "এল্ডার্স কায়দা ব্যানার",
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
                {/* Extra note after objectives */}
                <p className="text-sm text-gray-600 mt-2 italic">
                  {courseDetails.extraObjectivesNote}
                </p>
              </div>

              {/* 3. EARN A CERTIFICATE (from HifzDetail) */}
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

              {/* 5. TARGET AUDIENCE (with extra note) */}
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
                {/* Extra note */}
                <p className="text-sm text-cyan-700 mt-3 font-medium">
                  {courseDetails.targetAudienceNote}
                </p>
              </div>

              {/* 6. MATERIALS INCLUDED (UPDATED) */}
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

              {/* 7. COURSE CURRICULUM */}
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

              {/* 8. COURSE FEE (UPDATED) */}
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

              {/* 2. শিক্ষার্থী ও অভিভাবকদের অভিজ্ঞতা (UPDATED with HifzDetail testimonials) */}
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
              {/* Video Thumbnail */}
              <a
                href="https://www.youtube.com/watch?v=RaWG0fp1-yg"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={ElderscourseImg}
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
                      {t({ en: "Beginner", bn: "শুরু" })}
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

export default EldersQuidaDetails;
