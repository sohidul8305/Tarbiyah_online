// src/Page/Campus/Campus_dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEllipsisV,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";

const Campus_dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Courses fetch — শুধু এটাই থাকবে
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const studentStr = localStorage.getItem("campusStudentInfo");
        const isLoggedIn = localStorage.getItem("isCampusLoggedIn");

        if (!isLoggedIn || !studentStr) {
          console.log("⚠️ Not logged in → /campus-login");
          navigate("/campus-login");
          return;
        }

        const studentData = JSON.parse(studentStr);
        if (!isMounted) return;
        setStudent(studentData);

        const studentId = studentData._id || studentData.id;
        if (!studentId) {
          setError("Student ID পাওয়া যায়নি!");
          return;
        }

        const apiUrl = `http://localhost:5000/api/students/my-courses/${studentId}`;
        console.log("📡 Fetching:", apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("📥 Response total:", data.total);

        if (!isMounted) return;

        if (data.success) {
          const list = (data.courses || []).map((c) => ({
            ...c,
            image:
              c.image || "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
          }));
          setCourses(list);
          console.log("✅ Loaded", list.length, "courses");
        } else {
          setError(data.message || "কোর্স লোড করা যায়নি!");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        if (isMounted) setError("সার্ভারে সংযোগ করা যায়নি!");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

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
      welcome: "Welcome",
      noCourses: "No courses assigned yet!",
      noCoursesDesc:
        "Once admin assigns courses to you, they will appear here.",
      loading: "Loading courses...",
      errorTitle: "Something went wrong",
      retry: "Retry / Re-login",
      totalCourses: "Total Courses",
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
      welcome: "স্বাগতম",
      noCourses: "এখনো কোনো কোর্স অ্যাসাইন করা হয়নি!",
      noCoursesDesc: "অ্যাডমিন আপনার জন্য কোর্স অ্যাসাইন করলে এখানে দেখা যাবে।",
      loading: "কোর্স লোড হচ্ছে...",
      errorTitle: "সমস্যা হয়েছে",
      retry: "আবার লগইন করুন",
      totalCourses: "মোট কোর্স",
    },
  };

  const t = content[language];

  const filteredCourses = courses.filter((course) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (course.code || "").toLowerCase().includes(term) ||
      (course.title || "").toLowerCase().includes(term) ||
      (course.name || "").toLowerCase().includes(term)
    );
  });

  const recentCourses = filteredCourses.slice(0, 3);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
          <Link
            to="/campus"
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.homeTab}
          </Link>
          <Link
            to="/campus-dashboard"
            className="py-3 text-sm font-semibold text-gray-900 border-b-2 border-blue-600"
          >
            {t.dashboardTab}
          </Link>
          <Link
            to="/my-courses"
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.myCoursesTab}
          </Link>
        </div>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-[#004d4d] mx-auto" />
            <p className="text-sm text-gray-600 mt-3">{t.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
          <Link
            to="/campus"
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.homeTab}
          </Link>
          <Link
            to="/campus-dashboard"
            className="py-3 text-sm font-semibold text-gray-900 border-b-2 border-blue-600"
          >
            {t.dashboardTab}
          </Link>
          <Link
            to="/my-courses"
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.myCoursesTab}
          </Link>
        </div>
        <div className="flex items-center justify-center py-32 px-4">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
            <p className="text-red-500 font-bold text-lg mb-2">
              ⚠️ {t.errorTitle}
            </p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate("/campus-login")}
              className="bg-[#004d4d] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-900"
            >
              {t.retry}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN RENDER =================
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
        <Link
          to="/campus"
          className={`py-3 text-sm font-semibold ${
            activeTab === "home"
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.homeTab}
        </Link>
        <Link
          to="/campus-dashboard"
          className={`py-3 text-sm font-semibold ${
            activeTab === "dashboard"
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.dashboardTab}
        </Link>
        <Link
          to="/my-courses"
          className={`py-3 text-sm font-semibold ${
            activeTab === "my-courses"
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.myCoursesTab}
        </Link>
      </div>

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
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {t.dashboardTitle}
              </h1>
              {student && (
                <p className="text-sm text-gray-500 mt-1">
                  👋 {t.welcome}, <strong>{student.name}</strong> —{" "}
                  {t.totalCourses}:{" "}
                  <span className="text-[#004d4d] font-bold">
                    {courses.length}
                  </span>
                </p>
              )}
            </div>

            {/* COURSE OVERVIEW */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                {t.courseOverview}
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-md border border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                    <option>{t.all}</option>
                  </select>
                  <div className="relative">
                    <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-7 pr-3 py-1 text-xs bg-white border border-gray-300 rounded w-40 sm:w-48"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                    <option>{t.sortLastAccessed}</option>
                  </select>
                  <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                    <option>{t.cardView}</option>
                  </select>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 font-semibold">
                    🎓 {t.noCourses}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {t.noCoursesDesc}
                  </p>
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 font-semibold">❌ No match</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Try another search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {filteredCourses.map((course) => (
                    <div
                      key={course._id || course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                    >
                      <div className="h-28 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.code || course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex items-center justify-between border-t border-gray-100">
                        <div>
                          <h3 className="text-xs font-bold text-[#004d4d]">
                            {course.code || course.title}
                          </h3>
                          <p className="text-[10px] text-gray-500">
                            {course.title ||
                              course.className ||
                              t.firstSemester}
                          </p>
                        </div>
                        <button className="text-gray-400 p-1">
                          <FaEllipsisV className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CALENDAR */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.tarbiyahCalendar}
                </h2>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <button className="px-2.5 py-1 bg-gray-100 rounded border border-gray-300">
                    {t.today}
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <span>{t.monthName}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaChevronRight className="text-xs" />
                  </button>
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

            {/* RECENTLY ACCESSED */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.recentlyAccessed}
                </h2>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-gray-300 rounded text-xs">
                    <FaChevronLeft />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded text-xs">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              {recentCourses.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">
                  {t.noCourses}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course._id || course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="h-28 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.code || course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex items-center justify-between border-t border-gray-100">
                        <div>
                          <h3 className="text-xs font-bold text-[#004d4d]">
                            {course.code || course.title}
                          </h3>
                          <p className="text-[10px] text-gray-500">
                            {course.title ||
                              course.className ||
                              t.firstSemester}
                          </p>
                        </div>
                        <button className="text-gray-400 p-1">
                          <FaEllipsisV className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Campus_dashboard;
