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
  FaLayerGroup,
  FaUserTimes,
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
  FaUserCheck,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5010";

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
    department: "",
    joinDate: "",
  });

  // ✅ Dynamic states
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
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
  const [filterDepartment, setFilterDepartment] = useState("All");

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
  });

  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const subjects = [
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
    "Arabic Grammar",
  ];
  const teachers = [
    "Dr. Muhammad Abdullah",
    "Ustadh Ahmad Ali",
    "Ustadha Fatima Rahman",
    "Dr. Omar Farooq",
    "Ustadh Yusuf Khan",
    "Ustadh Ibrahim Malik",
  ];
  const statuses = ["Present", "Absent", "Late", "Leave"];

  // ============================================================
  // Sidebar Menu Items
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
          id: "today-class",
          path: "/admin-dashboard/today-class",
          label: "Today's Class",
        },
        {
          id: "basic-tazweed",
          path: "/admin-dashboard/basic-tazweed",
          label: "Basic Tazweed Payment Overview",
        },
        {
          id: "najera-batch",
          path: "/admin-dashboard/najera-batch",
          label: "Najera Payment Overview",
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
      icon: <FaLayerGroup className="text-xl" />,
      label: "Batch & Course",
      subItems: [
        {
          id: "batch-make",
          path: "/admin-batch-course/batch-make",
          label: "Batch Make",
        },
        {
          id: "course-make",
          path: "/admin-batch-course/course-make",
          label: "Course Make",
        },
        {
          id: "syllabus",
          path: "/admin-batch-course/syllabus",
          label: "Syllabus",
        },
        {
          id: "clear-routine",
          path: "/admin-batch-course/clear-routine",
          label: "Clear Routine",
        },
      ],
    },
    {
      id: "absence-student",
      path: "/admin-absence",
      icon: <FaUserTimes className="text-xl" />,
      label: "Absence Student Community",
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
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Exam",
      subItems: [
        { id: "exam-make", path: "/admin-exam/make", label: "Exam Make" },
        {
          id: "result-publish",
          path: "/admin-exam/result",
          label: "Result Publish",
        },
        {
          id: "certificate-permission",
          path: "/admin-exam/certificate",
          label: "Certificate Permission",
        },
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
    {
      id: "salary",
      path: "/admin-salary",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Salary",
      subItems: [
        {
          id: "total-salary",
          path: "/admin-salary/total",
          label: "Total Salary",
        },
        { id: "due-salary", path: "/admin-salary/due", label: "Due Salary" },
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

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) setAdminInfo(JSON.parse(savedAdmin));
    else
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
      });
  }, [user]);

  // ============================================================
  // ✅ Fetch Attendance records from backend
  // ============================================================
  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/api/attendance-report/all`);
      const data = await res.json();

      if (data.success) {
        console.log("✅ [Attendance] Loaded:", data.records?.length);
        setAttendanceRecords(data.records || []);
        setStats(data.stats || {});
        setBackendConnected(true);
      } else {
        setBackendConnected(false);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch Students (for dropdown auto-fill)
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/students/all`);
      const data = await res.json();
      if (data.success) {
        setAllStudents(data.students || []);
        console.log("✅ [Students] Loaded:", data.students?.length);
      }
    } catch (err) {
      console.error("❌ Students fetch error:", err);
    }
  };

  // ✅ Fetch Departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/departments/all`);
      const data = await res.json();
      if (data.success) {
        setDepartments(data.departments || []);
      }
    } catch (err) {
      console.error("❌ Departments fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
    fetchAttendance();
  }, []);

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
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
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

  // ✅ Client-side filters on top of backend data
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      (record.studentName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (record.studentId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (record.subject || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;
    const matchesClass = filterClass === "All" || record.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || record.subject === filterSubject;
    const matchesDate = !filterDate || record.date === filterDate;
    const matchesDept =
      filterDepartment === "All" ||
      (record.subject || "")
        .toLowerCase()
        .includes(filterDepartment.toLowerCase());
    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesSubject &&
      matchesDate &&
      matchesDept
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
      text: "Attendance report is being downloaded as PDF.",
      timer: 1500,
      showConfirmButton: false,
    });

  const exportToExcel = () =>
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: "Attendance report is being exported to Excel format.",
      timer: 1500,
      showConfirmButton: false,
    });

  const openAddModal = () => {
    setFormData({
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
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  // ✅ Auto-fill when student selected
  const handleStudentSelect = (studentId) => {
    const st = allStudents.find(
      (s) => String(s._id || s.id) === String(studentId),
    );
    if (st) {
      setFormData({
        ...formData,
        studentName: st.name || "",
        studentId: st.studentId || st.username || st.roll || "",
        class: st.class || st.course || "",
        subject: st.course || "",
      });
    }
  };

  // ✅ ADD — backend এ save
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
      const res = await fetch(`${API_BASE}/api/attendance-report/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        await fetchAttendance();
        setShowAddModal(false);
        Swal.fire({
          icon: "success",
          title: "Attendance Added!",
          text: `Attendance for ${formData.studentName} has been recorded.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ✅ EDIT
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
      const res = await fetch(
        `${API_BASE}/api/attendance-report/update/${selectedRecord._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();

      if (data.success) {
        await fetchAttendance();
        setShowEditModal(false);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ✅ DELETE
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
      const res = await fetch(
        `${API_BASE}/api/attendance-report/delete/${id}`,
        { method: "DELETE" },
      );
      const data = await res.json();
      if (data.success) {
        await fetchAttendance();
        Swal.fire("Deleted!", "Attendance record has been deleted.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Attendance Report</h1>
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
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 ease-in-out
            h-full overflow-hidden flex-shrink-0
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
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isParentActive
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={`transition-transform ${
                            expandedMenu === item.id ? "rotate-90" : ""
                          }`}
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
                              className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                                activeSubMenu === sub.id
                                  ? "bg-teal-50 text-[#004d4d] font-bold"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"
                              }`}
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
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isParentActive
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }`}
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

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto pt-16 md:pt-6">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaClipboardCheck className="text-blue-600" /> Attendance Report
              </h1>
              <p className="text-xs text-gray-500">
                Manage and track student attendance
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Attendance
              </button>
              <button
                onClick={downloadReport}
                className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaFilePdfIcon size={12} /> PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaFileExcelIcon size={12} /> Excel
              </button>
              <button
                onClick={fetchAttendance}
                disabled={isLoading}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
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
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
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
                  Server running on port 5010? Click "Refresh" after starting
                  backend.
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
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by student name, ID or subject..."
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
                {/* ✅ Department filter */}
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-1.5 py-1 text-xs border-2 border-teal-300 rounded-lg bg-teal-50 font-semibold text-teal-700"
                >
                  <option value="All">🏫 All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      📚 {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center">
              <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
              <p className="text-sm text-gray-500 mt-3">
                Loading attendance...
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-420px)] overflow-y-auto">
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
                          className="hover:bg-gray-50 transition-colors"
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
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(
                                record.status,
                              )}`}
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
                          <p>No attendance records found</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            Click "Add Attendance" to record the first entry
                          </p>
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
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-green-600" /> Add Attendance
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAttendance} className="p-6 space-y-4">
              {/* Student dropdown — auto-fill */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Student (auto-fill)
                </label>
                <select
                  value=""
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-teal-50"
                >
                  <option value="">
                    -- Choose from registered students --
                  </option>
                  {allStudents.map((s) => (
                    <option key={s._id || s.id} value={s._id || s.id}>
                      {s.name} {s.phone ? `(${s.phone})` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 mt-1">
                  Or manually fill below
                </p>
              </div>

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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {classes.map((c) => (
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {[...new Set([...subjects, ...departments])].map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="04:00 PM"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
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
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Attendance
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {classes.map((c) => (
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {[...new Set([...subjects, ...departments])].map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {teachers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
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
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
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
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
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
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedRecord.status,
                    )}`}
                  >
                    {getStatusIcon(selectedRecord.status)}
                    {selectedRecord.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
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
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedRecord);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteAttendance(selectedRecord._id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaTrash className="inline mr-2" /> Delete
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

export default Attantence_report;
