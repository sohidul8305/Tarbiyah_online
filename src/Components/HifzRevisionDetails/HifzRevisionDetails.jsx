import React, { useState } from "react";
import { Link } from "react-router";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import KidsImg from "../../image/kids.jpg";

// Swiper CSS
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
  FaDownload,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

// Import certificate image
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

// --- Import faculty images ---
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

const HifzRevisionDetails = () => {
  const { t } = useLanguage();

  const [showMore, setShowMore] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- Faculty list (6 teachers) ---
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

  // Course Details (fully translated – new Bangla content)
  const courseDetails = {
    title: t({ en: "Hifz Revision Course", bn: "হিফজ রিভিশন কোর্স" }),
    subtitle: t({
      en: "Strengthen Your Hifz. Perfect Your Recitation.",
      bn: "হিফজকে শক্তিশালী করুন। আপনার তিলাওয়াত নিখুঁত করুন।",
    }),
    description: t({
      en: "After working hard to memorize the Qur'an, the memorized portion can gradually weaken if regular Muraja'ah (Revision) is not done. Therefore, one of the most important things after completing Hifz is regular, planned, and supervised Revision. The Hifz Revision Program is designed for students who have already memorized some or all of the Qur'an and want to make their memorized portions stronger, more accurate, and more fluent. In this course, a structured revision plan is created according to the student's current Hifz level, and through Muraja'ah, Tasmi', Tajweed Correction, and Regular Assessment, the memorized portions are strengthened.",
      bn: "অনেক কষ্ট করে কুরআন হিফজ করার পর নিয়মিত মুরাজাআহ (Revision) না করলে মুখস্থ অংশ ধীরে ধীরে দুর্বল হয়ে যেতে পারে। তাই হিফজ সম্পন্ন করার পর সবচেয়ে গুরুত্বপূর্ণ বিষয়গুলোর একটি হলো নিয়মিত, পরিকল্পিত ও তত্ত্বাবধানে রিভিশন। হিফজ রিভিশন প্রোগ্রাম এমন শিক্ষার্থীদের জন্য তৈরি, যারা ইতোমধ্যে কুরআনের কিছু অংশ বা সম্পূর্ণ কুরআন হিফজ করেছেন এবং তাদের মুখস্থ অংশকে আরও মজবুত, নির্ভুল ও সাবলীল করতে চান। এই কোর্সে শিক্ষার্থীর বর্তমান হিফজ লেভেল অনুযায়ী একটি গোছানো রিভিশন পরিকল্পনা তৈরি করা হবে এবং মুরাজাআহ, তাসমি', তাজবিদ সংশোধন ও নিয়মিত মূল্যায়নের মাধ্যমে মুখস্থ অংশকে শক্তিশালী করা হবে।",
    }),
    shortDesc: t({
      en: "After working hard to memorize the Qur'an, the memorized portion can gradually weaken if regular Muraja'ah (Revision) is not done. Therefore, one of the most important things after completing Hifz is regular, planned, and supervised Revision.",
      bn: "অনেক কষ্ট করে কুরআন হিফজ করার পর নিয়মিত মুরাজাআহ (Revision) না করলে মুখস্থ অংশ ধীরে ধীরে দুর্বল হয়ে যেতে পারে। তাই হিফজ সম্পন্ন করার পর সবচেয়ে গুরুত্বপূর্ণ বিষয়গুলোর একটি হলো নিয়মিত, পরিকল্পিত ও তত্ত্বাবধানে রিভিশন।",
    }),
    objectives: [
      t({
        en: "Strengthen memorized portions through regular and planned revision",
        bn: "নিয়মিত ও পরিকল্পিত রিভিশনের মাধ্যমে মুখস্থ অংশ আরও দৃঢ় হবে",
      }),
      t({
        en: "Correct Makharij, Tajweed, and pronunciation errors from memorization",
        bn: "মুখস্থ করার সময় তৈরি হওয়া ভুল মাখারিয, তাজবিদ ও উচ্চারণ সংশোধনের সুযোগ থাকবে",
      }),
      t({
        en: "Daily, weekly, and monthly revision plan according to the student's Hifz level",
        bn: "শিক্ষার্থীর হিফজ অনুযায়ী দৈনিক, সপ্তাহিক ও মাসিক রিভিশন পরিকল্পনা তৈরি করা হবে",
      }),
      t({
        en: "Strengthening previously memorized portions through multi-level revision",
        bn: "নতুন অংশ নয়; বরং পূর্বে মুখস্থ করা অংশকে বিভিন্ন স্তরে রিভিশনের মাধ্যমে শক্তিশালী করা হবে",
      }),
      t({
        en: "Develop the ability to recite long portions fluently and continuously",
        bn: "বিরতিহীন ও সাবলীলভাবে দীর্ঘ অংশ তিলাওয়াত করার সক্ষমতা বৃদ্ধি পাবে",
      }),
      t({
        en: "Identify and correct mistakes through regular recitation in front of teachers",
        bn: "শিক্ষকের সামনে নিয়মিত শুনিয়ে ভুল শনাক্ত ও সংশোধনের মাধ্যমে হিফজের মান যাচাই করা হবে",
      }),
      t({
        en: "Develop an effective revision routine for continued self-revision",
        bn: "কোর্স শেষে নিজে নিজে নিয়মিত মুরাজাআহ চালিয়ে যাওয়ার জন্য একটি কার্যকর রিভিশন রুটিন তৈরি হবে",
      }),
    ],
    targetAudience: [
      t({
        en: "Those who have memorized the entire Qur'an but the memorized portion has weakened due to lack of regular revision",
        bn: "যারা সম্পূর্ণ কুরআন হিফজ করেছেন কিন্তু নিয়মিত রিভিশনের অভাবে মুখস্থ অংশ দুর্বল হয়ে গেছে",
      }),
      t({
        en: "Those who have memorized a portion of the Qur'an and want to strengthen previously memorized portions",
        bn: "যারা আংশিক কুরআন হিফজ করেছেন এবং পূর্বে মুখস্থ করা অংশ শক্তিশালী করতে চান",
      }),
      t({
        en: "Those who have been away from Hifz for a long time and want to restart regular Muraja'ah",
        bn: "যারা দীর্ঘদিন হিফজ থেকে দূরে ছিলেন এবং পুনরায় নিয়মিত মুরাজাআহ শুরু করতে চান",
      }),
      t({
        en: "Those who want to correct mistakes, weaknesses, and Tajweed issues in their Hifz",
        bn: "যারা হিফজের ভুল, দুর্বলতা ও তাজবিদের সমস্যা সংশোধন করতে চান",
      }),
      t({
        en: "Those who want regular Tasmi' and revision under the supervision of a teacher",
        bn: "যারা শিক্ষকের তত্ত্বাবধানে নিয়মিত তাসমি' ও রিভিশন করতে চান",
      }),
      t({
        en: "Children, teenagers, and adult students residing in Bangladesh and various countries around the world",
        bn: "বাংলাদেশ ও বিশ্বের বিভিন্ন দেশে অবস্থানরত শিশু, কিশোর ও প্রাপ্তবয়স্ক শিক্ষার্থী",
      }),
    ],
    level: t({
      en: "Intermediate / Advanced",
      bn: "ইন্টারমিডিয়েট / অ্যাডভান্সড",
    }),
    duration: t({
      en: "Based on student's Hifz level and revision target",
      bn: "শিক্ষার্থীর হিফজ লেভেল এবং রিভিশন লক্ষ্যের ওপর ভিত্তি করে নির্ধারিত",
    }),
    weeklyClasses: t({ en: "4 days per week", bn: "সপ্তাহে ৪ দিন" }),
    classDuration: t({
      en: "60–120 minutes per class",
      bn: "প্রতি ক্লাস ৬০–১২০ মিনিট",
    }),
    assessment: t({
      en: "Regular Oral Assessment & Tasmi'",
      bn: "নিয়মিত মৌখিক মূল্যায়ন ও তাসমি'",
    }),
    medium: t({ en: "Bangla / English", bn: "বাংলা / ইংরেজি" }),
    certificateInfo: t({
      en: "Certificate upon successful completion",
      bn: "সফলভাবে সম্পন্ন করার পর সার্টিফিকেট প্রদান করা হবে",
    }),
    tagline: t({
      en: "Strengthen Your Hifz. Perfect Your Recitation. Preserve the Qur'an in Your Heart.",
      bn: "হিফজকে শক্তিশালী করুন। আপনার তিলাওয়াত নিখুঁত করুন। আপনার অন্তরে কুরআন সংরক্ষণ করুন।",
    }),
    feeStructure: {
      bd: {
        title: t({ en: "Bangla Medium Course", bn: "বাংলা মিডিয়াম কোর্স" }),
        admission: t({ en: "Admission Fee: ৳2,000", bn: "ভর্তি ফি: ৳২,০০০" }),
        monthly: t({ en: "Monthly Fee: ৳2,000", bn: "মাসিক ফি: ৳২,০০০" }),
      },
      overseas: {
        title: t({ en: "International Course", bn: "ইন্টারন্যাশনাল কোর্স" }),
        admission: t({ en: "Admission Fee: ৳2,000", bn: "ভর্তি ফি: ৳২,০০০" }),
        monthly: t({ en: "Monthly Fee: ৳2,000", bn: "মাসিক ফি: ৳২,০০০" }),
      },
    },
    rating: "0 (0 Ratings)",
  };

  // Why Tarbiyah Quran Studies features with icons
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

  // Testimonials (6 total)
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

  // Video Gallery (6 videos)
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

  // --- PROSPECTUS LINK ---
  const prospectusLink =
    "https://drive.google.com/file/d/1mv0ponZWJ0Jb2cXSsvITdneTwYMQfXkv/view?usp=sharing";

  const handleDownloadPDF = () => {
    window.open(prospectusLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/course/kids"
          className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 mb-4 transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          <span>
            {t({ en: "Back to Course Page", bn: "কোর্স পেজে ফিরে যান" })}
          </span>
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Banner Image - STATIC KidsImg */}
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md bg-cyan-900 relative">
              <img
                src={KidsImg}
                alt={courseDetails.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {courseDetails.title}
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  {courseDetails.subtitle}
                </p>
              </div>
            </div>

            {/* Share, Wishlist, Rating bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-4 text-cyan-700">
                  <button className="flex items-center gap-1.5 hover:underline font-medium">
                    <FaShareAlt /> {t({ en: "Share", bn: "শেয়ার" })}
                  </button>
                  <button className="flex items-center gap-1.5 hover:underline font-medium">
                    <FaRegHeart /> {t({ en: "Wishlist", bn: "উইশলিস্ট" })}
                  </button>
                </div>
                <p className="text-xs text-gray-600 italic mt-1 leading-relaxed">
                  {courseDetails.tagline}
                </p>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-600 text-xs ml-1">
                  {courseDetails.rating}
                </span>
              </div>
            </div>

            {/* ABOUT COURSE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-3 tracking-wide">
                {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {showMore ? courseDetails.description : courseDetails.shortDesc}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-cyan-600 text-sm font-semibold mt-3 hover:underline flex items-center gap-1"
              >
                {showMore
                  ? t({ en: "- Show Less", bn: "- কম দেখান" })
                  : t({ en: "+ Show More", bn: "+ আরও দেখুন" })}
              </button>
            </div>

            {/* WHAT YOU WILL GAIN */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                {t({
                  en: "WHAT YOU WILL GAIN",
                  bn: "কোর্স থেকে যা অর্জন করবেন",
                })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                {courseDetails.objectives.map((obj, i) => (
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
                  {t({
                    en: "EARN A CERTIFICATE",
                    bn: "সার্টিফিকেট অর্জন করুন",
                  })}
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {t({
                    en: "Add this certificate to your resume to demonstrate your skills & increase your chances of getting noticed.",
                    bn: "আপনার দক্ষতা প্রদর্শন ও নজরে আসার সম্ভাবনা বাড়াতে এই সার্টিফিকেট আপনার জীবনবৃত্তান্তে যুক্ত করুন।",
                  })}
                </p>
              </div>
              <div className="w-48 bg-cyan-50 border border-cyan-200 rounded-lg p-3 shadow-inner text-center flex-shrink-0">
                <img
                  src={AllimiyahCertificate}
                  alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  className="w-full h-28 object-contain"
                />
              </div>
            </div>

            {/* Ready To Apply Banner */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 flex items-center justify-between shadow-sm flex-wrap gap-3">
              <span className="text-cyan-800 font-bold text-base md:text-lg">
                {t({
                  en: "Ready To Apply Your Course",
                  bn: "আপনার কোর্সে আবেদন করতে প্রস্তুত",
                })}
              </span>
              <Link to="/course/kids/revision/enroll">
                <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition-all">
                  {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                </button>
              </Link>
            </div>

            {/* COURSE DETAILS TABLE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                {t({ en: "COURSE DETAILS", bn: "কোর্স ওভারভিউ" })}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Level:", bn: "লেভেল:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.level}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Duration:", bn: "কোর্সের মেয়াদ:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Weekly Classes:", bn: "সাপ্তাহিক ক্লাস:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.weeklyClasses}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Class Duration:", bn: "ক্লাসের সময়কাল:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.classDuration}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Assessment:", bn: "মূল্যায়ন:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.assessment}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Medium:", bn: "মাধ্যম:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.medium}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t({ en: "Certificate:", bn: "সার্টিফিকেট:" })}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {courseDetails.certificateInfo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TARGET AUDIENCE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                {t({ en: "TARGET AUDIENCE", bn: "টার্গেট অডিয়েন্স" })}
              </h2>
              <div className="space-y-2.5 text-xs md:text-sm text-gray-700">
                {courseDetails.targetAudience.map((target, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold leading-tight">
                      •
                    </span>
                    <span className="leading-snug">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FEE STRUCTURE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                {t({ en: "COURSE FEE", bn: "কোর্স ফি" })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {courseDetails.feeStructure.bd.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>
                    {courseDetails.feeStructure.bd.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>
                    {courseDetails.feeStructure.bd.monthly}
                  </p>
                </div>
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {courseDetails.feeStructure.overseas.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>
                    {courseDetails.feeStructure.overseas.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>
                    {courseDetails.feeStructure.overseas.monthly}
                  </p>
                </div>
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

          {/* Right Sidebar - Static (no sticky) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4 border border-cyan-100">
              {/* Thumbnail / Video Box - STATIC KidsImg */}
              <a
                href="https://youtu.be/NI8VoGYDtYs?si=J-qJ2ujOuvw7Urad"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-lg overflow-hidden shadow mb-4 bg-black group cursor-pointer block h-40"
              >
                <img
                  src={KidsImg}
                  alt={t({ en: "Course Video", bn: "কোর্স ভিডিও" })}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-cyan-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-cyan-600 transition-colors">
                    <FaPlay className="text-sm ml-0.5" />
                  </div>
                </div>
              </a>

              <div className="mb-4">
                <span className="text-xs font-bold text-cyan-800 tracking-wider uppercase block mb-1">
                  {t({ en: "Apply This Course", bn: "এই কোর্সে আবেদন করুন" })}
                </span>
              </div>

              <Link to="/course/kids/revision/enroll">
                <button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 rounded-lg shadow transition-all text-sm flex items-center justify-center gap-2">
                  <span>
                    {t({ en: "Enroll Now", bn: "এখনই নিবন্ধন করুন" })}
                  </span>
                </button>
              </Link>

              {/* Prospectus Download Button */}
              <div className="mt-3">
                <a
                  href={prospectusLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 transition-all text-sm">
                    <FaDownload /> {t({ en: "Prospectus", bn: "প্রসপেক্টাস" })}
                  </button>
                </a>
              </div>
            </div>

            {/* Faculty List (6 teachers) - NEW */}
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
      <Footer />
    </div>
  );
};

export default HifzRevisionDetails;
