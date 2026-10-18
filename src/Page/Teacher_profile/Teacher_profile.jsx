// src/Page/Teacher_profile/Teacher_profile.jsx
import React, { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaEnvelope,
  FaPhoneAlt,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaEdit,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaSave,
  FaTimes,
  FaCamera,
  FaSpinner,
  FaPlus,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuth } from "../../Provider/AuthProvider";

const API_BASE =
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.tarbiyahonline.com");

const TeacherProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const teacherEmail =
    user?.email ||
    (typeof window !== "undefined" && localStorage.getItem("teacherEmail")) ||
    "";

  // ✅ খালি প্রোফাইল টেমপ্লেট (ডামি ডেটা সরানো হয়েছে)
  const buildEmptyProfile = () => ({
    name: user?.displayName || "",
    title: "",
    email: teacherEmail || "",
    phone: "",
    bio: "",
    joinDate: "",
    totalStudents: "0",
    totalCourses: "0",
    rating: "0",
    photo: "",
    department: "",
    address: "",
    education: [],
    expertise: [],
    courses: [],
    achievements: [],
  });

  const [teacher, setTeacher] = useState(buildEmptyProfile);
  const [editData, setEditData] = useState(buildEmptyProfile);

  const mapBackendToLocal = (profile, defaults) => ({
    name: profile.name || defaults.name,
    title: profile.designation || profile.title || defaults.title,
    email: profile.email || defaults.email,
    phone: profile.phone || defaults.phone,
    bio: profile.bio || defaults.bio,
    joinDate: profile.joinDate || defaults.joinDate,
    photo: profile.profileImage || profile.photo || "",
    department: profile.department || "",
    address: profile.address || "",
    totalStudents: profile.totalStudents || "0",
    totalCourses: profile.totalCourses || "0",
    rating: profile.rating || "0",
    education: Array.isArray(profile.education) ? profile.education : [],
    expertise: Array.isArray(profile.expertise) ? profile.expertise : [],
    courses: Array.isArray(profile.courses) ? profile.courses : [],
    achievements: Array.isArray(profile.achievements)
      ? profile.achievements
      : [],
  });

  const mapLocalToBackend = (data) => ({
    email: data.email,
    name: data.name,
    phone: data.phone,
    designation: data.title,
    department: data.department || "",
    joinDate: data.joinDate,
    bio: data.bio,
    address: data.address || "",
    profileImage: data.photo || "",
    totalStudents: data.totalStudents,
    totalCourses: data.totalCourses,
    rating: data.rating,
    education: data.education,
    expertise: data.expertise,
    courses: data.courses,
    achievements: data.achievements,
  });

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const defaults = buildEmptyProfile();

      if (teacherEmail) {
        try {
          const res = await fetch(
            `${API_BASE}/api/teacher-profile/${encodeURIComponent(teacherEmail)}`,
          );

          if (res.status === 404) {
            // ✅ নতুন টিচার: কোনো প্রোফাইল নেই, তাই সরাসরি এডিট মোড অন করব
            setTeacher(defaults);
            setEditData(defaults);
            setIsEditing(true);
            setIsLoading(false);
            return;
          }

          const data = await res.json();
          if (data.success && data.profile) {
            const merged = mapBackendToLocal(data.profile, defaults);
            setTeacher(merged);
            setEditData(merged);
            localStorage.setItem("teacherInfo", JSON.stringify(merged));
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("⚠️ Backend profile fetch failed:", err);
        }
      }

      // Fallback (যদি সার্ভার ডাউন থাকে)
      const saved = localStorage.getItem("teacherInfo");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTeacher(parsed);
          setEditData(parsed);
          setIsLoading(false);
          return;
        } catch (e) {}
      }

      setTeacher(defaults);
      setEditData(defaults);
      setIsEditing(true); // ডেটা না পেলে এডিট মোড অন
      setIsLoading(false);
    };

    loadProfile();
  }, [teacherEmail]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const email = editData.email || teacherEmail;

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email missing",
        text: "Please login again.",
      });
      setIsSaving(false);
      return;
    }

    if (!editData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name is required",
        text: "Please enter your name to create the profile.",
      });
      setIsSaving(false);
      return;
    }

    const mergedLocal = { ...editData, email };

    try {
      const res = await fetch(`${API_BASE}/api/teacher-profile/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapLocalToBackend(mergedLocal)),
      });
      const data = await res.json();

      if (data.success) {
        setTeacher(mergedLocal);
        setEditData(mergedLocal);
        localStorage.setItem("teacherInfo", JSON.stringify(mergedLocal));
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "✅ প্রোফাইল তৈরি/আপডেট হয়েছে!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to save");
      }
    } catch (err) {
      console.error("❌ Backend save error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save to server. Check your connection.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) handleSaveProfile();
    else {
      setEditData({ ...teacher });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    // যদি প্রোফাইলে নাম না থাকে, তার মানে সে নতুন। তাকে ক্যানসেল করতে দিলে খালি পেইজ দেখাবে।
    if (!teacher.name) {
      Swal.fire({
        icon: "info",
        title: "Profile is empty",
        text: "Please create your profile to continue.",
        confirmButtonColor: "#004d4d",
      });
      return;
    }
    setIsEditing(false);
    setEditData({ ...teacher });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // --- Education Handlers ---
  const handleEducationChange = (index, field, value) => {
    const next = [...editData.education];
    next[index] = { ...next[index], [field]: value };
    setEditData({ ...editData, education: next });
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
    setEditData({
      ...editData,
      education: editData.education.filter((_, i) => i !== index),
    });
  };

  // --- Expertise Handlers ---
  const handleExpertiseChange = (index, value) => {
    const next = [...editData.expertise];
    next[index] = value;
    setEditData({ ...editData, expertise: next });
  };
  const addExpertise = () => {
    setEditData({ ...editData, expertise: [...editData.expertise, ""] });
  };
  const removeExpertise = (index) => {
    setEditData({
      ...editData,
      expertise: editData.expertise.filter((_, i) => i !== index),
    });
  };

  // --- Achievements Handlers ---
  const handleAchievementChange = (index, value) => {
    const next = [...editData.achievements];
    next[index] = value;
    setEditData({ ...editData, achievements: next });
  };
  const addAchievement = () => {
    setEditData({ ...editData, achievements: [...editData.achievements, ""] });
  };
  const removeAchievement = (index) => {
    setEditData({
      ...editData,
      achievements: editData.achievements.filter((_, i) => i !== index),
    });
  };

  // --- Courses Handlers ---
  const handleCourseChange = (index, field, value) => {
    const next = [...editData.courses];
    next[index] = { ...next[index], [field]: value };
    setEditData({ ...editData, courses: next });
  };
  const addCourse = () => {
    setEditData({
      ...editData,
      courses: [
        ...editData.courses,
        { title: "", students: "", duration: "", icon: "📚" },
      ],
    });
  };
  const removeCourse = (index) => {
    setEditData({
      ...editData,
      courses: editData.courses.filter((_, i) => i !== index),
    });
  };

  const handlePhotoChange = () => {
    Swal.fire({
      title: "প্রোফাইল ছবি আপডেট",
      input: "url",
      inputLabel: "ছবির URL লিখুন",
      inputPlaceholder: "https://example.com/photo.jpg",
      showCancelButton: true,
      confirmButtonColor: "#004d4d",
      confirmButtonText: "সেট করুন",
      cancelButtonText: "বাতিল",
      inputValidator: (url) => {
        if (!url) return "URL প্রয়োজন!";
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setEditData({ ...editData, photo: result.value });
      }
    });
  };

  const renderStars = (rating) => {
    const num = parseFloat(rating) || 0;
    return [1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={i <= Math.round(num) ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200 mt-6">
        <FaSpinner className="text-4xl text-teal-600 animate-spin mx-auto" />
        <p className="mt-4 text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-32 md:h-40 relative">
          <button
            onClick={handleEditToggle}
            disabled={isSaving}
            className={`absolute top-4 right-4 ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-white/20 hover:bg-white/30"
            } text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm ${
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

          {isEditing && !isSaving && teacher.name && (
            <button
              onClick={handleCancelEdit}
              className="absolute top-4 right-40 bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm"
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
                  alt={teacher.name || "Teacher"}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <span>👨‍🏫</span>
              )}
            </div>
            {isEditing && (
              <button
                onClick={handlePhotoChange}
                className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-teal-700 transition-all"
                title="Change Photo"
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
                placeholder="আপনার নাম লিখুন *"
                value={editData.name || ""}
                onChange={handleInputChange}
                className="text-2xl md:text-3xl font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-md focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {teacher.name || "New Teacher"}
                </h1>
                {teacher.name && (
                  <MdVerified className="text-blue-500 text-xl" />
                )}
              </div>
            )}

            {isEditing ? (
              <input
                type="text"
                name="title"
                placeholder="আপনার পদবি / ডেজিগনেশন লিখুন (যেমন: সিনিয়র শিক্ষক)"
                value={editData.title || ""}
                onChange={handleInputChange}
                className="text-[#004d4d] font-medium text-sm md:text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-md mt-1 focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-[#004d4d] font-medium text-sm md:text-base mt-1">
                {teacher.title || "শিক্ষক"}
              </p>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm text-gray-500">
              {isEditing ? (
                <>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-300">
                    <FaEnvelope className="text-teal-600" />
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ""}
                      readOnly
                      className="bg-transparent border-none text-sm focus:outline-none w-48 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-300">
                    <FaPhoneAlt className="text-teal-600" />
                    <input
                      type="text"
                      name="phone"
                      placeholder="ফোন নম্বর"
                      value={editData.phone || ""}
                      onChange={handleInputChange}
                      className="bg-transparent border-none text-sm focus:outline-none w-36"
                    />
                  </div>
                </>
              ) : (
                <>
                  {teacher.email && (
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                      <FaEnvelope className="text-teal-600" /> {teacher.email}
                    </span>
                  )}
                  {teacher.phone && (
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                      <FaPhoneAlt className="text-teal-600" /> {teacher.phone}
                    </span>
                  )}
                  {teacher.joinDate && (
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                      <FaCalendarAlt className="text-teal-600" /> জয়েন:{" "}
                      {teacher.joinDate}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "মোট শিক্ষার্থী",
            value: teacher.totalStudents || "0",
            icon: <FaUserGraduate />,
            bg: "bg-blue-50",
            border: "border-blue-100",
            color: "text-blue-600",
          },
          {
            label: "মোট কোর্স",
            value: teacher.totalCourses || "0",
            icon: <FaBookOpen />,
            bg: "bg-green-50",
            border: "border-green-100",
            color: "text-green-600",
          },
          {
            label: "অভিজ্ঞতা",
            value: "শীঘ্রই",
            icon: <FaClock />,
            bg: "bg-purple-50",
            border: "border-purple-100",
            color: "text-purple-600",
          },
          {
            label: "রেটিং",
            value: teacher.rating || "0",
            icon: <span className="text-yellow-500">★</span>,
            bg: "bg-yellow-50",
            border: "border-yellow-100",
            color: "text-yellow-600",
            showStars: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${stat.bg} p-4 rounded-xl shadow-sm border ${stat.border} hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className={`${stat.color} text-xl`}>{stat.icon}</span>
              <span className="text-lg font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
            {stat.showStars && (
              <div className="text-sm mt-1">{renderStars(teacher.rating)}</div>
            )}
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Bio, Expertise, Achievements) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
              <span className="text-teal-600">📝</span> সংক্ষিপ্ত পরিচিতি
            </h3>
            {isEditing ? (
              <textarea
                name="bio"
                placeholder="আপনার সম্পর্কে সংক্ষেপে লিখুন..."
                value={editData.bio || ""}
                onChange={handleInputChange}
                rows="5"
                className="w-full text-gray-600 text-sm leading-relaxed bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {teacher.bio || "কোনো পরিচিতি যোগ করা হয়নি।"}
              </p>
            )}
          </div>

          {/* Expertise */}
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
                      placeholder="যেমন: হাদিস শাস্ত্র"
                      value={item}
                      onChange={(e) =>
                        handleExpertiseChange(index, e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={() => removeExpertise(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addExpertise}
                  className="text-teal-600 hover:text-teal-700 text-sm font-semibold flex items-center gap-1 mt-2"
                >
                  <FaPlus size={12} /> নতুন স্কিল যোগ করুন
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {teacher.expertise?.length > 0 ? (
                  teacher.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="bg-teal-50 text-[#004d4d] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-teal-100"
                    >
                      <FaCheckCircle className="text-xs text-teal-600" /> {item}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    কোনো স্কিল যোগ করা হয়নি।
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
              <span className="text-yellow-500">🏆</span> অর্জনসমূহ
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                {editData.achievements?.map((achieve, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="যেমন: বেস্ট টিচার অ্যাওয়ার্ড ২০২৪"
                      value={achieve}
                      onChange={(e) =>
                        handleAchievementChange(index, e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      onClick={() => removeAchievement(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addAchievement}
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold flex items-center gap-1 mt-2"
                >
                  <FaPlus size={12} /> নতুন অর্জন যোগ করুন
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {teacher.achievements?.length > 0 ? (
                  teacher.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100"
                    >
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="text-sm text-gray-700">
                        {achievement}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    কোনো অর্জন যোগ করা হয়নি।
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Education, Courses) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Education */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
              <FaGraduationCap className="text-teal-600 text-xl" /> শিক্ষাগত
              যোগ্যতা
            </h3>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  {editData.education?.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-200 relative"
                    >
                      <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                      <h4 className="font-bold text-gray-800 text-sm mb-3">
                        শিক্ষা #{index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="ডিগ্রী (যেমন: কামিল)"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value,
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
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
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                          type="text"
                          placeholder="সাল (যেমন: ২০২০)"
                          value={edu.year}
                          onChange={(e) =>
                            handleEducationChange(index, "year", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="text-teal-600 hover:text-teal-700 text-sm font-semibold flex items-center gap-1"
                  >
                    <FaPlus size={12} /> নতুন শিক্ষা যোগ করুন
                  </button>
                </>
              ) : teacher.education?.length > 0 ? (
                teacher.education.map((edu, index) => (
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
                      <span className="inline-block text-xs font-semibold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full mt-2">
                        📅 {edu.year}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  কোনো শিক্ষাগত তথ্য যোগ করা হয়নি।
                </p>
              )}
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
              <FaChalkboardTeacher className="text-teal-600 text-xl" /> পরিচালিত
              কোর্সসমূহ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  {editData.courses?.map((course, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-gray-200 bg-gray-50 relative"
                    >
                      <button
                        onClick={() => removeCourse(index)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                      <div className="space-y-2 mt-2">
                        <input
                          type="text"
                          placeholder="কোর্সের নাম (যেমন: তাজবীদ)"
                          value={course.title}
                          onChange={(e) =>
                            handleCourseChange(index, "title", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                          type="text"
                          placeholder="শিক্ষার্থী সংখ্যা"
                          value={course.students}
                          onChange={(e) =>
                            handleCourseChange(
                              index,
                              "students",
                              e.target.value,
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                          type="text"
                          placeholder="সময়কাল (যেমন: ৬ মাস)"
                          value={course.duration}
                          onChange={(e) =>
                            handleCourseChange(
                              index,
                              "duration",
                              e.target.value,
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addCourse}
                    className="text-teal-600 hover:text-teal-700 text-sm font-semibold flex items-center justify-center gap-1 border-2 border-dashed border-teal-300 rounded-xl p-4 hover:bg-teal-50 transition-all"
                  >
                    <FaPlus size={14} /> নতুন কোর্স যোগ করুন
                  </button>
                </>
              ) : teacher.courses?.length > 0 ? (
                teacher.courses.map((course, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{course.icon || "📚"}</span>
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
                ))
              ) : (
                <p className="text-gray-400 text-sm col-span-full">
                  কোনো কোর্সের তথ্য যোগ করা হয়নি।
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
