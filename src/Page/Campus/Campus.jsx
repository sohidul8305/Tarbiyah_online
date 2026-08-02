import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserTie,
  FaMapMarkerAlt,
  FaHome,
  FaTachometerAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaBell,
  FaArrowLeft,
  FaVideo,
  FaFilePdf,
  FaQuestionCircle,
  FaClipboardList,
  FaAward,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Campus = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  // ট্যাব স্টেট: "home", "dashboard", "myCourse"
  const [activeTab, setActiveTab] = useState("home");

  // MyCourse থেকে কোনো কোর্সে Continue ক্লিক করলে তার বিস্তারিত দেখানোর জন্য স্টেট
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const content = {
    en: {
      title: "Discover Our Campus",
      subtitle: "Welcome to Tarbiyah Online & Offline Learning Environment",
      offlineTitle: "Physical Campus & Office",
      offlineDesc:
        "Our physical campus provides an interactive and serene environment for students to excel in Islamic and modern education. Experience learning like never before.",
      addressTitle: "Campus Address:",
      address: "40/1, Safa Garden, Mohammadpur - 1207, Dhaka",
      onlineTitle: "Virtual Campus",
      onlineDesc:
        "Experience our state-of-the-art virtual learning management system, live interactive classes, and 24/7 digital resource accessibility from anywhere in the world.",
      facilitiesTitle: "Campus Facilities",
      f1: "Modern Digital Classrooms",
      f2: "Dedicated Student Support",
      f3: "Rich Islamic Library & Resources",
      f4: "Experienced Faculty Members",
      homeTab: "01 Home",
      dashboardTab: "02 Dashboard",
      myCourseTab: "03 MyCourse",
      noticeBoardTitle: "Notice Board",
      academicCalendarTitle: "Academic Calendar",
      courseOverviewTitle: "Course Overview",
      myCoursesTitle: "Enrolled Courses",
      viewDetails: "View Details",
      backToCourses: "Back to My Courses",
      outcomeTitle: "Course Outcome",
      materialsTitle: "Materials",
      modulesTitle: "Module Content",
      gradeTitle: "Grades & Results",
      classTest: "Class Test Score",
      midTermExam: "Mid Term Exam Result",
      finalExam: "Final Exam Result",
      videoRecording: "Video Recording",
      pdfNotes: "PDF Notes & Resources",
      quizzes: "Quizzes",
    },
    bn: {
      title: "আমাদের ক্যাম্পাস",
      subtitle:
        "তারবিয়াহর অনলাইন ও অফলাইন লার্নিং এনভায়রনমেন্টে আপনাকে স্বাগতম",
      offlineTitle: "অফলাইন ক্যাম্পাস ও অফিস",
      offlineDesc:
        "আমাদের শারীরিক ক্যাম্পাস শিক্ষার্থীদের ইসলামি ও আধুনিক শিক্ষায় উৎকর্ষ সাধনের জন্য একটি শান্ত ও উপযোগী পরিবেশ প্রদান করে। আসুন এবং শিক্ষার নতুন অভিজ্ঞতা নিন।",
      addressTitle: "ক্যাম্পাসের ঠিকানা:",
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭, ঢাকা",
      onlineTitle: "ভার্চুয়াল ক্যাম্পাস",
      onlineDesc:
        "বিশ্বের যেকোনো প্রান্ত থেকে আমাদের অত্যাধুনিক ভার্চুয়াল লার্নিং ম্যানেজমেন্ট সিস্টেম, লাইভ ইন্টারেক্টিভ ক্লাস এবং ২৪/৭ ডিজিটাল রিসোর্সের সুবিধা উপভোগ করুন।",
      facilitiesTitle: "ক্যাম্পাসের সুবিধাসমূহ",
      f1: "আধুনিক ডিজিটাল ক্লাসরুম",
      f2: "ডেডিকেটেড স্টুডেন্ট সাপোর্ট",
      f3: "সমৃদ্ধ ইসলামি লাইব্রেরি ও রিসোর্স",
      f4: "অভিজ্ঞ শিক্ষক মণ্ডলী",
      homeTab: "০১ হোম",
      dashboardTab: "০২ ড্যাশবোর্ড",
      myCourseTab: "০৩ আমার কোর্স",
      noticeBoardTitle: "নোটিশ বোর্ড",
      academicCalendarTitle: "একাডেমিক ক্যালেন্ডার",
      courseOverviewTitle: "কোর্স ওভারভিউ",
      myCoursesTitle: "এনরোলকৃত কোর্সসমূহ",
      viewDetails: "বিস্তারিত দেখুন",
      backToCourses: "আমার কোর্সসমূহে ফিরে যান",
      outcomeTitle: "কোর্স আউটকাম",
      materialsTitle: "ম্যাটেরিয়ালস (Materials)",
      modulesTitle: "মডিউল (Module)",
      gradeTitle: "গ্রেড ও ফলাফল (Grades)",
      classTest: "ক্লাস টেস্ট নম্বর",
      midTermExam: "মিড টার্ম পরীক্ষার ফলাফল",
      finalExam: "ফাইনাল পরীক্ষার ফলাফল",
      videoRecording: "ভিডিও রেকর্ডিং",
      pdfNotes: "পিডিএফ নোটস",
      quizzes: "কুইজসমূহ",
    },
  };

  const t = content[language];

  // এনরোলকৃত কোর্সসমূহ (আউটকাম ও কন্টেন্ট সহ)
  const enrolledCourses = [
    {
      id: 1,
      titleEn: "Diploma in Islamic Studies",
      titleBn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
      progress: "75%",
      instructor: "Mufti Abdullah",
      outcomeEn:
        "Gain deep foundational knowledge in Quran, Hadith, Fiqh, and Islamic History with modern academic standards.",
      outcomeBn:
        "আধুনিক একাডেমিক স্ট্যান্ডার্ডসহ কুরআন, হাদিস, ফিকহ এবং ইসলামিক ইতিহাসের ওপর গভীর ও মৌলিক জ্ঞান অর্জন করুন।",
    },
    {
      id: 2,
      titleEn: "Tarbiyah Online Hifz Course",
      titleBn: "তারবিয়াহ অনলাইন হিফজ কোর্স",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
      progress: "40%",
      instructor: "Qari Ibrahim",
      outcomeEn:
        "Memorize the Holy Quran accurately with proper Makhraj, Tajweed, and regular revision under expert supervision.",
      outcomeBn:
        "বিশেষজ্ঞ তত্ত্বাবধানে সঠিক মাখরাজ, তাজবীদ এবং নিয়মিত রিভিশনের মাধ্যমে পবিত্র কুরআন হিফজ সম্পন্ন করুন।",
    },
    {
      id: 3,
      titleEn: "Alemiyah for Kids",
      titleBn: "আলিমিয়াহ ফর কিডস",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
      progress: "90%",
      instructor: "Sheikh Mahmud",
      outcomeEn:
        "Build a strong Islamic moral character alongside essential Arabic language and basic Islamic studies designed for kids.",
      outcomeBn:
        "শিশুদের উপযোগী আরবি ভাষা এবং প্রাথমিক ইসলামিক শিক্ষার পাশাপাশি একটি শক্ত ইসলামি নৈতিক চরিত্র গঠন করুন।",
    },
  ];

  // নোটিশ বোর্ডের ডেটা
  const notices = [
    {
      id: 1,
      date: "August 10, 2026",
      titleEn: "Final Exam Routine Published for Diploma Students.",
      titleBn: "ডিপ্লোমা শিক্ষার্থীদের ফাইনাল পরীক্ষার রুটিন প্রকাশিত হয়েছে।",
    },
    {
      id: 2,
      date: "August 05, 2026",
      titleEn:
        "Online Classes will remain closed on Friday due to maintenance.",
      titleBn:
        "রক্ষণাবেক্ষণের কাজের জন্য আগামী শুক্রবার অনলাইন ক্লাস বন্ধ থাকবে।",
    },
  ];

  const facilities = [
    {
      id: "f1",
      icon: <FaChalkboardTeacher className="text-4xl text-[#004d4d]" />,
    },
    { id: "f2", icon: <MdSupportAgent className="text-4xl text-[#004d4d]" /> },
    { id: "f3", icon: <FaBookOpen className="text-4xl text-[#004d4d]" /> },
    { id: "f4", icon: <FaUserTie className="text-4xl text-[#004d4d]" /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-6 md:px-16 font-sans overflow-hidden">
      {/* টপ ট্যাব ন্যাভবার */}
      {!selectedCourse && (
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-2xl shadow-md border border-gray-200 flex flex-wrap gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-[#004d4d] text-white shadow-lg scale-105"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaHome /> {t.homeTab}
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "dashboard"
                  ? "bg-[#004d4d] text-white shadow-lg scale-105"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaTachometerAlt /> {t.dashboardTab}
            </button>

            <button
              onClick={() => {
                setActiveTab("myCourse");
                setSelectedCourse(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "myCourse"
                  ? "bg-[#004d4d] text-white shadow-lg scale-105"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaGraduationCap /> {t.myCourseTab}
            </button>
          </div>
        </div>
      )}

      {/* ট্যাবের কন্টেন্ট অথবা সিলেক্টেড কোর্সের ডিটেইলস ভিউ */}
      <AnimatePresence mode="wait">
        {/* ================= COURSE DETAIL VIEW ================= */}
        {selectedCourse ? (
          <motion.div
            key="course-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            {/* ব্যাক বাটন */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-[#004d4d] font-bold mb-6 hover:underline"
            >
              <FaArrowLeft /> {t.backToCourses}
            </button>

            {/* কোর্সের ব্যানার এবং নাম */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-center">
              <div className="lg:col-span-1 h-60 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-2">
                <span className="bg-teal-100 text-[#004d4d] text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                  Instructor: {selectedCourse.instructor}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
                  {language === "en"
                    ? selectedCourse.titleEn
                    : selectedCourse.titleBn}
                </h1>
                <p className="text-gray-600 text-lg">
                  Progress:{" "}
                  <span className="font-bold text-[#004d4d]">
                    {selectedCourse.progress}
                  </span>{" "}
                  Completed
                </p>
              </div>
            </div>

            {/* Course Outcome সেকশন */}
            <div className="mb-10 bg-teal-50/60 p-6 rounded-2xl border border-teal-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t.outcomeTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {language === "en"
                  ? selectedCourse.outcomeEn
                  : selectedCourse.outcomeBn}
              </p>
            </div>

            {/* Grades, Materials & Module সেকশন (সবগুলো আলাদা করা হয়েছে) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 1. Grade সেকশন (Grad Class Test, Mid term exam, Final exam) */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaAward className="text-[#004d4d]" /> {t.gradeTitle}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.classTest}
                    </span>
                    <span className="text-xs bg-teal-100 text-[#004d4d] px-2.5 py-1 rounded-full font-bold">
                      A+
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.midTermExam}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full font-bold">
                      A
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.finalExam}
                    </span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-bold">
                      Pending
                    </span>
                  </li>
                </ul>
              </div>

              {/* 2. Materials সেকশন */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaClipboardList className="text-[#004d4d]" />{" "}
                  {t.materialsTitle}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      Lecture Slide 01
                    </span>
                    <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                      Download
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      Reference Book PDF
                    </span>
                    <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                      Download
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      Syllabus Guide
                    </span>
                    <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                      View
                    </span>
                  </li>
                </ul>
              </div>

              {/* 3. Module সেকশন (Video recording, PDF, Quize etc) */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-[#004d4d]" /> {t.modulesTitle}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-300 transition-colors cursor-pointer">
                    <FaVideo className="text-red-500 text-lg flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.videoRecording}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-300 transition-colors cursor-pointer">
                    <FaFilePdf className="text-blue-500 text-lg flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.pdfNotes}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-300 transition-colors cursor-pointer">
                    <FaQuestionCircle className="text-green-500 text-lg flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">
                      {t.quizzes}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* ================= 01 HOME TAB ================= */}
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="bg-teal-100 text-[#004d4d] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 inline-block shadow-sm">
                    Tarbiyah Education
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {t.title}
                  </h1>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* নোটিশ বোর্ড */}
                <div className="max-w-4xl mx-auto mb-16 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <FaBell className="text-2xl text-[#004d4d]" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t.noticeBoardTitle}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div
                        key={notice.id}
                        className="p-4 bg-teal-50/50 border-l-4 border-[#004d4d] rounded-r-xl"
                      >
                        <span className="text-xs font-bold text-[#004d4d] bg-teal-100 px-2.5 py-1 rounded-full">
                          {notice.date}
                        </span>
                        <p className="text-gray-800 font-medium mt-2">
                          {language === "en" ? notice.titleEn : notice.titleBn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ক্যাম্পাস কার্ড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100">
                    <div className="h-2 bg-[#004d4d] w-full"></div>
                    <div className="p-8">
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FaBuilding className="text-2xl text-[#004d4d]" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#004d4d] transition-colors">
                        {t.offlineTitle}
                      </h2>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        {t.offlineDesc}
                      </p>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                        <FaMapMarkerAlt className="text-[#004d4d] mt-1 text-xl flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            {t.addressTitle}
                          </h4>
                          <p className="text-gray-600 text-sm">{t.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100">
                    <div className="h-2 bg-yellow-500 w-full"></div>
                    <div className="p-8">
                      <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FaLaptopCode className="text-2xl text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                        {t.onlineTitle}
                      </h2>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        {t.onlineDesc}
                      </p>
                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">
                            {language === "en"
                              ? "Platform Access:"
                              : "প্লাটফর্ম অ্যাক্সেস:"}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {language === "en"
                              ? "Available 24/7 via Student Portal Login."
                              : "স্টুডেন্ট পোর্টাল লগইন এর মাধ্যমে ২৪/৭ উপলব্ধ।"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* সুবিধাসমূহ */}
                <div className="max-w-6xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      {t.facilitiesTitle}
                    </h3>
                    <div className="w-20 h-1.5 bg-[#004d4d] mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facilities.map((facility) => (
                      <div
                        key={facility.id}
                        className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5 group-hover:bg-[#004d4d] transition-colors duration-300">
                          <div className="group-hover:text-white transition-colors duration-300">
                            {facility.icon}
                          </div>
                        </div>
                        <p className="font-bold text-gray-800 text-lg leading-snug group-hover:text-[#004d4d] transition-colors">
                          {t[facility.id]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= 02 DASHBOARD TAB ================= */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-12"
              >
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <FaCalendarAlt className="text-3xl text-[#004d4d]" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t.academicCalendarTitle}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                      <span className="text-xs font-bold text-[#004d4d] uppercase">
                        Semester Start
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mt-1">
                        September 1, 2026
                      </h4>
                      <p className="text-gray-600 text-sm mt-2">
                        New batch orientation and classes begin.
                      </p>
                    </div>
                    <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                      <span className="text-xs font-bold text-yellow-700 uppercase">
                        Mid-Term Exams
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mt-1">
                        November 15, 2026
                      </h4>
                      <p className="text-gray-600 text-sm mt-2">
                        Online portal assessment test.
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                      <span className="text-xs font-bold text-gray-700 uppercase">
                        Vacation
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mt-1">
                        December 20, 2026
                      </h4>
                      <p className="text-gray-600 text-sm mt-2">
                        Winter break and semester break.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-8 border-b pb-4">
                    <FaGraduationCap className="text-3xl text-[#004d4d]" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t.courseOverviewTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col"
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={course.image}
                            alt={course.titleEn}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <span className="absolute top-3 right-3 bg-[#004d4d] text-white text-xs font-bold px-3 py-1 rounded-full">
                            {course.progress} Completed
                          </span>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-bold text-xl text-gray-900 mb-2">
                            {language === "en"
                              ? course.titleEn
                              : course.titleBn}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Instructor: {course.instructor}
                          </p>
                          <div className="mt-auto">
                            <button
                              onClick={() => setSelectedCourse(course)}
                              className="w-full bg-[#004d4d] text-white py-2.5 rounded-xl font-semibold hover:bg-teal-900 transition-colors"
                            >
                              {t.viewDetails}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= 03 MY COURSE TAB ================= */}
            {activeTab === "myCourse" && (
              <motion.div
                key="myCourse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-8 border-b pb-4">
                  <FaGraduationCap className="text-3xl text-[#004d4d]" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t.myCoursesTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col"
                    >
                      <div className="h-52 overflow-hidden relative">
                        <img
                          src={course.image}
                          alt={course.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {language === "en" ? course.titleEn : course.titleBn}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                          <div
                            className="bg-[#004d4d] h-2.5 rounded-full"
                            style={{ width: course.progress }}
                          ></div>
                        </div>
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-700">
                            Progress: {course.progress}
                          </span>
                          <button
                            onClick={() => setSelectedCourse(course)}
                            className="bg-[#004d4d] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-900 transition-colors"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Campus;
