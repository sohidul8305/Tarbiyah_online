// src/Page/Teacher/Teacher_classes.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaLink,
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaUsers,
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
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdGrade, MdQuiz } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const Teacher_classes = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("classes");
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

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Tajweed - Beginner Level",
      subject: "Tajweed",
      class: "Class 8",
      teacher: "Ustadh Ahmad",
      time: "09:00 AM - 10:00 AM",
      days: ["Monday", "Wednesday"],
      startDate: "2026-01-15",
      endDate: "2026-04-15",
      students: 30,
      status: "Active",
      link: "https://meet.google.com/abc-defg-hij",
      description: "Learn the basic rules of Tajweed for Quran recitation",
      materials: 12,
      assignments: 5,
      quizzes: 3,
      videos: 8,
      attendance: 92,
      isToday: true,
    },
    {
      id: 2,
      name: "Tafsir - Quranic Studies",
      subject: "Tafsir",
      class: "Class 9",
      teacher: "Ustadh Ahmad",
      time: "11:00 AM - 12:00 PM",
      days: ["Tuesday", "Thursday"],
      startDate: "2026-02-01",
      endDate: "2026-06-01",
      students: 25,
      status: "Active",
      link: "https://meet.google.com/klm-nopq-rst",
      description: "Detailed interpretation and explanation of the Quran",
      materials: 15,
      assignments: 4,
      quizzes: 2,
      videos: 6,
      attendance: 85,
      isToday: true,
    },
    {
      id: 3,
      name: "Hadith - Sahih Bukhari",
      subject: "Hadith",
      class: "Class 10",
      teacher: "Ustadh Ahmad",
      time: "10:00 AM - 11:30 AM",
      days: ["Saturday", "Sunday"],
      startDate: "2026-01-10",
      endDate: "2026-07-10",
      students: 28,
      status: "Active",
      link: "https://meet.google.com/xyz-uvwx-yz",
      description: "Study of authentic Hadith from Sahih Bukhari",
      materials: 20,
      assignments: 6,
      quizzes: 4,
      videos: 10,
      attendance: 78,
      isToday: false,
    },
    {
      id: 4,
      name: "Fiqh - Islamic Jurisprudence",
      subject: "Fiqh",
      class: "Class 7",
      teacher: "Ustadh Ahmad",
      time: "02:00 PM - 03:00 PM",
      days: ["Monday", "Wednesday"],
      startDate: "2026-03-01",
      endDate: "2026-06-01",
      students: 20,
      status: "Upcoming",
      link: "https://meet.google.com/abc-xyz-123",
      description: "Understanding Islamic rulings and jurisprudence",
      materials: 8,
      assignments: 2,
      quizzes: 1,
      videos: 3,
      attendance: 0,
      isToday: false,
    },
    {
      id: 5,
      name: "Aqeedah - Islamic Beliefs",
      subject: "Aqeedah",
      class: "Class 6",
      teacher: "Ustadh Ahmad",
      time: "09:00 AM - 10:30 AM",
      days: ["Tuesday", "Thursday"],
      startDate: "2026-02-15",
      endDate: "2026-04-15",
      students: 22,
      status: "Active",
      link: "https://meet.google.com/def-ghi-456",
      description: "Study of Islamic creed and fundamental beliefs",
      materials: 10,
      assignments: 3,
      quizzes: 2,
      videos: 5,
      attendance: 88,
      isToday: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    class: "",
    time: "",
    days: [],
    startDate: "",
    endDate: "",
    link: "",
    description: "",
    status: "Active",
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
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || cls.status === filterStatus;
    const matchesClass = filterClass === "All" || cls.class === filterClass;
    const matchesToday = showTodayOnly ? cls.isToday === true : true;
    return matchesSearch && matchesStatus && matchesClass && matchesToday;
  });

  // Get unique classes for filter
  const uniqueClasses = ["All", ...new Set(classes.map((c) => c.class))];

  // Handle add class
  const handleAddClass = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.subject ||
      !formData.class ||
      !formData.time ||
      !formData.link
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newClass = {
      id: Date.now(),
      ...formData,
      students: 0,
      materials: 0,
      assignments: 0,
      quizzes: 0,
      videos: 0,
      attendance: 0,
      teacher: teacherInfo.name || "Ustadh Ahmad",
      isToday: false,
    };

    setClasses([...classes, newClass]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Class Added!",
      text: "New class has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit class
  const handleEditClass = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.subject ||
      !formData.class ||
      !formData.time ||
      !formData.link
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setClasses(
      classes.map((c) =>
        c.id === selectedClass.id ? { ...c, ...formData } : c,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Class Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete class
  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Delete Class?",
      text: "This action cannot be undone! All associated content will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setClasses(classes.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Class has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setFormData({
      name: cls.name,
      subject: cls.subject,
      class: cls.class,
      time: cls.time,
      days: cls.days || [],
      startDate: cls.startDate,
      endDate: cls.endDate,
      link: cls.link,
      description: cls.description || "",
      status: cls.status,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (cls) => {
    setSelectedClass(cls);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      subject: "",
      class: "",
      time: "",
      days: [],
      startDate: "",
      endDate: "",
      link: "",
      description: "",
      status: "Active",
    });
    setSelectedClass(null);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-purple-100 text-purple-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get attendance color
  const getAttendanceColor = (attendance) => {
    if (attendance >= 80) return "text-green-600";
    if (attendance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Toggle day selection
  const toggleDay = (day) => {
    setFormData((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  // Get today's classes count
  const todayClassesCount = classes.filter((c) => c.isToday === true).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">My Classes</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            flex-shrink-0
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

        {/* Main Content - No Scroll */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaChalkboardTeacher className="text-purple-600" /> My Classes
              </h1>
              <p className="text-xs text-gray-500">
                Manage your class schedule
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {teacherInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Today's Classes Banner */}
          {todayClassesCount > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 text-white rounded-full p-1.5">
                  <FaCalendarCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-purple-800">
                    Today's Classes
                  </p>
                  <p className="text-xs text-purple-600">
                    You have {todayClassesCount} class
                    {todayClassesCount > 1 ? "es" : ""} today
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTodayOnly(!showTodayOnly)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  showTodayOnly
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
                }`}
              >
                {showTodayOnly ? "Show All" : "View Today's Classes"}
              </button>
            </div>
          )}

          {/* Class Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {classes.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Classes</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {classes.filter((c) => c.status === "Active").length}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {classes.filter((c) => c.status === "Upcoming").length}
              </p>
              <p className="text-[10px] text-gray-500">Upcoming</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {classes.reduce((sum, c) => sum + c.students, 0)}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-teal-600">
                {Math.round(
                  classes.reduce((sum, c) => sum + c.attendance, 0) /
                    classes.length,
                ) || 0}
                %
              </p>
              <p className="text-[10px] text-gray-500">Avg Attendance</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5 transition-all"
                >
                  <FaPlusCircle size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Class Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
            {filteredClasses.slice(0, 6).map((cls) => (
              <div
                key={cls.id}
                className={`bg-white border ${
                  cls.isToday
                    ? "border-purple-400 shadow-md"
                    : "border-gray-200"
                } rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden`}
              >
                <div
                  className={`h-1 ${
                    cls.isToday
                      ? "bg-purple-600"
                      : cls.status === "Active"
                        ? "bg-green-500"
                        : cls.status === "Upcoming"
                          ? "bg-blue-500"
                          : cls.status === "Completed"
                            ? "bg-purple-500"
                            : "bg-red-500"
                  }`}
                ></div>
                {cls.isToday && (
                  <div className="bg-purple-600 text-white text-[8px] font-bold px-2 py-0.5 flex items-center gap-1">
                    <FaCalendarCheck size={10} /> Today's Class
                  </div>
                )}
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-xs mb-0.5 line-clamp-2">
                        {cls.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">{cls.subject}</p>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(cls.status)}`}
                    >
                      {cls.status}
                    </span>
                  </div>

                  <div className="mt-1.5 space-y-0.5 text-[10px]">
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaChalkboardTeacher
                        className="text-gray-400"
                        size={10}
                      />{" "}
                      {cls.class}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaClock className="text-gray-400" size={10} /> {cls.time}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" size={10} />{" "}
                      {cls.days?.join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaUsers className="text-gray-400" size={10} />{" "}
                      {cls.students} Students
                    </p>
                  </div>

                  {/* Attendance */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[8px] text-gray-500">
                      Attendance:
                    </span>
                    <span
                      className={`text-[10px] font-bold ${getAttendanceColor(cls.attendance)}`}
                    >
                      {cls.attendance}%
                    </span>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cls.attendance >= 80
                            ? "bg-green-500"
                            : cls.attendance >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${cls.attendance}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Class Stats */}
                  <div className="mt-1.5 flex items-center gap-2 text-[8px] text-gray-500 border-t border-gray-100 pt-1.5">
                    <span className="flex items-center gap-0.5">
                      <FaVideo className="text-purple-500" size={10} />{" "}
                      {cls.videos}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MdAssignment className="text-blue-500" size={10} />{" "}
                      {cls.assignments}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MdQuiz className="text-green-500" size={10} />{" "}
                      {cls.quizzes}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <FaBook className="text-orange-500" size={10} />{" "}
                      {cls.materials}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-1.5 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                    <a
                      href={cls.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        cls.isToday
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white text-[8px] font-medium flex-1 text-center py-1 rounded transition-all flex items-center justify-center gap-0.5`}
                    >
                      {cls.isToday ? (
                        <>
                          <FaArrowRight size={10} /> Join Now
                        </>
                      ) : (
                        <>
                          <FaLink size={10} /> Join Class
                        </>
                      )}
                    </a>
                    <button
                      onClick={() => openDetailsModal(cls)}
                      className="text-blue-600 hover:text-blue-800 p-0.5 rounded hover:bg-blue-50 transition-all"
                      title="View Details"
                    >
                      <FaEye size={12} />
                    </button>
                    <button
                      onClick={() => openEditModal(cls)}
                      className="text-green-600 hover:text-green-800 p-0.5 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="text-red-600 hover:text-red-800 p-0.5 rounded hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredClasses.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
              <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                {showTodayOnly ? "No Classes Today" : "No Classes Found"}
              </h3>
              <p className="text-xs text-gray-500">
                {showTodayOnly
                  ? "You don't have any classes scheduled for today"
                  : "Try adjusting your search or filter criteria"}
              </p>
              {showTodayOnly && (
                <button
                  onClick={() => setShowTodayOnly(false)}
                  className="mt-2 text-purple-600 hover:text-purple-800 text-xs font-medium"
                >
                  Show All Classes
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-purple-600" /> Add New Class
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Tajweed - Beginner Level"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 09:00 AM - 10:00 AM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Days
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        formData.days.includes(day)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Link *
                </label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter class description"
                />
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Class
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

      {/* Edit Class Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Class
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditClass} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Tajweed - Beginner Level"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 09:00 AM - 10:00 AM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Days
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        formData.days.includes(day)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Link *
                </label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter class description"
                />
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Class
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

      {/* Class Details Modal */}
      {showDetailsModal && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Class Details</h3>
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
                      {selectedClass.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedClass.subject} • {selectedClass.class}
                    </p>
                  </div>
                  {selectedClass.isToday && (
                    <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                      <FaCalendarCheck /> Today's Class
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedClass.status)}`}
                    >
                      {selectedClass.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teacher</p>
                    <p className="font-semibold">{selectedClass.teacher}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Schedule</p>
                    <p className="font-semibold">{selectedClass.time}</p>
                    <p className="text-sm text-gray-600">
                      {selectedClass.days?.join(", ") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Range</p>
                    <p className="font-semibold">
                      {selectedClass.startDate} - {selectedClass.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Meeting Link</p>
                    <a
                      href={selectedClass.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1"
                    >
                      <FaLink /> Join Class
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-gray-700">
                      {selectedClass.description || "No description provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Class Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Students</span>
                        <span className="font-semibold">
                          {selectedClass.students}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Videos</span>
                        <span className="font-semibold">
                          {selectedClass.videos}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Assignments</span>
                        <span className="font-semibold">
                          {selectedClass.assignments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quizzes</span>
                        <span className="font-semibold">
                          {selectedClass.quizzes}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Materials</span>
                        <span className="font-semibold">
                          {selectedClass.materials}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Attendance
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            selectedClass.attendance >= 80
                              ? "bg-green-500"
                              : selectedClass.attendance >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${selectedClass.attendance}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {selectedClass.attendance}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={selectedClass.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 ${
                        selectedClass.isToday
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white px-4 py-2 rounded-lg font-semibold text-sm text-center transition-all`}
                    >
                      {selectedClass.isToday ? (
                        <>
                          <FaArrowRight className="inline mr-2" /> Join Now
                        </>
                      ) : (
                        <>
                          <FaLink className="inline mr-2" /> Join Class
                        </>
                      )}
                    </a>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedClass);
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

export default Teacher_classes;
