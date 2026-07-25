// src/Page/Teacher/Upload_videos.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCalendarCheck, // এই লাইনটি যোগ করা হয়েছে
  FaClock,
  FaUsers,
  FaBook,
  FaUser,
  FaChalkboardTeacher,
  FaBell,
  FaSignOutAlt,
  FaPlay,
  FaPen,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaUpload,
  FaYoutube,
  FaLink,
  FaFileAlt,
  FaTasks,
  FaInfoCircle,
  FaExclamationTriangle,
  FaThumbsUp,
  FaThumbsDown,
  FaHourglassHalf,
  FaAward,
  FaHistory,
  FaFileVideo,
  FaMoneyBillWave,
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

const Upload_videos = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("videos");
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

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Tajweed - Lesson 1: Introduction to Tajweed",
      course: "Tajweed",
      class: "Class 8",
      duration: "45:20",
      views: 120,
      uploadDate: "2026-01-15",
      status: "Published",
      description:
        "Learn the basic rules of Tajweed for Quran recitation. This video covers the introduction and importance of Tajweed.",
      thumbnail: null,
      videoUrl: "https://www.youtube.com/watch?v=example1",
      type: "YouTube",
      size: "245 MB",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Tafsir - Surah Al-Fatiha Detailed Explanation",
      course: "Tafsir",
      class: "Class 9",
      duration: "55:10",
      views: 85,
      uploadDate: "2026-01-20",
      status: "Published",
      description: "Detailed interpretation and explanation of Surah Al-Fatiha",
      thumbnail: null,
      videoUrl: "https://www.youtube.com/watch?v=example2",
      type: "YouTube",
      size: "320 MB",
      likes: 38,
      comments: 8,
    },
    {
      id: 3,
      title: "Hadith - 40 Hadith Nawawi (Part 1)",
      course: "Hadith",
      class: "Class 10",
      duration: "50:15",
      views: 65,
      uploadDate: "2026-01-25",
      status: "Published",
      description: "Study of the first 10 Hadith from 40 Hadith Nawawi",
      thumbnail: null,
      videoUrl: "https://www.youtube.com/watch?v=example3",
      type: "YouTube",
      size: "380 MB",
      likes: 28,
      comments: 6,
    },
    {
      id: 4,
      title: "Fiqh - Introduction to Wudu and Ghusl",
      course: "Fiqh",
      class: "Class 7",
      duration: "40:30",
      views: 45,
      uploadDate: "2026-02-01",
      status: "Draft",
      description: "Understanding the rules of Wudu and Ghusl in Islam",
      thumbnail: null,
      videoUrl: "",
      type: "Upload",
      size: "280 MB",
      likes: 0,
      comments: 0,
    },
    {
      id: 5,
      title: "Aqeedah - Tawheed Explained",
      course: "Aqeedah",
      class: "Class 6",
      duration: "35:45",
      views: 52,
      uploadDate: "2026-02-05",
      status: "Published",
      description: "Detailed explanation of Tawheed with examples",
      thumbnail: null,
      videoUrl: "https://www.youtube.com/watch?v=example5",
      type: "YouTube",
      size: "210 MB",
      likes: 22,
      comments: 4,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    class: "",
    description: "",
    duration: "",
    type: "Upload",
    videoUrl: "",
    videoFile: null,
    thumbnail: null,
    status: "Draft",
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
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || video.status === filterStatus;
    const matchesCourse =
      filterCourse === "All" || video.course === filterCourse;
    const matchesType = filterType === "All" || video.type === filterType;
    return matchesSearch && matchesStatus && matchesCourse && matchesType;
  });

  // Get unique values for filters
  const uniqueCourses = ["All", ...new Set(videos.map((v) => v.course))];
  const uniqueClasses = ["All", ...new Set(videos.map((v) => v.class))];
  const uniqueTypes = ["All", ...new Set(videos.map((v) => v.type))];

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

  // Get type badge color
  const getTypeColor = (type) => {
    switch (type) {
      case "YouTube":
        return "bg-red-100 text-red-700";
      case "Upload":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle upload video
  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.course || !formData.class) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    if (formData.type === "Upload" && !formData.videoFile) {
      Swal.fire({
        icon: "warning",
        title: "Please upload a video file",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    if (formData.type === "YouTube" && !formData.videoUrl) {
      Swal.fire({
        icon: "warning",
        title: "Please enter YouTube URL",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: formData.title,
      course: formData.course,
      class: formData.class,
      description: formData.description || "",
      duration: formData.duration || "00:00",
      views: 0,
      uploadDate: new Date().toISOString().split("T")[0],
      status: formData.status || "Draft",
      type: formData.type,
      videoUrl: formData.videoUrl || "",
      thumbnail: formData.thumbnail ? formData.thumbnail.name : null,
      size: formData.videoFile
        ? `${Math.round(formData.videoFile.size / (1024 * 1024))} MB`
        : "N/A",
      likes: 0,
      comments: 0,
    };

    setVideos([newVideo, ...videos]);
    setShowUploadModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Video Uploaded!",
      text: "Your video has been uploaded successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit video
  const handleEditVideo = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.course || !formData.class) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setVideos(
      videos.map((v) =>
        v.id === selectedVideo.id
          ? {
              ...v,
              title: formData.title,
              course: formData.course,
              class: formData.class,
              description: formData.description || "",
              duration: formData.duration || v.duration,
              status: formData.status || v.status,
              type: formData.type || v.type,
              videoUrl: formData.videoUrl || v.videoUrl,
            }
          : v,
      ),
    );
    setShowEditModal(false);
    resetForm();
    Swal.fire({
      icon: "success",
      title: "Video Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle delete video
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
        setVideos(videos.filter((v) => v.id !== id));
        Swal.fire("Deleted!", "Video has been deleted.", "success");
      }
    });
  };

  // Open edit modal
  const openEditModal = (video) => {
    setSelectedVideo(video);
    setFormData({
      title: video.title,
      course: video.course,
      class: video.class,
      description: video.description || "",
      duration: video.duration || "",
      type: video.type || "Upload",
      videoUrl: video.videoUrl || "",
      videoFile: null,
      thumbnail: null,
      status: video.status || "Draft",
    });
    setShowEditModal(true);
  };

  // Open details modal
  const openDetailsModal = (video) => {
    setSelectedVideo(video);
    setShowDetailsModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      course: "",
      class: "",
      description: "",
      duration: "",
      type: "Upload",
      videoUrl: "",
      videoFile: null,
      thumbnail: null,
      status: "Draft",
    });
    setSelectedVideo(null);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Video Upload</h1>
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
            overflow-y-auto
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

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaVideo className="text-purple-600" /> Video Upload
              </h1>
              <p className="text-sm text-gray-500">
                Upload and manage your video lectures
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {videos.length}
              </p>
              <p className="text-xs text-gray-500">Total Videos</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {videos.filter((v) => v.status === "Published").length}
              </p>
              <p className="text-xs text-gray-500">Published</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {videos.filter((v) => v.status === "Draft").length}
              </p>
              <p className="text-xs text-gray-500">Draft</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {videos.reduce((sum, v) => sum + v.views, 0)}
              </p>
              <p className="text-xs text-gray-500">Total Views</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                </select>
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {uniqueCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    resetForm();
                    setShowUploadModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <FaUpload /> Upload Video
                </button>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <FaPlay className="text-6xl text-white/50 hover:text-white transition-all cursor-pointer" />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(video.status)}`}
                    >
                      {video.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(video.type)}`}
                    >
                      {video.type}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {video.course} • {video.class}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" /> Uploaded:{" "}
                      {formatDate(video.uploadDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaEye className="text-gray-400" /> {video.views} views
                    </p>
                    <p className="flex items-center gap-2">
                      <FaThumbsUp className="text-gray-400" /> {video.likes}{" "}
                      likes
                    </p>
                    {video.size && (
                      <p className="flex items-center gap-2">
                        <FaFileAlt className="text-gray-400" /> {video.size}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openDetailsModal(video)}
                      className="text-purple-600 hover:text-purple-800 text-xs font-medium flex-1 text-center py-1.5 rounded-lg border border-purple-200 hover:bg-purple-50 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openEditModal(video)}
                      className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-all"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <FaVideo className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Videos Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
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
            <form onSubmit={handleUploadVideo} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
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
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter video description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 45:20"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Upload" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === "Upload"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FaUpload className="mx-auto text-xl" />
                    <span className="text-xs font-medium">Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "YouTube" })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === "YouTube"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FaYoutube className="mx-auto text-xl" />
                    <span className="text-xs font-medium">YouTube URL</span>
                  </button>
                </div>
              </div>

              {formData.type === "Upload" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setFormData({
                            ...formData,
                            videoFile: e.target.files[0],
                          });
                        }
                      }}
                      className="hidden"
                      id="videoFile"
                      required={formData.type === "Upload"}
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
                  {formData.videoFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.videoFile.name}
                    </p>
                  )}
                </div>
              )}

              {formData.type === "YouTube" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    required={formData.type === "YouTube"}
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFormData({
                        ...formData,
                        thumbnail: e.target.files[0],
                      });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 5MB)</p>
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

      {/* Edit Video Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Edit Video
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditVideo} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
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
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Course</option>
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter video description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 45:20"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Upload" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === "Upload"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FaUpload className="mx-auto text-xl" />
                    <span className="text-xs font-medium">Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "YouTube" })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === "YouTube"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FaYoutube className="mx-auto text-xl" />
                    <span className="text-xs font-medium">YouTube URL</span>
                  </button>
                </div>
              </div>

              {formData.type === "YouTube" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Update Video
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

      {/* Video Details Modal */}
      {showDetailsModal && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaFileVideo className="text-purple-600" /> Video Details
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
                  <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <FaPlay className="text-6xl text-white/50" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedVideo.course} • {selectedVideo.class}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedVideo.status)}`}
                    >
                      {selectedVideo.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(selectedVideo.type)}`}
                    >
                      {selectedVideo.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-gray-700">
                      {selectedVideo.description || "No description provided"}
                    </p>
                  </div>
                  {selectedVideo.videoUrl && (
                    <div>
                      <p className="text-xs text-gray-500">Video URL</p>
                      <a
                        href={selectedVideo.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1"
                      >
                        <FaLink /> Watch Video
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Video Statistics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Views</span>
                        <span className="font-semibold">
                          {selectedVideo.views}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Likes</span>
                        <span className="font-semibold text-green-600">
                          {selectedVideo.likes}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Comments</span>
                        <span className="font-semibold text-blue-600">
                          {selectedVideo.comments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-semibold">
                          {selectedVideo.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size</span>
                        <span className="font-semibold">
                          {selectedVideo.size}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Upload Date</span>
                        <span className="font-semibold">
                          {formatDate(selectedVideo.uploadDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (selectedVideo.videoUrl) {
                          window.open(selectedVideo.videoUrl, "_blank");
                        } else {
                          Swal.fire({
                            icon: "info",
                            title: "Watch Video",
                            text: "Video URL is not available",
                            confirmButtonColor: "#004d4d",
                          });
                        }
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      <FaPlay className="inline mr-2" /> Watch Video
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        openEditModal(selectedVideo);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
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
    </div>
  );
};

export default Upload_videos;
