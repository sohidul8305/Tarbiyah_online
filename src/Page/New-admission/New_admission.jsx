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
  FaCalendarCheck,
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaTrash,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaLayerGroup,
  FaInfoCircle,
  FaClock as FaClockIcon,
  FaSync,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ Backend status → UI status mapping
// ============================================================
const mapStatus = (s) => {
  if (!s) return "Pending";
  if (s === "Active") return "Approved";
  if (s === "Inactive") return "Rejected";
  if (s === "Approved" || s === "Rejected" || s === "Pending") return s;
  return "Pending";
};

// ✅ Random unique password generator
const generatePassword = () => {
  const prefixes = ["TAR", "STU", "MDR", "QUR", "NOOR"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(100000 + Math.random() * 900000);
  const chars = "ABCDEFGHJKMNPQRS";
  const c1 = chars[Math.floor(Math.random() * chars.length)];
  const c2 = chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}${num}${c1}${c2}@`;
};

// ✅ FIXED: Backend student object থেকে status নির্ধারণ
// Payment থেকে নয় — সরাসরি backend.status দেখে
const resolveStatus = (s) => {
  const raw = String(s?.status || "").trim();

  // Backend status আগে দেখুন
  if (raw === "Active" || raw === "Approved") return "Approved";
  if (raw === "Rejected" || raw === "Inactive") return "Rejected";
  if (raw === "Pending") return "Pending";

  // Backend-এ status না থাকলে payment থেকে derive (fallback)
  if (Number(s?.dueAmount) === 0 && Number(s?.paidAmount) > 0)
    return "Approved";
  return "Pending";
};

// ✅ Student ID generator
const generateStudentId = (prefix = "TAR") => {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${year}${random}`;
};

const New_admission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState("Tazweed");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Administration",
    joinDate: "",
  });

  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  // ============================================================
  // Load admin info
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      try {
        setAdminInfo(JSON.parse(savedAdmin));
      } catch (err) {
        console.error("adminInfo parse error:", err);
      }
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

  // ============================================================
  // ✅ Fetch students from 2 API endpoints (Tazweed & Najera)
  // ============================================================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);

      const [tazweedRes, najeraRes] = await Promise.allSettled([
        fetch(`${API_BASE}/basic-tazweed/all`),
        fetch(`${API_BASE}/najera-batch/all`),
      ]);

      // ---------- 1) Basic Tazweed Students ----------
      let tazweedStudents = [];
      if (tazweedRes.status === "fulfilled") {
        try {
          const d = await tazweedRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            tazweedStudents = d.students.map((s) => {
              const status = resolveStatus(s); // ✅ Fixed
              return {
                id: s._id,
                _id: s._id,
                source: "Tazweed",
                sourceLabel: "Basic Tazweed",
                name: s.name || "",
                fatherName: "",
                motherName: "",
                course: "Basic Tajweed (Level-1)",
                subject: "Basic Tajweed (Level-1)",
                class: "Basic Tajweed (Level-1)",
                phone: s.phone || "",
                email: "",
                address: "",
                permanentAddress: "",
                dobOrNid: "",
                age: "",
                gender: "",
                occupation: "",
                maritalStatus: "",
                guardianName: "",
                guardianPhone: s.phone || "",
                status: status, // ✅ From backend.status
                rawStatus: s.status || "Pending",
                paymentStatus:
                  Number(s.dueAmount) === 0
                    ? "Paid"
                    : Number(s.paidAmount) > 0
                      ? "Partial"
                      : "Unpaid",
                paidAmount: s.paidAmount || 0,
                paymentMethod: "",
                paymentType: "",
                transactionId: s.transactionId || "",
                paymentRemarks: s.comments || "",
                studentId: s.studentId || "",
                username: s.username || "",
                roll: s.roll || "",
                password: s.password || "",
                batch: "Basic Tazweed 6th Batch",
                country: s.country || "BD",
                date: s.createdAt ? String(s.createdAt).split("T")[0] : "",
                createdAt: s.createdAt || "",
                dueAmount: s.dueAmount || 0,
                courseFee: s.courseFee || 0,
                scholarshipAmount: s.scholarshipAmount || 0,
                raw: s,
              };
            });
          }
        } catch (e) {
          console.error("Tazweed parse error:", e);
        }
      }

      // ---------- 2) Najera Batch Students ----------
      let najeraStudents = [];
      if (najeraRes.status === "fulfilled") {
        try {
          const d = await najeraRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            najeraStudents = d.students.map((s) => {
              const status = resolveStatus(s); // ✅ Fixed
              return {
                id: s._id,
                _id: s._id,
                source: "Najera",
                sourceLabel: "Najera Batch",
                name: s.name || "",
                fatherName: "",
                motherName: "",
                course: "Quran Nazera",
                subject: "Quran Nazera",
                class: "Quran Nazera",
                phone: s.phone || "",
                email: "",
                address: "",
                permanentAddress: "",
                dobOrNid: "",
                age: "",
                gender: "",
                occupation: "",
                maritalStatus: "",
                guardianName: "",
                guardianPhone: s.phone || "",
                status: status, // ✅ From backend.status
                rawStatus: s.status || "Pending",
                paymentStatus:
                  Number(s.dueAmount) === 0
                    ? "Paid"
                    : Number(s.paidAmount) > 0
                      ? "Partial"
                      : "Unpaid",
                paidAmount: s.paidAmount || 0,
                paymentMethod: "",
                paymentType: "",
                transactionId: s.transactionId || "",
                paymentRemarks: s.comments || "",
                studentId: s.studentId || "",
                username: s.username || "",
                roll: s.roll || "",
                password: s.password || "",
                batch: "Najera Batch-02",
                country: s.country || "BD",
                date: s.createdAt ? String(s.createdAt).split("T")[0] : "",
                createdAt: s.createdAt || "",
                dueAmount: s.dueAmount || 0,
                courseFee: s.courseFee || 0,
                scholarshipAmount: s.scholarshipAmount || 0,
                raw: s,
              };
            });
          }
        } catch (e) {
          console.error("Najera parse error:", e);
        }
      }

      const combined = [...tazweedStudents, ...najeraStudents].sort((a, b) => {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return db - da;
      });

      setAdmissions(combined);
      console.log(
        `✅ Loaded: ${tazweedStudents.length} tazweed + ${najeraStudents.length} najera = ${combined.length} total`,
      );
    } catch (err) {
      console.error("❌ Fetch error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not load admissions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // ============================================================
  // Logout
  // ============================================================
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
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

  // ============================================================
  // Sidebar Menu
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

  // ============================================================
  // Filtering
  // ============================================================
  const filteredAdmissions = admissions.filter((a) => {
    if (sourceFilter !== "All" && a.source !== sourceFilter) return false;

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      a.name.toLowerCase().includes(term) ||
      a.fatherName.toLowerCase().includes(term) ||
      a.guardianName.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term) ||
      a.studentId.toLowerCase().includes(term) ||
      a.phone.includes(searchTerm);

    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    const matchesPayment =
      filterPayment === "All" || a.paymentStatus === filterPayment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(admissions.map((a) => a.status).filter(Boolean)),
  ];
  const uniquePayments = [
    "All",
    ...new Set(admissions.map((a) => a.paymentStatus).filter(Boolean)),
  ];

  const sourceCounts = {
    All: admissions.length,
    Tazweed: admissions.filter((a) => a.source === "Tazweed").length,
    Najera: admissions.filter((a) => a.source === "Najera").length,
  };

  // ============================================================
  // Badge helpers
  // ============================================================
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

  const getSourceBadge = (source) => {
    switch (source) {
      case "Tazweed":
        return "bg-green-100 text-green-700";
      case "Najera":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500" size={10} />;
      case "Pending":
        return <FaClockIcon className="text-yellow-500" size={10} />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" size={10} />;
      default:
        return <FaInfoCircle className="text-gray-500" size={10} />;
    }
  };

  // ============================================================
  // ✅ Approve — persistent
  // ============================================================
  const handleApprove = async (id) => {
    const student = admissions.find((a) => a.id === id);
    if (!student) return;

    const result = await Swal.fire({
      title: "Approve Admission?",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>Student:</strong> ${student.name}</p>
          <p><strong>Phone:</strong> ${student.phone}</p>
          <p><strong>Course:</strong> ${student.course}</p>
          <hr style="margin: 8px 0;">
          <label style="display:block; font-weight:bold; color:#004d4d; margin-bottom:4px;">Student ID *</label>
          <input id="swal-studentId" class="swal2-input" style="margin:0; width:100%; font-family:monospace;" value="${student.studentId || generateStudentId()}" />
          <label style="display:block; font-weight:bold; color:#004d4d; margin:10px 0 4px 0;">Password *</label>
          <input id="swal-password" class="swal2-input" style="margin:0; width:100%;" value="student123S@" />
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Approve!",
      preConfirm: () => {
        const studentId = document
          .getElementById("swal-studentId")
          .value.trim();
        const password = document.getElementById("swal-password").value.trim();
        if (!studentId) {
          Swal.showValidationMessage("Student ID আবশ্যক!");
          return false;
        }
        if (!password) {
          Swal.showValidationMessage("Password আবশ্যক!");
          return false;
        }
        return { studentId, password };
      },
    });

    if (!result.isConfirmed) return;

    const { studentId, password } = result.value;

    try {
      const res = await fetch(`${API_BASE}/students/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          password,
          roll: student.roll || "",
        }),
      });
      const data = await res.json();

      if (data.success) {
        // ✅ Local state update with rawStatus
        setAdmissions((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: "Approved",
                  rawStatus: "Active",
                  studentId,
                  password,
                  username: student.username || "",
                }
              : a,
          ),
        );

        Swal.fire({
          icon: "success",
          title: "✅ Approved!",
          html: `
            <div style="text-align: left;">
              <p><strong>Name:</strong> ${student.name}</p>
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 2px solid #86efac; margin-top: 10px;">
                <p style="font-weight: bold; color: #004d4d; margin-bottom: 6px;">🔑 Login Credentials:</p>
                <p><strong>Student ID:</strong> <span style="color:#004d4d; font-family:monospace; font-size:16px;">${studentId}</span></p>
                <p><strong>Password:</strong> <span style="color:#004d4d;">${password}</span></p>
                <p style="margin-top: 8px; font-size: 11px; color: #666;">📌 এই তথ্য স্টুডেন্টকে জানান।</p>
              </div>
            </div>
          `,
          confirmButtonColor: "#004d4d",
        });

        // ✅ Backend থেকে fresh data reload — যাতে sync থাকে
        setTimeout(() => fetchAdmissions(), 500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not approve.",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  // ✅ FIXED: Source অনুযায়ী সঠিক reject endpoint
  const handleReject = async (id) => {
    const student = admissions.find((a) => a.id === id);
    if (!student) return;

    const result = await Swal.fire({
      title: "Reject Admission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Reject!",
    });
    if (!result.isConfirmed) return;

    // ✅ Source অনুযায়ী সঠিক endpoint
    let rejectUrl = `${API_BASE}/basic-tazweed/update/${id}`;
    if (student.source === "Najera") {
      rejectUrl = `${API_BASE}/najera-batch/update/${id}`;
    }

    try {
      const res = await fetch(rejectUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected" }),
      });
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) =>
          prev.map((a) =>
            a.id === id
              ? { ...a, status: "Rejected", rawStatus: "Rejected" }
              : a,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          timer: 1500,
          showConfirmButton: false,
        });

        // ✅ Backend reload
        setTimeout(() => fetchAdmissions(), 500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not reject.",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  const handleDelete = async (id) => {
    const student = admissions.find((a) => a.id === id);
    if (!student) return;

    const result = await Swal.fire({
      title: "Delete Student?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Delete!",
    });
    if (!result.isConfirmed) return;

    let deleteUrl = `${API_BASE}/basic-tazweed/delete/${id}`;
    if (student.source === "Najera") {
      deleteUrl = `${API_BASE}/najera-batch/delete/${id}`;
    }

    try {
      const res = await fetch(deleteUrl, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) => prev.filter((a) => a.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not delete.",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  const openDetailsModal = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">New Admission</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${
            isSidebarOpen ? "left-0" : "-left-72 md:left-0"
          }`}
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
                        className={`transition-transform ${
                          activeSubMenu === item.id ? "rotate-180" : ""
                        }`}
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
            <p>Tarbiyah Online Madrasha</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-y-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> New Admission —
                <span className="text-teal-700">Tazweed & Najera</span>
              </h1>
              <p className="text-xs text-gray-500">
                Basic Tazweed এবং Najera Batch এর সব স্টুডেন্ট
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={fetchAdmissions}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync size={10} className={loading ? "animate-spin" : ""} />{" "}
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Source Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-1.5 mb-3 flex gap-1 overflow-x-auto">
            {[
              { id: "All", label: "All Students", color: "blue" },
              { id: "Tazweed", label: "Basic Tazweed", color: "green" },
              { id: "Najera", label: "Najera Batch", color: "purple" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSourceFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  sourceFilter === tab.id
                    ? tab.color === "blue"
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : tab.color === "green"
                        ? "bg-green-50 text-green-700 shadow-sm"
                        : "bg-purple-50 text-purple-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 rounded-full ${
                    sourceFilter === tab.id
                      ? "bg-white text-gray-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {sourceCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {sourceCounts[sourceFilter]}
              </p>
              <p className="text-[10px] text-gray-500">
                {sourceFilter === "All" ? "Total" : sourceFilter}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {
                  filteredAdmissions.filter((a) => a.status === "Pending")
                    .length
                }
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {
                  filteredAdmissions.filter((a) => a.status === "Approved")
                    .length
                }
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {
                  filteredAdmissions.filter((a) => a.status === "Rejected")
                    .length
                }
              </p>
              <p className="text-[10px] text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by name / phone / email / student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniquePayments.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-xs text-gray-500 mt-3">
                  Loading all students...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Student
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Student ID
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Source
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Course
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
                    {filteredAdmissions.map((a) => (
                      <tr
                        key={a.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2">
                          <p className="text-xs font-medium text-gray-800">
                            {a.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {a.email || a.phone}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          {a.studentId ? (
                            <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {a.studentId}
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-400 italic">
                              Not assigned
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${getSourceBadge(
                              a.source,
                            )}`}
                          >
                            {a.sourceLabel}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 max-w-[200px]">
                          {a.course || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {a.date || "N/A"}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded-full inline-flex items-center gap-1 ${getStatusColor(
                              a.status,
                            )}`}
                          >
                            {getStatusIcon(a.status)} {a.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded-full ${getPaymentColor(
                              a.paymentStatus,
                            )}`}
                          >
                            {a.paymentStatus}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(a)}
                              className="text-blue-600 hover:text-blue-800 p-0.5"
                              title="View Details"
                            >
                              <FaEye size={12} />
                            </button>
                            {a.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(a.id)}
                                  className="text-green-600 hover:text-green-800 p-0.5"
                                  title="Approve"
                                >
                                  <FaCheckCircle size={12} />
                                </button>
                                <button
                                  onClick={() => handleReject(a.id)}
                                  className="text-red-600 hover:text-red-800 p-0.5"
                                  title="Reject"
                                >
                                  <FaTimesCircle size={12} />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDelete(a.id)}
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
            )}
          </div>

          {/* No Results */}
          {!loading && filteredAdmissions.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaUserPlus className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Students Found
              </h3>
              <p className="text-xs text-gray-500">
                {admissions.length === 0
                  ? "Basic Tazweed বা Najera Batch থেকে student add করুন।"
                  : "আপনার search/filter এর সাথে কোনো student match করেনি।"}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Details Modal */}
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
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedAdmission.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedAdmission.course}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-semibold ${getSourceBadge(
                          selectedAdmission.source,
                        )}`}
                      >
                        {selectedAdmission.sourceLabel}
                      </span>
                      {selectedAdmission.studentId && (
                        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          ID: {selectedAdmission.studentId}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full inline-flex items-center gap-1 ${getStatusColor(
                        selectedAdmission.status,
                      )}`}
                    >
                      {getStatusIcon(selectedAdmission.status)}{" "}
                      {selectedAdmission.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Father</p>
                      <p className="font-semibold text-sm">
                        {selectedAdmission.fatherName || "N/A"}
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
                    <p className="text-xs text-gray-500">
                      NID / Birth Reg / DOB
                    </p>
                    <p className="font-semibold">
                      {selectedAdmission.dobOrNid || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-semibold">
                        {selectedAdmission.gender || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Country</p>
                      <p className="font-semibold">
                        {selectedAdmission.country || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Batch</p>
                    <p className="font-semibold">
                      {selectedAdmission.batch || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-semibold text-right">
                          {selectedAdmission.phone}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Email</span>
                        <span className="font-semibold text-right break-all">
                          {selectedAdmission.email || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Guardian Phone</span>
                        <span className="font-semibold text-right">
                          {selectedAdmission.guardianPhone || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Address</span>
                        <span className="font-semibold text-right max-w-[60%]">
                          {selectedAdmission.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Payment Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Payment Status</span>
                        <span
                          className={`font-semibold px-2 rounded-full text-xs ${getPaymentColor(
                            selectedAdmission.paymentStatus,
                          )}`}
                        >
                          {selectedAdmission.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-semibold">
                          ৳
                          {Number(
                            selectedAdmission.paidAmount || 0,
                          ).toLocaleString()}
                        </span>
                      </div>
                      {selectedAdmission.dueAmount !== undefined && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500">Due Amount</span>
                          <span className="font-semibold text-red-600">
                            ৳
                            {Number(
                              selectedAdmission.dueAmount || 0,
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Method</span>
                        <span className="font-semibold">
                          {selectedAdmission.paymentMethod || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-semibold text-xs text-right break-all">
                          {selectedAdmission.transactionId || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Applied Date</span>
                        <span className="font-semibold">
                          {selectedAdmission.date || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {selectedAdmission.status === "Pending" && (
                      <>
                        <button
                          onClick={() => {
                            handleApprove(selectedAdmission.id);
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                        >
                          <FaCheckCircle className="inline mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => {
                            handleReject(selectedAdmission.id);
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                        >
                          <FaTimesCircle className="inline mr-2" /> Reject
                        </button>
                      </>
                    )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default New_admission;
