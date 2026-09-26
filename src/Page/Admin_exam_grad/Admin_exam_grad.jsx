// src/Page/Admin/Admin_exam_grad.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import adminImg from "../../image/mahfuz.png";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaChartLine,
  FaUserTimes,
  FaDatabase,
  FaLayerGroup,
  FaCalendarCheck,
  FaArrowRight,
  FaAward,
  FaSave,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimes,
  FaSpinner,
  FaPlusCircle,
  FaFilePdf,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaLink,
} from "react-icons/fa";
import { MdDashboard, MdVerified } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://localhost:5010";
const ADMIN_IMAGE_KEY = "adminProfileImage";
const DEFAULT_PROFILE_IMAGE = adminImg;

// ==================================================
// ✅ MAIN PAGE — with sidebar + tabs
// ==================================================
const Admin_exam_grad = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("exam");
  const [activeSubMenu, setActiveSubMenu] = useState("exam");
  const [activeTab, setActiveTab] = useState("grades");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    designation: "",
    profileImage: "",
  });

  // ✅ Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    const savedImage = localStorage.getItem(ADMIN_IMAGE_KEY) || "";

    let admin = null;
    if (savedAdmin) {
      try {
        admin = JSON.parse(savedAdmin);
      } catch {
        admin = null;
      }
    }

    if (!admin) {
      admin = {
        name: user?.displayName || "Admin",
        designation: "Administrator",
        profileImage: "",
      };
    }

    setAdminInfo({
      ...admin,
      profileImage: savedImage || admin.profileImage || "",
    });
  }, [user]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
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

  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* ✅ Mobile Floating Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#004d4d] text-white p-3 rounded-full shadow-lg hover:bg-[#006666] transition-all"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* ==================== Sidebar ==================== */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-full overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {adminInfo.profileImage && !imgError ? (
                  <img
                    src={adminInfo.profileImage}
                    alt="admin"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_IMAGE}
                    alt="default"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{adminInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {adminInfo.designation}
                </p>
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
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
                              setActiveMenu(item.id);
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

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ==================== Main Content ==================== */}
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6 w-full overflow-auto">
          <div className="space-y-4 max-w-7xl mx-auto">
            {/* Top Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white shadow-md">
                    <FaAward size={22} />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                      Exam Grade & Resources
                      <MdVerified className="text-blue-500 text-sm" />
                    </h1>
                    <p className="text-xs text-gray-500">
                      Manage grades, PDF notes and quizzes for students
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:block text-xs font-semibold text-gray-700">
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
            </div>

            {/* Tabs Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Tab Buttons */}
              <div className="border-b border-gray-200 bg-gray-50/50 px-2 pt-2 overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                  <button
                    onClick={() => setActiveTab("grades")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      activeTab === "grades"
                        ? "bg-white text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                  >
                    <FaAward size={13} /> Grades
                  </button>
                  <button
                    onClick={() => setActiveTab("pdfs")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      activeTab === "pdfs"
                        ? "bg-white text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                  >
                    <FaFilePdf size={13} /> PDF Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      activeTab === "quizzes"
                        ? "bg-white text-green-600 border-b-2 border-green-600"
                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                  >
                    <FaQuestionCircle size={13} /> Quizzes
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-3 md:p-4">
                {activeTab === "grades" && <GradesTab />}
                {activeTab === "pdfs" && <ResourcesTab type="pdf" />}
                {activeTab === "quizzes" && <ResourcesTab type="quiz" />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ==================================================
// GRADES TAB
// ==================================================
const GradesTab = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentRoll: "",
    courseId: "",
    courseTitle: "",
    courseCode: "",
    grad: "A+",
    classTest: "",
    midTerm: "",
    finalExam: "Pending",
    teacher: "",
    remarks: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchGrades();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/students/all`);
      const data = await res.json();
      if (data.success) setStudents(data.students || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      let res = await fetch(`${API_BASE}/api/courses/teacher/all`);
      let data = await res.json();
      let allCourses = data.success ? data.courses || [] : [];

      if (allCourses.length === 0) {
        const studentsRes = await fetch(`${API_BASE}/api/students/all`);
        const studentsData = await studentsRes.json();
        const students = studentsData.students || [];

        const courseMap = new Map();
        students.forEach((s) => {
          if (s.enrolledCourses && Array.isArray(s.enrolledCourses)) {
            s.enrolledCourses.forEach((c) => {
              if (typeof c === "object" && c._id) {
                courseMap.set(c._id, c);
              }
            });
          }
        });
        allCourses = Array.from(courseMap.values());
      }

      setCourses(allCourses);
    } catch (err) {
      console.error("❌ Courses fetch error:", err);
    }
  };

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/grades/all`);
      const data = await res.json();
      if (data.success) setGrades(data.grades || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentChange = (studentId) => {
    const st = students.find(
      (s) => String(s._id || s.id) === String(studentId),
    );
    setFormData({
      ...formData,
      studentId: studentId || "",
      studentName: st?.name || "",
      studentRoll: st?.roll || "",
    });
  };

  const handleCourseChange = (courseId) => {
    const co = courses.find((c) => String(c._id || c.id) === String(courseId));
    setFormData({
      ...formData,
      courseId: courseId || "",
      courseTitle: co?.title || co?.name || "",
      courseCode: co?.code || "",
      teacher: co?.teacher || "",
    });
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      studentName: "",
      studentRoll: "",
      courseId: "",
      courseTitle: "",
      courseCode: "",
      grad: "A+",
      classTest: "",
      midTerm: "",
      finalExam: "Pending",
      teacher: "",
      remarks: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) {
      Swal.fire("Warning", "Student এবং Course select করুন!", "warning");
      return;
    }
    setSaving(true);
    try {
      const url = editingId
        ? `${API_BASE}/api/grades/update/${editingId}`
        : `${API_BASE}/api/grades/create`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        await fetchGrades();
        resetForm();
        Swal.fire({
          icon: "success",
          title: editingId ? "Grade updated!" : "Grade published!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed!", data.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (g) => {
    setFormData({
      studentId: g.studentId,
      studentName: g.studentName,
      studentRoll: g.studentRoll,
      courseId: g.courseId,
      courseTitle: g.courseTitle,
      courseCode: g.courseCode,
      grad: g.grad || "A+",
      classTest: g.classTest || "",
      midTerm: g.midTerm || "",
      finalExam: g.finalExam || "Pending",
      teacher: g.teacher || "",
      remarks: g.remarks || "",
    });
    setEditingId(g._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this grade?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });
    if (!result.isConfirmed) return;
    try {
      await fetch(`${API_BASE}/api/grades/delete/${id}`, { method: "DELETE" });
      await fetchGrades();
      Swal.fire("Deleted!", "", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGrades = grades.filter(
    (g) =>
      (g.studentName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.studentRoll || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <FaAward className="text-purple-600" /> Exam Grades
          <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
            {grades.length}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs w-36 md:w-44 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
          >
            <FaPlusCircle size={12} /> {showForm ? "Close" : "Add Grade"}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-purple-50/50 border border-purple-200 rounded-xl shadow-sm p-3 md:p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSave className="text-purple-600" />
            {editingId ? "Edit Grade" : "Publish New Grade"}
          </h3>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Student <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) => handleStudentChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">-- Select --</option>
                  {students.map((s) => (
                    <option key={s._id || s.id} value={s._id || s.id}>
                      {s.name} {s.roll ? `(Roll: ${s.roll})` : ""} — {s.phone}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">-- Select --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.code ? `[${c.code}] ` : ""}
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Overall Grade
                </label>
                <select
                  value={formData.grad}
                  onChange={(e) =>
                    setFormData({ ...formData, grad: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-purple-500"
                >
                  {[
                    "A+",
                    "A",
                    "A-",
                    "B+",
                    "B",
                    "B-",
                    "C+",
                    "C",
                    "D",
                    "F",
                    "N/A",
                  ].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Class Test
                </label>
                <input
                  type="text"
                  placeholder="85/100"
                  value={formData.classTest}
                  onChange={(e) =>
                    setFormData({ ...formData, classTest: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mid Term
                </label>
                <input
                  type="text"
                  placeholder="42/50"
                  value={formData.midTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, midTerm: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Final Exam
                </label>
                <select
                  value={formData.finalExam}
                  onChange={(e) =>
                    setFormData({ ...formData, finalExam: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Pending">Pending</option>
                  {["A+", "A", "A-", "B+", "B", "C", "D", "F"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-purple-200">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} /> Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={12} />{" "}
                    {editingId ? "Update" : "Publish"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <FaTimes size={12} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner className="animate-spin text-3xl text-purple-500" />
            </div>
          ) : filteredGrades.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaAward className="text-5xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                কোনো grade নেই
              </p>
              <p className="text-xs text-gray-500 mt-1">
                "Add Grade" button এ ক্লিক করুন
              </p>
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Student
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Course
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Grad
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Test
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Mid
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Final
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGrades.map((g) => (
                  <tr
                    key={g._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-800">
                        {g.studentName}
                      </p>
                      {g.studentRoll && (
                        <p className="text-[10px] text-gray-500">
                          Roll: {g.studentRoll}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-800">{g.courseTitle}</p>
                      {g.courseCode && (
                        <p className="text-[10px] text-gray-500">
                          {g.courseCode}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                        {g.grad}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center text-xs text-gray-700">
                      {g.classTest || "-"}
                    </td>
                    <td className="px-3 py-2 text-center text-xs text-gray-700">
                      {g.midTerm || "-"}
                    </td>
                    <td className="px-3 py-2 text-center text-xs text-gray-700">
                      {g.finalExam || "-"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(g)}
                          className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(g._id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================================================
// RESOURCES TAB (PDF + Quiz)
// ==================================================
const ResourcesTab = ({ type }) => {
  const isPdf = type === "pdf";
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    courseId: "",
    courseTitle: "",
    courseCode: "",
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchResources();
  }, []);

  const fetchCourses = async () => {
    try {
      let res = await fetch(`${API_BASE}/api/courses/teacher/all`);
      let data = await res.json();
      if (!data.success || !data.courses) {
        res = await fetch(`${API_BASE}/api/courses/teacher/any`);
        data = await res.json();
      }
      if (data.success) setCourses(data.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/course-resources/all`);
      const data = await res.json();
      if (data.success) {
        setResources((data.resources || []).filter((r) => r.type === type));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (courseId) => {
    const co = courses.find((c) => String(c._id || c.id) === String(courseId));
    setFormData({
      ...formData,
      courseId: courseId || "",
      courseTitle: co?.title || co?.name || "",
      courseCode: co?.code || "",
    });
  };

  const resetForm = () => {
    setFormData({
      courseId: "",
      courseTitle: "",
      courseCode: "",
      title: "",
      url: "",
      description: "",
    });
    setShowForm(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.courseId || !formData.title || !formData.url) {
      Swal.fire("Warning", "Course, Title এবং URL আবশ্যক!", "warning");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/course-resources/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchResources();
        resetForm();
        Swal.fire({
          icon: "success",
          title: `${isPdf ? "PDF" : "Quiz"} added!`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed!", data.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: `Delete this ${isPdf ? "PDF" : "Quiz"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });
    if (!result.isConfirmed) return;
    try {
      await fetch(`${API_BASE}/api/course-resources/delete/${id}`, {
        method: "DELETE",
      });
      await fetchResources();
      Swal.fire("Deleted!", "", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = resources.filter(
    (r) =>
      (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const themeColor = isPdf ? "blue" : "green";
  const Icon = isPdf ? FaFilePdf : FaQuestionCircle;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Icon className={isPdf ? "text-blue-600" : "text-green-600"} />
          {isPdf ? "PDF Notes" : "Quizzes"}
          <span
            className={`text-[10px] ${
              isPdf
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            } px-2 py-0.5 rounded-full font-bold`}
          >
            {resources.length}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs w-36 md:w-44 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className={`${
              isPdf
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all shadow-sm`}
          >
            <FaPlusCircle size={12} />{" "}
            {showForm ? "Close" : `Add ${isPdf ? "PDF" : "Quiz"}`}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div
          className={`${
            isPdf
              ? "bg-blue-50/50 border-blue-200"
              : "bg-green-50/50 border-green-200"
          } border rounded-xl shadow-sm p-3 md:p-4`}
        >
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSave className={isPdf ? "text-blue-600" : "text-green-600"} />{" "}
            Add New {isPdf ? "PDF Note" : "Quiz"}
          </h3>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.code ? `[${c.code}] ` : ""}
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {isPdf ? "PDF Title" : "Quiz Title"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    isPdf ? "e.g., Class 1 Notes" : "e.g., Weekly Quiz 1"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaLink size={10} /> {isPdf ? "PDF URL" : "Quiz URL"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                placeholder={
                  isPdf
                    ? "https://drive.google.com/..."
                    : "https://forms.google.com/..."
                }
                required
              />
              <p className="text-[10px] text-gray-400 mt-1">
                {isPdf
                  ? "Google Drive, Dropbox বা direct PDF link"
                  : "Google Forms, Typeform বা online quiz link"}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
                placeholder="Short description..."
              />
            </div>

            <div
              className={`flex gap-2 pt-2 border-t ${
                isPdf ? "border-blue-200" : "border-green-200"
              }`}
            >
              <button
                type="submit"
                disabled={saving}
                className={`${
                  isPdf
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                } text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-all`}
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} /> Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={12} /> Save
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <FaTimes size={12} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner
                className={`animate-spin text-3xl ${
                  isPdf ? "text-blue-500" : "text-green-500"
                }`}
              />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Icon className="text-5xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                কোনো {isPdf ? "PDF" : "Quiz"} নেই
              </p>
              <p className="text-xs text-gray-500 mt-1">
                উপরে "Add" button এ ক্লিক করুন
              </p>
            </div>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Title
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Course
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Link
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-800">
                        {r.title}
                      </p>
                      {r.description && (
                        <p className="text-[10px] text-gray-500 truncate max-w-xs">
                          {r.description}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-800">{r.courseTitle}</p>
                      {r.courseCode && (
                        <p className="text-[10px] text-gray-500">
                          {r.courseCode}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs ${
                          isPdf
                            ? "text-blue-600 hover:text-blue-800"
                            : "text-green-600 hover:text-green-800"
                        } hover:underline flex items-center gap-1 font-medium`}
                      >
                        <FaExternalLinkAlt size={10} /> Open
                      </a>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_exam_grad;
