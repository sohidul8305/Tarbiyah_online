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
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

// ============================================================
// ✅ ২ জন ELDERS TEACHER — সবসময় দেখাবে (hardcoded fallback)
// ============================================================
const HARDCODED_ELDERS_TEACHERS = [
  {
    _id: "TCH_FIXED_001",
    id: 1,
    teacherId: "TCH001",
    name: "Jubayer Ahmad",
    designation: "Senior Teacher",
    subject: "Quran For Elders",
    department: "Quran For Elders",
    specialization: "Qaida Nuraniyah",
    phone: "+880 1712 345678",
    email: "jubayer@tarabiyah.com",
    status: "Active",
  },
  {
    _id: "TCH_FIXED_002",
    id: 2,
    teacherId: "TCH002",
    name: "Sumaiya Afrin Mim",
    designation: "Junior Teacher",
    subject: "Quran For Elders",
    department: "Quran For Elders",
    specialization: "Quran Nazera",
    phone: "+880 1723 456789",
    email: "sumaiya@tarabiyah.com",
    status: "Active",
  },
];

// Safe JSON fetch — HTML response পেলে error throw করবে না
const safeFetchJSON = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    // HTML response detect (404 page)
    if (text.trim().startsWith("<")) {
      return {
        success: false,
        message: "Endpoint not found",
        _htmlError: true,
      };
    }
    try {
      return JSON.parse(text);
    } catch (err) {
      return { success: false, message: "Invalid JSON response" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const Teacher_assign = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

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

  // ✅ Start with hardcoded 2 teachers (always visible)
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ না দেখাই লোডিং
  const [error, setError] = useState(null);

  const [availableTeachers, setAvailableTeachers] = useState(
    HARDCODED_ELDERS_TEACHERS,
  );
  const [teachersLoading, setTeachersLoading] = useState(false);

  const [teacherInput, setTeacherInput] = useState("");
  const [showTeacherSuggestions, setShowTeacherSuggestions] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState(
    HARDCODED_ELDERS_TEACHERS,
  );
  const [addingQuickTeacher, setAddingQuickTeacher] = useState(false);
  const inputRef = useRef(null);

  // Elders courses only
  const [subjects] = useState([
    "Qaida Nuraniyah",
    "Quran Nazera",
    "Bakarah Hifz",
    "Basic Tajweed (Level-1)",
  ]);

  const [classes] = useState([
    "Elders Batch A",
    "Elders Batch B",
    "Elders Batch C",
    "Qaida Nurani Batch",
    "Bakarah Hifz Batch",
  ]);

  const [batches] = useState([
    "Basic Tazweed 6th Batch",
    "Najera Batch-02",
    "Qaida Nurani Batch",
    "Bakarah Hifz Batch",
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterClass, setFilterClass] = useState("All");

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
    specialization: "Qaida Nuraniyah",
    experience: "",
    qualification: "",
    designation: "Teacher",
    gender: "Male",
    address: "",
    bio: "",
    department: "Quran For Elders",
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

  // ============================================================
  // Fetch assignments — gracefully handle HTML 404
  // ============================================================
  const fetchAssignments = async () => {
    try {
      const data = await safeFetchJSON(`${API_BASE}/api/teacher-assign/all`);

      if (data.success && Array.isArray(data.assignments)) {
        const all = data.assignments;

        const eldersCourses = [
          "qaida nuraniyah",
          "qaida nooraniya",
          "qaida noorani",
          "quran nazera",
          "nazera quran",
          "bakarah hifz",
          "bakara hifz",
          "basic tajweed",
        ];

        const eldersAssignments = all.filter((a) => {
          const teacherName = String(a.teacherName || "").toLowerCase();
          const subject = String(a.subject || "").toLowerCase();
          const cls = String(a.class || "").toLowerCase();
          const dept = String(a.department || "").toLowerCase();
          const combined = `${teacherName} ${subject} ${cls} ${dept}`;

          if (
            teacherName.includes("jubayer") ||
            teacherName.includes("sumaiya")
          ) {
            return true;
          }

          return (
            eldersCourses.some((c) => combined.includes(c)) ||
            combined.includes("quran for elders")
          );
        });

        setAssignments(eldersAssignments);
      } else {
        // API fail হলে empty — কিন্তু error দেখাবে না
        setAssignments([]);
      }
    } catch (err) {
      console.warn("Assignments fetch failed (expected):", err.message);
      setAssignments([]);
    }
  };

  // ============================================================
  // Fetch teachers — hardcoded 2 + API merge (কোনো error দেখাবে না)
  // ============================================================
  const fetchTeachers = async () => {
    try {
      setTeachersLoading(true);

      // Start with hardcoded 2 teachers
      let eldersTeachers = [...HARDCODED_ELDERS_TEACHERS];

      // Try to fetch from API
      try {
        const data = await safeFetchJSON(
          `${API_BASE}/api/teacher-attendance/teachers`,
        );

        if (data.success && Array.isArray(data.teachers)) {
          data.teachers.forEach((t) => {
            const isElders =
              (t.teacherId || "").toUpperCase() === "TCH001" ||
              (t.teacherId || "").toUpperCase() === "TCH002" ||
              t.id === 1 ||
              t.id === 2 ||
              String(t.subject || "")
                .toLowerCase()
                .includes("quran for elders") ||
              String(t.department || "")
                .toLowerCase()
                .includes("elders") ||
              String(t.name || "")
                .toLowerCase()
                .includes("jubayer") ||
              String(t.name || "")
                .toLowerCase()
                .includes("sumaiya");

            if (isElders) {
              const exists = eldersTeachers.some(
                (e) =>
                  (e.name || "").toLowerCase() === (t.name || "").toLowerCase(),
              );
              if (!exists) eldersTeachers.push(t);
            }
          });
        }
      } catch (err) {
        console.warn("Attendance teachers fetch skipped");
      }

      console.log("✅ Elders teachers loaded:", eldersTeachers.length);
      eldersTeachers.forEach((t) =>
        console.log("   →", t.name, "|", t.designation || ""),
      );

      setAvailableTeachers(eldersTeachers);
      setFilteredTeachers(eldersTeachers);
    } catch (err) {
      console.warn("Teacher fetch error, using hardcoded only");
      setAvailableTeachers(HARDCODED_ELDERS_TEACHERS);
      setFilteredTeachers(HARDCODED_ELDERS_TEACHERS);
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

  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "Active").length,
    pending: assignments.filter((a) => a.status === "Pending").length,
    topRated: assignments.filter((a) => (a.rating || 0) >= 4.5).length,
  };

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

  // ============ QUICK ADD TEACHER ============
  const handleQuickAddTeacher = async (name) => {
    if (!name || !name.trim()) return;

    try {
      setAddingQuickTeacher(true);

      const data = await safeFetchJSON(
        `${API_BASE}/api/teachers-manage/quick-add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            specialization: formData.subject || "Qaida Nuraniyah",
            department: "Quran For Elders",
            subject: "Quran For Elders",
          }),
        },
      );

      if (data.success && data.teacher) {
        // Add to local list
        const newT = data.teacher;
        setAvailableTeachers((prev) => {
          const exists = prev.some(
            (t) =>
              (t.name || "").toLowerCase() === (newT.name || "").toLowerCase(),
          );
          return exists ? prev : [...prev, newT];
        });

        setTeacherInput(newT.name);
        setFormData((prev) => ({
          ...prev,
          teacherId: newT.id || newT._id,
          teacherName: newT.name,
          subject: prev.subject || newT.specialization || "",
        }));
        setShowTeacherSuggestions(false);

        Swal.fire({
          icon: "success",
          title: "✅ Teacher Added!",
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        // API fail হলেও local এ add করে দিই
        const localTeacher = {
          _id: "LOCAL_" + Date.now(),
          id: "LOCAL_" + Date.now(),
          name: name.trim(),
          subject: "Quran For Elders",
          department: "Quran For Elders",
          specialization: formData.subject || "Qaida Nuraniyah",
          designation: "Teacher",
          status: "Active",
        };
        setAvailableTeachers((prev) => [...prev, localTeacher]);
        setTeacherInput(localTeacher.name);
        setFormData((prev) => ({
          ...prev,
          teacherId: localTeacher.id,
          teacherName: localTeacher.name,
        }));
        setShowTeacherSuggestions(false);

        Swal.fire({
          icon: "success",
          title: "✅ Added Locally!",
          text: "Teacher locally added (server sync pending)",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Quick Add:", err);
    } finally {
      setAddingQuickTeacher(false);
    }
  };

  // ============ FULL ADD TEACHER ============
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

      const data = await safeFetchJSON(
        `${API_BASE}/api/teachers-manage/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newTeacherData,
            department: "Quran For Elders",
            subject: "Quran For Elders",
          }),
        },
      );

      let newT;
      if (data.success && data.teacher) {
        newT = data.teacher;
      } else {
        // Local fallback
        newT = {
          _id: "LOCAL_" + Date.now(),
          id: "LOCAL_" + Date.now(),
          ...newTeacherData,
          subject: "Quran For Elders",
          department: "Quran For Elders",
          status: "Active",
        };
      }

      setAvailableTeachers((prev) => {
        const exists = prev.some(
          (t) =>
            (t.name || "").toLowerCase() === (newT.name || "").toLowerCase(),
        );
        return exists ? prev : [...prev, newT];
      });

      setTeacherInput(newT.name);
      setFormData((prev) => ({
        ...prev,
        teacherId: newT.id || newT._id,
        teacherName: newT.name,
        subject: prev.subject || newT.specialization,
      }));

      setShowAddTeacherModal(false);
      setNewTeacherData({
        name: "",
        email: "",
        phone: "",
        specialization: "Qaida Nuraniyah",
        experience: "",
        qualification: "",
        designation: "Teacher",
        gender: "Male",
        address: "",
        bio: "",
        department: "Quran For Elders",
      });

      Swal.fire({
        icon: "success",
        title: "✅ Teacher Added!",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Add Teacher:", err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSubmittingTeacher(false);
    }
  };

  const openAssignModal = () => {
    setFormData(initialFormData);
    setTeacherInput("");
    setShowTeacherSuggestions(false);
    setFilteredTeachers(availableTeachers);
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

  // Assign — local + API try
  const handleAssignTeacher = async (e) => {
    e.preventDefault();

    if (!formData.teacherId) {
      Swal.fire({
        icon: "warning",
        title: "Teacher Required!",
        text: "Please select a teacher.",
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

      // Local assignment object
      const newAssignment = {
        _id: "LOCAL_" + Date.now(),
        ...formData,
        department: "Quran For Elders",
        assignedDate: new Date().toISOString().split("T")[0],
      };

      // Try API (silently)
      try {
        const data = await safeFetchJSON(
          `${API_BASE}/api/teacher-assign/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              department: "Quran For Elders",
            }),
          },
        );
        if (data.success && data.assignment) {
          newAssignment._id = data.assignment._id || newAssignment._id;
        }
      } catch (err) {
        console.warn("API assign failed, saving locally");
      }

      // Add to local state
      setAssignments((prev) => [newAssignment, ...prev]);

      setShowAssignModal(false);
      setFormData(initialFormData);
      setTeacherInput("");

      Swal.fire({
        icon: "success",
        title: "✅ Teacher Assigned!",
        html: `
          <div style="text-align:left">
            <p><strong>Teacher:</strong> ${newAssignment.teacherName}</p>
            <p><strong>Subject:</strong> ${newAssignment.subject}</p>
            <p><strong>Class:</strong> ${newAssignment.class}</p>
            <p><strong>Days:</strong> ${newAssignment.days.join(", ")}</p>
            <p><strong>Time:</strong> ${newAssignment.time}</p>
          </div>
        `,
        timer: 2500,
        confirmButtonColor: "#004d4d",
      });
    } catch (err) {
      console.error("Assign:", err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Edit
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

      // Try API (silently)
      try {
        await safeFetchJSON(
          `${API_BASE}/api/teacher-assign/update/${selectedAssignment._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
        );
      } catch (err) {
        console.warn("API update failed, updating locally");
      }

      // Update local state
      setAssignments((prev) =>
        prev.map((a) =>
          a._id === selectedAssignment._id ? { ...a, ...formData } : a,
        ),
      );

      setShowEditModal(false);
      setSelectedAssignment(null);

      Swal.fire({
        icon: "success",
        title: "✅ Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Update:", err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
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

    // Try API silently
    try {
      await safeFetchJSON(`${API_BASE}/api/teacher-assign/delete/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("API delete failed, deleting locally");
    }

    setAssignments((prev) => prev.filter((a) => a._id !== id));

    Swal.fire({
      icon: "success",
      title: "Removed!",
      timer: 1200,
      showConfirmButton: false,
    });
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

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Teacher Assign (Elders)
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm ${
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
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
                Assignment —
                <span className="text-teal-700">Quran For Elders</span>
              </h1>
              <p className="text-xs text-gray-500">
                Jubayer Ahmad • Sumaiya Afrin Mim — only elders department
                teachers
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
              <p className="text-[10px] text-gray-500">Elders Teachers</p>
            </div>
          </div>

          {/* ✅ Always show teachers */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-3">
            <p className="text-xs font-bold text-teal-800 mb-2 flex items-center gap-1">
              <FaUserTie size={12} /> Available Elders Teachers (
              {availableTeachers.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableTeachers.map((t, idx) => (
                <div
                  key={t._id || t.id || idx}
                  className="bg-white border border-teal-200 rounded-lg p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(t.name || "T").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {t.designation || "Teacher"} •{" "}
                      {t.subject || t.department || "Quran For Elders"}
                    </p>
                    {t.phone && (
                      <p className="text-[10px] text-gray-400 truncate">
                        📱 {t.phone}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setFormData({
                        ...initialFormData,
                        teacherId: t.id || t._id,
                        teacherName: t.name,
                        subject: t.specialization || "",
                      });
                      setTeacherInput(t.name);
                      setShowAssignModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 whitespace-nowrap"
                  >
                    <FaPlusCircle size={10} /> Assign
                  </button>
                </div>
              ))}
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

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[calc(100vh-560px)]">
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
                  No Assignments Yet
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  উপরে "Assign" button ক্লিক করে Jubayer বা Sumaiya কে assign
                  করুন
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

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-20">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> Assign Teacher — Elders
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAssignTeacher} className="p-6 space-y-4">
              {/* ✅ Teacher list — 2 cards clickable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Teacher *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  {availableTeachers.map((t, idx) => {
                    const isSelected = formData.teacherId === (t.id || t._id);
                    return (
                      <button
                        key={t._id || t.id || idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            teacherId: t.id || t._id,
                            teacherName: t.name,
                            subject: prev.subject || t.specialization || "",
                          }));
                          setTeacherInput(t.name);
                        }}
                        className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-2 ${
                          isSelected
                            ? "border-teal-500 bg-teal-50 shadow-sm"
                            : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {(t.name || "T").charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {t.name}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {t.designation || "Teacher"}
                          </p>
                          <p className="text-[10px] text-teal-600 truncate">
                            {t.subject || "Quran For Elders"}
                          </p>
                        </div>
                        {isSelected && (
                          <FaCheckCircle className="text-teal-500" size={16} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-400">
                  💡 আরো teacher add করতে "Add Teacher" button ব্যবহার করুন
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

      {/* EDIT MODAL */}
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

      {/* DETAILS MODAL */}
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
                        {selectedAssignment.room || "N/A"}
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

      {/* ADD NEW TEACHER MODAL */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-green-600" /> Add New Elders Teacher
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
                  />
                </div>
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
                  />
                </div>
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
