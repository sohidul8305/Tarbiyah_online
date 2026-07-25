// src/Page/Teacher/Teacher_quizzes.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBook,
  FaUser,
  FaChalkboardTeacher,
  FaBell,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPlay,
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaUpload,
  FaFileAlt,
  FaTasks,
  FaAward,
  FaCalendarCheck,
  FaFilter,
  FaPaperclip,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaQuestionCircle,
  FaListOl,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const Teacher_quizzes = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("quizzes");
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

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Tajweed Quiz - Lesson 1-3",
      subject: "Tajweed",
      class: "Class 8",
      description: "Test your knowledge of Tajweed rules from Lesson 1 to 3",
      questions: 10,
      duration: "20 min",
      status: "Published",
      attempts: 25,
      totalStudents: 30,
      averageScore: 78,
      createdAt: "2026-07-20",
      difficulty: "Medium",
      passMarks: 40,
      totalMarks: 100,
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha Quiz",
      subject: "Tafsir",
      class: "Class 9",
      description: "Test your understanding of Surah Al-Fatiha Tafsir",
      questions: 15,
      duration: "30 min",
      status: "Published",
      attempts: 18,
      totalStudents: 25,
      averageScore: 72,
      createdAt: "2026-07-22",
      difficulty: "Hard",
      passMarks: 50,
      totalMarks: 100,
    },
    {
      id: 3,
      title: "Hadith - 40 Hadith Quiz",
      subject: "Hadith",
      class: "Class 10",
      description: "Test your memorization of 40 Hadith Nawawi",
      questions: 20,
      duration: "40 min",
      status: "Draft",
      attempts: 0,
      totalStudents: 28,
      averageScore: 0,
      createdAt: "2026-07-18",
      difficulty: "Hard",
      passMarks: 60,
      totalMarks: 100,
    },
    {
      id: 4,
      title: "Fiqh - Wudu and Ghusl Quiz",
      subject: "Fiqh",
      class: "Class 7",
      description: "Test your knowledge of Wudu and Ghusl rules",
      questions: 8,
      duration: "15 min",
      status: "Published",
      attempts: 12,
      totalStudents: 20,
      averageScore: 82,
      createdAt: "2026-07-15",
      difficulty: "Easy",
      passMarks: 30,
      totalMarks: 50,
    },
    {
      id: 5,
      title: "Aqeedah - Tawheed Quiz",
      subject: "Aqeedah",
      class: "Class 6",
      description: "Test your understanding of Tawheed",
      questions: 12,
      duration: "20 min",
      status: "Pending",
      attempts: 5,
      totalStudents: 22,
      averageScore: 68,
      createdAt: "2026-07-19",
      difficulty: "Medium",
      passMarks: 35,
      totalMarks: 60,
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple",
      question: "What is the meaning of Tawheed?",
      options: ["Oneness of Allah", "Prayer", "Fasting", "Charity"],
      answer: "Oneness of Allah",
      marks: 5,
    },
    {
      id: 2,
      type: "multiple",
      question: "How many pillars of Islam are there?",
      options: ["3", "5", "7", "10"],
      answer: "5",
      marks: 5,
    },
    {
      id: 3,
      type: "truefalse",
      question: "Surah Al-Fatiha is the first chapter of the Quran",
      options: ["True", "False"],
      answer: "True",
      marks: 5,
    },
    {
      id: 4,
      type: "short",
      question: "What is the meaning of Salah?",
      options: [],
      answer: "Prayer",
      marks: 10,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    questions: "",
    duration: "",
    difficulty: "Medium",
    status: "Draft",
    passMarks: "",
    totalMarks: "",
  });
  const [questionForm, setQuestionForm] = useState({
    type: "multiple",
    question: "",
    options: ["", "", "", ""],
    answer: "",
    marks: 5,
  });

  // Load teacher info
  useEffect(() => {
    const savedTeacher = localStorage.getItem("teacherInfo");
    if (savedTeacher) {
      const teacher = JSON.parse(savedTeacher);
      setTeacherInfo(teacher);
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

  // Sidebar Menu Items
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

  // Handle search and filter
  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || q.status === filterStatus;
    const matchesClass = filterClass === "All" || q.class === filterClass;
    const matchesSubject =
      filterSubject === "All" || q.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  // Get unique values for filters
  const uniqueClasses = ["All", ...new Set(quizzes.map((q) => q.class))];
  const uniqueSubjects = ["All", ...new Set(quizzes.map((q) => q.subject))];

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle add quiz
  const handleAddQuiz = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.subject ||
      !formData.class ||
      !formData.questions
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newQuiz = {
      id: Date.now(),
      ...formData,
      questions: parseInt(formData.questions) || 0,
      attempts: 0,
      totalStudents: 0,
      averageScore: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setQuizzes([newQuiz, ...quizzes]);
    setShowAddModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Quiz Created!",
      text: "New quiz has been created successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit quiz
  const handleEditQuiz = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.subject ||
      !formData.class ||
      !formData.questions
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setQuizzes(
      quizzes.map((q) =>
        q.id === selectedQuiz.id
          ? {
              ...q,
              ...formData,
              questions: parseInt(formData.questions) || q.questions,
            }
          : q,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Quiz Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete quiz
  const handleDeleteQuiz = (id) => {
    Swal.fire({
      title: "Delete Quiz?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizzes(quizzes.filter((q) => q.id !== id));
        Swal.fire("Deleted!", "Quiz has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (q) => {
    setSelectedQuiz(q);
    setFormData({
      title: q.title,
      subject: q.subject,
      class: q.class,
      description: q.description || "",
      questions: q.questions,
      duration: q.duration,
      difficulty: q.difficulty,
      status: q.status,
      passMarks: q.passMarks,
      totalMarks: q.totalMarks,
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (q) => {
    setSelectedQuiz(q);
    setShowDetailsModal(true);
  };

  // Open questions modal
  const openQuestionsModal = (q) => {
    setSelectedQuiz(q);
    setShowQuestionsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      class: "",
      description: "",
      questions: "",
      duration: "",
      difficulty: "Medium",
      status: "Draft",
      passMarks: "",
      totalMarks: "",
    });
    setSelectedQuiz(null);
  };

  // Add question
  const handleAddQuestion = () => {
    if (!questionForm.question || !questionForm.answer) {
      Swal.fire({
        icon: "warning",
        title: "Please fill question and answer",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setQuestions([...questions, { ...questionForm, id: Date.now() }]);
    setQuestionForm({
      type: "multiple",
      question: "",
      options: ["", "", "", ""],
      answer: "",
      marks: 5,
    });
    Swal.fire({
      icon: "success",
      title: "Question Added!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Remove question
  const handleRemoveQuestion = (id) => {
    Swal.fire({
      title: "Remove Question?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestions(questions.filter((q) => q.id !== id));
        Swal.fire("Removed!", "Question has been removed.", "success");
      }
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Quizzes</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
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

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content - No Scroll */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <MdQuiz className="text-green-600" /> Quizzes
              </h1>
              <p className="text-xs text-gray-500">
                Create and manage quizzes for your students
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {teacherInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {quizzes.length}
              </p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {quizzes.filter((q) => q.status === "Published").length}
              </p>
              <p className="text-[10px] text-gray-500">Published</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {quizzes.filter((q) => q.status === "Draft").length}
              </p>
              <p className="text-[10px] text-gray-500">Draft</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-purple-600">
                {quizzes.reduce((sum, q) => sum + q.attempts, 0)}
              </p>
              <p className="text-[10px] text-gray-500">Attempts</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-orange-600">
                {Math.round(
                  quizzes.reduce((sum, q) => sum + q.averageScore, 0) /
                    quizzes.length || 0,
                )}
                %
              </p>
              <p className="text-[10px] text-gray-500">Avg Score</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-1.5 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {uniqueSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-0.5 transition-all"
                >
                  <FaPlusCircle size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
            {filteredQuizzes.slice(0, 6).map((q) => (
              <div
                key={q.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div
                  className={`h-1 ${
                    q.status === "Published"
                      ? "bg-green-500"
                      : q.status === "Draft"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                ></div>
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-xs mb-0.5 line-clamp-2">
                        {q.title}
                      </h3>
                      <p className="text-[10px] text-gray-500">{q.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(q.status)}`}
                      >
                        {q.status}
                      </span>
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded-full ${getDifficultyColor(q.difficulty)}`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1.5 space-y-0.5 text-[10px]">
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaChalkboardTeacher
                        className="text-gray-400"
                        size={10}
                      />{" "}
                      {q.class}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaQuestionCircle className="text-gray-400" size={10} />{" "}
                      {q.questions} Questions
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaClock className="text-gray-400" size={10} />{" "}
                      {q.duration}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaUsers className="text-gray-400" size={10} />{" "}
                      {q.attempts} Attempts
                    </p>
                  </div>

                  {/* Score Bar */}
                  {q.averageScore > 0 && (
                    <div className="mt-1.5">
                      <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                        <span>Average Score</span>
                        <span>{q.averageScore}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${q.averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-2 flex items-center gap-1 pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => openDetailsModal(q)}
                      className="text-green-600 hover:text-green-800 text-[10px] font-medium flex-1 text-center py-1 rounded border border-green-200 hover:bg-green-50 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openQuestionsModal(q)}
                      className="text-purple-600 hover:text-purple-800 text-[10px] font-medium py-1 px-2 rounded border border-purple-200 hover:bg-purple-50 transition-all"
                      title="Manage Questions"
                    >
                      <FaListOl size={12} />
                    </button>
                    <button
                      onClick={() => openEditModal(q)}
                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(q.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredQuizzes.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
              <MdQuiz className="text-4xl text-gray-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Quizzes Found
              </h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add Quiz Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-green-600" /> Create New Quiz
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddQuiz} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quiz title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quiz description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Questions *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.questions}
                    onChange={(e) =>
                      setFormData({ ...formData, questions: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 20 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    value={formData.passMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, passMarks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
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
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Quiz Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Quiz
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditQuiz} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quiz title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Tajweed">Tajweed</option>
                    <option value="Tafsir">Tafsir</option>
                    <option value="Hadith">Hadith</option>
                    <option value="Fiqh">Fiqh</option>
                    <option value="Aqeedah">Aqeedah</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quiz description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Questions *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.questions}
                    onChange={(e) =>
                      setFormData({ ...formData, questions: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 20 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    value={formData.passMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, passMarks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Quiz
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quiz Details Modal */}
      {showDetailsModal && selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdQuiz className="text-green-600" /> Quiz Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedQuiz.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedQuiz.subject} • {selectedQuiz.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedQuiz.status)}`}
                    >
                      {selectedQuiz.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(selectedQuiz.difficulty)}`}
                    >
                      {selectedQuiz.difficulty}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Questions</p>
                    <p className="font-semibold">{selectedQuiz.questions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{selectedQuiz.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pass Marks</p>
                    <p className="font-semibold">{selectedQuiz.passMarks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Marks</p>
                    <p className="font-semibold">{selectedQuiz.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-gray-700">
                      {selectedQuiz.description || "No description provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Quiz Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Students</span>
                        <span className="font-semibold">
                          {selectedQuiz.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Attempts</span>
                        <span className="font-semibold">
                          {selectedQuiz.attempts}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Average Score</span>
                        <span className="font-semibold text-green-600">
                          {selectedQuiz.averageScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Performance
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${selectedQuiz.averageScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">
                        {selectedQuiz.averageScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      <FaUsers className="inline mr-2" /> View Results
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedQuiz);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions Modal */}
      {showQuestionsModal && selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaListOl className="text-purple-600" /> Manage Questions -{" "}
                {selectedQuiz.title}
              </h3>
              <button
                onClick={() => setShowQuestionsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              {/* Add Question Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Add New Question
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={questionForm.type}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          type: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="multiple">Multiple Choice</option>
                      <option value="truefalse">True/False</option>
                      <option value="short">Short Answer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <input
                      type="number"
                      value={questionForm.marks}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          marks: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={questionForm.question}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        question: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter question"
                  />
                </div>
                {questionForm.type === "multiple" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i}>
                        <label className="block text-xs text-gray-500">
                          Option {String.fromCharCode(65 + i)}
                        </label>
                        <input
                          type="text"
                          value={questionForm.options[i] || ""}
                          onChange={(e) => {
                            const newOptions = [...questionForm.options];
                            newOptions[i] = e.target.value;
                            setQuestionForm({
                              ...questionForm,
                              options: newOptions,
                            });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Correct Answer
                  </label>
                  {questionForm.type === "multiple" ? (
                    <select
                      value={questionForm.answer}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          answer: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select correct answer</option>
                      {questionForm.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {String.fromCharCode(65 + i)}.{" "}
                          {opt || `Option ${String.fromCharCode(65 + i)}`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={questionForm.answer}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          answer: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter correct answer"
                    />
                  )}
                </div>
                <button
                  onClick={handleAddQuestion}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                >
                  <FaPlusCircle className="inline mr-1" size={14} /> Add
                  Question
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {questions.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-4">
                    No questions added yet
                  </p>
                ) : (
                  questions.map((q, index) => (
                    <div
                      key={q.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {index + 1}. {q.question}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {q.type}
                          </span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {q.marks} marks
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Answer: {q.answer}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove Question"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Questions Saved!",
                      text: `${questions.length} questions have been saved for ${selectedQuiz.title}`,
                      confirmButtonColor: "#004d4d",
                    });
                    setShowQuestionsModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  <FaCheckCircle className="inline mr-2" /> Save Questions
                </button>
                <button
                  onClick={() => setShowQuestionsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_quizzes;
