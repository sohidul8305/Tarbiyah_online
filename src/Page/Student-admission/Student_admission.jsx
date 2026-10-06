// src/Page/Admin/Student_admission.jsx
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
  FaChartLine,
  FaUserPlus,
  FaIdCard,
  FaDatabase,
  FaEye,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaHourglassHalf,
  FaSchool as FaSchoolIcon,
  FaInfoCircle,
  FaSyncAlt,
  FaBuilding,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ DEPARTMENT-WISE CONFIG
// ============================================================
const DEPARTMENT_CONFIGS = {
  Elders: {
    label: "Quran For Elders",
    courseKeywords: [
      "qaida nuraniyah",
      "qaida nooraniya",
      "qaida noorani",
      "qaida nurani",
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
  },
  "Quran Studies": {
    label: "Quran Studies",
    courseKeywords: [
      "quran studies",
      "hifzul quran",
      "tarbiyah quran studies",
      "hifz",
    ],
  },
  Alimiya: {
    label: "Alimiya",
    courseKeywords: [
      "alimiya",
      "alimiyah",
      "dawra",
      "tafsir",
      "fiqh",
      "hadith",
      "arabic grammar",
    ],
  },
  Diploma: {
    label: "Diploma",
    courseKeywords: ["diploma"],
  },
};

const getCurrentDepartment = () => {
  try {
    const info = JSON.parse(localStorage.getItem("adminInfo") || "{}");
    return info.department || "Elders";
  } catch {
    return "Elders";
  }
};

const safeFetchJSON = async (url) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    if (text.trim().startsWith("<")) return { success: false };
    try {
      return JSON.parse(text);
    } catch {
      return { success: false };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const Student_admission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("student-management");
  const [activeSubMenu, setActiveSubMenu] = useState("admission-permission");
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
  const DEPT_KEYWORDS = deptConfig.courseKeywords;
  const DEPT_LABEL = deptConfig.label;

  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [sourceFilter, setSourceFilter] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Load admin info
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

  // ✅ Course check — current department
  const isDeptCourse = (courseStr) => {
    if (!courseStr) return false;
    const p = String(courseStr).toLowerCase().trim();
    return DEPT_KEYWORDS.some((c) => p.includes(c));
  };

  // ============================================================
  // ✅ Fetch Admissions — department filtered
  // ============================================================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      // ✅ ৩টি endpoint: Tazweed + Najera + Regular students (department filtered)
      const deptParam = encodeURIComponent(currentDept);
      const [tazweedData, najeraData, studentsData] = await Promise.all([
        safeFetchJSON(`${API_BASE}/basic-tazweed/all?department=${deptParam}`),
        safeFetchJSON(`${API_BASE}/najera-batch/all?department=${deptParam}`),
        safeFetchJSON(`${API_BASE}/students/all?department=${deptParam}`),
      ]);

      // ---------- 1) Basic Tazweed ----------
      let tazweedStudents = [];
      if (tazweedData.success && Array.isArray(tazweedData.students)) {
        tazweedStudents = tazweedData.students
          .filter((s) => {
            const sDept = String(s.department || "")
              .toLowerCase()
              .trim();
            if (sDept && sDept === currentDept.toLowerCase().trim())
              return true;
            const course = String(s.course || s.subject || "").toLowerCase();
            return isDeptCourse(course) || isDeptCourse("basic tajweed");
          })
          .map((s) => {
            const paid = Number(s.paidAmount) || 0;
            const due = Number(s.dueAmount) || 0;
            const isPaid = due === 0 && paid > 0;

            let priority = "Medium";
            if (isPaid) priority = "High";
            else if (paid === 0) priority = "Low";

            return {
              id: s._id,
              _id: s._id,
              source: "Tazweed",
              sourceLabel: "Basic Tazweed",
              studentName: s.name || "Unknown",
              fatherName: "N/A",
              motherName: "N/A",
              class: s.course || "Basic Tajweed (Level-1)",
              subject: "Basic Tajweed",
              phone: s.phone || "",
              email: "",
              address: "N/A",
              dob: "",
              gender: "N/A",
              country: s.country || "BD",
              studentId: s.studentId || "",
              previousSchool: "N/A",
              admissionDate: s.createdAt
                ? new Date(s.createdAt).toISOString().split("T")[0]
                : "N/A",
              status: "Approved",
              rawStatus: "Active",
              paymentStatus: isPaid ? "Paid" : paid > 0 ? "Partial" : "Unpaid",
              priority,
              notes: s.comments || "No additional notes",
              appliedDate: s.createdAt
                ? new Date(s.createdAt).toISOString().split("T")[0]
                : "N/A",
              reviewedBy: null,
              reviewedDate: null,
              rejectionReason: null,
              username: "",
              enrolledCourses: [],
              paidAmount: paid,
              courseFee: Number(s.courseFee) || 0,
              dueAmount: due,
              scholarshipAmount: Number(s.scholarshipAmount) || 0,
              paymentMethod: "",
              transactionId: s.transactionId || "",
              guardianPhone: s.phone || "",
              department: s.department || currentDept,
              _raw: s,
            };
          });
      }

      // ---------- 2) Najera Batch ----------
      let najeraStudents = [];
      if (najeraData.success && Array.isArray(najeraData.students)) {
        najeraStudents = najeraData.students
          .filter((s) => {
            const sDept = String(s.department || "")
              .toLowerCase()
              .trim();
            if (sDept && sDept === currentDept.toLowerCase().trim())
              return true;
            const course = String(s.course || s.subject || "").toLowerCase();
            return isDeptCourse(course) || isDeptCourse("najera");
          })
          .map((s) => {
            const paid = Number(s.paidAmount) || 0;
            const due = Number(s.dueAmount) || 0;
            const isPaid = due === 0 && paid > 0;

            let priority = "Medium";
            if (isPaid) priority = "High";
            else if (paid === 0) priority = "Low";

            return {
              id: s._id,
              _id: s._id,
              source: "Najera",
              sourceLabel: "Najera Batch",
              studentName: s.name || "Unknown",
              fatherName: "N/A",
              motherName: "N/A",
              class: s.course || "Quran Nazera",
              subject: "Quran Nazera",
              phone: s.phone || "",
              email: "",
              address: "N/A",
              dob: "",
              gender: "N/A",
              country: s.country || "BD",
              studentId: s.studentId || "",
              previousSchool: "N/A",
              admissionDate: s.createdAt
                ? new Date(s.createdAt).toISOString().split("T")[0]
                : "N/A",
              status: "Approved",
              rawStatus: "Active",
              paymentStatus: isPaid ? "Paid" : paid > 0 ? "Partial" : "Unpaid",
              priority,
              notes: s.comments || "No additional notes",
              appliedDate: s.createdAt
                ? new Date(s.createdAt).toISOString().split("T")[0]
                : "N/A",
              reviewedBy: null,
              reviewedDate: null,
              rejectionReason: null,
              username: "",
              enrolledCourses: [],
              paidAmount: paid,
              courseFee: Number(s.courseFee) || 0,
              dueAmount: due,
              scholarshipAmount: Number(s.scholarshipAmount) || 0,
              paymentMethod: "",
              transactionId: s.transactionId || "",
              guardianPhone: s.phone || "",
              department: s.department || currentDept,
              _raw: s,
            };
          });
      }

      // ---------- 3) Regular students (department) ----------
      let regularStudents = [];
      if (studentsData.success && Array.isArray(studentsData.students)) {
        regularStudents = studentsData.students
          .filter((s) => {
            const sDept = String(s.department || "")
              .toLowerCase()
              .trim();
            if (sDept && sDept === currentDept.toLowerCase().trim())
              return true;
            return isDeptCourse(s.course);
          })
          .map((s) => {
            const paid = Number(s.paidAmount) || 0;
            const due = Number(s.dueAmount) || 0;
            const isPaid = due === 0 && paid > 0;

            let priority = "Medium";
            if (isPaid) priority = "High";
            else if (paid === 0) priority = "Low";

            // Map status → CRM-style
            const rawStatus = s.status || "Pending";
            let uiStatus = "Pending";
            if (rawStatus === "Active") uiStatus = "Approved";
            else if (rawStatus === "Rejected" || rawStatus === "Inactive")
              uiStatus = "Rejected";

            return {
              id: s._id,
              _id: s._id,
              source: "Admission",
              sourceLabel: "Admission Form",
              studentName: s.name || "Unknown",
              fatherName: s.guardianName || s.fatherName || "N/A",
              motherName: s.motherName || "N/A",
              class: s.course || "N/A",
              subject: s.course || "N/A",
              phone: s.phone || "",
              email: s.email || "",
              address: s.presentAddress || s.address || "N/A",
              dob: s.dobOrNid || "",
              gender: s.gender || "N/A",
              country: s.country || "BD",
              studentId: s.studentId || s.username || "",
              previousSchool: s.previousSchool || "N/A",
              admissionDate: s.admissionDate
                ? new Date(s.admissionDate).toISOString().split("T")[0]
                : "N/A",
              status: uiStatus,
              rawStatus,
              paymentStatus:
                s.paymentStatus ||
                (isPaid ? "Paid" : paid > 0 ? "Partial" : "Unpaid"),
              priority,
              notes: s.comments || "No additional notes",
              appliedDate: s.admissionDate
                ? new Date(s.admissionDate).toISOString().split("T")[0]
                : "N/A",
              reviewedBy: null,
              reviewedDate: null,
              rejectionReason: null,
              username: s.username || "",
              enrolledCourses: s.enrolledCourses || [],
              paidAmount: paid,
              courseFee: Number(s.courseFee) || 0,
              dueAmount: due,
              scholarshipAmount: Number(s.scholarshipAmount) || 0,
              paymentMethod: s.paymentMethod || "",
              transactionId: s.transactionId || "",
              guardianPhone: s.guardianPhone || s.phone || "",
              department: s.department || currentDept,
              _raw: s,
            };
          });
      }

      const combined = [
        ...tazweedStudents,
        ...najeraStudents,
        ...regularStudents,
      ].sort((a, b) => {
        const da = new Date(a._raw?.createdAt || 0).getTime();
        const db = new Date(b._raw?.createdAt || 0).getTime();
        return db - da;
      });

      console.log("════════════════════════════════");
      console.log(`✅ ${currentDept} admissions:`);
      console.log(`   - Tazweed: ${tazweedStudents.length}`);
      console.log(`   - Najera: ${najeraStudents.length}`);
      console.log(`   - Regular: ${regularStudents.length}`);
      console.log(`   - Total: ${combined.length}`);
      console.log("════════════════════════════════");

      setAdmissionRequests(combined);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setFetchError("সার্ভারে সংযোগ করা যায়নি!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDept]);

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

  const filteredRequests = admissionRequests
    .filter((r) => (sourceFilter === "All" ? true : r.source === sourceFilter))
    .filter((request) => {
      const s = searchTerm.toLowerCase();
      const matchesSearch =
        !s ||
        (request.studentName || "").toLowerCase().includes(s) ||
        (request.fatherName || "").toLowerCase().includes(s) ||
        (request.email || "").toLowerCase().includes(s) ||
        (request.studentId || "").toLowerCase().includes(s) ||
        (request.phone || "").includes(searchTerm);
      const matchesStatus =
        filterStatus === "All" || request.status === filterStatus;
      const matchesCourse =
        filterCourse === "All" || request.class === filterCourse;
      const matchesPriority =
        filterPriority === "All" || request.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesCourse && matchesPriority;
    });

  const uniqueCourses = [
    "All",
    ...new Set(admissionRequests.map((r) => r.class).filter(Boolean)),
  ];
  const uniqueStatuses = [
    "All",
    ...new Set(admissionRequests.map((r) => r.status).filter(Boolean)),
  ];
  const uniquePriorities = [
    "All",
    ...new Set(admissionRequests.map((r) => r.priority).filter(Boolean)),
  ];

  const sourceCounts = {
    All: admissionRequests.length,
    Tazweed: admissionRequests.filter((r) => r.source === "Tazweed").length,
    Najera: admissionRequests.filter((r) => r.source === "Najera").length,
    Admission: admissionRequests.filter((r) => r.source === "Admission").length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Approved":
        return <FaCheckCircle className="text-green-500" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
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
      case "Admission":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const totalRequests = admissionRequests.length;
  const pendingRequests = admissionRequests.filter(
    (r) => r.status === "Pending",
  ).length;
  const approvedRequests = admissionRequests.filter(
    (r) => r.status === "Approved",
  ).length;
  const rejectedRequests = admissionRequests.filter(
    (r) => r.status === "Rejected",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Admission Permission ({currentDept})
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={
                          activeSubMenu === item.id
                            ? "rotate-180 transition-transform"
                            : "transition-transform"
                        }
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
                            className={`block px-3 py-1.5 rounded-lg text-xs transition-all ${activeSubMenu === sub.id ? "bg-teal-50 text-[#004d4d] font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                <FaUserPlus className="text-blue-600" /> Admission Permission —
                <span className="text-teal-700">{DEPT_LABEL}</span>
              </h1>
              <p className="text-xs text-gray-500">
                {loading
                  ? `Loading ${currentDept} data...`
                  : `${admissionRequests.length} student${admissionRequests.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchAdmissions}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={loading ? "animate-spin" : ""}
                />{" "}
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

          {/* Dept Badge */}
          <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 rounded-xl text-xs font-semibold mb-3 flex items-center gap-2">
            <FaBuilding className="text-teal-600" />
            Showing admissions of:{" "}
            <span className="font-bold">{currentDept}</span> department
          </div>

          {/* Source Tabs */}
          <div className="bg-white border rounded-xl shadow-sm p-1.5 mb-3 flex gap-1 overflow-x-auto">
            {[
              { id: "All", label: "All Students", color: "blue" },
              { id: "Admission", label: "Admission Form", color: "teal" },
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
                        : tab.color === "teal"
                          ? "bg-teal-50 text-teal-700 shadow-sm"
                          : "bg-purple-50 text-purple-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 rounded-full ${sourceFilter === tab.id ? "bg-white text-gray-700" : "bg-gray-200 text-gray-600"}`}
                >
                  {sourceCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {sourceCounts[sourceFilter]}
              </p>
              <p className="text-[10px] text-gray-500">
                {sourceFilter === "All" ? "Total" : sourceFilter}
              </p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingRequests}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {approvedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {rejectedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={`Search ${currentDept} students...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
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
                  className="px-1.5 py-1 text-xs border rounded-lg max-w-[180px]"
                >
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  {uniquePriorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="bg-white border rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-3">
                Loading {currentDept} admissions...
              </p>
            </div>
          ) : fetchError ? (
            <div className="bg-white border border-red-200 rounded-xl shadow-sm p-8 text-center">
              <p className="text-red-500 font-bold text-lg mb-2">⚠️ Error</p>
              <p className="text-gray-600 text-sm mb-4">{fetchError}</p>
              <button
                onClick={fetchAdmissions}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-500px)] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Student
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Source
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                        Father
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Course
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                        Phone
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                        Priority
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request, index) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-800">
                              {request.studentName}
                            </div>
                            {request.studentId && (
                              <div className="text-[10px] text-blue-600 font-mono">
                                ID: {request.studentId}
                              </div>
                            )}
                            <div className="text-[10px] text-gray-400">
                              {request.email || request.phone}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-semibold ${getSourceBadge(request.source)}`}
                            >
                              {request.sourceLabel}
                            </span>
                          </td>
                          <td className="px-3 py-2 hidden md:table-cell">
                            <div className="text-gray-700">
                              {request.fatherName}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {request.guardianPhone}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-700 text-xs max-w-[150px] truncate">
                              {request.class}
                            </div>
                          </td>
                          <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                            {request.phone}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(request.status)}`}
                            >
                              {getStatusIcon(request.status)}
                              {request.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getPriorityColor(request.priority)}`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openDetailsModal(request)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="View Details"
                              >
                                <FaEye size={14} />
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
                          <FaUserPlus className="text-4xl text-gray-300 mx-auto mb-2" />
                          <p>{currentDept} department-এ কোনো student নেই</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            Admission Form / Tazweed / Najera থেকে student add
                            করুন
                          </p>
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

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaIdCard className="text-blue-600" /> Student Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedRequest.studentName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedRequest.studentName}
                    </h2>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getSourceBadge(selectedRequest.source)}`}
                    >
                      {selectedRequest.sourceLabel}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      {selectedRequest.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.class}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    {selectedRequest.studentId && (
                      <span>🆔 {selectedRequest.studentId}</span>
                    )}
                    {selectedRequest.email && (
                      <span>📧 {selectedRequest.email}</span>
                    )}
                    <span>📱 {selectedRequest.phone}</span>
                    <span>📅 Applied: {selectedRequest.appliedDate}</span>
                    <span>🏫 {selectedRequest.department || currentDept}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaUser className="text-blue-500" /> Personal Info
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Father's Name</span>
                      <span className="font-medium">
                        {selectedRequest.fatherName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Mother's Name</span>
                      <span className="font-medium">
                        {selectedRequest.motherName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-medium">
                        {selectedRequest.gender}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Country</span>
                      <span className="font-medium">
                        {selectedRequest.country || "BD"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">NID / DOB</span>
                      <span className="font-medium">
                        {selectedRequest.dob || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaSchoolIcon className="text-green-500" /> Payment Details
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Course Fee</span>
                      <span className="font-medium">
                        ৳{selectedRequest.courseFee?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Scholarship</span>
                      <span className="font-medium text-blue-600">
                        ৳
                        {selectedRequest.scholarshipAmount?.toLocaleString() ||
                          0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Paid</span>
                      <span className="font-medium text-green-600">
                        ৳{selectedRequest.paidAmount?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Due</span>
                      <span className="font-medium text-red-600">
                        ৳{selectedRequest.dueAmount?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Payment Status</span>
                      <span
                        className={`font-medium ${selectedRequest.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedRequest.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Transaction ID</span>
                      <span className="font-medium text-xs">
                        {selectedRequest.transactionId || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedRequest.notes &&
                selectedRequest.notes !== "No additional notes" && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center gap-2">
                      <FaInfoCircle className="text-blue-500" /> Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedRequest.notes}
                    </p>
                  </div>
                )}

              <div className="flex gap-3 pt-4 border-t">
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

export default Student_admission;
