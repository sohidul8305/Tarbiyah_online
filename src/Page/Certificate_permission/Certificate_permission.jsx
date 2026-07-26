// src/Page/Admin/Certificate_permission.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Certificate_permission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("exam");
  const [activeSubMenu, setActiveSubMenu] = useState("certificate-permission");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Certificate requests data
  const [certificateRequests, setCertificateRequests] = useState([
    {
      id: 1,
      studentName: "Ahmed Hasan",
      studentId: "STU001",
      class: "Class 8",
      subject: "Tajweed",
      teacher: "Dr. Muhammad Abdullah",
      certificateType: "Completion",
      requestDate: "2026-07-10",
      status: "Pending",
      grade: "A",
      attendance: 92,
      examScore: 85,
      issuedDate: null,
      certificateNumber: null,
      notes: "Student has completed the course with excellent performance.",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 2,
      studentName: "Fatima Begum",
      studentId: "STU002",
      class: "Class 9",
      subject: "Tafsir",
      teacher: "Ustadh Ahmad Ali",
      certificateType: "Merit",
      requestDate: "2026-07-12",
      status: "Pending",
      grade: "A+",
      attendance: 95,
      examScore: 92,
      issuedDate: null,
      certificateNumber: null,
      notes: "Outstanding performance - recommended for merit certificate.",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 3,
      studentName: "Mohammad Ali",
      studentId: "STU003",
      class: "Class 10",
      subject: "Hadith",
      teacher: "Ustadha Fatima Rahman",
      certificateType: "Completion",
      requestDate: "2026-07-08",
      status: "Approved",
      grade: "B",
      attendance: 78,
      examScore: 72,
      issuedDate: null,
      certificateNumber: "CERT-2026-001",
      notes: "Certificate issued successfully.",
      approvedBy: "Admin",
      approvedDate: "2026-07-14",
    },
    {
      id: 4,
      studentName: "Aisha Rahman",
      studentId: "STU004",
      class: "Class 7",
      subject: "Fiqh",
      teacher: "Dr. Omar Farooq",
      certificateType: "Completion",
      requestDate: "2026-07-05",
      status: "Rejected",
      grade: "D",
      attendance: 65,
      examScore: 58,
      issuedDate: null,
      certificateNumber: null,
      notes: "Attendance below requirement (65% < 75%).",
      approvedBy: "Admin",
      approvedDate: "2026-07-10",
    },
    {
      id: 5,
      studentName: "Hasan Mahmud",
      studentId: "STU007",
      class: "Class 6",
      subject: "Tajweed",
      teacher: "Ustadh Yusuf Khan",
      certificateType: "Completion",
      requestDate: "2026-07-14",
      status: "Pending",
      grade: "C",
      attendance: 85,
      examScore: 70,
      issuedDate: null,
      certificateNumber: null,
      notes: "Waiting for approval.",
      approvedBy: null,
      approvedDate: null,
    },
    {
      id: 6,
      studentName: "Khadija Akhter",
      studentId: "STU008",
      class: "Class 9",
      subject: "Tafsir",
      teacher: "Ustadh Ahmad Ali",
      certificateType: "Merit",
      requestDate: "2026-07-16",
      status: "Approved",
      grade: "A+",
      attendance: 98,
      examScore: 95,
      issuedDate: "2026-07-20",
      certificateNumber: "CERT-2026-002",
      notes: "Top performer - merit certificate issued.",
      approvedBy: "Admin",
      approvedDate: "2026-07-18",
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");

  // Form data for add/edit
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    subject: "",
    teacher: "",
    certificateType: "Completion",
    requestDate: "",
    grade: "",
    attendance: 0,
    examScore: 0,
    notes: "",
  });

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
  const teachers = [
    "Dr. Muhammad Abdullah",
    "Ustadh Ahmad Ali",
    "Ustadha Fatima Rahman",
    "Dr. Omar Farooq",
    "Ustadh Yusuf Khan",
    "Ustadh Ibrahim Malik",
  ];
  const certificateTypes = ["Completion", "Merit", "Honors", "Participation"];
  const grades = ["A+", "A", "B", "C", "D", "F"];

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

  // Save certificate requests to localStorage
  useEffect(() => {
    localStorage.setItem(
      "certificateRequests",
      JSON.stringify(certificateRequests),
    );
  }, [certificateRequests]);

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
      case "Issued":
        return "bg-blue-100 text-blue-700";
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
      case "Issued":
        return <FaCertificateIcon className="text-blue-500" />;
      default:
        return null;
    }
  };

  // Get certificate type badge color
  const getTypeColor = (type) => {
    switch (type) {
      case "Completion":
        return "bg-blue-100 text-blue-700";
      case "Merit":
        return "bg-purple-100 text-purple-700";
      case "Honors":
        return "bg-yellow-100 text-yellow-700";
      case "Participation":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filter certificate requests
  const filteredRequests = certificateRequests.filter((request) => {
    const matchesSearch =
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.certificateNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || request.status === filterStatus;
    const matchesType =
      filterType === "All" || request.certificateType === filterType;
    const matchesClass = filterClass === "All" || request.class === filterClass;
    return matchesSearch && matchesStatus && matchesType && matchesClass;
  });

  // Get unique values for filters
  const uniqueStatuses = [
    "All",
    ...new Set(certificateRequests.map((r) => r.status)),
  ];
  const uniqueTypes = [
    "All",
    ...new Set(certificateRequests.map((r) => r.certificateType)),
  ];
  const uniqueClasses = [
    "All",
    ...new Set(certificateRequests.map((r) => r.class)),
  ];

  // Open add modal
  const openAddModal = () => {
    setFormData({
      studentName: "",
      studentId: "",
      class: "",
      subject: "",
      teacher: "",
      certificateType: "Completion",
      requestDate: new Date().toISOString().split("T")[0],
      grade: "",
      attendance: 0,
      examScore: 0,
      notes: "",
    });
    setShowAddModal(true);
  };

  // Open details modal
  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  // Open approve modal
  const openApproveModal = (request) => {
    setSelectedRequest(request);
    setCertificateNumber(
      `CERT-${new Date().getFullYear()}-${String(certificateRequests.length + 1).padStart(4, "0")}`,
    );
    setShowApproveModal(true);
  };

  // Open reject modal
  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setRejectReason("");
    setShowRejectModal(true);
  };

  // Handle add certificate request
  const handleAddRequest = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.class ||
      !formData.subject ||
      !formData.teacher
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newRequest = {
      id: Date.now(),
      studentName: formData.studentName,
      studentId:
        formData.studentId ||
        `STU${String(certificateRequests.length + 1).padStart(3, "0")}`,
      class: formData.class,
      subject: formData.subject,
      teacher: formData.teacher,
      certificateType: formData.certificateType,
      requestDate: formData.requestDate,
      status: "Pending",
      grade: formData.grade || "N/A",
      attendance: parseInt(formData.attendance) || 0,
      examScore: parseInt(formData.examScore) || 0,
      issuedDate: null,
      certificateNumber: null,
      notes: formData.notes || "",
      approvedBy: null,
      approvedDate: null,
    };

    setCertificateRequests([...certificateRequests, newRequest]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Certificate Request Added!",
      text: `Certificate request for ${formData.studentName} has been added.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle approve certificate
  const handleApproveCertificate = () => {
    Swal.fire({
      title: "Approve Certificate?",
      text: `Approve certificate for ${selectedRequest.studentName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: "Approved",
                  certificateNumber: certificateNumber,
                  approvedBy: adminInfo.name,
                  approvedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        setShowApproveModal(false);
        Swal.fire({
          icon: "success",
          title: "Certificate Approved!",
          text: `Certificate for ${selectedRequest.studentName} has been approved.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle reject certificate
  const handleRejectCertificate = () => {
    if (!rejectReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please provide a reason",
        text: "You must specify a reason for rejection.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Reject Certificate?",
      text: `Reject certificate for ${selectedRequest.studentName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: "Rejected",
                  notes: r.notes + `\nRejection Reason: ${rejectReason}`,
                  approvedBy: adminInfo.name,
                  approvedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        setShowRejectModal(false);
        Swal.fire({
          icon: "success",
          title: "Certificate Rejected",
          text: `Certificate for ${selectedRequest.studentName} has been rejected.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle issue certificate (generate and download)
  const handleIssueCertificate = (request) => {
    Swal.fire({
      title: "Issue Certificate?",
      text: `Generate and download certificate for ${request.studentName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, issue!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === request.id
              ? {
                  ...r,
                  status: "Issued",
                  issuedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Certificate Issued!",
          text: `Certificate for ${request.studentName} has been generated and downloaded.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
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

  // Calculate stats
  const totalRequests = certificateRequests.length;
  const pendingRequests = certificateRequests.filter(
    (r) => r.status === "Pending",
  ).length;
  const approvedRequests = certificateRequests.filter(
    (r) => r.status === "Approved" || r.status === "Issued",
  ).length;
  const rejectedRequests = certificateRequests.filter(
    (r) => r.status === "Rejected",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Certificate Permission
          </h1>
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
                <FaCertificateIcon className="text-purple-600" /> Certificate
                Permission
              </h1>
              <p className="text-xs text-gray-500">
                Manage student certificate requests
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Request
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalRequests}</p>
              <p className="text-[10px] text-gray-500">Total Requests</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingRequests}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {approvedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {rejectedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by student name, ID, subject or certificate number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Certificate Requests Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-360px)] overflow-y-auto">
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
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Grade
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
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request, index) => (
                      <tr
                        key={request.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {request.studentName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {request.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {request.class}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {request.subject}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getTypeColor(request.certificateType)}`}
                          >
                            {request.certificateType}
                          </span>
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              request.grade === "A+" || request.grade === "A"
                                ? "bg-green-100 text-green-700"
                                : request.grade === "B"
                                  ? "bg-blue-100 text-blue-700"
                                  : request.grade === "C"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {request.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(request.status)}`}
                          >
                            {getStatusIcon(request.status)}
                            {request.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(request)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-all"
                              title="View Details"
                            >
                              <FaEye size={12} />
                            </button>
                            {request.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => openApproveModal(request)}
                                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                                  title="Approve"
                                >
                                  <FaCheckCircleIcon size={12} />
                                </button>
                                <button
                                  onClick={() => openRejectModal(request)}
                                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                                  title="Reject"
                                >
                                  <FaTimesCircleIcon size={12} />
                                </button>
                              </>
                            )}
                            {request.status === "Approved" && (
                              <button
                                onClick={() => handleIssueCertificate(request)}
                                className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50 transition-all"
                                title="Issue Certificate"
                              >
                                <FaCertificateIcon size={12} />
                              </button>
                            )}
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
                        <FaCertificateIcon className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No certificate requests found</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Try adjusting your search or filter criteria
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

      {/* Add Certificate Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-purple-600" /> Add Certificate Request
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRequest} className="p-6 space-y-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher *
                  </label>
                  <select
                    required
                    value={formData.teacher}
                    onChange={(e) =>
                      setFormData({ ...formData, teacher: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Type *
                  </label>
                  <select
                    required
                    value={formData.certificateType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certificateType: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {certificateTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.requestDate}
                  onChange={(e) =>
                    setFormData({ ...formData, requestDate: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter attendance"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.examScore}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      examScore: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter exam score"
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
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Request
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

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaCertificateIcon className="text-purple-600" /> Certificate
                Request Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedRequest.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedRequest.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      {selectedRequest.status}
                    </span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedRequest.certificateType)}`}
                    >
                      {selectedRequest.certificateType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.studentId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedRequest.class}</span>
                    <span>📖 {selectedRequest.subject}</span>
                    <span>👨‍🏫 {selectedRequest.teacher}</span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Grade</p>
                  <p className="text-sm font-semibold">
                    {selectedRequest.grade}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Attendance</p>
                  <p className="text-sm font-semibold">
                    {selectedRequest.attendance}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Exam Score</p>
                  <p className="text-sm font-semibold">
                    {selectedRequest.examScore}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Request Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedRequest.requestDate)}
                  </p>
                </div>
              </div>

              {selectedRequest.certificateNumber && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">
                    Certificate Number
                  </p>
                  <p className="text-sm font-semibold text-purple-600">
                    {selectedRequest.certificateNumber}
                  </p>
                </div>
              )}

              {selectedRequest.issuedDate && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Issued Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedRequest.issuedDate)}
                  </p>
                </div>
              )}

              {selectedRequest.approvedBy && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Approved By</p>
                    <p className="text-sm font-semibold">
                      {selectedRequest.approvedBy}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Approved Date</p>
                    <p className="text-sm font-semibold">
                      {formatDate(selectedRequest.approvedDate)}
                    </p>
                  </div>
                </div>
              )}

              {selectedRequest.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notes</p>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 flex-wrap">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openApproveModal(selectedRequest);
                      }}
                      className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaCheckCircleIcon className="inline mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openRejectModal(selectedRequest);
                      }}
                      className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaTimesCircleIcon className="inline mr-2" /> Reject
                    </button>
                  </>
                )}
                {selectedRequest.status === "Approved" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleIssueCertificate(selectedRequest);
                    }}
                    className="flex-1 min-w-[100px] bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaCertificateIcon className="inline mr-2" /> Issue
                    Certificate
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 min-w-[100px] bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircleIcon className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Approve Certificate
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.studentName}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>
                  <strong>Type:</strong> {selectedRequest.certificateType}
                </p>
                <p>
                  <strong>Class:</strong> {selectedRequest.class}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedRequest.subject}
                </p>
                <p>
                  <strong>Grade:</strong> {selectedRequest.grade}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Number *
                </label>
                <input
                  type="text"
                  required
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter certificate number"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleApproveCertificate}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaCheckCircleIcon className="inline mr-2" /> Approve
                </button>
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaTimesCircleIcon className="text-red-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Reject Certificate
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.studentName}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>
                  <strong>Type:</strong> {selectedRequest.certificateType}
                </p>
                <p>
                  <strong>Class:</strong> {selectedRequest.class}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedRequest.subject}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter the reason for rejection..."
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleRejectCertificate}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaTimesCircleIcon className="inline mr-2" /> Reject
                </button>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate_permission;
