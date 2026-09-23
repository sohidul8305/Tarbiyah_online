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
  FaLayerGroup,
  FaSave,
  FaUserTimes,
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

const ELDERS_DEFAULT_INVOICES = [
  {
    id: 1,
    invoiceNumber: "INV-2026-0001",
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
    id: 2,
    invoiceNumber: "INV-2026-0002",
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
    department: "Quran for Elders",
    joinDate: "",
  });

  const [eldersStudents, setEldersStudents] = useState(
    ELDERS_STUDENTS_FALLBACK,
  );
  const [studentsLoading, setStudentsLoading] = useState(true);

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("eldersInvoices");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_INVOICES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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
  const years = [2024, 2025, 2026, 2027];
  const statuses = ["All", "Paid", "Partial", "Unpaid", "Overdue"];

  // ============================================================
  // ✅ Sidebar Menu Items — সম্পূর্ণ সব route সহ
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
          id: "today-class",
          path: "/admin-dashboard/today-class",
          label: "Today's Class",
        },
        {
          id: "basic-tazweed",
          path: "/admin-dashboard/basic-tazweed",
          label: "Basic Tazweed Payment Overview",
        },
        {
          id: "najera-batch",
          path: "/admin-dashboard/najera-batch",
          label: "Najera Payment Overview",
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
        { id: "grad", path: "/admin-exam/grad", label: "Grad" },
        {
          id: "class-test",
          path: "/admin-exam/class-test",
          label: "Class Test",
        },
        {
          id: "mid-term",
          path: "/admin-exam/mid-term",
          label: "Mid Term Exam",
        },
        {
          id: "final-exam",
          path: "/admin-exam/final-exam",
          label: "Final Exam",
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

  // ✅ URL থেকে active auto-detect
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

  useEffect(() => {
    localStorage.setItem("eldersInvoices", JSON.stringify(invoices));
  }, [invoices]);

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
    return `INV-${year}-${String(count).padStart(4, "0")}`;
  };

  const openGenerateModal = () => {
    const first = eldersStudents[0];
    setFormData({
      studentName: first?.name || "",
      studentId: first?.studentId || "",
      class: first?.class || ELDERS_CLASSES[0],
      batch: first?.batch || "Batch-03",
      subject: first?.primaryCourse || ELDERS_COURSES[0],
      month: months[new Date().getMonth()],
      year: new Date().getFullYear(),
      amount: first?.courseFee || 5000,
      paidAmount: 0,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      items: [
        {
          description: `${first?.primaryCourse || "Monthly"} Fee - ${months[new Date().getMonth()]} ${new Date().getFullYear()}`,
          amount: first?.courseFee || 5000,
        },
      ],
      notes: "",
    });
    setShowGenerateModal(true);
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

  const handleGenerateInvoice = (e) => {
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
    const paidAmount = formData.paidAmount || 0;
    const dueAmount = formData.amount - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";
    const newInvoice = {
      id: Date.now(),
      invoiceNumber: generateInvoiceNumber(),
      studentName: formData.studentName,
      studentId: formData.studentId,
      class: formData.class,
      batch: formData.batch || "",
      subject: formData.subject || "N/A",
      month: formData.month,
      year: formData.year,
      amount: Number(formData.amount),
      paidAmount,
      dueAmount,
      status,
      issueDate: formData.issueDate || new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
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
    setInvoices([...invoices, newInvoice]);
    setShowGenerateModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Invoice Generated!",
      text: newInvoice.invoiceNumber,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditInvoice = (e) => {
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
    const paidAmount = formData.paidAmount || 0;
    const dueAmount = formData.amount - paidAmount;
    const status =
      dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid";
    setInvoices(
      invoices.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              studentName: formData.studentName,
              studentId: formData.studentId,
              class: formData.class,
              batch: formData.batch || "",
              subject: formData.subject || "N/A",
              month: formData.month,
              year: formData.year,
              amount: Number(formData.amount),
              paidAmount,
              dueAmount,
              status,
              issueDate: formData.issueDate,
              dueDate: formData.dueDate,
              paymentDate:
                paidAmount > 0 ? new Date().toISOString().split("T")[0] : null,
              paymentMethod: paidAmount > 0 ? "bKash" : null,
              notes: formData.notes || "",
              items: formData.items || [
                { description: "Monthly Tuition Fee", amount: formData.amount },
              ],
              subtotal: Number(formData.amount),
              total: Number(formData.amount),
            }
          : inv,
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

  const handleDeleteInvoice = (id) => {
    Swal.fire({
      title: "Delete Invoice?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setInvoices(invoices.filter((inv) => inv.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleMarkAsPaid = (invoice) => {
    Swal.fire({
      title: "Mark as Paid?",
      text: `Mark invoice ${invoice.invoiceNumber} as paid?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as paid!",
    }).then((result) => {
      if (result.isConfirmed) {
        setInvoices(
          invoices.map((inv) =>
            inv.id === invoice.id
              ? {
                  ...inv,
                  status: "Paid",
                  paidAmount: inv.amount,
                  dueAmount: 0,
                  paymentDate: new Date().toISOString().split("T")[0],
                  paymentMethod: inv.paymentMethod || "bKash",
                  transactionId:
                    inv.transactionId ||
                    `TXN${Date.now().toString().slice(-6)}`,
                }
              : inv,
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
          <h1 className="text-sm font-bold text-gray-800">Invoices (Elders)</h1>
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
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isParentActive
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }`}
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
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isParentActive
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
                <FaFileInvoice className="text-blue-600" /> Invoices —
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

          {/* Elders Students Card */}
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
                  placeholder="Search elders invoices..."
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
            <div className="overflow-x-auto max-h-[calc(100vh-500px)] overflow-y-auto">
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
                      <tr key={invoice.id} className="hover:bg-gray-50">
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
                              onClick={() => handleDeleteInvoice(invoice.id)}
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
                        <p>No elders invoices found</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          উপরে "Generate Invoice" ক্লিক করে যোগ করুন
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

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileInvoice className="text-blue-600" /> Generate Elders
                Invoice
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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaFileInvoice className="inline mr-2" size={14} /> Generate
                  Invoice
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
                <FaEdit className="text-yellow-600" /> Edit Elders Invoice
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
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Update
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
                <FaFileInvoice className="text-blue-600" /> Elders Invoice
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
