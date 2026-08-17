// src/Page/Admin/Add_student.jsx
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
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Add_student = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("student-management");
  const [activeSubMenu, setActiveSubMenu] = useState("student-add");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // State for students list
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    course: "",
    subject: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianPhone: "",
    presentAddress: "",
    permanentAddress: "",
    dobOrNid: "",
    gender: "Male",
    bloodGroup: "A+",
    nationality: "Bangladeshi",
    religion: "Islam",
    previousSchool: "",
    status: "Pending",
    paymentStatus: "Unpaid",
    admissionDate: "",
    photo: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showStudentList, setShowStudentList] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Courses List
  const coursesList = [
    "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    "আলিমিয়াহ ফর কিডস",
    "আলিমিয়াহ প্রোগ্রাম",
    "কায়দা নুরানী",
    "নাজেরা",
    "হিফজুল কুরআন",
    "হিফজ রিভিশন",
    "ওয়ান টু ওয়ান",
    "কায়দায়ে নূরানিয়্যাহ",
    "কুরআন নাজেরা",
    "বেসিক তাজউইদ (লেভেল–১)",
    "অ্যাডভান্সড তাজউইদ",
  ];

  const subjectList = [
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
    "Arabic Grammar",
    "Arabic Literature",
    "Quran Memorization",
  ];

  const bloodGroupList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const religionList = [
    "Islam",
    "Hinduism",
    "Christianity",
    "Buddhism",
    "Other",
  ];
  const genderList = ["Male", "Female", "Other"];
  const statusList = ["Active", "Pending", "Inactive"];
  const paymentStatusList = ["Paid", "Partial", "Unpaid"];

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

  // Fetch students from API
  useEffect(() => {
    fetchStudentsFromAPI();
  }, [refreshKey]);

  const fetchStudentsFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching students from API...");

      const response = await fetch("http://localhost:5000/api/students/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📥 Response Status:", response.status);

      if (response.status === 404) {
        setError(
          "API endpoint not found! Please check if server is running on port 5000",
        );
        setStudents([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 Response Data:", data);

      if (data.success) {
        const studentList = data.students || [];
        console.log(`✅ Found ${studentList.length} students from API`);

        // ✅ এখানে students সেট করছি
        setStudents(studentList);

        if (studentList.length === 0) {
          setError("No students found. Please register a student first.");
        }
      } else {
        setError(data.message || "Failed to fetch students");
        setStudents([]);
      }
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      setError(`Error: ${error.message}`);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Register Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড মেলে নি!",
        text: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।",
      });
      return;
    }

    if (formData.password.length > 0 && formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড খুব ছোট!",
        text: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
      });
      return;
    }

    if (formData.phone.length < 11) {
      Swal.fire({
        icon: "error",
        title: "ভুল ফোন নম্বর!",
        text: "ফোন নম্বরটি ১১ ডিজিটের হতে হবে।",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.course) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing!",
        text: "Name, Phone and Course are required.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      console.log("📤 Sending Registration Data:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        paymentStatus: formData.paymentStatus,
        admissionDate: formData.admissionDate,
      });

      const response = await fetch(
        "http://localhost:5000/api/students/register/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email || "",
            phone: formData.phone,
            password: formData.password || "default123",
            course: formData.course,
            presentAddress: formData.presentAddress || "",
            permanentAddress: formData.permanentAddress || "",
            dobOrNid: formData.dobOrNid || "",
            guardianName: formData.guardianName || formData.fatherName || "",
            guardianPhone: formData.guardianPhone || formData.phone,
            subject: formData.subject,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            gender: formData.gender,
            bloodGroup: formData.bloodGroup,
            nationality: formData.nationality,
            religion: formData.religion,
            previousSchool: formData.previousSchool,
            status: formData.status,
            paymentStatus: formData.paymentStatus,
            admissionDate: formData.admissionDate,
          }),
        },
      );

      const data = await response.json();
      console.log("📥 Response:", data);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "✅ Student Registered!",
          html: `
            <div style="text-align: left;">
              <p><strong>নাম:</strong> ${formData.name}</p>
              <p><strong>কোর্স:</strong> ${formData.course}</p>
              <p><strong>ফোন:</strong> ${formData.phone}</p>
              <p><strong>ইমেইল:</strong> ${formData.email || "N/A"}</p>
              <hr style="margin: 10px 0;">
              <p style="color: #004d4d; font-weight: bold;">
                ✅ Student registered successfully!
              </p>
            </div>
          `,
          timer: 3000,
          showConfirmButton: true,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          course: "",
          subject: "",
          fatherName: "",
          motherName: "",
          guardianName: "",
          guardianPhone: "",
          presentAddress: "",
          permanentAddress: "",
          dobOrNid: "",
          gender: "Male",
          bloodGroup: "A+",
          nationality: "Bangladeshi",
          religion: "Islam",
          previousSchool: "",
          status: "Pending",
          paymentStatus: "Unpaid",
          admissionDate: "",
          photo: null,
        });

        setRefreshKey((prev) => prev + 1);
        setShowStudentList(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed!",
          text: data.message || "Could not register student.",
        });
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not connect to server. Please try again.",
      });
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      course: "",
      subject: "",
      fatherName: "",
      motherName: "",
      guardianName: "",
      guardianPhone: "",
      presentAddress: "",
      permanentAddress: "",
      dobOrNid: "",
      gender: "Male",
      bloodGroup: "A+",
      nationality: "Bangladeshi",
      religion: "Islam",
      previousSchool: "",
      status: "Pending",
      paymentStatus: "Unpaid",
      admissionDate: "",
      photo: null,
    });
    setShowStudentList(true);
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Student has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
          setRefreshKey((prev) => prev + 1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: data.message || "Could not delete student.",
          });
        }
      } catch (error) {
        console.error("❌ Error deleting student:", error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not delete student.",
        });
      }
    }
  };

  // ✅ View Details - সব তথ্য সহ
  const handleView = (student) => {
    Swal.fire({
      title: `📋 Student Details: ${student.name}`,
      html: `
      <div style="text-align: left; font-size: 13px; max-height: 450px; overflow-y: auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
          <p><strong>নাম:</strong> ${student.name || "N/A"}</p>
          <p><strong>ফোন:</strong> ${student.phone || "N/A"}</p>
          <p><strong>ইমেইল:</strong> ${student.email || "N/A"}</p>
          <p><strong>কোর্স:</strong> ${student.course || student.class || "N/A"}</p>
          <p><strong>ইউজারনেম:</strong> ${student.username || "Not assigned"}</p>
          <p><strong>স্ট্যাটাস:</strong> ${student.status || "Pending"}</p>
          <p><strong>পিতার নাম:</strong> ${student.fatherName || student.guardianName || "N/A"}</p>
          <p><strong>মাতার নাম:</strong> ${student.motherName || "N/A"}</p>
          <p><strong>অভিভাবক:</strong> ${student.guardianName || "N/A"}</p>
          <p><strong>অভিভাবক ফোন:</strong> ${student.guardianPhone || "N/A"}</p>
          <p><strong>বর্তমান ঠিকানা:</strong> ${student.presentAddress || student.address || "N/A"}</p>
          <p><strong>স্থায়ী ঠিকানা:</strong> ${student.permanentAddress || "N/A"}</p>
          <p><strong>পরিচয়পত্র:</strong> ${student.dobOrNid || "N/A"}</p>
          <p><strong>পেমেন্ট মেথড:</strong> ${
            student.paymentMethod === "bkash"
              ? "bKash"
              : student.paymentMethod === "nagod"
                ? "Nagad"
                : student.paymentMethod === "rocket"
                  ? "Rocket"
                  : student.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : student.paymentMethod === "ssl"
                      ? "SSL Commerz"
                      : student.paymentMethod || "N/A"
          }</p>
          <p><strong>ট্রানজেকশন আইডি:</strong> ${student.transactionId || "N/A"}</p>
          <p><strong>পেমেন্ট স্ট্যাটাস:</strong> ${student.paymentStatus || (student.paidAmount ? "Paid" : "Unpaid")}</p>
          <p><strong>ভর্তি তারিখ:</strong> ${student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : "N/A"}</p>
        </div>
        <hr style="margin: 10px 0;">
        <p style="font-size: 11px; color: #666;">রেজিস্ট্রেশন: ${student.createdAt ? new Date(student.createdAt).toLocaleString() : "N/A"}</p>
      </div>
    `,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Close",
      width: 650,
    });
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.includes(searchTerm) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.course || student.class)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "All" ||
      (student.course || student.class) === filterCourse;
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const uniqueCourses = [
    "All",
    ...new Set(students.map((s) => s.course || s.class).filter(Boolean)),
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

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-3">Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Add Student</h1>
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
                <FaUserPlus className="text-blue-600" /> Add Student
              </h1>
              <p className="text-xs text-gray-500">
                {students.length} students registered in the system
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

          {/* Toggle View */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowStudentList(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showStudentList
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <FaListAlt className="inline mr-1" size={12} /> Student List
            </button>
            <button
              onClick={() => setShowStudentList(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !showStudentList
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <FaUserPlus className="inline mr-1" size={12} /> Add Student
            </button>
          </div>

          {showStudentList ? (
            // Student List View - সব ডেটা সহ
            <div className="space-y-3 overflow-hidden h-[calc(100vh-240px)]">
              {/* Filters */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search by name, phone, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <select
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <button
                      onClick={() => setRefreshKey((prev) => prev + 1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      🔄 Refresh
                    </button>
                  </div>
                </div>
              </div>

              {/* Students Table - সব কলাম সহ */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          #
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Name & Contact
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Course
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Payment Method
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Transaction ID
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Payment Status
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Admission Date
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <tr
                            key={student._id || student.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-3 py-2 text-xs text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-3 py-2">
                              <div>
                                <p className="text-xs font-medium text-gray-800">
                                  {student.name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  📱 {student.phone}
                                </p>
                                {student.email && (
                                  <p className="text-[10px] text-gray-400">
                                    ✉️ {student.email}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-600">
                              {student.course || student.class || "N/A"}
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-600">
                              {student.paymentMethod === "bkash"
                                ? "bKash"
                                : student.paymentMethod === "nagod"
                                  ? "Nagad"
                                  : student.paymentMethod === "rocket"
                                    ? "Rocket"
                                    : student.paymentMethod === "bank"
                                      ? "Bank Transfer"
                                      : student.paymentMethod === "ssl"
                                        ? "SSL Commerz"
                                        : student.paymentMethod || "N/A"}
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-600">
                              {student.transactionId || "N/A"}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                                  student.paymentStatus === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : student.paymentStatus === "Partial"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {student.paymentStatus || "Unpaid"}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-600">
                              {student.admissionDate
                                ? new Date(
                                    student.admissionDate,
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(student.status)}`}
                              >
                                {student.status || "Pending"}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleView(student)}
                                  className="text-blue-600 hover:text-blue-800 p-0.5"
                                  title="View"
                                >
                                  <FaEye size={12} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete(student._id, student.name)
                                  }
                                  className="text-red-600 hover:text-red-800 p-0.5"
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
                            className="px-4 py-8 text-center text-gray-500 text-sm"
                          >
                            {error || "No students found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // Add Student Form
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-y-auto h-[calc(100vh-240px)]">
              <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> New Student
                Registration
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaCamera className="text-gray-400 text-2xl" />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs border border-gray-300 rounded-lg px-3 py-1.5"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      JPG, PNG (Max 2MB)
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-blue-700 mb-2">
                    👤 Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="017XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth / NID
                      </label>
                      <input
                        type="text"
                        name="dobOrNid"
                        value={formData.dobOrNid}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="DD-MM-YYYY or NID Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        {genderList.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        {bloodGroupList.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Nationality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Religion
                      </label>
                      <select
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        {religionList.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-green-700 mb-2">
                    📚 Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course *
                      </label>
                      <select
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Course</option>
                        {coursesList.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Subject</option>
                        {subjectList.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous School
                      </label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Previous school name"
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-purple-700 mb-2">
                    👨‍👩‍👦 Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father's Name
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Father's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother's Name
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Mother's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guardian's Name
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Guardian's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guardian's Phone
                      </label>
                      <input
                        type="text"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Guardian's phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-yellow-700 mb-2">
                    📍 Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Present Address
                      </label>
                      <input
                        type="text"
                        name="presentAddress"
                        value={formData.presentAddress}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Present address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address
                      </label>
                      <input
                        type="text"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Permanent address"
                      />
                    </div>
                  </div>
                </div>

                {/* Login & Status Information */}
                <div className="bg-red-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-red-700 mb-2">
                    🔐 Login & Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="6+ characters"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Re-enter password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        {statusList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Status
                      </label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        {paymentStatusList.map((ps) => (
                          <option key={ps} value={ps}>
                            {ps}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Date
                      </label>
                      <input
                        type="date"
                        name="admissionDate"
                        value={formData.admissionDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FaSave size={14} /> Register Student
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FaUndo size={14} /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Add_student;
