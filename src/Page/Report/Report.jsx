// src/Page/Admin/Report.jsx
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
  FaUserGraduate,
  FaDatabase,
  FaEye,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlus,
  FaArrowRight,
  FaLayerGroup,
  FaSave,
  FaUserTimes,
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaStar,
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

const Report = () => {
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

  const [eldersStudents, setEldersStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const [reportType, setReportType] = useState("financial");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "financial",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    course: "All",
    status: "All",
    format: "PDF",
    description: "",
  });

  const [customReports, setCustomReports] = useState(() => {
    const saved = localStorage.getItem("eldersCustomReports");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return [
      {
        id: 1,
        reportName: "Elders Monthly Financial - September 2026",
        reportType: "financial",
        month: 8,
        year: 2026,
        course: "All",
        status: "All",
        format: "PDF",
        description: "Elders department financial summary",
        generatedDate: "2026-09-20",
        generatedBy: "Admin",
      },
    ];
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
  const statuses = ["All", "Paid", "Partial", "Unpaid"];
  const reportTypes = ["financial", "performance", "teacher"];
  const formats = ["PDF", "Excel", "CSV"];

  // Financial data
  const [financialData] = useState({
    totalRevenue: 63600,
    totalExpenses: 25000,
    netProfit: 38600,
    collectionRate: 82,
    monthlyData: [
      { month: "April", collected: 12000, due: 3000 },
      { month: "May", collected: 11500, due: 2500 },
      { month: "June", collected: 11000, due: 3000 },
      { month: "July", collected: 10000, due: 3500 },
      { month: "August", collected: 9500, due: 4000 },
      { month: "September", collected: 9600, due: 4500 },
    ],
    courseWiseCollection: [
      { course: "Qaida Nuraniyah", collected: 18000, total: 20000 },
      { course: "Quran Nazera", collected: 12000, total: 15000 },
      { course: "Najera", collected: 10000, total: 12000 },
      { course: "Basic Tajweed", collected: 14000, total: 16000 },
      { course: "Bakarah Hifz", collected: 9600, total: 12000 },
    ],
    paymentMethods: [
      { method: "bKash", amount: 25000 },
      { method: "Nagad", amount: 20000 },
      { method: "Bank", amount: 12000 },
      { method: "Cash", amount: 6600 },
    ],
  });

  const [performanceData] = useState({
    totalStudents: 2,
    averageAttendance: 88,
    averageGrade: 85,
    passRate: 100,
    coursePerformance: [
      { course: "Qaida Nuraniyah", average: 88, students: 2 },
      { course: "Quran Nazera", average: 85, students: 0 },
      { course: "Najera", average: 82, students: 0 },
      { course: "Basic Tajweed", average: 86, students: 0 },
      { course: "Bakarah Hifz", average: 84, students: 0 },
    ],
    teacherPerformance: [
      { teacher: "Jubayer Ahmad", average: 88 },
      { teacher: "Sumaiya Afrin Mim", average: 90 },
    ],
    attendanceData: [
      { month: "April", attendance: 92 },
      { month: "May", attendance: 90 },
      { month: "June", attendance: 88 },
      { month: "July", attendance: 85 },
      { month: "August", attendance: 88 },
      { month: "September", attendance: 87 },
    ],
  });

  const [teacherPerformanceData] = useState({
    totalTeachers: 2,
    averageRating: 4.85,
    totalClasses: 23,
    teacherRatings: [
      {
        name: "Jubayer Ahmad",
        rating: 4.8,
        classes: 12,
        designation: "Senior Teacher",
      },
      {
        name: "Sumaiya Afrin Mim",
        rating: 4.9,
        classes: 11,
        designation: "Junior Teacher",
      },
    ],
  });

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
      const res = await fetch(`${API_BASE}/api/students/all`);
      const text = await res.text();

      if (!text.trim().startsWith("<")) {
        const data = JSON.parse(text);
        if (data.success && Array.isArray(data.students)) {
          const all = data.students || [];
          const elders = all.filter((s) => isEldersCourse(s.course));
          const formatted = elders.map((s) => ({
            _id: s._id,
            name: s.name || "",
            studentId: s.studentId || s._id?.slice(-8) || "N/A",
            course: s.course || "",
            class: s.batch || s.class || "Elders Batch A",
            batch: s.batch || "Batch-03",
            phone: s.phone || "",
            email: s.email || "",
            status: s.status || "Pending",
          }));
          setEldersStudents(formatted);
        }
      }
    } catch (err) {
      console.error("❌ Fetch students error:", err);
    } finally {
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    fetchEldersStudents();
  }, []);

  useEffect(() => {
    localStorage.setItem("eldersCustomReports", JSON.stringify(customReports));
  }, [customReports]);

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

  const getReportTypeLabel = (type) => {
    switch (type) {
      case "financial":
        return "Financial Report";
      case "performance":
        return "Student Performance";
      case "teacher":
        return "Teacher Performance";
      default:
        return type;
    }
  };

  const getReportTypeColor = (type) => {
    switch (type) {
      case "financial":
        return "bg-blue-100 text-blue-700";
      case "performance":
        return "bg-green-100 text-green-700";
      case "teacher":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

  const downloadReport = (type) => {
    Swal.fire({
      icon: "success",
      title: "Report Downloading",
      text: `${type} being downloaded as PDF.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const exportToExcel = () => {
    Swal.fire({
      icon: "success",
      title: "Exporting to Excel",
      text: "Elders report being exported.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const printReport = () => window.print();

  const getReportTitle = () => {
    switch (reportType) {
      case "financial":
        return "Financial Report — Quran For Elders";
      case "performance":
        return "Student Performance Report — Quran For Elders";
      case "teacher":
        return "Teacher Performance Report — Quran For Elders";
      default:
        return "Elders Report";
    }
  };

  const openAddModal = () => {
    setFormData({
      reportName: "",
      reportType: "financial",
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      course: "All",
      status: "All",
      format: "PDF",
      description: "",
    });
    setShowAddModal(true);
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!formData.reportName || !formData.reportType) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    const newReport = {
      id: Date.now(),
      reportName: formData.reportName,
      reportType: formData.reportType,
      month: formData.month,
      year: formData.year,
      course: formData.course || "All",
      status: formData.status || "All",
      format: formData.format || "PDF",
      description: formData.description || "",
      generatedDate: new Date().toISOString().split("T")[0],
      generatedBy: adminInfo.name,
    };
    setCustomReports([...customReports, newReport]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Elders Report Added!",
      text: formData.reportName,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteReport = (id) => {
    Swal.fire({
      title: "Delete Report?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomReports(customReports.filter((r) => r.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const renderFinancialReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(financialData.totalRevenue)}
          </p>
          <p className="text-[10px] text-gray-500">Total Revenue</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(financialData.totalExpenses)}
          </p>
          <p className="text-[10px] text-gray-500">Total Expenses</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(financialData.netProfit)}
          </p>
          <p className="text-[10px] text-gray-500">Net Profit</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-purple-600">
            {financialData.collectionRate}%
          </p>
          <p className="text-[10px] text-gray-500">Collection Rate</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h4 className="font-semibold text-gray-700 text-sm mb-3">
          Monthly Collection Overview (Elders)
        </h4>
        <div className="space-y-3">
          {financialData.monthlyData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">{item.month}</span>
                <span className="text-gray-600">
                  Collected: {formatCurrency(item.collected)} | Due:{" "}
                  {formatCurrency(item.due)}
                </span>
              </div>
              <div className="flex gap-1 h-4">
                <div
                  className="bg-green-500 rounded-l-full h-full"
                  style={{
                    width: `${(item.collected / (item.collected + item.due)) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-red-500 rounded-r-full h-full"
                  style={{
                    width: `${(item.due / (item.collected + item.due)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Course Wise Collection (Elders)
          </h4>
          <div className="space-y-2">
            {financialData.courseWiseCollection.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.course}</span>
                  <span className="text-gray-600">
                    {formatCurrency(item.collected)} /{" "}
                    {formatCurrency(item.total)}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(item.collected / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Payment Methods
          </h4>
          <div className="space-y-2">
            {financialData.paymentMethods.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.method}</span>
                  <span className="text-gray-600">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{
                      width: `${(item.amount / financialData.totalRevenue) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-blue-600">
            {eldersStudents.length || performanceData.totalStudents}
          </p>
          <p className="text-[10px] text-gray-500">Total Elders Students</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {performanceData.averageAttendance}%
          </p>
          <p className="text-[10px] text-gray-500">Avg Attendance</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-yellow-600">
            {performanceData.averageGrade}%
          </p>
          <p className="text-[10px] text-gray-500">Avg Grade</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-purple-600">
            {performanceData.passRate}%
          </p>
          <p className="text-[10px] text-gray-500">Pass Rate</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h4 className="font-semibold text-gray-700 text-sm mb-3">
          Course Performance (Elders)
        </h4>
        <div className="space-y-3">
          {performanceData.coursePerformance.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">
                  {item.course} ({item.students} students)
                </span>
                <span className="text-gray-600">{item.average}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.average >= 85 ? "bg-green-500" : item.average >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${item.average}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Teacher Performance (Elders)
          </h4>
          <div className="space-y-2">
            {performanceData.teacherPerformance.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.teacher}</span>
                  <span className="text-gray-600">{item.average}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.average >= 85 ? "bg-green-500" : item.average >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${item.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">
            Attendance Trend
          </h4>
          <div className="space-y-2">
            {performanceData.attendanceData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="text-gray-600">{item.attendance}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.attendance >= 80 ? "bg-green-500" : item.attendance >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${item.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-blue-600">
            {teacherPerformanceData.totalTeachers}
          </p>
          <p className="text-[10px] text-gray-500">Total Elders Teachers</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-yellow-600">
            {teacherPerformanceData.averageRating}
          </p>
          <p className="text-[10px] text-gray-500">Avg Rating</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {teacherPerformanceData.totalClasses}
          </p>
          <p className="text-[10px] text-gray-500">Total Classes</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h4 className="font-semibold text-gray-700 text-sm mb-3">
          Elders Teacher Ratings & Classes
        </h4>
        <div className="space-y-3">
          {teacherPerformanceData.teacherRatings.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.designation || "Teacher"} • {item.classes} classes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(item.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {item.rating}
                  </span>
                </div>
              </div>
              <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(item.rating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Reports (Elders)</h1>
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
                <FaChartLine className="text-blue-600" /> Reports —
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
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Report
              </button>
              <button
                onClick={() => downloadReport(getReportTitle())}
                className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFilePdf size={12} /> PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaFileExcel size={12} /> Excel
              </button>
              <button
                onClick={printReport}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPrint size={12} /> Print
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

          {/* Report Type Selector */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setReportType("financial")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${reportType === "financial" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <FaMoneyBillWave className="inline mr-1" /> Financial Report
              </button>
              <button
                onClick={() => setReportType("performance")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${reportType === "performance" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <FaUserGraduate className="inline mr-1" /> Student Performance
              </button>
              <button
                onClick={() => setReportType("teacher")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${reportType === "teacher" ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <FaChalkboardTeacher className="inline mr-1" /> Teacher
                Performance
              </button>
            </div>
          </div>

          {/* Custom Reports List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-3">
            <div className="p-3 border-b flex justify-between items-center">
              <h4 className="font-semibold text-gray-700 text-sm">
                Elders Custom Reports
              </h4>
              <span className="text-xs text-gray-500">
                {customReports.length} reports
              </span>
            </div>
            <div className="overflow-x-auto max-h-40 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Report Name
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Month/Year
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Format
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customReports.length > 0 ? (
                    customReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800 truncate max-w-[200px]">
                            {report.reportName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {formatDate(report.generatedDate)}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getReportTypeColor(report.reportType)}`}
                          >
                            {getReportTypeLabel(report.reportType)}
                          </span>
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {months[report.month]} {report.year}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                            {report.format}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                Swal.fire({
                                  icon: "info",
                                  title: "Report Details",
                                  html: `
                                    <div style="text-align: left; font-size: 13px;">
                                      <p><strong>Name:</strong> ${report.reportName}</p>
                                      <p><strong>Type:</strong> ${getReportTypeLabel(report.reportType)}</p>
                                      <p><strong>Month:</strong> ${months[report.month]} ${report.year}</p>
                                      <p><strong>Course:</strong> ${report.course}</p>
                                      <p><strong>Format:</strong> ${report.format}</p>
                                      <p><strong>By:</strong> ${report.generatedBy}</p>
                                      ${report.description ? `<p><strong>Description:</strong> ${report.description}</p>` : ""}
                                    </div>`,
                                  confirmButtonColor: "#3b82f6",
                                  confirmButtonText: "Close",
                                });
                              }}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            >
                              <FaEye size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
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
                        colSpan="5"
                        className="px-3 py-4 text-center text-gray-400 text-sm"
                      >
                        No custom reports yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400 text-xs" />
                <span className="text-xs text-gray-600 font-medium">
                  Filters:
                </span>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
              >
                <option value="All">All Courses</option>
                {ELDERS_COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {getReportTitle()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {months[selectedMonth]} {selectedYear} | {selectedCourse} |{" "}
              {selectedStatus}
            </p>
            {reportType === "financial" && renderFinancialReport()}
            {reportType === "performance" && renderPerformanceReport()}
            {reportType === "teacher" && renderTeacherReport()}
          </div>
        </main>
      </div>

      {/* Add Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Elders Report
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddReport} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.reportName}
                  onChange={(e) =>
                    setFormData({ ...formData, reportName: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., Monthly Financial - Sept 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type *
                </label>
                <select
                  required
                  value={formData.reportType}
                  onChange={(e) =>
                    setFormData({ ...formData, reportType: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {getReportTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        month: parseInt(e.target.value),
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {months.map((m, i) => (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="All">All Courses</option>
                    {ELDERS_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={formData.format}
                  onChange={(e) =>
                    setFormData({ ...formData, format: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {formats.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
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
                  placeholder="Short description..."
                />
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Report
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
    </div>
  );
};

export default Report;
