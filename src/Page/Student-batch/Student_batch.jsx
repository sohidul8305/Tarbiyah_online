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
  FaUserTimes,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaLayerGroup,
  FaVideo,
  FaLink,
  FaUsersCog as FaUsersCogIcon,
  FaCheckCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_URL = "http://localhost:5010";

// ✅ Fixed Course List
const COURSE_OPTIONS = [
  "Qaida Nuraniyah",
  "Quran Nazera",
  "Bakarah Hifz",
  "Basic Tajweed (Level-1)",
];

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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    students: "",
    schedule: "",
    teacher: "",
    videoUrl: "",
    description: "",
    status: "Active",
  });

  // ✅ Video management states
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [savingVideo, setSavingVideo] = useState(false);

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

  // ✅ Fetch batches from API
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/batches/all`);
      const data = await res.json();
      if (data.success) {
        setBatches(data.batches || []);
      } else {
        setBatches([]);
      }
    } catch (error) {
      console.error("❌ Fetch batches error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to load batches",
        text: "Server connection error. Is backend running on port 5010?",
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

  // Filter batches
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

  // ✅ Add Batch
  const handleAddBatch = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course) {
      Swal.fire({
        icon: "warning",
        title: "Batch Name এবং Course আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/batches/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        await fetchBatches();
        setShowAddModal(false);
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Batch Created!",
          text: "New batch saved to database.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.message,
      });
    }
  };

  // ✅ Edit Batch
  const handleEditBatch = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course) {
      Swal.fire({
        icon: "warning",
        title: "Batch Name এবং Course আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

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
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.message,
      });
    }
  };

  // ✅ Delete Batch
  const handleDeleteBatch = (id) => {
    Swal.fire({
      title: "Delete Batch?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/api/batches/delete/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            await fetchBatches();
            Swal.fire("Deleted!", "Batch has been deleted.", "success");
          } else {
            Swal.fire("Failed!", data.message || "Error", "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  // ✅ Add Video to batch
  const handleAddVideo = async () => {
    if (!newVideo.title.trim() || !newVideo.url.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title এবং URL আবশ্যক!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setSavingVideo(true);
    try {
      const updatedVideos = [
        ...(selectedBatch.videos || []),
        {
          title: newVideo.title.trim(),
          url: newVideo.url.trim(),
          addedAt: new Date().toISOString(),
        },
      ];

      const res = await fetch(
        `${API_URL}/api/batches/update/${selectedBatch._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videos: updatedVideos }),
        },
      );
      const data = await res.json();

      if (data.success) {
        setSelectedBatch({ ...selectedBatch, videos: updatedVideos });
        setNewVideo({ title: "", url: "" });
        setShowVideoForm(false);
        await fetchBatches();
        Swal.fire({
          icon: "success",
          title: "✅ Video Added!",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", error.message, "error");
    } finally {
      setSavingVideo(false);
    }
  };

  // ✅ Delete Video
  const handleDeleteVideo = (index) => {
    Swal.fire({
      title: "Delete Video?",
      text: "This video will be removed from this batch.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedVideos = (selectedBatch.videos || []).filter(
            (_, i) => i !== index,
          );

          const res = await fetch(
            `${API_URL}/api/batches/update/${selectedBatch._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ videos: updatedVideos }),
            },
          );
          const data = await res.json();

          if (data.success) {
            setSelectedBatch({ ...selectedBatch, videos: updatedVideos });
            await fetchBatches();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire("Failed!", data.message || "Error", "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
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
      videoUrl: batch.videoUrl || "",
      description: batch.description || "",
      status: batch.status || "Active",
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (batch) => {
    setSelectedBatch(batch);
    setShowVideoForm(false);
    setNewVideo({ title: "", url: "" });
    setShowDetailsModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      students: "",
      schedule: "",
      teacher: "",
      videoUrl: "",
      description: "",
      status: "Active",
    });
    setSelectedBatch(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Batch Maintain</h1>
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
                            onClick={() => setIsSidebarOpen(false)}
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

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-y-auto pt-16 md:pt-6">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUsersCogIcon className="text-indigo-600" /> Batch Maintain
              </h1>
              <p className="text-xs text-gray-500">
                Create and manage student batches
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
                {batches.reduce((sum, b) => sum + (b.students || 0), 0)}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5 transition-all"
                >
                  <FaPlusCircle size={12} /> Create Batch
                </button>
              </div>
            </div>
          </div>

          {/* Batch Grid */}
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
              <p className="text-xs text-gray-500">Loading batches...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredBatches.map((batch) => (
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
                  ></div>
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
                        className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(
                          batch.status,
                        )}`}
                      >
                        {batch.status}
                      </span>
                    </div>

                    <div className="mt-1.5 space-y-0.5 text-[10px]">
                      <p className="text-gray-600 flex items-center gap-1">
                        <FaUsers className="text-gray-400" size={10} />{" "}
                        {batch.students} Students
                      </p>
                      <p className="text-gray-600 flex items-center gap-1">
                        <FaClock className="text-gray-400" size={10} />{" "}
                        {batch.schedule || "N/A"}
                      </p>
                      {(batch.videos || []).length > 0 && (
                        <p className="text-blue-600 flex items-center gap-1">
                          <FaVideo size={10} /> {batch.videos.length} Video
                          {batch.videos.length > 1 ? "s" : ""}
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
                        onClick={() => openDetailsModal(batch)}
                        className="text-indigo-600 hover:text-indigo-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-all"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => openEditModal(batch)}
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteBatch(batch._id)}
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

          {/* No Results */}
          {!loading && filteredBatches.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaUsersCogIcon className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Batches Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or create a new batch
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ==================== Add Batch Modal ==================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-indigo-600" /> Create New Batch
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBatch} className="p-6 space-y-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    {COURSE_OPTIONS.map((c) => (
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
                    Students
                  </label>
                  <input
                    type="number"
                    value={formData.students}
                    onChange={(e) =>
                      setFormData({ ...formData, students: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="30"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Mon, Wed 09:00 AM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Teacher name"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaVideo className="text-red-500" /> Primary Video URL
                  (optional)
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://youtube.com/..."
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Extra videos (Class 1, 2, 3...) "View Details" থেকে যোগ করতে
                  পারবেন
                </p>
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter batch description"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Create Batch
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

      {/* ==================== Edit Batch Modal ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Batch
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditBatch} className="p-6 space-y-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaVideo className="text-red-500" /> Primary Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://..."
                />
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
                  Update Batch
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

      {/* ==================== Batch Details Modal (with Videos) ==================== */}
      {showDetailsModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUsersCogIcon className="text-indigo-600" /> Batch Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedBatch.name}
                </h2>
                <p className="text-sm text-gray-500">{selectedBatch.course}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                      selectedBatch.status,
                    )}`}
                  >
                    {selectedBatch.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Students</p>
                  <p className="font-semibold text-sm">
                    {selectedBatch.students}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Teacher</p>
                  <p className="font-semibold text-sm">
                    {selectedBatch.teacher || "Not Assigned"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Schedule</p>
                  <p className="font-semibold text-sm">
                    {selectedBatch.schedule || "N/A"}
                  </p>
                </div>
              </div>

              {/* ✅ Videos Section */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <FaVideo className="text-red-500" /> Class Videos (
                    {(selectedBatch.videos || []).length})
                  </p>
                  <button
                    onClick={() => setShowVideoForm(!showVideoForm)}
                    className="text-indigo-600 hover:text-indigo-800 text-[10px] font-semibold flex items-center gap-1 bg-white border border-indigo-200 px-2 py-1 rounded-lg transition-all"
                  >
                    <FaPlusCircle size={10} /> Add Video
                  </button>
                </div>

                {/* Add new video form */}
                {showVideoForm && (
                  <div className="bg-white border border-indigo-200 rounded-lg p-3 mb-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Title (e.g., Class 1, Introduction...)"
                      value={newVideo.title}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, title: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="https://youtube.com/... or https://drive.google.com/..."
                      value={newVideo.url}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, url: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        disabled={savingVideo}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        {savingVideo ? (
                          "Saving..."
                        ) : (
                          <>
                            <FaCheckCircle size={11} /> Save Video
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowVideoForm(false);
                          setNewVideo({ title: "", url: "" });
                        }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-1.5 rounded-lg font-semibold transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Videos list */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {(selectedBatch.videos || []).length > 0 ? (
                    (selectedBatch.videos || []).map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-all"
                      >
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 truncate"
                        >
                          <FaVideo
                            size={11}
                            className="text-red-500 flex-shrink-0"
                          />
                          {v.title || `Video ${i + 1}`}
                        </a>
                        <button
                          onClick={() => handleDeleteVideo(i)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-all flex-shrink-0"
                          title="Delete"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-400 text-center py-2 italic">
                      No videos added yet. Click "Add Video" to upload class
                      videos.
                    </p>
                  )}
                </div>

                {/* Primary video */}
                {selectedBatch.videoUrl && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-[10px] text-gray-500 mb-1">
                      Primary Video
                    </p>
                    <a
                      href={selectedBatch.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5"
                    >
                      <FaLink size={11} /> Open Primary Video
                    </a>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-gray-700 text-sm">
                  {selectedBatch.description || "No description provided"}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedBatch);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <FaEdit className="inline mr-2" /> Edit Batch
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
    </div>
  );
};

export default Student_batch;
