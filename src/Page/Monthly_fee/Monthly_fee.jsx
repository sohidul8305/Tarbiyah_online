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
  FaCalendarCheck,
  FaChartLine,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaLayerGroup,
  FaSave,
  FaUserTimes,
  FaHourglassHalf,
  FaFileDownload,
  FaFileInvoice,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ ELDERS DEPARTMENT
// ============================================================
const ELDERS_TEACHERS = ["Jubayer Ahmad", "Sumaiya Afrin Mim"];

const ELDERS_COURSES = [
  "Qaida Nuraniyah",
  "Quran Nazera",
  "Najera",
  "Basic Tajweed",
  "Bakarah Hifz",
];

const ELDERS_CLASSES = [
  "Elders Batch A",
  "Elders Batch B",
  "Elders Batch C",
  "Elders Batch D",
  "Elders Batch E",
];

const ELDERS_BATCHES = [
  "Batch-01",
  "Batch-02",
  "Batch-03",
  "Batch-04",
  "Batch-05",
  "Batch-06",
];

const ELDERS_COURSE_KEYWORDS = [
  "qaida nuraniyah",
  "qaida nooraniya",
  "qaida noorani",
  "qaida nurani",
  "qaidah nuraniyah",
  "qaidah nooraniya",
  "qaidah noorani",
  "quran nazera",
  "nazera quran",
  "quran najera",
  "najera quran",
  "bakarah hifz",
  "bakara hifz",
  "baqarah hifz",
  "baqara hifz",
  "basic tajweed",
];

const isSingleEldersCourse = (singleCourse) => {
  const p = String(singleCourse).toLowerCase().trim();
  if (!p) return false;
  return ELDERS_COURSE_KEYWORDS.some((c) => {
    if (p === c) return true;
    if (p.includes(c)) return true;
    if (c.includes(p) && p.length >= 8) return true;
    return false;
  });
};

const isEldersCourse = (courseStr) => {
  if (!courseStr) return false;
  const parts = String(courseStr)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every((part) => isSingleEldersCourse(part));
};

const getPrimaryCourse = (courseStr) => {
  if (!courseStr) return "";
  const first = String(courseStr).split(",")[0].trim().toLowerCase();
  if (first.includes("qaida")) return "Qaida Nuraniyah";
  if (first.includes("najera") || first.includes("nazera")) return "Najera";
  if (first.includes("tajweed")) return "Basic Tajweed";
  if (first.includes("bakarah") || first.includes("bakara"))
    return "Bakarah Hifz";
  return "Qaida Nuraniyah";
};

// ✅ Elders students fallback
const ELDERS_STUDENTS_FALLBACK = [
  {
    _id: "ELDERS_STU_001",
    name: "Omer Faruk",
    studentId: "TET26FB6001",
    course: "Qaida Nooraniya, Bakarah Hifz",
    primaryCourse: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    phone: "",
    email: "omer@gmail.com",
    courseFee: 5000,
  },
  {
    _id: "ELDERS_STU_002",
    name: "Ikramm",
    studentId: "TET26FB6002",
    course: "Qaida Nooraniya, Bakarah Hifz",
    primaryCourse: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    phone: "",
    email: "ikramm@gmail.com",
    courseFee: 5000,
  },
];

// ✅ Sample fee records for elders
const ELDERS_DEFAULT_FEES = [
  {
    id: "MF-2026-09-001",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    class: "Elders Batch A",
    batch: "Batch-03",
    subject: "Qaida Nuraniyah",
    month: "September",
    monthIndex: 8,
    year: 2026,
    amount: 5000,
    paidAmount: 5000,
    dueAmount: 0,
    status: "Paid",
    paymentDate: "2026-09-05",
    paymentMethod: "bKash",
    transactionId: "DGD9CFHU69",
    notes: "",
    collectedBy: "Admin",
    invoiceNumber: "INV-2026-09-0001",
  },
  {
    id: "MF-2026-09-002",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    class: "Elders Batch A",
    batch: "Batch-03",
    subject: "Qaida Nuraniyah",
    month: "September",
    monthIndex: 8,
    year: 2026,
    amount: 5000,
    paidAmount: 3000,
    dueAmount: 2000,
    status: "Partial",
    paymentDate: "2026-09-06",
    paymentMethod: "Nagad",
    transactionId: "DGX9PQ45MN",
    notes: "Partial payment",
    collectedBy: "Admin",
    invoiceNumber: "INV-2026-09-0002",
  },
];

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
    department: "Quran for Elders",
    joinDate: "",
  });

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

  // ✅ Elders students from API
  const [eldersStudents, setEldersStudents] = useState(
    ELDERS_STUDENTS_FALLBACK,
  );
  const [studentsLoading, setStudentsLoading] = useState(true);

  // ✅ Elders monthly fees
  const [monthlyFees, setMonthlyFees] = useState(() => {
    const saved = localStorage.getItem("eldersMonthlyFees");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_FEES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState(months[currentMonth]);
  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    batch: "",
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

  const statuses = ["All", "Paid", "Partial", "Unpaid"];
  const paymentMethods = ["Cash", "bKash", "Nagad", "Rocket", "Bank Transfer"];
  const years = [2024, 2025, 2026, 2027];

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      try {
        setAdminInfo(JSON.parse(savedAdmin));
      } catch (err) {
        console.error(err);
      }
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Quran for Elders",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ============================================================
  // ✅ Fetch elders students from API
  // ============================================================
  const fetchEldersStudents = async () => {
    try {
      setStudentsLoading(true);
      let eldersList = [...ELDERS_STUDENTS_FALLBACK];

      try {
        const res = await fetch(`${API_BASE}/api/students/all`);
        const text = await res.text();

        if (!text.trim().startsWith("<")) {
          const data = JSON.parse(text);
          if (data.success && Array.isArray(data.students)) {
            const all = data.students || [];
            const elders = all.filter((s) => isEldersCourse(s.course));

            console.log("📥 Total students:", all.length);
            console.log("✅ Elders students:", elders.length);

            elders.forEach((s) => {
              const formatted = {
                _id: s._id,
                name: s.name || "",
                studentId: s.studentId || s._id?.slice(-8) || "N/A",
                course: s.course || "",
                primaryCourse: getPrimaryCourse(s.course),
                class: s.batch || s.class || "Elders Batch A",
                batch: s.batch || "Batch-03",
                phone: s.phone || "",
                email: s.email || "",
                courseFee: Number(s.courseFee) || 5000,
              };

              const exists = eldersList.some(
                (e) =>
                  (e.name || "").toLowerCase() ===
                  (formatted.name || "").toLowerCase(),
              );
              if (!exists) eldersList.push(formatted);
            });
          }
        }
      } catch (apiErr) {
        console.warn("API fetch skipped:", apiErr.message);
      }

      console.log("✅ Final elders students:", eldersList.length);
      setEldersStudents(eldersList);
    } catch (err) {
      console.error("❌ Fetch students error:", err);
      setEldersStudents(ELDERS_STUDENTS_FALLBACK);
    } finally {
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    fetchEldersStudents();
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("eldersMonthlyFees", JSON.stringify(monthlyFees));
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
      console.error(err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

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
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine className="text-xl" />,
      label: "Report & Analytics",
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase className="text-xl" />,
      label: "CRM Management",
    },
  ];

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <FaCheckCircle className="text-green-500" size={10} />;
      case "Partial":
        return <FaHourglassHalf className="text-yellow-500" size={10} />;
      case "Unpaid":
        return <FaTimesCircle className="text-red-500" size={10} />;
      default:
        return null;
    }
  };

  const filteredFees = monthlyFees.filter((fee) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (fee.studentName || "").toLowerCase().includes(s) ||
      (fee.studentId || "").toLowerCase().includes(s) ||
      (fee.invoiceNumber || "").toLowerCase().includes(s);
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

  const uniqueStatuses = ["All", ...new Set(monthlyFees.map((f) => f.status))];
  const uniqueClasses = ["All", ...new Set(monthlyFees.map((f) => f.class))];

  const monthlyTotal = filteredFees.reduce(
    (sum, f) => sum + (f.amount || 0),
    0,
  );
  const monthlyPaid = filteredFees.reduce(
    (sum, f) => sum + (f.paidAmount || 0),
    0,
  );
  const monthlyDue = filteredFees.reduce(
    (sum, f) => sum + (f.dueAmount || 0),
    0,
  );
  const partialCount = filteredFees.filter(
    (f) => f.status === "Partial",
  ).length;
  const unpaidCount = filteredFees.filter((f) => f.status === "Unpaid").length;
  const collectionRate =
    monthlyTotal > 0 ? Math.round((monthlyPaid / monthlyTotal) * 100) : 0;

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

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const count = monthlyFees.length + 1;
    return `INV-${year}-${month}-${String(count).padStart(4, "0")}`;
  };

  const openAddModal = () => {
    const first = eldersStudents[0];
    setFormData({
      studentName: first?.name || "",
      studentId: first?.studentId || "",
      class: first?.class || ELDERS_CLASSES[0],
      batch: first?.batch || "Batch-03",
      subject: first?.primaryCourse || ELDERS_COURSES[0],
      month: filterMonth,
      year: filterYear,
      amount: first?.courseFee || 5000,
      paidAmount: 0,
      paymentDate: "",
      paymentMethod: "",
      transactionId: "",
      notes: "",
      invoiceNumber: generateInvoiceNumber(),
    });
    setShowAddModal(true);
  };

  const handleStudentSelect = (studentId) => {
    const s = eldersStudents.find((st) => st._id === studentId);
    if (!s) return;
    setFormData((prev) => ({
      ...prev,
      studentName: s.name,
      studentId: s.studentId,
      class: s.class,
      batch: s.batch,
      subject: s.primaryCourse || s.course,
      amount: s.courseFee || prev.amount,
    }));
  };

  const openEditModal = (fee) => {
    setSelectedFee(fee);
    setFormData({
      studentName: fee.studentName,
      studentId: fee.studentId,
      class: fee.class,
      batch: fee.batch || "",
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

  const openDetailsModal = (fee) => {
    setSelectedFee(fee);
    setShowDetailsModal(true);
  };

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
        text: `Already exists for ${formData.studentName} - ${formData.month} ${formData.year}`,
      });
      return;
    }

    const paidAmount = Number(formData.paidAmount) || 0;
    const dueAmount = formData.amount - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

    const newFee = {
      id: `MF-${formData.year}-${String(months.indexOf(formData.month) + 1).padStart(2, "0")}-${formData.studentId || `STU${String(monthlyFees.length + 1).padStart(3, "0")}`}`,
      studentName: formData.studentName,
      studentId: formData.studentId,
      class: formData.class,
      batch: formData.batch || "",
      subject: formData.subject || "N/A",
      month: formData.month,
      monthIndex: months.indexOf(formData.month),
      year: formData.year,
      amount: Number(formData.amount),
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
          ? formData.transactionId || `TXN${Date.now().toString().slice(-6)}`
          : null,
      notes: formData.notes || "",
      collectedBy: paidAmount > 0 ? adminInfo.name : null,
      invoiceNumber: formData.invoiceNumber || generateInvoiceNumber(),
    };

    setMonthlyFees([...monthlyFees, newFee]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Monthly Fee Added!",
      text: formData.studentName,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditFee = (e) => {
    e.preventDefault();

    const paidAmount = Number(formData.paidAmount) || 0;
    const dueAmount = selectedFee.amount - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

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
      title: "✅ Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleMarkAsPaid = (fee) => {
    Swal.fire({
      title: "Mark as Paid?",
      text: `Mark ${fee.studentName}'s fee as paid?`,
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
                    f.transactionId || `TXN${Date.now().toString().slice(-6)}`,
                }
              : f,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "✅ Marked as Paid!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

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
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const formatCurrency = (amount) => `৳${(amount || 0).toLocaleString()}`;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const generateReport = () => {
    Swal.fire({
      title: "Monthly Report",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>Month:</strong> ${filterMonth} ${filterYear}</p>
          <p><strong>Total Students:</strong> ${filteredFees.length}</p>
          <p><strong>Total Amount:</strong> ${formatCurrency(monthlyTotal)}</p>
          <p><strong>Total Collected:</strong> ${formatCurrency(monthlyPaid)}</p>
          <p><strong>Total Due:</strong> ${formatCurrency(monthlyDue)}</p>
          <p><strong>Collection Rate:</strong> ${collectionRate}%</p>
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
          title: "✅ Report Downloaded!",
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
          <h1 className="text-sm font-bold text-gray-800">
            Monthly Fee (Elders)
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0
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

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                      }`}
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                      }`}
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

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" /> Monthly Fee —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                {studentsLoading
                  ? "Loading elders students..."
                  : `${eldersStudents.length} elders student${eldersStudents.length !== 1 ? "s" : ""} • Qaida • Nazera • Najera • Tajweed • Bakarah Hifz`}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={fetchEldersStudents}
                disabled={studentsLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={studentsLoading ? "animate-spin" : ""}
                />
                Refresh
              </button>
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Add Monthly Fee
              </button>
              <button
                onClick={generateReport}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFileDownload size={12} /> Report
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ✅ Elders Students Card */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-3">
            <p className="text-xs font-bold text-teal-800 mb-2 flex items-center gap-1">
              <FaUsers size={12} /> Elders Students ({eldersStudents.length})
            </p>
            {studentsLoading && eldersStudents.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                Loading from API...
              </div>
            ) : eldersStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {eldersStudents.map((s) => (
                  <div
                    key={s._id}
                    className="bg-white border border-teal-200 rounded-lg p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {(s.name || "S").charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        {s.studentId} • {s.class}
                      </p>
                      <p className="text-[10px] text-teal-600 truncate">
                        {s.course}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">
                No elders students found.
              </p>
            )}
          </div>

          {/* Month Navigation & Stats */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleMonthChange("prev")}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaArrowLeft />
                </button>
                <h2 className="text-lg font-bold text-gray-800 min-w-[150px] text-center">
                  {filterMonth} {filterYear}
                </h2>
                <button
                  onClick={() => handleMonthChange("next")}
                  className="p-2 rounded-lg hover:bg-gray-100"
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
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueClasses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-540px)] overflow-y-auto">
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
                      Course
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
                      <tr key={fee.id} className="hover:bg-gray-50">
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
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="View"
                            >
                              <FaEye size={12} />
                            </button>
                            {fee.status !== "Paid" && (
                              <button
                                onClick={() => handleMarkAsPaid(fee)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Mark Paid"
                              >
                                <FaCheckCircle size={12} />
                              </button>
                            )}
                            <button
                              onClick={() => openEditModal(fee)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteFee(fee.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
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
                          No fee records for {filterMonth} {filterYear}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          উপরে "Add Monthly Fee" ক্লিক করে যোগ করুন
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

      {/* Add Fee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-green-600" /> Add Elders Monthly
                Fee
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddFee} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Student select করলে বাকি information auto-fill হবে
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Elders Student *
                </label>
                <select
                  required
                  value={
                    eldersStudents.find(
                      (s) => s.studentId === formData.studentId,
                    )?._id || ""
                  }
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Student</option>
                  {eldersStudents.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} — {s.course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                {formData.paidAmount > 0 && (
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
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="">Select</option>
                      {paymentMethods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {formData.paidAmount > 0 && (
                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
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
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="TXN ID"
                    />
                  </div>
                </div>
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
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Fee
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
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
                  {selectedFee.month} {selectedFee.year} • {selectedFee.class}
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
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
                        className="w-full border rounded-lg px-3 py-2 text-sm"
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
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select</option>
                        {paymentMethods.map((m) => (
                          <option key={m} value={m}>
                            {m}
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
                        className="w-full border rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold text-sm"
                  >
                    <FaSave className="inline mr-2" size={14} /> Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
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
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoice className="text-blue-600" /> Elders Fee Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
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
                  <p className="text-[10px] text-gray-400">Batch</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.batch || "-"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Course</p>
                  <p className="text-sm font-semibold">{selectedFee.subject}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Month/Year</p>
                  <p className="text-sm font-semibold">
                    {selectedFee.month} {selectedFee.year}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Amount</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {formatCurrency(selectedFee.amount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Paid</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(selectedFee.paidAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Due</p>
                  <p className="text-sm font-semibold text-red-600">
                    {formatCurrency(selectedFee.dueAmount)}
                  </p>
                </div>
                {selectedFee.paymentDate && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Payment Date</p>
                    <p className="text-sm font-semibold">
                      {formatDate(selectedFee.paymentDate)}
                    </p>
                  </div>
                )}
                {selectedFee.paymentMethod && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Method</p>
                    <p className="text-sm font-semibold">
                      {selectedFee.paymentMethod}
                    </p>
                  </div>
                )}
              </div>

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
                  <p className="text-[10px] text-gray-400">Invoice</p>
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

              <div className="flex gap-3 pt-4 border-t">
                {selectedFee.status !== "Paid" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleMarkAsPaid(selectedFee);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    <FaCheckCircle className="inline mr-2" /> Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedFee);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
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
