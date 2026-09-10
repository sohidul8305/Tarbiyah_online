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
  FaBuilding,
  FaInfoCircle,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

const Online_payment = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [selectedSemester, setSelectedSemester] = useState(
    "Fall 2026 (Jul-Dec)",
  );
  const [selectedFees, setSelectedFees] = useState({});
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
        name: parsedInfo.name || "Shakil Ahmmed",
        email: parsedInfo.email || "",
        phone: parsedInfo.phone || "",
        class: parsedInfo.class || "",
        roll: parsedInfo.roll || "26160110266",
        username: parsedInfo.username || "shakil",
      });
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

  // Dummy Fee List for the selected semester
  const feeList = [
    { id: 1, name: "Admission Fee", amount: 500, status: "Paid" },
    { id: 2, name: "Tuition Fee (Jul-2026)", amount: 300, status: "Paid" },
    { id: 3, name: "Tuition Fee (Aug-2026)", amount: 300, status: "Unpaid" },
    { id: 4, name: "Tuition Fee (Sep-2026)", amount: 300, status: "Unpaid" },
    { id: 5, name: "Mid Term Fee", amount: 180, status: "Unpaid" },
    { id: 6, name: "Tuition Fee (Oct-2026)", amount: 300, status: "Unpaid" },
    { id: 7, name: "Tuition Fee (Nov-2026)", amount: 300, status: "Unpaid" },
    { id: 8, name: "Tuition Fee (Dec-2026)", amount: 300, status: "Unpaid" },
    { id: 9, name: "Final Term Fee", amount: 300, status: "Unpaid" },
  ];

  const handleCheckboxChange = (id, amount) => {
    setSelectedFees((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = amount;
      }
      return updated;
    });
  };

  const totalAmount = Object.values(selectedFees.reduce || selectedFees).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const handlePayment = (e) => {
    e.preventDefault();
    if (totalAmount <= 0 || !studentInfo.username) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য অসম্পূর্ণ!",
        text: "অনুগ্রহ করে কমপক্ষে একটি ফি সিলেক্ট করুন।",
        confirmButtonColor: "#00ADD2",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      let methodName = "bKash";
      let merchantNumber = merchantNumbers.bkash;
      if (selectedMethod === "nagad") {
        methodName = "Nagad";
        merchantNumber = merchantNumbers.nagad;
      } else if (selectedMethod === "rocket") {
        methodName = "Rocket";
      } else if (selectedMethod === "bank") {
        methodName = "Bank Transfer";
      }

      let htmlContent = `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>👤 ইউজারনেম:</strong> ${studentInfo.username}</p>
          <p><strong>💰 মোট টাকার পরিমাণ:</strong> ৳${totalAmount}</p>
          <p><strong>📱 পেমেন্ট মেথড:</strong> ${methodName}</p>
      `;

      if (selectedMethod === "bkash" || selectedMethod === "nagad") {
        htmlContent += `
          <hr style="margin: 10px 0;">
          <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #86efac;">
            <p style="font-weight: bold; color: #004d4d;">📌 Merchant Number:</p>
            <p style="font-size: 18px; font-weight: bold; color: #00ADD2;">${merchantNumber}</p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
              ⚠️ শুধুমাত্র "Merchant Pay" অপশনে পেমেন্ট করুন।
            </p>
          </div>
        `;
      }

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
    });
  };

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
      {/* বাম পাশের সাইডবার */}
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

      {/* মূল কন্টেন্ট */}
      <div className="flex-1 space-y-6">
        {/* উপরের স্টুডেন্ট ইনফো কার্ড */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            Name: {studentInfo.name}
          </h2>
          <p className="text-sm text-gray-600 font-semibold mt-1">
            ID: {studentInfo.roll || studentInfo.username}
          </p>
        </div>

        {/* দুই কলাম লেআউট (Step 1 & Step 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Step 1: Select Payment Amount */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#00ADD2] px-4 py-3 text-white font-bold flex items-center gap-2">
              <span>⏭</span> Step 1: Select Payment Amount
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Check Due For:
                </span>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#00ADD2]"
                >
                  <option value="Fall 2026 (Jul-Dec)">
                    Fall 2026 (Jul-Dec)
                  </option>
                  <option value="Spring 2026 (Jan-Jun)">
                    Spring 2026 (Jan-Jun)
                  </option>
                </select>
              </div>

              {/* টেবিল */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-700">
                      <th className="p-2.5 text-center border-r">#SL</th>
                      <th className="p-2.5 border-r">Particular Name</th>
                      <th className="p-2.5 border-r text-center">Dues</th>
                      <th className="p-2.5 text-center">Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeList.map((fee, index) => (
                      <tr
                        key={fee.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-2.5 text-center border-r text-gray-600">
                          {index + 1}
                        </td>
                        <td className="p-2.5 border-r text-gray-800">
                          {fee.name}
                        </td>
                        <td className="p-2.5 border-r text-center">
                          {fee.status === "Paid" ? (
                            <span className="text-green-600 font-semibold">
                              Paid ({fee.amount})
                            </span>
                          ) : (
                            <span>{fee.amount}</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {fee.status === "Paid" ? (
                            <input
                              type="checkbox"
                              disabled
                              className="cursor-not-allowed opacity-50"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={!!selectedFees[fee.id]}
                              onChange={() =>
                                handleCheckboxCourse(fee.id, fee.amount)
                              }
                              // শর্ট হ্যান্ড ফাংশন কানেক্ট করা হয়েছে
                              onClick={() =>
                                handleCheckboxChange(fee.id, fee.amount)
                              }
                              className="w-4 h-4 text-[#00ADD2] rounded focus:ring-[#00ADD2] cursor-pointer"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                className="mt-4 w-full bg-[#00ADD2] hover:bg-[#008c9e] text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                Next (for Step 2) <span>▶</span>
              </button>
            </div>
          </div>

          {/* Step 2: Online Payable Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
            <div className="bg-[#00ADD2] px-4 py-3 text-white font-bold flex items-center gap-2">
              <span>⏭</span> Step 2: Online Payable Summary
            </div>
            <div className="p-4 space-y-4">
              {/* এলার্ট নোটিশ */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-800 text-sm">
                <FaInfoCircle className="text-yellow-600 flex-shrink-0" />
                <span>
                  <strong>Attention!</strong> Please Complete Step 1.
                </span>
              </div>

              {/* পেমেন্ট মেথড সিলেকশন */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পেমেন্ট মাধ্যম নির্বাচন করুন
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "bkash", name: "bKash", icon: "💳" },
                    { id: "nagad", name: "Nagad", icon: "📱" },
                    { id: "rocket", name: "Rocket", icon: "🚀" },
                    { id: "bank", name: "Bank", icon: "🏦" },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`cursor-pointer border rounded-lg p-2.5 text-center transition ${
                        selectedMethod === m.id
                          ? "border-[#00ADD2] bg-[#e6f7f9] font-bold"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{m.icon}</span>
                      <p className="text-xs mt-1">{m.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* বিকাশ/নগদ মার্চেন্ট ইনফো */}
              {(selectedMethod === "bkash" || selectedMethod === "nagad") && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-gray-700">
                    {selectedMethod === "bkash" ? "bKash" : "Nagad"} Merchant
                    Number:
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#00ADD2]">
                      {selectedMethod === "bkash"
                        ? merchantNumbers.bkash
                        : merchantNumbers.nagad}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          selectedMethod === "bkash"
                            ? merchantNumbers.bkash
                            : merchantNumbers.nagad,
                        )
                      }
                      className="bg-[#00ADD2] text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <FaCopy size={10} /> কপি
                    </button>
                  </div>
                  <p className="text-red-600">
                    ⚠️ শুধুমাত্র "Merchant Pay" অপشن ব্যবহার করুন।
                  </p>
                </div>
              )}

              {/* ব্যাংক ইনফো */}
              {selectedMethod === "bank" && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-blue-800">
                    <FaBuilding className="inline mr-1" /> ব্যাংক তথ্য:
                  </p>
                  <p>
                    <strong>A/C Name:</strong> {bankInfo.accountName}
                  </p>
                  <p>
                    <strong>A/C Number:</strong>{" "}
                    <span className="text-[#00ADD2] font-bold">
                      {bankInfo.accountNumber}
                    </span>
                  </p>
                  <p>
                    <strong>Bank:</strong> {bankInfo.bankName} (
                    {bankInfo.branch})
                  </p>
                  <button
                    onClick={() => copyToClipboard(bankInfo.accountNumber)}
                    className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <FaCopy size={10} /> কপি অ্যাকাউন্ট নম্বর
                  </button>
                </div>
              )}

              {/* পেমেন্ট সাবমিট বাটন */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#00ADD2] hover:bg-[#008c9e] text-white py-3 rounded-lg font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "প্রসেসিং হচ্ছে..."
                ) : (
                  <>
                    <FaCheckCircle /> পেমেন্ট সম্পন্ন করুন (৳{totalAmount})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Online_payment;
