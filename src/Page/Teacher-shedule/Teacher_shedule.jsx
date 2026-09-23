// src/Page/Admin/Teacher_shedule.jsx
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
  FaUserGraduate,
  FaUserPlus,
  FaCalendarCheck,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaSave,
  FaLayerGroup,
  FaUserTimes,
  FaRegClock,
  FaInfoCircle,
  FaCalendarPlus,
  FaUserTie,
  FaClock,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ============================================================
// ✅ ELDERS DEPARTMENT SCHEDULE
// শুধু Jubayer Ahmad + Sumaiya Afrin Mim, শুধু elders courses
// ============================================================
const ELDERS_TEACHERS = [
  {
    id: 1,
    teacherId: "TCH001",
    name: "Jubayer Ahmad",
    shortName: "Jubayer Ustad",
    subject: "Quran For Elders",
    designation: "Senior Teacher",
    color: "blue",
  },
  {
    id: 2,
    teacherId: "TCH002",
    name: "Sumaiya Afrin Mim",
    shortName: "Sumaiya Afrin",
    subject: "Quran For Elders",
    designation: "Junior Teacher",
    color: "pink",
  },
];

const ELDERS_SUBJECTS = [
  "QAIDA NURANIYAH Batch-03",
  "Basic Tajweed Batch-06",
  "Najera Batch-02",
];

const ELDERS_DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

// Image অনুযায়ী time slots
const ELDERS_TIME_SLOTS = [
  { id: "morning", label: "6:00 – 7:00 AM", color: "bg-blue-50" },
  { id: "afternoon", label: "3:00 – 4:30 PM", color: "bg-yellow-50" },
  { id: "evening", label: "8:00 – 9:00 PM", color: "bg-green-50" },
];

// Image এর schedule অনুযায়ী default data
const DEFAULT_SCHEDULE = [
  // ===== Morning: 6:00 - 7:00 AM =====
  {
    id: "sat-morning-1",
    day: "Saturday",
    timeSlot: "morning",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "sat-morning-2",
    day: "Saturday",
    timeSlot: "morning",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "mon-morning-1",
    day: "Monday",
    timeSlot: "morning",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "mon-morning-2",
    day: "Monday",
    timeSlot: "morning",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },

  // ===== Afternoon: 3:00 - 4:30 PM =====
  {
    id: "sun-afternoon-1",
    day: "Sunday",
    timeSlot: "afternoon",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "sun-afternoon-2",
    day: "Sunday",
    timeSlot: "afternoon",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "tue-afternoon-1",
    day: "Tuesday",
    timeSlot: "afternoon",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "tue-afternoon-2",
    day: "Tuesday",
    timeSlot: "afternoon",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "sat-afternoon",
    day: "Saturday",
    timeSlot: "afternoon",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "mon-afternoon",
    day: "Monday",
    timeSlot: "afternoon",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },

  // ===== Evening: 8:00 - 9:00 PM =====
  {
    id: "sat-evening-1",
    day: "Saturday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "sat-evening-2",
    day: "Saturday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "sat-evening-3",
    day: "Saturday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Najera",
    batch: "Batch-02",
    status: "Active",
  },
  {
    id: "sat-evening-4",
    day: "Saturday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Najera",
    batch: "Batch-02",
    status: "Active",
  },
  {
    id: "sun-evening-1",
    day: "Sunday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "sun-evening-2",
    day: "Sunday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "mon-evening-1",
    day: "Monday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "mon-evening-2",
    day: "Monday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "QAIDA NURANIYAH",
    batch: "Batch-03",
    status: "Active",
  },
  {
    id: "mon-evening-3",
    day: "Monday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Najera",
    batch: "Batch-02",
    status: "Active",
  },
  {
    id: "mon-evening-4",
    day: "Monday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Najera",
    batch: "Batch-02",
    status: "Active",
  },
  {
    id: "tue-evening-1",
    day: "Tuesday",
    timeSlot: "evening",
    teacherId: 1,
    teacherName: "Jubayer Ustad",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "tue-evening-2",
    day: "Tuesday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Basic Tajweed",
    batch: "Batch-06",
    status: "Active",
  },
  {
    id: "wed-evening-1",
    day: "Wednesday",
    timeSlot: "evening",
    teacherId: 2,
    teacherName: "Sumaiya Afrin",
    subject: "Najera",
    batch: "Batch-02",
    status: "Active",
  },
];

const Teacher_shedule = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("class-schedule");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Elders schedule state
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("eldersTeacherSchedule");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }
    return DEFAULT_SCHEDULE;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  const [filterTeacher, setFilterTeacher] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [formData, setFormData] = useState({
    day: "Saturday",
    timeSlot: "morning",
    teacherId: "",
    teacherName: "",
    subject: "",
    batch: "",
    status: "Active",
  });

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
    localStorage.setItem("eldersTeacherSchedule", JSON.stringify(schedule));
  }, [schedule]);

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

  // Sidebar Menu
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

  // Color helpers
  const getTeacherColor = (teacherId) => {
    const t = ELDERS_TEACHERS.find((tt) => tt.id === teacherId);
    return t?.color || "blue";
  };

  const getTeacherBg = (teacherId) => {
    const c = getTeacherColor(teacherId);
    const map = {
      blue: "bg-blue-100 border-blue-500 text-blue-800",
      pink: "bg-pink-100 border-pink-500 text-pink-800",
      green: "bg-green-100 border-green-500 text-green-800",
    };
    return map[c] || map.blue;
  };

  // Filter
  const filteredSchedule = schedule.filter((item) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (item.teacherName || "").toLowerCase().includes(s) ||
      (item.subject || "").toLowerCase().includes(s) ||
      (item.batch || "").toLowerCase().includes(s);
    const matchesDay = filterDay === "All" || item.day === filterDay;
    const matchesTeacher =
      filterTeacher === "All" || item.teacherId === parseInt(filterTeacher);
    return matchesSearch && matchesDay && matchesTeacher;
  });

  // Get classes for a specific cell (day + timeSlot)
  const getClassesInCell = (day, timeSlotId) => {
    return filteredSchedule.filter(
      (item) => item.day === day && item.timeSlot === timeSlotId,
    );
  };

  // Stats
  const stats = {
    total: schedule.length,
    active: schedule.filter((s) => s.status === "Active").length,
    teachers: ELDERS_TEACHERS.length,
    batches: new Set(schedule.map((s) => s.batch).filter(Boolean)).size,
  };

  // Modal openers
  const openAddModal = () => {
    setFormData({
      day: "Saturday",
      timeSlot: "morning",
      teacherId: "",
      teacherName: "",
      subject: "",
      batch: "",
      status: "Active",
    });
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setSelectedSchedule(item);
    setFormData({
      day: item.day,
      timeSlot: item.timeSlot,
      teacherId: item.teacherId,
      teacherName: item.teacherName,
      subject: item.subject,
      batch: item.batch,
      status: item.status,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (item) => {
    setSelectedSchedule(item);
    setShowDetailsModal(true);
  };

  // Teacher select
  const handleTeacherSelect = (e) => {
    const id = parseInt(e.target.value);
    const t = ELDERS_TEACHERS.find((tt) => tt.id === id);
    if (t) {
      setFormData({
        ...formData,
        teacherId: t.id,
        teacherName: t.shortName,
      });
    } else {
      setFormData({
        ...formData,
        teacherId: "",
        teacherName: "",
      });
    }
  };

  // Add
  const handleAddSchedule = (e) => {
    e.preventDefault();

    if (!formData.teacherId || !formData.subject || !formData.batch) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newItem = {
      id: `local-${Date.now()}-${Math.random()}`,
      ...formData,
    };

    setSchedule([...schedule, newItem]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Class Scheduled!",
      text: `${formData.teacherName} → ${formData.subject} ${formData.batch}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Edit
  const handleEditSchedule = (e) => {
    e.preventDefault();
    setSchedule(
      schedule.map((item) =>
        item.id === selectedSchedule.id ? { ...item, ...formData } : item,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Updated!",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // Delete
  const handleDeleteSchedule = (id) => {
    Swal.fire({
      title: "Delete Schedule?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSchedule(schedule.filter((item) => item.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  const uniqueDays = ["All", ...ELDERS_DAYS];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Class Schedule (Elders)
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
                <FaCalendarAlt className="text-blue-600" /> Class Schedule —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Jubayer Ahmad • Sumaiya Afrin Mim — Edition August 2026
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handlePrint}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
              >
                <FaPrint size={12} /> Print
              </button>
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Add Class
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
              <p className="text-lg font-bold text-blue-600">{stats.total}</p>
              <p className="text-[10px] text-gray-500">Total Classes</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">{stats.active}</p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {stats.teachers}
              </p>
              <p className="text-[10px] text-gray-500">Elders Teachers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {stats.batches}
              </p>
              <p className="text-[10px] text-gray-500">Batches</p>
            </div>
          </div>

          {/* Teachers Legend */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3">
            <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
              <FaUserTie size={12} className="text-teal-600" /> Elders Teachers
            </p>
            <div className="flex flex-wrap gap-3">
              {ELDERS_TEACHERS.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5"
                >
                  <div
                    className={`w-6 h-6 rounded-full ${
                      t.color === "blue"
                        ? "bg-blue-500"
                        : t.color === "pink"
                          ? "bg-pink-500"
                          : "bg-gray-500"
                    } flex items-center justify-center text-white font-bold text-[10px]`}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {t.shortName}
                    </p>
                    <p className="text-[9px] text-gray-500">{t.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by teacher, subject or batch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
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
                <select
                  value={filterTeacher}
                  onChange={(e) => setFilterTeacher(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  <option value="All">All Teachers</option>
                  {ELDERS_TEACHERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.shortName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ✅ Schedule Table — Image Style */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700 w-32">
                      Time
                    </th>
                    {ELDERS_DAYS.map((day) => (
                      <th
                        key={day}
                        className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ELDERS_TIME_SLOTS.map((slot) => {
                    const cellItems = ELDERS_DAYS.map((day) =>
                      getClassesInCell(day, slot.id),
                    );
                    // Max height calculation - সব day এর মধ্যে সর্বোচ্চ item সংখ্যা
                    const maxItems = Math.max(
                      ...cellItems.map((arr) => arr.length),
                      1,
                    );

                    return (
                      <tr key={slot.id}>
                        {/* Time column */}
                        <td
                          className={`border border-gray-300 ${slot.color} px-2 py-2 text-center font-bold align-middle`}
                          rowSpan={1}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <FaRegClock className="text-green-600" size={12} />
                            <span className="text-green-700 text-[11px] whitespace-nowrap">
                              {slot.label}
                            </span>
                          </div>
                        </td>

                        {/* Days columns */}
                        {ELDERS_DAYS.map((day, dayIdx) => {
                          const items = cellItems[dayIdx];
                          return (
                            <td
                              key={day}
                              className={`border border-gray-300 ${slot.color} p-1 align-top`}
                              style={{
                                minWidth: "140px",
                              }}
                            >
                              {items.length > 0 ? (
                                <div className="space-y-1">
                                  {items.map((item) => (
                                    <div
                                      key={item.id}
                                      onClick={() => openDetailsModal(item)}
                                      className={`${getTeacherBg(
                                        item.teacherId,
                                      )} border-l-4 rounded p-1.5 cursor-pointer hover:shadow-md transition-all`}
                                    >
                                      <p className="text-[10px] font-bold truncate">
                                        {item.subject}
                                      </p>
                                      <p className="text-[9px] truncate">
                                        {item.batch}
                                      </p>
                                      <p className="text-[9px] font-medium truncate">
                                        {item.teacherName}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center text-gray-400 text-[11px] py-2">
                                  —
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mt-3 flex flex-wrap gap-3 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-400"></div>
              <span>Jubayer Ustad</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-pink-400"></div>
              <span>Sumaiya Afrin</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-200"></div>
              <span>Morning (6:00-7:00 AM)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-200"></div>
              <span>Afternoon (3:00-4:30 PM)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-200"></div>
              <span>Evening (8:00-9:00 PM)</span>
            </div>
          </div>

          {/* Empty state */}
          {filteredSchedule.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Schedule Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your filters or add a new class
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarPlus className="text-blue-600" /> Add Class
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSchedule} className="p-6 space-y-4">
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
                    {ELDERS_DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot *
                  </label>
                  <select
                    required
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
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
                  value={formData.teacherId}
                  onChange={handleTeacherSelect}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Elders Teacher</option>
                  {ELDERS_TEACHERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.shortName} — {t.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject / Course *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., QAIDA NURANIYAH / Basic Tajweed / Najera"
                  list="elders-subjects"
                />
                <datalist id="elders-subjects">
                  <option value="QAIDA NURANIYAH" />
                  <option value="Basic Tajweed" />
                  <option value="Najera" />
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch *
                </label>
                <input
                  type="text"
                  required
                  value={formData.batch}
                  onChange={(e) =>
                    setFormData({ ...formData, batch: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., Batch-03, Batch-06, Batch-02"
                  list="elders-batches"
                />
                <datalist id="elders-batches">
                  <option value="Batch-03" />
                  <option value="Batch-06" />
                  <option value="Batch-02" />
                </datalist>
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
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaCalendarPlus className="inline mr-2" size={14} /> Add Class
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
      {showEditModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Schedule
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSchedule} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day
                  </label>
                  <select
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {ELDERS_TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  value={formData.teacherId}
                  onChange={handleTeacherSelect}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  {ELDERS_TEACHERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.shortName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
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
      {showDetailsModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" /> Class Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div
                className={`${getTeacherBg(selectedSchedule.teacherId)} border-l-4 rounded p-4`}
              >
                <h4 className="text-lg font-bold">
                  {selectedSchedule.subject} — {selectedSchedule.batch}
                </h4>
                <p className="text-sm mt-1">{selectedSchedule.teacherName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Day</p>
                  <p className="font-semibold">{selectedSchedule.day}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Time</p>
                  <p className="font-semibold">
                    {
                      ELDERS_TIME_SLOTS.find(
                        (s) => s.id === selectedSchedule.timeSlot,
                      )?.label
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Subject</p>
                  <p className="font-semibold">{selectedSchedule.subject}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400">Batch</p>
                  <p className="font-semibold">{selectedSchedule.batch}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-[10px] text-gray-400">Status</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      selectedSchedule.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : selectedSchedule.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedSchedule.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedSchedule);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleDeleteSchedule(selectedSchedule.id);
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

export default Teacher_shedule;
