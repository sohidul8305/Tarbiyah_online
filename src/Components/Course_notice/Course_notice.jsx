// src/Components/Course_notice/Course_notice.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  FaBookmark,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md"; // সঠিক রিয়েক্ট আইকন পাথ
import { FiMenu, FiX } from "react-icons/fi";

const Course_notice = () => {
  const { courseId } = useParams();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("academic");
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    name: "Shakil Ahmmed",
    class: "BA in Dawah and Islamic Studies",
  });

  const [currentTab, setCurrentTab] = useState("notices");
  const [notices, setNotices] = useState([]);

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
        class:
          parsedInfo.class ||
          parsedInfo.course ||
          "BA in Dawah and Islamic Studies",
      });
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
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

  const menuItems = [
    { id: "dashboard", path: "/student-dashboard", label: "Dashboard" },
    { id: "profile", path: "/student-profile", label: "Profile" },
    { id: "academic", path: "/student-acedemic", label: "Academic" },
    { id: "result", path: "/student-result", label: "Regular Exam Result" },
    { id: "payment", path: "/online-payment", label: "Monthly Online Payment" },
    { id: "due", path: "/due-payment", label: "Due & Payments" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Course Pane</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            transition-all duration-300 ease-in-out h-screen md:h-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                {studentInfo.name?.charAt(0) || "S"}
              </div>
              <div>
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
                onClick={() => setIsSidebarOpen(false)}
              >
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeMenu === item.id
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t pt-4 text-sm"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 mb-4 flex justify-between items-center">
            <h1 className="text-base font-bold text-gray-800">Course Pane</h1>
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
                onClick={() => window.location.reload()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaSync />
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#00ADD2] rounded-sm shadow-sm mb-4">
            <div className="bg-[#f4f6f9] px-4 py-3 border-b border-gray-200 flex justify-between items-center">
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

            <div className="px-4 py-2 bg-white text-xs text-gray-600 flex justify-between border-b border-gray-200">
              <span>
                Class No: 90187, Class Section: Brother-A, Status: Open
              </span>
              <span className="italic font-serif text-gray-500">
                Cr.Hr:3.00, Theory, Core
              </span>
            </div>

            <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-medium">
              <button
                onClick={() =>
                  navigate(`/student-attendance/${courseId || "aqd-101"}`)
                }
                className="px-4 py-2.5 border-r border-gray-200 text-gray-600 hover:bg-gray-100"
              >
                Attendance
              </button>

              <button
                onClick={() => setCurrentTab("notices")}
                className="px-4 py-2.5 bg-white border-t-2 border-t-[#00ADD2] text-[#00ADD2] font-bold"
              >
                Notices
              </button>
            </div>

            <div className="p-4">
              {notices.length === 0 ? (
                <div className="bg-[#fff3cd] border border-[#ffeeba] text-[#856404] px-4 py-3 rounded-sm flex items-center gap-2 text-xs">
                  <FaBookmark className="text-sm shrink-0" />
                  <span>
                    <strong>Not Found!</strong> There is no Notice posted for
                    this Course.
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  {notices.map((notice, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded bg-white shadow-sm text-xs"
                    ></div>
                  ))}
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

export default Course_notice;
