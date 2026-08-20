// src/Page/Due_payment/Due_payment.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaWallet,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Due_payment = () => {
  const location = useLocation();
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
        name: parsedInfo.name || "",
        email: parsedInfo.email || "",
        phone: parsedInfo.phone || "",
        class: parsedInfo.class || "",
        roll: parsedInfo.roll || "",
        username: parsedInfo.username || "",
        paymentStatus: parsedInfo.paymentStatus || "Unpaid",
        paidAmount: parsedInfo.paidAmount || "0",
      });
    }
  }, []);

  // Due Details - Student এর তথ্য অনুযায়ী
  const paidAmount = parseFloat(studentInfo.paidAmount) || 0;
  const totalBill = paidAmount > 0 ? paidAmount : 2280;
  const isPaid = studentInfo.paymentStatus === "Paid";
  const totalDue = isPaid ? 0 : totalBill;

  const dueDetails = {
    month: "জুন ২০২৬",
    tuitionFee: totalBill > 0 ? totalBill * 0.6 : 1500,
    examFee: totalBill > 0 ? totalBill * 0.25 : 500,
    libraryFine: 0,
    totalDue: totalDue,
    totalBill: totalBill,
    paidAmount: isPaid ? totalBill : 0,
    status: isPaid ? "Paid" : "Due",
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

      {/* মূল বকেয়া পেমেন্ট কন্টেন্ট */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaMoneyBillWave /> বকেয়া ফি (Due Payment)
                </h2>
                <p className="text-sm opacity-80">
                  {studentInfo.name} • {studentInfo.class} • Roll:{" "}
                  {studentInfo.roll || "N/A"}
                </p>
              </div>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isPaid ? "bg-green-500/30" : "bg-red-500/30"
                }`}
              >
                {isPaid ? (
                  <FaCheckCircle className="text-white" />
                ) : (
                  <FaExclamationTriangle className="text-white" />
                )}
                <span className="text-sm font-medium">
                  {isPaid ? "পেইড" : "বকেয়া"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Due Summary Card */}
            <div
              className={`p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                isPaid
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-medium ${
                    isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPaid
                    ? "✅ সমস্ত ফি পরিশোধ করা হয়েছে"
                    : "⚠️ মোট বকেয়া পরিমাণ"}
                </p>
                <h3
                  className={`text-3xl font-bold ${
                    isPaid ? "text-green-700" : "text-red-700"
                  }`}
                >
                  ৳ {dueDetails.totalDue.toFixed(2)}
                </h3>
                {isPaid && (
                  <p className="text-sm text-green-600 mt-1">
                    ধন্যবাদ! আপনার সকল ফি পরিশোধ করা হয়েছে।
                  </p>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  isPaid
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800 animate-pulse"
                }`}
              >
                {isPaid ? "✅ পরিশোধিত" : "⏳ বকেয়া রয়েছে"}
              </span>
            </div>

            {/* Payment Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">মোট বিল</p>
                <p className="text-lg font-bold text-[#00ADD2]">
                  ৳ {dueDetails.totalBill.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">পরিশোধিত</p>
                <p className="text-lg font-bold text-green-600">
                  ৳ {dueDetails.paidAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">বকেয়া</p>
                <p
                  className={`text-lg font-bold ${isPaid ? "text-green-600" : "text-red-600"}`}
                >
                  ৳ {dueDetails.totalDue.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">স্ট্যাটাস</p>
                <p
                  className={`text-sm font-bold ${isPaid ? "text-green-600" : "text-red-600"}`}
                >
                  {isPaid ? "✅ Paid" : "⚠️ Due"}
                </p>
              </div>
            </div>

            {/* Fee Details Table */}
            <div className="overflow-x-auto mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FaCalendarAlt className="text-[#00ADD2]" /> ফি এর বিস্তারিত
              </h4>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-700">
                    <th className="p-3 font-semibold">বিবরণ (Description)</th>
                    <th className="p-3 font-semibold">মাস / খাত</th>
                    <th className="p-3 font-semibold text-right">
                      পরিমাণ (BDT)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">
                      মাসিক টিউশন ফি
                    </td>
                    <td className="p-3 text-gray-600">{dueDetails.month}</td>
                    <td className="p-3 text-right font-semibold">
                      ৳ {dueDetails.tuitionFee.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">
                      পরীক্ষার ফি
                    </td>
                    <td className="p-3 text-gray-600">সেমিস্টার ফাইনাল</td>
                    <td className="p-3 text-right font-semibold">
                      ৳ {dueDetails.examFee.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">
                      লাইব্রেরি ফাইন
                    </td>
                    <td className="p-3 text-gray-600">প্রযোজ্য নয়</td>
                    <td className="p-3 text-right font-semibold">
                      ৳ {dueDetails.libraryFine.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-bold">
                    <td className="p-3 text-gray-800">মোট</td>
                    <td className="p-3 text-gray-600"></td>
                    <td
                      className={`p-3 text-right ${
                        isPaid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ৳ {dueDetails.totalDue.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <FaClock className="text-[#00ADD2]" />
                {isPaid ? (
                  <span>✅ আপনার সকল ফি পরিশোধ করা হয়েছে</span>
                ) : (
                  <span>⏳ শেষ তারিখ: ৩০ জুন ২০২৬</span>
                )}
              </div>
              <Link
                to={isPaid ? "/student-dashboard" : "/online-payment"}
                className={`${
                  isPaid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#00ADD2] hover:bg-[#008c9e]"
                } text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200 flex items-center gap-2`}
                onClick={(e) => {
                  if (isPaid) {
                    e.preventDefault();
                  }
                }}
              >
                <span>{isPaid ? "✅ ফি পরিশোধিত" : "বকেয়া পরিশোধ করুন"}</span>
                {!isPaid && <FaArrowRight />}
              </Link>
            </div>

            {/* Payment History */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <FaWallet className="text-[#00ADD2]" /> পেমেন্ট ইতিহাস
              </h4>
              {isPaid ? (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <span className="text-sm">
                    সর্বশেষ পেমেন্ট: {dueDetails.month} - ৳{" "}
                    {dueDetails.totalBill.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <FaClock />
                  <span className="text-sm">
                    কোনো পেমেন্ট ইতিহাস পাওয়া যায়নি
                  </span>
                </div>
              )}
              <div className="mt-2 text-xs text-gray-400">
                <p>📌 ইউজারনেম: {studentInfo.username || "N/A"}</p>
                <p>📌 স্ট্যাটাস: {isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Due_payment;
