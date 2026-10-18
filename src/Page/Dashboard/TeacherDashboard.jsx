// src/Page/Teacher/TeacherDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
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
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaSpinner,
  FaPlus,
  FaBuilding,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const API_BASE =
  import.meta.env?.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5010"
    : "https://api.tarbiyahonline.com");

/* ============================================================
   HELPER: Safe localStorage read
   ============================================================ */
const safeRead = (key) => {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
};
const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
const safeReadJSON = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

/* ============================================================
   MAIN DASHBOARD
   ============================================================ */
const TeacherDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    _id: "",
    name: "",
    email: "",
    designation: "Teacher",
  });

  const currentPath = location.pathname;

  /* ------------------------------------------------------------
     REFRESH teacher info from localStorage + Firebase auth
     - Firebase user বদলালে stale data clear করবে
     - _id track করবে
     ------------------------------------------------------------ */
  const refreshTeacherInfo = useCallback(() => {
    const authEmail = (user?.email || "").toLowerCase().trim();
    const savedEmail = (safeRead("teacherEmail") || "").toLowerCase().trim();
    const savedTeacherRaw = safeRead("teacherInfo");

    // ⚠️ Stale data detection: Firebase user ≠ localStorage email
    if (authEmail && savedEmail && authEmail !== savedEmail) {
      console.warn(
        "⚠️ User changed! Firebase:",
        authEmail,
        "| Stored:",
        savedEmail,
        "→ clearing stale data",
      );
      localStorage.removeItem("teacherInfo");
      localStorage.removeItem("teacherEmail");
      safeWrite("teacherEmail", authEmail);
    }

    const storedInfo = safeReadJSON("teacherInfo");
    const finalEmail = authEmail || savedEmail || "";

    setTeacherInfo({
      _id: storedInfo._id || "",
      name: storedInfo.name || user?.displayName || "Teacher",
      email: storedInfo.email || finalEmail,
      designation: storedInfo.designation || "Teacher",
    });
  }, [user]);

  useEffect(() => {
    refreshTeacherInfo();
  }, [refreshTeacherInfo]);

  /* ------------------------------------------------------------
     LOGOUT — clear ALL teacher-specific data
     ------------------------------------------------------------ */
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
        {/* SIDEBAR */}
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

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* MAIN CONTENT */}
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
            <ProfileTab
              teacherInfo={teacherInfo}
              onProfileUpdate={refreshTeacherInfo}
            />
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

/* ============================================================
   PROFILE TAB
   ============================================================ */
/* ============================================================
   TAB 1: TEACHER MANAGEMENT (CRUD LIST)
   ============================================================ */
const ProfileTab = ({ teacherInfo, onProfileUpdate }) => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState(null); // null = Add mode, otherwise Edit mode

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    department: "",
    phone: "",
    bio: "",
    photo: "",
  });

  // ✅ Fetch All Teachers
  const fetchAllTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/teacher-profiles/all`);
      const resData = await res.json();
      if (resData.success) {
        setTeachers(resData.profiles || []);
      }
    } catch (err) {
      console.error("Error fetching teachers:", err);
      Swal.fire("Error", "Failed to load teachers list", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  // ✅ Open Form for Add
  const handleAddNew = () => {
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      title: "Teacher",
      department: "",
      phone: "",
      bio: "",
      photo: "",
    });
    setShowForm(true);
  };

  // ✅ Open Form for Edit
  const handleEdit = (teacher) => {
    setEditId(teacher._id);
    setFormData({
      name: teacher.name || "",
      email: teacher.email || "",
      title: teacher.designation || "",
      department: teacher.department || "",
      phone: teacher.phone || "",
      bio: teacher.bio || "",
      photo: teacher.profileImage || "",
    });
    setShowForm(true);
  };

  // ✅ Save (Add or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return Swal.fire("Warning", "Name and Email are required", "warning");
    }

    setIsSaving(true);
    try {
      // Find original email if editing
      const existing = teachers.find((t) => t._id === editId);
      const originalEmail = existing ? existing.email : formData.email;

      const res = await fetch(`${API_BASE}/api/teacher-profile/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          originalEmail: originalEmail,
          name: formData.name.trim(),
          designation: formData.title,
          department: formData.department,
          phone: formData.phone,
          bio: formData.bio,
          profileImage: formData.photo,
        }),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to save");
      }

      Swal.fire({
        icon: "success",
        title: editId ? "Teacher Updated!" : "Teacher Added!",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowForm(false);
      fetchAllTeachers(); // Refresh list

      // If editing the currently logged-in teacher, update sidebar
      if (onProfileUpdate && formData.email === teacherInfo.email) {
        onProfileUpdate();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Delete Teacher
  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}"'s profile. This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/teacher-profile/by-id/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to delete");
      }

      Swal.fire("Deleted!", "Teacher profile has been deleted.", "success");
      fetchAllTeachers(); // Refresh list
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ✅ Image Upload
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
    if (!apiKey) return Swal.fire("Error", "ImgBB API Key Missing", "error");

    Swal.fire({
      title: "Uploading Image...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const data = new FormData();
      data.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: data,
        },
      );
      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({ ...prev, photo: result.data.url }));
        Swal.close();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Image Upload Failed", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
        <p className="mt-2 text-gray-500">Loading Teachers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] rounded-2xl p-6 text-white flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-2xl font-bold">Teacher Management</h2>
          <p className="text-sm opacity-80">
            Manage all teacher profiles (CRUD)
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <FaPlus /> Add New Teacher
        </button>
      </div>

      {/* Teachers Grid */}
      {/* Teachers Grid */}
      {teachers.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
          <FaUser className="text-6xl text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-700">No Teachers Found</h3>
          <p className="text-gray-500">
            Click "Add New Teacher" to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              {/* 👇 উপরের ব্যাকগ্রাউন্ড কালার (h-24) */}
              <div className="h-24 bg-teal-50 relative">
                {/* Actions (Edit/Delete) */}
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50"
                    title="Edit"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id, teacher.name)}
                    className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              {/* 👇 ছবি এবং টেক্সট এরিয়া (relative z-10 যোগ করা হয়েছে) */}
              <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center relative z-10">
                {/* Avatar / Image */}
                <div className="w-24 h-24 rounded-full bg-white shadow-md border-4 border-white overflow-hidden mb-3">
                  {teacher.profileImage ? (
                    <img
                      src={teacher.profileImage}
                      alt={teacher.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl text-gray-400 font-bold rounded-full">
                      {teacher.name?.charAt(0) || "T"}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                  {teacher.name} <MdVerified className="text-blue-500" />
                </h3>
                <p className="text-sm text-teal-600 font-semibold mb-1">
                  {teacher.designation || "Teacher"}
                </p>
                <p className="text-xs text-gray-500 mb-3">{teacher.email}</p>

                <div className="w-full bg-gray-50 rounded-lg p-3 text-sm text-left space-y-1">
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaBuilding className="text-gray-400" />{" "}
                    {teacher.department || "No Dept"}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />{" "}
                    {teacher.phone || "No Phone"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">
                {editId ? "Edit Teacher Profile" : "Add New Teacher"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {/* Photo Upload */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaCamera className="text-gray-400 text-2xl" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-teal-700">
                    <FaCamera size={12} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Bio
                  </label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg font-bold text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
              >
                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}{" "}
                Save Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
/* ============================================================
   ROUTINE TAB — unchanged (works via email)
   ============================================================ */
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

  const email = (teacherInfo.email || "").toLowerCase().trim();
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const fetchProfile = useCallback(async () => {
    if (!email) {
      setLoading(false);
      return;
    }
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
  }, [email]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || `Error ${res.status}`);
      }
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
    } catch (e) {
      Swal.fire("Error", e.message || "Network issue", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;
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
  schedule.forEach((s) => grouped[s.day]?.push(s));

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
                            rel="noreferrer"
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

/* ============================================================
   PAYMENT TAB — unchanged
   ============================================================ */
const PaymentTab = ({ teacherInfo }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = (teacherInfo.email || "").toLowerCase().trim();

  useEffect(() => {
    const fetchP = async () => {
      if (!email) {
        setLoading(false);
        return;
      }
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
                      className={`px-2 py-1 rounded text-xs ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
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
