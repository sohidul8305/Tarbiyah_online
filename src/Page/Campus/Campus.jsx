// src/Page/Campus/Campus.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaArrowLeft,
  FaVideo,
  FaFilePdf,
  FaQuestionCircle,
  FaClipboardList,
  FaAward,
  FaBookOpen,
  FaSpinner,
  FaSync,
  FaInfoCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { getCourseImage } from "../../utils/courseImages";

const API_BASE = "https://api.tarbiyahonline.com/api";

const Campus = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Dynamic data
  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses] = useState([]);

  // Language sync
  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fetch campus data
  const fetchCampusData = async () => {
    try {
      const raw =
        localStorage.getItem("campusStudentInfo") ||
        localStorage.getItem("studentInfo");
      if (!raw) {
        console.warn("⚠️ No student info found");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw);
      const studentId = parsed.studentId || parsed._id;
      if (!studentId) {
        setLoading(false);
        return;
      }

      console.log("📥 Fetching campus data for:", studentId);

      const res = await fetch(`${API_BASE}/student/campus-data/${studentId}`);
      const d = await res.json();

      console.log("📥 Campus data:", d);

      if (d.success) {
        setStudentInfo(d.student);
        // ✅ Apply correct image for each course
        const coursesWithImages = (d.courses || []).map((c) => ({
          ...c,
          image: getCourseImage(c),
        }));
        setCourses(coursesWithImages);
        // Update localStorage with fresh data
        localStorage.setItem("campusStudentInfo", JSON.stringify(d.student));
      } else {
        console.warn("⚠️ Campus data fetch failed:", d.message);
      }
    } catch (e) {
      console.error("❌ Fetch error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // ✅ Login check
    const isLoggedIn = localStorage.getItem("isCampusLoggedIn");
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to access the Campus portal.",
        confirmButtonColor: "#00a65a",
      }).then(() => {
        navigate("/campus-login");
      });
      return;
    }

    fetchCampusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCampusData();
  };

  // ============================================================
  // Language Content
  // ============================================================
  const content = {
    en: {
      homeTab: "Home",
      dashboardTab: "Dashboard",
      myCoursesTab: "My Courses",
      homeTitle: "Tarbiyah Campus",
      virtualCampusTitle: "Tarbiyah Campus",
      virtualCampusDesc: "Tarbiyah Virtual Campus & Learning Environment",
      noticeBoard: "Notice Board",
      noNotice: "There are no discussion topics yet in this forum",
      courseOverview: "Course Overview",
      all: "All",
      searchPlaceholder: "Search courses...",
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
      noCourses: "No courses assigned yet",
      noCoursesDesc: "Contact admin to enroll you in a batch",
      loading: "Loading campus data...",
      myEnrolledCourses: "My Enrolled Courses",
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
      backToCourses: "আমার কোর্সসমূহে ফিরে যান",
      outcomeTitle: "কোর্স আউটকাম",
      materialsTitle: "ম্যাটেরিয়ালস",
      modulesTitle: "মডিউল",
      gradeTitle: "গ্রেড ও ফলাফল",
      classTest: "ক্লাস টেস্ট নম্বর",
      midTermExam: "মিড টার্ম পরীক্ষার ফলাফল",
      finalExam: "ফাইনাল পরীক্ষার ফলাফল",
      videoRecording: "ভিডিও রেকর্ডিং",
      pdfNotes: "পিডিএফ নোটস",
      quizzes: "কুইজসমূহ",
      completed: "সম্পন্ন",
      instructor: "শিক্ষক",
      noCourses: "এখনো কোনো কোর্স অ্যাসাইন হয়নি",
      noCoursesDesc: "Admin এর সাথে যোগাযোগ করুন",
      loading: "ক্যাম্পাস ডাটা লোড হচ্ছে...",
      myEnrolledCourses: "আমার এনরোলড কোর্সসমূহ",
    },
  };
  const t = content[language];

  const getCurrentTab = () => {
    if (location.pathname.includes("/campus-dashboard")) return "dashboard";
    if (location.pathname.includes("/my-courses")) return "my-courses";
    return "home";
  };
  const activeTab = getCurrentTab();

  // ✅ Filtered courses
  const filteredCourses = courses.filter((course) => {
    const title = language === "en" ? course.titleEn : course.titleBn;
    return (title || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  // ============================================================
  // Loading
  // ============================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#00a65a] mx-auto mb-3" />
          <p className="text-sm text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* ================= TOP NAVIGATION TABS BAR ================= */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-8">
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

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-[#00a65a] hover:text-[#008d4c] p-2"
          title="Refresh"
        >
          <FaSync className={refreshing ? "animate-spin" : ""} />
        </button>
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
                  {selectedCourse.batchName && (
                    <p className="text-xs text-gray-500 mt-1">
                      📚 Batch: {selectedCourse.batchName}
                    </p>
                  )}
                  {selectedCourse.schedule && (
                    <p className="text-xs text-blue-600 mt-0.5">
                      ⏰ {selectedCourse.schedule}
                    </p>
                  )}
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
                {/* Grades */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaAward className="text-[#004d4d]" /> {t.gradeTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        {t.classTest}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                        Pending
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="font-medium text-gray-700">
                        {t.midTermExam}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                        Pending
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

                {/* Materials */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaClipboardList className="text-[#004d4d]" />{" "}
                    {t.materialsTitle}
                  </h3>
                  {selectedCourse.materials &&
                  selectedCourse.materials.length > 0 ? (
                    <ul className="space-y-2.5">
                      {selectedCourse.materials.slice(0, 5).map((m, i) => (
                        <li
                          key={m._id || i}
                          className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm"
                        >
                          <span className="font-medium text-gray-700 truncate">
                            {m.title}
                          </span>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 font-semibold hover:underline ml-2"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      No materials uploaded yet
                    </p>
                  )}
                </div>

                {/* Modules */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaBookOpen className="text-[#004d4d]" /> {t.modulesTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="flex items-center gap-2.5 font-medium text-gray-700">
                        <FaVideo className="text-red-500 text-sm" />
                        {t.videoRecording}
                      </span>
                      <span className="text-xs bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded font-bold">
                        {selectedCourse.totalVideos || 0}
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="flex items-center gap-2.5 font-medium text-gray-700">
                        <FaFilePdf className="text-blue-500 text-sm" />
                        {t.pdfNotes}
                      </span>
                      <span className="text-xs bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded font-bold">
                        {selectedCourse.materials?.filter(
                          (m) => m.type === "pdf",
                        ).length || 0}
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                      <span className="flex items-center gap-2.5 font-medium text-gray-700">
                        <FaQuestionCircle className="text-green-500 text-sm" />
                        {t.quizzes}
                      </span>
                      <span className="text-xs bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded font-bold">
                        {selectedCourse.materials?.filter(
                          (m) => m.type === "quiz",
                        ).length || 0}
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
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {t.homeTitle}
                  </h1>
                  {studentInfo && (
                    <p className="text-sm text-gray-500 mt-1">
                      Welcome,{" "}
                      <span className="font-semibold text-[#004d4d]">
                        {studentInfo.name}
                      </span>{" "}
                      • ID: {studentInfo.studentId || "N/A"}
                    </p>
                  )}
                </div>
              </div>

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

              {/* ✅ Course List — Dynamic */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t.myEnrolledCourses} ({courses.length})
                  </h2>

                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a65a] outline-none"
                    />
                  </div>
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                    <FaInfoCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-gray-700">
                      {t.noCourses}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.noCoursesDesc}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCourses.map((course, idx) => (
                      <motion.div
                        key={course.id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedCourse(course)}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all"
                      >
                        <div className="h-32 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                            {language === "en"
                              ? course.titleEn
                              : course.titleBn}
                          </h3>
                          <p className="text-[10px] text-gray-500 mb-2">
                            👨‍🏫 {course.instructor}
                          </p>
                          {course.batchName && (
                            <p className="text-[10px] text-blue-600 mb-1">
                              📚 {course.batchName}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-[10px] mb-2">
                            <span className="text-gray-500">
                              Progress: {course.progress}
                            </span>
                            <span
                              className={`font-bold px-2 py-0.5 rounded-full ${
                                course.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {course.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-gray-100">
                            <div className="text-center">
                              <p className="text-[9px] text-gray-500">Videos</p>
                              <p className="text-xs font-bold text-red-600">
                                {course.totalVideos || 0}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-[9px] text-gray-500">
                                Materials
                              </p>
                              <p className="text-xs font-bold text-blue-600">
                                {course.totalMaterials || 0}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-[9px] text-gray-500">
                                Classes
                              </p>
                              <p className="text-xs font-bold text-purple-600">
                                {course.totalClasses || 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Campus;
