import React, { useState } from "react";
import { Link } from "react-router";
import BannerImg from "../../image/diplomacover.png";
import CourseImg from "../../image/diplomathumball.png";
// Swiper এবং প্রয়োজনীয় মডিউল ইমপোর্ট করুন
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
// import AbunomanImg from "../../image/abunoman.jpg";
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
  FaUserTie,
  FaVideo,
  FaHeadset,
  FaCertificate,
  FaGlobe,
  FaPlayCircle,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const DiplomaDetails = () => {
  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  const instructors = [
    {
      id: 1,
      name: "Professor Mokhter Ahmad",
      title: "Chairman, Tarbiyah Academy",
      image: ProfessorImg,
    },
    {
      id: 2,
      name: "Dr. Abu Bakr Muhammad Zakaria",
      title: "Prof. Islamic University, Kushtia",
      subtitle: "Comparative Theology and Aqeedah",
      image: abubakkerImg,
    },
    {
      id: 3,
      name: "Dr. Zubair Ehsanul Haque",
      title: "Department Head, Dhaka University",
      subtitle: "Subject: Arabic Language",
      image: JubairEhsanImg,
    },
    {
      id: 4,
      name: "Dr. Mir Manzoor Mahmud",
      title: "Prof. Manarat Int. University",
      subtitle: "Subject: Seerah and History of Islam",
      image: MonjurImg,
    },
    {
      id: 5,
      name: "Dr. Matiul Islam",
      title: "Bangladesh Islamic University",
      subtitle: "Subject: Hadith Studies",
      image: motiulImg,
    },
    {
      id: 6,
      name: "Dr. Mohammad Obaidullah",
      title: "Bangladesh Islamic University",
      subtitle:
        "School of Arts and Humanities, Manarat International University",
      image: UbadullahImg,
    },
    {
      id: 7,
      name: "Ustad Zakaria Masud",
      title: "Writer, Islamic writer and thinker",
      subtitle: "Subject: Seerah",
      image: JakariyamasudImg,
    },
    {
      id: 8,
      name: "Ustad Hossain Mohammad Hridoy",
      title: "Coordinator",
      subtitle: "Department of Islamic Studies, Tarbiyah Education Network",
      image: Mohammadhidoy,
    },
    {
      id: 9,
      name: "Ustad Abdullah Al Mamun",
      title: "Faculty",
      subtitle: "Tarbiyah Education Network",
      image: AbdullahMamunImg,
    },
    {
      id: 10,
      name: "Ustad Abu Noman",
      title: "Coordinator",
      subtitle: "Department of Quranic Studies, Tarbiyah Education Network",
      // image: AbunomanImg,
    },
  ];

  const semestersData = [
    {
      title: "1st Year - Semester 1",
      subjects: [
        "Qur'anic Studies 01 (Qaʿidah Nūrāniyyah & Principles of Makharij and Sifāt)",
        "Islamic Creed (Aqidah) 01 (Foundations of Tawḥīd)",
        "Islamic Jurisprudence (Fiqh) 01 (Introduction to Fiqh and Madhhab)",
        "Islamic Jurisprudence (Fiqh) 02 (Fiqh of Purification)",
        "Tazkiyah 01 (Ḥilyat Ṭālib al-ʿIlm – Etiquettes of a Student of Knowledge)",
        "Qur'anic Language 01 (Madinah Arabic Reader, Book 01)",
      ],
    },
    {
      title: "1st Year - Semester 2",
      subjects: [
        "Qur'anic Studies 02 (Correct Recitation of the Qur'an – Sūrah al-Baqarah & Juz' ʿAmma)",
        "Islamic Creed (Aqidah) 02 (Tawḥīd al-Asmā' wa al-Ṣifāt)",
        "Hadith Studies 01 (Mustalaḥ al-Ḥadīth – Hadith Terminology)",
        "Islamic Jurisprudence (Fiqh) 03 (Fiqh of Ṣalāh and Ṣiyām)",
        "Islamic History 01 (Sīrah of the Prophet ﷺ – Makkan Period)",
        "Qur'anic Language 02 (Madinah Arabic Reader, Book 02)",
      ],
    },
    {
      title: "1st Year - Semester 3",
      subjects: [
        "Qur'anic Studies 03 (ʿUlūm al-Qur'an & Principles of Understanding the Qur'an)",
        "Hadith Studies 02 (Tadabbur of Hadith – The Ideal Believer)",
        "Islamic Creed (Aqidah) 03 (Articles of Faith – Arkān al-Īmān)",
        "Islamic Jurisprudence (Fiqh) 04 (Fiqh of Zakāh and Ḥajj)",
        "Islamic History 02 (Sīrah of the Prophet ﷺ – Madinan Period)",
        "Qur'anic Language 03 (Madinah Arabic Reader, Book 03)",
      ],
    },
    {
      title: "2nd Year - Semester 4",
      subjects: [
        "Qur'anic Studies 04 (Tafsīr & Tadabbur of Sūrah Yā-Sīn)",
        "Hadith Studies 03 (Imam Nawawi's Forty Hadith – Explanation & Application)",
        "Islamic Creed (Aqidah) 04 (Core Principles of Islamic Belief)",
        "Islamic Jurisprudence (Fiqh) 05 (Fiqh of Marriage and Divorce)",
        "Islamic History 03 (Lives of the Companions – The Rightly Guided Caliphs)",
        "Qur'anic Language 04 (Madinah Arabic Reader, Book 04)",
      ],
    },
    {
      title: "2nd Year - Semester 5",
      subjects: [
        "Qur'anic Studies 05 (Qur'anic Word View – Sūrah al-Naml)",
        "Islamic Creed (Aqidah) 05 (Islamic Sects and World Religions)",
        "Islamic Jurisprudence (Fiqh) 06 (Fiqh of Transactions – Muʿāmalāt)",
        "Islamic History 04 (Lives of the Companions – Faith-Inspired Lives)",
        "Qur'anic Language 05 (Madinah Arabic Reader, Book 05)",
        "Life Hacks 01 (Marital Life, Emotional Intelligence & Conflict Resolution)",
      ],
    },
    {
      title: "2nd Year - Semester 6",
      subjects: [
        "Qur'anic Studies 06 (Tafsīr & Tadabbur of Sūrah al-Kahf)",
        "Islamic Creed (Aqidah) 06 (Islam and Contemporary Ideologies)",
        "Islamic Jurisprudence (Fiqh) 07 (Fiqh of Family & Inheritance Law)",
        "Qur'anic Language 06 (Madinah Arabic Reader, Book 06)",
        "Tazkiyah 02 (Al-Dā' wa al-Dawā' – The Disease and the Cure of the Soul)",
        "Life Hacks 02 (Productive Muslim – Life Philosophy of a Successful Muslim)",
      ],
    },
  ];

  // Program Structure data with proper details
  const programStructure = {
    duration: "2 Years (6 Semesters)",
    classMethod: "Online (Zoom)",
    time: "8:00 PM – 10:00 PM (Bangladesh Time)",
    classesPerWeek: "3 Days (2 Classes per day)",
    sessionsPerSemester: "96 Sessions",
    language: "Bangla (with Arabic & English terminology)",
  };

  // Prospectus PDF link
  const prospectusLink =
    "https://acrobat.adobe.com/id/urn:aaid:sc:ap:6475bc81-d81e-455d-9716-81cdba6bf4f4";

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    window.open(prospectusLink, "_blank");
  };

  // Why Tarbiyah Diploma features
  const whyFeatures = [
    {
      icon: <FaCheckCircle />,
      text: "বিশুদ্ধ আকিদাভিত্তিক পাঠক্রম",
    },
    {
      icon: <FaUserTie />,
      text: "দেশবরেণ্য ইসলামি স্কলার",
    },
    {
      icon: <FaVideo />,
      text: "লাইভ ও রেকর্ডেড ক্লাস",
    },
    {
      icon: <FaHeadset />,
      text: "নিয়মিত একাডেমিক সাপোর্ট",
    },
    {
      icon: <FaCertificate />,
      text: "ইজাযাহ ও সার্টিফিকেট",
    },
    {
      icon: <FaGlobe />,
      text: "বিশ্বের যেকোনো দেশ থেকে অংশগ্রহণ",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "আব্দুল্লাহ আল মামুন",
      designation: "শিক্ষার্থী, ঢাকা",
      quote:
        "আলহামদুলিল্লাহ, এই কোর্সটি আমার ঈমানি দৃঢ়তা ও ইসলামি জ্ঞান বৃদ্ধিতে অসাধারণ ভূমিকা রেখেছে। শিক্ষকদের আন্তরিকতা সত্যিই প্রশংসনীয়।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 2,
      name: "বিবি আয়শা ",
      designation: "প্রবাসী, যুক্তরাজ্য",
      quote:
        "ব্যস্ত জীবনের মাঝেও আমি এই কোর্সটি সম্পন্ন করতে পেরেছি। লাইভ ক্লাস ও রেকর্ডেড ভিডিওগুলোর কারণে সময়ানুবর্তিতা বজায় রাখা সম্ভব হয়েছে।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 3,
      name: "মোঃ হাসান মিয়া",
      designation: "ব্যবসায়ী, চট্টগ্রাম",
      quote:
        "দ্বীনি জ্ঞান অর্জনের পাশাপাশি দৈনন্দিন জীবনে ইসলামি আদব-আখলাক চর্চায় এই কোর্স আমাকে অনেক সাহায্য করেছে।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 4,
      name: "ফাতেমা ",
      designation: "শিক্ষার্থী, সিলেট",
      quote:
        "শায়খ প্রফেসর মোখতার আহমাদের তত্ত্বাবধানে পড়ার সুযোগ পাওয়া আমার জন্য একটি বড় প্রাপ্তি। কারিকুলাম অত্যন্ত সুসংগঠিত।",
      image:
        "https://i.ibb.co.com/wZ84kzn4/hijab-woman-no-face-photo-avatar-free-vector.jpg",
    },
    {
      id: 5,
      name: "মোঃ নাজমুল হক",
      designation: "চাকরিজীবী, রাজশাহী",
      quote:
        "সপ্তাহে মাত্র ৩ দিন ক্লাস থাকায় চাকরির সাথে তাল মিলিয়ে পড়াশোনা করতে পারছি। একাডেমিক সাপোর্ট দল সবসময় পাশে আছে।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
    {
      id: 6,
      name: "মোঃ ইব্রাহিম খলিল",
      designation: "শিক্ষার্থী, খুলনা",
      quote:
        "ইজাজাহ ও সার্টিফিকেট পাওয়ার সুযোগ এই ডিপ্লোমাকে আরও মূল্যবান করেছে। ইনশাআল্লাহ, উচ্চশিক্ষার পথ সুগম হবে।",
      image:
        "https://i.ibb.co.com/gZv5KDDx/images-q-tbn-ANd9-Gc-Tge-GIm6kq-Fp3x-NYHpqsl89ua-z2-JOR-Gy-XIYu-Gy-THG3-Q-s-10.jpg",
    },
  ];

  // Video Gallery Data
  const videoGallery = [
    {
      id: 1,
      title: "ভিডিও ১",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
    {
      id: 2,
      title: "ভিডিও ২",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
    {
      id: 3,
      title: "ভিডিও ৩",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
    {
      id: 4,
      title: "ভিডিও ৪",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
    {
      id: 5,
      title: "ভিডিও ৫",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
    {
      id: 6,
      title: "ভিডিও ৬",
      thumbnail: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg",
      url: "https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "ডিপ্লোমা প্রোগ্রামটি কাদের জন্য?",
      answer:
        "এই প্রোগ্রামটি নারী-পুরুষ সকলের জন্য উন্মুক্ত। শিক্ষার্থী, চাকরিজীবী, ব্যবসায়ী, প্রবাসী এবং দ্বীনি জ্ঞানচর্চায় আগ্রহী যে কেউ এতে অংশগ্রহণ করতে পারবেন।",
    },
    {
      question: "এই প্রোগ্রামে কী কী বিষয় পড়ানো হবে?",
      answer:
        "আকীদাহ, ফিকহ, হাদিস, তাফসির, সীরাহ, উসূলুল ফিকহ, ইসলামের ইতিহাস, আরবি ভাষা, দাওয়াহ, আদব-আখলাকসহ একজন প্রাকটিসিং মুসলিম ও দায়ী হিসেবে গড়ে ওঠার জন্য প্রয়োজনীয় বিষয়সমূহ ধাপে ধাপে পড়ানো হবে।",
    },
    {
      question: "ওস্তাদগণের সম্পর্কে জানতে চাই।",
      answer:
        "আমাদের শিক্ষকবৃন্দ দেশের স্বনামধন্য বিশ্ববিদ্যালয়ের ইসলামিক স্কলার ও এক ঝাঁক তরুণ আলেম। তাঁরা নিজ নিজ বিষয়ে দক্ষ এবং দীর্ঘদিন ধরে দ্বীনি শিক্ষা ও গবেষণার সঙ্গে সম্পৃক্ত।",
    },
    {
      question: "এটি কত বছরের প্রোগ্রাম?",
      answer:
        "এটি একটি ২ বছর মেয়াদি ডিপ্লোমা প্রোগ্রাম, যা ধাপে ধাপে ৬ সেমিস্টারে পরিচালিত হয়।",
    },
    {
      question: "ক্লাসগুলো কীভাবে পরিচালিত হয়?",
      answer:
        "লাইভ অনলাইন ক্লাস, রেকর্ডেড ভিডিও, ক্লাস নোট, নিয়মিত মূল্যায়ন এবং শিক্ষক-শিক্ষার্থীর সমন্বিত সাপোর্ট সিস্টেমের মাধ্যমে পাঠদান পরিচালিত হয়।",
    },
    {
      question: "আপনাদের কোর্স ফি তুলনামূলক বেশি কেন?",
      answer:
        "আমরা শুধু ভিডিও কোর্স প্রদান করি না; দেশের স্বনামধন্য বিশ্ববিদ্যালয়ের ইসলামিক স্কলার, উন্নত কারিকুলাম, নিয়মিত মূল্যায়ন, লাইভ ক্লাস, একাডেমিক সাপোর্ট এবং মানসম্মত শিক্ষা নিশ্চিত করি। এই সমন্বিত ব্যবস্থার কারণেই কোর্সের মান বজায় রাখা সম্ভব হয়।",
    },
    {
      question: "এই কোর্সের আউটকাম কী?",
      answer:
        "শিক্ষার্থীরা ইসলাম সম্পর্কে সুসংগঠিত জ্ঞান অর্জন করবে, ব্যক্তিগত ও পারিবারিক জীবনে তা বাস্তবায়ন করতে পারবে এবং দাওয়াহ ও দ্বীনি খেদমতের জন্য প্রয়োজনীয় ভিত্তি তৈরি হবে।",
    },
    {
      question: "কোর্স শেষে সার্টিফিকেট দেওয়া হবে কি?",
      answer:
        "হ্যাঁ। সফলভাবে কোর্স সম্পন্নকারীদের Tarbiyah Online Madrasah-এর পক্ষ থেকে সার্টিফিকেট প্রদান করা হবে।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/diploma"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">ডিপ্লোমা পেজে ফিরে যান</span>
          </Link>

          {/* Hero Section */}
          <img
            src={BannerImg}
            alt="Diploma Banner"
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center gap-4 py-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaShare className="text-lg" />
                <span className="font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaBookmark className="text-lg" />
                <span className="font-medium">Wishlist</span>
              </button>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-[#007a91] mb-3">
              Diploma In Islamic Studies
            </h1>

            {/* Course Info & Reviews Tabs */}
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
                <span>Course Info</span>
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
                <span>Reviews</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-center">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>

          {/* Main Content Layout: Left 2 Columns, Right 1 Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* ABOUT COURSE */}
              <div className="p-8 mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ABOUT COURSE
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Men bear an immense responsibility in the formation of family,
                  society, and civilization. Within them lie the strengths of
                  leadership, wisdom, decisiveness, and a commitment to
                  establishing justice. However, amid the chaotic currents of
                  modern life, these fundamental qualities often fade due to a
                  lack of proper knowledge and a growing distance from the firm
                  foundation of faith (Iman). Now is the time to return to the
                  roots—to rebuild oneself through the integration of authentic
                  knowledge, a clear framework, and faith-driven consciousness.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mt-4">
                  Tarbiyah Online's "Men's Diploma in Islamic Studies" is an
                  academic journey designed to revive this sense of dignity and
                  responsibility. This program is not merely a diploma; rather,
                  it is a structured framework for shaping the character of a
                  responsible Muslim man. Through authentic Islamic teachings,
                  students are given the opportunity to reconstruct their
                  personality, intellect, and leadership skills. Through this
                  program, Tarbiyah Online opens a knowledge-based horizon for
                  men—one where a bridge of balance is formed between deen and
                  dunya, and where students emerge as enlightened guides for
                  their families, society, and the Ummah.
                </p>
              </div>

              {/* EARN A CERTIFICATE */}
              <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2">
                    EARN A CERTIFICATE
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add this certificate to your resume to demonstrate your
                    skills & increase your chances of getting noticed.
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                  Selected template preview
                </div>
              </div>

              {/* Ready To Apply Your Course */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    Ready To Apply Your Course
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enroll now and start your structured learning journey.
                  </p>
                </div>
                <Link to="/admission-now">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    Start Now
                  </button>
                </Link>
              </div>

              {/* WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    WHAT YOU WILL GAIN
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The <strong>Men's Diploma in Islamic Studies</strong> is a
                  comprehensive two-year online program, specially designed for
                  men—enabling them to pursue institutional Islamic education
                  from home, even amid busy and responsibility-filled lives.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This is not merely a course; it is a{" "}
                  <strong>
                    bridge between self-development, leadership, and academic
                    excellence
                  </strong>
                  .
                </p>
                <p className="text-gray-700 font-semibold text-[#002b2b]">
                  Program Slogan: "Seminary to Academia; Diploma to Honours"
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Upon successful completion of this diploma, students will be
                  eligible for{" "}
                  <strong>direct university credit transfer</strong> and may
                  enroll in a <strong>B.A. (Honours) in Islamic Studies</strong>{" "}
                  program.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  In essence, a student will obtain{" "}
                  <strong>
                    two internationally recognized academic credentials
                  </strong>
                  :
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 pl-2">
                  <li>
                    A <strong>Diploma in Islamic Studies</strong> from Tarbiyah
                    Online
                  </li>
                  <li>
                    Eligibility for{" "}
                    <strong>
                      credit transfer toward a B.A. (Honours) in Islamic Studies
                    </strong>{" "}
                    in the future
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  As a result, students will be able to progress step by step
                  toward{" "}
                  <strong>Honours, Master's, MPhil, and PhD levels</strong>, in
                  shā' Allāh.
                </p>
              </div>

              {/* MISSION */}
              <div className="bg-gradient-to-br from-[#002b2b] to-[#003d3d] rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">MISSION</h2>
                </div>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span> To
                    provide men with simple, structured, and institutional
                    Islamic education, from foundational to advanced levels
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>{" "}
                    Memorizing and explaining authentic hadiths
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span>{" "}
                    Learning about the correct creed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">»</span> Acquire
                    reading, writing and speaking skills in Arabic
                  </li>
                </ul>
              </div>

              {/* VISION */}
              <div className="bg-gradient-to-br from-[#003d3d] to-[#004d4d] rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">VISION</h2>
                </div>
                <p className="text-white leading-relaxed">
                  "To empower Muslim men through authentic Islamic education,
                  moral integrity, and intellectual excellence—so that they may
                  serve as guardians within their families, representatives of
                  justice in society, and carriers of light and goodness within
                  the Ummah."
                </p>
              </div>

              {/* KEY FEATURES OF THE PROGRAM */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    KEY FEATURES OF THE PROGRAM
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    "Fully online program with live, interactive classes",
                    "Instruction under the supervision of experienced local and international Islamic scholars",
                    "Curriculum structured in alignment with university B.A. (Honours) in Islamic Studies frameworks",
                    "Opportunity to progress from Diploma to higher academic degrees",
                    "Specialized courses in Qur'an, Hadith, Fiqh, Aqidah, Sirah, Arabic, along with personal development, entrepreneurship, business, management, leadership, and skill development tailored for men",
                    "Regular homework, midterm, and final examinations",
                    "Access to class recordings, group study sessions, and personal counseling",
                    "Motivational and spiritual sessions",
                    "Scholarship opportunities",
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

              {/* PROGRAM STRUCTURE */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    PROGRAM STRUCTURE
                  </h2>
                </div>

                {/* Program Structure Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#00ADD2]">
                        <th className="py-3 px-4 font-bold">Item</th>
                        <th className="py-3 px-4 font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">Duration</td>
                        <td className="py-3 px-4">
                          {programStructure.duration}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          Class Method
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classMethod}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">Time</td>
                        <td className="py-3 px-4">{programStructure.time}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          Classes per Week
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classesPerWeek}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          Sessions per Semester
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.sessionsPerSemester}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">
                          Language of Instruction
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.language}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Curriculum Section */}
                <h3 className="text-xl font-bold text-[#00ADD2] mb-4">
                  Curriculum
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
                        <div className="p-5 bg-white border-t border-gray-200 space-y-2">
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
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* WHAT STUDENTS WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    WHAT STUDENTS WILL GAIN
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span> A
                    strong foundation in Islamic knowledge based on the Qur'an
                    and authentic (Ṣaḥīḥ) Hadith
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span> Firm
                    grounding in Aqidah, Fiqh, Adab, and Akhlaq
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span> An
                    Islamic perspective on women and family life
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>{" "}
                    Understanding the relevance of Islamic thought in the modern
                    world
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">»</span>{" "}
                    Academic preparation for higher education
                  </li>
                </ul>
              </div>

              {/* ADMISSION REQUIREMENTS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ADMISSION REQUIREMENTS
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#002b2b]">
                        <th className="py-3 px-4 font-bold">Requirement</th>
                        <th className="py-3 px-4 font-bold">Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          Minimum Education
                        </td>
                        <td className="py-3 px-4">
                          HSC / Alim / A-Levels / Equivalent
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">
                          Suitable For
                        </td>
                        <td className="py-3 px-4">
                          Working men, professionals, expatriate men, and those
                          planning higher Islamic studies
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FEE STRUCTURE (BDT) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#002b2b]">
                    FEE STRUCTURE (BDT)
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#00ADD2]">
                        <th className="py-3 px-4 font-bold">Item</th>
                        <th className="py-3 px-4 font-bold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="py-3 px-4 font-semibold">
                          Per Semester Fee
                        </td>
                        <td className="py-3 px-4">12,000 TK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SCHOLARSHIP OPPORTUNITIES */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    SCHOLARSHIP OPPORTUNITIES
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Need- and merit-based scholarships are available for
                  academically talented and financially disadvantaged students.
                  (Funded through donations and Zakat funds)
                </p>
              </div>

              {/* ADMISSION PROCESS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ADMISSION PROCESS
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Apply online at:{" "}
                      <a
                        href="http://www.tarbiyahonline.com/apply"
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 underline hover:text-teal-800"
                      >
                        www.tarbiyahonline.com/apply
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Upload required documents (certificates, photograph, ID)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Receive confirmation email and class access links
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Academic session begins through an orientation class
                    </span>
                  </div>
                </div>
              </div>

              {/* ASSESSMENT & CERTIFICATION */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ASSESSMENT & CERTIFICATION
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Evaluation based on class performance, homework, and
                      attendance
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Midterm and final examinations (written + oral)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Certificate awarded upon successful completion of the
                      diploma
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students will receive Diploma Certificates from Tarbiyah
                      Online and the affiliated university
                    </span>
                  </div>
                </div>
              </div>

              {/* CODE OF CONDUCT & ACADEMIC POLICY */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    CODE OF CONDUCT & ACADEMIC POLICY
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Attendance target: 95%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students who miss classes may complete lessons via
                      recorded sessions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Confidentiality of students, teachers, and content must be
                      strictly maintained
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Sharing class recordings or materials without permission
                      is prohibited
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Maintaining academic integrity and ethical standards is
                      mandatory
                    </span>
                  </div>
                </div>
              </div>

              {/* OTHER PROGRAMS & ACTIVITIES */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    OTHER PROGRAMS & ACTIVITIES
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Tarbiyah Academy offers various courses under two academic
                      divisions:
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Alimiyyah Studies and Qur'an Studies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      In addition to academic programs, cultural and educational
                      activities are arranged to nurture children's intellectual
                      and cognitive development
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Availability of subject-based recorded courses</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Separate Bangla and English versions for Bangla- and
                      English-speaking students
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Special counseling programs to enhance students' moral and
                      character development
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Parenting courses aimed at increasing parental awareness
                      and responsibility
                    </span>
                  </div>
                </div>
              </div>

              {/* INSTITUTIONAL POLICY STATEMENT */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    INSTITUTIONAL POLICY STATEMENT
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Tarbiyah Academy firmly believes in positivity and
                  inclusivity. Equal opportunities, facilities, and rights are
                  ensured for all students in both academic and co-curricular
                  matters. Recognizing that students have diverse needs,
                  Tarbiyah Academy remains committed to addressing those needs
                  responsibly.
                </p>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      All students are treated with fairness and equality
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Support is provided in matters of education and character
                      building
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students are encouraged to maintain a positive and
                      proactive role
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students unable to attend live classes may complete
                      lessons through class recordings
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Student success is recognized and evaluated</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Student needs are always treated with utmost importance
                    </span>
                  </div>
                </div>
              </div>

              {/* DISCIPLINE & ATTENDANCE REGULATIONS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    DISCIPLINE & ATTENDANCE REGULATIONS
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Tarbiyah Academy is committed to delivering quality
                      education and believes that regular attendance is a
                      prerequisite for academic excellence.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>Attendance in all classes is mandatory</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Class links will be shared in the WhatsApp group at least
                      30 minutes before class
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students must join before the scheduled start time
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Joining 10 minutes after the scheduled time will be
                      considered late
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Regular and disciplined students will receive proper
                      academic evaluation
                    </span>
                  </div>
                </div>
              </div>

              {/* HOMEWORK & ASSIGNMENTS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    HOMEWORK & ASSIGNMENTS
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Education is not limited to classroom instruction alone.
                      Recognizing the diverse means of learning, Tarbiyah
                      Academy provides students with various academic activities
                      and processes.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students will have regular homework, assignments, and
                      tasks
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      All activities will be assessed and evaluated as part of
                      academic performance
                    </span>
                  </div>
                </div>
              </div>

              {/* GENERAL E-SAFETY POLICY */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    GENERAL E-SAFETY POLICY
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>All classes are conducted online via Zoom Cloud</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students must attend classes from a quiet and suitable
                      environment
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Audio and video controls will remain with the instructors
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Classes will be recorded for official and promotional
                      purposes, and copyright will remain solely with Tarbiyah
                      Academy
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Recorded lectures, lesson sheets, presentations, and
                      worksheets may be used only for academic purposes
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Sharing, transferring, or publishing materials without
                      permission is strictly prohibited
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Disclosure of any personal information of teachers, staff,
                      students, or guardians is considered an offense
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">➪</span>
                    <span>
                      Students must not share their ID/password or class links
                      with anyone
                    </span>
                  </div>
                </div>
              </div>

              {/* ========== LAST 4 SECTIONS ========== */}

              {/* 1. কেন তারবিয়াহ ডিপ্লোমা ইন ইসলামিক স্ট্রাডিজ ? */}
              <div className="bg-gradient-to-br text-black rounded-3xl shadow-2xl p-6 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#00ADD2]">
                    কেন তারবিয়াহ ডিপ্লোমা ইন ইসলামিক স্ট্রাডিজ ?
                  </h2>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {whyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition-all shadow-md"
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
                    ভিডিও গ্যালারি
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
                  <h2 className="text-2xl font-bold text-[#00ADD2]">FAQ</h2>
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
                        <span className="font-bold text-[#002b2b]">
                          {index + 1}. {faq.question}
                        </span>
                        {openSemester === `faq-${index}` ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {openSemester === `faq-${index}` && (
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
              {/* YouTube Video Thumbnail */}
              <a
                href="https://youtu.be/fSj6hz-j7Ok?si=QBGUyETeILDQ5lK1"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={CourseImg}
                  alt="Course Video"
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
              <div className="bg-white rounded-3xl text-center">
                <div className="text-3xl font-bold text-[#002b2b] mb-4">
                  ৳ 12,000
                </div>
                <Link to="/course/diploma/enroll">
                  <button className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-3 rounded-xl shadow-md transition-all mb-4">
                    Enroll Now
                  </button>
                </Link>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-semibold py-3 rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                >
                  <FaDownload /> Prospectus
                </button>
              </div>

              {/* Instructors List - No Scroll */}
              <div className="bg-white rounded-3xl">
                <h3 className="text-xl font-bold text-[#002b2b] mb-4 border-b pb-2">
                  ফ্যাকাল্টি
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

export default DiplomaDetails;
