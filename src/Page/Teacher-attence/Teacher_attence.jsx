// src/Page/Admin/Teacher_attence.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaCalendarAlt,
  FaClock,
  FaChartLine,
  FaUserPlus,
  FaCalendarCheck,
  FaDatabase,
  FaEye,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaLayerGroup,
  FaSave,
  FaClipboardCheck,
  FaCalendarDay,
  FaCalendarWeek,
  FaCheck,
  FaTimes,
  FaQuestion,
  FaUserTie,
  FaUserTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5000";

const Teacher_attence = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Layout
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("teacher-attendance");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  const today = new Date().toISOString().split("T")[0];

  // ✅ Teachers from API
  const [teachers, setTeachers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected date/month
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [markStatus, setMarkStatus] = useState("Present");
  const [markNote, setMarkNote] = useState("");
  const [markCheckIn, setMarkCheckIn] = useState("");
  const [markCheckOut, setMarkCheckOut] = useState("");
  const [saving, setSaving] = useState(false);

  // View mode
  const [viewMode, setViewMode] = useState("daily");

  // Add form
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    date: today,
    status: "Present",
    checkIn: "",
    checkOut: "",
    note: "",
  });

  const statuses = ["Present", "Absent", "Late", "Leave"];

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      setAdminInfo(JSON.parse(savedAdmin));
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ✅ Fetch Teachers
  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/api/teacher-attendance/teachers`,
      );
      const data = await response.json();
      if (data.success) {
        setTeachers(data.teachers || []);
      } else {
        setTeachers([]);
      }
    } catch (err) {
      console.error("❌ Fetch teachers:", err);
      setTeachers([]);
    }
  };

  // ✅ Fetch Attendance
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/teacher-attendance/all`);
      const data = await response.json();
      if (data.success) {
        setAttendanceRecords(data.attendance || []);
      } else {
        setError(data.message || "Failed to load");
        setAttendanceRecords([]);
      }
    } catch (err) {
      console.error("❌ Fetch attendance:", err);
      setError(err.message);
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchAttendance();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("adminEmail");
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/admin-login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

  // Sidebar menu
  const menuItems = [
    {
      id: "profile",
      path: "/admin-profile",
      icon: <FaUser />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/admin-dashboard",
      icon: <MdDashboard />,
      label: "Dashboard",
      subItems: [
        {
          id: "department",
          path: "/admin-dashboard/department",
          label: "Department",
        },
        {
          id: "today-class",
          path: "/admin-dashboard/today-class",
          label: "Today's Class",
        },
        {
          id: "new-admission",
          path: "/admin-dashboard/new-admission",
          label: "New Admission",
        },
      ],
    },
    {
      id: "student-management",
      path: "/admin-students",
      icon: <FaUsers />,
      label: "Student Management",
      subItems: [
        {
          id: "student-add",
          path: "/admin-students/add",
          label: "Student Add",
        },
        {
          id: "batch-manual",
          path: "/admin-students/batch",
          label: "Batch Maintain",
        },
        {
          id: "student-profile",
          path: "/admin-students/profile",
          label: "Student Profile",
        },
      ],
    },
    {
      id: "teacher-management",
      path: "/admin-teachers",
      icon: <FaChalkboardTeacher />,
      label: "Teacher Management",
      subItems: [
        {
          id: "teacher-assign",
          path: "/admin-teachers/assign",
          label: "Teacher Assign",
        },
        {
          id: "class-schedule",
          path: "/admin-teachers/schedule",
          label: "Class Schedule",
        },
        {
          id: "teacher-attendance",
          path: "/admin-teachers/attendance",
          label: "Teacher Attendance",
        },
        {
          id: "teacher-overview",
          path: "/admin-teachers/overview",
          label: "Teacher Overview",
        },
      ],
    },
    {
      id: "batch-course",
      path: "/admin-batch-course",
      icon: <FaLayerGroup />,
      label: "Batch & Course",
    },
    {
      id: "absence-student",
      path: "/admin-absence",
      icon: <FaUserTimes />,
      label: "Absence Student Community",
    },
    {
      id: "finance",
      path: "/admin-finance",
      icon: <FaMoneyBillWave />,
      label: "Finance",
    },
    {
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck />,
      label: "Exam",
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine />,
      label: "Report & Analytics",
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase />,
      label: "CRM Management",
    },
  ];

  // Get attendance for teacher+date
  const getTeacherAttendance = (teacherId, date) => {
    return attendanceRecords.find(
      (r) => String(r.teacherId) === String(teacherId) && r.date === date,
    );
  };

  // Get monthly attendance for teacher
  const getMonthlyAttendance = (teacherId, month, year) => {
    return attendanceRecords.filter((r) => {
      const d = new Date(r.date);
      return (
        String(r.teacherId) === String(teacherId) &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      case "Late":
        return "bg-yellow-100 text-yellow-700";
      case "Leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <FaCheck className="text-green-500" size={10} />;
      case "Absent":
        return <FaTimes className="text-red-500" size={10} />;
      case "Late":
        return <FaClock className="text-yellow-500" size={10} />;
      case "Leave":
        return <FaCalendarDay className="text-blue-500" size={10} />;
      default:
        return <FaQuestion className="text-gray-500" size={10} />;
    }
  };

  const getStatusBadge = (status) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
    >
      {getStatusIcon(status)}
      {status}
    </span>
  );

  // ✅ Save attendance via POST
  const saveAttendance = async () => {
    if (!selectedTeacher) return;

    try {
      setSaving(true);

      const payload = {
        teacherId: selectedTeacher.id,
        teacherName: selectedTeacher.name,
        date: selectedDate,
        status: markStatus,
        checkIn:
          markStatus === "Present" || markStatus === "Late"
            ? markCheckIn || "09:00 AM"
            : "",
        checkOut:
          markStatus === "Present" || markStatus === "Late"
            ? markCheckOut || "04:00 PM"
            : "",
        note: markNote || "",
      };

      const response = await fetch(`${API_BASE}/api/teacher-attendance/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setShowMarkModal(false);
        setMarkNote("");
        setMarkCheckIn("");
        setMarkCheckOut("");

        Swal.fire({
          icon: "success",
          title: data.updated ? "✅ Updated!" : "✅ Marked!",
          text: `${selectedTeacher.name} → ${markStatus}`,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchAttendance();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message,
        });
      }
    } catch (err) {
      console.error("❌ Save error:", err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ✅ Add attendance via modal form
  const handleAddAttendance = async (e) => {
    e.preventDefault();

    if (!formData.teacherId || !formData.date) {
      Swal.fire({
        icon: "warning",
        title: "Teacher ও Date select করুন",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const teacher = teachers.find(
      (t) => String(t.id) === String(formData.teacherId),
    );
    if (!teacher) return;

    try {
      setSaving(true);

      const payload = {
        teacherId: teacher.id,
        teacherName: teacher.name,
        date: formData.date,
        status: formData.status,
        checkIn:
          formData.status !== "Absent" ? formData.checkIn || "09:00 AM" : "",
        checkOut:
          formData.status !== "Absent" ? formData.checkOut || "04:00 PM" : "",
        note: formData.note || "",
      };

      const response = await fetch(`${API_BASE}/api/teacher-attendance/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        setFormData({
          teacherId: "",
          teacherName: "",
          date: today,
          status: "Present",
          checkIn: "",
          checkOut: "",
          note: "",
        });

        Swal.fire({
          icon: "success",
          title: "✅ Added!",
          text: `${teacher.name} — ${formData.status}`,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchAttendance();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message,
        });
      }
    } catch (err) {
      console.error("❌ Add error:", err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // Mark modal opener
  const handleMarkAttendance = (teacher) => {
    setSelectedTeacher(teacher);
    const existing = getTeacherAttendance(teacher.id, selectedDate);
    if (existing) {
      setMarkStatus(existing.status);
      setMarkNote(existing.note || "");
      setMarkCheckIn(existing.checkIn || "");
      setMarkCheckOut(existing.checkOut || "");
    } else {
      setMarkStatus("Present");
      setMarkNote("");
      setMarkCheckIn("");
      setMarkCheckOut("");
    }
    setShowMarkModal(true);
  };

  const openAddModal = () => {
    setFormData({
      teacherId: "",
      teacherName: "",
      date: today,
      status: "Present",
      checkIn: "",
      checkOut: "",
      note: "",
    });
    setShowAddModal(true);
  };

  // Stats
  const calculateStats = (teacherId) => {
    const monthRecords = getMonthlyAttendance(
      teacherId,
      selectedMonth,
      selectedYear,
    );
    const total = monthRecords.length;
    const present = monthRecords.filter((r) => r.status === "Present").length;
    const absent = monthRecords.filter((r) => r.status === "Absent").length;
    const late = monthRecords.filter((r) => r.status === "Late").length;
    const leave = monthRecords.filter((r) => r.status === "Leave").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, late, leave, percentage };
  };

  // Filter teachers
  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      (t.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.teacherId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.subject || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "All" || t.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = [
    "All",
    ...new Set(teachers.map((t) => t.subject).filter(Boolean)),
  ];

  const getMonthName = (m) => {
    const names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return names[m];
  };

  const handleMonthChange = (dir) => {
    if (dir === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const getDailySummary = () => {
    const records = attendanceRecords.filter((r) => r.date === selectedDate);
    return {
      total: records.length,
      present: records.filter((r) => r.status === "Present").length,
      absent: records.filter((r) => r.status === "Absent").length,
      late: records.filter((r) => r.status === "Late").length,
      leave: records.filter((r) => r.status === "Leave").length,
    };
  };

  const dailySummary = getDailySummary();

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold">Teacher Attendance</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r
            shadow-lg md:shadow-sm transition-all duration-300 h-full
            overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {adminInfo.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{adminInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {adminInfo.designation}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => {
                        setActiveMenu(item.id);
                        toggleSubMenu(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <FaArrowRight
                        size={12}
                        className={activeSubMenu === item.id ? "rotate-90" : ""}
                      />
                    </button>
                    {activeSubMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} onClick={() => setIsSidebarOpen(false)}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t pt-4"
            >
              <FaSignOutAlt />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaClipboardCheck className="text-blue-600" /> Teacher
                Attendance
              </h1>
              <p className="text-xs text-gray-500">
                {teachers.length} teachers • {attendanceRecords.length} records
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <FaPlus size={14} /> Add Attendance
              </button>
              <button
                onClick={() =>
                  setViewMode(viewMode === "daily" ? "monthly" : "daily")
                }
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1"
              >
                {viewMode === "daily" ? (
                  <>
                    <FaCalendarWeek size={12} /> Monthly
                  </>
                ) : (
                  <>
                    <FaCalendarDay size={12} /> Daily
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  fetchTeachers();
                  fetchAttendance();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Daily View */}
          {viewMode === "daily" ? (
            <>
              {/* Date + Summary */}
              <div className="bg-white border rounded-xl shadow-sm p-3 mb-3">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border rounded-lg px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-gray-500">
                      {formatDate(selectedDate)}
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-600">
                        ✓ {dailySummary.present}
                      </span>
                      <span className="text-red-600">
                        ✗ {dailySummary.absent}
                      </span>
                      <span className="text-yellow-600">
                        ⏰ {dailySummary.late}
                      </span>
                      <span className="text-blue-600">
                        📅 {dailySummary.leave}
                      </span>
                      <span className="text-gray-400">
                        | Total: {dailySummary.total}/{teachers.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                    />
                  </div>
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="px-1.5 py-1 text-xs border rounded-lg"
                  >
                    {uniqueSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[calc(100vh-420px)] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          #
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Teacher
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Subject
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Check In
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Check Out
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((t, idx) => {
                          const att = getTeacherAttendance(t.id, selectedDate);
                          return (
                            <tr
                              key={t._id || t.id}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-3 py-2 text-gray-500">
                                {idx + 1}
                              </td>
                              <td className="px-3 py-2">
                                <div className="font-medium text-gray-800">
                                  {t.name}
                                </div>
                                <div className="text-[10px] text-gray-400">
                                  {t.teacherId} • {t.designation}
                                </div>
                              </td>
                              <td className="px-3 py-2 text-gray-600">
                                {t.subject}
                              </td>
                              <td className="px-3 py-2">
                                {att ? (
                                  getStatusBadge(att.status)
                                ) : (
                                  <span className="text-gray-400 text-[10px]">
                                    Not Marked
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-gray-600">
                                {att?.checkIn || "-"}
                              </td>
                              <td className="px-3 py-2 text-gray-600">
                                {att?.checkOut || "-"}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleMarkAttendance(t)}
                                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                    title="Mark"
                                  >
                                    <FaClipboardCheck size={14} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedTeacher(t);
                                      setShowDetailsModal(true);
                                    }}
                                    className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                    title="View"
                                  >
                                    <FaEye size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-3 py-8 text-center text-gray-500"
                          >
                            <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-2" />
                            <p>{error || "No teachers found"}</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            // Monthly view
            <div className="space-y-3">
              <div className="bg-white border rounded-xl shadow-sm p-3 flex items-center justify-between">
                <button
                  onClick={() => handleMonthChange("prev")}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-base font-bold text-gray-800">
                  {getMonthName(selectedMonth)} {selectedYear}
                </h3>
                <button
                  onClick={() => handleMonthChange("next")}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaArrowRight />
                </button>
              </div>

              <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[calc(100vh-300px)] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-2 py-2 text-left font-semibold text-gray-600">
                          Teacher
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          Total
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-green-600">
                          Present
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-red-600">
                          Absent
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-yellow-600">
                          Late
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-blue-600">
                          Leave
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          %
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {teachers.map((t) => {
                        const s = calculateStats(t.id);
                        return (
                          <tr key={t._id || t.id} className="hover:bg-gray-50">
                            <td className="px-2 py-2">
                              <div className="font-medium text-gray-800">
                                {t.name}
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {t.teacherId} • {t.designation}
                              </div>
                            </td>
                            <td className="px-2 py-2 text-center font-medium">
                              {s.total}
                            </td>
                            <td className="px-2 py-2 text-center text-green-600 font-medium">
                              {s.present}
                            </td>
                            <td className="px-2 py-2 text-center text-red-600 font-medium">
                              {s.absent}
                            </td>
                            <td className="px-2 py-2 text-center text-yellow-600 font-medium">
                              {s.late}
                            </td>
                            <td className="px-2 py-2 text-center text-blue-600 font-medium">
                              {s.leave}
                            </td>
                            <td className="px-2 py-2 text-center font-bold">
                              {s.percentage}%
                            </td>
                            <td className="px-2 py-2 text-center">
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto">
                                <div
                                  className={`h-full rounded-full ${
                                    s.percentage >= 85
                                      ? "bg-green-500"
                                      : s.percentage >= 70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${s.percentage}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Attendance
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAttendance} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher *
                </label>
                <select
                  required
                  value={formData.teacherId}
                  onChange={(e) => {
                    const tid = e.target.value;
                    const t = teachers.find(
                      (x) => String(x.id) === String(tid),
                    );
                    setFormData({
                      ...formData,
                      teacherId: tid,
                      teacherName: t ? t.name : "",
                    });
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => (
                    <option key={t._id || t.id} value={t.id}>
                      {t.name} ({t.teacherId}) — {t.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.status === s
                          ? `${getStatusColor(s)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {formData.status !== "Absent" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check In
                    </label>
                    <input
                      type="text"
                      value={formData.checkIn}
                      onChange={(e) =>
                        setFormData({ ...formData, checkIn: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="09:00 AM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check Out
                    </label>
                    <input
                      type="text"
                      value={formData.checkOut}
                      onChange={(e) =>
                        setFormData({ ...formData, checkOut: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="04:00 PM"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  rows="2"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Add note..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" size={14} />
                  {saving ? "Saving..." : "Add Attendance"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mark Modal */}
      {showMarkModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FaClipboardCheck className="text-blue-600" /> Mark Attendance
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{selectedTeacher.name}</span>
                  <span className="text-gray-400 ml-2">
                    ({selectedTeacher.teacherId})
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Date: {formatDate(selectedDate)}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setMarkStatus(s)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        markStatus === s
                          ? `${getStatusColor(s)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {(markStatus === "Present" || markStatus === "Late") && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Check In
                    </label>
                    <input
                      type="text"
                      value={markCheckIn}
                      onChange={(e) => setMarkCheckIn(e.target.value)}
                      className="w-full border rounded-lg px-3 py-1.5 text-sm"
                      placeholder="09:00 AM"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Check Out
                    </label>
                    <input
                      type="text"
                      value={markCheckOut}
                      onChange={(e) => setMarkCheckOut(e.target.value)}
                      className="w-full border rounded-lg px-3 py-1.5 text-sm"
                      placeholder="04:00 PM"
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={markNote}
                  onChange={(e) => setMarkNote(e.target.value)}
                  rows="2"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Add a note..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveAttendance}
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" />{" "}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setShowMarkModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-blue-600" /> Attendance Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedTeacher.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedTeacher.teacherId} • {selectedTeacher.designation}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedTeacher.subject}</span>
                    <span>🏛️ {selectedTeacher.department}</span>
                    <span>📱 {selectedTeacher.phone}</span>
                  </div>
                </div>
              </div>

              {/* Monthly Stats */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">
                  Summary — {getMonthName(selectedMonth)} {selectedYear}
                </h4>
                {(() => {
                  const s = calculateStats(selectedTeacher.id);
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-gray-700">
                          {s.total}
                        </p>
                        <p className="text-[10px] text-gray-500">Total</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-green-600">
                          {s.present}
                        </p>
                        <p className="text-[10px] text-gray-500">Present</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-red-600">
                          {s.absent}
                        </p>
                        <p className="text-[10px] text-gray-500">Absent</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-yellow-600">
                          {s.late}
                        </p>
                        <p className="text-[10px] text-gray-500">Late</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-blue-600">
                          {s.leave}
                        </p>
                        <p className="text-[10px] text-gray-500">Leave</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Recent records */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">
                  Recent Records
                </h4>
                <div className="max-h-60 overflow-y-auto border rounded-lg">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 text-left">Date</th>
                        <th className="px-2 py-1 text-left">Status</th>
                        <th className="px-2 py-1 text-left">In</th>
                        <th className="px-2 py-1 text-left">Out</th>
                        <th className="px-2 py-1 text-left">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {attendanceRecords
                        .filter(
                          (r) =>
                            String(r.teacherId) === String(selectedTeacher.id),
                        )
                        .sort((a, b) => b.date.localeCompare(a.date))
                        .slice(0, 15)
                        .map((r) => (
                          <tr key={r._id}>
                            <td className="px-2 py-1.5">
                              {formatDate(r.date)}
                            </td>
                            <td className="px-2 py-1.5">
                              {getStatusBadge(r.status)}
                            </td>
                            <td className="px-2 py-1.5 text-gray-600">
                              {r.checkIn || "-"}
                            </td>
                            <td className="px-2 py-1.5 text-gray-600">
                              {r.checkOut || "-"}
                            </td>
                            <td className="px-2 py-1.5 text-gray-500 text-[10px]">
                              {r.note || "-"}
                            </td>
                          </tr>
                        ))}
                      {attendanceRecords.filter(
                        (r) =>
                          String(r.teacherId) === String(selectedTeacher.id),
                      ).length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-2 py-4 text-center text-gray-400"
                          >
                            No records yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleMarkAttendance(selectedTeacher);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaClipboardCheck className="inline mr-2" /> Mark Attendance
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
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

export default Teacher_attence;
