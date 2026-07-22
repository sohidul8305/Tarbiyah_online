// src/Page/Student/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaHome,
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const StudentDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    admissionDate: "",
  });

  // লোড স্টুডেন্ট ইনফো
  useEffect(() => {
    const savedStudent = localStorage.getItem("studentInfo");
    if (savedStudent) {
      setStudentInfo(JSON.parse(savedStudent));
    } else {
      // ডেমো ডাটা
      setStudentInfo({
        name: user?.displayName || "Sohidul Islam",
        email: user?.email || "student@tarabiyah.com",
        phone: "01700000000",
        class: "Class 8",
        roll: "2024-001",
        admissionDate: "January 2024",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
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

  // সাইডবার মেনু আইটেম
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Mobile Header with Sidebar Toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Student Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {studentInfo.name?.charAt(0) || "S"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{studentInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {studentInfo.class}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      activeMenu === item.id
                        ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
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

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* ================= OVERLAY (Mobile) ================= */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Student Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {studentInfo.name}!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {studentInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ================= DASHBOARD CONTENT ================= */}
          <Outlet />

          {/* বা, এখানে সরাসরি ড্যাশবোর্ড কন্টেন্ট */}
          {activeMenu === "dashboard" && (
            <DashboardContent studentInfo={studentInfo} />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

// ==========================================
// ড্যাশবোর্ড কন্টেন্ট (সব ট্যাবের কন্টেন্ট)
// ==========================================

// 1. Dashboard Home Content
const DashboardContent = ({ studentInfo }) => {
  const [paymentTab, setPaymentTab] = useState("summary");

  // স্ট্যাটিস্টিকস কার্ড
  const stats = [
    { label: "Total Courses", value: "6", icon: "📚", color: "bg-blue-50" },
    { label: "Completed", value: "4", icon: "✅", color: "bg-green-50" },
    { label: "Pending", value: "2", icon: "⏳", color: "bg-yellow-50" },
    { label: "Due Payment", value: "৳2,280", icon: "💰", color: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-4 rounded-xl shadow-sm border border-gray-100`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-sm font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Important Notice */}
      <div className="bg-[#5cb85c] text-white p-3 rounded-t-lg shadow-sm flex items-center gap-2 font-medium text-sm">
        <span>ℹ️</span> Important Notice
      </div>
      <div className="bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg shadow-sm mb-6 text-sm text-gray-700 flex items-center gap-2">
        <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded font-mono font-bold">
          Note:
        </span>
        Dear students: Please pay your payment to bKash.
      </div>

      {/* Payment Section */}
      <PaymentSection paymentTab={paymentTab} setPaymentTab={setPaymentTab} />
    </div>
  );
};

// 2. Payment Section Component
const PaymentSection = ({ paymentTab, setPaymentTab }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4 text-sm">
        {[
          { id: "summary", label: "Payment Summary" },
          { id: "all-bill", label: "All Bill (Debit)" },
          { id: "history", label: "Payment History (Credit)" },
          { id: "online-history", label: "Online Payment History" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPaymentTab(tab.id)}
            className={`px-4 py-1.5 rounded border transition-all ${
              paymentTab === tab.id
                ? "bg-gray-100 font-bold border-gray-400 text-gray-800"
                : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-700 w-full sm:w-auto">
          <span>📋 Payment Summary for</span>
          <select className="border border-gray-300 rounded px-3 py-1 bg-white text-sm focus:outline-none">
            <option>Fall 2026 (Jul-Dec)</option>
            <option>Spring 2026 (Jan-Jun)</option>
          </select>
        </div>
        <button
          onClick={() =>
            Swal.fire("Refreshed", "Data updated successfully", "success")
          }
          className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white text-xs px-3 py-1.5 rounded font-bold flex items-center gap-1 shadow-sm"
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {/* Tab Content */}
      {paymentTab === "summary" && <PaymentSummary />}
      {paymentTab === "all-bill" && <AllBill />}
      {paymentTab === "history" && <PaymentHistory />}
      {paymentTab === "online-history" && <OnlinePaymentHistory />}
    </div>
  );
};

// 3. Payment Summary Component
const PaymentSummary = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Left Box */}
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 font-bold text-sm text-gray-800 flex items-center gap-2">
        <span>📊</span> Payment Summary for Fall 2026 (Jul-Dec)
      </div>
      <div className="p-4 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span>Previous Advance:</span>
          <span className="font-semibold">0.00</span>
        </div>
        <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span>This Semester Bill:</span>
          <span className="font-semibold">2,280.00</span>
        </div>
        <div className="border-t border-black my-1"></div>
        <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span>This Semester Paid:</span>
          <span className="font-semibold">0.00</span>
        </div>
        <div className="flex justify-between py-1 text-base font-bold text-gray-900">
          <span>This Semester Due:</span>
          <span className="text-red-600">2,280.00</span>
        </div>
      </div>
    </div>

    {/* Right Box */}
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 font-bold text-sm text-gray-800 flex items-center gap-2">
        <span>📈</span> Overall Summary
      </div>
      <div className="p-4 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span>Total Bill (Debit):</span>
          <span className="font-semibold">2,280.00</span>
        </div>
        <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
          <span>Total Paid (Credit):</span>
          <span className="font-semibold">0.00</span>
        </div>
        <div className="border-t border-black my-1"></div>
        <div className="flex justify-between items-center py-2 bg-gray-50 px-2 rounded">
          <span className="font-bold text-gray-900">Overall Due:</span>
          <span className="bg-red-600 text-white font-bold px-3 py-1 rounded text-sm shadow">
            2,280.00
          </span>
        </div>
      </div>
    </div>
  </div>
);

// 4. All Bill Component
const AllBill = () => (
  <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
    <p className="font-bold text-gray-800 mb-4">All Semester Bills:</p>
    <div className="space-y-2">
      <div className="flex justify-between items-center p-2 bg-white rounded border">
        <span>Fall 2026 Semester Bill</span>
        <span className="font-bold text-red-600">2,280.00 BDT</span>
        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
          Due
        </span>
      </div>
      <div className="flex justify-between items-center p-2 bg-white rounded border">
        <span>Spring 2026 Semester Bill</span>
        <span className="font-bold text-green-600">2,280.00 BDT</span>
        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
          Paid
        </span>
      </div>
    </div>
  </div>
);

// 5. Payment History Component
const PaymentHistory = () => (
  <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
    <p className="font-bold text-gray-800 mb-2">Payment History (Credit):</p>
    <p className="text-gray-500">No payment records found yet.</p>
    <div className="mt-4 text-xs text-gray-400">
      <p>📌 Total Paid: 0.00 BDT</p>
    </div>
  </div>
);

// 6. Online Payment History Component
const OnlinePaymentHistory = () => (
  <div className="p-4 text-sm bg-teal-50 rounded-lg border border-teal-100 text-center space-y-4">
    <p className="font-bold text-teal-900 text-base">
      Make Online Payment via bKash / SSLCommerz
    </p>
    <p className="text-gray-600 text-sm">
      আপনার বকেয়া <span className="font-bold text-red-600">২,২৮০.০০ টাকা</span>{" "}
      অনলাইনে পরিশোধ করতে নিচের বাটনে ক্লিক করুন।
    </p>
    <button
      onClick={() =>
        Swal.fire({
          title: "Payment Gateway",
          text: "Connecting to bKash Gateway...",
          icon: "info",
          confirmButtonColor: "#004d4d",
        })
      }
      className="bg-[#004d4d] hover:bg-teal-900 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg transition-all"
    >
      Pay 2,280.00 BDT Now
    </button>
  </div>
);

export default StudentDashboard;
