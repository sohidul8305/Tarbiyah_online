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
  FaBook,
  FaGraduationCap,
  FaDownload,
  FaPrint,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Student_result = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Student Info from localStorage
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    status: "",
    course: "",
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setStudentInfo({
        name: parsedInfo.name || "Student",
        email: parsedInfo.email || "",
        phone: parsedInfo.phone || "",
        class: parsedInfo.class || "",
        roll: parsedInfo.roll || "",
        username: parsedInfo.username || "",
        status: parsedInfo.status || "Active",
        course: parsedInfo.course || "",
      });
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  // Sidebar Menu Items
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

  // State for active menu and result tab
  const [activeMenu, setActiveMenu] = useState("result");
  const [resultTab, setResultTab] = useState("midterm");

  // Mid-Term Results Data (Dynamic based on student's course)
  const getMidTermResults = () => {
    const courseName = studentInfo.course || "";
    if (courseName) {
      const courseList = courseName.split(",").map((c) => c.trim());
      return courseList.map((course, index) => ({
        id: index + 1,
        code: `ISL-${String(index + 1).padStart(3, "0")}`,
        name: course,
        totalMarks: 100,
        obtainedMarks: 75 + Math.floor(Math.random() * 20),
        grade: ["A+", "A", "A-", "B+"][index % 4],
        status: "Passed",
      }));
    }
    return [
      {
        id: 1,
        code: "ISL-101",
        name: "Al-Quran Studies & Tafseer",
        totalMarks: 100,
        obtainedMarks: 82,
        grade: "A+",
        status: "Passed",
      },
      {
        id: 2,
        code: "ISL-102",
        name: "Hadith Methodology & Sunnah",
        totalMarks: 100,
        obtainedMarks: 75,
        grade: "A",
        status: "Passed",
      },
      {
        id: 3,
        code: "ARAB-101",
        name: "Classic Arabic Grammar",
        totalMarks: 100,
        obtainedMarks: 88,
        grade: "A+",
        status: "Passed",
      },
    ];
  };

  // Quiz Results Data
  const getQuizResults = () => {
    const courseName = studentInfo.course || "";
    const quizData = [
      {
        id: 1,
        title: "Quiz 01: Fundamentals of Quranic Studies",
        subject: courseName.split(",")[0]?.trim() || "Al-Quran",
        fullMarks: 20,
        obtainedMarks: 18,
        performance: "Excellent",
      },
      {
        id: 2,
        title: "Quiz 02: Introduction to Hadith Sciences",
        subject: courseName.split(",")[1]?.trim() || "Hadith",
        fullMarks: 20,
        obtainedMarks: 16,
        performance: "Good",
      },
      {
        id: 3,
        title: "Quiz 03: Arabic Grammar Fundamentals",
        subject: courseName.split(",")[2]?.trim() || "Arabic Grammar",
        fullMarks: 20,
        obtainedMarks: 14,
        performance: "Average",
      },
      {
        id: 4,
        title: "Quiz 04: Tajweed Rules (Makharijul Huruf)",
        subject: courseName.split(",")[0]?.trim() || "Al-Quran",
        fullMarks: 20,
        obtainedMarks: 19,
        performance: "Outstanding",
      },
    ];
    return quizData;
  };

  const midTermResults = getMidTermResults();
  const quizResults = getQuizResults();

  // Calculate statistics
  const totalCourses = midTermResults.length;
  const passedCourses = midTermResults.filter(
    (r) => r.status === "Passed",
  ).length;
  const totalMarks = midTermResults.reduce((sum, r) => sum + r.totalMarks, 0);
  const totalObtained = midTermResults.reduce(
    (sum, r) => sum + r.obtainedMarks,
    0,
  );
  const overallPercentage =
    totalMarks > 0 ? (totalObtained / totalMarks) * 100 : 0;

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Outstanding":
        return "bg-purple-100 text-purple-700";
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Average":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
        {/* ================= LEFT SIDEBAR ================= */}
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
              const isActive =
                window.location.pathname === item.path ||
                (item.id === "result" &&
                  window.location.pathname === "/student-result");
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    navigate(item.path);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                    ${
                      isActive
                        ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                    }
                  `}
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

          <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT ================= */}
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
                {studentInfo.roll || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {studentInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-[#00ADD2]">
                {totalCourses}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Passed</p>
              <p className="text-2xl font-bold text-green-600">
                {passedCourses}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Overall Percentage</p>
              <p className="text-2xl font-bold text-[#00ADD2]">
                {overallPercentage.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">CGPA</p>
              <p className="text-2xl font-bold text-[#00ADD2]">3.75</p>
            </div>
          </div>

          {/* Result Sub-Tabs Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 text-sm">
              {[
                { id: "midterm", label: "📊 Mid-Term Results" },
                { id: "quiz", label: "📝 Quiz Test Results" },
                { id: "final", label: "🎓 Semester Final" },
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

          {/* Tab 1: Mid-Term Results */}
          {resultTab === "midterm" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  📊 Mid-Term Examination Results (Fall 2026)
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      Swal.fire({
                        icon: "success",
                        title: "Downloading...",
                        text: "Mid-Term Marksheet PDF is being downloaded.",
                        timer: 1500,
                        showConfirmButton: false,
                      })
                    }
                    className="bg-[#00ADD2] hover:bg-[#008c9e] text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1"
                  >
                    <FaDownload size={12} /> Download marksheet
                  </button>
                  <button
                    onClick={() =>
                      Swal.fire({
                        icon: "info",
                        title: "Printing...",
                        text: "Preparing marksheet for print.",
                        timer: 1500,
                        showConfirmButton: false,
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1"
                  >
                    <FaPrint size={12} /> Print
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                    <tr>
                      <th className="p-3 font-semibold">#</th>
                      <th className="p-3 font-semibold">Course Code & Name</th>
                      <th className="p-3 font-semibold">Total Marks</th>
                      <th className="p-3 font-semibold">Obtained</th>
                      <th className="p-3 font-semibold">Grade</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {midTermResults.map((result, index) => (
                      <tr
                        key={result.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-500">{index + 1}</td>
                        <td className="p-3">
                          <p className="font-medium text-gray-800">
                            {result.code}
                          </p>
                          <p className="text-xs text-gray-500">{result.name}</p>
                        </td>
                        <td className="p-3">{result.totalMarks}</td>
                        <td className="p-3 font-semibold text-[#00ADD2]">
                          {result.obtainedMarks}
                        </td>
                        <td className="p-3 font-bold text-[#00ADD2]">
                          {result.grade}
                        </td>
                        <td className="p-3">
                          <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                            <FaCheckCircle size={12} /> {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Quiz Test Results */}
          {resultTab === "quiz" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  📝 Weekly Quiz Test Results
                </h2>
                <span className="text-xs text-[#00ADD2] font-bold bg-[#e6f7f9] px-3 py-1 rounded-full">
                  Total Quizzes: {quizResults.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                    <tr>
                      <th className="p-3 font-semibold">#</th>
                      <th className="p-3 font-semibold">Quiz Title</th>
                      <th className="p-3 font-semibold">Subject</th>
                      <th className="p-3 font-semibold">Full Marks</th>
                      <th className="p-3 font-semibold">Obtained</th>
                      <th className="p-3 font-semibold">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizResults.map((quiz, index) => (
                      <tr
                        key={quiz.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-500">{index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {quiz.title}
                        </td>
                        <td className="p-3 text-gray-600">{quiz.subject}</td>
                        <td className="p-3">{quiz.fullMarks}</td>
                        <td className="p-3 font-semibold text-[#00ADD2]">
                          {quiz.obtainedMarks}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPerformanceColor(quiz.performance)}`}
                          >
                            {quiz.performance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Semester Final Result */}
          {resultTab === "final" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center space-y-4">
              <div className="text-5xl mb-2">🎓</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Semester Final Result Sheet
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Fall 2026 সেমিস্টারের ফাইনাল পরীক্ষার ফলাফল এখনো প্রকাশিত হয়নি।
                পরীক্ষা শেষ হওয়ার পর মূল গ্রেডশিট ও সার্টিফিকেট এখানে দেখতে
                পাবেন।
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                  <FaClock /> Result will be published soon
                </div>
                <button
                  onClick={() =>
                    Swal.fire({
                      icon: "info",
                      title: "Notice",
                      text: "Final results will be published after semester completion.",
                      confirmButtonColor: "#00ADD2",
                    })
                  }
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm cursor-not-allowed"
                >
                  Result Not Published Yet
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Student_result;
