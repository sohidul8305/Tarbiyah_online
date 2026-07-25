// src/Page/Teacher/Teacher_students.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaTasks,
  FaBell,
  FaUser,
  FaAward,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPlay,
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDownload,
  FaPrint,
  FaChartLine,
  FaStar,
  FaStarHalfAlt,
  FaUserCheck,
  FaUserTimes,
  FaGraduationCap,
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

const Teacher_students = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("students");
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

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Hasan",
      email: "ahmed@example.com",
      phone: "+880 1712 345678",
      class: "Class 8",
      subject: "Tajweed",
      roll: "01",
      attendance: 92,
      assignments: 85,
      quiz: 78,
      exam: 88,
      progress: 85,
      performance: "Excellent",
      joinDate: "2026-01-15",
      status: "Active",
      parentContact: "+880 1812 345678",
      address: "Mohammadpur, Dhaka",
      submittedHomework: 12,
      totalHomework: 15,
      submittedQuiz: 8,
      totalQuiz: 10,
      averageScore: 82.5,
    },
    {
      id: 2,
      name: "Fatima Begum",
      email: "fatima@example.com",
      phone: "+880 1723 456789",
      class: "Class 8",
      subject: "Tajweed",
      roll: "02",
      attendance: 88,
      assignments: 90,
      quiz: 82,
      exam: 91,
      progress: 87,
      performance: "Excellent",
      joinDate: "2026-01-15",
      status: "Active",
      parentContact: "+880 1823 456789",
      address: "Mirpur, Dhaka",
      submittedHomework: 14,
      totalHomework: 15,
      submittedQuiz: 9,
      totalQuiz: 10,
      averageScore: 88.2,
    },
    {
      id: 3,
      name: "Mohammad Ali",
      email: "ali@example.com",
      phone: "+880 1734 567890",
      class: "Class 9",
      subject: "Tafsir",
      roll: "05",
      attendance: 75,
      assignments: 70,
      quiz: 65,
      exam: 72,
      progress: 70,
      performance: "Good",
      joinDate: "2026-02-01",
      status: "Active",
      parentContact: "+880 1834 567890",
      address: "Uttara, Dhaka",
      submittedHomework: 10,
      totalHomework: 14,
      submittedQuiz: 6,
      totalQuiz: 10,
      averageScore: 70.5,
    },
    {
      id: 4,
      name: "Aisha Rahman",
      email: "aisha@example.com",
      phone: "+880 1745 678901",
      class: "Class 9",
      subject: "Tafsir",
      roll: "06",
      attendance: 95,
      assignments: 88,
      quiz: 85,
      exam: 90,
      progress: 89,
      performance: "Excellent",
      joinDate: "2026-02-01",
      status: "Active",
      parentContact: "+880 1845 678901",
      address: "Gulshan, Dhaka",
      submittedHomework: 13,
      totalHomework: 14,
      submittedQuiz: 8,
      totalQuiz: 10,
      averageScore: 89.0,
    },
    {
      id: 5,
      name: "Abdullah Karim",
      email: "abdullah@example.com",
      phone: "+880 1756 789012",
      class: "Class 10",
      subject: "Hadith",
      roll: "10",
      attendance: 82,
      assignments: 78,
      quiz: 72,
      exam: 76,
      progress: 77,
      performance: "Good",
      joinDate: "2026-01-10",
      status: "Active",
      parentContact: "+880 1856 789012",
      address: "Dhanmondi, Dhaka",
      submittedHomework: 11,
      totalHomework: 15,
      submittedQuiz: 7,
      totalQuiz: 10,
      averageScore: 78.0,
    },
    {
      id: 6,
      name: "Maryam Akter",
      email: "maryam@example.com",
      phone: "+880 1767 890123",
      class: "Class 10",
      subject: "Hadith",
      roll: "11",
      attendance: 78,
      assignments: 72,
      quiz: 68,
      exam: 70,
      progress: 72,
      performance: "Good",
      joinDate: "2026-01-10",
      status: "Pending",
      parentContact: "+880 1867 890123",
      address: "Bashundhara, Dhaka",
      submittedHomework: 9,
      totalHomework: 15,
      submittedQuiz: 6,
      totalQuiz: 10,
      averageScore: 71.0,
    },
    {
      id: 7,
      name: "Yusuf Khan",
      email: "yusuf@example.com",
      phone: "+880 1778 901234",
      class: "Class 7",
      subject: "Fiqh",
      roll: "03",
      attendance: 65,
      assignments: 60,
      quiz: 55,
      exam: 58,
      progress: 60,
      performance: "Average",
      joinDate: "2026-03-01",
      status: "Active",
      parentContact: "+880 1878 901234",
      address: "Moghbazar, Dhaka",
      submittedHomework: 8,
      totalHomework: 12,
      submittedQuiz: 5,
      totalQuiz: 8,
      averageScore: 60.0,
    },
    {
      id: 8,
      name: "Zainab Islam",
      email: "zainab@example.com",
      phone: "+880 1789 012345",
      class: "Class 6",
      subject: "Aqeedah",
      roll: "02",
      attendance: 90,
      assignments: 85,
      quiz: 80,
      exam: 86,
      progress: 85,
      performance: "Excellent",
      joinDate: "2026-02-15",
      status: "Active",
      parentContact: "+880 1889 012345",
      address: "Banani, Dhaka",
      submittedHomework: 11,
      totalHomework: 13,
      submittedQuiz: 7,
      totalQuiz: 8,
      averageScore: 86.0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterPerformance, setFilterPerformance] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "All" || student.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || student.subject === filterSubject;
    const matchesPerformance =
      filterPerformance === "All" || student.performance === filterPerformance;
    return (
      matchesSearch && matchesClass && matchesSubject && matchesPerformance
    );
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(students.map((s) => s.class))];
  const uniqueSubjects = ["All", ...new Set(students.map((s) => s.subject))];
  const uniquePerformances = [
    "All",
    ...new Set(students.map((s) => s.performance)),
  ];

  // Get performance badge color
  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Average":
        return "bg-yellow-100 text-yellow-700";
      case "Poor":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Open details modal
  const openDetailsModal = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Render stars for performance
  const renderStars = (performance) => {
    let stars = 0;
    switch (performance) {
      case "Excellent":
        stars = 5;
        break;
      case "Good":
        stars = 4;
        break;
      case "Average":
        stars = 3;
        break;
      case "Poor":
        stars = 2;
        break;
      default:
        stars = 0;
    }
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < stars ? "text-yellow-400" : "text-gray-300"}
            size={14}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Student Progress</h1>
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
                <FaUsers className="text-teal-600" /> Student Progress Report
              </h1>
              <p className="text-sm text-gray-500">
                Track student performance across all subjects
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
                {students.length}
              </p>
              <p className="text-xs text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {students.filter((s) => s.status === "Active").length}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {students.filter((s) => s.performance === "Excellent").length}
              </p>
              <p className="text-xs text-gray-500">Excellent</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  students.reduce((sum, s) => sum + s.attendance, 0) /
                    students.length,
                )}
                %
              </p>
              <p className="text-xs text-gray-500">Avg Attendance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(
                  students.reduce((sum, s) => sum + s.progress, 0) /
                    students.length,
                )}
                %
              </p>
              <p className="text-xs text-gray-500">Avg Progress</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, email, class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
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
                <select
                  value={filterPerformance}
                  onChange={(e) => setFilterPerformance(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {uniquePerformances.map((perf) => (
                    <option key={perf} value={perf}>
                      {perf}
                    </option>
                  ))}
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${
                      viewMode === "grid"
                        ? "bg-teal-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaUsers />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${
                      viewMode === "list"
                        ? "bg-teal-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaChartLine />
                  </button>
                </div>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "info",
                      title: "Export Report",
                      text: "Student report will be exported as PDF",
                      confirmButtonColor: "#004d4d",
                    });
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <FaDownload /> Export
                </button>
              </div>
            </div>
          </div>

          {/* Student Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      student.performance === "Excellent"
                        ? "bg-green-500"
                        : student.performance === "Good"
                          ? "bg-blue-500"
                          : student.performance === "Average"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                  ></div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                              {student.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {student.class} • {student.subject}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(student.performance)}`}
                      >
                        {student.performance}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-sm">
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaUserGraduate className="text-gray-400" /> Roll:{" "}
                        {student.roll}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaClock className="text-gray-400" /> Joined:{" "}
                        {student.joinDate}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="text-gray-400">📧</span>{" "}
                        {student.email}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Overall Progress</span>
                        <span>{student.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs border-t border-gray-100 pt-3">
                      <div>
                        <p className="font-bold text-green-600">
                          {student.attendance}%
                        </p>
                        <p className="text-gray-500">Attendance</p>
                      </div>
                      <div>
                        <p className="font-bold text-blue-600">
                          {student.assignments}%
                        </p>
                        <p className="text-gray-500">Assignments</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-600">
                          {student.exam}%
                        </p>
                        <p className="text-gray-500">Exams</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openDetailsModal(student)}
                        className="text-teal-600 hover:text-teal-800 text-xs font-medium flex-1 text-center py-1.5 rounded-lg border border-teal-200 hover:bg-teal-50 transition-all"
                      >
                        View Full Report
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
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
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Class
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Attendance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Assignments
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Exams
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Progress
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Performance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-800">
                                {student.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {student.roll}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.class}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.subject}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-sm font-medium ${
                              student.attendance >= 80
                                ? "text-green-600"
                                : student.attendance >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.assignments}%
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.exam}%
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(student.performance)}`}
                          >
                            {student.performance}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDetailsModal(student)}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-800"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredStudents.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserGraduate className="text-teal-600" /> Student Progress
                Report
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              {/* Student Profile Header */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-4xl text-teal-700 font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedStudent.status)}`}
                    >
                      {selectedStudent.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(selectedStudent.performance)}`}
                    >
                      {selectedStudent.performance}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {selectedStudent.class} • {selectedStudent.subject}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 justify-center md:justify-start">
                    <span>📧 {selectedStudent.email}</span>
                    <span>📱 {selectedStudent.phone}</span>
                    <span>🎯 Roll: {selectedStudent.roll}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(selectedStudent.performance)}
                  <span className="text-sm font-semibold text-gray-600 ml-1">
                    ({selectedStudent.performance})
                  </span>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Performance Overview
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Attendance</span>
                        <span className="font-medium">
                          {selectedStudent.attendance}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            selectedStudent.attendance >= 80
                              ? "bg-green-500"
                              : selectedStudent.attendance >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${selectedStudent.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Assignments</span>
                        <span className="font-medium">
                          {selectedStudent.assignments}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${selectedStudent.assignments}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Quizzes</span>
                        <span className="font-medium">
                          {selectedStudent.quiz}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${selectedStudent.quiz}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Exams</span>
                        <span className="font-medium">
                          {selectedStudent.exam}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-orange-500"
                          style={{ width: `${selectedStudent.exam}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Overall Progress
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(selectedStudent.progress)}`}
                            style={{ width: `${selectedStudent.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">
                        {selectedStudent.progress}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Student Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-500">Join Date</span>
                        <span className="font-medium">
                          {selectedStudent.joinDate}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Parent Contact</span>
                        <span className="font-medium">
                          {selectedStudent.parentContact}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Address</span>
                        <span className="font-medium">
                          {selectedStudent.address}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Homework & Quiz Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FaTasks className="text-blue-500" /> Homework Progress
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${(selectedStudent.submittedHomework / selectedStudent.totalHomework) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {selectedStudent.submittedHomework}/
                      {selectedStudent.totalHomework}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <MdQuiz className="text-purple-500" /> Quiz Progress
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: `${(selectedStudent.submittedQuiz / selectedStudent.totalQuiz) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {selectedStudent.submittedQuiz}/
                      {selectedStudent.totalQuiz}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                  <FaDownload /> Download Report
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                  <FaPrint /> Print Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                  <FaEdit /> Edit Student
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_students;
