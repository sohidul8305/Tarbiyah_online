import React, { useState } from "react";
import { Link } from "react-router-dom";
// Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

import HifzadaltsBannerImg from "../../image/adalthifzbanner.jpg";
import HIfzadaltscoursImg from "../../image/adaltfifzcourse.jpg";
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
  FaClock,
  FaCalendarAlt,
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

const Course_quran_elders_hifz = () => {
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
      name: t({ en: "Sumaiya Afrin Mim", bn: "সুমাইয়া আফরিন মিম" }),
      title: t({ en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" }),
      subtitle: t({ en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" }),
      image: SumaiyaImg,
    },
  ];

  // --- Updated Course Details from About Course.txt ---
  const courseDetails = {
    title: t({
      en: "Surah Al-Baqarah Hifz Course",
      bn: "সূরা বাকারা হিফজ কোর্স",
    }),
    subtitle: t({
      en: "Complete Surah Al-Baqarah Hifz Program",
      bn: "সম্পূর্ণ সূরা বাকারা হিফজ প্রোগ্রাম",
    }),
    description: t({
      en: "Surah Al-Baqarah is the longest surah of the Holy Quran and contains important guidance on faith, worship, manners, family, society, economics, and life management. Memorizing Surah Al-Baqarah is not just about memorizing verses; one of the main goals of this course is to retain the verses in long-term memory through regular Hifz, recitation, revision, and Muraja'ah. Therefore, the course is designed with a combination of daily assigned portions for Hifz, recitation to the teacher, syllabus-based revision, and continuous Muraja'ah.",
      bn: "সূরা বাকারা কুরআনুল কারীমের দীর্ঘতম সূরা এবং এতে রয়েছে ঈমান, ইবাদত, আখলাক, পরিবার, সমাজ, অর্থনীতি ও জীবন পরিচালনার গুরুত্বপূর্ণ দিকনির্দেশনা। সূরা বাকারা হিফজ শুধু আয়াত মুখস্থ করার বিষয় নয়; বরং নিয়মিত হিফজ, তিলাওয়াত, রিভিশন ও মুরাজাআহর মাধ্যমে আয়াতগুলোকে দীর্ঘমেয়াদে স্মরণে রাখা এই কোর্সের অন্যতম লক্ষ্য। তাই শিক্ষার্থীদের জন্য প্রতিদিনের নির্ধারিত অংশ হিফজ, উস্তায/উস্তাযাহকে শুনানো, সিলেবাস অনুযায়ী রিভিশন এবং ধারাবাহিক মুরাজাআহর সমন্বয়ে কোর্সটি সাজানো হয়েছে।",
    }),
    overview: {
      title: t({ en: "Course Overview", bn: "কোর্স ওভারভিউ" }),
      items: [
        t({
          en: "Course Name: Surah Al-Baqarah Hifz",
          bn: "কোর্সের নাম: সূরা বাকারা হিফজ",
        }),
        t({ en: "Duration: 6 months", bn: "সময়কাল: ৬ মাস" }),
        t({ en: "Classes per week: 3 days", bn: "প্রতি সপ্তাহে ক্লাস: ৩ দিন" }),
        t({
          en: "Total classes: 78 (including exams)",
          bn: "মোট ক্লাস: ৭৮টি (পরীক্ষাসহ)",
        }),
        t({
          en: "Per class: 1 hour 30 minutes",
          bn: "প্রতি ক্লাস: ১ ঘণ্টা ৩০ মিনিট",
        }),
        t({
          en: "Total time: Approximately 80 hours",
          bn: "মোট সময়: প্রায় ৮০ ঘণ্টা",
        }),
        t({
          en: "Students: Maximum 15–20 per level",
          bn: "শিক্ষার্থী: প্রতি লেভেলে সর্বোচ্চ ১৫–২০ জন",
        }),
        t({
          en: "Medium: Online Live Classes",
          bn: "মাধ্যম: অনলাইন লাইভ ক্লাস",
        }),
        t({
          en: "Weekly: Assigned Hifz + Revision",
          bn: "প্রতি সপ্তাহে: নির্ধারিত হিফজ + রিভিশন",
        }),
        t({
          en: "Once a week: Advanced Tajweed class",
          bn: "সপ্তাহে ১ দিন: উচ্চতর তাজউইদ ক্লাস",
        }),
      ],
    },
    goalsAndObjectives: t({
      en: "Through this course, students will be able to—\n- Memorize the entire Surah Al-Baqarah consistently\n- Memorize with correct Tajweed and proper pronunciation\n- Develop the habit of regular revision and Muraja'ah\n- Get the opportunity to correct mistakes by reciting Hifz to teachers\n- Have planned repetition to strengthen Hifz for long-term retention",
      bn: "এই কোর্সের মাধ্যমে শিক্ষার্থীদের—\n- ধারাবাহিকভাবে সম্পূর্ণ সূরা বাকারা হিফজে সক্ষম করে তোলা\n- সঠিক তাজউইদ ও শুদ্ধ উচ্চারণের সঙ্গে হিফজ করানো\n- নিয়মিত রিভিশন ও মুরাজাআহর অভ্যাস তৈরি করা\n- উস্তায/উস্তাযাহর কাছে হিফজ শুনিয়ে ভুল সংশোধনের সুযোগ দেওয়া\n- হিফজকে দীর্ঘমেয়াদে মজবুত করার জন্য পরিকল্পিত পুনরাবৃত্তির ব্যবস্থা করা",
    }),
    objectives: [
      t({
        en: "Progress towards memorizing the entire Surah Al-Baqarah",
        bn: "সম্পূর্ণ সূরা বাকারা হিফজ করার লক্ষ্যে এগিয়ে যেতে পারবে",
      }),
      t({
        en: "Learn to memorize the daily assigned portion in a planned manner",
        bn: "প্রতিদিনের নির্ধারিত অংশ পরিকল্পিতভাবে হিফজ করতে শিখবে",
      }),
      t({
        en: "Be able to recite Hifz regularly to the teacher",
        bn: "উস্তায/উস্তাযাহর কাছে নিয়মিত হিফজ শুনাতে পারবে",
      }),
      t({
        en: "Learn the necessary rules of Tajweed alongside Hifz",
        bn: "হিফজের পাশাপাশি তাজউইদের প্রয়োজনীয় নিয়ম শিখবে",
      }),
      t({
        en: "Strengthen Hifz through regular revision and Muraja'ah",
        bn: "নিয়মিত রিভিশন ও মুরাজাআহর মাধ্যমে হিফজ শক্তিশালী করতে পারবে",
      }),
      t({
        en: "Track personal progress according to the assigned syllabus",
        bn: "নির্ধারিত সিলেবাস অনুযায়ী নিজের অগ্রগতি যাচাই করতে পারবে",
      }),
    ],
    targetAudience: [
      t({
        en: "Those who want to memorize the entire Surah Al-Baqarah",
        bn: "যারা সূরা বাকারা সম্পূর্ণ হিফজ করতে চান",
      }),
      t({
        en: "Those who have already memorized some parts and want to complete the rest in a planned manner",
        bn: "যারা ইতোমধ্যে কিছু অংশ হিফজ করেছেন এবং পরিকল্পিতভাবে বাকিটা সম্পন্ন করতে চান",
      }),
      t({
        en: "Those who want to do Hifz under the supervision of a teacher",
        bn: "যারা উস্তাযের তত্ত্বাবধানে হিফজ করতে চান",
      }),
      t({
        en: "Those who want to overcome the problem of forgetting repeatedly through regular Muraja'ah",
        bn: "যারা বারবার ভুলে যাওয়ার সমস্যা কাটিয়ে নিয়মিত মুরাজাআহ করতে চান",
      }),
      t({
        en: "Those who want to memorize Surah Al-Baqarah in a fixed routine despite being busy",
        bn: "যারা ব্যস্ততার মধ্যেও একটি নির্দিষ্ট রুটিনে সূরা বাকারা হিফজ করতে চান",
      }),
      t({
        en: "Those who want to recite the Qur'an correctly with Tajweed",
        bn: "যারা তাজউইদসহ শুদ্ধভাবে কুরআন তিলাওয়াত করতে চান",
      }),
    ],
    features: [
      t({
        en: "6-month planned Hifz syllabus",
        bn: "৬ মাসের পরিকল্পিত হিফজ সিলেবাস",
      }),
      t({
        en: "3 days of live classes per week",
        bn: "সপ্তাহে ৩ দিন লাইভ ক্লাস",
      }),
      t({
        en: "Daily assigned verses for Hifz",
        bn: "প্রতিদিন নির্ধারিত আয়াত হিফজ",
      }),
      t({ en: "Regular Hifz recitation to teacher", bn: "নিয়মিত হিফজ শুনানি" }),
      t({ en: "Syllabus-based revision", bn: "সিলেবাসভিত্তিক রিভিশন" }),
      t({
        en: "Complete Juz revision at specific stages",
        bn: "নির্দিষ্ট পর্যায়ে পুরো পারা রিভিশন",
      }),
      t({ en: "Advanced Tajweed class", bn: "উচ্চতর তাজউইদ ক্লাস" }),
      t({
        en: "Recorded/supportive classes available",
        bn: "রেকর্ডেড/সহায়ক ক্লাসের সুযোগ",
      }),
      t({ en: "Level-based assessments", bn: "লেভেলভিত্তিক মূল্যায়ন" }),
      t({
        en: "Final exam to verify the entire Surah Al-Baqarah",
        bn: "চূড়ান্ত পরীক্ষার মাধ্যমে পুরো সূরা বাকারা যাচাই",
      }),
    ],
    recommendedBooks: [
      t({ en: "Al-Mukhtar fi Hifzil Quran", bn: "আল-মুখতার ফি হিফযিল কুরআন" }),
      t({
        en: "Al-Mukhtar fi Tajweed — Advanced Level",
        bn: "আল-মুখতার ফি তাজউইদ — অ্যাডভান্সড লেভেল",
      }),
      t({ en: "Mushaf: Hifzul Quran", bn: "মুসহাফ: হিফযুল কুরআন" }),
    ],
    classSchedule: t({
      en: "3 days per week\nPossible Time Slots:\n• 6:00 AM – 7:30 AM\n• 9:00 AM – 10:30 AM\n• 3:00 PM – 4:30 PM\n• 8:00 PM – 9:30 PM\nStudents must attend classes according to the assigned batch and schedule.",
      bn: "সপ্তাহে ৩ দিন\nসম্ভাব্য সময়সূচি:\n• সকাল ৬:০০ – ৭:৩০\n• সকাল ৯:০০ – ১০:৩০\n• দুপুর ৩:০০ – ৪:৩০\n• রাত ৮:০০ – ৯:৩০\nব্যাচ ও সময়সূচি অনুযায়ী নির্ধারিত ক্লাসে অংশগ্রহণ করতে হবে।",
    }),
    feeStructure: {
      admission: t({ en: "Admission Fee: ৳1,000", bn: "ভর্তি ফি: ১,০০০ টাকা" }),
      monthly: t({ en: "Monthly Fee: ৳1,000", bn: "মাসিক ফি: ১,০০০ টাকা" }),
      oneTime: {
        title: t({ en: "One-Time Payment", bn: "এককালীন পেমেন্ট" }),
        description: t({
          en: "Pay the full course fee and save ৳500.",
          bn: "এককালীন পেমেন্টে বিশেষ ছাড়: ৫০০ টাকা",
        }),
        regular: "৳৬,০০০",
        discount: "৳৫০০",
        offer: "৳৫,৫০০",
      },
      note: t({
        en: "* Final admission/fee information will be updated according to the current fee determined by the authority.",
        bn: "* ভর্তি/ফি সংক্রান্ত চূড়ান্ত তথ্য কর্তৃপক্ষের নির্ধারিত বর্তমান ফি অনুযায়ী আপডেট করা যাবে।",
      }),
    },
    assessment: t({
      en: "To assess students' progress—\n- Regular Hifz recitation to teacher\n- Syllabus-based revision\n- Level-based assessments\n- Juz-based revision\n- Final exam",
      bn: "শিক্ষার্থীদের অগ্রগতি যাচাইয়ের জন্য—\n- নিয়মিত হিফজ শুনানি\n- সিলেবাসভিত্তিক রিভিশন\n- লেভেলভিত্তিক মূল্যায়ন\n- পারাভিত্তিক রিভিশন\n- চূড়ান্ত পরীক্ষা\nরাখা হয়েছে।",
    }),
    // 26-week syllabus
    syllabus: [
      {
        week: t({ en: "Week 01", bn: "সপ্তাহ ০১" }),
        classes: [
          t({ en: "Class 01 — Verses 1–10", bn: "ক্লাস ০১ — আয়াত ১–১০" }),
          t({ en: "Class 02 — Verses 11–20", bn: "ক্লাস ০২ — আয়াত ১১–২০" }),
          t({ en: "Class 03 — Verses 21–27", bn: "ক্লাস ০৩ — আয়াত ২১–২৭" }),
        ],
      },
      {
        week: t({ en: "Week 02", bn: "সপ্তাহ ০২" }),
        classes: [
          t({ en: "Class 04 — Verses 28–33", bn: "ক্লাস ০৪ — আয়াত ২৮–৩৩" }),
          t({ en: "Class 05 — Verses 34–41", bn: "ক্লাস ০৫ — আয়াত ৩৪–৪১" }),
          t({
            en: "Class 06 — Revision: Verses 1–41",
            bn: "ক্লাস ০৬ — রিভিশন: আয়াত ১–৪১",
          }),
        ],
      },
      {
        week: t({ en: "Week 03", bn: "সপ্তাহ ০৩" }),
        classes: [
          t({ en: "Class 07 — Verses 42–57", bn: "ক্লাস ০৭ — আয়াত ৪২–৫৭" }),
          t({ en: "Class 08 — Verses 58–60", bn: "ক্লাস ০৮ — আয়াত ৫৮–৬০" }),
          t({ en: "Class 09 — Verses 61–62", bn: "ক্লাস ০৯ — আয়াত ৬১–৬২" }),
        ],
      },
      {
        week: t({ en: "Week 04", bn: "সপ্তাহ ০৪" }),
        classes: [
          t({ en: "Class 10 — Verses 63–66", bn: "ক্লাস ১০ — আয়াত ৬৩–৬৬" }),
          t({ en: "Class 11 — Verses 67–71", bn: "ক্লাস ১১ — আয়াত ৬৭–৭১" }),
          t({
            en: "Class 12 — Revision: Verses 42–71",
            bn: "ক্লাস ১২ — রিভিশন: আয়াত ৪২–৭১",
          }),
        ],
      },
      {
        week: t({ en: "Week 05", bn: "সপ্তাহ ০৫" }),
        classes: [
          t({ en: "Class 13 — Verses 72–75", bn: "ক্লাস ১৩ — আয়াত ৭২–৭৫" }),
          t({ en: "Class 14 — Verses 76–81", bn: "ক্লাস ১৪ — আয়াত ৭৬–৮১" }),
          t({ en: "Class 15 — Verses 82–85", bn: "ক্লাস ১৫ — আয়াত ৮২–৮৫" }),
        ],
      },
      {
        week: t({ en: "Week 06", bn: "সপ্তাহ ০৬" }),
        classes: [
          t({ en: "Class 16 — Verses 86–90", bn: "ক্লাস ১৬ — আয়াত ৮৬–৯০" }),
          t({ en: "Class 17 — Verses 91–93", bn: "ক্লাস ১৭ — আয়াত ৯১–৯৩" }),
          t({
            en: "Class 18 — Revision: Verses 72–93",
            bn: "ক্লাস ১৮ — রিভিশন: আয়াত ৭২–৯৩",
          }),
        ],
      },
      {
        week: t({ en: "Week 07", bn: "সপ্তাহ ০৭" }),
        classes: [
          t({ en: "Class 19 — Verses 94–96", bn: "ক্লাস ১৯ — আয়াত ৯৪–৯৬" }),
          t({ en: "Class 20 — Verses 97–101", bn: "ক্লাস ২০ — আয়াত ৯৭–১০১" }),
          t({ en: "Class 21 — Verse 102", bn: "ক্লাস ২১ — আয়াত ১০২" }),
        ],
      },
      {
        week: t({ en: "Week 08", bn: "সপ্তাহ ০৮" }),
        classes: [
          t({ en: "Class 22 — Verses 103–108", bn: "ক্লাস ২২ — আয়াত ১০৩–১০৮" }),
          t({ en: "Class 23 — Verses 109–112", bn: "ক্লাস ২৩ — আয়াত ১০৯–১১২" }),
          t({
            en: "Class 24 — Revision: Verses 94–112",
            bn: "ক্লাস ২৪ — রিভিশন: আয়াত ৯৪–১১২",
          }),
        ],
      },
      {
        week: t({ en: "Week 09", bn: "সপ্তাহ ০৯" }),
        classes: [
          t({ en: "Class 25 — Verses 113–115", bn: "ক্লাস ২৫ — আয়াত ১১৩–১১৫" }),
          t({ en: "Class 26 — Verses 116–121", bn: "ক্লাস ২৬ — আয়াত ১১৬–১২১" }),
          t({ en: "Class 27 — Verses 122–126", bn: "ক্লাস ২৭ — আয়াত ১২২–১২৬" }),
        ],
      },
      {
        week: t({ en: "Week 10", bn: "সপ্তাহ ১০" }),
        classes: [
          t({ en: "Class 28 — Verses 127–130", bn: "ক্লাস ২৮ — আয়াত ১২৭–১৩০" }),
          t({ en: "Class 29 — Verses 131–135", bn: "ক্লাস ২৯ — আয়াত ১৩১–১৩৫" }),
          t({
            en: "Class 30 — Revision: Verses 113–135",
            bn: "ক্লাস ৩০ — রিভিশন: আয়াত ১১৩–১৩৫",
          }),
        ],
      },
      {
        week: t({ en: "Week 11", bn: "সপ্তাহ ১১" }),
        classes: [
          t({ en: "Class 31 — Verses 136–138", bn: "ক্লাস ৩১ — আয়াত ১৩৬–১৩৮" }),
          t({ en: "Class 32 — Verses 139–142", bn: "ক্লাস ৩২ — আয়াত ১৩৯–১৪২" }),
          t({
            en: "Class 33–34 — Complete Juz 1 Revision",
            bn: "ক্লাস ৩৩–৩৪ — প্রথম পারার পূর্ণ রিভিশন",
          }),
        ],
      },
      {
        week: t({ en: "Week 12", bn: "সপ্তাহ ১২" }),
        classes: [
          t({ en: "Class 35 — Verses 143–144", bn: "ক্লাস ৩৫ — আয়াত ১৪৩–১৪৪" }),
          t({ en: "Class 36 — Verses 145–150", bn: "ক্লাস ৩৬ — আয়াত ১৪৫–১৫০" }),
        ],
      },
      {
        week: t({ en: "Week 13", bn: "সপ্তাহ ১৩" }),
        classes: [
          t({ en: "Class 37 — Verses 151–163", bn: "ক্লাস ৩৭ — আয়াত ১৫১–১৬৩" }),
          t({ en: "Class 38 — Verses 164–167", bn: "ক্লাস ৩৮ — আয়াত ১৬৪–১৬৭" }),
          t({ en: "Class 39 — Verses 168–172", bn: "ক্লাস ৩৯ — আয়াত ১৬৮–১৭২" }),
        ],
      },
      {
        week: t({ en: "Week 14", bn: "সপ্তাহ ১৪" }),
        classes: [
          t({ en: "Class 40 — Verses 173–176", bn: "ক্লাস ৪০ — আয়াত ১৭৩–১৭৬" }),
          t({ en: "Class 41 — Verses 177–178", bn: "ক্লাস ৪১ — আয়াত ১৭৭–১৭৮" }),
          t({
            en: "Class 42 — Revision: Verses 143–178",
            bn: "ক্লাস ৪২ — রিভিশন: আয়াত ১৪৩–১৭৮",
          }),
        ],
      },
      {
        week: t({ en: "Week 15", bn: "সপ্তাহ ১৫" }),
        classes: [
          t({ en: "Class 43 — Verses 179–184", bn: "ক্লাস ৪৩ — আয়াত ১৭৯–১৮৪" }),
          t({ en: "Class 44 — Verses 185–186", bn: "ক্লাস ৪৪ — আয়াত ১৮৫–১৮৬" }),
          t({ en: "Class 45 — Verses 187–188", bn: "ক্লাস ৪৫ — আয়াত ১৮৭–১৮৮" }),
        ],
      },
      {
        week: t({ en: "Week 16", bn: "সপ্তাহ ১৬" }),
        classes: [
          t({ en: "Class 46 — Verses 189–195", bn: "ক্লাস ৪৬ — আয়াত ১৮৯–১৯৫" }),
          t({ en: "Class 47 — Verses 196–197", bn: "ক্লাস ৪৭ — আয়াত ১৯৬–১৯৭" }),
          t({
            en: "Class 48 — Revision: Verses 179–197",
            bn: "ক্লাস ৪৮ — রিভিশন: আয়াত ১৭৯–১৯৭",
          }),
        ],
      },
      {
        week: t({ en: "Week 17", bn: "সপ্তাহ ১৭" }),
        classes: [
          t({ en: "Class 49 — Verses 198–200", bn: "ক্লাস ৪৯ — আয়াত ১৯৮–২০০" }),
          t({ en: "Class 50 — Verses 201–205", bn: "ক্লাস ৫০ — আয়াত ২০১–২০৫" }),
          t({ en: "Class 51 — Verses 206–211", bn: "ক্লাস ৫১ — আয়াত ২০৬–২১১" }),
        ],
      },
      {
        week: t({ en: "Week 18", bn: "সপ্তাহ ১৮" }),
        classes: [
          t({ en: "Class 52 — Verses 212–213", bn: "ক্লাস ৫২ — আয়াত ২১২–২১৩" }),
          t({ en: "Class 53 — Verses 214–216", bn: "ক্লাস ৫৩ — আয়াত ২১৪–২১৬" }),
          t({ en: "Class 54 — Verses 217–219", bn: "ক্লাস ৫৪ — আয়াত ২১৭–২১৯" }),
        ],
      },
      {
        week: t({ en: "Week 19", bn: "সপ্তাহ ১৯" }),
        classes: [
          t({ en: "Class 55 — Verses 220–223", bn: "ক্লাস ৫৫ — আয়াত ২২০–২২৩" }),
          t({ en: "Class 56 — Verses 224–228", bn: "ক্লাস ৫৬ — আয়াত ২২৪–২২৮" }),
          t({
            en: "Class 57 — Revision: Verses 198–228",
            bn: "ক্লাস ৫৭ — রিভিশন: আয়াত ১৯৮–২২৮",
          }),
        ],
      },
      {
        week: t({ en: "Week 20", bn: "সপ্তাহ ২০" }),
        classes: [
          t({ en: "Class 58 — Verses 229–231", bn: "ক্লাস ৫৮ — আয়াত ২২৯–২৩১" }),
          t({ en: "Class 59 — Verses 232–234", bn: "ক্লাস ৫৯ — আয়াত ২৩২–২৩৪" }),
          t({ en: "Class 60 — Verses 235–238", bn: "ক্লাস ৬০ — আয়াত ২৩৫–২৩৮" }),
        ],
      },
      {
        week: t({ en: "Week 21", bn: "সপ্তাহ ২১" }),
        classes: [
          t({ en: "Class 61 — Verses 239–245", bn: "ক্লাস ৬১ — আয়াত ২৩৯–২৪৫" }),
          t({ en: "Class 62 — Verses 246–248", bn: "ক্লাস ৬২ — আয়াত ২৪৬–২৪৮" }),
          t({ en: "Class 63 — Verses 249–252", bn: "ক্লাস ৬৩ — আয়াত ২৪৯–২৫২" }),
        ],
      },
      {
        week: t({ en: "Week 22", bn: "সপ্তাহ ২২" }),
        classes: [
          t({
            en: "Class 64 — Revision: Verses 229–252",
            bn: "ক্লাস ৬৪ — রিভিশন: আয়াত ২২৯–২৫২",
          }),
          t({
            en: "Class 65 — Complete Juz 2 Revision",
            bn: "ক্লাস ৬৫ — দ্বিতীয় পারার পূর্ণ রিভিশন",
          }),
          t({ en: "Class 66 — Verses 253–257", bn: "ক্লাস ৬৬ — আয়াত ২৫৩–২৫৭" }),
        ],
      },
      {
        week: t({ en: "Week 23", bn: "সপ্তাহ ২৩" }),
        classes: [
          t({ en: "Class 67 — Verses 258–259", bn: "ক্লাস ৬৭ — আয়াত ২৫৮–২৫৯" }),
          t({ en: "Class 68 — Verses 260–264", bn: "ক্লাস ৬৮ — আয়াত ২৬০–২৬৪" }),
          t({
            en: "Class 69 — Revision: Verses 253–264",
            bn: "ক্লাস ৬৯ — রিভিশন: আয়াত ২৫৩–২৬৪",
          }),
        ],
      },
      {
        week: t({ en: "Week 24", bn: "সপ্তাহ ২৪" }),
        classes: [
          t({ en: "Class 70 — Verses 265–269", bn: "ক্লাস ৭০ — আয়াত ২৬৫–২৬৯" }),
          t({ en: "Class 71 — Verses 270–274", bn: "ক্লাস ৭১ — আয়াত ২৭০–২৭৪" }),
          t({ en: "Class 72 — Verses 275–281", bn: "ক্লাস ৭২ — আয়াত ২৭৫–২৮১" }),
        ],
      },
      {
        week: t({ en: "Week 25", bn: "সপ্তাহ ২৫" }),
        classes: [
          t({ en: "Class 73 — Verse 282", bn: "ক্লাস ৭৩ — আয়াত ২৮২" }),
          t({ en: "Class 74 — Verses 283–286", bn: "ক্লাস ৭৪ — আয়াত ২৮৩–২৮৬" }),
          t({
            en: "Class 75 — Revision: Verses 143–255",
            bn: "ক্লাস ৭৫ — রিভিশন: আয়াত ১৪৩–২৫৫",
          }),
        ],
      },
      {
        week: t({ en: "Week 26", bn: "সপ্তাহ ২৬" }),
        classes: [
          t({
            en: "Class 76 — Revision: Verses 253–286",
            bn: "ক্লাস ৭৬ — রিভিশন: আয়াত ২৫৩–২৮৬",
          }),
          t({
            en: "Class 77 — Exam: Complete Surah Al-Baqarah",
            bn: "ক্লাস ৭৭ — পরীক্ষা: সম্পূর্ণ সূরা বাকারা",
          }),
          t({
            en: "Class 78 — Exam/Assessment: Complete Surah Al-Baqarah",
            bn: "ক্লাস ৭৮ — পরীক্ষা/মূল্যায়ন: সম্পূর্ণ সূরা বাকারা",
          }),
        ],
      },
    ],
    finalGoal: t({
      en: "Final Goal: To strengthen Hifz through complete memorization, revision, and examination of Surah Al-Baqarah.",
      bn: "চূড়ান্ত লক্ষ্য: সম্পূর্ণ সূরা বাকারা হিফজ, রিভিশন ও পরীক্ষার মাধ্যমে হিফজকে সুদৃঢ় করা।",
    }),
    // Keep the original curriculum for backwards compatibility but we'll use syllabus instead
    curriculum: [],
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

  // --- UPDATED TESTIMONIALS (copied from HifzDetail) ---
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

  // --- UPDATED VIDEO GALLERY (correct thumbnails) ---
  const videoGallery = [
    {
      id: 1,
      title: t({ en: "Video 1", bn: "ভিডিও ১" }),
      thumbnail: "https://img.youtube.com/vi/littiXlYWNM/hqdefault.jpg",
      url: "https://youtu.be/littiXlYWNM?si=I5kxLKLLrXdbDe4k",
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
      thumbnail: "https://img.youtube.com/vi/BAdMojqCMLo/hqdefault.jpg", // একই ভিডিও ID – আপনি চাইলে ভিন্ন দিতে পারেন
      url: "https://youtu.be/BAdMojqCMLo?si=KpW88asKgnPVutxP",
    },
    {
      id: 6,
      title: t({ en: "Video 6", bn: "ভিডিও ৬" }),
      thumbnail: "https://img.youtube.com/vi/kRNVmL0QU2Q/hqdefault.jpg", // ঠিক করা হয়েছে
      url: "https://www.youtube.com/watch?v=kRNVmL0QU2Q",
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
        en: "Absolutely. Age is not a barrier to learning and memorizing the Qur'an. This course is specially designed for adults.",
        bn: "অবশ্যই। কুরআন হিফজ করার জন্য বয়স কোনো বাধা নয়। এই কোর্সটি বিশেষভাবে প্রাপ্তবয়স্কদের প্রয়োজন বিবেচনায় তৈরি করা হয়েছে।",
      }),
    },
    {
      question: t({
        en: "What is the main objective of this course?",
        bn: "এই কোর্সের মূল উদ্দেশ্য কী?",
      }),
      answer: t({
        en: "To memorize the Qur'an with proper Tajweed and strengthen Hifz through regular practice.",
        bn: "শুদ্ধ তাজউইদসহ কুরআন মুখস্থ করা এবং নিয়মিত অনুশীলনের মাধ্যমে হিফজকে মজবুত করা।",
      }),
    },
    {
      question: t({
        en: "How long does it take to memorize Surah Al-Baqarah?",
        bn: "সূরা বাকারা হিফজ করতে কত সময় লাগে?",
      }),
      answer: t({
        en: "This is a 6-month program. However, the time may vary depending on the student's ability and time commitment.",
        bn: "এই কোর্সটি ৬ মাসের একটি প্রোগ্রাম। তবে শিক্ষার্থীর সক্ষমতা ও সময়ের উপর ভিত্তি করে সময় পরিবর্তন হতে পারে।",
      }),
    },
    {
      question: t({
        en: "After completing this course, will I be able to become a Hafiz?",
        bn: "কোর্স শেষে আমি কি হাফিজ হতে পারব?",
      }),
      answer: t({
        en: "Yes. After completing this course, you will have memorized Surah Al-Baqarah and will be recognized as a Hafiz for this surah.",
        bn: "হ্যাঁ। এই কোর্সটি সম্পূর্ণ করার পর আপনি সূরা বাকারা মুখস্থ করতে সক্ষম হবেন এবং এই সূরার জন্য হাফিজ হিসেবে স্বীকৃতি পাবেন।",
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
        en: "Our teachers are Ijazah-certified, experienced, and trained in Hifz education. They have been teaching both online and offline for a long time.",
        bn: "আমাদের শিক্ষকবৃন্দ ইজাজাহপ্রাপ্ত, অভিজ্ঞ এবং হিফজ শিক্ষাদানে প্রশিক্ষিত। তাঁরা দীর্ঘদিন ধরে অনলাইন ও অফলাইন উভয় মাধ্যমে পাঠদান করছেন।",
      }),
    },
  ];

  // --- PROSPECTUS LINK ---
  const prospectusLink =
    "https://drive.google.com/file/d/1LYpULIn-55PkHsQY5RxX8XqMJtnseEys/view?usp=sharing";

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
            src={HifzadaltsBannerImg}
            alt={t({
              en: "Surah Al-Baqarah Hifz Banner",
              bn: "সূরা বাকারা হিফজ ব্যানার",
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

              {/* 2. COURSE OVERVIEW (NEW) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {courseDetails.overview.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {courseDetails.overview.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00ADD2] mt-1 font-bold">•</span>
                      <span className="text-[#002b2b]">{item}</span>
                    </div>
                  ))}
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

              {/* 4. EARN A CERTIFICATE */}
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

              {/* 5. Ready To Apply Your Course */}
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

              {/* 6. TARGET AUDIENCE */}
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

              {/* 7. COURSE FEATURES */}
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

              {/* 8. RECOMMENDED BOOKS (NEW) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "Recommended Books", bn: "প্রস্তাবিত বইসমূহ" })}
                </h2>
                <ul className="space-y-2">
                  {courseDetails.recommendedBooks.map((book, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-[#00ADD2] font-bold">•</span>
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 9. COURSE ASSESSMENT (NEW) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "Course Assessment", bn: "কোর্স মূল্যায়ন" })}
                </h2>
                <div className="whitespace-pre-line text-sm text-gray-700">
                  {courseDetails.assessment}
                </div>
              </div>

              {/* 10. 26-WEEK HIFZ SYLLABUS (NEW) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({
                    en: "26-Week Hifz Syllabus",
                    bn: "২৬ সপ্তাহের হিফজ সিলেবাস",
                  })}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {t({
                    en: "Total: 78 classes | 26 weeks | Surah Al-Baqarah verses 1–286",
                    bn: "মোট: ৭৮ ক্লাস | ২৬ সপ্তাহ | সূরা বাকারা ১–২৮৬ আয়াত",
                  })}
                </p>
                <div className="space-y-4">
                  {courseDetails.syllabus.map((week, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSemester(index + 100)}
                        className="w-full flex items-center justify-between p-4 bg-cyan-50 hover:bg-cyan-100 text-left font-bold text-[#002b2b] transition-colors text-sm"
                      >
                        <span>{week.week}</span>
                        {openSemester === index + 100 ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {openSemester === index + 100 && (
                        <div className="p-4 bg-white border-t border-gray-200 space-y-1">
                          {week.classes.map((cls, clsIndex) => (
                            <div
                              key={clsIndex}
                              className="text-sm text-gray-700 py-1 border-b border-gray-50 last:border-none flex items-start gap-2"
                            >
                              <span className="text-[#00ADD2] font-bold">
                                •
                              </span>
                              <span>{cls}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-gray-700">
                  {courseDetails.finalGoal}
                </div>
              </div>

              {/* 11. COURSE FEE */}
              <div>
                <h2 className="text-xl font-bold text-[#00ADD2] mb-4">
                  {t({ en: "COURSE FEE", bn: "কোর্স ফি" })}
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#00ADD2] mt-1" />
                    <span className="block text-[#002b2b] font-medium">
                      {courseDetails.feeStructure.admission}
                    </span>
                  </div>
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
                  <p className="text-xs text-gray-500 italic">
                    {courseDetails.feeStructure.note}
                  </p>
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
                href="https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={HIfzadaltscoursImg}
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
                  <Link to="/course/kids/hifz/enrollbnagla" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 text-xs rounded-l-md hover:opacity-90 transition">
                      {t({ en: "Bangla Version", bn: "বাংলা ভার্সন" })}
                    </button>
                  </Link>
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    {t({ en: "Or", bn: "অথবা" })}
                  </div>
                  <Link to="/enroll/hifz/english-version" className="w-1/2">
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
                        en: "Beginner to Advanced",
                        bn: "শুরু থেকে অ্যাডভান্সড",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Enrolled:", bn: "এনরোল্ড:" })}
                    </span>
                    <span className="font-bold">150</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">
                      {t({ en: "Last Updated:", bn: "শেষ আপডেট:" })}
                    </span>
                    <span className="font-bold">06/09/2026</span>
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

export default Course_quran_elders_hifz;
