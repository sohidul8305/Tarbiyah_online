// src/Page/Admin/New_admission.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const New_admission = () => {
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

  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      name: "Ahmed Hasan",
      fatherName: "Abdul Hasan",
      motherName: "Fatima Hasan",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-07-25",
      status: "Pending",
      phone: "+880 1712 345678",
      email: "ahmed@example.com",
      address: "Mohammadpur, Dhaka",
      dob: "2010-05-15",
      gender: "Male",
      previousSchool: "Mohammadpur High School",
      guardianContact: "+880 1812 345678",
      paymentStatus: "Unpaid",
      documents: ["Birth Certificate", "Previous Report Card"],
    },
    {
      id: 2,
      name: "Fatima Begum",
      fatherName: "Mohammad Ali",
      motherName: "Aisha Ali",
      class: "Class 9",
      subject: "Tafsir",
      date: "2026-07-24",
      status: "Approved",
      phone: "+880 1723 456789",
      email: "fatima@example.com",
      address: "Mirpur, Dhaka",
      dob: "2009-08-20",
      gender: "Female",
      previousSchool: "Mirpur Girls School",
      guardianContact: "+880 1823 456789",
      paymentStatus: "Paid",
      documents: [
        "Birth Certificate",
        "Previous Report Card",
        "Transfer Certificate",
      ],
    },
    {
      id: 3,
      name: "Mohammad Ali",
      fatherName: "Karim Ali",
      motherName: "Rokeya Ali",
      class: "Class 10",
      subject: "Hadith",
      date: "2026-07-23",
      status: "Pending",
      phone: "+880 1734 567890",
      email: "ali@example.com",
      address: "Uttara, Dhaka",
      dob: "2008-03-10",
      gender: "Male",
      previousSchool: "Uttara High School",
      guardianContact: "+880 1834 567890",
      paymentStatus: "Partial",
      documents: ["Birth Certificate", "Previous Report Card"],
    },
    {
      id: 4,
      name: "Aisha Rahman",
      fatherName: "Rahman Khan",
      motherName: "Shahida Khan",
      class: "Class 7",
      subject: "Fiqh",
      date: "2026-07-22",
      status: "Rejected",
      phone: "+880 1745 678901",
      email: "aisha@example.com",
      address: "Gulshan, Dhaka",
      dob: "2011-11-05",
      gender: "Female",
      previousSchool: "Gulshan Model School",
      guardianContact: "+880 1845 678901",
      paymentStatus: "Unpaid",
      documents: ["Birth Certificate"],
    },
    {
      id: 5,
      name: "Abdullah Karim",
      fatherName: "Karim Uddin",
      motherName: "Jahanara Begum",
      class: "Class 6",
      subject: "Aqeedah",
      date: "2026-07-21",
      status: "Approved",
      phone: "+880 1756 789012",
      email: "abdullah@example.com",
      address: "Dhanmondi, Dhaka",
      dob: "2012-07-20",
      gender: "Male",
      previousSchool: "Dhanmondi School",
      guardianContact: "+880 1856 789012",
      paymentStatus: "Paid",
      documents: [
        "Birth Certificate",
        "Previous Report Card",
        "Transfer Certificate",
      ],
    },
    {
      id: 6,
      name: "Maryam Akter",
      fatherName: "Akter Hossain",
      motherName: "Rokeya Akter",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-07-20",
      status: "Pending",
      phone: "+880 1767 890123",
      email: "maryam@example.com",
      address: "Bashundhara, Dhaka",
      dob: "2010-09-15",
      gender: "Female",
      previousSchool: "Bashundhara School",
      guardianContact: "+880 1867 890123",
      paymentStatus: "Unpaid",
      documents: ["Birth Certificate", "Previous Report Card"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    class: "",
    subject: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    gender: "Male",
    previousSchool: "",
    guardianContact: "",
    status: "Pending",
    paymentStatus: "Unpaid",
    documents: "",
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
  const filteredAdmissions = admissions.filter((admission) => {
    const matchesSearch =
      admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.phone.includes(searchTerm);
    const matchesStatus =
      filterStatus === "All" || admission.status === filterStatus;
    const matchesClass =
      filterClass === "All" || admission.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || admission.subject === filterSubject;
    const matchesPayment =
      filterPayment === "All" || admission.paymentStatus === filterPayment;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesSubject &&
      matchesPayment
    );
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(admissions.map((a) => a.class))];
  const uniqueSubjects = ["All", ...new Set(admissions.map((a) => a.subject))];
  const uniqueStatuses = ["All", ...new Set(admissions.map((a) => a.status))];
  const uniquePayments = [
    "All",
    ...new Set(admissions.map((a) => a.paymentStatus)),
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

  // Get payment badge color
  const getPaymentColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Partial":
        return "bg-yellow-100 text-yellow-700";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500" size={12} />;
      case "Pending":
        return <FaClockIcon className="text-yellow-500" size={12} />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" size={12} />;
      default:
        return <FaInfoCircle className="text-gray-500" size={12} />;
    }
  };

  // Handle add admission
  const handleAddAdmission = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.fatherName ||
      !formData.class ||
      !formData.subject
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newAdmission = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split("T")[0],
      documents: formData.documents
        ? formData.documents.split(",").map((d) => d.trim())
        : [],
    };

    setAdmissions([newAdmission, ...admissions]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Admission Request Submitted!",
      text: "New admission request has been submitted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle approve admission
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Admission?",
      text: "Are you sure you want to approve this admission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmissions(
          admissions.map((a) =>
            a.id === id ? { ...a, status: "Approved" } : a,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Admission Approved!",
          text: "The admission has been approved successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle reject admission
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Admission?",
      text: "Are you sure you want to reject this admission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmissions(
          admissions.map((a) =>
            a.id === id ? { ...a, status: "Rejected" } : a,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Admission Rejected!",
          text: "The admission has been rejected.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle delete admission
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Admission?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAdmissions(admissions.filter((a) => a.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The admission has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Open details modal
  const openDetailsModal = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      fatherName: "",
      motherName: "",
      class: "",
      subject: "",
      phone: "",
      email: "",
      address: "",
      dob: "",
      gender: "Male",
      previousSchool: "",
      guardianContact: "",
      status: "Pending",
      paymentStatus: "Unpaid",
      documents: "",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">New Admissions</h1>
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
                <FaUserPlus className="text-blue-600" /> New Admissions
              </h1>
              <p className="text-xs text-gray-500">
                Manage new student admission requests
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {admissions.length}
              </p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {admissions.filter((a) => a.status === "Pending").length}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {admissions.filter((a) => a.status === "Approved").length}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {admissions.filter((a) => a.status === "Rejected").length}
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
                  placeholder="Search admissions..."
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
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniquePayments.map((payment) => (
                    <option key={payment} value={payment}>
                      {payment}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5 transition-all"
                >
                  <FaPlusCircle size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Admissions Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Student
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Father
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Class
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Payment
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAdmissions.slice(0, 10).map((admission) => (
                    <tr
                      key={admission.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2">
                        <div>
                          <p className="text-xs font-medium text-gray-800">
                            {admission.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {admission.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {admission.fatherName}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {admission.class}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">
                        {admission.date}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(admission.status)}`}
                        >
                          {getStatusIcon(admission.status)} {admission.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getPaymentColor(admission.paymentStatus)}`}
                        >
                          {admission.paymentStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openDetailsModal(admission)}
                            className="text-blue-600 hover:text-blue-800 p-0.5"
                            title="View Details"
                          >
                            <FaEye size={12} />
                          </button>
                          {admission.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(admission.id)}
                                className="text-green-600 hover:text-green-800 p-0.5"
                                title="Approve"
                              >
                                <FaCheckCircle size={12} />
                              </button>
                              <button
                                onClick={() => handleReject(admission.id)}
                                className="text-red-600 hover:text-red-800 p-0.5"
                                title="Reject"
                              >
                                <FaTimesCircle size={12} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(admission.id)}
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

          {/* No Results */}
          {filteredAdmissions.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <FaUserPlus className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Admissions Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Admission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> New Admission Request
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAdmission} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) =>
                      setFormData({ ...formData, fatherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Father's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) =>
                      setFormData({ ...formData, motherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mother's name"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Phone number"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email address"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Contact
                  </label>
                  <input
                    type="text"
                    value={formData.guardianContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guardianContact: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Guardian contact number"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Current address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previousSchool: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Previous school name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Documents (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.documents}
                    onChange={(e) =>
                      setFormData({ ...formData, documents: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Birth Certificate, Report Card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaUserPlus className="inline mr-2" size={14} /> Submit
                  Admission
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

      {/* Admission Details Modal */}
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserGraduate className="text-blue-600" /> Admission Details
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
                      {selectedAdmission.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedAdmission.class} • {selectedAdmission.subject}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedAdmission.status)}`}
                    >
                      {getStatusIcon(selectedAdmission.status)}{" "}
                      {selectedAdmission.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Father</p>
                      <p className="font-semibold text-sm">
                        {selectedAdmission.fatherName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mother</p>
                      <p className="font-semibold text-sm">
                        {selectedAdmission.motherName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-semibold">{selectedAdmission.dob}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="font-semibold">{selectedAdmission.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Previous School</p>
                    <p className="font-semibold">
                      {selectedAdmission.previousSchool || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-semibold">
                          {selectedAdmission.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-semibold">
                          {selectedAdmission.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Guardian Contact</span>
                        <span className="font-semibold">
                          {selectedAdmission.guardianContact}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Address</span>
                        <span className="font-semibold">
                          {selectedAdmission.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Payment & Documents
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Status</span>
                        <span
                          className={`font-semibold ${getPaymentColor(selectedAdmission.paymentStatus)}`}
                        >
                          {selectedAdmission.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Documents</span>
                        <span className="font-semibold">
                          {selectedAdmission.documents?.join(", ") || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Applied Date</span>
                        <span className="font-semibold">
                          {selectedAdmission.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {selectedAdmission.status === "Pending" && (
                      <>
                        <button
                          onClick={() => {
                            handleApprove(selectedAdmission.id);
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          <FaCheckCircle className="inline mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => {
                            handleReject(selectedAdmission.id);
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          <FaTimesCircle className="inline mr-2" /> Reject
                        </button>
                      </>
                    )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default New_admission;
