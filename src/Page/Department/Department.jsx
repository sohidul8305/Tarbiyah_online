// src/Page/Department/Department.jsx
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
  FaBook,
  FaChartLine,
  FaUserGraduate,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaLayerGroup,
  FaBookOpen,
  FaBuilding,
  FaUniversity,
  FaGlobe,
  FaGraduationCap,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

/* ============================================================
   ✅ Department → Meta info (আইকন, রঙ, কোর্স)
   প্রতিটা department এর নিজস্ব course list
============================================================ */
const DEPARTMENT_META = {
  Elders: {
    icon: <FaGraduationCap className="text-orange-500" />,
    color: "bg-orange-500",
    code: "ELD-101",
    description: "Quran for elders with easy learning methods and Tajweed",
    head: "Elders Department Head",
    courses: [
      "Qaida Nuraniyah",
      "Quran Nazera",
      "Bakarah Hifz",
      "Basic Tajweed (Level-1)",
    ],
  },
  "Quran Studies": {
    icon: <FaBookOpen className="text-purple-500" />,
    color: "bg-purple-500",
    code: "QRN-201",
    description: "Comprehensive Quran studies program for all ages",
    head: "Quran Studies Department Head",
    courses: [
      "Qaida Nurani",
      "Nazera Quran",
      "Hifzul Quran",
      "Hifz Revision",
      "One to One Quran Revision",
    ],
  },
  Alimiya: {
    icon: <FaUniversity className="text-blue-500" />,
    color: "bg-blue-500",
    code: "ALM-301",
    description: "Alimiya program for kids and adults",
    head: "Alimiya Department Head",
    courses: ["Alimiyah for Kids", "Alimiyah Program"],
  },
  Diploma: {
    icon: <FaGlobe className="text-green-500" />,
    color: "bg-green-500",
    code: "DPL-401",
    description: "Diploma in Islamic Studies",
    head: "Diploma Department Head",
    courses: ["Diploma in Islamic Studies"],
  },
};

const Department = () => {
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

  // ✅ Current admin এর department
  const [adminDepartment, setAdminDepartment] = useState("");

  // ✅ Dynamic data
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCoursesModal, setShowCoursesModal] = useState(false);

  // ✅ Admin info + department load
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    const savedDept = localStorage.getItem("adminDepartment");

    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        setAdminInfo(parsed);
        setAdminDepartment(parsed.department || savedDept || "");
      } catch (err) {
        console.error(err);
      }
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: savedDept || "Administration",
        joinDate: "January 2024",
      });
      setAdminDepartment(savedDept || "");
    }
  }, [user]);

  // ✅ Fetch real data (students, teachers) for admin's department
  const fetchDepartmentData = async () => {
    if (!adminDepartment) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const deptParam = encodeURIComponent(adminDepartment);

      // Fetch students & teachers for this department
      const [studentsRes, teachersRes, batchesRes] = await Promise.allSettled([
        fetch(`${API_BASE}/api/students/all?department=${deptParam}`),
        fetch(
          `${API_BASE}/api/teacher-attendance/stats?department=${deptParam}`,
        ),
        fetch(`${API_BASE}/api/batches/all?department=${deptParam}`),
      ]);

      let studentsCount = 0;
      let teachersCount = 0;
      let batchList = [];

      // Students
      if (studentsRes.status === "fulfilled") {
        try {
          const data = await studentsRes.value.json();
          if (data.success && Array.isArray(data.students)) {
            studentsCount = data.students.length;
          }
        } catch (e) {
          console.error("Students parse error:", e);
        }
      }

      // Teachers
      if (teachersRes.status === "fulfilled") {
        try {
          const data = await teachersRes.value.json();
          if (data.success && Array.isArray(data.stats)) {
            teachersCount = data.stats.length;
          }
        } catch (e) {
          console.error("Teachers parse error:", e);
        }
      }

      // Batches (to count students per course)
      if (batchesRes.status === "fulfilled") {
        try {
          const data = await batchesRes.value.json();
          if (data.success && Array.isArray(data.batches)) {
            batchList = data.batches;
          }
        } catch (e) {
          console.error("Batches parse error:", e);
        }
      }

      // ✅ Get meta for THIS department only
      const meta = DEPARTMENT_META[adminDepartment] || {
        icon: <FaBuilding className="text-blue-500" />,
        color: "bg-blue-500",
        code: "DEPT-000",
        description: `${adminDepartment} department`,
        head: `${adminDepartment} Head`,
        courses: [adminDepartment],
      };

      // ✅ Build department object with ONLY this department's courses
      setDepartment({
        id: adminDepartment,
        name: adminDepartment,
        code: meta.code,
        description: meta.description,
        head: meta.head,
        icon: meta.icon,
        color: meta.color,
        totalStudents: studentsCount,
        totalTeachers: teachersCount,
        totalCourses: meta.courses.length,
        status: "Active",
        courses: meta.courses.map((courseName, idx) => {
          // ✅ Count students enrolled in this course (from batches)
          const courseBatches = batchList.filter(
            (b) => b.course === courseName,
          );
          const courseStudents = courseBatches.reduce(
            (sum, b) => sum + (Number(b.students) || 0),
            0,
          );
          const courseTeachers = [
            ...new Set(
              courseBatches
                .map((b) => b.teacher)
                .filter(Boolean)
                .flatMap((t) =>
                  String(t)
                    .split(",")
                    .map((x) => x.trim()),
                ),
            ),
          ];

          return {
            id: idx + 1,
            name: courseName,
            nameEn: courseName,
            code: `${meta.code}-${String(idx + 1).padStart(3, "0")}`,
            students: courseStudents,
            teacher:
              courseTeachers.length > 0 ? courseTeachers.join(", ") : "—",
            duration: "—",
            price: 0,
            subtitle: "",
            link: "#",
            batches: courseBatches.length,
          };
        }),
      });
    } catch (err) {
      console.error("❌ Fetch department data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminDepartment) {
      fetchDepartmentData();
    }
    // eslint-disable-next-line
  }, [adminDepartment]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminDepartment");
      localStorage.removeItem("adminInfo");
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
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

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
          label: "Batch Create and Maintain",
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

  // Search filter (only one department, but keep for UI)
  const filteredDepartments = department
    ? [department].filter(
        (dept) =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">My Department</h1>
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
            h-full overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {adminInfo.profileImage ? (
                  <img
                    src={adminInfo.profileImage}
                    alt="admin"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {adminInfo.name?.charAt(0) || "A"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{adminInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {adminInfo.designation}
                </p>
                {adminDepartment && (
                  <p className="text-[10px] opacity-90 truncate mt-0.5 bg-white/20 px-1.5 py-0.5 rounded-full inline-block">
                    🏛️ {adminDepartment}
                  </p>
                )}
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-hidden h-[calc(100vh-200px)]">
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
            <p>© Tarbiyah Online Madrasha</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-6 w-full overflow-auto pt-16 md:pt-6">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaBuilding className="text-blue-600" /> My Department
                {adminDepartment && (
                  <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {adminDepartment}
                  </span>
                )}
              </h1>
              <p className="text-xs text-gray-500">
                You are logged in as {adminDepartment} Department Admin
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchDepartmentData}
                disabled={loading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSyncAlt
                  size={12}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-16 text-center">
              <FaSyncAlt className="animate-spin text-4xl text-teal-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Loading department data...
              </p>
            </div>
          ) : !adminDepartment ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
              <FaBuilding className="text-5xl text-yellow-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-yellow-800 mb-0.5">
                No Department Assigned
              </h3>
              <p className="text-xs text-yellow-700">
                আপনার অ্যাকাউন্টে কোনো department সেট করা হয়নি। অ্যাডমিনের সাথে
                যোগাযোগ করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredDepartments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className={`h-1 ${dept.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{dept.icon}</span>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {dept.name}
                          </h3>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {dept.code}
                        </p>
                      </div>
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(dept.status)}`}
                      >
                        {dept.status}
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-600 mt-2">
                      {dept.description}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                      <div className="bg-gray-50 rounded-lg p-1.5">
                        <p className="text-xs font-bold text-blue-600">
                          {dept.totalStudents}
                        </p>
                        <p className="text-[8px] text-gray-500">Students</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-1.5">
                        <p className="text-xs font-bold text-green-600">
                          {dept.totalTeachers}
                        </p>
                        <p className="text-[8px] text-gray-500">Teachers</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-1.5">
                        <p className="text-xs font-bold text-purple-600">
                          {dept.totalCourses}
                        </p>
                        <p className="text-[8px] text-gray-500">Courses</p>
                      </div>
                    </div>

                    {/* ✅ Course preview chips */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {dept.courses.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full border border-teal-200"
                        >
                          {c.name}
                        </span>
                      ))}
                      {dept.courses.length > 4 && (
                        <span className="text-[9px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
                          +{dept.courses.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <p className="text-[8px] text-gray-400">
                        Head: {dept.head}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setShowCoursesModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all"
                      >
                        View Courses ({dept.courses.length})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredDepartments.length === 0 && adminDepartment && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaBuilding className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Department Found
              </h3>
              <p className="text-xs text-gray-500">
                "{adminDepartment}" এর জন্য কোনো data পাওয়া যায়নি।
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Courses Modal */}
      {showCoursesModal && department && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaBookOpen className="text-blue-600" />
                {department.name} - Courses ({department.courses.length})
              </h3>
              <button
                onClick={() => setShowCoursesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Department Head:</span>{" "}
                  {department.head}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Total Courses:</span>{" "}
                  {department.totalCourses}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Total Students:</span>{" "}
                  {department.totalStudents}
                </p>
              </div>

              <div className="space-y-2">
                {department.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {course.name}
                        </h4>
                        <p className="text-xs text-gray-500">{course.code}</p>
                      </div>
                      <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">
                        {course.students} students
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span>👨‍🏫 {course.teacher}</span>
                      <span>📦 {course.batches} batch(es)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => setShowCoursesModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all"
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

export default Department;
