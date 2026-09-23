// src/Page/Admin/Data_enty.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaChartLine,
  FaCalendarCheck,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaSave,
  FaArrowRight,
  FaLayerGroup,
  FaInfoCircle,
  FaPhoneAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaFileExport,
  FaWhatsapp,
  FaSyncAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.tarbiyahonline.com/api";

const Data_enty = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("crm-management");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // ✅ Data Sources
  const [crmEntries, setCrmEntries] = useState([]);
  const [admissionStudents, setAdmissionStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    student: "",
    guardian: "",
    whatsapp: "",
    interested: "",
    status: "Interested",
    nextFollowUp: "",
    notes: "",
  });

  // Options
  const statusOptions = [
    "Interested",
    "Contacted",
    "Enrolled",
    "Not Interested",
    "Follow-up",
    "Pending",
  ];

  const interestedOptions = [
    "Diploma in Islamic Studies",
    "Alimiyah for Kids (Bangla Medium)",
    "Alimiyah for Kids (English Medium)",
    "Alimiyah Program (Bangla Version)",
    "Alimiyah Program (English Version)",
    "Qaida Noorani (Bangla Medium)",
    "Qaida Noorani (International)",
    "Nazera Quran (Bangladeshi)",
    "Nazera Quran (Expatriate)",
    "Hifzul Quran",
    "Hifz Revision (One to One) - Bangla Medium",
    "Hifz Revision (One to One) - International",
    "Basic Tajweed (Level-1)",
    "Bakarah Hifz",
    "One-to-One Program",
    "Tarbiyah Quran Studies",
    "Quran for Elders",
    "Other",
  ];

  // ============================================
  // Map student status → CRM status
  // ============================================
  const mapStudentStatus = (studentStatus) => {
    if (studentStatus === "Active") return "Enrolled";
    if (studentStatus === "Pending") return "Pending";
    if (studentStatus === "Inactive") return "Not Interested";
    return "Interested";
  };

  // ============================================
  // Convert Student → CRM entry shape
  // ============================================
  const studentToCrmEntry = (s) => {
    return {
      id: s._id || s.id,
      _id: s._id || s.id,
      student: s.name || "",
      guardian: s.guardianName || s.fatherName || "",
      whatsapp: s.phone || s.guardianPhone || "",
      interested: s.course || s.class || "",
      status: mapStudentStatus(s.status),
      nextFollowUp: s.nextFollowUp
        ? s.nextFollowUp.split("T")[0]
        : s.admissionDate
          ? s.admissionDate.split("T")[0]
          : "",
      notes: s.presentAddress || s.address || s.paymentRemarks || "",
      enteredBy: "Admission Form",
      createdAt: (s.createdAt || s.admissionDate || "").split("T")[0],
      source: "admission",
      isStudent: true,
      studentId: s._id || s.id,
      _original: s,
    };
  };

  // ============================================
  // FETCH Admission Students
  // ============================================
  const fetchAdmissionStudents = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const list = data.students || data.data || [];

      const mapped = Array.isArray(list) ? list.map(studentToCrmEntry) : [];
      setAdmissionStudents(mapped);
    } catch (err) {
      console.warn("⚠️ Could not fetch admission students:", err.message);
      setAdmissionStudents([]);
    }
  }, []);

  // ============================================
  // FETCH CRM entries (localStorage)
  // ============================================
  const fetchCrmEntries = useCallback(() => {
    try {
      const saved = localStorage.getItem("crmDataEntries");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const tagged = parsed.map((e) => ({
            ...e,
            source: e.source || "crm",
          }));
          setCrmEntries(tagged);
          return;
        }
      }
      const sample = [];
      setCrmEntries(sample);
      localStorage.setItem("crmDataEntries", JSON.stringify(sample));
    } catch (e) {
      console.error("Failed to load CRM entries:", e);
      setCrmEntries([]);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      fetchCrmEntries();
      await fetchAdmissionStudents();
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [fetchCrmEntries, fetchAdmissionStudents]);

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

  // Initial load
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Persist CRM entries
  useEffect(() => {
    if (crmEntries.length > 0) {
      localStorage.setItem("crmDataEntries", JSON.stringify(crmEntries));
    }
  }, [crmEntries]);

  // Combined list
  const allEntries = useMemo(() => {
    return [...admissionStudents, ...crmEntries];
  }, [admissionStudents, crmEntries]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminInfo");
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

  // ============================================================
  // ✅ Sidebar Menu Items — সব route সহ (Updated)
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

  // ✅ URL থেকে active menu/submenu auto-detect
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

  // ✅ Auto-expand parent of active submenu
  useEffect(() => {
    if (activeSubMenu && activeMenu) setExpandedMenu(activeMenu);
  }, [activeMenu, activeSubMenu]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-blue-100 text-blue-700";
      case "Contacted":
        return "bg-purple-100 text-purple-700";
      case "Enrolled":
        return "bg-green-100 text-green-700";
      case "Not Interested":
        return "bg-red-100 text-red-700";
      case "Follow-up":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Interested":
        return <FaInfoCircle className="text-blue-500" />;
      case "Contacted":
        return <FaPhoneAlt className="text-purple-500" />;
      case "Enrolled":
        return <FaCheckCircle className="text-green-500" />;
      case "Not Interested":
        return <FaTimesCircle className="text-red-500" />;
      case "Follow-up":
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredEntries = allEntries.filter((entry) => {
    const matchesSearch =
      (entry.student || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.guardian || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.whatsapp || "").includes(searchTerm) ||
      (entry.interested || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || entry.status === filterStatus;

    const matchesSource =
      filterSource === "All" || entry.source === filterSource;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(allEntries.map((e) => e.status).filter(Boolean)),
  ];

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "-") return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const openAddModal = () => {
    setFormData({
      student: "",
      guardian: "",
      whatsapp: "",
      interested: "",
      status: "Interested",
      nextFollowUp: "",
      notes: "",
    });
    setShowAddModal(true);
  };

  const openEditModal = (entry) => {
    if (entry.isStudent) {
      Swal.fire({
        icon: "info",
        title: "Student Record",
        text: "This is an admission student. Edit from Student Management page.",
        timer: 2500,
        showConfirmButton: true,
        confirmButtonText: "Go to Student Management",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((res) => {
        if (res.isConfirmed) navigate("/admin-students/add");
      });
      return;
    }

    setSelectedEntry(entry);
    setFormData({
      student: entry.student || "",
      guardian: entry.guardian || "",
      whatsapp: entry.whatsapp || "",
      interested: entry.interested || "",
      status: entry.status || "Interested",
      nextFollowUp: entry.nextFollowUp || "",
      notes: entry.notes || "",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (entry) => {
    setSelectedEntry(entry);
    setShowDetailsModal(true);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (!formData.student || !formData.whatsapp) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Student name and WhatsApp number are required.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const newEntry = {
      id: Date.now(),
      student: formData.student,
      guardian: formData.guardian || "",
      whatsapp: formData.whatsapp,
      interested: formData.interested || "",
      status: formData.status || "Interested",
      nextFollowUp: formData.nextFollowUp || "",
      notes: formData.notes || "",
      enteredBy: adminInfo.name,
      createdAt: new Date().toISOString().split("T")[0],
      source: "crm",
    };

    setCrmEntries([newEntry, ...crmEntries]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Data Added!",
      text: `${formData.student}'s info has been added.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditEntry = (e) => {
    e.preventDefault();

    if (!formData.student || !formData.whatsapp) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Student name and WhatsApp number are required.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setCrmEntries(
      crmEntries.map((entry) =>
        entry.id === selectedEntry.id
          ? {
              ...entry,
              student: formData.student,
              guardian: formData.guardian || "",
              whatsapp: formData.whatsapp,
              interested: formData.interested || "",
              status: formData.status,
              nextFollowUp: formData.nextFollowUp || "",
              notes: formData.notes || "",
            }
          : entry,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Data Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteEntry = async (entry) => {
    const isStudent = entry.isStudent;
    const id = entry.id || entry._id;

    const result = await Swal.fire({
      title: isStudent ? `Delete Student "${entry.student}"?` : "Delete Entry?",
      text: isStudent
        ? "This will permanently delete the student record!"
        : "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      if (isStudent) {
        const res = await fetch(`${API_BASE_URL}/students/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.success === false) {
          throw new Error(data.message || "Could not delete student.");
        }

        setAdmissionStudents(
          admissionStudents.filter((e) => (e.id || e._id) !== id),
        );
      } else {
        setCrmEntries(crmEntries.filter((e) => e.id !== id));
      }

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message || "Something went wrong.",
      });
    }
  };

  const exportData = () => {
    const headers = [
      "Student",
      "Guardian",
      "WhatsApp",
      "Interested",
      "Status",
      "Next Follow-up",
      "Notes",
      "Source",
    ];
    const rows = allEntries.map((e) => [
      e.student,
      e.guardian,
      e.whatsapp,
      e.interested,
      e.status,
      e.nextFollowUp,
      e.notes,
      e.source,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `crm-data-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    Swal.fire({
      icon: "success",
      title: "Exported!",
      text: "Data exported as CSV file.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Stats
  const totalEntries = allEntries.length;
  const admissionCount = admissionStudents.length;
  const crmCount = crmEntries.length;
  const interestedCount = allEntries.filter(
    (e) => e.status === "Interested",
  ).length;
  const enrolledCount = allEntries.filter(
    (e) => e.status === "Enrolled",
  ).length;
  const pendingCount = allEntries.filter((e) => e.status === "Pending").length;
  const followUpCount = allEntries.filter(
    (e) => e.status === "Follow-up" || e.status === "Contacted",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">CRM Data Entry</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}`}
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
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
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
                              className={`block px-3 py-1.5 rounded-lg text-xs transition-all ${
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
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t border-gray-200 pt-4"
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
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaDatabase className="text-blue-600" /> CRM Data Entry
              </h1>
              <p className="text-xs text-gray-500">
                Manage prospective students & follow-ups
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={fetchAll}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={isLoading ? "animate-spin" : ""}
                />
                Refresh
              </button>
              <button
                onClick={exportData}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFileExport size={12} /> Export CSV
              </button>
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Data
              </button>
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs rounded-lg p-2 mb-3 flex items-center justify-between">
              <span>⚠️ {error}</span>
              <button onClick={fetchAll} className="font-bold underline">
                Retry
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalEntries}</p>
              <p className="text-[10px] text-gray-500">Total Leads</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-teal-600">
                {admissionCount}
              </p>
              <p className="text-[10px] text-gray-500">From Admission</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">{crmCount}</p>
              <p className="text-[10px] text-gray-500">CRM Manual</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {enrolledCount}
              </p>
              <p className="text-[10px] text-gray-500">Enrolled</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {pendingCount}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search student, guardian, WhatsApp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  <option value="All">All Sources</option>
                  <option value="admission">Admission Form</option>
                  <option value="crm">CRM Manual</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-360px)] overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      #
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Source
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Student
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Guardian
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      WhatsApp
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Interested
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Next Follow-up
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-3 py-10 text-center text-gray-500"
                      >
                        <FaSyncAlt className="text-3xl text-blue-500 mx-auto mb-2 animate-spin" />
                        <p>Loading CRM data...</p>
                      </td>
                    </tr>
                  ) : filteredEntries.length > 0 ? (
                    filteredEntries.map((entry, index) => {
                      const rowId = entry.id || entry._id;
                      return (
                        <tr
                          key={`${entry.source}-${rowId}`}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-3 py-2 text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2">
                            {entry.isStudent ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-teal-100 text-teal-700">
                                <FaUserGraduate size={9} /> Admission
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-purple-100 text-purple-700">
                                <FaDatabase size={9} /> CRM
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-800">
                              {entry.student || "-"}
                            </div>
                            {entry.notes && (
                              <div className="text-[10px] text-gray-400 truncate max-w-[180px]">
                                {entry.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                            {entry.guardian || "-"}
                          </td>
                          <td className="px-3 py-2 text-gray-700 font-mono text-[11px]">
                            {entry.whatsapp || "-"}
                          </td>
                          <td className="px-3 py-2 hidden lg:table-cell text-gray-600 text-[11px] max-w-[180px] truncate">
                            {entry.interested || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(entry.status)}`}
                            >
                              {getStatusIcon(entry.status)}
                              {entry.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell text-gray-600 text-[11px]">
                            {formatDate(entry.nextFollowUp)}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openDetailsModal(entry)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="View"
                              >
                                <FaEye size={12} />
                              </button>
                              <button
                                onClick={() => openEditModal(entry)}
                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                                title={
                                  entry.isStudent ? "View Student" : "Edit"
                                }
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                onClick={() => handleDeleteEntry(entry)}
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaDatabase className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No CRM data found</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Click 'Add Data' to add your first entry
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {showAddModal ? (
                  <>
                    <FaPlus className="text-blue-600" /> Add CRM Entry
                  </>
                ) : (
                  <>
                    <FaEdit className="text-yellow-600" /> Edit CRM Entry
                  </>
                )}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <form
              onSubmit={showAddModal ? handleAddEntry : handleEditEntry}
              className="p-5 space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Student *
                </label>
                <input
                  type="text"
                  required
                  value={formData.student}
                  onChange={(e) =>
                    setFormData({ ...formData, student: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Guardian
                </label>
                <input
                  type="text"
                  value={formData.guardian}
                  onChange={(e) =>
                    setFormData({ ...formData, guardian: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter guardian name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Interested
                </label>
                <select
                  value={formData.interested}
                  onChange={(e) =>
                    setFormData({ ...formData, interested: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Course</option>
                  {interestedOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Next Follow-up
                  </label>
                  <input
                    type="date"
                    value={formData.nextFollowUp}
                    onChange={(e) =>
                      setFormData({ ...formData, nextFollowUp: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-3 border-t">
                <button
                  type="submit"
                  className={`flex-1 ${
                    showAddModal
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2`}
                >
                  <FaSave size={14} />
                  {showAddModal ? "Add Entry" : "Update Entry"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Lead Details
                {selectedEntry.isStudent && (
                  <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                    Admission
                  </span>
                )}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {selectedEntry.student?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedEntry.student}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(selectedEntry.status)}`}
                  >
                    {getStatusIcon(selectedEntry.status)}
                    {selectedEntry.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Student</p>
                  <p className="font-semibold">
                    {selectedEntry.student || "-"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Guardian</p>
                  <p className="font-semibold">
                    {selectedEntry.guardian || "-"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">WhatsApp</p>
                  <p className="font-semibold font-mono">
                    {selectedEntry.whatsapp || "-"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Interested</p>
                  <p className="font-semibold">
                    {selectedEntry.interested || "-"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Status</p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${getStatusColor(selectedEntry.status)}`}
                  >
                    {getStatusIcon(selectedEntry.status)}
                    {selectedEntry.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Next Follow-up</p>
                  <p className="font-semibold">
                    {formatDate(selectedEntry.nextFollowUp)}
                  </p>
                </div>

                {selectedEntry.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                    <p className="text-[10px] text-gray-400">Notes</p>
                    <p className="text-gray-700 mt-1">{selectedEntry.notes}</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Source</p>
                  <p className="text-xs font-semibold">
                    {selectedEntry.isStudent ? "Admission Form" : "CRM Manual"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Entered By / On</p>
                  <p className="text-xs">
                    {selectedEntry.enteredBy} •{" "}
                    {formatDate(selectedEntry.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <a
                  href={`https://wa.me/${(selectedEntry.whatsapp || "").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-semibold text-sm text-center flex items-center justify-center gap-1"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedEntry);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-1" />
                  {selectedEntry.isStudent ? "Manage" : "Edit"}
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg font-semibold text-sm"
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

export default Data_enty;
