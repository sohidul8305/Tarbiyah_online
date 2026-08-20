// src/Page/Online_payment/Online_payment.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaWallet,
  FaBuilding, // ✅ FaBank এর পরিবর্তে FaBuilding
  FaMobileAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

const Online_payment = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
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
      });
      setUsername(parsedInfo.username || "");
    }
  }, []);

  // Merchant Numbers
  const merchantNumbers = {
    bkash: "01841412525",
    nagad: "01841512525",
  };

  // Bank Information
  const bankInfo = {
    accountName: "Tarbiyah Academy",
    accountNumber: "401211100007923",
    bankName: "Shahjalal Islami Bank Limited",
    branch: "Satmasjid Road Branch",
    branchCode: "4012",
    swiftCode: "SJBLBDDHSMR",
    routingNo: "190264035",
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || !username) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য অসম্পূর্ণ!",
        text: "অনুগ্রহ করে ইউজারনেম এবং টাকার পরিমাণ লিখুন।",
        confirmButtonColor: "#00ADD2",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      let methodName = "";
      let merchantNumber = "";
      if (selectedMethod === "bkash") {
        methodName = "bKash";
        merchantNumber = merchantNumbers.bkash;
      } else if (selectedMethod === "nagad") {
        methodName = "Nagad";
        merchantNumber = merchantNumbers.nagad;
      } else if (selectedMethod === "rocket") {
        methodName = "Rocket";
      } else if (selectedMethod === "bank") {
        methodName = "Bank Transfer";
      }

      let htmlContent = `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>👤 ইউজারনেম:</strong> ${username}</p>
          <p><strong>💰 টাকার পরিমাণ:</strong> ৳${amount}</p>
          <p><strong>📱 পেমেন্ট মেথড:</strong> ${methodName}</p>
      `;

      if (selectedMethod === "bkash" || selectedMethod === "nagad") {
        htmlContent += `
          <hr style="margin: 10px 0;">
          <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #86efac;">
            <p style="font-weight: bold; color: #004d4d;">📌 Merchant Number:</p>
            <p style="font-size: 18px; font-weight: bold; color: #00ADD2;">${merchantNumber}</p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
              ⚠️ শুধুমাত্র "Merchant Pay" অপশনে পেমেন্ট করুন। "Send Money" করলে হবে না।
            </p>
          </div>
        `;
      }

      if (selectedMethod === "bank") {
        htmlContent += `
          <hr style="margin: 10px 0;">
          <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #93c5fd;">
            <p style="font-weight: bold; color: #004d4d;">🏦 Bank Information:</p>
            <p><strong>Account Name:</strong> ${bankInfo.accountName}</p>
            <p><strong>Account Number:</strong> <span style="font-weight: bold; color: #00ADD2;">${bankInfo.accountNumber}</span></p>
            <p><strong>Bank:</strong> ${bankInfo.bankName}</p>
            <p><strong>Branch:</strong> ${bankInfo.branch}</p>
            <p><strong>Branch Code:</strong> ${bankInfo.branchCode}</p>
            <p><strong>SWIFT Code:</strong> ${bankInfo.swiftCode}</p>
            <p><strong>Routing No:</strong> ${bankInfo.routingNo}</p>
          </div>
        `;
      }

      htmlContent += `
          <hr style="margin: 10px 0;">
          <p style="color: #004d4d; font-weight: bold; text-align: center;">
            ✅ পেমেন্ট প্রক্রিয়া সম্পন্ন হয়েছে!<br/>
            আপনার পেমেন্ট কনফার্মেশনের জন্য অপেক্ষা করুন।
          </p>
        </div>
      `;

      Swal.fire({
        icon: "success",
        title: "✅ পেমেন্ট সফল!",
        html: htmlContent,
        confirmButtonColor: "#00ADD2",
        confirmButtonText: "ঠিক আছে",
        width: 500,
      });
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "কপি করা হয়েছে!",
      text: `${text} কপি করা হয়েছে।`,
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#00ADD2",
    });
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

      {/* মূল অনলাইন পেমেন্ট কন্টেন্ট */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaCreditCard /> অনলাইন ফি পরিশোধ
                </h2>
                <p className="text-sm opacity-80">
                  {studentInfo.name} • {studentInfo.class} • ইউজারনেম:{" "}
                  {studentInfo.username || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <FaWallet className="text-white" />
                <span className="text-sm font-medium">মাসিক ফি</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Payment Instructions */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-yellow-600 text-xl mt-0.5" />
                <div>
                  <h4 className="font-bold text-yellow-800 text-sm">
                    ⚠️ পেমেন্ট নির্দেশনা:
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1 mt-1 list-disc list-inside">
                    <li>
                      বিকাশ ও নগদে{" "}
                      <span className="font-bold text-red-600">
                        "সেন্ড মানি"
                      </span>{" "}
                      করলে হবে না। শুধুমাত্র{" "}
                      <span className="font-bold text-green-600">
                        "মার্চেন্ট পে"
                      </span>{" "}
                      অপশনে পেমেন্ট করতে হবে।
                    </li>
                    <li>
                      মার্চেন্ট নম্বর:{" "}
                      <span className="font-bold text-[#00ADD2]">
                        বিকাশ: 01841412525
                      </span>{" "}
                      এবং{" "}
                      <span className="font-bold text-[#00ADD2]">
                        নগদ: 01841512525
                      </span>
                    </li>
                    <li>ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন।</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" /> ইউজারনেম
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="আপনার ইউজারনেম লিখুন"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ADD2] focus:outline-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 আপনার অ্যাডমিন দ্বারা প্রদত্ত ইউজারনেম ব্যবহার করুন
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMoneyBillWave className="inline mr-2" /> টাকার পরিমাণ (BDT)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="যেমন: ১০০০"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ADD2] focus:outline-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 আপনার মাসিক ফি বা কোর্স ফি অনুযায়ী টাকা লিখুন
                </p>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FaCreditCard className="inline mr-2" /> পেমেন্ট মাধ্যম
                  নির্বাচন করুন
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      id: "bkash",
                      name: "bKash",
                      icon: "💳",
                      sub: "মার্চেন্ট পে",
                      color: "pink",
                    },
                    {
                      id: "nagad",
                      name: "Nagad",
                      icon: "📱",
                      sub: "মার্চেন্ট পে",
                      color: "orange",
                    },
                    {
                      id: "rocket",
                      name: "Rocket",
                      icon: "🚀",
                      sub: "মোবাইল ব্যাংকিং",
                      color: "purple",
                    },
                    {
                      id: "bank",
                      name: "Bank Transfer",
                      icon: "🏦",
                      sub: "ব্যাংক ট্রান্সফার",
                      color: "blue",
                    },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                        selectedMethod === method.id
                          ? "border-[#00ADD2] bg-[#e6f7f9] shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-bold text-gray-800 text-sm mt-1">
                        {method.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {method.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Merchant Number Display for bKash/Nagad */}
              {(selectedMethod === "bkash" || selectedMethod === "nagad") && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        📌 {selectedMethod === "bkash" ? "bKash" : "Nagad"}{" "}
                        Merchant Number:
                      </p>
                      <p className="text-xl font-bold text-[#00ADD2]">
                        {selectedMethod === "bkash"
                          ? merchantNumbers.bkash
                          : merchantNumbers.nagad}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          selectedMethod === "bkash"
                            ? merchantNumbers.bkash
                            : merchantNumbers.nagad,
                        )
                      }
                      className="bg-[#00ADD2] hover:bg-[#008c9e] text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1"
                    >
                      <FaCopy size={14} /> কপি
                    </button>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    ⚠️ শুধুমাত্র "Merchant Pay" অপশনে পেমেন্ট করুন। "Send Money"
                    করলে হবে না।
                  </p>
                </div>
              )}

              {/* Bank Information */}
              {selectedMethod === "bank" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2">
                    <FaBuilding /> 🏦 ব্যাংক তথ্য:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <p>
                        <span className="font-semibold">Account Name:</span>{" "}
                        {bankInfo.accountName}
                      </p>
                      <p>
                        <span className="font-semibold">Account Number:</span>
                        <span className="font-bold text-[#00ADD2] ml-1">
                          {bankInfo.accountNumber}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Bank:</span>{" "}
                        {bankInfo.bankName}
                      </p>
                      <p>
                        <span className="font-semibold">Branch:</span>{" "}
                        {bankInfo.branch}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Branch Code:</span>{" "}
                        {bankInfo.branchCode}
                      </p>
                      <p>
                        <span className="font-semibold">SWIFT Code:</span>{" "}
                        {bankInfo.swiftCode}
                      </p>
                      <p>
                        <span className="font-semibold">Routing No:</span>{" "}
                        {bankInfo.routingNo}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(bankInfo.accountNumber)}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <FaCopy size={12} /> কপি অ্যাকাউন্ট নম্বর
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00ADD2] hover:bg-[#008c9e] text-white font-semibold py-3.5 rounded-lg transition duration-200 shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    প্রসেসিং হচ্ছে...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-2" />
                    পেমেন্ট সম্পন্ন করুন (
                    {selectedMethod === "bkash"
                      ? "bKash"
                      : selectedMethod === "nagad"
                        ? "Nagad"
                        : selectedMethod === "rocket"
                          ? "Rocket"
                          : "Bank Transfer"}
                    )
                  </>
                )}
              </button>
            </form>

            {/* Payment Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                📋 পেমেন্ট সামারি
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">ইউজারনেম:</span>
                  <span className="font-semibold">{username || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">পেমেন্ট মেথড:</span>
                  <span className="font-semibold">
                    {selectedMethod === "bkash"
                      ? "bKash"
                      : selectedMethod === "nagad"
                        ? "Nagad"
                        : selectedMethod === "rocket"
                          ? "Rocket"
                          : "Bank Transfer"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">টাকার পরিমাণ:</span>
                  <span className="font-bold text-[#00ADD2]">
                    ৳{amount || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">স্ট্যাটাস:</span>
                  <span className="text-yellow-600 font-semibold">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Online_payment;
