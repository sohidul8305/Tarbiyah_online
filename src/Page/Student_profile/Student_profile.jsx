import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Student_profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // লোকাল স্টোরেজ বা ডেমো থেকে স্টুডেন্টের তথ্য সংগ্রহ
  const studentEmail =
    localStorage.getItem("studentEmail") ||
    user?.email ||
    "student@tarabiyah.com";
  const studentPhone = localStorage.getItem("studentPhone") || "01700000000";

  // সাইডবার মেনু স্টেট
  const [activeMenu, setActiveMenu] = useState("profile");

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-grow">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shadow-sm">
          <div className="p-4 bg-[#004d4d] text-white font-bold text-sm tracking-wide">
            Islamic Online Madrasah (IOM)
          </div>
          <nav className="p-2 space-y-1 text-sm font-medium text-gray-700">
            <button
              onClick={() => {
                setActiveMenu("dashboard");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "dashboard" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>🏠</span> Dashboard
            </button>
            <button
              onClick={() => setActiveMenu("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "profile" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>👤</span> Profile
            </button>
            <button
              onClick={() => setActiveMenu("academic")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${activeMenu === "academic" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <span>🏛️</span> Academic
              </div>
              <span>&rsaquo;</span>
            </button>
            <button
              onClick={() => setActiveMenu("exam")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "exam" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>📄</span> Regular Exam Result
            </button>
            <button
              onClick={() => setActiveMenu("online-payment")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "online-payment" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>💳</span> Monthly Online Payment
            </button>
            <button
              onClick={() => {
                setActiveMenu("financial");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "financial" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>💰</span> Due & Payments
            </button>
          </nav>
          <div className="p-4 text-xs text-gray-400 mt-20 border-t border-gray-100">
            2026 © Pipilika Soft
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT AREA (Detailed Admission & Profile Info) ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          {/* Top Bar inside Content */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              Complete Student & Admission Profile
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">
                {user?.displayName || "Sohidul Islam"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Card Box */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 bg-[#004d4d] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.displayName || "Sohidul Islam"}
                </h2>
                <p className="text-sm text-gray-500">
                  Student ID: TRB-2026-9821 | Status:{" "}
                  <span className="text-green-600 font-bold">Active</span>
                </p>
              </div>
            </div>

            {/* ফর্মের তথ্যাদি সেকশন অনুযায়ী সাজানো */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* 1. Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-[#004d4d] border-b pb-2 flex items-center gap-2">
                  <span>👤</span> Personal Information
                </h3>
                <div>
                  <p className="text-gray-500">Full Name (Bangla / English):</p>
                  <p className="font-semibold text-gray-800">
                    {user?.displayName || "Sohidul Islam"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Father's Name:</p>
                  <p className="font-semibold text-gray-800">Md. Abdul Karim</p>
                </div>
                <div>
                  <p className="text-gray-500">Mother's Name:</p>
                  <p className="font-semibold text-gray-800">
                    Mst. Fatema Begum
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth & Gender:</p>
                  <p className="font-semibold text-gray-800">
                    15 January 2002 | Male
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Email Address:</p>
                  <p className="font-semibold text-gray-800">{studentEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone / WhatsApp Number:</p>
                  <p className="font-semibold text-gray-800">{studentPhone}</p>
                </div>
              </div>

              {/* 2. Academic & Course Choice Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-[#004d4d] border-b pb-2 flex items-center gap-2">
                  <span>🏛️</span> Academic & Course Choice
                </h3>
                <div>
                  <p className="text-gray-500">Enrolled Program / Course:</p>
                  <p className="font-semibold text-[#004d4d]">
                    Diploma in Islamic Studies
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Academic Session / Semester:</p>
                  <p className="font-semibold text-gray-800">
                    Fall 2026 (Jul-Dec)
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Shift / Batch Preference:</p>
                  <p className="font-semibold text-gray-800">
                    Evening Batch (Online)
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Educational Qualification:</p>
                  <p className="font-semibold text-gray-800">
                    HSC / Alim Passed
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Admission / Enrollment Date:</p>
                  <p className="font-semibold text-gray-800">15 January 2026</p>
                </div>
              </div>

              {/* 3. Address Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-[#004d4d] border-b pb-2 flex items-center gap-2">
                  <span>🏠</span> Address Details
                </h3>
                <div>
                  <p className="text-gray-500">Present Address:</p>
                  <p className="font-semibold text-gray-800">
                    Mirpur-10, Dhaka, Bangladesh
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Permanent Address:</p>
                  <p className="font-semibold text-gray-800">
                    Sadar Upazila, District - Sylhet
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Nationality & Religion:</p>
                  <p className="font-semibold text-gray-800">
                    Bangladeshi | Islam
                  </p>
                </div>
              </div>

              {/* 4. Payment & Transaction Info (ভর্তি ও পেমেন্ট ফর্মের তথ্য) */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-bold text-[#004d4d] border-b pb-2 flex items-center gap-2">
                  <span>💳</span> Admission Payment Info
                </h3>
                <div>
                  <p className="text-gray-500">Payment Method Used:</p>
                  <p className="font-semibold text-gray-800">
                    bKash Merchant / Online Gateway
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Transaction ID (TrxID):</p>
                  <p className="font-semibold text-teal-700 font-mono">
                    TRX9821XYZ76
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Admission Fee Status:</p>
                  <p className="font-semibold text-green-600">
                    Paid (Verified)
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Current Semester Due:</p>
                  <p className="font-semibold text-red-600">2,280.00 BDT</p>
                </div>
              </div>
            </div>

            {/* Edit / Update Profile Button */}
            <div className="flex justify-end pt-4 border-t gap-3">
              <button
                onClick={() =>
                  Swal.fire(
                    "Notice",
                    "Profile update request form will open here.",
                    "info",
                  )
                }
                className="bg-[#004d4d] hover:bg-teal-900 text-white font-bold text-sm px-6 py-2 rounded-lg shadow transition-all"
              >
                Update Profile Info
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Student_profile;
