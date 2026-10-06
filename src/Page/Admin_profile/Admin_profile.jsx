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
  FaArrowRight,
  FaUserCog,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaSpinner,
  FaLock,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard, MdVerified } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com";

// ✅ ImgBB API Key
const IMAGEBB_API_KEY =
  import.meta.env.VITE_IMAGEBB_API_KEY || "8bf6838d246dba2d2f07c95a50b28938";

// ✅ localStorage keys
const ADMIN_IMAGE_KEY = "adminProfileImage";
const ADMIN_DEPT_KEY = "adminDepartment";
const DEFAULT_PROFILE_IMAGE = adminImg;

// ============================================================
// ✅ DEPARTMENT-WISE DEFAULTS
// ============================================================
const DEPARTMENT_CONFIGS = {
  Elders: {
    label: "Quran For Elders",
    designation: "Elders Department Head",
    bio: "Administrator for the Quran For Elders Department. Managing Qaida, Nazera, Najera, Tajweed, and Bakarah Hifz courses.",
  },
  "Quran Studies": {
    label: "Quran Studies",
    designation: "Quran Studies Department Head",
    bio: "Administrator for the Quran Studies Department. Managing Hifzul Quran and Tarbiyah Quran Studies programs.",
  },
  Alimiya: {
    label: "Alimiya",
    designation: "Alimiya Department Head",
    bio: "Administrator for the Alimiya Department. Managing Dawra e Hadith, Tafsir, Fiqh, Hadith, and Arabic Grammar.",
  },
  Diploma: {
    label: "Diploma",
    designation: "Diploma Department Head",
    bio: "Administrator for the Diploma Department. Managing Diploma in Islamic Studies and Certificate courses.",
  },
};

// ✅ Current department helper
const getCurrentDepartment = () => {
  try {
    const info = JSON.parse(localStorage.getItem("adminInfo") || "{}");
    const savedDept = localStorage.getItem(ADMIN_DEPT_KEY);
    return info.department || savedDept || "Elders";
  } catch {
    return "Elders";
  }
};

// ✅ ImgBB Upload
const uploadToImgBB = async (file) => {
  if (!IMAGEBB_API_KEY) throw new Error("ImgBB API key missing!");
  if (!file) throw new Error("No file provided");
  if (!file.type.startsWith("image/"))
    throw new Error("Please select a valid image file.");
  if (file.size > 5 * 1024 * 1024)
    throw new Error("Image size must be less than 5MB.");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
    { method: "POST", body: formData },
  );

  const data = await response.json();
  if (!data.success)
    throw new Error(data.error?.message || "ImgBB upload failed");

  const imageUrl = data.data.url || data.data.display_url;
  if (!imageUrl) throw new Error("ImgBB didn't return a valid URL");
  return imageUrl;
};

const safeFetchJSON = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    if (text.trim().startsWith("<"))
      return { success: false, _htmlError: true };
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, _jsonError: true };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ==================================================
// ✅ MAIN COMPONENT
// ==================================================
const Admin_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [backendConnected, setBackendConnected] = useState(true);
  const fileInputRef = useRef(null);

  // ✅ adminDepartment — login থেকে আসে, change করা যাবে না
  const [adminDepartment, setAdminDepartment] = useState(
    getCurrentDepartment(),
  );

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
  // ✅ Load admin info — Backend first, fallback to localStorage
  // ============================================================
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);

      const savedAdmin = localStorage.getItem("adminInfo");
      const savedImage = localStorage.getItem(ADMIN_IMAGE_KEY) || "";
      const savedDept = localStorage.getItem(ADMIN_DEPT_KEY) || "";

      let localAdmin = null;
      if (savedAdmin) {
        try {
          localAdmin = JSON.parse(savedAdmin);
        } catch (err) {
          console.error(err);
        }
      }

      // ✅ Email — per-admin isolation
      const email =
        localAdmin?.email ||
        user?.email ||
        localStorage.getItem("adminEmail") ||
        "admin@tarabiyah.com";

      // ✅ Department — login-এর
      const department = localAdmin?.department || savedDept || "Elders";

      setAdminDepartment(department);
      localStorage.setItem(ADMIN_DEPT_KEY, department);

      const deptConfig =
        DEPARTMENT_CONFIGS[department] || DEPARTMENT_CONFIGS["Elders"];

      // ✅ Try backend first
      try {
        const data = await safeFetchJSON(
          `${API_BASE}/api/admin-profile/${encodeURIComponent(email)}`,
        );

        if (data.success && data.profile) {
          console.log("✅ Loaded profile from backend:", data.profile);

          const merged = {
            ...data.profile,
            email,
            // ✅ department always from login
            department: adminDepartment || department,
            profileImage:
              data.profile.profileImage ||
              localStorage.getItem(`adminProfileImage_${email}`) ||
              savedImage ||
              "",
          };

          setAdminInfo(merged);
          setEditData(merged);
          setAdminDepartment(merged.department);
          localStorage.setItem(ADMIN_DEPT_KEY, merged.department);

          // Sync to localStorage
          localStorage.setItem("adminInfo", JSON.stringify(merged));
          if (merged.profileImage) {
            localStorage.setItem(ADMIN_IMAGE_KEY, merged.profileImage);
            localStorage.setItem(
              `adminProfileImage_${email}`,
              merged.profileImage,
            );
          }

          setBackendConnected(true);
          setIsLoading(false);
          return;
        }
        setBackendConnected(true);
      } catch (err) {
        console.warn("⚠️ Backend not reachable:", err.message);
        setBackendConnected(false);
      }

      // ✅ Fallback: localStorage with dept-aware defaults
      const fallback = localAdmin || {
        name: user?.displayName || `${department} Admin`,
        email,
        phone: "+880 1700 123456",
        designation: deptConfig.designation,
        department: department,
        joinDate: "January 2024",
        bio: deptConfig.bio,
        address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
        website: "https://tarabiyahonline.com",
        profileImage:
          localStorage.getItem(`adminProfileImage_${email}`) ||
          savedImage ||
          "",
      };

      const merged = {
        ...fallback,
        department: fallback.department || department,
        profileImage:
          localStorage.getItem(`adminProfileImage_${email}`) ||
          savedImage ||
          fallback.profileImage ||
          "",
      };

      setAdminInfo(merged);
      setEditData(merged);
      setAdminDepartment(merged.department);
      localStorage.setItem(ADMIN_DEPT_KEY, merged.department);
      setIsLoading(false);
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const currentImageUrl = isEditing
    ? editData.profileImage
    : adminInfo.profileImage;

  useEffect(() => {
    setImageLoadError(false);
  }, [currentImageUrl]);

  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem(ADMIN_DEPT_KEY);
      // adminInfo & per-admin image preserve
      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ============================================================
  // Sidebar
  // ============================================================
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

  // ============================================================
  // ✅ SAVE PROFILE — per-admin (email-based)
  // ============================================================
  const handleEditToggle = async () => {
    if (!isEditing) {
      setEditData({ ...adminInfo });
      setIsEditing(true);
      return;
    }

    setIsSaving(true);

    // ✅ department always from login — cannot be changed
    const dataToSave = {
      ...editData,
      email: adminInfo.email || editData.email,
      department: adminDepartment || adminInfo.department,
    };

    const email = dataToSave.email;
    localStorage.setItem("adminInfo", JSON.stringify(dataToSave));
    localStorage.setItem(ADMIN_DEPT_KEY, adminDepartment);

    if (dataToSave.profileImage) {
      localStorage.setItem(ADMIN_IMAGE_KEY, dataToSave.profileImage);
      localStorage.setItem(
        `adminProfileImage_${email}`,
        dataToSave.profileImage,
      );
    } else {
      localStorage.removeItem(ADMIN_IMAGE_KEY);
      localStorage.removeItem(`adminProfileImage_${email}`);
    }
    setAdminInfo(dataToSave);

    // ✅ Send to backend
    try {
      const data = await safeFetchJSON(`${API_BASE}/api/admin-profile/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (data.success) {
        console.log("✅ Saved to backend:", data.profile);
        setBackendConnected(true);

        if (data.profile) {
          const synced = {
            ...data.profile,
            department: adminDepartment || data.profile.department,
          };
          setAdminInfo(synced);
          setEditData(synced);
          localStorage.setItem("adminInfo", JSON.stringify(synced));
        }

        Swal.fire({
          icon: "success",
          title: data.updated ? "Profile Updated!" : "Profile Created!",
          text: `Saved for ${adminDepartment} Department.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Saved Locally",
          text: data.message || "Backend save failed. Data saved in browser.",
        });
      }
    } catch (err) {
      console.warn("⚠️ Backend save failed:", err.message);
      setBackendConnected(false);
      Swal.fire({
        icon: "warning",
        title: "Saved Locally",
        text: "Could not reach server. Profile saved in browser only.",
      });
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
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
      if (adminInfo.email) {
        localStorage.setItem(`adminProfileImage_${adminInfo.email}`, imageUrl);
      }

      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        html: `
          <p>Click <strong>Save</strong> to apply changes.</p>
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
    if (adminInfo.email) {
      localStorage.removeItem(`adminProfileImage_${adminInfo.email}`);
    }
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

  // ============================================================
  // ✅ DELETE PROFILE
  // ============================================================
  const handleDeleteProfile = async () => {
    const email = adminInfo.email;
    if (!email) return;

    const result = await Swal.fire({
      title: "Delete Profile?",
      html: `<p>Are you sure you want to delete the profile for</p><p><strong>${email}</strong>?</p><p style="color: #d33; font-size: 12px; margin-top: 8px;">This action cannot be undone.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await safeFetchJSON(
        `${API_BASE}/api/admin-profile/delete/${encodeURIComponent(email)}`,
        { method: "DELETE" },
      );

      if (data.success) {
        localStorage.removeItem("adminInfo");
        localStorage.removeItem(ADMIN_IMAGE_KEY);
        localStorage.removeItem(`adminProfileImage_${email}`);
        localStorage.removeItem(ADMIN_DEPT_KEY);

        await Swal.fire({
          icon: "success",
          title: "Profile Deleted",
          text: "Your profile has been deleted. Logging out...",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin-login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not delete profile",
        });
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      Swal.fire({ icon: "error", title: "Server Error", text: err.message });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#004d4d] mx-auto" />
          <p className="text-sm text-gray-600 mt-3">
            Loading {adminDepartment} profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#004d4d] text-white p-3 rounded-full shadow-lg hover:bg-[#006666] transition-all"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0 ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}`}
        >
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
                {adminDepartment && (
                  <p className="text-[10px] opacity-90 truncate mt-0.5 bg-white/20 px-1.5 py-0.5 rounded-full inline-block">
                    🏛️ {adminDepartment}
                  </p>
                )}
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${activeMenu === item.id ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6 w-full overflow-auto">
          <div className="space-y-3 max-w-6xl mx-auto">
            {/* Backend status */}
            {!backendConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-yellow-600 text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-yellow-800">
                    Backend Not Connected
                  </p>
                  <p className="text-[11px] text-yellow-700 mt-0.5">
                    Data will save locally only. Please check server.
                  </p>
                </div>
              </div>
            )}

            {/* Department Banner */}
            {adminDepartment && (
              <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] text-white p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] opacity-80">You are logged in as</p>
                  <p className="text-sm font-bold">
                    {adminDepartment} Department Admin
                  </p>
                </div>
                <span className="text-2xl">🏛️</span>
              </div>
            )}

            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-20 md:h-24 relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  {isEditing && (
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUploadingImage || isSaving}
                      className="bg-red-500/90 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm disabled:opacity-50"
                    >
                      <FaTimes size={12} /> Cancel
                    </button>
                  )}
                  <button
                    onClick={handleEditToggle}
                    disabled={isUploadingImage || isSaving}
                    className={`${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-white/20 hover:bg-white/30"} text-white px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all backdrop-blur-sm disabled:opacity-50`}
                  >
                    {isSaving ? (
                      <>
                        <FaSpinner size={12} className="animate-spin" /> Saving
                      </>
                    ) : isEditing ? (
                      <>
                        <FaSave size={12} /> Save
                      </>
                    ) : (
                      <>
                        <FaEdit size={12} /> Edit
                      </>
                    )}
                  </button>
                </div>
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
                        onError={() => setImageLoadError(true)}
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
                        className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-teal-700 transition-all shadow-md disabled:opacity-50"
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

                {/* Info */}
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
                            readOnly
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

            {/* Info Section */}
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
                      {adminInfo.bio || "No bio added yet."}
                    </p>
                  )}
                </div>

                {/* Department — READ ONLY */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 border-b pb-1.5">
                    <FaBuilding className="text-teal-600" size={14} />{" "}
                    Department
                    <FaLock
                      className="text-gray-400 ml-auto"
                      size={10}
                      title="Cannot be changed"
                    />
                  </h3>
                  <p className="text-gray-700 text-xs font-medium">
                    {adminDepartment || "N/A"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    🔒 Department login থেকে auto-set — changed করা যাবে না
                  </p>
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
                    <p className="text-gray-600 text-xs">
                      {adminInfo.address || "N/A"}
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
                      value={editData.website || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
                    />
                  ) : adminInfo.website ? (
                    <a
                      href={adminInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 text-xs font-medium break-all"
                    >
                      {adminInfo.website}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-xs">N/A</p>
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
                    <button
                      onClick={() => {
                        if (!isEditing) handleEditToggle();
                      }}
                      disabled={isEditing}
                      className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg border border-gray-200 text-center transition-all disabled:opacity-50"
                    >
                      <div className="text-base">✏️</div>
                      <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                        Edit Profile
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        Swal.fire({
                          icon: "info",
                          title: "Change Password",
                          text: "This feature is coming soon!",
                          confirmButtonColor: "#004d4d",
                        })
                      }
                      className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg border border-gray-200 text-center transition-all"
                    >
                      <div className="text-base">🔒</div>
                      <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                        Change Password
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        Swal.fire({
                          icon: "info",
                          title: "Settings",
                          text: "This feature is coming soon!",
                          confirmButtonColor: "#004d4d",
                        })
                      }
                      className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg border border-gray-200 text-center transition-all"
                    >
                      <div className="text-base">⚙️</div>
                      <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                        Settings
                      </p>
                    </button>

                    <button
                      onClick={handleDeleteProfile}
                      className="bg-red-50 hover:bg-red-100 p-2 rounded-lg border border-red-200 text-center transition-all"
                    >
                      <div className="text-base">🗑️</div>
                      <p className="text-[10px] font-medium text-red-700 mt-0.5">
                        Delete Profile
                      </p>
                    </button>
                  </div>
                </div>

                {/* Department Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaBuilding className="text-teal-600" /> Department Info
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[10px] text-gray-400">Department</p>
                      <p className="font-semibold text-sm">{adminDepartment}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[10px] text-gray-400">Role</p>
                      <p className="font-semibold text-sm">Department Admin</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                      <p className="text-[10px] text-gray-400">Permissions</p>
                      <p className="text-gray-600 mt-1">
                        Full access to <strong>{adminDepartment}</strong>{" "}
                        department — students, teachers, courses, fees,
                        invoices, reports, and CRM.
                      </p>
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
