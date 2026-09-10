import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

const My_courses = () => {
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

  // ============= কনটেন্ট =============
  const content = {
    en: {
      homeTab: "Home",
      dashboardTab: "Dashboard",
      myCoursesTab: "My courses",
      courseOverview: "Course Overview",
      all: "All",
      searchPlaceholder: "Search",
      sortCourse: "Sort by course name",
      cardView: "Card",
      firstSemester: "First Semester",
      alim: "Alim",
    },
    bn: {
      homeTab: "হোম",
      dashboardTab: "ড্যাশবোর্ড",
      myCoursesTab: "আমার কোর্সসমূহ",
      courseOverview: "কোর্স ওভারভিউ",
      all: "সব",
      searchPlaceholder: "খুঁজুন",
      sortCourse: "কোর্সের নাম অনুযায়ী সাজান",
      cardView: "কার্ড",
      firstSemester: "প্রথম সেমিস্টার",
      alim: "আলিম",
    },
  };

  const t = content[language];

  const courses = [
    {
      id: 1,
      code: "DNS 101 (2616)",
      titleEn: "Dawah & Sunnah",
      titleBn: "দাওয়াহ ও সুন্নাহ",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 2,
      code: "AQD 101 (2616)",
      titleEn: "Aqeedah",
      titleBn: "আকীদাহ",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 3,
      code: "ATI 101 (2616)",
      titleEn: "Adabul Talibul Ilm",
      titleBn: "আদাবু ত্বলিবিউল ইলম",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      id: 4,
      code: "FQH 101 (2616)",
      titleEn: "Fiqh",
      titleBn: "ফিকহ",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 5,
      code: "Open Course",
      titleEn: "Open Course",
      titleBn: "ওপেন কোর্স",
      semester: t.alim,
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 6,
      code: "TAJ 101 (2616)",
      titleEn: "Al-Quran Learning/Tajweed",
      titleBn: "আল-কুরআন লার্নিং/তাজবীদ",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const title = language === "en" ? course.titleEn : course.titleBn;
    return (
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "dashboard" && !selectedCourse
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.dashboardTab}
        </Link>
        <Link
          to="/my-courses"
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "my-courses" && !selectedCourse
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
          <motion.div
            key="my-courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900">
              {t.courseOverview}
            </h2>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md border border-gray-300">
                  {t.all}
                </button>
                <div className="relative flex-1 sm:w-64">
                  <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#004d4d]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none">
                  <option>{t.sortCourse}</option>
                </select>
                <select className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none">
                  <option>{t.cardView}</option>
                </select>
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-36 w-full overflow-hidden bg-gray-100 relative">
                    <img
                      src={course.image}
                      alt={course.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-[#004d4d] hover:underline mb-1">
                        {course.code}
                      </h3>
                      <p className="font-medium text-gray-700 text-sm mb-1">
                        {language === "en" ? course.titleEn : course.titleBn}
                      </p>
                      <p className="text-xs text-gray-500">{course.semester}</p>
                    </div>
                    <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <FaEllipsisV className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default My_courses;
