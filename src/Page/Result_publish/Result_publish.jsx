// src/Page/Admin/Result_publish.jsx
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
  FaChalkboard,
  FaCalendarDay,
  FaSchool as FaSchoolIcon,
  FaUserTie,
  FaBookReader,
  FaStopwatch,
  FaClipboardCheck,
  FaExchangeAlt,
  FaCheckDouble,
  FaBan,
  FaCheck,
  FaTimes,
  FaQuestion,
  FaCalendarWeek,
  FaChartBar,
  FaFileDownload,
  FaFilePdf,
  FaFileExcel,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGlobe as FaGlobeIcon,
  FaEnvelope as FaEnvelopeIcon,
  FaPhone as FaPhoneIcon,
  FaUsers as FaUsersIcon,
  FaCalendar,
  FaClock as FaClockIcon2,
  FaHourglassHalf,
  FaCheckCircle as FaCheckCircleIcon,
  FaTimesCircle as FaTimesCircleIcon,
  FaBookmark,
  FaListUl,
  FaChevronRight,
  FaChevronDown,
  FaFolderOpen,
  FaFile,
  FaFilePdf as FaFilePdfIcon,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFileCode,
  FaFileExcel as FaFileExcelIcon,
  FaFileAlt as FaFileAltIcon,
  FaFolder,
  FaCopy,
  FaCut,
  FaPaste,
  FaShare,
  FaStar as FaStarIcon,
  FaRegStar,
  FaRegFileAlt,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFilePowerpoint,
  FaRegFileImage,
  FaRegFileVideo,
  FaRegFileArchive,
  FaEraser,
  FaTrashAlt,
  FaCalendarTimes,
  FaRedoAlt,
  FaUndoAlt,
  FaSync,
  FaExclamationCircle,
  FaInfoCircle as FaInfoCircleIcon,
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaDonate,
  FaFileInvoice as FaFileInvoiceIcon2,
  FaFileSignature,
  FaReceipt as FaReceiptIcon,
  FaCreditCard as FaCreditCardIcon,
  FaPrint as FaPrintIcon,
  FaShareAlt,
  FaChartPie,
  FaChartArea,
  FaTasks,
  FaCheckDouble as FaCheckDoubleIcon,
  FaPen,
  FaPencilAlt,
  FaAward,
  FaMedal,
  FaTrophy,
  FaPlus,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Result_publish = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("exam");
  const [activeSubMenu, setActiveSubMenu] = useState("result-publish");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Exams available for result publishing
  const [exams, setExams] = useState([
    {
      id: 1,
      examName: "Midterm Exam 2026",
      examCode: "MT-2026-01",
      class: "Class 8",
      subject: "Tajweed",
      teacher: "Dr. Muhammad Abdullah",
      date: "2026-03-15",
      status: "Completed",
      totalStudents: 25,
      published: true,
      publishDate: "2026-03-20",
      results: [
        {
          studentName: "Ahmed Hasan",
          roll: "01",
          marks: 85,
          grade: "A",
          status: "Pass",
        },
        {
          studentName: "Rahim Uddin",
          roll: "02",
          marks: 72,
          grade: "B",
          status: "Pass",
        },
        {
          studentName: "Sadia Afrin",
          roll: "03",
          marks: 45,
          grade: "D",
          status: "Pass",
        },
        {
          studentName: "Hasan Mahmud",
          roll: "04",
          marks: 38,
          grade: "F",
          status: "Fail",
        },
        {
          studentName: "Khadija Akhter",
          roll: "05",
          marks: 92,
          grade: "A+",
          status: "Pass",
        },
      ],
    },
    {
      id: 2,
      examName: "Final Exam 2026",
      examCode: "FE-2026-01",
      class: "Class 9",
      subject: "Tafsir",
      teacher: "Ustadh Ahmad Ali",
      date: "2026-06-20",
      status: "Completed",
      totalStudents: 30,
      published: false,
      publishDate: null,
      results: [
        {
          studentName: "Fatima Begum",
          roll: "01",
          marks: 88,
          grade: "A",
          status: "Pass",
        },
        {
          studentName: "Mohammad Ali",
          roll: "02",
          marks: 65,
          grade: "C",
          status: "Pass",
        },
        {
          studentName: "Aisha Rahman",
          roll: "03",
          marks: 78,
          grade: "B",
          status: "Pass",
        },
        {
          studentName: "Abdullah Al Mamun",
          roll: "04",
          marks: 42,
          grade: "D",
          status: "Pass",
        },
        {
          studentName: "Ayesha Khatun",
          roll: "05",
          marks: 35,
          grade: "F",
          status: "Fail",
        },
      ],
    },
    {
      id: 3,
      examName: "Quiz 1",
      examCode: "QZ-2026-01",
      class: "Class 10",
      subject: "Hadith",
      teacher: "Ustadha Fatima Rahman",
      date: "2026-02-10",
      status: "Completed",
      totalStudents: 22,
      published: true,
      publishDate: "2026-02-15",
      results: [
        {
          studentName: "Mohammad Ali",
          roll: "01",
          marks: 95,
          grade: "A+",
          status: "Pass",
        },
        {
          studentName: "Sadia Afrin",
          roll: "02",
          marks: 82,
          grade: "A",
          status: "Pass",
        },
        {
          studentName: "Hasan Mahmud",
          roll: "03",
          marks: 70,
          grade: "B",
          status: "Pass",
        },
        {
          studentName: "Khadija Akhter",
          roll: "04",
          marks: 55,
          grade: "C",
          status: "Pass",
        },
        {
          studentName: "Ahmed Hasan",
          roll: "05",
          marks: 40,
          grade: "D",
          status: "Pass",
        },
      ],
    },
    {
      id: 4,
      examName: "Midterm Exam 2026",
      examCode: "MT-2026-02",
      class: "Class 7",
      subject: "Fiqh",
      teacher: "Dr. Omar Farooq",
      date: "2026-03-20",
      status: "Completed",
      totalStudents: 28,
      published: false,
      publishDate: null,
      results: [
        {
          studentName: "Aisha Rahman",
          roll: "01",
          marks: 90,
          grade: "A+",
          status: "Pass",
        },
        {
          studentName: "Rahim Uddin",
          roll: "02",
          marks: 68,
          grade: "B",
          status: "Pass",
        },
        {
          studentName: "Fatima Begum",
          roll: "03",
          marks: 50,
          grade: "C",
          status: "Pass",
        },
        {
          studentName: "Abdullah Al Mamun",
          roll: "04",
          marks: 30,
          grade: "F",
          status: "Fail",
        },
      ],
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");

  // State for modals
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State for result entry
  const [resultFormData, setResultFormData] = useState({
    studentName: "",
    roll: "",
    marks: 0,
    grade: "",
    status: "Pass",
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

  // Save exams to localStorage
  useEffect(() => {
    localStorage.setItem("examResults", JSON.stringify(exams));
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

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get grade color
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-600 text-white";
      case "A":
        return "bg-green-500 text-white";
      case "B":
        return "bg-blue-500 text-white";
      case "C":
        return "bg-yellow-500 text-white";
      case "D":
        return "bg-orange-500 text-white";
      case "F":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Get grade icon
  const getGradeIcon = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return <FaTrophy className="text-yellow-500" />;
      case "B":
        return <FaMedal className="text-blue-500" />;
      case "C":
        return <FaMedal className="text-yellow-500" />;
      case "D":
        return <FaMedal className="text-orange-500" />;
      case "F":
        return <FaTimesCircleIcon className="text-red-500" />;
      default:
        return null;
    }
  };

  // Calculate grade based on marks
  const calculateGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
  };

  // Calculate status based on marks
  const calculateStatus = (marks, passingMarks = 40) => {
    return marks >= passingMarks ? "Pass" : "Fail";
  };

  // Filter exams
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" ? exam.published : !exam.published);
    const matchesClass = filterClass === "All" || exam.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || exam.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(exams.map((e) => e.class))];
  const uniqueSubjects = ["All", ...new Set(exams.map((e) => e.subject))];

  // Open publish modal
  const openPublishModal = (exam) => {
    setSelectedExam(exam);
    setShowPublishModal(true);
  };

  // Open details modal
  const openDetailsModal = (exam) => {
    setSelectedExam(exam);
    setShowDetailsModal(true);
  };

  // Open edit modal for student result
  const openEditModal = (exam, student) => {
    setSelectedExam(exam);
    setSelectedStudent(student);
    setResultFormData({
      studentName: student.studentName,
      roll: student.roll,
      marks: student.marks,
      grade: student.grade,
      status: student.status,
    });
    setShowEditModal(true);
  };

  // Open add result modal
  const openAddResultModal = (exam) => {
    setSelectedExam(exam);
    setResultFormData({
      studentName: "",
      roll: "",
      marks: 0,
      grade: "",
      status: "Pass",
    });
    setShowAddResultModal(true);
  };

  // Handle publish result
  const handlePublishResult = () => {
    Swal.fire({
      title: "Publish Results?",
      text: `Publish results for ${selectedExam.examName}? Students will be able to view their results.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, publish!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExams(
          exams.map((exam) =>
            exam.id === selectedExam.id
              ? {
                  ...exam,
                  published: true,
                  publishDate: new Date().toISOString().split("T")[0],
                }
              : exam,
          ),
        );
        setShowPublishModal(false);
        Swal.fire({
          icon: "success",
          title: "Results Published!",
          text: `Results for ${selectedExam.examName} have been published successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle unpublish result
  const handleUnpublishResult = (exam) => {
    Swal.fire({
      title: "Unpublish Results?",
      text: `This will hide results for ${exam.examName} from students.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, unpublish!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExams(
          exams.map((e) =>
            e.id === exam.id
              ? {
                  ...e,
                  published: false,
                  publishDate: null,
                }
              : e,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Results Unpublished!",
          text: `Results for ${exam.examName} have been unpublished.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle add student result
  const handleAddResult = (e) => {
    e.preventDefault();

    if (!resultFormData.studentName || !resultFormData.roll) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter student name and roll number.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    if (
      !resultFormData.marks ||
      resultFormData.marks < 0 ||
      resultFormData.marks > 100
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Marks",
        text: "Please enter marks between 0 and 100.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    // Check if student already has a result for this exam
    const existingResult = selectedExam.results.find(
      (r) =>
        r.studentName === resultFormData.studentName ||
        r.roll === resultFormData.roll,
    );

    if (existingResult) {
      Swal.fire({
        icon: "warning",
        title: "Student Already Has Result",
        text: `${resultFormData.studentName} (Roll: ${resultFormData.roll}) already has a result for this exam.`,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const grade = calculateGrade(resultFormData.marks);
    const status = calculateStatus(resultFormData.marks);

    const newResult = {
      studentName: resultFormData.studentName,
      roll: resultFormData.roll,
      marks: resultFormData.marks,
      grade: grade,
      status: status,
    };

    setExams(
      exams.map((exam) =>
        exam.id === selectedExam.id
          ? {
              ...exam,
              results: [...exam.results, newResult],
              totalStudents: exam.totalStudents + 1,
            }
          : exam,
      ),
    );

    // Update selected exam
    setSelectedExam({
      ...selectedExam,
      results: [...selectedExam.results, newResult],
      totalStudents: selectedExam.totalStudents + 1,
    });

    setShowAddResultModal(false);
    Swal.fire({
      icon: "success",
      title: "Result Added!",
      text: `Result for ${resultFormData.studentName} has been added successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit student result
  const handleEditResult = (e) => {
    e.preventDefault();

    if (
      !resultFormData.marks ||
      resultFormData.marks < 0 ||
      resultFormData.marks > 100
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Marks",
        text: "Please enter marks between 0 and 100.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const grade = calculateGrade(resultFormData.marks);
    const status = calculateStatus(resultFormData.marks);

    setExams(
      exams.map((exam) =>
        exam.id === selectedExam.id
          ? {
              ...exam,
              results: exam.results.map((student) =>
                student.studentName === selectedStudent.studentName
                  ? {
                      ...student,
                      marks: resultFormData.marks,
                      grade: grade,
                      status: status,
                    }
                  : student,
              ),
            }
          : exam,
      ),
    );
    setShowEditModal(false);
    Swal.fire({
      icon: "success",
      title: "Result Updated!",
      text: `Result for ${selectedStudent.studentName} has been updated.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete student result
  const handleDeleteResult = (exam, student) => {
    Swal.fire({
      title: "Delete Result?",
      text: `Delete result for ${student.studentName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExams(
          exams.map((e) =>
            e.id === exam.id
              ? {
                  ...e,
                  results: e.results.filter(
                    (r) => r.studentName !== student.studentName,
                  ),
                  totalStudents: e.totalStudents - 1,
                }
              : e,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Result Deleted!",
          text: `Result for ${student.studentName} has been deleted.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Generate result report
  const generateReport = (exam) => {
    const passed = exam.results.filter((r) => r.status === "Pass").length;
    const failed = exam.results.filter((r) => r.status === "Fail").length;
    const average = Math.round(
      exam.results.reduce((sum, r) => sum + r.marks, 0) / exam.results.length,
    );

    Swal.fire({
      title: "Result Summary",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>Exam:</strong> ${exam.examName}</p>
          <p><strong>Class:</strong> ${exam.class}</p>
          <p><strong>Subject:</strong> ${exam.subject}</p>
          <p><strong>Total Students:</strong> ${exam.results.length}</p>
          <p><strong>Passed:</strong> ${passed} (${Math.round((passed / exam.results.length) * 100)}%)</p>
          <p><strong>Failed:</strong> ${failed} (${Math.round((failed / exam.results.length) * 100)}%)</p>
          <p><strong>Average Marks:</strong> ${average}</p>
          <p><strong>Status:</strong> ${exam.published ? "✅ Published" : "📝 Draft"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Download Report",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Report Downloaded!",
          text: "Result report has been downloaded as PDF.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Publish Results</h1>
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
                <FaCertificate className="text-blue-600" /> Publish Results
              </h1>
              <p className="text-xs text-gray-500">
                Manage and publish exam results
              </p>
            </div>
            <div className="flex items-center gap-2">
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
              <p className="text-lg font-bold text-blue-600">{exams.length}</p>
              <p className="text-[10px] text-gray-500">Total Exams</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {exams.filter((e) => e.published).length}
              </p>
              <p className="text-[10px] text-gray-500">Published</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {
                  exams.filter((e) => !e.published && e.status === "Completed")
                    .length
                }
              </p>
              <p className="text-[10px] text-gray-500">Ready to Publish</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {exams.reduce((sum, e) => sum + e.results.length, 0)}
              </p>
              <p className="text-[10px] text-gray-500">Total Results</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by exam name, code, subject or teacher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Unpublished">Unpublished</option>
                </select>
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
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div
                    className={`h-1 ${exam.published ? "bg-green-500" : "bg-yellow-500"}`}
                  ></div>
                  <div className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-xs truncate">
                          {exam.examName}
                        </h3>
                        <p className="text-[10px] text-gray-500">
                          {exam.examCode}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className={`inline-flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(exam.published ? "Published" : "Draft")}`}
                          >
                            {exam.published ? (
                              <FaCheckCircleIcon
                                className="text-green-500"
                                size={10}
                              />
                            ) : (
                              <FaPencilAlt
                                className="text-yellow-500"
                                size={10}
                              />
                            )}
                            {exam.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-blue-600">
                          {exam.results.length} Students
                        </p>
                        {exam.published && (
                          <p className="text-[8px] text-gray-400">
                            Published: {formatDate(exam.publishDate)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <p className="text-gray-400">Class</p>
                        <p className="font-medium text-gray-700">
                          {exam.class}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Subject</p>
                        <p className="font-medium text-gray-700 truncate">
                          {exam.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Teacher</p>
                        <p className="font-medium text-gray-700 truncate">
                          {exam.teacher}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Date</p>
                        <p className="font-medium text-gray-700">
                          {formatDate(exam.date)}
                        </p>
                      </div>
                    </div>

                    {/* Result Summary */}
                    {exam.results.length > 0 && (
                      <div className="mt-1.5 flex items-center gap-2 text-[10px]">
                        <span className="text-green-600">
                          Pass:{" "}
                          {
                            exam.results.filter((r) => r.status === "Pass")
                              .length
                          }
                        </span>
                        <span className="text-red-600">
                          Fail:{" "}
                          {
                            exam.results.filter((r) => r.status === "Fail")
                              .length
                          }
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">
                          Avg:{" "}
                          {Math.round(
                            exam.results.reduce((sum, r) => sum + r.marks, 0) /
                              exam.results.length,
                          )}
                          %
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100 flex-wrap">
                      <button
                        onClick={() => openDetailsModal(exam)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                      >
                        <FaEye className="inline mr-1" size={10} /> View Results
                      </button>
                      <button
                        onClick={() => openAddResultModal(exam)}
                        className="text-green-600 hover:text-green-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-green-200 hover:bg-green-50 transition-all"
                      >
                        <FaPlus className="inline mr-1" size={10} /> Add Result
                      </button>
                      {!exam.published && exam.status === "Completed" && (
                        <button
                          onClick={() => openPublishModal(exam)}
                          className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                        >
                          <FaCheckCircleIcon
                            className="inline mr-1"
                            size={10}
                          />{" "}
                          Publish
                        </button>
                      )}
                      {exam.published && (
                        <button
                          onClick={() => handleUnpublishResult(exam)}
                          className="text-red-600 hover:text-red-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-red-200 hover:bg-red-50 transition-all"
                        >
                          <FaBan className="inline mr-1" size={10} /> Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => generateReport(exam)}
                        className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50 transition-all"
                        title="Generate Report"
                      >
                        <FaFileDownload size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                <FaCertificate className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                  No Exams Found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Publish Results Modal */}
      {showPublishModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircleIcon className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Publish Results
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedExam.examName}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>
                  <strong>Class:</strong> {selectedExam.class}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedExam.subject}
                </p>
                <p>
                  <strong>Students:</strong> {selectedExam.results.length}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedExam.published
                    ? "Already Published"
                    : "Ready to Publish"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePublishResult}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  <FaCheckCircleIcon className="inline mr-2" /> Confirm Publish
                </button>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Result Modal */}
      {showAddResultModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaPlus className="text-green-600" /> Add Student Result
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{selectedExam.examName}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedExam.class} • {selectedExam.subject}
                </p>
              </div>

              <form onSubmit={handleAddResult} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={resultFormData.studentName}
                    onChange={(e) =>
                      setResultFormData({
                        ...resultFormData,
                        studentName: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={resultFormData.roll}
                    onChange={(e) =>
                      setResultFormData({
                        ...resultFormData,
                        roll: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roll number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks (0-100) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={resultFormData.marks}
                    onChange={(e) =>
                      setResultFormData({
                        ...resultFormData,
                        marks: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter marks"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Grade:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getGradeColor(calculateGrade(resultFormData.marks))}`}
                      >
                        {calculateGrade(resultFormData.marks)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                          calculateStatus(resultFormData.marks) === "Pass"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {calculateStatus(resultFormData.marks)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaSave className="inline mr-2" size={14} /> Add Result
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddResultModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaListUl className="text-blue-600" /> Results -{" "}
                {selectedExam.examName}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Class:</span>{" "}
                  {selectedExam.class} |
                  <span className="font-medium ml-2">Subject:</span>{" "}
                  {selectedExam.subject} |
                  <span className="font-medium ml-2">Date:</span>{" "}
                  {formatDate(selectedExam.date)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      openAddResultModal(selectedExam);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
                  >
                    <FaPlus size={12} /> Add Result
                  </button>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExam.published ? "Published" : "Draft")}`}
                  >
                    {selectedExam.published ? (
                      <FaCheckCircleIcon className="text-green-500" />
                    ) : (
                      <FaPencilAlt className="text-yellow-500" />
                    )}
                    {selectedExam.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Student Name
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Roll
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
                    {selectedExam.results.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                        <td className="px-3 py-2 font-medium text-gray-800">
                          {student.studentName}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {student.roll}
                        </td>
                        <td className="px-3 py-2 font-semibold text-gray-700">
                          {student.marks}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}
                          >
                            {getGradeIcon(student.grade)}
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              student.status === "Pass"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.status === "Pass" ? (
                              <FaCheckCircleIcon
                                className="text-green-500"
                                size={10}
                              />
                            ) : (
                              <FaTimesCircleIcon
                                className="text-red-500"
                                size={10}
                              />
                            )}
                            {student.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                openEditModal(selectedExam, student)
                              }
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-all"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteResult(selectedExam, student)
                              }
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {selectedExam.results.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-3 py-8 text-center text-gray-500"
                        >
                          <p>No results added yet</p>
                          <button
                            onClick={() => {
                              setShowDetailsModal(false);
                              openAddResultModal(selectedExam);
                            }}
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1 mx-auto"
                          >
                            <FaPlus size={12} /> Add First Result
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {showEditModal && selectedExam && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaEdit className="text-yellow-600" /> Edit Result
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">
                    {selectedStudent.studentName}
                  </span>
                  <span className="text-gray-400 ml-2">
                    (Roll: {selectedStudent.roll})
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedExam.examName} • {selectedExam.class} •{" "}
                  {selectedExam.subject}
                </p>
              </div>

              <form onSubmit={handleEditResult} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks (0-100) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={resultFormData.marks}
                    onChange={(e) =>
                      setResultFormData({
                        ...resultFormData,
                        marks: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter marks"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Grade:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getGradeColor(calculateGrade(resultFormData.marks))}`}
                      >
                        {calculateGrade(resultFormData.marks)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                          calculateStatus(resultFormData.marks) === "Pass"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {calculateStatus(resultFormData.marks)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <FaSave className="inline mr-2" size={14} /> Update Result
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result_publish;
