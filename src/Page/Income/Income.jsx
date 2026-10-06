// src/Page/Admin/Income.jsx
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
  FaChartLine,
  FaCalendarCheck,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaSave,
  FaArrowRight,
  FaInfoCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaCheckCircle as FaCheckCircleIcon,
  FaFilePdf as FaFilePdfIcon,
  FaFileExcel as FaFileExcelIcon,
  FaMoneyBillWave as FaMoneyBillWaveIcon,
  FaSpinner,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ✅ FIX: https not http
const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ DEPARTMENT-WISE CONFIG
// ============================================================
const DEPARTMENT_CONFIGS = {
  Elders: {
    label: "Quran For Elders",
    categories: ["Student Fee", "Admission Fee", "Donation", "Other"],
    sources: [
      "Qaida Nuraniyah Fee",
      "Quran Nazera Fee",
      "Najera Fee",
      "Basic Tajweed Fee",
      "Bakarah Hifz Fee",
      "Admission Fee",
      "Donation",
      "Other",
    ],
  },
  "Quran Studies": {
    label: "Quran Studies",
    categories: ["Student Fee", "Admission Fee", "Donation", "Other"],
    sources: [
      "Hifzul Quran Fee",
      "Tarbiyah Quran Studies Fee",
      "Quran Translation Fee",
      "Admission Fee",
      "Donation",
      "Other",
    ],
  },
  Alimiya: {
    label: "Alimiya",
    categories: ["Student Fee", "Admission Fee", "Donation", "Other"],
    sources: [
      "Dawra e Hadith Fee",
      "Tafsir Fee",
      "Fiqh Fee",
      "Hadith Fee",
      "Arabic Grammar Fee",
      "Admission Fee",
      "Donation",
      "Other",
    ],
  },
  Diploma: {
    label: "Diploma",
    categories: ["Student Fee", "Admission Fee", "Donation", "Other"],
    sources: [
      "Diploma in Islamic Studies Fee",
      "Diploma in Arabic Fee",
      "Certificate Course Fee",
      "Admission Fee",
      "Donation",
      "Other",
    ],
  },
};

// ✅ Elders default income (for first-time)
const ELDERS_DEFAULT_INCOME = [
  {
    _id: "sample-inc-1",
    source: "Monthly Fee - Omer Faruk",
    category: "Student Fee",
    amount: 5000,
    date: "2026-09-05",
    method: "bKash",
    status: "Received",
    description: "Monthly tuition fee for September 2026",
    receivedBy: "Admin",
    transactionId: "DGD9CFHU69",
    department: "Elders",
  },
  {
    _id: "sample-inc-2",
    source: "Monthly Fee - Ikramm",
    category: "Student Fee",
    amount: 3000,
    date: "2026-09-06",
    method: "Nagad",
    status: "Received",
    description: "Partial payment",
    receivedBy: "Admin",
    transactionId: "DGX9PQ45MN",
    department: "Elders",
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

const Income = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("report-analytics");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Elders",
    joinDate: "",
  });

  // ✅ Current department
  const [currentDept, setCurrentDept] = useState(getCurrentDepartment());
  const deptConfig =
    DEPARTMENT_CONFIGS[currentDept] || DEPARTMENT_CONFIGS["Elders"];
  const DEPT_CATEGORIES = deptConfig.categories;
  const DEPT_SOURCES = deptConfig.sources;
  const DEPT_LABEL = deptConfig.label;

  // Income records
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiWorking, setApiWorking] = useState(true);
  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [formData, setFormData] = useState({
    source: "",
    category: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    method: "",
    status: "Received",
    description: "",
    transactionId: "",
    department: "",
  });

  const methods = [
    "Cash",
    "Bank Transfer",
    "bKash",
    "Nagad",
    "Rocket",
    "Check",
    "Credit Card",
  ];
  const statuses = ["Received", "Pending", "Overdue"];

  // ============================================================
  // Load admin info
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
  // ✅ Load Income — API first, localStorage fallback
  // ============================================================
  const loadIncome = async () => {
    try {
      setIsLoading(true);
      const data = await safeFetchJSON(
        `${API_BASE}/api/income/all?department=${encodeURIComponent(currentDept)}`,
      );

      if (data.success && Array.isArray(data.incomes)) {
        if (data.incomes.length > 0) {
          setIncomeRecords(data.incomes);
          setApiWorking(true);
          localStorage.setItem(
            `income_${currentDept.replace(/\s+/g, "_")}`,
            JSON.stringify(data.incomes),
          );
          console.log(
            `✅ Loaded ${data.incomes.length} income records from API (${currentDept})`,
          );
          return;
        }

        // API empty → check localStorage
        const key = `income_${currentDept.replace(/\s+/g, "_")}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setIncomeRecords(parsed);
              setApiWorking(true);
              return;
            }
          } catch {}
        }

        setApiWorking(true);
        setIncomeRecords(currentDept === "Elders" ? ELDERS_DEFAULT_INCOME : []);
        return;
      }

      throw new Error(data.message || "API failed");
    } catch (err) {
      console.warn("⚠️ API failed, using localStorage:", err.message);
      setApiWorking(false);
      const key = `income_${currentDept.replace(/\s+/g, "_")}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setIncomeRecords(
            Array.isArray(parsed) && parsed.length > 0
              ? parsed
              : currentDept === "Elders"
                ? ELDERS_DEFAULT_INCOME
                : [],
          );
        } catch {
          setIncomeRecords(
            currentDept === "Elders" ? ELDERS_DEFAULT_INCOME : [],
          );
        }
      } else {
        setIncomeRecords(currentDept === "Elders" ? ELDERS_DEFAULT_INCOME : []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIncome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDept]);

  // Cache to localStorage
  useEffect(() => {
    if (!currentDept || incomeRecords.length === 0) return;
    const key = `income_${currentDept.replace(/\s+/g, "_")}`;
    localStorage.setItem(key, JSON.stringify(incomeRecords));
  }, [incomeRecords, currentDept]);

  // ============================================================
  // Sidebar
  // ============================================================
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
      console.error("Logout error:", err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setExpandedMenu(expandedMenu === menu ? null : menu);

  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Received":
        return <FaCheckCircleIcon className="text-green-500" />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Overdue":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Student Fee":
        return "bg-blue-100 text-blue-700";
      case "Admission Fee":
        return "bg-purple-100 text-purple-700";
      case "Donation":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredRecords = incomeRecords.filter((record) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (record.source || "").toLowerCase().includes(s) ||
      (record.description || "").toLowerCase().includes(s) ||
      (record.transactionId || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;
    const matchesCategory =
      filterCategory === "All" || record.category === filterCategory;
    const matchesMethod =
      filterMethod === "All" || record.method === filterMethod;
    const matchesDate = !filterDate || record.date === filterDate;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesMethod &&
      matchesDate
    );
  });

  const uniqueStatuses = [
    "All",
    ...new Set(incomeRecords.map((r) => r.status)),
  ];
  const uniqueCategories = [
    "All",
    ...new Set(incomeRecords.map((r) => r.category)),
  ];
  const uniqueMethods = ["All", ...new Set(incomeRecords.map((r) => r.method))];

  const totalIncome = incomeRecords.reduce(
    (sum, r) => sum + (Number(r.amount) || 0),
    0,
  );
  const totalReceived = incomeRecords
    .filter((r) => r.status === "Received")
    .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalPending = incomeRecords
    .filter((r) => r.status === "Pending")
    .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalOverdue = incomeRecords
    .filter((r) => r.status === "Overdue")
    .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const formatCurrency = (amount) => `৳${(amount || 0).toLocaleString()}`;
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================
  // ✅ Open Add Modal — always enabled
  // ============================================================
  const openAddModal = () => {
    setFormData({
      source: "",
      category: "Student Fee",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      method: "Cash",
      status: "Received",
      description: "",
      transactionId: "",
      department: currentDept,
    });
    setShowAddModal(true);
  };

  const openEditModal = (record) => {
    setSelectedIncome(record);
    setFormData({
      source: record.source,
      category: record.category,
      amount: record.amount,
      date: record.date,
      method: record.method || "",
      status: record.status,
      description: record.description || "",
      transactionId: record.transactionId || "",
      department: record.department || currentDept,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (record) => {
    setSelectedIncome(record);
    setShowDetailsModal(true);
  };

  // ============================================================
  // ✅ ADD INCOME — API first
  // ============================================================
  const handleAddIncome = async (e) => {
    e.preventDefault();

    if (
      !formData.source ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const payload = {
      department: currentDept,
      source: formData.source.trim(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method || "Cash",
      status: formData.status,
      description: formData.description || "",
      receivedBy: formData.status === "Received" ? adminInfo.name : null,
      transactionId:
        formData.transactionId ||
        `TXN${String(incomeRecords.length + 1).padStart(3, "0")}`,
    };

    try {
      setSaving(true);

      const data = await safeFetchJSON(`${API_BASE}/api/income/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let newRecord;
      if (data.success && data.income) {
        newRecord = data.income;
        console.log("✅ Saved to API:", newRecord._id);
      } else {
        newRecord = { _id: `LOCAL_${Date.now()}`, ...payload };
        console.warn("⚠️ API failed, saved locally");
      }

      setIncomeRecords([newRecord, ...incomeRecords]);
      setShowAddModal(false);

      Swal.fire({
        icon: "success",
        title: "✅ Income Added!",
        html: `<p><strong>${formData.source}</strong></p><p style="font-size:12px;color:#666;">${formatCurrency(formData.amount)} — ${currentDept}</p>`,
        timer: 1800,
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
  // ✅ EDIT
  // ============================================================
  const handleEditIncome = async (e) => {
    e.preventDefault();

    if (
      !formData.source ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      department: selectedIncome.department || currentDept,
      receivedBy: formData.status === "Received" ? adminInfo.name : null,
    };

    try {
      setSaving(true);

      const isLocalId =
        String(selectedIncome._id).startsWith("LOCAL_") ||
        String(selectedIncome._id).startsWith("sample-");
      let updated;

      if (!isLocalId) {
        const data = await safeFetchJSON(
          `${API_BASE}/api/income/update/${selectedIncome._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        if (data.success && data.income) {
          updated = data.income;
        } else {
          updated = { ...selectedIncome, ...payload };
        }
      } else {
        updated = { ...selectedIncome, ...payload };
      }

      setIncomeRecords(
        incomeRecords.map((r) => (r._id === selectedIncome._id ? updated : r)),
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
  const handleDeleteIncome = async (id) => {
    const result = await Swal.fire({
      title: "Delete Income Record?",
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
        await safeFetchJSON(`${API_BASE}/api/income/delete/${id}`, {
          method: "DELETE",
        });
      }
      setIncomeRecords(incomeRecords.filter((r) => r._id !== id));
      Swal.fire("Deleted!", "Income record has been deleted.", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const downloadReport = () =>
    Swal.fire({
      icon: "success",
      title: "Report Downloading",
      text: `${currentDept} income report is being downloaded.`,
      timer: 1500,
      showConfirmButton: false,
    });

  const exportToExcel = () =>
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: `${currentDept} income report exported.`,
      timer: 1500,
      showConfirmButton: false,
    });

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Income Report ({currentDept})
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
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}`}
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
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isParentActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
          <div className="p-4 text-xs text-gray-400 border-t">
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
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto pt-16 md:pt-6">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaMoneyBillWaveIcon className="text-green-600" /> Income Report
                —<span className="text-teal-700">{DEPT_LABEL}</span>
              </h1>
              <p className="text-xs text-gray-500">
                {isLoading
                  ? `Loading ${currentDept} data...`
                  : `${incomeRecords.length} record${incomeRecords.length !== 1 ? "s" : ""}`}
                {!apiWorking && (
                  <span className="ml-2 text-yellow-600">⚠️ Offline</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => loadIncome()}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={isLoading ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Income
              </button>
              <button
                onClick={downloadReport}
                className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFilePdfIcon size={12} /> PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFileExcelIcon size={12} /> Excel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Dept Badge */}
          <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 rounded-xl text-xs font-semibold mb-3">
            🏫 Showing income of:{" "}
            <span className="font-bold">{currentDept}</span> department
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(totalIncome)}
              </p>
              <p className="text-[10px] text-gray-500">Total Income</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(totalReceived)}
              </p>
              <p className="text-[10px] text-gray-500">Received</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(totalOverdue)}
              </p>
              <p className="text-[10px] text-gray-500">Overdue</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={`Search ${currentDept} income...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                />
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueMethods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading / Table */}
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center">
              <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
              <p className="text-sm text-gray-500 mt-3">
                Loading {currentDept} income...
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-440px)] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Source
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                        Category
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Amount
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                        Date
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                        Method
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
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record, index) => (
                        <tr key={record._id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-800 truncate max-w-[150px]">
                              {record.source}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate max-w-[150px]">
                              {record.transactionId}
                            </div>
                          </td>
                          <td className="px-3 py-2 hidden md:table-cell">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryColor(record.category)}`}
                            >
                              {record.category}
                            </span>
                          </td>
                          <td className="px-3 py-2 font-semibold text-gray-700">
                            {formatCurrency(record.amount)}
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                            {record.method}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(record.status)}`}
                            >
                              {getStatusIcon(record.status)}
                              {record.status}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openDetailsModal(record)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="View"
                              >
                                <FaEye size={12} />
                              </button>
                              <button
                                onClick={() => openEditModal(record)}
                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                onClick={() => handleDeleteIncome(record._id)}
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
                          <FaMoneyBillWaveIcon className="text-4xl text-gray-300 mx-auto mb-2" />
                          <p>
                            {currentDept} department-এ কোনো income record নেই
                          </p>
                          <button
                            onClick={openAddModal}
                            className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-lg font-semibold"
                          >
                            + Add First Income
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-green-600" /> Add Income — {currentDept}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddIncome} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Adding income to <strong>{currentDept}</strong> department
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source *
                </label>
                <input
                  type="text"
                  required
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., Monthly Fee - Student Name"
                  list="source-suggestions"
                />
                <datalist id="source-suggestions">
                  {DEPT_SOURCES.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {DEPT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (৳) *
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
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({ ...formData, method: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {methods.map((m) => (
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="2"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Additional details..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Add Income
                    </>
                  )}
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
      {showEditModal && selectedIncome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Income —{" "}
                {currentDept}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditIncome} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source *
                </label>
                <input
                  type="text"
                  required
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {DEPT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (৳) *
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
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({ ...formData, method: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {methods.map((m) => (
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="2"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Update Income
                    </>
                  )}
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
      {showDetailsModal && selectedIncome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Income Details
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
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedIncome.source}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedIncome.transactionId}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncome.status)}`}
                >
                  {getStatusIcon(selectedIncome.status)}
                  {selectedIncome.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Department</p>
                  <p className="text-sm font-semibold">
                    {selectedIncome.department || currentDept}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Category</p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedIncome.category)}`}
                  >
                    {selectedIncome.category}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Amount</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(selectedIncome.amount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedIncome.date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Payment Method</p>
                  <p className="text-sm font-semibold">
                    {selectedIncome.method || "N/A"}
                  </p>
                </div>
                {selectedIncome.receivedBy && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Received By</p>
                    <p className="text-sm font-semibold">
                      {selectedIncome.receivedBy}
                    </p>
                  </div>
                )}
              </div>
              {selectedIncome.description && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Description</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedIncome.description}
                  </p>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedIncome);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteIncome(selectedIncome._id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaTrash className="inline mr-2" /> Delete
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

export default Income;
