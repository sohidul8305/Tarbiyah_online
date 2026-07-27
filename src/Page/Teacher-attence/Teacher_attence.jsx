// src/Page/Admin/Teacher_attence.jsx
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

const Teacher_attence = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("teacher-attendance");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Current date
  const today = new Date().toISOString().split("T")[0];

  // Teachers list
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. Muhammad Abdullah",
      teacherId: "TCH001",
      subject: "Tajweed",
      department: "Islamic Studies",
      phone: "+880 1712 345678",
      email: "abdullah@example.com",
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Ustadh Ahmad Ali",
      teacherId: "TCH002",
      subject: "Tafsir",
      department: "Islamic Studies",
      phone: "+880 1723 456789",
      email: "ahmad@example.com",
      joinDate: "2024-02-01",
      status: "Active",
    },
    {
      id: 3,
      name: "Ustadha Fatima Rahman",
      teacherId: "TCH003",
      subject: "Hadith",
      department: "Islamic Studies",
      phone: "+880 1734 567890",
      email: "fatima@example.com",
      joinDate: "2024-01-20",
      status: "Active",
    },
    {
      id: 4,
      name: "Dr. Omar Farooq",
      teacherId: "TCH004",
      subject: "Fiqh",
      department: "Islamic Law",
      phone: "+880 1745 678901",
      email: "omar@example.com",
      joinDate: "2024-03-10",
      status: "Active",
    },
    {
      id: 5,
      name: "Ustadh Yusuf Khan",
      teacherId: "TCH005",
      subject: "Aqeedah",
      department: "Islamic Studies",
      phone: "+880 1756 789012",
      email: "yusuf@example.com",
      joinDate: "2024-04-05",
      status: "Active",
    },
    {
      id: 6,
      name: "Ustadh Ibrahim Malik",
      teacherId: "TCH006",
      subject: "Arabic Grammar",
      department: "Arabic Language",
      phone: "+880 1767 890123",
      email: "ibrahim@example.com",
      joinDate: "2024-05-01",
      status: "Inactive",
    },
  ]);

  // Attendance records
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("teacherAttendance");
    if (saved) {
      return JSON.parse(saved);
    }
    // Generate some sample attendance data
    const records = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      // Skip Fridays
      if (date.getDay() === 5) continue;

      teachers.forEach((teacher) => {
        const statuses = [
          "Present",
          "Present",
          "Present",
          "Present",
          "Absent",
          "Late",
          "Leave",
        ];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];
        records.push({
          id: `${dateStr}-${teacher.id}`,
          teacherId: teacher.id,
          date: dateStr,
          status: randomStatus,
          checkIn:
            randomStatus === "Present" || randomStatus === "Late"
              ? `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "AM"}`
              : null,
          checkOut:
            randomStatus === "Present" || randomStatus === "Late"
              ? `${3 + Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")} ${Math.random() > 0.5 ? "PM" : "PM"}`
              : null,
          note:
            randomStatus === "Late"
              ? "Arrived 15 minutes late"
              : randomStatus === "Absent"
                ? "No notification"
                : "",
        });
      });
    }
    return records;
  });

  // State for current date selection
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [markStatus, setMarkStatus] = useState("Present");
  const [markNote, setMarkNote] = useState("");

  // State for view mode
  const [viewMode, setViewMode] = useState("daily");

  // Form data for add attendance
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    date: "",
    status: "Present",
    checkIn: "",
    checkOut: "",
    note: "",
  });

  // Available options
  const statuses = ["Present", "Absent", "Late", "Leave"];

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

  // Save attendance records to localStorage
  useEffect(() => {
    localStorage.setItem(
      "teacherAttendance",
      JSON.stringify(attendanceRecords),
    );
  }, [attendanceRecords]);

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

  // Get attendance for a specific teacher on a specific date
  const getTeacherAttendance = (teacherId, date) => {
    return attendanceRecords.find(
      (record) => record.teacherId === teacherId && record.date === date,
    );
  };

  // Get attendance for a teacher for a specific month
  const getTeacherMonthlyAttendance = (teacherId, month, year) => {
    return attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        record.teacherId === teacherId &&
        recordDate.getMonth() === month &&
        recordDate.getFullYear() === year
      );
    });
  };

  // Get attendance status color
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

  // Get attendance status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <FaCheck className="text-green-500" />;
      case "Absent":
        return <FaTimes className="text-red-500" />;
      case "Late":
        return <FaClockIcon className="text-yellow-500" />;
      case "Leave":
        return <FaCalendarDay className="text-blue-500" />;
      default:
        return <FaQuestion className="text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
      >
        {getStatusIcon(status)}
        {status}
      </span>
    );
  };

  // Handle mark attendance (existing functionality)
  const handleMarkAttendance = (teacher) => {
    setSelectedTeacher(teacher);
    const existing = getTeacherAttendance(teacher.id, selectedDate);
    if (existing) {
      setMarkStatus(existing.status);
      setMarkNote(existing.note || "");
    } else {
      setMarkStatus("Present");
      setMarkNote("");
    }
    setShowMarkModal(true);
  };

  // Save attendance (existing functionality)
  const saveAttendance = () => {
    if (!selectedTeacher) return;

    const existing = getTeacherAttendance(selectedTeacher.id, selectedDate);

    if (existing) {
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record.id === existing.id
            ? {
                ...record,
                status: markStatus,
                note: markNote,
                checkIn:
                  markStatus === "Present" || markStatus === "Late"
                    ? "09:00 AM"
                    : null,
                checkOut:
                  markStatus === "Present" || markStatus === "Late"
                    ? "04:00 PM"
                    : null,
              }
            : record,
        ),
      );
    } else {
      const newRecord = {
        id: `${selectedDate}-${selectedTeacher.id}`,
        teacherId: selectedTeacher.id,
        date: selectedDate,
        status: markStatus,
        checkIn:
          markStatus === "Present" || markStatus === "Late" ? "09:00 AM" : null,
        checkOut:
          markStatus === "Present" || markStatus === "Late" ? "04:00 PM" : null,
        note: markNote,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }

    setShowMarkModal(false);
    Swal.fire({
      icon: "success",
      title: "Attendance Marked!",
      text: `${selectedTeacher.name} marked as ${markStatus}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Open add modal for new attendance
  const openAddModal = () => {
    setFormData({
      teacherId: "",
      teacherName: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      checkIn: "",
      checkOut: "",
      note: "",
    });
    setShowAddModal(true);
  };

  // Handle add attendance
  const handleAddAttendance = (e) => {
    e.preventDefault();

    if (!formData.teacherId || !formData.date) {
      Swal.fire({
        icon: "warning",
        title: "Please select teacher and date",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const teacher = teachers.find((t) => t.id === parseInt(formData.teacherId));
    if (!teacher) {
      Swal.fire({
        icon: "error",
        title: "Teacher not found",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    // Check if attendance already exists for this teacher on this date
    const existing = getTeacherAttendance(teacher.id, formData.date);
    if (existing) {
      Swal.fire({
        icon: "warning",
        title: "Attendance Already Exists",
        text: `${teacher.name} already has attendance marked for ${formatDate(formData.date)}`,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const newRecord = {
      id: `${formData.date}-${teacher.id}`,
      teacherId: teacher.id,
      date: formData.date,
      status: formData.status,
      checkIn:
        formData.status !== "Absent" ? formData.checkIn || "09:00 AM" : null,
      checkOut:
        formData.status !== "Absent" ? formData.checkOut || "04:00 PM" : null,
      note: formData.note || "",
    };

    setAttendanceRecords([...attendanceRecords, newRecord]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Attendance Added!",
      text: `${teacher.name} marked as ${formData.status} for ${formatDate(formData.date)}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Calculate attendance statistics
  const calculateStats = (teacherId) => {
    const monthRecords = getTeacherMonthlyAttendance(
      teacherId,
      selectedMonth,
      selectedYear,
    );
    const total = monthRecords.length;
    const present = monthRecords.filter((r) => r.status === "Present").length;
    const absent = monthRecords.filter((r) => r.status === "Absent").length;
    const late = monthRecords.filter((r) => r.status === "Late").length;
    const leave = monthRecords.filter((r) => r.status === "Leave").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, late, leave, percentage };
  };

  // Get filtered teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "All" || teacher.subject === filterSubject;
    const matchesDepartment =
      filterDepartment === "All" || teacher.department === filterDepartment;
    return matchesSearch && matchesSubject && matchesDepartment;
  });

  // Get unique values for filters
  const uniqueSubjects = ["All", ...new Set(teachers.map((t) => t.subject))];
  const uniqueDepartments = [
    "All",
    ...new Set(teachers.map((t) => t.department)),
  ];

  // Get month name
  const getMonthName = (month) => {
    const names = [
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
    return names[month];
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle month change
  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  // Calculate daily summary
  const getDailySummary = () => {
    const records = attendanceRecords.filter((r) => r.date === selectedDate);
    const total = records.length;
    const present = records.filter((r) => r.status === "Present").length;
    const absent = records.filter((r) => r.status === "Absent").length;
    const late = records.filter((r) => r.status === "Late").length;
    const leave = records.filter((r) => r.status === "Leave").length;
    return { total, present, absent, late, leave };
  };

  const dailySummary = getDailySummary();

  // Handle view details
  const viewTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Teacher Attendance
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
                <FaClipboardCheck className="text-blue-600" /> Teacher
                Attendance
              </h1>
              <p className="text-xs text-gray-500">
                Mark and manage teacher attendance
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Add Attendance Button - This is the button you need */}
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-md flex items-center gap-2"
              >
                <FaPlus size={14} /> Add Attendance
              </button>
              <button
                onClick={() =>
                  setViewMode(viewMode === "daily" ? "monthly" : "daily")
                }
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1"
              >
                {viewMode === "daily" ? (
                  <>
                    <FaCalendarWeek size={12} /> Monthly View
                  </>
                ) : (
                  <>
                    <FaCalendarDay size={12} /> Daily View
                  </>
                )}
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

          {/* Date Selector & Summary */}
          {viewMode === "daily" ? (
            <>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-gray-500">
                      {formatDate(selectedDate)}
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-600">
                        ✓ {dailySummary.present}
                      </span>
                      <span className="text-red-600">
                        ✗ {dailySummary.absent}
                      </span>
                      <span className="text-yellow-600">
                        ⏰ {dailySummary.late}
                      </span>
                      <span className="text-blue-600">
                        📅 {dailySummary.leave}
                      </span>
                      <span className="text-gray-400">
                        | Total: {dailySummary.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <select
                      value={filterSubject}
                      onChange={(e) => setFilterSubject(e.target.value)}
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {uniqueSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
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
                  </div>
                </div>
              </div>

              {/* Teachers Attendance List */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[calc(100vh-420px)] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          #
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Teacher
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                          Subject
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                          Department
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                          Check In
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                          Check Out
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher, index) => {
                          const attendance = getTeacherAttendance(
                            teacher.id,
                            selectedDate,
                          );
                          return (
                            <tr
                              key={teacher.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-3 py-2 font-medium text-gray-500">
                                {index + 1}
                              </td>
                              <td className="px-3 py-2">
                                <div className="font-medium text-gray-800">
                                  {teacher.name}
                                </div>
                                <div className="text-[10px] text-gray-400">
                                  {teacher.teacherId}
                                </div>
                              </td>
                              <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                                {teacher.subject}
                              </td>
                              <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                                {teacher.department}
                              </td>
                              <td className="px-3 py-2">
                                {attendance ? (
                                  getStatusBadge(attendance.status)
                                ) : (
                                  <span className="text-gray-400 text-[10px]">
                                    Not Marked
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                                {attendance?.checkIn || "-"}
                              </td>
                              <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                                {attendance?.checkOut || "-"}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() =>
                                      handleMarkAttendance(teacher)
                                    }
                                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-all"
                                    title="Mark Attendance"
                                  >
                                    <FaClipboardCheck size={14} />
                                  </button>
                                  <button
                                    onClick={() => viewTeacherDetails(teacher)}
                                    className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                                    title="View Details"
                                  >
                                    <FaEye size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-3 py-8 text-center text-gray-500"
                          >
                            <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-2" />
                            <p>No teachers found</p>
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
            </>
          ) : (
            // Monthly View
            <div className="space-y-3">
              {/* Month Selector */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex items-center justify-between">
                <button
                  onClick={() => handleMonthChange("prev")}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <h3 className="text-base font-bold text-gray-800">
                  {getMonthName(selectedMonth)} {selectedYear}
                </h3>
                <button
                  onClick={() => handleMonthChange("next")}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaArrowRight />
                </button>
              </div>

              {/* Monthly Attendance Table */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[calc(100vh-300px)] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-2 py-2 text-left font-semibold text-gray-600">
                          Teacher
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          Total
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-green-600">
                          Present
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-red-600">
                          Absent
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-yellow-600">
                          Late
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-blue-600">
                          Leave
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          %
                        </th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teachers.map((teacher) => {
                        const stats = calculateStats(teacher.id);
                        return (
                          <tr
                            key={teacher.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-2 py-2">
                              <div className="font-medium text-gray-800 text-xs">
                                {teacher.name}
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {teacher.teacherId}
                              </div>
                            </td>
                            <td className="px-2 py-2 text-center font-medium">
                              {stats.total}
                            </td>
                            <td className="px-2 py-2 text-center text-green-600 font-medium">
                              {stats.present}
                            </td>
                            <td className="px-2 py-2 text-center text-red-600 font-medium">
                              {stats.absent}
                            </td>
                            <td className="px-2 py-2 text-center text-yellow-600 font-medium">
                              {stats.late}
                            </td>
                            <td className="px-2 py-2 text-center text-blue-600 font-medium">
                              {stats.leave}
                            </td>
                            <td className="px-2 py-2 text-center font-bold">
                              {stats.percentage}%
                            </td>
                            <td className="px-2 py-2 text-center">
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto">
                                <div
                                  className={`h-full rounded-full ${
                                    stats.percentage >= 85
                                      ? "bg-green-500"
                                      : stats.percentage >= 70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${stats.percentage}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Attendance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Attendance Record
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAttendance} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher *
                </label>
                <select
                  required
                  value={formData.teacherId}
                  onChange={(e) => {
                    const teacherId = e.target.value;
                    const teacher = teachers.find(
                      (t) => t.id === parseInt(teacherId),
                    );
                    setFormData({
                      ...formData,
                      teacherId: teacherId,
                      teacherName: teacher ? teacher.name : "",
                    });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.teacherId}) - {teacher.subject}
                    </option>
                  ))}
                </select>
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, status: status })
                      }
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.status === status
                          ? `${getStatusColor(status)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 09:00 AM"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 04:00 PM"
                    />
                  </div>
                </div>
              )}

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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add note..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Attendance
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

      {/* Mark Attendance Modal */}
      {showMarkModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FaClipboardCheck className="text-blue-600" /> Mark Attendance
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{selectedTeacher.name}</span>
                  <span className="text-gray-400 ml-2">
                    ({selectedTeacher.teacherId})
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Date: {formatDate(selectedDate)}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Present", "Absent", "Late", "Leave"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setMarkStatus(status)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        markStatus === status
                          ? `${getStatusColor(status)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={markNote}
                  onChange={(e) => setMarkNote(e.target.value)}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a note..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveAttendance}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaSave className="inline mr-2" /> Save
                </button>
                <button
                  onClick={() => setShowMarkModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Details Modal */}
      {showDetailsModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-blue-600" /> Teacher Attendance
                Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedTeacher.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedTeacher.teacherId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedTeacher.subject}</span>
                    <span>🏛️ {selectedTeacher.department}</span>
                    <span>📱 {selectedTeacher.phone}</span>
                  </div>
                </div>
              </div>

              {/* Monthly Stats */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">
                  Monthly Attendance Summary ({getMonthName(selectedMonth)}{" "}
                  {selectedYear})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {(() => {
                    const stats = calculateStats(selectedTeacher.id);
                    return (
                      <>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-gray-700">
                            {stats.total}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Total Days
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-green-600">
                            {stats.present}
                          </p>
                          <p className="text-[10px] text-gray-500">Present</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-red-600">
                            {stats.absent}
                          </p>
                          <p className="text-[10px] text-gray-500">Absent</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-yellow-600">
                            {stats.late}
                          </p>
                          <p className="text-[10px] text-gray-500">Late</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-blue-600">
                            {stats.leave}
                          </p>
                          <p className="text-[10px] text-gray-500">Leave</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Recent Attendance */}
              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">
                  Recent Attendance Records
                </h4>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 text-left">Date</th>
                        <th className="px-2 py-1 text-left">Status</th>
                        <th className="px-2 py-1 text-left">Check In</th>
                        <th className="px-2 py-1 text-left">Check Out</th>
                        <th className="px-2 py-1 text-left">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attendanceRecords
                        .filter((r) => r.teacherId === selectedTeacher.id)
                        .sort((a, b) => b.date.localeCompare(a.date))
                        .slice(0, 10)
                        .map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-2 py-1.5">
                              {formatDate(record.date)}
                            </td>
                            <td className="px-2 py-1.5">
                              {getStatusBadge(record.status)}
                            </td>
                            <td className="px-2 py-1.5 text-gray-600">
                              {record.checkIn || "-"}
                            </td>
                            <td className="px-2 py-1.5 text-gray-600">
                              {record.checkOut || "-"}
                            </td>
                            <td className="px-2 py-1.5 text-gray-500 text-[10px]">
                              {record.note || "-"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleMarkAttendance(selectedTeacher);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaClipboardCheck className="inline mr-2" /> Mark Attendance
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

export default Teacher_attence;
