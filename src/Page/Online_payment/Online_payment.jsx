// src/Page/Online_payment/Online_payment.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaBuilding,
  FaInfoCircle,
  FaCheckCircle,
  FaCopy,
  FaSync,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ✅ সব ১২ মাসের নাম
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ============================================================
// ✅ Helper: LoginSource অনুযায়ী সঠিক endpoint
// ============================================================
const getSourceLabel = (src) => {
  if (src === "basic_tazweed_students") return "Basic Tazweed";
  if (src === "najera_batch_students") return "Najera Batch";
  return "Regular Student";
};

const Online_payment = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [selectedFees, setSelectedFees] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);

  // ✅ Full student data (from backend)
  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    studentId: "",
    course: "",
    loginSource: "",
    // Payment fields
    monthlyFee: 0,
    courseFee: 0,
    scholarshipAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    paidMonths: [],
  });

  // ✅ Merchant Numbers — আপনার দেওয়া (unchanged)
  const merchantNumbers = {
    bkash: "01841412525",
    nagad: "01841512525",
  };

  // ✅ Bank Info — আপনার দেওয়া (unchanged)
  const bankInfo = {
    accountName: "Tarbiyah Academy",
    accountNumber: "401211100007923",
    bankName: "Shahjalal Islami Bank Limited",
    branch: "Satmasjid Road Branch",
    branchCode: "4012",
    swiftCode: "SJBLBDDHSMR",
    routingNo: "190264035",
  };

  // ============================================================
  // ✅ Fetch fresh student data from backend
  // ============================================================
  const fetchStudentData = async () => {
    try {
      const raw = localStorage.getItem("studentInfo");
      if (!raw) {
        setLoading(false);
        return;
      }

      let parsed = {};
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        setLoading(false);
        return;
      }

      const resolvedSource =
        parsed.loginSource || localStorage.getItem("loginSource") || "students";
      const studentId = parsed._id || parsed.studentId;

      let data = null;

      if (resolvedSource === "basic_tazweed_students") {
        const res = await fetch(`${API_BASE}/basic-tazweed/all`);
        const d = await res.json();
        if (d.success && Array.isArray(d.students)) {
          data = d.students.find(
            (s) => s._id === studentId || s.studentId === studentId,
          );
        }
      } else if (resolvedSource === "najera_batch_students") {
        const res = await fetch(`${API_BASE}/najera-batch/all`);
        const d = await res.json();
        if (d.success && Array.isArray(d.students)) {
          data = d.students.find(
            (s) => s._id === studentId || s.studentId === studentId,
          );
        }
      } else {
        // students collection
        if (studentId) {
          try {
            const res = await fetch(
              `${API_BASE}/students/details/${studentId}`,
            );
            const d = await res.json();
            if (d.success && d.student) data = d.student;
          } catch (e) {
            console.warn("⚠️ details API failed:", e.message);
          }
        }
      }

      const merged = data ? { ...parsed, ...data } : parsed;

      // Payment calculation
      const paid =
        Number(merged.paidAmount) ||
        (merged.paidMonths || []).reduce(
          (s, p) => s + Number(p.amount || 0),
          0,
        );
      const fee = Number(merged.courseFee) || 0;
      const scholarship = Number(merged.scholarshipAmount) || 0;
      const due =
        Number(merged.dueAmount) || Math.max(fee - scholarship - paid, 0);

      setStudentInfo({
        _id: merged._id || "",
        name: merged.name || "Student",
        email: merged.email || "",
        phone: merged.phone || "",
        class: merged.class || merged.course || "Not Assigned",
        roll: merged.roll || merged.studentId || "",
        username: merged.username || "",
        studentId: merged.studentId || "",
        course: merged.course || merged.class || "",
        loginSource: resolvedSource,
        monthlyFee: Number(merged.monthlyFee) || 0,
        courseFee: fee,
        scholarshipAmount: scholarship,
        paidAmount: paid,
        dueAmount: due,
        paidMonths: merged.paidMonths || [],
      });

      // Update localStorage
      localStorage.setItem("studentInfo", JSON.stringify(merged));
    } catch (e) {
      console.error("❌ Fetch student error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStudentData();
  };

  // ============================================================
  // ✅ Month paid কি না check
  // ============================================================
  const isMonthPaid = (monthName) => {
    const months = studentInfo.paidMonths || [];
    const monthLower = monthName.toLowerCase();
    const shortName = monthName.split(" ")[0].toLowerCase(); // "january"

    return months.find((p) => {
      const pMonth = String(p.month || "").toLowerCase();
      return (
        pMonth === monthLower ||
        pMonth.includes(shortName) ||
        pMonth.includes(monthLower) ||
        monthLower.includes(pMonth)
      );
    });
  };

  // ============================================================
  // ✅ 12 মাসের fee list
  // ============================================================
  const buildFeeList = () => {
    const monthlyFee =
      Number(studentInfo.monthlyFee) || Number(studentInfo.courseFee) || 300; // fallback

    return MONTHS.map((monthName, idx) => {
      const paidRecord = isMonthPaid(monthName);
      return {
        id: idx + 1,
        name: `Tuition Fee (${monthName})`,
        amount: paidRecord
          ? Number(paidRecord.amount) || monthlyFee
          : monthlyFee,
        status: paidRecord ? "Paid" : "Unpaid",
        paidAt: paidRecord?.paidAt || null,
        method: paidRecord?.method || null,
        monthKey: monthName,
      };
    });
  };

  const feeList = buildFeeList();

  // ============================================================
  // ✅ Total calculation
  // ============================================================
  const totalAmount = Object.values(selectedFees).reduce(
    (acc, curr) => acc + Number(curr || 0),
    0,
  );

  const handleCheckboxChange = (id, amount) => {
    setSelectedFees((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = Number(amount);
      }
      return updated;
    });
  };

  // ============================================================
  // ✅ Payment submit
  // ============================================================
  const handlePayment = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য অসম্পূর্ণ!",
        text: "অনুগ্রহ করে কমপক্ষে একটি ফি সিলেক্ট করুন।",
        confirmButtonColor: "#00ADD2",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);

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

      const selectedMonths = feeList
        .filter((f) => selectedFees[f.id])
        .map((f) => f.monthKey)
        .join(", ");

      let htmlContent = `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>👤 Student:</strong> ${studentInfo.name}</p>
          <p><strong>🆔 ID:</strong> ${studentInfo.roll || studentInfo.studentId || "N/A"}</p>
          <p><strong>💰 মোট টাকার পরিমাণ:</strong> ৳${totalAmount}</p>
          <p><strong>📅 Month(s):</strong> ${selectedMonths}</p>
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

      if (selectedMethod === "bank") {
        htmlContent += `
          <hr style="margin: 10px 0;">
          <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border: 1px solid #93c5fd;">
            <p style="font-weight: bold; color: #1e40af;">🏦 ব্যাংক তথ্য:</p>
            <p style="font-size: 12px; margin: 4px 0;"><strong>A/C Name:</strong> ${bankInfo.accountName}</p>
            <p style="font-size: 12px; margin: 4px 0;"><strong>A/C Number:</strong> <span style="color: #00ADD2; font-weight: bold;">${bankInfo.accountNumber}</span></p>
            <p style="font-size: 12px; margin: 4px 0;"><strong>Bank:</strong> ${bankInfo.bankName}</p>
            <p style="font-size: 12px; margin: 4px 0;"><strong>Branch:</strong> ${bankInfo.branch}</p>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading payment info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar — unchanged */}
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

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center relative">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="absolute top-3 right-3 text-[#00ADD2] hover:text-[#008c9e] p-1"
            title="Refresh"
          >
            <FaSync className={refreshing ? "animate-spin" : ""} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            Name: {studentInfo.name}
          </h2>
          <p className="text-sm text-gray-600 font-semibold mt-1">
            ID:{" "}
            {studentInfo.roll || studentInfo.studentId || studentInfo.username}
          </p>
          {studentInfo.loginSource && (
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-[#e6f7f9] text-[#00ADD2] font-semibold">
              🎓 {getSourceLabel(studentInfo.loginSource)}
            </span>
          )}
          {/* ✅ Dynamic Due Summary */}
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-md mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">Course Fee</p>
              <p className="text-sm font-bold text-gray-800">
                ৳{studentInfo.courseFee}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-[10px] text-green-600">Paid</p>
              <p className="text-sm font-bold text-green-700">
                ৳{studentInfo.paidAmount}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-[10px] text-red-600">Due</p>
              <p className="text-sm font-bold text-red-700">
                ৳{studentInfo.dueAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1 & Step 2 */}
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
                <span className="text-sm font-bold text-[#00ADD2]">
                  2026 (Jan - Dec)
                </span>
              </div>

              {/* 12 মাসের টেবিল */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-[480px] overflow-y-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr className="border-b border-gray-200 text-gray-700">
                      <th className="p-2.5 text-center border-r w-12">#SL</th>
                      <th className="p-2.5 border-r">Particular Name</th>
                      <th className="p-2.5 border-r text-center w-24">Dues</th>
                      <th className="p-2.5 text-center w-16">Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeList.map((fee, index) => (
                      <tr
                        key={fee.id}
                        className={`border-b border-gray-100 transition ${
                          fee.status === "Paid"
                            ? "bg-green-50/40"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-2.5 text-center border-r text-gray-600 font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="p-2.5 border-r text-gray-800">
                          <span
                            className={
                              fee.status === "Paid"
                                ? "font-semibold text-green-700"
                                : ""
                            }
                          >
                            {fee.name}
                          </span>
                        </td>
                        <td className="p-2.5 border-r text-center">
                          {fee.status === "Paid" ? (
                            <span className="text-green-600 font-semibold text-xs">
                              Paid ({fee.amount})
                            </span>
                          ) : (
                            <span className="font-semibold">{fee.amount}</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {fee.status === "Paid" ? (
                            <input
                              type="checkbox"
                              checked
                              disabled
                              className="w-4 h-4 cursor-not-allowed opacity-50"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={!!selectedFees[fee.id]}
                              onChange={() =>
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

              {/* Total Selected */}
              {totalAmount > 0 && (
                <div className="mt-3 p-3 bg-[#e6f7f9] border border-[#00ADD2] rounded-lg flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Selected Total:
                  </span>
                  <span className="text-lg font-bold text-[#00ADD2]">
                    ৳{totalAmount}
                  </span>
                </div>
              )}

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
              {/* Notice */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-800 text-sm">
                <FaInfoCircle className="text-yellow-600 flex-shrink-0" />
                <span>
                  <strong>Attention!</strong> Please Complete Step 1.
                </span>
              </div>

              {/* Payment Method */}
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

              {/* bKash/Nagad merchant info */}
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
                    ⚠️ শুধুমাত্র "Merchant Pay" অপশন ব্যবহার করুন।
                  </p>
                </div>
              )}

              {/* Bank info */}
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
                  <p>
                    <strong>Routing:</strong> {bankInfo.routingNo}
                  </p>
                  <button
                    onClick={() => copyToClipboard(bankInfo.accountNumber)}
                    className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <FaCopy size={10} /> কপি অ্যাকাউন্ট নম্বর
                  </button>
                </div>
              )}

              {/* Selected Months Preview */}
              {totalAmount > 0 && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-gray-700">Selected Months:</p>
                  <div className="flex flex-wrap gap-1">
                    {feeList
                      .filter((f) => selectedFees[f.id])
                      .map((f) => (
                        <span
                          key={f.id}
                          className="bg-[#e6f7f9] text-[#00ADD2] px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        >
                          {f.monthKey}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={processing || totalAmount <= 0}
                className="w-full bg-[#00ADD2] hover:bg-[#008c9e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                {processing ? (
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
