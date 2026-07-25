// src/Page/Teacher/Teacher_homework.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBook,
  FaBell,
  FaUser,
  FaAward,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaPlay,
  FaPen,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaFileAlt,
  FaUpload,
  FaPaperclip,
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdGrade, MdQuiz } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const Teacher_homework = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("homework");
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

  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: "Tajweed Practice - Lesson 5",
      subject: "Tajweed",
      class: "Class 8",
      description:
        "Practice the rules of Noon Sakinah and Tanween from Lesson 5",
      dueDate: "2026-07-28",
      totalStudents: 30,
      submissions: 12,
      pending: 18,
      status: "Active",
      priority: "High",
      marks: 50,
      attachment: "Tajweed_Lesson5.pdf",
      createdAt: "2026-07-20",
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha Analysis",
      subject: "Tafsir",
      class: "Class 9",
      description: "Write a detailed Tafsir of Surah Al-Fatiha with references",
      dueDate: "2026-07-30",
      totalStudents: 25,
      submissions: 8,
      pending: 17,
      status: "Active",
      priority: "Medium",
      marks: 100,
      attachment: "Tafsir_Assignment.pdf",
      createdAt: "2026-07-22",
    },
    {
      id: 3,
      title: "Hadith - 40 Hadith Nawawi",
      subject: "Hadith",
      class: "Class 10",
      description: "Memorize and explain 10 Hadith from 40 Hadith Nawawi",
      dueDate: "2026-08-01",
      totalStudents: 28,
      submissions: 5,
      pending: 23,
      status: "Active",
      priority: "High",
      marks: 75,
      attachment: "40_Hadith.pdf",
      createdAt: "2026-07-18",
    },
    {
      id: 4,
      title: "Fiqh - Wudu and Ghusl",
      subject: "Fiqh",
      class: "Class 7",
      description: "Write the steps of Wudu and Ghusl with evidences",
      dueDate: "2026-07-25",
      totalStudents: 20,
      submissions: 15,
      pending: 5,
      status: "Completed",
      priority: "Low",
      marks: 30,
      attachment: "Wudu_Ghusl.pdf",
      createdAt: "2026-07-15",
    },
    {
      id: 5,
      title: "Aqeedah - Tawheed",
      subject: "Aqeedah",
      class: "Class 6",
      description: "Explain the three categories of Tawheed with examples",
      dueDate: "2026-07-26",
      totalStudents: 22,
      submissions: 10,
      pending: 12,
      status: "Active",
      priority: "Medium",
      marks: 40,
      attachment: "Tawheed.pdf",
      createdAt: "2026-07-19",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    dueDate: "",
    totalStudents: "",
    marks: "",
    priority: "Medium",
    status: "Active",
    attachment: null,
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
  const filteredHomework = homeworkList.filter((hw) => {
    const matchesSearch =
      hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || hw.status === filterStatus;
    const matchesClass = filterClass === "All" || hw.class === filterClass;
    return matchesSearch && matchesStatus && matchesClass;
  });

  // Get unique classes for filter
  const uniqueClasses = ["All", ...new Set(homeworkList.map((h) => h.class))];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle add homework
  const handleAddHomework = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.subject ||
      !formData.class ||
      !formData.dueDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newHomework = {
      id: Date.now(),
      ...formData,
      totalStudents: parseInt(formData.totalStudents) || 0,
      submissions: 0,
      pending: parseInt(formData.totalStudents) || 0,
      marks: parseInt(formData.marks) || 0,
      attachment: formData.attachment ? formData.attachment.name : null,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setHomeworkList([...homeworkList, newHomework]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Homework Added!",
      text: "New homework has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit homework
  const handleEditHomework = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.subject ||
      !formData.class ||
      !formData.dueDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setHomeworkList(
      homeworkList.map((h) =>
        h.id === selectedHomework.id
          ? {
              ...h,
              ...formData,
              totalStudents:
                parseInt(formData.totalStudents) || h.totalStudents,
              marks: parseInt(formData.marks) || h.marks,
              attachment: formData.attachment
                ? formData.attachment.name
                : h.attachment,
            }
          : h,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Homework Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete homework
  const handleDeleteHomework = (id) => {
    Swal.fire({
      title: "Delete Homework?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHomeworkList(homeworkList.filter((h) => h.id !== id));
        Swal.fire("Deleted!", "Homework has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (hw) => {
    setSelectedHomework(hw);
    setFormData({
      title: hw.title,
      subject: hw.subject,
      class: hw.class,
      description: hw.description || "",
      dueDate: hw.dueDate,
      totalStudents: hw.totalStudents,
      marks: hw.marks,
      priority: hw.priority,
      status: hw.status,
      attachment: null,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (hw) => {
    setSelectedHomework(hw);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      class: "",
      description: "",
      dueDate: "",
      totalStudents: "",
      marks: "",
      priority: "Medium",
      status: "Active",
      attachment: null,
    });
    setSelectedHomework(null);
  };

  // Calculate days left
  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Homework</h1>
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
                <FaTasks className="text-orange-600" /> Homework
              </h1>
              <p className="text-sm text-gray-500">
                Manage homework assignments
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
              <p className="text-2xl font-bold text-orange-600">
                {homeworkList.length}
              </p>
              <p className="text-xs text-gray-500">Total Homework</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {homeworkList.filter((h) => h.status === "Active").length}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {homeworkList.filter((h) => h.status === "Completed").length}
              </p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {homeworkList.reduce((sum, h) => sum + h.submissions, 0)}
              </p>
              <p className="text-xs text-gray-500">Total Submissions</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {homeworkList.reduce((sum, h) => sum + h.pending, 0)}
              </p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search homework..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <FaPlusCircle /> Add Homework
                </button>
              </div>
            </div>
          </div>

          {/* Homework Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomework.map((hw) => {
              const daysLeft = getDaysLeft(hw.dueDate);
              return (
                <div
                  key={hw.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      hw.status === "Active"
                        ? "bg-green-500"
                        : hw.status === "Completed"
                          ? "bg-blue-500"
                          : hw.status === "Expired"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                    }`}
                  ></div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                          {hw.title}
                        </h3>
                        <p className="text-xs text-gray-500">{hw.subject}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(hw.status)}`}
                        >
                          {hw.status}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(hw.priority)}`}
                        >
                          {hw.priority}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-sm">
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaChalkboardTeacher className="text-gray-400" />{" "}
                        {hw.class}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" /> Due:{" "}
                        {hw.dueDate}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaClock className="text-gray-400" />{" "}
                        {daysLeft > 0
                          ? `${daysLeft} days left`
                          : daysLeft === 0
                            ? "Due today"
                            : "Overdue"}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaUsers className="text-gray-400" /> {hw.submissions}/
                        {hw.totalStudents} Submitted
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <MdGrade className="text-gray-400" /> {hw.marks} Marks
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Submission Progress</span>
                        <span>
                          {Math.round(
                            (hw.submissions / hw.totalStudents) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-orange-500"
                          style={{
                            width: `${(hw.submissions / hw.totalStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openDetailsModal(hw)}
                        className="text-orange-600 hover:text-orange-800 text-xs font-medium flex-1 text-center py-1.5 rounded-lg border border-orange-200 hover:bg-orange-50 transition-all"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => openEditModal(hw)}
                        className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteHomework(hw.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredHomework.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <FaTasks className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Homework Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Homework Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-orange-600" /> Add New Homework
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddHomework} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students
                  </label>
                  <input
                    type="number"
                    value={formData.totalStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalStudents: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    value={formData.marks}
                    onChange={(e) =>
                      setFormData({ ...formData, marks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFormData({
                        ...formData,
                        attachment: e.target.files[0],
                      });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Homework
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

      {/* Edit Homework Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Homework
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditHomework} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students
                  </label>
                  <input
                    type="number"
                    value={formData.totalStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalStudents: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    value={formData.marks}
                    onChange={(e) =>
                      setFormData({ ...formData, marks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFormData({
                        ...formData,
                        attachment: e.target.files[0],
                      });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
                {selectedHomework?.attachment && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {selectedHomework.attachment}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Homework
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

      {/* Homework Details Modal */}
      {showDetailsModal && selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                Homework Details
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
                      {selectedHomework.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedHomework.subject} • {selectedHomework.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedHomework.status)}`}
                    >
                      {selectedHomework.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Priority</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getPriorityColor(selectedHomework.priority)}`}
                    >
                      {selectedHomework.priority}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="font-semibold">{selectedHomework.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Marks</p>
                    <p className="font-semibold">{selectedHomework.marks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-gray-700">
                      {selectedHomework.description ||
                        "No description provided"}
                    </p>
                  </div>
                  {selectedHomework.attachment && (
                    <div>
                      <p className="text-xs text-gray-500">Attachment</p>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-800 font-semibold text-sm flex items-center gap-1"
                      >
                        <FaPaperclip /> {selectedHomework.attachment}
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Submission Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Students</span>
                        <span className="font-semibold">
                          {selectedHomework.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Submitted</span>
                        <span className="font-semibold text-green-600">
                          {selectedHomework.submissions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pending</span>
                        <span className="font-semibold text-red-600">
                          {selectedHomework.pending}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Submission Progress
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-orange-500"
                          style={{
                            width: `${(selectedHomework.submissions / selectedHomework.totalStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {Math.round(
                          (selectedHomework.submissions /
                            selectedHomework.totalStudents) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      <FaUsers className="inline mr-2" /> View Submissions
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedHomework);
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

export default Teacher_homework;
