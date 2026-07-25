// src/Page/Teacher/Teacher_courses.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaVideo,
  FaFileAlt,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaSearch,
  FaLink,
  FaPlay,
  FaUser,
  FaTasks,
  FaBell,
  FaAward,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPen,
  FaHome,
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdGrade, MdQuiz } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const TeacherCourses = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("courses");
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

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Tajweed - Beginner Level",
      code: "TAJ-101",
      department: "Islamic Studies",
      class: "Class 8",
      students: 30,
      sessions: 24,
      duration: "3 months",
      status: "Active",
      startDate: "2026-01-15",
      endDate: "2026-04-15",
      schedule: "Mon, Wed 09:00 AM",
      description: "Learn the basic rules of Tajweed for Quran recitation",
      image: null,
      teacher: "Ustadh Ahmad",
      progress: 75,
      materials: 12,
      assignments: 5,
      quizzes: 3,
      videos: 8,
    },
    {
      id: 2,
      name: "Tafsir - Quranic Studies",
      code: "TAF-201",
      department: "Islamic Studies",
      class: "Class 9",
      students: 25,
      sessions: 20,
      duration: "4 months",
      status: "Active",
      startDate: "2026-02-01",
      endDate: "2026-06-01",
      schedule: "Tue, Thu 11:00 AM",
      description: "Detailed interpretation and explanation of the Quran",
      image: null,
      teacher: "Ustadh Ahmad",
      progress: 60,
      materials: 15,
      assignments: 4,
      quizzes: 2,
      videos: 6,
    },
    {
      id: 3,
      name: "Hadith - Sahih Bukhari",
      code: "HAD-301",
      department: "Islamic Studies",
      class: "Class 10",
      students: 28,
      sessions: 30,
      duration: "6 months",
      status: "Active",
      startDate: "2026-01-10",
      endDate: "2026-07-10",
      schedule: "Sat, Sun 10:00 AM",
      description: "Study of authentic Hadith from Sahih Bukhari",
      image: null,
      teacher: "Ustadh Ahmad",
      progress: 40,
      materials: 20,
      assignments: 6,
      quizzes: 4,
      videos: 10,
    },
    {
      id: 4,
      name: "Fiqh - Islamic Jurisprudence",
      code: "FIQ-101",
      department: "Islamic Studies",
      class: "Class 7",
      students: 20,
      sessions: 18,
      duration: "3 months",
      status: "Draft",
      startDate: "2026-03-01",
      endDate: "2026-06-01",
      schedule: "Mon, Wed 02:00 PM",
      description: "Understanding Islamic rulings and jurisprudence",
      image: null,
      teacher: "Ustadh Ahmad",
      progress: 10,
      materials: 8,
      assignments: 2,
      quizzes: 1,
      videos: 3,
    },
    {
      id: 5,
      name: "Aqeedah - Islamic Beliefs",
      code: "AQD-101",
      department: "Islamic Studies",
      class: "Class 6",
      students: 22,
      sessions: 16,
      duration: "2 months",
      status: "Active",
      startDate: "2026-02-15",
      endDate: "2026-04-15",
      schedule: "Tue, Thu 09:00 AM",
      description: "Study of Islamic creed and fundamental beliefs",
      image: null,
      teacher: "Ustadh Ahmad",
      progress: 55,
      materials: 10,
      assignments: 3,
      quizzes: 2,
      videos: 5,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    class: "",
    duration: "",
    status: "Draft",
    startDate: "",
    endDate: "",
    schedule: "",
    description: "",
    teacher: "",
  });

  // Load teacher info
  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacherInfo");
    if (savedTeacher) {
      const teacher = JSON.parse(savedTeacher);
      setTeacherInfo(teacher);
      setFormData((prev) => ({
        ...prev,
        teacher: teacher.name || "Ustadh Ahmad",
      }));
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
      id: "dashboard",
      path: "/teacher-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/teacher-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
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
      label: "Student Progress",
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

  // Handle search
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || course.status === filterStatus;
    const matchesClass = filterClass === "All" || course.class === filterClass;
    return matchesSearch && matchesStatus && matchesClass;
  });

  // Get unique classes for filter
  const uniqueClasses = ["All", ...new Set(courses.map((c) => c.class))];

  // Handle add course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.code ||
      !formData.class ||
      !formData.startDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newCourse = {
      id: Date.now(),
      ...formData,
      students: 0,
      sessions: 0,
      progress: 0,
      materials: 0,
      assignments: 0,
      quizzes: 0,
      videos: 0,
      image: null,
    };

    setCourses([...courses, newCourse]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Course Created!",
      text: "New course has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit course
  const handleEditCourse = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.code ||
      !formData.class ||
      !formData.startDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setCourses(
      courses.map((c) =>
        c.id === selectedCourse.id ? { ...c, ...formData } : c,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Course Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete course
  const handleDeleteCourse = (id) => {
    Swal.fire({
      title: "Delete Course?",
      text: "This action cannot be undone! All associated content will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCourses(courses.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Course has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      department: course.department,
      class: course.class,
      duration: course.duration,
      status: course.status,
      startDate: course.startDate,
      endDate: course.endDate,
      schedule: course.schedule,
      description: course.description,
      teacher: course.teacher,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      department: "",
      class: "",
      duration: "",
      status: "Draft",
      startDate: "",
      endDate: "",
      schedule: "",
      description: "",
      teacher: "",
    });
    setSelectedCourse(null);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 70) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">My Courses</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            overflow-y-auto
            flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          {/* Sidebar Header */}
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

          {/* Navigation Menu */}
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

            {/* Logout Button */}
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

        {/* ================= OVERLAY (Mobile) ================= */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full min-h-screen">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800">My Courses</h1>
              <p className="text-sm text-gray-500">
                Manage and organize your courses
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

          {/* Course Content */}
          <div className="space-y-6">
            {/* Create Course Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <FaPlusCircle /> Create Course
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
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
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 ${
                        viewMode === "grid"
                          ? "bg-teal-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaBook />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 ${
                        viewMode === "list"
                          ? "bg-teal-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaFileAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
                <p className="text-2xl font-bold text-teal-600">
                  {courses.length}
                </p>
                <p className="text-xs text-gray-500">Total Courses</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {courses.filter((c) => c.status === "Active").length}
                </p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {courses.filter((c) => c.status === "Draft").length}
                </p>
                <p className="text-xs text-gray-500">Draft</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
                <p className="text-xs text-gray-500">Total Students</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {courses.reduce((sum, c) => sum + c.sessions, 0)}
                </p>
                <p className="text-xs text-gray-500">Total Sessions</p>
              </div>
            </div>

            {/* Course Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Course Image Placeholder */}
                    <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                      <div className="text-white text-center">
                        <FaBook className="text-4xl mx-auto mb-1" />
                        <p className="text-sm font-bold">{course.code}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1">
                            {course.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {course.department}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}
                        >
                          {course.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-sm">
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaChalkboardTeacher className="text-gray-400" />{" "}
                          {course.class}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaUsers className="text-gray-400" />{" "}
                          {course.students} Students
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />{" "}
                          {course.startDate} - {course.endDate}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
                        <span className="flex items-center gap-1">
                          <FaVideo className="text-purple-500" />{" "}
                          {course.videos}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdAssignment className="text-blue-500" />{" "}
                          {course.assignments}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdQuiz className="text-green-500" /> {course.quizzes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaFileAlt className="text-orange-500" />{" "}
                          {course.materials}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => openDetailsModal(course)}
                          className="text-teal-600 hover:text-teal-800 text-xs font-medium flex-1 text-center py-1 rounded border border-teal-200 hover:bg-teal-50 transition-all"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => openEditModal(course)}
                          className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
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
                          Course
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                          Class
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                          Students
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                          Progress
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredCourses.map((course) => (
                        <tr
                          key={course.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-sm text-gray-800">
                                {course.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {course.code} • {course.department}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {course.class}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {course.students}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${getProgressColor(course.progress)}`}
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">
                                {course.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}
                            >
                              {course.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openDetailsModal(course)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                              >
                                <FaEye />
                              </button>
                              <button
                                onClick={() => openEditModal(course)}
                                className="text-green-600 hover:text-green-800 p-1"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-red-600 hover:text-red-800 p-1"
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
            {filteredCourses.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
                <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  No Courses Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-teal-600" /> Create New Course
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Tajweed - Beginner Level"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., TAJ-101"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Islamic Studies">Islamic Studies</option>
                    <option value="Arabic Language">Arabic Language</option>
                    <option value="Quran Studies">Quran Studies</option>
                    <option value="Hadith Studies">Hadith Studies</option>
                  </select>
                </div>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 3 months"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mon, Wed 09:00 AM"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter course description"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Create Course
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

      {/* Edit Course Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Course
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditCourse} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Tajweed - Beginner Level"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., TAJ-101"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Islamic Studies">Islamic Studies</option>
                    <option value="Arabic Language">Arabic Language</option>
                    <option value="Quran Studies">Quran Studies</option>
                    <option value="Hadith Studies">Hadith Studies</option>
                  </select>
                </div>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 3 months"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mon, Wed 09:00 AM"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter course description"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Course
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

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                Course Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Course Info */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedCourse.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedCourse.code} • {selectedCourse.department}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Class</p>
                      <p className="font-semibold">{selectedCourse.class}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedCourse.status)}`}
                      >
                        {selectedCourse.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{selectedCourse.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teacher</p>
                      <p className="font-semibold">{selectedCourse.teacher}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Schedule</p>
                    <p className="font-semibold">{selectedCourse.schedule}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Range</p>
                    <p className="font-semibold">
                      {selectedCourse.startDate} - {selectedCourse.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-gray-700">
                      {selectedCourse.description || "No description provided"}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Course Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Students</span>
                        <span className="font-semibold">
                          {selectedCourse.students}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sessions</span>
                        <span className="font-semibold">
                          {selectedCourse.sessions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Videos</span>
                        <span className="font-semibold">
                          {selectedCourse.videos}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Assignments</span>
                        <span className="font-semibold">
                          {selectedCourse.assignments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quizzes</span>
                        <span className="font-semibold">
                          {selectedCourse.quizzes}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Materials</span>
                        <span className="font-semibold">
                          {selectedCourse.materials}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Course Progress
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getProgressColor(selectedCourse.progress)}`}
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {selectedCourse.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      <FaLink className="inline mr-2" /> Go to Course
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedCourse);
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

export default TeacherCourses;
