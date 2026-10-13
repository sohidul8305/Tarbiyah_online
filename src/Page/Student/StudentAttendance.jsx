// src/Page/Student/StudentAttendance.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaGraduationCap,
  FaPrint,
  FaSync,
  FaExpand,
  FaArrowLeft,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

const StudentAttendance = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("attendance");
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem("studentInfo");
    if (raw) {
      try {
        setStudentInfo(JSON.parse(raw));
      } catch (e) {}
    }

    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (!isLoggedIn) {
      navigate("/student-login");
      return;
    }

    fetchAttendance();
    // eslint-disable-next-line
  }, [identifier]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const raw = localStorage.getItem("studentInfo");
      const parsed = raw ? JSON.parse(raw) : {};

      const params = new URLSearchParams();
      if (parsed.studentId) params.append("studentId", parsed.studentId);
      if (parsed.phone) params.append("phone", parsed.phone);
      if (parsed.name) params.append("name", parsed.name);

      const res = await fetch(
        `${API_BASE}/student/attendance/${identifier}?${params.toString()}`,
      );
      const d = await res.json();

      console.log("📥 Attendance response:", d);

      if (d.success) {
        setData(d);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Attendance Found",
          text: d.message || "Attendance record নেই।",
        });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("loginSource");
      localStorage.removeItem("studentToken");
      navigate("/student-login");
    } catch (e) {
      console.error(e);
    }
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
          <p className="text-sm text-gray-500 mt-3">Loading attendance...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalClass: 0,
    totalPresent: 0,
    totalAbsent: 0,
    totalLate: 0,
    percentage: "0.00",
  };
  const batch = data?.batch || {};
  const records = data?.records || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Attendance</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-all duration-300 h-screen md:h-auto ${
            isSidebarOpen ? "left-0" : "-left-72 md:left-0"
          }`}
        >
          <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {studentInfo.name?.charAt(0) || "S"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">
                  {studentInfo.name || "Student"}
                </p>
                <p className="text-xs opacity-80 truncate">
                  {studentInfo.course || studentInfo.class || ""}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
              >
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2] transition-all">
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t border-gray-200 pt-4"
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

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          {/* Toolbar */}
          <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
                title="Back"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-base font-bold text-gray-800">Course Pane</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <button
                title="Print"
                onClick={() => window.print()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaPrint />
              </button>
              <button
                title="Refresh"
                onClick={fetchAttendance}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaSync />
              </button>
              <button
                title="Fullscreen"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen?.();
                  }
                }}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaExpand />
              </button>
            </div>
          </div>

          {/* Course Header */}
          <div className="border border-[#c8d8e8] bg-white rounded-sm shadow-sm mb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2 bg-[#d9e8f5] border-b border-[#c8d8e8]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a4a7a]">
                <FaGraduationCap /> {batch.course || "Course"}{" "}
                {batch.name ? `[${batch.name}]` : ""}
              </div>
              <span className="text-xs text-[#0a4a7a] font-semibold">
                {batch.semester || "Fall 2026 (Jul-Dec)"}
              </span>
            </div>
            <div className="p-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-700">
              <span>
                Class No: <strong>{batch.classNo || "-"}</strong>
              </span>
              <span>
                Class Section: <strong>{batch.section || "-"}</strong>
              </span>
              <span>
                Status:{" "}
                <strong className="text-green-700">
                  {batch.status || "Open"}
                </strong>
              </span>
              <span className="ml-auto text-gray-500 italic">
                Cr.Hrs:3.00, Co.Hrs:3.00, Theory, Core, 2021 Alim Preparatory
                Course Syllabus
              </span>
            </div>
          </div>

          {/* Tabs + Table */}
          <div className="border border-[#c8d8e8] bg-white rounded-sm shadow-sm">
            <div className="flex border-b border-[#c8d8e8]">
              <button
                onClick={() => setActiveTab("attendance")}
                className={`px-4 py-2 text-xs font-bold ${
                  activeTab === "attendance"
                    ? "bg-white text-[#0a4a7a] border-b-2 border-[#0a4a7a]"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Attendance
              </button>
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-4 py-2 text-xs font-bold ${
                  activeTab === "materials"
                    ? "bg-white text-[#0a4a7a] border-b-2 border-[#0a4a7a]"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Course Materials{" "}
                <span className="ml-1 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  new
                </span>
              </button>
              <button
                onClick={() => setActiveTab("notices")}
                className={`px-4 py-2 text-xs font-bold ${
                  activeTab === "notices"
                    ? "bg-white text-[#0a4a7a] border-b-2 border-[#0a4a7a]"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Notices
              </button>
            </div>

            {activeTab === "attendance" && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold">Date</th>
                      <th className="px-3 py-2 text-left font-bold">Day</th>
                      <th className="px-3 py-2 text-left font-bold">
                        Class Time
                      </th>
                      <th className="px-3 py-2 text-left font-bold">Type</th>
                      <th className="px-3 py-2 text-right font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-8 text-gray-400 italic"
                        >
                          এখনো কোনো attendance record পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      records.map((r, i) => {
                        const d = new Date(r.classDate);
                        const dateStr = !isNaN(d.getTime())
                          ? `${String(d.getDate()).padStart(2, "0")}/${String(
                              d.getMonth() + 1,
                            ).padStart(2, "0")}/${d.getFullYear()}`
                          : r.classDate;
                        return (
                          <tr
                            key={r._id || i}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-3 py-2">{dateStr}</td>
                            <td className="px-3 py-2">{r.day}</td>
                            <td className="px-3 py-2">{r.time}</td>
                            <td className="px-3 py-2">{r.type}</td>
                            <td className="px-3 py-2 text-right">
                              <span
                                className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold ${
                                  r.rawStatus === "present"
                                    ? "bg-green-500 text-white"
                                    : r.rawStatus === "absent"
                                      ? "bg-red-500 text-white"
                                      : r.rawStatus === "late"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-gray-300 text-gray-700"
                                }`}
                              >
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  {records.length > 0 && (
                    <tfoot className="bg-gray-50 font-bold text-gray-800 border-t-2 border-gray-300">
                      <tr>
                        <td className="px-3 py-2">
                          Total Class: {stats.totalClass}
                        </td>
                        <td className="px-3 py-2" colSpan="2">
                          Total Present: {stats.totalPresent}
                        </td>
                        <td className="px-3 py-2">
                          Total Absent: {stats.totalAbsent}
                        </td>
                        <td className="px-3 py-2 text-right">
                          Total Percentage: {stats.percentage}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            )}

            {activeTab === "materials" && (
              <div className="p-8 text-center text-sm text-gray-500">
                📚 Course materials শীঘ্রই যোগ করা হবে।
              </div>
            )}

            {activeTab === "notices" && (
              <div className="p-8 text-center text-sm text-gray-500">
                📢 Notices শীঘ্রই যোগ করা হবে।
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendance;
