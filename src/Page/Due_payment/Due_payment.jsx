// src/Page/Due_payment/Due_payment.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaInfoCircle,
  FaSync,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Due_payment = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("summary"); // summary, allBill, paymentHistory, onlineHistory
  const [selectedSemester, setSelectedSemester] = useState(
    "Fall 2026 (Jul-Dec)",
  );
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    paymentStatus: "",
    paidAmount: "",
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setStudentInfo({
        name: parsedInfo.name || "Shakil Ahmmed",
        email: parsedInfo.email || "",
        phone: parsedInfo.phone || "",
        class: parsedInfo.class || "",
        roll: parsedInfo.roll || "26160110266",
        username: parsedInfo.username || "shakil",
        paymentStatus: parsedInfo.paymentStatus || "Unpaid",
        paidAmount: parsedInfo.paidAmount || "800",
      });
    }
  }, []);

  // Financial Summary Calculations based on Portal Layout
  const previousAdvance = 0.0;
  const thisSemesterBill = 1280.0;
  const thisSemesterPaid = parseFloat(studentInfo.paidAmount) || 800.0;
  const thisSemesterDue = thisSemesterBill - thisSemesterPaid;

  const totalBillDebit = 1280.0;
  const totalPaidCredit = thisSemesterPaid;
  const overAllDueOnBill = totalBillDebit - totalPaidCredit;

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
      label: "Monthly Online Payment",
    },
    {
      id: "due",
      path: "/due-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Due & Payments",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* বাম পাশের সাইডবার (Desktop View) */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {studentInfo.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{studentInfo.name}</p>
              <p className="text-xs opacity-80 truncate">{studentInfo.class}</p>
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

      {/* মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 space-y-4">
        {/* Important Notice Banner */}
        <div className="bg-[#5cb85c] text-white rounded-t-lg shadow-sm">
          <div className="px-4 py-2.5 flex items-center gap-2 font-semibold text-sm border-b border-white/20">
            <FaInfoCircle /> Important Notice
          </div>
          <div className="bg-white text-gray-800 px-4 py-3 text-sm rounded-b-lg border border-t-0 border-gray-200 flex items-center gap-2">
            <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded font-bold">
              Note:
            </span>
            <span>Dear students: Please pay your payment to bKash.</span>
          </div>
        </div>

        {/* Main Tab Navigation Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50 px-4 pt-3 gap-2">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-t border-x transition ${
                activeTab === "summary"
                  ? "bg-white text-gray-800 border-gray-300 shadow-sm -mb-px"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              Payment Summary
            </button>
            <button
              onClick={() => setActiveTab("allBill")}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-t border-x transition ${
                activeTab === "allBill"
                  ? "bg-white text-gray-800 border-gray-300 shadow-sm -mb-px"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              All Bill (Debit)
            </button>
            <button
              onClick={() => setActiveTab("paymentHistory")}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-t border-x transition ${
                activeTab === "paymentHistory"
                  ? "bg-white text-gray-800 border-gray-300 shadow-sm -mb-px"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              Payment History (Credit)
            </button>
            <button
              onClick={() => setActiveTab("onlineHistory")}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-t border-x transition ${
                activeTab === "onlineHistory"
                  ? "bg-white text-gray-800 border-gray-300 shadow-sm -mb-px"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              Online Payment History
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 md:p-6">
            {activeTab === "summary" && (
              <div>
                {/* Semester Selection & Refresh Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm font-bold text-gray-700">
                      📑 Payment Summary for
                    </span>
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#00ADD2]"
                    >
                      <option value="Fall 2026 (Jul-Dec)">
                        Fall 2026 (Jul-Dec)
                      </option>
                      <option value="Spring 2026 (Jan-Jun)">
                        Spring 2026 (Jan-Jun)
                      </option>
                    </select>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-1.5 bg-[#00ADD2] hover:bg-[#008c9e] text-white px-3 py-1.5 rounded-md text-sm font-semibold transition shadow-sm w-full sm:w-auto justify-center"
                  >
                    <FaSync className="text-xs" /> Refresh
                  </button>
                </div>

                {/* Two Column Summary Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Payment Summary for Semester */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-4 py-2.5 border-b border-gray-200 font-bold text-sm text-gray-800">
                      Payment Summary for {selectedSemester}
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Previous Advance:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {previousAdvance.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          This Semester Bill:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {thisSemesterBill.toFixed(2)}
                        </span>
                      </div>
                      <hr className="border-gray-300 my-1" />
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          This Semester Paid:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {thisSemesterPaid.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-gray-600 font-medium">
                          This Semester Due:
                        </span>
                        <span className="font-bold text-gray-800">
                          {thisSemesterDue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Over all Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-4 py-2.5 border-b border-gray-200 font-bold text-sm text-gray-800">
                      Over all Summary
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Bill (Debit):
                        </span>
                        <span className="font-semibold text-gray-800">
                          {totalBillDebit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Paid (Credit):
                        </span>
                        <span className="font-semibold text-gray-800">
                          {totalPaidCredit.toFixed(2)}
                        </span>
                      </div>
                      <hr className="border-gray-300 my-1" />
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-gray-700 font-bold">
                          Over All Due on Bill:
                        </span>
                        <span className="bg-[#d9534f] text-white font-bold px-3 py-1 rounded text-sm shadow-sm">
                          {overAllDueOnBill.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "allBill" && (
              <div className="text-center py-10 text-gray-500">
                <p className="text-base font-semibold">
                  সকল বিলের তালিকা (All Bill Debit Records)
                </p>
                <p className="text-xs mt-1">
                  এখানে আপনার সকল সেমিস্টারের ডেবিট বিলের বিবরণ দেখানো হবে।
                </p>
              </div>
            )}

            {activeTab === "paymentHistory" && (
              <div className="text-center py-10 text-gray-500">
                <p className="text-base font-semibold">
                  পেমেন্ট ইতিহাস (Payment History Credit)
                </p>
                <p className="text-xs mt-1">
                  আপনার সফলভাবে পরিশোধিত পেমেন্টগুলোর তালিকা এখানে থাকবে।
                </p>
              </div>
            )}

            {activeTab === "onlineHistory" && (
              <div className="text-center py-10 text-gray-500">
                <p className="text-base font-semibold">
                  অনলাইন পেমেন্ট ইতিহাস (Online Payment History)
                </p>
                <p className="text-xs mt-1">
                  অনলাইন গেটওয়ের মাধ্যমে করা লেনদেনের রেকর্ড।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Due_payment;
