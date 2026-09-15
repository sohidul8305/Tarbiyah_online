// src/Page/Admin/Teacher_assign.jsx
import React, { useState, useEffect, useRef } from "react";
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
  FaUserTie,
  FaClock,
  FaStar,
  FaUserCheck,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5000";

const Teacher_assign = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Layout state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("teacher-management");
  const [activeSubMenu, setActiveSubMenu] = useState("teacher-assign");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Assignments from API
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Teachers from API
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(true);

  // Combobox
  const [teacherInput, setTeacherInput] = useState("");
  const [showTeacherSuggestions, setShowTeacherSuggestions] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [addingQuickTeacher, setAddingQuickTeacher] = useState(false);
  const inputRef = useRef(null);

  // Static lists
  const [subjects] = useState([
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
    "Arabic Grammar",
    "Quran Memorization",
  ]);

  const [classes] = useState([
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ]);

  const [batches] = useState([
    "Batch 2026-A",
    "Batch 2026-B",
    "Batch 2026-C",
    "Batch 2026-D",
    "Basic Tazweed 6th Batch",
    "Najera Batch-02",
    "Not Assigned",
  ]);

  const availableDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

  // Modals
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittingTeacher, setSubmittingTeacher] = useState(false);

  const initialFormData = {
    teacherId: "",
    teacherName: "",
    subject: "",
    class: "",
    batch: "",
    days: [],
    time: "",
    room: "",
    status: "Pending",
    studentsCount: 0,
    rating: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [newTeacherData, setNewTeacherData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "Tajweed",
    experience: "",
    qualification: "",
    designation: "Teacher",
    gender: "Male",
    address: "",
    bio: "",
  });

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      setAdminInfo(JSON.parse(savedAdmin));
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

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/teacher-assign/all`);
      const data = await response.json();
      if (data.success) {
        setAssignments(data.assignments || []);
      } else {
        setError(data.message || "Failed to load");
        setAssignments([]);
      }
    } catch (err) {
      console.error("❌ Fetch assignments:", err);
      setError(`Error: ${err.message}`);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      setTeachersLoading(true);
      const response = await fetch(`${API_BASE}/api/teachers-manage/all`);
      const data = await response.json();
      if (data.success) {
        setAvailableTeachers(data.teachers || []);
      } else {
        setAvailableTeachers([]);
      }
    } catch (err) {
      console.error("❌ Fetch teachers:", err);
      setAvailableTeachers([]);
    } finally {
      setTeachersLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchTeachers();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("adminEmail");
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
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

  // Menu items
  const menuItems = [
    {
      id: "profile",
      path: "/admin-profile",
      icon: <FaUser />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/admin-dashboard",
      icon: <MdDashboard />,
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
      ],
    },
    {
      id: "student-management",
      path: "/admin-students",
      icon: <FaUsers />,
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
      ],
    },
    {
      id: "teacher-management",
      path: "/admin-teachers",
      icon: <FaChalkboardTeacher />,
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
      icon: <FaLayerGroup />,
      label: "Batch & Course",
    },
    {
      id: "finance",
      path: "/admin-finance",
      icon: <FaMoneyBillWave />,
      label: "Finance",
    },
    {
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck />,
      label: "Exam",
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine />,
      label: "Report & Analytics",
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase />,
      label: "CRM Management",
    },
  ];

  // Stats
  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "Active").length,
    pending: assignments.filter((a) => a.status === "Pending").length,
    topRated: assignments.filter((a) => (a.rating || 0) >= 4.5).length,
  };

  // Filter
  const filteredAssignments = assignments.filter((a) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      (a.teacherName || "").toLowerCase().includes(s) ||
      (a.teacherId || "").toLowerCase().includes(s) ||
      (a.subject || "").toLowerCase().includes(s) ||
      (a.class || "").toLowerCase().includes(s);
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    const matchesSubject =
      filterSubject === "All" || a.subject === filterSubject;
    const matchesClass = filterClass === "All" || a.class === filterClass;
    return matchesSearch && matchesStatus && matchesSubject && matchesClass;
  });

  const uniqueStatuses = [
    "All",
    ...new Set(assignments.map((a) => a.status).filter(Boolean)),
  ];
  const uniqueSubjects = [
    "All",
    ...new Set(assignments.map((a) => a.subject).filter(Boolean)),
  ];
  const uniqueClasses = [
    "All",
    ...new Set(assignments.map((a) => a.class).filter(Boolean)),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
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
        return <FaClock className="text-yellow-500" size={8} />;
      case "Inactive":
        return <FaTimesCircle className="text-red-500" size={8} />;
      default:
        return null;
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  // ============ QUICK ADD TEACHER (by name) ============
  const handleQuickAddTeacher = async (name) => {
    if (!name || !name.trim()) return;

    try {
      setAddingQuickTeacher(true);

      const response = await fetch(
        `${API_BASE}/api/teachers-manage/quick-add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            specialization: formData.subject || "General",
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        await fetchTeachers();

        setTeacherInput(data.teacher.name);
        setFormData((prev) => ({
          ...prev,
          teacherId: data.teacher.id || data.teacher._id,
          teacherName: data.teacher.name,
          subject: prev.subject || data.teacher.specialization || "",
        }));

        setShowTeacherSuggestions(false);

        if (data.alreadyExists) {
          Swal.fire({
            icon: "info",
            title: "Already Exists",
            text: `"${data.teacher.name}" আগে থেকেই আছে — select করা হলো।`,
            timer: 1800,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "✅ Teacher Added!",
            html: `
              <div style="text-align:left">
                <p><strong>ID:</strong> ${data.teacher.id}</p>
                <p><strong>Name:</strong> ${data.teacher.name}</p>
                <p><strong>Specialization:</strong> ${data.teacher.specialization}</p>
              </div>
            `,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not add teacher",
        });
      }
    } catch (err) {
      console.error("❌ Quick Add:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: err.message,
      });
    } finally {
      setAddingQuickTeacher(false);
    }
  };

  // ============ FULL ADD TEACHER (via modal) ============
  const handleAddNewTeacher = async (e) => {
    e.preventDefault();

    if (!newTeacherData.name || !newTeacherData.specialization) {
      Swal.fire({
        icon: "warning",
        title: "Required!",
        text: "Name এবং Specialization আবশ্যক।",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setSubmittingTeacher(true);
      Swal.fire({
        title: "Adding teacher...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(`${API_BASE}/api/teachers-manage/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacherData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchTeachers();

        setTeacherInput(data.teacher.name);
        setFormData((prev) => ({
          ...prev,
          teacherId: data.teacher.id,
          teacherName: data.teacher.name,
          subject: prev.subject || data.teacher.specialization,
        }));

        setShowAddTeacherModal(false);
        setNewTeacherData({
          name: "",
          email: "",
          phone: "",
          specialization: "Tajweed",
          experience: "",
          qualification: "",
          designation: "Teacher",
          gender: "Male",
          address: "",
          bio: "",
        });

        Swal.fire({
          icon: "success",
          title: "✅ Teacher Added!",
          html: `
            <div style="text-align:left">
              <p><strong>ID:</strong> ${data.teacher.id}</p>
              <p><strong>Name:</strong> ${data.teacher.name}</p>
              <p><strong>Specialization:</strong> ${data.teacher.specialization}</p>
            </div>
          `,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not add teacher",
        });
      }
    } catch (err) {
      console.error("❌ Add Teacher:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: err.message,
      });
    } finally {
      setSubmittingTeacher(false);
    }
  };

  // ============ MODAL OPENERS ============
  const openAssignModal = () => {
    setFormData(initialFormData);
    setTeacherInput("");
    setShowTeacherSuggestions(false);
    setFilteredTeachers([]);
    setShowAssignModal(true);
  };

  const openEditModal = (a) => {
    setSelectedAssignment(a);
    setFormData({
      teacherId: a.teacherId || "",
      teacherName: a.teacherName || "",
      subject: a.subject || "",
      class: a.class || "",
      batch: a.batch || "",
      days: a.days || [],
      time: a.time || "",
      room: a.room || "",
      status: a.status || "Pending",
      studentsCount: a.studentsCount || 0,
      rating: a.rating || 0,
    });
    setTeacherInput(a.teacherName || "");
    setShowEditModal(true);
  };

  const openDetailsModal = (a) => {
    setSelectedAssignment(a);
    setShowDetailsModal(true);
  };

  // ============ ASSIGN TEACHER ============
  const handleAssignTeacher = async (e) => {
    e.preventDefault();

    // If not selected but typed something — ask to quick add
    if (!formData.teacherId) {
      if (teacherInput.trim()) {
        const confirm = await Swal.fire({
          icon: "question",
          title: "Teacher added হয়নি!",
          html: `"<strong>${teacherInput.trim()}</strong>" কে teacher হিসেবে save করবেন?`,
          showCancelButton: true,
          confirmButtonText: "হ্যাঁ, Save করুন",
          cancelButtonText: "না",
          confirmButtonColor: "#16a34a",
        });

        if (confirm.isConfirmed) {
          await handleQuickAddTeacher(teacherInput.trim());
        }
        return;
      }

      Swal.fire({
        icon: "warning",
        title: "Teacher Required!",
        text: "Please select or type a teacher name.",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    if (
      !formData.subject ||
      !formData.class ||
      !formData.days.length ||
      !formData.time
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        text: "Subject, Class, Days, and Time are required.",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setSubmitting(true);
      Swal.fire({
        title: "Saving...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(`${API_BASE}/api/teacher-assign/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAssignModal(false);
        setFormData(initialFormData);
        setTeacherInput("");

        Swal.fire({
          icon: "success",
          title: "✅ Teacher Assigned!",
          html: `
            <div style="text-align:left">
              <p><strong>Teacher:</strong> ${formData.teacherName}</p>
              <p><strong>Subject:</strong> ${formData.subject}</p>
              <p><strong>Class:</strong> ${formData.class}</p>
              <p><strong>Days:</strong> ${formData.days.join(", ")}</p>
              <p><strong>Time:</strong> ${formData.time}</p>
            </div>
          `,
          timer: 2500,
          showConfirmButton: true,
          confirmButtonColor: "#004d4d",
        });

        fetchAssignments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not assign teacher",
        });
      }
    } catch (err) {
      console.error("❌ Assign:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ============ EDIT ASSIGNMENT ============
  const handleEditAssignment = async (e) => {
    e.preventDefault();

    if (
      !formData.subject ||
      !formData.class ||
      !formData.days.length ||
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

    try {
      setSubmitting(true);
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${API_BASE}/api/teacher-assign/update/${selectedAssignment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success) {
        setShowEditModal(false);
        setSelectedAssignment(null);

        Swal.fire({
          icon: "success",
          title: "✅ Updated!",
          text: "Assignment updated successfully.",
          timer: 1800,
          showConfirmButton: false,
        });

        fetchAssignments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message,
        });
      }
    } catch (err) {
      console.error("❌ Update:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ============ DELETE ASSIGNMENT ============
  const handleDeleteAssignment = async (id) => {
    const result = await Swal.fire({
      title: "Remove Assignment?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${API_BASE}/api/teacher-assign/delete/${id}`,
        { method: "DELETE" },
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Removed!",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchAssignments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message,
        });
      }
    } catch (err) {
      console.error("❌ Delete:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
      });
    }
  };

  const renderStars = (rating) => {
    const r = rating || 0;
    const fullStars = Math.floor(r);
    const hasHalfStar = r - fullStars >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
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
            size={10}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600">
          {r.toFixed(1)}
        </span>
      </div>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Teacher Assign</h1>
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
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r
            shadow-lg md:shadow-sm transition-all duration-300 h-full
            overflow-hidden flex-shrink-0
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <FaArrowRight
                        size={12}
                        className={activeSubMenu === item.id ? "rotate-90" : ""}
                      />
                    </button>
                    {activeSubMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} onClick={() => setIsSidebarOpen(false)}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                        ${
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t pt-4"
            >
              <FaSignOutAlt />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="p-4 text-xs text-gray-400 border-t">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-600" /> Teacher
                Assignment
              </h1>
              <p className="text-xs text-gray-500">
                Assign teachers to classes, subjects, and batches
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openAssignModal}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Assign Teacher
              </button>
              <button
                onClick={() => {
                  fetchAssignments();
                  fetchTeachers();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold"
              >
                🔄 Refresh
              </button>
              <button
                onClick={() => setShowAddTeacherModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
              >
                <FaUserPlus size={12} /> Add Teacher
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{stats.total}</p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">{stats.active}</p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {stats.pending}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {stats.topRated}
              </p>
              <p className="text-[10px] text-gray-500">Top Rated</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-teal-600">
                {availableTeachers.length}
              </p>
              <p className="text-[10px] text-gray-500">Teachers</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by teacher, subject or class..."
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
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  {uniqueSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
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

          {/* Assignment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[calc(100vh-360px)]">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a) => (
                <div
                  key={a._id}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${
                      a.status === "Active"
                        ? "bg-green-500"
                        : a.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {(a.teacherName || "T").charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-xs truncate">
                          {a.teacherName}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {a.teacherId}
                        </p>
                        <span
                          className={`inline-flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full mt-0.5 ${getStatusColor(
                            a.status,
                          )}`}
                        >
                          {getStatusIcon(a.status)}
                          {a.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <p className="text-gray-400">Subject</p>
                        <p className="font-medium text-gray-700 truncate">
                          {a.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Class</p>
                        <p className="font-medium text-gray-700">{a.class}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Batch</p>
                        <p className="font-medium text-gray-700 truncate">
                          {a.batch}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Students</p>
                        <p className="font-medium text-gray-700">
                          {a.studentsCount || 0}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-0.5">
                        {(a.days || []).slice(0, 3).map((day) => (
                          <span
                            key={day}
                            className="text-[8px] bg-gray-100 px-1 py-0.5 rounded text-gray-600"
                          >
                            {day.slice(0, 3)}
                          </span>
                        ))}
                        {(a.days || []).length > 3 && (
                          <span className="text-[8px] text-gray-400">
                            +{a.days.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        <FaClock className="inline mr-0.5" size={10} /> {a.time}
                      </div>
                    </div>

                    {a.rating > 0 && (
                      <div className="mt-1">{renderStars(a.rating)}</div>
                    )}

                    <div className="mt-2 flex items-center gap-1 pt-1.5 border-t">
                      <button
                        onClick={() => openDetailsModal(a)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => openEditModal(a)}
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteAssignment(a._id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="Remove"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border rounded-xl shadow-sm p-8 text-center">
                <FaChalkboardTeacher className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Assignments Found
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {error || "Click 'Assign Teacher' to create one"}
                </p>
                <button
                  onClick={openAssignModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-1"
                >
                  <FaPlusCircle size={12} /> Assign Teacher
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ============ ASSIGN MODAL ============ */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-20">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> Assign Teacher
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAssignTeacher} className="p-6 space-y-4">
              {/* ✅ COMBOBOX TEACHER INPUT */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select / Type Teacher Name *
                </label>

                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={teacherInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeacherInput(value);

                      if (value.trim()) {
                        const matches = availableTeachers.filter((t) =>
                          (t.name || "")
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                        );
                        setFilteredTeachers(matches);
                        setShowTeacherSuggestions(true);
                      } else {
                        setFilteredTeachers(availableTeachers);
                        setShowTeacherSuggestions(true);
                      }

                      setFormData((prev) => ({
                        ...prev,
                        teacherName: value,
                      }));
                    }}
                    onFocus={() => {
                      setFilteredTeachers(availableTeachers);
                      setShowTeacherSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowTeacherSuggestions(false), 200);
                    }}
                    placeholder="Type teacher name or select from list..."
                    className="w-full border rounded-lg px-3 py-2 pr-16 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={teachersLoading}
                  />

                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {teacherInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setTeacherInput("");
                          setFormData((prev) => ({
                            ...prev,
                            teacherId: "",
                            teacherName: "",
                          }));
                          inputRef.current?.focus();
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Clear"
                      >
                        <FaTimesCircle size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFilteredTeachers(availableTeachers);
                        setShowTeacherSuggestions(!showTeacherSuggestions);
                        inputRef.current?.focus();
                      }}
                      className="p-1 text-gray-500 hover:text-blue-600"
                      title="Show list"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        className="fill-current"
                      >
                        <path d="M6 9L2 5h8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Suggestions */}
                {showTeacherSuggestions && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {/* Add New Teacher option */}
                    {teacherInput.trim() &&
                      !availableTeachers.some(
                        (t) =>
                          (t.name || "").toLowerCase() ===
                          teacherInput.trim().toLowerCase(),
                      ) && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            handleQuickAddTeacher(teacherInput.trim())
                          }
                          disabled={addingQuickTeacher}
                          className="w-full text-left px-3 py-2.5 hover:bg-green-50 border-b border-gray-100 flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            {addingQuickTeacher ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600"></div>
                            ) : (
                              <FaPlusCircle size={14} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-green-700">
                              ➕ Add New Teacher
                            </p>
                            <p className="text-[11px] text-gray-600 truncate">
                              "{teacherInput.trim()}"
                            </p>
                          </div>
                        </button>
                      )}

                    {/* Existing teachers */}
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((t) => (
                        <button
                          key={t._id || t.id}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setTeacherInput(t.name);
                            setFormData((prev) => ({
                              ...prev,
                              teacherId: t.id || t._id,
                              teacherName: t.name,
                              subject: prev.subject || t.specialization || "",
                            }));
                            setShowTeacherSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-50 flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {(t.name || "T").charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate">
                              {t.name}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {t.id || t._id} • {t.specialization || "General"}
                              {t.experience ? ` • ${t.experience}` : ""}
                            </p>
                          </div>
                          {formData.teacherId === (t.id || t._id) && (
                            <FaCheckCircle
                              className="text-green-500"
                              size={14}
                            />
                          )}
                        </button>
                      ))
                    ) : teacherInput.trim() ? (
                      <div className="px-3 py-3 text-center text-xs text-gray-500">
                        No matching teacher found. Type full name + click "Add
                        New Teacher"
                      </div>
                    ) : availableTeachers.length === 0 ? (
                      <div className="px-3 py-3 text-center text-xs text-gray-500">
                        No teachers yet. Type a name to add one.
                      </div>
                    ) : null}
                  </div>
                )}

                {formData.teacherId && (
                  <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                    <FaCheckCircle size={10} /> Selected: {formData.teacherName}
                  </p>
                )}

                {!formData.teacherId && teacherInput && (
                  <p className="text-[10px] text-yellow-600 mt-1 flex items-center gap-1">
                    ⚠️ "{teacherInput}" এখনো save হয়নি। Suggestion থেকে "➕ Add
                    New Teacher" ক্লিক করুন।
                  </p>
                )}

                <p className="text-[10px] text-gray-400 mt-1">
                  💡 নাম type করুন → suggestion আসবে → list থেকে select করুন
                  অথবা নতুন হলে "Add New Teacher" ক্লিক করুন
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                    <option value="">Select Class</option>
                    {classes.map((c) => (
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
                    Batch
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Room 201"
                  />
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
                    placeholder="e.g., 10:00 AM - 11:30 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Students Count
                  </label>
                  <input
                    type="number"
                    value={formData.studentsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentsCount: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days *
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        formData.days.includes(day)
                          ? "bg-blue-600 text-white shadow-sm"
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
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <FaUserPlus className="inline mr-2" size={14} />
                  {submitting ? "Saving..." : "Assign Teacher"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ EDIT MODAL ============ */}
      {showEditModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Assignment
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditAssignment} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.teacherName}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.teacherId}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {batches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
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
                    Students
                  </label>
                  <input
                    type="number"
                    value={formData.studentsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentsCount: e.target.value,
                      })
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
                  {availableDays.map((day) => (
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
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" size={14} />
                  {submitting ? "Updating..." : "Update Assignment"}
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

      {/* ============ DETAILS MODAL ============ */}
      {showDetailsModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserTie className="text-blue-600" /> Assignment Details
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
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {(selectedAssignment.teacherName || "T").charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedAssignment.teacherName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedAssignment.status,
                      )}`}
                    >
                      {selectedAssignment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedAssignment.teacherId}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {selectedAssignment.subject}</span>
                    <span>🏫 {selectedAssignment.class}</span>
                    <span>📦 {selectedAssignment.batch}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" /> Schedule
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Days</span>
                      <span className="font-medium">
                        {(selectedAssignment.days || []).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">
                        {selectedAssignment.time}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Room</span>
                      <span className="font-medium">
                        {selectedAssignment.room}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Assigned</span>
                      <span className="font-medium">
                        {selectedAssignment.assignedDate || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaUserGraduate className="text-green-500" /> Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Students</span>
                      <span className="font-medium">
                        {selectedAssignment.studentsCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium">
                        {renderStars(selectedAssignment.rating)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Subject</span>
                      <span className="font-medium">
                        {selectedAssignment.subject}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Class</span>
                      <span className="font-medium">
                        {selectedAssignment.class}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedAssignment);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit
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

      {/* ============ ADD NEW TEACHER MODAL ============ */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-green-600" /> Add New Teacher
              </h3>
              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleAddNewTeacher} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                💡 Teacher ID অটোমেটিক তৈরি হবে (TCH001, TCH002...)। শুধু Name
                এবং Specialization আবশ্যক।
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTeacherData.name}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Ustadh Ahmad Raza"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization *
                  </label>
                  <select
                    required
                    value={newTeacherData.specialization}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {subjects.map((s) => (
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={newTeacherData.email}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="teacher@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newTeacherData.phone}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="017XXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={newTeacherData.experience}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={newTeacherData.qualification}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        qualification: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., MSc in Islamic Studies"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={newTeacherData.designation}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        designation: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Senior Teacher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newTeacherData.gender}
                    onChange={(e) =>
                      setNewTeacherData({
                        ...newTeacherData,
                        gender: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={newTeacherData.address}
                  onChange={(e) =>
                    setNewTeacherData({
                      ...newTeacherData,
                      address: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Dhaka, Bangladesh"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={newTeacherData.bio}
                  onChange={(e) =>
                    setNewTeacherData({
                      ...newTeacherData,
                      bio: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Short bio about the teacher..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={submittingTeacher}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FaSave size={14} />
                  {submittingTeacher ? "Adding..." : "Add Teacher"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
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

export default Teacher_assign;
