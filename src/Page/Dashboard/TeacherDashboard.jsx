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
  FaChalkboardTeacher,
  FaGraduationCap,
  FaTasks,
  FaCalendarCheck,
  FaListUl,
  FaFolderOpen,
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
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      date: "2026-07-20",
      reason: "Personal Emergency",
      status: "pending",
    },
    { id: 2, date: "2026-07-15", reason: "Medical Leave", status: "approved" },
  ]);
  const [totalLeave, setTotalLeave] = useState(12);
  const [salaryData, setSalaryData] = useState({
    totalSalary: 45000,
    dueSalary: 15000,
    lastPaid: "2026-06-30",
    nextPayment: "2026-07-31",
  });
  const [homeworkPending, setHomeworkPending] = useState([
    {
      id: 1,
      title: "Tajweed Lesson 5",
      class: "Class 8",
      dueDate: "2026-07-28",
      submissions: 12,
      total: 30,
    },
    {
      id: 2,
      title: "Tafsir Chapter 3",
      class: "Class 9",
      dueDate: "2026-07-30",
      submissions: 5,
      total: 25,
    },
    {
      id: 3,
      title: "Hadith Assignment 2",
      class: "Class 10",
      dueDate: "2026-08-01",
      submissions: 8,
      total: 28,
    },
  ]);
  const [todayClasses, setTodayClasses] = useState([
    {
      id: 1,
      subject: "Tajweed",
      class: "Class 8",
      time: "09:00 AM - 10:00 AM",
      link: "https://meet.google.com/abc-defg-hij",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Tafsir",
      class: "Class 9",
      time: "11:00 AM - 12:00 PM",
      link: "https://meet.google.com/klm-nopq-rst",
      status: "upcoming",
    },
  ]);
  const [examResults, setExamResults] = useState([
    {
      id: 1,
      title: "Mid Term Exam 2026",
      class: "Class 8",
      subject: "Tajweed",
      date: "2026-06-15",
      totalStudents: 30,
      passed: 25,
      failed: 5,
    },
    {
      id: 2,
      title: "Weekly Test - Week 3",
      class: "Class 9",
      subject: "Tafsir",
      date: "2026-07-10",
      totalStudents: 25,
      passed: 20,
      failed: 5,
    },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New student enrolled in Class 8",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Assignment submission deadline today",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      message: "Staff meeting tomorrow at 10:00 AM",
      time: "1 day ago",
      read: true,
    },
  ]);

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
    else if (path === "/teacher-leave" || path === "/teacher-dashboard/leave")
      setActiveMenu("leave");
    else if (path === "/teacher-salary" || path === "/teacher-dashboard/salary")
      setActiveMenu("salary");
    else if (
      path === "/teacher-homework" ||
      path === "/teacher-dashboard/homework"
    )
      setActiveMenu("homework");
    else if (
      path === "/teacher-notifications" ||
      path === "/teacher-dashboard/notifications"
    )
      setActiveMenu("notifications");
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

  // সাইডবার মেনু আইটেম - Updated to match the image
  const menuItems = [
    {
      id: "profile",
      path: "/teacher-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/teacher-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
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
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: "My Classes",
    },

    {
      id: "homework",
      path: "/teacher-homework",
      icon: <FaTasks className="text-xl" />,
      label: "Homework",
    },
    {
      id: "notifications",
      path: "/teacher-notifications",
      icon: <FaBell className="text-xl" />,
      label: "Notification",
    },
    {
      id: "students",
      path: "/teacher-students",
      icon: <FaUsers className="text-xl" />,
      label: "Student Progress Report",
    },
    {
      id: "results",
      path: "/teacher-results",
      icon: <FaAward className="text-xl" />,
      label: "Exam Result",
    },
    {
      id: "leave",
      path: "/teacher-leave",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Leave KP",
    },
    {
      id: "salary",
      path: "/teacher-salary",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Salary Overview",
    },

    // এই নতুন আইটেমগুলো যোগ করুন
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
            <DashboardContent
              teacherInfo={teacherInfo}
              todayClasses={todayClasses}
              homeworkPending={homeworkPending}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ) : activeMenu === "profile" ? (
            <TeacherProfile />
          ) : activeMenu === "classes" ? (
            <MyClassesContent
              todayClasses={todayClasses}
              setTodayClasses={setTodayClasses}
              teacherInfo={teacherInfo}
            />
          ) : activeMenu === "homework" ? (
            <HomeworkContent
              homeworkPending={homeworkPending}
              setHomeworkPending={setHomeworkPending}
            />
          ) : activeMenu === "notifications" ? (
            <NotificationContent
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ) : activeMenu === "students" ? (
            <StudentProgressContent />
          ) : activeMenu === "results" ? (
            <ExamResultContent
              examResults={examResults}
              setExamResults={setExamResults}
            />
          ) : activeMenu === "leave" ? (
            <LeaveKPContent
              leaveApplications={leaveApplications}
              setLeaveApplications={setLeaveApplications}
              totalLeave={totalLeave}
            />
          ) : activeMenu === "salary" ? (
            <SalaryOverviewContent salaryData={salaryData} />
          ) : activeMenu === "courses" ? (
            <MyCoursesContent teacherInfo={teacherInfo} />
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
const DashboardContent = ({
  teacherInfo,
  todayClasses,
  homeworkPending,
  notifications,
  setNotifications,
}) => {
  const stats = [
    {
      label: "My Department",
      value: teacherInfo.department || "Islamic Studies",
      icon: <FaFolderOpen className="text-2xl" />,
      color: "bg-blue-50",
      textColor: "text-blue-600",
      isText: true,
    },
    {
      label: "My Classes",
      value: teacherInfo.classes?.length || 0,
      icon: <FaChalkboardTeacher className="text-2xl" />,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Today's Classes",
      value: todayClasses?.length || 0,
      icon: <FaCalendarAlt className="text-2xl" />,
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Homework Pending",
      value: homeworkPending?.length || 0,
      icon: <FaTasks className="text-2xl" />,
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    Swal.fire({
      icon: "success",
      title: "All notifications marked as read",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid - Updated to match image */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <span className={stat.textColor}>{stat.icon}</span>
              <span className="text-lg font-bold text-gray-800">
                {stat.isText ? stat.value : stat.value}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Classes Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FaCalendarAlt className="text-purple-600" /> Today's Classes
        </h3>
        {todayClasses.length > 0 ? (
          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {cls.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    {cls.class} • {cls.time}
                  </p>
                </div>
                <a
                  href={cls.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1"
                >
                  <FaLink size={12} /> Join
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No classes scheduled for today
          </p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Homework Pending */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaTasks className="text-orange-600" /> Homework Pending
          </h3>
          {homeworkPending.length > 0 ? (
            <div className="space-y-3">
              {homeworkPending.map((hw) => (
                <div
                  key={hw.id}
                  className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {hw.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {hw.class} • Due: {hw.dueDate}
                    </p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    {hw.submissions}/{hw.total}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No pending homework</p>
          )}
          <Link
            to="/teacher-homework"
            className="text-xs text-teal-600 hover:text-teal-700 font-medium mt-3 inline-block"
          >
            View All →
          </Link>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <FaBell className="text-yellow-600" /> Notifications
            </h3>
            {notifications.some((n) => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-teal-600 hover:text-teal-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${!notif.read ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${!notif.read ? "bg-blue-500" : "bg-gray-300"}`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No notifications</p>
          )}
          <Link
            to="/teacher-notifications"
            className="text-xs text-teal-600 hover:text-teal-700 font-medium mt-3 inline-block"
          >
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MY CLASSES CONTENT
// ==========================================
const MyClassesContent = ({ todayClasses, setTodayClasses, teacherInfo }) => {
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({
    subject: "",
    class: "",
    time: "",
    link: "",
  });

  const handleAddClass = (e) => {
    e.preventDefault();
    if (
      !newClass.subject ||
      !newClass.class ||
      !newClass.time ||
      !newClass.link
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setTodayClasses([
      ...todayClasses,
      {
        id: Date.now(),
        ...newClass,
        status: "upcoming",
      },
    ]);
    setShowAddClass(false);
    setNewClass({ subject: "", class: "", time: "", link: "" });
    Swal.fire({
      icon: "success",
      title: "Class Added!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Delete Class?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodayClasses(todayClasses.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Class has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaChalkboardTeacher className="text-purple-600" /> My Classes
          </h2>
          <p className="text-sm text-gray-500">Manage your class schedule</p>
        </div>
        <button
          onClick={() => setShowAddClass(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Add Class
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Meeting Link
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
              {todayClasses.length > 0 ? (
                todayClasses.map((cls) => (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {cls.subject}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {cls.class}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {cls.time}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={cls.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 text-sm flex items-center gap-1"
                      >
                        <FaLink size={12} /> Join
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          cls.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : cls.status === "ongoing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cls.status || "upcoming"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-800 p-1">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(cls.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No classes scheduled yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add New Class</h3>
              <button
                onClick={() => setShowAddClass(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={newClass.subject}
                  onChange={(e) =>
                    setNewClass({ ...newClass, subject: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Tajweed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <select
                  required
                  value={newClass.class}
                  onChange={(e) =>
                    setNewClass({ ...newClass, class: e.target.value })
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="text"
                  required
                  value={newClass.time}
                  onChange={(e) =>
                    setNewClass({ ...newClass, time: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 09:00 AM - 10:00 AM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Link *
                </label>
                <input
                  type="url"
                  required
                  value={newClass.link}
                  onChange={(e) =>
                    setNewClass({ ...newClass, link: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://meet.google.com/..."
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Class
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClass(false)}
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
// 3. HOMEWORK CONTENT
// ==========================================
const HomeworkContent = ({ homeworkPending, setHomeworkPending }) => {
  const [showAddHomework, setShowAddHomework] = useState(false);
  const [newHomework, setNewHomework] = useState({
    title: "",
    class: "",
    dueDate: "",
    description: "",
    total: 30,
  });

  const handleAddHomework = (e) => {
    e.preventDefault();
    if (!newHomework.title || !newHomework.class || !newHomework.dueDate) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setHomeworkPending([
      ...homeworkPending,
      {
        id: Date.now(),
        ...newHomework,
        submissions: 0,
      },
    ]);
    setShowAddHomework(false);
    setNewHomework({
      title: "",
      class: "",
      dueDate: "",
      description: "",
      total: 30,
    });
    Swal.fire({
      icon: "success",
      title: "Homework Added!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteHomework = (id) => {
    Swal.fire({
      title: "Delete Homework?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHomeworkPending(homeworkPending.filter((h) => h.id !== id));
        Swal.fire("Deleted!", "Homework has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaTasks className="text-orange-600" /> Homework
          </h2>
          <p className="text-sm text-gray-500">Manage homework assignments</p>
        </div>
        <button
          onClick={() => setShowAddHomework(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Add Homework
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {homeworkPending.length > 0 ? (
          homeworkPending.map((hw) => (
            <div
              key={hw.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-gray-500">{hw.class}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {hw.submissions || 0}/{hw.total || 30}
                </span>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>📅 Due: {hw.dueDate}</p>
                {hw.description && (
                  <p className="text-xs text-gray-400 mt-1">{hw.description}</p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all">
                  View Submissions
                </button>
                <button
                  onClick={() => handleDeleteHomework(hw.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
            No homework assigned yet
          </div>
        )}
      </div>

      {/* Add Homework Modal */}
      {showAddHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Homework</h3>
              <button
                onClick={() => setShowAddHomework(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddHomework} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newHomework.title}
                  onChange={(e) =>
                    setNewHomework({ ...newHomework, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <select
                  required
                  value={newHomework.class}
                  onChange={(e) =>
                    setNewHomework({ ...newHomework, class: e.target.value })
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
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={newHomework.dueDate}
                  onChange={(e) =>
                    setNewHomework({ ...newHomework, dueDate: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Students
                </label>
                <input
                  type="number"
                  value={newHomework.total}
                  onChange={(e) =>
                    setNewHomework({
                      ...newHomework,
                      total: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newHomework.description}
                  onChange={(e) =>
                    setNewHomework({
                      ...newHomework,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter homework description"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Homework
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddHomework(false)}
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
// 4. NOTIFICATION CONTENT
// ==========================================
const NotificationContent = ({ notifications, setNotifications }) => {
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    Swal.fire({
      icon: "success",
      title: "All notifications marked as read",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const deleteNotification = (id) => {
    Swal.fire({
      title: "Delete Notification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications(notifications.filter((n) => n.id !== id));
        Swal.fire("Deleted!", "Notification has been deleted.", "success");
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaBell className="text-yellow-600" /> Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500">
            Stay updated with your notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            >
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 flex items-start gap-3 ${!notif.read ? "bg-blue-50" : "hover:bg-gray-50"} transition-colors`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${!notif.read ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-teal-600 hover:text-teal-800 text-xs font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <FaBell className="text-4xl text-gray-300 mx-auto mb-2" />
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 5. STUDENT PROGRESS CONTENT
// ==========================================
const StudentProgressContent = () => {
  const [students] = useState([
    {
      id: 1,
      name: "Ahmed Hasan",
      class: "Class 8",
      subject: "Tajweed",
      attendance: 92,
      assignments: 85,
      quiz: 78,
      exam: 88,
      progress: 85,
    },
    {
      id: 2,
      name: "Fatima Begum",
      class: "Class 8",
      subject: "Tajweed",
      attendance: 88,
      assignments: 90,
      quiz: 82,
      exam: 91,
      progress: 87,
    },
    {
      id: 3,
      name: "Mohammad Ali",
      class: "Class 9",
      subject: "Tafsir",
      attendance: 75,
      assignments: 70,
      quiz: 65,
      exam: 72,
      progress: 70,
    },
    {
      id: 4,
      name: "Aisha Rahman",
      class: "Class 9",
      subject: "Tafsir",
      attendance: 95,
      assignments: 88,
      quiz: 85,
      exam: 90,
      progress: 89,
    },
    {
      id: 5,
      name: "Abdullah Karim",
      class: "Class 10",
      subject: "Hadith",
      attendance: 82,
      assignments: 78,
      quiz: 72,
      exam: 76,
      progress: 77,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaUsers className="text-teal-600" /> Student Progress Report
        </h2>
        <p className="text-sm text-gray-500">
          Track student performance across all subjects
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Attendance
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Assignments
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Quizzes
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Exams
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {student.class}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${student.attendance >= 80 ? "text-green-600" : student.attendance >= 70 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {student.assignments}%
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {student.quiz}%
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {student.exam}%
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${student.progress >= 80 ? "bg-green-500" : student.progress >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. EXAM RESULT CONTENT
// ==========================================
const ExamResultContent = ({ examResults, setExamResults }) => {
  const [showAddResult, setShowAddResult] = useState(false);
  const [newResult, setNewResult] = useState({
    title: "",
    class: "",
    subject: "",
    date: "",
    totalStudents: "",
    passed: "",
    failed: "",
  });

  const handleAddResult = (e) => {
    e.preventDefault();
    if (
      !newResult.title ||
      !newResult.class ||
      !newResult.subject ||
      !newResult.date ||
      !newResult.totalStudents ||
      !newResult.passed ||
      !newResult.failed
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setExamResults([
      ...examResults,
      {
        id: Date.now(),
        ...newResult,
        totalStudents: parseInt(newResult.totalStudents),
        passed: parseInt(newResult.passed),
        failed: parseInt(newResult.failed),
      },
    ]);
    setShowAddResult(false);
    setNewResult({
      title: "",
      class: "",
      subject: "",
      date: "",
      totalStudents: "",
      passed: "",
      failed: "",
    });
    Swal.fire({
      icon: "success",
      title: "Result Added!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteResult = (id) => {
    Swal.fire({
      title: "Delete Result?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExamResults(examResults.filter((r) => r.id !== id));
        Swal.fire("Deleted!", "Result has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaAward className="text-teal-600" /> Exam Results
          </h2>
          <p className="text-sm text-gray-500">Manage exam results</p>
        </div>
        <button
          onClick={() => setShowAddResult(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <FaPlusCircle /> Add Result
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examResults.length > 0 ? (
          examResults.map((result) => (
            <div
              key={result.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {result.subject} • {result.class}
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {result.date}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-gray-600">
                  👥 Total: {result.totalStudents}
                </p>
                <p className="text-green-600">✅ Passed: {result.passed}</p>
                <p className="text-red-600">❌ Failed: {result.failed}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex-1 text-center py-1 rounded border border-blue-200 hover:bg-blue-50 transition-all">
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteResult(result.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
            No exam results available
          </div>
        )}
      </div>

      {/* Add Result Modal */}
      {showAddResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Add Exam Result
              </h3>
              <button
                onClick={() => setShowAddResult(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddResult} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Title *
                </label>
                <input
                  type="text"
                  required
                  value={newResult.title}
                  onChange={(e) =>
                    setNewResult({ ...newResult, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Mid Term Exam 2026"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={newResult.class}
                    onChange={(e) =>
                      setNewResult({ ...newResult, class: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={newResult.subject}
                    onChange={(e) =>
                      setNewResult({ ...newResult, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Date *
                </label>
                <input
                  type="date"
                  required
                  value={newResult.date}
                  onChange={(e) =>
                    setNewResult({ ...newResult, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total *
                  </label>
                  <input
                    type="number"
                    required
                    value={newResult.totalStudents}
                    onChange={(e) =>
                      setNewResult({
                        ...newResult,
                        totalStudents: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passed *
                  </label>
                  <input
                    type="number"
                    required
                    value={newResult.passed}
                    onChange={(e) =>
                      setNewResult({ ...newResult, passed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Failed *
                  </label>
                  <input
                    type="number"
                    required
                    value={newResult.failed}
                    onChange={(e) =>
                      setNewResult({ ...newResult, failed: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Add Result
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddResult(false)}
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
// 7. LEAVE KP CONTENT
// ==========================================
const LeaveKPContent = ({
  leaveApplications,
  setLeaveApplications,
  totalLeave,
}) => {
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [newLeave, setNewLeave] = useState({
    date: "",
    reason: "",
  });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!newLeave.date || !newLeave.reason) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setLeaveApplications([
      ...leaveApplications,
      {
        id: Date.now(),
        ...newLeave,
        status: "pending",
      },
    ]);
    setShowApplyLeave(false);
    setNewLeave({ date: "", reason: "" });
    Swal.fire({
      icon: "success",
      title: "Leave Application Submitted!",
      text: "Your leave application is pending approval.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "✅ Approved";
      case "rejected":
        return "❌ Rejected";
      default:
        return "⏳ Pending";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarCheck className="text-blue-600" /> Leave KP
          </h2>
          <p className="text-sm text-gray-500">
            Manage your leave applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <p className="text-xs text-gray-500">Total Leave</p>
            <p className="text-xl font-bold text-blue-600">{totalLeave}</p>
          </div>
          <button
            onClick={() => setShowApplyLeave(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <FaPlusCircle /> Apply
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Reason
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
              {leaveApplications.length > 0 ? (
                leaveApplications.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {leave.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {leave.reason}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(leave.status)}`}
                      >
                        {getStatusText(leave.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {leave.status === "pending" && (
                        <button
                          onClick={() => {
                            setLeaveApplications(
                              leaveApplications.filter(
                                (l) => l.id !== leave.id,
                              ),
                            );
                            Swal.fire({
                              icon: "info",
                              title: "Application Cancelled",
                              timer: 1500,
                              showConfirmButton: false,
                            });
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Cancel
                        </button>
                      )}
                      {leave.status !== "pending" && (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No leave applications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Apply for Leave
              </h3>
              <button
                onClick={() => setShowApplyLeave(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleApplyLeave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newLeave.date}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason *
                </label>
                <textarea
                  required
                  value={newLeave.reason}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, reason: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reason for leave"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyLeave(false)}
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
// 8. SALARY OVERVIEW CONTENT
// ==========================================
const SalaryOverviewContent = ({ salaryData }) => {
  const [salaryHistory] = useState([
    { month: "January 2026", amount: 45000, status: "Paid" },
    { month: "February 2026", amount: 45000, status: "Paid" },
    { month: "March 2026", amount: 45000, status: "Paid" },
    { month: "April 2026", amount: 45000, status: "Paid" },
    { month: "May 2026", amount: 45000, status: "Paid" },
    { month: "June 2026", amount: 45000, status: "Pending" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" /> Salary Overview
        </h2>
        <p className="text-sm text-gray-500">Track your salary and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
          <p className="text-sm text-gray-500">Total Salary</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ৳{salaryData.totalSalary.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
          <p className="text-sm text-gray-500">Due Salary</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ৳{salaryData.dueSalary.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
          <p className="text-sm text-gray-500">Next Payment</p>
          <p className="text-xl font-bold text-blue-600 mt-2">
            {salaryData.nextPayment}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Salary History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {salaryHistory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {item.month}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ৳{item.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "Paid" ? "✅ Paid" : "⏳ Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 9. MY COURSES CONTENT
// ==========================================
const MyCoursesContent = ({ teacherInfo }) => {
  const [courses] = useState([
    {
      id: 1,
      name: "Tajweed - Beginner",
      students: 30,
      classes: "Class 8",
      status: "Active",
    },
    {
      id: 2,
      name: "Tafsir - Quranic Studies",
      students: 25,
      classes: "Class 9",
      status: "Active",
    },
    {
      id: 3,
      name: "Hadith - Sahih Bukhari",
      students: 28,
      classes: "Class 10",
      status: "Active",
    },
    {
      id: 4,
      name: "Fiqh - Islamic Jurisprudence",
      students: 20,
      classes: "Class 7",
      status: "Draft",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaBook className="text-teal-600" /> My Courses
        </h2>
        <p className="text-sm text-gray-500">
          Manage your courses and subjects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {course.name}
                </h3>
                <p className="text-xs text-gray-500">{course.classes}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  course.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>👥 {course.students} Students</p>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
              <button className="text-teal-600 hover:text-teal-800 text-xs font-medium flex-1 text-center py-1 rounded border border-teal-200 hover:bg-teal-50 transition-all">
                View Details
              </button>
              <button className="text-green-600 hover:text-green-800 p-1">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 10. VIDEO UPLOAD CONTENT
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
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha",
      course: "Tafsir",
      class: "Class 9",
      duration: "55:10",
      views: 85,
      uploadDate: "2024-01-20",
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    course: "",
    class: "",
    description: "",
    videoUrl: "",
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
      },
    ]);
    setShowUploadModal(false);
    setNewVideo({
      title: "",
      course: "",
      class: "",
      description: "",
      videoUrl: "",
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
// 11. ASSIGNMENTS CONTENT
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
// 12. QUIZZES CONTENT
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
// 13. SHORT QUESTIONS CONTENT
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
