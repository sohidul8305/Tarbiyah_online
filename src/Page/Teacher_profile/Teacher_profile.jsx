// src/Page/Teacher/TeacherProfile.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaEnvelope,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEdit,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaSave,
  FaTimes,
  FaCamera,
  FaUser,
  FaBook,
  FaTasks,
  FaBell,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaPlay,
  FaPen,
  FaSpinner,
  FaBars,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdGrade,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";
import axios from "axios";

// ✅ FIX: Use direct URL or check for environment variable safely
// For Create React App (CRA) - This will work in development
const API_URL =
  typeof process !== "undefined" && process.env?.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000";

// OR if you're using Vite, use this instead:
// const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000";

// OR simply use direct URL (easiest fix):
// const API_URL = "http://localhost:5000";

const TeacherProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    bio: "",
    joinDate: "",
    totalStudents: "",
    totalCourses: "",
    rating: "",
    education: [],
    expertise: [],
    courses: [],
    achievements: [],
    photo: "",
  });

  const [editData, setEditData] = useState({ ...teacher });

  // Load teacher profile from API
  useEffect(() => {
    if (user?.email) {
      fetchTeacherProfile(user.email);
    }
  }, [user]);

  const fetchTeacherProfile = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/api/teacher/profile/${email}`,
      );

      if (response.data.success) {
        const teacherData = response.data.teacher;
        setTeacher(teacherData);
        setEditData(teacherData);
      }
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
      // If API fails, use default data
      const defaultData = {
        name: user?.displayName || "শায়খ ড. মাওলানা মুহাম্মদ আব্দুল্লাহ",
        title:
          "প্রধান উস্তাদ ও বিভাগীয় প্রধান - তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
        email: user?.email || "",
        phone: "+৮৮০ ১৭০০ ১২৩৪৫৬",
        bio: "আল-আজহার বিশ্ববিদ্যালয় থেকে হাদিস ও শরিয়াহর ওপর উচ্চতর ডিগ্রি অর্জন করেছেন। দীর্ঘ ১৫ বছরেরও বেশি সময় ধরে কওমি মাদরাসা এবং অনলাইন প্ল্যাটফর্মে ইসলামিক স্টাডিজ ও আরবি ভাষা শিক্ষাদানে নিয়োজিত আছেন।",
        joinDate: "জানুয়ারি ২০২০",
        totalStudents: "১৫০+",
        totalCourses: "৮টি",
        rating: "৪.৯",
        education: [
          {
            degree: "পিএইচডি (Hadith & Islamic Studies)",
            institution: "আল-আজহার বিশ্ববিদ্যালয়, মিসর",
            year: "২০১৮",
          },
          {
            degree: "মাস্টার্স (Tafseer & Quranic Sciences)",
            institution: "ইসলামী বিশ্ববিদ্যালয়, কুষ্টিয়া",
            year: "২০১২",
          },
          {
            degree: "দাওরায়ে হাদিস (তাকমীল)",
            institution: "জামিয়া আরামিয়া দারুল উলুম",
            year: "২০০৯",
          },
        ],
        expertise: [
          "হাদিস শাস্ত্র",
          "উসূলে ফিকহ",
          "আরবি ব্যাকরণ (নাহু-সরফ)",
          "তাফসিরুল কুরআন",
        ],
        courses: [
          {
            title: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
            students: "৪৫ জন",
            duration: "৪ বছর",
            icon: "📚",
          },
          {
            title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
            students: "৬০ জন",
            duration: "১ বছর",
            icon: "🎓",
          },
          {
            title: "কুরআন ফর এল্ডারস",
            students: "২৫ জন",
            duration: "৬ মাস",
            icon: "📖",
          },
        ],
        achievements: [
          "বেস্ট অনলাইন শিক্ষক পুরস্কার ২০২৩",
          "হাদিস গবেষণায় স্বর্ণপদক - ২০১৮",
          "শিক্ষাক্ষেত্রে অবদানের জন্য সম্মাননা - ২০২১",
        ],
      };
      setTeacher(defaultData);
      setEditData(defaultData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Show loading
      Swal.fire({
        title: "আপডেট হচ্ছে...",
        text: "দয়া করে অপেক্ষা করুন",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.put(
        `${API_URL}/api/teacher/profile/${user.email}`,
        editData,
      );

      if (response.data.success) {
        setTeacher(editData);
        setIsEditing(false);

        Swal.fire({
          icon: "success",
          title: "✅ প্রোফাইল আপডেট হয়েছে!",
          text: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Swal.fire({
        icon: "error",
        title: "আপডেট ব্যর্থ!",
        text: error.response?.data?.message || "আবার চেষ্টা করুন।",
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setEditData({ ...teacher });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...teacher });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...editData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEditData({ ...editData, education: newEducation });
  };

  const addEducation = () => {
    setEditData({
      ...editData,
      education: [
        ...editData.education,
        { degree: "", institution: "", year: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = editData.education.filter((_, i) => i !== index);
    setEditData({ ...editData, education: newEducation });
  };

  const handleExpertiseChange = (index, value) => {
    const newExpertise = [...editData.expertise];
    newExpertise[index] = value;
    setEditData({ ...editData, expertise: newExpertise });
  };

  const addExpertise = () => {
    setEditData({
      ...editData,
      expertise: [...editData.expertise, ""],
    });
  };

  const removeExpertise = (index) => {
    const newExpertise = editData.expertise.filter((_, i) => i !== index);
    setEditData({ ...editData, expertise: newExpertise });
  };

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
      label: "Student Progress",
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

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>,
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ☆
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>,
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="text-4xl text-teal-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <h1 className="text-sm font-bold text-gray-800">Teacher Profile</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
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
          {/* Sidebar Header */}
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {teacher.name?.charAt(0) || "T"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{teacher.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {teacher.title?.split("-")[0] || "Teacher"}
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

          {/* Sidebar Footer */}
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
        <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
          {/* Top Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Teacher Profile
              </h1>
              <p className="text-sm text-gray-500">
                View and manage your profile information
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {teacher.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="space-y-6 pb-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-32 md:h-40 relative">
                <button
                  onClick={handleEditToggle}
                  disabled={isSaving}
                  className={`absolute top-4 right-4 ${
                    isEditing
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-white/20 hover:bg-white/30"
                  } text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? (
                    <FaSpinner className="animate-spin" />
                  ) : isEditing ? (
                    <FaSave />
                  ) : (
                    <FaEdit />
                  )}
                  {isSaving
                    ? "সেভ হচ্ছে..."
                    : isEditing
                      ? "সেভ করুন"
                      : "এডিট প্রোফাইল"}
                </button>

                {isEditing && !isSaving && (
                  <button
                    onClick={handleCancelEdit}
                    className="absolute top-4 right-36 bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm"
                  >
                    <FaTimes /> বাতিল
                  </button>
                )}
              </div>

              <div className="px-6 md:px-8 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12">
                <div className="relative">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white p-1.5 shadow-lg border-4 border-white flex items-center justify-center text-6xl bg-teal-50">
                    {teacher.photo ? (
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <span>👨‍🏫</span>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => {
                        // Photo upload functionality
                        Swal.fire({
                          title: "প্রোফাইল ছবি আপডেট",
                          input: "url",
                          inputLabel: "ছবির URL লিখুন",
                          inputPlaceholder: "https://example.com/photo.jpg",
                          showCancelButton: true,
                          confirmButtonColor: "#004d4d",
                          confirmButtonText: "আপডেট করুন",
                          cancelButtonText: "বাতিল",
                          preConfirm: async (url) => {
                            if (!url) {
                              Swal.showValidationMessage("URL প্রয়োজন!");
                              return;
                            }
                            try {
                              await axios.post(
                                `${API_URL}/api/teacher/profile/${user.email}/photo`,
                                { photoUrl: url },
                              );
                              setEditData({ ...editData, photo: url });
                              setTeacher({ ...teacher, photo: url });
                              Swal.fire({
                                icon: "success",
                                title: "ছবি আপডেট হয়েছে!",
                                timer: 1500,
                                showConfirmButton: false,
                              });
                            } catch (error) {
                              Swal.showValidationMessage("ছবি আপডেট ব্যর্থ!");
                            }
                          },
                        });
                      }}
                      className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-teal-700 transition-all"
                    >
                      <FaCamera className="text-xs" />
                    </button>
                  )}
                </div>

                <div className="text-center md:text-left flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ""}
                      onChange={handleInputChange}
                      className="text-2xl md:text-3xl font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-md"
                    />
                  ) : (
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {teacher.name}
                      </h1>
                      <MdVerified className="text-blue-500 text-xl" />
                    </div>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      name="title"
                      value={editData.title || ""}
                      onChange={handleInputChange}
                      className="text-[#004d4d] font-medium text-sm md:text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-md mt-1"
                    />
                  ) : (
                    <p className="text-[#004d4d] font-medium text-sm md:text-base mt-1">
                      {teacher.title}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm text-gray-500">
                    {isEditing ? (
                      <>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <FaEnvelope className="text-teal-600" />
                          <input
                            type="email"
                            name="email"
                            value={editData.email || ""}
                            onChange={handleInputChange}
                            className="bg-transparent border-none text-sm focus:outline-none w-40"
                          />
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <FaPhoneAlt className="text-teal-600" />
                          <input
                            type="text"
                            name="phone"
                            value={editData.phone || ""}
                            onChange={handleInputChange}
                            className="bg-transparent border-none text-sm focus:outline-none w-32"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <FaEnvelope className="text-teal-600" />{" "}
                          {teacher.email}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <FaPhoneAlt className="text-teal-600" />{" "}
                          {teacher.phone}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                          <FaCalendarAlt className="text-teal-600" /> জয়েন:{" "}
                          {teacher.joinDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "মোট শিক্ষার্থী",
                  value: teacher.totalStudents,
                  icon: <FaUserGraduate />,
                  color: "blue",
                },
                {
                  label: "মোট কোর্স",
                  value: teacher.totalCourses,
                  icon: <FaBookOpen />,
                  color: "green",
                },
                {
                  label: "অভিজ্ঞতা",
                  value: "১৫+ বছর",
                  icon: <FaClock />,
                  color: "purple",
                },
                {
                  label: "রেটিং",
                  value: teacher.rating,
                  icon: renderStars(parseFloat(teacher.rating)),
                  color: "yellow",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-${stat.color}-50 p-4 rounded-xl shadow-sm border border-${stat.color}-100 hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-${stat.color}-600 text-xl`}>
                      {stat.icon}
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      {typeof stat.value === "string" &&
                      stat.value.includes("★")
                        ? ""
                        : stat.value}
                    </span>
                  </div>
                  {typeof stat.value === "string" &&
                    stat.value.includes("★") && (
                      <div className="text-sm mt-1">{stat.value}</div>
                    )}
                  <p className="text-xs text-gray-600 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Rest of the content remains the same... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                    <span className="text-teal-600">📝</span> সংক্ষিপ্ত পরিচিতি
                  </h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editData.bio || ""}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full text-gray-600 text-sm leading-relaxed bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {teacher.bio}
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                    <span className="text-teal-600">🎯</span> বিশেষজ্ঞতা
                  </h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {editData.expertise?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleExpertiseChange(index, e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeExpertise(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addExpertise}
                        className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
                      >
                        + যোগ করুন
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {teacher.expertise?.map((item, index) => (
                        <span
                          key={index}
                          className="bg-teal-50 text-[#004d4d] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-teal-100"
                        >
                          <FaCheckCircle className="text-xs text-teal-600" />{" "}
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                    <span className="text-yellow-500">🏆</span> অর্জনসমূহ
                  </h3>
                  <div className="space-y-2">
                    {teacher.achievements?.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100"
                      >
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <span className="text-sm text-gray-700">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                    <span className="text-blue-600">🌐</span> সামাজিক যোগাযোগ
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: <FaGlobe />, color: "blue", label: "ওয়েবসাইট" },
                      {
                        icon: <FaFacebook />,
                        color: "blue-700",
                        label: "ফেসবুক",
                      },
                      {
                        icon: <FaTwitter />,
                        color: "blue-400",
                        label: "টুইটার",
                      },
                      {
                        icon: <FaLinkedin />,
                        color: "blue-600",
                        label: "লিঙ্কডইন",
                      },
                    ].map((social, index) => (
                      <button
                        key={index}
                        className={`bg-${social.color}/10 text-${social.color} p-2.5 rounded-lg hover:bg-${social.color}/20 transition-all border border-${social.color}/20`}
                        title={social.label}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <FaGraduationCap className="text-teal-600 text-xl" />{" "}
                    শিক্ষাগত যোগ্যতা
                  </h3>
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        {editData.education?.map((edu, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-xl bg-gray-50 border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-800 text-sm">
                                শিক্ষা #{index + 1}
                              </h4>
                              <button
                                onClick={() => removeEducation(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="ডিগ্রী"
                                value={edu.degree}
                                onChange={(e) =>
                                  handleEducationChange(
                                    index,
                                    "degree",
                                    e.target.value,
                                  )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                              />
                              <input
                                type="text"
                                placeholder="প্রতিষ্ঠান"
                                value={edu.institution}
                                onChange={(e) =>
                                  handleEducationChange(
                                    index,
                                    "institution",
                                    e.target.value,
                                  )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                              />
                              <input
                                type="text"
                                placeholder="সাল"
                                value={edu.year}
                                onChange={(e) =>
                                  handleEducationChange(
                                    index,
                                    "year",
                                    e.target.value,
                                  )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addEducation}
                          className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
                        >
                          + নতুন শিক্ষা যোগ করুন
                        </button>
                      </>
                    ) : (
                      teacher.education?.map((edu, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all"
                        >
                          <div className="p-3 bg-teal-100 text-teal-700 rounded-xl shadow-sm">
                            <FaAward className="text-xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm md:text-base">
                              {edu.degree}
                            </h4>
                            <p className="text-gray-600 text-sm mt-0.5">
                              {edu.institution}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-block text-xs font-semibold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
                                📅 {edu.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <FaChalkboardTeacher className="text-teal-600 text-xl" />{" "}
                    পরিচালিত কোর্সসমূহ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.courses?.map((course, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{course.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm group-hover:text-teal-700 transition-colors">
                              {course.title}
                            </h4>
                            <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                              <span className="flex items-center gap-1">
                                <FaUserGraduate className="text-teal-600" />{" "}
                                {course.students}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock className="text-teal-600" />{" "}
                                {course.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-2xl border border-teal-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-teal-600">⚡</span> দ্রুত কর্ম
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      {
                        label: "প্রোফাইল সম্পাদনা",
                        icon: "✏️",
                        color: "blue",
                        action: handleEditToggle,
                      },
                      {
                        label: "পাসওয়ার্ড পরিবর্তন",
                        icon: "🔒",
                        color: "red",
                        action: () => {
                          Swal.fire({
                            icon: "info",
                            title: "পাসওয়ার্ড পরিবর্তন",
                            text: "এই ফিচারটি শীঘ্রই আসছে!",
                            confirmButtonColor: "#004d4d",
                          });
                        },
                      },
                      {
                        label: "সেটিংস",
                        icon: "⚙️",
                        color: "gray",
                        action: () => {
                          Swal.fire({
                            icon: "info",
                            title: "সেটিংস",
                            text: "এই ফিচারটি শীঘ্রই আসছে!",
                            confirmButtonColor: "#004d4d",
                          });
                        },
                      },
                      {
                        label: "সাপোর্ট",
                        icon: "💬",
                        color: "green",
                        action: () => {
                          Swal.fire({
                            icon: "info",
                            title: "সাপোর্ট",
                            text: "এই ফিচারটি শীঘ্রই আসছে!",
                            confirmButtonColor: "#004d4d",
                          });
                        },
                      },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`bg-${item.color}-50 hover:bg-${item.color}-100 p-3 rounded-lg border border-${item.color}-100 text-center transition-all`}
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <p className="text-xs font-medium text-gray-700 mt-1">
                          {item.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherProfile;
