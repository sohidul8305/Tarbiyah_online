// src/Page/Admin/Payment_overview.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Payment_overview = () => {
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

  const [paymentStats, setPaymentStats] = useState({
    totalIncome: 125000,
    pendingFees: 35000,
    collected: 90000,
    dueFees: 15000,
    totalStudents: 156,
    paidStudents: 120,
    unpaidStudents: 36,
  });

  const [payments, setPayments] = useState([
    {
      id: 1,
      student: "Ahmed Hasan",
      class: "Class 8",
      amount: 5000,
      month: "July 2026",
      status: "Paid",
      date: "2026-07-01",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX-2026-001",
      dueDate: "2026-07-10",
    },
    {
      id: 2,
      student: "Fatima Begum",
      class: "Class 9",
      amount: 5000,
      month: "July 2026",
      status: "Pending",
      date: "-",
      paymentMethod: "-",
      transactionId: "-",
      dueDate: "2026-07-10",
    },
    {
      id: 3,
      student: "Mohammad Ali",
      class: "Class 10",
      amount: 5000,
      month: "July 2026",
      status: "Paid",
      date: "2026-07-02",
      paymentMethod: "Mobile Banking",
      transactionId: "TRX-2026-002",
      dueDate: "2026-07-10",
    },
    {
      id: 4,
      student: "Aisha Rahman",
      class: "Class 7",
      amount: 5000,
      month: "July 2026",
      status: "Overdue",
      date: "-",
      paymentMethod: "-",
      transactionId: "-",
      dueDate: "2026-07-10",
    },
    {
      id: 5,
      student: "Abdullah Karim",
      class: "Class 10",
      amount: 5000,
      month: "July 2026",
      status: "Paid",
      date: "2026-07-03",
      paymentMethod: "Cash",
      transactionId: "TRX-2026-003",
      dueDate: "2026-07-10",
    },
    {
      id: 6,
      student: "Maryam Akter",
      class: "Class 8",
      amount: 5000,
      month: "July 2026",
      status: "Pending",
      date: "-",
      paymentMethod: "-",
      transactionId: "-",
      dueDate: "2026-07-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

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
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || payment.status === filterStatus;
    const matchesClass = filterClass === "All" || payment.class === filterClass;
    const matchesMonth = filterMonth === "All" || payment.month === filterMonth;
    return matchesSearch && matchesStatus && matchesClass && matchesMonth;
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(payments.map((p) => p.class))];
  const uniqueMonths = ["All", ...new Set(payments.map((p) => p.month))];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <FaCheckCircle className="text-green-500" size={14} />;
      case "Pending":
        return <FaClockIcon className="text-yellow-500" size={14} />;
      case "Overdue":
        return <FaTimesCircle className="text-red-500" size={14} />;
      default:
        return <FaInfoCircle className="text-gray-500" size={14} />;
    }
  };

  // Open details modal
  const openDetailsModal = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  // Handle payment action
  const handlePaymentAction = (payment, action) => {
    if (action === "mark-paid") {
      Swal.fire({
        title: "Mark as Paid?",
        text: `Are you sure you want to mark ${payment.student}'s payment as paid?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, mark as paid!",
      }).then((result) => {
        if (result.isConfirmed) {
          setPayments(
            payments.map((p) =>
              p.id === payment.id
                ? {
                    ...p,
                    status: "Paid",
                    date: new Date().toISOString().split("T")[0],
                    paymentMethod: "Bank Transfer",
                    transactionId: `TRX-${Date.now()}`,
                  }
                : p,
            ),
          );
          Swal.fire({
            icon: "success",
            title: "Payment Marked as Paid!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    } else if (action === "send-reminder") {
      Swal.fire({
        icon: "success",
        title: "Reminder Sent!",
        text: `Payment reminder sent to ${payment.student}`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Payment Overview</h1>
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
                <FaMoneyBillWave className="text-green-600" /> Payment Overview
              </h1>
              <p className="text-xs text-gray-500">
                View and manage all student payments
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

          {/* Payment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                ৳{paymentStats.totalIncome.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Total Income</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                ৳{paymentStats.collected.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Collected</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                ৳{paymentStats.pendingFees.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                ৳{paymentStats.dueFees.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Due</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {paymentStats.paidStudents}/{paymentStats.totalStudents}
              </p>
              <p className="text-[10px] text-gray-500">Students Paid</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {uniqueMonths.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Report Generated!",
                      text: "Payment report has been downloaded.",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-0.5 transition-all"
                >
                  <FaDownload size={12} /> Report
                </button>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
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
                      Month
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2 text-xs font-medium text-gray-800">
                        {payment.student}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {payment.class}
                      </td>
                      <td className="px-3 py-2 text-xs font-semibold text-gray-800">
                        ৳{payment.amount}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {payment.month}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(payment.status)}`}
                        >
                          {getStatusIcon(payment.status)} {payment.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {payment.date}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openDetailsModal(payment)}
                            className="text-blue-600 hover:text-blue-800 p-0.5"
                            title="View Details"
                          >
                            <FaEye size={12} />
                          </button>
                          {payment.status !== "Paid" && (
                            <button
                              onClick={() =>
                                handlePaymentAction(payment, "mark-paid")
                              }
                              className="text-green-600 hover:text-green-800 p-0.5"
                              title="Mark as Paid"
                            >
                              <FaCheckCircle size={12} />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handlePaymentAction(payment, "send-reminder")
                            }
                            className="text-yellow-600 hover:text-yellow-800 p-0.5"
                            title="Send Reminder"
                          >
                            <FaBell size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Results */}
          {filteredPayments.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <FaMoneyBillWave className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Payments Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoiceIcon className="text-green-600" /> Payment Details
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
                      {selectedPayment.student}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedPayment.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      ৳{selectedPayment.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedPayment.status)}`}
                    >
                      {getStatusIcon(selectedPayment.status)}{" "}
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Month</p>
                    <p className="font-semibold">{selectedPayment.month}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="font-semibold">{selectedPayment.dueDate}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Transaction Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-semibold">
                          {selectedPayment.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Date</span>
                        <span className="font-semibold">
                          {selectedPayment.date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-semibold">
                          {selectedPayment.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        Swal.fire({
                          icon: "success",
                          title: "Receipt Downloaded!",
                          text: "Payment receipt has been downloaded.",
                          timer: 1500,
                          showConfirmButton: false,
                        });
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaDownload className="inline mr-2" /> Receipt
                    </button>
                    {selectedPayment.status !== "Paid" && (
                      <button
                        onClick={() => {
                          handlePaymentAction(selectedPayment, "mark-paid");
                          setShowDetailsModal(false);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                      >
                        <FaCheckCircle className="inline mr-2" /> Mark Paid
                      </button>
                    )}
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

export default Payment_overview;
