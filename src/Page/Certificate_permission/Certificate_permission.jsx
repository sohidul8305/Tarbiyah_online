// src/Page/Admin/Certificate_permission.jsx
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
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaLayerGroup,
  FaSave,
  FaHourglassHalf,
  FaCertificate,
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
    status: "Active",
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
    status: "Active",
  },
];

// ✅ Sample certificate requests
const ELDERS_DEFAULT_REQUESTS = [
  {
    id: 1,
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    class: "Elders Batch A",
    batch: "Batch-03",
    course: "Qaida Nuraniyah",
    teacher: "Jubayer Ahmad",
    certificateType: "Completion",
    requestDate: "2026-09-10",
    status: "Pending",
    grade: "A+",
    attendance: 92,
    examScore: 88,
    issuedDate: null,
    certificateNumber: null,
    notes: "Outstanding performance in Qaida Nuraniyah.",
    approvedBy: null,
    approvedDate: null,
  },
  {
    id: 2,
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    class: "Elders Batch A",
    batch: "Batch-03",
    course: "Qaida Nuraniyah",
    teacher: "Sumaiya Afrin Mim",
    certificateType: "Merit",
    requestDate: "2026-09-12",
    status: "Approved",
    grade: "A",
    attendance: 90,
    examScore: 85,
    issuedDate: null,
    certificateNumber: "CERT-2026-0001",
    notes: "Excellent progress. Certificate approved.",
    approvedBy: "Admin",
    approvedDate: "2026-09-14",
  },
];

const Certificate_permission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("exam");
  const [activeSubMenu, setActiveSubMenu] = useState("certificate-permission");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Elders students from API
  const [eldersStudents, setEldersStudents] = useState(
    ELDERS_STUDENTS_FALLBACK,
  );
  const [studentsLoading, setStudentsLoading] = useState(true);

  // ✅ Certificate requests
  const [certificateRequests, setCertificateRequests] = useState(() => {
    const saved = localStorage.getItem("eldersCertificateRequests");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_REQUESTS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    batch: "",
    course: "",
    teacher: "",
    certificateType: "Completion",
    requestDate: "",
    grade: "",
    attendance: 0,
    examScore: 0,
    notes: "",
  });

  const certificateTypes = ["Completion", "Merit", "Honors", "Participation"];
  const grades = ["A+", "A", "A-", "B", "C", "D", "F"];

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
                status: s.status || "Pending",
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

  // Save requests to localStorage
  useEffect(() => {
    localStorage.setItem(
      "eldersCertificateRequests",
      JSON.stringify(certificateRequests),
    );
  }, [certificateRequests]);

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
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Issued":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500" size={10} />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" size={10} />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" size={10} />;
      case "Issued":
        return <FaCertificate className="text-blue-500" size={10} />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Completion":
        return "bg-blue-100 text-blue-700";
      case "Merit":
        return "bg-purple-100 text-purple-700";
      case "Honors":
        return "bg-yellow-100 text-yellow-700";
      case "Participation":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-green-100 text-green-700";
      case "A-":
      case "B":
        return "bg-blue-100 text-blue-700";
      case "C":
        return "bg-yellow-100 text-yellow-700";
      case "D":
        return "bg-orange-100 text-orange-700";
      case "F":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredRequests = certificateRequests.filter((request) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (request.studentName || "").toLowerCase().includes(s) ||
      (request.studentId || "").toLowerCase().includes(s) ||
      (request.certificateNumber || "").toLowerCase().includes(s) ||
      (request.course || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || request.status === filterStatus;
    const matchesType =
      filterType === "All" || request.certificateType === filterType;
    const matchesClass = filterClass === "All" || request.class === filterClass;
    return matchesSearch && matchesStatus && matchesType && matchesClass;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(certificateRequests.map((r) => r.status)),
  ];
  const uniqueTypes = [
    "All",
    ...new Set(certificateRequests.map((r) => r.certificateType)),
  ];
  const uniqueClasses = [
    "All",
    ...new Set(certificateRequests.map((r) => r.class)),
  ];

  // ============================================================
  // Modal handlers
  // ============================================================
  const openAddModal = () => {
    const first = eldersStudents[0];
    setFormData({
      studentName: first?.name || "",
      studentId: first?.studentId || "",
      class: first?.class || ELDERS_CLASSES[0],
      batch: first?.batch || "Batch-03",
      course: first?.primaryCourse || ELDERS_COURSES[0],
      teacher: ELDERS_TEACHERS[0],
      certificateType: "Completion",
      requestDate: new Date().toISOString().split("T")[0],
      grade: "",
      attendance: 0,
      examScore: 0,
      notes: "",
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
      course: s.primaryCourse || s.course,
    }));
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const openApproveModal = (request) => {
    setSelectedRequest(request);
    setCertificateNumber(
      `CERT-${new Date().getFullYear()}-${String(certificateRequests.length + 1).padStart(4, "0")}`,
    );
    setShowApproveModal(true);
  };

  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleAddRequest = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.class ||
      !formData.course ||
      !formData.teacher
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newRequest = {
      id: Date.now(),
      studentName: formData.studentName,
      studentId: formData.studentId,
      class: formData.class,
      batch: formData.batch,
      course: formData.course,
      teacher: formData.teacher,
      certificateType: formData.certificateType,
      requestDate: formData.requestDate,
      status: "Pending",
      grade: formData.grade || "N/A",
      attendance: parseInt(formData.attendance) || 0,
      examScore: parseInt(formData.examScore) || 0,
      issuedDate: null,
      certificateNumber: null,
      notes: formData.notes || "",
      approvedBy: null,
      approvedDate: null,
    };

    setCertificateRequests([...certificateRequests, newRequest]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Certificate Request Added!",
      text: formData.studentName,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleApproveCertificate = () => {
    Swal.fire({
      title: "Approve Certificate?",
      text: `Approve certificate for ${selectedRequest.studentName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: "Approved",
                  certificateNumber,
                  approvedBy: adminInfo.name,
                  approvedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        setShowApproveModal(false);
        Swal.fire({
          icon: "success",
          title: "✅ Certificate Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleRejectCertificate = () => {
    if (!rejectReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please provide a reason",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Reject Certificate?",
      text: `Reject certificate for ${selectedRequest.studentName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: "Rejected",
                  notes: r.notes + `\nRejection Reason: ${rejectReason}`,
                  approvedBy: adminInfo.name,
                  approvedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        setShowRejectModal(false);
        Swal.fire({
          icon: "success",
          title: "Certificate Rejected",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleIssueCertificate = (request) => {
    Swal.fire({
      title: "Issue Certificate?",
      text: `Generate and download certificate for ${request.studentName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, issue!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCertificateRequests(
          certificateRequests.map((r) =>
            r.id === request.id
              ? {
                  ...r,
                  status: "Issued",
                  issuedDate: new Date().toISOString().split("T")[0],
                }
              : r,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "✅ Certificate Issued!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalRequests = certificateRequests.length;
  const pendingRequests = certificateRequests.filter(
    (r) => r.status === "Pending",
  ).length;
  const approvedRequests = certificateRequests.filter(
    (r) => r.status === "Approved" || r.status === "Issued",
  ).length;
  const rejectedRequests = certificateRequests.filter(
    (r) => r.status === "Rejected",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Certificate Permission (Elders)
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
                <FaCertificate className="text-purple-600" /> Certificate
                Permission —
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
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Request
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalRequests}</p>
              <p className="text-[10px] text-gray-500">Total Requests</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingRequests}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {approvedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {rejectedRequests}
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
                  placeholder="Search elders certificate requests..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
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
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Grade
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
                          <div className="text-[10px] text-gray-400">
                            {request.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {request.class}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {request.course}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getTypeColor(request.certificateType)}`}
                          >
                            {request.certificateType}
                          </span>
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${getGradeColor(request.grade)}`}
                          >
                            {request.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(request.status)}`}
                          >
                            {getStatusIcon(request.status)}
                            {request.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(request)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="View"
                            >
                              <FaEye size={12} />
                            </button>
                            {request.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => openApproveModal(request)}
                                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                  title="Approve"
                                >
                                  <FaCheckCircle size={12} />
                                </button>
                                <button
                                  onClick={() => openRejectModal(request)}
                                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                  title="Reject"
                                >
                                  <FaTimesCircle size={12} />
                                </button>
                              </>
                            )}
                            {request.status === "Approved" && (
                              <button
                                onClick={() => handleIssueCertificate(request)}
                                className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                title="Issue"
                              >
                                <FaCertificate size={12} />
                              </button>
                            )}
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
                        <FaCertificate className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No elders certificate requests found</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          উপরে "Add Request" ক্লিক করে যোগ করুন
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-purple-600" /> Add Elders Certificate
                Request
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRequest} className="p-6 space-y-4">
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
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_BATCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
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
                    Teacher *
                  </label>
                  <select
                    required
                    value={formData.teacher}
                    onChange={(e) =>
                      setFormData({ ...formData, teacher: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_TEACHERS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Type *
                  </label>
                  <select
                    required
                    value={formData.certificateType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certificateType: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {certificateTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.requestDate}
                    onChange={(e) =>
                      setFormData({ ...formData, requestDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Score (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.examScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        examScore: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Request
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

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaCertificate className="text-purple-600" /> Certificate
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
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedRequest.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedRequest.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      {selectedRequest.status}
                    </span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedRequest.certificateType)}`}
                    >
                      {selectedRequest.certificateType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.studentId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedRequest.class}</span>
                    <span>📖 {selectedRequest.course}</span>
                    <span>👨‍🏫 {selectedRequest.teacher}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Grade</p>
                  <p
                    className={`inline-flex px-2 py-0.5 rounded-full text-sm font-bold ${getGradeColor(selectedRequest.grade)}`}
                  >
                    {selectedRequest.grade}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Attendance</p>
                  <p className="text-sm font-semibold">
                    {selectedRequest.attendance}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Exam Score</p>
                  <p className="text-sm font-semibold">
                    {selectedRequest.examScore}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Request Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedRequest.requestDate)}
                  </p>
                </div>
              </div>

              {selectedRequest.certificateNumber && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">
                    Certificate Number
                  </p>
                  <p className="text-sm font-semibold text-purple-600">
                    {selectedRequest.certificateNumber}
                  </p>
                </div>
              )}

              {selectedRequest.issuedDate && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Issued Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedRequest.issuedDate)}
                  </p>
                </div>
              )}

              {selectedRequest.approvedBy && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Approved By</p>
                    <p className="text-sm font-semibold">
                      {selectedRequest.approvedBy}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Approved Date</p>
                    <p className="text-sm font-semibold">
                      {formatDate(selectedRequest.approvedDate)}
                    </p>
                  </div>
                </div>
              )}

              {selectedRequest.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notes</p>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t flex-wrap">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openApproveModal(selectedRequest);
                      }}
                      className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      <FaCheckCircle className="inline mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openRejectModal(selectedRequest);
                      }}
                      className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      <FaTimesCircle className="inline mr-2" /> Reject
                    </button>
                  </>
                )}
                {selectedRequest.status === "Approved" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleIssueCertificate(selectedRequest);
                    }}
                    className="flex-1 min-w-[100px] bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    <FaCertificate className="inline mr-2" /> Issue
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 min-w-[100px] bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Approve Certificate
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedRequest.studentName}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>
                <strong>Type:</strong> {selectedRequest.certificateType}
              </p>
              <p>
                <strong>Class:</strong> {selectedRequest.class}
              </p>
              <p>
                <strong>Course:</strong> {selectedRequest.course}
              </p>
              <p>
                <strong>Grade:</strong> {selectedRequest.grade}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Number *
              </label>
              <input
                type="text"
                required
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleApproveCertificate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm"
              >
                <FaCheckCircle className="inline mr-2" /> Approve
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FaTimesCircle className="text-red-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Reject Certificate
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedRequest.studentName}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>
                <strong>Type:</strong> {selectedRequest.certificateType}
              </p>
              <p>
                <strong>Class:</strong> {selectedRequest.class}
              </p>
              <p>
                <strong>Course:</strong> {selectedRequest.course}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rejection Reason *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows="3"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Enter rejection reason..."
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleRejectCertificate}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
              >
                <FaTimesCircle className="inline mr-2" /> Reject
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate_permission;
