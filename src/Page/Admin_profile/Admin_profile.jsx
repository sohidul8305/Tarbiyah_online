// src/Page/Admin/Admin_profile.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaSignOutAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaBell,
  FaBook,
  FaChartLine,
  FaDatabase,
  FaUserTimes,
  FaLayerGroup,
  FaCalendarCheck,
  FaArrowRight,
  FaUserCog,
  FaIdCard,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import {
  MdDashboard,
  MdVerified,
  MdAssignment,
  MdGrade,
  MdQuiz,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Admin_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
    bio: "",
    address: "",
    website: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      github: "",
    },
  });

  const [editData, setEditData] = useState({});

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      const admin = JSON.parse(savedAdmin);
      setAdminInfo(admin);
      setEditData(admin);
    } else {
      const defaultAdmin = {
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "+880 1700 123456",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
        bio: "Experienced administrator with a passion for education and Islamic studies. Dedicated to providing quality education and fostering a positive learning environment.",
        address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
        website: "https://tarabiyahonline.com",
        socialLinks: {
          facebook: "https://facebook.com/tarabiyah",
          twitter: "https://twitter.com/tarabiyah",
          linkedin: "https://linkedin.com/company/tarabiyah",
          instagram: "https://instagram.com/tarabiyah",
        },
      };
      setAdminInfo(defaultAdmin);
      setEditData(defaultAdmin);
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
    // Not needed for profile page
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
        { id: "department", label: "Department" },
        { id: "today-class", label: "Today's Class" },
        { id: "payment-overview", label: "Payment Overview" },
        { id: "new-admission", label: "New Admission" },
        { id: "notification", label: "Notification" },
      ],
    },
    {
      id: "student-management",
      path: "/admin-students",
      icon: <FaUsers className="text-xl" />,
      label: "Student Management",
      subItems: [
        { id: "student-add", label: "Student Add" },
        { id: "batch-manual", label: "Batch Maintain" },
        { id: "student-profile", label: "Student Profile" },
        { id: "admission-permission", label: "Admission Permission" },
      ],
    },
    {
      id: "teacher-management",
      path: "/admin-teachers",
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: "Teacher Management",
      subItems: [
        { id: "teacher-assign", label: "Teacher Assign" },
        { id: "class-schedule", label: "Class Schedule" },
        { id: "teacher-attendance", label: "Teacher Attendance" },
        { id: "teacher-overview", label: "Teacher Overview" },
      ],
    },
    {
      id: "batch-course",
      path: "/admin-batch-course",
      icon: <FaLayerGroup className="text-xl" />,
      label: "Batch & Course",
      subItems: [
        { id: "batch-make", label: "Batch Make" },
        { id: "course-make", label: "Course Make" },
        { id: "syllabus", label: "Syllabus" },
        { id: "clear-routine", label: "Clear Routine" },
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
        { id: "admin-on-fee", label: "Admin on Fee" },
        { id: "monthly-fee", label: "Monthly Fee" },
        { id: "invoice", label: "Invoice" },
        { id: "report", label: "Report" },
        { id: "exam", label: "Exam" },
      ],
    },
    {
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Exam",
      subItems: [
        { id: "exam-make", label: "Exam Make" },
        { id: "result-publish", label: "Result Publish" },
        { id: "certificate-permission", label: "Certificate Permission" },
      ],
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine className="text-xl" />,
      label: "Report & Analytics",
      subItems: [
        { id: "admission-report", label: "Admission Report" },
        { id: "attendance-report", label: "Attendance Report" },
        { id: "income", label: "Income" },
      ],
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase className="text-xl" />,
      label: "CRM Management",
      subItems: [{ id: "data-entry", label: "Data Entry" }],
    },
    {
      id: "salary",
      path: "/admin-salary",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Salary",
      subItems: [
        { id: "total-salary", label: "Total Salary" },
        { id: "due-salary", label: "Due Salary" },
      ],
    },
  ];

  // Handle edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      setAdminInfo(editData);
      localStorage.setItem("adminInfo", JSON.stringify(editData));
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setEditData({ ...adminInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...adminInfo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      socialLinks: { ...editData.socialLinks, [name]: value },
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Admin Profile</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar - No Scroll */}
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
          {/* Sidebar Header */}
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

          {/* Navigation Menu - No Scroll */}
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
                        className={`transition-transform ${activeMenu === item.id ? "rotate-180" : ""}`}
                      >
                        <FaArrowRight size={12} />
                      </span>
                    </button>
                    {activeMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveMenu(item.id);
                              setIsSidebarOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d] transition-all"
                          >
                            {sub.label}
                          </button>
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

            {/* Logout Button */}
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

        {/* Main Content - Full Screen */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUser className="text-blue-600" /> Admin Profile
              </h1>
              <p className="text-xs text-gray-500">
                View and manage your profile information
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

          {/* Profile Content */}
          <div className="overflow-hidden h-[calc(100vh-170px)]">
            <div className="space-y-3 h-full overflow-hidden">
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-20 md:h-24 relative">
                  <button
                    onClick={handleEditToggle}
                    className={`absolute top-2 right-2 ${
                      isEditing
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-white/20 hover:bg-white/30"
                    } text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm`}
                  >
                    {isEditing ? <FaSave size={12} /> : <FaEdit size={12} />}
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleCancelEdit}
                      className="absolute top-2 right-20 bg-red-500/80 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm"
                    >
                      <FaTimes size={12} /> Cancel
                    </button>
                  )}
                </div>

                <div className="px-4 pb-4 relative flex flex-col md:flex-row items-center md:items-end gap-4 -mt-10 md:-mt-8">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white p-1 shadow-lg border-4 border-white flex items-center justify-center text-3xl bg-teal-50">
                      <span>{adminInfo.name?.charAt(0) || "A"}</span>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full border-2 border-white hover:bg-teal-700 transition-all">
                        <FaCamera size={12} />
                      </button>
                    )}
                  </div>

                  <div className="text-center md:text-left flex-grow">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="text-lg md:text-xl font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-lg px-2 py-0.5 w-full max-w-xs"
                      />
                    ) : (
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                        <h1 className="text-lg md:text-xl font-bold text-gray-800">
                          {adminInfo.name}
                        </h1>
                        <MdVerified className="text-blue-500 text-base" />
                      </div>
                    )}

                    {isEditing ? (
                      <input
                        type="text"
                        name="designation"
                        value={editData.designation}
                        onChange={handleInputChange}
                        className="text-teal-600 font-medium text-xs md:text-sm bg-gray-50 border border-gray-300 rounded-lg px-2 py-0.5 w-full max-w-xs mt-0.5"
                      />
                    ) : (
                      <p className="text-teal-600 font-medium text-xs md:text-sm">
                        {adminInfo.designation}
                      </p>
                    )}

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1 text-xs text-gray-500">
                      {isEditing ? (
                        <>
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                            <FaEnvelope className="text-teal-600" size={12} />
                            <input
                              type="email"
                              name="email"
                              value={editData.email}
                              onChange={handleInputChange}
                              className="bg-transparent border-none text-xs focus:outline-none w-32"
                            />
                          </div>
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                            <FaPhoneAlt className="text-teal-600" size={12} />
                            <input
                              type="text"
                              name="phone"
                              value={editData.phone}
                              onChange={handleInputChange}
                              className="bg-transparent border-none text-xs focus:outline-none w-28"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                            <FaEnvelope className="text-teal-600" size={12} />{" "}
                            {adminInfo.email}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                            <FaPhoneAlt className="text-teal-600" size={12} />{" "}
                            {adminInfo.phone}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                            <FaCalendarAlt
                              className="text-teal-600"
                              size={12}
                            />{" "}
                            Joined: {adminInfo.joinDate}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content - Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[calc(100vh-270px)] overflow-hidden">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-3 overflow-hidden">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <span className="text-teal-600">📝</span> Bio
                    </h3>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={editData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full text-gray-600 text-xs leading-relaxed bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {adminInfo.bio}
                      </p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <FaBuilding className="text-teal-600" size={14} />{" "}
                      Department
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="department"
                        value={editData.department}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700 text-xs font-medium">
                        {adminInfo.department}
                      </p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <FaMapMarkerAlt className="text-teal-600" size={14} />{" "}
                      Address
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 text-xs">
                        {adminInfo.address}
                      </p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <FaGlobe className="text-teal-600" size={14} /> Website
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="website"
                        value={editData.website}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <a
                        href={adminInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 text-xs font-medium"
                      >
                        {adminInfo.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-3 overflow-hidden">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <FaUserCog className="text-teal-600" size={14} /> Quick
                      Actions
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                      {[
                        { label: "Edit Profile", icon: "✏️", color: "blue" },
                        { label: "Change Password", icon: "🔒", color: "red" },
                        { label: "Settings", icon: "⚙️", color: "gray" },
                        { label: "Support", icon: "💬", color: "green" },
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (item.label === "Edit Profile") {
                              handleEditToggle();
                            } else {
                              Swal.fire({
                                icon: "info",
                                title: item.label,
                                text: "This feature is coming soon!",
                                confirmButtonColor: "#004d4d",
                              });
                            }
                          }}
                          className={`bg-${item.color}-50 hover:bg-${item.color}-100 p-2 rounded-lg border border-${item.color}-100 text-center transition-all`}
                        >
                          <div className="text-base">{item.icon}</div>
                          <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                            {item.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                      <span className="text-blue-600">🌐</span> Social Links
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                      {[
                        {
                          key: "facebook",
                          icon: <FaFacebook />,
                          color: "blue-600",
                          label: "Facebook",
                        },
                        {
                          key: "twitter",
                          icon: <FaTwitter />,
                          color: "blue-400",
                          label: "Twitter",
                        },
                        {
                          key: "linkedin",
                          icon: <FaLinkedin />,
                          color: "blue-700",
                          label: "LinkedIn",
                        },
                        {
                          key: "instagram",
                          icon: <FaInstagram />,
                          color: "pink-600",
                          label: "Instagram",
                        },
                      ].map((social) => (
                        <div
                          key={social.key}
                          className="flex flex-col items-center"
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              name={social.key}
                              value={editData.socialLinks?.[social.key] || ""}
                              onChange={handleSocialChange}
                              className="w-full border border-gray-300 rounded-lg px-1.5 py-0.5 text-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder={social.label}
                            />
                          ) : (
                            <a
                              href={adminInfo.socialLinks?.[social.key] || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-${social.color} hover:text-${social.color}/80 transition-all ${!adminInfo.socialLinks?.[social.key] ? "opacity-30 cursor-not-allowed" : ""}`}
                              title={social.label}
                            >
                              {social.icon}
                            </a>
                          )}
                          {!isEditing && (
                            <p className="text-[8px] text-gray-400 mt-0.5">
                              {social.label}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-xl border border-teal-200 p-3 flex-1">
                    <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <span className="text-teal-600">📊</span> Account Stats
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="text-center">
                        <p className="text-lg font-bold text-teal-600">5</p>
                        <p className="text-[10px] text-gray-500">Departments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">156</p>
                        <p className="text-[10px] text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">25</p>
                        <p className="text-[10px] text-gray-500">Teachers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-purple-600">12</p>
                        <p className="text-[10px] text-gray-500">
                          New Admissions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin_profile;
