// src/Page/Student/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaDollarSign,
  FaPaperPlane,
  FaGraduationCap,
  FaInfoCircle,
  FaExpand,
  FaMinus,
  FaEdit,
  FaPrint,
  FaSync,
  FaExchangeAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import SupportChatWidget from "./SupportChatWidget";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ✅ Source label helper
const getSourceLabel = (src) => {
  if (src === "basic_tazweed_students") return "Basic Tazweed";
  if (src === "najera_batch_students") return "Najera Batch";
  if (src === "batch_students") return "Batch Student";
  return "Regular Student";
};

// ✅ Source badge color helper
const getSourceColor = (src) => {
  if (src === "basic_tazweed_students") return "bg-green-100 text-green-700";
  if (src === "najera_batch_students") return "bg-purple-100 text-purple-700";
  if (src === "batch_students") return "bg-indigo-100 text-indigo-700";
  return "bg-blue-100 text-blue-700";
};

const StudentDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    studentId: "",
    status: "",
    admissionDate: "",
    course: "",
    enrolledCourses: [],
    paymentStatus: "",
    paymentMethod: "",
    transactionId: "",
    paidAmount: 0,
    dueAmount: 0,
    courseFee: 0,
    scholarshipAmount: 0,
    monthlyFee: 0,
    country: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    paidMonths: [],
    batchName: "",
    batchTeacher: "",
    batchCourse: "",
    batchSchedule: "",
    batchClasses: [],
    loginSource: "",
    source: "",
    sourceLabel: "",
  });

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (!isLoggedIn) {
      navigate("/student-login");
      return;
    }

    const raw = localStorage.getItem("studentInfo");
    if (!raw) {
      navigate("/student-login");
      return;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      navigate("/student-login");
      return;
    }

    const resolvedSource =
      parsed.loginSource || localStorage.getItem("loginSource") || "students";

    setStudentInfo((prev) => ({
      ...prev,
      ...parsed,
      name: parsed.name || "",
      roll: parsed.roll || "",
      course:
        parsed.course || parsed.class || parsed.subject || parsed.program || "",
      class:
        parsed.class || parsed.course || parsed.subject || parsed.program || "",
      loginSource: resolvedSource,
      source: resolvedSource,
      sourceLabel: getSourceLabel(resolvedSource),
    }));

    const primaryKey = parsed._id || parsed.studentId || parsed.phone;
    if (primaryKey) {
      fetchFullStudentData(primaryKey, resolvedSource);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFullStudentData = async (studentId, loginSource) => {
    try {
      const resolvedSource =
        loginSource || localStorage.getItem("loginSource") || "students";

      const raw = localStorage.getItem("studentInfo");
      const parsed = raw ? JSON.parse(raw) : {};

      const params = new URLSearchParams();
      if (parsed._id) params.append("id", parsed._id);
      if (studentId && studentId !== parsed._id)
        params.append("studentId", studentId);
      if (parsed.studentId) params.append("studentId", parsed.studentId);
      if (parsed.phone) params.append("phone", parsed.phone);
      if (parsed.name && parsed.name !== "Student")
        params.append("name", parsed.name);
      if (parsed.username) params.append("username", parsed.username);

      console.log("📥 Fetching dashboard-full:", params.toString());

      const url = `${API_BASE}/student/dashboard-full?${params.toString()}`;
      const res = await fetch(url);
      const d = await res.json();
      console.log("📥 Response:", d);

      if (d.success && d.student) {
        const data = d.student;

        if (data.password) {
          delete data.password;
        }

        const finalSource = d.source || resolvedSource;
        console.log(`✅ Found in ${finalSource}:`, data.name);

        const fee = Number(data.courseFee) || Number(data.monthlyFee) || 0;
        const scholarship = Number(data.scholarshipAmount) || 0;
        const fromMonths = (data.paidMonths || []).reduce(
          (sum, p) => sum + Number(p.amount || 0),
          0,
        );
        const paid = fromMonths > 0 ? fromMonths : Number(data.paidAmount) || 0;
        const due =
          data.dueAmount !== undefined && data.dueAmount !== null
            ? Number(data.dueAmount)
            : Math.max(fee - scholarship - paid, 0);

        let autoStatus = data.paymentStatus;
        if (!autoStatus) {
          if (due === 0 && paid > 0) autoStatus = "Paid";
          else if (paid > 0) autoStatus = "Partial";
          else autoStatus = "Unpaid";
        }

        setStudentInfo((prev) => ({
          ...prev,
          ...data,
          _id: data._id || prev._id,
          name: data.name || prev.name || "",
          roll: data.roll || prev.roll || "",
          username: data.username || prev.username || "",
          studentId: data.studentId || prev.studentId || "",
          course:
            data.batchCourse || data.course || data.class || prev.course || "",
          class:
            data.batchCourse || data.class || data.course || prev.class || "",
          batchName: data.batchName || prev.batchName || "",
          batchTeacher: data.batchTeacher || prev.batchTeacher || "",
          batchCourse: data.batchCourse || prev.batchCourse || "",
          batchSchedule: data.batchSchedule || prev.batchSchedule || "",
          batchClasses: data.batchClasses || prev.batchClasses || [],
          email: data.email || prev.email || "",
          phone: data.phone || prev.phone || "",
          gender: data.gender || prev.gender || "",
          country: data.country || prev.country || "BD",
          admissionDate:
            data.admissionDate || data.createdAt || prev.admissionDate || "",
          status: data.status || "Active",
          paymentStatus: autoStatus || "Unpaid",
          paymentMethod: data.paymentMethod || "",
          transactionId: data.transactionId || "",
          paidAmount: paid,
          dueAmount: due,
          courseFee: fee,
          scholarshipAmount: scholarship,
          monthlyFee: Number(data.monthlyFee) || fee,
          paidMonths: data.paidMonths || [],
          loginSource: finalSource,
          source: finalSource,
          sourceLabel: getSourceLabel(finalSource),
        }));

        const stored = {
          _id: data._id,
          name: data.name,
          studentId: data.studentId || "",
          phone: data.phone || "",
          username: data.username || "",
          course: data.batchCourse || data.course || data.class || "",
          class: data.batchCourse || data.class || data.course || "",
          batchName: data.batchName || "",
          batchCourse: data.batchCourse || "",
          loginSource: finalSource,
        };
        localStorage.setItem("studentInfo", JSON.stringify(stored));
        localStorage.setItem("loginSource", finalSource);
      } else {
        console.warn("⚠️ Student not found:", d.message);
      }

      await fetchEnrolledCourses(studentId, resolvedSource);
    } catch (e) {
      console.error("❌ Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async (studentId, loginSource) => {
    try {
      setLoadingCourses(true);
      let loadedCourses = [];

      try {
        const res = await fetch(`${API_BASE}/students/my-courses/${studentId}`);
        const d = await res.json();
        console.log("📚 my-courses API response:", d);

        if (d.success && Array.isArray(d.courses) && d.courses.length > 0) {
          loadedCourses = d.courses;
          console.log(`✅ Loaded ${d.courses.length} courses from API`);
        }
      } catch (e) {
        console.warn("⚠️ my-courses API failed:", e.message);
      }

      if (loadedCourses.length === 0) {
        const raw = localStorage.getItem("studentInfo");
        if (raw) {
          const parsed = JSON.parse(raw);

          if (
            Array.isArray(parsed.enrolledCourses) &&
            parsed.enrolledCourses.length > 0
          ) {
            loadedCourses = parsed.enrolledCourses;
          } else {
            const courseString =
              parsed.batchCourse ||
              parsed.course ||
              parsed.class ||
              parsed.subject ||
              parsed.program ||
              "";
            if (courseString) {
              const courseNames = String(courseString)
                .split(/[,\n]/)
                .map((s) => s.trim())
                .filter(Boolean);

              loadedCourses = courseNames.map((name, i) => ({
                _id: `fallback_${i}_${Date.now()}`,
                code: name
                  .substring(0, 8)
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, ""),
                title: name,
                className: name,
                section: "",
                teacher: "",
                duration: "",
              }));
              console.log(
                `✅ Fallback: ${loadedCourses.length} courses from course string`,
              );
            }
          }
        }
      }

      setCourses(loadedCourses);
    } catch (e) {
      console.error("❌ Fetch courses error:", e);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");
      localStorage.removeItem("studentUsername");
      localStorage.removeItem("loginSource");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentId");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
      label: "Regular Exam Result",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Student Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {studentInfo.name?.charAt(0) || "S"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{studentInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {studentInfo.course || studentInfo.class}
                </p>
                {studentInfo.sourceLabel && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-semibold">
                    {studentInfo.sourceLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      activeMenu === item.id
                        ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>Tarbiyah Online Madrasha</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <button
                title="Edit Profile"
                onClick={() => navigate("/student-profile")}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaEdit />
              </button>
              <button
                title="Print"
                onClick={() => window.print()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaPrint />
              </button>
              <button
                title="Fullscreen"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    }
                  }
                }}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaExpand />
              </button>
              <button
                title="Refresh"
                onClick={() => window.location.reload()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaSync />
              </button>
              <button
                title="Switch"
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaExchangeAlt />
              </button>
            </div>
          </div>

          <Outlet />

          {activeMenu === "dashboard" && (
            <DashboardContent
              studentInfo={studentInfo}
              courses={courses}
              loadingCourses={loadingCourses}
              onRefresh={() =>
                fetchFullStudentData(
                  studentInfo._id || studentInfo.studentId,
                  studentInfo.loginSource,
                )
              }
            />
          )}
        </main>
      </div>

      {/* ✅ Support Chat Widget — Floating Button */}
      <SupportChatWidget />
    </div>
  );
};

// ==========================================
// Dashboard Content
// ==========================================
const DashboardContent = ({
  studentInfo,
  courses,
  loadingCourses,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const [paymentTab, setPaymentTab] = useState("summary");

  const totalBill = Number(studentInfo.courseFee) || 0;
  const totalPaid = Number(studentInfo.paidAmount) || 0;
  const totalDue = Number(studentInfo.dueAmount) || 0;

  const courseDisplayValue =
    studentInfo.course || studentInfo.batchCourse || studentInfo.class || "N/A";

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <div className="bg-[#6b2158] text-white p-3 rounded-sm shadow-sm text-sm flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p>
            Assalamu alaikum wa rahmatullahi wa barakatuh. Ahlan wa Sahlan WA
            Masa'al Khair!{" "}
            <strong>
              {studentInfo.name || "Student"}{" "}
              {studentInfo.studentId ? `[${studentInfo.studentId}]` : ""}
            </strong>
          </p>
          {studentInfo.batchName && (
            <p className="text-[11px] opacity-80 mt-0.5">
              📚 Batch: <strong>{studentInfo.batchName}</strong>
              {studentInfo.batchTeacher && (
                <> • 👨‍🏫 {studentInfo.batchTeacher}</>
              )}
            </p>
          )}
        </div>
        {studentInfo.sourceLabel && (
          <span className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-white/20 font-bold">
            🎓 {studentInfo.sourceLabel}
          </span>
        )}
      </div>

      {/* Important Links */}
      <div className="border border-[#00ADD2] bg-white rounded-sm shadow-sm">
        <div className="bg-[#00ADD2] text-white px-3 py-2 flex justify-between items-center rounded-t-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FaInfoCircle /> Important Links
          </div>
          <div className="flex gap-3 text-xs">
            <button className="hover:opacity-80">
              <FaExpand />
            </button>
            <button className="hover:opacity-80">
              <FaMinus />
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#f8f9fa]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#78b866] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Check Due & <br /> Payments
                </h3>
              </div>
              <FaDollarSign className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/due-payment"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                View ➔
              </Link>
            </div>

            <div className="bg-[#8c1c44] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Semester <br /> Result
                </h3>
              </div>
              <FaFileAlt className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/student-result"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                View ➔
              </Link>
            </div>

            <div className="bg-[#00a65a] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Online <br /> Registration
                </h3>
              </div>
              <FaPaperPlane className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/student-registration"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                Apply Online ➔
              </Link>
            </div>

            <div className="bg-[#0073b7] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Monthly Online <br /> Payment
                </h3>
              </div>
              <FaDollarSign className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/online-payment"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                Payment ➔
              </Link>
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#f39c12] text-white text-xs p-2 rounded-sm leading-relaxed mt-2">
              আপনার পোর্টাল এবং ক্যাম্পাসের পাসওয়ার্ড যদি একই থাকে সে ক্ষেত্রে
              আপনি সরাসরি ক্যাম্পাসে লগইন হয়ে যেতে পারবেন, অন্যথায় আপনাকে
              ক্যাম্পাসে পাসওয়ার্ড দিয়ে লগইন করতে হবে।
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#00a65a] text-white rounded-sm relative flex flex-col justify-between h-[100px] mt-2 hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg mb-1">Campus</h3>
                {(studentInfo.dueAmount || 0) > 0 ? (
                  <button
                    onClick={() =>
                      Swal.fire({
                        icon: "warning",
                        title: "🚫 Due বাকি আছে!",
                        html: `
              <p>আপনার বকেয়া <strong>৳${studentInfo.dueAmount}</strong></p>
              <p style="font-size: 13px; color: #666; margin-top: 8px;">
                Campus-এ প্রবেশের আগে payment সম্পূর্ণ করুন।
              </p>
            `,
                        confirmButtonText: "Payment করব",
                        confirmButtonColor: "#00ADD2",
                        showCancelButton: true,
                        cancelButtonText: "পরে",
                      }).then((r) => {
                        if (r.isConfirmed) navigate("/online-payment");
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-sm transition-colors border border-transparent cursor-not-allowed opacity-90"
                  >
                    🔒 Due বাকি — Locked
                  </button>
                ) : (
                  <Link to="/campus-login">
                    <button className="bg-[#008c9e] hover:bg-[#006b7a] text-white text-xs px-3 py-1 rounded shadow-sm transition-colors border border-transparent">
                      Login to Campus
                    </button>
                  </Link>
                )}
              </div>
              <FaGraduationCap className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />

              {(studentInfo.dueAmount || 0) > 0 ? (
                <div className="bg-red-700/40 py-1 text-center text-[10px] w-full mt-auto z-10 cursor-not-allowed">
                  🔒 Payment Pending
                </div>
              ) : (
                <Link
                  to="/campus-login"
                  className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
                >
                  Go to Campus ➔
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registered Courses */}
      <div className="border border-[#00ADD2] bg-white rounded-sm shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-2 p-2 border-b border-[#00ADD2] text-sm bg-[#f4f6f9] font-medium text-gray-700">
          <FaFileAlt className="text-[#00ADD2]" /> Registered Courses of
          <span className="border border-[#00ADD2] rounded px-2 py-0.5 text-xs bg-white font-bold text-[#00ADD2]">
            {courseDisplayValue}
          </span>
          {studentInfo.sourceLabel && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getSourceColor(
                studentInfo.source,
              )}`}
            >
              🎓 {studentInfo.sourceLabel}
            </span>
          )}
          <button
            onClick={onRefresh}
            className="ml-auto text-[#00ADD2] hover:text-[#008c9e] text-xs flex items-center gap-1"
          >
            <FaSync size={10} /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold w-12 border-r border-gray-200 text-center">
                  Ser
                </th>
                <th className="px-4 py-2 font-semibold">Title</th>
              </tr>
            </thead>
            <tbody>
              {loadingCourses ? (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ADD2] mx-auto"></div>
                    <p className="mt-2 text-xs">Loading courses...</p>
                  </td>
                </tr>
              ) : (
                (courses.length > 0
                  ? courses
                  : [
                      {
                        _id: "fallback_0",
                        code: studentInfo.studentId || "CRS-001",
                        title:
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A",
                        className:
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A",
                      },
                    ]
                ).map((course, index) => (
                  <tr
                    key={course._id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 align-top border-r border-gray-200 text-center font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-[#00ADD2]">
                        {course.title ||
                          course.className ||
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A"}
                      </p>

                      {studentInfo.batchName && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          📚 Batch:{" "}
                          <span className="font-semibold text-gray-700">
                            {studentInfo.batchName}
                          </span>
                        </p>
                      )}

                      {studentInfo.batchTeacher && (
                        <p className="text-[10px] text-purple-600 mt-0.5">
                          👨‍🏫 Teacher:{" "}
                          <span className="font-semibold">
                            {studentInfo.batchTeacher}
                          </span>
                        </p>
                      )}

                      {studentInfo.batchSchedule && (
                        <p className="text-[10px] text-blue-600 mt-0.5">
                          ⏰ Schedule:{" "}
                          <span className="font-semibold">
                            {studentInfo.batchSchedule}
                          </span>
                        </p>
                      )}

                      <div className="text-[11px] text-[#00ADD2] flex gap-2 mt-1">
                        <Link
                          to={`/student-attendance/${course.code || course._id}`}
                          className="hover:underline"
                        >
                          [Attendances]
                        </Link>
                        <Link
                          to={`/course-notices/${course.code || course._id}`}
                          className="hover:underline"
                        >
                          [Course Notices]
                        </Link>
                      </div>

                      <p className="text-xs text-gray-500 italic mt-1 font-serif">
                        {studentInfo.batchSchedule ||
                          studentInfo.class ||
                          "Fall 2026"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentSection
        paymentTab={paymentTab}
        setPaymentTab={setPaymentTab}
        studentInfo={studentInfo}
        totalBill={totalBill}
        totalPaid={totalPaid}
        totalDue={totalDue}
      />
    </div>
  );
};

// ==========================================
// Payment Section
// ==========================================
const PaymentSection = ({
  paymentTab,
  setPaymentTab,
  studentInfo,
  totalBill,
  totalPaid,
  totalDue,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4 text-sm">
        {[
          { id: "summary", label: "Payment Summary" },
          { id: "all-bill", label: "All Bill (Debit)" },
          { id: "history", label: "Payment History (Credit)" },
          { id: "online-history", label: "Online Payment History" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPaymentTab(tab.id)}
            className={`px-4 py-1.5 rounded border transition-all ${
              paymentTab === tab.id
                ? "bg-gray-100 font-bold border-[#00ADD2] text-[#00ADD2]"
                : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {paymentTab === "summary" && (
        <PaymentSummary
          totalBill={totalBill}
          totalPaid={totalPaid}
          totalDue={totalDue}
          studentInfo={studentInfo}
        />
      )}
      {paymentTab === "all-bill" && <AllBill studentInfo={studentInfo} />}
      {paymentTab === "history" && <PaymentHistory studentInfo={studentInfo} />}
      {paymentTab === "online-history" && (
        <OnlinePaymentHistory studentInfo={studentInfo} />
      )}
    </div>
  );
};

const PaymentSummary = ({ totalBill, totalPaid, totalDue, studentInfo }) => {
  const bill = Number(totalBill) || 0;
  const paid = Number(totalPaid) || 0;
  const due = Number(totalDue) || 0;
  const scholarship = Number(studentInfo.scholarshipAmount) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-[#00ADD2] text-white px-4 py-2 border-b border-gray-300 font-bold text-sm flex items-center gap-2">
          <span>📊</span> Payment Summary
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Course Fee:</span>
            <span className="font-semibold">{bill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Scholarship:</span>
            <span className="font-semibold text-blue-600">
              {scholarship.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-black my-1"></div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Paid:</span>
            <span className="font-semibold text-green-600">
              {paid.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-base font-bold text-gray-900">
            <span>Total Due:</span>
            <span className="text-red-600">{due.toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2 border-t pt-2">
            <p>Payment Method: {studentInfo.paymentMethod || "N/A"}</p>
            <p>Transaction ID: {studentInfo.transactionId || "N/A"}</p>
            <p>
              Status:{" "}
              <span
                className={
                  studentInfo.paymentStatus === "Paid"
                    ? "text-green-600 font-bold"
                    : studentInfo.paymentStatus === "Partial"
                      ? "text-yellow-600 font-bold"
                      : "text-red-600 font-bold"
                }
              >
                {studentInfo.paymentStatus || "Unpaid"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-[#00ADD2] text-white px-4 py-2 border-b border-gray-300 font-bold text-sm flex items-center gap-2">
          <span>📈</span> Overall Summary
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Bill:</span>
            <span className="font-semibold">{bill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Paid:</span>
            <span className="font-semibold text-green-600">
              {paid.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-black my-1"></div>
          <div className="flex justify-between items-center py-2 bg-gray-50 px-2 rounded">
            <span className="font-bold text-gray-900">Overall Due:</span>
            <span className="bg-red-600 text-white font-bold px-3 py-1 rounded text-sm shadow">
              {due.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllBill = ({ studentInfo }) => {
  const bill = Number(studentInfo.courseFee) || 0;
  const status = studentInfo.paymentStatus || "Unpaid";

  return (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
      <p className="font-bold text-gray-800 mb-4">All Semester Bills:</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-white rounded border">
          <span>Course Fee</span>
          <span className="font-bold text-red-600">{bill.toFixed(2)} BDT</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              status === "Paid"
                ? "bg-green-100 text-green-700"
                : status === "Partial"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

const PaymentHistory = ({ studentInfo }) => {
  const paid = Number(studentInfo.paidAmount) || 0;
  const paidMonths = studentInfo.paidMonths || [];

  return (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
      <p className="font-bold text-gray-800 mb-2">Payment History (Credit):</p>
      {paidMonths.length > 0 ? (
        <div className="space-y-2">
          {paidMonths.map((p, i) => (
            <div
              key={p._id || i}
              className="flex justify-between items-center p-2 bg-white rounded border"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800">
                  {p.month || "Payment"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {p.method || ""}{" "}
                  {p.paidAt
                    ? `• ${new Date(p.paidAt).toLocaleDateString()}`
                    : ""}
                </p>
              </div>
              <span className="font-bold text-green-600">
                ৳{Number(p.amount || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      ) : paid > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-white rounded border">
            <span>Payment</span>
            <span className="font-bold text-green-600">৳{paid.toFixed(2)}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              Paid
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No payment records found yet.</p>
      )}
      <div className="mt-4 text-xs text-gray-400">
        <p>📌 Total Paid: ৳{paid.toFixed(2)}</p>
      </div>
    </div>
  );
};

const OnlinePaymentHistory = ({ studentInfo }) => {
  const due = Number(studentInfo.dueAmount) || 0;

  return (
    <div className="p-4 text-sm bg-teal-50 rounded-lg border border-teal-100 text-center space-y-4">
      <p className="font-bold text-teal-900 text-base">
        Make Online Payment via bKash / SSLCommerz
      </p>
      <p className="text-gray-600 text-sm">
        আপনার বকেয়া{" "}
        <span className="font-bold text-red-600">
          {due > 0 ? `${due.toFixed(2)} টাকা` : "০.০০ টাকা"}
        </span>{" "}
        অনলাইনে পরিশোধ করতে নিচের বাটনে ক্লিক করুন।
      </p>
      <button
        onClick={() => {
          if (due <= 0) {
            Swal.fire("Info", "আপনার কোনো বকেয়া নেই!", "info");
            return;
          }
          Swal.fire({
            title: "Payment Gateway",
            text: "Connecting to bKash Gateway...",
            icon: "info",
            confirmButtonColor: "#00ADD2",
          });
        }}
        className="bg-[#00ADD2] hover:bg-[#008c9e] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg transition-all"
      >
        Pay {due > 0 ? due.toFixed(2) : "0.00"} BDT Now
      </button>
    </div>
  );
};

export default StudentDashboard;
