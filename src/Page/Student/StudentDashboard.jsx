import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const StudentDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // লোকাল স্টোরেজ বা ডেমো থেকে স্টুডেন্টের তথ্য সংগ্রহ
  const studentEmail =
    localStorage.getItem("studentEmail") ||
    user?.email ||
    "student@tarabiyah.com";
  const studentPhone = localStorage.getItem("studentPhone") || "01700000000";

  // সাইডবার মেনু এবং পেমেন্ট সেকশন ট্যাব স্টেট
  const [activeMenu, setActiveMenu] = useState("financial"); // dashboard, profile, academic, exam, online-payment, financial
  const [paymentTab, setPaymentTab] = useState("summary"); // summary, all-bill, history, online-history

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
      <Navbar />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-grow">
        {/* ================= LEFT SIDEBAR (ঠিক স্ক্রিনশটের মতো) ================= */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shadow-sm">
          <div className="p-4 bg-[#004d4d] text-white font-bold text-sm tracking-wide">
            Tarbiyah Online Madrasah (TOM)
          </div>
          <nav className="p-2 space-y-1 text-sm font-medium text-gray-700">
            <Link to="/student-dashboard">
              <button
                onClick={() => setActiveMenu("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "dashboard" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
              >
                <span>🏠</span> Dashboard
              </button>
            </Link>
            <Link to="/studentprofile">
              <button
                onClick={() => setActiveMenu("profile")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "profile" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
              >
                <span>👤</span> Profile
              </button>
            </Link>
            <Link to="/academic">
              <button
                onClick={() => setActiveMenu("academic")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${activeMenu === "academic" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span>🏛️</span> Academic
                </div>
              </button>
            </Link>
            <Link to="/studentresult">
              <button
                onClick={() => setActiveMenu("exam")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "exam" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
              >
                <span>📄</span> Regular Exam Result
              </button>
            </Link>
            <Link to="/online-payment">
              <button
                onClick={() => setActiveMenu("online-payment")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "online-payment" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
              >
                <span>💳</span> Monthly Online Payment
              </button>
            </Link>
            <Link to="/due-payment">
              <button
                onClick={() => setActiveMenu("financial")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "financial" ? "bg-teal-50 text-[#004d4d] font-bold bg-teal-50" : "hover:bg-gray-50"}`}
              >
                <span>💰</span> Due & Payments
              </button>
            </Link>
          </nav>
          <div className="p-4 text-xs text-gray-400 mt-20 border-t border-gray-100">
            2026 © Pipilika Soft
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT AREA ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          {/* Top Bar inside Content */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              Student Financial & Report Portal
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

          {/* 01. Important Notice Banner (হুবহু স্ক্রিনশটের মতো সবুজ বার) */}
          <div className="bg-[#5cb85c] text-white p-3 rounded-t-lg shadow-sm flex items-center gap-2 font-medium text-sm">
            <span>ℹ️</span> Important Notice
          </div>
          <div className="bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg shadow-sm mb-6 text-sm text-gray-700 flex items-center gap-2">
            <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded font-mono font-bold">
              Note:
            </span>
            Dear students: Please pay your payment to bKash.
          </div>

          {/* 02. Payment Sub-Tabs (Payment Summary, All Bill, Payment History, Online Payment History) */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4 text-sm">
              <button
                onClick={() => setPaymentTab("summary")}
                className={`px-4 py-1.5 rounded border transition-all ${paymentTab === "summary" ? "bg-gray-100 font-bold border-gray-400 text-gray-800" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Payment Summary
              </button>
              <button
                onClick={() => setPaymentTab("all-bill")}
                className={`px-4 py-1.5 rounded border transition-all ${paymentTab === "all-bill" ? "bg-gray-100 font-bold border-gray-400 text-gray-800" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                All Bill (Debit)
              </button>
              <button
                onClick={() => setPaymentTab("history")}
                className={`px-4 py-1.5 rounded border transition-all ${paymentTab === "history" ? "bg-gray-100 font-bold border-gray-400 text-gray-800" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Payment History (Credit)
              </button>
              <button
                onClick={() => setPaymentTab("online-history")}
                className={`px-4 py-1.5 rounded border transition-all ${paymentTab === "online-history" ? "bg-gray-100 font-bold border-gray-400 text-gray-800" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Online Payment History
              </button>
            </div>

            {/* Filter and Refresh Bar */}
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

            {/* Two Column Grid for Payment Summary & Over All Summary (ঠিক স্ক্রিনশটের মতো দুই ভাগে বিভক্ত) */}
            {paymentTab === "summary" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Box: Payment Summary Details */}
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
                      <span>2,280.00</span>
                    </div>
                  </div>
                </div>

                {/* Right Box: Over all Summery */}
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 font-bold text-sm text-gray-800 flex items-center gap-2">
                    <span>📈</span> Over all Summery
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
                      <span className="font-bold text-gray-900">
                        Over All Due on Bill:
                      </span>
                      <span className="bg-red-600 text-white font-bold px-3 py-1 rounded text-sm shadow">
                        2,280.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Content */}
            {paymentTab === "all-bill" && (
              <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
                <p className="font-bold text-gray-800 mb-2">
                  All Semester Bills:
                </p>
                <p>
                  Fall 2026 Semester Bill:{" "}
                  <span className="font-bold text-red-600">2,280.00 BDT</span>{" "}
                  (Status: Due)
                </p>
              </div>
            )}

            {paymentTab === "history" && (
              <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
                <p className="font-bold text-gray-800 mb-2">
                  Payment History (Credit):
                </p>
                <p className="text-gray-500">
                  No payment records found yet. Please pay via bKash.
                </p>
              </div>
            )}

            {paymentTab === "online-history" && (
              <div className="p-4 text-sm text-gray-600 bg-teal-50 rounded-lg border border-teal-100 text-center space-y-3">
                <p className="font-bold text-teal-900 text-base">
                  Make Online Payment via bKash / SSLCommerz
                </p>
                <p className="text-gray-600 text-xs">
                  আপনার বকেয়া ২,২৮০.০০ টাকা অনলাইনে পরিশোধ করতে নিচের বাটনে
                  ক্লিক করুন।
                </p>
                <button
                  onClick={() =>
                    Swal.fire(
                      "Redirecting...",
                      "Connecting to bKash Gateway...",
                      "info",
                    )
                  }
                  className="bg-[#004d4d] hover:bg-teal-900 text-white px-6 py-2 rounded-lg font-bold text-sm shadow"
                >
                  Pay 2,280.00 BDT Now
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
