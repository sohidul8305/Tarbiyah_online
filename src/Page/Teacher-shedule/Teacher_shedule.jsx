// src/Page/Admin/Teacher_shedule.jsx
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
  FaChartLine,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaSave,
  FaCalendarPlus,
  FaUserTie,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

const ALL_DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const DEPARTMENT_SUBJECTS = {
  Elders: [
    "Qaida Nuraniyah",
    "Quran Nazera",
    "Bakarah Hifz",
    "Basic Tajweed (Level-1)",
  ],
  "Quran Studies": ["Quran Studies", "Hifzul Quran", "Tarbiyah Quran Studies"],
  Alimiya: ["Alimiya", "Dawra e Hadith", "Tafsir", "Fiqh", "Hadith"],
  Diploma: ["Diploma in Islamic Studies", "Certificate"],
};

const getCurrentDepartment = () => {
  try {
    const info = JSON.parse(localStorage.getItem("adminInfo") || "{}");
    return info.department || "Elders";
  } catch {
    return "Elders";
  }
};

const safeFetchJSON = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    if (text.trim().startsWith("<")) {
      return { success: false, message: "Endpoint not found" };
    }
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, message: "Invalid JSON" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const colorHex = (color) => {
  const map = {
    blue: "#3b82f6",
    pink: "#ec4899",
    green: "#22c55e",
    purple: "#a855f7",
    orange: "#f97316",
  };
  return map[color] || "#3b82f6";
};

const Teacher_shedule = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("class-schedule");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Elders",
    joinDate: "",
  });
  const [currentDept, setCurrentDept] = useState(getCurrentDepartment());

  const [teachers, setTeachers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  const [filterTeacher, setFilterTeacher] = useState("All");

  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    shortName: "",
    designation: "Teacher",
  });
  const [classForm, setClassForm] = useState({
    teacherName: "",
    subject: "",
    batch: "",
    time: "",
    days: [],
    status: "Active",
  });
  const [editForm, setEditForm] = useState({
    teacherName: "",
    subject: "",
    batch: "",
    day: "",
    time: "",
    status: "Active",
  });

  // ─────────────── Load admin ───────────────
  useEffect(() => {
    const saved = localStorage.getItem("adminInfo");
    if (saved) {
      try {
        const info = JSON.parse(saved);
        setAdminInfo(info);
        if (info.department) setCurrentDept(info.department);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Elders",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ─────────────── Fetch data ───────────────
  const fetchTeachers = async () => {
    if (!currentDept) return;
    const data = await safeFetchJSON(
      `${API_BASE}/api/dept-teachers/all?department=${encodeURIComponent(currentDept)}`,
    );
    if (data.success && Array.isArray(data.teachers)) {
      setTeachers(data.teachers);
    } else {
      setTeachers([]);
    }
  };

  const fetchSchedules = async () => {
    if (!currentDept) return;
    const data = await safeFetchJSON(
      `${API_BASE}/api/teacher-schedule/all?department=${encodeURIComponent(currentDept)}`,
    );
    if (data.success && Array.isArray(data.schedules)) {
      setSchedules(data.schedules);
    } else {
      setSchedules([]);
    }
  };

  useEffect(() => {
    if (!currentDept) return;
    setLoading(true);
    Promise.all([fetchTeachers(), fetchSchedules()]).finally(() =>
      setLoading(false),
    );
    // eslint-disable-next-line
  }, [currentDept]);

  // ─────────────── Logout ───────────────
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

  const menuItems = [
    {
      id: "profile",
      path: "/admin-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/admin-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
      subItems: [
        {
          id: "department",
          path: "/admin-dashboard/department",
          label: "Department",
        },
        {
          id: "new-admission",
          path: "/admin-dashboard/new-admission",
          label: "New Admission",
        },
        {
          id: "notification",
          path: "/admin-dashboard/notification",
          label: "Notification",
        },
      ],
    },
    {
      id: "student-management",
      path: "/admin-students",
      icon: <FaUsers className="text-xl" />,
      label: "Student Management",
      subItems: [
        {
          id: "batch-manual",
          path: "/admin-students/batch",
          label: "Batch Create and Maintain",
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
      icon: <FaChalkboardTeacher className="text-xl" />,
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
      ],
    },
    {
      id: "finance",
      path: "/admin-finance",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Finance",
      subItems: [
        {
          id: "admin-on-fee",
          path: "/admin-finance/admin-fee",
          label: "Admin on Fee",
        },
        {
          id: "monthly-fee",
          path: "/admin-finance/monthly-fee",
          label: "Monthly Fee",
        },
        { id: "invoice", path: "/admin-finance/invoice", label: "Invoice" },
        { id: "report", path: "/admin-finance/report", label: "Report" },
      ],
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine className="text-xl" />,
      label: "Report & Analytics",
      subItems: [
        {
          id: "admission-report",
          path: "/admin-reports/admission",
          label: "Admission Report",
        },
        {
          id: "attendance-report",
          path: "/admin-reports/attendance",
          label: "Attendance Report",
        },
        { id: "income", path: "/admin-reports/income", label: "Income" },
      ],
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase className="text-xl" />,
      label: "CRM Management",
      subItems: [
        {
          id: "data-entry",
          path: "/admin-crm/data-entry",
          label: "Data Entry",
        },
      ],
    },
  ];

  // ─────────────── Add Teacher ───────────────
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Teacher Name আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      setSubmitting(true);
      const data = await safeFetchJSON(`${API_BASE}/api/dept-teachers/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: teacherForm.name.trim(),
          shortName: teacherForm.shortName.trim() || teacherForm.name.trim(),
          designation: teacherForm.designation || "Teacher",
          department: currentDept,
        }),
      });
      if (!data.success || !data.teacher) {
        throw new Error(data.message || "Failed to add teacher");
      }
      setTeachers((prev) => {
        const exists = prev.some((t) => t._id === data.teacher._id);
        return exists ? prev : [...prev, data.teacher];
      });
      setShowAddTeacherModal(false);
      setTeacherForm({ name: "", shortName: "", designation: "Teacher" });
      Swal.fire({
        icon: "success",
        title: data.alreadyExists ? "Already Exists" : "✅ Added!",
        text: `${data.teacher.name} — ${currentDept}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed!", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTeacher = async (teacher) => {
    const res = await Swal.fire({
      title: `Delete ${teacher.name}?`,
      text: "Their schedules will also be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });
    if (!res.isConfirmed) return;
    try {
      const data = await safeFetchJSON(
        `${API_BASE}/api/dept-teachers/delete/${teacher._id}`,
        { method: "DELETE" },
      );
      if (!data.success) throw new Error(data.message);
      setTeachers((prev) => prev.filter((t) => t._id !== teacher._id));
      setSchedules((prev) => prev.filter((s) => s.teacherId !== teacher._id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed!", text: err.message });
    }
  };

  // ─────────────── Add Class (multi-day) ───────────────
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!classForm.teacherName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Teacher Name আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    if (!classForm.time.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Time আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    if (classForm.days.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "কমপক্ষে ১টি Day select করুন!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setSubmitting(true);

      // Match teacher or auto-create
      let teacherId = "";
      const existing = teachers.find(
        (t) =>
          t.name.toLowerCase().trim() ===
          classForm.teacherName.toLowerCase().trim(),
      );
      if (existing) {
        teacherId = existing._id;
      } else {
        // Auto create
        const tData = await safeFetchJSON(
          `${API_BASE}/api/dept-teachers/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: classForm.teacherName.trim(),
              shortName: classForm.teacherName.trim(),
              designation: "Teacher",
              department: currentDept,
            }),
          },
        );
        if (tData.success && tData.teacher) {
          teacherId = tData.teacher._id;
          setTeachers((prev) => [...prev, tData.teacher]);
        }
      }

      const data = await safeFetchJSON(
        `${API_BASE}/api/teacher-schedule/bulk-create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            department: currentDept,
            teacherId,
            teacherName: classForm.teacherName.trim(),
            subject: classForm.subject.trim(),
            batch: classForm.batch.trim(),
            days: classForm.days,
            time: classForm.time.trim(),
            status: classForm.status,
          }),
        },
      );

      if (!data.success || !Array.isArray(data.schedules)) {
        throw new Error(data.message || "Failed to save schedule");
      }

      setSchedules((prev) => [...data.schedules, ...prev]);
      setShowAddClassModal(false);
      setClassForm({
        teacherName: "",
        subject: "",
        batch: "",
        time: "",
        days: [],
        status: "Active",
      });

      Swal.fire({
        icon: "success",
        title: `✅ ${data.schedules.length} Class${data.schedules.length > 1 ? "es" : ""} Added!`,
        html: `<div style="text-align:left">
          <p><strong>Teacher:</strong> ${classForm.teacherName}</p>
          <p><strong>Time:</strong> ${classForm.time}</p>
          <p><strong>Days:</strong> ${classForm.days.join(", ")}</p>
        </div>`,
        timer: 2200,
        confirmButtonColor: "#004d4d",
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed!", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────── Edit ───────────────
  const openEdit = (s) => {
    setSelectedSchedule(s);
    setEditForm({
      teacherName: s.teacherName || "",
      subject: s.subject || "",
      batch: s.batch || "",
      day: s.day || "Saturday",
      time: s.time || "",
      status: s.status || "Active",
    });
    setShowEditModal(true);
  };

  const handleEditClass = async (e) => {
    e.preventDefault();
    if (!selectedSchedule) return;
    try {
      setSubmitting(true);
      const data = await safeFetchJSON(
        `${API_BASE}/api/teacher-schedule/update/${selectedSchedule._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherName: editForm.teacherName.trim(),
            subject: editForm.subject.trim(),
            batch: editForm.batch.trim(),
            day: editForm.day,
            time: editForm.time.trim(),
            status: editForm.status,
          }),
        },
      );
      if (!data.success || !data.schedule) {
        throw new Error(data.message || "Update failed");
      }
      setSchedules((prev) =>
        prev.map((s) => (s._id === selectedSchedule._id ? data.schedule : s)),
      );
      setShowEditModal(false);
      setSelectedSchedule(null);
      Swal.fire({
        icon: "success",
        title: "✅ Updated!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed!", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────── Delete ───────────────
  const handleDeleteClass = async (s) => {
    const res = await Swal.fire({
      title: "Delete Class?",
      html: `<div style="text-align:left">
        <p><strong>${s.teacherName}</strong></p>
        <p>${s.day} • ${s.time}</p>
      </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });
    if (!res.isConfirmed) return;
    try {
      const data = await safeFetchJSON(
        `${API_BASE}/api/teacher-schedule/delete/${s._id}`,
        { method: "DELETE" },
      );
      if (!data.success) throw new Error(data.message);
      setSchedules((prev) => prev.filter((x) => x._id !== s._id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed!", text: err.message });
    }
  };

  // ─────────────── Derived ───────────────
  const filteredSchedules = schedules.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      (s.teacherName || "").toLowerCase().includes(term) ||
      (s.subject || "").toLowerCase().includes(term) ||
      (s.batch || "").toLowerCase().includes(term) ||
      (s.time || "").toLowerCase().includes(term);
    const matchesDay = filterDay === "All" || s.day === filterDay;
    const matchesTeacher =
      filterTeacher === "All" || s.teacherName === filterTeacher;
    return matchesSearch && matchesDay && matchesTeacher;
  });

  const stats = {
    total: schedules.length,
    active: schedules.filter((s) => s.status === "Active").length,
    teachers: teachers.length,
    days: new Set(schedules.map((s) => s.day)).size,
  };

  const getTeacherColor = (name) => {
    const t = teachers.find((tt) => tt.name === name);
    return t?.color || "blue";
  };

  const subjectsSuggestions =
    DEPARTMENT_SUBJECTS[currentDept] || DEPARTMENT_SUBJECTS["Elders"];

  // ─────────────── Render ───────────────
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Class Schedule ({currentDept})
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${
            isSidebarOpen ? "left-0" : "-left-72 md:left-0"
          }`}
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
                  {adminInfo.department || adminInfo.designation}
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
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
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-gray-600">{item.icon}</span>
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
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="p-4 text-xs text-gray-400 border-t">
            <p>©Tarbiyah Online Madrasha</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Class Schedule
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {currentDept}
                </span>
              </h1>
              <p className="text-xs text-gray-500">
                {teachers.length} teachers • {schedules.length} classes
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  fetchTeachers();
                  fetchSchedules();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold"
              >
                🔄 Refresh
              </button>
              <button
                onClick={() => setShowAddTeacherModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaUserTie size={12} /> Add Teacher
              </button>
              <button
                onClick={() => setShowAddClassModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Add Class
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{stats.total}</p>
              <p className="text-[10px] text-gray-500">Total Classes</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">{stats.active}</p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {stats.teachers}
              </p>
              <p className="text-[10px] text-gray-500">Teachers</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">{stats.days}</p>
              <p className="text-[10px] text-gray-500">Active Days</p>
            </div>
          </div>

          {/* Teachers List */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-3">
            <p className="text-xs font-bold text-teal-800 mb-2 flex items-center gap-1">
              <FaUserTie size={12} /> {currentDept} Teachers ({teachers.length})
            </p>
            {teachers.length === 0 ? (
              <div className="text-center py-3">
                <p className="text-xs text-gray-500 mb-2">
                  এই department এ এখনো কোনো teacher add করা হয়নি।
                </p>
                <button
                  onClick={() => setShowAddTeacherModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold"
                >
                  + Add First Teacher
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {teachers.map((t) => (
                  <div
                    key={t._id}
                    className="flex items-center gap-2 bg-white border border-teal-200 rounded-lg px-3 py-1.5"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: colorHex(t.color) }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        {t.shortName || t.name}
                      </p>
                      <p className="text-[9px] text-gray-500">
                        {t.designation}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTeacher(t)}
                      className="text-red-500 hover:text-red-700 ml-1"
                      title="Remove"
                    >
                      <FaTrash size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search teacher, subject, batch, time..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  <option value="All">All Days</option>
                  {ALL_DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={filterTeacher}
                  onChange={(e) => setFilterTeacher(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  <option value="All">All Teachers</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t.name}>
                      {t.shortName || t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                Loading...
              </div>
            ) : filteredSchedules.length === 0 ? (
              <div className="text-center py-8">
                <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  No Classes Yet
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {currentDept} department এর জন্য এখনো কোনো class add করা
                  হয়নি।
                </p>
                <button
                  onClick={() => setShowAddClassModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-1"
                >
                  <FaPlusCircle size={12} /> Add First Class
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-gray-700">
                        Teacher
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-700">
                        Day
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-700">
                        Time
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-700">
                        Subject
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-700">
                        Batch
                      </th>
                      <th className="px-3 py-2 text-center font-bold text-gray-700">
                        Status
                      </th>
                      <th className="px-3 py-2 text-center font-bold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.map((s) => (
                      <tr
                        key={s._id}
                        className="border-t hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                              style={{
                                backgroundColor: colorHex(
                                  getTeacherColor(s.teacherName),
                                ),
                              }}
                            >
                              {s.teacherName.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-800">
                              {s.teacherName}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-gray-700">{s.day}</td>
                        <td className="px-3 py-2 text-gray-700 font-medium">
                          {s.time}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {s.subject || "—"}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {s.batch || "—"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              s.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : s.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEdit(s)}
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteClass(s)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ═══════════ Add Teacher Modal ═══════════ */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-green-600" /> Add Teacher
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {currentDept}
                </span>
              </h3>
              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={(e) =>
                    setTeacherForm({ ...teacherForm, name: e.target.value })
                  }
                  placeholder="e.g., Muhammad Abdullah"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Short Name (display)
                </label>
                <input
                  type="text"
                  value={teacherForm.shortName}
                  onChange={(e) =>
                    setTeacherForm({
                      ...teacherForm,
                      shortName: e.target.value,
                    })
                  }
                  placeholder="e.g., Abdullah Ustad"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <select
                  value={teacherForm.designation}
                  onChange={(e) =>
                    setTeacherForm({
                      ...teacherForm,
                      designation: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Senior Teacher">Senior Teacher</option>
                  <option value="Junior Teacher">Junior Teacher</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Guest Teacher">Guest Teacher</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  {submitting ? "Adding..." : "Add Teacher"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ Add Class Modal ═══════════ */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarPlus className="text-blue-600" /> Add Class
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {currentDept}
                </span>
              </h3>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teacher Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  list="teacher-suggestions"
                  value={classForm.teacherName}
                  onChange={(e) =>
                    setClassForm({
                      ...classForm,
                      teacherName: e.target.value,
                    })
                  }
                  placeholder="Type or select teacher"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <datalist id="teacher-suggestions">
                  {teachers.map((t) => (
                    <option key={t._id} value={t.name} />
                  ))}
                </datalist>
                <p className="text-[10px] text-gray-400 mt-1">
                  নতুন নাম লিখলে teacher auto-add হবে
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={classForm.time}
                  onChange={(e) =>
                    setClassForm({ ...classForm, time: e.target.value })
                  }
                  placeholder="e.g., 10:00 AM - 11:30 AM"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Days <span className="text-red-500">*</span>
                  <span className="ml-1 text-gray-500 font-normal">
                    (multiple select)
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {ALL_DAYS.map((d) => {
                    const selected = classForm.days.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setClassForm((prev) => ({
                            ...prev,
                            days: prev.days.includes(d)
                              ? prev.days.filter((x) => x !== d)
                              : [...prev.days, d],
                          }));
                        }}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {d.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
                {classForm.days.length > 0 && (
                  <p className="text-[10px] text-blue-600 mt-1">
                    Selected: {classForm.days.join(", ")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Subject (optional)
                  </label>
                  <input
                    type="text"
                    list="subject-suggestions"
                    value={classForm.subject}
                    onChange={(e) =>
                      setClassForm({
                        ...classForm,
                        subject: e.target.value,
                      })
                    }
                    placeholder="e.g., Qaida Nuraniyah"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <datalist id="subject-suggestions">
                    {subjectsSuggestions.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Batch (optional)
                  </label>
                  <input
                    type="text"
                    value={classForm.batch}
                    onChange={(e) =>
                      setClassForm({ ...classForm, batch: e.target.value })
                    }
                    placeholder="e.g., Batch-03"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={classForm.status}
                  onChange={(e) =>
                    setClassForm({ ...classForm, status: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold text-sm"
                >
                  {submitting
                    ? "Saving..."
                    : classForm.days.length > 1
                      ? `Add ${classForm.days.length} Classes`
                      : "Add Class"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ Edit Modal ═══════════ */}
      {showEditModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Class
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleEditClass} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    value={editForm.teacherName}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        teacherName: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Day
                  </label>
                  <select
                    value={editForm.day}
                    onChange={(e) =>
                      setEditForm({ ...editForm, day: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {ALL_DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={editForm.time}
                  onChange={(e) =>
                    setEditForm({ ...editForm, time: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={editForm.subject}
                    onChange={(e) =>
                      setEditForm({ ...editForm, subject: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    value={editForm.batch}
                    onChange={(e) =>
                      setEditForm({ ...editForm, batch: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  <FaSave className="inline mr-1" size={12} />
                  {submitting ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_shedule;
