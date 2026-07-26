// src/Page/Admin/Report.jsx
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
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaFileAlt,
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
  FaClipboardList,
  FaCalendarCheck,
  FaIdCard,
  FaUsersCog,
  FaUserTimes,
  FaDollarSign,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaCertificate,
  FaDatabase,
  FaUserCog,
  FaListAlt,
  FaClock as FaClockIcon,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaDownload,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaHome,
  FaCog,
  FaBars,
  FaLayerGroup,
  FaSchool,
  FaBookOpen,
  FaRoute,
  FaCalendarPlus,
  FaBuilding,
  FaUniversity,
  FaGraduationCap,
  FaGlobe,
  FaVideo,
  FaLink,
  FaWallet,
  FaCreditCard,
  FaHistory,
  FaFileInvoice as FaFileInvoiceIcon,
  FaReceipt,
  FaEnvelope,
  FaPaperPlane,
  FaExclamationTriangle,
  FaInfoCircle,
  FaThumbsUp,
  FaStar,
  FaComment,
  FaUserTag,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTransgender,
  FaSave,
  FaUndo,
  FaUpload,
  FaCamera,
  FaUsersCog as FaUsersCogIcon,
  FaUserCheck,
  FaUserMinus,
  FaToggleOn,
  FaToggleOff,
  FaUserEdit,
  FaUserCircle,
  FaAddressCard,
  FaChalkboard,
  FaCalendarDay,
  FaSchool as FaSchoolIcon,
  FaUserTie,
  FaBookReader,
  FaStopwatch,
  FaClipboardCheck,
  FaExchangeAlt,
  FaCheckDouble,
  FaBan,
  FaCheck,
  FaTimes,
  FaQuestion,
  FaCalendarWeek,
  FaChartBar,
  FaFileDownload,
  FaFilePdf,
  FaFileExcel,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGlobe as FaGlobeIcon,
  FaEnvelope as FaEnvelopeIcon,
  FaPhone as FaPhoneIcon,
  FaUsers as FaUsersIcon,
  FaCalendar,
  FaClock as FaClockIcon2,
  FaHourglassHalf,
  FaCheckCircle as FaCheckCircleIcon,
  FaTimesCircle as FaTimesCircleIcon,
  FaBookmark,
  FaListUl,
  FaChevronRight,
  FaChevronDown,
  FaFolderOpen,
  FaFile,
  FaFilePdf as FaFilePdfIcon,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFileCode,
  FaFileExcel as FaFileExcelIcon,
  FaFileAlt as FaFileAltIcon,
  FaFolder,
  FaCopy,
  FaCut,
  FaPaste,
  FaShare,
  FaStar as FaStarIcon,
  FaRegStar,
  FaRegFileAlt,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFilePowerpoint,
  FaRegFileImage,
  FaRegFileVideo,
  FaRegFileArchive,
  FaEraser,
  FaTrashAlt,
  FaCalendarTimes,
  FaRedoAlt,
  FaUndoAlt,
  FaSync,
  FaExclamationCircle,
  FaInfoCircle as FaInfoCircleIcon,
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaDonate,
  FaFileInvoice as FaFileInvoiceIcon2,
  FaFileSignature,
  FaReceipt as FaReceiptIcon,
  FaCreditCard as FaCreditCardIcon,
  FaPrint as FaPrintIcon,
  FaShareAlt,
  FaChartPie,
  FaChartArea,
  FaPlus,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Report = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("finance");
  const [activeSubMenu, setActiveSubMenu] = useState("report");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Report type
  const [reportType, setReportType] = useState("financial");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Form data for add report
  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "financial",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    class: "All",
    status: "All",
    format: "PDF",
    description: "",
  });

  // Custom reports list
  const [customReports, setCustomReports] = useState([
    {
      id: 1,
      reportName: "Monthly Financial Summary - July 2026",
      reportType: "financial",
      month: 6,
      year: 2026,
      class: "All",
      status: "All",
      format: "PDF",
      description: "Complete financial summary for July 2026",
      generatedDate: "2026-07-31",
      generatedBy: "Admin",
    },
    {
      id: 2,
      reportName: "Class 8 Performance Report",
      reportType: "performance",
      month: 6,
      year: 2026,
      class: "Class 8",
      status: "All",
      format: "Excel",
      description: "Performance analysis for Class 8 students",
      generatedDate: "2026-07-28",
      generatedBy: "Admin",
    },
  ]);

  // Sample data for reports
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
  const classes = [
    "All",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const statuses = ["All", "Paid", "Partial", "Unpaid"];
  const reportTypes = ["financial", "performance", "teacher"];
  const formats = ["PDF", "Excel", "CSV"];

  // Financial Report Data
  const [financialData] = useState({
    totalRevenue: 125000,
    totalExpenses: 45000,
    netProfit: 80000,
    collectionRate: 85,
    monthlyData: [
      { month: "January", collected: 28000, due: 5000 },
      { month: "February", collected: 25000, due: 4000 },
      { month: "March", collected: 30000, due: 3000 },
      { month: "April", collected: 22000, due: 6000 },
      { month: "May", collected: 20000, due: 7000 },
      { month: "June", collected: 18000, due: 8000 },
    ],
    classWiseCollection: [
      { class: "Class 6", collected: 15000, total: 20000 },
      { class: "Class 7", collected: 18000, total: 22000 },
      { class: "Class 8", collected: 25000, total: 30000 },
      { class: "Class 9", collected: 28000, total: 35000 },
      { class: "Class 10", collected: 22000, total: 28000 },
    ],
    paymentMethods: [
      { method: "Cash", amount: 45000 },
      { method: "Bank Transfer", amount: 35000 },
      { method: "bKash", amount: 25000 },
      { method: "Nagad", amount: 20000 },
    ],
  });

  // Student Performance Report Data
  const [performanceData] = useState({
    totalStudents: 150,
    averageAttendance: 78,
    averageGrade: 82,
    passRate: 92,
    classPerformance: [
      { class: "Class 6", average: 85, students: 25 },
      { class: "Class 7", average: 80, students: 30 },
      { class: "Class 8", average: 78, students: 28 },
      { class: "Class 9", average: 82, students: 35 },
      { class: "Class 10", average: 88, students: 32 },
    ],
    subjectPerformance: [
      { subject: "Tajweed", average: 85 },
      { subject: "Tafsir", average: 82 },
      { subject: "Hadith", average: 80 },
      { subject: "Fiqh", average: 78 },
      { subject: "Aqeedah", average: 84 },
    ],
    attendanceData: [
      { month: "January", attendance: 85 },
      { month: "February", attendance: 82 },
      { month: "March", attendance: 80 },
      { month: "April", attendance: 75 },
      { month: "May", attendance: 72 },
      { month: "June", attendance: 70 },
    ],
  });

  // Teacher Performance Report Data
  const [teacherPerformanceData] = useState({
    totalTeachers: 6,
    averageRating: 4.6,
    totalClasses: 45,
    teacherRatings: [
      { name: "Dr. Muhammad Abdullah", rating: 4.8, classes: 8 },
      { name: "Ustadh Ahmad Ali", rating: 4.9, classes: 7 },
      { name: "Ustadha Fatima Rahman", rating: 4.7, classes: 6 },
      { name: "Dr. Omar Farooq", rating: 4.6, classes: 9 },
      { name: "Ustadh Yusuf Khan", rating: 4.5, classes: 5 },
      { name: "Ustadh Ibrahim Malik", rating: 4.3, classes: 4 },
    ],
  });

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

  // Save custom reports to localStorage
  useEffect(() => {
    localStorage.setItem("customReports", JSON.stringify(customReports));
  }, [customReports]);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubMenu = (menu) => {
    if (activeSubMenu === menu) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(menu);
    }
  };

  // Sidebar Menu Items
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
          id: "payment-overview",
          path: "/admin-dashboard/payment-overview",
          label: "Payment Overview",
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

  // Get report type label
  const getReportTypeLabel = (type) => {
    switch (type) {
      case "financial":
        return "Financial Report";
      case "performance":
        return "Student Performance";
      case "teacher":
        return "Teacher Performance";
      default:
        return type;
    }
  };

  // Get report type color
  const getReportTypeColor = (type) => {
    switch (type) {
      case "financial":
        return "bg-blue-100 text-blue-700";
      case "performance":
        return "bg-green-100 text-green-700";
      case "teacher":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Download report
  const downloadReport = (type) => {
    Swal.fire({
      icon: "success",
      title: "Report Downloading",
      text: `${type} report is being downloaded as PDF.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: "Report is being exported to Excel format.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Print report
  const printReport = () => {
    window.print();
  };

  // Get report title
  const getReportTitle = () => {
    switch (reportType) {
      case "financial":
        return "Financial Report";
      case "performance":
        return "Student Performance Report";
      case "teacher":
        return "Teacher Performance Report";
      default:
        return "Report";
    }
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      reportName: "",
      reportType: "financial",
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      class: "All",
      status: "All",
      format: "PDF",
      description: "",
    });
    setShowAddModal(true);
  };

  // Handle add report
  const handleAddReport = (e) => {
    e.preventDefault();

    if (!formData.reportName || !formData.reportType) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newReport = {
      id: Date.now(),
      reportName: formData.reportName,
      reportType: formData.reportType,
      month: formData.month,
      year: formData.year,
      class: formData.class || "All",
      status: formData.status || "All",
      format: formData.format || "PDF",
      description: formData.description || "",
      generatedDate: new Date().toISOString().split("T")[0],
      generatedBy: adminInfo.name,
    };

    setCustomReports([...customReports, newReport]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Report Added!",
      text: `${formData.reportName} has been added successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete report
  const handleDeleteReport = (id) => {
    Swal.fire({
      title: "Delete Report?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomReports(customReports.filter((r) => r.id !== id));
        Swal.fire("Deleted!", "Report has been deleted.", "success");
      }
    });
  };

  // Render financial report
  const renderFinancialReport = () => {
    return (
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(financialData.totalRevenue)}
            </p>
            <p className="text-[10px] text-gray-500">Total Revenue</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(financialData.totalExpenses)}
            </p>
            <p className="text-[10px] text-gray-500">Total Expenses</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(financialData.netProfit)}
            </p>
            <p className="text-[10px] text-gray-500">Net Profit</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-purple-600">
              {financialData.collectionRate}%
            </p>
            <p className="text-[10px] text-gray-500">Collection Rate</p>
          </div>
        </div>

        {/* Monthly Collection Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Monthly Collection Overview
          </h4>
          <div className="space-y-3">
            {financialData.monthlyData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="text-gray-600">
                    Collected: {formatCurrency(item.collected)} | Due:{" "}
                    {formatCurrency(item.due)}
                  </span>
                </div>
                <div className="flex gap-1 h-4">
                  <div
                    className="bg-green-500 rounded-l-full h-full"
                    style={{
                      width: `${(item.collected / (item.collected + item.due)) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-500 rounded-r-full h-full"
                    style={{
                      width: `${(item.due / (item.collected + item.due)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Wise Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Class Wise Collection
            </h4>
            <div className="space-y-2">
              {financialData.classWiseCollection.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.class}</span>
                    <span className="text-gray-600">
                      {formatCurrency(item.collected)} /{" "}
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{
                        width: `${(item.collected / item.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Payment Methods
            </h4>
            <div className="space-y-2">
              {financialData.paymentMethods.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.method}</span>
                    <span className="text-gray-600">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{
                        width: `${(item.amount / financialData.totalRevenue) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render performance report
  const renderPerformanceReport = () => {
    return (
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-blue-600">
              {performanceData.totalStudents}
            </p>
            <p className="text-[10px] text-gray-500">Total Students</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {performanceData.averageAttendance}%
            </p>
            <p className="text-[10px] text-gray-500">Avg Attendance</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-yellow-600">
              {performanceData.averageGrade}%
            </p>
            <p className="text-[10px] text-gray-500">Avg Grade</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-purple-600">
              {performanceData.passRate}%
            </p>
            <p className="text-[10px] text-gray-500">Pass Rate</p>
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Class Performance
          </h4>
          <div className="space-y-3">
            {performanceData.classPerformance.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">
                    {item.class} ({item.students} students)
                  </span>
                  <span className="text-gray-600">{item.average}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.average >= 85
                        ? "bg-green-500"
                        : item.average >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${item.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Subject Performance
            </h4>
            <div className="space-y-2">
              {performanceData.subjectPerformance.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.subject}</span>
                    <span className="text-gray-600">{item.average}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.average >= 85
                          ? "bg-green-500"
                          : item.average >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${item.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Attendance Trend
            </h4>
            <div className="space-y-2">
              {performanceData.attendanceData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.month}</span>
                    <span className="text-gray-600">{item.attendance}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.attendance >= 80
                          ? "bg-green-500"
                          : item.attendance >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${item.attendance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render teacher performance report
  const renderTeacherReport = () => {
    return (
      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-blue-600">
              {teacherPerformanceData.totalTeachers}
            </p>
            <p className="text-[10px] text-gray-500">Total Teachers</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-yellow-600">
              {teacherPerformanceData.averageRating}
            </p>
            <p className="text-[10px] text-gray-500">Avg Rating</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {teacherPerformanceData.totalClasses}
            </p>
            <p className="text-[10px] text-gray-500">Total Classes</p>
          </div>
        </div>

        {/* Teacher Ratings */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Teacher Ratings & Classes
          </h4>
          <div className="space-y-3">
            {teacherPerformanceData.teacherRatings.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.classes} classes
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {item.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Reports</h1>
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
            overflow-hidden
            flex-shrink-0
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

          <nav className="p-3 space-y-1 overflow-hidden h-[calc(100vh-180px)]">
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
                      className={`
                        w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`transition-transform ${activeSubMenu === item.id ? "rotate-180" : ""}`}
                      >
                        <FaArrowRight size={12} />
                      </span>
                    </button>
                    {activeSubMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            onClick={() => {
                              setActiveSubMenu(sub.id);
                              setIsSidebarOpen(false);
                            }}
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
                )}
              </div>
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
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaChartLine className="text-blue-600" /> Reports & Analytics
              </h1>
              <p className="text-xs text-gray-500">
                Generate and view detailed reports
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Report
              </button>
              <button
                onClick={() => downloadReport(getReportTitle())}
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
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Report Type Selector */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setReportType("financial")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  reportType === "financial"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaMoneyBillWave className="inline mr-1" /> Financial Report
              </button>
              <button
                onClick={() => setReportType("performance")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  reportType === "performance"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaUserGraduate className="inline mr-1" /> Student Performance
              </button>
              <button
                onClick={() => setReportType("teacher")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  reportType === "teacher"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaChalkboardTeacher className="inline mr-1" /> Teacher
                Performance
              </button>
            </div>
          </div>

          {/* Custom Reports List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-3">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h4 className="font-semibold text-gray-700 text-sm">
                Custom Reports
              </h4>
              <span className="text-xs text-gray-500">
                {customReports.length} reports
              </span>
            </div>
            <div className="overflow-x-auto max-h-40 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Report Name
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Month/Year
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Format
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customReports.length > 0 ? (
                    customReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800 truncate max-w-[150px]">
                            {report.reportName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {formatDate(report.generatedDate)}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getReportTypeColor(report.reportType)}`}
                          >
                            {getReportTypeLabel(report.reportType)}
                          </span>
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {months[report.month]} {report.year}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                            {report.format}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                Swal.fire({
                                  icon: "info",
                                  title: "Report Details",
                                  html: `
                                    <div style="text-align: left; font-size: 13px;">
                                      <p><strong>Name:</strong> ${report.reportName}</p>
                                      <p><strong>Type:</strong> ${getReportTypeLabel(report.reportType)}</p>
                                      <p><strong>Month:</strong> ${months[report.month]} ${report.year}</p>
                                      <p><strong>Class:</strong> ${report.class}</p>
                                      <p><strong>Status:</strong> ${report.status}</p>
                                      <p><strong>Format:</strong> ${report.format}</p>
                                      <p><strong>Generated By:</strong> ${report.generatedBy}</p>
                                      <p><strong>Generated Date:</strong> ${formatDate(report.generatedDate)}</p>
                                      ${report.description ? `<p><strong>Description:</strong> ${report.description}</p>` : ""}
                                    </div>
                                  `,
                                  confirmButtonColor: "#3b82f6",
                                  confirmButtonText: "Close",
                                });
                              }}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-all"
                              title="View Details"
                            >
                              <FaEye size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
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
                        colSpan="5"
                        className="px-3 py-4 text-center text-gray-400 text-sm"
                      >
                        No custom reports found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400 text-xs" />
                <span className="text-xs text-gray-600 font-medium">
                  Filters:
                </span>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-auto max-h-[calc(100vh-420px)]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {getReportTitle()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {months[selectedMonth]} {selectedYear} | {selectedClass} |{" "}
              {selectedStatus}
            </p>

            {reportType === "financial" && renderFinancialReport()}
            {reportType === "performance" && renderPerformanceReport()}
            {reportType === "teacher" && renderTeacherReport()}
          </div>
        </main>
      </div>

      {/* Add Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Custom Report
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddReport} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.reportName}
                  onChange={(e) =>
                    setFormData({ ...formData, reportName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type *
                </label>
                <select
                  required
                  value={formData.reportType}
                  onChange={(e) =>
                    setFormData({ ...formData, reportType: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {getReportTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        month: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={formData.format}
                  onChange={(e) =>
                    setFormData({ ...formData, format: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {formats.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
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
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report description..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Report
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
    </div>
  );
};

export default Report;
