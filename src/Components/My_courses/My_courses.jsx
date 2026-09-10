import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEllipsisV,
  FaArrowLeft,
  FaVideo,
  FaFilePdf,
  FaQuestionCircle,
  FaAward,
  FaBookOpen,
} from "react-icons/fa";

const My_courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ভাষা বা ন্যাভবারের জন্য সাধারণ স্টেট বা ডিফল্ট মান
  const activeTab = "my-courses";
  const t = {
    homeTab: "Home",
    dashboardTab: "Dashboard",
    myCoursesTab: "My courses",
  };

  // কোর্স ডেটা
  const courses = [
    {
      id: 1,
      code: "DNS 101 (2616)",
      title: "দাওয়াহ ও সুন্নাহ",
      semester: "First Semester",
      instructor: "Mufti Abdullah",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
      outcome:
        "Gain deep foundational knowledge in Dawah, Sunnah, and Islamic principles with modern academic standards.",
      syllabus:
        "Module 1: Introduction to Dawah\nModule 2: Sunnah and its Importance\nModule 3: Methodology of Dawah",
    },
    {
      id: 2,
      code: "AQD 101 (2616)",
      title: "আকীদাহ",
      semester: "First Semester",
      instructor: "Mufti Mujibur Rahman",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
      outcome: "Build a solid understanding of Islamic Aqeedah and creed.",
      syllabus: "Module 1: Tawhid\nModule 2: Risalah\nModule 3: Akhirah",
    },
    {
      id: 3,
      code: "ATI 101 (2616)",
      title: "আদাবু ত্বলিবিউল ইলম",
      semester: "First Semester",
      instructor: "Maulana Mamunur Rashid",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
      outcome: "Learn the proper etiquettes of seeking Islamic knowledge.",
      syllabus: "Module 1: Etiquette of Student\nModule 2: Respecting Teachers",
    },
    {
      id: 4,
      code: "FQH 101 (2616)",
      title: "ফিকহ",
      semester: "First Semester",
      instructor: "Alufi Abdul Wahid",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
      outcome: "Understand foundational Islamic jurisprudence (Fiqh) rules.",
      syllabus: "Module 1: Taharah\nModule 2: Salah\nModule 3: Sawm",
    },
    {
      id: 5,
      code: "Open Course",
      title: "Open Course",
      semester: "Alim",
      instructor: "Guest Instructor",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
      outcome: "Explore general Islamic topics and open discussions.",
      syllabus: "Module 1: General Lectures",
    },
    {
      id: 6,
      code: "TAJ 101 (2616)",
      title: "আল-কুরআন লার্নিং/তাজবীদ",
      semester: "First Semester",
      instructor: "Maulana Mamunur Rashid",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
      outcome: "Improve Quran recitation with accurate Tajweed and Makhraj.",
      syllabus:
        "Module 1: Makhraj\nModule 2: Sifatul Huruf\nModule 3: Practice",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* ================= TOP NAVIGATION TABS BAR ================= */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-16 flex items-center space-x-8 shadow-sm">
        <Link
          to="/campus"
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "home" && !selectedCourse
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.homeTab}
        </Link>
        <Link
          to="/campus-dashboard"
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "dashboard" && !selectedCourse
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.dashboardTab}
        </Link>
        <Link
          to="/my-courses"
          onClick={() => setSelectedCourse(null)}
          className={`py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "my-courses" && !selectedCourse
              ? "text-gray-900 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t.myCoursesTab}
        </Link>
      </div>

      <div className="max-w-5xl mx-auto py-6 px-4 md:px-12 space-y-6">
        {selectedCourse ? (
          /* ================= COURSE DETAILS VIEW ================= */
          <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-sm font-semibold text-[#004d4d] hover:underline"
            >
              <FaArrowLeft /> Back to Course Overview
            </button>

            {/* Course Header Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-6">
              <div className="w-full md:w-64 h-32 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.code}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs bg-teal-50 text-[#004d4d] font-bold px-2.5 py-1 rounded border border-teal-100">
                  Instructor: {selectedCourse.instructor}
                </span>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                  {selectedCourse.code} - {selectedCourse.title}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedCourse.semester}
                </p>
              </div>
            </div>

            {/* 01. Course Overview & Outcome & Syllabus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  01 Course Overview & Outcome
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedCourse.outcome}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-sm font-bold text-gray-900 mb-2">
                  Outcome Syllabus
                </h2>
                <pre className="text-xs text-gray-600 font-sans whitespace-pre-line">
                  {selectedCourse.syllabus}
                </pre>
              </div>
            </div>

            {/* Material / Mode & Modules (Video, PDF, Quiz) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Material / Modules */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaBookOpen className="text-[#004d4d]" /> Material / Module
                  Content
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2.5 p-2 bg-gray-50 rounded border border-gray-100 text-xs hover:bg-teal-50 cursor-pointer">
                    <FaVideo className="text-red-500 text-sm" />
                    <span className="font-medium text-gray-700">
                      Video Recording (লেকচার ভিডিও)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 p-2 bg-gray-50 rounded border border-gray-100 text-xs hover:bg-teal-50 cursor-pointer">
                    <FaFilePdf className="text-blue-500 text-sm" />
                    <span className="font-medium text-gray-700">
                      PDF Notes (নোট ও রিসোর্স)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 p-2 bg-gray-50 rounded border border-gray-100 text-xs hover:bg-teal-50 cursor-pointer">
                    <FaQuestionCircle className="text-green-500 text-sm" />
                    <span className="font-medium text-gray-700">
                      Quiz (কুইজ ও মূল্যায়ন)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Grades & Exam Results */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <FaAward className="text-[#004d4d]" /> Grades & Results (Grad)
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Class Test
                    </span>
                    <span className="font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                      A+
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Mid Term Exam
                    </span>
                    <span className="font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                      A
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                    <span className="font-medium text-gray-700">
                      Final Exam
                    </span>
                    <span className="font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* ================= COURSE OVERVIEW LIST VIEW ================= */
          <>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                01 Course overview
              </h1>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
                  <option>All</option>
                </select>
                <div className="relative">
                  <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none w-48"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
                  <option>Sort by course name</option>
                </select>
                <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
                  <option>Card</option>
                </select>
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-28 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.code}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3.5 flex items-start justify-between border-t border-gray-100">
                    <div>
                      <h3 className="text-xs font-bold text-[#004d4d] hover:underline">
                        {course.code}
                      </h3>
                      <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                        {course.title}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {course.semester}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <FaEllipsisV className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default My_courses;
