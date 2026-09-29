// src/Page/Student_result/Student_result.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaGraduationCap,
  FaDownload,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSync,
  FaInfoCircle,
} from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ Student এর department বের করার helper
// ============================================================
const getStudentDepartment = (parsed) => {
  if (!parsed) return "";
  if (parsed.course && String(parsed.course).trim())
    return String(parsed.course).trim();
  if (parsed.class && String(parsed.class).trim())
    return String(parsed.class).trim();
  if (parsed.department && String(parsed.department).trim())
    return String(parsed.department).trim();
  if (parsed.batch && String(parsed.batch).trim())
    return String(parsed.batch).trim();

  const src = parsed.loginSource || parsed.source || "";
  if (src === "basic_tazweed_students") return "Tajweed";
  if (src === "najera_batch_students") return "Nazera";
  return "";
};

const Student_result = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resultTab, setResultTab] = useState("exam");
  const [fetchError, setFetchError] = useState(null);
  const [department, setDepartment] = useState("");

  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    studentId: "",
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    status: "",
    course: "",
    loginSource: "",
  });

  // ✅ Data from backend
  const [academicData, setAcademicData] = useState({
    exams: [],
    quizzes: [],
    pdfs: [],
    stats: { totalExams: 0, totalQuizzes: 0, totalPdfs: 0 },
  });

  // ============================================================
  // ✅ Fetch — student এর department এর exam/quiz
  // ============================================================
  const fetchAllResults = async (dept) => {
    try {
      setFetchError(null);

      // ✅ student এর department না থাকলে সব show হবে
      let url;
      if (dept) {
        url = `${API_BASE}/student/academic/${encodeURIComponent(dept)}`;
      } else {
        url = `${API_BASE}/student/academic-all`;
      }

      console.log(`📥 Fetching results from: ${url}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const d = await res.json();
      console.log("📥 Result data response:", d);

      if (d.success && d.materials) {
        setAcademicData({
          exams: d.materials.exams || [],
          quizzes: d.materials.quizzes || [],
          pdfs: d.materials.pdfs || [],
          stats: {
            totalExams: d.materials.exams?.length || 0,
            totalQuizzes: d.materials.quizzes?.length || 0,
            totalPdfs: d.materials.pdfs?.length || 0,
          },
        });
        console.log(
          `✅ Loaded: Exams=${d.materials.exams?.length || 0}, Quizzes=${d.materials.quizzes?.length || 0}`,
        );
      } else {
        console.warn("⚠️ No materials found");
      }
    } catch (e) {
      console.error("❌ Fetch error:", e);
      setFetchError(e.message || "Failed to load results");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ============================================================
  // ✅ Load student + fetch results
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

    const info = {
      _id: parsed._id || "",
      studentId: parsed.studentId || "",
      name: parsed.name || "Student",
      email: parsed.email || "",
      phone: parsed.phone || "",
      class: parsed.class || parsed.course || "",
      roll: parsed.roll || "",
      username: parsed.username || "",
      status: parsed.status || "Active",
      course: parsed.course || parsed.class || "",
      loginSource: parsed.loginSource || "",
    };
    setStudentInfo(info);

    const dept = getStudentDepartment(parsed);
    setDepartment(dept);
    console.log("🎯 Student department:", dept || "(empty)");

    fetchAllResults(dept);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllResults(department);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("loginSource");
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Logout Failed" });
    }
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

  // Stats
  const exams = academicData.exams;
  const quizzes = academicData.quizzes;

  // ============================================================
  // ✅ Marks calculation
  // ============================================================
  const calcPercent = (m) => {
    if (!m.marks || !m.totalMarks || m.totalMarks === 0) return null;
    return Math.round((m.marks / m.totalMarks) * 100);
  };

  const getGrade = (percent) => {
    if (percent === null) return "N/A";
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "A-";
    if (percent >= 65) return "B+";
    if (percent >= 60) return "B";
    if (percent >= 55) return "B-";
    if (percent >= 50) return "C+";
    if (percent >= 45) return "C";
    if (percent >= 40) return "D";
    return "F";
  };

  const getGradeColor = (grade) => {
    if (!grade || grade === "N/A") return "bg-gray-100 text-gray-700";
    if (["A+", "A", "A-"].includes(grade)) return "bg-green-100 text-green-700";
    if (["B+", "B", "B-"].includes(grade)) return "bg-blue-100 text-blue-700";
    if (["C+", "C"].includes(grade)) return "bg-yellow-100 text-yellow-700";
    if (grade === "D") return "bg-orange-100 text-orange-700";
    if (grade === "F") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // Stats
  const totalExamsWithMarks = exams.filter(
    (e) => e.marks !== null && e.marks !== undefined,
  ).length;
  const totalExamsPending = exams.length - totalExamsWithMarks;
  const passedExams = exams.filter((e) => {
    const p = calcPercent(e);
    return p !== null && p >= 40;
  }).length;
  const failedExams = exams.filter((e) => {
    const p = calcPercent(e);
    return p !== null && p < 40;
  }).length;

  // CGPA
  const gradesWithMarks = exams.filter((e) => calcPercent(e) !== null);
  const cgpa =
    gradesWithMarks.length > 0
      ? (
          gradesWithMarks.reduce((s, e) => {
            const p = calcPercent(e);
            const gp =
              p >= 90
                ? 4.0
                : p >= 80
                  ? 3.75
                  : p >= 70
                    ? 3.5
                    : p >= 65
                      ? 3.25
                      : p >= 60
                        ? 3.0
                        : p >= 55
                          ? 2.75
                          : p >= 50
                            ? 2.5
                            : p >= 45
                              ? 2.0
                              : p >= 40
                                ? 1.0
                                : 0;
            return s + gp;
          }, 0) / gradesWithMarks.length
        ).toFixed(2)
      : "N/A";

  const overallPercent =
    gradesWithMarks.length > 0
      ? (
          gradesWithMarks.reduce((s, e) => s + calcPercent(e), 0) /
          gradesWithMarks.length
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm h-screen sticky top-0 flex-shrink-0">
          <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                {studentInfo.name?.charAt(0) || "S"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{studentInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {studentInfo.class}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                    isActive
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                  }`}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4 text-sm"
            >
              <span>🚪</span> Logout
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaGraduationCap className="text-[#00ADD2]" />
                Exam & Quiz Results
              </h1>
              <p className="text-sm text-gray-500">
                {studentInfo.name} • {studentInfo.class} • Roll:{" "}
                {studentInfo.roll || studentInfo.studentId || "N/A"}
              </p>
              {department && (
                <p className="text-xs text-[#00ADD2] font-semibold mt-1 inline-block bg-[#e6f7f9] px-2 py-0.5 rounded-full">
                  🎓 {department}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-[#00ADD2] hover:bg-[#008c9e] text-white text-xs px-3 py-2 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync
                  className={refreshing ? "animate-spin" : ""}
                  size={11}
                />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Error */}
          {fetchError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-center">
              <p className="text-xs text-red-700 font-semibold">
                ⚠️ {fetchError}
              </p>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-xs text-gray-500">Total Exams</p>
              <p className="text-2xl font-bold text-[#00ADD2]">
                {exams.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-xs text-gray-500">Passed</p>
              <p className="text-2xl font-bold text-green-600">{passedExams}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-xs text-gray-500">Overall %</p>
              <p className="text-2xl font-bold text-[#00ADD2]">
                {overallPercent}%
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-xs text-gray-500">CGPA</p>
              <p className="text-2xl font-bold text-[#00ADD2]">{cgpa}</p>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 text-sm">
              {[
                { id: "exam", label: `📊 Exams (${exams.length})` },
                { id: "quiz", label: `📝 Quizzes (${quizzes.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setResultTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg border transition-all text-sm ${
                    resultTab === tab.id
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold border-[#00ADD2] shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============ EXAMS ============ */}
          {resultTab === "exam" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  📊 Exam Results
                </h2>
                <button
                  onClick={() => window.print()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                >
                  <FaPrint size={12} /> Print
                </button>
              </div>

              {exams.length === 0 ? (
                <EmptyResult
                  icon={<FaFileAlt />}
                  title="No exams in your department"
                  subtitle="Exams will appear here once your teacher publishes them"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                      <tr>
                        <th className="p-3 font-semibold">#</th>
                        <th className="p-3 font-semibold">Exam Title</th>
                        <th className="p-3 font-semibold">Date</th>
                        <th className="p-3 font-semibold">Marks</th>
                        <th className="p-3 font-semibold">%</th>
                        <th className="p-3 font-semibold">Grade</th>
                        <th className="p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam, i) => {
                        const pct = calcPercent(exam);
                        const grade = getGrade(pct);
                        const passed = pct !== null && pct >= 40;
                        return (
                          <tr
                            key={exam._id || i}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3 text-gray-500 font-mono">
                              {String(i + 1).padStart(2, "0")}
                            </td>
                            <td className="p-3">
                              <a
                                href={exam.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-gray-800 hover:text-[#00ADD2]"
                              >
                                {exam.title}
                              </a>
                            </td>
                            <td className="p-3 text-xs text-gray-500">
                              {exam.date || "—"}
                            </td>
                            <td className="p-3 font-semibold text-[#00ADD2]">
                              {exam.marks !== null && exam.marks !== undefined
                                ? `${exam.marks}/${exam.totalMarks}`
                                : "Pending"}
                            </td>
                            <td className="p-3 font-semibold">
                              {pct !== null ? `${pct}%` : "—"}
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-bold ${getGradeColor(grade)}`}
                              >
                                {grade}
                              </span>
                            </td>
                            <td className="p-3">
                              {pct === null ? (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                                  <FaClock size={12} /> Pending
                                </span>
                              ) : passed ? (
                                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                                  <FaCheckCircle size={12} /> Passed
                                </span>
                              ) : (
                                <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                                  <FaTimesCircle size={12} /> Failed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============ QUIZZES ============ */}
          {resultTab === "quiz" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <MdOutlineQuiz className="text-blue-600" /> Quiz Test Results
                </h2>
                <span className="text-xs text-[#00ADD2] font-bold bg-[#e6f7f9] px-3 py-1 rounded-full">
                  Total: {quizzes.length}
                </span>
              </div>

              {quizzes.length === 0 ? (
                <EmptyResult
                  icon={<MdOutlineQuiz />}
                  title="No quiz results yet"
                  subtitle="Quiz scores will appear here once published"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                      <tr>
                        <th className="p-3 font-semibold">#</th>
                        <th className="p-3 font-semibold">Quiz Title</th>
                        <th className="p-3 font-semibold">Date</th>
                        <th className="p-3 font-semibold">Marks</th>
                        <th className="p-3 font-semibold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizzes.map((quiz, i) => {
                        const pct = calcPercent(quiz);
                        const grade = getGrade(pct);
                        return (
                          <tr
                            key={quiz._id || i}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3 text-gray-500 font-mono">
                              {String(i + 1).padStart(2, "0")}
                            </td>
                            <td className="p-3">
                              <a
                                href={quiz.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-gray-800 hover:text-[#00ADD2]"
                              >
                                {quiz.title}
                              </a>
                            </td>
                            <td className="p-3 text-xs text-gray-500">
                              {quiz.date || "—"}
                            </td>
                            <td className="p-3 font-semibold text-[#00ADD2]">
                              {quiz.marks !== null && quiz.marks !== undefined
                                ? `${quiz.marks}/${quiz.totalMarks}`
                                : "Pending"}
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-bold ${getGradeColor(grade)}`}
                              >
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const EmptyResult = ({ icon, title, subtitle }) => (
  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
    <div className="text-4xl text-gray-300 flex justify-center mb-2">
      {icon}
    </div>
    <p className="font-semibold text-gray-700">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default Student_result;
