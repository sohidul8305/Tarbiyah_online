import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // ⬅️ এটাই দরকার
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

// ✅ Source label helper
const getSourceLabel = (src) => {
  if (src === "basic_tazweed_students") return "Basic Tazweed";
  if (src === "najera_batch_students") return "Najera Batch";
  if (src === "batch_students") return "Batch Student";
  return "Regular Student";
};

const Online_payment = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [payAmount, setPayAmount] = useState("");
  const [payMonth, setPayMonth] = useState(
    new Date().toISOString().slice(0, 7), // YYYY-MM
  );
  const [payNote, setPayNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);

  // ✅ Full student data
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
    monthlyFee: 0,
    courseFee: 0,
    scholarshipAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    paidMonths: [],
  });

  // ✅ Merchant Numbers
  const merchantNumbers = {
    bkash: "01841412525",
    nagad: "01841512525",
  };

  // ✅ Bank Info
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
  // ✅ Fetch fresh student data — Dashboard এর same logic
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

      // ✅ Multi-identifier params
      const params = new URLSearchParams();
      if (parsed._id) params.append("id", parsed._id);
      if (parsed.studentId) params.append("studentId", parsed.studentId);
      if (parsed.phone) params.append("phone", parsed.phone);
      if (parsed.name && parsed.name !== "Student")
        params.append("name", parsed.name);
      if (parsed.username) params.append("username", parsed.username);

      let data = null;
      let finalSource = resolvedSource;

      // ✅ STEP 1: dashboard-full endpoint
      try {
        const res = await fetch(
          `${API_BASE}/student/dashboard-full?${params.toString()}`,
        );
        const d = await res.json();
        if (d.success && d.student) {
          data = d.student;
          finalSource = d.source || resolvedSource;
        }
      } catch (e) {
        console.warn("⚠️ dashboard-full failed:", e.message);
      }

      // ✅ STEP 2: Fallback
      if (!data) {
        if (resolvedSource === "basic_tazweed_students") {
          const res = await fetch(`${API_BASE}/basic-tazweed/all`);
          const d = await res.json();
          if (d.success && Array.isArray(d.students)) {
            data = d.students.find(
              (s) => s._id === parsed._id || s.studentId === parsed.studentId,
            );
          }
        } else if (resolvedSource === "najera_batch_students") {
          const res = await fetch(`${API_BASE}/najera-batch/all`);
          const d = await res.json();
          if (d.success && Array.isArray(d.students)) {
            data = d.students.find(
              (s) => s._id === parsed._id || s.studentId === parsed.studentId,
            );
          }
        } else if (parsed._id) {
          try {
            const res = await fetch(
              `${API_BASE}/students/details/${parsed._id}`,
            );
            const d = await res.json();
            if (d.success && d.student) data = d.student;
          } catch (e) {}
        }
      }

      const merged = data ? { ...parsed, ...data } : parsed;

      // Payment calculation
      const fromMonths = (merged.paidMonths || []).reduce(
        (s, p) => s + Number(p.amount || 0),
        0,
      );
      const paid = fromMonths > 0 ? fromMonths : Number(merged.paidAmount) || 0;
      const fee = Number(merged.courseFee) || Number(merged.monthlyFee) || 0;
      const scholarship = Number(merged.scholarshipAmount) || 0;
      const due =
        merged.dueAmount !== undefined && merged.dueAmount !== null
          ? Number(merged.dueAmount)
          : Math.max(fee - scholarship - paid, 0);

      setStudentInfo({
        _id: merged._id || "",
        name: merged.name || "Student",
        email: merged.email || "",
        phone: merged.phone || "",
        class: merged.batchCourse || merged.class || merged.course || "N/A",
        roll: merged.roll || merged.studentId || "",
        username: merged.username || "",
        studentId: merged.studentId || "",
        course: merged.batchCourse || merged.course || merged.class || "",
        loginSource: finalSource,
        monthlyFee: Number(merged.monthlyFee) || 0,
        courseFee: fee,
        scholarshipAmount: scholarship,
        paidAmount: paid,
        dueAmount: due,
        paidMonths: merged.paidMonths || [],
      });

      // Update localStorage with identifiers
      const stored = {
        _id: merged._id,
        name: merged.name,
        studentId: merged.studentId || "",
        phone: merged.phone || "",
        username: merged.username || "",
        course: merged.batchCourse || merged.course || merged.class || "",
        class: merged.batchCourse || merged.class || merged.course || "",
        batchName: merged.batchName || "",
        batchCourse: merged.batchCourse || "",
        loginSource: finalSource,
      };
      localStorage.setItem("studentInfo", JSON.stringify(stored));
      localStorage.setItem("loginSource", finalSource);
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
  // ✅ Submit Payment — save to backend + auto update
  // ============================================================
  const handlePayment = async (e) => {
    e.preventDefault();

    const amountNum = Number(payAmount);

    if (!amountNum || amountNum <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Amount দিন!",
        text: "অনুগ্রহ করে সঠিক পরিমাণ লিখুন (0 এর বেশি)",
        confirmButtonColor: "#00ADD2",
      });
      return;
    }

    // ✅ Due এর বেশি হলে warning (optional)
    if (studentInfo.dueAmount > 0 && amountNum > studentInfo.dueAmount) {
      const confirm = await Swal.fire({
        icon: "question",
        title: "Due এর বেশি?",
        text: `আপনার Due ৳${studentInfo.dueAmount}। আপনি ৳${amountNum} দিচ্ছেন। চালিয়ে যাবেন?`,
        showCancelButton: true,
        confirmButtonText: "হ্যাঁ",
        cancelButtonText: "না",
        confirmButtonColor: "#00ADD2",
      });
      if (!confirm.isConfirmed) return;
    }

    setProcessing(true);

    try {
      // ✅ Save payment to backend
      const res = await fetch(`${API_BASE}/batch-students/add-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: studentInfo._id,
          studentId: studentInfo.studentId,
          phone: studentInfo.phone,
          name: studentInfo.name,
          amount: amountNum,
          method: selectedMethod,
          note: payNote || "",
          month: payMonth,
        }),
      });

      const data = await res.json();
      console.log("📥 Payment response:", data);

      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Payment failed",
          confirmButtonColor: "#00ADD2",
        });
        setProcessing(false);
        return;
      }

      // ✅ Success — show confirmation with merchant info
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
          <p><strong>👤 Student:</strong> ${studentInfo.name}</p>
          <p><strong>🆔 ID:</strong> ${studentInfo.studentId || studentInfo.roll || "N/A"}</p>
          <p><strong>💰 পরিমাণ:</strong> ৳${amountNum}</p>
          <p><strong>📅 Month:</strong> ${payMonth}</p>
          <p><strong>📱 Method:</strong> ${methodName}</p>
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
          </div>
        `;
      }

      htmlContent += `</div>`;

      await Swal.fire({
        icon: "success",
        title: "✅ পেমেন্ট সফল!",
        html: htmlContent,
        confirmButtonColor: "#00ADD2",
        confirmButtonText: "ঠিক আছে",
        width: 500,
      });

      // ✅ Reset form
      setPayAmount("");
      setPayNote("");

      // ✅ Refetch fresh data (auto update UI)
      await fetchStudentData();

      Swal.fire({
        icon: "info",
        title: "Updated!",
        text: "আপনার payment auto update হয়েছে। Dashboard এ গিয়ে check করুন।",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("❌ Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message,
        confirmButtonColor: "#00ADD2",
      });
    } finally {
      setProcessing(false);
    }
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
      {/* Sidebar */}
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

      {/* Main */}
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
            ID: {studentInfo.studentId || studentInfo.roll || "N/A"}
          </p>
          {studentInfo.loginSource && (
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-[#e6f7f9] text-[#00ADD2] font-semibold">
              🎓 {getSourceLabel(studentInfo.loginSource)}
            </span>
          )}

          {/* Due Summary */}
          <div className="mt-4 grid grid-cols-4 gap-2 max-w-2xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">Course Fee</p>
              <p className="text-sm font-bold text-gray-800">
                ৳{studentInfo.courseFee}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <p className="text-[10px] text-blue-600">Scholarship</p>
              <p className="text-sm font-bold text-blue-700">
                ৳{studentInfo.scholarshipAmount}
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

        {/* Payment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Amount Input */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#00ADD2] px-4 py-3 text-white font-bold flex items-center gap-2">
              <span>💰</span> Payment Details
            </div>
            <form onSubmit={handlePayment} className="p-4 space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  পরিমাণ (৳) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-bold">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="যেমন: 500"
                    className="w-full pl-8 pr-3 py-3 text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-[#00ADD2] focus:ring-2 focus:ring-[#00ADD2]/20 outline-none"
                    required
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  আপনি কত টাকা দিতে চান সেটা লিখুন
                </p>

                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[300, 500, 1000, 1500, 2000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPayAmount(String(amt))}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-[#e6f7f9] hover:text-[#00ADD2] border border-gray-200 rounded-full font-semibold transition"
                    >
                      ৳{amt}
                    </button>
                  ))}
                  {studentInfo.dueAmount > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setPayAmount(String(studentInfo.dueAmount))
                      }
                      className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-full font-semibold transition"
                    >
                      Full Due ৳{studentInfo.dueAmount}
                    </button>
                  )}
                </div>
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  মাস (Month)
                </label>
                <input
                  type="month"
                  value={payMonth}
                  onChange={(e) => setPayMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#00ADD2] outline-none"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="যেমন: January fees"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#00ADD2] outline-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  পেমেন্ট মাধ্যম
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

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#00ADD2] hover:bg-[#008c9e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <FaSync className="animate-spin" /> প্রসেসিং হচ্ছে...
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> পেমেন্ট সম্পন্ন করুন
                    {payAmount ? ` (৳${payAmount})` : ""}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Merchant Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
            <div className="bg-[#00ADD2] px-4 py-3 text-white font-bold flex items-center gap-2">
              <FaInfoCircle /> Payment Information
            </div>
            <div className="p-4 space-y-4">
              {/* Notice */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2 text-yellow-800 text-sm">
                <FaInfoCircle className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>নির্দেশনা:</strong> নিচের নাম্বার/অ্যাকাউন্টে টাকা
                  পাঠিয়ে উপরের form পূরণ করে submit করুন। টাকা পাঠানোর পর
                  payment auto save হবে।
                </span>
              </div>

              {/* bKash / Nagad */}
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
                      type="button"
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

              {/* Bank */}
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
                    type="button"
                    onClick={() => copyToClipboard(bankInfo.accountNumber)}
                    className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <FaCopy size={10} /> কপি অ্যাকাউন্ট নম্বর
                  </button>
                </div>
              )}

              {/* Summary Preview */}
              {payAmount && Number(payAmount) > 0 && (
                <div className="p-3 bg-[#e6f7f9] border border-[#00ADD2] rounded-lg">
                  <p className="font-bold text-[#00ADD2] text-sm mb-2">
                    📋 Payment Summary
                  </p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p className="flex justify-between">
                      <span>Amount:</span>
                      <strong>৳{payAmount}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Month:</span>
                      <strong>{payMonth}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Method:</span>
                      <strong className="capitalize">{selectedMethod}</strong>
                    </p>
                    <div className="border-t pt-1 mt-1 flex justify-between">
                      <span>Current Paid:</span>
                      <strong className="text-green-600">
                        ৳{studentInfo.paidAmount}
                      </strong>
                    </div>
                    <p className="flex justify-between">
                      <span>New Total After Pay:</span>
                      <strong className="text-[#00ADD2]">
                        ৳{studentInfo.paidAmount + Number(payAmount || 0)}
                      </strong>
                    </p>
                    <p className="flex justify-between">
                      <span>New Due:</span>
                      <strong className="text-red-600">
                        ৳
                        {Math.max(
                          studentInfo.dueAmount - Number(payAmount || 0),
                          0,
                        )}
                      </strong>
                    </p>
                  </div>
                </div>
              )}

              {/* Payment History */}
              {studentInfo.paidMonths && studentInfo.paidMonths.length > 0 && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-bold text-gray-700 text-sm mb-2">
                    📜 Recent Payments
                  </p>
                  <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
                    {[...studentInfo.paidMonths]
                      .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
                      .slice(0, 5)
                      .map((p, i) => (
                        <div
                          key={p._id || i}
                          className="flex justify-between items-center text-xs bg-white border border-gray-200 rounded px-2 py-1.5"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {p.month || "Payment"}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {p.method} •{" "}
                              {p.paidAt
                                ? new Date(p.paidAt).toLocaleDateString()
                                : ""}
                            </p>
                          </div>
                          <span className="font-bold text-green-600">
                            ৳{p.amount}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Online_payment;
