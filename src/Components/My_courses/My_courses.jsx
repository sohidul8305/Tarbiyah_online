// src/Page/Campus/My_courses.jsx
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
} from "react-icons/fa";

// ✅ API Base URL — deploy হলে "https://api.tarbiyahonline.com" করুন
const API_BASE = "http://localhost:5010";

const My_courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);

  // ✅ Video states
  const [courseVideos, setCourseVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  // ✅ Course Image Map
  const getCourseImage = (course) => {
    if (course.image && course.image.trim() !== "") return course.image;
    const title = (course.title || course.name || "").toLowerCase();
    if (
      title.includes("alimiyah") ||
      title.includes("alimiya") ||
      title.includes("alim")
    )
      return "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png";
    if (
      title.includes("hifz") ||
      title.includes("tahfiz") ||
      title.includes("revision")
    )
      return "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png";
    if (title.includes("qaida") || title.includes("noorani"))
      return "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
    if (title.includes("nazera") || title.includes("nazira"))
      return "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png";
    if (title.includes("tajweed") || title.includes("tajwid"))
      return "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png";
    if (title.includes("elder"))
      return "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
    return "https://i.ibb.co.com/7tWnV1pB/banner.jpg";
  };

  const t = {
    homeTab: "Home",
    dashboardTab: "Dashboard",
    myCoursesTab: "My courses",
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMyCourses = async () => {
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

        const apiUrl = `${API_BASE}/api/students/my-courses/${studentId}`;
        console.log("📡 [MyCourses] Fetching:", apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!isMounted) return;

        if (data.success) {
          const list = (data.courses || []).map((c) => ({
            ...c,
            image:
              c.image || "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
          }));
          setCourses(list);
          console.log("✅ [MyCourses] Loaded", list.length, "courses");
        } else {
          setError(data.message || "কোর্স লোড করা যায়নি!");
        }
      } catch (err) {
        console.error("❌ [MyCourses]", err);
        if (isMounted) setError("সার্ভারে সংযোগ করা যায়নি!");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMyCourses();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // ✅ Fetch videos when a course is selected
  // ✅ Fetch videos when a course is selected
  useEffect(() => {
    if (!selectedCourse) {
      setCourseVideos([]);
      return;
    }

    let isMounted = true;

    const fetchCourseVideos = async () => {
      try {
        setLoadingVideos(true);
        setCourseVideos([]);

        // Try title first, then code
        const searchNames = [
          selectedCourse.title,
          selectedCourse.name,
          selectedCourse.code,
        ].filter(Boolean);

        console.log("🔍 [CourseVideos] Will try:", searchNames);

        let foundVideos = [];
        let successData = null;

        for (const name of searchNames) {
          const url = `${API_BASE}/api/batches/course-videos/${encodeURIComponent(name)}`;
          console.log("📡 Fetching:", url);

          try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(
              `   → matched ${data.matchedBatches}, videos ${data.total}`,
            );
            if (data.success && data.videos?.length > 0) {
              foundVideos = data.videos;
              successData = data;
              break;
            }
          } catch (e) {
            console.warn("   ⚠️ fetch failed for", name, e.message);
          }
        }

        if (!isMounted) return;

        if (foundVideos.length > 0) {
          setCourseVideos(foundVideos);
          console.log("✅ [CourseVideos] Loaded", foundVideos.length, "videos");
          console.log("🔍 Debug:", successData?.debug);
        } else {
          console.log("❌ [CourseVideos] No videos found");
          setCourseVideos([]);
        }
      } catch (err) {
        console.error("❌ [CourseVideos]", err);
      } finally {
        if (isMounted) setLoadingVideos(false);
      }
    };

    fetchCourseVideos();

    return () => {
      isMounted = false;
    };
  }, [selectedCourse]);

  const filteredCourses = courses.filter(
    (course) =>
      (course.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ✅ Convert YouTube / Drive URL to embeddable URL
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
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
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
                  alt={selectedCourse.code}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs bg-teal-50 text-[#004d4d] font-bold px-2.5 py-1 rounded border border-teal-100">
                  Instructor:{" "}
                  {selectedCourse.instructor || selectedCourse.teacher || "N/A"}
                </span>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                  {selectedCourse.code} - {selectedCourse.title}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedCourse.className ||
                    selectedCourse.semester ||
                    "First Semester"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  01 Course Overview & Outcome
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedCourse.description ||
                    selectedCourse.outcome ||
                    "No description available."}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  Outcome Syllabus
                </h2>
                <pre className="text-xs text-gray-600 font-sans whitespace-pre-line">
                  {selectedCourse.syllabus ||
                    `Duration: ${selectedCourse.duration || "N/A"}\nSchedule: ${selectedCourse.schedule || "N/A"}`}
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Grades */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaAward className="text-[#004d4d]" /> Material / Grad & Exams
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">Grad</span>
                    <span className="font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                      A+
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Class Test
                    </span>
                    <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      85/100
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Mid Term Exam
                    </span>
                    <span className="font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                      42/50
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Final Exam
                    </span>
                    <span className="font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </li>
                </ul>
              </div>

              {/* ✅ Module Content with REAL VIDEOS */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaBookOpen className="text-[#004d4d]" /> Module Content
                </h2>

                {/* Video Recording section */}
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 border-b border-gray-100 text-xs">
                    <FaVideo className="text-red-500 text-sm" />
                    <span className="font-semibold text-gray-700 flex-1">
                      Video Recording (লেকচার ভিডিও)
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                      {loadingVideos ? "..." : courseVideos.length}
                    </span>
                  </div>

                  {/* Video list */}
                  <div className="p-2 space-y-1.5 max-h-56 overflow-y-auto bg-white">
                    {loadingVideos ? (
                      <div className="text-center py-3">
                        <FaSpinner className="animate-spin text-indigo-500 mx-auto text-sm" />
                        <p className="text-[10px] text-gray-500 mt-1">
                          ভিডিও লোড হচ্ছে...
                        </p>
                      </div>
                    ) : courseVideos.length > 0 ? (
                      courseVideos.map((video, i) => (
                        <button
                          key={i}
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
                              {video.title}
                            </p>
                            {video.batchName && (
                              <p className="text-[9px] text-gray-500 truncate">
                                {video.batchName}{" "}
                                {video.teacher && `• ${video.teacher}`}
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

                {/* PDF notes */}
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded border border-gray-100 text-xs hover:bg-teal-50 cursor-pointer">
                  <FaFilePdf className="text-blue-500 text-sm" />
                  <span className="font-medium text-gray-700">
                    PDF Notes (নোট ও রিসোর্স)
                  </span>
                </div>

                {/* Quiz */}
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded border border-gray-100 text-xs hover:bg-teal-50 cursor-pointer">
                  <FaQuestionCircle className="text-green-500 text-sm" />
                  <span className="font-medium text-gray-700">
                    Quiz (কুইজ ও মূল্যায়ন)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                01 Course overview
              </h1>
              {student && (
                <p className="text-xs text-gray-500 mt-1">
                  👋 স্বাগতম, <strong>{student.name}</strong> — আপনার মোট{" "}
                  {courses.length} টি কোর্স
                </p>
              )}
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                  <option>All</option>
                </select>
                <div className="relative">
                  <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded w-48"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                  <option>Sort by course name</option>
                </select>
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs">
                  <option>Card</option>
                </select>
              </div>
            </div>

            {filteredCourses.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
                <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">
                  {courses.length === 0
                    ? "🎓 এখনো কোনো কোর্স অ্যাসাইন করা হয়নি!"
                    : "❌ কোনো কোর্স খুঁজে পাওয়া যায়নি!"}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {courses.length === 0
                    ? "অ্যাডমিন আপনার জন্য কোর্স অ্যাসাইন করলে এখানে দেখা যাবে।"
                    : "অন্য কিছু দিয়ে সার্চ করুন।"}
                </p>
              </div>
            )}

            {filteredCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id || course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="h-28 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.code}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 flex items-start justify-between border-t border-gray-100">
                      <div>
                        <h3 className="text-xs font-bold text-[#004d4d]">
                          {course.code}
                        </h3>
                        <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                          {course.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {course.className ||
                            course.semester ||
                            "First Semester"}
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
          </>
        )}
      </div>

      {/* ✅ Video Player Modal */}
      {showVideoPlayer && playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <FaVideo className="text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 truncate">
                    {playingVideo.title}
                  </h3>
                  {playingVideo.batchName && (
                    <p className="text-[10px] text-gray-500 truncate">
                      {playingVideo.batchName}
                      {playingVideo.teacher && ` • ${playingVideo.teacher}`}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={playingVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
                  title="Open in new tab"
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

            {/* Video iframe */}
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

            {/* Footer info */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
              <p>
                💡 <strong>Tip:</strong> ভিডিওটি অন্য tab এ খুলতে উপরের ↗️ icon
                এ ক্লিক করুন
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default My_courses;
