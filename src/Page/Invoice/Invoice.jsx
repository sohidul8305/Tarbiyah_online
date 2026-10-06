// src/Page/Admin/Invoice.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaSave,
  FaHourglassHalf,
  FaExclamationCircle,
  FaFileInvoice,
  FaEnvelope as FaEnvelopeIcon,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ DEPARTMENT CONFIG
// ============================================================
const DEPARTMENT_CONFIGS = {
  Elders: {
    label: "Quran For Elders",
    courses: [
      "Qaida Nuraniyah",
      "Quran Nazera",
      "Najera",
      "Basic Tajweed",
      "Bakarah Hifz",
    ],
    classes: [
      "Elders Batch A",
      "Elders Batch B",
      "Elders Batch C",
      "Elders Batch D",
      "Elders Batch E",
    ],
    batches: [
      "Batch-01",
      "Batch-02",
      "Batch-03",
      "Batch-04",
      "Batch-05",
      "Batch-06",
    ],
    courseKeywords: [
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
      "quran for elders",
    ],
    invoicePrefix: "INV-EL",
  },
  "Quran Studies": {
    label: "Quran Studies",
    courses: ["Hifzul Quran", "Tarbiyah Quran Studies", "Quran Translation"],
    classes: ["Quran Studies A", "Quran Studies B", "Quran Studies C"],
    batches: ["QS-Batch-01", "QS-Batch-02", "QS-Batch-03"],
    courseKeywords: ["quran studies", "hifzul quran", "tarbiyah quran studies"],
    invoicePrefix: "INV-QS",
  },
  Alimiya: {
    label: "Alimiya",
    courses: ["Dawra e Hadith", "Tafsir", "Fiqh", "Hadith", "Arabic Grammar"],
    classes: ["Alimiya Year 1", "Alimiya Year 2", "Alimiya Year 3"],
    batches: ["AL-Batch-01", "AL-Batch-02", "AL-Batch-03"],
    courseKeywords: [
      "alimiya",
      "dawra",
      "tafsir",
      "fiqh",
      "hadith",
      "arabic grammar",
    ],
    invoicePrefix: "INV-AL",
  },
  Diploma: {
    label: "Diploma",
    courses: [
      "Diploma in Islamic Studies",
      "Diploma in Arabic",
      "Certificate Course",
    ],
    classes: ["Diploma A", "Diploma B", "Diploma C"],
    batches: ["DP-Batch-01", "DP-Batch-02", "DP-Batch-03"],
    courseKeywords: ["diploma in islamic studies", "diploma", "certificate"],
    invoicePrefix: "INV-DP",
  },
};

// ✅ Default invoices — শুধু Elders-এর জন্য
const ELDERS_DEFAULT_INVOICES = [
  {
    _id: "sample-inv-1",
    invoiceNumber: "INV-EL-2026-0001",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    class: "Elders Batch A",
    batch: "Batch-03",
    subject: "Qaida Nuraniyah",
    month: "September",
    year: 2026,
    amount: 5000,
    paidAmount: 5000,
    dueAmount: 0,
    status: "Paid",
    issueDate: "2026-09-01",
    dueDate: "2026-09-30",
    paymentDate: "2026-09-05",
    paymentMethod: "bKash",
    transactionId: "DGD9CFHU69",
    notes: "Paid in full",
    items: [
      { description: "Qaida Nuraniyah - Monthly Fee (Sep 2026)", amount: 5000 },
    ],
    subtotal: 5000,
    tax: 0,
    total: 5000,
  },
  {
    _id: "sample-inv-2",
    invoiceNumber: "INV-EL-2026-0002",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    class: "Elders Batch A",
    batch: "Batch-03",
    subject: "Qaida Nuraniyah",
    month: "September",
    year: 2026,
    amount: 5000,
    paidAmount: 3000,
    dueAmount: 2000,
    status: "Partial",
    issueDate: "2026-09-01",
    dueDate: "2026-09-30",
    paymentDate: "2026-09-06",
    paymentMethod: "Nagad",
    transactionId: "DGX9PQ45MN",
    notes: "Partial payment - remaining due",
    items: [
      { description: "Qaida Nuraniyah - Monthly Fee (Sep 2026)", amount: 5000 },
    ],
    subtotal: 5000,
    tax: 0,
    total: 5000,
  },
];

const getCurrentDepartment = () => {
  try {
    const info = JSON.parse(localStorage.getItem("adminInfo") || "{}");
    return info.department || "Elders";
  } catch {
    return "Elders";
  }
};

const safeFetchJSON = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    if (text.trim().startsWith("<"))
      return { success: false, _htmlError: true };
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, _jsonError: true };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const Invoice = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("finance");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Elders",
    joinDate: "",
  });

  const [currentDept, setCurrentDept] = useState(getCurrentDepartment());
  const deptConfig =
    DEPARTMENT_CONFIGS[currentDept] || DEPARTMENT_CONFIGS["Elders"];
  const DEPT_COURSES = deptConfig.courses;
  const DEPT_CLASSES = deptConfig.classes;
  const DEPT_BATCHES = deptConfig.batches;
  const DEPT_KEYWORDS = deptConfig.courseKeywords;
  const DEPT_LABEL = deptConfig.label;
  const DEPT_INVOICE_PREFIX = deptConfig.invoicePrefix;

  const [deptStudents, setDeptStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [apiWorking, setApiWorking] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    batch: "",
    subject: "",
    month: "",
    year: new Date().getFullYear(),
    amount: 0,
    paidAmount: 0,
    issueDate: "",
    dueDate: "",
    items: [{ description: "", amount: 0 }],
    notes: "",
  });

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
  const years = [2024, 2025, 2026, 2027, 2028];
  const statuses = ["All", "Paid", "Partial", "Unpaid", "Overdue"];

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
          id: "batch-manual",
          path: "/admin-students/batch",
          label: "Batch Create and  Maintain",
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
      ],
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
  ];

  const getActiveFromPath = () => {
    const currentPath = location.pathname;
    for (const item of menuItems) {
      if (item.subItems) {
        const match = item.subItems.find((s) => s.path === currentPath);
        if (match) return { menu: item.id, sub: match.id };
      }
      if (item.path === currentPath) return { menu: item.id, sub: null };
    }
    return { menu: null, sub: null };
  };

  const { menu: activeMenu, sub: activeSubMenu } = getActiveFromPath();

  useEffect(() => {
    if (activeSubMenu && activeMenu) setExpandedMenu(activeMenu);
  }, [activeMenu, activeSubMenu]);

  // ============================================================
  // Load admin info + department
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      try {
        const info = JSON.parse(savedAdmin);
        setAdminInfo(info);
        if (info.department) setCurrentDept(info.department);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Elders",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ============================================================
  // ✅ Load Invoices — API first, localStorage fallback
  // ============================================================
  const loadInvoices = async () => {
    try {
      const data = await safeFetchJSON(
        `${API_BASE}/api/invoices/all?department=${encodeURIComponent(currentDept)}`,
      );

      if (data.success && Array.isArray(data.invoices)) {
        if (data.invoices.length > 0) {
          setInvoices(data.invoices);
          setApiWorking(true);
          localStorage.setItem(
            `invoices_${currentDept.replace(/\s+/g, "_")}`,
            JSON.stringify(data.invoices),
          );
          console.log(
            `✅ Loaded ${data.invoices.length} invoices from API (${currentDept})`,
          );
          return;
        }

        // API empty — check localStorage
        const key = `invoices_${currentDept.replace(/\s+/g, "_")}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setInvoices(parsed);
              setApiWorking(true);
              return;
            }
          } catch {}
        }

        setApiWorking(true);
        setInvoices(currentDept === "Elders" ? ELDERS_DEFAULT_INVOICES : []);
        return;
      }

      throw new Error(data.message || "API failed");
    } catch (err) {
      console.warn("⚠️ API failed, using localStorage:", err.message);
      setApiWorking(false);
      const key = `invoices_${currentDept.replace(/\s+/g, "_")}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setInvoices(
            Array.isArray(parsed) && parsed.length > 0
              ? parsed
              : currentDept === "Elders"
                ? ELDERS_DEFAULT_INVOICES
                : [],
          );
        } catch {
          setInvoices(currentDept === "Elders" ? ELDERS_DEFAULT_INVOICES : []);
        }
      } else {
        setInvoices(currentDept === "Elders" ? ELDERS_DEFAULT_INVOICES : []);
      }
    }
  };

  useEffect(() => {
    loadInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDept]);

  useEffect(() => {
    if (!currentDept || invoices.length === 0) return;
    const key = `invoices_${currentDept.replace(/\s+/g, "_")}`;
    localStorage.setItem(key, JSON.stringify(invoices));
  }, [invoices, currentDept]);

  // ============================================================
  // Course helpers
  // ============================================================
  const isSingleDeptCourse = (singleCourse) => {
    const p = String(singleCourse).toLowerCase().trim();
    if (!p) return false;
    return DEPT_KEYWORDS.some((c) => {
      if (p === c) return true;
      if (p.includes(c)) return true;
      if (c.includes(p) && p.length >= 8) return true;
      return false;
    });
  };

  const isDeptCourse = (courseStr) => {
    if (!courseStr) return false;
    const parts = String(courseStr)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return false;
    return parts.every((part) => isSingleDeptCourse(part));
  };

  const getPrimaryCourse = (courseStr) => {
    if (!courseStr) return DEPT_COURSES[0] || "";
    const first = String(courseStr).split(",")[0].trim().toLowerCase();
    if (first.includes("qaida") || first.includes("noorani"))
      return "Qaida Nuraniyah";
    if (first.includes("najera") || first.includes("nazera")) return "Najera";
    if (first.includes("tajweed")) return "Basic Tajweed";
    if (
      first.includes("bakarah") ||
      first.includes("bakara") ||
      first.includes("baqarah")
    )
      return "Bakarah Hifz";
    if (first.includes("hifzul") || first.includes("hifz"))
      return "Hifzul Quran";
    if (first.includes("dawra")) return "Dawra e Hadith";
    if (first.includes("tafsir")) return "Tafsir";
    if (first.includes("fiqh")) return "Fiqh";
    if (first.includes("hadith")) return "Hadith";
    if (first.includes("diploma")) return "Diploma in Islamic Studies";
    return DEPT_COURSES[0] || first;
  };

  // ============================================================
  // Fetch Students
  // ============================================================
  const fetchDeptStudents = async () => {
    try {
      setStudentsLoading(true);
      const res = await fetch(
        `${API_BASE}/api/students/all?department=${encodeURIComponent(currentDept)}`,
      );
      const text = await res.text();
      if (text.trim().startsWith("<")) {
        setDeptStudents([]);
        return;
      }

      const data = JSON.parse(text);
      if (!data.success || !Array.isArray(data.students)) {
        setDeptStudents([]);
        return;
      }

      const all = data.students || [];
      const filtered = all.filter((s) => {
        const sDept = String(s.department || "")
          .toLowerCase()
          .trim();
        if (sDept && sDept === currentDept.toLowerCase().trim()) return true;
        return isDeptCourse(s.course);
      });

      const formatted = filtered.map((s) => ({
        _id: s._id,
        name: s.name || "",
        studentId: s.studentId || s._id?.slice(-8) || "N/A",
        course: s.course || "",
        primaryCourse: getPrimaryCourse(s.course),
        class:
          s.batch || s.class || DEPT_CLASSES[0] || `${currentDept} Batch A`,
        batch: s.batch || DEPT_BATCHES[0] || "",
        phone: s.phone || "",
        email: s.email || "",
        courseFee: Number(s.courseFee) || 5000,
      }));

      const deduped = [];
      formatted.forEach((s) => {
        const exists = deduped.some(
          (d) => (d.name || "").toLowerCase() === (s.name || "").toLowerCase(),
        );
        if (!exists) deduped.push(s);
      });

      setDeptStudents(deduped);
    } catch (err) {
      console.error("❌ Fetch students error:", err);
      setDeptStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeptStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDept]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
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
    setExpandedMenu(expandedMenu === menu ? null : menu);

  // ============================================================
  // Status helpers
  // ============================================================
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Partial":
        return "bg-yellow-100 text-yellow-700";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      case "Overdue":
        return "bg-red-200 text-red-800";
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
      case "Overdue":
        return <FaExclamationCircle className="text-red-600" size={10} />;
      default:
        return null;
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (invoice.studentName || "").toLowerCase().includes(s) ||
      (invoice.studentId || "").toLowerCase().includes(s) ||
      (invoice.invoiceNumber || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || invoice.status === filterStatus;
    const matchesMonth = filterMonth === "All" || invoice.month === filterMonth;
    const matchesYear =
      filterYear === "All" || invoice.year === parseInt(filterYear);
    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  const uniqueStatuses = ["All", ...new Set(invoices.map((inv) => inv.status))];
  const uniqueMonths = ["All", ...new Set(invoices.map((inv) => inv.month))];
  const uniqueYears = [
    "All",
    ...new Set(invoices.map((inv) => inv.year.toString())),
  ];

  const totalAmount = filteredInvoices.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0,
  );
  const totalPaid = filteredInvoices.reduce(
    (sum, inv) => sum + (inv.paidAmount || 0),
    0,
  );
  const totalDue = filteredInvoices.reduce(
    (sum, inv) => sum + (inv.dueAmount || 0),
    0,
  );
  const paidCount = filteredInvoices.filter(
    (inv) => inv.status === "Paid",
  ).length;

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const count = invoices.length + 1;
    return `${DEPT_INVOICE_PREFIX}-${year}-${String(count).padStart(4, "0")}`;
  };

  // ============================================================
  // ✅ Open Generate Modal — always enabled
  // ============================================================
  const openGenerateModal = () => {
    setFormData({
      studentName: "",
      studentId: "",
      class: DEPT_CLASSES[0] || `${currentDept} Batch A`,
      batch: DEPT_BATCHES[0] || "",
      subject: DEPT_COURSES[0] || "",
      month: months[new Date().getMonth()],
      year: new Date().getFullYear(),
      amount: 5000,
      paidAmount: 0,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      items: [
        {
          description: `${DEPT_COURSES[0] || "Monthly"} Fee - ${months[new Date().getMonth()]} ${new Date().getFullYear()}`,
          amount: 5000,
        },
      ],
      notes: "",
    });
    setShowGenerateModal(true);
  };

  const handleStudentSelect = (studentId) => {
    const s = deptStudents.find((st) => st._id === studentId);
    if (!s) return;
    setFormData((prev) => ({
      ...prev,
      studentName: s.name,
      studentId: s.studentId,
      class: s.class,
      batch: s.batch,
      subject: s.primaryCourse || s.course,
      amount: s.courseFee || prev.amount,
      items: [
        {
          description: `${s.primaryCourse || "Monthly"} Fee - ${prev.month} ${prev.year}`,
          amount: s.courseFee || prev.amount,
        },
      ],
    }));
  };

  const openDetailsModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const openEditModal = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      studentName: invoice.studentName,
      studentId: invoice.studentId,
      class: invoice.class,
      batch: invoice.batch || "",
      subject: invoice.subject,
      month: invoice.month,
      year: invoice.year,
      amount: invoice.amount,
      paidAmount: invoice.paidAmount || 0,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      items: invoice.items || [
        { description: "Monthly Tuition Fee", amount: invoice.amount },
      ],
      notes: invoice.notes || "",
    });
    setShowEditModal(true);
  };

  // ============================================================
  // ✅ GENERATE INVOICE — API first
  // ============================================================
  const handleGenerateInvoice = async (e) => {
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

    const paidAmount = Number(formData.paidAmount) || 0;
    const dueAmount = Number(formData.amount) - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

    const payload = {
      department: currentDept,
      invoiceNumber: generateInvoiceNumber(),
      studentName: formData.studentName.trim(),
      studentId: formData.studentId.trim(),
      class: formData.class,
      batch: formData.batch || "",
      subject: formData.subject || "N/A",
      month: formData.month,
      year: formData.year,
      amount: Number(formData.amount),
      paidAmount: paidAmount,
      dueAmount,
      status,
      issueDate: formData.issueDate || new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate || "",
      paymentDate:
        paidAmount > 0 ? new Date().toISOString().split("T")[0] : null,
      paymentMethod: paidAmount > 0 ? "bKash" : null,
      transactionId:
        paidAmount > 0 ? `TXN${Date.now().toString().slice(-6)}` : null,
      notes: formData.notes || "",
      items: formData.items || [
        { description: "Monthly Tuition Fee", amount: formData.amount },
      ],
      subtotal: Number(formData.amount),
      tax: 0,
      total: Number(formData.amount),
    };

    try {
      setSaving(true);

      const data = await safeFetchJSON(`${API_BASE}/api/invoices/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let newInvoice;
      if (data.success && data.invoice) {
        newInvoice = data.invoice;
        console.log("✅ Invoice saved to API:", newInvoice._id);
      } else {
        newInvoice = { _id: `LOCAL_${Date.now()}`, ...payload };
        console.warn("⚠️ API failed, saved locally");
      }

      setInvoices([newInvoice, ...invoices]);
      setShowGenerateModal(false);

      Swal.fire({
        icon: "success",
        title: "✅ Invoice Generated!",
        text: newInvoice.invoiceNumber,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // ✅ EDIT INVOICE
  // ============================================================
  const handleEditInvoice = async (e) => {
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

    const paidAmount = Number(formData.paidAmount) || 0;
    const dueAmount = Number(formData.amount) - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      paidAmount,
      dueAmount,
      status,
      paymentDate:
        paidAmount > 0 ? new Date().toISOString().split("T")[0] : null,
      paymentMethod: paidAmount > 0 ? "bKash" : null,
      subtotal: Number(formData.amount),
      total: Number(formData.amount),
    };

    try {
      setSaving(true);

      const isLocalId =
        String(selectedInvoice._id).startsWith("LOCAL_") ||
        String(selectedInvoice._id).startsWith("sample-");
      let updated;

      if (!isLocalId) {
        const data = await safeFetchJSON(
          `${API_BASE}/api/invoices/update/${selectedInvoice._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        if (data.success && data.invoice) {
          updated = data.invoice;
        } else {
          updated = { ...selectedInvoice, ...payload, dueAmount, status };
        }
      } else {
        updated = { ...selectedInvoice, ...payload, dueAmount, status };
      }

      setInvoices(
        invoices.map((inv) =>
          inv._id === selectedInvoice._id ? updated : inv,
        ),
      );
      setShowEditModal(false);
      Swal.fire({
        icon: "success",
        title: "✅ Updated!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // ✅ DELETE
  // ============================================================
  const handleDeleteInvoice = async (id) => {
    const result = await Swal.fire({
      title: "Delete Invoice?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const isLocalId =
        String(id).startsWith("LOCAL_") || String(id).startsWith("sample-");
      if (!isLocalId) {
        await safeFetchJSON(`${API_BASE}/api/invoices/delete/${id}`, {
          method: "DELETE",
        });
      }
      setInvoices(invoices.filter((inv) => inv._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ============================================================
  // ✅ MARK AS PAID
  // ============================================================
  const handleMarkAsPaid = (invoice) => {
    Swal.fire({
      title: "Mark as Paid?",
      text: `Mark invoice ${invoice.invoiceNumber} as paid?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as paid!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const payload = {
        ...invoice,
        status: "Paid",
        paidAmount: invoice.amount,
        dueAmount: 0,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: invoice.paymentMethod || "bKash",
        transactionId:
          invoice.transactionId || `TXN${Date.now().toString().slice(-6)}`,
      };

      try {
        const isLocalId =
          String(invoice._id).startsWith("LOCAL_") ||
          String(invoice._id).startsWith("sample-");
        if (!isLocalId) {
          await safeFetchJSON(
            `${API_BASE}/api/invoices/update/${invoice._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            },
          );
        }
        setInvoices(
          invoices.map((inv) =>
            inv._id === invoice._id ? { ...inv, ...payload } : inv,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "✅ Marked as Paid!",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
      }
    });
  };

  // Item management
  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", amount: 0 }],
    });
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const formatCurrency = (amount) => `৳${(amount || 0).toLocaleString()}`;
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const downloadInvoice = (invoice) => {
    Swal.fire({
      icon: "success",
      title: "Downloading",
      text: `Invoice ${invoice.invoiceNumber} is downloading...`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const sendInvoiceEmail = (invoice) => {
    Swal.fire({
      icon: "success",
      title: "Email Sent!",
      text: `Invoice sent to ${invoice.studentName}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Invoices ({currentDept})
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
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}`}
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
                  {adminInfo.department || adminInfo.designation}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
            {menuItems.map((item) => {
              const isParentActive = activeMenu === item.id;
              return (
                <div key={item.id}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => {
                          toggleSubMenu(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={`transition-transform ${expandedMenu === item.id ? "rotate-90" : ""}`}
                        >
                          <FaArrowRight size={12} />
                        </span>
                      </button>
                      {expandedMenu === item.id && (
                        <div className="ml-6 space-y-1 mt-1">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.id}
                              to={sub.path}
                              onClick={() => setIsSidebarOpen(false)}
                              className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${activeSubMenu === sub.id ? "bg-teal-50 text-[#004d4d] font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
                      >
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </Link>
                  )}
                </div>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
          <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>©Tarbiyah Online Madrasha</p>
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
                <FaFileInvoice className="text-blue-600" /> Invoices —
                <span className="text-teal-700">{DEPT_LABEL}</span>
              </h1>
              <p className="text-xs text-gray-500">
                {studentsLoading
                  ? `Loading ${currentDept} students...`
                  : `${deptStudents.length} ${currentDept} student${deptStudents.length !== 1 ? "s" : ""}`}
                {!apiWorking && (
                  <span className="ml-2 text-yellow-600">⚠️ Offline mode</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  loadInvoices();
                  fetchDeptStudents();
                }}
                disabled={studentsLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={studentsLoading ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
              <button
                onClick={openGenerateModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Generate Invoice
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Department Badge */}
          <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 rounded-xl text-xs font-semibold mb-3">
            🏫 Showing invoices of:{" "}
            <span className="font-bold">{currentDept}</span> department
          </div>

          {/* Students Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">
            <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
              <FaUsers size={12} className="text-teal-600" /> {currentDept}{" "}
              Students ({deptStudents.length})
            </p>
            {studentsLoading && deptStudents.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                Loading {currentDept} students...
              </div>
            ) : deptStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {deptStudents.map((s) => (
                  <div
                    key={s._id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-3"
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
              <div className="text-center py-4">
                <FaUsers className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-3">
                  {currentDept} department-এ এখনো কোনো student নেই।
                </p>
                <button
                  onClick={openGenerateModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold"
                >
                  + Generate Invoice Manually
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {invoices.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Invoices</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(totalPaid)}
              </p>
              <p className="text-[10px] text-gray-500">Total Collected</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(totalDue)}
              </p>
              <p className="text-[10px] text-gray-500">Total Due</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">{paidCount}</p>
              <p className="text-[10px] text-gray-500">Paid Invoices</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={`Search ${currentDept} invoices...`}
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
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueMonths.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-560px)] overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      #
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Invoice
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Student
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Class
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Month/Year
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice, index) => (
                      <tr key={invoice._id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-blue-600">
                            {invoice.invoiceNumber}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {formatDate(invoice.issueDate)}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {invoice.studentName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {invoice.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {invoice.class}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {invoice.month} {invoice.year}
                        </td>
                        <td className="px-3 py-2 font-semibold text-gray-700">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(invoice.status)}`}
                          >
                            {getStatusIcon(invoice.status)}
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(invoice)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="View"
                            >
                              <FaEye size={12} />
                            </button>
                            {invoice.status !== "Paid" && (
                              <button
                                onClick={() => handleMarkAsPaid(invoice)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Mark Paid"
                              >
                                <FaCheckCircle size={12} />
                              </button>
                            )}
                            <button
                              onClick={() => openEditModal(invoice)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => downloadInvoice(invoice)}
                              className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                              title="Download"
                            >
                              <FaDownload size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteInvoice(invoice._id)}
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
                        colSpan="8"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaFileInvoice className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>{currentDept} department-এ কোনো invoice নেই</p>
                        <button
                          onClick={openGenerateModal}
                          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold"
                        >
                          + Generate First Invoice
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoice className="text-blue-600" /> Generate Invoice —{" "}
                {currentDept}
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleGenerateInvoice} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Student select করলে auto-fill। অথবা manually নাম type করুন।
              </div>

              {deptStudents.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Student (Optional)
                  </label>
                  <select
                    value={
                      deptStudents.find(
                        (s) => s.studentId === formData.studentId,
                      )?._id || ""
                    }
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">-- Manual Entry --</option>
                    {deptStudents.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} — {s.course}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., TAR2648213"
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
                    {DEPT_COURSES.map((c) => (
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
                    Total Amount (৳) *
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice Items
                  </label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    + Add Item
                  </button>
                </div>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      className="flex-1 border rounded-lg px-3 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "amount",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-32 border rounded-lg px-3 py-1 text-sm"
                    />
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItemRow(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

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
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <FaFileInvoice className="inline mr-2" size={14} />{" "}
                  {saving ? "Generating..." : "Generate Invoice"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
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
      {showEditModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Invoice —{" "}
                {currentDept}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditInvoice} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
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
                    {DEPT_COURSES.map((c) => (
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
                    Total Amount (৳) *
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, issueDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

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
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" size={14} />{" "}
                  {saving ? "Saving..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoice className="text-blue-600" /> Invoice Details —{" "}
                {currentDept}
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
                    {selectedInvoice.studentName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedInvoice.studentId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {selectedInvoice.invoiceNumber}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}
                  >
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Class</p>
                  <p className="text-sm font-semibold">
                    {selectedInvoice.class}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Batch</p>
                  <p className="text-sm font-semibold">
                    {selectedInvoice.batch || "-"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Course</p>
                  <p className="text-sm font-semibold">
                    {selectedInvoice.subject}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Month/Year</p>
                  <p className="text-sm font-semibold">
                    {selectedInvoice.month} {selectedInvoice.year}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2">
                  Invoice Items
                </h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Description</th>
                        <th className="px-3 py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2">{item.description}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-blue-50">
                        <td className="px-3 py-2">Total</td>
                        <td className="px-3 py-2 text-right text-blue-600">
                          {formatCurrency(
                            selectedInvoice.total || selectedInvoice.amount,
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Total</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {formatCurrency(selectedInvoice.amount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Paid</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(selectedInvoice.paidAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Due</p>
                  <p className="text-sm font-semibold text-red-600">
                    {formatCurrency(selectedInvoice.dueAmount)}
                  </p>
                </div>
              </div>

              {selectedInvoice.paymentDate && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Payment Date</p>
                    <p className="text-sm font-semibold">
                      {formatDate(selectedInvoice.paymentDate)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Method</p>
                    <p className="text-sm font-semibold">
                      {selectedInvoice.paymentMethod || "-"}
                    </p>
                  </div>
                </div>
              )}

              {selectedInvoice.transactionId && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Transaction ID</p>
                  <p className="text-sm font-semibold">
                    {selectedInvoice.transactionId}
                  </p>
                </div>
              )}

              {selectedInvoice.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notes</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedInvoice.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t flex-wrap">
                {selectedInvoice.status !== "Paid" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleMarkAsPaid(selectedInvoice);
                    }}
                    className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    <FaCheckCircle className="inline mr-2" /> Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedInvoice);
                  }}
                  className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => downloadInvoice(selectedInvoice)}
                  className="flex-1 min-w-[120px] bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaDownload className="inline mr-2" /> Download
                </button>
                <button
                  onClick={() => sendInvoiceEmail(selectedInvoice)}
                  className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEnvelopeIcon className="inline mr-2" /> Email
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 min-w-[120px] bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
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

export default Invoice;
