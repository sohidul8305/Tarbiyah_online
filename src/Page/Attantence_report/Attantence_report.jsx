// src/Page/Admin/Attantence_report.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaCalendarCheck,
  FaChartLine,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSave,
  FaPlus,
  FaArrowRight,
  FaInfoCircle,
  FaClipboardCheck,
  FaClock as FaClockIcon2,
  FaCalendarDay,
  FaCheckCircle as FaCheckCircleIcon,
  FaTimesCircle as FaTimesCircleIcon,
  FaFilePdf as FaFilePdfIcon,
  FaFileExcel as FaFileExcelIcon,
  FaSpinner,
  FaBuilding,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ✅ FIX: https
const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ DEPARTMENT-WISE CONFIG
// ============================================================
const DEPARTMENT_CONFIGS = {
  Elders: {
    label: "Quran For Elders",
    courses: [
      "Qaida Nuraniyah",
      "Quran Nazera",
      "Najera",
      "Basic Tajweed",
      "Bakarah Hifz",
    ],
    classes: [
      "Elders Batch A",
      "Elders Batch B",
      "Elders Batch C",
      "Elders Batch D",
      "Elders Batch E",
    ],
    courseKeywords: [
      "qaida nuraniyah",
      "qaida nooraniya",
      "qaida noorani",
      "qaida nurani",
      "qaidah nuraniyah",
      "qaidah nooraniya",
      "qaidah noorani",
      "quran nazera",
      "nazera quran",
      "quran najera",
      "najera quran",
      "bakarah hifz",
      "bakara hifz",
      "baqarah hifz",
      "baqara hifz",
      "basic tajweed",
      "quran for elders",
    ],
  },
  "Quran Studies": {
    label: "Quran Studies",
    courses: ["Hifzul Quran", "Tarbiyah Quran Studies", "Quran Translation"],
    classes: ["Quran Studies A", "Quran Studies B", "Quran Studies C"],
    courseKeywords: ["quran studies", "hifzul quran", "tarbiyah quran studies"],
  },
  Alimiya: {
    label: "Alimiya",
    courses: ["Dawra e Hadith", "Tafsir", "Fiqh", "Hadith", "Arabic Grammar"],
    classes: ["Alimiya Year 1", "Alimiya Year 2", "Alimiya Year 3"],
    courseKeywords: [
      "alimiya",
      "dawra",
      "tafsir",
      "fiqh",
      "hadith",
      "arabic grammar",
    ],
  },
  Diploma: {
    label: "Diploma",
    courses: [
      "Diploma in Islamic Studies",
      "Diploma in Arabic",
      "Certificate Course",
    ],
    classes: ["Diploma A", "Diploma B", "Diploma C"],
    courseKeywords: ["diploma in islamic studies", "diploma", "certificate"],
  },
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
    if (text.trim().startsWith("<"))
      return { success: false, _htmlError: true };
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, _jsonError: true };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const Attantence_report = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("report-analytics");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Elders",
    joinDate: "",
  });

  // ✅ Current department
  const [currentDept, setCurrentDept] = useState(getCurrentDepartment());
  const deptConfig =
    DEPARTMENT_CONFIGS[currentDept] || DEPARTMENT_CONFIGS["Elders"];
  const DEPT_COURSES = deptConfig.courses;
  const DEPT_CLASSES = deptConfig.classes;
  const DEPT_KEYWORDS = deptConfig.courseKeywords;
  const DEPT_LABEL = deptConfig.label;

  // ✅ Dynamic states
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [deptStudents, setDeptStudents] = useState([]);
  const [deptTeachers, setDeptTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [backendConnected, setBackendConnected] = useState(true);

  const [stats, setStats] = useState({
    totalRecords: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    leaveToday: 0,
    overallAttendance: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    checkIn: "",
    checkOut: "",
    teacher: "",
    note: "",
    department: "",
  });

  const statuses = ["Present", "Absent", "Late", "Leave"];

  // ============================================================
  // Load admin info
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      try {
        const info = JSON.parse(savedAdmin);
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

  // ============================================================
  // Sidebar
  // ============================================================
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
          label: "Batch Create and  Maintain",
        },
        {
          id: "student-profile",
          path: "/admin-students/profile",
          label: "Student Profile",
        },
        {
          id: "admission-permission",
          path: "/admin-students/admission",
          label: "Admission Permission",
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

  const getActiveFromPath = () => {
    const currentPath = location.pathname;
    for (const item of menuItems) {
      if (item.subItems) {
        const match = item.subItems.find((s) => s.path === currentPath);
        if (match) return { menu: item.id, sub: match.id };
      }
      if (item.path === currentPath) return { menu: item.id, sub: null };
    }
    return { menu: null, sub: null };
  };

  const { menu: activeMenu, sub: activeSubMenu } = getActiveFromPath();

  useEffect(() => {
    if (activeSubMenu && activeMenu) setExpandedMenu(activeMenu);
  }, [activeMenu, activeSubMenu]);

  // ============================================================
  // Course helpers
  // ============================================================
  const isSingleDeptCourse = (singleCourse) => {
    const p = String(singleCourse).toLowerCase().trim();
    if (!p) return false;
    return DEPT_KEYWORDS.some((c) => {
      if (p === c) return true;
      if (p.includes(c)) return true;
      if (c.includes(p) && p.length >= 8) return true;
      return false;
    });
  };

  const isDeptCourse = (courseStr) => {
    if (!courseStr) return false;
    const parts = String(courseStr)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return false;
    return parts.every((part) => isSingleDeptCourse(part));
  };

  const getPrimaryCourse = (courseStr) => {
    if (!courseStr) return DEPT_COURSES[0] || "";
    const first = String(courseStr).split(",")[0].trim().toLowerCase();
    if (first.includes("qaida") || first.includes("noorani"))
      return "Qaida Nuraniyah";
    if (first.includes("najera") || first.includes("nazera")) return "Najera";
    if (first.includes("tajweed")) return "Basic Tajweed";
    if (
      first.includes("bakarah") ||
      first.includes("bakara") ||
      first.includes("baqarah")
    )
      return "Bakarah Hifz";
    if (first.includes("hifzul") || first.includes("hifz"))
      return "Hifzul Quran";
    if (first.includes("dawra")) return "Dawra e Hadith";
    if (first.includes("tafsir")) return "Tafsir";
    if (first.includes("fiqh")) return "Fiqh";
    if (first.includes("hadith")) return "Hadith";
    if (first.includes("diploma")) return "Diploma in Islamic Studies";
    return DEPT_COURSES[0] || first;
  };

  // ============================================================
  // ✅ Fetch Attendance — with department filter
  // ============================================================
  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      const data = await safeFetchJSON(
        `${API_BASE}/api/attendance-report/all?department=${encodeURIComponent(currentDept)}`,
      );

      if (data.success) {
        console.log(
          `✅ [Attendance] ${data.records?.length} records | Dept: ${currentDept}`,
        );
        setAttendanceRecords(data.records || []);
        setStats(data.stats || {});
        setBackendConnected(true);
      } else {
        // Fallback: localStorage
        const key = `attendance_${currentDept.replace(/\s+/g, "_")}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setAttendanceRecords(Array.isArray(parsed) ? parsed : []);
          } catch {
            setAttendanceRecords([]);
          }
        } else {
          setAttendanceRecords([]);
        }
        setBackendConnected(false);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setBackendConnected(false);
      setAttendanceRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Cache
  useEffect(() => {
    if (!currentDept) return;
    const key = `attendance_${currentDept.replace(/\s+/g, "_")}`;
    localStorage.setItem(key, JSON.stringify(attendanceRecords));
  }, [attendanceRecords, currentDept]);

  // ============================================================
  // ✅ Fetch Students — department specific
  // ============================================================
  const fetchStudents = async () => {
    try {
      const data = await safeFetchJSON(
        `${API_BASE}/api/students/all?department=${encodeURIComponent(currentDept)}`,
      );

      if (data.success && Array.isArray(data.students)) {
        const all = data.students || [];
        const filtered = all.filter((s) => {
          const sDept = String(s.department || "")
            .toLowerCase()
            .trim();
          if (sDept && sDept === currentDept.toLowerCase().trim()) return true;
          return isDeptCourse(s.course);
        });

        const formatted = filtered.map((s) => ({
          _id: s._id,
          name: s.name || "",
          studentId: s.studentId || s._id?.slice(-8) || "N/A",
          course: s.course || "",
          primaryCourse: getPrimaryCourse(s.course),
          class:
            s.batch || s.class || DEPT_CLASSES[0] || `${currentDept} Batch A`,
          batch: s.batch || "",
          phone: s.phone || "",
        }));

        const deduped = [];
        formatted.forEach((s) => {
          const exists = deduped.some(
            (d) =>
              (d.name || "").toLowerCase() === (s.name || "").toLowerCase(),
          );
          if (!exists) deduped.push(s);
        });

        setDeptStudents(deduped);
        console.log(`✅ [Students] ${deduped.length} for ${currentDept}`);
      } else {
        setDeptStudents([]);
      }
    } catch (err) {
      console.error("❌ Students fetch error:", err);
      setDeptStudents([]);
    }
  };

  // ============================================================
  // ✅ Fetch Teachers — schedule থেকে
  // ============================================================
  const fetchTeachers = () => {
    const teachers = [];

    // Schedule থেকে teacher list
    const scheduleKey = `teacherSchedule_${currentDept.replace(/\s+/g, "_")}`;
    const savedSchedule = localStorage.getItem(scheduleKey);
    if (savedSchedule) {
      try {
        const schedule = JSON.parse(savedSchedule);
        if (Array.isArray(schedule)) {
          schedule.forEach((s) => {
            const name = String(s.teacherName || "").trim();
            if (
              name &&
              !teachers.some((t) => t.toLowerCase() === name.toLowerCase())
            ) {
              teachers.push(name);
            }
          });
        }
      } catch {}
    }

    // Extra teachers
    const extraKey = `extraTeachers_${currentDept.replace(/\s+/g, "_")}`;
    const savedExtra = localStorage.getItem(extraKey);
    if (savedExtra) {
      try {
        const extra = JSON.parse(savedExtra) || [];
        extra.forEach((t) => {
          const name = String(t.name || t.shortName || "").trim();
          if (
            name &&
            !teachers.some((x) => x.toLowerCase() === name.toLowerCase())
          ) {
            teachers.push(name);
          }
        });
      } catch {}
    }

    setDeptTeachers(teachers);
    console.log(`✅ [Teachers] ${teachers.length} for ${currentDept}`);
  };

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDept]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setExpandedMenu(expandedMenu === menu ? null : menu);

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
        return <FaCheckCircleIcon className="text-green-500" />;
      case "Absent":
        return <FaTimesCircleIcon className="text-red-500" />;
      case "Late":
        return <FaClockIcon2 className="text-yellow-500" />;
      case "Leave":
        return <FaCalendarDay className="text-blue-500" />;
      default:
        return null;
    }
  };

  // ============================================================
  // Client-side filters
  // ============================================================
  const filteredRecords = attendanceRecords.filter((record) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (record.studentName || "").toLowerCase().includes(s) ||
      (record.studentId || "").toLowerCase().includes(s) ||
      (record.subject || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;
    const matchesClass = filterClass === "All" || record.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || record.subject === filterSubject;
    const matchesDate = !filterDate || record.date === filterDate;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesSubject &&
      matchesDate
    );
  });

  const uniqueStatuses = [
    "All",
    ...new Set(attendanceRecords.map((r) => r.status).filter(Boolean)),
  ];
  const uniqueClasses = [
    "All",
    ...new Set(attendanceRecords.map((r) => r.class).filter(Boolean)),
  ];
  const uniqueSubjects = [
    "All",
    ...new Set(attendanceRecords.map((r) => r.subject).filter(Boolean)),
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const downloadReport = () =>
    Swal.fire({
      icon: "success",
      title: "Report Downloading",
      text: `${currentDept} attendance report is being downloaded.`,
      timer: 1500,
      showConfirmButton: false,
    });

  const exportToExcel = () =>
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: `${currentDept} attendance report exported.`,
      timer: 1500,
      showConfirmButton: false,
    });

  // ============================================================
  // ✅ Open Add Modal — always enabled
  // ============================================================
  const openAddModal = () => {
    setFormData({
      studentName: "",
      studentId: "",
      class: DEPT_CLASSES[0] || "",
      subject: DEPT_COURSES[0] || "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      checkIn: "",
      checkOut: "",
      teacher: deptTeachers[0] || "",
      note: "",
      department: currentDept,
    });
    setShowAddModal(true);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setFormData({
      studentName: record.studentName,
      studentId: record.studentId || "",
      class: record.class,
      subject: record.subject,
      date: record.date,
      status: record.status,
      checkIn: record.checkIn || "",
      checkOut: record.checkOut || "",
      teacher: record.teacher || "",
      note: record.note || "",
      department: record.department || currentDept,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  // Auto-fill from student
  const handleStudentSelect = (studentId) => {
    const st = deptStudents.find((s) => String(s._id) === String(studentId));
    if (st) {
      setFormData({
        ...formData,
        studentName: st.name || "",
        studentId: st.studentId || "",
        class: st.class || "",
        subject: st.primaryCourse || st.course || "",
      });
    }
  };

  // ============================================================
  // ✅ ADD — with department
  // ============================================================
  const handleAddAttendance = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
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

    setSaving(true);
    try {
      const payload = {
        ...formData,
        department: currentDept,
      };

      const data = await safeFetchJSON(
        `${API_BASE}/api/attendance-report/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      let newRecord;
      if (data.success && data.record) {
        newRecord = data.record;
        console.log("✅ Saved to API");
      } else {
        newRecord = { _id: `LOCAL_${Date.now()}`, ...payload };
        console.warn("⚠️ API failed, saved locally");
      }

      setAttendanceRecords([newRecord, ...attendanceRecords]);
      setShowAddModal(false);

      Swal.fire({
        icon: "success",
        title: "✅ Attendance Added!",
        html: `<p><strong>${formData.studentName}</strong></p><p style="font-size:12px;color:#666;">${formData.status} — ${currentDept}</p>`,
        timer: 1800,
        showConfirmButton: false,
      });

      fetchAttendance();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // ✅ EDIT
  // ============================================================
  const handleEditAttendance = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
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

    setSaving(true);
    try {
      const isLocalId = String(selectedRecord._id).startsWith("LOCAL_");
      const payload = { ...formData, department: currentDept };

      if (!isLocalId) {
        await safeFetchJSON(
          `${API_BASE}/api/attendance-report/update/${selectedRecord._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
      }

      setAttendanceRecords(
        attendanceRecords.map((r) =>
          r._id === selectedRecord._id ? { ...r, ...payload } : r,
        ),
      );

      setShowEditModal(false);
      Swal.fire({
        icon: "success",
        title: "✅ Updated!",
        timer: 1200,
        showConfirmButton: false,
      });
      fetchAttendance();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // ✅ DELETE
  // ============================================================
  const handleDeleteAttendance = async (id) => {
    const result = await Swal.fire({
      title: "Delete Attendance?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const isLocalId = String(id).startsWith("LOCAL_");
      if (!isLocalId) {
        await safeFetchJSON(`${API_BASE}/api/attendance-report/delete/${id}`, {
          method: "DELETE",
        });
      }
      setAttendanceRecords(attendanceRecords.filter((r) => r._id !== id));
      Swal.fire("Deleted!", "Attendance record deleted.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Attendance Report ({currentDept})
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
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}`}
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
            {menuItems.map((item) => {
              const isParentActive = activeMenu === item.id;
              return (
                <div key={item.id}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => {
                          toggleSubMenu(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={`transition-transform ${expandedMenu === item.id ? "rotate-90" : ""}`}
                        >
                          <FaArrowRight size={12} />
                        </span>
                      </button>
                      {expandedMenu === item.id && (
                        <div className="ml-6 space-y-1 mt-1">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.id}
                              to={sub.path}
                              onClick={() => setIsSidebarOpen(false)}
                              className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${activeSubMenu === sub.id ? "bg-teal-50 text-[#004d4d] font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
                      >
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </Link>
                  )}
                </div>
              );
            })}
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

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto pt-16 md:pt-6">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaClipboardCheck className="text-blue-600" /> Attendance Report
                —<span className="text-teal-700">{DEPT_LABEL}</span>
              </h1>
              <p className="text-xs text-gray-500">
                {isLoading
                  ? `Loading ${currentDept} data...`
                  : `${attendanceRecords.length} record${attendanceRecords.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Attendance
              </button>
              <button
                onClick={downloadReport}
                className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFilePdfIcon size={12} /> PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFileExcelIcon size={12} /> Excel
              </button>
              <button
                onClick={fetchAttendance}
                disabled={isLoading}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                {isLoading ? (
                  <FaSpinner size={12} className="animate-spin" />
                ) : (
                  "🔄"
                )}{" "}
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Dept Badge */}
          <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 rounded-xl text-xs font-semibold mb-3">
            🏫 Showing attendance of:{" "}
            <span className="font-bold">{currentDept}</span> department
          </div>

          {/* Backend Warning */}
          {!backendConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3 flex items-start gap-2">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-yellow-800">
                  Backend Not Connected
                </p>
                <p className="text-[11px] text-yellow-700 mt-0.5">
                  Data is being saved locally. Click "Refresh" after backend is
                  up.
                </p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {stats.totalRecords || 0}
              </p>
              <p className="text-[10px] text-gray-500">Total Records</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {stats.presentToday || 0}
              </p>
              <p className="text-[10px] text-gray-500">Present Today</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {stats.absentToday || 0}
              </p>
              <p className="text-[10px] text-gray-500">Absent Today</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {stats.lateToday || 0}
              </p>
              <p className="text-[10px] text-gray-500">Late Today</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {stats.overallAttendance || 0}%
              </p>
              <p className="text-[10px] text-gray-500">Overall</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={`Search ${currentDept} attendance...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueClasses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading / Table */}
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center">
              <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
              <p className="text-sm text-gray-500 mt-3">
                Loading {currentDept} attendance...
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-500px)] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Student
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                        Class
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                        Subject
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                        Date
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                        Check In
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record, index) => (
                        <tr
                          key={record._id || record.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-3 py-2 font-medium text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-800">
                              {record.studentName}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {record.studentId}
                            </div>
                          </td>
                          <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                            {record.class}
                          </td>
                          <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                            {record.subject}
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(record.status)}`}
                            >
                              {getStatusIcon(record.status)}
                              {record.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                            {record.checkIn || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openDetailsModal(record)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="View"
                              >
                                <FaEye size={12} />
                              </button>
                              <button
                                onClick={() => openEditModal(record)}
                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteAttendance(record._id)
                                }
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-3 py-8 text-center text-gray-500"
                        >
                          <FaClipboardCheck className="text-4xl text-gray-300 mx-auto mb-2" />
                          <p>
                            {currentDept} department-এ কোনো attendance record
                            নেই
                          </p>
                          <button
                            onClick={openAddModal}
                            className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-lg font-semibold"
                          >
                            + Add First Attendance
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                <FaPlus className="text-green-600" /> Add Attendance —{" "}
                {currentDept}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAttendance} className="p-6 space-y-4">
              {deptStudents.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Student (Optional Auto-fill)
                  </label>
                  <select
                    value=""
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-teal-50"
                  >
                    <option value="">-- Manual entry --</option>
                    {deptStudents.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.studentId})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Class</option>
                    {DEPT_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Subject</option>
                    {DEPT_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${formData.status === s ? `${getStatusColor(s)} border-2 border-blue-500` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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
                  Teacher
                </label>
                {deptTeachers.length > 0 ? (
                  <select
                    value={formData.teacher}
                    onChange={(e) =>
                      setFormData({ ...formData, teacher: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Teacher</option>
                    {deptTeachers.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) =>
                      setFormData({ ...formData, teacher: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter teacher name"
                  />
                )}
              </div>

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
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Add Attendance
                    </>
                  )}
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

      {/* Edit Modal */}
      {showEditModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Attendance —{" "}
                {currentDept}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditAttendance} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {DEPT_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {DEPT_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${formData.status === s ? `${getStatusColor(s)} border-2 border-blue-500` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
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
                />
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Update
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Attendance Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedRecord.studentName?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedRecord.studentName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedRecord.studentId}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}
                  >
                    {getStatusIcon(selectedRecord.status)}
                    {selectedRecord.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Department</p>
                  <p className="text-sm font-semibold">
                    {selectedRecord.department || currentDept}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Class</p>
                  <p className="text-sm font-semibold">
                    {selectedRecord.class}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Subject</p>
                  <p className="text-sm font-semibold">
                    {selectedRecord.subject}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedRecord.date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Teacher</p>
                  <p className="text-sm font-semibold">
                    {selectedRecord.teacher || "N/A"}
                  </p>
                </div>
                {selectedRecord.checkIn && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Check In</p>
                    <p className="text-sm font-semibold">
                      {selectedRecord.checkIn}
                    </p>
                  </div>
                )}
                {selectedRecord.checkOut && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Check Out</p>
                    <p className="text-sm font-semibold">
                      {selectedRecord.checkOut}
                    </p>
                  </div>
                )}
              </div>
              {selectedRecord.note && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Note</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedRecord.note}
                  </p>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t flex-wrap">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedRecord);
                  }}
                  className="flex-1 min-w-[100px] bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteAttendance(selectedRecord._id);
                  }}
                  className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 min-w-[100px] bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
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

export default Attantence_report;
