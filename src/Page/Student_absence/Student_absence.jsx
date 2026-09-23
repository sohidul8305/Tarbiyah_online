// src/Page/Admin/Student_absence.jsx
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
  FaChartLine,
  FaCalendarCheck,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarDay,
  FaArrowRight,
  FaLayerGroup,
  FaSave,
  FaInfoCircle,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ ২ জন ELDERS STUDENT — hardcoded fallback (সবসময় দেখাবে)
// ============================================================
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
// ✅ ELDERS — Elders course check
// ============================================================
const ELDERS_COURSES = [
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
  "basic tajweed (level-1)",
  "basic tajweed (level 1)",
  "basic tajweed level-1",
  "basic tajweed level 1",
  "basic tajweed",
];

const isSingleEldersCourse = (singleCourse) => {
  const p = String(singleCourse).toLowerCase().trim();
  if (!p) return false;
  return ELDERS_COURSES.some((c) => {
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

// ✅ Map course string to primary course name
const getPrimaryCourse = (courseStr) => {
  if (!courseStr) return "";
  const first = String(courseStr).split(",")[0].trim();
  if (first.toLowerCase().includes("qaida")) return "Qaida Nuraniyah";
  if (
    first.toLowerCase().includes("nazera") ||
    first.toLowerCase().includes("najera")
  )
    return "Najera";
  if (first.toLowerCase().includes("nazera")) return "Quran Nazera";
  if (first.toLowerCase().includes("tajweed")) return "Basic Tajweed";
  if (
    first.toLowerCase().includes("bakarah") ||
    first.toLowerCase().includes("bakara")
  )
    return "Bakarah Hifz";
  return first;
};

const ELDERS_TEACHERS = ["Jubayer Ahmad", "Sumaiya Afrin Mim"];

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

const Student_absence = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("absence-student");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Start with fallback 2 students
  const [eldersStudents, setEldersStudents] = useState(
    ELDERS_STUDENTS_FALLBACK,
  );
  const [studentsLoading, setStudentsLoading] = useState(true);

  const [absenceRecords, setAbsenceRecords] = useState(() => {
    const saved = localStorage.getItem("eldersAbsenceRecords");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    batch: "",
    subject: "",
    date: "",
    status: "Absent",
    reason: "",
    notified: false,
    notifiedBy: "",
    teacher: "",
    notes: "",
  });

  const statuses = ["Absent", "Late", "Leave"];
  const notifiedByOptions = ["Parent", "Student", "Teacher", "Other"];

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
  // ✅ Fetch elders students — hardcoded 2 + API merge
  // ============================================================
  const fetchEldersStudents = async () => {
    try {
      setStudentsLoading(true);

      // Start with hardcoded fallback (2 students)
      let eldersList = [...ELDERS_STUDENTS_FALLBACK];

      try {
        const res = await fetch(`${API_BASE}/api/students/all`);
        const text = await res.text();

        // HTML response হলে skip
        if (!text.trim().startsWith("<")) {
          const data = JSON.parse(text);

          if (data.success && Array.isArray(data.students)) {
            const all = data.students || [];
            const elders = all.filter((s) => isEldersCourse(s.course));

            console.log("📥 Total students from API:", all.length);
            console.log("✅ Elders students from API:", elders.length);

            elders.forEach((s) => {
              console.log("   →", s.name, "|", s.course);
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

              // Merge without duplicates
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
        console.warn("API fetch skipped, using fallback:", apiErr.message);
      }

      console.log("✅ Final elders students:", eldersList.length);
      eldersList.forEach((s) => console.log("   →", s.name));

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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "eldersAbsenceRecords",
      JSON.stringify(absenceRecords),
    );
  }, [absenceRecords]);

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
      case "Absent":
        return "bg-red-100 text-red-700";
      case "Late":
        return "bg-yellow-100 text-yellow-700";
      case "Leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Absent":
        return <FaTimesCircle className="text-red-500" size={10} />;
      case "Late":
        return <FaClock className="text-yellow-500" size={10} />;
      case "Leave":
        return <FaCalendarDay className="text-blue-500" size={10} />;
      default:
        return null;
    }
  };

  const getNotifiedBadge = (notified) => {
    return notified ? (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
        <FaCheckCircle className="text-green-500" size={10} /> Yes
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
        <FaTimesCircle className="text-red-500" size={10} /> No
      </span>
    );
  };

  const filteredRecords = absenceRecords.filter((record) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (record.studentName || "").toLowerCase().includes(s) ||
      (record.studentId || "").toLowerCase().includes(s) ||
      (record.subject || "").toLowerCase().includes(s) ||
      (record.teacher || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;
    const matchesClass = filterClass === "All" || record.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || record.subject === filterSubject;
    const matchesDate = !filterDate || record.date === filterDate;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesSubject &&
      matchesDate
    );
  });

  const uniqueStatuses = [
    "All",
    ...new Set(absenceRecords.map((r) => r.status)),
  ];
  const uniqueClasses = ["All", ...new Set(absenceRecords.map((r) => r.class))];
  const uniqueSubjects = [
    "All",
    ...new Set(absenceRecords.map((r) => r.subject)),
  ];

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
  // ✅ Open Add Modal — pre-fill from first elders student
  // ============================================================
  const openAddModal = () => {
    const first = eldersStudents[0];
    setFormData({
      studentName: first?.name || "",
      studentId: first?.studentId || "",
      class: first?.class || ELDERS_CLASSES[0],
      batch: first?.batch || "Batch-03",
      subject: first?.primaryCourse || "Qaida Nuraniyah",
      date: new Date().toISOString().split("T")[0],
      status: "Absent",
      reason: "",
      notified: false,
      notifiedBy: "",
      teacher: ELDERS_TEACHERS[0],
      notes: "",
    });
    setShowAddModal(true);
  };

  // ✅ Auto-fill when student selected
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
    }));
  };

  const openEditModal = (record) => {
    setSelectedAbsence(record);
    setFormData({
      studentName: record.studentName,
      studentId: record.studentId,
      class: record.class,
      batch: record.batch || "",
      subject: record.subject,
      date: record.date,
      status: record.status,
      reason: record.reason || "",
      notified: record.notified || false,
      notifiedBy: record.notifiedBy || "",
      teacher: record.teacher || "",
      notes: record.notes || "",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (record) => {
    setSelectedAbsence(record);
    setShowDetailsModal(true);
  };

  const handleAddAbsence = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.class ||
      !formData.subject ||
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

    const newRecord = {
      id: Date.now(),
      ...formData,
      notifiedBy: formData.notified ? formData.notifiedBy : null,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setAbsenceRecords([...absenceRecords, newRecord]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Elders Absence Record Added!",
      text: formData.studentName,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditAbsence = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.class ||
      !formData.subject ||
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

    setAbsenceRecords(
      absenceRecords.map((record) =>
        record.id === selectedAbsence.id
          ? {
              ...record,
              ...formData,
              notifiedBy: formData.notified ? formData.notifiedBy : null,
            }
          : record,
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

  const handleDeleteAbsence = (id) => {
    Swal.fire({
      title: "Delete Absence Record?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAbsenceRecords(absenceRecords.filter((r) => r.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const totalRecords = absenceRecords.length;
  const totalAbsent = absenceRecords.filter(
    (r) => r.status === "Absent",
  ).length;
  const totalLate = absenceRecords.filter((r) => r.status === "Late").length;
  const totalLeave = absenceRecords.filter((r) => r.status === "Leave").length;
  const notifiedCount = absenceRecords.filter((r) => r.notified).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Student Absence (Elders)
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
                <FaUserTimes className="text-red-600" /> Student Absence —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                {studentsLoading
                  ? "Loading elders students..."
                  : `${eldersStudents.length} elders student${eldersStudents.length !== 1 ? "s" : ""} • Jubayer Ahmad • Sumaiya Afrin Mim`}
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
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Absence
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ✅ Elders Students Card — 2 জন সবসময় দেখাবে */}
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
                        {s.studentId}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalRecords}</p>
              <p className="text-[10px] text-gray-500">Total Records</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">{totalAbsent}</p>
              <p className="text-[10px] text-gray-500">Absent</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">{totalLate}</p>
              <p className="text-[10px] text-gray-500">Late</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalLeave}</p>
              <p className="text-[10px] text-gray-500">Leave</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {notifiedCount}
              </p>
              <p className="text-[10px] text-gray-500">Notified</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
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
                      Student
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Class
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Course
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                      Batch
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Notified
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800">
                            {record.studentName}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {record.studentId}
                          </div>
                        </td>
                        <td className="px-3 py-2 hidden md:table-cell text-gray-600">
                          {record.class}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {record.subject}
                        </td>
                        <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                          {record.batch || "-"}
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell text-gray-600">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(record.status)}`}
                          >
                            {getStatusIcon(record.status)}
                            {record.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 hidden sm:table-cell">
                          {getNotifiedBadge(record.notified)}
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
                              onClick={() => handleDeleteAbsence(record.id)}
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
                        colSpan="9"
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        <FaUserTimes className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No elders absence records yet</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          উপরে "Add Absence" ক্লিক করে একটি record যোগ করুন
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
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-red-600" /> Add Elders Absence
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAbsence} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Dropdown থেকে student select করলে বাকি information auto-fill
                হবে
              </div>

              {/* ✅ Student dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Elders Student *
                </label>
                {eldersStudents.length === 0 ? (
                  <p className="text-xs text-red-500">
                    কোনো elders student পাওয়া যায়নি
                  </p>
                ) : (
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
                )}
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
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                    readOnly
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
                  <input
                    type="text"
                    value={formData.subject}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
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
                    Class *
                  </label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({ ...formData, status })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.status === status
                          ? `${getStatusColor(status)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Reason for absence"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notified
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, notified: true })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        formData.notified
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, notified: false })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        !formData.notified
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                {formData.notified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notified By
                    </label>
                    <select
                      value={formData.notifiedBy}
                      onChange={(e) =>
                        setFormData({ ...formData, notifiedBy: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="">Select</option>
                      {notifiedByOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add
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
      {showEditModal && selectedAbsence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-600" /> Edit Elders Absence
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditAbsence} className="p-6 space-y-4">
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
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({ ...formData, status })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.status === status
                          ? `${getStatusColor(status)} border-2 border-blue-500`
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notified
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, notified: true })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        formData.notified
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, notified: false })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        !formData.notified
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                {formData.notified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notified By
                    </label>
                    <select
                      value={formData.notifiedBy}
                      onChange={(e) =>
                        setFormData({ ...formData, notifiedBy: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      {notifiedByOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
      {showDetailsModal && selectedAbsence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Absence Details
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
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {selectedAbsence.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedAbsence.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAbsence.status)}`}
                    >
                      {getStatusIcon(selectedAbsence.status)}
                      {selectedAbsence.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedAbsence.studentId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedAbsence.class}</span>
                    <span>📖 {selectedAbsence.subject}</span>
                    <span>📅 {formatDate(selectedAbsence.date)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Status</p>
                  <p className="text-sm font-semibold">
                    {selectedAbsence.status}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Reason</p>
                  <p className="text-sm font-semibold">
                    {selectedAbsence.reason || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notified</p>
                  <p className="text-sm font-semibold">
                    {getNotifiedBadge(selectedAbsence.notified)}
                  </p>
                </div>
                {selectedAbsence.notifiedBy && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Notified By</p>
                    <p className="text-sm font-semibold">
                      {selectedAbsence.notifiedBy}
                    </p>
                  </div>
                )}
                {selectedAbsence.teacher && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Teacher</p>
                    <p className="text-sm font-semibold">
                      {selectedAbsence.teacher}
                    </p>
                  </div>
                )}
                {selectedAbsence.batch && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400">Batch</p>
                    <p className="text-sm font-semibold">
                      {selectedAbsence.batch}
                    </p>
                  </div>
                )}
              </div>

              {selectedAbsence.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Notes</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedAbsence.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedAbsence);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteAbsence(selectedAbsence.id);
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

export default Student_absence;
