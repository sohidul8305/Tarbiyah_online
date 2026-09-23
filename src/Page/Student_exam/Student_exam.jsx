// src/Page/Admin/Student_exam.jsx
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
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaLayerGroup,
  FaSave,
  FaHourglassHalf,
  FaFileAlt,
  FaSyncAlt,
  FaClipboardList,
} from "react-icons/fa";
import {
  MdDashboard,
  MdGrade,
  MdQuiz,
  MdAssignment,
  MdVerified,
} from "react-icons/md";
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

// ============================================================
// ✅ EXAM TYPES
// ============================================================
const EXAM_TYPES = {
  GRAD: "Grad",
  CLASS_TEST: "Class Test",
  MID_TERM: "Mid Term",
  FINAL_EXAM: "Final Exam",
  WEEKLY: "Weekly Test",
  QUIZ: "Quiz",
};

const EXAM_TYPE_LIST = [
  EXAM_TYPES.GRAD,
  EXAM_TYPES.CLASS_TEST,
  EXAM_TYPES.MID_TERM,
  EXAM_TYPES.FINAL_EXAM,
  EXAM_TYPES.WEEKLY,
  EXAM_TYPES.QUIZ,
];

// ============================================================
// ✅ Sample exam records
// ============================================================
const ELDERS_DEFAULT_EXAMS = [
  {
    id: 1,
    examType: EXAM_TYPES.GRAD,
    examTitle: "Final Grade - Qaida Nuraniyah",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Jubayer Ahmad",
    examDate: "2026-09-15",
    totalMarks: 100,
    obtainedMarks: 92,
    grade: "A+",
    status: "Completed",
    remarks: "Outstanding performance",
    createdAt: "2026-09-15",
  },
  {
    id: 2,
    examType: EXAM_TYPES.GRAD,
    examTitle: "Final Grade - Qaida Nuraniyah",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Sumaiya Afrin Mim",
    examDate: "2026-09-15",
    totalMarks: 100,
    obtainedMarks: 85,
    grade: "A",
    status: "Completed",
    remarks: "Very good effort",
    createdAt: "2026-09-15",
  },
  {
    id: 3,
    examType: EXAM_TYPES.CLASS_TEST,
    examTitle: "Class Test - Week 3",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Jubayer Ahmad",
    examDate: "2026-09-20",
    totalMarks: 50,
    obtainedMarks: 44,
    grade: "A+",
    status: "Completed",
    remarks: "Excellent",
    createdAt: "2026-09-20",
  },
  {
    id: 4,
    examType: EXAM_TYPES.CLASS_TEST,
    examTitle: "Class Test - Week 4",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Sumaiya Afrin Mim",
    examDate: "2026-09-27",
    totalMarks: 50,
    obtainedMarks: 40,
    grade: "A",
    status: "Completed",
    remarks: "Good progress",
    createdAt: "2026-09-27",
  },
  {
    id: 5,
    examType: EXAM_TYPES.MID_TERM,
    examTitle: "Mid Term Exam 2026",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Jubayer Ahmad",
    examDate: "2026-10-15",
    totalMarks: 100,
    obtainedMarks: 88,
    grade: "A",
    status: "Upcoming",
    remarks: "",
    createdAt: "2026-09-25",
  },
  {
    id: 6,
    examType: EXAM_TYPES.MID_TERM,
    examTitle: "Mid Term Exam 2026",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Sumaiya Afrin Mim",
    examDate: "2026-10-15",
    totalMarks: 100,
    obtainedMarks: 0,
    grade: "-",
    status: "Upcoming",
    remarks: "",
    createdAt: "2026-09-25",
  },
  {
    id: 7,
    examType: EXAM_TYPES.FINAL_EXAM,
    examTitle: "Final Exam 2026",
    studentName: "Omer Faruk",
    studentId: "TET26FB6001",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Jubayer Ahmad",
    examDate: "2026-12-15",
    totalMarks: 100,
    obtainedMarks: 0,
    grade: "-",
    status: "Upcoming",
    remarks: "",
    createdAt: "2026-09-01",
  },
  {
    id: 8,
    examType: EXAM_TYPES.FINAL_EXAM,
    examTitle: "Final Exam 2026",
    studentName: "Ikramm",
    studentId: "TET26FB6002",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    teacher: "Sumaiya Afrin Mim",
    examDate: "2026-12-15",
    totalMarks: 100,
    obtainedMarks: 0,
    grade: "-",
    status: "Upcoming",
    remarks: "",
    createdAt: "2026-09-01",
  },
];

// ============================================================
// ✅ URL Path → Tab ID mapping
// ============================================================
const getTabFromPath = (pathname) => {
  if (pathname.includes("/admin-exam/grad")) return "grad";
  if (pathname.includes("/admin-exam/class-test")) return "class-test";
  if (pathname.includes("/admin-exam/mid-term")) return "mid-term";
  if (pathname.includes("/admin-exam/final-exam")) return "final";
  if (pathname.includes("/admin-exam/student-exam")) return "all";
  // default — Student exam page with all
  return "all";
};

const Student_exam = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("exam");
  const [activeSubMenu, setActiveSubMenu] = useState("student-exam");

  // ✅ URL থেকে tab auto-set
  const [activeTab, setActiveTab] = useState(() =>
    getTabFromPath(location.pathname),
  );

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

  // ✅ Elders exams
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem("eldersStudentExams");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_EXAMS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const [formData, setFormData] = useState({
    examType: EXAM_TYPES.CLASS_TEST,
    examTitle: "",
    studentName: "",
    studentId: "",
    course: "",
    class: "",
    batch: "",
    teacher: "",
    examDate: "",
    totalMarks: 100,
    obtainedMarks: 0,
    grade: "-",
    status: "Upcoming",
    remarks: "",
  });

  const statuses = ["Upcoming", "Completed", "Cancelled"];

  // ============================================================
  // ✅ URL change হলে tab update
  // ============================================================
  useEffect(() => {
    const tabFromPath = getTabFromPath(location.pathname);
    setActiveTab(tabFromPath);
    console.log("📍 Path:", location.pathname, "→ Tab:", tabFromPath);
  }, [location.pathname]);

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

  // Save exams
  useEffect(() => {
    localStorage.setItem("eldersStudentExams", JSON.stringify(exams));
  }, [exams]);

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

  // ============================================================
  // HELPERS
  // ============================================================
  const calculateGrade = (obtained, total) => {
    if (!total || total === 0) return "-";
    const pct = (obtained / total) * 100;
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "A-";
    if (pct >= 60) return "B";
    if (pct >= 50) return "C";
    if (pct >= 40) return "D";
    return "F";
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-500" size={10} />;
      case "Upcoming":
        return <FaHourglassHalf className="text-yellow-500" size={10} />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" size={10} />;
      default:
        return null;
    }
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

  // ============================================================
  // ✅ Tabs config
  // ============================================================
  const tabs = [
    {
      id: "all",
      label: "All Exams",
      icon: <FaCalendarCheck size={12} />,
      color: "text-blue-600",
      path: "/admin-exam/student-exam",
    },
    {
      id: "grad",
      label: "Grad",
      icon: <MdGrade size={14} />,
      color: "text-green-600",
      type: EXAM_TYPES.GRAD,
      path: "/admin-exam/grad",
    },
    {
      id: "class-test",
      label: "Class Test",
      icon: <MdQuiz size={14} />,
      color: "text-blue-600",
      type: EXAM_TYPES.CLASS_TEST,
      path: "/admin-exam/class-test",
    },
    {
      id: "mid-term",
      label: "Mid Term",
      icon: <MdAssignment size={14} />,
      color: "text-purple-600",
      type: EXAM_TYPES.MID_TERM,
      path: "/admin-exam/mid-term",
    },
    {
      id: "final",
      label: "Final Exam",
      icon: <MdVerified size={14} />,
      color: "text-indigo-600",
      type: EXAM_TYPES.FINAL_EXAM,
      path: "/admin-exam/final-exam",
    },
    {
      id: "weekly",
      label: "Weekly Test",
      icon: <FaClipboardList size={12} />,
      color: "text-orange-600",
      type: EXAM_TYPES.WEEKLY,
      path: "/admin-exam/student-exam",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: <MdQuiz size={14} />,
      color: "text-teal-600",
      type: EXAM_TYPES.QUIZ,
      path: "/admin-exam/student-exam",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);
  const currentTabType = currentTab?.type;

  const filteredExams = exams
    .filter((exam) => !currentTabType || exam.examType === currentTabType)
    .filter((exam) => {
      const s = searchTerm.toLowerCase();
      const matchesSearch =
        !s ||
        (exam.studentName || "").toLowerCase().includes(s) ||
        (exam.studentId || "").toLowerCase().includes(s) ||
        (exam.examTitle || "").toLowerCase().includes(s) ||
        (exam.course || "").toLowerCase().includes(s);
      const matchesStatus =
        filterStatus === "All" || exam.status === filterStatus;
      const matchesCourse =
        filterCourse === "All" || exam.course === filterCourse;
      const matchesType = filterType === "All" || exam.examType === filterType;
      return matchesSearch && matchesStatus && matchesCourse && matchesType;
    });

  const uniqueStatuses = ["All", ...new Set(exams.map((e) => e.status))];
  const uniqueCourses = ["All", ...new Set(exams.map((e) => e.course))];

  const totalExams = exams.length;
  const gradCount = exams.filter((e) => e.examType === EXAM_TYPES.GRAD).length;
  const classTestCount = exams.filter(
    (e) => e.examType === EXAM_TYPES.CLASS_TEST,
  ).length;
  const midTermCount = exams.filter(
    (e) => e.examType === EXAM_TYPES.MID_TERM,
  ).length;
  const finalCount = exams.filter(
    (e) => e.examType === EXAM_TYPES.FINAL_EXAM,
  ).length;
  const upcomingCount = exams.filter((e) => e.status === "Upcoming").length;

  // ============================================================
  // CRUD handlers
  // ============================================================
  const openAddModal = () => {
    const first = eldersStudents[0];
    const tabType = currentTabType || EXAM_TYPES.CLASS_TEST;
    setFormData({
      examType: tabType,
      examTitle: `${tabType} - ${new Date().toLocaleDateString()}`,
      studentName: first?.name || "",
      studentId: first?.studentId || "",
      course: first?.primaryCourse || ELDERS_COURSES[0],
      class: first?.class || ELDERS_CLASSES[0],
      batch: first?.batch || "Batch-03",
      teacher: ELDERS_TEACHERS[0],
      examDate: new Date().toISOString().split("T")[0],
      totalMarks: 100,
      obtainedMarks: 0,
      grade: "-",
      status: "Upcoming",
      remarks: "",
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

  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setFormData({
      examType: exam.examType,
      examTitle: exam.examTitle,
      studentName: exam.studentName,
      studentId: exam.studentId,
      course: exam.course,
      class: exam.class,
      batch: exam.batch,
      teacher: exam.teacher,
      examDate: exam.examDate,
      totalMarks: exam.totalMarks,
      obtainedMarks: exam.obtainedMarks,
      grade: exam.grade,
      status: exam.status,
      remarks: exam.remarks || "",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (exam) => {
    setSelectedExam(exam);
    setShowDetailsModal(true);
  };

  const handleAddExam = (e) => {
    e.preventDefault();

    if (
      !formData.examTitle ||
      !formData.studentName ||
      !formData.course ||
      !formData.examDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const grade =
      formData.status === "Completed"
        ? calculateGrade(formData.obtainedMarks, formData.totalMarks)
        : "-";

    const newExam = {
      id: Date.now(),
      ...formData,
      grade,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setExams([...exams, newExam]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: `✅ ${formData.examType} Added!`,
      text: newExam.examTitle,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditExam = (e) => {
    e.preventDefault();

    if (
      !formData.examTitle ||
      !formData.studentName ||
      !formData.course ||
      !formData.examDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const grade =
      formData.status === "Completed"
        ? calculateGrade(formData.obtainedMarks, formData.totalMarks)
        : "-";

    setExams(
      exams.map((e) =>
        e.id === selectedExam.id ? { ...e, ...formData, grade } : e,
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

  const handleDeleteExam = (id) => {
    Swal.fire({
      title: "Delete Exam?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExams(exams.filter((e) => e.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleMarkCompleted = (exam) => {
    Swal.fire({
      title: "Mark as Completed?",
      html: `
        <div style="text-align:left;">
          <p>Enter obtained marks for <strong>${exam.studentName}</strong></p>
          <input id="swal-marks" class="swal2-input" type="number" placeholder="Obtained marks" min="0" max="${exam.totalMarks}" value="${exam.obtainedMarks || 0}" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      confirmButtonText: "Save",
      preConfirm: () => {
        const marks = parseFloat(document.getElementById("swal-marks").value);
        if (isNaN(marks) || marks < 0 || marks > exam.totalMarks) {
          Swal.showValidationMessage(
            `Marks must be between 0 and ${exam.totalMarks}`,
          );
          return false;
        }
        return marks;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const obtained = result.value;
        const grade = calculateGrade(obtained, exam.totalMarks);
        setExams(
          exams.map((e) =>
            e.id === exam.id
              ? { ...e, obtainedMarks: obtained, grade, status: "Completed" }
              : e,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "✅ Marked Completed!",
          text: `Grade: ${grade}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // ✅ Tab click handle — URL change + tab switch
  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (tab.path && location.pathname !== tab.path) {
      navigate(tab.path);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Student Exam (Elders)
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
                        className={`transition-transform ${
                          activeSubMenu === item.id ? "rotate-180" : ""
                        }`}
                      >
                        <FaArrowRight size={12} />
                      </span>
                    </button>
                    {activeSubMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => {
                          const isActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.id}
                              to={sub.path}
                              onClick={() => {
                                setActiveSubMenu(item.id);
                                setIsSidebarOpen(false);
                              }}
                              className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                                isActive
                                  ? "bg-teal-50 text-[#004d4d] font-bold"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
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
                <FaCalendarCheck className="text-purple-600" /> Student Exam —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                {studentsLoading
                  ? "Loading elders students..."
                  : `${eldersStudents.length} elders student${eldersStudents.length !== 1 ? "s" : ""} • ${currentTab?.label || "All Exams"}`}
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
                <FaPlusCircle size={12} /> Add {currentTabType || "Exam"}
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
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalExams}</p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">{gradCount}</p>
              <p className="text-[10px] text-gray-500">Grad</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-500">
                {classTestCount}
              </p>
              <p className="text-[10px] text-gray-500">Class Test</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {midTermCount}
              </p>
              <p className="text-[10px] text-gray-500">Mid Term</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-indigo-600">{finalCount}</p>
              <p className="text-[10px] text-gray-500">Final</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {upcomingCount}
              </p>
              <p className="text-[10px] text-gray-500">Upcoming</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3 flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span
                  className={activeTab === tab.id ? "text-white" : tab.color}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders exams..."
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
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  <option value="All">All Types</option>
                  {EXAM_TYPE_LIST.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Exam Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-600px)] overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      #
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Exam
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Student
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Course
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Marks
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
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
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam, index) => (
                      <tr key={exam.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                            {exam.examType}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {exam.examTitle}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {exam.studentName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {exam.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {exam.course}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {formatDate(exam.examDate)}
                        </td>
                        <td className="px-3 py-2 text-gray-700">
                          <span className="font-semibold">
                            {exam.obtainedMarks || 0}
                          </span>
                          <span className="text-gray-400">
                            {" "}
                            / {exam.totalMarks || 0}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${getGradeColor(exam.grade)}`}
                          >
                            {exam.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(exam.status)}`}
                          >
                            {getStatusIcon(exam.status)}
                            {exam.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDetailsModal(exam)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="View"
                            >
                              <FaEye size={12} />
                            </button>
                            {exam.status === "Upcoming" && (
                              <button
                                onClick={() => handleMarkCompleted(exam)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Mark Completed"
                              >
                                <FaCheckCircle size={12} />
                              </button>
                            )}
                            <button
                              onClick={() => openEditModal(exam)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteExam(exam.id)}
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
                        colSpan="10"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaCalendarCheck className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No exams found for {currentTab?.label}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          উপরে "Add {currentTabType}" ক্লিক করে যোগ করুন
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
                <FaPlusCircle className="text-purple-600" /> Add{" "}
                {formData.examType}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddExam} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Student select করলে বাকি information auto-fill হবে
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Type *
                  </label>
                  <select
                    required
                    value={formData.examType}
                    onChange={(e) =>
                      setFormData({ ...formData, examType: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {EXAM_TYPE_LIST.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.examTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, examTitle: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Class Test - Week 3"
                  />
                </div>
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
                    Class
                  </label>
                  <select
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher
                  </label>
                  <select
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
                    Exam Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.examDate}
                    onChange={(e) =>
                      setFormData({ ...formData, examDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
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

              {formData.status === "Completed" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Marks *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.totalMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalMarks: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obtained Marks *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.obtainedMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          obtainedMarks: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
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
                  <FaSave className="inline mr-2" size={14} /> Add{" "}
                  {formData.examType}
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
      {showEditModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Exam
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditExam} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Type *
                  </label>
                  <select
                    required
                    value={formData.examType}
                    onChange={(e) =>
                      setFormData({ ...formData, examType: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {EXAM_TYPE_LIST.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.examTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, examTitle: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
                    Class
                  </label>
                  <select
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.examDate}
                    onChange={(e) =>
                      setFormData({ ...formData, examDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
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

              {formData.status === "Completed" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Marks *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.totalMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalMarks: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obtained Marks *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.obtainedMarks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          obtainedMarks: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
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
      {showDetailsModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileAlt className="text-blue-600" /> Exam Details
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
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold mb-1">
                    {selectedExam.examType}
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedExam.examTitle}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExam.status)}`}
                >
                  {getStatusIcon(selectedExam.status)}
                  {selectedExam.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Student</p>
                  <p className="text-sm font-semibold">
                    {selectedExam.studentName}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Student ID</p>
                  <p className="text-sm font-semibold">
                    {selectedExam.studentId}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Course</p>
                  <p className="text-sm font-semibold">{selectedExam.course}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Class</p>
                  <p className="text-sm font-semibold">{selectedExam.class}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Batch</p>
                  <p className="text-sm font-semibold">
                    {selectedExam.batch || "-"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Teacher</p>
                  <p className="text-sm font-semibold">
                    {selectedExam.teacher}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Exam Date</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedExam.examDate)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Total Marks</p>
                  <p className="text-sm font-semibold">
                    {selectedExam.totalMarks}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Obtained Marks</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {selectedExam.obtainedMarks}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-400">Grade</p>
                  <p
                    className={`inline-flex px-4 py-1 rounded-full text-lg font-bold ${getGradeColor(selectedExam.grade)}`}
                  >
                    {selectedExam.grade}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-400">Percentage</p>
                  <p className="text-lg font-bold text-purple-600">
                    {selectedExam.totalMarks > 0
                      ? Math.round(
                          (selectedExam.obtainedMarks /
                            selectedExam.totalMarks) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>

              {selectedExam.remarks && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Remarks</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedExam.remarks}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                {selectedExam.status === "Upcoming" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleMarkCompleted(selectedExam);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    <FaCheckCircle className="inline mr-2" /> Mark Completed
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedExam);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteExam(selectedExam.id);
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

export default Student_exam;
