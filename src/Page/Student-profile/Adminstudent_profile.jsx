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
  FaClock,
  FaBook,
  FaFileAlt,
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
  FaClipboardList,
  FaCalendarCheck,
  FaIdCard,
  FaUsersCog,
  FaUserTimes,
  FaDollarSign,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaCertificate,
  FaDatabase,
  FaUserCog,
  FaListAlt,
  FaClock as FaClockIcon,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaDownload,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaHome,
  FaCog,
  FaBars,
  FaLayerGroup,
  FaSchool,
  FaBookOpen,
  FaRoute,
  FaCalendarPlus,
  FaBuilding,
  FaUniversity,
  FaGraduationCap,
  FaGlobe,
  FaVideo,
  FaLink,
  FaWallet,
  FaCreditCard,
  FaHistory,
  FaFileInvoice as FaFileInvoiceIcon,
  FaReceipt,
  FaEnvelope,
  FaPaperPlane,
  FaExclamationTriangle,
  FaInfoCircle,
  FaThumbsUp,
  FaStar,
  FaComment,
  FaUserTag,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTransgender,
  FaSave,
  FaUndo,
  FaUpload,
  FaCamera,
  FaUsersCog as FaUsersCogIcon,
  FaUserCheck,
  FaUserMinus,
  FaToggleOn,
  FaToggleOff,
  FaUserEdit,
  FaUserCircle,
  FaAddressCard,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Adminstudent_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Hasan",
      fatherName: "Abdul Hasan",
      motherName: "Fatima Hasan",
      class: "Class 8",
      subject: "Tajweed",
      roll: "01",
      phone: "+880 1712 345678",
      email: "ahmed@example.com",
      address: "Mohammadpur, Dhaka",
      dob: "2010-05-15",
      gender: "Male",
      bloodGroup: "A+",
      religion: "Islam",
      nationality: "Bangladeshi",
      previousSchool: "Mohammadpur High School",
      guardianContact: "+880 1812 345678",
      status: "Active",
      paymentStatus: "Paid",
      admissionDate: "2026-01-15",
      batch: "Batch 2026-A",
      attendance: 92,
      assignments: 85,
      quiz: 78,
      exam: 88,
      progress: 85,
      performance: "Excellent",
      photo: null,
    },
    {
      id: 2,
      name: "Fatima Begum",
      fatherName: "Mohammad Ali",
      motherName: "Aisha Ali",
      class: "Class 9",
      subject: "Tafsir",
      roll: "02",
      phone: "+880 1723 456789",
      email: "fatima@example.com",
      address: "Mirpur, Dhaka",
      dob: "2009-08-20",
      gender: "Female",
      bloodGroup: "B+",
      religion: "Islam",
      nationality: "Bangladeshi",
      previousSchool: "Mirpur Girls School",
      guardianContact: "+880 1823 456789",
      status: "Active",
      paymentStatus: "Paid",
      admissionDate: "2026-02-01",
      batch: "Batch 2026-B",
      attendance: 88,
      assignments: 90,
      quiz: 82,
      exam: 91,
      progress: 87,
      performance: "Excellent",
      photo: null,
    },
    {
      id: 3,
      name: "Mohammad Ali",
      fatherName: "Karim Ali",
      motherName: "Rokeya Ali",
      class: "Class 10",
      subject: "Hadith",
      roll: "05",
      phone: "+880 1734 567890",
      email: "ali@example.com",
      address: "Uttara, Dhaka",
      dob: "2008-03-10",
      gender: "Male",
      bloodGroup: "O+",
      religion: "Islam",
      nationality: "Bangladeshi",
      previousSchool: "Uttara High School",
      guardianContact: "+880 1834 567890",
      status: "Pending",
      paymentStatus: "Partial",
      admissionDate: "2026-07-20",
      batch: "-",
      attendance: 0,
      assignments: 0,
      quiz: 0,
      exam: 0,
      progress: 0,
      performance: "Pending",
      photo: null,
    },
    {
      id: 4,
      name: "Aisha Rahman",
      fatherName: "Rahman Khan",
      motherName: "Shahida Khan",
      class: "Class 7",
      subject: "Fiqh",
      roll: "06",
      phone: "+880 1745 678901",
      email: "aisha@example.com",
      address: "Gulshan, Dhaka",
      dob: "2011-11-05",
      gender: "Female",
      bloodGroup: "AB+",
      religion: "Islam",
      nationality: "Bangladeshi",
      previousSchool: "Gulshan Model School",
      guardianContact: "+880 1845 678901",
      status: "Active",
      paymentStatus: "Paid",
      admissionDate: "2026-03-01",
      batch: "Batch 2026-D",
      attendance: 95,
      assignments: 88,
      quiz: 85,
      exam: 90,
      progress: 89,
      performance: "Excellent",
      photo: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPerformance, setFilterPerformance] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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
    photo: null,
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubMenu = (menu) => {
    if (activeSubMenu === menu) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(menu);
    }
  };

  // Sidebar Menu Items
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
          id: "payment-overview",
          path: "/admin-dashboard/payment-overview",
          label: "Payment Overview",
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

  // Handle search and filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "All" || student.class === filterClass;
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    const matchesPerformance =
      filterPerformance === "All" || student.performance === filterPerformance;
    return matchesSearch && matchesClass && matchesStatus && matchesPerformance;
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(students.map((s) => s.class))];
  const uniquePerformances = [
    "All",
    ...new Set(students.map((s) => s.performance)),
  ];

  // Get status badge color
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

  // Get performance badge color
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

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Open details modal
  const openDetailsModal = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Open edit modal
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
      photo: null,
    });
    setShowEditModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
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
      photo: null,
    });
    setShowAddModal(true);
  };

  // Calculate progress based on attendance, assignments, quiz, exam
  const calculateProgress = (attendance, assignments, quiz, exam) => {
    const total = (attendance + assignments + quiz + exam) / 4;
    return Math.round(total);
  };

  // Determine performance based on progress
  const determinePerformance = (progress) => {
    if (progress >= 85) return "Excellent";
    if (progress >= 70) return "Good";
    if (progress >= 50) return "Average";
    return "Poor";
  };

  // Handle add student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.fatherName ||
      !formData.class ||
      !formData.subject ||
      !formData.phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    // Validate performance fields (0-100)
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

    // Calculate progress
    const progress = calculateProgress(attendance, assignments, quiz, exam);
    const performance = determinePerformance(progress);

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      fatherName: formData.fatherName,
      motherName: formData.motherName || "",
      class: formData.class,
      subject: formData.subject,
      roll: formData.roll || "N/A",
      phone: formData.phone,
      email: formData.email || "",
      address: formData.address || "",
      dob: formData.dob || "",
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      religion: formData.religion,
      nationality: formData.nationality,
      previousSchool: formData.previousSchool || "",
      guardianContact: formData.guardianContact || "",
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      admissionDate: new Date().toISOString().split("T")[0],
      batch: formData.batch || "Not Assigned",
      attendance: attendance,
      assignments: assignments,
      quiz: quiz,
      exam: exam,
      progress: progress,
      performance: performance,
      photo: null,
    };

    setStudents([...students, newStudent]);
    setShowAddModal(false);
    Swal.fire({
      icon: "success",
      title: "Student Added Successfully!",
      text: `${formData.name} has been added to the system.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit student
  const handleEditStudent = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.fatherName ||
      !formData.class ||
      !formData.subject
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    // Validate and calculate for edit as well
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

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              ...formData,
              attendance: attendance,
              assignments: assignments,
              quiz: quiz,
              exam: exam,
              progress: progress,
              performance: performance,
            }
          : s,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Student Updated!",
      text: "Student profile has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete student
  const handleDeleteStudent = (id) => {
    Swal.fire({
      title: "Delete Student?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents(students.filter((s) => s.id !== id));
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      }
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  // Render stars for performance
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
          <h1 className="text-sm font-bold text-gray-800">Student Profile</h1>
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
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-full
            overflow-hidden
            flex-shrink-0
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

          <nav className="p-3 space-y-1 overflow-hidden h-[calc(100vh-180px)]">
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
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserGraduate className="text-blue-600" /> Student Profiles
              </h1>
              <p className="text-xs text-gray-500">
                View and manage student profiles
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Add Student Button */}
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlusCircle size={12} /> Add Student
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {students.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {students.filter((s) => s.status === "Active").length}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {students.filter((s) => s.status === "Pending").length}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {students.filter((s) => s.performance === "Excellent").length}
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
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <select
                  value={filterPerformance}
                  onChange={(e) => setFilterPerformance(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden">
            {filteredStudents.slice(0, 6).map((student) => (
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
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-xs">
                        {student.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        {student.class} • {student.subject}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
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
                        {student.attendance}%
                      </p>
                      <p className="text-[8px] text-gray-500">Attendance</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1">
                      <p className="text-[10px] font-bold text-blue-600">
                        {student.assignments}%
                      </p>
                      <p className="text-[8px] text-gray-500">Assignments</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-1">
                      <p className="text-[10px] font-bold text-purple-600">
                        {student.exam}%
                      </p>
                      <p className="text-[8px] text-gray-500">Exams</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-1.5">
                    <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                      <span>Overall Progress</span>
                      <span>{student.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
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
                      onClick={() => handleDeleteStudent(student.id)}
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

          {/* No Results */}
          {filteredStudents.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <FaUserGraduate className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Students Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-green-600" /> Add New Student
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) =>
                      setFormData({ ...formData, fatherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) =>
                      setFormData({ ...formData, motherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mother's name"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={formData.roll}
                    onChange={(e) =>
                      setFormData({ ...formData, roll: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roll number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodGroup: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Religion
                  </label>
                  <select
                    value={formData.religion}
                    onChange={(e) =>
                      setFormData({ ...formData, religion: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) =>
                      setFormData({ ...formData, nationality: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter nationality"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previousSchool: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter previous school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Contact
                  </label>
                  <input
                    type="text"
                    value={formData.guardianContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guardianContact: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Guardian contact number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentStatus: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              {/* Performance Section */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-blue-500" /> Performance Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
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
                          attendance: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Assignments (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.assignments}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignments: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Quiz (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.quiz}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quiz: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Exam (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.exam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exam: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Auto-calculated Progress:
                    </span>
                    <span className="font-bold text-blue-600">
                      {calculateProgress(
                        Number(formData.attendance) || 0,
                        Number(formData.assignments) || 0,
                        Number(formData.quiz) || 0,
                        Number(formData.exam) || 0,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Performance Rating:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-xs ${getPerformanceColor(
                        determinePerformance(
                          calculateProgress(
                            Number(formData.attendance) || 0,
                            Number(formData.assignments) || 0,
                            Number(formData.quiz) || 0,
                            Number(formData.exam) || 0,
                          ),
                        ),
                      )}`}
                    >
                      {determinePerformance(
                        calculateProgress(
                          Number(formData.attendance) || 0,
                          Number(formData.assignments) || 0,
                          Number(formData.quiz) || 0,
                          Number(formData.exam) || 0,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaUserPlus className="inline mr-2" size={14} /> Add Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Profile Details Modal */}
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
              {/* Student Header */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedStudent.status)}`}
                    >
                      {selectedStudent.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(selectedStudent.performance)}`}
                    >
                      {selectedStudent.performance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.class} • {selectedStudent.subject}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 justify-center md:justify-start">
                    <span>📧 {selectedStudent.email}</span>
                    <span>📱 {selectedStudent.phone}</span>
                    <span>🎯 Roll: {selectedStudent.roll}</span>
                    <span>
                      📚 Batch: {selectedStudent.batch || "Not Assigned"}
                    </span>
                  </div>
                  <div className="mt-2">
                    {renderStars(selectedStudent.performance)}
                    <span className="text-sm font-semibold text-gray-600 ml-2">
                      ({selectedStudent.performance})
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm border-b pb-2 flex items-center gap-2">
                    <FaAddressCard className="text-blue-500" /> Personal
                    Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Father's Name</span>
                      <span className="font-semibold">
                        {selectedStudent.fatherName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mother's Name</span>
                      <span className="font-semibold">
                        {selectedStudent.motherName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date of Birth</span>
                      <span className="font-semibold">
                        {selectedStudent.dob}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-semibold">
                        {selectedStudent.gender}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Blood Group</span>
                      <span className="font-semibold">
                        {selectedStudent.bloodGroup}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Religion</span>
                      <span className="font-semibold">
                        {selectedStudent.religion}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nationality</span>
                      <span className="font-semibold">
                        {selectedStudent.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic & Contact Information */}
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
                      <span className="text-gray-500">Previous School</span>
                      <span className="font-semibold">
                        {selectedStudent.previousSchool || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guardian Contact</span>
                      <span className="font-semibold">
                        {selectedStudent.guardianContact || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-semibold">
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
                  </div>

                  {/* Performance Stats */}
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 text-xs mb-2">
                      Performance Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Attendance</span>
                        <span className="font-semibold text-green-600">
                          {selectedStudent.attendance}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Assignments</span>
                        <span className="font-semibold text-blue-600">
                          {selectedStudent.assignments}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quizzes</span>
                        <span className="font-semibold text-purple-600">
                          {selectedStudent.quiz}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Exams</span>
                        <span className="font-semibold text-orange-600">
                          {selectedStudent.exam}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Progress */}
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

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedStudent);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaEdit className="inline mr-2" /> Edit Profile
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Profile Downloaded!",
                      text: "Student profile has been downloaded as PDF.",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaDownload className="inline mr-2" /> Download
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUserEdit className="text-green-600" /> Edit Student Profile
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) =>
                      setFormData({ ...formData, fatherName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter father's name"
                  />
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={formData.roll}
                    onChange={(e) =>
                      setFormData({ ...formData, roll: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roll number"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Contact
                  </label>
                  <input
                    type="text"
                    value={formData.guardianContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guardianContact: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Guardian contact number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodGroup: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>

              {/* Performance Section in Edit */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-blue-500" /> Performance Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
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
                          attendance: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Assignments (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.assignments}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignments: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Quiz (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.quiz}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quiz: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Exam (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.exam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exam: Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Auto-calculated Progress:
                    </span>
                    <span className="font-bold text-blue-600">
                      {calculateProgress(
                        Number(formData.attendance) || 0,
                        Number(formData.assignments) || 0,
                        Number(formData.quiz) || 0,
                        Number(formData.exam) || 0,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Performance Rating:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-xs ${getPerformanceColor(
                        determinePerformance(
                          calculateProgress(
                            Number(formData.attendance) || 0,
                            Number(formData.assignments) || 0,
                            Number(formData.quiz) || 0,
                            Number(formData.exam) || 0,
                          ),
                        ),
                      )}`}
                    >
                      {determinePerformance(
                        calculateProgress(
                          Number(formData.attendance) || 0,
                          Number(formData.assignments) || 0,
                          Number(formData.quiz) || 0,
                          Number(formData.exam) || 0,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaSave className="inline mr-2" size={14} /> Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
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
