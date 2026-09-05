import React, { useState } from "react";
import { Link } from "react-router";
import TabriyahBanner from "../../image/arbiyaprogrambabanner.jpg";
import Tarbiyahcourse from "../../image/Tarbiyaprogram.jpg";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import MamunImg from "../../image/Abdullahmanun.jpg";
import MahmudImg from "../../image/Hridoy-Ustaz-01.png";
import MarjanaImg from "../../image/arartor.png";
import ImamhussainImg from "../../image/Emam Hussain.png";
import AtiqullahImg from "../../image/atikullah.png";
import JubaerImg from "../../image/jubair.png";
import AlaminImg from "../../image/Alamin.png";
import AllimiyahCertificate from "../../image/allimiyahcertificate (2).png";

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
  FaPlayCircle,
  FaHeadset,
  FaGlobe,
  FaVideo,
  FaCertificate,
  FaUserTie,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

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

const AlimiyahProgramDetails = () => {
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

  // Curriculum Data (translated)
  const semestersData = [
    {
      title: t({ en: "Qur'anic Studies", bn: "কুর’আনিক স্টাডিজ" }),
      subjects: [
        t({
          en: "Semester 1: Qa'idah Nuraniyah",
          bn: "১ম সেমিস্টার: কায়দাহ নুরানিয়াহ",
        }),
        t({
          en: "Semester 2: Juz Amma Nazerah & 10 small Surahs Hifz",
          bn: "২য় সেমিস্টার: জুয আম্মা নাজেরা ও ছোট ১০ সুরাহ হিফয",
        }),
        t({
          en: "Semester 3: Juz Tabarak Nazerah & Tajweed-1",
          bn: "৩য় সেমিস্টার: জুয তাবারক নাজেরা ও তাজউইদ-১",
        }),
        t({
          en: "Semester 4: Juz Amma Hifz & Tajweed-2",
          bn: "৪র্থ সেমিস্টার: জুয আম্মা হিফয ও তাজউইদ-২",
        }),
        t({
          en: "Semester 5: Juz Tabarak Hifz",
          bn: "৫ম সেমিস্টার: জুয তাবারক হিফয",
        }),
        t({
          en: "Semester 6: Hifz of Virtuous Surahs",
          bn: "৬ষ্ঠ সেমিস্টার: ফাযীলাহপূর্ণ সুরাহ হিফয",
        }),
        t({
          en: "Semester 7: Ulumul Qur'an-1 (Basic Topics)",
          bn: "৭ম সেমিস্টার: উলুমুল কুরআন-১ মৌলিক বিষয়সমূহ",
        }),
        t({
          en: "Semester 8: Qur'an with Translation (Juz Amma)",
          bn: "৮ম সেমিস্টার: অনুবাদসহ কুরআন (জুয আম্মা)",
        }),
        t({
          en: "Semester 9: Brief Tafsir (Juz Amma)",
          bn: "৯ম সেমিস্টার: সংক্ষিপ্ত তাফসীর (জুয আম্মা)",
        }),
      ],
    },
    {
      title: t({ en: "Hadith Studies & Aqidah", bn: "হাদিস স্টাডিজ ও আকীদাহ" }),
      videoLink: "https://youtu.be/K35WK5Td1BY?si=ll7b9_YlDm0QrME8",
      subjects: [
        t({
          en: "Semester 1: Hifdhul Hadith-1 (30 Hadith with meanings) & Arkanul Iman-1 & 2",
          bn: "১ম সেমিস্টার: হিফযুল হাদিস-১ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-১ ও ২",
        }),
        t({
          en: "Semester 2: Hifdhul Hadith-2 (30 Hadith with meanings) & Arkanul Iman-3 & 4",
          bn: "২য় সেমিস্টার: হিফযুল হাদিস-২ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-৩ ও ৪",
        }),
        t({
          en: "Semester 3: Hifdhul Hadith-3 (30 Hadith with meanings) & Arkanul Iman-5 & 6",
          bn: "৩য় সেমিস্টার: হিফযুল হাদিস-৩ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-৫ ও ৬",
        }),
        t({
          en: "Semester 4: Imam Nawawi's 40 Hadith-1",
          bn: "৪র্থ সেমিস্টার: ইমাম নববীর ৪০ হাদিস-১",
        }),
        t({
          en: "Semester 5: Imam Nawawi's 40 Hadith-2",
          bn: "৫ম সেমিস্টার: ইমাম নববীর ৪০ হাদিস-২",
        }),
        t({
          en: "Semester 6: Shamayilun Nabi ﷺ",
          bn: "৬ষ্ঠ সেমিস্টার: শামায়িলুন নাবী স.",
        }),
        t({
          en: "Semester 7: Ulumul Hadith-1 (Introduction & Terminology)",
          bn: "৭ম সেমিস্টার: উলূমুল হাদীস-১ (হাদিস পরিচিতি, ও বিভিন্ন পরিভাষা)",
        }),
        t({
          en: "Semester 8: Ulumul Hadith-2 (Authenticity, Compilation & Principles)",
          bn: "৮ম সেমিস্টার: উলূমুল হাদীস-২ (হাদিসের প্রামাণ্যতা, সঙ্কলন ও হাদিস বোঝার মূলনীতি)",
        }),
        t({
          en: "Semester 9: Ulumul Hadith-3 (Commonly Misunderstood & Fabricated Hadith)",
          bn: "৯ম সেমিস্টার: উলূমুল হাদীস-৩ (প্রচলিত ভ্রান্ত ও বানোয়াট হাদিস)",
        }),
      ],
    },
    {
      title: t({ en: "Arabic Reading", bn: "এ্যারাবিক রিডিং" }),
      subjects: [
        t({
          en: "Semester 1: Madinah Arabic-1 / Let's Learn Arabic-1",
          bn: "১ম সেমিস্টার: মদিনা এরাবিক-১/এসো আরবি শিখি-১",
        }),
        t({
          en: "Semester 2: Madinah Arabic-2 / Let's Learn Arabic-1",
          bn: "২য় সেমিস্টার: মদিনা এরাবিক-২/এসো আরবি শিখি-১",
        }),
        t({
          en: "Semester 3: Madinah Arabic-3 / Let's Learn Arabic-2",
          bn: "৩য় সেমিস্টার: মদিনা এরাবিক-৩/এসো আরবি শিখি-২",
        }),
        t({
          en: "Semester 4: Madinah Arabic-4 / Let's Learn Arabic-2",
          bn: "৪র্থ সেমিস্টার: মদিনা এরাবিক-৪/এসো আরবি শিখি-২",
        }),
        t({
          en: "Semester 5: Madinah Arabic-5 / Let's Learn Arabic-3",
          bn: "৫ম সেমিস্টার: মদিনা এরাবিক-৫/এসো আরবি শিখি-৩",
        }),
        t({
          en: "Semester 6: Madinah Arabic-6 / Let's Learn Arabic-3",
          bn: "৬ষ্ঠ সেমিস্টার: মদিনা এরাবিক-৬/এসো আরবি শিখি-৩",
        }),
        t({
          en: "Semester 7: Qasasun Nabiyyin-1",
          bn: "৭ম সেমিস্টার: কাসাসুন নাবিয়্যীন-১",
        }),
        t({
          en: "Semester 8: Qasasun Nabiyyin-2",
          bn: "৮ম সেমিস্টার: কাসাসুন নাবিয়্যীন-২",
        }),
        t({
          en: "Semester 9: Qasasun Nabiyyin-3",
          bn: "৯ম সেমিস্টার: কাসাসুন নাবিয়্যীন-৩",
        }),
      ],
    },
    {
      title: t({ en: "Arabic Grammar", bn: "এ্যারাবিক গ্রামার" }),
      videoLink: "https://youtu.be/cDNDp0MSNNU?si=FwAPr5PHHzT0XY5N",
      subjects: [
        t({
          en: "Semester 1: Vocabulary practice & handwriting from relevant course book",
          bn: "১ম সেমিস্টার: সংশ্লিষ্ট কোর্স বুক থেকে শব্দার্থ অনুশীলন ও হস্তলিপি চর্চা",
        }),
        t({
          en: "Semester 2: Grammar & written practice from Madinah Arabic-1 / Let's Learn Arabic-1",
          bn: "২য় সেমিস্টার: মদিনা এরাবিক-১/এসো আরবি শিখি-১ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({
          en: "Semester 3: Grammar & written practice from Madinah Arabic-2 / Let's Learn Arabic-1",
          bn: "৩য় সেমিস্টার: মদিনা এরাবিক-২/এসো আরবি শিখি-১ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({
          en: "Semester 4: Grammar & written practice from Madinah Arabic-3 / Let's Learn Arabic-2",
          bn: "৪র্থ সেমিস্টার: মদিনা এরাবিক-৩/এসো আরবি শিখি-২ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({
          en: "Semester 5: Grammar & written practice from Madinah Arabic-4 / Let's Learn Arabic-2",
          bn: "৫ম সেমিস্টার: মদিনা এরাবিক-৪/এসো আরবি শিখি-২ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({
          en: "Semester 6: Grammar & written practice from Madinah Arabic-5 / Let's Learn Arabic-3",
          bn: "৬ষ্ঠ সেমিস্টার: মদিনা এরাবিক-৫/এসো আরবি শিখি-৩ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({
          en: "Semester 7: Grammar & written practice from Madinah Arabic-6 / Let's Learn Arabic-3",
          bn: "৭ম সেমিস্টার: মদিনা এরাবিক-৬/এসো আরবি শিখি-৩ থেকে গ্রামার ও লিখিত অনুশীলন",
        }),
        t({ en: "Semester 8: Basic Sarf", bn: "৮ম সেমিস্টার: বেসিক সরফ" }),
        t({ en: "Semester 9: Basic Nahw", bn: "৯ম সেমিস্টার: বেসিক নাহু" }),
      ],
    },
    {
      title: t({ en: "Fiqh & Usulul Fiqh", bn: "ফিকহ ও উসুলুল ফিকহ" }),
      videoLink: "https://youtu.be/Dk_JT5hK2wg?si=dFDBOvH7AJRzVtxr",
      subjects: [
        t({
          en: "Semester 1: Fiqhut Taharah & Adab-Masun Du'a",
          bn: "১ম সেমিস্টার: ফিকহুত তাহারাহ ও আদাব-মাসনুন দুয়া",
        }),
        t({ en: "Semester 2: Fiqhus Salah", bn: "২য় সেমিস্টার: ফিকহুস সালাহ" }),
        t({ en: "Semester 3: Fiqhus Sawm", bn: "৩য় সেমিস্টার: ফিকহুস সাউম" }),
        t({
          en: "Semester 4: Fiqhuz Zakah",
          bn: "৪র্থ সেমিস্টার: ফিকহুস যাকাহ",
        }),
        t({ en: "Semester 5: Fiqhul Hajj", bn: "৫ম সেমিস্টার: ফিকহুল হাজ্জ" }),
        t({
          en: "Semester 6: Fiqhul Udhiyah wal Jana'iz",
          bn: "৬ষ্ঠ সেমিস্টার: ফিকহুল উদহিয়াহ ওয়াল জানাইয",
        }),
        t({ en: "Semester 7: Fiqhun Nikah", bn: "৭ম সেমিস্টার: ফিকহুন নিকাহ" }),
        t({
          en: "Semester 8: Usulul Fiqh-1",
          bn: "৮ম সেমিস্টার: উসুলুল ফিকহ-১",
        }),
        t({
          en: "Semester 9: Usulul Fiqh-2",
          bn: "৯ম সেমিস্টার: উসুলুল ফিকহ-২",
        }),
      ],
    },
    {
      title: t({
        en: "Seeratun Nabi ﷺ & Islamic History",
        bn: "সিরাতুন্নাবী (স.) ও ইসলামি ইতিহাস",
      }),
      subjects: [
        t({
          en: "Semester 1: Makkan Phase-1",
          bn: "১ম সেমিস্টার: মাক্কী অধ্যায়-১",
        }),
        t({
          en: "Semester 2: Makkan Phase-2",
          bn: "২য় সেমিস্টার: মাক্কী অধ্যায়-২",
        }),
        t({
          en: "Semester 3: Madinan Phase",
          bn: "৩য় সেমিস্টার: মাদানী অধ্যায়",
        }),
        t({
          en: "Semester 4: Khulafa Rashidun",
          bn: "৪র্থ সেমিস্টার: খুলাফা রাশিদাহ",
        }),
        t({
          en: "Semester 5: Biographies of Notable Companions",
          bn: "৫ম সেমিস্টার: উল্লেখযোগ্য সাহাবীদের জীবনী",
        }),
        t({
          en: "Semester 6: Umayyad Caliphate",
          bn: "৬ষ্ঠ সেমিস্টার: উমাইয়া খিলাফাহ",
        }),
        t({
          en: "Semester 7: Abbasid Caliphate",
          bn: "৭ম সেমিস্টার: আব্বাসী খিলাফাহ",
        }),
        t({
          en: "Semester 8: Ottoman & Andalusian Rule",
          bn: "৮ম সেমিস্টার: উসমানী ও আন্দালুস শাসনকাল",
        }),
        t({
          en: "Semester 9: Muslim Rule in the Indian Subcontinent",
          bn: "৯ম সেমিস্টার: ভারত উপমহাদেশে মুসলিম শাসন",
        }),
      ],
    },
  ];

  // Program Structure
  const programStructure = {
    duration: t({ en: "Quiz & Midterm exams", bn: "কুইজ ও মিডটার্ম পরীক্ষা" }),
    classMethod: t({
      en: "Semester Final exams",
      bn: "সেমিস্টার ফাইনাল পরীক্ষা",
    }),
    time: t({
      en: "Total 3 years in 9 semesters",
      bn: "৯টি সেমিস্টারে মোট ৩ বছর",
    }),
    classesPerWeek: t({
      en: "Certificate & Ijazah",
      bn: "সার্টিফিকেট ও ইজাযাহ প্রদান",
    }),
  };

  // --- UPDATED PROSPECTUS LINK ---
  const prospectusLink =
    "https://drive.google.com/file/d/1UfiIPqcdwYa8rxuDO-0RC07PYbTy5ynj/view?usp=drive_link";

  const handleDownloadPDF = () => {
    window.open(prospectusLink, "_blank");
  };

  // Why Tarbiyah features (updated: Kid-friendly → Teens / Teenagers Friendly)
  const whyFeatures = [
    {
      text: t({
        en: "Teens Teenagers Friendly",
        bn: "কিশোর কিশোরীদের জন্য উপযোগী",
      }),
    },
    { text: t({ en: "Live & Recorded Classes", bn: "লাইভ ও রেকর্ডেড ক্লাস" }) },
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
    { text: t({ en: "Teen-friendly Curriculum", bn: "কিশোর-উপযোগী পাঠক্রম" }) },
    { text: t({ en: "Certificate", bn: "সার্টিফিকেট" }) },
  ];

  // --- Testimonials (Copied from AlimiyahKidsDetails) ---
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

  // --- Video Gallery (with your 6 specific videos) ---
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/qVdTFluIAT8/hqdefault.jpg",
      url: "https://youtu.be/qVdTFluIAT8?si=_qUSIGh0Ql4OndeB",
    },
    {
      id: 2,
      title: t({ en: "Video 2", bn: "ভিডিও ২" }),
      thumbnail: "https://img.youtube.com/vi/mgvGPEpZLVU/hqdefault.jpg",
      url: "https://youtu.be/mgvGPEpZLVU?si=cK_MmNmn3UsXmsTG",
    },
    {
      id: 3,
      title: t({ en: "Video 3", bn: "ভিডিও ৩" }),
      thumbnail: "https://img.youtube.com/vi/D5Ov8e2aDh0/hqdefault.jpg",
      url: "https://youtu.be/D5Ov8e2aDh0?si=9JfmHDwW0NGN_pUo",
    },
    {
      id: 4,
      title: t({ en: "Video 4", bn: "ভিডিও ৪" }),
      thumbnail: "https://img.youtube.com/vi/IqCms2QFZr0/hqdefault.jpg",
      url: "https://youtu.be/IqCms2QFZr0?si=xyYARWcerxeitdxp",
    },
    {
      id: 5,
      title: t({ en: "Video 5", bn: "ভিডিও ৫" }),
      thumbnail: "https://img.youtube.com/vi/I1ibIcH35k4/hqdefault.jpg",
      url: "https://youtu.be/I1ibIcH35k4?si=l2qVJZCk2qbfOzL6",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/r0JH4X805mE/hqdefault.jpg",
      url: "https://youtu.be/r0JH4X805mE?si=a0rPF6-t2sXVhELa",
    },
  ];

  // FAQ Data (translated)
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
        en: "Students aged 12–18 can enroll.",
        bn: "১২–১৮ বছর বয়সী শিক্ষার্থীরা এই প্রোগ্রামে ভর্তি হতে পারবে।",
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
        en: "Because here we ensure a teen-friendly curriculum, experienced teachers, regular assessments, and parent-friendly support through modern online education methods.",
        bn: "কারণ এখানে আধুনিক অনলাইন শিক্ষাপদ্ধতির মাধ্যমে কিশোর-উপযোগী কারিকুলাম, অভিজ্ঞ শিক্ষক, নিয়মিত মূল্যায়ন এবং অভিভাবকবান্ধব সাপোর্ট নিশ্চিত করা হয়।",
      }),
    },
    {
      question: t({
        en: "What is the duration of this program?",
        bn: "এটি কত বছরের প্রোগ্রাম?",
      }),
      answer: t({
        en: "It is a 3-year Alimiyah program.",
        bn: "এটি একটি ৩ বছর মেয়াদি আলিমিয়্যাহ প্রোগ্রাম।",
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
                bn: "আলেমিয়াহ পেজে ফিরে যান",
              })}
            </span>
          </Link>

          {/* Hero Section */}
          <img
            src={TabriyahBanner}
            alt={t({
              en: "Alimiyah Program Banner",
              bn: "আলিমিয়াহ প্রোগ্রাম ব্যানার",
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
            <h1 className="text-2xl font-bold text-[#007a91] mb-3">
              {t({
                en: "TARBIYAH ALIMIYAH PROGRAM",
                bn: "তারবিয়াহ আলিমিয়াহ প্রোগ্রাম",
              })}
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

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* ABOUT COURSE */}
              <div className="p-8 mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "ABOUT COURSE", bn: "কোর্স সম্পর্কে" })}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t({
                    en: "To nurture Islamic knowledge in the hearts of Muslim children and teenagers, Tarbiyah Education Network proudly presents the *Tarbiyah Alimiyyah Program*. This program is designed to equip each child with the ability to practice Islam in their daily lives, combining the study of Qur'an, Hadith, Arabic language, Aqidah, Fiqh, and Islamic etiquette. To make Islamic knowledge accessible to all, the program is available in both Bengali and English, overcoming language barriers. With a research-based syllabus, well-structured curriculum, and experienced teachers, this two-year-long journey of knowledge has been transforming the lives of Muslim children and teenagers.",
                    bn: "মুসলিম শিশু-কিশোরদের হৃদয়ে ইসলামি জ্ঞান লালন করতে তারবিয়াহ এডুকেশন নেটওয়ার্ক গর্বের সাথে উপস্থাপন করে *তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম*। এই প্রোগ্রামটি প্রতিটি শিশুকে কুরআন, হাদিস, আরবি ভাষা, আকীদাহ, ফিকহ ও ইসলামি আদবের সমন্বয়ে দৈনন্দিন জীবনে ইসলাম পালনের দক্ষতা অর্জনে সহায়তা করার জন্য ডিজাইন করা হয়েছে। ইসলামি জ্ঞান সবার কাছে সহজলভ্য করতে প্রোগ্রামটি বাংলা ও ইংরেজি উভয় ভাষায় উপলব্ধ, যা ভাষার বাধা অতিক্রম করে। গবেষণাভিত্তিক সিলেবাস, সুসংগঠিত পাঠক্রম এবং অভিজ্ঞ শিক্ষকদের মাধ্যমে এই দ্বিবার্ষিক জ্ঞানের যাত্রা মুসলিম শিশু-কিশোরদের জীবনকে রূপান্তরিত করছে।",
                  })}
                </p>
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
                    src={AllimiyahCertificate}
                    alt={t({ en: "Certificate", bn: "সার্টিফিকেট" })}
                  />
                </div>
              </div>

              {/* WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "WHAT YOU WILL GAIN", bn: "আপনি কী পাবেন" })}
                  </h2>
                </div>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Knowledge of the Aqeedah of the Salaf",
                        bn: "সালাফদের আকিদাহ সম্পর্কিত জ্ঞানলাভ",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Acquisition of basic and deep knowledge of the essentials of Deen",
                        bn: "দ্বীনের নিত্যপ্রয়োজনীয় মৌলিক ও গভীর জ্ঞানার্জন",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Correct knowledge of purification, Salah, Sawm, Zakah and Hajj",
                        bn: "পবিত্রতা, সালাত, সিয়াম, যাকাত ও হজ্জের সঠিক পদ্ধতি জানা",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Benefiting from primary sources through proficiency in Arabic",
                        bn: "আরবি ভাষায় দক্ষতার ফলে মৌলিক উৎস থেকে উপকার লাভ",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Establishing oneself as a true practicing Muslim",
                        bn: "নিজেকে একজন প্রকৃত এবং প্র্যাক্টিসিং মুসলিম হিসেবে প্রতিষ্ঠিত করা",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Sharpening oneself through correct Qur'an recitation, understanding and explanation",
                        bn: "বিশুদ্ধ কুরআন তিলাওয়াত, অনুধাবন ও ব্যাখ্যা জেনে নিজেকে শাণিত করা",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Opportunity to build a career as a Da'ee by acquiring basic and deep knowledge of Deen",
                        bn: "দ্বীনের মৌলিক ও গভীর জ্ঞানার্জন করে দা’ঈ হিসেবে ক্যারিয়ার গড়ার সুযোগ",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Acquire proficiency in Arabic reading, writing and listening including daily conversation",
                        bn: "দৈনন্দিন কথোপকথনসহ আরবি ভাষায় লিখন-পাঠ ও শ্রবণের যোগ্যতা অর্জন",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Learning to live a Sunnah-based life by memorizing, understanding and practicing Hadith",
                        bn: "হাদিস মুখস্থকরণ, অনুধাবন ও পালনের মাধ্যমে সুন্নাহ ভিত্তিক জীবনযাপনের পাঠগ্রহণ",
                      })}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-1">✔</span>
                    <span>
                      {t({
                        en: "Preparing oneself to face all challenges of the time through learning Seerah and Islamic history",
                        bn: "সিরাহ ও ইসলামি ইতিহাস জেনে যুগের সকল ফিতনা মুকাবেলায় নিজেকে প্রস্তুত রাখা",
                      })}
                    </span>
                  </li>
                </ul>
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
                <Link to="/Course-apply-from">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    {t({ en: "Start Now", bn: "এখনই শুরু করুন" })}
                  </button>
                </Link>
              </div>

              {/* Target Audience */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "Target Audience", bn: "লক্ষ্য দর্শক" })}
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    t({
                      en: "Designed for those living abroad who lack access to quality Islamic education.",
                      bn: "প্রবাসে বসবাসরত যারা মানসম্মত ইসলামি শিক্ষা থেকে বঞ্চিত তাদের জন্য।",
                    }),
                    t({
                      en: "A professional English version is available specifically for English-medium students.",
                      bn: "ইংলিশ মিডিয়াম শিক্ষার্থীদের জন্য রয়েছে পেশাদার ইংরেজি সংস্করণ।",
                    }),
                    t({
                      en: "Perfect for those who wish to combine general education with a strong foundation in Islamic studies.",
                      bn: "যারা সাধারণ শিক্ষার পাশাপাশি ইসলামি শিক্ষায় দৃঢ় ভিত্তি গড়তে চান তাদের জন্য।",
                    }),
                    t({
                      en: "This course is specially designed for students aged 12 to 18 years.",
                      bn: "এই কোর্সটি বিশেষভাবে ১২ থেকে ১৮ বছর বয়সী শিক্ষার্থীদের জন্য ডিজাইন করা হয়েছে।",
                    }),
                    t({
                      en: "Ideal for parents who aspire to raise their children as practicing Muslims.",
                      bn: "যারা তাদের সন্তানকে প্র্যাকটিসিং মুসলিম হিসেবে গড়ে তুলতে চান তাদের জন্য আদর্শ।",
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

              {/* Materials Included */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "Materials Included", bn: "অন্তর্ভুক্ত উপকরণ" })}
                  </h2>
                </div>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse">
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          {t({
                            en: "6 classes per week (2 days)",
                            bn: "সপ্তাহে ২ দিন ৬টি ক্লাস",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.duration}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          {t({
                            en: "Each class 40 minutes",
                            bn: "প্রতিটি ক্লাস ৪০ মিনিট",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classMethod}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          {t({
                            en: "PDF notes for each class",
                            bn: "প্রতিটি ক্লাসের পিডিএফ নোট",
                          })}
                        </td>
                        <td className="py-3 px-4">{programStructure.time}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          {t({
                            en: "Recorded video for each class",
                            bn: "প্রতিটি ক্লাসের রেকর্ডেড ভিডিও",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classesPerWeek}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Curriculum */}
                <h3 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "Curriculum", bn: "পাঠ্যসূচি" })}
                </h3>
                <div className="space-y-4">
                  {semestersData.map((sem, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleSemester(index)}
                        className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 text-left font-bold text-[#002b2b] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          {sem.title}
                        </span>
                        {openSemester === index ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {openSemester === index && (
                        <div className="p-5 bg-white border-t border-gray-200 space-y-3">
                          {sem.videoLink && (
                            <div className="mb-3">
                              <a
                                href={sem.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#00ADD2] font-medium hover:text-[#002b2b] transition-colors border-b border-[#00ADD2] hover:border-[#002b2b] pb-1"
                              >
                                <FaPlayCircle className="text-lg" />
                                <span>
                                  {t({
                                    en: "Watch Video (YouTube)",
                                    bn: "ভিডিও দেখুন (YouTube)",
                                  })}
                                </span>
                              </a>
                            </div>
                          )}
                          <div className="space-y-2">
                            {sem.subjects.map((sub, sIndex) => (
                              <div
                                key={sIndex}
                                className="flex items-start gap-2 text-gray-700 text-sm py-1 border-b border-gray-50 last:border-none"
                              >
                                <span className="text-yellow-500 font-bold">
                                  ✔
                                </span>
                                <span>{sub}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ADMISSION REQUIREMENTS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({
                      en: "ADMISSION REQUIREMENTS",
                      bn: "ভর্তির প্রয়োজনীয়তা",
                    })}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#002b2b]">
                        <th className="py-3 px-4 font-bold">
                          {t({ en: "Requirement", bn: "শর্ত" })}
                        </th>
                        <th className="py-3 px-4 font-bold">
                          {t({ en: "Details", bn: "বিবরণ" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          {t({
                            en: "Minimum Education",
                            bn: "সর্বনিম্ন শিক্ষাগত যোগ্যতা",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          {t({
                            en: "JSC/ SSC /HSC / Alim / A-Levels / Equivalent",
                            bn: "জেএসসি/এসএসসি/এইচএসসি/আলিম/এ-লেভেল/সমতুল্য",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">
                          {t({ en: "Suitable For", bn: "যাদের জন্য উপযুক্ত" })}
                        </td>
                        <td className="py-3 px-4">
                          {t({
                            en: "Students seeking a full-time structured Alimiyah education, working professionals aiming for Deeni knowledge, and those pursuing higher Islamic academia.",
                            bn: "পূর্ণকালীন সুসংগঠিত আলিমিয়াহ শিক্ষা গ্রহণ করতে ইচ্ছুক শিক্ষার্থী, দ্বীনি জ্ঞান অর্জনে আগ্রহী চাকরিজীবী এবং যারা উচ্চতর ইসলামি একাডেমিয়ায় যেতে চান।",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FEE STRUCTURE */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    {t({ en: "FEE STRUCTURE (BDT)", bn: "ফি কাঠামো (বিডিটি)" })}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="py-3 px-4 font-bold text-[#00ADD2] text-lg">
                          {t({ en: "Bangla Version:", bn: "বাংলা ভার্শন:" })}
                        </th>
                        <th className="py-3 px-4 font-bold text-[#00ADD2] text-lg">
                          {t({ en: "English Version:", bn: "ইংলিশ ভার্শন:" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              {t({
                                en: "Admission Fee 2000 TK",
                                bn: "ভর্তি ফি ২০০০ টাকা",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              {t({
                                en: "Admission Fee 3000 TK",
                                bn: "ভর্তি ফি ৩০০০ টাকা",
                              })}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              {t({
                                en: "Semester Fee 4000 TK",
                                bn: "সেমিস্টার ফি ৪০০০ টাকা",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              {t({
                                en: "Semester Fee 12000 TK",
                                bn: "সেমিস্টার ফি ১২০০০ টাকা",
                              })}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Installment Note */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl font-bold text-[#00ADD2]">
                    {t({
                      en: "* Semester fee can be paid through monthly installments.",
                      bn: "* সেমিস্টার ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদানের সুযোগ রয়েছে।",
                    })}
                  </h2>
                </div>
              </div>

              {/* ====== LAST 4 SECTIONS ====== */}

              {/* 1. Why Tarbiyah Alimiyah (updated with Teen-friendly wording) */}
              <div className="bg-gradient-to-br from-white via-white to-white text-black rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    {t({
                      en: "Why Tarbiyah Alimiyah Program?",
                      bn: "কেন তারবিয়াহ আলিমিয়াহ প্রোগ্রাম?",
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

              {/* 3. Video Gallery */}
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

            {/* Right Sidebar */}
            <div className="space-y-4 -mt-[305px]">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={Tarbiyahcourse}
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

              {/* Enrollment Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h1 className="text-2xl font-bold text-[#007a91] mb-5">
                  {t({ en: "ENROLL NOW", bn: "এখনই নিবন্ধন করুন" })}
                </h1>
                <div className="flex items-center justify-center mb-6 relative">
                  <Link to="/course/alemiah/kids/enroll" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>
                  <Link to="/enroll/alemiyah/english-version" className="w-1/2">
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 rounded-r-md hover:opacity-90 transition">
                      {t({ en: "English Version", bn: "ইংরেজি ভার্সন" })}
                    </button>
                  </Link>
                </div>
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
                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Course Level:", bn: "কোর্স লেভেল:" })}
                    </span>
                    <span className="font-bold">
                      {t({ en: "Intermediate", bn: "ইন্টারমিডিয়েট" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">702</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">09/05/2026</span>
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

export default AlimiyahProgramDetails;
