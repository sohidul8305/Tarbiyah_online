import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaEllipsisV,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Campus_dashboard = () => {
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
      dashboardTitle: "Dashboard",
      courseOverview: "Course Overview",
      all: "All",
      searchPlaceholder: "Search",
      sortLastAccessed: "Sort by last accessed",
      cardView: "Card",
      tarbiyahCalendar: "Tarbiyah Academic Calendar",
      today: "Today",
      monthLabel: "Month",
      monthName: "September 2026",
      routineNote:
        "Please keep an eye on the official notice board to confirm dates related to the routine.",
      recentlyAccessed: "Recently accessed courses",
      calendarTitle: "Calendar",
      allCourses: "All courses",
      newEvent: "New event",
      august: "‹ August",
      september: "September 2026",
      october: "October ›",
      weekdaysBn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekdaysEn: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      firstSemester: "First Semester",
      allam: "Allam",
    },
    bn: {
      homeTab: "হোম",
      dashboardTab: "ড্যাশবোর্ড",
      myCoursesTab: "আমার কোর্সসমূহ",
      dashboardTitle: "ড্যাশবোর্ড",
      courseOverview: "কোর্স ওভারভিউ",
      all: "সব",
      searchPlaceholder: "খুঁজুন",
      sortLastAccessed: "সর্বশেষ অ্যাক্সেস অনুযায়ী সাজান",
      cardView: "কার্ড",
      tarbiyahCalendar: "তারবিয়াহ একাডেমিক ক্যালেন্ডার",
      today: "আজ",
      monthLabel: "মাস",
      monthName: "সেপ্টেম্বর ২০২৬",
      routineNote:
        "রুটিন সম্পর্কিত তারিখগুলো নিশ্চিত হওয়ার জন্য অবশ্যই অফিসিয়াল নোটিশ বোর্ডে চোখ রাখুন।",
      recentlyAccessed: "সম্প্রতি অ্যাক্সেস করা কোর্সসমূহ",
      calendarTitle: "ক্যালেন্ডার",
      allCourses: "সব কোর্স",
      newEvent: "নতুন ইভেন্ট",
      august: "‹ আগস্ট",
      september: "সেপ্টেম্বর ২০২৬",
      october: "অক্টোবর ›",
      weekdaysBn: ["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", "রবি"],
      weekdaysEn: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      firstSemester: "প্রথম সেমিস্টার",
      allam: "আলিম",
    },
  };

  const t = content[language];

  const courses = [
    {
      id: 1,
      code: "DNS 101 (2616)",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 2,
      code: "AQD 101 (2616)",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 3,
      code: "FQH 101 (2616)",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      id: 4,
      code: "ATI 101 (2616)",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 5,
      code: "TAJ 101 (2616)",
      semester: t.firstSemester,
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 6,
      code: "Open Course",
      semester: t.allam,
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  const recentCourses = courses.slice(0, 3);

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
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* PAGE TITLE */}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.dashboardTitle}
            </h1>

            {/* ============ 1. COURSE OVERVIEW SECTION ============ */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                {t.courseOverview}
              </h2>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                    <option>{t.all}</option>
                  </select>
                  <div className="relative">
                    <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-7 pr-3 py-1 text-xs bg-white border border-gray-300 rounded focus:outline-none w-40 sm:w-48"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                    <option>{t.sortLastAccessed}</option>
                  </select>
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                    <option>{t.cardView}</option>
                  </select>
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="h-28 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.code}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between border-t border-gray-100">
                      <div>
                        <h3 className="text-xs font-bold text-[#004d4d] hover:underline cursor-pointer">
                          {course.code}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {course.semester}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <FaEllipsisV className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ 2. TARBIYAH ACADEMIC CALENDAR ============ */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.tarbiyahCalendar}
                </h2>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <button className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
                    {t.today}
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <span>{t.monthName}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaChevronRight className="text-xs" />
                  </button>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                    <option>{t.monthLabel}</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      {t.weekdaysBn.map((day, i) => (
                        <th key={i} className="py-2">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="py-3 text-gray-300">31</td>
                      <td className="py-3">1</td>
                      <td className="py-3">2</td>
                      <td className="py-3">3</td>
                      <td className="py-3 font-bold text-teal-600 bg-teal-50 rounded">
                        4
                      </td>
                      <td className="py-3">5</td>
                      <td className="py-3">6</td>
                    </tr>
                    <tr>
                      <td className="py-3">7</td>
                      <td className="py-3">8</td>
                      <td className="py-3">
                        <span className="font-bold text-white bg-blue-600 rounded-full w-7 h-7 mx-auto flex items-center justify-center">
                          9
                        </span>
                      </td>
                      <td className="py-3">10</td>
                      <td className="py-3">11</td>
                      <td className="py-3">12</td>
                      <td className="py-3">13</td>
                    </tr>
                    <tr>
                      <td className="py-3">14</td>
                      <td className="py-3">15</td>
                      <td className="py-3">16</td>
                      <td className="py-3">17</td>
                      <td className="py-3">18</td>
                      <td className="py-3">19</td>
                      <td className="py-3">20</td>
                    </tr>
                    <tr>
                      <td className="py-3">21</td>
                      <td className="py-3">22</td>
                      <td className="py-3">23</td>
                      <td className="py-3">24</td>
                      <td className="py-3">25</td>
                      <td className="py-3">26</td>
                      <td className="py-3">27</td>
                    </tr>
                    <tr>
                      <td className="py-3">28</td>
                      <td className="py-3">29</td>
                      <td className="py-3">30</td>
                      <td className="py-3 text-gray-300">1</td>
                      <td className="py-3 text-gray-300">2</td>
                      <td className="py-3 text-gray-300">3</td>
                      <td className="py-3 text-gray-300">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-center text-gray-500 pt-2 border-t border-gray-100">
                {t.routineNote}
              </p>
            </div>

            {/* ============ 3. RECENTLY ACCESSED COURSES ============ */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.recentlyAccessed}
                </h2>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs">
                    <FaChevronLeft />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs">
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="h-28 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.code}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between border-t border-gray-100">
                      <div>
                        <h3 className="text-xs font-bold text-[#004d4d]">
                          {course.code}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {course.semester}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <FaEllipsisV className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ 4. BOTTOM CALENDAR WIDGET ============ */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.calendarTitle}
                </h2>
                <div className="flex items-center gap-2">
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                    <option>{t.allCourses}</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium shadow-sm">
                    {t.newEvent}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 px-2">
                <button className="hover:text-blue-600">{t.august}</button>
                <span className="text-sm font-bold text-gray-900">
                  {t.september}
                </span>
                <button className="hover:text-blue-600">{t.october}</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      {t.weekdaysEn.map((day, i) => (
                        <th key={i} className="py-2">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="py-4 text-gray-300">29</td>
                      <td className="py-4 text-gray-300">30</td>
                      <td className="py-4 text-gray-300">31</td>
                      <td className="py-4">1</td>
                      <td className="py-4">2</td>
                      <td className="py-4">3</td>
                      <td className="py-4">4</td>
                    </tr>
                    <tr>
                      <td className="py-4">5</td>
                      <td className="py-4">6</td>
                      <td className="py-4">7</td>
                      <td className="py-4">8</td>
                      <td className="py-4">
                        <span className="font-bold text-white bg-blue-600 rounded-full w-7 h-7 mx-auto flex items-center justify-center">
                          9
                        </span>
                      </td>
                      <td className="py-4">10</td>
                      <td className="py-4">11</td>
                    </tr>
                    <tr>
                      <td className="py-4">12</td>
                      <td className="py-4">13</td>
                      <td className="py-4">14</td>
                      <td className="py-4">15</td>
                      <td className="py-4">16</td>
                      <td className="py-4">17</td>
                      <td className="py-4">18</td>
                    </tr>
                    <tr>
                      <td className="py-4">19</td>
                      <td className="py-4">20</td>
                      <td className="py-4">21</td>
                      <td className="py-4">22</td>
                      <td className="py-4">23</td>
                      <td className="py-4">24</td>
                      <td className="py-4">25</td>
                    </tr>
                    <tr>
                      <td className="py-4">26</td>
                      <td className="py-4">27</td>
                      <td className="py-4">28</td>
                      <td className="py-4">29</td>
                      <td className="py-4">30</td>
                      <td className="py-4 text-gray-300">1</td>
                      <td className="py-4 text-gray-300">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Campus_dashboard;
