// src/Page/Teacher/Teacher_results.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaAward,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCalendarCheck, // এই লাইনটি যোগ করা হয়েছে
  FaClock,
  FaUsers,
  FaBook,
  FaUser,
  FaChalkboardTeacher,
  FaBell,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPlay,
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaPrint,
  FaChartLine,
  FaStar,
  FaGraduationCap,
  FaFileAlt,
  FaPercent,
  FaTasks,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const Teacher_results = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("results");
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
    subjects: [],
    classes: [],
  });

  const [examResults, setExamResults] = useState([
    {
      id: 1,
      title: "Mid Term Exam 2026",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-06-15",
      totalStudents: 30,
      passed: 25,
      failed: 5,
      passPercentage: 83.3,
      highestScore: 98,
      lowestScore: 45,
      averageScore: 78.5,
      status: "Published",
      topStudent: "Ahmed Hasan",
      topScore: 98,
    },
    {
      id: 2,
      title: "Mid Term Exam 2026",
      class: "Class 9",
      subject: "Tafsir",
      date: "2026-06-16",
      totalStudents: 25,
      passed: 20,
      failed: 5,
      passPercentage: 80.0,
      highestScore: 95,
      lowestScore: 42,
      averageScore: 75.2,
      status: "Published",
      topStudent: "Aisha Rahman",
      topScore: 95,
    },
    {
      id: 3,
      title: "Weekly Test - Week 3",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-07-10",
      totalStudents: 30,
      passed: 28,
      failed: 2,
      passPercentage: 93.3,
      highestScore: 100,
      lowestScore: 55,
      averageScore: 85.0,
      status: "Published",
      topStudent: "Fatima Begum",
      topScore: 100,
    },
    {
      id: 4,
      title: "Weekly Test - Week 3",
      class: "Class 9",
      subject: "Tafsir",
      date: "2026-07-11",
      totalStudents: 25,
      passed: 22,
      failed: 3,
      passPercentage: 88.0,
      highestScore: 97,
      lowestScore: 50,
      averageScore: 80.5,
      status: "Pending",
      topStudent: "Mohammad Ali",
      topScore: 97,
    },
    {
      id: 5,
      title: "Final Exam 2026",
      class: "Class 10",
      subject: "Hadith",
      date: "2026-07-20",
      totalStudents: 28,
      passed: 24,
      failed: 4,
      passPercentage: 85.7,
      highestScore: 96,
      lowestScore: 48,
      averageScore: 78.8,
      status: "Draft",
      topStudent: "Abdullah Karim",
      topScore: 96,
    },
    {
      id: 6,
      title: "Mid Term Exam 2026",
      class: "Class 7",
      subject: "Fiqh",
      date: "2026-06-17",
      totalStudents: 20,
      passed: 16,
      failed: 4,
      passPercentage: 80.0,
      highestScore: 92,
      lowestScore: 40,
      averageScore: 72.5,
      status: "Published",
      topStudent: "Yusuf Khan",
      topScore: 92,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    date: "",
    totalStudents: "",
    passed: "",
    failed: "",
    highestScore: "",
    lowestScore: "",
    averageScore: "",
    status: "Draft",
    topStudent: "",
    topScore: "",
  });

  // Load teacher info
  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacherInfo");
    if (savedTeacher) {
      const teacher = JSON.parse(savedTeacher);
      setTeacherInfo(teacher);
    } else {
      setTeacherInfo({
        name: user?.displayName || "Ustadh Ahmad",
        email: user?.email || "teacher@tarabiyah.com",
        phone: "01700000000",
        designation: "Senior Teacher",
        department: "Islamic Studies",
        joinDate: "January 2024",
        subjects: ["Tajweed", "Tafsir", "Hadith"],
        classes: ["Class 8", "Class 9", "Class 10"],
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isTeacherLoggedIn");
      localStorage.removeItem("teacherInfo");
      localStorage.removeItem("teacherEmail");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/teacher-login");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sidebar Menu Items
  const menuItems = [
    {
      id: "profile",
      path: "/teacher-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/teacher-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "courses",
      path: "/teacher-courses",
      icon: <FaBook className="text-xl" />,
      label: "My Courses",
    },
    {
      id: "classes",
      path: "/teacher-classes",
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: "My Classes",
    },
    {
      id: "homework",
      path: "/teacher-homework",
      icon: <FaTasks className="text-xl" />,
      label: "Homework",
    },
    {
      id: "notifications",
      path: "/teacher-notifications",
      icon: <FaBell className="text-xl" />,
      label: "Notification",
    },
    {
      id: "students",
      path: "/teacher-students",
      icon: <FaUsers className="text-xl" />,
      label: "Student Progress Report",
    },
    {
      id: "results",
      path: "/teacher-results",
      icon: <FaAward className="text-xl" />,
      label: "Exam Result",
    },
    {
      id: "leave",
      path: "/teacher-leave",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Leave KP",
    },
    {
      id: "salary",
      path: "/teacher-salary",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Salary Overview",
    },

    // এই নতুন আইটেমগুলো যোগ করুন
    {
      id: "videos",
      path: "/teacher-videos",
      icon: <FaPlay className="text-xl" />,
      label: "Video Upload",
    },
    {
      id: "assignments",
      path: "/teacher-assignments",
      icon: <MdAssignment className="text-xl" />,
      label: "Assignments",
    },
    {
      id: "quizzes",
      path: "/teacher-quizzes",
      icon: <MdQuiz className="text-xl" />,
      label: "Quizzes",
    },
    {
      id: "short-questions",
      path: "/teacher-short-questions",
      icon: <FaPen className="text-xl" />,
      label: "Short Questions",
    },
  ];

  // Handle search and filter
  const filteredResults = examResults.filter((result) => {
    const matchesSearch =
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.topStudent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || result.status === filterStatus;
    const matchesClass = filterClass === "All" || result.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || result.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(examResults.map((r) => r.class))];
  const uniqueSubjects = ["All", ...new Set(examResults.map((r) => r.subject))];
  const uniqueStatuses = ["All", ...new Set(examResults.map((r) => r.status))];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Draft":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get pass percentage color
  const getPassColor = (percentage) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  // Handle add result
  const handleAddResult = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.class ||
      !formData.subject ||
      !formData.date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const total = parseInt(formData.totalStudents) || 0;
    const passed = parseInt(formData.passed) || 0;
    const failed = parseInt(formData.failed) || 0;
    const passPercentage = total > 0 ? (passed / total) * 100 : 0;

    const newResult = {
      id: Date.now(),
      ...formData,
      totalStudents: total,
      passed: passed,
      failed: failed,
      passPercentage: parseFloat(passPercentage.toFixed(1)),
      highestScore: parseInt(formData.highestScore) || 0,
      lowestScore: parseInt(formData.lowestScore) || 0,
      averageScore: parseFloat(formData.averageScore) || 0,
      topScore: parseInt(formData.topScore) || 0,
    };

    setExamResults([...examResults, newResult]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Result Added!",
      text: "Exam result has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit result
  const handleEditResult = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.class ||
      !formData.subject ||
      !formData.date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const total = parseInt(formData.totalStudents) || 0;
    const passed = parseInt(formData.passed) || 0;
    const failed = parseInt(formData.failed) || 0;
    const passPercentage = total > 0 ? (passed / total) * 100 : 0;

    setExamResults(
      examResults.map((r) =>
        r.id === selectedResult.id
          ? {
              ...r,
              ...formData,
              totalStudents: total,
              passed: passed,
              failed: failed,
              passPercentage: parseFloat(passPercentage.toFixed(1)),
              highestScore: parseInt(formData.highestScore) || 0,
              lowestScore: parseInt(formData.lowestScore) || 0,
              averageScore: parseFloat(formData.averageScore) || 0,
              topScore: parseInt(formData.topScore) || 0,
            }
          : r,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Result Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete result
  const handleDeleteResult = (id) => {
    Swal.fire({
      title: "Delete Result?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExamResults(examResults.filter((r) => r.id !== id));
        Swal.fire("Deleted!", "Result has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (result) => {
    setSelectedResult(result);
    setFormData({
      title: result.title,
      class: result.class,
      subject: result.subject,
      date: result.date,
      totalStudents: result.totalStudents,
      passed: result.passed,
      failed: result.failed,
      highestScore: result.highestScore,
      lowestScore: result.lowestScore,
      averageScore: result.averageScore,
      status: result.status,
      topStudent: result.topStudent || "",
      topScore: result.topScore || "",
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (result) => {
    setSelectedResult(result);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      class: "",
      subject: "",
      date: "",
      totalStudents: "",
      passed: "",
      failed: "",
      highestScore: "",
      lowestScore: "",
      averageScore: "",
      status: "Draft",
      topStudent: "",
      topScore: "",
    });
    setSelectedResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Exam Results</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            overflow-y-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {teacherInfo.name?.charAt(0) || "T"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{teacherInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {teacherInfo.designation}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                    ${
                      activeMenu === item.id
                        ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaAward className="text-teal-600" /> Exam Results
              </h1>
              <p className="text-sm text-gray-500">
                Manage and track exam results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {teacherInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">
                {examResults.length}
              </p>
              <p className="text-xs text-gray-500">Total Exams</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {examResults.filter((r) => r.status === "Published").length}
              </p>
              <p className="text-xs text-gray-500">Published</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {examResults.filter((r) => r.status === "Pending").length}
              </p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {examResults.reduce((sum, r) => sum + r.totalStudents, 0)}
              </p>
              <p className="text-xs text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  examResults.reduce((sum, r) => sum + r.passPercentage, 0) /
                    examResults.length || 0,
                )}
                %
              </p>
              <p className="text-xs text-gray-500">Avg Pass Rate</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search results by title, class, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {uniqueSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <FaPlusCircle /> Add Result
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div
                  className={`h-1 ${
                    result.status === "Published"
                      ? "bg-green-500"
                      : result.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                ></div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        {result.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {result.subject} • {result.class}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(result.status)}`}
                    >
                      {result.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" /> {result.date}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaUsers className="text-gray-400" />{" "}
                      {result.totalStudents} Students
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" /> Passed:{" "}
                      {result.passed}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaTimesCircle className="text-red-500" /> Failed:{" "}
                      {result.failed}
                    </p>
                  </div>

                  {/* Pass Percentage */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Pass Rate</span>
                      <span className={getPassColor(result.passPercentage)}>
                        {result.passPercentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          result.passPercentage >= 85
                            ? "bg-green-500"
                            : result.passPercentage >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${result.passPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Top Student */}
                  {result.topStudent && (
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      Top: {result.topStudent} ({result.topScore}%)
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openDetailsModal(result)}
                      className="text-teal-600 hover:text-teal-800 text-xs font-medium flex-1 text-center py-1.5 rounded-lg border border-teal-200 hover:bg-teal-50 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openEditModal(result)}
                      className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteResult(result.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResults.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <FaAward className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-teal-600" /> Add Exam Result
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddResult} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mid Term Exam 2026"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalStudents: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passed *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.passed}
                    onChange={(e) =>
                      setFormData({ ...formData, passed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Failed *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.failed}
                    onChange={(e) =>
                      setFormData({ ...formData, failed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highest Score
                  </label>
                  <input
                    type="number"
                    value={formData.highestScore}
                    onChange={(e) =>
                      setFormData({ ...formData, highestScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="98"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lowest Score
                  </label>
                  <input
                    type="number"
                    value={formData.lowestScore}
                    onChange={(e) =>
                      setFormData({ ...formData, lowestScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Score
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.averageScore}
                    onChange={(e) =>
                      setFormData({ ...formData, averageScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="78.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Student
                  </label>
                  <input
                    type="text"
                    value={formData.topStudent}
                    onChange={(e) =>
                      setFormData({ ...formData, topStudent: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Score
                  </label>
                  <input
                    type="number"
                    value={formData.topScore}
                    onChange={(e) =>
                      setFormData({ ...formData, topScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="98"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Result
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Exam Result
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditResult} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mid Term Exam 2026"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalStudents: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passed *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.passed}
                    onChange={(e) =>
                      setFormData({ ...formData, passed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Failed *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.failed}
                    onChange={(e) =>
                      setFormData({ ...formData, failed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highest Score
                  </label>
                  <input
                    type="number"
                    value={formData.highestScore}
                    onChange={(e) =>
                      setFormData({ ...formData, highestScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="98"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lowest Score
                  </label>
                  <input
                    type="number"
                    value={formData.lowestScore}
                    onChange={(e) =>
                      setFormData({ ...formData, lowestScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Score
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.averageScore}
                    onChange={(e) =>
                      setFormData({ ...formData, averageScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="78.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Student
                  </label>
                  <input
                    type="text"
                    value={formData.topStudent}
                    onChange={(e) =>
                      setFormData({ ...formData, topStudent: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Score
                  </label>
                  <input
                    type="number"
                    value={formData.topScore}
                    onChange={(e) =>
                      setFormData({ ...formData, topScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="98"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Result
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Details Modal */}
      {showDetailsModal && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaAward className="text-teal-600" /> Exam Result Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedResult.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedResult.subject} • {selectedResult.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedResult.status)}`}
                    >
                      {selectedResult.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Exam Date</p>
                    <p className="font-semibold">{selectedResult.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Students</p>
                    <p className="font-semibold">
                      {selectedResult.totalStudents}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Passed</p>
                      <p className="font-semibold text-green-600">
                        {selectedResult.passed}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Failed</p>
                      <p className="font-semibold text-red-600">
                        {selectedResult.failed}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Score Statistics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Highest Score</span>
                        <span className="font-semibold text-green-600">
                          {selectedResult.highestScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lowest Score</span>
                        <span className="font-semibold text-red-600">
                          {selectedResult.lowestScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Average Score</span>
                        <span className="font-semibold text-blue-600">
                          {selectedResult.averageScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Pass Rate
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            selectedResult.passPercentage >= 85
                              ? "bg-green-500"
                              : selectedResult.passPercentage >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${selectedResult.passPercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {selectedResult.passPercentage}%
                      </span>
                    </div>
                  </div>

                  {selectedResult.topStudent && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                        <FaStar className="text-yellow-500" /> Top Performer
                      </h4>
                      <p className="text-gray-700">
                        {selectedResult.topStudent} - {selectedResult.topScore}%
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      <FaDownload className="inline mr-2" /> Download Report
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedResult);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_results;
