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
  FaClock,
  FaChartLine,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaVideo,
  FaLink,
  FaUsersCog as FaUsersCogIcon,
  FaCheckCircle,
  FaUserPlus,
  FaCalendarCheck,
  FaFilePdf,
  FaClipboardList,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaUpload,
  FaCheck,
  FaTimes,
  FaGraduationCap,
  FaPhone,
  FaUserGraduate,
  FaInfoCircle,
  FaArrowLeft,
  FaHome,
  FaEnvelope,
  FaIdCard,
  FaWallet,
  FaVenusMars,
} from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_URL = "https://api.tarbiyahonline.com";

const COURSE_OPTIONS = [
  "Qaida Nuraniyah",
  "Quran Nazera",
  "Bakarah Hifz",
  "Basic Tajweed (Level-1)",
];

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const uid = (prefix = "id") =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const todayStr = () => new Date().toISOString().slice(0, 10);

/* ============================================================
   ✅ MAIN — BATCH LIST PAGE
============================================================ */
const Student_batch = () => {
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

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    students: "",
    schedule: "",
    teacher: "",
    description: "",
    status: "Active",
  });

  const [lmsBatchId, setLmsBatchId] = useState(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) setAdminInfo(JSON.parse(savedAdmin));
    else
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
      });
  }, [user]);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/batches/all`);
      const data = await res.json();
      setBatches(data.success ? data.batches || [] : []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to load batches",
        text: "Backend running on port 5010?",
        timer: 2200,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
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
      Swal.fire({ icon: "error", title: "Logout Failed" });
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
          id: "today-class",
          path: "/admin-dashboard/today-class",
          label: "Today's Class",
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

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      (batch.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (batch.course || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (batch.teacher || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || batch.status === filterStatus;
    const matchesCourse =
      filterCourse === "All" || batch.course === filterCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const uniqueCourses = [
    "All",
    ...new Set(batches.map((b) => b.course).filter(Boolean)),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAddBatch = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course) {
      Swal.fire({
        icon: "warning",
        title: "Batch Name & Course required!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/batches/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          studentsList: [],
          classesList: [],
          materialsList: [],
          videos: [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchBatches();
        setShowAddModal(false);
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Batch Created!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: err.message });
    }
  };

  const handleEditBatch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/api/batches/update/${selectedBatch._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (data.success) {
        await fetchBatches();
        setShowEditModal(false);
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Batch Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: err.message });
    }
  };

  const handleDeleteBatch = (id) => {
    Swal.fire({
      title: "Delete Batch?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/api/batches/delete/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            await fetchBatches();
            Swal.fire("Deleted!", "Batch deleted.", "success");
          } else Swal.fire("Failed!", data.message, "error");
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  const openEditModal = (batch) => {
    setSelectedBatch(batch);
    setFormData({
      name: batch.name || "",
      course: batch.course || "",
      students: batch.students || "",
      schedule: batch.schedule || "",
      teacher: batch.teacher || "",
      description: batch.description || "",
      status: batch.status || "Active",
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      students: "",
      schedule: "",
      teacher: "",
      description: "",
      status: "Active",
    });
    setSelectedBatch(null);
  };

  /* ============ LMS VIEW ============ */
  if (lmsBatchId) {
    return (
      <ClassLMSView
        batchId={lmsBatchId}
        onBack={() => {
          setLmsBatchId(null);
          fetchBatches();
        }}
        adminInfo={adminInfo}
      />
    );
  }

  /* ============ BATCH LIST ============ */
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Batch Maintain</h1>
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
            shadow-lg md:shadow-sm transition-all duration-300 ease-in-out h-full
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t border-gray-200 pt-4"
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

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-y-auto pt-16 md:pt-6">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUsersCogIcon className="text-indigo-600" /> Batch Maintain
              </h1>
              <p className="text-xs text-gray-500">
                Create and manage student batches with full LMS
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-indigo-600">
                {batches.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Batches</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {batches.filter((b) => b.status === "Active").length}
              </p>
              <p className="text-[10px] text-gray-500">Active</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {batches.filter((b) => b.status === "Upcoming").length}
              </p>
              <p className="text-[10px] text-gray-500">Upcoming</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {batches.reduce(
                  (sum, b) =>
                    sum +
                    ((b.studentsList && b.studentsList.length) ||
                      Number(b.students) ||
                      0),
                  0,
                )}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  <option value="All">Status</option>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg"
                >
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5"
                >
                  <FaPlusCircle size={12} /> Create Batch
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <p className="text-xs text-gray-500">Loading batches...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredBatches.map((batch) => {
                const stuCount =
                  (batch.studentsList && batch.studentsList.length) ||
                  Number(batch.students) ||
                  0;
                return (
                  <div
                    key={batch._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div
                      className={`h-1 ${
                        batch.status === "Active"
                          ? "bg-green-500"
                          : batch.status === "Upcoming"
                            ? "bg-yellow-500"
                            : batch.status === "Completed"
                              ? "bg-blue-500"
                              : "bg-red-500"
                      }`}
                    />
                    <div className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-xs mb-0.5">
                            {batch.name}
                          </h3>
                          <p className="text-[10px] text-gray-500">
                            {batch.course}
                          </p>
                        </div>
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(batch.status)}`}
                        >
                          {batch.status}
                        </span>
                      </div>
                      <div className="mt-1.5 space-y-0.5 text-[10px]">
                        <p className="text-gray-600 flex items-center gap-1">
                          <FaUsers className="text-gray-400" size={10} />{" "}
                          {stuCount} Students
                        </p>
                        <p className="text-gray-600 flex items-center gap-1">
                          <FaClock className="text-gray-400" size={10} />{" "}
                          {batch.schedule || "N/A"}
                        </p>
                        {(batch.classesList || []).length > 0 && (
                          <p className="text-purple-600 flex items-center gap-1">
                            <FaCalendarAlt size={10} />{" "}
                            {batch.classesList.length} Class(es)
                          </p>
                        )}
                        {(batch.materialsList || []).length > 0 && (
                          <p className="text-orange-600 flex items-center gap-1">
                            <FaGraduationCap size={10} />{" "}
                            {batch.materialsList.length} Exam/Quiz/PDF
                          </p>
                        )}
                        {(batch.videos || []).length > 0 && (
                          <p className="text-blue-600 flex items-center gap-1">
                            <FaVideo size={10} /> {batch.videos.length} Video(s)
                          </p>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-500 border-t border-gray-100 pt-1.5">
                        <span className="flex items-center gap-0.5">
                          <FaChalkboardTeacher size={10} />{" "}
                          {batch.teacher || "Not Assigned"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                        <button
                          onClick={() => setLmsBatchId(batch._id)}
                          className="text-white bg-indigo-600 hover:bg-indigo-700 text-[10px] font-semibold flex-1 text-center py-1.5 rounded-lg flex items-center justify-center gap-1"
                        >
                          <FaGraduationCap size={11} /> Open LMS
                        </button>
                        <button
                          onClick={() => openEditModal(batch)}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteBatch(batch._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && filteredBatches.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaUsersCogIcon className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Batches Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting filters or create a new batch
              </p>
            </div>
          )}
        </main>
      </div>

      {showAddModal && (
        <BatchFormModal
          title="Create New Batch"
          icon={<FaPlusCircle className="text-indigo-600" />}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddBatch}
          onClose={() => setShowAddModal(false)}
          submitText="Create Batch"
        />
      )}
      {showEditModal && (
        <BatchFormModal
          title="Edit Batch"
          icon={<FaEdit className="text-green-600" />}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEditBatch}
          onClose={() => setShowEditModal(false)}
          submitText="Update Batch"
        />
      )}
    </div>
  );
};

/* ============================================================
   ✅ BATCH FORM MODAL
============================================================ */
const BatchFormModal = ({
  title,
  icon,
  formData,
  setFormData,
  onSubmit,
  onClose,
  submitText,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {icon} {title}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={24} />
        </button>
      </div>
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g., Batch 2026-A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course *
            </label>
            <select
              required
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select Course</option>
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Students
            </label>
            <input
              type="number"
              value={formData.students}
              onChange={(e) =>
                setFormData({ ...formData, students: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule
            </label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g., Mon, Wed 09:00 AM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher
            </label>
            <input
              type="text"
              value={formData.teacher}
              onChange={(e) =>
                setFormData({ ...formData, teacher: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="2"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
          >
            {submitText}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

/* ============================================================
   ✅ CLASS LMS VIEW  (Main LMS)
============================================================ */
const ClassLMSView = ({ batchId, onBack, adminInfo }) => {
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("overview");
  const [lmsSidebarOpen, setLmsSidebarOpen] = useState(false);

  /* ---------- Student ---------- */
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: "",
    studentId: "",
    phone: "",
    guardian: "",
    email: "",
    address: "",
    admissionDate: todayStr(),
    monthlyFee: "",
    status: "Active",
  });

  /* ---------- Class ---------- */
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [classForm, setClassForm] = useState({
    name: "",
    day: "Saturday",
    time: "",
    gender: "Male",
    teacher: "",
    meetingLink: "",
  });

  /* ---------- Attendance ---------- */
  const [attendanceClassId, setAttendanceClassId] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(todayStr());
  const [attendanceDraft, setAttendanceDraft] = useState({});

  /* ---------- Payment ---------- */
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStudentId, setPaymentStudentId] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    month: new Date().toISOString().slice(0, 7),
    amount: "",
    method: "Cash",
    note: "",
  });

  /* ---------- Materials (Exam / Quiz / PDF) ---------- */
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materialForm, setMaterialForm] = useState({
    type: "exam",
    title: "",
    url: "",
    date: todayStr(),
    classId: "",
    marks: "",
    totalMarks: "",
  });
  const [savingMaterial, setSavingMaterial] = useState(false);

  /* ---------- Video ---------- */
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [savingVideo, setSavingVideo] = useState(false);

  /* ---------- Fetch batch ---------- */
  const fetchBatch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/batches/all`);
      const data = await res.json();
      if (data.success) {
        const found = (data.batches || []).find((b) => b._id === batchId);
        setBatch(found || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchId]);

  const saveBatchFields = async (payload, msg = "Saved!") => {
    try {
      const res = await fetch(`${API_URL}/api/batches/update/${batchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        await fetchBatch();
        if (msg)
          Swal.fire({
            icon: "success",
            title: msg,
            timer: 1100,
            showConfirmButton: false,
          });
        return true;
      }
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: data.message || "Error",
      });
      return false;
    } catch (e) {
      Swal.fire({ icon: "error", title: "Server Error", text: e.message });
      return false;
    }
  };

  /* ---------- Derived ---------- */
  const students = batch?.studentsList || [];
  const classesList = batch?.classesList || [];
  const materialsList = batch?.materialsList || [];
  const videos = batch?.videos || [];

  const calcPaid = (s) =>
    (s.paidMonths || []).reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const calcDue = (s) => {
    const fee = Number(s.monthlyFee || 0);
    if (!s.admissionDate || fee <= 0) return 0;
    const start = new Date(s.admissionDate);
    const now = new Date();
    let months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth()) +
      1;
    if (months < 0) months = 0;
    return Math.max(months * fee - calcPaid(s), 0);
  };

  const totalCollected = students.reduce((sum, s) => sum + calcPaid(s), 0);
  const totalDue = students.reduce((sum, s) => sum + calcDue(s), 0);

  /* ---------- Attendance draft: when class/date changes ---------- */
  useEffect(() => {
    if (section !== "attendance" || !batch || !attendanceClassId) return;
    const cls = classesList.find((c) => c._id === attendanceClassId);
    if (!cls) return;
    const existing = (cls.attendance || []).find(
      (a) => a.date === attendanceDate,
    );
    const draft = {};
    students.forEach((s) => {
      draft[s._id] = existing?.records?.[s._id] || "present";
    });
    setAttendanceDraft(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, attendanceDate, attendanceClassId, batch]);

  /* ============================================================
     STUDENT handlers
  ============================================================ */
  const openAddStudent = () => {
    setEditingStudentId(null);
    setStudentForm({
      name: "",
      studentId: "",
      phone: "",
      guardian: "",
      email: "",
      address: "",
      admissionDate: todayStr(),
      monthlyFee: "",
      status: "Active",
    });
    setShowStudentModal(true);
  };

  const openEditStudent = (s) => {
    setEditingStudentId(s._id);
    setStudentForm({
      name: s.name || "",
      studentId: s.studentId || "",
      phone: s.phone || "",
      guardian: s.guardian || "",
      email: s.email || "",
      address: s.address || "",
      admissionDate: s.admissionDate || todayStr(),
      monthlyFee: s.monthlyFee || "",
      status: s.status || "Active",
    });
    setShowStudentModal(true);
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if (!studentForm.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Student Name required!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    let updatedList;
    if (editingStudentId) {
      updatedList = students.map((s) =>
        s._id === editingStudentId
          ? {
              ...s,
              ...studentForm,
              monthlyFee: Number(studentForm.monthlyFee) || 0,
            }
          : s,
      );
    } else {
      const newStudent = {
        _id: uid("stu"),
        ...studentForm,
        studentId:
          studentForm.studentId.trim() ||
          `S-${Date.now().toString().slice(-5)}`,
        monthlyFee: Number(studentForm.monthlyFee) || 0,
        paidMonths: [],
        createdAt: new Date().toISOString(),
      };
      updatedList = [...students, newStudent];
    }
    const ok = await saveBatchFields(
      { studentsList: updatedList, students: updatedList.length },
      editingStudentId ? "Student Updated!" : "Student Added!",
    );
    if (ok) setShowStudentModal(false);
  };

  const handleDeleteStudent = (id) => {
    Swal.fire({
      title: "Delete Student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        const updatedList = students.filter((s) => s._id !== id);
        await saveBatchFields(
          { studentsList: updatedList, students: updatedList.length },
          "Student Deleted!",
        );
      }
    });
  };

  /* ============================================================
     CLASS handlers
  ============================================================ */
  const openAddClass = () => {
    setEditingClassId(null);
    setClassForm({
      name: "",
      day: "Saturday",
      time: "",
      gender: "Male",
      teacher: "",
      meetingLink: "",
    });
    setShowClassModal(true);
  };

  const openEditClass = (c) => {
    setEditingClassId(c._id);
    setClassForm({
      name: c.name || "",
      day: c.day || "Saturday",
      time: c.time || "",
      gender: c.gender || "Male",
      teacher: c.teacher || "",
      meetingLink: c.meetingLink || "",
    });
    setShowClassModal(true);
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!classForm.name.trim() || !classForm.time.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Class Name & Time required!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    let updated;
    if (editingClassId) {
      updated = classesList.map((c) =>
        c._id === editingClassId ? { ...c, ...classForm } : c,
      );
    } else {
      updated = [
        ...classesList,
        {
          _id: uid("cls"),
          ...classForm,
          attendance: [],
          createdAt: new Date().toISOString(),
        },
      ];
    }
    const ok = await saveBatchFields(
      { classesList: updated },
      editingClassId ? "Class Updated!" : "Class Added!",
    );
    if (ok) setShowClassModal(false);
  };

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Delete Class?",
      text: "Attendance & all records under this class will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await saveBatchFields(
          { classesList: classesList.filter((c) => c._id !== id) },
          "Class Deleted!",
        );
        if (attendanceClassId === id) setAttendanceClassId("");
      }
    });
  };

  /* ============================================================
     ATTENDANCE handlers
  ============================================================ */
  const handleSaveAttendance = async () => {
    if (!attendanceClassId) {
      Swal.fire({
        icon: "warning",
        title: "Select a class first!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    if (students.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No students in batch!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    const updated = classesList.map((c) => {
      if (c._id !== attendanceClassId) return c;
      const others = (c.attendance || []).filter(
        (a) => a.date !== attendanceDate,
      );
      return {
        ...c,
        attendance: [
          ...others,
          {
            date: attendanceDate,
            records: attendanceDraft,
            markedAt: new Date().toISOString(),
          },
        ],
      };
    });
    await saveBatchFields({ classesList: updated }, "Attendance Saved!");
  };

  /* ============================================================
     PAYMENT handlers
  ============================================================ */
  const openPaymentModal = (s) => {
    setPaymentStudentId(s._id);
    setPaymentForm({
      month: new Date().toISOString().slice(0, 7),
      amount: s.monthlyFee || "",
      method: "Cash",
      note: "",
    });
    setShowPaymentModal(true);
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Enter amount!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    const updatedList = students.map((s) => {
      if (s._id !== paymentStudentId) return s;
      return {
        ...s,
        paidMonths: [
          ...(s.paidMonths || []),
          {
            _id: uid("pay"),
            month: paymentForm.month,
            amount: Number(paymentForm.amount),
            method: paymentForm.method,
            note: paymentForm.note.trim(),
            paidAt: new Date().toISOString(),
          },
        ],
      };
    });
    const ok = await saveBatchFields(
      { studentsList: updatedList },
      "Payment Recorded!",
    );
    if (ok) setShowPaymentModal(false);
  };

  const handleDeletePayment = (studentId, paymentId) => {
    Swal.fire({
      title: "Delete Payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        const updated = students.map((s) =>
          s._id === studentId
            ? {
                ...s,
                paidMonths: (s.paidMonths || []).filter(
                  (p) => p._id !== paymentId,
                ),
              }
            : s,
        );
        await saveBatchFields({ studentsList: updated }, "Payment Deleted!");
      }
    });
  };

  /* ============================================================
     MATERIAL (Exam / Quiz / PDF) handlers
  ============================================================ */
  const handleMaterialFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File too large!",
        text: "Max 2MB. বড় ফাইল হলে URL ব্যবহার করুন।",
      });
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      setMaterialForm((p) => ({
        ...p,
        url: dataUrl,
        title: p.title || file.name,
      }));
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    if (!materialForm.title.trim() || !materialForm.url.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title & URL/File required!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    setSavingMaterial(true);
    const newItem = {
      _id: uid("mat"),
      type: materialForm.type,
      title: materialForm.title.trim(),
      url: materialForm.url.trim(),
      date: materialForm.date || todayStr(),
      classId: materialForm.classId || null,
      marks: materialForm.marks === "" ? null : Number(materialForm.marks),
      totalMarks:
        materialForm.totalMarks === "" ? null : Number(materialForm.totalMarks),
      addedAt: new Date().toISOString(),
    };
    const ok = await saveBatchFields(
      { materialsList: [...materialsList, newItem] },
      "Uploaded!",
    );
    setSavingMaterial(false);
    if (ok) {
      setMaterialForm({
        type: "exam",
        title: "",
        url: "",
        date: todayStr(),
        classId: "",
        marks: "",
        totalMarks: "",
      });
      setShowMaterialModal(false);
    }
  };

  const handleDeleteMaterial = (id) => {
    Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await saveBatchFields(
          { materialsList: materialsList.filter((m) => m._id !== id) },
          "Deleted!",
        );
      }
    });
  };

  /* ============================================================
     VIDEO handlers
  ============================================================ */
  const handleAddVideo = async () => {
    if (!newVideo.title.trim() || !newVideo.url.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title & URL required!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }
    setSavingVideo(true);
    const updated = [
      ...videos,
      {
        title: newVideo.title.trim(),
        url: newVideo.url.trim(),
        addedAt: new Date().toISOString(),
      },
    ];
    const ok = await saveBatchFields({ videos: updated }, "Video Added!");
    setSavingVideo(false);
    if (ok) setNewVideo({ title: "", url: "" });
  };

  const handleDeleteVideo = (index) => {
    Swal.fire({
      title: "Delete Video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await saveBatchFields(
          { videos: videos.filter((_, i) => i !== index) },
          "Video Deleted!",
        );
      }
    });
  };

  /* ============================================================
     SIDEBAR sections
  ============================================================ */
  const sections = [
    { id: "overview", label: "Overview", icon: <FaHome size={16} /> },
    {
      id: "students",
      label: "Students",
      icon: <FaUserGraduate size={16} />,
      badge: students.length,
    },
    {
      id: "classes",
      label: "Classes",
      icon: <FaChalkboardTeacher size={16} />,
      badge: classesList.length,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: <FaCalendarCheck size={16} />,
    },
    { id: "payments", label: "Payments", icon: <FaMoneyCheckAlt size={16} /> },
    {
      id: "materials",
      label: "Exams & Quizzes",
      icon: <FaGraduationCap size={16} />,
      badge: materialsList.length,
    },
    {
      id: "videos",
      label: "Class Videos",
      icon: <FaVideo size={16} />,
      badge: videos.length,
    },
  ];

  /* ============================================================
     RENDER
  ============================================================ */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading class...</p>
      </div>
    );
  }
  if (!batch) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <FaInfoCircle className="text-4xl text-gray-300 mb-3" />
        <p className="text-sm text-gray-600 mb-3">Batch not found</p>
        <button
          onClick={onBack}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-xs"
        >
          Back to Batches
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* ================= LMS SIDEBAR ================= */}
      <aside
        className={`
          fixed md:relative z-50 w-64 bg-[#0f172a] text-white h-full flex flex-col
          transition-all duration-300
          ${lmsSidebarOpen ? "left-0" : "-left-64 md:left-0"}
        `}
      >
        <div className="p-4 border-b border-white/10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-white mb-3"
          >
            <FaArrowLeft size={11} /> Back to Batches
          </button>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
              LMS • Batch
            </p>
            <p className="font-bold text-sm mt-0.5 truncate">{batch.name}</p>
            <p className="text-[10px] text-gray-400 truncate">{batch.course}</p>
            <div className="mt-2 flex items-center gap-2 text-[10px] flex-wrap">
              <span
                className={`px-1.5 py-0.5 rounded-full ${
                  batch.status === "Active"
                    ? "bg-green-500/20 text-green-300"
                    : batch.status === "Upcoming"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {batch.status}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <FaUsers size={9} /> {students.length}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <FaChalkboardTeacher size={9} /> {classesList.length}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSection(s.id);
                setLmsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                section === s.id
                  ? "bg-teal-600/30 text-white font-semibold border-l-4 border-teal-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {s.icon}
                <span>{s.label}</span>
              </div>
              {s.badge !== undefined && s.badge > 0 && (
                <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded-full">
                  {s.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold">
            {adminInfo?.name?.charAt(0) || "A"}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold truncate">
              {adminInfo?.name}
            </p>
            <p className="text-[9px] text-gray-400 truncate">
              {adminInfo?.designation}
            </p>
          </div>
        </div>
      </aside>

      {lmsSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setLmsSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLmsSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
            >
              <FiMenu size={20} />
            </button>
            <div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <FaGraduationCap className="text-indigo-600" /> Learning
                Management System
              </p>
              <h1 className="text-base font-bold text-gray-800">
                {sections.find((s) => s.id === section)?.label}
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-right">
              <p className="text-[9px] text-gray-500">Collected / Due</p>
              <p className="text-xs font-bold">
                <span className="text-green-600">৳{totalCollected}</span>
                <span className="text-gray-400"> / </span>
                <span className="text-red-600">৳{totalDue}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* ==================== OVERVIEW ==================== */}
          {section === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  icon={<FaUserGraduate />}
                  label="Students"
                  value={students.length}
                  color="indigo"
                />
                <StatCard
                  icon={<FaChalkboardTeacher />}
                  label="Classes"
                  value={classesList.length}
                  color="purple"
                />
                <StatCard
                  icon={<FaWallet />}
                  label="Collected"
                  value={`৳${totalCollected}`}
                  color="green"
                />
                <StatCard
                  icon={<FaMoneyCheckAlt />}
                  label="Total Due"
                  value={`৳${totalDue}`}
                  color="red"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-indigo-600" /> Batch
                    Information
                  </p>
                  <div className="space-y-2 text-xs">
                    <InfoRow label="Course" value={batch.course} />
                    <InfoRow label="Status" value={batch.status} />
                    <InfoRow
                      label="Teacher"
                      value={batch.teacher || "Not Assigned"}
                    />
                    <InfoRow label="Schedule" value={batch.schedule || "N/A"} />
                    <InfoRow label="Classes" value={classesList.length} />
                    <InfoRow
                      label="Exams/Quizzes/PDF"
                      value={materialsList.length}
                    />
                    <InfoRow label="Videos" value={videos.length} />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaClipboardList className="text-indigo-600" /> Description
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {batch.description || "No description provided"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <QuickAction
                    icon={<FaUserPlus />}
                    label="Add Student"
                    onClick={openAddStudent}
                    color="indigo"
                  />
                  <QuickAction
                    icon={<FaChalkboardTeacher />}
                    label="Add Class"
                    onClick={openAddClass}
                    color="purple"
                  />
                  <QuickAction
                    icon={<FaCalendarCheck />}
                    label="Take Attendance"
                    onClick={() => setSection("attendance")}
                    color="blue"
                  />
                  <QuickAction
                    icon={<FaMoneyCheckAlt />}
                    label="Record Payment"
                    onClick={() => {
                      if (students.length === 0) {
                        Swal.fire({
                          icon: "info",
                          title: "Add student first",
                          timer: 1400,
                          showConfirmButton: false,
                        });
                        return;
                      }
                      openPaymentModal(students[0]);
                    }}
                    color="green"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== STUDENTS ==================== */}
          {section === "students" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Enrolled Students
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Total {students.length} students in this batch
                  </p>
                </div>
                <button
                  onClick={openAddStudent}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5"
                >
                  <FaUserPlus size={12} /> Add Student
                </button>
              </div>

              {students.length === 0 ? (
                <EmptyState
                  icon={<FaUserGraduate />}
                  title="No students yet"
                  subtitle="Click 'Add Student' to enroll the first student"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {students.map((stu) => {
                    const due = calcDue(stu);
                    const paid = calcPaid(stu);
                    return (
                      <div
                        key={stu._id}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {stu.name?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm text-gray-800 truncate">
                              {stu.name}
                            </p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                              <FaIdCard size={9} /> {stu.studentId}
                            </p>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                              stu.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {stu.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1 text-[11px] text-gray-600">
                          {stu.phone && (
                            <p className="flex items-center gap-1.5">
                              <FaPhone size={9} className="text-gray-400" />{" "}
                              {stu.phone}
                            </p>
                          )}
                          {stu.guardian && (
                            <p className="flex items-center gap-1.5">
                              <FaUser size={9} className="text-gray-400" />{" "}
                              {stu.guardian}
                            </p>
                          )}
                          {stu.email && (
                            <p className="flex items-center gap-1.5 truncate">
                              <FaEnvelope size={9} className="text-gray-400" />{" "}
                              {stu.email}
                            </p>
                          )}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-1.5 text-center">
                          <div className="bg-green-50 rounded-md py-1.5">
                            <p className="text-[9px] text-green-600">Paid</p>
                            <p className="text-[11px] font-bold text-green-700">
                              ৳{paid}
                            </p>
                          </div>
                          <div className="bg-red-50 rounded-md py-1.5">
                            <p className="text-[9px] text-red-600">Due</p>
                            <p className="text-[11px] font-bold text-red-700">
                              ৳{due}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-1 pt-3 border-t border-gray-100">
                          <MiniBtn
                            icon={<FaMoneyCheckAlt size={11} />}
                            label="Pay"
                            color="green"
                            onClick={() => openPaymentModal(stu)}
                          />
                          <MiniBtn
                            icon={<FaEdit size={11} />}
                            label="Edit"
                            color="indigo"
                            onClick={() => openEditStudent(stu)}
                          />
                          <MiniBtn
                            icon={<FaTrash size={11} />}
                            label="Del"
                            color="red"
                            onClick={() => handleDeleteStudent(stu._id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ==================== CLASSES ==================== */}
          {section === "classes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Classes / Schedule
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Add multiple classes (e.g., 3:00–4:30 PM Female, 5:00–6:30
                    PM Male)
                  </p>
                </div>
                <button
                  onClick={openAddClass}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5"
                >
                  <FaPlusCircle size={12} /> Add Class
                </button>
              </div>

              {classesList.length === 0 ? (
                <EmptyState
                  icon={<FaChalkboardTeacher />}
                  title="No classes yet"
                  subtitle="Add a class with Day, Time, Gender & Teacher"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {classesList.map((c) => {
                    const attendanceCount = (c.attendance || []).length;
                    return (
                      <div
                        key={c._id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                      >
                        <div
                          className={`h-1 ${
                            c.gender === "Female"
                              ? "bg-pink-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                                Class
                              </p>
                              <p className="font-bold text-sm text-gray-800">
                                {c.name}
                              </p>
                            </div>
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                c.gender === "Female"
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {c.gender}
                            </span>
                          </div>
                          <div className="mt-2 space-y-1 text-[11px] text-gray-600">
                            <p className="flex items-center gap-1.5">
                              <FaCalendarAlt
                                size={10}
                                className="text-gray-400"
                              />{" "}
                              {c.day}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <FaClock size={10} className="text-gray-400" />{" "}
                              {c.time}
                            </p>
                            {c.teacher && (
                              <p className="flex items-center gap-1.5">
                                <FaChalkboardTeacher
                                  size={10}
                                  className="text-gray-400"
                                />{" "}
                                {c.teacher}
                              </p>
                            )}
                            {c.meetingLink && (
                              <a
                                href={c.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold"
                              >
                                <FaLink size={10} /> Join Meeting
                              </a>
                            )}
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FaCalendarCheck size={9} /> {attendanceCount}{" "}
                              Attendance
                            </span>
                          </div>

                          <div className="mt-3 grid grid-cols-3 gap-1 pt-3 border-t border-gray-100">
                            <MiniBtn
                              icon={<FaCalendarCheck size={11} />}
                              label="Attend"
                              color="blue"
                              onClick={() => {
                                setAttendanceClassId(c._id);
                                setAttendanceDate(todayStr());
                                setSection("attendance");
                              }}
                            />
                            <MiniBtn
                              icon={<FaEdit size={11} />}
                              label="Edit"
                              color="indigo"
                              onClick={() => openEditClass(c)}
                            />
                            <MiniBtn
                              icon={<FaTrash size={11} />}
                              label="Del"
                              color="red"
                              onClick={() => handleDeleteClass(c._id)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ==================== ATTENDANCE ==================== */}
          {section === "attendance" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <FaChalkboardTeacher className="text-indigo-600" />
                  <label className="text-xs font-semibold text-gray-700">
                    Class:
                  </label>
                  <select
                    value={attendanceClassId}
                    onChange={(e) => setAttendanceClassId(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs"
                  >
                    <option value="">— Select Class —</option>
                    {classesList.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} • {c.day} {c.time} ({c.gender})
                      </option>
                    ))}
                  </select>
                  <FaCalendarCheck className="text-indigo-600 ml-2" />
                  <label className="text-xs font-semibold text-gray-700">
                    Date:
                  </label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="flex items-center gap-3 text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-green-700">
                    <FaCheck /> Present
                  </span>
                  <span className="flex items-center gap-1 text-red-700">
                    <FaTimes /> Absent
                  </span>
                  <span className="flex items-center gap-1 text-yellow-700">
                    <FaClock /> Late
                  </span>
                </div>
              </div>

              {classesList.length === 0 ? (
                <EmptyState
                  icon={<FaChalkboardTeacher />}
                  title="No classes yet"
                  subtitle="Add a class first in the Classes section"
                />
              ) : !attendanceClassId ? (
                <EmptyState
                  icon={<FaCalendarCheck />}
                  title="Select a class"
                  subtitle="Choose a class above to take attendance"
                />
              ) : students.length === 0 ? (
                <EmptyState
                  icon={<FaUserGraduate />}
                  title="No students in this batch"
                  subtitle="Add students first in the Students section"
                />
              ) : (
                <>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-100 px-4 py-2.5 text-[11px] font-bold text-gray-600">
                      <div className="col-span-5">Student</div>
                      <div className="col-span-7 text-right">
                        Attendance Mark
                      </div>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                      {students.map((stu) => {
                        const val = attendanceDraft[stu._id] || "present";
                        return (
                          <div
                            key={stu._id}
                            className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50"
                          >
                            <div className="col-span-5 flex items-center gap-2 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {stu.name?.charAt(0)?.toUpperCase() || "S"}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">
                                  {stu.name}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate">
                                  {stu.studentId}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-7 flex justify-end gap-1.5">
                              {[
                                {
                                  id: "present",
                                  label: "Present",
                                  icon: <FaCheck size={11} />,
                                },
                                {
                                  id: "absent",
                                  label: "Absent",
                                  icon: <FaTimes size={11} />,
                                },
                                {
                                  id: "late",
                                  label: "Late",
                                  icon: <FaClock size={11} />,
                                },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() =>
                                    setAttendanceDraft({
                                      ...attendanceDraft,
                                      [stu._id]: opt.id,
                                    })
                                  }
                                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                                    val === opt.id
                                      ? opt.id === "present"
                                        ? "bg-green-600 text-white"
                                        : opt.id === "absent"
                                          ? "bg-red-600 text-white"
                                          : "bg-yellow-500 text-white"
                                      : opt.id === "present"
                                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                                        : opt.id === "absent"
                                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                  }`}
                                >
                                  {opt.icon} {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveAttendance}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FaCheckCircle /> Save Attendance for {attendanceDate}
                  </button>
                </>
              )}
            </div>
          )}

          {/* ==================== PAYMENTS ==================== */}
          {section === "payments" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SummaryCard
                  label="Total Collected"
                  value={`৳${totalCollected}`}
                  color="green"
                />
                <SummaryCard
                  label="Total Due"
                  value={`৳${totalDue}`}
                  color="red"
                />
                <SummaryCard
                  label="Students with Due"
                  value={students.filter((s) => calcDue(s) > 0).length}
                  color="orange"
                />
              </div>

              {students.length === 0 ? (
                <EmptyState
                  icon={<FaMoneyCheckAlt />}
                  title="No students yet"
                  subtitle="Add students to record payments"
                />
              ) : (
                <div className="space-y-3">
                  {students.map((stu) => {
                    const due = calcDue(stu);
                    const paid = calcPaid(stu);
                    return (
                      <div
                        key={stu._id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {stu.name?.charAt(0)?.toUpperCase() || "S"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-800 truncate">
                                {stu.name}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                Monthly Fee: ৳{stu.monthlyFee || 0} • ID:{" "}
                                {stu.studentId}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-[10px] text-gray-500">
                                Paid / Due
                              </p>
                              <p className="text-sm font-bold">
                                <span className="text-green-600">৳{paid}</span>
                                <span className="text-gray-400"> / </span>
                                <span className="text-red-600">৳{due}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => openPaymentModal(stu)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1"
                            >
                              <FaPlusCircle size={11} /> Pay
                            </button>
                          </div>
                        </div>

                        {(stu.paidMonths || []).length > 0 ? (
                          <div className="bg-gray-50 px-4 py-3">
                            <p className="text-[11px] font-bold text-gray-600 mb-2">
                              Payment History
                            </p>
                            <div className="space-y-1.5">
                              {[...(stu.paidMonths || [])]
                                .sort(
                                  (a, b) =>
                                    new Date(b.paidAt) - new Date(a.paidAt),
                                )
                                .map((p) => (
                                  <div
                                    key={p._id}
                                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                                  >
                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold text-gray-800">
                                        {p.month} — ৳{p.amount}{" "}
                                        <span className="text-gray-400 font-normal">
                                          ({p.method})
                                        </span>
                                      </p>
                                      <p className="text-[10px] text-gray-400">
                                        {new Date(
                                          p.paidAt,
                                        ).toLocaleDateString()}
                                        {p.note ? ` • ${p.note}` : ""}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleDeletePayment(stu._id, p._id)
                                      }
                                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                    >
                                      <FaTrash size={11} />
                                    </button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 px-4 py-2.5">
                            <p className="text-[10px] text-gray-400 italic text-center">
                              No payment history
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ==================== MATERIALS (Exams & Quizzes & PDF) ==================== */}
          {section === "materials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Exams, Quizzes & PDFs
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Upload exam results, quiz links, and PDF notes for this
                    batch
                  </p>
                </div>
                <button
                  onClick={() => setShowMaterialModal(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5"
                >
                  <FaUpload size={11} /> Upload Material
                </button>
              </div>

              {/* Filter counts */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <FaFilePdf className="text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-700">
                    {materialsList.filter((m) => m.type === "pdf").length}
                  </p>
                  <p className="text-[10px] text-red-600 font-semibold">
                    PDF Notes
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                  <MdOutlineQuiz className="text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-700">
                    {materialsList.filter((m) => m.type === "quiz").length}
                  </p>
                  <p className="text-[10px] text-blue-600 font-semibold">
                    Quizzes
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
                  <FaGraduationCap className="text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-700">
                    {materialsList.filter((m) => m.type === "exam").length}
                  </p>
                  <p className="text-[10px] text-purple-600 font-semibold">
                    Exams
                  </p>
                </div>
              </div>

              {materialsList.length === 0 ? (
                <EmptyState
                  icon={<FaGraduationCap />}
                  title="No materials yet"
                  subtitle="Click 'Upload Material' to add exams, quizzes or PDFs"
                />
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {[...materialsList]
                      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                      .map((m) => {
                        const cls = classesList.find(
                          (c) => c._id === m.classId,
                        );
                        return (
                          <div
                            key={m._id}
                            className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  m.type === "pdf"
                                    ? "bg-red-100 text-red-600"
                                    : m.type === "quiz"
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-purple-100 text-purple-600"
                                }`}
                              >
                                {m.type === "pdf" ? (
                                  <FaFilePdf size={15} />
                                ) : m.type === "quiz" ? (
                                  <MdOutlineQuiz size={16} />
                                ) : (
                                  <FaGraduationCap size={15} />
                                )}
                              </span>
                              <div className="min-w-0">
                                <a
                                  href={m.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-semibold text-gray-800 hover:text-blue-700 truncate block"
                                >
                                  {m.title}
                                </a>
                                <p className="text-[10px] text-gray-500 flex items-center gap-2 flex-wrap">
                                  <span className="uppercase font-bold">
                                    {m.type}
                                  </span>
                                  <span>• {m.date}</span>
                                  {cls && (
                                    <span className="text-purple-600 font-semibold">
                                      • {cls.name}
                                    </span>
                                  )}
                                  {m.marks !== null &&
                                    m.totalMarks !== null && (
                                      <span className="text-green-700 font-bold">
                                        • {m.marks}/{m.totalMarks}
                                      </span>
                                    )}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteMaterial(m._id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 flex-shrink-0"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== VIDEOS ==================== */}
          {section === "videos" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                  <FaVideo className="text-red-500" /> Add Class Video
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Title (e.g., Class 1, Introduction...)"
                    value={newVideo.title}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                  <input
                    type="url"
                    placeholder="https://youtube.com/... or https://drive.google.com/..."
                    value={newVideo.url}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, url: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                  <div className="md:col-span-2">
                    <button
                      onClick={handleAddVideo}
                      disabled={savingVideo}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
                    >
                      {savingVideo ? (
                        "Saving..."
                      ) : (
                        <>
                          <FaCheckCircle size={11} /> Save Video
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-bold text-gray-700">
                    Class Video Library ({videos.length})
                  </p>
                </div>
                {videos.length === 0 ? (
                  <p className="text-[10px] text-gray-400 italic text-center py-4">
                    No videos added yet
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {videos.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50"
                      >
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 truncate"
                        >
                          <FaVideo
                            size={12}
                            className="text-red-500 flex-shrink-0"
                          />
                          {v.title || `Video ${i + 1}`}
                        </a>
                        <button
                          onClick={() => handleDeleteVideo(i)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 flex-shrink-0"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================ Add/Edit Student Modal ================ */}
      {showStudentModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-indigo-600" />
                {editingStudentId ? "Edit Student" : "Add New Student"}
              </h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleSaveStudent} className="p-5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={studentForm.studentId}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        studentId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="Auto-generate if empty"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={studentForm.phone}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={studentForm.guardian}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        guardian: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={studentForm.email}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    value={studentForm.admissionDate}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        admissionDate: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Monthly Fee (৳)
                  </label>
                  <input
                    type="number"
                    value={studentForm.monthlyFee}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        monthlyFee: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={studentForm.status}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={studentForm.address}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <FaCheckCircle size={12} />{" "}
                  {editingStudentId ? "Update" : "Save"} Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================ Add/Edit Class Modal ================ */}
      {showClassModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaChalkboardTeacher className="text-purple-600" />
                {editingClassId ? "Edit Class" : "Add New Class"}
              </h3>
              <button
                onClick={() => setShowClassModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleSaveClass} className="p-5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Class Name / Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={classForm.name}
                    onChange={(e) =>
                      setClassForm({ ...classForm, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="e.g., Morning Female Batch"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Day *
                  </label>
                  <select
                    value={classForm.day}
                    onChange={(e) =>
                      setClassForm({ ...classForm, day: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Time (e.g., 3:00 PM - 4:30 PM) *
                  </label>
                  <input
                    type="text"
                    required
                    value={classForm.time}
                    onChange={(e) =>
                      setClassForm({ ...classForm, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="03:00 PM - 04:30 PM"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <FaVenusMars className="text-pink-500" /> Gender *
                  </label>
                  <select
                    value={classForm.gender}
                    onChange={(e) =>
                      setClassForm({ ...classForm, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Teacher
                  </label>
                  <input
                    type="text"
                    value={classForm.teacher}
                    onChange={(e) =>
                      setClassForm({ ...classForm, teacher: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="Teacher name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={classForm.meetingLink}
                    onChange={(e) =>
                      setClassForm({
                        ...classForm,
                        meetingLink: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <FaCheckCircle size={12} />{" "}
                  {editingClassId ? "Update" : "Save"} Class
                </button>
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================ Payment Modal ================ */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaMoneyCheckAlt className="text-green-600" /> Record Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSavePayment} className="p-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Month *
                </label>
                <input
                  type="month"
                  required
                  value={paymentForm.month}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, month: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Amount (৳) *
                </label>
                <input
                  type="number"
                  required
                  value={paymentForm.amount}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, amount: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Method
                </label>
                <select
                  value={paymentForm.method}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, method: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                >
                  <option value="Cash">Cash</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Note
                </label>
                <input
                  type="text"
                  value={paymentForm.note}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, note: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  placeholder="Optional"
                />
              </div>
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold text-xs"
                >
                  Save Payment
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================ Upload Material Modal (Exam/Quiz/PDF) ================ */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaGraduationCap className="text-orange-600" /> Upload Exam /
                Quiz / PDF
              </h3>
              <button
                onClick={() => setShowMaterialModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleAddMaterial} className="p-5 space-y-3">
              {/* Type */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "exam",
                    label: "Exam",
                    icon: <FaGraduationCap />,
                    color: "purple",
                  },
                  {
                    id: "quiz",
                    label: "Quiz",
                    icon: <MdOutlineQuiz />,
                    color: "blue",
                  },
                  {
                    id: "pdf",
                    label: "PDF",
                    icon: <FaFilePdf />,
                    color: "red",
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setMaterialForm({ ...materialForm, type: t.id, url: "" })
                    }
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${
                      materialForm.type === t.id
                        ? `border-${t.color}-500 bg-${t.color}-50 text-${t.color}-700 font-bold`
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-[11px] font-semibold">{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={materialForm.title}
                    onChange={(e) =>
                      setMaterialForm({
                        ...materialForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                    placeholder={
                      materialForm.type === "pdf"
                        ? "e.g., Tajweed Notes Chapter 1"
                        : materialForm.type === "quiz"
                          ? "e.g., Weekly Quiz 3"
                          : "e.g., Mid-Term Exam 2026"
                    }
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={materialForm.date}
                    onChange={(e) =>
                      setMaterialForm({ ...materialForm, date: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Assign to Class (optional)
                  </label>
                  <select
                    value={materialForm.classId}
                    onChange={(e) =>
                      setMaterialForm({
                        ...materialForm,
                        classId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="">Whole Batch</option>
                    {classesList.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.gender})
                      </option>
                    ))}
                  </select>
                </div>

                {materialForm.type === "exam" && (
                  <>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Total Marks
                      </label>
                      <input
                        type="number"
                        value={materialForm.totalMarks}
                        onChange={(e) =>
                          setMaterialForm({
                            ...materialForm,
                            totalMarks: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                        placeholder="e.g., 100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Obtained Marks
                      </label>
                      <input
                        type="number"
                        value={materialForm.marks}
                        onChange={(e) =>
                          setMaterialForm({
                            ...materialForm,
                            marks: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs"
                        placeholder="e.g., 85"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    {materialForm.type === "pdf"
                      ? "Upload PDF (max 2MB) অথবা URL *"
                      : "URL *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={materialForm.url}
                    onChange={(e) =>
                      setMaterialForm({ ...materialForm, url: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-xs mb-2"
                    placeholder={
                      materialForm.type === "pdf"
                        ? "https://drive.google.com/... অথবা ফাইল নির্বাচন করুন"
                        : materialForm.type === "quiz"
                          ? "https://forms.gle/... or https://quizizz.com/..."
                          : "https://drive.google.com/... or exam result link"
                    }
                  />
                  {materialForm.type === "pdf" && (
                    <label className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[11px] font-semibold cursor-pointer">
                      <FaUpload size={11} /> Choose File
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={handleMaterialFile}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={savingMaterial}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
                >
                  {savingMaterial ? (
                    "Saving..."
                  ) : (
                    <>
                      <FaUpload size={11} /> Upload
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-semibold text-xs"
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

/* ============================================================
   ✅ Small reusable UI
============================================================ */
const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color]} text-white flex items-center justify-center text-sm`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, color }) => {
  const colorMap = {
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };
  return (
    <div className={`border rounded-xl p-4 text-center ${colorMap[color]}`}>
      <p className="text-[11px] font-semibold opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <p className="flex justify-between items-center border-b border-gray-100 pb-1.5">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </p>
);

const QuickAction = ({ icon, label, onClick, color }) => {
  const colorMap = {
    indigo:
      "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200",
    green: "bg-green-50 hover:bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200",
    purple:
      "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200",
  };
  return (
    <button
      onClick={onClick}
      className={`border rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all ${colorMap[color]}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[11px] font-semibold">{label}</span>
    </button>
  );
};

const MiniBtn = ({ icon, label, color, onClick }) => {
  const colorMap = {
    green: "text-green-700 bg-green-50 hover:bg-green-100",
    blue: "text-blue-700 bg-blue-50 hover:bg-blue-100",
    indigo: "text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
    red: "text-red-700 bg-red-50 hover:bg-red-100",
  };
  return (
    <button
      onClick={onClick}
      className={`text-[9px] font-semibold rounded py-1.5 flex flex-col items-center gap-0.5 ${colorMap[color]}`}
    >
      {icon} {label}
    </button>
  );
};

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
    <div className="text-5xl text-gray-300 flex justify-center mb-3">
      {icon}
    </div>
    <p className="text-sm font-bold text-gray-700">{title}</p>
    <p className="text-[11px] text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default Student_batch;
