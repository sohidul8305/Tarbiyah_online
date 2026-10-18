// src/Page/Teacher/TeacherDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPlusCircle,
  FaTrash,
  FaLink,
  FaEnvelope,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaEdit,
  FaUserGraduate,
  FaClock,
  FaSave,
  FaTimes,
  FaCamera,
  FaSpinner,
  FaBookOpen,
  FaPlus,
  FaBuilding,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const API_BASE =
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.tarbiyahonline.com");

const TeacherDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    designation: "",
  });

  const currentPath = location.pathname;

  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacherInfo");
    const savedEmail = localStorage.getItem("teacherEmail");

    if (savedTeacher) {
      try {
        const parsed = JSON.parse(savedTeacher);
        setTeacherInfo({
          name: parsed.name || user?.displayName || "Teacher",
          email: parsed.email || savedEmail || user?.email || "",
          designation: parsed.designation || "Teacher",
        });
      } catch (err) {}
    } else {
      setTeacherInfo({
        name: user?.displayName || "Teacher",
        email: savedEmail || user?.email || "",
        designation: "Teacher",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isTeacherLoggedIn");
      localStorage.removeItem("teacherInfo");
      localStorage.removeItem("teacherEmail");
      navigate("/teacher-login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Logout Failed" });
    }
  };

  const menuItems = [
    {
      id: "profile",
      path: "/teacher-profile",
      label: "Profile",
      icon: <FaUser />,
    },
    {
      id: "routine",
      path: "/teacher-routine",
      label: "Class Schedule / Routine",
      icon: <FaCalendarAlt />,
    },
    {
      id: "payment",
      path: "/teacher-payment",
      label: "Payment & Due",
      icon: <FaMoneyBillWave />,
    },
  ];

  const getPageTitle = () => {
    if (currentPath === "/teacher-routine") return "Class Schedule / Routine";
    if (currentPath === "/teacher-payment") return "Payment & Due";
    return "My Profile";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Teacher Panel</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-transform duration-300 h-screen md:h-auto overflow-y-auto ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                {teacherInfo.name?.charAt(0) || "T"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{teacherInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {teacherInfo.designation}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive =
                currentPath === item.path ||
                (currentPath === "/teacher-dashboard" && item.id === "profile");
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                    isActive
                      ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-y-auto h-screen w-full">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome back, {teacherInfo.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all"
            >
              Logout
            </button>
          </div>

          {(currentPath === "/teacher-profile" ||
            currentPath === "/teacher-dashboard") && (
            <ProfileTab teacherInfo={teacherInfo} />
          )}
          {currentPath === "/teacher-routine" && (
            <RoutineTab teacherInfo={teacherInfo} />
          )}
          {currentPath === "/teacher-payment" && (
            <PaymentTab teacherInfo={teacherInfo} />
          )}
        </main>
      </div>
    </div>
  );
};

/* ==========================================
   TAB 1: PROFILE COMPONENT
   ========================================== */
const ProfileTab = ({ teacherInfo }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialEmail = teacherInfo.email || user?.email || "";

  const buildEmptyProfile = () => ({
    name: "",
    email: "",
    title: "",
    department: "",
    className: "",
    phone: "",
    bio: "",
    photo: "",
    education: [],
    expertise: [],
    courses: [],
    achievements: [],
    totalStudents: "0",
    totalCourses: "0",
    rating: "0",
    joinDate: "",
  });

  const [data, setData] = useState(buildEmptyProfile);
  const [editData, setEditData] = useState(buildEmptyProfile);

  const fetchProfile = async () => {
    if (!initialEmail) {
      setIsLoading(false);
      setIsEditing(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(initialEmail)}`,
      );
      if (res.status === 404) {
        setData({ ...buildEmptyProfile(), email: initialEmail });
        setEditData({ ...buildEmptyProfile(), email: initialEmail });
      } else {
        const resData = await res.json();
        if (resData.success && resData.profile) {
          const p = resData.profile;
          const merged = {
            name: p.name || "",
            email: p.email || initialEmail,
            title: p.designation || "",
            department: p.department || "",
            className: p.className || "",
            phone: p.phone || "",
            bio: p.bio || "",
            photo: p.profileImage || "",
            education: p.education || [],
            expertise: p.expertise || [],
            courses: p.courses || [],
            achievements: p.achievements || [],
            totalStudents: p.totalStudents || "0",
            totalCourses: p.totalCourses || "0",
            rating: p.rating || "0",
            joinDate: p.joinDate || "",
          };
          setData(merged);
          setEditData(merged);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [initialEmail]);

  const handleSave = async () => {
    if (!editData.name.trim()) {
      return Swal.fire({ icon: "warning", title: "Teacher Name is required" });
    }
    if (!editData.email.trim()) {
      return Swal.fire({ icon: "warning", title: "Email is required" });
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/teacher-profile/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: editData.email,
          originalEmail: data.email || initialEmail,
          name: editData.name,
          designation: editData.title,
          department: editData.department,
          className: editData.className,
          phone: editData.phone,
          bio: editData.bio,
          profileImage: editData.photo,
          education: editData.education,
          expertise: editData.expertise,
          courses: editData.courses,
          achievements: editData.achievements,
          totalStudents: editData.totalStudents,
          totalCourses: editData.totalCourses,
          rating: editData.rating,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setData(editData);
        setIsEditing(false);
        const storedInfo = JSON.parse(
          localStorage.getItem("teacherInfo") || "{}",
        );
        localStorage.setItem(
          "teacherInfo",
          JSON.stringify({
            ...storedInfo,
            email: editData.email,
            name: editData.name,
          }),
        );
        localStorage.setItem("teacherEmail", editData.email);

        Swal.fire({
          icon: "success",
          title: "Profile Saved!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to save profile" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const emailToDelete = data.email || initialEmail;
        const res = await fetch(
          `${API_BASE}/api/teacher-profile/delete/${encodeURIComponent(emailToDelete)}`,
          {
            method: "DELETE",
          },
        );
        if (res.ok) {
          setData(buildEmptyProfile());
          setEditData(buildEmptyProfile());
          setIsEditing(false);
          Swal.fire("Deleted!", "Your profile has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete profile", "error");
      }
    }
  };

  // ✅ Image Upload ফাংশন (ImgBB API Key সহ + Base64 Fallback)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return Swal.fire(
        "Warning",
        "File size should be less than 2MB",
        "warning",
      );
    }

    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    if (!apiKey) {
      return Swal.fire({
        icon: "error",
        title: "ImgBB API Key Missing",
        text: "VITE_IMAGEBB_API_KEY environment variable set করুন।",
      });
    }

    Swal.fire({
      title: "Uploading Image...",
      text: "Please wait while we upload your profile picture.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData },
      );

      const result = await response.json();

      if (result.success) {
        setEditData((prev) => ({ ...prev, photo: result.data.url }));
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Image Uploaded!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("ImgBB Error:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "ImgBB API key check করুন অথবা অন্য ছবি দিয়ে try করুন।",
      });
    }
  };

  if (isLoading)
    return (
      <div className="text-center p-10">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
      </div>
    );

  const isNewProfile = !data.name;

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-32 md:h-40 relative flex items-center justify-end px-6 gap-3">
          {!isEditing ? (
            <div className="flex gap-2">
              {isNewProfile ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg animate-pulse"
                >
                  <FaPlus /> Add Teacher Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}{" "}
                Save Profile
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData(data);
                }}
                className="bg-gray-500/80 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white p-1.5 shadow-lg border-4 border-white flex items-center justify-center text-6xl bg-teal-50 overflow-hidden">
              {(isEditing ? editData.photo : data.photo) ? (
                <img
                  src={isEditing ? editData.photo : data.photo}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span>👨‍🏫</span>
              )}
            </div>

            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full border-2 border-white hover:bg-teal-700 cursor-pointer">
                <FaCamera size={12} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          <div className="text-center md:text-left flex-grow w-full">
            {isEditing ? (
              <input
                type="text"
                placeholder="Teacher Name *"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="text-2xl font-bold border-b-2 border-teal-500 outline-none w-full max-w-md bg-transparent mb-1"
              />
            ) : (
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {data.name || "No Profile Created"}
                </h1>
                {data.name && <MdVerified className="text-blue-500" />}
              </div>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                <FaEnvelope className="text-teal-600" />{" "}
                {data.email || "No Email Set"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      {(isEditing || !isNewProfile) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Profile Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ✅ Email Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaEnvelope className="inline mr-1 text-teal-600" /> Your Email
                Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-800 font-semibold bg-gray-50 p-2 rounded-lg">
                  {data.email || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation / Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="e.g. Senior Teacher"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-800 font-semibold bg-gray-50 p-2 rounded-lg">
                  {data.title || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaBuilding className="inline mr-1 text-teal-600" /> Department
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="e.g. Islamic Studies"
                  value={editData.department}
                  onChange={(e) =>
                    setEditData({ ...editData, department: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-800 font-semibold bg-gray-50 p-2 rounded-lg">
                  {data.department || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="+880 1..."
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-800 font-semibold bg-gray-50 p-2 rounded-lg">
                  {data.phone || "Not set"}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biography / About
              </label>
              {isEditing ? (
                <textarea
                  placeholder="Write something about yourself..."
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  rows="3"
                  className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg min-h-[60px] whitespace-pre-wrap">
                  {data.bio || "No bio added yet."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================
   TAB 2: ROUTINE COMPONENT
   ========================================== */
const RoutineTab = ({ teacherInfo }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    day: "Saturday",
    subject: "",
    class: "",
    time: "",
    room: "",
    link: "",
  });

  const email = teacherInfo.email || "";
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(email)}`,
      );
      const data = await res.json();
      setProfile(data.success ? data.profile : null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [email]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(email)}/schedule`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if ((await res.json()).success) {
        fetchProfile();
        setShowAdd(false);
        setForm({
          day: "Saturday",
          subject: "",
          class: "",
          time: "",
          room: "",
          link: "",
        });
      }
    } catch (e) {
      Swal.fire("Error", "Network issue", "error");
    }
  };

  const handleDelete = async (id) => {
    if (
      !(
        await Swal.fire({
          title: "Delete?",
          icon: "warning",
          showCancelButton: true,
        })
      ).isConfirmed
    )
      return;
    try {
      await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(email)}/schedule/${id}`,
        { method: "DELETE" },
      );
      fetchProfile();
    } catch (e) {
      Swal.fire("Error", "Network issue", "error");
    }
  };

  const schedule = profile?.classSchedule || [];
  const grouped = {};
  days.forEach((d) => (grouped[d] = []));
  schedule.forEach((s) => grouped[s.day].push(s));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Class Routine</h2>
          <p className="text-sm text-gray-500">Your weekly schedule</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <FaPlusCircle /> Add Class
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map(
            (day) =>
              grouped[day].length > 0 && (
                <div
                  key={day}
                  className="bg-white border rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="bg-teal-800 text-white px-4 py-2 font-bold text-sm">
                    {day}
                  </div>
                  <div className="p-3 space-y-2">
                    {grouped[day].map((c, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-3 rounded-lg border relative"
                      >
                        <p className="font-bold text-sm">{c.subject}</p>
                        <p className="text-xs text-gray-600">
                          {c.class} • {c.time}
                        </p>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="absolute top-2 right-2 text-red-500"
                        >
                          <FaTrash size={12} />
                        </button>
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            className="text-xs text-teal-600 mt-1 inline-block"
                          >
                            <FaLink /> Join
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleAdd}
            className="bg-white rounded-xl p-6 w-full max-w-md space-y-3"
          >
            <h3 className="font-bold text-lg">Add Class</h3>
            <select
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              className="w-full border p-2 rounded"
            >
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Class"
              required
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Time"
              required
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Room"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="url"
              placeholder="Meeting Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 rounded font-bold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="flex-1 bg-gray-200 py-2 rounded font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ==========================================
   TAB 3: PAYMENT COMPONENT
   ========================================== */
const PaymentTab = ({ teacherInfo }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = teacherInfo.email || "";

  useEffect(() => {
    const fetchP = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/teacher-profile/${encodeURIComponent(email)}`,
        );
        const data = await res.json();
        setProfile(data.success ? data.profile : null);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchP();
  }, [email]);

  const info = profile?.paymentInfo || {
    totalSalary: 0,
    dueSalary: 0,
    paymentHistory: [],
  };
  const history = (info.paymentHistory || []).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const paid = history
    .filter((p) => p.status === "Paid")
    .reduce((s, p) => s + Number(p.amount || 0), 0);
  const due =
    Number(info.dueSalary) ||
    history
      .filter((p) => p.status !== "Paid")
      .reduce((s, p) => s + Number(p.amount || 0), 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Payment & Due</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">
            ৳{paid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
          <p className="text-sm text-gray-500">Total Due</p>
          <p className="text-2xl font-bold text-red-600">
            ৳{due.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
          <p className="text-sm text-gray-500">Last Payment</p>
          <p className="text-lg font-bold text-blue-600">
            {history[0]?.date || "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-gray-50 font-bold">Payment History</div>
        {history.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No records yet.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{p.month}</td>
                  <td className="p-3 font-semibold">
                    ৳{Number(p.amount).toLocaleString()}
                  </td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${p.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
