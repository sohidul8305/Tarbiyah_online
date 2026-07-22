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
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const StudentProfile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    admissionDate: "",
    fatherName: "",
    motherName: "",
    address: "",
    bloodGroup: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentInfo");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({
        name: user?.displayName || "Sohidul Islam",
        email: user?.email || "student@tarabiyah.com",
        phone: "01700000000",
        class: "Class 8",
        roll: "2024-001",
        admissionDate: "January 2024",
        fatherName: "Mr. Abdul Karim",
        motherName: "Mrs. Fatema Begum",
        address: "Dhaka, Bangladesh",
        bloodGroup: "A+",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("studentInfo", JSON.stringify(profile));
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been updated successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // সাইডবার মেনু আইটেমসমূহ
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

  return (
    <div className="flex gap-6">
      {/* বাম পাশের সাইডবার (Desktop View) */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">
                {profile.name?.charAt(0) || "S"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{profile.name}</p>
              <p className="text-xs opacity-80 truncate">{profile.class}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mt-1
                    ${
                      isActive
                        ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
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
      <div className="flex-1 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Student Profile</h2>
                <p className="text-sm opacity-80">
                  Manage your personal information
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-[#004d4d] px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Class
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="class"
                      value={profile.class}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.class}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Roll Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="roll"
                      value={profile.roll}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.roll}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Admission Date
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="admissionDate"
                      value={profile.admissionDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.admissionDate}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Father's Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fatherName"
                      value={profile.fatherName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.fatherName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                    >
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.bloodGroup}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Address
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-[#004d4d]"
                />
              ) : (
                <p className="text-gray-800">{profile.address}</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-[#004d4d] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003333] transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Cancel
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
