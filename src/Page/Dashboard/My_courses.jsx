import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEllipsisV,
  FaArrowLeft,
  FaVideo,
  FaFilePdf,
  FaQuestionCircle,
  FaAward,
  FaBookOpen,
  FaSpinner,
  FaPlay,
  FaExternalLinkAlt,
  FaTimes,
  FaSync,
} from "react-icons/fa";
import Swal from "sweetalert2";

const API_BASE = "https://api.tarbiyahonline.com/api";

const My_courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);

  // ✅ Video playerrouer
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const t = {
    homeTab: "Home",
    dashboardTab: "Dashboard",
    myCoursesTab: "My Courses",
  };

  // ==================================================
  // ✅ Fetch Campus Data (dynamic multi-identifier)
  // ==================================================
  const fetchCampusData = async () => {
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
      setStudent(studentData);

      // ✅ Try multiple identifiers (studentId first, then _id)
      const identifier =
        studentData.studentId || studentData._id || studentData.id;

      if (!identifier) {
        setError("Student ID পাওয়া যায়নি!");
        setLoading(false);
        return;
      }

      console.log("📡 Fetching campus-data for:", identifier);

      const res = await fetch(
        `${API_BASE}/student/campus-data/${encodeURIComponent(identifier)}`,
      );
      const d = await res.json();

      console.log("📥 Campus data:", d);

      if (d.success) {
        setStudent(d.student);
        setCourses(d.courses || []);

        // ✅ NEW: Fetch student's grades
        try {
          const gradeIdentifier =
            d.student?.studentId || d.student?._id || identifier;
          const gradeRes = await fetch(
            `${API_BASE}/grades/student/${encodeURIComponent(gradeIdentifier)}`,
          );
          const gradeData = await gradeRes.json();
          if (gradeData.success) {
            setStudentGrades(gradeData.grades || []);
            console.log("✅ Grades loaded:", gradeData.grades?.length);
          } else {
            setStudentGrades([]);
          }
        } catch (ge) {
          console.warn("⚠️ Grades fetch failed:", ge);
          setStudentGrades([]);
        }

        // ✅ Update localStorage with fresh
        localStorage.setItem("campusStudentInfo", JSON.stringify(d.student));
      } else {
        setError(d.message || "কোর্স লোড করা যায়নি!");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("সার্ভারে সংযোগ করা যায়নি!");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCampusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCampusData();
  };

  // ==================================================
  // Helpers
  // ==================================================
  const filteredCourses = courses.filter(
    (course) =>
      (course.course || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.batchName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (course.titleEn || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ✅ Course এর জন্য grade খুঁজে বের করা
  const getGradeForCourse = (course) => {
    if (!course) return null;
    return (
      studentGrades.find(
        (g) =>
          String(g.courseId) === String(course.id) ||
          String(g.batchId) === String(course.id),
      ) || null
    );
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("drive.google.com/file/d/")) {
      const id = url.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url;
  };

  // ---------- Loading state ----------
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
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.dashboardTab}
          </Link>
          <Link
            to="/my-courses"
            className="py-3 text-sm font-semibold text-gray-900 border-b-2 border-blue-600"
          >
            {t.myCoursesTab}
          </Link>
        </div>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-[#004d4d] mx-auto" />
            <p className="text-sm text-gray-600 mt-3">কোর্স লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Error state ----------
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
            className="py-3 text-sm font-semibold text-gray-600"
          >
            {t.dashboardTab}
          </Link>
          <Link
            to="/my-courses"
            className="py-3 text-sm font-semibold text-gray-900 border-b-2 border-blue-600"
          >
            {t.myCoursesTab}
          </Link>
        </div>
        <div className="flex items-center justify-center py-32 px-4">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
            <p className="text-red-500 font-bold text-lg mb-2">
              ⚠️ সমস্যা হয়েছে
            </p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate("/campus-login")}
              className="bg-[#004d4d] text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              আবার লগইন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-8">
          <Link
            to="/campus"
            onClick={() => setSelectedCourse(null)}
            className="py-3 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            {t.homeTab}
          </Link>
          <Link
            to="/campus-dashboard"
            onClick={() => setSelectedCourse(null)}
            className="py-3 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            {t.dashboardTab}
          </Link>
          <Link
            to="/my-courses"
            onClick={() => setSelectedCourse(null)}
            className="py-3 text-sm font-semibold text-gray-900 border-b-2 border-blue-600"
          >
            {t.myCoursesTab}
          </Link>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-[#004d4d] hover:text-[#006666] p-2"
          title="Refresh"
        >
          <FaSync className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto py-6 px-4 md:px-12 space-y-6">
        {selectedCourse ? (
          <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm space-y-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-sm font-semibold text-[#004d4d] hover:underline"
            >
              <FaArrowLeft /> Back to Course Overview
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-6">
              <div className="w-full md:w-64 h-32 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.course}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs bg-teal-50 text-[#004d4d] font-bold px-2.5 py-1 rounded border border-teal-100">
                  Instructor: {selectedCourse.instructor || "N/A"}
                </span>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                  {selectedCourse.course || selectedCourse.titleEn}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedCourse.batchName || "Current"} •{" "}
                  {selectedCourse.schedule || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  01 Course Overview & Outcome
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedCourse.outcomeEn || "No description available."}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  Outcome Syllabus
                </h2>
                <pre className="text-xs text-gray-600 font-sans whitespace-pre-line">
                  {`Duration: Current\nSchedule: ${selectedCourse.schedule || "N/A"}\nStatus: ${selectedCourse.status || "N/A"}`}
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Grades */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaAward className="text-[#004d4d]" /> Material / Grad & Exams
                </h2>
                {(() => {
                  const grade = getGradeForCourse(selectedCourse);
                  const rows = [
                    { key: "grad", label: "Grade", value: grade?.grad },
                    {
                      key: "classTest",
                      label: "Class Test",
                      value: grade?.classTest,
                    },
                    {
                      key: "midTerm",
                      label: "Mid Term",
                      value: grade?.midTerm,
                    },
                    {
                      key: "finalExam",
                      label: "Final Exam",
                      value: grade?.finalExam,
                    },
                  ];
                  return (
                    <>
                      <ul className="space-y-2">
                        {rows.map((r) => (
                          <li
                            key={r.key}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs"
                          >
                            <span className="font-medium text-gray-700">
                              {r.label}
                            </span>
                            <span
                              className={`font-bold px-2 py-0.5 rounded ${
                                r.value
                                  ? "text-green-800 bg-green-100"
                                  : "text-gray-500 bg-gray-200"
                              }`}
                            >
                              {r.value || "Pending"}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {grade?.teacher && (
                        <p className="text-[10px] text-gray-500 italic pt-1">
                          👨‍🏫 Teacher: {grade.teacher}
                        </p>
                      )}
                      {grade?.remarks && (
                        <p className="text-[10px] text-gray-500 italic pt-1">
                          💬 {grade.remarks}
                        </p>
                      )}
                      {!grade && (
                        <p className="text-[10px] text-orange-600 italic pt-1 text-center">
                          এখনো grade publish হয়নি
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Module Content */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaBookOpen className="text-[#004d4d]" /> Module Content
                </h2>

                {/* Video Recording */}
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 border-b border-gray-100 text-xs">
                    <FaVideo className="text-red-500 text-sm" />
                    <span className="font-semibold text-gray-700 flex-1">
                      Video Recording
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                      {(selectedCourse.videos || []).length}
                    </span>
                  </div>
                  <div className="p-2 space-y-1.5 max-h-56 overflow-y-auto bg-white">
                    {(selectedCourse.videos || []).length > 0 ? (
                      selectedCourse.videos.map((video, i) => (
                        <button
                          key={video._id || i}
                          onClick={() => {
                            setPlayingVideo(video);
                            setShowVideoPlayer(true);
                          }}
                          className="w-full flex items-center gap-2 p-2 bg-gray-50 hover:bg-red-50 rounded border border-gray-100 text-left transition-all group"
                        >
                          <div className="w-6 h-6 rounded bg-red-100 group-hover:bg-red-500 flex items-center justify-center flex-shrink-0 transition-colors">
                            <FaPlay className="text-red-500 group-hover:text-white text-[8px] ml-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-gray-800 truncate">
                              {video.title || `Video ${i + 1}`}
                            </p>
                            {video.batchName && (
                              <p className="text-[9px] text-gray-500 truncate">
                                {video.batchName}
                                {video.teacher && ` • ${video.teacher}`}
                              </p>
                            )}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-3">
                        <FaVideo className="text-2xl text-gray-300 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-500">
                          এখনো কোনো ভিডিও যোগ করা হয়নি
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* PDF Notes */}
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 border-b border-gray-100 text-xs">
                    <FaFilePdf className="text-blue-500 text-sm" />
                    <span className="font-semibold text-gray-700 flex-1">
                      PDF Notes
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                      {
                        (selectedCourse.materials || []).filter(
                          (m) => m.type === "pdf",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="p-2 space-y-1.5 max-h-40 overflow-y-auto bg-white">
                    {(selectedCourse.materials || []).filter(
                      (m) => m.type === "pdf",
                    ).length > 0 ? (
                      (selectedCourse.materials || [])
                        .filter((m) => m.type === "pdf")
                        .map((pdf) => (
                          <a
                            key={pdf._id}
                            href={pdf.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50 rounded border border-gray-100 transition-all group"
                          >
                            <div className="w-6 h-6 rounded bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <FaFilePdf className="text-blue-500 group-hover:text-white text-[10px]" />
                            </div>
                            <p className="text-[11px] font-semibold text-gray-800 truncate flex-1">
                              {pdf.title}
                            </p>
                            <FaExternalLinkAlt
                              className="text-gray-400 group-hover:text-blue-500 text-[9px]"
                              size={9}
                            />
                          </a>
                        ))
                    ) : (
                      <div className="text-center py-3">
                        <FaFilePdf className="text-2xl text-gray-300 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-500">
                          এখনো কোনো PDF যোগ করা হয়নি
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quiz */}
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 border-b border-gray-100 text-xs">
                    <FaQuestionCircle className="text-green-500 text-sm" />
                    <span className="font-semibold text-gray-700 flex-1">
                      Quiz
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                      {
                        (selectedCourse.materials || []).filter(
                          (m) => m.type === "quiz",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="p-2 space-y-1.5 max-h-40 overflow-y-auto bg-white">
                    {(selectedCourse.materials || []).filter(
                      (m) => m.type === "quiz",
                    ).length > 0 ? (
                      (selectedCourse.materials || [])
                        .filter((m) => m.type === "quiz")
                        .map((quiz) => (
                          <a
                            key={quiz._id}
                            href={quiz.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center gap-2 p-2 bg-gray-50 hover:bg-green-50 rounded border border-gray-100 transition-all group"
                          >
                            <div className="w-6 h-6 rounded bg-green-100 group-hover:bg-green-500 flex items-center justify-center flex-shrink-0">
                              <FaQuestionCircle className="text-green-500 group-hover:text-white text-[10px]" />
                            </div>
                            <p className="text-[11px] font-semibold text-gray-800 truncate flex-1">
                              {quiz.title}
                            </p>
                            <FaExternalLinkAlt
                              className="text-gray-400 group-hover:text-green-500 text-[9px]"
                              size={9}
                            />
                          </a>
                        ))
                    ) : (
                      <div className="text-center py-3">
                        <FaQuestionCircle className="text-2xl text-gray-300 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-500">
                          এখনো কোনো Quiz যোগ করা হয়নি
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                01 Course Overview
              </h1>
              {student && (
                <p className="text-xs text-gray-500 mt-1">
                  👋 স্বাগতম, <strong>{student.name}</strong> — আপনার মোট{" "}
                  <span className="text-[#004d4d] font-bold">
                    {courses.length}
                  </span>{" "}
                  টি কোর্স
                </p>
              )}
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded w-56"
                  />
                </div>
              </div>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">
                  {courses.length === 0
                    ? "🎓 এখনো কোনো কোর্স অ্যাসাইন করা হয়নি!"
                    : "❌ কোনো কোর্স খুঁজে পাওয়া যায়নি!"}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {courses.length === 0
                    ? "Admin আপনার জন্য batch assign করলে এখানে দেখা যাবে।"
                    : "অন্য কিছু দিয়ে সার্চ করুন।"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="h-28 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.course}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 flex items-start justify-between border-t border-gray-100">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-[#004d4d] truncate">
                          {course.course || course.titleEn}
                        </h3>
                        {course.batchName && (
                          <p className="text-[10px] text-blue-600 font-medium mt-0.5 truncate">
                            📚 {course.batchName}
                          </p>
                        )}
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          👨‍🏫 {course.instructor}
                        </p>
                        {course.schedule && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            ⏰ {course.schedule}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-bold">
                            🎬 {course.totalVideos || 0}
                          </span>
                          <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                            📄 {course.totalMaterials || 0}
                          </span>
                          <span className="text-[9px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-bold">
                            🏫 {course.totalClasses || 0}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 p-1">
                        <FaEllipsisV className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Video Player Modal */}
      {showVideoPlayer && playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <FaVideo className="text-red-500 flex-shrink-0" />
                <h3 className="text-sm font-bold text-gray-800 truncate">
                  {playingVideo.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={playingVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
                <button
                  onClick={() => {
                    setShowVideoPlayer(false);
                    setPlayingVideo(null);
                  }}
                  className="text-gray-500 hover:text-gray-800 p-2 rounded hover:bg-gray-100"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={getEmbedUrl(playingVideo.url)}
                  title={playingVideo.title}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default My_courses;
