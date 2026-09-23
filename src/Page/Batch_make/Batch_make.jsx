// src/Page/Admin/Batch_make.jsx
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
  FaInfoCircle,
  FaUserTimes,
  FaHourglassHalf,
  FaCheckDouble,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ============================================================
// ✅ ELDERS DEPARTMENT — শুধু এই batches
// ============================================================
const ELDERS_DEFAULT_BATCHES = [
  {
    id: 1,
    batchName: "Qaida Nuraniyah Batch-03",
    batchCode: "QN-B03",
    course: "Qaida Nuraniyah",
    class: "Elders Batch A",
    teacher: "Jubayer Ahmad",
    teacherId: "TCH001",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    days: ["Saturday", "Monday", "Wednesday"],
    time: "10:00 AM - 11:30 AM",
    room: "Online Room 1",
    status: "Active",
    studentsCount: 18,
    maxStudents: 25,
    fee: 2500,
    description:
      "Qaida Nuraniyah for elders — learning Arabic alphabet, pronunciation, and basic Quranic reading.",
    createdAt: "2026-07-25",
  },
  {
    id: 2,
    batchName: "Basic Tajweed Batch-06",
    batchCode: "BT-B06",
    course: "Basic Tajweed",
    class: "Elders Batch B",
    teacher: "Sumaiya Afrin Mim",
    teacherId: "TCH002",
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    days: ["Sunday", "Tuesday", "Thursday"],
    time: "03:00 PM - 04:30 PM",
    room: "Online Room 2",
    status: "Active",
    studentsCount: 15,
    maxStudents: 20,
    fee: 2500,
    description:
      "Basic Tajweed Level-1 — correct pronunciation, makharij, and rules of recitation.",
    createdAt: "2026-08-10",
  },
  {
    id: 3,
    batchName: "Najera Batch-02",
    batchCode: "NJ-B02",
    course: "Najera",
    class: "Elders Batch C",
    teacher: "Jubayer Ahmad",
    teacherId: "TCH001",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    days: ["Saturday", "Monday"],
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 3",
    status: "Active",
    studentsCount: 12,
    maxStudents: 20,
    fee: 2000,
    description:
      "Quran Najera for elders — reading complete Quran with proper fluency.",
    createdAt: "2026-08-25",
  },
  {
    id: 4,
    batchName: "Qaida Nuraniyah Batch-04",
    batchCode: "QN-B04",
    course: "Qaida Nuraniyah",
    class: "Elders Batch D",
    teacher: "Sumaiya Afrin Mim",
    teacherId: "TCH002",
    startDate: "2026-10-01",
    endDate: "2027-02-28",
    days: ["Sunday", "Tuesday"],
    time: "06:00 AM - 07:00 AM",
    room: "Online Room 4",
    status: "Pending",
    studentsCount: 8,
    maxStudents: 25,
    fee: 2500,
    description:
      "New Qaida Nuraniyah batch for elders — beginner level starting October 2026.",
    createdAt: "2026-09-20",
  },
  {
    id: 5,
    batchName: "Bakarah Hifz Batch-01",
    batchCode: "BH-B01",
    course: "Bakarah Hifz",
    class: "Elders Batch E",
    teacher: "Jubayer Ahmad",
    teacherId: "TCH001",
    startDate: "2026-09-15",
    endDate: "2027-03-15",
    days: ["Monday", "Wednesday"],
    time: "08:00 PM - 09:00 PM",
    room: "Online Room 5",
    status: "Active",
    studentsCount: 10,
    maxStudents: 15,
    fee: 3000,
    description:
      "Surah Bakarah memorization program for elders with Tajweed guidance.",
    createdAt: "2026-09-10",
  },
];

const Batch_make = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("batch-course");
  const [activeSubMenu, setActiveSubMenu] = useState("batch-make");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Elders batches
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem("eldersBatches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_DEFAULT_BATCHES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [formData, setFormData] = useState({
    batchName: "",
    batchCode: "",
    course: "",
    class: "",
    teacher: "",
    teacherId: "",
    startDate: "",
    endDate: "",
    days: [],
    time: "",
    room: "",
    status: "Pending",
    maxStudents: 25,
    fee: 0,
    description: "",
  });

  // ✅ Elders courses only
  const courses = [
    "Qaida Nuraniyah",
    "Quran Nazera",
    "Najera",
    "Basic Tajweed",
    "Bakarah Hifz",
  ];

  const classes = [
    "Elders Batch A",
    "Elders Batch B",
    "Elders Batch C",
    "Elders Batch D",
    "Elders Batch E",
  ];

  // ✅ ২ জন elders teacher
  const teachers = [
    { name: "Jubayer Ahmad", id: "TCH001", designation: "Senior Teacher" },
    { name: "Sumaiya Afrin Mim", id: "TCH002", designation: "Junior Teacher" },
  ];

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  const statuses = ["Active", "Pending", "Completed", "Cancelled"];

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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("eldersBatches", JSON.stringify(batches));
  }, [batches]);

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
    },
    {
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Exam",
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
        return <FaCheckCircle className="text-green-500" size={8} />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" size={8} />;
      case "Completed":
        return <FaCheckDouble className="text-blue-500" size={8} />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" size={8} />;
      default:
        return null;
    }
  };

  const filteredBatches = batches.filter((batch) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (batch.batchName || "").toLowerCase().includes(s) ||
      (batch.batchCode || "").toLowerCase().includes(s) ||
      (batch.course || "").toLowerCase().includes(s) ||
      (batch.teacher || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || batch.status === filterStatus;
    const matchesCourse =
      filterCourse === "All" || batch.course === filterCourse;
    const matchesClass = filterClass === "All" || batch.class === filterClass;
    return matchesSearch && matchesStatus && matchesCourse && matchesClass;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(batches.map((b) => b.status).filter(Boolean)),
  ];
  const uniqueCourses = [
    "All",
    ...new Set(batches.map((b) => b.course).filter(Boolean)),
  ];
  const uniqueClasses = [
    "All",
    ...new Set(batches.map((b) => b.class).filter(Boolean)),
  ];

  const generateBatchCode = (batchName) => {
    const year = new Date().getFullYear();
    const prefix = batchName.substring(0, 2).toUpperCase() || "B";
    return `${prefix}${year}`;
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const handleTeacherSelect = (e) => {
    const teacherName = e.target.value;
    const t = teachers.find((tt) => tt.name === teacherName);
    setFormData({
      ...formData,
      teacher: teacherName,
      teacherId: t ? t.id : "",
    });
  };

  const openAddModal = () => {
    setFormData({
      batchName: "",
      batchCode: "",
      course: "",
      class: "",
      teacher: "",
      teacherId: "",
      startDate: "",
      endDate: "",
      days: [],
      time: "",
      room: "",
      status: "Pending",
      maxStudents: 25,
      fee: 0,
      description: "",
    });
    setShowAddModal(true);
  };

  const openEditModal = (batch) => {
    setSelectedBatch(batch);
    setFormData({
      batchName: batch.batchName,
      batchCode: batch.batchCode,
      course: batch.course,
      class: batch.class,
      teacher: batch.teacher,
      teacherId: batch.teacherId || "",
      startDate: batch.startDate,
      endDate: batch.endDate,
      days: batch.days,
      time: batch.time,
      room: batch.room,
      status: batch.status,
      maxStudents: batch.maxStudents,
      fee: batch.fee,
      description: batch.description || "",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (batch) => {
    setSelectedBatch(batch);
    setShowDetailsModal(true);
  };

  const handleAddBatch = (e) => {
    e.preventDefault();

    if (
      !formData.batchName ||
      !formData.course ||
      !formData.class ||
      !formData.teacher ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.days.length ||
      !formData.time ||
      !formData.room
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newBatch = {
      id: Date.now(),
      batchName: formData.batchName,
      batchCode: formData.batchCode || generateBatchCode(formData.batchName),
      course: formData.course,
      class: formData.class,
      teacher: formData.teacher,
      teacherId: formData.teacherId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: formData.days,
      time: formData.time,
      room: formData.room,
      status: formData.status,
      studentsCount: 0,
      maxStudents: formData.maxStudents || 25,
      fee: formData.fee || 0,
      description: formData.description || "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setBatches([...batches, newBatch]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Elders Batch Created!",
      text: formData.batchName,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEditBatch = (e) => {
    e.preventDefault();

    if (
      !formData.batchName ||
      !formData.course ||
      !formData.class ||
      !formData.teacher ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.days.length ||
      !formData.time ||
      !formData.room
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setBatches(
      batches.map((b) =>
        b.id === selectedBatch.id
          ? {
              ...b,
              batchName: formData.batchName,
              batchCode: formData.batchCode,
              course: formData.course,
              class: formData.class,
              teacher: formData.teacher,
              teacherId: formData.teacherId,
              startDate: formData.startDate,
              endDate: formData.endDate,
              days: formData.days,
              time: formData.time,
              room: formData.room,
              status: formData.status,
              maxStudents: formData.maxStudents || 25,
              fee: formData.fee || 0,
              description: formData.description || "",
            }
          : b,
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

  const handleDeleteBatch = (id) => {
    Swal.fire({
      title: "Delete Batch?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBatches(batches.filter((b) => b.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
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

  const getDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    if (months > 0) {
      return `${months}m${days > 0 ? ` ${days}d` : ""}`;
    }
    return `${diffDays}d`;
  };

  const totalBatches = batches.length;
  const activeBatches = batches.filter((b) => b.status === "Active").length;
  const pendingBatches = batches.filter((b) => b.status === "Pending").length;
  const totalStudents = batches.reduce(
    (sum, b) => sum + (b.studentsCount || 0),
    0,
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Batch Management (Elders)
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
                <FaLayerGroup className="text-blue-600" /> Batch Management —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Qaida Nuraniyah • Quran Nazera • Najera • Basic Tajweed •
                Bakarah Hifz
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Create Batch
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
              <p className="text-lg font-bold text-blue-600">{totalBatches}</p>
              <p className="text-[10px] text-gray-500">Total Batches</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {activeBatches}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingBatches}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {totalStudents}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders batches..."
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

          {/* Batches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredBatches.length > 0 ? (
              filteredBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      batch.status === "Active"
                        ? "bg-green-500"
                        : batch.status === "Pending"
                          ? "bg-yellow-500"
                          : batch.status === "Completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    }`}
                  ></div>
                  <div className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-xs truncate">
                          {batch.batchName}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {batch.batchCode}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className={`inline-flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(batch.status)}`}
                          >
                            {getStatusIcon(batch.status)}
                            {batch.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-700">
                          {batch.studentsCount}/{batch.maxStudents}
                        </p>
                        <p className="text-[8px] text-gray-400">Students</p>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <p className="text-gray-400">Course</p>
                        <p className="font-medium text-gray-700 truncate">
                          {batch.course}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Class</p>
                        <p className="font-medium text-gray-700">
                          {batch.class}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Teacher</p>
                        <p className="font-medium text-gray-700 truncate">
                          {batch.teacher}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Fee</p>
                        <p className="font-medium text-gray-700">
                          ৳{batch.fee}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500">
                      <span>
                        📅 {formatDate(batch.startDate)} -{" "}
                        {formatDate(batch.endDate)}
                      </span>
                      <span className="text-gray-400">
                        {getDuration(batch.startDate, batch.endDate)}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-0.5">
                      {batch.days.slice(0, 3).map((day) => (
                        <span
                          key={day}
                          className="text-[8px] bg-teal-50 px-1.5 py-0.5 rounded text-teal-700"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                      {batch.days.length > 3 && (
                        <span className="text-[8px] text-gray-400">
                          +{batch.days.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                      <button
                        onClick={() => openDetailsModal(batch)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50"
                      >
                        <FaEye className="inline mr-1" size={10} /> View
                      </button>
                      <button
                        onClick={() => openEditModal(batch)}
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteBatch(batch.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                <FaLayerGroup className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Elders Batches Found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting filters or create a new batch
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-blue-600" /> Create Elders Batch
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBatch} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Department: <strong>Quran For Elders</strong> — শুধু elders
                courses assign করা যাবে
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.batchName}
                    onChange={(e) =>
                      setFormData({ ...formData, batchName: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Qaida Nuraniyah Batch-04"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Code
                  </label>
                  <input
                    type="text"
                    value={formData.batchCode}
                    onChange={(e) =>
                      setFormData({ ...formData, batchCode: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., QN-B04"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option value="">Select Elders Course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class / Batch Group *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Class</option>
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher * (Elders only)
                </label>
                <select
                  required
                  value={formData.teacher}
                  onChange={handleTeacherSelect}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Elders Teacher</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} — {t.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days *
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        formData.days.includes(day)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
                {formData.days.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {formData.days.join(", ")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., 10:00 AM - 11:30 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Online Room 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Students
                  </label>
                  <input
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxStudents: parseInt(e.target.value) || 25,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fee (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.fee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fee: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    min="0"
                  />
                </div>
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
                  placeholder="Batch description..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Create Batch
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

      {/* Edit Batch Modal */}
      {showEditModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Elders Batch
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditBatch} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.batchName}
                    onChange={(e) =>
                      setFormData({ ...formData, batchName: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Code
                  </label>
                  <input
                    type="text"
                    value={formData.batchCode}
                    onChange={(e) =>
                      setFormData({ ...formData, batchCode: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher *
                </label>
                <select
                  required
                  value={formData.teacher}
                  onChange={handleTeacherSelect}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} — {t.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days *
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        formData.days.includes(day)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Students
                  </label>
                  <input
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxStudents: parseInt(e.target.value) || 25,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fee (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.fee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fee: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Update Batch
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
      {showDetailsModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Elders Batch Details
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
                    {selectedBatch.batchName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedBatch.batchCode}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBatch.status)}`}
                >
                  {getStatusIcon(selectedBatch.status)}
                  {selectedBatch.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-500">Course</p>
                  <p className="text-sm font-semibold text-teal-800">
                    {selectedBatch.course}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Class</p>
                  <p className="text-sm font-semibold">{selectedBatch.class}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Teacher</p>
                  <p className="text-sm font-semibold">
                    {selectedBatch.teacher}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Room</p>
                  <p className="text-sm font-semibold">{selectedBatch.room}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Time</p>
                  <p className="text-sm font-semibold">{selectedBatch.time}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Days</p>
                  <p className="text-sm font-semibold">
                    {selectedBatch.days.join(", ")}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Duration</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedBatch.startDate)} -{" "}
                    {formatDate(selectedBatch.endDate)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Fee</p>
                  <p className="text-sm font-semibold">৳{selectedBatch.fee}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Students</p>
                  <p className="text-sm font-semibold">
                    {selectedBatch.studentsCount} / {selectedBatch.maxStudents}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Created</p>
                  <p className="text-sm font-semibold">
                    {formatDate(selectedBatch.createdAt)}
                  </p>
                </div>
              </div>

              {selectedBatch.description && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Description</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedBatch.description}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedBatch);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteBatch(selectedBatch.id);
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

export default Batch_make;
