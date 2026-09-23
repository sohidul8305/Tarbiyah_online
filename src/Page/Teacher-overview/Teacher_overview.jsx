// src/Page/Admin/Teacher_overview.jsx
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
  FaClock,
  FaChartLine,
  FaUserPlus,
  FaCalendarCheck,
  FaDatabase,
  FaEye,
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaLayerGroup,
  FaStar,
  FaSave,
  FaUserTimes,
  FaAddressCard,
  FaGraduationCap,
  FaUserCircle,
  FaEnvelope as FaEnvelopeIcon,
  FaPhone as FaPhoneIcon,
  FaPlus,
  FaUserTie,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ============================================================
// ✅ ২ জন ELDERS TEACHER — সম্পূর্ণ profile
// ============================================================
const ELDERS_TEACHERS = [
  {
    id: 1,
    _id: "TCH_FIXED_001",
    name: "Jubayer Ahmad",
    teacherId: "TCH001",
    subject: "Quran For Elders",
    department: "Quran For Elders",
    email: "jubayer@tarabiyah.com",
    phone: "+880 1712 345678",
    address: "Mohammadpur, Dhaka",
    joinDate: "2024-01-15",
    status: "Active",
    gender: "Male",
    dob: "1985-05-15",
    qualification: "Masters in Quranic Sciences",
    experience: "10 years",
    specialization: "Qaida Nuraniyah & Basic Tajweed",
    bio: "Senior teacher of Quran For Elders department with expertise in Qaida Nuraniyah, Basic Tajweed, and Najera. Over 10 years of teaching experience with adult learners.",
    socialMedia: {
      facebook: "https://facebook.com/jubayer",
      twitter: "",
      linkedin: "",
      website: "",
    },
    totalStudents: 45,
    classes: [
      "Qaida Nuraniyah Batch-03",
      "Basic Tajweed Batch-06",
      "Najera Batch-02",
    ],
    attendance: 95,
    rating: 4.8,
    reviews: 87,
    salary: 45000,
    performance: "Excellent",
    designation: "Senior Teacher",
    courses: [
      { name: "Qaida Nuraniyah", batch: "Batch-03", students: 18 },
      { name: "Basic Tajweed", batch: "Batch-06", students: 15 },
      { name: "Najera", batch: "Batch-02", students: 12 },
    ],
  },
  {
    id: 2,
    _id: "TCH_FIXED_002",
    name: "Sumaiya Afrin Mim",
    teacherId: "TCH002",
    subject: "Quran For Elders",
    department: "Quran For Elders",
    email: "sumaiya@tarabiyah.com",
    phone: "+880 1723 456789",
    address: "Mirpur, Dhaka",
    joinDate: "2024-02-01",
    status: "Active",
    gender: "Female",
    dob: "1995-08-20",
    qualification: "Masters in Islamic Studies",
    experience: "5 years",
    specialization: "Qaida Nuraniyah & Quran Nazera",
    bio: "Junior teacher of Quran For Elders department focused on adult Quran learning, Qaida Nuraniyah, and Quran Nazera. Passionate about teaching elders with patience and care.",
    socialMedia: {
      facebook: "https://facebook.com/sumaiya",
      twitter: "",
      linkedin: "",
      website: "",
    },
    totalStudents: 38,
    classes: [
      "Qaida Nuraniyah Batch-03",
      "Basic Tajweed Batch-06",
      "Najera Batch-02",
    ],
    attendance: 92,
    rating: 4.9,
    reviews: 64,
    salary: 35000,
    performance: "Excellent",
    designation: "Junior Teacher",
    courses: [
      { name: "Qaida Nuraniyah", batch: "Batch-03", students: 16 },
      { name: "Basic Tajweed", batch: "Batch-06", students: 14 },
      { name: "Najera", batch: "Batch-02", students: 8 },
    ],
  },
];

const Teacher_overview = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("teacher-overview");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "Quran for Elders",
    joinDate: "",
  });

  // ✅ Elders teachers (local state so add/edit works)
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem("eldersTeachersOverview");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error(err);
      }
    }
    return ELDERS_TEACHERS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPerformance, setFilterPerformance] = useState("All");

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    subject: "Quran For Elders",
    department: "Quran For Elders",
    email: "",
    phone: "",
    address: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "Active",
    gender: "Male",
    dob: "",
    qualification: "",
    experience: "",
    specialization: "",
    bio: "",
    totalStudents: 0,
    classes: [],
    attendance: 0,
    rating: 0,
    reviews: 0,
    salary: 0,
    performance: "Good",
    designation: "Teacher",
  });

  // ✅ Elders-only options
  const performances = ["Excellent", "Good", "Average", "Poor"];
  const statuses = ["Active", "Inactive", "On Leave"];
  const genders = ["Male", "Female", "Other"];
  const eldersClasses = [
    "Qaida Nuraniyah Batch-03",
    "Basic Tajweed Batch-06",
    "Najera Batch-02",
    "Hifz Batch-01",
  ];
  const eldersSpecializations = [
    "Qaida Nuraniyah",
    "Basic Tajweed",
    "Quran Nazera",
    "Najera",
    "Bakarah Hifz",
  ];

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
    localStorage.setItem("eldersTeachersOverview", JSON.stringify(teachers));
  }, [teachers]);

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
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Average":
        return "bg-yellow-100 text-yellow-700";
      case "Poor":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 opacity-50"
                  : "text-gray-300"
            }
            size={12}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Filter
  const filteredTeachers = teachers.filter((teacher) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      (teacher.name || "").toLowerCase().includes(s) ||
      (teacher.teacherId || "").toLowerCase().includes(s) ||
      (teacher.subject || "").toLowerCase().includes(s) ||
      (teacher.email || "").toLowerCase().includes(s);
    const matchesStatus =
      filterStatus === "All" || teacher.status === filterStatus;
    const matchesPerformance =
      filterPerformance === "All" || teacher.performance === filterPerformance;
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(teachers.map((t) => t.status).filter(Boolean)),
  ];
  const uniquePerformances = [
    "All",
    ...new Set(teachers.map((t) => t.performance).filter(Boolean)),
  ];

  // Stats
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const totalStudents = teachers.reduce(
    (sum, t) => sum + (t.totalStudents || 0),
    0,
  );
  const avgAttendance =
    teachers.length > 0
      ? Math.round(
          teachers.reduce((sum, t) => sum + (t.attendance || 0), 0) /
            teachers.length,
        )
      : 0;
  const avgRating =
    teachers.length > 0
      ? teachers.reduce((sum, t) => sum + (t.rating || 0), 0) / teachers.length
      : 0;

  const openDetailsModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      teacherId: "",
      subject: "Quran For Elders",
      department: "Quran For Elders",
      email: "",
      phone: "",
      address: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
      gender: "Male",
      dob: "",
      qualification: "",
      experience: "",
      specialization: "",
      bio: "",
      totalStudents: 0,
      classes: [],
      attendance: 0,
      rating: 0,
      reviews: 0,
      salary: 0,
      performance: "Good",
      designation: "Teacher",
    });
    setShowAddModal(true);
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newTeacher = {
      id: Date.now(),
      _id: "LOCAL_" + Date.now(),
      name: formData.name,
      teacherId:
        formData.teacherId ||
        `TCH${String(teachers.length + 1).padStart(3, "0")}`,
      subject: formData.subject,
      department: "Quran For Elders",
      email: formData.email,
      phone: formData.phone,
      address: formData.address || "",
      joinDate: formData.joinDate,
      status: formData.status,
      gender: formData.gender,
      dob: formData.dob || "",
      qualification: formData.qualification || "",
      experience: formData.experience || "0 years",
      specialization: formData.specialization || "",
      bio: formData.bio || "",
      socialMedia: { facebook: "", twitter: "", linkedin: "", website: "" },
      totalStudents: parseInt(formData.totalStudents) || 0,
      classes: formData.classes || [],
      attendance: parseInt(formData.attendance) || 0,
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      salary: parseInt(formData.salary) || 0,
      performance: formData.performance,
      designation: formData.designation || "Teacher",
      courses: [],
    };

    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "✅ Elders Teacher Added!",
      text: `${formData.name} added to Quran For Elders.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteTeacher = (id) => {
    Swal.fire({
      title: "Delete Teacher?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTeachers(teachers.filter((t) => t.id !== id));
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Teacher Overview (Elders)
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
                <FaChalkboardTeacher className="text-blue-600" /> Teacher
                Overview —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Jubayer Ahmad • Sumaiya Afrin Mim — elders department
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaPlus size={12} /> Add Teacher
              </button>
              <button
                onClick={() =>
                  Swal.fire({
                    icon: "info",
                    title: "Export Report",
                    text: "Elders teacher report will be downloaded as PDF.",
                    timer: 1500,
                    showConfirmButton: false,
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaDownload size={12} /> Export
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

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalTeachers}</p>
              <p className="text-[10px] text-gray-500">Elders Teachers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {activeTeachers}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {totalStudents}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {avgAttendance}%
              </p>
              <p className="text-[10px] text-gray-500">Avg Attendance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {avgRating.toFixed(1)}
              </p>
              <p className="text-[10px] text-gray-500">Avg Rating</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search elders teachers..."
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
                  value={filterPerformance}
                  onChange={(e) => setFilterPerformance(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniquePerformances.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      teacher.status === "Active"
                        ? "bg-green-500"
                        : teacher.status === "On Leave"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                          teacher.performance === "Excellent"
                            ? "bg-gradient-to-r from-green-500 to-teal-500"
                            : teacher.performance === "Good"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                      >
                        {getInitials(teacher.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-gray-800 text-sm truncate">
                            {teacher.name}
                          </h3>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full ${getStatusColor(teacher.status)}`}
                          >
                            {teacher.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500">
                          {teacher.teacherId} • {teacher.designation}
                        </p>
                        <p className="text-[10px] text-teal-600 font-medium">
                          {teacher.department}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full ${getPerformanceColor(teacher.performance)}`}
                          >
                            {teacher.performance}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-2 text-[10px] text-gray-500 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1">
                        <FaEnvelopeIcon size={9} /> {teacher.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaPhoneIcon size={9} /> {teacher.phone}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-sm font-bold text-blue-600">
                          {teacher.totalStudents}
                        </p>
                        <p className="text-[9px] text-gray-500">Students</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <p className="text-sm font-bold text-green-600">
                          {teacher.attendance}%
                        </p>
                        <p className="text-[9px] text-gray-500">Attendance</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <p className="text-sm font-bold text-purple-600">
                          {teacher.classes?.length || 0}
                        </p>
                        <p className="text-[9px] text-gray-500">Batches</p>
                      </div>
                    </div>

                    {/* Courses */}
                    {teacher.courses && teacher.courses.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[9px] font-bold text-gray-500 mb-1">
                          COURSES
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {teacher.courses.map((c, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] bg-teal-50 border border-teal-200 text-teal-700 px-1.5 py-0.5 rounded"
                            >
                              {c.name} · {c.batch} · {c.students}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rating + Salary */}
                    <div className="mt-3 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1">
                        {renderStars(teacher.rating)}
                      </div>
                      <span className="font-semibold text-gray-700">
                        ৳{(teacher.salary || 0).toLocaleString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-1 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => openDetailsModal(teacher)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1.5 rounded border border-blue-200 hover:bg-blue-50"
                      >
                        <FaEye className="inline mr-1" size={10} /> View Profile
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            icon: "success",
                            title: "Email Sent!",
                            text: `Email sent to ${teacher.name}`,
                            timer: 1500,
                            showConfirmButton: false,
                          });
                        }}
                        className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50"
                        title="Send Email"
                      >
                        <FaEnvelopeIcon size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FaUserTimes size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                <FaChalkboardTeacher className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Elders Teachers Found
                </h3>
                <p className="text-xs text-gray-500">Try adjusting filters</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlus className="text-blue-600" /> Add New Elders Teacher
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Department: <strong>Quran For Elders</strong> — অটোমেটিক সেট
                হবে
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher ID
                  </label>
                  <input
                    type="text"
                    value={formData.teacherId}
                    onChange={(e) =>
                      setFormData({ ...formData, teacherId: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Auto-generated"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <select
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Senior Teacher">Senior Teacher</option>
                    <option value="Junior Teacher">Junior Teacher</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <select
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Specialization</option>
                    {eldersSpecializations.map((s) => (
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
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {genders.map((g) => (
                      <option key={g} value={g}>
                        {g}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Masters in Islamic Studies"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Performance
                  </label>
                  <select
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({ ...formData, performance: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {performances.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Dhaka, Bangladesh"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Short bio..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  <FaSave className="inline mr-2" size={14} /> Add Teacher
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
      {showDetailsModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserCircle className="text-blue-600" /> Teacher Profile
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold ${
                    selectedTeacher.performance === "Excellent"
                      ? "bg-gradient-to-r from-green-500 to-teal-500"
                      : selectedTeacher.performance === "Good"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                  }`}
                >
                  {getInitials(selectedTeacher.name)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedTeacher.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedTeacher.status)}`}
                    >
                      {selectedTeacher.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(selectedTeacher.performance)}`}
                    >
                      {selectedTeacher.performance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedTeacher.teacherId} • {selectedTeacher.designation}
                  </p>
                  <p className="text-sm text-teal-700 font-semibold">
                    {selectedTeacher.department}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 justify-center md:justify-start">
                    <span>📧 {selectedTeacher.email}</span>
                    <span>📱 {selectedTeacher.phone}</span>
                    <span>📚 {selectedTeacher.experience}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                    {renderStars(selectedTeacher.rating)}
                    <span className="text-sm text-gray-500">
                      ({selectedTeacher.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaAddressCard className="text-blue-500" /> Personal Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full Name</span>
                      <span className="font-semibold">
                        {selectedTeacher.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Teacher ID</span>
                      <span className="font-semibold">
                        {selectedTeacher.teacherId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-semibold">
                        {selectedTeacher.gender}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">DOB</span>
                      <span className="font-semibold">
                        {formatDate(selectedTeacher.dob)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-semibold text-right max-w-[60%]">
                        {selectedTeacher.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Join Date</span>
                      <span className="font-semibold">
                        {formatDate(selectedTeacher.joinDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaGraduationCap className="text-green-500" /> Professional
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Qualification</span>
                      <span className="font-semibold">
                        {selectedTeacher.qualification}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience</span>
                      <span className="font-semibold">
                        {selectedTeacher.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Specialization</span>
                      <span className="font-semibold">
                        {selectedTeacher.specialization}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Department</span>
                      <span className="font-semibold text-teal-700">
                        {selectedTeacher.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Batches</span>
                      <span className="font-semibold text-right max-w-[60%]">
                        {(selectedTeacher.classes || []).join(", ") || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTeacher.bio && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">
                    Bio
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedTeacher.bio}
                  </p>
                </div>
              )}

              {/* Courses */}
              {selectedTeacher.courses &&
                selectedTeacher.courses.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm mb-3">
                      Assigned Courses
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {selectedTeacher.courses.map((c, idx) => (
                        <div
                          key={idx}
                          className="bg-teal-50 border border-teal-200 rounded-lg p-3"
                        >
                          <p className="text-xs font-bold text-teal-800">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-gray-600">{c.batch}</p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            👥 {c.students} students
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">
                  Performance Stats
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {selectedTeacher.totalStudents}
                    </p>
                    <p className="text-[10px] text-gray-500">Total Students</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-600">
                      {selectedTeacher.attendance}%
                    </p>
                    <p className="text-[10px] text-gray-500">Attendance</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-yellow-600">
                      {selectedTeacher.classes?.length || 0}
                    </p>
                    <p className="text-[10px] text-gray-500">Batches</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-purple-600">
                      ৳{(selectedTeacher.salary || 0).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-500">Salary</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    Swal.fire({
                      icon: "success",
                      title: "Profile Downloaded!",
                      timer: 1200,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaDownload className="inline mr-2" /> Download
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Email Sent!",
                      timer: 1200,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEnvelopeIcon className="inline mr-2" /> Send Email
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

export default Teacher_overview;
