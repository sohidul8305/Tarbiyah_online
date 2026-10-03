// src/Page/Admin/Adminstudent_profile.jsx
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
  FaBell,
  FaCalendarAlt,
  FaBook,
  FaFileAlt,
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
  FaCalendarCheck,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaArrowRight,
  FaLayerGroup,
  FaStar,
  FaSave,
  FaUserEdit,
  FaUserCircle,
  FaAddressCard,
  FaGraduationCap,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

const Adminstudent_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("student-management");
  const [activeSubMenu, setActiveSubMenu] = useState("student-profile");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentsError, setStudentsError] = useState(null);
  const [sourceFilter, setSourceFilter] = useState("All");

  // ✅ Batch state
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("All");
  const [batchStudents, setBatchStudents] = useState([]);
  const [loadingBatchStudents, setLoadingBatchStudents] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPerformance, setFilterPerformance] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    class: "",
    subject: "",
    roll: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    gender: "Male",
    bloodGroup: "A+",
    religion: "Islam",
    nationality: "Bangladeshi",
    previousSchool: "",
    guardianContact: "",
    status: "Active",
    paymentStatus: "Unpaid",
    batch: "",
    attendance: 0,
    assignments: 0,
    quiz: 0,
    exam: 0,
    progress: 0,
    performance: "Pending",
  });

  // ============================================================
  // Load admin info
  // ============================================================
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
        department: "Administration",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ============================================================
  // ✅ Fetch all LMS batches
  // ============================================================
  const fetchBatches = async () => {
    try {
      const res = await fetch(`${API_BASE}/batches/all`);
      const data = await res.json();
      if (data.success) {
        setBatches(data.batches || []);
        console.log(`✅ Loaded ${data.batches?.length || 0} batches`);
      }
    } catch (err) {
      console.error("❌ fetchBatches error:", err);
    }
  };

  // ============================================================
  // ✅ Fetch students of a specific batch
  // ============================================================
  const fetchBatchStudents = async (batchId) => {
    if (!batchId || batchId === "All") {
      setBatchStudents([]);
      return;
    }

    try {
      setLoadingBatchStudents(true);
      const res = await fetch(
        `${API_BASE}/batch-students/all?batchId=${encodeURIComponent(batchId)}`,
      );
      const data = await res.json();

      if (data.success && Array.isArray(data.students)) {
        const mapped = data.students.map((s) => {
          const paid = (s.paidMonths || []).reduce(
            (sum, p) => sum + Number(p.amount || 0),
            0,
          );

          let status = "Active";
          if (s.paymentStatus === "Unpaid") status = "Pending";

          const batchInfo = batches.find((b) => b._id === s.batchId);

          return {
            id: s._id,
            _id: s._id,
            source: "Batch",
            sourceLabel: batchInfo?.name || "Batch Student",
            name: s.name || "Unknown",
            fatherName: "",
            motherName: "",
            class: s.course || batchInfo?.course || "N/A",
            subject: batchInfo?.course || "N/A",
            roll: "N/A",
            phone: "",
            email: "",
            address: "",
            dob: "",
            gender: "",
            bloodGroup: "",
            religion: "Islam",
            nationality: "Bangladeshi",
            previousSchool: "",
            guardianContact: "",
            status,
            paymentStatus: s.paymentStatus || "Unpaid",
            admissionDate: s.createdAt
              ? new Date(s.createdAt).toISOString().split("T")[0]
              : "N/A",
            batch: batchInfo?.name || "N/A",
            batchId: s.batchId,
            country: "BD",
            attendance: 0,
            assignments: 0,
            quiz: 0,
            exam: 0,
            progress: paid > 0 ? Math.min(100, paid) : 0,
            performance:
              paid >= 85
                ? "Excellent"
                : paid >= 70
                  ? "Good"
                  : paid >= 50
                    ? "Average"
                    : "Pending",
            course: s.course || batchInfo?.course || "",
            username: "",
            studentId: s.studentId || "",
            courseFee: 0,
            paidAmount: paid,
            dueAmount: 0,
            scholarshipAmount: 0,
            transactionId: "",
            comments: "",
            enrolledCourses: [],
            paidMonths: s.paidMonths || [],
            raw: s,
          };
        });

        setBatchStudents(mapped);
        console.log(
          `✅ Loaded ${mapped.length} students for batch: ${batchId}`,
        );
      } else {
        setBatchStudents([]);
      }
    } catch (err) {
      console.error("❌ fetchBatchStudents error:", err);
      setBatchStudents([]);
    } finally {
      setLoadingBatchStudents(false);
    }
  };

  // ============================================================
  // ✅ Fetch from 2 API endpoints (Tazweed + Najera)
  // ============================================================
  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      setStudentsError(null);

      const [tazweedRes, najeraRes] = await Promise.allSettled([
        fetch(`${API_BASE}/basic-tazweed/all`),
        fetch(`${API_BASE}/najera-batch/all`),
      ]);

      // ---------- 1) Basic Tazweed ----------
      let tazweedStudents = [];
      if (tazweedRes.status === "fulfilled") {
        try {
          const d = await tazweedRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            tazweedStudents = d.students.map((s) => {
              const progress =
                Number(s.paidAmount) > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (Number(s.paidAmount) /
                          Math.max(1, Number(s.courseFee))) *
                          100,
                      ),
                    )
                  : 0;

              let performance = "Pending";
              if (progress >= 85) performance = "Excellent";
              else if (progress >= 70) performance = "Good";
              else if (progress >= 50) performance = "Average";

              return {
                id: s._id,
                _id: s._id,
                source: "Tazweed",
                sourceLabel: "Basic Tazweed",
                name: s.name || "Unknown",
                fatherName: "",
                motherName: "",
                class: "Basic Tajweed (Level-1)",
                subject: "Basic Tajweed",
                roll: "N/A",
                phone: s.phone || "",
                email: "",
                address: "",
                dob: "",
                gender: "",
                bloodGroup: "",
                religion: "Islam",
                nationality: s.country === "BD" ? "Bangladeshi" : "",
                previousSchool: "",
                guardianContact: s.phone || "",
                status:
                  Number(s.dueAmount) === 0 && Number(s.paidAmount) > 0
                    ? "Active"
                    : "Pending",
                paymentStatus:
                  Number(s.dueAmount) === 0
                    ? "Paid"
                    : Number(s.paidAmount) > 0
                      ? "Partial"
                      : "Unpaid",
                admissionDate: s.createdAt
                  ? new Date(s.createdAt).toISOString().split("T")[0]
                  : "N/A",
                batch: "Basic Tazweed 6th Batch",
                country: s.country || "BD",
                attendance: 0,
                assignments: 0,
                quiz: 0,
                exam: 0,
                progress,
                performance,
                course: "Basic Tajweed (Level-1)",
                username: "",
                studentId: s.studentId || "",
                courseFee: Number(s.courseFee) || 0,
                paidAmount: Number(s.paidAmount) || 0,
                dueAmount: Number(s.dueAmount) || 0,
                scholarshipAmount: Number(s.scholarshipAmount) || 0,
                transactionId: s.transactionId || "",
                comments: s.comments || "",
                enrolledCourses: [],
                raw: s,
              };
            });
          }
        } catch (e) {
          console.error("Tazweed parse error:", e);
        }
      }

      // ---------- 2) Najera Batch ----------
      let najeraStudents = [];
      if (najeraRes.status === "fulfilled") {
        try {
          const d = await najeraRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            najeraStudents = d.students.map((s) => {
              const progress =
                Number(s.paidAmount) > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (Number(s.paidAmount) /
                          Math.max(1, Number(s.courseFee))) *
                          100,
                      ),
                    )
                  : 0;

              let performance = "Pending";
              if (progress >= 85) performance = "Excellent";
              else if (progress >= 70) performance = "Good";
              else if (progress >= 50) performance = "Average";

              return {
                id: s._id,
                _id: s._id,
                source: "Najera",
                sourceLabel: "Najera Batch",
                name: s.name || "Unknown",
                fatherName: "",
                motherName: "",
                class: "Quran Nazera",
                subject: "Quran Nazera",
                roll: "N/A",
                phone: s.phone || "",
                email: "",
                address: "",
                dob: "",
                gender: "",
                bloodGroup: "",
                religion: "Islam",
                nationality: s.country === "BD" ? "Bangladeshi" : "",
                previousSchool: "",
                guardianContact: s.phone || "",
                status:
                  Number(s.dueAmount) === 0 && Number(s.paidAmount) > 0
                    ? "Active"
                    : "Pending",
                paymentStatus:
                  Number(s.dueAmount) === 0
                    ? "Paid"
                    : Number(s.paidAmount) > 0
                      ? "Partial"
                      : "Unpaid",
                admissionDate: s.createdAt
                  ? new Date(s.createdAt).toISOString().split("T")[0]
                  : "N/A",
                batch: "Najera Batch-02",
                country: s.country || "BD",
                attendance: 0,
                assignments: 0,
                quiz: 0,
                exam: 0,
                progress,
                performance,
                course: "Quran Nazera",
                username: "",
                studentId: s.studentId || "",
                courseFee: Number(s.courseFee) || 0,
                paidAmount: Number(s.paidAmount) || 0,
                dueAmount: Number(s.dueAmount) || 0,
                scholarshipAmount: Number(s.scholarshipAmount) || 0,
                transactionId: s.transactionId || "",
                comments: s.comments || "",
                enrolledCourses: [],
                raw: s,
              };
            });
          }
        } catch (e) {
          console.error("Najera parse error:", e);
        }
      }

      const combined = [...tazweedStudents, ...najeraStudents].sort((a, b) => {
        const da = new Date(a.raw?.createdAt || 0).getTime();
        const db = new Date(b.raw?.createdAt || 0).getTime();
        return db - da;
      });

      console.log("════════════════════════════════");
      console.log(`✅ Loaded student profiles:`);
      console.log(`   - Tazweed: ${tazweedStudents.length}`);
      console.log(`   - Najera: ${najeraStudents.length}`);
      console.log(`   - Total: ${combined.length}`);
      console.log("════════════════════════════════");

      setStudents(combined);
    } catch (err) {
      console.error("❌ Fetch students error:", err);
      setStudentsError("সার্ভারে সংযোগ করা যায়নি!");
    } finally {
      setLoadingStudents(false);
    }
  };

  // ============================================================
  // Initial fetch + batch change listener
  // ============================================================
  useEffect(() => {
    fetchStudents();
    fetchBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedBatchId === "All") {
      setBatchStudents([]);
    } else {
      fetchBatchStudents(selectedBatchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBatchId]);

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
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  // ============================================================
  // Sidebar Menu Items
  // ============================================================
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

  // ============================================================
  // Filter logic
  // ============================================================
  const baseList =
    selectedBatchId === "All"
      ? students.filter((s) =>
          sourceFilter === "All" ? true : s.source === sourceFilter,
        )
      : batchStudents;

  const filteredStudents = baseList.filter((student) => {
    const matchesSearch =
      (student.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.fatherName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (student.class || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.studentId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (student.phone || "").includes(searchTerm);

    const matchesCourse =
      filterCourse === "All" || student.class === filterCourse;
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    const matchesPerformance =
      filterPerformance === "All" || student.performance === filterPerformance;

    return (
      matchesSearch && matchesCourse && matchesStatus && matchesPerformance
    );
  });

  const activeListForFilters =
    selectedBatchId === "All" ? students : batchStudents;

  const uniqueCourses = [
    "All",
    ...new Set(activeListForFilters.map((s) => s.class).filter(Boolean)),
  ];
  const uniquePerformances = [
    "All",
    ...new Set(activeListForFilters.map((s) => s.performance).filter(Boolean)),
  ];

  const sourceCounts = {
    All: students.length,
    Tazweed: students.filter((s) => s.source === "Tazweed").length,
    Najera: students.filter((s) => s.source === "Najera").length,
  };

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

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case "Tazweed":
        return "bg-green-100 text-green-700";
      case "Najera":
        return "bg-purple-100 text-purple-700";
      case "Batch":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openDetailsModal = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      fatherName: student.fatherName,
      motherName: student.motherName || "",
      class: student.class,
      subject: student.subject,
      roll: student.roll,
      phone: student.phone,
      email: student.email,
      address: student.address || "",
      dob: student.dob,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      religion: student.religion,
      nationality: student.nationality,
      previousSchool: student.previousSchool || "",
      guardianContact: student.guardianContact || "",
      status: student.status,
      paymentStatus: student.paymentStatus,
      batch: student.batch || "",
      attendance: student.attendance || 0,
      assignments: student.assignments || 0,
      quiz: student.quiz || 0,
      exam: student.exam || 0,
      progress: student.progress || 0,
      performance: student.performance || "Pending",
    });
    setShowEditModal(true);
  };

  const calculateProgress = (attendance, assignments, quiz, exam) => {
    return Math.round((attendance + assignments + quiz + exam) / 4);
  };

  const determinePerformance = (progress) => {
    if (progress >= 85) return "Excellent";
    if (progress >= 70) return "Good";
    if (progress >= 50) return "Average";
    return "Poor";
  };

  // ============================================================
  // Edit Student Handler
  // ============================================================
  const handleEditStudent = async (e) => {
    e.preventDefault();

    const attendance = Math.min(
      100,
      Math.max(0, Number(formData.attendance) || 0),
    );
    const assignments = Math.min(
      100,
      Math.max(0, Number(formData.assignments) || 0),
    );
    const quiz = Math.min(100, Math.max(0, Number(formData.quiz) || 0));
    const exam = Math.min(100, Math.max(0, Number(formData.exam) || 0));
    const progress = calculateProgress(attendance, assignments, quiz, exam);
    const performance = determinePerformance(progress);

    // ✅ Source অনুযায়ী সঠিক endpoint
    let updateUrl = `${API_BASE}/basic-tazweed/update/${selectedStudent._id}`;
    if (selectedStudent.source === "Najera") {
      updateUrl = `${API_BASE}/najera-batch/update/${selectedStudent._id}`;
    } else if (selectedStudent.source === "Batch") {
      updateUrl = `${API_BASE}/batch-students/update/${selectedStudent._id}`;
    }

    try {
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          attendance,
          assignments,
          quiz,
          exam,
          progress,
          performance,
        }),
      });
      const data = await res.json();

      if (data.success) {
        if (selectedStudent.source === "Batch") {
          await fetchBatchStudents(selectedBatchId);
        } else {
          setStudents(
            students.map((s) =>
              s.id === selectedStudent.id
                ? {
                    ...s,
                    ...formData,
                    attendance,
                    assignments,
                    quiz,
                    exam,
                    progress,
                    performance,
                  }
                : s,
            ),
          );
        }
        setShowEditModal(false);
        Swal.fire({
          icon: "success",
          title: "Student Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not update",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    }
  };

  // ============================================================
  // Delete Student Handler
  // ============================================================
  const handleDeleteStudent = async (id, name, source) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    // ✅ Source অনুযায়ী সঠিক endpoint
    let deleteUrl = `${API_BASE}/basic-tazweed/delete/${id}`;
    if (source === "Najera") {
      deleteUrl = `${API_BASE}/najera-batch/delete/${id}`;
    } else if (source === "Batch") {
      deleteUrl = `${API_BASE}/batch-students/delete/${id}`;
    }

    try {
      const res = await fetch(deleteUrl, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        if (source === "Batch") {
          await fetchBatchStudents(selectedBatchId);
        } else {
          setStudents(students.filter((s) => s.id !== id));
        }
        Swal.fire("Deleted!", "Student removed.", "success");
      } else {
        Swal.fire("Error!", data.message || "Failed to delete.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error!", "Server connection failed.", "error");
    }
  };

  const renderStars = (performance) => {
    let stars = 0;
    switch (performance) {
      case "Excellent":
        stars = 5;
        break;
      case "Good":
        stars = 4;
        break;
      case "Average":
        stars = 3;
        break;
      case "Poor":
        stars = 2;
        break;
      default:
        stars = 0;
    }
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < stars ? "text-yellow-400" : "text-gray-300"}
            size={14}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Student Profiles</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 ease-in-out
            h-full overflow-hidden flex-shrink-0
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
                      className={`
                        w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }
                      `}
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
                              setActiveSubMenu(item.id);
                              setIsSidebarOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d] transition-all"
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
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                        ${
                          activeMenu === item.id
                            ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                        }
                      `}
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
            <p>Tarbiyah Online Madrasha</p>
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
                <FaUserGraduate className="text-blue-600" /> Student Profiles —
                <span className="text-teal-700">All Sources</span>
              </h1>
              <p className="text-xs text-gray-500">
                {selectedBatchId === "All"
                  ? `Basic Tazweed + Najera Batch (${students.length} total)`
                  : `${batches.find((b) => b._id === selectedBatchId)?.name || "Batch"} (${batchStudents.length} students)`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  fetchStudents();
                  fetchBatches();
                  if (selectedBatchId !== "All") {
                    fetchBatchStudents(selectedBatchId);
                  }
                }}
                disabled={loadingStudents}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50"
                title="Refresh"
              >
                <FaSyncAlt
                  size={12}
                  className={loadingStudents ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>

              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Loading / Error */}
          {loadingStudents ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-3">
                Loading student profiles...
              </p>
            </div>
          ) : studentsError ? (
            <div className="bg-white border border-red-200 rounded-xl shadow-sm p-8 text-center">
              <p className="text-red-500 font-bold text-lg mb-2">⚠️ Error</p>
              <p className="text-gray-600 text-sm mb-4">{studentsError}</p>
              <button
                onClick={fetchStudents}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {/* ✅ Batch Selector */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <FaLayerGroup className="text-teal-600" />
                  <label className="text-xs font-bold text-gray-700">
                    Filter by Batch:
                  </label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => {
                      setSelectedBatchId(e.target.value);
                      setSourceFilter("All");
                      setFilterCourse("All");
                      setFilterStatus("All");
                      setFilterPerformance("All");
                    }}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-teal-500 max-w-full"
                  >
                    <option value="All">🌐 All Batches (All Sources)</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>
                        📚 {b.name} — {b.course} ({b.students || 0} students)
                      </option>
                    ))}
                  </select>

                  {selectedBatchId !== "All" && (
                    <>
                      <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-semibold">
                        Showing: {batchStudents.length} students
                      </span>
                      {loadingBatchStudents && (
                        <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                          <FaSyncAlt size={10} className="animate-spin" />{" "}
                          Loading...
                        </span>
                      )}
                      <button
                        onClick={() => setSelectedBatchId("All")}
                        className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-semibold ml-auto"
                      >
                        ✕ Clear Filter
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Source Tabs — disabled when batch selected */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-1.5 mb-3 flex gap-1 overflow-x-auto">
                {[
                  { id: "All", label: "All Students", color: "blue" },
                  { id: "Tazweed", label: "Basic Tazweed", color: "green" },
                  { id: "Najera", label: "Najera Batch", color: "purple" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSourceFilter(tab.id);
                      setSelectedBatchId("All");
                    }}
                    disabled={selectedBatchId !== "All"}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedBatchId !== "All"
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    } ${
                      sourceFilter === tab.id && selectedBatchId === "All"
                        ? tab.color === "blue"
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : tab.color === "green"
                            ? "bg-green-50 text-green-700 shadow-sm"
                            : "bg-purple-50 text-purple-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`text-[10px] px-1.5 rounded-full ${
                        sourceFilter === tab.id && selectedBatchId === "All"
                          ? "bg-white text-gray-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {sourceCounts[tab.id]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {selectedBatchId === "All"
                      ? sourceCounts[sourceFilter]
                      : batchStudents.length}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {selectedBatchId === "All"
                      ? sourceFilter === "All"
                        ? "Total"
                        : sourceFilter
                      : "Batch Students"}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-green-600">
                    {
                      filteredStudents.filter((s) => s.status === "Active")
                        .length
                    }
                  </p>
                  <p className="text-[10px] text-gray-500">Active</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-yellow-600">
                    {
                      filteredStudents.filter((s) => s.status === "Pending")
                        .length
                    }
                  </p>
                  <p className="text-[10px] text-gray-500">Pending</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-purple-600">
                    {
                      filteredStudents.filter(
                        (s) => s.performance === "Excellent",
                      ).length
                    }
                  </p>
                  <p className="text-[10px] text-gray-500">Excellent</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search name, class, studentId, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <select
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg max-w-[180px]"
                    >
                      {uniqueCourses.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                    >
                      <option value="All">Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <select
                      value={filterPerformance}
                      onChange={(e) => setFilterPerformance(e.target.value)}
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                    >
                      {uniquePerformances.map((perf) => (
                        <option key={perf} value={perf}>
                          {perf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Students Grid */}
              {loadingBatchStudents && selectedBatchId !== "All" ? (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-3">
                    Loading batch students...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      <div
                        className={`h-1 ${
                          student.status === "Active"
                            ? "bg-green-500"
                            : student.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div className="p-3">
                        <div className="flex items-start gap-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-xs truncate">
                              {student.name}
                            </h3>
                            <p className="text-[10px] text-gray-500 truncate">
                              {student.class}
                            </p>
                            {student.studentId && (
                              <p className="text-[9px] text-blue-600 font-mono truncate">
                                ID: {student.studentId}
                              </p>
                            )}
                            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                              <span
                                className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold ${getSourceBadge(
                                  student.source,
                                )}`}
                              >
                                {student.sourceLabel}
                              </span>
                              <span
                                className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(student.status)}`}
                              >
                                {student.status}
                              </span>
                              <span
                                className={`text-[8px] px-1.5 py-0.5 rounded-full ${getPerformanceColor(student.performance)}`}
                              >
                                {student.performance}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-1.5 grid grid-cols-3 gap-1 text-center">
                          <div className="bg-gray-50 rounded-lg p-1">
                            <p className="text-[10px] font-bold text-green-600">
                              ৳{student.paidAmount?.toLocaleString() || 0}
                            </p>
                            <p className="text-[8px] text-gray-500">Paid</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-1">
                            <p className="text-[10px] font-bold text-red-600">
                              ৳{student.dueAmount?.toLocaleString() || 0}
                            </p>
                            <p className="text-[8px] text-gray-500">Due</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-1">
                            <p className="text-[10px] font-bold text-blue-600">
                              {student.progress}%
                            </p>
                            <p className="text-[8px] text-gray-500">Progress</p>
                          </div>
                        </div>

                        <div className="mt-1.5">
                          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                          <button
                            onClick={() => openDetailsModal(student)}
                            className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => openEditModal(student)}
                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                            title="Edit"
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteStudent(
                                student.id,
                                student.name,
                                student.source,
                              )
                            }
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredStudents.length === 0 &&
                !loadingBatchStudents &&
                (selectedBatchId === "All"
                  ? students.length > 0
                  : batchStudents.length > 0) && (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
                    <FaUserGraduate className="text-5xl text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-800 mb-0.5">
                      No Matching Students
                    </h3>
                    <p className="text-xs text-gray-500">
                      Try adjusting filters or search
                    </p>
                  </div>
                )}

              {filteredStudents.length === 0 &&
                !loadingBatchStudents &&
                (selectedBatchId === "All"
                  ? students.length === 0
                  : batchStudents.length === 0) && (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
                    <FaUserGraduate className="text-5xl text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-800 mb-0.5">
                      No Students Found
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedBatchId === "All"
                        ? "Basic Tazweed বা Najera Batch থেকে student add করুন।"
                        : "এই batch এ এখনো কোনো student add করা হয়নি।"}
                    </p>
                  </div>
                )}
            </>
          )}
        </main>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserCircle className="text-blue-600" /> Student Profile
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
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {selectedStudent.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${getSourceBadge(
                        selectedStudent.source,
                      )}`}
                    >
                      {selectedStudent.sourceLabel}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedStudent.status)}`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.class}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 justify-center md:justify-start">
                    {selectedStudent.studentId && (
                      <span>🆔 {selectedStudent.studentId}</span>
                    )}
                    {selectedStudent.phone && (
                      <span>📱 {selectedStudent.phone}</span>
                    )}
                    {selectedStudent.email && (
                      <span>📧 {selectedStudent.email}</span>
                    )}
                    {selectedStudent.batch && (
                      <span>📚 {selectedStudent.batch}</span>
                    )}
                  </div>
                  <div className="mt-2 flex justify-center md:justify-start">
                    {renderStars(selectedStudent.performance)}
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
                      <span className="text-gray-500">Father's Name</span>
                      <span className="font-semibold">
                        {selectedStudent.fatherName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mother's Name</span>
                      <span className="font-semibold">
                        {selectedStudent.motherName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-semibold">
                        {selectedStudent.gender || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">NID/DOB</span>
                      <span className="font-semibold">
                        {selectedStudent.dob || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Country</span>
                      <span className="font-semibold">
                        {selectedStudent.country || "BD"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaGraduationCap className="text-green-500" /> Academic &
                    Contact
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Admission Date</span>
                      <span className="font-semibold">
                        {selectedStudent.admissionDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guardian Phone</span>
                      <span className="font-semibold">
                        {selectedStudent.guardianContact || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-semibold text-right max-w-[60%]">
                        {selectedStudent.address || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status</span>
                      <span
                        className={`font-semibold ${
                          selectedStudent.paymentStatus === "Paid"
                            ? "text-green-600"
                            : selectedStudent.paymentStatus === "Partial"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {selectedStudent.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Course</span>
                      <span className="font-semibold text-xs text-right max-w-[60%]">
                        {selectedStudent.course || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 text-xs mb-2">
                      💰 Payment Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course Fee</span>
                        <span className="font-semibold">
                          ৳{selectedStudent.courseFee?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Paid</span>
                        <span className="font-semibold text-green-600">
                          ৳{selectedStudent.paidAmount?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Due</span>
                        <span className="font-semibold text-red-600">
                          ৳{selectedStudent.dueAmount?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scholarship</span>
                        <span className="font-semibold text-blue-600">
                          ৳
                          {selectedStudent.scholarshipAmount?.toLocaleString() ||
                            0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  Overall Progress
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getProgressColor(selectedStudent.progress)}`}
                      style={{ width: `${selectedStudent.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold">
                    {selectedStudent.progress}%
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedStudent);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit Profile
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

      {/* Edit Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserEdit className="text-green-600" /> Edit Student
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) =>
                      setFormData({ ...formData, fatherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class / Course
                  </label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
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
    </div>
  );
};

export default Adminstudent_profile;
