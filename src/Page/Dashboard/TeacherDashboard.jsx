// src/Page/Teacher/TeacherDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaHome,
  FaUser,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaCalendarAlt,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUpload,
  FaPlay,
  FaQuestionCircle,
  FaPen,
  FaFilePdf,
  FaYoutube,
  FaLink,
  FaPoll,
  FaAward,
  FaCertificate,
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdGrade, MdQuiz } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { BsChatDots, BsPeople, BsFileEarmarkPdf } from "react-icons/bs";
import TeacherProfile from "../Teacher_profile/Teacher_profile";

const TeacherDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
    subjects: [],
    classes: [],
  });

  // লোকেশন থেকে active menu সেট করা
  useEffect(() => {
    const path = location.pathname;
    if (path === "/teacher-dashboard" || path === "/teacher-dashboard/")
      setActiveMenu("dashboard");
    else if (
      path === "/teacher-profile" ||
      path === "/teacher-dashboard/profile"
    )
      setActiveMenu("profile");
    else if (
      path === "/teacher-courses" ||
      path === "/teacher-dashboard/courses"
    )
      setActiveMenu("courses");
    else if (
      path === "/teacher-classes" ||
      path === "/teacher-dashboard/classes"
    )
      setActiveMenu("classes");
    else if (
      path === "/teacher-students" ||
      path === "/teacher-dashboard/students"
    )
      setActiveMenu("students");
    else if (
      path === "/teacher-attendance" ||
      path === "/teacher-dashboard/attendance"
    )
      setActiveMenu("attendance");
    else if (path === "/teacher-exams" || path === "/teacher-dashboard/exams")
      setActiveMenu("exams");
    else if (
      path === "/teacher-results" ||
      path === "/teacher-dashboard/results"
    )
      setActiveMenu("results");
    else if (
      path === "/teacher-assignments" ||
      path === "/teacher-dashboard/assignments"
    )
      setActiveMenu("assignments");
    else if (
      path === "/teacher-quizzes" ||
      path === "/teacher-dashboard/quizzes"
    )
      setActiveMenu("quizzes");
    else if (path === "/teacher-videos" || path === "/teacher-dashboard/videos")
      setActiveMenu("videos");
    else if (
      path === "/teacher-short-questions" ||
      path === "/teacher-dashboard/short-questions"
    )
      setActiveMenu("short-questions");
    else if (
      path === "/teacher-payment" ||
      path === "/teacher-dashboard/payment"
    )
      setActiveMenu("payment");
    else if (path === "/teacher-notice" || path === "/teacher-dashboard/notice")
      setActiveMenu("notice");
    else if (
      path === "/teacher-settings" ||
      path === "/teacher-dashboard/settings"
    )
      setActiveMenu("settings");
  }, [location]);

  // লোড টিচার ইনফো
  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacherInfo");
    if (savedTeacher) {
      setTeacherInfo(JSON.parse(savedTeacher));
    } else {
      setTeacherInfo({
        name: user?.displayName || "Ustadh Ahmad",
        email: user?.email || "teacher@tarabiyah.com",
        phone: "01700000000",
        designation: "Senior Teacher",
        department: "Islamic Studies",
        joinDate: "January 2024",
        subjects: ["Tajweed", "Tafsir", "Hadith"],
        classes: ["Class 8", "Class 9", "Class 10"],
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isTeacherLoggedIn");
      localStorage.removeItem("teacherInfo");
      localStorage.removeItem("teacherEmail");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/teacher-login");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // সাইডবার মেনু আইটেম
  const menuItems = [
    {
      id: "dashboard",
      path: "/teacher-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/teacher-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "courses",
      path: "/teacher-courses",
      icon: <FaBook className="text-xl" />,
      label: "My Courses",
    },
    {
      id: "classes",
      path: "/teacher-classes",
      icon: <FaVideo className="text-xl" />,
      label: "Live Classes",
    },
    {
      id: "videos",
      path: "/teacher-videos",
      icon: <FaPlay className="text-xl" />,
      label: "Video Upload",
    },
    {
      id: "assignments",
      path: "/teacher-assignments",
      icon: <MdAssignment className="text-xl" />,
      label: "Assignments",
    },
    {
      id: "quizzes",
      path: "/teacher-quizzes",
      icon: <MdQuiz className="text-xl" />,
      label: "Quizzes",
    },
    {
      id: "short-questions",
      path: "/teacher-short-questions",
      icon: <FaPen className="text-xl" />,
      label: "Short Questions",
    },
    {
      id: "students",
      path: "/teacher-students",
      icon: <FaUsers className="text-xl" />,
      label: "Students",
    },
    {
      id: "attendance",
      path: "/teacher-attendance",
      icon: <FaClipboardList className="text-xl" />,
      label: "Attendance",
    },
    {
      id: "exams",
      path: "/teacher-exams",
      icon: <FaFileAlt className="text-xl" />,
      label: "Exams",
    },
    {
      id: "results",
      path: "/teacher-results",
      icon: <MdGrade className="text-xl" />,
      label: "Results",
    },
    {
      id: "payment",
      path: "/teacher-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Payment",
    },
    {
      id: "notice",
      path: "/teacher-notice",
      icon: <FaBell className="text-xl" />,
      label: "Notice Board",
    },
    {
      id: "settings",
      path: "/teacher-settings",
      icon: <FaCog className="text-xl" />,
      label: "Settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Teacher Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            overflow-y-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {teacherInfo.name?.charAt(0) || "T"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{teacherInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {teacherInfo.designation}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
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
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                    ${
                      activeMenu === item.id
                        ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* ================= OVERLAY (Mobile) ================= */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {activeMenu === "profile"
                  ? "Teacher Profile"
                  : "Teacher Dashboard"}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {teacherInfo.name}!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {teacherInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ================= DYNAMIC CONTENT ================= */}
          {activeMenu === "dashboard" ? (
            <DashboardContent teacherInfo={teacherInfo} />
          ) : activeMenu === "profile" ? (
            <TeacherProfile />
          ) : activeMenu === "videos" ? (
            <VideoUploadContent />
          ) : activeMenu === "assignments" ? (
            <AssignmentsContent />
          ) : activeMenu === "quizzes" ? (
            <QuizzesContent />
          ) : activeMenu === "short-questions" ? (
            <ShortQuestionsContent />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Coming Soon!
              </h3>
              <p className="text-gray-500">
                This feature is under development.
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

// ==========================================
// 1. DASHBOARD CONTENT
// ==========================================
const DashboardContent = ({ teacherInfo }) => {
  const stats = [
    {
      label: "Total Students",
      value: "156",
      icon: <FaUsers className="text-2xl" />,
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Active Courses",
      value: "4",
      icon: <FaBook className="text-2xl" />,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Video Lectures",
      value: "24",
      icon: <FaVideo className="text-2xl" />,
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Assignments",
      value: "12",
      icon: <MdAssignment className="text-2xl" />,
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      label: "Quizzes",
      value: "8",
      icon: <MdQuiz className="text-2xl" />,
      color: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      label: "Pending Reviews",
      value: "15",
      icon: <FaClock className="text-2xl" />,
      color: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <span className={stat.textColor}>{stat.icon}</span>
              <span className="text-lg font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-teal-600">⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "Upload Video", icon: "🎥", color: "bg-purple-50" },
            { label: "Create Assignment", icon: "📄", color: "bg-blue-50" },
            { label: "Create Quiz", icon: "📝", color: "bg-green-50" },
            { label: "Add Short Question", icon: "✏️", color: "bg-yellow-50" },
            { label: "Start Live Class", icon: "📺", color: "bg-red-50" },
            { label: "Take Attendance", icon: "📋", color: "bg-orange-50" },
            { label: "Post Notice", icon: "📢", color: "bg-teal-50" },
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => {
                if (action.label === "Upload Video") {
                  document.getElementById("video-upload-tab")?.click();
                } else if (action.label === "Create Assignment") {
                  document.getElementById("assignments-tab")?.click();
                } else if (action.label === "Create Quiz") {
                  document.getElementById("quizzes-tab")?.click();
                } else if (action.label === "Add Short Question") {
                  document.getElementById("short-questions-tab")?.click();
                } else {
                  Swal.fire({
                    icon: "info",
                    title: action.label,
                    text: "This feature is coming soon!",
                    confirmButtonColor: "#004d4d",
                  });
                }
              }}
              className={`${action.color} p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all text-center`}
            >
              <div className="text-2xl">{action.icon}</div>
              <p className="text-xs font-medium text-gray-700 mt-1">
                {action.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-blue-600">🔄</span> Recent Activities
          </h3>
          <div className="space-y-3">
            {[
              {
                action: "Uploaded new video",
                detail: "Tajweed - Lesson 5",
                time: "2 hours ago",
                icon: "🎥",
              },
              {
                action: "Created quiz",
                detail: "Tafsir - Chapter 3 Quiz",
                time: "4 hours ago",
                icon: "📝",
              },
              {
                action: "Posted assignment",
                detail: "Hadith - Assignment 2",
                time: "Yesterday",
                icon: "📄",
              },
              {
                action: "Added short questions",
                detail: "Fiqh - 10 questions",
                time: "Yesterday",
                icon: "✏️",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activity.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-green-600">📊</span> Pending Reviews
          </h3>
          <div className="space-y-3">
            {[
              { type: "Assignments", count: "5", color: "blue" },
              { type: "Quizzes", count: "3", color: "purple" },
              { type: "Short Questions", count: "7", color: "orange" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{item.type}</span>
                <span
                  className={`bg-${item.color}-100 text-${item.color}-700 px-3 py-1 rounded-full text-sm font-bold`}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. VIDEO UPLOAD CONTENT
// ==========================================
const VideoUploadContent = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Tajweed - Lesson 1: Introduction",
      course: "Tajweed",
      class: "Class 8",
      duration: "45:20",
      views: 120,
      uploadDate: "2024-01-15",
      thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha",
      course: "Tafsir",
      class: "Class 9",
      duration: "55:10",
      views: 85,
      uploadDate: "2024-01-20",
      thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    course: "",
    class: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    videoFile: null,
  });

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    await Swal.fire({
      icon: "success",
      title: "Video Uploaded!",
      text: "Your video has been uploaded successfully.",
      confirmButtonColor: "#004d4d",
    });

    setVideos([
      ...videos,
      {
        id: Date.now(),
        title: newVideo.title,
        course: newVideo.course,
        class: newVideo.class,
        duration: "45:00",
        views: 0,
        uploadDate: new Date().toISOString().split("T")[0],
        thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
      },
    ]);

    setShowUploadModal(false);
    setNewVideo({
      title: "",
      course: "",
      class: "",
      description: "",
      videoUrl: "",
      thumbnail: "",
      videoFile: null,
    });
  };

  const handleDeleteVideo = (id) => {
    Swal.fire({
      title: "Delete Video?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setVideos(videos.filter((video) => video.id !== id));
        Swal.fire("Deleted!", "Video has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaPlay className="text-purple-600" /> Video Lectures
          </h2>
          <p className="text-sm text-gray-500">
            Upload and manage your video lectures
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaUpload /> Upload Video
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Video
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Views
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {videos.map((video) => (
                <tr
                  key={video.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <FaPlay className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {video.uploadDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {video.course}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {video.class}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {video.duration}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {video.views}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUpload className="text-purple-600" /> Upload New Video
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleVideoUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter video title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={newVideo.course}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={newVideo.class}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter video description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video File (MP4) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setNewVideo({
                          ...newVideo,
                          videoFile: e.target.files[0],
                        });
                      }
                    }}
                    className="hidden"
                    id="videoFile"
                    required
                  />
                  <label htmlFor="videoFile" className="cursor-pointer block">
                    <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      MP4, WebM, OGG (Max 500MB)
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL (Optional)
                </label>
                <input
                  type="url"
                  value={newVideo.videoUrl}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, videoUrl: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  Or upload video file above
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Upload Video
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. ASSIGNMENTS CONTENT
// ==========================================
const AssignmentsContent = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Tajweed Practice - Lesson 2",
      course: "Tajweed",
      class: "Class 8",
      dueDate: "2024-02-10",
      submissions: 15,
      totalStudents: 30,
      status: "active",
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Baqarah Analysis",
      course: "Tafsir",
      class: "Class 9",
      dueDate: "2024-02-15",
      submissions: 8,
      totalStudents: 25,
      status: "pending",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    class: "",
    description: "",
    dueDate: "",
    maxMarks: "",
    file: null,
  });

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    await Swal.fire({
      icon: "success",
      title: "Assignment Created!",
      text: "Assignment has been posted successfully.",
      confirmButtonColor: "#004d4d",
    });
    setShowCreateModal(false);
  };

  const handleDeleteAssignment = (id) => {
    Swal.fire({
      title: "Delete Assignment?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAssignments(assignments.filter((a) => a.id !== id));
        Swal.fire("Deleted!", "Assignment has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MdAssignment className="text-blue-600" /> Assignments
          </h2>
          <p className="text-sm text-gray-500">
            Create and manage assignments for your students
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {assignment.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {assignment.course} • {assignment.class}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  assignment.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {assignment.status}
              </span>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p className="text-gray-600">📅 Due: {assignment.dueDate}</p>
              <p className="text-gray-600">
                📝 Submissions: {assignment.submissions}/
                {assignment.totalStudents}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all">
                View Submissions
              </button>
              <button
                onClick={() => handleDeleteAssignment(assignment.id)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdAssignment className="text-blue-600" /> Create New Assignment
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={newAssignment.course}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        course: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={newAssignment.class}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        class: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment details, instructions, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newAssignment.dueDate}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Marks
                  </label>
                  <input
                    type="number"
                    value={newAssignment.maxMarks}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        maxMarks: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setNewAssignment({
                        ...newAssignment,
                        file: e.target.files[0],
                      });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Create Assignment
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. QUIZZES CONTENT
// ==========================================
const QuizzesContent = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Tajweed Quiz - Lesson 1-3",
      course: "Tajweed",
      class: "Class 8",
      questions: 10,
      duration: "20 min",
      status: "published",
      attempts: 25,
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha Quiz",
      course: "Tafsir",
      class: "Class 9",
      questions: 15,
      duration: "30 min",
      status: "draft",
      attempts: 0,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple",
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "",
    class: "",
    description: "",
    duration: "",
    totalMarks: "",
    passMarks: "",
  });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        type: "multiple",
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    await Swal.fire({
      icon: "success",
      title: "Quiz Created!",
      text: "Your quiz has been created successfully.",
      confirmButtonColor: "#004d4d",
    });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MdQuiz className="text-green-600" /> Quizzes
          </h2>
          <p className="text-sm text-gray-500">
            Create and manage quizzes for your students
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Create Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {quiz.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {quiz.course} • {quiz.class}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  quiz.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {quiz.status}
              </span>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p className="text-gray-600">📝 Questions: {quiz.questions}</p>
              <p className="text-gray-600">⏱️ Duration: {quiz.duration}</p>
              <p className="text-gray-600">👥 Attempts: {quiz.attempts}</p>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
              <button className="text-green-600 hover:text-green-800 text-xs font-medium flex-1 text-center py-1 rounded border border-green-200 hover:bg-green-50 transition-all">
                View Results
              </button>
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdQuiz className="text-green-600" /> Create New Quiz
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleQuizSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newQuiz.title}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={newQuiz.course}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={newQuiz.class}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuiz.duration}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={newQuiz.totalMarks}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, totalMarks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-800">Questions</h4>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-200 transition-all flex items-center gap-1"
                  >
                    <FaPlusCircle /> Add Question
                  </button>
                </div>

                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-semibold text-sm text-gray-700">
                        Question {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question Text *
                        </label>
                        <input
                          type="text"
                          required
                          value={q.question}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[index].question = e.target.value;
                            setQuestions(updated);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your question"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question Type
                        </label>
                        <select
                          value={q.type}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[index].type = e.target.value;
                            setQuestions(updated);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="multiple">Multiple Choice</option>
                          <option value="truefalse">True/False</option>
                          <option value="short">Short Answer</option>
                        </select>
                      </div>

                      {q.type === "multiple" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {q.options.map((option, optIndex) => (
                            <div key={optIndex}>
                              <label className="text-xs text-gray-500">
                                Option {String.fromCharCode(65 + optIndex)}
                              </label>
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const updated = [...questions];
                                  updated[index].options[optIndex] =
                                    e.target.value;
                                  setQuestions(updated);
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correct Answer *
                        </label>
                        {q.type === "multiple" ? (
                          <select
                            value={q.answer}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[index].answer = e.target.value;
                              setQuestions(updated);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select correct answer</option>
                            {q.options.map((opt, idx) => (
                              <option key={idx} value={opt}>
                                {String.fromCharCode(65 + idx)}.{" "}
                                {opt ||
                                  `Option ${String.fromCharCode(65 + idx)}`}
                              </option>
                            ))}
                          </select>
                        ) : q.type === "truefalse" ? (
                          <select
                            value={q.answer}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[index].answer = e.target.value;
                              setQuestions(updated);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select correct answer</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={q.answer}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[index].answer = e.target.value;
                              setQuestions(updated);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter correct answer"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Create Quiz
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. SHORT QUESTIONS CONTENT
// ==========================================
const ShortQuestionsContent = () => {
  const [shortQuestions, setShortQuestions] = useState([
    {
      id: 1,
      question: "What is the meaning of Tawheed?",
      course: "Aqeedah",
      class: "Class 8",
      marks: 5,
      status: "published",
    },
    {
      id: 2,
      question: "Explain the importance of Salah in Islam.",
      course: "Fiqh",
      class: "Class 9",
      marks: 10,
      status: "draft",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    course: "",
    class: "",
    marks: "",
    answer: "",
    reference: "",
  });

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    await Swal.fire({
      icon: "success",
      title: "Question Added!",
      text: "Short question has been added successfully.",
      confirmButtonColor: "#004d4d",
    });
    setShowCreateModal(false);
  };

  const handleDeleteQuestion = (id) => {
    Swal.fire({
      title: "Delete Question?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShortQuestions(shortQuestions.filter((q) => q.id !== id));
        Swal.fire("Deleted!", "Question has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaPen className="text-orange-600" /> Short Questions
          </h2>
          <p className="text-sm text-gray-500">
            Create and manage short answer questions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Add Question
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Question
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Marks
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shortQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    {q.question}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {q.course}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{q.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{q.marks}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        q.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPen className="text-orange-600" /> Add Short Question
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question *
                </label>
                <textarea
                  required
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter the question"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course *
                  </label>
                  <select
                    required
                    value={newQuestion.course}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="Aqeedah">Aqeedah</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={newQuestion.class}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks *
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuestion.marks}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, marks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Answer
                </label>
                <textarea
                  value={newQuestion.answer}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, answer: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter model answer (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference (Optional)
                </label>
                <input
                  type="text"
                  value={newQuestion.reference}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      reference: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Book name or reference"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
