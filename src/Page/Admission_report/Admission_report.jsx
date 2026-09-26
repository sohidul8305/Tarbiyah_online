// src/Page/Admin/Admission_report.jsx
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
  FaFilter,
  FaSave,
  FaPlus,
  FaArrowRight,
  FaInfoCircle,
  FaUserPlus,
  FaHourglassHalf,
  FaCheckCircle as FaCheckCircleIcon,
  FaTimesCircle as FaTimesCircleIcon,
  FaFilePdf as FaFilePdfIcon,
  FaFileExcel as FaFileExcelIcon,
  FaPrint as FaPrintIcon,
  FaChartLine as FaChartLineIcon,
  FaSpinner,
  FaBuilding,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5010";

const Admission_report = () => {
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

  // Filters
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Department filter
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [departments, setDepartments] = useState([]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    subject: "",
    applicationDate: "",
    status: "Pending",
    parentName: "",
    parentPhone: "",
    email: "",
    address: "",
    previousSchool: "",
    notes: "",
  });

  // ✅ Dynamic states
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(true);
  const [saving, setSaving] = useState(false);

  const [admissionRecords, setAdmissionRecords] = useState([]);
  const [reportData, setReportData] = useState({
    stats: {
      totalApplications: 0,
      approvedApplications: 0,
      pendingApplications: 0,
      rejectedApplications: 0,
      totalStudents: 0,
      newStudents: 0,
      conversionRate: 0,
    },
    monthlyData: [],
    classWiseData: [],
    genderData: [],
    subjectWiseData: [],
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
  const statuses = ["Pending", "Approved", "Rejected"];
  const months = [
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

  // ============================================================
  // ✅ Sidebar Menu Items
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

  // ✅ URL থেকে active auto-detect
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
  // ✅ Fetch departments list
  // ============================================================
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/departments/all`);
      const data = await res.json();
      if (data.success) {
        setDepartments(data.departments || []);
        console.log("✅ [Departments] Loaded:", data.departments?.length);
      }
    } catch (err) {
      console.error("❌ Departments fetch error:", err);
    }
  };

  // ============================================================
  // ✅ Fetch admission data from backend (with department filter)
  // ============================================================
  const fetchAdmissionData = async () => {
    try {
      setIsLoading(true);
      const deptParam =
        selectedDepartment && selectedDepartment !== "All"
          ? `?department=${encodeURIComponent(selectedDepartment)}`
          : "";
      const res = await fetch(
        `${API_BASE}/api/admission-report/all${deptParam}`,
      );
      const data = await res.json();

      if (data.success) {
        console.log(
          "✅ [Admission] Loaded:",
          data.records?.length,
          "records | Dept:",
          selectedDepartment,
        );
        setAdmissionRecords(data.records || []);
        setReportData({
          stats: data.stats || {},
          monthlyData: data.monthlyData || [],
          classWiseData: data.classWiseData || [],
          genderData: data.genderData || [],
          subjectWiseData: data.subjectWiseData || [],
        });
        setBackendConnected(true);
      } else {
        console.error("❌ Failed:", data.message);
        setBackendConnected(false);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Load departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ Re-fetch when department changes
  useEffect(() => {
    fetchAdmissionData();
  }, [selectedDepartment]);

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
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircleIcon className="text-green-500" />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Rejected":
        return <FaTimesCircleIcon className="text-red-500" />;
      default:
        return null;
    }
  };

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
      text: "Admission report is being downloaded as PDF.",
      timer: 1500,
      showConfirmButton: false,
    });

  const exportToExcel = () =>
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: "Admission report is being exported to Excel format.",
      timer: 1500,
      showConfirmButton: false,
    });

  const printReport = () => window.print();

  const getFilteredMonthlyData = () => {
    const md = reportData.monthlyData || [];
    if (selectedMonth === "All") return md;
    return md.filter((item) => item.month === selectedMonth);
  };

  const generateStudentId = () =>
    `STU${String(admissionRecords.length + 1).padStart(3, "0")}`;

  const openAddModal = () => {
    setFormData({
      studentName: "",
      studentId: generateStudentId(),
      class: "",
      subject: "",
      applicationDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      parentName: "",
      parentPhone: "",
      email: "",
      address: "",
      previousSchool: "",
      notes: "",
    });
    setShowAddModal(true);
  };

  const openEditModal = (record) => {
    setSelectedAdmission(record);
    setFormData({
      studentName: record.studentName,
      studentId: record.studentId,
      class: record.class,
      subject: record.subject,
      applicationDate: record.applicationDate,
      status: record.status,
      parentName: record.parentName || "",
      parentPhone: record.parentPhone || "",
      email: record.email || "",
      address: record.address || "",
      previousSchool: record.previousSchool || "",
      notes: record.notes || "",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (record) => {
    setSelectedAdmission(record);
    setShowDetailsModal(true);
  };

  // ✅ ADD
  const handleAddAdmission = async (e) => {
    e.preventDefault();
    if (
      !formData.studentName ||
      !formData.class ||
      !formData.subject ||
      !formData.applicationDate
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
      const res = await fetch(`${API_BASE}/api/admin-students/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.studentName,
          phone: formData.parentPhone || "0000000000",
          email: formData.email || "",
          course: formData.subject,
          admissionDate: formData.applicationDate,
          status: formData.status === "Approved" ? "Active" : "Pending",
          guardianName: formData.parentName,
          guardianPhone: formData.parentPhone,
          presentAddress: formData.address,
          previousSchool: formData.previousSchool,
          comments: formData.notes,
          studentId: formData.studentId,
        }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchAdmissionData();
        await fetchDepartments();
        setShowAddModal(false);
        Swal.fire({
          icon: "success",
          title: "Admission Added!",
          text: `${formData.studentName} has been added.`,
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
  const handleEditAdmission = async (e) => {
    e.preventDefault();
    if (
      !formData.studentName ||
      !formData.class ||
      !formData.subject ||
      !formData.applicationDate
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
        `${API_BASE}/api/admin-students/update/${selectedAdmission._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.studentName,
            course: formData.subject,
            class: formData.class,
            admissionDate: formData.applicationDate,
            status:
              formData.status === "Approved"
                ? "Active"
                : formData.status === "Rejected"
                  ? "Rejected"
                  : "Pending",
            guardianName: formData.parentName,
            guardianPhone: formData.parentPhone,
            email: formData.email,
            presentAddress: formData.address,
            previousSchool: formData.previousSchool,
            comments: formData.notes,
          }),
        },
      );
      const data = await res.json();

      if (data.success) {
        await fetchAdmissionData();
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
  const handleDeleteAdmission = async (id) => {
    const result = await Swal.fire({
      title: "Delete Admission Record?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin-students/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        await fetchAdmissionData();
        Swal.fire("Deleted!", "Admission record has been deleted.", "success");
      } else {
        Swal.fire("Failed!", data.message || "Error", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // ✅ APPROVE
  const handleApproveAdmission = async (id) => {
    const result = await Swal.fire({
      title: "Approve Admission?",
      text: "This will approve the student's admission.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/admission-report/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Active" }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchAdmissionData();
        Swal.fire({
          icon: "success",
          title: "Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed!", data.message || "Error", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // ✅ REJECT
  const handleRejectAdmission = async (id) => {
    const result = await Swal.fire({
      title: "Reject Admission?",
      text: "This will reject the admission request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/admission-report/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected" }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchAdmissionData();
        Swal.fire({
          icon: "success",
          title: "Rejected",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed!", data.message || "Error", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // ✅ Filtered records (client-side search/filter on top of backend filter)
  const filteredRecords = admissionRecords.filter((r) => {
    const matchStatus = selectedStatus === "All" || r.status === selectedStatus;
    const matchClass = selectedClass === "All" || r.class === selectedClass;
    const matchSearch =
      !searchTerm ||
      (r.studentName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.studentId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.course || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchClass && matchSearch;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Admission Report</h1>
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
                <FaChartLineIcon className="text-blue-600" /> Admission Report
              </h1>
              <p className="text-xs text-gray-500">
                Comprehensive admission statistics and analytics
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Admission
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
                onClick={printReport}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPrintIcon size={12} /> Print
              </button>
              <button
                onClick={fetchAdmissionData}
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

          {/* ✅ Department Filter Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-3 mb-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-teal-600 text-lg" />
                <span className="text-xs font-bold text-teal-800">
                  Department / Course Filter:
                </span>
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1.5 text-xs border-2 border-teal-400 rounded-lg bg-white font-semibold text-teal-700 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">
                  🏫 All Departments ({admissionRecords.length} shown)
                </option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    📚 {dept}
                  </option>
                ))}
              </select>
              {selectedDepartment !== "All" && (
                <button
                  onClick={() => setSelectedDepartment("All")}
                  className="text-xs text-teal-700 hover:text-teal-900 underline font-semibold"
                >
                  ✕ Clear Filter
                </button>
              )}
              <span className="text-[10px] text-teal-600 ml-auto">
                Showing {admissionRecords.length} student
                {admissionRecords.length !== 1 ? "s" : ""}
                {selectedDepartment !== "All"
                  ? ` in "${selectedDepartment}"`
                  : " in all departments"}
              </span>
            </div>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center">
              <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
              <p className="text-sm text-gray-500 mt-3">
                Loading admission data...
              </p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {reportData.stats.totalApplications || 0}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Total Applications
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
                  <p className="text-lg font-bold text-green-600">
                    {reportData.stats.approvedApplications || 0}
                  </p>
                  <p className="text-[10px] text-gray-500">Approved</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
                  <p className="text-lg font-bold text-yellow-600">
                    {reportData.stats.pendingApplications || 0}
                  </p>
                  <p className="text-[10px] text-gray-500">Pending</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
                  <p className="text-lg font-bold text-purple-600">
                    {reportData.stats.conversionRate || 0}%
                  </p>
                  <p className="text-[10px] text-gray-500">Conversion Rate</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-400 text-xs" />
                    <span className="text-xs text-gray-600 font-medium">
                      Filters:
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-lg w-40"
                  />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
                  >
                    <option value="All">All Months</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
                  >
                    <option value="All">All Classes</option>
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
                  >
                    <option value="All">All Status</option>
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monthly Chart */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-3">
                <h4 className="font-semibold text-gray-700 text-sm mb-3">
                  Monthly Admission Trends
                </h4>
                {getFilteredMonthlyData().length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No monthly data available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {getFilteredMonthlyData().map((item, index) => {
                      const maxVal = Math.max(
                        ...getFilteredMonthlyData().map((d) => d.applications),
                        1,
                      );
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">
                              {item.month} {item.year}
                            </span>
                            <span className="text-gray-600">
                              Apps: {item.applications} | Approved:{" "}
                              {item.approved} | Rejected: {item.rejected}
                            </span>
                          </div>
                          <div className="flex gap-1 h-5">
                            <div
                              className="bg-blue-500 rounded-l-full h-full"
                              style={{
                                width: `${(item.applications / maxVal) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="bg-green-500 h-full"
                              style={{
                                width: `${(item.approved / maxVal) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="bg-red-500 rounded-r-full h-full"
                              style={{
                                width: `${(item.rejected / maxVal) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-500 rounded"></span>{" "}
                    Applications
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-green-500 rounded"></span>{" "}
                    Approved
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-500 rounded"></span>{" "}
                    Rejected
                  </span>
                </div>
              </div>

              {/* Class Wise and Gender Wise */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-3">
                    Course Wise Admission
                  </h4>
                  {reportData.classWiseData.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No class data available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {reportData.classWiseData.map((item, index) => {
                        const maxVal = Math.max(
                          ...reportData.classWiseData.map(
                            (d) => d.applications,
                          ),
                          1,
                        );
                        return (
                          <div key={index}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 truncate max-w-[150px]">
                                {item.class}
                              </span>
                              <span className="text-gray-600">
                                {item.enrolled}/{item.applications} enrolled
                              </span>
                            </div>
                            <div className="flex gap-1 h-3">
                              <div
                                className="bg-blue-500 rounded-l-full h-full"
                                style={{
                                  width: `${
                                    (item.applications / maxVal) * 100
                                  }%`,
                                }}
                              ></div>
                              <div
                                className="bg-green-500 h-full"
                                style={{
                                  width: `${(item.approved / maxVal) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-3">
                    Gender Distribution
                  </h4>
                  <div className="space-y-2">
                    {reportData.genderData.map((item, index) => {
                      const totalGender = reportData.genderData.reduce(
                        (s, g) => s + g.count,
                        0,
                      );
                      const percent =
                        totalGender > 0
                          ? Math.round((item.count / totalGender) * 100)
                          : 0;
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{item.gender}</span>
                            <span className="text-gray-600">
                              {item.count} ({percent}%)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.gender === "Male"
                                  ? "bg-blue-500"
                                  : item.gender === "Female"
                                    ? "bg-pink-500"
                                    : "bg-purple-500"
                              }`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Subject Wise */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-3">
                <h4 className="font-semibold text-gray-700 text-sm mb-3">
                  Course / Subject Wise Enrollment
                </h4>
                {reportData.subjectWiseData.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No subject data available
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {reportData.subjectWiseData.map((item, index) => {
                      const maxVal = Math.max(
                        ...reportData.subjectWiseData.map((d) => d.count),
                        1,
                      );
                      return (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 text-center"
                        >
                          <p className="text-lg font-bold text-blue-600">
                            {item.count}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {item.subject}
                          </p>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div
                              className="bg-blue-500 h-full rounded-full"
                              style={{
                                width: `${(item.count / maxVal) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Admission Records Table */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-700 text-sm">
                    Admission Records ({filteredRecords.length})
                    {selectedDepartment !== "All" && (
                      <span className="ml-2 text-[10px] font-normal text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                        Filtered: {selectedDepartment}
                      </span>
                    )}
                  </h4>
                </div>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
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
                          Course
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Status
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
                            key={record._id}
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
                            <td className="px-3 py-2 hidden md:table-cell text-gray-600 truncate max-w-[160px]">
                              {record.course || record.class}
                            </td>
                            <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                              {formatDate(record.applicationDate)}
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
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openDetailsModal(record)}
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                  title="View Details"
                                >
                                  <FaEye size={12} />
                                </button>
                                {record.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleApproveAdmission(record._id)
                                      }
                                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                      title="Approve"
                                    >
                                      <FaCheckCircleIcon size={12} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRejectAdmission(record._id)
                                      }
                                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                      title="Reject"
                                    >
                                      <FaTimesCircleIcon size={12} />
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => openEditModal(record)}
                                  className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                                  title="Edit"
                                >
                                  <FaEdit size={12} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteAdmission(record._id)
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
                            colSpan="6"
                            className="px-3 py-8 text-center text-gray-500"
                          >
                            <FaUserPlus className="text-4xl text-gray-300 mx-auto mb-2" />
                            <p>No admission records found</p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {selectedDepartment !== "All"
                                ? `No students in "${selectedDepartment}"`
                                : "Try adjusting your filters"}
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Admission Record
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAdmission} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.applicationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicationDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Phone
                  </label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPhone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous School
                </label>
                <input
                  type="text"
                  value={formData.previousSchool}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      previousSchool: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Add Admission
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
      {showEditModal && selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Admission
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditAdmission} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.applicationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicationDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Phone
                  </label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPhone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous School
                </label>
                <input
                  type="text"
                  value={formData.previousSchool}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      previousSchool: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
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
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Admission Details
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
                  {selectedAdmission.studentName?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedAdmission.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedAdmission.status,
                      )}`}
                    >
                      {getStatusIcon(selectedAdmission.status)}
                      {selectedAdmission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedAdmission.studentId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedAdmission.class}</span>
                    <span>📖 {selectedAdmission.course}</span>
                    <span>
                      📅 {formatDate(selectedAdmission.applicationDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Parent's Name</p>
                  <p className="text-sm font-semibold">
                    {selectedAdmission.parentName || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Parent's Phone</p>
                  <p className="text-sm font-semibold">
                    {selectedAdmission.parentPhone || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Email</p>
                  <p className="text-sm font-semibold">
                    {selectedAdmission.email || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Gender</p>
                  <p className="text-sm font-semibold">
                    {selectedAdmission.gender || "N/A"}
                  </p>
                </div>
                {selectedAdmission.address && (
                  <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                    <p className="text-[10px] text-gray-400">Address</p>
                    <p className="text-sm font-semibold">
                      {selectedAdmission.address}
                    </p>
                  </div>
                )}
                {selectedAdmission.previousSchool && (
                  <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                    <p className="text-[10px] text-gray-400">Previous School</p>
                    <p className="text-sm font-semibold">
                      {selectedAdmission.previousSchool}
                    </p>
                  </div>
                )}
                {selectedAdmission.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                    <p className="text-[10px] text-gray-400">Notes</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedAdmission.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedAdmission.status === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleApproveAdmission(selectedAdmission._id);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      <FaCheckCircleIcon className="inline mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleRejectAdmission(selectedAdmission._id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      <FaTimesCircleIcon className="inline mr-2" /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedAdmission);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
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

export default Admission_report;
