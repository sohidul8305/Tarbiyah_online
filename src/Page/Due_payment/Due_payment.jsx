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
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ Helper
// ============================================================
const getSourceLabel = (src) => {
  if (src === "basic_tazweed_students") return "Basic Tazweed";
  if (src === "najera_batch_students") return "Najera Batch";
  return "Regular Student";
};

const Due_payment = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
    status: "",
    // Payment
    courseFee: 0,
    scholarshipAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    monthlyFee: 0,
    paidMonths: [],
    admissionDate: "",
    paymentStatus: "Unpaid",
  });

  // ============================================================
  // ✅ Fetch fresh student data
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

      // ✅ Calculate paid from paidMonths if paidAmount missing
      const paidFromMonths = (merged.paidMonths || []).reduce(
        (s, p) => s + Number(p.amount || 0),
        0,
      );
      const paid = Number(merged.paidAmount) || paidFromMonths || 0;

      const fee =
        Number(merged.courseFee) || Number(merged.monthlyFee) * 12 || 0;
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
        status: merged.status || "Active",
        courseFee: fee,
        scholarshipAmount: scholarship,
        paidAmount: paid,
        dueAmount: due,
        monthlyFee: Number(merged.monthlyFee) || fee / 12 || 0,
        paidMonths: merged.paidMonths || [],
        admissionDate: merged.admissionDate || merged.createdAt || "",
        paymentStatus:
          due === 0 && paid > 0 ? "Paid" : paid > 0 ? "Partial" : "Unpaid",
      });

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

  // ============================================================
  // ✅ Financial calculations (Dynamic)
  // ============================================================
  const previousAdvance = 0.0;
  const thisSemesterBill = Number(studentInfo.courseFee) || 0;
  const thisSemesterPaid = Number(studentInfo.paidAmount) || 0;
  const thisSemesterDue = Math.max(thisSemesterBill - thisSemesterPaid, 0);

  const totalBillDebit = Number(studentInfo.courseFee) || 0;
  const totalPaidCredit = Number(studentInfo.paidAmount) || 0;
  const overAllDueOnBill = Math.max(totalBillDebit - totalPaidCredit, 0);

  // ============================================================
  // ✅ Build "All Bill" list — 12 মাসের বিল
  // ============================================================
  const monthlyFee = Number(studentInfo.monthlyFee) || 0;
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

  const allBills = MONTHS.map((m, i) => {
    const paidRecord = (studentInfo.paidMonths || []).find((p) => {
      const pm = String(p.month || "").toLowerCase();
      return pm.includes(m.toLowerCase()) || m.toLowerCase().includes(pm);
    });
    const amount = paidRecord?.amount || monthlyFee;
    return {
      id: i + 1,
      month: m,
      amount: Number(amount) || 0,
      status: paidRecord ? "Paid" : "Unpaid",
    };
  });

  // ============================================================
  // ✅ Payment history (Credit) — paidMonths
  // ============================================================
  const paymentHistory = [...(studentInfo.paidMonths || [])].sort(
    (a, b) => new Date(b.paidAt || 0) - new Date(a.paidAt || 0),
  );

  // ============================================================
  // ✅ Online payment history — filter by method
  // ============================================================
  const onlineHistory = paymentHistory.filter((p) => {
    const m = String(p.method || "").toLowerCase();
    return m === "bkash" || m === "nagad" || m === "rocket" || m === "bank";
  });

  const getStatusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Partial") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

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
      <div className="flex-1 space-y-4">
        {/* Notice Banner */}
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

        {/* Tabs Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50 px-4 pt-3 gap-2">
            {[
              { id: "summary", label: "Payment Summary" },
              { id: "allBill", label: "All Bill (Debit)" },
              { id: "paymentHistory", label: "Payment History (Credit)" },
              { id: "onlineHistory", label: "Online Payment History" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-t border-x transition ${
                  activeTab === tab.id
                    ? "bg-white text-gray-800 border-gray-300 shadow-sm -mb-px"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            {/* ============ SUMMARY ============ */}
            {activeTab === "summary" && (
              <div>
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm font-bold text-gray-700">
                      📑 Payment Summary for
                    </span>
                    <span className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-semibold text-[#00ADD2]">
                      {studentInfo.course || "2026"}
                    </span>
                  </div>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-1.5 bg-[#00ADD2] hover:bg-[#008c9e] text-white px-3 py-1.5 rounded-md text-sm font-semibold transition shadow-sm w-full sm:w-auto justify-center disabled:opacity-50"
                  >
                    <FaSync
                      className={`text-xs ${refreshing ? "animate-spin" : ""}`}
                    />{" "}
                    Refresh
                  </button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Semester Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-4 py-2.5 border-b border-gray-200 font-bold text-sm text-gray-800">
                      Payment Summary
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Previous Advance:
                        </span>
                        <span className="font-semibold text-gray-800">
                          ৳{previousAdvance.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Bill:
                        </span>
                        <span className="font-semibold text-gray-800">
                          ৳{thisSemesterBill.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Scholarship:
                        </span>
                        <span className="font-semibold text-blue-600">
                          ৳{(studentInfo.scholarshipAmount || 0).toFixed(2)}
                        </span>
                      </div>
                      <hr className="border-gray-300 my-1" />
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Paid:
                        </span>
                        <span className="font-semibold text-green-600">
                          ৳{thisSemesterPaid.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-gray-600 font-medium">
                          Total Due:
                        </span>
                        <span className="font-bold text-red-600">
                          ৳{thisSemesterDue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Overall Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-4 py-2.5 border-b border-gray-200 font-bold text-sm text-gray-800">
                      Overall Summary
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Bill (Debit):
                        </span>
                        <span className="font-semibold text-gray-800">
                          ৳{totalBillDebit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">
                          Total Paid (Credit):
                        </span>
                        <span className="font-semibold text-green-600">
                          ৳{totalPaidCredit.toFixed(2)}
                        </span>
                      </div>
                      <hr className="border-gray-300 my-1" />
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-gray-700 font-bold">
                          Overall Due:
                        </span>
                        <span
                          className={`font-bold px-3 py-1 rounded text-sm shadow-sm ${
                            overAllDueOnBill === 0
                              ? "bg-green-600 text-white"
                              : "bg-[#d9534f] text-white"
                          }`}
                        >
                          ৳{overAllDueOnBill.toFixed(2)}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Status:</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold ${getStatusColor(
                            studentInfo.paymentStatus,
                          )}`}
                        >
                          {studentInfo.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============ ALL BILL (DEBIT) ============ */}
            {activeTab === "allBill" && (
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  📋 All Bill (Debit Records)
                </h3>
                {allBills.length === 0 ? (
                  <EmptyState
                    icon={<FaFileAlt />}
                    title="No bill records found"
                    subtitle="Your bills will appear here"
                  />
                ) : (
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-xs text-gray-600 uppercase">
                          <th className="p-3 text-center border-r w-16">#SL</th>
                          <th className="p-3 text-left border-r">Particular</th>
                          <th className="p-3 text-right border-r">Amount</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allBills.map((bill, i) => (
                          <tr
                            key={bill.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3 text-center border-r text-gray-500 font-mono">
                              {String(i + 1).padStart(2, "0")}
                            </td>
                            <td className="p-3 border-r text-gray-800">
                              Tuition Fee ({bill.month})
                            </td>
                            <td className="p-3 border-r text-right font-semibold">
                              ৳{bill.amount.toFixed(2)}
                            </td>
                            <td className="p-3 text-center">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-bold ${getStatusColor(
                                  bill.status,
                                )}`}
                              >
                                {bill.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {/* Total Row */}
                        <tr className="bg-gray-100 font-bold">
                          <td colSpan={2} className="p-3 text-right border-r">
                            Total:
                          </td>
                          <td className="p-3 border-r text-right text-[#00ADD2]">
                            ৳
                            {allBills
                              .reduce((s, b) => s + b.amount, 0)
                              .toFixed(2)}
                          </td>
                          <td className="p-3 text-center text-xs text-gray-500">
                            {allBills.filter((b) => b.status === "Paid").length}
                            /{allBills.length} Paid
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============ PAYMENT HISTORY (CREDIT) ============ */}
            {activeTab === "paymentHistory" && (
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  💳 Payment History (Credit Records)
                </h3>
                {paymentHistory.length === 0 ? (
                  <EmptyState
                    icon={<FaMoneyBillWave />}
                    title="No payment history yet"
                    subtitle="Your payments will appear here once processed"
                  />
                ) : (
                  <div className="space-y-2">
                    {paymentHistory.map((p, i) => (
                      <div
                        key={p._id || i}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                            <FaCheckCircle />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {p.month || "Payment"}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {p.method || "—"}{" "}
                              {p.paidAt
                                ? `• ${new Date(p.paidAt).toLocaleDateString()}`
                                : ""}
                              {p.note ? ` • ${p.note}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">
                            +৳{Number(p.amount || 0).toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-400">Credit</p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-[#e6f7f9] border border-[#00ADD2] rounded-lg p-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Total Paid:
                      </span>
                      <span className="text-lg font-bold text-[#00ADD2]">
                        ৳{studentInfo.paidAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ ONLINE PAYMENT HISTORY ============ */}
            {activeTab === "onlineHistory" && (
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  📱 Online Payment History
                </h3>
                {onlineHistory.length === 0 ? (
                  <EmptyState
                    icon={<FaCreditCard />}
                    title="No online payments yet"
                    subtitle="bKash / Nagad / Rocket / Bank payments will appear here"
                  />
                ) : (
                  <div className="space-y-2">
                    {onlineHistory.map((p, i) => (
                      <div
                        key={p._id || i}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                            <FaCreditCard />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {p.month || "Online Payment"}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              <span className="font-bold uppercase">
                                {p.method || "—"}
                              </span>
                              {p.paidAt
                                ? ` • ${new Date(p.paidAt).toLocaleString()}`
                                : ""}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-[#00ADD2]">
                          ৳{Number(p.amount || 0).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Total Online Payments:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ৳
                        {onlineHistory
                          .reduce((s, p) => s + Number(p.amount || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Reusable
// ==========================================
const EmptyState = ({ icon, title, subtitle }) => (
  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
    <div className="text-4xl text-gray-300 flex justify-center mb-2">
      {icon}
    </div>
    <p className="font-semibold text-gray-700">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default Due_payment;
