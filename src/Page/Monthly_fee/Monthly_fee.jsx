// src/Page/Admin/Monthly_fee.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Monthly_fee = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("finance");
  const [activeSubMenu, setActiveSubMenu] = useState("monthly-fee");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
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

  // Monthly fee data
  const [monthlyFees, setMonthlyFees] = useState(() => {
    const saved = localStorage.getItem("monthlyFees");
    if (saved) {
      return JSON.parse(saved);
    }
    // Generate sample data
    const sampleData = [];
    const students = [
      {
        name: "Ahmed Hasan",
        id: "STU001",
        class: "Class 8",
        subject: "Tajweed",
      },
      {
        name: "Fatima Begum",
        id: "STU002",
        class: "Class 9",
        subject: "Tafsir",
      },
      {
        name: "Mohammad Ali",
        id: "STU003",
        class: "Class 10",
        subject: "Hadith",
      },
      { name: "Aisha Rahman", id: "STU004", class: "Class 7", subject: "Fiqh" },
      {
        name: "Rahim Uddin",
        id: "STU005",
        class: "Class 8",
        subject: "Tajweed",
      },
      {
        name: "Sadia Afrin",
        id: "STU006",
        class: "Class 10",
        subject: "Hadith",
      },
      {
        name: "Hasan Mahmud",
        id: "STU007",
        class: "Class 6",
        subject: "Tajweed",
      },
      {
        name: "Khadija Akhter",
        id: "STU008",
        class: "Class 9",
        subject: "Tafsir",
      },
      {
        name: "Abdullah Al Mamun",
        id: "STU009",
        class: "Class 10",
        subject: "Hadith",
      },
      {
        name: "Ayesha Khatun",
        id: "STU010",
        class: "Class 7",
        subject: "Fiqh",
      },
    ];

    const feeAmounts = {
      "Class 6": 2000,
      "Class 7": 2200,
      "Class 8": 2500,
      "Class 9": 3000,
      "Class 10": 2800,
    };

    // Generate 6 months of data
    for (let m = 0; m < 6; m++) {
      const monthIndex = (currentMonth - m + 12) % 12;
      const monthName = months[monthIndex];
      const year = currentYear - (monthIndex > currentMonth ? 1 : 0);

      students.forEach((student, idx) => {
        const amount = feeAmounts[student.class] || 2500;
        const statuses = ["Paid", "Paid", "Paid", "Partial", "Unpaid"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paidAmount =
          status === "Paid"
            ? amount
            : status === "Partial"
              ? Math.floor(amount * 0.6)
              : 0;

        sampleData.push({
          id: `MF-${year}-${String(monthIndex + 1).padStart(2, "0")}-${student.id}`,
          studentName: student.name,
          studentId: student.id,
          class: student.class,
          subject: student.subject,
          month: monthName,
          monthIndex: monthIndex,
          year: year,
          amount: amount,
          paidAmount: paidAmount,
          dueAmount: amount - paidAmount,
          status: status,
          paymentDate:
            status !== "Unpaid"
              ? `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`
              : null,
          paymentMethod:
            status !== "Unpaid"
              ? ["Cash", "Bank Transfer", "bKash", "Nagad"][
                  Math.floor(Math.random() * 4)
                ]
              : null,
          transactionId:
            status !== "Unpaid"
              ? `TXN${String(idx + 1).padStart(3, "0")}${String(monthIndex + 1).padStart(2, "0")}`
              : null,
          notes: status === "Partial" ? "Partial payment received" : "",
          collectedBy: status !== "Unpaid" ? "Admin" : null,
          invoiceNumber: `INV-${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(idx + 1).padStart(4, "0")}`,
        });
      });
    }
    return sampleData;
  });

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState(months[currentMonth]);
  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    subject: "",
    month: months[currentMonth],
    year: currentYear,
    amount: 0,
    paidAmount: 0,
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
    invoiceNumber: "",
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
  const statuses = ["All", "Paid", "Partial", "Unpaid"];
  const paymentMethods = [
    "Cash",
    "Bank Transfer",
    "bKash",
    "Nagad",
    "Rocket",
    "Check",
    "Credit Card",
  ];
  const years = [2024, 2025, 2026, 2027];

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

  // Save monthly fees to localStorage
  useEffect(() => {
    localStorage.setItem("monthlyFees", JSON.stringify(monthlyFees));
  }, [monthlyFees]);

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
      case "Paid":
        return <FaCheckCircleIcon className="text-green-500" />;
      case "Partial":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Unpaid":
        return <FaTimesCircleIcon className="text-red-500" />;
      default:
        return null;
    }
  };

  // Filter monthly fees
  const filteredFees = monthlyFees.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = fee.month === filterMonth;
    const matchesYear = fee.year === filterYear;
    const matchesStatus = filterStatus === "All" || fee.status === filterStatus;
    const matchesClass = filterClass === "All" || fee.class === filterClass;
    return (
      matchesSearch &&
      matchesMonth &&
      matchesYear &&
      matchesStatus &&
      matchesClass
    );
  });

  // Get unique values for filters
  const uniqueStatuses = ["All", ...new Set(monthlyFees.map((f) => f.status))];
  const uniqueClasses = ["All", ...new Set(monthlyFees.map((f) => f.class))];

  // Calculate monthly totals
  const monthlyTotal = filteredFees.reduce((sum, f) => sum + f.amount, 0);
  const monthlyPaid = filteredFees.reduce((sum, f) => sum + f.paidAmount, 0);
  const monthlyDue = filteredFees.reduce((sum, f) => sum + f.dueAmount, 0);
  const paidCount = filteredFees.filter((f) => f.status === "Paid").length;
  const partialCount = filteredFees.filter(
    (f) => f.status === "Partial",
  ).length;
  const unpaidCount = filteredFees.filter((f) => f.status === "Unpaid").length;
  const collectionRate =
    monthlyTotal > 0 ? Math.round((monthlyPaid / monthlyTotal) * 100) : 0;

  // Handle month change
  const handleMonthChange = (direction) => {
    const currentIndex = months.indexOf(filterMonth);
    let newIndex;
    let newYear = filterYear;
    if (direction === "prev") {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = 11;
        newYear = filterYear - 1;
      }
    } else {
      newIndex = currentIndex + 1;
      if (newIndex > 11) {
        newIndex = 0;
        newYear = filterYear + 1;
      }
    }
    setFilterMonth(months[newIndex]);
    setFilterYear(newYear);
  };

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const count = monthlyFees.length + 1;
    return `INV-${year}-${month}-${String(count).padStart(4, "0")}`;
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      studentName: "",
      studentId: "",
      class: "",
      subject: "",
      month: filterMonth,
      year: filterYear,
      amount: 0,
      paidAmount: 0,
      paymentDate: "",
      paymentMethod: "",
      transactionId: "",
      notes: "",
      invoiceNumber: generateInvoiceNumber(),
    });
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (fee) => {
    setSelectedFee(fee);
    setFormData({
      studentName: fee.studentName,
      studentId: fee.studentId,
      class: fee.class,
      subject: fee.subject,
      month: fee.month,
      year: fee.year,
      amount: fee.amount,
      paidAmount: fee.paidAmount || 0,
      paymentDate: fee.paymentDate || "",
      paymentMethod: fee.paymentMethod || "",
      transactionId: fee.transactionId || "",
      notes: fee.notes || "",
      invoiceNumber: fee.invoiceNumber,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (fee) => {
    setSelectedFee(fee);
    setShowDetailsModal(true);
  };

  // Handle add fee
  const handleAddFee = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.class ||
      !formData.amount ||
      !formData.month
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    // Check if fee already exists for this student and month
    const existing = monthlyFees.find(
      (f) =>
        f.studentName === formData.studentName &&
        f.month === formData.month &&
        f.year === formData.year,
    );
    if (existing) {
      Swal.fire({
        icon: "warning",
        title: "Fee Already Exists",
        text: `A fee record already exists for ${formData.studentName} for ${formData.month} ${formData.year}`,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const paidAmount = formData.paidAmount || 0;
    const dueAmount = formData.amount - paidAmount;
    const status =
      dueAmount === 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

    const newFee = {
      id: `MF-${formData.year}-${String(months.indexOf(formData.month) + 1).padStart(2, "0")}-${formData.studentId || `STU${String(monthlyFees.length + 1).padStart(3, "0")}`}`,
      studentName: formData.studentName,
      studentId:
        formData.studentId ||
        `STU${String(monthlyFees.length + 1).padStart(3, "0")}`,
      class: formData.class,
      subject: formData.subject || "N/A",
      month: formData.month,
      monthIndex: months.indexOf(formData.month),
      year: formData.year,
      amount: formData.amount,
      paidAmount: paidAmount,
      dueAmount: dueAmount,
      status: status,
      paymentDate:
        paidAmount > 0
          ? formData.paymentDate || new Date().toISOString().split("T")[0]
          : null,
      paymentMethod: paidAmount > 0 ? formData.paymentMethod : null,
      transactionId:
        paidAmount > 0
          ? formData.transactionId ||
            `TXN${String(monthlyFees.length + 1).padStart(3, "0")}`
          : null,
      notes: formData.notes || "",
      collectedBy: paidAmount > 0 ? adminInfo.name : null,
      invoiceNumber: formData.invoiceNumber || generateInvoiceNumber(),
    };

    setMonthlyFees([...monthlyFees, newFee]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Monthly Fee Added!",
      text: `Fee record for ${formData.studentName} for ${formData.month} ${formData.year} has been created.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit fee
  const handleEditFee = (e) => {
    e.preventDefault();

    const paidAmount = formData.paidAmount || 0;
    const dueAmount = selectedFee.amount - paidAmount;
    const status =
      dueAmount === 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

    setMonthlyFees(
      monthlyFees.map((f) =>
        f.id === selectedFee.id
          ? {
              ...f,
              paidAmount: paidAmount,
              dueAmount: dueAmount,
              status: status,
              paymentDate:
                paidAmount > 0
                  ? formData.paymentDate ||
                    new Date().toISOString().split("T")[0]
                  : null,
              paymentMethod: paidAmount > 0 ? formData.paymentMethod : null,
              transactionId: paidAmount > 0 ? formData.transactionId : null,
              notes: formData.notes || "",
              collectedBy: paidAmount > 0 ? adminInfo.name : null,
            }
          : f,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Payment Updated!",
      text: `Payment record for ${selectedFee.studentName} has been updated.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle mark as paid
  const handleMarkAsPaid = (fee) => {
    Swal.fire({
      title: "Mark as Paid?",
      text: `Mark ${fee.studentName}'s monthly fee as paid?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as paid!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMonthlyFees(
          monthlyFees.map((f) =>
            f.id === fee.id
              ? {
                  ...f,
                  status: "Paid",
                  paidAmount: f.amount,
                  dueAmount: 0,
                  paymentDate: new Date().toISOString().split("T")[0],
                  paymentMethod: f.paymentMethod || "Cash",
                  collectedBy: adminInfo.name,
                  transactionId:
                    f.transactionId || `TXN${String(Date.now()).slice(-6)}`,
                }
              : f,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Marked as Paid!",
          text: `${fee.studentName}'s monthly fee has been marked as paid.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle delete fee
  const handleDeleteFee = (id) => {
    Swal.fire({
      title: "Delete Fee Record?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMonthlyFees(monthlyFees.filter((f) => f.id !== id));
        Swal.fire("Deleted!", "Fee record has been deleted.", "success");
      }
    });
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

  // Generate monthly report
  const generateReport = () => {
    const totalStudents = filteredFees.length;
    const totalCollected = filteredFees.reduce(
      (sum, f) => sum + f.paidAmount,
      0,
    );
    const totalDue = filteredFees.reduce((sum, f) => sum + f.dueAmount, 0);
    const paidStudents = filteredFees.filter((f) => f.status === "Paid").length;

    Swal.fire({
      title: "Monthly Report",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>Month:</strong> ${filterMonth} ${filterYear}</p>
          <p><strong>Total Students:</strong> ${totalStudents}</p>
          <p><strong>Total Amount:</strong> ${formatCurrency(monthlyTotal)}</p>
          <p><strong>Total Collected:</strong> ${formatCurrency(totalCollected)}</p>
          <p><strong>Total Due:</strong> ${formatCurrency(totalDue)}</p>
          <p><strong>Collection Rate:</strong> ${collectionRate}%</p>
          <p><strong>Paid Students:</strong> ${paidStudents}</p>
          <p><strong>Partial Students:</strong> ${partialCount}</p>
          <p><strong>Unpaid Students:</strong> ${unpaidCount}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Download Report",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Report Downloaded!",
          text: "Monthly fee report has been downloaded as PDF.",
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
          <h1 className="text-sm font-bold text-gray-800">Monthly Fee</h1>
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
                <FaMoneyBillWave className="text-green-600" /> Monthly Fee
              </h1>
              <p className="text-xs text-gray-500">
                Manage monthly fee collection
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Add Monthly Fee
              </button>
              <button
                onClick={generateReport}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaFileDownload size={12} /> Generate Report
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

          {/* Month Navigation & Stats */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleMonthChange("prev")}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <h2 className="text-lg font-bold text-gray-800 min-w-[150px] text-center">
                  {filterMonth} {filterYear}
                </h2>
                <button
                  onClick={() => handleMonthChange("next")}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaArrowRight />
                </button>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-bold text-blue-600">
                    {formatCurrency(monthlyTotal)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Collected:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(monthlyPaid)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Due:</span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(monthlyDue)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Rate:</span>
                  <span className="font-bold text-purple-600">
                    {collectionRate}%
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
                  placeholder="Search by student name, ID or invoice..."
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
              </div>
            </div>
          </div>

          {/* Fee Records Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-380px)] overflow-y-auto">
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
                      Amount
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Paid
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Due
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
                  {filteredFees.length > 0 ? (
                    filteredFees.map((fee, index) => (
                      <tr
                        key={fee.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {fee.studentName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {fee.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {fee.class}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {fee.subject}
                        </td>
                        <td className="px-3 py-2 font-semibold text-gray-700">
                          {formatCurrency(fee.amount)}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell text-green-600 font-semibold">
                          {formatCurrency(fee.paidAmount)}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell text-red-600 font-semibold">
                          {formatCurrency(fee.dueAmount)}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(fee.status)}`}
                          >
                            {getStatusIcon(fee.status)}
                            {fee.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(fee)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-all"
                              title="View Details"
                            >
                              <FaEye size={12} />
                            </button>
                            {fee.status !== "Paid" && (
                              <button
                                onClick={() => handleMarkAsPaid(fee)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                                title="Mark as Paid"
                              >
                                <FaCheckCircleIcon size={12} />
                              </button>
                            )}
                            <button
                              onClick={() => openEditModal(fee)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-all"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteFee(fee.id)}
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
                        colSpan="9"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaMoneyBillWave className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>
                          No fee records found for {filterMonth} {filterYear}
                        </p>
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

      {/* Add Monthly Fee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-green-600" /> Add Monthly Fee
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddFee} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Subject
                  </label>
                  <select
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month *
                  </label>
                  <select
                    required
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <select
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fee Amount (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter fee amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid Amount (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.paidAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paidAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter paid amount"
                  />
                </div>
              </div>

              {formData.paidAmount > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentDate: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transactionId: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </>
              )}

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Invoice number"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Monthly Fee
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

      {/* Edit Payment Modal */}
      {showEditModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaEdit className="text-yellow-600" /> Update Payment
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{selectedFee.studentName}</span>
                  <span className="text-gray-400 ml-2">
                    ({selectedFee.studentId})
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedFee.month} {selectedFee.year} • {selectedFee.class} •{" "}
                  {selectedFee.subject}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-bold text-blue-600 ml-1">
                      {formatCurrency(selectedFee.amount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Due:</span>
                    <span className="font-bold text-red-600 ml-1">
                      {formatCurrency(selectedFee.dueAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleEditFee} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid Amount (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max={selectedFee.amount}
                    value={formData.paidAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paidAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter paid amount"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Max: {formatCurrency(selectedFee.amount)}
                  </p>
                </div>

                {formData.paidAmount > 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentDate: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        value={formData.transactionId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            transactionId: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter transaction ID"
                      />
                    </div>
                  </>
                )}

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
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaSave className="inline mr-2" size={14} /> Update Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
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

      {/* Details Modal */}
      {showDetailsModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoiceIcon className="text-blue-600" /> Monthly Fee
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
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedFee.studentName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedFee.studentId}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFee.status)}`}
                >
                  {getStatusIcon(selectedFee.status)}
                  {selectedFee.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Class</p>
                  <p className="text-sm font-semibold">{selectedFee.class}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Subject</p>
                  <p className="text-sm font-semibold">{selectedFee.subject}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Month/Year</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.month} {selectedFee.year}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Total Amount</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {formatCurrency(selectedFee.amount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Paid Amount</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(selectedFee.paidAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Due Amount</p>
                  <p className="text-sm font-semibold text-red-600">
                    {formatCurrency(selectedFee.dueAmount)}
                  </p>
                </div>
              </div>

              {selectedFee.paymentDate && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Payment Date</p>
                    <p className="text-sm font-semibold">
                      {formatDate(selectedFee.paymentDate)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Payment Method</p>
                    <p className="text-sm font-semibold">
                      {selectedFee.paymentMethod || "-"}
                    </p>
                  </div>
                </div>
              )}

              {selectedFee.transactionId && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Transaction ID</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.transactionId}
                  </p>
                </div>
              )}

              {selectedFee.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notes</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedFee.notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Invoice Number</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.invoiceNumber}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Collected By</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.collectedBy || "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedFee.status !== "Paid" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleMarkAsPaid(selectedFee);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaCheckCircleIcon className="inline mr-2" /> Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedFee);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaEdit className="inline mr-2" /> Edit Payment
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

export default Monthly_fee;
