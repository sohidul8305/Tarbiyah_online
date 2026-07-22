// src/Page/Online_payment/Online_payment.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Online_payment = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || !studentId) {
      alert("অনুগ্রহ করে স্টুডেন্ট আইডি এবং টাকার পরিমাণ লিখুন।");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(
        `ধন্যবাদ! আপনার ${amount} টাকা পেমেন্টের জন্য ${selectedMethod.toUpperCase()} গেটওয়েতে রিডাইরেক্ট করা হচ্ছে...`,
      );
    }, 1500);
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

      {/* মূল অনলাইন পেমেন্ট কন্টেন্ট */}
      <div className="flex-1 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            অনলাইন ফি পরিশোধ (Online Payment)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            আপনার মাসিক বা কোর্স ফি সহজেই নিরাপদ মাধ্যমে পরিশোধ করুন
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              স্টুডেন্ট আইডি / রেজিস্ট্রেশন নম্বর
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="যেমন: STU-123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d4d] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              টাকার পরিমাণ (BDT)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="যেমন: ১০০০"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d4d] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              পেমেন্ট মাধ্যম নির্বাচন করুন
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "bkash", name: "bKash", sub: "বিকাশ", color: "pink" },
                { id: "nagad", name: "Nagad", sub: "নগদ", color: "orange" },
                { id: "rocket", name: "Rocket", sub: "রকেট", color: "purple" },
                {
                  id: "bank",
                  name: "Bank Card",
                  sub: "কার্ড / ব্যাংক",
                  color: "blue",
                },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                    selectedMethod === method.id
                      ? "border-[#004d4d] bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold text-gray-800 text-lg">
                    {method.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {method.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#004d4d] hover:bg-[#003333] text-white font-semibold py-3.5 rounded-lg transition duration-200 shadow-md flex items-center justify-center"
          >
            {loading
              ? "প্রসেসিং হচ্ছে..."
              : `পেমেন্ট সম্পন্ন করুন (${selectedMethod.toUpperCase()})`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Online_payment;
