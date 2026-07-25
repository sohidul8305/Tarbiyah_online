// src/Page/Teacher/Teacher_notifications.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBook,
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
  FaEnvelope,
  FaPaperPlane,
  FaExclamationTriangle,
  FaInfoCircle,
  FaThumbsUp,
  FaStar,
  FaComment,
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
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";

const Teacher_notifications = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("notifications");
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

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Student Enrolled",
      message: "Ahmed Hasan has enrolled in Class 8 - Tajweed course",
      type: "info",
      time: "2 hours ago",
      read: false,
      date: "2026-07-25",
      icon: <FaUsers className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Assignment Submission",
      message: "5 students have submitted the Tajweed Lesson 5 assignment",
      type: "success",
      time: "5 hours ago",
      read: false,
      date: "2026-07-25",
      icon: <MdAssignment className="text-green-500" />,
    },
    {
      id: 3,
      title: "Staff Meeting",
      message: "Staff meeting tomorrow at 10:00 AM in the conference room",
      type: "warning",
      time: "1 day ago",
      read: true,
      date: "2026-07-24",
      icon: <FaCalendarCheck className="text-yellow-500" />,
    },
    {
      id: 4,
      title: "Quiz Created",
      message: "New quiz 'Tafsir - Surah Al-Fatiha' has been published",
      type: "success",
      time: "2 days ago",
      read: true,
      date: "2026-07-23",
      icon: <MdQuiz className="text-purple-500" />,
    },
    {
      id: 5,
      title: "Exam Result Published",
      message: "Mid Term Exam 2026 results for Class 8 are now available",
      type: "info",
      time: "3 days ago",
      read: true,
      date: "2026-07-22",
      icon: <FaAward className="text-orange-500" />,
    },
    {
      id: 6,
      title: "Leave Application",
      message: "Your leave application for 2026-07-20 has been approved",
      type: "success",
      time: "5 days ago",
      read: true,
      date: "2026-07-20",
      icon: <FaCalendarCheck className="text-green-500" />,
    },
    {
      id: 7,
      title: "System Update",
      message: "New features have been added to the teacher dashboard",
      type: "warning",
      time: "1 week ago",
      read: true,
      date: "2026-07-18",
      icon: <FaInfoCircle className="text-blue-500" />,
    },
    {
      id: 8,
      title: "New Message",
      message: "You have received a new message from the admin",
      type: "info",
      time: "1 week ago",
      read: true,
      date: "2026-07-17",
      icon: <FaEnvelope className="text-indigo-500" />,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterRead, setFilterRead] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    date: "",
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
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || notif.type === filterType;
    const matchesRead =
      filterRead === "All" ||
      (filterRead === "Read" && notif.read) ||
      (filterRead === "Unread" && !notif.read);
    return matchesSearch && matchesType && matchesRead;
  });

  // Get notification type badge color
  const getTypeColor = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get notification type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "error":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Handle mark as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    Swal.fire({
      icon: "success",
      title: "Marked as Read",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    Swal.fire({
      icon: "success",
      title: "All notifications marked as read",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle add notification
  const handleAddNotification = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newNotification = {
      id: Date.now(),
      ...formData,
      time: "Just now",
      read: false,
      icon: getTypeIcon(formData.type),
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    setNotifications([newNotification, ...notifications]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Notification Added!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete notification
  const handleDeleteNotification = (id) => {
    Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications(notifications.filter((n) => n.id !== id));
        Swal.fire("Deleted!", "Notification has been deleted.", "success");
      }
    });
  };

  // Open details modal
  const openDetailsModal = (notif) => {
    setSelectedNotification(notif);
    if (!notif.read) {
      markAsRead(notif.id);
    }
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "info",
      date: "",
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Notifications</h1>
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
                <FaBell className="text-yellow-600" /> Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-xs text-gray-500">
                Stay updated with your notifications
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {notifications.length}
              </p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">{unreadCount}</p>
              <p className="text-[10px] text-gray-500">Unread</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {notifications.filter((n) => n.read).length}
              </p>
              <p className="text-[10px] text-gray-500">Read</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {notifications.filter((n) => n.type === "info").length}
              </p>
              <p className="text-[10px] text-gray-500">Info</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="All">Types</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
                <select
                  value={filterRead}
                  onChange={(e) => setFilterRead(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Read">Read</option>
                  <option value="Unread">Unread</option>
                </select>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] transition-all"
                  >
                    Mark All
                  </button>
                )}
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5 transition-all"
                >
                  <FaPlusCircle size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List - No Scroll */}
          <div className="space-y-1.5 overflow-hidden">
            {filteredNotifications.slice(0, 8).map((notif) => (
              <div
                key={notif.id}
                className={`bg-white border ${
                  !notif.read
                    ? "border-yellow-300 shadow-sm"
                    : "border-gray-200"
                } rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer`}
                onClick={() => openDetailsModal(notif)}
              >
                <div className="p-2.5 flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        !notif.read ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      <span className="text-base">{notif.icon}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-1">
                      <div>
                        <h3
                          className={`text-xs font-semibold ${
                            !notif.read ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {notif.title}
                        </h3>
                        <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">
                          {notif.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <span
                          className={`text-[8px] px-1 py-0.5 rounded-full ${getTypeColor(notif.type)}`}
                        >
                          {notif.type}
                        </span>
                        {!notif.read && (
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 mt-0.5 text-[10px] text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <FaClock size={8} /> {notif.time}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <FaCalendarAlt size={8} /> {notif.date}
                      </span>
                      {!notif.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notif.id);
                          }}
                          className="text-yellow-600 hover:text-yellow-700 text-[10px] font-medium"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailsModal(notif);
                      }}
                      className="p-0.5 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50 transition-all"
                      title="View Details"
                    >
                      <FaEye size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotification(notif.id);
                      }}
                      className="p-0.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50 transition-all"
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
          {filteredNotifications.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
              <FaBell className="text-4xl text-gray-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Notifications Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Add Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-yellow-600" /> Add New
                Notification
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddNotification} className="p-6 space-y-4">
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter notification message"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Notification
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

      {/* Notification Details Modal */}
      {showDetailsModal && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                Notification Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedNotification.read ? "bg-gray-100" : "bg-yellow-100"
                  }`}
                >
                  <span className="text-3xl">{selectedNotification.icon}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedNotification.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(selectedNotification.type)}`}
                    >
                      {selectedNotification.type}
                    </span>
                    {selectedNotification.read ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Read
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        Unread
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Message</p>
                  <p className="text-gray-700 text-sm leading-relaxed mt-1">
                    {selectedNotification.message}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-semibold text-sm">
                      {selectedNotification.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold text-sm">
                      {selectedNotification.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                {!selectedNotification.read && (
                  <button
                    onClick={() => {
                      markAsRead(selectedNotification.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaCheckCircle className="inline mr-2" /> Mark as Read
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteNotification(selectedNotification.id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_notifications;
