// src/Page/Admin/Today_class.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Today_class = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  const [todayClasses, setTodayClasses] = useState([
    {
      id: 1,
      name: "Tajweed - Beginner Level",
      subject: "Tajweed",
      class: "Class 8",
      teacher: "Ustadh Ahmad",
      time: "09:00 AM - 10:00 AM",
      days: ["Monday", "Wednesday"],
      room: "Room 101",
      students: 30,
      status: "Ongoing",
      link: "https://meet.google.com/abc-defg-hij",
      department: "Islamic Studies",
      attendance: 25,
      totalStudents: 30,
    },
    {
      id: 2,
      name: "Tafsir - Quranic Studies",
      subject: "Tafsir",
      class: "Class 9",
      teacher: "Ustadh Muhammad",
      time: "11:00 AM - 12:00 PM",
      days: ["Tuesday", "Thursday"],
      room: "Room 102",
      students: 25,
      status: "Upcoming",
      link: "https://meet.google.com/klm-nopq-rst",
      department: "Islamic Studies",
      attendance: 0,
      totalStudents: 25,
    },
    {
      id: 3,
      name: "Hadith - Sahih Bukhari",
      subject: "Hadith",
      class: "Class 10",
      teacher: "Ustadh Abdullah",
      time: "10:00 AM - 11:30 AM",
      days: ["Saturday", "Sunday"],
      room: "Room 103",
      students: 28,
      status: "Completed",
      link: "https://meet.google.com/xyz-uvwx-yz",
      department: "Islamic Studies",
      attendance: 28,
      totalStudents: 28,
    },
    {
      id: 4,
      name: "Fiqh - Islamic Jurisprudence",
      subject: "Fiqh",
      class: "Class 7",
      teacher: "Ustadh Yusuf",
      time: "02:00 PM - 03:00 PM",
      days: ["Monday", "Wednesday"],
      room: "Room 104",
      students: 20,
      status: "Upcoming",
      link: "https://meet.google.com/abc-xyz-123",
      department: "Islamic Studies",
      attendance: 0,
      totalStudents: 20,
    },
    {
      id: 5,
      name: "Arabic Grammar (Nahu)",
      subject: "Arabic Language",
      class: "Class 6",
      teacher: "Ustadhah Fatima",
      time: "09:00 AM - 10:30 AM",
      days: ["Tuesday", "Thursday"],
      room: "Room 105",
      students: 22,
      status: "Ongoing",
      link: "https://meet.google.com/def-ghi-456",
      department: "Arabic Language",
      attendance: 18,
      totalStudents: 22,
    },
    {
      id: 6,
      name: "Quran Memorization",
      subject: "Quran Studies",
      class: "Class 8",
      teacher: "Hafiz Umar",
      time: "08:00 AM - 09:00 AM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
      room: "Room 106",
      students: 35,
      status: "Completed",
      link: "https://meet.google.com/ghi-jkl-789",
      department: "Quran Studies",
      attendance: 35,
      totalStudents: 35,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

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

  // Handle search and filter
  const filteredClasses = todayClasses.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || cls.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "All" || cls.department === filterDepartment;
    const matchesClass = filterClass === "All" || cls.class === filterClass;
    return matchesSearch && matchesStatus && matchesDepartment && matchesClass;
  });

  // Get unique values for filters
  const uniqueDepartments = [
    "All",
    ...new Set(todayClasses.map((c) => c.department)),
  ];
  const uniqueClasses = ["All", ...new Set(todayClasses.map((c) => c.class))];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <FaCheckCircle className="text-green-500" size={14} />;
      case "Upcoming":
        return <FaClockIcon className="text-yellow-500" size={14} />;
      case "Completed":
        return <FaCheckCircle className="text-blue-500" size={14} />;
      default:
        return <FaTimesCircle className="text-red-500" size={14} />;
    }
  };

  // Open details modal
  const openDetailsModal = (cls) => {
    setSelectedClass(cls);
    setShowDetailsModal(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Today's Classes</h1>
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
                              setActiveSubMenu(item.id);
                              setIsSidebarOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d] transition-all"
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
                <FaCalendarAlt className="text-purple-600" /> Today's Classes
              </h1>
              <p className="text-xs text-gray-500">
                View and manage today's class schedule
              </p>
            </div>
            <div className="flex items-center gap-2">
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {todayClasses.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Classes</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {todayClasses.filter((c) => c.status === "Ongoing").length}
              </p>
              <p className="text-[10px] text-gray-500">Ongoing</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {todayClasses.filter((c) => c.status === "Upcoming").length}
              </p>
              <p className="text-[10px] text-gray-500">Upcoming</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {todayClasses.filter((c) => c.status === "Completed").length}
              </p>
              <p className="text-[10px] text-gray-500">Completed</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {todayClasses.reduce((sum, c) => sum + c.attendance, 0)}/
                {todayClasses.reduce((sum, c) => sum + c.totalStudents, 0)}
              </p>
              <p className="text-[10px] text-gray-500">Total Attendance</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
            {filteredClasses.slice(0, 6).map((cls) => (
              <div
                key={cls.id}
                className={`bg-white border ${
                  cls.status === "Ongoing"
                    ? "border-green-300 shadow-md"
                    : cls.status === "Upcoming"
                      ? "border-yellow-300"
                      : cls.status === "Completed"
                        ? "border-blue-300"
                        : "border-gray-200"
                } rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden`}
              >
                <div
                  className={`h-1 ${
                    cls.status === "Ongoing"
                      ? "bg-green-500"
                      : cls.status === "Upcoming"
                        ? "bg-yellow-500"
                        : cls.status === "Completed"
                          ? "bg-blue-500"
                          : "bg-red-500"
                  }`}
                ></div>
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-xs mb-0.5 line-clamp-2">
                        {cls.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">{cls.subject}</p>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(cls.status)}`}
                    >
                      {cls.status}
                    </span>
                  </div>

                  <div className="mt-1.5 space-y-0.5 text-[10px]">
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaChalkboardTeacher
                        className="text-gray-400"
                        size={10}
                      />{" "}
                      {cls.teacher}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaClockIcon className="text-gray-400" size={10} />{" "}
                      {cls.time}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaUsers className="text-gray-400" size={10} />{" "}
                      {cls.students} Students
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaBook className="text-gray-400" size={10} /> {cls.class}
                    </p>
                  </div>

                  {/* Attendance Progress */}
                  <div className="mt-1.5">
                    <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                      <span>Attendance</span>
                      <span>
                        {cls.attendance}/{cls.totalStudents}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          (cls.attendance / cls.totalStudents) * 100 >= 80
                            ? "bg-green-500"
                            : (cls.attendance / cls.totalStudents) * 100 >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{
                          width: `${(cls.attendance / cls.totalStudents) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                    <a
                      href={cls.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        cls.status === "Ongoing"
                          ? "bg-green-600 hover:bg-green-700"
                          : cls.status === "Upcoming"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-blue-600 hover:bg-blue-700"
                      } text-white text-[8px] font-medium flex-1 text-center py-1 rounded transition-all flex items-center justify-center gap-0.5`}
                    >
                      <FaLink size={10} /> Join Class
                    </a>
                    <button
                      onClick={() => openDetailsModal(cls)}
                      className="text-blue-600 hover:text-blue-800 p-0.5 rounded hover:bg-blue-50 transition-all"
                      title="View Details"
                    >
                      <FaEye size={12} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 p-0.5 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredClasses.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Classes Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Class Details Modal */}
      {showDetailsModal && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-600" /> Class Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedClass.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedClass.subject} • {selectedClass.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedClass.status)}`}
                    >
                      {getStatusIcon(selectedClass.status)}{" "}
                      {selectedClass.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teacher</p>
                    <p className="font-semibold">{selectedClass.teacher}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-semibold">{selectedClass.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Room</p>
                    <p className="font-semibold">{selectedClass.room}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="font-semibold">{selectedClass.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Meeting Link</p>
                    <a
                      href={selectedClass.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1"
                    >
                      <FaLink /> Join Class
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Class Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Students</span>
                        <span className="font-semibold">
                          {selectedClass.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Present</span>
                        <span className="font-semibold text-green-600">
                          {selectedClass.attendance}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Absent</span>
                        <span className="font-semibold text-red-600">
                          {selectedClass.totalStudents -
                            selectedClass.attendance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Attendance Rate
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            (selectedClass.attendance /
                              selectedClass.totalStudents) *
                              100 >=
                            80
                              ? "bg-green-500"
                              : (selectedClass.attendance /
                                    selectedClass.totalStudents) *
                                    100 >=
                                  50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width: `${(selectedClass.attendance / selectedClass.totalStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {Math.round(
                          (selectedClass.attendance /
                            selectedClass.totalStudents) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={selectedClass.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 ${
                        selectedClass.status === "Ongoing"
                          ? "bg-green-600 hover:bg-green-700"
                          : selectedClass.status === "Upcoming"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-blue-600 hover:bg-blue-700"
                      } text-white px-4 py-2 rounded-lg font-semibold text-sm text-center transition-all`}
                    >
                      <FaLink className="inline mr-2" /> Join Class
                    </a>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Today_class;
