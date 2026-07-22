// src/Page/Teacher/TeacherProfile.jsx
import React, { useState } from "react";
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
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Swal from "sweetalert2";

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "শায়খ ড. মাওলানা মুহাম্মদ আব্দুল্লাহ",
    title: "প্রধান উস্তাদ ও বিভাগীয় প্রধান - তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
    email: "abdullah@tarbiyahonline.com",
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
  });

  const [editData, setEditData] = useState({ ...teacher });

  const handleEditToggle = () => {
    if (isEditing) {
      setTeacher(editData);
      Swal.fire({
        icon: "success",
        title: "প্রোফাইল আপডেট হয়েছে!",
        text: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setEditData({ ...teacher });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...teacher });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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

  return (
    <div className="space-y-6">
      {/* প্রোফাইল হেডার */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] h-32 md:h-40 relative">
          <button
            onClick={handleEditToggle}
            className={`absolute top-4 right-4 ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-white/20 hover:bg-white/30"
            } text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm`}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            {isEditing ? "সেভ করুন" : "এডিট প্রোফাইল"}
          </button>

          {isEditing && (
            <button
              onClick={handleCancelEdit}
              className="absolute top-4 right-32 bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-sm"
            >
              <FaTimes /> বাতিল
            </button>
          )}
        </div>

        <div className="px-6 md:px-8 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white p-1.5 shadow-lg border-4 border-white flex items-center justify-center text-6xl bg-teal-50">
              <span>👨‍🏫</span>
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-teal-700 transition-all">
                <FaCamera className="text-xs" />
              </button>
            )}
          </div>

          <div className="text-center md:text-left flex-grow">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editData.name}
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
                value={editData.title}
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
                      value={editData.email}
                      onChange={handleInputChange}
                      className="bg-transparent border-none text-sm focus:outline-none w-40"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                    <FaPhoneAlt className="text-teal-600" />
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-none text-sm focus:outline-none w-32"
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                    <FaEnvelope className="text-teal-600" /> {teacher.email}
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                    <FaPhoneAlt className="text-teal-600" /> {teacher.phone}
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

      {/* স্ট্যাটিসটিক্স কার্ড */}
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
                {typeof stat.value === "string" && stat.value.includes("★")
                  ? ""
                  : stat.value}
              </span>
            </div>
            {typeof stat.value === "string" && stat.value.includes("★") && (
              <div className="text-sm mt-1">{stat.value}</div>
            )}
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* মূল কনটেন্ট - দুই কলাম */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* বাম কলাম */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
              <span className="text-teal-600">📝</span> সংক্ষিপ্ত পরিচিতি
            </h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={editData.bio}
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
                {editData.expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newExpertise = [...editData.expertise];
                        newExpertise[index] = e.target.value;
                        setEditData({ ...editData, expertise: newExpertise });
                      }}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        const newExpertise = editData.expertise.filter(
                          (_, i) => i !== index,
                        );
                        setEditData({ ...editData, expertise: newExpertise });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setEditData({
                      ...editData,
                      expertise: [...editData.expertise, ""],
                    });
                  }}
                  className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
                >
                  + যোগ করুন
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {teacher.expertise.map((item, index) => (
                  <span
                    key={index}
                    className="bg-teal-50 text-[#004d4d] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-teal-100"
                  >
                    <FaCheckCircle className="text-xs text-teal-600" /> {item}
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
              {teacher.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100"
                >
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="text-sm text-gray-700">{achievement}</span>
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
                { icon: <FaFacebook />, color: "blue-700", label: "ফেসবুক" },
                { icon: <FaTwitter />, color: "blue-400", label: "টুইটার" },
                { icon: <FaLinkedin />, color: "blue-600", label: "লিঙ্কডইন" },
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

        {/* ডান কলাম */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
              <FaGraduationCap className="text-teal-600 text-xl" /> শিক্ষাগত
              যোগ্যতা
            </h3>
            <div className="space-y-4">
              {teacher.education.map((edu, index) => (
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
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
              <FaChalkboardTeacher className="text-teal-600 text-xl" /> পরিচালিত
              কোর্সসমূহ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacher.courses.map((course, index) => (
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
                { label: "প্রোফাইল সম্পাদনা", icon: "✏️", color: "blue" },
                { label: "পাসওয়ার্ড পরিবর্তন", icon: "🔒", color: "red" },
                { label: "সেটিংস", icon: "⚙️", color: "gray" },
                { label: "সাপোর্ট", icon: "💬", color: "green" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.label === "প্রোফাইল সম্পাদনা") {
                      handleEditToggle();
                    } else {
                      Swal.fire({
                        icon: "info",
                        title: item.label,
                        text: "এই ফিচারটি শীঘ্রই আসছে!",
                        confirmButtonColor: "#004d4d",
                      });
                    }
                  }}
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
  );
};

export default TeacherProfile;
