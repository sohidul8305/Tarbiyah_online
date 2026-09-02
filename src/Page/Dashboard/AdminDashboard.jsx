// src/Page/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Admin_notification from "../Admin-notification/Admin_notification";

const AdminDashboard = () => {
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

  // Admin Dashboard Stats
  const [stats, setStats] = useState({
    totalDepartments: 5,
    todayClasses: 8,
    totalStudents: 156,
    newAdmissions: 12,
    totalTeachers: 25,
    totalIncome: 125000,
    pendingFees: 35000,
    notifications: 8,
  });

  const handleView = (student) => {
    Swal.fire({
      title: `📋 Student Details: ${student.name}`,
      html: `
      <div style="text-align: left; font-size: 13px; max-height: 450px; overflow-y: auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">admin
          <p><strong>নাম:</strong> ${student.name || "N/A"}</p>
          <p><strong>ফোন:</strong> ${student.phone || "N/A"}</p>
          <p><strong>ইমেইল:</strong> ${student.email || "N/A"}</p>
          <p><strong>কোর্স:</strong> ${student.course || student.class || "N/A"}</p>
          <p><strong>ইউজারনেম:</strong> ${student.username || "Not assigned"}</p>
          <p><strong>স্ট্যাটাস:</strong> ${student.status || "Pending"}</p>
          <p><strong>পিতার নাম:</strong> ${student.fatherName || student.guardianName || "N/A"}</p>
          <p><strong>মাতার নাম:</strong> ${student.motherName || "N/A"}</p>
          <p><strong>অভিভাবক:</strong> ${student.guardianName || "N/A"}</p>
          <p><strong>অভিভাবক ফোন:</strong> ${student.guardianPhone || "N/A"}</p>
          <p><strong>বর্তমান ঠিকানা:</strong> ${student.presentAddress || student.address || "N/A"}</p>
          <p><strong>স্থায়ী ঠিকানা:</strong> ${student.permanentAddress || "N/A"}</p>
          <p><strong>পরিচয়পত্র:</strong> ${student.dobOrNid || "N/A"}</p>
          <p><strong>পেমেন্ট স্ট্যাটাস:</strong> ${student.paymentStatus || (student.paidAmount ? "Paid" : "Unpaid")}</p>
          <p><strong>পেমেন্ট মেথড:</strong> ${student.paymentMethod || "N/A"}</p>
          <p><strong>ট্রানজেকশন আইডি:</strong> ${student.transactionId || "N/A"}</p>
          <p><strong>ভর্তি তারিখ:</strong> ${student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : "N/A"}</p>
        </div>
        <hr style="margin: 10px 0;">
        <p style="font-size: 11px; color: #666;">রেজিস্ট্রেশন: ${student.createdAt ? new Date(student.createdAt).toLocaleString() : "N/A"}</p>
      </div>
    `,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Close",
      width: 650,
    });
  };

  // Students Data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Hasan",
      class: "Class 8",
      roll: "01",
      status: "Active",
      admissionDate: "2026-01-15",
      parentContact: "+880 1712 345678",
    },
    {
      id: 2,
      name: "Fatima Begum",
      class: "Class 9",
      roll: "02",
      status: "Active",
      admissionDate: "2026-02-01",
      parentContact: "+880 1723 456789",
    },
    {
      id: 3,
      name: "Mohammad Ali",
      class: "Class 10",
      roll: "05",
      status: "Pending",
      admissionDate: "2026-07-20",
      parentContact: "+880 1734 567890",
    },
    {
      id: 4,
      name: "Aisha Rahman",
      class: "Class 7",
      roll: "06",
      status: "Active",
      admissionDate: "2026-03-01",
      parentContact: "+880 1745 678901",
    },
  ]);

  // Teachers Data
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Ustadh Ahmad",
      subject: "Tajweed",
      class: "Class 8",
      status: "Active",
      joinDate: "2024-01-15",
      attendance: 92,
    },
    {
      id: 2,
      name: "Ustadh Muhammad",
      subject: "Tafsir",
      class: "Class 9",
      status: "Active",
      joinDate: "2024-02-01",
      attendance: 85,
    },
    {
      id: 3,
      name: "Ustadh Abdullah",
      subject: "Hadith",
      class: "Class 10",
      status: "Active",
      joinDate: "2024-03-10",
      attendance: 78,
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New student admission request from Ahmed Hasan",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Monthly fee pending for Class 8 students",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      message: "Teacher attendance report generated",
      time: "1 day ago",
      read: true,
    },
  ]);

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
      id: "notification",
      icon: <FaBell className="text-xl" />,
      label: "Notification",
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
          id: "permission-permission",
          path: "/admin-students/permission",
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
      path: "/student-absence",
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

  // Render Dashboard Content
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardContent stats={stats} notifications={notifications} />;
      case "notification":
        return <Admin_notification />; // notification কেস আলাদা
      case "student-management":
        return <StudentManagementContent students={students} />;
      case "teacher-management":
        return <TeacherManagementContent teachers={teachers} />;
      case "batch-course":
        return <BatchCourseContent />;
      case "absence-student":
        return <AbsenceStudentContent />;
      case "finance":
        return <FinanceContent />;
      case "exam":
        return <ExamContent />;
      case "report-analytics":
        return <ReportAnalyticsContent />;
      case "crm-management":
        return <CRMContent />;
      case "salary":
        return <SalaryContent />;
      default:
        return <DashboardContent stats={stats} notifications={notifications} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Admin Dashboard</h1>
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
                <MdDashboard className="text-teal-600" /> Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">
                Welcome back, {adminInfo.name}!
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

          {/* Content - Full Screen */}
          <div className="h-[calc(100vh-170px)] overflow-hidden">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 1. DASHBOARD CONTENT
// ==========================================
const DashboardContent = ({ stats, notifications }) => {
  const dashboardStats = [
    {
      label: (
        <Link
          to="/admin-dashboard/department"
          className="hover:text-teal-600 text-[10px]"
        >
          Department
        </Link>
      ),
      value: stats.totalDepartments,
      icon: <FaHome className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      label: (
        <Link
          to="/admin-dashboard/today-class"
          className="hover:text-teal-600 text-[10px]"
        >
          Today's Class
        </Link>
      ),
      value: stats.todayClasses,
      icon: <FaCalendarAlt className="text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      label: (
        <Link
          to="/admin-dashboard/payment-overview"
          className="hover:text-teal-600 text-[10px]"
        >
          Payment Overview
        </Link>
      ),
      value: `৳${stats.totalIncome.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: (
        <Link
          to="/admin-dashboard/new-admission"
          className="hover:text-teal-600 text-[10px]"
        >
          New Admission
        </Link>
      ),
      value: stats.newAdmissions,
      icon: <FaUserPlus className="text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      label: (
        <Link
          to="/admin-dashboard/notification"
          className="hover:text-teal-600 text-[10px]"
        >
          Notification
        </Link>
      ),
      value: stats.notifications,
      icon: <FaBell className="text-red-500" />,
      color: "bg-red-50",
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 flex-shrink-0">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-lg font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
            <p className="text-[10px] text-gray-600 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex-shrink-0">
        <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-teal-600">⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            {
              label: "Add Student",
              icon: "👨‍🎓",
              color: "bg-blue-50",
              link: "/admin-students/add",
            },
            {
              label: "Add Teacher",
              icon: "👨‍🏫",
              color: "bg-green-50",
              link: "/admin-teachers/assign",
            },
            {
              label: "Create Class",
              icon: "📚",
              color: "bg-purple-50",
              link: "/admin-batch-course/course-make",
            },
            {
              label: "Fee Collection",
              icon: "💰",
              color: "bg-yellow-50",
              link: "/admin-finance/admin-fee",
            },
            {
              label: "Generate Report",
              icon: "📊",
              color: "bg-red-50",
              link: "/admin-reports/admission",
            },
          ].map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} p-2 rounded-lg border border-gray-200 hover:shadow-md transition-all text-center`}
            >
              <div className="text-xl">{action.icon}</div>
              <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                {action.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Notifications - Full Height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex flex-col overflow-hidden">
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2 flex-shrink-0">
            <span className="text-blue-600">🔄</span> Recent Activity
          </h3>
          <div className="flex-1 overflow-hidden">
            <div className="space-y-2">
              {[
                {
                  action: "New student admitted",
                  detail: "Ahmed Hasan - Class 8",
                  time: "2 hours ago",
                },
                {
                  action: "Fee payment received",
                  detail: "Class 9 - 5 students",
                  time: "4 hours ago",
                },
                {
                  action: "Teacher assigned",
                  detail: "Ustadh Abdullah - Class 10",
                  time: "Yesterday",
                },
                {
                  action: "Exam result published",
                  detail: "Mid Term 2026",
                  time: "Yesterday",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex flex-col overflow-hidden">
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2 flex-shrink-0">
            <FaBell className="text-yellow-600" /> Notifications
          </h3>
          <div className="flex-1 overflow-hidden">
            {notifications.length > 0 ? (
              <div className="space-y-2">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-2 p-2 rounded-lg ${!notif.read ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${!notif.read ? "bg-blue-500" : "bg-gray-300"}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-700">{notif.message}</p>
                      <p className="text-[10px] text-gray-400">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// AdminDashboard.jsx - StudentManagementContent Component

const StudentManagementContent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ Approve Modal State
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [refreshKey]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:5000/api/students/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        setError(
          "API endpoint not found! Please check if server is running on port 5000",
        );
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const studentList = data.students || [];
        setStudents(studentList);
        if (studentList.length === 0) {
          setError("No students found. Please add a student.");
        }
      } else {
        setError(data.message || "Failed to fetch students");
      }
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      setError(`Error: ${error.message}. Please check if server is running.`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve Student Function
  const handleApproveStudent = async () => {
    try {
      if (
        !selectedStudent.username ||
        !selectedStudent.password ||
        !selectedStudent.roll
      ) {
        Swal.fire({
          icon: "warning",
          title: "Information Missing!",
          text: "Please provide username, password and roll number.",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/students/approve/${selectedStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: selectedStudent.username,
            password: selectedStudent.password,
            roll: selectedStudent.roll,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        const updatedStudents = students.map((s) =>
          s._id === selectedStudent._id
            ? {
                ...s,
                status: "Active",
                username: selectedStudent.username,
                roll: selectedStudent.roll,
              }
            : s,
        );
        setStudents(updatedStudents);
        setShowApproveModal(false);
        setSelectedStudent(null);

        Swal.fire({
          icon: "success",
          title: "✅ Student Approved!",
          html: `
            <div style="text-align: left;">
              <p><strong>Student:</strong> ${selectedStudent.name}</p>
              <p><strong>Class:</strong> ${selectedStudent.class}</p>
              <p><strong>Roll:</strong> ${selectedStudent.roll}</p>
              <hr style="margin: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 2px solid #86efac;">
                <p style="font-weight: bold; color: #004d4d; margin-bottom: 5px;">🔑 Login Credentials:</p>
                <p><strong>Username:</strong> <span style="color: #004d4d;">${selectedStudent.username}</span></p>
                <p><strong>Password:</strong> <span style="color: #004d4d;">${selectedStudent.password}</span></p>
              </div>
            </div>
          `,
          confirmButtonColor: "#004d4d",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not approve student.",
        });
      }
    } catch (error) {
      console.error("❌ Error approving student:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not approve student. Please try again.",
      });
    }
  };

  // ✅ Delete Student
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (data.success) {
          setStudents(students.filter((s) => s._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Student has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: data.message || "Could not delete student.",
          });
        }
      } catch (error) {
        console.error("❌ Error deleting student:", error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not delete student.",
        });
      }
    }
  };

  // Filter students
  const filteredStudents = students
    .filter((s) => {
      if (filter === "all") return true;
      if (filter === "pending") return s.status === "Pending";
      if (filter === "active") return s.status === "Active";
      if (filter === "inactive") return s.status === "Inactive";
      return true;
    })
    .filter((s) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        s.name?.toLowerCase().includes(term) ||
        s.phone?.includes(term) ||
        s.email?.toLowerCase().includes(term) ||
        s.username?.toLowerCase().includes(term) ||
        s.roll?.toLowerCase().includes(term) ||
        s.class?.toLowerCase().includes(term)
      );
    });

  const pendingCount = students.filter((s) => s.status === "Pending").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center flex-shrink-0 flex-wrap gap-2">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaUsers className="text-blue-600" /> Student Management
          <span className="text-xs font-normal text-gray-500">
            (Total: {students.length})
          </span>
          {pendingCount > 0 && (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold animate-pulse flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              {pendingCount} Pending
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-28"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Name & Contact
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Username
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Roll
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2">
                    <p className="text-xs font-medium text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      📱 {student.phone}
                    </p>
                    {student.email && (
                      <p className="text-[10px] text-gray-400">
                        ✉️ {student.email}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {student.class}
                  </td>
                  <td className="px-3 py-2 text-xs font-mono">
                    {student.username ? (
                      <span className="text-blue-600 font-semibold">
                        {student.username}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">
                        Not assigned
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {student.roll || (
                      <span className="text-gray-400 text-[10px]">N/A</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 animate-pulse"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      {/* ✅ View Button */}
                      <button
                        onClick={() => {
                          setSelectedStudent({
                            ...student,
                            username: "",
                            password: "",
                            roll: student.roll || "",
                          });
                          setShowApproveModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View / Approve"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(student._id, student.name)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      // AdminDashboard.jsx - StudentManagementContent এর Modal অংশ
      {/* ✅ Approve Modal - এখানে আপনি নিজে Username এবং Password দিতে পারবেন */}
      {showApproveModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaCheckCircle className="text-green-600" /> Student Details
              </h3>
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedStudent(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Student Information Display */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-1">
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.phone || "N/A"}
              </p>
              <p>
                <strong>Class:</strong> {selectedStudent.class || "N/A"}
              </p>
              <p>
                <strong>Guardian:</strong>{" "}
                {selectedStudent.guardianName ||
                  selectedStudent.fatherName ||
                  "N/A"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedStudent.presentAddress ||
                  selectedStudent.address ||
                  "N/A"}
              </p>
              <p>
                <strong>NID:</strong> {selectedStudent.dobOrNid || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-yellow-600 font-semibold">
                  {selectedStudent.status || "Pending"}
                </span>
              </p>
              <p>
                <strong>Registration:</strong>{" "}
                {selectedStudent.createdAt
                  ? new Date(selectedStudent.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            {/* ✅ এখানে আপনি নিজে Username এবং Password দিতে পারবেন */}
            <div className="space-y-3 border-t pt-3">
              <h4 className="text-sm font-bold text-gray-700">
                🔑 Set Login Credentials
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedStudent.roll}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      roll: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 01"
                />
              </div>

              {/* ✅ Username Input - আপনি এখানে Username দিবেন */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedStudent.username}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter username"
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 This will be used for student login
                </p>
              </div>

              {/* ✅ Password Input - আপনি এখানে Password দিবেন */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedStudent.password}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter password"
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 Default password: <strong>student123S@</strong>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Close
              </button>
              <button
                onClick={handleApproveStudent}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 font-medium"
              >
                <FaCheckCircle size={14} /> Approve & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// ==========================================
// 3. TEACHER MANAGEMENT CONTENT
// ==========================================
const TeacherManagementContent = ({ teachers }) => {
  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaChalkboardTeacher className="text-green-600" /> Teacher Management
        </h2>
        <Link
          to="/admin-teachers/assign"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Add Teacher
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Subject
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Attendance
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2">
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {teacher.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Joined: {teacher.joinDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {teacher.subject}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {teacher.class}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-xs font-bold ${teacher.attendance >= 80 ? "text-green-600" : teacher.attendance >= 60 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {teacher.attendance}%
                      </span>
                      <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${teacher.attendance >= 80 ? "bg-green-500" : teacher.attendance >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${teacher.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${teacher.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-teachers/overview"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-teachers/assign"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 p-0.5"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. BATCH & COURSE CONTENT
// ==========================================
const BatchCourseContent = () => {
  const [activeTab, setActiveTab] = useState("batch-make");

  const tabs = [
    {
      id: "batch-make",
      label: "Batch Make",
      icon: <FaLayerGroup size={14} />,
      path: "/admin-batch-course/batch-make",
    },
    {
      id: "course-make",
      label: "Course Make",
      icon: <FaBookOpen size={14} />,
      path: "/admin-batch-course/course-make",
    },
    {
      id: "syllabus",
      label: "Syllabus",
      icon: <FaListAlt size={14} />,
      path: "/admin-batch-course/syllabus",
    },
    {
      id: "clear-routine",
      label: "Clear Routine",
      icon: <FaRoute size={14} />,
      path: "/admin-batch-course/clear-routine",
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaLayerGroup className="text-indigo-600" /> Batch & Course
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "batch-make" && <BatchMakeContent />}
        {activeTab === "course-make" && <CourseMakeContent />}
        {activeTab === "syllabus" && <SyllabusContent />}
        {activeTab === "clear-routine" && <ClearRoutineContent />}
      </div>
    </div>
  );
};

// Batch Make Content
const BatchMakeContent = () => {
  const [batches] = useState([
    {
      id: 1,
      name: "Batch 2026-A",
      course: "Tajweed",
      students: 30,
      status: "Active",
      startDate: "2026-01-15",
    },
    {
      id: 2,
      name: "Batch 2026-B",
      course: "Tafsir",
      students: 25,
      status: "Active",
      startDate: "2026-02-01",
    },
    {
      id: 3,
      name: "Batch 2026-C",
      course: "Hadith",
      students: 28,
      status: "Upcoming",
      startDate: "2026-03-10",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Batch List</h3>
        <Link
          to="/admin-batch-course/batch-make"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Create Batch
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Batch Name
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Course
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Students
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches.map((batch) => (
                <tr
                  key={batch.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {batch.name}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {batch.course}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {batch.students}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${batch.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-batch-course/batch-make"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-batch-course/batch-make"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 p-0.5"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Course Make Content
const CourseMakeContent = () => {
  const [courses] = useState([
    {
      id: 1,
      name: "Tajweed - Beginner",
      code: "TAJ-101",
      duration: "3 months",
      students: 30,
      status: "Active",
    },
    {
      id: 2,
      name: "Tafsir - Quranic Studies",
      code: "TAF-201",
      duration: "4 months",
      students: 25,
      status: "Active",
    },
    {
      id: 3,
      name: "Hadith - Sahih Bukhari",
      code: "HAD-301",
      duration: "6 months",
      students: 28,
      status: "Active",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Course List</h3>
        <Link
          to="/admin-batch-course/course-make"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Create Course
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Course Name
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Code
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Duration
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Students
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {course.name}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {course.code}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {course.duration}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {course.students}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${course.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-batch-course/course-make"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-batch-course/course-make"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 p-0.5"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Syllabus Content
const SyllabusContent = () => {
  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">
          Syllabus Management
        </h3>
        <Link
          to="/admin-batch-course/syllabus"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Add Syllabus
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center flex-1 flex items-center justify-center">
        <div>
          <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Syllabus management feature coming soon
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Add and manage course syllabi here
          </p>
        </div>
      </div>
    </div>
  );
};

// Clear Routine Content
const ClearRoutineContent = () => {
  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Clear Routine</h3>
        <Link
          to="/admin-batch-course/clear-routine"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Create Routine
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center flex-1 flex items-center justify-center">
        <div>
          <FaRoute className="text-6xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Routine management feature coming soon
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Create and manage class routines here
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. ABSENCE STUDENT CONTENT
// ==========================================
const AbsenceStudentContent = () => {
  const [absentStudents] = useState([
    {
      id: 1,
      name: "Mohammad Ali",
      class: "Class 10",
      date: "2026-07-25",
      reason: "Sick",
      status: "Absent",
    },
    {
      id: 2,
      name: "Abdullah Karim",
      class: "Class 9",
      date: "2026-07-25",
      reason: "Family Event",
      status: "Leave",
    },
    {
      id: 3,
      name: "Maryam Akter",
      class: "Class 8",
      date: "2026-07-25",
      reason: "Not Reported",
      status: "Absent",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 flex-shrink-0">
        <FaUserTimes className="text-red-600" /> Absence Student Community
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Reason
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {absentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {student.class}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {student.date}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {student.reason}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${student.status === "Absent" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. FINANCE CONTENT
// ==========================================
const FinanceContent = () => {
  const [invoices] = useState([
    {
      id: 1,
      student: "Ahmed Hasan",
      class: "Class 8",
      amount: 5000,
      status: "Paid",
      date: "2026-07-01",
    },
    {
      id: 2,
      student: "Fatima Begum",
      class: "Class 9",
      amount: 5000,
      status: "Pending",
      date: "2026-07-01",
    },
    {
      id: 3,
      student: "Mohammad Ali",
      class: "Class 10",
      amount: 5000,
      status: "Paid",
      date: "2026-07-01",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" /> Finance
        </h2>
        <Link
          to="/admin-finance/invoice"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Generate Invoice
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-green-600">৳125,000</p>
          <p className="text-[10px] text-gray-500">Total Income</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-yellow-600">৳35,000</p>
          <p className="text-[10px] text-gray-500">Pending Fees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-blue-600">৳90,000</p>
          <p className="text-[10px] text-gray-500">Collected</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Student
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {invoice.student}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {invoice.class}
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-gray-800">
                    ৳{invoice.amount}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${invoice.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      to="/admin-finance/invoice"
                      className="text-blue-600 hover:text-blue-800 p-0.5"
                      title="View Invoice"
                    >
                      <FaFileInvoice size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. EXAM CONTENT
// ==========================================
const ExamContent = () => {
  const [activeTab, setActiveTab] = useState("exam-make");

  const tabs = [
    {
      id: "exam-make",
      label: "Exam Make",
      icon: <FaCalendarPlus size={14} />,
      path: "/admin-exam/make",
    },
    {
      id: "result-publish",
      label: "Result Publish",
      icon: <FaFileAlt size={14} />,
      path: "/admin-exam/result",
    },
    {
      id: "certificate-permission",
      label: "Certificate Permission",
      icon: <FaCertificate size={14} />,
      path: "/admin-exam/certificate",
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaCalendarCheck className="text-purple-600" /> Exam Management
        </h2>
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {activeTab === "exam-make" && <ExamMakeContent />}
        {activeTab === "result-publish" && <ResultPublishContent />}
        {activeTab === "certificate-permission" && (
          <CertificatePermissionContent />
        )}
      </div>
    </div>
  );
};

// Exam Make Content
const ExamMakeContent = () => {
  const [exams] = useState([
    {
      id: 1,
      title: "Mid Term Exam 2026",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-06-15",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Weekly Test - Week 3",
      class: "Class 9",
      subject: "Tafsir",
      date: "2026-07-10",
      status: "Completed",
    },
    {
      id: 3,
      title: "Final Exam 2026",
      class: "Class 10",
      subject: "Hadith",
      date: "2026-07-20",
      status: "Upcoming",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Exam List</h3>
        <Link
          to="/admin-exam/make"
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Create Exam
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Exam Title
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Subject
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {exam.title}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {exam.class}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {exam.subject}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {exam.date}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${exam.status === "Upcoming" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-exam/make"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-exam/make"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 p-0.5"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Result Publish Content
const ResultPublishContent = () => {
  const [results] = useState([
    {
      id: 1,
      exam: "Mid Term Exam 2026",
      class: "Class 8",
      published: "2026-06-20",
      status: "Published",
    },
    {
      id: 2,
      exam: "Weekly Test - Week 3",
      class: "Class 9",
      published: "2026-07-12",
      status: "Published",
    },
    {
      id: 3,
      exam: "Final Exam 2026",
      class: "Class 10",
      published: "-",
      status: "Pending",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Result List</h3>
        <Link
          to="/admin-exam/result"
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Publish Result
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Exam
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Published Date
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((result) => (
                <tr
                  key={result.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {result.exam}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {result.class}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {result.published}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${result.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-exam/result"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-exam/result"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Certificate Permission Content
const CertificatePermissionContent = () => {
  const [certificates] = useState([
    {
      id: 1,
      student: "Ahmed Hasan",
      course: "Tajweed",
      issueDate: "2026-06-30",
      status: "Issued",
    },
    {
      id: 2,
      student: "Fatima Begum",
      course: "Tafsir",
      issueDate: "2026-06-30",
      status: "Pending",
    },
    {
      id: 3,
      student: "Mohammad Ali",
      course: "Hadith",
      issueDate: "-",
      status: "Pending",
    },
  ]);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">
          Certificate Permission
        </h3>
        <Link
          to="/admin-exam/certificate"
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <FaPlusCircle size={12} /> Issue Certificate
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Student
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Course
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Issue Date
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certificates.map((cert) => (
                <tr
                  key={cert.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {cert.student}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {cert.course}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {cert.issueDate}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${cert.status === "Issued" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to="/admin-exam/certificate"
                        className="text-blue-600 hover:text-blue-800 p-0.5"
                        title="View"
                      >
                        <FaEye size={12} />
                      </Link>
                      <Link
                        to="/admin-exam/certificate"
                        className="text-green-600 hover:text-green-800 p-0.5"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. REPORT & ANALYTICS CONTENT
// ==========================================
const ReportAnalyticsContent = () => {
  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 flex-shrink-0">
        <FaChartLine className="text-purple-600" /> Report & Analytics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-shrink-0">
        {[
          {
            label: "Admission Report",
            icon: <FaUserPlus className="text-blue-500" />,
            color: "bg-blue-50",
            path: "/admin-reports/admission",
          },
          {
            label: "Attendance Report",
            icon: <FaClipboardList className="text-green-500" />,
            color: "bg-green-50",
            path: "/admin-reports/attendance",
          },
          {
            label: "Income Report",
            icon: <FaMoneyBillWave className="text-yellow-500" />,
            color: "bg-yellow-50",
            path: "/admin-reports/income",
          },
        ].map((report, index) => (
          <Link
            key={index}
            to={report.path}
            className={`${report.color} p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center`}
          >
            <div className="text-2xl">{report.icon}</div>
            <p className="text-xs font-medium text-gray-700 mt-1">
              {report.label}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Click to generate
            </p>
          </Link>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center flex-1 flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Select a report type to view detailed analytics
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 9. CRM CONTENT
// ==========================================
const CRMContent = () => {
  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 flex-shrink-0">
        <FaDatabase className="text-teal-600" /> CRM Management
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex-1">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Data Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            to="/admin-crm/data-entry"
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-center transition-all"
          >
            <FaUserGraduate className="text-2xl text-blue-500 mx-auto" />
            <p className="text-xs font-medium text-gray-700 mt-1">
              Student Data
            </p>
          </Link>
          <Link
            to="/admin-crm/data-entry"
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 text-center transition-all"
          >
            <FaChalkboardTeacher className="text-2xl text-green-500 mx-auto" />
            <p className="text-xs font-medium text-gray-700 mt-1">
              Teacher Data
            </p>
          </Link>
          <Link
            to="/admin-crm/data-entry"
            className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 text-center transition-all"
          >
            <FaBook className="text-2xl text-purple-500 mx-auto" />
            <p className="text-xs font-medium text-gray-700 mt-1">
              Course Data
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 10. SALARY CONTENT
// ==========================================
const SalaryContent = () => {
  const [salaryHistory] = useState([
    {
      id: 1,
      teacher: "Ustadh Ahmad",
      month: "June 2026",
      amount: 45000,
      status: "Paid",
      date: "2026-06-30",
    },
    {
      id: 2,
      teacher: "Ustadh Muhammad",
      month: "June 2026",
      amount: 40000,
      status: "Pending",
      date: "2026-06-30",
    },
    {
      id: 3,
      teacher: "Ustadh Abdullah",
      month: "June 2026",
      amount: 42000,
      status: "Paid",
      date: "2026-06-30",
    },
  ]);

  const totalSalary = salaryHistory.reduce((sum, item) => sum + item.amount, 0);
  const dueSalary = salaryHistory
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 flex-shrink-0">
        <FaMoneyBillWave className="text-green-600" /> Salary
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-blue-600">
            ৳{totalSalary.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500">Total Salary</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-green-600">
            ৳{(totalSalary - dueSalary).toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500">Paid Salary</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-red-600">
            ৳{dueSalary.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500">Due Salary</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Teacher
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Month
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {salaryHistory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs font-medium text-gray-800">
                    {item.teacher}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {item.month}
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-gray-800">
                    ৳{item.amount}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      to="/admin-salary/total"
                      className="text-blue-600 hover:text-blue-800 p-0.5"
                      title="View"
                    >
                      <FaEye size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
