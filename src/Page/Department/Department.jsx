// src/Page/Department/Department.jsx
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
  FaClock,
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Department = () => {
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

  const [departments] = useState([
    {
      id: 1,
      name: "Diploma in Islamic Studies",
      code: "DIS-101",
      description:
        "Comprehensive diploma program covering Islamic theology, jurisprudence, spirituality, and Quranic studies",
      head: "Dr. Muhammad Abdullah",
      totalStudents: 156,
      totalTeachers: 12,
      totalCourses: 8,
      status: "Active",
      courses: [
        {
          id: 1,
          name: "Diploma in Islamic Studies",
          code: "DIS-101",
          students: 30,
          teacher: "Ustadh Ahmad",
          duration: "1 Year",
          price: 12000,
        },
        {
          id: 2,
          name: "Advanced Islamic Studies",
          code: "DIS-201",
          students: 25,
          teacher: "Ustadh Muhammad",
          duration: "2 Years",
          price: 20000,
        },
      ],
    },
    {
      id: 2,
      name: "Tarbiyah Alimiyah",
      code: "TA-101",
      description:
        "Comprehensive Alimiyah program for deep understanding of Islamic sciences, Arabic language, and Quranic studies",
      head: "Maulana Abdul Karim",
      totalStudents: 98,
      totalTeachers: 10,
      totalCourses: 6,
      status: "Active",
      courses: [
        {
          id: 3,
          name: "Alimiyah for Kids",
          code: "TA-101",
          students: 22,
          teacher: "Ustadhah Fatima",
          duration: "6 Months",
          price: 8000,
        },
        {
          id: 4,
          name: "Alimiyah Program",
          code: "TA-201",
          students: 18,
          teacher: "Maulana Ibrahim",
          duration: "2 Years",
          price: 20000,
        },
      ],
    },
    {
      id: 3,
      name: "Tarbiyah Quran Studies",
      code: "TQS-101",
      description:
        "Specialized Quran program focusing on memorization (Hifz), recitation (Tajweed), and understanding (Tafsir)",
      head: "Hafiz Umar Farooq",
      totalStudents: 112,
      totalTeachers: 10,
      totalCourses: 7,
      status: "Active",
      courses: [
        {
          id: 5,
          name: "Qaida Noorani",
          code: "TQS-101",
          students: 35,
          teacher: "Qari Yusuf",
          duration: "2 Months",
          price: 3000,
        },
        {
          id: 6,
          name: "Nazera",
          code: "TQS-201",
          students: 28,
          teacher: "Qari Hasan",
          duration: "3 Months",
          price: 4000,
        },
        {
          id: 7,
          name: "Hifzul Quran",
          code: "TQS-301",
          students: 20,
          teacher: "Hafiz Umar",
          duration: "2 Years",
          price: 25000,
        },
        {
          id: 8,
          name: "Hifz Revision (One to One)",
          code: "TQS-401",
          students: 15,
          teacher: "Hafiz Abdullah",
          duration: "6 Months",
          price: 10000,
        },
      ],
    },
    {
      id: 4,
      name: "Quran for Elders",
      code: "QFE-101",
      description:
        "Dedicated Quran program for elders focusing on easy learning methods, Tajweed, and Quranic understanding",
      head: "Dr. Hasan Ali",
      totalStudents: 85,
      totalTeachers: 6,
      totalCourses: 5,
      status: "Active",
      courses: [
        {
          id: 9,
          name: "Qaida Nooraniya",
          code: "QFE-101",
          students: 25,
          teacher: "Ustadh Hasan",
          duration: "2 Months",
          price: 3000,
        },
        {
          id: 10,
          name: "Quran Nazera",
          code: "QFE-201",
          students: 20,
          teacher: "Qari Ayesha",
          duration: "3 Months",
          price: 4000,
        },
        {
          id: 11,
          name: "Hifzul Quran",
          code: "QFE-301",
          students: 15,
          teacher: "Hafiz Khalid",
          duration: "2 Years",
          price: 20000,
        },
        {
          id: 12,
          name: "Basic Tajweed (Level-1)",
          code: "QFE-401",
          students: 18,
          teacher: "Ustadh Mahmud",
          duration: "2 Months",
          price: 3000,
        },
        {
          id: 13,
          name: "Advanced Tajweed",
          code: "QFE-501",
          students: 12,
          teacher: "Qari Rashid",
          duration: "3 Months",
          price: 5000,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showCoursesModal, setShowCoursesModal] = useState(false);

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

  // Sidebar Menu Items with all links
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

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Open courses modal
  const openCoursesModal = (dept) => {
    setSelectedDepartment(dept);
    setShowCoursesModal(true);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Departments</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar - No Scroll */}
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
          {/* Sidebar Header */}
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

          {/* Navigation Menu - No Scroll */}
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

            {/* Logout Button */}
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

        {/* Main Content - Full Screen */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaBuilding className="text-blue-600" /> Department Management
              </h1>
              <p className="text-xs text-gray-500">
                Manage all departments and their courses
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

          {/* Search */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    icon: "success",
                    title: "Department Added!",
                    text: "New department has been created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <FaPlusCircle size={12} /> Add Department
              </button>
            </div>
          </div>

          {/* Departments Grid - 4 Departments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 h-[calc(100vh-240px)] overflow-hidden">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div
                  className={`h-1 ${dept.id === 1 ? "bg-blue-500" : dept.id === 2 ? "bg-green-500" : dept.id === 3 ? "bg-purple-500" : "bg-orange-500"}`}
                ></div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {dept.id === 1 ? (
                            <FaUniversity className="text-blue-500" />
                          ) : dept.id === 2 ? (
                            <FaGlobe className="text-green-500" />
                          ) : dept.id === 3 ? (
                            <FaBookOpen className="text-purple-500" />
                          ) : (
                            <FaGraduationCap className="text-orange-500" />
                          )}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {dept.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {dept.code}
                      </p>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(dept.status)}`}
                    >
                      {dept.status}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-600 mt-2 line-clamp-2 flex-1">
                    {dept.description}
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <p className="text-xs font-bold text-blue-600">
                        {dept.totalStudents}
                      </p>
                      <p className="text-[8px] text-gray-500">Students</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <p className="text-xs font-bold text-green-600">
                        {dept.totalTeachers}
                      </p>
                      <p className="text-[8px] text-gray-500">Teachers</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1.5">
                      <p className="text-xs font-bold text-purple-600">
                        {dept.totalCourses}
                      </p>
                      <p className="text-[8px] text-gray-500">Courses</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-[8px] text-gray-400">
                      Head: {dept.head}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => openCoursesModal(dept)}
                      className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      View Courses ({dept.courses.length})
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDepartments.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <FaBuilding className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Departments Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Courses Modal */}
      {showCoursesModal && selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaBookOpen className="text-blue-600" />
                {selectedDepartment.name} - Courses
              </h3>
              <button
                onClick={() => setShowCoursesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Department Head:</span>{" "}
                  {selectedDepartment.head}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Total Courses:</span>{" "}
                  {selectedDepartment.totalCourses}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Total Students:</span>{" "}
                  {selectedDepartment.totalStudents}
                </p>
              </div>

              <div className="space-y-2">
                {selectedDepartment.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {course.name}
                        </h4>
                        <p className="text-xs text-gray-500">{course.code}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {course.students} Students
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>👨‍🏫 {course.teacher}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 pt-2 border-t border-gray-100">
                      <button className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <FaEdit size={12} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Course Added!",
                      text: "New course has been added to this department.",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1"
                >
                  <FaPlusCircle size={14} /> Add Course
                </button>
                <button
                  onClick={() => setShowCoursesModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
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

export default Department;
