// src/Page/Teacher/Teacher_leave.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
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
  FaInfoCircle,
  FaExclamationTriangle,
  FaThumbsUp,
  FaThumbsDown,
  FaHourglassHalf,
  FaAward, // এই লাইনটি যোগ করা হয়েছে
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

const Teacher_leave = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("leave");
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

  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      date: "2026-07-20",
      reason: "Personal Emergency - Family event",
      status: "approved",
      type: "Personal",
      appliedDate: "2026-07-18",
      approvedBy: "Admin",
      approvedDate: "2026-07-19",
      duration: "1 day",
      notes: "Approved for family emergency",
    },
    {
      id: 2,
      date: "2026-07-15",
      reason: "Medical Leave - Doctor appointment",
      status: "approved",
      type: "Medical",
      appliedDate: "2026-07-12",
      approvedBy: "Admin",
      approvedDate: "2026-07-13",
      duration: "1 day",
      notes: "Medical certificate submitted",
    },
    {
      id: 3,
      date: "2026-07-25",
      reason: "Personal Leave - Urgent work",
      status: "pending",
      type: "Personal",
      appliedDate: "2026-07-22",
      approvedBy: "",
      approvedDate: "",
      duration: "2 days",
      notes: "Waiting for approval",
    },
    {
      id: 4,
      date: "2026-07-28",
      reason: "Training Workshop - Islamic Education",
      status: "pending",
      type: "Training",
      appliedDate: "2026-07-24",
      approvedBy: "",
      approvedDate: "",
      duration: "3 days",
      notes: "Professional development workshop",
    },
    {
      id: 5,
      date: "2026-07-10",
      reason: "Holiday - Eid ul Adha",
      status: "approved",
      type: "Holiday",
      appliedDate: "2026-07-05",
      approvedBy: "Admin",
      approvedDate: "2026-07-06",
      duration: "2 days",
      notes: "Eid holiday approved",
    },
    {
      id: 6,
      date: "2026-07-05",
      reason: "Sick Leave - Severe headache",
      status: "rejected",
      type: "Medical",
      appliedDate: "2026-07-03",
      approvedBy: "Admin",
      approvedDate: "2026-07-04",
      duration: "1 day",
      notes: "Rejected due to lack of documentation",
    },
  ]);

  const [totalLeave, setTotalLeave] = useState(12);
  const [usedLeave, setUsedLeave] = useState(5);
  const [remainingLeave, setRemainingLeave] = useState(7);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    reason: "",
    type: "Personal",
    duration: "1 day",
    notes: "",
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
  const filteredLeaves = leaveApplications.filter((leave) => {
    const matchesSearch =
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || leave.status === filterStatus;
    const matchesType = filterType === "All" || leave.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique values for filters
  const uniqueTypes = ["All", ...new Set(leaveApplications.map((l) => l.type))];
  const uniqueStatuses = [
    "All",
    ...new Set(leaveApplications.map((l) => l.status)),
  ];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "✅ Approved";
      case "pending":
        return "⏳ Pending";
      case "rejected":
        return "❌ Rejected";
      default:
        return status;
    }
  };

  // Handle add leave
  const handleAddLeave = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.reason) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newLeave = {
      id: Date.now(),
      ...formData,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0],
      approvedBy: "",
      approvedDate: "",
    };

    setLeaveApplications([newLeave, ...leaveApplications]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Leave Application Submitted!",
      text: "Your leave application is pending approval.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Handle edit leave
  const handleEditLeave = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.reason) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setLeaveApplications(
      leaveApplications.map((l) =>
        l.id === selectedLeave.id
          ? {
              ...l,
              ...formData,
              appliedDate: l.appliedDate,
            }
          : l,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Leave Application Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete leave
  const handleDeleteLeave = (id) => {
    Swal.fire({
      title: "Delete Leave Application?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLeaveApplications(leaveApplications.filter((l) => l.id !== id));
        Swal.fire("Deleted!", "Leave application has been deleted.", "success");
      }
    });
  };

  // Handle cancel pending leave
  const handleCancelLeave = (id) => {
    Swal.fire({
      title: "Cancel Leave Application?",
      text: "Are you sure you want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLeaveApplications(leaveApplications.filter((l) => l.id !== id));
        Swal.fire(
          "Cancelled!",
          "Leave application has been cancelled.",
          "success",
        );
      }
    });
  };

  // Open edit modal
  const openEditModal = (leave) => {
    setSelectedLeave(leave);
    setFormData({
      date: leave.date,
      reason: leave.reason,
      type: leave.type,
      duration: leave.duration,
      notes: leave.notes || "",
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (leave) => {
    setSelectedLeave(leave);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      date: "",
      reason: "",
      type: "Personal",
      duration: "1 day",
      notes: "",
    });
    setSelectedLeave(null);
  };

  // Calculate leave stats
  useEffect(() => {
    const approved = leaveApplications.filter(
      (l) => l.status === "approved",
    ).length;
    setUsedLeave(approved);
    setRemainingLeave(totalLeave - approved);
  }, [leaveApplications, totalLeave]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Leave KP</h1>
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
                <FaCalendarCheck className="text-blue-600" /> Leave KP
              </h1>
              <p className="text-sm text-gray-500">
                Manage your leave applications
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

          {/* Leave Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalLeave}</p>
              <p className="text-xs text-gray-500">Total Leave</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{usedLeave}</p>
              <p className="text-xs text-gray-500">Used Leave</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {remainingLeave}
              </p>
              <p className="text-xs text-gray-500">Remaining Leave</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {leaveApplications.filter((l) => l.status === "pending").length}
              </p>
              <p className="text-xs text-gray-500">Pending Applications</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leave applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <FaPlusCircle /> Apply Leave
                </button>
              </div>
            </div>
          </div>

          {/* Leave Applications List */}
          <div className="space-y-3">
            {filteredLeaves.map((leave) => (
              <div
                key={leave.id}
                className={`bg-white border ${
                  leave.status === "pending"
                    ? "border-yellow-200 shadow-md"
                    : leave.status === "approved"
                      ? "border-green-200"
                      : "border-red-200"
                } rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer`}
                onClick={() => openDetailsModal(leave)}
              >
                <div className="p-4 flex flex-wrap items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        leave.status === "approved"
                          ? "bg-green-100"
                          : leave.status === "pending"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                      }`}
                    >
                      <span className="text-2xl">
                        {getStatusIcon(leave.status)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          {leave.type} Leave
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {leave.reason}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(leave.status)}`}
                        >
                          {getStatusText(leave.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> Date: {leave.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock /> Duration: {leave.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> Applied: {leave.appliedDate}
                      </span>
                      {leave.status === "approved" && leave.approvedBy && (
                        <span className="flex items-center gap-1 text-green-600">
                          <FaCheckCircle /> Approved by: {leave.approvedBy}
                        </span>
                      )}
                      {leave.status === "rejected" && (
                        <span className="flex items-center gap-1 text-red-600">
                          <FaTimesCircle /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {leave.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelLeave(leave.id);
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50 transition-all"
                        title="Cancel Application"
                      >
                        <FaTimesCircle />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailsModal(leave);
                      }}
                      className="p-1.5 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50 transition-all"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {leave.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(leave);
                        }}
                        className="p-1.5 text-green-600 hover:text-green-800 rounded hover:bg-green-50 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLeave(leave.id);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50 transition-all"
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
          {filteredLeaves.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <FaCalendarCheck className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Leave Applications Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Leave Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-blue-600" /> Apply for Leave
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddLeave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Personal">Personal</option>
                  <option value="Medical">Medical</option>
                  <option value="Training">Training</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <select
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Half day">Half day</option>
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="4 days">4 days</option>
                  <option value="5 days">5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason *
                </label>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed reason for leave"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Submit Application
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

      {/* Edit Leave Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Leave Application
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditLeave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Personal">Personal</option>
                  <option value="Medical">Medical</option>
                  <option value="Training">Training</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <select
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Half day">Half day</option>
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="4 days">4 days</option>
                  <option value="5 days">5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason *
                </label>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed reason for leave"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Application
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

      {/* Leave Details Modal */}
      {showDetailsModal && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarCheck className="text-blue-600" /> Leave Application
                Details
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
                      {selectedLeave.type} Leave
                    </h2>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={`font-semibold ${getStatusColor(selectedLeave.status)}`}
                      >
                        {getStatusText(selectedLeave.status)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Leave Date</p>
                    <p className="font-semibold">{selectedLeave.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{selectedLeave.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reason</p>
                    <p className="text-gray-700">{selectedLeave.reason}</p>
                  </div>
                  {selectedLeave.notes && (
                    <div>
                      <p className="text-xs text-gray-500">Additional Notes</p>
                      <p className="text-gray-700">{selectedLeave.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Application Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Applied Date</span>
                        <span className="font-semibold">
                          {selectedLeave.appliedDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type</span>
                        <span className="font-semibold">
                          {selectedLeave.type}
                        </span>
                      </div>
                      {selectedLeave.status === "approved" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Approved By</span>
                            <span className="font-semibold text-green-600">
                              {selectedLeave.approvedBy}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Approved Date</span>
                            <span className="font-semibold text-green-600">
                              {selectedLeave.approvedDate}
                            </span>
                          </div>
                        </>
                      )}
                      {selectedLeave.status === "rejected" && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Rejected By</span>
                          <span className="font-semibold text-red-600">
                            {selectedLeave.approvedBy || "Admin"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {getStatusIcon(selectedLeave.status)}
                      </span>
                      <span
                        className={`font-bold ${getStatusColor(selectedLeave.status)}`}
                      >
                        {getStatusText(selectedLeave.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {selectedLeave.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            setShowDetailsModal(false);
                            openEditModal(selectedLeave);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          <FaEdit className="inline mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setShowDetailsModal(false);
                            handleCancelLeave(selectedLeave.id);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          <FaTimesCircle className="inline mr-2" /> Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      Close
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

export default Teacher_leave;
