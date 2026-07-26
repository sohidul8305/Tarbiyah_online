// src/Page/Admin/Syllabus.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Syllabus = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("batch-course");
  const [activeSubMenu, setActiveSubMenu] = useState("syllabus");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Syllabus data
  const [syllabus, setSyllabus] = useState([
    {
      id: 1,
      title: "Tajweed - Class 8 Syllabus",
      course: "Tajweed",
      class: "Class 8",
      teacher: "Dr. Muhammad Abdullah",
      batch: "Batch 2026-A",
      academicYear: "2026",
      totalWeeks: 32,
      totalChapters: 12,
      description:
        "Comprehensive Tajweed course covering all rules of Quranic recitation.",
      status: "Published",
      createdAt: "2026-01-10",
      updatedAt: "2026-06-15",
      topics: [
        {
          id: 1,
          name: "Introduction to Tajweed",
          week: 1,
          duration: "2 weeks",
          status: "Completed",
        },
        {
          id: 2,
          name: "Makharij (Articulation Points)",
          week: 3,
          duration: "3 weeks",
          status: "Completed",
        },
        {
          id: 3,
          name: "Sifaat (Characteristics of Letters)",
          week: 6,
          duration: "3 weeks",
          status: "In Progress",
        },
        {
          id: 4,
          name: "Rules of Noon and Meem Mushaddad",
          week: 9,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 5,
          name: "Rules of Meem Sakinah",
          week: 11,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 6,
          name: "Rules of Noon Sakinah and Tanween",
          week: 13,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 7,
          name: "Rules of Madd",
          week: 16,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 8,
          name: "Rules of Qalqalah",
          week: 19,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 9,
          name: "Rules of Tafkheem and Tarqeeq",
          week: 21,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 10,
          name: "Rules of Waqf and Ibtida",
          week: 23,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 11,
          name: "Practical Application",
          week: 25,
          duration: "4 weeks",
          status: "Pending",
        },
        {
          id: 12,
          name: "Final Review and Assessment",
          week: 29,
          duration: "3 weeks",
          status: "Pending",
        },
      ],
      resources: [
        {
          id: 1,
          name: "Tajweed Rules Book",
          type: "PDF",
          size: "2.5 MB",
          uploadedAt: "2026-01-12",
        },
        {
          id: 2,
          name: "Practice Exercises",
          type: "DOC",
          size: "1.2 MB",
          uploadedAt: "2026-01-15",
        },
        {
          id: 3,
          name: "Audio Recitations",
          type: "MP3",
          size: "15 MB",
          uploadedAt: "2026-02-01",
        },
      ],
    },
    {
      id: 2,
      title: "Tafsir - Class 9 Syllabus",
      course: "Tafsir",
      class: "Class 9",
      teacher: "Ustadh Ahmad Ali",
      batch: "Batch 2026-B",
      academicYear: "2026",
      totalWeeks: 30,
      totalChapters: 15,
      description:
        "In-depth Tafsir course covering selected Surahs and their explanations.",
      status: "Published",
      createdAt: "2026-02-01",
      updatedAt: "2026-06-20",
      topics: [
        {
          id: 1,
          name: "Introduction to Tafsir",
          week: 1,
          duration: "2 weeks",
          status: "Completed",
        },
        {
          id: 2,
          name: "Surah Al-Fatihah",
          week: 3,
          duration: "2 weeks",
          status: "Completed",
        },
        {
          id: 3,
          name: "Surah Al-Baqarah (Selected Verses)",
          week: 5,
          duration: "4 weeks",
          status: "In Progress",
        },
        {
          id: 4,
          name: "Surah Al-Imran (Selected Verses)",
          week: 9,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 5,
          name: "Surah An-Nisa (Selected Verses)",
          week: 12,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 6,
          name: "Surah Al-Ma'idah (Selected Verses)",
          week: 15,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 7,
          name: "Surah Al-An'am (Selected Verses)",
          week: 17,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 8,
          name: "Surah Al-A'raf (Selected Verses)",
          week: 19,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 9,
          name: "Surah Al-Anfal (Selected Verses)",
          week: 21,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 10,
          name: "Surah At-Tawbah (Selected Verses)",
          week: 23,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 11,
          name: "Tafsir Methodology",
          week: 25,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 12,
          name: "Contemporary Tafsir Issues",
          week: 27,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 13,
          name: "Review and Discussion",
          week: 29,
          duration: "1 week",
          status: "Pending",
        },
      ],
      resources: [
        {
          id: 1,
          name: "Tafsir Ibn Kathir (Selected)",
          type: "PDF",
          size: "3.8 MB",
          uploadedAt: "2026-02-05",
        },
        {
          id: 2,
          name: "Study Guide",
          type: "DOC",
          size: "1.5 MB",
          uploadedAt: "2026-02-10",
        },
        {
          id: 3,
          name: "Lecture Recordings",
          type: "MP4",
          size: "45 MB",
          uploadedAt: "2026-03-01",
        },
      ],
    },
    {
      id: 3,
      title: "Hadith - Class 10 Syllabus",
      course: "Hadith",
      class: "Class 10",
      teacher: "Ustadha Fatima Rahman",
      batch: "Batch 2026-C",
      academicYear: "2026",
      totalWeeks: 28,
      totalChapters: 10,
      description:
        "Study of selected Hadith collections with practical applications.",
      status: "Draft",
      createdAt: "2026-03-01",
      updatedAt: "2026-06-18",
      topics: [
        {
          id: 1,
          name: "Introduction to Hadith Sciences",
          week: 1,
          duration: "2 weeks",
          status: "Completed",
        },
        {
          id: 2,
          name: "Classification of Hadith",
          week: 3,
          duration: "3 weeks",
          status: "Completed",
        },
        {
          id: 3,
          name: "Sahih Bukhari (Selected)",
          week: 6,
          duration: "4 weeks",
          status: "In Progress",
        },
        {
          id: 4,
          name: "Sahih Muslim (Selected)",
          week: 10,
          duration: "4 weeks",
          status: "Pending",
        },
        {
          id: 5,
          name: "Sunan Abu Dawud (Selected)",
          week: 14,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 6,
          name: "Sunan Tirmidhi (Selected)",
          week: 17,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 7,
          name: "Hadith Terminology",
          week: 20,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 8,
          name: "Practical Application",
          week: 22,
          duration: "3 weeks",
          status: "Pending",
        },
        {
          id: 9,
          name: "Review and Discussion",
          week: 25,
          duration: "2 weeks",
          status: "Pending",
        },
        {
          id: 10,
          name: "Final Assessment",
          week: 27,
          duration: "1 week",
          status: "Pending",
        },
      ],
      resources: [
        {
          id: 1,
          name: "Hadith Collections PDF",
          type: "PDF",
          size: "4.2 MB",
          uploadedAt: "2026-03-05",
        },
        {
          id: 2,
          name: "Terminology Guide",
          type: "DOC",
          size: "1.8 MB",
          uploadedAt: "2026-03-10",
        },
      ],
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedSyllabus, setExpandedSyllabus] = useState(null);

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    class: "",
    teacher: "",
    batch: "",
    academicYear: new Date().getFullYear().toString(),
    totalWeeks: 30,
    totalChapters: 10,
    description: "",
    status: "Draft",
  });

  // Topic form data
  const [topicFormData, setTopicFormData] = useState({
    name: "",
    week: "",
    duration: "",
    status: "Pending",
  });

  // Resource form data
  const [resourceFormData, setResourceFormData] = useState({
    name: "",
    type: "PDF",
    size: "",
    file: null,
  });

  // Available options
  const courses = [
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
    "Arabic Grammar",
    "Quran Memorization",
  ];
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const teachers = [
    "Dr. Muhammad Abdullah",
    "Ustadh Ahmad Ali",
    "Ustadha Fatima Rahman",
    "Dr. Omar Farooq",
    "Ustadh Yusuf Khan",
    "Ustadh Ibrahim Malik",
  ];
  const batches = [
    "Batch 2026-A",
    "Batch 2026-B",
    "Batch 2026-C",
    "Batch 2026-D",
    "Batch 2026-E",
    "Batch 2026-F",
  ];
  const statuses = ["Draft", "Published", "Archived"];
  const topicStatuses = ["Completed", "In Progress", "Pending", "Cancelled"];
  const resourceTypes = [
    "PDF",
    "DOC",
    "DOCX",
    "PPT",
    "PPTX",
    "XLS",
    "XLSX",
    "MP3",
    "MP4",
    "JPG",
    "PNG",
    "ZIP",
  ];

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

  // Save syllabus to localStorage
  useEffect(() => {
    localStorage.setItem("syllabus", JSON.stringify(syllabus));
  }, [syllabus]);

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
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get topic status color
  const getTopicStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get resource icon
  const getResourceIcon = (type) => {
    const icons = {
      PDF: <FaFilePdfIcon className="text-red-500" />,
      DOC: <FaFileWord className="text-blue-500" />,
      DOCX: <FaFileWord className="text-blue-500" />,
      PPT: <FaFilePowerpoint className="text-orange-500" />,
      PPTX: <FaFilePowerpoint className="text-orange-500" />,
      XLS: <FaFileExcelIcon className="text-green-500" />,
      XLSX: <FaFileExcelIcon className="text-green-500" />,
      MP3: <FaFileAudio className="text-purple-500" />,
      MP4: <FaFileVideo className="text-pink-500" />,
      JPG: <FaFileImage className="text-blue-400" />,
      PNG: <FaFileImage className="text-blue-400" />,
      ZIP: <FaFileArchive className="text-gray-500" />,
    };
    return icons[type] || <FaFileAltIcon className="text-gray-500" />;
  };

  // Filter syllabus
  const filteredSyllabus = syllabus.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "All" || item.course === filterCourse;
    const matchesClass = filterClass === "All" || item.class === filterClass;
    const matchesStatus =
      filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesCourse && matchesClass && matchesStatus;
  });

  // Get unique values for filters
  const uniqueCourses = ["All", ...new Set(syllabus.map((s) => s.course))];
  const uniqueClasses = ["All", ...new Set(syllabus.map((s) => s.class))];
  const uniqueStatuses = ["All", ...new Set(syllabus.map((s) => s.status))];

  // Toggle expand
  const toggleExpand = (id) => {
    if (expandedSyllabus === id) {
      setExpandedSyllabus(null);
    } else {
      setExpandedSyllabus(id);
    }
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      title: "",
      course: "",
      class: "",
      teacher: "",
      batch: "",
      academicYear: new Date().getFullYear().toString(),
      totalWeeks: 30,
      totalChapters: 10,
      description: "",
      status: "Draft",
    });
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (syllabusItem) => {
    setSelectedSyllabus(syllabusItem);
    setFormData({
      title: syllabusItem.title,
      course: syllabusItem.course,
      class: syllabusItem.class,
      teacher: syllabusItem.teacher,
      batch: syllabusItem.batch,
      academicYear: syllabusItem.academicYear,
      totalWeeks: syllabusItem.totalWeeks,
      totalChapters: syllabusItem.totalChapters,
      description: syllabusItem.description || "",
      status: syllabusItem.status,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (syllabusItem) => {
    setSelectedSyllabus(syllabusItem);
    setShowDetailsModal(true);
  };

  // Open topic modal
  const openTopicModal = (syllabusItem, topic = null) => {
    setSelectedSyllabus(syllabusItem);
    if (topic) {
      setSelectedTopic(topic);
      setTopicFormData({
        name: topic.name,
        week: topic.week,
        duration: topic.duration,
        status: topic.status,
      });
    } else {
      setSelectedTopic(null);
      setTopicFormData({
        name: "",
        week: syllabusItem.topics.length + 1,
        duration: "2 weeks",
        status: "Pending",
      });
    }
    setShowTopicModal(true);
  };

  // Open resource modal
  const openResourceModal = (syllabusItem) => {
    setSelectedSyllabus(syllabusItem);
    setResourceFormData({
      name: "",
      type: "PDF",
      size: "",
      file: null,
    });
    setShowResourceModal(true);
  };

  // Handle add syllabus
  const handleAddSyllabus = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.course ||
      !formData.class ||
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

    const newSyllabus = {
      id: Date.now(),
      title: formData.title,
      course: formData.course,
      class: formData.class,
      teacher: formData.teacher,
      batch: formData.batch || "Not Assigned",
      academicYear: formData.academicYear,
      totalWeeks: formData.totalWeeks || 30,
      totalChapters: formData.totalChapters || 10,
      description: formData.description || "",
      status: formData.status,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      topics: [],
      resources: [],
    };

    setSyllabus([...syllabus, newSyllabus]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Syllabus Created!",
      text: `${formData.title} has been created successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit syllabus
  const handleEditSyllabus = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.course ||
      !formData.class ||
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

    setSyllabus(
      syllabus.map((s) =>
        s.id === selectedSyllabus.id
          ? {
              ...s,
              title: formData.title,
              course: formData.course,
              class: formData.class,
              teacher: formData.teacher,
              batch: formData.batch || "Not Assigned",
              academicYear: formData.academicYear,
              totalWeeks: formData.totalWeeks,
              totalChapters: formData.totalChapters,
              description: formData.description || "",
              status: formData.status,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : s,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Syllabus Updated!",
      text: "Syllabus has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete syllabus
  const handleDeleteSyllabus = (id) => {
    Swal.fire({
      title: "Delete Syllabus?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSyllabus(syllabus.filter((s) => s.id !== id));
        Swal.fire("Deleted!", "Syllabus has been deleted.", "success");
      }
    });
  };

  // Handle add topic
  const handleAddTopic = (e) => {
    e.preventDefault();

    if (!topicFormData.name) {
      Swal.fire({
        icon: "warning",
        title: "Please enter topic name",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newTopic = {
      id: Date.now(),
      name: topicFormData.name,
      week: parseInt(topicFormData.week) || selectedSyllabus.topics.length + 1,
      duration: topicFormData.duration || "2 weeks",
      status: topicFormData.status,
    };

    if (selectedTopic) {
      // Edit existing topic
      setSyllabus(
        syllabus.map((s) =>
          s.id === selectedSyllabus.id
            ? {
                ...s,
                topics: s.topics.map((t) =>
                  t.id === selectedTopic.id ? { ...newTopic, id: t.id } : t,
                ),
              }
            : s,
        ),
      );
    } else {
      // Add new topic
      setSyllabus(
        syllabus.map((s) =>
          s.id === selectedSyllabus.id
            ? { ...s, topics: [...s.topics, newTopic] }
            : s,
        ),
      );
    }

    setShowTopicModal(false);
    Swal.fire({
      icon: "success",
      title: selectedTopic ? "Topic Updated!" : "Topic Added!",
      text: `Topic has been ${selectedTopic ? "updated" : "added"} successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete topic
  const handleDeleteTopic = (syllabusId, topicId) => {
    Swal.fire({
      title: "Delete Topic?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSyllabus(
          syllabus.map((s) =>
            s.id === syllabusId
              ? { ...s, topics: s.topics.filter((t) => t.id !== topicId) }
              : s,
          ),
        );
        Swal.fire("Deleted!", "Topic has been deleted.", "success");
      }
    });
  };

  // Handle add resource
  const handleAddResource = (e) => {
    e.preventDefault();

    if (!resourceFormData.name) {
      Swal.fire({
        icon: "warning",
        title: "Please enter resource name",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newResource = {
      id: Date.now(),
      name: resourceFormData.name,
      type: resourceFormData.type,
      size: resourceFormData.size || "1 MB",
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    setSyllabus(
      syllabus.map((s) =>
        s.id === selectedSyllabus.id
          ? { ...s, resources: [...s.resources, newResource] }
          : s,
      ),
    );

    setShowResourceModal(false);
    Swal.fire({
      icon: "success",
      title: "Resource Added!",
      text: "Resource has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete resource
  const handleDeleteResource = (syllabusId, resourceId) => {
    Swal.fire({
      title: "Delete Resource?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSyllabus(
          syllabus.map((s) =>
            s.id === syllabusId
              ? {
                  ...s,
                  resources: s.resources.filter((r) => r.id !== resourceId),
                }
              : s,
          ),
        );
        Swal.fire("Deleted!", "Resource has been deleted.", "success");
      }
    });
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate progress
  const calculateProgress = (topics) => {
    if (!topics || topics.length === 0) return 0;
    const completed = topics.filter((t) => t.status === "Completed").length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Syllabus Management
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
                <FaBook className="text-blue-600" /> Syllabus Management
              </h1>
              <p className="text-xs text-gray-500">
                Create and manage course syllabi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Create Syllabus
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
              <p className="text-lg font-bold text-blue-600">
                {syllabus.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Syllabus</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {syllabus.filter((s) => s.status === "Published").length}
              </p>
              <p className="text-[10px] text-gray-500">Published</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {syllabus.filter((s) => s.status === "Draft").length}
              </p>
              <p className="text-[10px] text-gray-500">Drafts</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {syllabus.reduce((sum, s) => sum + s.topics.length, 0)}
              </p>
              <p className="text-[10px] text-gray-500">Total Topics</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by title, course, teacher or batch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
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
              </div>
            </div>
          </div>

          {/* Syllabus List */}
          <div className="space-y-3 overflow-hidden max-h-[calc(100vh-340px)] overflow-y-auto pr-1">
            {filteredSyllabus.length > 0 ? (
              filteredSyllabus.map((syllabusItem) => {
                const progress = calculateProgress(syllabusItem.topics);
                return (
                  <div
                    key={syllabusItem.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div
                      className={`h-1 ${
                        syllabusItem.status === "Published"
                          ? "bg-green-500"
                          : syllabusItem.status === "Draft"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-800 text-sm">
                              {syllabusItem.title}
                            </h3>
                            <span
                              className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(syllabusItem.status)}`}
                            >
                              {syllabusItem.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-500">
                            <span>📚 {syllabusItem.course}</span>
                            <span>🏫 {syllabusItem.class}</span>
                            <span>👨‍🏫 {syllabusItem.teacher}</span>
                            <span>📦 {syllabusItem.batch}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-blue-600">
                            {syllabusItem.topics.length} Topics
                          </p>
                          <p className="text-[8px] text-gray-400">
                            {syllabusItem.resources.length} Resources
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                          <span>Course Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              progress >= 80
                                ? "bg-green-500"
                                : progress >= 50
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Expandable Topics */}
                      <div className="mt-2">
                        <button
                          onClick={() => toggleExpand(syllabusItem.id)}
                          className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {expandedSyllabus === syllabusItem.id ? (
                            <>
                              <FaChevronDown size={10} /> Hide Topics &
                              Resources
                            </>
                          ) : (
                            <>
                              <FaChevronRight size={10} /> View Topics &
                              Resources
                            </>
                          )}
                        </button>

                        {expandedSyllabus === syllabusItem.id && (
                          <div className="mt-2 space-y-2">
                            {/* Topics */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-[10px] font-semibold text-gray-700 flex items-center gap-1">
                                  <FaListUl size={10} /> Topics (
                                  {syllabusItem.topics.length})
                                </h4>
                                <button
                                  onClick={() => openTopicModal(syllabusItem)}
                                  className="text-[8px] bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded"
                                >
                                  + Add Topic
                                </button>
                              </div>
                              <div className="space-y-1 max-h-40 overflow-y-auto">
                                {syllabusItem.topics.map((topic) => (
                                  <div
                                    key={topic.id}
                                    className="flex items-center justify-between bg-gray-50 p-1.5 rounded text-[10px]"
                                  >
                                    <div className="flex items-center gap-2 flex-1">
                                      <span className="font-medium">
                                        {topic.name}
                                      </span>
                                      <span className="text-gray-400">
                                        | Week {topic.week}
                                      </span>
                                      <span className="text-gray-400">
                                        | {topic.duration}
                                      </span>
                                      <span
                                        className={`text-[8px] px-1.5 py-0.5 rounded-full ${getTopicStatusColor(topic.status)}`}
                                      >
                                        {topic.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() =>
                                          openTopicModal(syllabusItem, topic)
                                        }
                                        className="text-green-600 hover:text-green-800 p-0.5"
                                      >
                                        <FaEdit size={10} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteTopic(
                                            syllabusItem.id,
                                            topic.id,
                                          )
                                        }
                                        className="text-red-600 hover:text-red-800 p-0.5"
                                      >
                                        <FaTrash size={10} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {syllabusItem.topics.length === 0 && (
                                  <p className="text-[10px] text-gray-400 text-center py-2">
                                    No topics added yet
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-[10px] font-semibold text-gray-700 flex items-center gap-1">
                                  <FaFolderOpen size={10} /> Resources (
                                  {syllabusItem.resources.length})
                                </h4>
                                <button
                                  onClick={() =>
                                    openResourceModal(syllabusItem)
                                  }
                                  className="text-[8px] bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded"
                                >
                                  + Add Resource
                                </button>
                              </div>
                              <div className="space-y-1 max-h-32 overflow-y-auto">
                                {syllabusItem.resources.map((resource) => (
                                  <div
                                    key={resource.id}
                                    className="flex items-center justify-between bg-gray-50 p-1.5 rounded text-[10px]"
                                  >
                                    <div className="flex items-center gap-2 flex-1">
                                      {getResourceIcon(resource.type)}
                                      <span className="font-medium">
                                        {resource.name}
                                      </span>
                                      <span className="text-gray-400">
                                        | {resource.type}
                                      </span>
                                      <span className="text-gray-400">
                                        | {resource.size}
                                      </span>
                                      <span className="text-gray-400 text-[8px]">
                                        {formatDate(resource.uploadedAt)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button className="text-blue-600 hover:text-blue-800 p-0.5">
                                        <FaDownload size={10} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteResource(
                                            syllabusItem.id,
                                            resource.id,
                                          )
                                        }
                                        className="text-red-600 hover:text-red-800 p-0.5"
                                      >
                                        <FaTrash size={10} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {syllabusItem.resources.length === 0 && (
                                  <p className="text-[10px] text-gray-400 text-center py-2">
                                    No resources added yet
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                        <button
                          onClick={() => openDetailsModal(syllabusItem)}
                          className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                        >
                          <FaEye className="inline mr-1" size={10} /> View
                          Details
                        </button>
                        <button
                          onClick={() => openEditModal(syllabusItem)}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteSyllabus(syllabusItem.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                <FaBook className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Syllabus Found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Syllabus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-blue-600" /> Create New Syllabus
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSyllabus} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Syllabus Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Tajweed - Class 8 Syllabus"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Batch
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch} value={batch}>
                        {batch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2026"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Weeks
                  </label>
                  <input
                    type="number"
                    value={formData.totalWeeks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalWeeks: parseInt(e.target.value) || 30,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Chapters
                  </label>
                  <input
                    type="number"
                    value={formData.totalChapters}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalChapters: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
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
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter syllabus description..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Create Syllabus
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

      {/* Edit Syllabus Modal */}
      {showEditModal && selectedSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Syllabus
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSyllabus} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Syllabus Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Tajweed - Class 8 Syllabus"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch} value={batch}>
                        {batch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2026"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Weeks
                  </label>
                  <input
                    type="number"
                    value={formData.totalWeeks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalWeeks: parseInt(e.target.value) || 30,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Chapters
                  </label>
                  <input
                    type="number"
                    value={formData.totalChapters}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalChapters: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
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
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter syllabus description..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Update Syllabus
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
      {showDetailsModal && selectedSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Syllabus Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedSyllabus.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedSyllabus.course}</span>
                    <span>🏫 {selectedSyllabus.class}</span>
                    <span>👨‍🏫 {selectedSyllabus.teacher}</span>
                    <span>📦 {selectedSyllabus.batch}</span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSyllabus.status)}`}
                >
                  {selectedSyllabus.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {selectedSyllabus.totalWeeks}
                  </p>
                  <p className="text-[10px] text-gray-500">Total Weeks</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-600">
                    {selectedSyllabus.totalChapters}
                  </p>
                  <p className="text-[10px] text-gray-500">Chapters</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-purple-600">
                    {selectedSyllabus.topics.length}
                  </p>
                  <p className="text-[10px] text-gray-500">Topics</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-orange-600">
                    {selectedSyllabus.resources.length}
                  </p>
                  <p className="text-[10px] text-gray-500">Resources</p>
                </div>
              </div>

              {selectedSyllabus.description && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Description</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSyllabus.description}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                  <FaListUl className="text-blue-500" /> Topics
                </h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {selectedSyllabus.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-medium">{topic.name}</span>
                        <span className="text-gray-400">
                          | Week {topic.week}
                        </span>
                        <span className="text-gray-400">
                          | {topic.duration}
                        </span>
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getTopicStatusColor(topic.status)}`}
                        >
                          {topic.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {selectedSyllabus.topics.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">
                      No topics added yet
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                  <FaFolderOpen className="text-green-500" /> Resources
                </h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {selectedSyllabus.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {getResourceIcon(resource.type)}
                        <span className="font-medium">{resource.name}</span>
                        <span className="text-gray-400">| {resource.type}</span>
                        <span className="text-gray-400">| {resource.size}</span>
                        <span className="text-gray-400 text-[10px]">
                          {formatDate(resource.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {selectedSyllabus.resources.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">
                      No resources added yet
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-400 pt-2 border-t border-gray-200">
                <p>Created: {formatDate(selectedSyllabus.createdAt)}</p>
                <p>Last Updated: {formatDate(selectedSyllabus.updatedAt)}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedSyllabus);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaEdit className="inline mr-2" /> Edit Syllabus
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteSyllabus(selectedSyllabus.id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaTrash className="inline mr-2" /> Delete
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

      {/* Topic Modal */}
      {showTopicModal && selectedSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                {selectedTopic ? (
                  <FaEdit className="text-green-600" />
                ) : (
                  <FaPlusCircle className="text-blue-600" />
                )}
                {selectedTopic ? "Edit Topic" : "Add Topic"}
              </h3>
              <form onSubmit={handleAddTopic} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={topicFormData.name}
                    onChange={(e) =>
                      setTopicFormData({
                        ...topicFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter topic name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Week
                    </label>
                    <input
                      type="number"
                      value={topicFormData.week}
                      onChange={(e) =>
                        setTopicFormData({
                          ...topicFormData,
                          week: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={topicFormData.duration}
                      onChange={(e) =>
                        setTopicFormData({
                          ...topicFormData,
                          duration: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2 weeks"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={topicFormData.status}
                    onChange={(e) =>
                      setTopicFormData({
                        ...topicFormData,
                        status: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {topicStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaSave className="inline mr-2" size={14} />{" "}
                    {selectedTopic ? "Update" : "Add"} Topic
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTopicModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {showResourceModal && selectedSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FaPlusCircle className="text-green-600" /> Add Resource
              </h3>
              <form onSubmit={handleAddResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resource Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={resourceFormData.name}
                    onChange={(e) =>
                      setResourceFormData({
                        ...resourceFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter resource name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={resourceFormData.type}
                      onChange={(e) =>
                        setResourceFormData({
                          ...resourceFormData,
                          type: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {resourceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      value={resourceFormData.size}
                      onChange={(e) =>
                        setResourceFormData({
                          ...resourceFormData,
                          size: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2.5 MB"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaSave className="inline mr-2" size={14} /> Add Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResourceModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Syllabus;
