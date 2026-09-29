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

// ============================================================
// ✅ Student এর Department বের করার helper
// ============================================================
const getStudentDepartment = (parsed) => {
  if (!parsed) return "";

  // Priority 1: explicit course / class
  if (parsed.course && String(parsed.course).trim())
    return String(parsed.course).trim();
  if (parsed.class && String(parsed.class).trim())
    return String(parsed.class).trim();

  // Priority 2: department field
  if (parsed.department && String(parsed.department).trim())
    return String(parsed.department).trim();

  // Priority 3: batch
  if (parsed.batch && String(parsed.batch).trim())
    return String(parsed.batch).trim();

  // Priority 4: loginSource → keyword mapping (Tazweed/Najera students এর জন্য)
  const src = parsed.loginSource || parsed.source || "";
  if (src === "basic_tazweed_students") return "Tajweed";
  if (src === "najera_batch_students") return "Nazera";

  return "";
};

const StudentAcademic = () => {
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState({
    name: "Student",
    class: "Not Assigned",
    roll: "N/A",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("classes");
  const [fetchError, setFetchError] = useState(null);
  const [department, setDepartment] = useState("");

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
    matchedBatches: [],
  });

  // ============================================================
  // ✅ Fetch academic data — Department অনুযায়ী filtered
  // ============================================================
  const fetchAcademicData = async (dept) => {
    try {
      setFetchError(null);

      if (!dept) {
        console.warn("⚠️ No department — nothing to fetch");
        setAcademicData({
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
          matchedBatches: [],
        });
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const url = `${API_BASE}/student/academic/${encodeURIComponent(dept)}`;
      console.log(`📥 Fetching academic data for dept: "${dept}"`);
      console.log("   URL:", url);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const d = await res.json();
      console.log("📥 Academic data response:", d);

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
          matchedBatches: d.matchedBatches || [],
        });
        console.log(
          `✅ Loaded for "${dept}": Classes=${d.classes?.length || 0}, Videos=${d.videos?.length || 0}, Exams=${d.materials?.exams?.length || 0}, Quizzes=${d.materials?.quizzes?.length || 0}, PDFs=${d.materials?.pdfs?.length || 0}`,
        );
      } else {
        console.warn("⚠️ API returned success: false", d);
        setFetchError(d.message || "API returned success: false");
      }
    } catch (e) {
      console.error("❌ Fetch academic error:", e);
      setFetchError(e.message || "Failed to fetch academic data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ============================================================
  // ✅ Load student info + fetch filtered data
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
      console.warn("⚠️ studentInfo parse error:", e);
      setLoading(false);
      return;
    }

    const dept = getStudentDepartment(parsed);
    console.log("🎯 Student department:", dept || "(empty)");
    console.log("   studentInfo:", parsed);

    setStudentInfo({
      name: parsed.name || "Student",
      class:
        parsed.class || parsed.course || parsed.department || "Not Assigned",
      roll: parsed.roll || parsed.studentId || "N/A",
      department: dept,
    });
    setDepartment(dept);

    fetchAcademicData(dept);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAcademicData(department);
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
      label: "Exam Result",
    },
    {
      id: "payment",
      path: "/online-payment",
      icon: <FaCreditCard className="text-xl" />,
      label: "Online Payment",
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
      id: "classes",
      label: "Class Schedule",
      icon: <FaCalendarAlt />,
      count: stats.totalClasses,
    },
    {
      id: "videos",
      label: "Class Videos",
      icon: <FaVideo />,
      count: stats.totalVideos,
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

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaGraduationCap /> Academic Information
                </h2>
                <p className="text-sm opacity-80">
                  {studentInfo.name} • {studentInfo.class} • Roll:{" "}
                  {studentInfo.roll}
                </p>
                {department && (
                  <p className="text-xs opacity-90 mt-1 inline-block bg-white/20 px-2 py-0.5 rounded-full">
                    🎓 Department: <strong>{department}</strong>
                  </p>
                )}
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold"
              >
                <FaSync className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* ✅ No Department Warning */}
          {!department && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-4 text-center">
              <FaInfoCircle className="text-yellow-600 text-2xl mx-auto mb-1" />
              <p className="text-sm font-semibold text-yellow-800">
                Your department is not assigned yet
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Please contact admin to assign you a department
              </p>
            </div>
          )}

          {/* ✅ Error Banner */}
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

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 border-b border-gray-200">
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <FaCalendarAlt className="text-indigo-600" /> Classes
              </p>
              <p className="text-xl font-bold text-indigo-600">
                {stats.totalClasses}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <FaVideo className="text-red-600" /> Videos
              </p>
              <p className="text-xl font-bold text-red-600">
                {stats.totalVideos}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <FaGraduationCap className="text-purple-600" /> Exams
              </p>
              <p className="text-xl font-bold text-purple-600">
                {stats.totalExams}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <MdOutlineQuiz className="text-blue-600" /> Quizzes
              </p>
              <p className="text-xl font-bold text-blue-600">
                {stats.totalQuizzes}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
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

          {/* Content */}
          <div className="p-4">
            {/* CLASSES */}
            {activeTab === "classes" && (
              <div className="space-y-3">
                {academicData.classes.length === 0 ? (
                  <EmptyState
                    icon={<FaCalendarAlt />}
                    title="No classes in your department"
                    subtitle="Classes will appear here once your teacher adds them"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {academicData.classes.map((cls) => {
                      const teachers = Array.isArray(cls.teachers)
                        ? cls.teachers
                        : cls.teacher
                          ? [cls.teacher]
                          : [];
                      return (
                        <div
                          key={cls._id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
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

            {/* VIDEOS */}
            {activeTab === "videos" && (
              <div className="space-y-3">
                {academicData.videos.length === 0 ? (
                  <EmptyState
                    icon={<FaVideo />}
                    title="No videos in your department"
                    subtitle="Class videos will appear here"
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

            {/* EXAMS */}
            {activeTab === "exams" && (
              <div className="space-y-3">
                {academicData.materials.exams.length === 0 ? (
                  <EmptyState
                    icon={<FaGraduationCap />}
                    title="No exams in your department"
                    subtitle="Exam results will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.exams.map((m) => (
                      <MaterialCard key={m._id} material={m} color="purple" />
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
                    title="No quizzes in your department"
                    subtitle="Quizzes will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.quizzes.map((m) => (
                      <MaterialCard key={m._id} material={m} color="blue" />
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
                    title="No PDF notes in your department"
                    subtitle="PDF notes will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {academicData.materials.pdfs.map((m) => (
                      <MaterialCard key={m._id} material={m} color="orange" />
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

// ==========================================
// Reusable Components
// ==========================================
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
