// src/Page/Admin/Clear_routing.jsx
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
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartLine,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaLayerGroup,
  FaSave,
  FaUserTimes,
  FaHourglassHalf,
  FaCheckDouble,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaEraser,
  FaExclamationCircle,
  FaCalendarTimes,
  FaPlus,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ============================================================
// ✅ ELDERS DEPARTMENT — শুধু এই ২ জন teacher ও elders courses
// ============================================================
const ELDERS_TEACHERS = [
  { name: "Jubayer Ahmad", id: "TCH001", designation: "Senior Teacher" },
  { name: "Sumaiya Afrin Mim", id: "TCH002", designation: "Junior Teacher" },
];

const ELDERS_COURSES = [
  "Qaida Nuraniyah",
  "Quran Nazera",
  "Najera",
  "Basic Tajweed",
  "Bakarah Hifz",
];

const ELDERS_BATCHES = [
  "Batch-03",
  "Batch-06",
  "Batch-02",
  "Batch-01",
  "Batch-04",
];

const ELDERS_CLASSES = [
  "Elders Batch A",
  "Elders Batch B",
  "Elders Batch C",
  "Elders Batch D",
  "Elders Batch E",
];

// ✅ Elders default routines (image এর schedule এর মতো)
const ELDERS_DEFAULT_ROUTINES = [
  // ===== Morning: 6:00 - 7:00 AM =====
  {
    id: 1,
    teacher: "Jubayer Ahmad",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Saturday",
    time: "06:00 AM - 07:00 AM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 2,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Saturday",
    time: "06:00 AM - 07:00 AM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 3,
    teacher: "Jubayer Ahmad",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Monday",
    time: "06:00 AM - 07:00 AM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 4,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Monday",
    time: "06:00 AM - 07:00 AM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },

  // ===== Afternoon: 3:00 - 4:30 PM =====
  {
    id: 5,
    teacher: "Jubayer Ahmad",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Sunday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 6,
    teacher: "Sumaiya Afrin Mim",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Sunday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 7,
    teacher: "Jubayer Ahmad",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Tuesday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 8,
    teacher: "Sumaiya Afrin Mim",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Tuesday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 9,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Saturday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 10,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Monday",
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },

  // ===== Evening: 8:00 - 9:00 PM =====
  {
    id: 11,
    teacher: "Jubayer Ahmad",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Saturday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 12,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Saturday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 13,
    teacher: "Jubayer Ahmad",
    subject: "Najera",
    class: "Elders Batch C",
    batch: "Batch-02",
    day: "Saturday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    students: 12,
    createdBy: "Admin",
    createdAt: "2026-08-25",
  },
  {
    id: 14,
    teacher: "Sumaiya Afrin Mim",
    subject: "Najera",
    class: "Elders Batch C",
    batch: "Batch-02",
    day: "Saturday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    students: 12,
    createdBy: "Admin",
    createdAt: "2026-08-25",
  },
  {
    id: 15,
    teacher: "Jubayer Ahmad",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Sunday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 16,
    teacher: "Sumaiya Afrin Mim",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Sunday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 17,
    teacher: "Jubayer Ahmad",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Monday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 18,
    teacher: "Sumaiya Afrin Mim",
    subject: "Qaida Nuraniyah",
    class: "Elders Batch A",
    batch: "Batch-03",
    day: "Monday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 1",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    students: 18,
    createdBy: "Admin",
    createdAt: "2026-07-25",
  },
  {
    id: 19,
    teacher: "Jubayer Ahmad",
    subject: "Najera",
    class: "Elders Batch C",
    batch: "Batch-02",
    day: "Monday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    students: 12,
    createdBy: "Admin",
    createdAt: "2026-08-25",
  },
  {
    id: 20,
    teacher: "Sumaiya Afrin Mim",
    subject: "Najera",
    class: "Elders Batch C",
    batch: "Batch-02",
    day: "Monday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    students: 12,
    createdBy: "Admin",
    createdAt: "2026-08-25",
  },
  {
    id: 21,
    teacher: "Jubayer Ahmad",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Tuesday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 22,
    teacher: "Sumaiya Afrin Mim",
    subject: "Basic Tajweed",
    class: "Elders Batch B",
    batch: "Batch-06",
    day: "Tuesday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 2",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    students: 15,
    createdBy: "Admin",
    createdAt: "2026-08-10",
  },
  {
    id: 23,
    teacher: "Sumaiya Afrin Mim",
    subject: "Najera",
    class: "Elders Batch C",
    batch: "Batch-02",
    day: "Wednesday",
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    semester: "Fall 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    students: 12,
    createdBy: "Admin",
    createdAt: "2026-08-25",
  },
];

const Clear_routing = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("batch-course");
  const [activeSubMenu, setActiveSubMenu] = useState("clear-routine");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Elders routines
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem("eldersRoutines");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_ROUTINES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTeacher, setFilterTeacher] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterDay, setFilterDay] = useState("All");

  const [selectedRoutines, setSelectedRoutines] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [clearType, setClearType] = useState("single");
  const [clearFilter, setClearFilter] = useState({
    teacher: "",
    class: "",
    status: "",
  });

  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
    class: "",
    batch: "",
    day: "",
    time: "",
    room: "",
    semester: "Fall 2026",
    startDate: "",
    endDate: "",
    students: 0,
    status: "Pending",
  });

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const statuses = ["Active", "Pending", "Completed", "Cancelled"];
  const semesters = ["Fall 2026", "Spring 2026", "Summer 2026", "Winter 2026"];

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

  // Save routines
  useEffect(() => {
    localStorage.setItem("eldersRoutines", JSON.stringify(routines));
  }, [routines]);

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

  // Sidebar menu
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <FaCheckCircle className="text-green-500" size={10} />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" size={10} />;
      case "Completed":
        return <FaCheckDouble className="text-blue-500" size={10} />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" size={10} />;
      default:
        return null;
    }
  };

  const filteredRoutines = routines.filter((routine) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (routine.teacher || "").toLowerCase().includes(s) ||
      (routine.subject || "").toLowerCase().includes(s) ||
      (routine.class || "").toLowerCase().includes(s) ||
      (routine.batch || "").toLowerCase().includes(s) ||
      (routine.room || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || routine.status === filterStatus;
    const matchesTeacher =
      filterTeacher === "All" || routine.teacher === filterTeacher;
    const matchesClass = filterClass === "All" || routine.class === filterClass;
    const matchesDay = filterDay === "All" || routine.day === filterDay;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesTeacher &&
      matchesClass &&
      matchesDay
    );
  });

  const uniqueStatuses = ["All", ...new Set(routines.map((r) => r.status))];
  const uniqueTeachers = ["All", ...new Set(routines.map((r) => r.teacher))];
  const uniqueClasses = ["All", ...new Set(routines.map((r) => r.class))];
  const uniqueDays = ["All", ...daysOfWeek];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRoutines([]);
    } else {
      setSelectedRoutines(filteredRoutines.map((r) => r.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectSingle = (id) => {
    if (selectedRoutines.includes(id)) {
      setSelectedRoutines(selectedRoutines.filter((rid) => rid !== id));
    } else {
      setSelectedRoutines([...selectedRoutines, id]);
    }
  };

  const openAddModal = () => {
    setFormData({
      teacher: ELDERS_TEACHERS[0].name,
      subject: ELDERS_COURSES[0],
      class: ELDERS_CLASSES[0],
      batch: ELDERS_BATCHES[0],
      day: daysOfWeek[0],
      time: "",
      room: "",
      semester: "Fall 2026",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      students: 0,
      status: "Pending",
    });
    setShowAddModal(true);
  };

  const clearSingleRoutine = (routine) => {
    setSelectedRoutine(routine);
    setClearType("single");
    setShowConfirmModal(true);
  };

  const clearSelectedRoutines = () => {
    if (selectedRoutines.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Routines Selected",
        text: "Please select at least one routine to clear.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setClearType("selected");
    setShowConfirmModal(true);
  };

  const clearAllRoutines = () => {
    setClearType("all");
    setShowClearModal(true);
  };

  const confirmClear = () => {
    if (clearType === "single" && selectedRoutine) {
      setRoutines(routines.filter((r) => r.id !== selectedRoutine.id));
      Swal.fire({
        icon: "success",
        title: "Routine Cleared!",
        text: `"${selectedRoutine.subject}" routine cleared.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (clearType === "selected") {
      const count = selectedRoutines.length;
      setRoutines(routines.filter((r) => !selectedRoutines.includes(r.id)));
      setSelectedRoutines([]);
      setSelectAll(false);
      Swal.fire({
        icon: "success",
        title: "Routines Cleared!",
        text: `${count} routine(s) cleared.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
    setShowConfirmModal(false);
    setSelectedRoutine(null);
  };

  const confirmClearAll = () => {
    let filtered = [...routines];
    if (clearFilter.teacher)
      filtered = filtered.filter((r) => r.teacher === clearFilter.teacher);
    if (clearFilter.class)
      filtered = filtered.filter((r) => r.class === clearFilter.class);
    if (clearFilter.status)
      filtered = filtered.filter((r) => r.status === clearFilter.status);

    const count = filtered.length;
    if (count === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Routines Found",
        text: "No routines match selected filters.",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowClearModal(false);
      return;
    }

    Swal.fire({
      title: "Clear All Routines?",
      text: `Clear ${count} routine(s). Cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredIds = filtered.map((r) => r.id);
        setRoutines(routines.filter((r) => !filteredIds.includes(r.id)));
        setSelectedRoutines([]);
        setSelectAll(false);
        setShowClearModal(false);
        setClearFilter({ teacher: "", class: "", status: "" });
        Swal.fire({
          icon: "success",
          title: "All Routines Cleared!",
          text: `${count} routine(s) cleared.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const openEditModal = (routine) => {
    setSelectedRoutine(routine);
    setFormData({
      teacher: routine.teacher,
      subject: routine.subject,
      class: routine.class,
      batch: routine.batch,
      day: routine.day,
      time: routine.time,
      room: routine.room,
      semester: routine.semester,
      startDate: routine.startDate,
      endDate: routine.endDate,
      students: routine.students,
      status: routine.status,
    });
    setShowEditModal(true);
  };

  const handleAddRoutine = (e) => {
    e.preventDefault();

    if (
      !formData.teacher ||
      !formData.subject ||
      !formData.class ||
      !formData.day ||
      !formData.time
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newRoutine = {
      id: Date.now(),
      ...formData,
      batch: formData.batch || "Not Assigned",
      room: formData.room || "TBD",
      students: parseInt(formData.students) || 0,
      createdBy: adminInfo.name,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRoutines([...routines, newRoutine]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Routine Added!",
      text: `${formData.teacher} - ${formData.subject}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditRoutine = (e) => {
    e.preventDefault();

    if (
      !formData.teacher ||
      !formData.subject ||
      !formData.class ||
      !formData.day ||
      !formData.time
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setRoutines(
      routines.map((r) =>
        r.id === selectedRoutine.id
          ? {
              ...r,
              ...formData,
              students: parseInt(formData.students) || 0,
            }
          : r,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Routine Updated!",
      timer: 1500,
      showConfirmButton: false,
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

  const totalRoutines = routines.length;
  const activeRoutines = routines.filter((r) => r.status === "Active").length;
  const pendingRoutines = routines.filter((r) => r.status === "Pending").length;
  const completedRoutines = routines.filter(
    (r) => r.status === "Completed",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Clear Routine (Elders)
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
                <FaEraser className="text-red-600" /> Clear Routine —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Jubayer Ahmad • Sumaiya Afrin Mim — elders department routines
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Routine
              </button>
              <button
                onClick={clearSelectedRoutines}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaTrashAlt size={12} /> Clear Selected (
                {selectedRoutines.length})
              </button>
              <button
                onClick={clearAllRoutines}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaTimesCircle size={12} /> Clear All
              </button>
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
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
              <p className="text-lg font-bold text-blue-600">{totalRoutines}</p>
              <p className="text-[10px] text-gray-500">Total Routines</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {activeRoutines}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingRoutines}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {completedRoutines}
              </p>
              <p className="text-[10px] text-gray-500">Completed</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders routines..."
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
                  value={filterTeacher}
                  onChange={(e) => setFilterTeacher(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueTeachers.map((t) => (
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
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueDays.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Routines Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-360px)] overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-2 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      #
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      Teacher
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Subject
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      Class
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Batch
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      Day
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Time
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRoutines.length > 0 ? (
                    filteredRoutines.map((routine, index) => (
                      <tr
                        key={routine.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedRoutines.includes(routine.id)
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <td className="px-2 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRoutines.includes(routine.id)}
                            onChange={() => handleSelectSingle(routine.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-2 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-2 py-2">
                          <div className="font-medium text-gray-800">
                            {routine.teacher}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {routine.room}
                          </div>
                        </td>
                        <td className="px-2 py-2 hidden md:table-cell text-gray-600">
                          {routine.subject}
                        </td>
                        <td className="px-2 py-2">
                          <div className="text-gray-700">{routine.class}</div>
                          <div className="text-[10px] text-gray-400">
                            {routine.students} students
                          </div>
                        </td>
                        <td className="px-2 py-2 hidden lg:table-cell text-gray-600">
                          {routine.batch}
                        </td>
                        <td className="px-2 py-2 text-gray-600">
                          {routine.day}
                        </td>
                        <td className="px-2 py-2 hidden sm:table-cell text-gray-600">
                          {routine.time}
                        </td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(routine.status)}`}
                          >
                            {getStatusIcon(routine.status)}
                            {routine.status}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(routine)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => clearSingleRoutine(routine)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              title="Clear"
                            >
                              <FaEraser size={12} />
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
                        <FaCalendarTimes className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No elders routines found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Routine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add Elders Routine
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRoutine} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Department: <strong>Quran For Elders</strong> — elders
                teachers ও courses
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Elders Teacher</option>
                    {ELDERS_TEACHERS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} — {t.designation}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course / Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Course</option>
                    {ELDERS_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_BATCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day *
                  </label>
                  <select
                    required
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., 06:00 AM - 07:00 AM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Online Room 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {semesters.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Students
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        students: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Routine
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

      {/* Confirm Clear Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationCircle className="text-red-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Confirm Clear
                </h3>
                <p className="text-sm text-gray-500">
                  {clearType === "single" && selectedRoutine
                    ? `Clear "${selectedRoutine.subject}"?`
                    : `Clear ${selectedRoutines.length} routine(s)?`}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              <span className="text-red-500 font-medium">
                This action cannot be undone!
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmClear}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
              >
                <FaTrashAlt className="inline mr-2" /> Yes, Clear
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedRoutine(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <FaTimesCircle className="text-red-600" /> Clear Elders Routines
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Filter করুন কোন routine গুলো clear করবেন:
            </p>
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  value={clearFilter.teacher}
                  onChange={(e) =>
                    setClearFilter({ ...clearFilter, teacher: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All Elders Teachers</option>
                  {ELDERS_TEACHERS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select
                  value={clearFilter.class}
                  onChange={(e) =>
                    setClearFilter({ ...clearFilter, class: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All Classes</option>
                  {ELDERS_CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={clearFilter.status}
                  onChange={(e) =>
                    setClearFilter({ ...clearFilter, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={confirmClearAll}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
              >
                <FaTrashAlt className="inline mr-2" /> Clear All
              </button>
              <button
                onClick={() => {
                  setShowClearModal(false);
                  setClearFilter({ teacher: "", class: "", status: "" });
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Routine Modal */}
      {showEditModal && selectedRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Elders Routine
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditRoutine} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_TEACHERS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} — {t.designation}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_BATCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day *
                  </label>
                  <select
                    required
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {semesters.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Students
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        students: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Update Routine
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
    </div>
  );
};

export default Clear_routing;
