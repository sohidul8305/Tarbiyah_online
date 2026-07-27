// src/Page/Admin/Teacher_overview.jsx
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

const Teacher_overview = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("teacher-overview");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Teachers data with comprehensive information
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. Muhammad Abdullah",
      teacherId: "TCH001",
      subject: "Tajweed",
      department: "Islamic Studies",
      email: "abdullah@example.com",
      phone: "+880 1712 345678",
      address: "Mohammadpur, Dhaka",
      joinDate: "2024-01-15",
      status: "Active",
      gender: "Male",
      dob: "1980-05-15",
      qualification: "PhD in Islamic Studies",
      experience: "12 years",
      specialization: "Quranic Sciences",
      bio: "Expert in Tajweed with over 12 years of teaching experience. Authored 3 books on Quranic recitation.",
      socialMedia: {
        facebook: "https://facebook.com/abdullah",
        twitter: "https://twitter.com/abdullah",
        linkedin: "https://linkedin.com/in/abdullah",
        website: "https://abdullah.com",
      },
      totalStudents: 45,
      classes: ["Class 8", "Class 9"],
      attendance: 95,
      rating: 4.8,
      reviews: 127,
      salary: 45000,
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Ustadh Ahmad Ali",
      teacherId: "TCH002",
      subject: "Tafsir",
      department: "Islamic Studies",
      email: "ahmad@example.com",
      phone: "+880 1723 456789",
      address: "Mirpur, Dhaka",
      joinDate: "2024-02-01",
      status: "Active",
      gender: "Male",
      dob: "1985-08-20",
      qualification: "Masters in Tafsir",
      experience: "8 years",
      specialization: "Tafsir and Ulum al-Quran",
      bio: "Specialized in Tafsir with focus on contemporary applications of Quranic teachings.",
      socialMedia: {
        facebook: "https://facebook.com/ahmad",
        twitter: "https://twitter.com/ahmad",
        linkedin: "https://linkedin.com/in/ahmad",
        website: "https://ahmad.com",
      },
      totalStudents: 38,
      classes: ["Class 9", "Class 10"],
      attendance: 88,
      rating: 4.9,
      reviews: 98,
      salary: 40000,
      performance: "Excellent",
    },
    {
      id: 3,
      name: "Ustadha Fatima Rahman",
      teacherId: "TCH003",
      subject: "Hadith",
      department: "Islamic Studies",
      email: "fatima@example.com",
      phone: "+880 1734 567890",
      address: "Uttara, Dhaka",
      joinDate: "2024-01-20",
      status: "Active",
      gender: "Female",
      dob: "1988-03-10",
      qualification: "Masters in Hadith Sciences",
      experience: "6 years",
      specialization: "Hadith Authentication",
      bio: "Expert in Hadith sciences with specialization in authentication and classification.",
      socialMedia: {
        facebook: "https://facebook.com/fatima",
        twitter: "https://twitter.com/fatima",
        linkedin: "https://linkedin.com/in/fatima",
        website: "https://fatima.com",
      },
      totalStudents: 42,
      classes: ["Class 10"],
      attendance: 92,
      rating: 4.7,
      reviews: 84,
      salary: 38000,
      performance: "Good",
    },
    {
      id: 4,
      name: "Dr. Omar Farooq",
      teacherId: "TCH004",
      subject: "Fiqh",
      department: "Islamic Law",
      email: "omar@example.com",
      phone: "+880 1745 678901",
      address: "Gulshan, Dhaka",
      joinDate: "2024-03-10",
      status: "Active",
      gender: "Male",
      dob: "1978-11-25",
      qualification: "PhD in Islamic Jurisprudence",
      experience: "15 years",
      specialization: "Fiqh and Usul al-Fiqh",
      bio: "Renowned expert in Islamic jurisprudence with specialization in contemporary issues.",
      socialMedia: {
        facebook: "https://facebook.com/omar",
        twitter: "https://twitter.com/omar",
        linkedin: "https://linkedin.com/in/omar",
        website: "https://omar.com",
      },
      totalStudents: 35,
      classes: ["Class 7", "Class 8", "Class 9"],
      attendance: 90,
      rating: 4.6,
      reviews: 112,
      salary: 50000,
      performance: "Excellent",
    },
    {
      id: 5,
      name: "Ustadh Yusuf Khan",
      teacherId: "TCH005",
      subject: "Aqeedah",
      department: "Islamic Studies",
      email: "yusuf@example.com",
      phone: "+880 1756 789012",
      address: "Dhanmondi, Dhaka",
      joinDate: "2024-04-05",
      status: "Active",
      gender: "Male",
      dob: "1990-07-30",
      qualification: "Masters in Aqeedah",
      experience: "5 years",
      specialization: "Aqeedah and Islamic Theology",
      bio: "Passionate teacher of Islamic theology with focus on classical and modern perspectives.",
      socialMedia: {
        facebook: "https://facebook.com/yusuf",
        twitter: "https://twitter.com/yusuf",
        linkedin: "https://linkedin.com/in/yusuf",
        website: "https://yusuf.com",
      },
      totalStudents: 30,
      classes: ["Class 6"],
      attendance: 85,
      rating: 4.5,
      reviews: 67,
      salary: 35000,
      performance: "Good",
    },
    {
      id: 6,
      name: "Ustadh Ibrahim Malik",
      teacherId: "TCH006",
      subject: "Arabic Grammar",
      department: "Arabic Language",
      email: "ibrahim@example.com",
      phone: "+880 1767 890123",
      address: "Baridhara, Dhaka",
      joinDate: "2024-05-01",
      status: "Active",
      gender: "Male",
      dob: "1985-09-15",
      qualification: "Masters in Arabic Language",
      experience: "7 years",
      specialization: "Arabic Grammar and Literature",
      bio: "Expert in Arabic grammar with focus on making classical Arabic accessible to modern learners.",
      socialMedia: {
        facebook: "https://facebook.com/ibrahim",
        twitter: "https://twitter.com/ibrahim",
        linkedin: "https://linkedin.com/in/ibrahim",
        website: "https://ibrahim.com",
      },
      totalStudents: 28,
      classes: ["Class 6", "Class 7"],
      attendance: 78,
      rating: 4.3,
      reviews: 56,
      salary: 32000,
      performance: "Average",
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPerformance, setFilterPerformance] = useState("All");

  // State for selected teacher
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form data for adding teacher
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    subject: "",
    department: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
    status: "Active",
    gender: "Male",
    dob: "",
    qualification: "",
    experience: "",
    specialization: "",
    bio: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      website: "",
    },
    totalStudents: 0,
    classes: [],
    attendance: 0,
    rating: 0,
    reviews: 0,
    salary: 0,
    performance: "Good",
  });

  // Available options
  const departments = [
    "Islamic Studies",
    "Islamic Law",
    "Arabic Language",
    "Quranic Sciences",
    "Tafsir",
    "Hadith",
    "Fiqh",
  ];
  const subjects = [
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
    "Arabic Grammar",
    "Quranic Sciences",
  ];
  const statuses = ["Active", "Inactive", "On Leave"];
  const genders = ["Male", "Female", "Other"];
  const performances = ["Excellent", "Good", "Average", "Poor"];
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

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

  // Save teachers to localStorage
  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

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
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get performance badge color
  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Average":
        return "bg-yellow-100 text-yellow-700";
      case "Poor":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 opacity-50"
                  : "text-gray-300"
            }
            size={12}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "All" || teacher.department === filterDepartment;
    const matchesStatus =
      filterStatus === "All" || teacher.status === filterStatus;
    const matchesPerformance =
      filterPerformance === "All" || teacher.performance === filterPerformance;
    return (
      matchesSearch && matchesDepartment && matchesStatus && matchesPerformance
    );
  });

  // Get unique values for filters
  const uniqueDepartments = [
    "All",
    ...new Set(teachers.map((t) => t.department)),
  ];
  const uniqueStatuses = ["All", ...new Set(teachers.map((t) => t.status))];
  const uniquePerformances = [
    "All",
    ...new Set(teachers.map((t) => t.performance)),
  ];

  // Calculate stats
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const totalStudents = teachers.reduce((sum, t) => sum + t.totalStudents, 0);
  const avgAttendance = Math.round(
    teachers.reduce((sum, t) => sum + t.attendance, 0) / teachers.length,
  );
  const avgRating =
    teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length;

  // Open details modal
  const openDetailsModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      name: "",
      teacherId: "",
      subject: "",
      department: "",
      email: "",
      phone: "",
      address: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
      gender: "Male",
      dob: "",
      qualification: "",
      experience: "",
      specialization: "",
      bio: "",
      socialMedia: {
        facebook: "",
        twitter: "",
        linkedin: "",
        website: "",
      },
      totalStudents: 0,
      classes: [],
      attendance: 0,
      rating: 0,
      reviews: 0,
      salary: 0,
      performance: "Good",
    });
    setShowAddModal(true);
  };

  // Handle add teacher
  const handleAddTeacher = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.subject ||
      !formData.department ||
      !formData.email ||
      !formData.phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newTeacher = {
      id: Date.now(),
      name: formData.name,
      teacherId:
        formData.teacherId ||
        `TCH${String(teachers.length + 1).padStart(3, "0")}`,
      subject: formData.subject,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || "",
      joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
      status: formData.status,
      gender: formData.gender,
      dob: formData.dob || "",
      qualification: formData.qualification || "",
      experience: formData.experience || "0 years",
      specialization: formData.specialization || "",
      bio: formData.bio || "",
      socialMedia: {
        facebook: formData.socialMedia?.facebook || "",
        twitter: formData.socialMedia?.twitter || "",
        linkedin: formData.socialMedia?.linkedin || "",
        website: formData.socialMedia?.website || "",
      },
      totalStudents: parseInt(formData.totalStudents) || 0,
      classes: formData.classes || [],
      attendance: parseInt(formData.attendance) || 0,
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      salary: parseInt(formData.salary) || 0,
      performance: formData.performance || "Good",
    };

    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Teacher Added!",
      text: `${formData.name} has been added successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete teacher
  const handleDeleteTeacher = (id) => {
    Swal.fire({
      title: "Delete Teacher?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTeachers(teachers.filter((t) => t.id !== id));
        Swal.fire("Deleted!", "Teacher has been deleted.", "success");
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

  // Get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Teacher Overview</h1>
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
                <FaChalkboardTeacher className="text-blue-600" /> Teacher
                Overview
              </h1>
              <p className="text-xs text-gray-500">
                Complete overview of all teachers and their performance
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Teacher
              </button>
              <button
                onClick={() => {
                  Swal.fire({
                    icon: "info",
                    title: "Export Report",
                    text: "Teacher report will be downloaded as PDF.",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                }}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaDownload size={12} /> Export
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalTeachers}</p>
              <p className="text-[10px] text-gray-500">Total Teachers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {activeTeachers}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {totalStudents}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {avgAttendance}%
              </p>
              <p className="text-[10px] text-gray-500">Avg Attendance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {avgRating.toFixed(1)}
              </p>
              <p className="text-[10px] text-gray-500">Avg Rating</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by name, ID, subject, department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
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
                <select
                  value={filterPerformance}
                  onChange={(e) => setFilterPerformance(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniquePerformances.map((perf) => (
                    <option key={perf} value={perf}>
                      {perf}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      teacher.status === "Active"
                        ? "bg-green-500"
                        : teacher.status === "On Leave"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 ${
                          teacher.performance === "Excellent"
                            ? "bg-gradient-to-r from-green-500 to-teal-500"
                            : teacher.performance === "Good"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                      >
                        {getInitials(teacher.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-semibold text-gray-800 text-xs truncate">
                            {teacher.name}
                          </h3>
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(teacher.status)}`}
                          >
                            {teacher.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500">
                          {teacher.teacherId} • {teacher.subject}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded-full ${getPerformanceColor(teacher.performance)}`}
                          >
                            {teacher.performance}
                          </span>
                          <span className="text-[8px] text-gray-400">•</span>
                          <span className="text-[8px] text-gray-400">
                            {teacher.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-1 text-center">
                      <div className="bg-gray-50 rounded-lg p-1">
                        <p className="text-[10px] font-bold text-blue-600">
                          {teacher.totalStudents}
                        </p>
                        <p className="text-[8px] text-gray-500">Students</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-1">
                        <p className="text-[10px] font-bold text-green-600">
                          {teacher.attendance}%
                        </p>
                        <p className="text-[8px] text-gray-500">Attendance</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-1">
                        <p className="text-[10px] font-bold text-yellow-600">
                          {teacher.classes.length}
                        </p>
                        <p className="text-[8px] text-gray-500">Classes</p>
                      </div>
                    </div>

                    <div className="mt-1.5">
                      <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                        <span>Rating</span>
                        {renderStars(teacher.rating)}
                      </div>
                      <div className="flex justify-between text-[8px] text-gray-500">
                        <span>Salary</span>
                        <span className="font-semibold">
                          ৳{teacher.salary.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                      <button
                        onClick={() => openDetailsModal(teacher)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                      >
                        <FaEye className="inline mr-1" size={10} /> View Profile
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            icon: "success",
                            title: "Email Sent!",
                            text: `Email sent to ${teacher.name}`,
                            timer: 1500,
                            showConfirmButton: false,
                          });
                        }}
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                        title="Send Email"
                      >
                        <FaEnvelopeIcon size={12} />
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            icon: "info",
                            title: "Call Teacher",
                            text: `Calling ${teacher.name} at ${teacher.phone}`,
                            timer: 1500,
                            showConfirmButton: false,
                          });
                        }}
                        className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50 transition-all"
                        title="Call"
                      >
                        <FaPhoneIcon size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                <FaChalkboardTeacher className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Teachers Found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add New Teacher
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher ID
                  </label>
                  <input
                    type="text"
                    value={formData.teacherId}
                    onChange={(e) =>
                      setFormData({ ...formData, teacherId: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
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
                    Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter qualification"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter specialization"
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
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) =>
                      setFormData({ ...formData, joinDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter salary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Performance
                  </label>
                  <select
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({ ...formData, performance: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {performances.map((perf) => (
                      <option key={perf} value={perf}>
                        {perf}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classes
                  </label>
                  <select
                    multiple
                    value={formData.classes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classes: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        ),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Hold Ctrl/Cmd to select multiple
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter teacher bio..."
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Social Media Links
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia?.facebook || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: {
                            ...formData.socialMedia,
                            facebook: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia?.twitter || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: {
                            ...formData.socialMedia,
                            twitter: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia?.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: {
                            ...formData.socialMedia,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia?.website || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: {
                            ...formData.socialMedia,
                            website: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Teacher
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

      {/* Teacher Details Modal */}
      {showDetailsModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserCircle className="text-blue-600" /> Teacher Profile
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold ${
                    selectedTeacher.performance === "Excellent"
                      ? "bg-gradient-to-r from-green-500 to-teal-500"
                      : selectedTeacher.performance === "Good"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                  }`}
                >
                  {getInitials(selectedTeacher.name)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedTeacher.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedTeacher.status)}`}
                    >
                      {selectedTeacher.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(selectedTeacher.performance)}`}
                    >
                      {selectedTeacher.performance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedTeacher.teacherId} • {selectedTeacher.subject}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 justify-center md:justify-start">
                    <span>📧 {selectedTeacher.email}</span>
                    <span>📱 {selectedTeacher.phone}</span>
                    <span>🏛️ {selectedTeacher.department}</span>
                    <span>📚 {selectedTeacher.experience}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                    {renderStars(selectedTeacher.rating)}
                    <span className="text-sm text-gray-500">
                      ({selectedTeacher.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaAddressCard className="text-blue-500" /> Personal
                    Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full Name</span>
                      <span className="font-semibold">
                        {selectedTeacher.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Teacher ID</span>
                      <span className="font-semibold">
                        {selectedTeacher.teacherId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-semibold">
                        {selectedTeacher.gender}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date of Birth</span>
                      <span className="font-semibold">
                        {formatDate(selectedTeacher.dob)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-semibold">
                        {selectedTeacher.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Join Date</span>
                      <span className="font-semibold">
                        {formatDate(selectedTeacher.joinDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaGraduationCap className="text-green-500" /> Professional
                    Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Qualification</span>
                      <span className="font-semibold">
                        {selectedTeacher.qualification}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience</span>
                      <span className="font-semibold">
                        {selectedTeacher.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Specialization</span>
                      <span className="font-semibold">
                        {selectedTeacher.specialization}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Department</span>
                      <span className="font-semibold">
                        {selectedTeacher.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subjects</span>
                      <span className="font-semibold">
                        {selectedTeacher.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Classes</span>
                      <span className="font-semibold">
                        {selectedTeacher.classes.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 text-xs mb-2">
                      Social Media
                    </h4>
                    <div className="flex gap-2">
                      {selectedTeacher.socialMedia?.facebook && (
                        <a
                          href={selectedTeacher.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaFacebook size={18} />
                        </a>
                      )}
                      {selectedTeacher.socialMedia?.twitter && (
                        <a
                          href={selectedTeacher.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <FaTwitter size={18} />
                        </a>
                      )}
                      {selectedTeacher.socialMedia?.linkedin && (
                        <a
                          href={selectedTeacher.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900"
                        >
                          <FaLinkedin size={18} />
                        </a>
                      )}
                      {selectedTeacher.socialMedia?.website && (
                        <a
                          href={selectedTeacher.socialMedia.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <FaGlobeIcon size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedTeacher.bio && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">
                    Bio
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedTeacher.bio}
                  </p>
                </div>
              )}

              {/* Performance Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">
                  Performance Stats
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {selectedTeacher.totalStudents}
                    </p>
                    <p className="text-[10px] text-gray-500">Total Students</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-600">
                      {selectedTeacher.attendance}%
                    </p>
                    <p className="text-[10px] text-gray-500">Attendance</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-yellow-600">
                      {selectedTeacher.classes.length}
                    </p>
                    <p className="text-[10px] text-gray-500">Classes</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-purple-600">
                      ৳{selectedTeacher.salary.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-500">Monthly Salary</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    Swal.fire({
                      icon: "success",
                      title: "Profile Downloaded!",
                      text: "Teacher profile has been downloaded as PDF.",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaDownload className="inline mr-2" /> Download Profile
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Email Sent!",
                      text: `Email sent to ${selectedTeacher.name}`,
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaEnvelopeIcon className="inline mr-2" /> Send Email
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

export default Teacher_overview;
