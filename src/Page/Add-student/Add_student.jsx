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
  FaChartLine,
  FaUserPlus,
  FaCalendarCheck,
  FaDatabase,
  FaListAlt,
  FaEye,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaArrowRight,
  FaCamera,
  FaSave,
  FaUndo,
  FaLayerGroup,
  FaUserTimes,
  FaSync,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

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

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sourceFilter, setSourceFilter] = useState("All");

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ✅ Initial Form Data
  const initialFormData = {
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
    studentId: "",
    country: "BD",
    batch: "",
    scholarshipAmount: "",
    courseFee: "",
    paidAmount: "",
    transactionId: "",
    dueAmount: "",
    julyAugust: "",
    september: "",
    paymentMethodSept: "",
    paymentDateSept: "",
    transactionIdSept: "",
    october: "",
    paymentMethodOct: "",
    paymentDateOct: "",
    transactionIdOct: "",
    november: "",
    paymentMethodNov: "",
    paymentDateNov: "",
    transactionIdNov: "",
    december: "",
    paymentMethodDec: "",
    paymentDateDec: "",
    transactionIdDec: "",
    comments: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showStudentList, setShowStudentList] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ সব Course list (Elders + Admission)
  const coursesList = [
    // Elders Courses
    "কায়দা নুরানী",
    "কায়দায়ে নূরানিয়্যাহ",
    "কুরআন নাজেরা",
    "নাজেরা",
    "বাকারাহ হিফজ",
    "বেসিক তাজউইদ (লেভেল–১)",
    "Qaida Nuraniyah",
    "Quran Nazera",
    "Bakarah Hifz",
    "Basic Tajweed (Level-1)",
    // Admission Courses
    "Diploma in Islamic Studies",
    "Alimiyah for Kids (Bangla Medium)",
    "Alimiyah for Kids (English Medium)",
    "Alimiyah Program (Bangla Version)",
    "Alimiyah Program (English Version)",
    "Nazera Quran (Bangladeshi)",
    "Nazera Quran (Expatriate)",
    "Hifzul Quran",
    "Hifz Revision (One to One)",
    "One-to-One Program",
  ];

  const subjectList = [
    "Tajweed",
    "Quran Memorization",
    "Qaida",
    "Nazera",
    "Hifz",
    "Tafsir",
    "Hadith",
    "Fiqh",
    "Aqeedah",
  ];

  const bloodGroupList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genderList = ["Male", "Female", "Other"];
  const statusList = ["Active", "Pending", "Inactive"];
  const paymentStatusList = ["Paid", "Partial", "Unpaid"];
  const batchList = [
    "Basic Tazweed 6th Batch",
    "Najera Batch-02",
    "Basic Tazweed",
    "Najera",
    "Qaida Nurani Batch",
    "Bakarah Hifz Batch",
  ];

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

  // Fetch students
  useEffect(() => {
    fetchAllStudents();
  }, [refreshKey]);

  // ============================================================
  // ✅ Fetch from 3 API endpoints & combine
  // ============================================================
  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ ৩টি endpoint একসাথে fetch
      const [studentsRes, tazweedRes, najeraRes] = await Promise.allSettled([
        fetch(`${API_BASE}/students/all`),
        fetch(`${API_BASE}/basic-tazweed/all`),
        fetch(`${API_BASE}/najera-batch/all`),
      ]);

      // ---------- 1) Admission Form Students ----------
      let admissionStudents = [];
      if (studentsRes.status === "fulfilled") {
        try {
          const d = await studentsRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            admissionStudents = d.students.map((s) => ({
              _id: s._id,
              source: "Admission",
              sourceLabel: "Admission Form",
              name: s.name || "",
              phone: s.phone || "",
              email: s.email || "",
              course: s.course || "",
              batch: s.batch || "",
              country: s.country || "BD",
              studentId: s.studentId || "",
              status: s.status || "Pending",
              paymentStatus: s.paymentStatus || "Unpaid",
              scholarshipAmount: s.scholarshipAmount || 0,
              courseFee: s.courseFee || 0,
              paidAmount: s.paidAmount || 0,
              dueAmount: s.dueAmount || 0,
              transactionId: s.transactionId || "",
              createdAt: s.createdAt || "",
              raw: s,
            }));
          }
        } catch (e) {
          console.error("Admission parse error:", e);
        }
      }

      // ---------- 2) Basic Tazweed Students ----------
      let tazweedStudents = [];
      if (tazweedRes.status === "fulfilled") {
        try {
          const d = await tazweedRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            tazweedStudents = d.students.map((s) => ({
              _id: s._id,
              source: "Tazweed",
              sourceLabel: "Basic Tazweed",
              name: s.name || "",
              phone: s.phone || "",
              email: "",
              course: "Basic Tajweed (Level-1)",
              batch: "Basic Tazweed 6th Batch",
              country: s.country || "BD",
              studentId: s.studentId || "",
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
              scholarshipAmount: s.scholarshipAmount || 0,
              courseFee: s.courseFee || 0,
              paidAmount: s.paidAmount || 0,
              dueAmount: s.dueAmount || 0,
              transactionId: s.transactionId || "",
              createdAt: s.createdAt || "",
              raw: s,
            }));
          }
        } catch (e) {
          console.error("Tazweed parse error:", e);
        }
      }

      // ---------- 3) Najera Batch Students ----------
      let najeraStudents = [];
      if (najeraRes.status === "fulfilled") {
        try {
          const d = await najeraRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            najeraStudents = d.students.map((s) => ({
              _id: s._id,
              source: "Najera",
              sourceLabel: "Najera Batch",
              name: s.name || "",
              phone: s.phone || "",
              email: "",
              course: "Quran Nazera",
              batch: "Najera Batch-02",
              country: s.country || "BD",
              studentId: s.studentId || "",
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
              scholarshipAmount: s.scholarshipAmount || 0,
              courseFee: s.courseFee || 0,
              paidAmount: s.paidAmount || 0,
              dueAmount: s.dueAmount || 0,
              transactionId: s.transactionId || "",
              createdAt: s.createdAt || "",
              raw: s,
            }));
          }
        } catch (e) {
          console.error("Najera parse error:", e);
        }
      }

      // ✅ Combine
      const combined = [
        ...admissionStudents,
        ...tazweedStudents,
        ...najeraStudents,
      ].sort((a, b) => {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return db - da;
      });

      console.log("════════════════════════════════");
      console.log(`✅ Loaded all students:`);
      console.log(`   - Admission: ${admissionStudents.length}`);
      console.log(`   - Tazweed: ${tazweedStudents.length}`);
      console.log(`   - Najera: ${najeraStudents.length}`);
      console.log(`   - Total: ${combined.length}`);
      console.log("════════════════════════════════");

      setStudents(combined);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(`Error: ${err.message}`);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Approve student
  const handleApproveStudent = async () => {
    if (!selectedStudent) return;

    if (!selectedStudent.username || !selectedStudent.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Info!",
        text: "Username এবং Password দিন।",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Processing...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${API_BASE}/students/approve/${selectedStudent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: selectedStudent.username,
            password: selectedStudent.password,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setShowApproveModal(false);
        setSelectedStudent(null);
        setRefreshKey((p) => p + 1);

        Swal.fire({
          icon: "success",
          title: "✅ Approved!",
          html: `<div style="text-align:left">
            <p><strong>Username:</strong> ${selectedStudent.username}</p>
            <p><strong>Password:</strong> ${selectedStudent.password}</p>
          </div>`,
          confirmButtonColor: "#004d4d",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error!", text: err.message });
    }
  };

  // Register student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড মেলে নি!",
        text: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।",
      });
      return;
    }

    if (formData.password && formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড ছোট!",
        text: "কমপক্ষে ৬ অক্ষর হতে হবে।",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.course) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields!",
        text: "Name, Phone, Course আবশ্যক।",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/students/register/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password: formData.password || "default123",
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "✅ Registered!",
          html: `<div style="text-align:left">
            <p><strong>নাম:</strong> ${formData.name}</p>
            <p><strong>কোর্স:</strong> ${formData.course}</p>
            <p><strong>ফোন:</strong> ${formData.phone}</p>
            <p><strong>Batch:</strong> ${formData.batch || "N/A"}</p>
            <p><strong>Course Fee:</strong> ${formData.courseFee || 0}</p>
            <p><strong>Paid:</strong> ${formData.paidAmount || 0}</p>
          </div>`,
          timer: 3000,
          showConfirmButton: true,
        });

        setFormData(initialFormData);
        setRefreshKey((p) => p + 1);
        setShowStudentList(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not register",
        });
      }
    } catch (err) {
      console.error("❌ Register Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Server connection failed.",
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
    setFormData(initialFormData);
    setShowStudentList(true);
  };

  // ✅ Source অনুযায়ী Delete
  const handleDelete = async (id, name, source) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    // ✅ Source অনুযায়ী সঠিক endpoint
    let deleteUrl = `${API_BASE}/admin-students/delete/${id}`;
    if (source === "Tazweed") {
      deleteUrl = `${API_BASE}/basic-tazweed/delete/${id}`;
    } else if (source === "Najera") {
      deleteUrl = `${API_BASE}/najera-batch/delete/${id}`;
    }

    try {
      const response = await fetch(deleteUrl, { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        setRefreshKey((p) => p + 1);
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // View Details
  const handleView = (student) => {
    const s = student.raw || student;
    Swal.fire({
      title: `📋 ${student.name}`,
      html: `
        <div style="text-align:left; font-size:13px; max-height:500px; overflow-y:auto;">
          <div style="background:#e6f7f9; padding:10px; border-radius:8px; border-left:4px solid #00ADD2; margin-bottom:8px;">
            <p style="margin:0;"><strong>📌 Source:</strong> ${student.sourceLabel}</p>
            <p style="margin:5px 0 0 0;"><strong>🆔 Student ID:</strong> ${s.studentId || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>👤 Name:</strong> ${s.name || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>📞 Phone:</strong> ${s.phone || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>🎓 Course:</strong> ${s.course || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>📦 Batch:</strong> ${s.batch || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>🌍 Country:</strong> ${s.country || "N/A"}</p>
            <p style="margin:5px 0 0 0;"><strong>📌 Status:</strong> ${s.status || "Pending"}</p>
          </div>

          <div style="background:#fef3c7; padding:10px; border-radius:8px; border:1px solid #fcd34d; margin-bottom:8px;">
            <p style="font-weight:bold; color:#92400e; margin-bottom:6px;">💰 Payment Info</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
              <p><strong>Scholarship:</strong> ৳${s.scholarshipAmount || 0}</p>
              <p><strong>Course Fee:</strong> ৳${s.courseFee || 0}</p>
              <p><strong>Paid:</strong> ৳${s.paidAmount || 0}</p>
              <p><strong>Due:</strong> <span style="color:red;font-weight:bold;">৳${s.dueAmount || 0}</span></p>
              <p><strong>Transaction ID:</strong> ${s.transactionId || "---"}</p>
            </div>
          </div>

          ${
            student.source === "Admission"
              ? `
              <div style="background:#dbeafe; padding:10px; border-radius:8px; border:1px solid #93c5fd; margin-bottom:8px;">
                <p style="font-weight:bold; color:#1e40af; margin-bottom:6px;">📅 Monthly Payments</p>
                <table style="width:100%; font-size:11px; border-collapse:collapse;">
                  <tr style="background:#93c5fd;">
                    <th style="padding:4px;text-align:left;">Month</th>
                    <th style="padding:4px;text-align:left;">Amount</th>
                    <th style="padding:4px;text-align:left;">Method</th>
                    <th style="padding:4px;text-align:left;">Date</th>
                    <th style="padding:4px;text-align:left;">TXN</th>
                  </tr>
                  <tr>
                    <td style="padding:4px;">Sep</td>
                    <td style="padding:4px;">৳${s.september || 0}</td>
                    <td style="padding:4px;">${s.paymentMethodSept || "---"}</td>
                    <td style="padding:4px;">${s.paymentDateSept || "---"}</td>
                    <td style="padding:4px;">${s.transactionIdSept || "---"}</td>
                  </tr>
                  <tr style="background:#eff6ff;">
                    <td style="padding:4px;">Oct</td>
                    <td style="padding:4px;">৳${s.october || 0}</td>
                    <td style="padding:4px;">${s.paymentMethodOct || "---"}</td>
                    <td style="padding:4px;">${s.paymentDateOct || "---"}</td>
                    <td style="padding:4px;">${s.transactionIdOct || "---"}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px;">Nov</td>
                    <td style="padding:4px;">৳${s.november || 0}</td>
                    <td style="padding:4px;">${s.paymentMethodNov || "---"}</td>
                    <td style="padding:4px;">${s.paymentDateNov || "---"}</td>
                    <td style="padding:4px;">${s.transactionIdNov || "---"}</td>
                  </tr>
                  <tr style="background:#eff6ff;">
                    <td style="padding:4px;">Dec</td>
                    <td style="padding:4px;">৳${s.december || 0}</td>
                    <td style="padding:4px;">${s.paymentMethodDec || "---"}</td>
                    <td style="padding:4px;">${s.paymentDateDec || "---"}</td>
                    <td style="padding:4px;">${s.transactionIdDec || "---"}</td>
                  </tr>
                </table>
              </div>
            `
              : `
              <div style="background:#dbeafe; padding:10px; border-radius:8px; border:1px solid #93c5fd; margin-bottom:8px;">
                <p style="font-weight:bold; color:#1e40af; margin-bottom:6px;">📅 Monthly Payments</p>
                <p><strong>Jul-Aug:</strong> ৳${s.julyAugust || 0}</p>
                <p><strong>September:</strong> ৳${s.september || 0} (${s.paymentMethodSept || "---"})</p>
                <p><strong>October:</strong> ৳${s.october || 0} (${s.paymentMethodOct || "---"})</p>
                <p><strong>November:</strong> ৳${s.november || 0} (${s.paymentMethodNov || "---"})</p>
                <p><strong>December:</strong> ৳${s.december || 0} (${s.paymentMethodDec || "---"})</p>
              </div>
            `
          }

          ${
            s.comments
              ? `<div style="background:#f0fdf4; padding:10px; border-radius:8px; border:1px solid #86efac; margin-bottom:8px;">
                  <p><strong>💬 Comments:</strong> ${s.comments}</p>
                </div>`
              : ""
          }

          ${
            s.username && s.password
              ? `<div style="background:#f0fdf4; padding:10px; border-radius:8px; border:2px solid #86efac;">
                  <p style="font-weight:bold; color:#004d4d;">🔑 Login</p>
                  <p><strong>Username:</strong> ${s.username}</p>
                  <p><strong>Password:</strong> ${s.password}</p>
                </div>`
              : ""
          }
        </div>
      `,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Close",
      width: 720,
    });
  };

  // Filter
  const filteredStudents = students
    .filter((s) => (sourceFilter === "All" ? true : s.source === sourceFilter))
    .filter((s) => {
      const matchesSearch =
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone?.includes(searchTerm) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.course?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = filterCourse === "All" || s.course === filterCourse;
      const matchesStatus = filterStatus === "All" || s.status === filterStatus;
      return matchesSearch && matchesCourse && matchesStatus;
    });

  const uniqueCourses = [
    "All",
    ...new Set(students.map((s) => s.course).filter(Boolean)),
  ];

  const sourceCounts = {
    All: students.length,
    Admission: students.filter((s) => s.source === "Admission").length,
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

  const getSourceBadge = (source) => {
    switch (source) {
      case "Admission":
        return "bg-blue-100 text-blue-700";
      case "Tazweed":
        return "bg-green-100 text-green-700";
      case "Najera":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading all students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold">Add Student</h1>
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
            transition-all duration-300 h-full overflow-hidden flex-shrink-0
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
                        ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.icon}</span>
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
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
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
                        ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <span>{item.icon}</span>
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
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top */}
          <div className="bg-white p-3 rounded-xl shadow-sm border mb-3 flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> Student Management —
                <span className="text-teal-700">All Sources</span>
              </h1>
              <p className="text-xs text-gray-500">
                Admission Form + Basic Tazweed + Najera Batch ({students.length}{" "}
                total)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRefreshKey((p) => p + 1)}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync size={10} className={loading ? "animate-spin" : ""} />{" "}
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowStudentList(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold
                ${showStudentList ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <FaListAlt className="inline mr-1" size={12} /> Student List
            </button>
            <button
              onClick={() => setShowStudentList(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold
                ${!showStudentList ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <FaPlusCircle className="inline mr-1" size={12} /> Add Student
            </button>
          </div>

          {showStudentList ? (
            // ============ LIST VIEW ============
            <div className="space-y-3 overflow-hidden h-[calc(100vh-240px)]">
              {/* Source Tabs */}
              <div className="bg-white border rounded-xl shadow-sm p-1.5 flex gap-1 overflow-x-auto">
                {[
                  { id: "All", label: "All Students", color: "blue" },
                  { id: "Admission", label: "Admission Form", color: "blue" },
                  { id: "Tazweed", label: "Basic Tazweed", color: "green" },
                  { id: "Najera", label: "Najera Batch", color: "purple" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSourceFilter(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      sourceFilter === tab.id
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
                        sourceFilter === tab.id
                          ? "bg-white text-gray-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {sourceCounts[tab.id]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="bg-white border rounded-xl shadow-sm p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search name, phone, studentId, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <select
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="px-1.5 py-1 text-xs border rounded-lg max-w-[200px]"
                    >
                      {uniqueCourses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-1.5 py-1 text-xs border rounded-lg"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-auto max-h-[calc(100vh-360px)]">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b sticky top-0 z-10">
                      <tr>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          #
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Student ID
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Name & Contact
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Source
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Country
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Course / Batch
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Course Fee
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Paid
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Due
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((s, idx) => (
                          <tr key={s._id} className="hover:bg-gray-50">
                            <td className="px-2 py-2 text-xs text-gray-500">
                              {idx + 1}
                            </td>
                            <td className="px-2 py-2 text-xs font-semibold text-blue-600">
                              {s.studentId || "N/A"}
                            </td>
                            <td className="px-2 py-2">
                              <p className="text-xs font-medium">{s.name}</p>
                              <p className="text-[10px] text-gray-500">
                                📱 {s.phone}
                              </p>
                              {s.email && (
                                <p className="text-[10px] text-gray-400">
                                  ✉️ {s.email}
                                </p>
                              )}
                            </td>
                            <td className="px-2 py-2">
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${getSourceBadge(
                                  s.source,
                                )}`}
                              >
                                {s.sourceLabel}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full">
                                {s.country || "N/A"}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-xs">
                              <p>{s.course || "N/A"}</p>
                              {s.batch && (
                                <p className="text-[10px] text-teal-600">
                                  {s.batch}
                                </p>
                              )}
                            </td>
                            <td className="px-2 py-2 text-xs text-gray-600">
                              ৳{(s.courseFee || 0).toLocaleString()}
                            </td>
                            <td className="px-2 py-2 text-xs text-green-600 font-semibold">
                              ৳{(s.paidAmount || 0).toLocaleString()}
                            </td>
                            <td className="px-2 py-2 text-xs">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                  Number(s.dueAmount) > 0
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                ৳{(s.dueAmount || 0).toLocaleString()}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(s.status)}`}
                              >
                                {s.status || "Pending"}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleView(s)}
                                  className="text-blue-600 hover:text-blue-800 p-0.5"
                                  title="View"
                                >
                                  <FaEye size={12} />
                                </button>
                                {s.source === "Admission" &&
                                  s.status === "Pending" && (
                                    <button
                                      onClick={() => {
                                        setSelectedStudent({
                                          ...s,
                                          username: "",
                                          password: "student123S@",
                                        });
                                        setShowApproveModal(true);
                                      }}
                                      className="text-green-600 hover:text-green-800 p-0.5"
                                      title="Approve"
                                    >
                                      <FaCheckCircle size={12} />
                                    </button>
                                  )}
                                <button
                                  onClick={() =>
                                    handleDelete(s._id, s.name, s.source)
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
                            colSpan="11"
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
            // ============ ADD FORM ============
            <div className="bg-white border rounded-xl shadow-sm p-4 overflow-y-auto h-[calc(100vh-240px)]">
              <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> New Student
                Registration
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed flex items-center justify-center overflow-hidden">
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
                    <label className="block text-sm font-medium mb-1">
                      Student Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs border rounded-lg px-3 py-1.5"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      JPG, PNG (Max 2MB)
                    </p>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-blue-700 mb-2">
                    👤 Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        placeholder="TET26FB6001"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="017XXXXXXXX"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="BD / France / Qatar"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Batch
                      </label>
                      <select
                        name="batch"
                        value={formData.batch}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select Batch</option>
                        {batchList.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        {genderList.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        {bloodGroupList.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        DOB / NID
                      </label>
                      <input
                        type="text"
                        name="dobOrNid"
                        value={formData.dobOrNid}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-green-700 mb-2">
                    📚 Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Course *
                      </label>
                      <select
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select Course</option>
                        {coursesList.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select Subject</option>
                        {subjectList.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Guardian */}
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-purple-700 mb-2">
                    👨‍👩‍👦 Guardian
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Father's Name
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mother's Name
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Guardian Name
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Guardian Phone
                      </label>
                      <input
                        type="text"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-yellow-700 mb-2">
                    📍 Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Present Address
                      </label>
                      <input
                        type="text"
                        name="presentAddress"
                        value={formData.presentAddress}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Permanent Address
                      </label>
                      <input
                        type="text"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-teal-700 mb-2">
                    💰 Payment Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Scholarship
                      </label>
                      <input
                        type="number"
                        name="scholarshipAmount"
                        value={formData.scholarshipAmount}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Course Fee
                      </label>
                      <input
                        type="number"
                        name="courseFee"
                        value={formData.courseFee}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Paid Amount
                      </label>
                      <input
                        type="number"
                        name="paidAmount"
                        value={formData.paidAmount}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Due Amount
                      </label>
                      <input
                        type="number"
                        name="dueAmount"
                        value={formData.dueAmount}
                        onChange={handleInputChange}
                        placeholder="Auto"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        placeholder="TXN ID"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        July-August
                      </label>
                      <input
                        type="number"
                        name="julyAugust"
                        value={formData.julyAugust}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  {[
                    { key: "sept", label: "September" },
                    { key: "oct", label: "October" },
                    { key: "nov", label: "November" },
                    { key: "dec", label: "December" },
                  ].map((m) => {
                    const capKey =
                      m.key.charAt(0).toUpperCase() + m.key.slice(1);
                    const amountKey = m.key === "sept" ? "september" : m.key;
                    return (
                      <div
                        key={m.key}
                        className="bg-white p-3 rounded-lg border border-teal-200 mb-3"
                      >
                        <h4 className="text-xs font-bold text-teal-700 mb-2">
                          📅 {m.label} Payment
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Amount
                            </label>
                            <input
                              type="number"
                              name={amountKey}
                              value={formData[amountKey]}
                              onChange={handleInputChange}
                              placeholder="0"
                              className="w-full border rounded-lg px-3 py-1.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Method
                            </label>
                            <select
                              name={`paymentMethod${capKey}`}
                              value={formData[`paymentMethod${capKey}`]}
                              onChange={handleInputChange}
                              className="w-full border rounded-lg px-3 py-1.5 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="Bank">Bank</option>
                              <option value="bKash">bKash</option>
                              <option value="Nagad">Nagad</option>
                              <option value="Rocket">Rocket</option>
                              <option value="Cash">Cash</option>
                              <option value="---">---</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              name={`paymentDate${capKey}`}
                              value={formData[`paymentDate${capKey}`]}
                              onChange={handleInputChange}
                              className="w-full border rounded-lg px-3 py-1.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              TXN ID
                            </label>
                            <input
                              type="text"
                              name={`transactionId${capKey}`}
                              value={formData[`transactionId${capKey}`]}
                              onChange={handleInputChange}
                              placeholder="TXN ID"
                              className="w-full border rounded-lg px-3 py-1.5 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Comments
                    </label>
                    <input
                      type="text"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      placeholder="All clear / Any note..."
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Login & Status */}
                <div className="bg-red-50 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-red-700 mb-2">
                    🔐 Login & Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="6+ chars (blank = default123)"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter"
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        {statusList.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Payment Status
                      </label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        {paymentStatusList.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Admission Date
                      </label>
                      <input
                        type="date"
                        name="admissionDate"
                        value={formData.admissionDate}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <FaSave size={14} /> Register Student
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <FaUndo size={14} /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaCheckCircle className="text-green-600" /> Approve Student
              </h3>
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedStudent(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Student ID:</strong>{" "}
                {selectedStudent.studentId || "N/A"}
              </p>
              <p>
                <strong>Course:</strong> {selectedStudent.course || "N/A"}
              </p>
              <p>
                <strong>Batch:</strong> {selectedStudent.batch || "N/A"}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  value={selectedStudent.username}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password *
                </label>
                <input
                  type="text"
                  value={selectedStudent.password}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveStudent}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaCheckCircle size={14} /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add_student;
