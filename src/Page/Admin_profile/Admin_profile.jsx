// src/Page/Admin_profile/Admin_profile.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import adminImg from "../../image/mahfuz.png";
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
  FaChartLine,
  FaDatabase,
  FaUserTimes,
  FaLayerGroup,
  FaCalendarCheck,
  FaArrowRight,
  FaUserCog,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaSpinner,
} from "react-icons/fa";
import { MdDashboard, MdVerified } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

// ✅ ImgBB API Key
const IMAGEBB_API_KEY =
  import.meta.env.VITE_IMAGEBB_API_KEY || "8bf6838d246dba2d2f07c95a50b28938";

// ✅ Image-এর জন্য আলাদা localStorage key
const ADMIN_IMAGE_KEY = "adminProfileImage";

// ✅ Default fallback image
const DEFAULT_PROFILE_IMAGE = adminImg;

// ✅ ImgBB Upload
const uploadToImgBB = async (file) => {
  console.log("🚀 Starting ImgBB upload...");

  if (!IMAGEBB_API_KEY) throw new Error("ImgBB API key missing!");
  if (!file) throw new Error("No file provided");

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error?.message || "ImgBB upload failed");
  }

  const imageUrl = data.data.url || data.data.display_url;
  if (!imageUrl) throw new Error("ImgBB didn't return a valid URL");

  console.log("✅ Image URL:", imageUrl);
  return imageUrl;
};

const Admin_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const fileInputRef = useRef(null);

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
    profileImage: "",
  });

  const [editData, setEditData] = useState({});

  // ============================================================
  // ✅ Load admin info — merge saved image from separate key
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    const savedImage = localStorage.getItem(ADMIN_IMAGE_KEY) || "";

    let admin = null;
    if (savedAdmin) {
      try {
        admin = JSON.parse(savedAdmin);
      } catch (err) {
        console.error("Failed to parse adminInfo:", err);
        admin = null;
      }
    }

    if (!admin) {
      admin = {
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "+880 1700 123456",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
        bio: "Experienced administrator with a passion for education and Islamic studies.",
        address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
        website: "https://tarabiyahonline.com",
        profileImage: "",
      };
    }

    // ✅ Merge: separate key > adminInfo.profileImage
    const merged = {
      ...admin,
      profileImage: savedImage || admin.profileImage || "",
    };

    console.log(
      "📥 Loaded admin image:",
      merged.profileImage ? "✅" : "❌ (using fallback)",
    );

    setAdminInfo(merged);
    setEditData(merged);
    setImageLoadError(false);
  }, [user]);

  // ✅ Reset image error when URL changes
  const currentImageUrl = isEditing
    ? editData.profileImage
    : adminInfo.profileImage;

  useEffect(() => {
    setImageLoadError(false);
  }, [currentImageUrl]);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      // ✅ adminInfo & adminProfileImage preserve থাকবে

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

  // ✅ Save
  const handleEditToggle = () => {
    if (isEditing) {
      const dataToSave = { ...editData };
      setAdminInfo(dataToSave);
      localStorage.setItem("adminInfo", JSON.stringify(dataToSave));

      if (dataToSave.profileImage) {
        localStorage.setItem(ADMIN_IMAGE_KEY, dataToSave.profileImage);
      } else {
        localStorage.removeItem(ADMIN_IMAGE_KEY);
      }

      console.log("💾 Saved image:", dataToSave.profileImage || "(none)");

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
    setImageLoadError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleImageClick = () => {
    if (isEditing && !isUploadingImage) fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select a valid image file.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: "Image size must be less than 5MB.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploadingImage(true);
    setImageLoadError(false);

    Swal.fire({
      title: "Uploading image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const imageUrl = await uploadToImgBB(file);

      setEditData((prev) => ({ ...prev, profileImage: imageUrl }));
      setAdminInfo((prev) => ({ ...prev, profileImage: imageUrl }));
      localStorage.setItem(ADMIN_IMAGE_KEY, imageUrl);

      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        html: `
          <p>Click <strong>Save</strong> to apply other changes (optional).</p>
          <img src="${imageUrl}" style="max-width: 150px; max-height: 150px; border-radius: 8px; margin-top: 10px; border: 2px solid #004d4d;" />
        `,
        confirmButtonColor: "#004d4d",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("❌ Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        html: `<p><strong>Error:</strong> ${error.message}</p>`,
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setEditData((prev) => ({ ...prev, profileImage: "" }));
    setAdminInfo((prev) => ({ ...prev, profileImage: "" }));
    localStorage.removeItem(ADMIN_IMAGE_KEY);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setImageLoadError(false);

    Swal.fire({
      icon: "success",
      title: "Image Removed",
      text: "Click Save to apply changes.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* ✅ Mobile Floating Menu Button (Navbar এর বদলে) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#004d4d] text-white p-3 rounded-full shadow-lg hover:bg-[#006666] transition-all"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

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
          {/* Sidebar Header (profile summary) */}
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {adminInfo.profileImage && !imageLoadError ? (
                  <img
                    src={adminInfo.profileImage}
                    alt="admin"
                    className="w-full h-full object-cover"
                    onError={() => setImageLoadError(true)}
                    onLoad={() => setImageLoadError(false)}
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_IMAGE}
                    alt="default admin"
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

          {/* Sidebar Nav */}
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

            {/* Logout Button */}
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

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6 w-full overflow-auto">
          <div className="space-y-3">
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-20 md:h-24 relative">
                <button
                  onClick={handleEditToggle}
                  disabled={isUploadingImage}
                  className={`absolute top-2 right-2 ${
                    isEditing
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-white/20 hover:bg-white/30"
                  } text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm disabled:opacity-50`}
                >
                  {isEditing ? <FaSave size={12} /> : <FaEdit size={12} />}
                  {isEditing ? "Save" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUploadingImage}
                    className="absolute top-2 right-20 bg-red-500/80 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm disabled:opacity-50"
                  >
                    <FaTimes size={12} /> Cancel
                  </button>
                )}
              </div>

              <div className="px-4 pb-4 relative flex flex-col md:flex-row items-center md:items-end gap-4 -mt-10 md:-mt-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white p-1 shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                    {currentImageUrl && !imageLoadError ? (
                      <img
                        key={currentImageUrl}
                        src={currentImageUrl}
                        alt="profile"
                        className="w-full h-full object-cover rounded-lg"
                        onError={() => {
                          console.error("❌ Image failed:", currentImageUrl);
                          setImageLoadError(true);
                        }}
                        onLoad={() => setImageLoadError(false)}
                      />
                    ) : (
                      <img
                        src={DEFAULT_PROFILE_IMAGE}
                        alt="default profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {isEditing && (
                    <>
                      <button
                        type="button"
                        onClick={handleImageClick}
                        disabled={isUploadingImage}
                        title="Upload Image"
                        className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-teal-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploadingImage ? (
                          <FaSpinner size={12} className="animate-spin" />
                        ) : (
                          <FaCamera size={12} />
                        )}
                      </button>

                      {editData.profileImage && !isUploadingImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          title="Remove Image"
                          className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white hover:bg-red-600 transition-all shadow-md"
                        >
                          <FaTimes size={10} />
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Name & Designation */}
                <div className="text-center md:text-left flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ""}
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
                      value={editData.designation || ""}
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
                            value={editData.email || ""}
                            onChange={handleInputChange}
                            className="bg-transparent border-none text-xs focus:outline-none w-32"
                          />
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                          <FaPhoneAlt className="text-teal-600" size={12} />
                          <input
                            type="text"
                            name="phone"
                            value={editData.phone || ""}
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
                          <FaCalendarAlt className="text-teal-600" size={12} />{" "}
                          Joined: {adminInfo.joinDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                    <span className="text-teal-600">📝</span> Bio
                  </h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editData.bio || ""}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full text-gray-600 text-xs leading-relaxed bg-gray-50 border border-gray-300 rounded-lg px-2 py-1"
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
                      value={editData.department || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
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
                      value={editData.address || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
                    />
                  ) : (
                    <p className="text-gray-600 text-xs">{adminInfo.address}</p>
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
                      value={editData.website || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
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

              <div className="lg:col-span-2 space-y-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                    <FaUserCog className="text-teal-600" size={14} /> Quick
                    Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                    {[
                      { label: "Edit Profile", icon: "✏️" },
                      { label: "Change Password", icon: "🔒" },
                      { label: "Settings", icon: "⚙️" },
                      { label: "Support", icon: "💬" },
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
                        className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg border border-gray-200 text-center transition-all"
                      >
                        <div className="text-base">{item.icon}</div>
                        <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                          {item.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Debug Info */}
                <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-3">
                  <h3 className="text-xs font-bold text-yellow-800 mb-1">
                    🔧 Debug Info
                  </h3>
                  <p className="text-[10px] text-yellow-700 break-all">
                    <strong>Image URL:</strong>{" "}
                    {currentImageUrl || "(using default)"}
                  </p>
                  <p className="text-[10px] text-yellow-700 mt-1">
                    <strong>Storage Key:</strong> {ADMIN_IMAGE_KEY}
                  </p>
                  <p className="text-[10px] text-yellow-700 mt-1">
                    <strong>Load Error:</strong> {imageLoadError ? "Yes" : "No"}
                  </p>
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
