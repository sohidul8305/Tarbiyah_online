// src/Page/Student_profile/Student_profile.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaEdit,
  FaSave,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaIdCard,
  FaKey,
  FaGlobe,
  FaBook,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSync,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const API_BASE = "https://api.tarbiyahonline.com/api";

const StudentProfile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    studentId: "",
    password: "",
    phone: "",
    class: "",
    course: "",
    status: "",
    // ✅ Personal
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianPhone: "",
    dob: "",
    bloodGroup: "",
    religion: "",
    nationality: "",
    country: "",
    // ✅ Address
    address: "",
    presentAddress: "",
    permanentAddress: "",
    // ✅ Payment
    paymentStatus: "Unpaid",
    paymentMethod: "",
    transactionId: "",
    paidAmount: 0,
    dueAmount: 0,
    courseFee: 0,
    scholarshipAmount: 0,
    monthlyFee: 0,
    // ✅ Dates
    admissionDate: "",
    createdAt: "",
  });

  // ============================================================
  // ✅ Load from localStorage, then fetch fresh from API
  // ============================================================
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (!isLoggedIn) {
      navigate("/student-login");
      return;
    }

    const raw = localStorage.getItem("studentInfo");
    if (!raw) {
      navigate("/student-login");
      return;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      navigate("/student-login");
      return;
    }

    // Fast load from localStorage
    setProfile((prev) => mapProfileData(parsed, prev));

    // Then fetch fresh
    if (parsed._id) {
      fetchFreshProfile(parsed._id, parsed.loginSource);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // ✅ Field mapper — সব source এর জন্য
  // ============================================================
  const mapProfileData = (d, prev = {}) => {
    const paid =
      Number(d.paidAmount) ||
      (d.paidMonths || []).reduce((s, p) => s + Number(p.amount || 0), 0);
    const fee = Number(d.courseFee) || 0;
    const scholarship = Number(d.scholarshipAmount) || 0;
    const due = Number(d.dueAmount) || Math.max(fee - scholarship - paid, 0);

    const src = d.loginSource || d.source || "students";
    const srcLabel =
      d.sourceLabel ||
      (src === "basic_tazweed_students"
        ? "Basic Tazweed"
        : src === "najera_batch_students"
          ? "Najera Batch"
          : "Regular Student");

    return {
      ...prev,
      ...d,
      _id: d._id || prev._id || "",
      name: d.name || prev.name || "",
      studentId: d.studentId || prev.studentId || "",
      password: d.password || prev.password || "••••••••",
      phone: d.phone || prev.phone || "",
      class: d.class || d.course || prev.class || "",
      course: d.course || d.class || prev.course || "",
      status: d.status || prev.status || "Active",

      loginSource: src,
      source: src,
      sourceLabel: srcLabel,

      fatherName: d.fatherName || prev.fatherName || "",
      motherName: d.motherName || prev.motherName || "",
      guardianName: d.guardianName || d.fatherName || prev.guardianName || "",
      guardianPhone: d.guardianPhone || d.phone || prev.guardianPhone || "",
      dob: d.dob || d.dateOfBirth || prev.dob || "",
      bloodGroup: d.bloodGroup || prev.bloodGroup || "",
      religion: d.religion || prev.religion || "",
      nationality: d.nationality || prev.nationality || "",
      country: d.country || prev.country || "BD",

      address: d.address || d.presentAddress || prev.address || "",
      presentAddress:
        d.presentAddress || d.address || prev.presentAddress || "",
      permanentAddress:
        d.permanentAddress || d.address || prev.permanentAddress || "",

      paymentStatus:
        d.paymentStatus ||
        (due === 0 && paid > 0 ? "Paid" : paid > 0 ? "Partial" : "Unpaid"),
      paymentMethod: d.paymentMethod || prev.paymentMethod || "",
      transactionId: d.transactionId || prev.transactionId || "",
      paidAmount: paid,
      dueAmount: due,
      courseFee: fee,
      scholarshipAmount: scholarship,
      monthlyFee: Number(d.monthlyFee) || fee,

      admissionDate: d.admissionDate || d.createdAt || prev.admissionDate || "",
      createdAt: d.createdAt || prev.createdAt || "",
    };
  };

  // ============================================================
  // ✅ Fetch fresh from correct API source
  // ============================================================
  const fetchFreshProfile = async (studentId, loginSource) => {
    try {
      const resolvedSource =
        loginSource || localStorage.getItem("loginSource") || "students";

      let data = null;

      if (resolvedSource === "basic_tazweed_students") {
        const res = await fetch(`${API_BASE}/basic-tazweed/all`);
        const d = await res.json();
        if (d.success && Array.isArray(d.students)) {
          data = d.students.find(
            (s) => s._id === studentId || s.studentId === studentId,
          );
        }
      } else if (resolvedSource === "najera_batch_students") {
        const res = await fetch(`${API_BASE}/najera-batch/all`);
        const d = await res.json();
        if (d.success && Array.isArray(d.students)) {
          data = d.students.find(
            (s) => s._id === studentId || s.studentId === studentId,
          );
        }
      } else {
        const res = await fetch(`${API_BASE}/students/details/${studentId}`);
        const d = await res.json();
        if (d.success) data = d.student;
      }

      if (data) {
        const enriched = { ...data, loginSource: resolvedSource };
        setProfile((prev) => mapProfileData(enriched, prev));
        localStorage.setItem("studentInfo", JSON.stringify(enriched));
        localStorage.setItem("loginSource", resolvedSource);
      }
    } catch (e) {
      console.error("❌ Fetch profile error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      localStorage.setItem(
        "studentInfo",
        JSON.stringify({ ...parsedInfo, ...profile }),
      );
    } else {
      localStorage.setItem("studentInfo", JSON.stringify(profile));
    }

    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "✅ Profile Updated!",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("studentInfo");
    if (saved) setProfile((prev) => mapProfileData(JSON.parse(saved), prev));
    setIsEditing(false);
  };

  const menuItems = [
    {
      id: "dashboard",
      path: "/student-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/student-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "academic",
      path: "/student-acedemic",
      icon: <FaUniversity className="text-xl" />,
      label: "Academic",
    },
    {
      id: "result",
      path: "/student-result",
      icon: <FaFileAlt className="text-xl" />,
      label: "Exam Result",
    },
    {
      id: "payment",
      path: "/online-payment",
      icon: <FaCreditCard className="text-xl" />,
      label: "Online Payment",
    },
    {
      id: "due",
      path: "/due-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Due & Payments",
    },
  ];

  // ✅ Source color helper
  const sourceStyle = (src) => {
    switch (src) {
      case "basic_tazweed_students":
        return "bg-green-100 text-green-700 border-green-300";
      case "najera_batch_students":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  const statusStyle = (s) => {
    if (s === "Active" || s === "Paid") return "bg-green-100 text-green-700";
    if (s === "Partial" || s === "Pending")
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {profile.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{profile.name}</p>
              <p className="text-xs opacity-80 truncate">
                {profile.class || profile.course}
              </p>
              {profile.sourceLabel && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-semibold">
                  {profile.sourceLabel}
                </span>
              )}
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                  }`}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaUser /> Student Profile
                </h2>
                <p className="text-sm opacity-80">
                  Complete personal & academic information
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    fetchFreshProfile(profile._id, profile.loginSource)
                  }
                  className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm flex items-center gap-2"
                >
                  <FaSync size={12} /> Refresh
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 ${
                    isEditing
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white text-[#00ADD2] hover:bg-gray-100"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <FaTimes /> Cancel
                    </>
                  ) : (
                    <>
                      <FaEdit /> Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* ============ Status Strip ============ */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle(profile.status)}`}
              >
                {profile.status || "Active"}
              </span>

              {/* ✅ Source Badge */}
              {profile.sourceLabel && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${sourceStyle(profile.source)}`}
                >
                  🎓 {profile.sourceLabel}
                </span>
              )}

              <span className="text-xs text-gray-500">
                📅 Joined:{" "}
                {profile.admissionDate
                  ? new Date(profile.admissionDate).toLocaleDateString()
                  : "N/A"}
              </span>
              {profile.studentId && (
                <span className="text-xs text-gray-500 font-mono">
                  🆔 {profile.studentId}
                </span>
              )}
            </div>

            {/* ============ Personal Info ============ */}
            <h3 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b flex items-center gap-2">
              <FaUser /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <Field label="Full Name" icon={<FaUserGraduate />}>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {profile.name || "N/A"}
                  </p>
                )}
              </Field>

              <Field label="Student ID" icon={<FaIdCard />}>
                <p className="text-gray-800 font-mono text-sm">
                  {profile.studentId || "N/A"}
                </p>
              </Field>

              <Field label="Password" icon={<FaKey />}>
                <p className="text-gray-800 font-mono text-sm">
                  {profile.password || "••••••••"}
                </p>
              </Field>
              <Field label="Phone" icon={<FaPhone />}>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{profile.phone || "N/A"}</p>
                )}
              </Field>

              <Field label="Country" icon={<FaGlobe />}>
                <p className="text-gray-800">{profile.country || "N/A"}</p>
              </Field>
            </div>

            {/* ============ Academic Info ============ */}
            <h3 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b flex items-center gap-2">
              <FaBook /> Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <Field label="Course / Class" icon={<FaBook />}>
                <p className="text-gray-800 font-medium">
                  {profile.sourceLabel ||
                    profile.course ||
                    profile.class ||
                    "N/A"}
                </p>
              </Field>

              <Field label="Admission Date" icon={<FaCalendarAlt />}>
                <p className="text-gray-800">
                  {profile.admissionDate
                    ? new Date(profile.admissionDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6"></div>

            {/* ============ Payment Info ============ */}
            <h3 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b flex items-center gap-2">
              <FaMoneyCheckAlt /> Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <StatCard
                label="Course Fee"
                value={`৳${Number(profile.courseFee || 0).toFixed(2)}`}
                color="text-gray-800"
              />
              <StatCard
                label="Scholarship"
                value={`৳${Number(profile.scholarshipAmount || 0).toFixed(2)}`}
                color="text-blue-600"
              />
              <StatCard
                label="Paid Amount"
                value={`৳${Number(profile.paidAmount || 0).toFixed(2)}`}
                color="text-green-600"
              />
              <StatCard
                label="Due Amount"
                value={`৳${Number(profile.dueAmount || 0).toFixed(2)}`}
                color="text-red-600"
              />
              <StatCard
                label="Payment Status"
                value={profile.paymentStatus || "Unpaid"}
                color={
                  profile.paymentStatus === "Paid"
                    ? "text-green-600"
                    : profile.paymentStatus === "Partial"
                      ? "text-yellow-600"
                      : "text-red-600"
                }
              />
              <StatCard
                label="Payment Method"
                value={profile.paymentMethod || "N/A"}
                color="text-gray-800"
              />
              <StatCard
                label="Transaction ID"
                value={profile.transactionId || "N/A"}
                color="text-gray-800"
                mono
              />
              <StatCard
                label="Monthly Fee"
                value={`৳${Number(profile.monthlyFee || 0).toFixed(2)}`}
                color="text-gray-800"
              />
            </div>

            {/* Save buttons */}
            {isEditing && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  className="bg-[#00ADD2] hover:bg-[#008c9e] text-white px-6 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable components
const Field = ({ label, icon, children }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
      {icon} {label}
    </label>
    {children}
  </div>
);

const StatCard = ({ label, value, color, mono }) => (
  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
    <p className="text-[10px] text-gray-500 uppercase font-semibold">{label}</p>
    <p className={`font-bold ${color} ${mono ? "font-mono text-xs" : ""}`}>
      {value}
    </p>
  </div>
);

export default StudentProfile;
