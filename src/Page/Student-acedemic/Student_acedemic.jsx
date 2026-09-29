// src/Page/Student-acedemic/Student_acedemic.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaFilePdf,
  FaLink,
  FaChalkboardTeacher,
  FaPlay,
  FaSync,
  FaExternalLinkAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";

const API_BASE = "https://api.tarbiyahonline.com/api";

const StudentAcademic = () => {
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    name: "Student",
    studentId: "",
    class: "Not Assigned",
    roll: "N/A",
    course: "",
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");
  const [fetchError, setFetchError] = useState(null);
  const [studentBatches, setStudentBatches] = useState([]);

  const [academicData, setAcademicData] = useState({
    videos: [],
    classes: [],
    materials: { all: [], exams: [], quizzes: [], pdfs: [] },
    stats: {
      totalVideos: 0,
      totalExams: 0,
      totalQuizzes: 0,
      totalPdfs: 0,
      totalClasses: 0,
      totalMaterials: 0,
    },
  });

  // ============================================================
  // ✅ Fetch by studentId — batch-based
  // ============================================================
  const fetchAcademicData = async (studentId) => {
    try {
      setFetchError(null);

      if (!studentId) {
        console.warn("⚠️ No studentId");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const url = `${API_BASE}/student/my-academic/${encodeURIComponent(studentId)}`;
      console.log(`📥 Fetching academic for studentId: ${studentId}`);
      console.log("   URL:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const d = await res.json();
      console.log("📥 Response:", d);

      if (d.success) {
        setAcademicData({
          videos: d.videos || [],
          classes: d.classes || [],
          materials: d.materials || {
            all: [],
            exams: [],
            quizzes: [],
            pdfs: [],
          },
          stats: d.stats || {
            totalVideos: 0,
            totalExams: 0,
            totalQuizzes: 0,
            totalPdfs: 0,
            totalClasses: 0,
            totalMaterials: 0,
          },
        });
        setStudentBatches(d.batches || []);

        console.log(
          `✅ Loaded — Videos: ${d.stats?.totalVideos}, Classes: ${d.stats?.totalClasses}, Exams: ${d.stats?.totalExams}, Quizzes: ${d.stats?.totalQuizzes}, PDFs: ${d.stats?.totalPdfs}`,
        );

        // Auto switch to a non-empty tab
        if (d.videos?.length > 0) setActiveTab("videos");
        else if (d.classes?.length > 0) setActiveTab("classes");
        else if (d.materials?.exams?.length > 0) setActiveTab("exams");
        else if (d.materials?.quizzes?.length > 0) setActiveTab("quizzes");
        else if (d.materials?.pdfs?.length > 0) setActiveTab("pdfs");
      } else {
        setFetchError(d.message || "Failed to load");
      }
    } catch (e) {
      console.error("❌ Fetch error:", e);
      setFetchError(e.message || "Failed to load academic data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ============================================================
  // ✅ Load student info + fetch by studentId
  // ============================================================
  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");

    if (!savedInfo) {
      setLoading(false);
      return;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(savedInfo);
    } catch (e) {
      setLoading(false);
      return;
    }

    const sid = parsed._id || parsed.studentId || parsed.username;
    console.log("🎯 Student ID for fetch:", sid);

    setStudentInfo({
      _id: parsed._id || "",
      name: parsed.name || "Student",
      studentId: parsed.studentId || "",
      class:
        parsed.class || parsed.course || parsed.department || "Not Assigned",
      roll: parsed.roll || parsed.studentId || "N/A",
      course: parsed.course || parsed.class || "",
    });

    fetchAcademicData(sid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAcademicData(studentInfo._id || studentInfo.studentId);
  };

  const menuItems = [
    {
      id: "dashboard",
      path: "/student-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/student-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "academic",
      path: "/student-acedemic",
      icon: <FaUniversity className="text-xl" />,
      label: "Academic",
    },
    {
      id: "result",
      path: "/student-result",
      icon: <FaFileAlt className="text-xl" />,
      label: "Regular Exam Result",
    },
    {
      id: "payment",
      path: "/online-payment",
      icon: <FaCreditCard className="text-xl" />,
      label: "Monthly Online Payment",
    },
    {
      id: "due",
      path: "/due-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Due & Payments",
    },
  ];

  const stats = academicData.stats;

  const tabs = [
    {
      id: "videos",
      label: "Class Videos",
      icon: <FaVideo />,
      count: stats.totalVideos,
    },
    {
      id: "classes",
      label: "Class Schedule",
      icon: <FaCalendarAlt />,
      count: stats.totalClasses,
    },
    {
      id: "exams",
      label: "Exams",
      icon: <FaGraduationCap />,
      count: stats.totalExams,
    },
    {
      id: "quizzes",
      label: "Quizzes",
      icon: <MdOutlineQuiz />,
      count: stats.totalQuizzes,
    },
    {
      id: "pdfs",
      label: "PDF Notes",
      icon: <FaFilePdf />,
      count: stats.totalPdfs,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading academic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {studentInfo.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{studentInfo.name}</p>
              <p className="text-xs opacity-80 truncate">{studentInfo.class}</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                  }`}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaGraduationCap /> Academic Information
                </h2>
                <p className="text-sm opacity-80">
                  {studentInfo.name} • {studentInfo.class} • ID:{" "}
                  {studentInfo.studentId || studentInfo.roll}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold disabled:opacity-50"
              >
                <FaSync className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Matched Batches */}
          {studentBatches.length > 0 && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 text-xs">
              <span className="text-gray-600 font-semibold">Your Batch: </span>
              {studentBatches.map((b, i) => (
                <span key={b._id || i} className="text-blue-700 font-semibold">
                  {i > 0 && ", "}
                  {b.name} ({b.course})
                </span>
              ))}
            </div>
          )}

          {/* Error */}
          {fetchError && (
            <div className="bg-red-50 border-b border-red-200 p-3 text-center">
              <p className="text-xs text-red-700 font-semibold">
                ⚠️ {fetchError}
              </p>
              <button
                onClick={handleRefresh}
                className="mt-1 text-xs text-red-600 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* No batch warning */}
          {studentBatches.length === 0 && !fetchError && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-4 text-center">
              <FaInfoCircle className="text-yellow-600 text-2xl mx-auto mb-1" />
              <p className="text-sm font-semibold text-yellow-800">
                You are not assigned to any batch yet
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Please contact admin to add you to a batch
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 border-b border-gray-200">
            <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <FaVideo className="text-red-600" /> Videos
              </p>
              <p className="text-xl font-bold text-red-600">
                {stats.totalVideos}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <FaCalendarAlt className="text-indigo-600" /> Classes
              </p>
              <p className="text-xl font-bold text-indigo-600">
                {stats.totalClasses}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <FaGraduationCap className="text-purple-600" /> Exams
              </p>
              <p className="text-xl font-bold text-purple-600">
                {stats.totalExams}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <MdOutlineQuiz className="text-blue-600" /> Quizzes
              </p>
              <p className="text-xl font-bold text-blue-600">
                {stats.totalQuizzes}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <FaFilePdf className="text-orange-600" /> PDFs
              </p>
              <p className="text-xl font-bold text-orange-600">
                {stats.totalPdfs}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200 bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-[#00ADD2] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === tab.id
                      ? "bg-white/30 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {/* VIDEOS */}
            {activeTab === "videos" && (
              <div className="space-y-3">
                {academicData.videos.length === 0 ? (
                  <EmptyState
                    icon={<FaVideo />}
                    title="No videos available yet"
                    subtitle="Videos uploaded by your teacher will appear here"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {academicData.videos.map((video, i) => (
                      <a
                        key={video._id || i}
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-red-300 transition-all flex items-center gap-3"
                      >
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaPlay className="text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {video.title || `Video ${i + 1}`}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {video.batchName || video.teacher || ""}
                          </p>
                        </div>
                        <FaExternalLinkAlt
                          className="text-gray-400 flex-shrink-0"
                          size={12}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CLASSES */}
            {activeTab === "classes" && (
              <div className="space-y-3">
                {academicData.classes.length === 0 ? (
                  <EmptyState
                    icon={<FaCalendarAlt />}
                    title="No classes scheduled"
                    subtitle="Your batch class schedule will appear here"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {academicData.classes.map((cls, idx) => {
                      const teachers = Array.isArray(cls.teachers)
                        ? cls.teachers
                        : cls.teacher
                          ? [cls.teacher]
                          : [];
                      return (
                        <div
                          key={cls._id || idx}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-500 uppercase font-bold">
                                Class
                              </p>
                              <p className="font-bold text-gray-800">
                                {cls.name}
                              </p>
                              {cls.batchName && (
                                <p className="text-[10px] text-gray-400">
                                  {cls.batchName}
                                </p>
                              )}
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                cls.gender === "Female"
                                  ? "bg-pink-100 text-pink-700"
                                  : cls.gender === "Male"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {cls.gender || "Mixed"}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs text-gray-600">
                            <p className="flex items-center gap-2">
                              <FaCalendarAlt className="text-gray-400" />
                              {cls.day}
                            </p>
                            <p className="flex items-center gap-2">
                              <FaClock className="text-gray-400" />
                              {cls.time}
                            </p>
                            {teachers.length > 0 && (
                              <div className="flex items-start gap-2">
                                <FaChalkboardTeacher className="text-gray-400 mt-0.5" />
                                <div className="flex flex-wrap gap-1">
                                  {teachers.map((t, i) => (
                                    <span
                                      key={i}
                                      className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {cls.meetingLink && (
                            <a
                              href={cls.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                            >
                              <FaLink size={11} /> Join Class
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* EXAMS */}
            {activeTab === "exams" && (
              <div className="space-y-3">
                {academicData.materials.exams.length === 0 ? (
                  <EmptyState
                    icon={<FaGraduationCap />}
                    title="No exams published"
                    subtitle="Your batch exams will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.exams.map((m, i) => (
                      <MaterialCard
                        key={m._id || i}
                        material={m}
                        color="purple"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* QUIZZES */}
            {activeTab === "quizzes" && (
              <div className="space-y-3">
                {academicData.materials.quizzes.length === 0 ? (
                  <EmptyState
                    icon={<MdOutlineQuiz />}
                    title="No quizzes available"
                    subtitle="Your batch quizzes will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.quizzes.map((m, i) => (
                      <MaterialCard
                        key={m._id || i}
                        material={m}
                        color="blue"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PDFs */}
            {activeTab === "pdfs" && (
              <div className="space-y-3">
                {academicData.materials.pdfs.length === 0 ? (
                  <EmptyState
                    icon={<FaFilePdf />}
                    title="No PDF notes available"
                    subtitle="PDF notes will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.pdfs.map((m, i) => (
                      <MaterialCard
                        key={m._id || i}
                        material={m}
                        color="orange"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
    <div className="text-4xl text-gray-300 flex justify-center mb-2">
      {icon}
    </div>
    <p className="font-semibold text-gray-700">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

const MaterialCard = ({ material, color }) => {
  const colorMap = {
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
  };
  const c = colorMap[color] || colorMap.purple;

  return (
    <a
      href={material.url}
      target="_blank"
      rel="noreferrer"
      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all flex items-center gap-3"
    >
      <div
        className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        {material.type === "pdf" ? (
          <FaFilePdf className={c.text} />
        ) : material.type === "quiz" ? (
          <MdOutlineQuiz className={c.text} />
        ) : (
          <FaGraduationCap className={c.text} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm truncate">
          {material.title}
        </p>
        <p className="text-[10px] text-gray-500 flex gap-2 flex-wrap">
          <span className="uppercase font-bold">{material.type}</span>
          {material.date && <span>• {material.date}</span>}
          {material.marks !== null &&
            material.marks !== undefined &&
            material.totalMarks && (
              <span className="text-green-600 font-bold">
                • {material.marks}/{material.totalMarks}
              </span>
            )}
        </p>
      </div>
      <FaExternalLinkAlt className="text-gray-400 flex-shrink-0" size={12} />
    </a>
  );
};

export default StudentAcademic;
