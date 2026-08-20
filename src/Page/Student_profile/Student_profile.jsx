// src/Page/Student_profile/Student_profile.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  FaTransgender,
  FaTint,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const StudentProfile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    status: "",
    admissionDate: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
    presentAddress: "",
    permanentAddress: "",
    bloodGroup: "",
    gender: "",
    religion: "",
    nationality: "",
    course: "",
    paymentStatus: "",
    paymentMethod: "",
    transactionId: "",
    paidAmount: "",
    createdAt: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentInfo");
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      setProfile({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        class: parsedData.class || "",
        roll: parsedData.roll || "",
        username: parsedData.username || "",
        status: parsedData.status || "Active",
        admissionDate: parsedData.admissionDate || parsedData.createdAt || "",
        fatherName: parsedData.fatherName || "",
        motherName: parsedData.motherName || "",
        guardianName: parsedData.guardianName || "",
        guardianPhone: parsedData.guardianPhone || "",
        address: parsedData.address || parsedData.presentAddress || "",
        presentAddress: parsedData.presentAddress || "",
        permanentAddress: parsedData.permanentAddress || "",
        bloodGroup: parsedData.bloodGroup || "",
        gender: parsedData.gender || "",
        religion: parsedData.religion || "",
        nationality: parsedData.nationality || "",
        course: parsedData.course || "",
        paymentStatus: parsedData.paymentStatus || "Unpaid",
        paymentMethod: parsedData.paymentMethod || "",
        transactionId: parsedData.transactionId || "",
        paidAmount: parsedData.paidAmount || "",
        createdAt: parsedData.createdAt || "",
      });
    } else {
      setProfile({
        name: user?.displayName || "Student",
        email: user?.email || "student@tarabiyah.com",
        phone: "01700000000",
        class: "Class 8",
        roll: "2024-001",
        username: "student",
        status: "Active",
        admissionDate: "January 2024",
        fatherName: "Mr. Abdul Karim",
        motherName: "Mrs. Fatema Begum",
        guardianName: "Mr. Abdul Karim",
        guardianPhone: "01700000001",
        address: "Dhaka, Bangladesh",
        presentAddress: "Dhaka, Bangladesh",
        permanentAddress: "Dhaka, Bangladesh",
        bloodGroup: "A+",
        gender: "Male",
        religion: "Islam",
        nationality: "Bangladeshi",
        course: "Advanced Tajweed, Hifzul Quran",
        paymentStatus: "Unpaid",
        paymentMethod: "bKash",
        transactionId: "BKASH123456",
        paidAmount: "2280",
        createdAt: new Date().toISOString(),
      });
    }
    setLoading(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update localStorage
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      const updatedInfo = {
        ...parsedInfo,
        ...profile,
      };
      localStorage.setItem("studentInfo", JSON.stringify(updatedInfo));
    } else {
      localStorage.setItem("studentInfo", JSON.stringify(profile));
    }

    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "✅ Profile Updated!",
      text: "Your profile has been updated successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleCancel = () => {
    // Reload from localStorage
    const savedProfile = localStorage.getItem("studentInfo");
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      setProfile({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        class: parsedData.class || "",
        roll: parsedData.roll || "",
        username: parsedData.username || "",
        status: parsedData.status || "Active",
        admissionDate: parsedData.admissionDate || "",
        fatherName: parsedData.fatherName || "",
        motherName: parsedData.motherName || "",
        guardianName: parsedData.guardianName || "",
        guardianPhone: parsedData.guardianPhone || "",
        address: parsedData.address || "",
        presentAddress: parsedData.presentAddress || "",
        permanentAddress: parsedData.permanentAddress || "",
        bloodGroup: parsedData.bloodGroup || "",
        gender: parsedData.gender || "",
        religion: parsedData.religion || "",
        nationality: parsedData.nationality || "",
        course: parsedData.course || "",
        paymentStatus: parsedData.paymentStatus || "Unpaid",
        paymentMethod: parsedData.paymentMethod || "",
        transactionId: parsedData.transactionId || "",
        paidAmount: parsedData.paidAmount || "",
        createdAt: parsedData.createdAt || "",
      });
    }
    setIsEditing(false);
  };

  // Sidebar Menu Items
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
      {/* বাম পাশের সাইডবার (Desktop View) */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {profile.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{profile.name}</p>
              <p className="text-xs opacity-80 truncate">{profile.class}</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* মূল প্রোফাইল কন্টেন্ট */}
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
                  Manage your personal information
                </p>
              </div>
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

          {/* Profile Content */}
          <div className="p-6">
            {/* Status Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  profile.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : profile.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {profile.status || "Pending"}
              </span>
              <span className="text-xs text-gray-500">
                📅 Joined:{" "}
                {profile.admissionDate
                  ? new Date(profile.admissionDate).toLocaleDateString()
                  : "N/A"}
              </span>
              <span className="text-xs text-gray-500">
                🆔 {profile.roll || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaUserGraduate /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaEnvelope /> Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaPhone /> Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaCalendarAlt /> Class
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="class"
                      value={profile.class}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.class}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    📚 Course
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="course"
                      value={profile.course}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.course || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    👤 Username
                  </label>
                  <p className="text-gray-800 font-mono text-sm">
                    {profile.username || "Not assigned"}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaUserGraduate /> Father's Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fatherName"
                      value={profile.fatherName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    />
                  ) : (
                    <p className="text-gray-800">
                      {profile.fatherName || "N/A"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <FaTransgender /> Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.gender || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                  <FaMapMarkerAlt /> Present Address
                </label>
                {isEditing ? (
                  <textarea
                    name="presentAddress"
                    value={profile.presentAddress || profile.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                  />
                ) : (
                  <p className="text-gray-800">
                    {profile.presentAddress || profile.address || "N/A"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                  <FaMapMarkerAlt /> Permanent Address
                </label>
                {isEditing ? (
                  <textarea
                    name="permanentAddress"
                    value={profile.permanentAddress || profile.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#00ADD2] focus:ring-1 focus:ring-[#00ADD2]"
                  />
                ) : (
                  <p className="text-gray-800">
                    {profile.permanentAddress || profile.address || "N/A"}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                💳 Payment Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Payment Status:</span>
                  <span
                    className={`ml-2 font-semibold ${
                      profile.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {profile.paymentStatus || "Unpaid"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="ml-2 font-semibold">
                    {profile.paymentMethod || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="ml-2 font-mono text-xs">
                    {profile.transactionId || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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

export default StudentProfile;
