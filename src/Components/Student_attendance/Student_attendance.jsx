// src/Page/Student/Student_attendance.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaEdit,
  FaPrint,
  FaExpand,
  FaSync,
  FaExchangeAlt,
  FaUniversity as FaUniIcon,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Student_attendance = () => {
  const { courseId } = useParams(); // URL থেকে ডাইনামিক কোর্স আইডি বা কোড নেওয়া
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
  });

  // ট্যাব স্টেট: attendance, materials, notices
  const [currentTab, setCurrentTab] = useState("attendance");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (!isLoggedIn) {
      navigate("/student-login");
      return;
    }

    const info = localStorage.getItem("studentInfo");
    if (info) {
      const parsedInfo = JSON.parse(info);
      setStudentInfo({
        name: parsedInfo.name || "Shakil Ahmmed",
        email: parsedInfo.email || "",
        phone: parsedInfo.phone || "",
        class:
          parsedInfo.class ||
          parsedInfo.course ||
          "BA in Dawah and Islamic Studies",
        roll: parsedInfo.roll || "26160110266",
      });
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  // ডাইনামিক অ্যাটেনডেন্স ডেটা (প্রয়োজনে API থেকে ফেচ করতে পারেন)
  const attendanceData = [
    {
      id: 1,
      date: "31/07/2026",
      day: "Friday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 2,
      date: "01/08/2026",
      day: "Saturday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Absent",
    },
    {
      id: 3,
      date: "25/07/2026",
      day: "Saturday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 4,
      date: "04/09/2026",
      day: "Friday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 5,
      date: "07/08/2026",
      day: "Friday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 6,
      date: "28/08/2026",
      day: "Friday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 7,
      date: "15/08/2026",
      day: "Saturday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 8,
      date: "22/08/2026",
      day: "Saturday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 9,
      date: "08/08/2026",
      day: "Saturday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 10,
      date: "29/08/2026",
      day: "Saturday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 11,
      date: "14/08/2026",
      day: "Friday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 12,
      date: "18/07/2026",
      day: "Saturday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Present",
    },
    {
      id: 13,
      date: "05/09/2026",
      day: "Saturday",
      time: "09:15 PM - 10:15 PM",
      type: "Regular Class",
      status: "Absent",
    },
    {
      id: 14,
      date: "24/07/2026",
      day: "Friday",
      time: "10:15 PM - 11:15 PM",
      type: "Regular Class",
      status: "Present",
    },
  ];

  const totalClass = attendanceData.length;
  const totalPresent = attendanceData.filter(
    (item) => item.status === "Present",
  ).length;
  const totalAbsent = attendanceData.filter(
    (item) => item.status === "Absent",
  ).length;
  const totalPercentage = ((totalPresent / totalClass) * 100).toFixed(2);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Course Pane</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* Sidebar */}
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
                  {studentInfo.class}
                </p>
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
            <p>© 2026 Pipilika Soft</p>
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
          {/* Top Control Bar */}
          <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-gray-800">Course Pane</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <button
                title="Edit"
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

          {/* Course Details Box */}
          <div className="bg-white border border-[#00ADD2] rounded-sm shadow-sm mb-4">
            <div className="bg-[#f4f6f9] px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
                <FaUniIcon className="text-[#00ADD2] text-lg" />
                <span>
                  {courseId ? courseId.toUpperCase() : "AQD-101"} Aqeedah
                  [Brother-A-B16]
                </span>
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Fall 2026 (Jul-Dec)
              </div>
            </div>

            <div className="px-4 py-2 bg-white text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-b border-gray-200">
              <span>
                Class No: 90187, Class Section: Brother-A, Status: Open
              </span>
              <span className="italic font-serif text-gray-500">
                Cr.Hr:3.00, Co.Hr:3.00, Theory, Core, 2021 Alim Preparatory
                Course Syllabus
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-medium">
              <button
                onClick={() => setCurrentTab("attendance")}
                className={`px-4 py-2.5 border-r border-gray-200 transition-all ${
                  currentTab === "attendance"
                    ? "bg-white border-t-2 border-t-[#00ADD2] text-[#00ADD2] font-bold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Attendance
              </button>
              <button
                onClick={() => setCurrentTab("materials")}
                className={`px-4 py-2.5 border-r border-gray-200 flex items-center gap-1.5 transition-all ${
                  currentTab === "materials"
                    ? "bg-white border-t-2 border-t-[#00ADD2] text-[#00ADD2] font-bold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              ></button>
              <Link to="/course-notices/AQD-101">
                <button
                  onClick={() => setCurrentTab("notices")}
                  className={`px-4 py-2.5 transition-all ${
                    currentTab === "notices"
                      ? "bg-white border-t-2 border-t-[#00ADD2] text-[#00ADD2] font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Notices
                </button>
              </Link>
            </div>

            {/* Tab Contents */}
            <div className="p-0">
              {currentTab === "attendance" && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-gray-700">
                      <thead className="bg-gray-100 text-gray-700 uppercase border-b border-gray-200 font-semibold">
                        <tr>
                          <th className="px-4 py-2.5 border-r border-gray-200 text-center w-28">
                            Date
                          </th>
                          <th className="px-4 py-2.5 border-r border-gray-200 text-center w-28">
                            Day
                          </th>
                          <th className="px-4 py-2.5 border-r border-gray-200 text-center">
                            Class Time
                          </th>
                          <th className="px-4 py-2.5 border-r border-gray-200 text-center">
                            Type
                          </th>
                          <th className="px-4 py-2.5 text-center w-28">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceData.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-[#fcfdfd]"
                            }`}
                          >
                            <td className="px-4 py-2.5 border-r border-gray-200 text-center font-medium">
                              {item.date}
                            </td>
                            <td className="px-4 py-2.5 border-r border-gray-200 text-center">
                              {item.day}
                            </td>
                            <td className="px-4 py-2.5 border-r border-gray-200 text-center">
                              {item.time}
                            </td>
                            <td className="px-4 py-2.5 border-r border-gray-200 text-center">
                              {item.type}
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-[11px] font-medium shadow-sm inline-block ${
                                  item.status === "Present"
                                    ? "bg-[#28a745]"
                                    : "bg-[#dc3545]"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Totals Bar */}
                  <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex flex-wrap justify-between items-center text-xs font-bold text-gray-800">
                    <div>Total Class: {totalClass}</div>
                    <div>Total Present: {totalPresent}</div>
                    <div>Total Absent: {totalAbsent}</div>
                    <div>Total Percentage: {totalPercentage}</div>
                  </div>
                </div>
              )}

              {currentTab === "materials" && (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <p>No course materials available right now.</p>
                </div>
              )}

              {currentTab === "notices" && (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <p>No notices available for this course yet.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Student_attendance;
