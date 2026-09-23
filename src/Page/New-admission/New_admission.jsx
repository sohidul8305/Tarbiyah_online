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
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ============================================================
// ✅ ELDERS DEPARTMENT — শুধু এই ৪টি course এর student দেখাবে
// ============================================================
const ELDERS_COURSES = [
  // 1️⃣ Qaida Nuraniyah (all spelling variations)
  "qaida nuraniyah",
  "qaida nooraniya",
  "qaida noorani",
  "qaida nurani",
  "qaidah nuraniyah",
  "qaidah nooraniya",
  "qaidah noorani",

  // 2️⃣ Quran Nazera
  "quran nazera",
  "nazera quran",
  "quran najera",
  "najera quran",

  // 3️⃣ Bakarah Hifz
  "bakarah hifz",
  "bakara hifz",
  "baqarah hifz",
  "baqara hifz",

  // 4️⃣ Basic Tajweed (Level-1)
  "basic tajweed (level-1)",
  "basic tajweed (level 1)",
  "basic tajweed level-1",
  "basic tajweed level 1",
  "basic tajweed",
];

// একটা single course string elders কিনা check করে
const isSingleEldersCourse = (singleCourse) => {
  const p = String(singleCourse).toLowerCase().trim();
  if (!p) return false;

  return ELDERS_COURSES.some((c) => {
    // exact match
    if (p === c) return true;
    // p এর ভিতরে c আছে (যেমন "basic tajweed (level-1)" এ "basic tajweed")
    if (p.includes(c)) return true;
    // c এর ভিতরে p আছে কিন্তু p অনেক ছোট না (ভুলে match এড়াতে)
    if (c.includes(p) && p.length >= 8) return true;
    return false;
  });
};

// ✅ Main check: student এর course field এ থাকা **প্রতিটা** course
// elders course হতে হবে। একটাও বাইরের course থাকলে FALSE।
const isEldersCourse = (courseStr) => {
  if (!courseStr) return false;

  const parts = String(courseStr)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) return false;

  // ⭐ প্রতিটা course elders হতে হবে
  return parts.every((part) => isSingleEldersCourse(part));
};

// Backend status → UI status mapping
const mapStatus = (s) => {
  if (!s) return "Pending";
  if (s === "Active") return "Approved";
  if (s === "Inactive") return "Rejected";
  if (s === "Approved" || s === "Rejected" || s === "Pending") return s;
  return "Pending";
};

const New_admission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
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
        department: "Quran for Elders",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ============================================================
  // Fetch Students from API → filter only Elders courses
  // ============================================================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.tarbiyahonline.com/api/students/all",
      );
      const data = await res.json();

      if (data.success) {
        const all = data.students || [];

        // ✅ শুধু pure elders course এর student filter
        const elders = all
          .filter((s) => isEldersCourse(s.course))
          .map((s) => ({
            id: s._id,
            _id: s._id,
            name: s.name || "",
            fatherName: s.fatherName || s.guardianName || "",
            motherName: s.motherName || "",
            course: s.course || "",
            subject: s.course || "",
            class: s.course || "",
            phone: s.phone || "",
            email: s.email || "",
            address: s.presentAddress || s.address || "",
            permanentAddress: s.permanentAddress || "",
            dobOrNid: s.dobOrNid || "",
            age: s.age || "",
            gender: s.gender || "",
            occupation: s.occupation || "",
            maritalStatus: s.maritalStatus || "",
            previousSchool: s.previousSchool || "",
            guardianName: s.guardianName || s.fatherName || "",
            guardianPhone: s.guardianPhone || s.phone || "",
            status: mapStatus(s.status),
            paymentStatus: s.paymentStatus || "Unpaid",
            paidAmount: s.paidAmount || 0,
            paymentMethod: s.paymentMethod || "",
            paymentType: s.paymentType || "",
            transactionId: s.transactionId || "",
            paymentRemarks: s.paymentRemarks || "",
            username: s.username || "",
            roll: s.roll || "",
            date: s.admissionDate
              ? String(s.admissionDate).split("T")[0]
              : s.createdAt
                ? String(s.createdAt).split("T")[0]
                : "",
            createdAt: s.createdAt || "",
            raw: s,
          }));

        setAdmissions(elders);
      } else {
        console.error("Failed to load students:", data.message);
      }
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

  // ============================================================
  // Filtering
  // ============================================================
  const filteredAdmissions = admissions.filter((a) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      a.name.toLowerCase().includes(term) ||
      a.fatherName.toLowerCase().includes(term) ||
      a.guardianName.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term) ||
      a.phone.includes(searchTerm);

    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    const matchesCourse =
      filterCourse === "All" ||
      a.course.toLowerCase().includes(filterCourse.toLowerCase());
    const matchesPayment =
      filterPayment === "All" || a.paymentStatus === filterPayment;

    return matchesSearch && matchesStatus && matchesCourse && matchesPayment;
  });

  const uniqueCourses = [
    "All",
    ...new Set(admissions.map((a) => a.course).filter(Boolean)),
  ];
  const uniqueStatuses = [
    "All",
    ...new Set(admissions.map((a) => a.status).filter(Boolean)),
  ];
  const uniquePayments = [
    "All",
    ...new Set(admissions.map((a) => a.paymentStatus).filter(Boolean)),
  ];

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
  // Approve / Reject / Delete → API calls
  // ============================================================
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Admission?",
      text: "Student will be marked as Active in the system.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Approve!",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://api.tarbiyahonline.com/api/admin-students/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Active" }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a)),
        );
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Student has been approved.",
          timer: 1500,
          showConfirmButton: false,
        });
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

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Admission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Reject!",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://api.tarbiyahonline.com/api/admin-students/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Inactive" }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)),
        );
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Admission?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Yes, Delete!",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://api.tarbiyahonline.com/api/admin-students/delete/${id}`,
        { method: "DELETE" },
      );
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) => prev.filter((a) => a.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
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
          <h1 className="text-sm font-bold text-gray-800">
            New Admission — Quran for Elders
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
        <main className="flex-1 p-4 md:p-6 w-full overflow-y-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> New Admission —
                <span className="text-teal-700">Quran for Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Qaida Nuraniyah • Quran Nazera • Bakarah Hifz • Basic Tajweed
                (Level-1)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={fetchAdmissions}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
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
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by name / phone / email..."
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
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg max-w-[180px]"
                >
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
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
                  Loading admissions...
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
                        Guardian
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
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {a.fatherName || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 max-w-[220px]">
                          {a.course}
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
                No Elders Course Admissions
              </h3>
              <p className="text-xs text-gray-500">
                Qaida Nuraniyah, Quran Nazera, Bakarah Hifz, Basic Tajweed
                (Level-1) — এই ৪টি কোর্সে এখনো কোনো নতুন ভর্তি হয়নি।
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
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="font-semibold">
                        {selectedAdmission.age || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Occupation</p>
                    <p className="font-semibold">
                      {selectedAdmission.occupation || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Marital Status</p>
                    <p className="font-semibold">
                      {selectedAdmission.maritalStatus || "N/A"}
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
                        <span className="text-gray-500">Guardian Contact</span>
                        <span className="font-semibold text-right">
                          {selectedAdmission.guardianPhone || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Present Address</span>
                        <span className="font-semibold text-right max-w-[60%]">
                          {selectedAdmission.address || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Permanent Address</span>
                        <span className="font-semibold text-right max-w-[60%]">
                          {selectedAdmission.permanentAddress || "N/A"}
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
