// src/Page/Campus/Campus_dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEllipsisV,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";

// ✅ Course Image Map — category/title অনুযায়ী আলাদা image
const getCourseImage = (course) => {
  if (course.image && course.image.trim() !== "") return course.image;

  const title = (course.title || course.name || "").toLowerCase();
  const category = (course.category || "").toLowerCase();
  const dept = (course.department || "").toLowerCase();
  const combined = `${title} ${category} ${dept}`;

  // Quran / Hifz / Tajweed
  if (
    combined.includes("quran") ||
    combined.includes("hifz") ||
    combined.includes("tajweed") ||
    combined.includes("nazera") ||
    combined.includes("qaida") ||
    combined.includes("tajwid")
  ) {
    return "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png";
  }

  // Alimiyah / Islamic Studies
  if (
    combined.includes("alimiyah") ||
    combined.includes("alimiya") ||
    combined.includes("islamic") ||
    combined.includes("diploma")
  ) {
    return "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png";
  }

  // Elders / General / Default
  return "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
};

// ✅ Live Calendar Generator
const generateCalendar = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // শনিবার থেকে শুরু (Sat = 0)
  const startWeekday = (firstDay.getDay() + 1) % 7;

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  // আগের মাসের শেষ দিনগুলো
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthLastDay - i,
      currentMonth: false,
    });
  }

  // এই মাসের দিনগুলো
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      currentMonth: true,
      date: new Date(year, month, d),
    });
  }

  // পরের মাসের প্রথম দিনগুলো (fill up to 6 rows = 42 cells)
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      day: i,
      currentMonth: false,
    });
  }

  // 6 rows × 7 days = 42, কিন্তু 5 rows enough হলে 35
  return cells.slice(0, cells.length > 35 ? 42 : 35);
};

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

  // ✅ Live Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Courses fetch
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const studentStr = localStorage.getItem("campusStudentInfo");
        const isLoggedIn = localStorage.getItem("isCampusLoggedIn");

        if (!isLoggedIn || !studentStr) {
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
          // ✅ Smart image assignment
          const list = (data.courses || []).map((c) => ({
            ...c,
            image: getCourseImage(c),
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

  // ✅ Calendar data (memoized)
  const calendarData = useMemo(() => {
    const cells = generateCalendar(currentDate);
    const today = new Date();

    return cells.map((cell) => {
      const isToday =
        cell.currentMonth &&
        cell.date &&
        cell.date.getDate() === today.getDate() &&
        cell.date.getMonth() === today.getMonth() &&
        cell.date.getFullYear() === today.getFullYear();

      return { ...cell, isToday };
    });
  }, [currentDate]);

  // ✅ Month name in EN/BN
  const getMonthName = (date, lang) => {
    const enMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const bnMonths = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    const months = lang === "bn" ? bnMonths : enMonths;
    const year = date.getFullYear();
    const yearStr =
      lang === "bn"
        ? year.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d])
        : year;
    return `${months[date.getMonth()]} ${yearStr}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

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
      routineNote:
        "Please keep an eye on the official notice board to confirm dates related to the routine.",
      recentlyAccessed: "Recently accessed courses",
      calendarTitle: "Calendar",
      allCourses: "All courses",
      newEvent: "New event",
      weekdays: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
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
      routineNote:
        "রুটিন সম্পর্কিত তারিখগুলো নিশ্চিত হওয়ার জন্য অবশ্যই অফিসিয়াল নোটিশ বোর্ডে চোখ রাখুন।",
      recentlyAccessed: "সম্প্রতি অ্যাক্সেস করা কোর্সসমূহ",
      calendarTitle: "ক্যালেন্ডার",
      allCourses: "সব কোর্স",
      newEvent: "নতুন ইভেন্ট",
      weekdays: ["শনি", "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র"],
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
              className="bg-[#004d4d] text-white px-4 py-2 rounded-lg text-sm font-bold"
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
                          onError={(e) => {
                            e.target.src =
                              "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
                          }}
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

            {/* ✅ LIVE CALENDAR */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-3">
                <h2 className="text-sm font-bold text-gray-800">
                  {t.tarbiyahCalendar}
                </h2>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <button
                    onClick={handleToday}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition"
                  >
                    {t.today}
                  </button>
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <span className="min-w-[120px] text-center">
                    {getMonthName(currentDate, language)}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      {t.weekdays.map((day, i) => (
                        <th key={i} className="py-2 font-semibold">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {Array.from({ length: calendarData.length / 7 }).map(
                      (_, rowIdx) => (
                        <tr key={rowIdx}>
                          {calendarData
                            .slice(rowIdx * 7, rowIdx * 7 + 7)
                            .map((cell, colIdx) => (
                              <td key={colIdx} className="py-3">
                                {cell.isToday ? (
                                  <span className="font-bold text-white bg-blue-600 rounded-full w-7 h-7 mx-auto flex items-center justify-center">
                                    {cell.day}
                                  </span>
                                ) : (
                                  <span
                                    className={
                                      cell.currentMonth
                                        ? "text-gray-700"
                                        : "text-gray-300"
                                    }
                                  >
                                    {cell.day}
                                  </span>
                                )}
                              </td>
                            ))}
                        </tr>
                      ),
                    )}
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
                          onError={(e) => {
                            e.target.src =
                              "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
                          }}
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
