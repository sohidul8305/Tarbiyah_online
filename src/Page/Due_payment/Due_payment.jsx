// src/Page/Due_payment/Due_payment.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Due_payment = () => {
  const location = useLocation();

  const dueDetails = {
    month: "জুন ২০২৬",
    tuitionFee: 1500,
    examFee: 500,
    libraryFine: 0,
    totalDue: 2000,
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
              <span className="text-xl font-bold">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">Sohidul Islam</p>
              <p className="text-xs opacity-80 truncate">Class 8</p>
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

      {/* মূল বকেয়া পেমেন্ট কন্টেন্ট */}
      <div className="flex-1 max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            বকেয়া ফি (Due Payment)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            আপনার অ্যাকাউন্টের বর্তমান বকেয়া স্ট্যাটাস
          </p>
        </div>

        {/* বকেয়া সামারি কার্ড */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-red-600 font-medium">
              মোট বকেয়া পরিমাণ
            </p>
            <h3 className="text-3xl font-bold text-red-700">
              ৳ {dueDetails.totalDue}
            </h3>
          </div>
          <span className="bg-red-200 text-red-800 text-xs font-semibold px-3 py-1 rounded-full uppercase">
            বকেয়া রয়েছে
          </span>
        </div>

        {/* ফি এর বিস্তারিত টেবিল */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-700">
                <th className="p-3">বিবরণ (Description)</th>
                <th className="p-3">মাস / খাত</th>
                <th className="p-3 text-right">পরিমাণ (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
              <tr>
                <td className="p-3 font-medium text-gray-800">
                  মাসিক টিউশন ফি
                </td>
                <td className="p-3">{dueDetails.month}</td>
                <td className="p-3 text-right">৳ {dueDetails.tuitionFee}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">পরীক্ষার ফি</td>
                <td className="p-3">সেমিস্টার ফাইনাল</td>
                <td className="p-3 text-right">৳ {dueDetails.examFee}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">
                  লাইব্রেরি ফাইন
                </td>
                <td className="p-3">প্রযোজ্য নয়</td>
                <td className="p-3 text-right">৳ {dueDetails.libraryFine}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* পেমেন্ট পেজে যাওয়ার বাটন */}
        <div className="flex justify-end">
          <Link
            to="/online-payment"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200 flex items-center gap-2"
          >
            <span>বকেয়া পরিশোধ করুন</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Due_payment;
