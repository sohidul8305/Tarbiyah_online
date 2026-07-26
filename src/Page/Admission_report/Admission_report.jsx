// src/Page/Admin/Admission_report.jsx
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
  FaTasks,
  FaCheckDouble as FaCheckDoubleIcon,
  FaPen,
  FaPencilAlt,
  FaAward,
  FaMedal,
  FaTrophy,
  FaPlus,
  FaCertificate as FaCertificateIcon,
  FaTimes as FaTimesIcon,
  FaUserCheck as FaUserCheckIcon,
  FaUserMinus as FaUserMinusIcon,
  FaChartLine as FaChartLineIcon,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Admission_report = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("report-analytics");
  const [activeSubMenu, setActiveSubMenu] = useState("admission-report");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Filters
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  // Form data
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

  // Report data
  const [admissionData, setAdmissionData] = useState({
    totalApplications: 156,
    approvedApplications: 98,
    pendingApplications: 32,
    rejectedApplications: 26,
    totalStudents: 142,
    newStudents: 35,
    conversionRate: 63,
  });

  // Admission records for table
  const [admissionRecords, setAdmissionRecords] = useState([
    {
      id: 1,
      studentName: "Ahmed Hasan",
      studentId: "STU001",
      class: "Class 8",
      subject: "Tajweed",
      applicationDate: "2026-07-15",
      status: "Approved",
      parentName: "Abdul Hasan",
      parentPhone: "+880 1712 345678",
      email: "ahmed@example.com",
      address: "Mohammadpur, Dhaka",
      previousSchool: "Mohammadpur High School",
      notes: "Excellent academic record",
    },
    {
      id: 2,
      studentName: "Fatima Begum",
      studentId: "STU002",
      class: "Class 9",
      subject: "Tafsir",
      applicationDate: "2026-07-12",
      status: "Approved",
      parentName: "Mohammad Ali",
      parentPhone: "+880 1723 456789",
      email: "fatima@example.com",
      address: "Mirpur, Dhaka",
      previousSchool: "Mirpur Girls School",
      notes: "",
    },
    {
      id: 3,
      studentName: "Mohammad Ali",
      studentId: "STU003",
      class: "Class 10",
      subject: "Hadith",
      applicationDate: "2026-07-20",
      status: "Pending",
      parentName: "Karim Ali",
      parentPhone: "+880 1734 567890",
      email: "ali@example.com",
      address: "Uttara, Dhaka",
      previousSchool: "Uttara High School",
      notes: "Waiting for documents",
    },
    {
      id: 4,
      studentName: "Aisha Rahman",
      studentId: "STU004",
      class: "Class 7",
      subject: "Fiqh",
      applicationDate: "2026-07-08",
      status: "Rejected",
      parentName: "Rahman Khan",
      parentPhone: "+880 1745 678901",
      email: "aisha@example.com",
      address: "Gulshan, Dhaka",
      previousSchool: "Gulshan Model School",
      notes: "Incomplete application",
    },
    {
      id: 5,
      studentName: "Rahim Uddin",
      studentId: "STU005",
      class: "Class 8",
      subject: "Tajweed",
      applicationDate: "2026-07-18",
      status: "Pending",
      parentName: "Abdur Rahim",
      parentPhone: "+880 1756 789012",
      email: "rahim@example.com",
      address: "Dhanmondi, Dhaka",
      previousSchool: "Dhanmondi School",
      notes: "",
    },
    {
      id: 6,
      studentName: "Sadia Afrin",
      studentId: "STU006",
      class: "Class 10",
      subject: "Hadith",
      applicationDate: "2026-07-22",
      status: "Approved",
      parentName: "Rafiqul Islam",
      parentPhone: "+880 1767 890123",
      email: "sadia@example.com",
      address: "Baridhara, Dhaka",
      previousSchool: "Baridhara School",
      notes: "Scholarship candidate",
    },
  ]);

  // Monthly admission data
  const monthlyData = [
    { month: "January", applications: 25, approved: 18, rejected: 7 },
    { month: "February", applications: 20, approved: 14, rejected: 6 },
    { month: "March", applications: 28, approved: 20, rejected: 8 },
    { month: "April", applications: 15, approved: 10, rejected: 5 },
    { month: "May", applications: 18, approved: 12, rejected: 6 },
    { month: "June", applications: 22, approved: 15, rejected: 7 },
    { month: "July", applications: 28, approved: 18, rejected: 10 },
    { month: "August", applications: 0, approved: 0, rejected: 0 },
    { month: "September", applications: 0, approved: 0, rejected: 0 },
    { month: "October", applications: 0, approved: 0, rejected: 0 },
    { month: "November", applications: 0, approved: 0, rejected: 0 },
    { month: "December", applications: 0, approved: 0, rejected: 0 },
  ];

  // Class wise admission data
  const classWiseData = [
    { class: "Class 6", applications: 25, approved: 18, enrolled: 15 },
    { class: "Class 7", applications: 30, approved: 22, enrolled: 19 },
    { class: "Class 8", applications: 28, approved: 20, enrolled: 17 },
    { class: "Class 9", applications: 35, approved: 25, enrolled: 22 },
    { class: "Class 10", applications: 38, approved: 28, enrolled: 25 },
  ];

  // Gender wise data
  const genderData = [
    { gender: "Male", count: 85 },
    { gender: "Female", count: 57 },
    { gender: "Other", count: 0 },
  ];

  // Subject wise data
  const subjectWiseData = [
    { subject: "Tajweed", count: 35 },
    { subject: "Tafsir", count: 28 },
    { subject: "Hadith", count: 22 },
    { subject: "Fiqh", count: 30 },
    { subject: "Aqeedah", count: 15 },
    { subject: "Arabic Grammar", count: 12 },
  ];

  // Available options
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

  // Save admission records to localStorage
  useEffect(() => {
    localStorage.setItem("admissionRecords", JSON.stringify(admissionRecords));
  }, [admissionRecords]);

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

  // Get status badge color
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

  // Get status icon
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
  const downloadReport = () => {
    Swal.fire({
      icon: "success",
      title: "Report Downloading",
      text: "Admission report is being downloaded as PDF.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: "Admission report is being exported to Excel format.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Print report
  const printReport = () => {
    window.print();
  };

  // Get filtered monthly data
  const getFilteredMonthlyData = () => {
    if (selectedMonth === "All") {
      return monthlyData;
    }
    return monthlyData.filter(
      (_, index) => index === months.indexOf(selectedMonth),
    );
  };

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

  // Generate student ID
  const generateStudentId = () => {
    const count = admissionRecords.length + 1;
    return `STU${String(count).padStart(3, "0")}`;
  };

  // Open add modal
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

  // Open edit modal
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

  // Open details modal
  const openDetailsModal = (record) => {
    setSelectedAdmission(record);
    setShowDetailsModal(true);
  };

  // Handle add admission
  const handleAddAdmission = (e) => {
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

    const newRecord = {
      id: Date.now(),
      studentName: formData.studentName,
      studentId: formData.studentId || generateStudentId(),
      class: formData.class,
      subject: formData.subject,
      applicationDate: formData.applicationDate,
      status: formData.status,
      parentName: formData.parentName || "",
      parentPhone: formData.parentPhone || "",
      email: formData.email || "",
      address: formData.address || "",
      previousSchool: formData.previousSchool || "",
      notes: formData.notes || "",
    };

    setAdmissionRecords([...admissionRecords, newRecord]);

    // Update admission data stats
    const totalApps = admissionData.totalApplications + 1;
    const pendingApps =
      formData.status === "Pending"
        ? admissionData.pendingApplications + 1
        : admissionData.pendingApplications;
    const approvedApps =
      formData.status === "Approved"
        ? admissionData.approvedApplications + 1
        : admissionData.approvedApplications;
    const rejectedApps =
      formData.status === "Rejected"
        ? admissionData.rejectedApplications + 1
        : admissionData.rejectedApplications;
    const conversionRate = Math.round((approvedApps / totalApps) * 100);

    setAdmissionData({
      ...admissionData,
      totalApplications: totalApps,
      pendingApplications: pendingApps,
      approvedApplications: approvedApps,
      rejectedApplications: rejectedApps,
      conversionRate: conversionRate || 0,
    });

    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Admission Added!",
      text: `${formData.studentName} has been added to admission records.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit admission
  const handleEditAdmission = (e) => {
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

    setAdmissionRecords(
      admissionRecords.map((record) =>
        record.id === selectedAdmission.id
          ? {
              ...record,
              studentName: formData.studentName,
              studentId: formData.studentId,
              class: formData.class,
              subject: formData.subject,
              applicationDate: formData.applicationDate,
              status: formData.status,
              parentName: formData.parentName || "",
              parentPhone: formData.parentPhone || "",
              email: formData.email || "",
              address: formData.address || "",
              previousSchool: formData.previousSchool || "",
              notes: formData.notes || "",
            }
          : record,
      ),
    );

    // Update stats based on status change
    const oldStatus = selectedAdmission.status;
    const newStatus = formData.status;
    if (oldStatus !== newStatus) {
      let pendingApps = admissionData.pendingApplications;
      let approvedApps = admissionData.approvedApplications;
      let rejectedApps = admissionData.rejectedApplications;

      if (oldStatus === "Pending") pendingApps--;
      else if (oldStatus === "Approved") approvedApps--;
      else if (oldStatus === "Rejected") rejectedApps--;

      if (newStatus === "Pending") pendingApps++;
      else if (newStatus === "Approved") approvedApps++;
      else if (newStatus === "Rejected") rejectedApps++;

      const conversionRate = Math.round(
        (approvedApps / admissionData.totalApplications) * 100,
      );
      setAdmissionData({
        ...admissionData,
        pendingApplications: pendingApps,
        approvedApplications: approvedApps,
        rejectedApplications: rejectedApps,
        conversionRate: conversionRate || 0,
      });
    }

    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Admission Updated!",
      text: "Admission record has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete admission
  const handleDeleteAdmission = (id) => {
    Swal.fire({
      title: "Delete Admission Record?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleted = admissionRecords.find((r) => r.id === id);
        setAdmissionRecords(admissionRecords.filter((r) => r.id !== id));

        // Update stats
        const totalApps = admissionData.totalApplications - 1;
        let pendingApps = admissionData.pendingApplications;
        let approvedApps = admissionData.approvedApplications;
        let rejectedApps = admissionData.rejectedApplications;

        if (deleted.status === "Pending") pendingApps--;
        else if (deleted.status === "Approved") approvedApps--;
        else if (deleted.status === "Rejected") rejectedApps--;

        const conversionRate =
          totalApps > 0 ? Math.round((approvedApps / totalApps) * 100) : 0;
        setAdmissionData({
          ...admissionData,
          totalApplications: totalApps,
          pendingApplications: pendingApps,
          approvedApplications: approvedApps,
          rejectedApplications: rejectedApps,
          conversionRate: conversionRate || 0,
        });

        Swal.fire("Deleted!", "Admission record has been deleted.", "success");
      }
    });
  };

  // Handle approve admission
  const handleApproveAdmission = (id) => {
    Swal.fire({
      title: "Approve Admission?",
      text: "This will approve the admission request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmissionRecords(
          admissionRecords.map((record) =>
            record.id === id ? { ...record, status: "Approved" } : record,
          ),
        );

        // Update stats
        const pendingApps = admissionData.pendingApplications - 1;
        const approvedApps = admissionData.approvedApplications + 1;
        const conversionRate = Math.round(
          (approvedApps / admissionData.totalApplications) * 100,
        );
        setAdmissionData({
          ...admissionData,
          pendingApplications: pendingApps,
          approvedApplications: approvedApps,
          conversionRate: conversionRate || 0,
        });

        Swal.fire({
          icon: "success",
          title: "Admission Approved!",
          text: "Admission request has been approved.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle reject admission
  const handleRejectAdmission = (id) => {
    Swal.fire({
      title: "Reject Admission?",
      text: "This will reject the admission request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmissionRecords(
          admissionRecords.map((record) =>
            record.id === id ? { ...record, status: "Rejected" } : record,
          ),
        );

        // Update stats
        const pendingApps = admissionData.pendingApplications - 1;
        const rejectedApps = admissionData.rejectedApplications + 1;
        setAdmissionData({
          ...admissionData,
          pendingApplications: pendingApps,
          rejectedApplications: rejectedApps,
        });

        Swal.fire({
          icon: "success",
          title: "Admission Rejected",
          text: "Admission request has been rejected.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

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

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-lg font-bold text-blue-600">
                {admissionData.totalApplications}
              </p>
              <p className="text-[10px] text-gray-500">Total Applications</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-lg font-bold text-green-600">
                {admissionData.approvedApplications}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {admissionData.pendingApplications}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-lg font-bold text-purple-600">
                {admissionData.conversionRate}%
              </p>
              <p className="text-[10px] text-gray-500">Conversion Rate</p>
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
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Classes</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Monthly Admission Chart */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-3">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Monthly Admission Trends
            </h4>
            <div className="space-y-3">
              {getFilteredMonthlyData().map((item, index) => {
                if (
                  item.applications === 0 &&
                  item.approved === 0 &&
                  item.rejected === 0
                ) {
                  return null;
                }
                return (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{item.month}</span>
                      <span className="text-gray-600">
                        Apps: {item.applications} | Approved: {item.approved} |
                        Rejected: {item.rejected}
                      </span>
                    </div>
                    <div className="flex gap-1 h-5">
                      <div
                        className="bg-blue-500 rounded-l-full h-full"
                        style={{ width: `${(item.applications / 40) * 100}%` }}
                      ></div>
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${(item.approved / 40) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-500 rounded-r-full h-full"
                        style={{ width: `${(item.rejected / 40) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {getFilteredMonthlyData().filter((item) => item.applications > 0)
                .length === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">
                  No data available for selected filters
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 rounded"></span>{" "}
                Applications
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded"></span> Approved
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-500 rounded"></span> Rejected
              </span>
            </div>
          </div>

          {/* Class Wise and Gender Wise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-700 text-sm mb-3">
                Class Wise Admission
              </h4>
              <div className="space-y-2">
                {classWiseData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{item.class}</span>
                      <span className="text-gray-600">
                        {item.enrolled}/{item.applications} enrolled
                      </span>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div
                        className="bg-blue-500 rounded-l-full h-full"
                        style={{ width: `${(item.applications / 40) * 100}%` }}
                      ></div>
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${(item.approved / 40) * 100}%` }}
                      ></div>
                      <div
                        className="bg-purple-500 rounded-r-full h-full"
                        style={{ width: `${(item.enrolled / 40) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
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
                  <span className="w-3 h-3 bg-purple-500 rounded"></span>{" "}
                  Enrolled
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-700 text-sm mb-3">
                Gender Distribution
              </h4>
              <div className="space-y-2">
                {genderData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{item.gender}</span>
                      <span className="text-gray-600">
                        {item.count} students
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
                        style={{ width: `${(item.count / 85) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Wise */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              Subject Wise Enrollment
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjectWiseData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 text-center"
                >
                  <p className="text-lg font-bold text-blue-600">
                    {item.count}
                  </p>
                  <p className="text-[10px] text-gray-500">{item.subject}</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${(item.count / 35) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Records Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-3">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm">
                Admission Records ({admissionRecords.length})
              </h4>
            </div>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
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
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {admissionRecords.length > 0 ? (
                    admissionRecords.map((record, index) => (
                      <tr
                        key={record.id}
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
                          {formatDate(record.applicationDate)}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(record.status)}`}
                          >
                            {getStatusIcon(record.status)}
                            {record.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(record)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-all"
                              title="View Details"
                            >
                              <FaEye size={12} />
                            </button>
                            {record.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleApproveAdmission(record.id)
                                  }
                                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                                  title="Approve"
                                >
                                  <FaCheckCircleIcon size={12} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleRejectAdmission(record.id)
                                  }
                                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                                  title="Reject"
                                >
                                  <FaTimesCircleIcon size={12} />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => openEditModal(record)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-all"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteAdmission(record.id)}
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
                        colSpan="7"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaUserPlus className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No admission records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Admission Modal */}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent's name"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent's phone"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
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
                    setFormData({ ...formData, previousSchool: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter previous school"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add notes..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Admission
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

      {/* Edit Admission Modal */}
      {showEditModal && selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Admission Record
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student ID"
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
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent's name"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent's phone"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
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
                    setFormData({ ...formData, previousSchool: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter previous school"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add notes..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Update Admission
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

      {/* Details Modal */}
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
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
                  {selectedAdmission.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedAdmission.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAdmission.status)}`}
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
                    <span>📖 {selectedAdmission.subject}</span>
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
                  <p className="text-[10px] text-gray-400">Previous School</p>
                  <p className="text-sm font-semibold">
                    {selectedAdmission.previousSchool || "N/A"}
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
                        handleApproveAdmission(selectedAdmission.id);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaCheckCircleIcon className="inline mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleRejectAdmission(selectedAdmission.id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
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
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
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
      )}
    </div>
  );
};

export default Admission_report;
