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

  const refreshTeacherInfo = useCallback(() => {
    const authEmail = (user?.email || "").toLowerCase().trim();
    const savedEmail = (safeRead("teacherEmail") || "").toLowerCase().trim();

    if (authEmail && savedEmail && authEmail !== savedEmail) {
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
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-transform duration-300 h-screen md:h-auto overflow-y-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${isActive ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"}`}
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
          {currentPath === "/teacher-routine" && <RoutineTab />}
          {currentPath === "/teacher-payment" && (
            <PaymentTab teacherInfo={teacherInfo} />
          )}
        </main>
      </div>
    </div>
  );
};

/* ============================================================
   TAB 1: TEACHER MANAGEMENT (PROFILE CRUD)
   ============================================================ */
const ProfileTab = ({ teacherInfo, onProfileUpdate }) => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    department: "",
    phone: "",
    baseSalary: "",
    perClassRate: "",
    bio: "",
    photo: "",
  });

  const fetchAllTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/teacher-profiles/all`);
      const resData = await res.json();
      if (resData.success) setTeachers(resData.profiles || []);
    } catch (err) {
      Swal.fire("Error", "Failed to load teachers list", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const handleAddNew = () => {
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      title: "Teacher",
      department: "",
      phone: "",
      baseSalary: "",
      perClassRate: "",
      bio: "",
      photo: "",
    });
    setShowForm(true);
  };

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
      baseSalary: teacher.baseSalary || "",
      perClassRate: teacher.perClassRate || "",
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return Swal.fire("Warning", "Name and Email are required", "warning");
    }

    setIsSaving(true);
    try {
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
          baseSalary: Number(formData.baseSalary) || 0,
          perClassRate: Number(formData.perClassRate) || 0,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success)
        throw new Error(resData.message || "Failed to save");

      Swal.fire({
        icon: "success",
        title: editId ? "Teacher Updated!" : "Teacher Added!",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowForm(false);
      fetchAllTeachers();
      if (onProfileUpdate && formData.email === teacherInfo.email)
        onProfileUpdate();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${name}"'s profile?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/teacher-profile/by-id/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      if (!res.ok || !resData.success)
        throw new Error(resData.message || "Failed to delete");
      Swal.fire("Deleted!", "Teacher profile has been deleted.", "success");
      fetchAllTeachers();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024)
      return Swal.fire(
        "Warning",
        "File size should be less than 2MB",
        "warning",
      );

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
        { method: "POST", body: data },
      );
      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, photo: result.data.url }));
        Swal.close();
      } else throw new Error("Upload failed");
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Image Upload Failed", "error");
    }
  };

  if (isLoading)
    return (
      <div className="text-center p-10">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
      </div>
    );

  return (
    <div className="space-y-6 pb-10">
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
              <div className="h-24 bg-teal-50 relative">
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id, teacher.name)}
                    className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center relative z-10">
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

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Base Salary (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={formData.baseSalary || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, baseSalary: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Per Class Rate (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 200"
                    value={formData.perClassRate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, perClassRate: e.target.value })
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
   TAB 2: ROUTINE COMPONENT 
   ============================================================ */
const RoutineTab = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/teacher-profiles/all`);
        const data = await res.json();
        if (data.success) setTeachers(data.profiles || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const fetchProfile = async () => {
    if (!selectedTeacher) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(selectedTeacher.email)}`,
      );
      const data = await res.json();
      setProfile(data.success ? data.profile : null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [selectedTeacher]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(selectedTeacher.email)}/schedule`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      Swal.fire({
        icon: "success",
        title: "Class Added!",
        timer: 1500,
        showConfirmButton: false,
      });
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
      Swal.fire("Error", e.message || "Failed to add class", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this class?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;
    try {
      await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(selectedTeacher.email)}/schedule/${id}`,
        { method: "DELETE" },
      );
      fetchProfile();
    } catch (e) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center p-10">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
      </div>
    );

  if (!selectedTeacher) {
    return (
      <div className="space-y-6 pb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Select Teacher for Routine
          </h2>
          <p className="text-sm text-gray-500">
            Click on a teacher to view or manually add their 7-day class
            routine.
          </p>
        </div>
        {teachers.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
            <FaUser className="text-6xl text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-700">
              No Teachers Added
            </h3>
            <p className="text-gray-500">
              Go to the Profile tab to add teachers first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                onClick={() => setSelectedTeacher(teacher)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-teal-400 cursor-pointer transition-all flex flex-col"
              >
                <div className="h-20 bg-teal-50 relative"></div>
                <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow border-4 border-white overflow-hidden mb-3">
                    {teacher.profileImage ? (
                      <img
                        src={teacher.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-teal-100 flex items-center justify-center text-2xl text-teal-700 font-bold">
                        {teacher.name?.charAt(0) || "T"}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold mb-1">
                    {teacher.designation || "Teacher"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{teacher.email}</p>
                  <button className="w-full bg-teal-50 text-teal-700 font-bold py-2 rounded-lg hover:bg-teal-100 transition-colors">
                    Manage Routine
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const schedule = profile?.classSchedule || [];
  const grouped = {};
  days.forEach((d) => (grouped[d] = []));
  schedule.forEach((s) => grouped[s.day]?.push(s));

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSelectedTeacher(null);
              setProfile(null);
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
          >
            <FaTimes size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {selectedTeacher.name}'s Routine
            </h2>
            <p className="text-sm text-gray-500">
              {selectedTeacher.designation} | {selectedTeacher.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-all w-full md:w-auto justify-center"
        >
          <FaPlusCircle /> Add Class Manually
        </button>
      </div>

      {schedule.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
          <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-700">No Classes Yet</h3>
          <p className="text-gray-500">
            Click "Add Class Manually" to start building the routine.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {days.map(
            (day) =>
              grouped[day].length > 0 && (
                <div
                  key={day}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="bg-teal-800 text-white px-4 py-2 font-bold text-sm flex justify-between items-center">
                    <span>{day}</span>
                    <span className="bg-teal-700 text-xs px-2 py-1 rounded-full">
                      {grouped[day].length} Classes
                    </span>
                  </div>
                  <div className="p-3 space-y-3 flex-grow bg-gray-50/50">
                    {grouped[day].map((c, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-lg border border-gray-200 relative group shadow-sm"
                      >
                        <p className="font-bold text-sm text-gray-800 pr-6">
                          {c.subject}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          <span className="font-semibold text-teal-600">
                            Class:
                          </span>{" "}
                          {c.class} <br />
                          <span className="font-semibold text-teal-600">
                            Time:
                          </span>{" "}
                          {c.time}
                          {c.room && (
                            <>
                              <br />
                              <span className="font-semibold text-teal-600">
                                Room:
                              </span>{" "}
                              {c.room}
                            </>
                          )}
                        </p>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-1"
                        >
                          <FaTrash size={12} />
                        </button>
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 font-semibold mt-3 flex items-center gap-1 hover:underline bg-blue-50 p-1.5 rounded"
                          >
                            <FaLink size={10} /> Join Meeting
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleAdd}
            className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-gray-800">
                Add Class for {selectedTeacher.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Select Day *
                </label>
                <select
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Subject Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                  placeholder="e.g. Quran Studies"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700">
                  Class / Batch *
                </label>
                <input
                  type="text"
                  required
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                  placeholder="e.g. Batch A"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700">
                  Time *
                </label>
                <input
                  type="text"
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                  placeholder="e.g. 10:00 AM"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700">
                  Room (Optional)
                </label>
                <input
                  type="text"
                  value={form.room}
                  onChange={(e) => setForm({ ...form, room: e.target.value })}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                  placeholder="e.g. Room 101"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700">
                  Meeting Link (Optional)
                </label>
                <input
                  type="url"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                  placeholder="https://zoom.us/..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-bold hover:bg-teal-700 shadow-md mt-4"
            >
              Save Class
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   TAB 3: PAYMENT COMPONENT (Select Teacher -> Manage Salary)
   ============================================================ */
const PaymentTab = ({ teacherInfo }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // মোডালের জন্য আলাদা স্টেট
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTeacher, setModalTeacher] = useState(null);
  const [modalAmount, setModalAmount] = useState("");
  const [isFetchingSalary, setIsFetchingSalary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profile, setProfile] = useState(null);
  const [calcData, setCalcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const defaultMonthStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  const [formData, setFormData] = useState({
    month: defaultMonthStr,
    method: "bKash",
    date: new Date().toISOString().split("T")[0],
    status: "Paid",
  });

  // ১. প্রথমে সব টিচারের লিস্ট নিয়ে আসা
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/teacher-profiles/all`);
        const data = await res.json();
        if (data.success) setTeachers(data.profiles || []);
      } catch (e) {
        console.error("Error fetching teachers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // ২. টিচার সিলেক্ট করলে তার প্রোফাইল এবং স্যালারি ক্যালকুলেশন আনা (মেইন পেজের জন্য)
  const fetchProfileAndSalary = async () => {
    if (!selectedTeacher) return;
    setLoading(true);
    setErrorMsg("");
    const email = selectedTeacher.email;

    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(email)}`,
      );
      const data = await res.json();
      setProfile(data.success ? data.profile : null);

      const calcRes = await fetch(
        `${API_BASE}/api/teacher-salary/calculate/${encodeURIComponent(email)}?month=${currentMonth}&year=${currentYear}`,
      );
      const calcResult = await calcRes.json();

      if (calcResult.success) {
        setCalcData(calcResult);
      } else {
        setErrorMsg(calcResult.message || "Failed to calculate salary");
        setCalcData(null);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndSalary();
  }, [selectedTeacher]);

  // ৩. মোডালে টিচার চেঞ্জ করলে অটোমেটিক স্যালারি আনা
  const handleModalTeacherChange = async (e) => {
    const email = e.target.value;
    const teacher = teachers.find((t) => t.email === email);
    setModalTeacher(teacher);

    if (!teacher) {
      setModalAmount("");
      return;
    }

    setIsFetchingSalary(true);
    try {
      const calcRes = await fetch(
        `${API_BASE}/api/teacher-salary/calculate/${encodeURIComponent(email)}?month=${currentMonth}&year=${currentYear}`,
      );
      const calcResult = await calcRes.json();

      if (calcResult.success) {
        setModalAmount(calcResult.netPayable || ""); // অটো এমাউন্ট বসে যাবে
      } else {
        setModalAmount("");
      }
    } catch (error) {
      console.error(error);
      setModalAmount("");
    } finally {
      setIsFetchingSalary(false);
    }
  };

  // ৪. পেমেন্ট সাবমিট করা
  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!modalTeacher)
      return Swal.fire("Warning", "টিচার সিলেক্ট করুন!", "warning");
    if (!modalAmount || Number(modalAmount) <= 0)
      return Swal.fire("Warning", "সঠিক পরিমাণ দিন!", "warning");

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/teacher-profile/${encodeURIComponent(modalTeacher.email)}/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            month: formData.month,
            amount: Number(modalAmount),
            method: formData.method,
            date: formData.date,
            status: formData.status,
          }),
        },
      );

      const resData = await res.json();
      if (!res.ok || !resData.success)
        throw new Error(resData.message || "Failed to add payment");

      Swal.fire({
        icon: "success",
        title: "Payment Added!",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowAddModal(false);

      // যদি বর্তমানে ওই টিচারের পেজেই থাকে, তবে পেজ রিফ্রেশ করবো
      if (selectedTeacher && selectedTeacher.email === modalTeacher.email) {
        fetchProfileAndSalary();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // মোডাল ওপেন করার ফাংশন
  const openAddModal = (teacher = null) => {
    setModalTeacher(teacher || (teachers.length > 0 ? teachers[0] : null));
    if (teacher) {
      // যদি কার্ড থেকে ক্লিক করা হয়, তবে সেই টিচারের স্যালারি আনি
      setTimeout(() => {
        document
          .getElementById("teacherSelect")
          ?.dispatchEvent(new Event("change", { bubbles: true }));
        document.getElementById("teacherSelect").value = teacher.email;
        handleModalTeacherChange({ target: { value: teacher.email } });
      }, 100);
    }
    setShowAddModal(true);
  };

  // টিচার লিস্ট ভিউ
  if (loading && !selectedTeacher) {
    return (
      <div className="text-center p-10">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
      </div>
    );
  }

  if (!selectedTeacher) {
    return (
      <div className="space-y-6 pb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Select Teacher for Payment
            </h2>
            <p className="text-sm text-gray-500">
              Click on a teacher to view their salary details or add payment.
            </p>
          </div>
          <button
            onClick={() => openAddModal()}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Payment
          </button>
        </div>

        {teachers.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
            <FaUser className="text-6xl text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-700">
              No Teachers Added
            </h3>
            <p className="text-gray-500">
              Go to the Profile tab to add teachers first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                onClick={() => setSelectedTeacher(teacher)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-teal-400 cursor-pointer transition-all flex flex-col"
              >
                <div className="h-20 bg-teal-50 relative"></div>
                <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow border-4 border-white overflow-hidden mb-3">
                    {teacher.profileImage ? (
                      <img
                        src={teacher.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-teal-100 flex items-center justify-center text-2xl text-teal-700 font-bold">
                        {teacher.name?.charAt(0) || "T"}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold mb-1">
                    {teacher.designation || "Teacher"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{teacher.email}</p>
                  <button className="w-full bg-teal-50 text-teal-700 font-bold py-2 rounded-lg hover:bg-teal-100 transition-colors">
                    Manage Salary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // নির্দিষ্ট টিচারের পেমেন্ট ভিউ
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

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSelectedTeacher(null);
              setProfile(null);
              setCalcData(null);
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
          >
            <FaTimes size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {selectedTeacher.name}'s Salary
            </h2>
            <p className="text-sm text-gray-500">
              {selectedTeacher.designation} | {selectedTeacher.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => openAddModal(selectedTeacher)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-all w-full md:w-auto justify-center"
        >
          <FaPlus /> Add Payment
        </button>
      </div>

      {loading ? (
        <div className="text-center p-10">
          <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto" />
        </div>
      ) : (
        <>
          {/* Auto-Calculated Salary Box */}
          {calcData ? (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-teal-800 mb-2">
                Auto-Calculated Salary for {currentMonth}/{currentYear}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Base Salary</p>
                  <p className="font-bold text-gray-800">
                    ৳{calcData.breakdown.baseSalary}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Class Earnings ({calcData.breakdown.attendedClasses}{" "}
                    classes)
                  </p>
                  <p className="font-bold text-green-600">
                    + ৳{calcData.breakdown.classEarnings}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Absent Deduction ({calcData.breakdown.absentDays} days)
                  </p>
                  <p className="font-bold text-red-600">
                    - ৳{calcData.breakdown.attendanceDeduction}
                  </p>
                </div>
                <div className="bg-teal-100 p-2 rounded-lg">
                  <p className="text-teal-800 font-semibold">Net Payable</p>
                  <p className="font-bold text-xl text-teal-900">
                    ৳{calcData.netPayable}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              <strong>⚠️ Salary calculation failed.</strong> <br />
              {errorMsg}
            </div>
          )}

          {/* স্ট্যাটাস কার্ড */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Total Paid (All Time)</p>
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
              <p className="text-sm text-gray-500">Last Payment Date</p>
              <p className="text-lg font-bold text-blue-600">
                {history[0]?.date || "N/A"}
              </p>
            </div>
          </div>

          {/* পেমেন্ট হিস্ট্রি টেবিল */}
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-gray-50 font-bold">
              Payment History
            </div>
            {history.length === 0 ? (
              <p className="p-6 text-center text-gray-500">
                No payment records yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-600 border-b">
                    <tr>
                      <th className="p-3">Month</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((p, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3">{p.month}</td>
                        <td className="p-3 font-semibold text-teal-700">
                          ৳{Number(p.amount).toLocaleString()}
                        </td>
                        <td className="p-3">{p.date}</td>
                        <td className="p-3 text-gray-500">
                          {p.method || "Cash"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${p.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ✅ Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleAddPayment}
            className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-gray-800">Add Payment</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* টিচার সিলেক্ট ড্রপডাউন */}
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Select Teacher *
                </label>
                <select
                  id="teacherSelect"
                  required
                  value={modalTeacher?.email || ""}
                  onChange={handleModalTeacherChange}
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none font-semibold text-gray-800"
                >
                  <option value="" disabled>
                    -- Select a Teacher --
                  </option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t.email}>
                      {t.name} ({t.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Month (YYYY-MM) *
                </label>
                <input
                  type="month"
                  required
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Amount (৳) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    placeholder={
                      isFetchingSalary ? "Calculating..." : "e.g. 10000"
                    }
                    value={modalAmount}
                    onChange={(e) => setModalAmount(e.target.value)}
                    className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none pr-10"
                  />
                  {isFetchingSalary && (
                    <FaSpinner className="animate-spin absolute right-3 top-4 text-teal-600" />
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">
                  Payment Method
                </label>
                <select
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Bank">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg mt-1 bg-gray-50 focus:border-teal-500 outline-none"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting || isFetchingSalary}
                className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-bold hover:bg-teal-700 shadow-md flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave />
                )}{" "}
                Save Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
