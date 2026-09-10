import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaArrowLeft,
  FaVideo,
  FaFilePdf,
  FaQuestionCircle,
  FaClipboardList,
  FaAward,
  FaBookOpen,
  FaEllipsisV,
} from "react-icons/fa";

const Campus = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getCurrentTab = () => {
    if (location.pathname.includes("/campus-dashboard")) return "dashboard";
    if (location.pathname.includes("/my-courses")) return "my-courses";
    return "home";
  };
  const activeTab = getCurrentTab();

  const content = {
    en: {
      homeTab: "Home",
      dashboardTab: "Dashboard",
      myCoursesTab: "My courses",
      homeTitle: "Tarbiyah Campus",
      virtualCampusTitle: "Tarbiyah Campus",
      virtualCampusDesc: "Tarbiyah Virtual Campus & Learning Environment",
      noticeBoard: "Notice Board",
      noNotice: "There are no discussion topics yet in this forum",
      courseOverview: "Course Overview",
      all: "All",
      searchPlaceholder: "Search courses...",
      sortCourse: "Sort by course name",
      cardView: "Card",
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
      completed: "Completed",
      instructor: "Instructor",
    },
    bn: {
      homeTab: "হোম",
      dashboardTab: "ড্যাশবোর্ড",
      myCoursesTab: "আমার কোর্সসমূহ",
      homeTitle: "তারবিয়াহ ক্যাম্পাস",
      virtualCampusTitle: "তারবিয়াহ ক্যাম্পাস",
      virtualCampusDesc:
        "তারবিয়াহ ভার্চুয়াল ক্যাম্পাস ও লার্নিং এনভায়রনমেন্ট",
      noticeBoard: "নোটিশ বোর্ড",
      noNotice: "এই ফোরামে এখনও কোনো আলোচনার বিষয় নেই",
      courseOverview: "কোর্স ওভারভিউ",
      all: "সব",
      searchPlaceholder: "কোর্স খুঁজুন...",
      sortCourse: "কোর্সের নাম অনুযায়ী সাজান",
      cardView: "কার্ড",
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
      completed: "সম্পন্ন",
      instructor: "শিক্ষক",
    },
  };
  const t = content[language];

  const enrolledCourses = [
    {
      id: 1,
      titleEn: "Diploma in Islamic Studies",
      titleBn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
      progress: "75%",
      instructor: "Mufti Abdullah",
      semester: "First Semester",
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
      semester: "First Semester",
      outcomeEn:
        "Memorize the Holy Quran accurately with proper Makhraj, Tajweed, and regular revision under expert supervision.",
      outcomeBn:
        "বিশেষজ্ঞ তত্ত্বাবধানে সঠিক মাখরাজ, তাজবীদ এবং নিয়মিত রিভিশনের মাধ্যমে পবিত্র কুরআন হিফজ সম্পন্ন করুন।",
    },
    {
      id: 3,
      titleEn: "Alemiyah for Kids",
      titleBn: "আলিমিয়াহ ফর কিডস",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
      progress: "90%",
      instructor: "Sheikh Mahmud",
      semester: "First Semester",
      outcomeEn:
        "Build a strong Islamic moral character alongside essential Arabic language and basic Islamic studies designed for kids.",
      outcomeBn:
        "শিশুদের উপযোগী আরবি ভাষা এবং প্রাথমিক ইসলামিক শিক্ষার পাশাপাশি একটি শক্ত ইসলামি নৈতিক চরিত্র গঠন করুন।",
    },
  ];

  const filteredCourses = enrolledCourses.filter((course) => {
    const title = language === "en" ? course.titleEn : course.titleBn;
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* ================= TOP NAVIGATION TABS BAR ================= */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
        <Link
          to="/campus"
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "home" && !selectedCourse
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.homeTab}
        </Link>
        <Link
          to="/campus-dashboard"
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "dashboard"
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.dashboardTab}
        </Link>
        <Link
          to="/my-courses"
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "my-courses"
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.myCoursesTab}
        </Link>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="py-8 px-4 md:px-12 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedCourse ? (
            /* ================= COURSE DETAIL VIEW ================= */
            <motion.div
              key="course-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex items-center gap-2 text-[#004d4d] font-semibold mb-6 hover:underline"
              >
                <FaArrowLeft /> {t.backToCourses}
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-center">
                <div className="lg:col-span-1 h-48 rounded-xl overflow-hidden shadow border border-gray-100">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-2">
                  <span className="bg-teal-50 text-[#004d4d] text-xs font-bold px-3 py-1 rounded-md uppercase border border-teal-100">
                    {t.instructor}: {selectedCourse.instructor}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-2">
                    {language === "en"
                      ? selectedCourse.titleEn
                      : selectedCourse.titleBn}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {selectedCourse.semester} • Progress:{" "}
                    <span className="font-bold text-[#004d4d]">
                      {selectedCourse.progress}
                    </span>{" "}
                    {t.completed}
                  </p>
                </div>
              </div>

              <div className="mb-8 bg-teal-50/40 p-5 rounded-xl border border-teal-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {t.outcomeTitle}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {language === "en"
                    ? selectedCourse.outcomeEn
                    : selectedCourse.outcomeBn}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaAward className="text-[#004d4d]" /> {t.gradeTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        {t.classTest}
                      </span>
                      <span className="text-xs bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded font-bold">
                        A+
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        {t.midTermExam}
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">
                        A
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        {t.finalExam}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                        Pending
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaClipboardList className="text-[#004d4d]" />{" "}
                    {t.materialsTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        Lecture Slide 01
                      </span>
                      <span className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">
                        Download
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        Reference Book PDF
                      </span>
                      <span className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">
                        Download
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaBookOpen className="text-[#004d4d]" /> {t.modulesTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm hover:bg-teal-50/50 cursor-pointer">
                      <FaVideo className="text-red-500 text-sm flex-shrink-0" />
                      <span className="font-medium text-gray-700">
                        {t.videoRecording}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm hover:bg-teal-50/50 cursor-pointer">
                      <FaFilePdf className="text-blue-500 text-sm flex-shrink-0" />
                      <span className="font-medium text-gray-700">
                        {t.pdfNotes}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm hover:bg-teal-50/50 cursor-pointer">
                      <FaQuestionCircle className="text-green-500 text-sm flex-shrink-0" />
                      <span className="font-medium text-gray-700">
                        {t.quizzes}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= HOME VIEW (Course List) ================= */
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {t.homeTitle}
              </h1>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {t.virtualCampusTitle}
                </h2>
                <p className="text-gray-600 text-sm">{t.virtualCampusDesc}</p>
              </div>

              <div className="space-y-3 max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.noticeBoard}
                </h2>
                <div className="bg-[#d2e8ec] text-[#0a4654] p-4 rounded-md text-sm border border-[#bce0e6]">
                  {t.noNotice}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Campus;
