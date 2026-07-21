import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Student_acedemic = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // লোকাল স্টোরেজ বা ডেমো থেকে স্টুডেন্টের তথ্য সংগ্রহ
  const studentEmail =
    localStorage.getItem("studentEmail") ||
    user?.email ||
    "student@tarabiyah.com";

  // সাইডবার মেনু স্টেট
  const [activeMenu, setActiveMenu] = useState("academic");
  // একাডেমিক সাব-ট্যাব স্টেট (courses, routine, syllabus, teachers)
  const [academicTab, setAcademicTab] = useState("courses");

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-grow">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shadow-sm">
          <div className="p-4 bg-[#004d4d] text-white font-bold text-sm tracking-wide">
            Islamic Online Madrasah (IOM)
          </div>
          <nav className="p-2 space-y-1 text-sm font-medium text-gray-700">
            <button
              onClick={() => {
                setActiveMenu("dashboard");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "dashboard" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>🏠</span> Dashboard
            </button>
            <button
              onClick={() => {
                setActiveMenu("profile");
                navigate("/student-profile");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "profile" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>👤</span> Profile
            </button>
            <button
              onClick={() => setActiveMenu("academic")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${activeMenu === "academic" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <span>🏛️</span> Academic
              </div>
              <span>&rsaquo;</span>
            </button>
            <button
              onClick={() => {
                setActiveMenu("exam");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "exam" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>📄</span> Regular Exam Result
            </button>
            <button
              onClick={() => {
                setActiveMenu("online-payment");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "online-payment" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>💳</span> Monthly Online Payment
            </button>
            <button
              onClick={() => {
                setActiveMenu("financial");
                navigate("/student-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "financial" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>💰</span> Due & Payments
            </button>
          </nav>
          <div className="p-4 text-xs text-gray-400 mt-20 border-t border-gray-100">
            2026 © Pipilika Soft
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT AREA (Academic Information) ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          {/* Top Bar inside Content */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              Student Academic Information Portal
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">
                {user?.displayName || "Sohidul Islam"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Academic Sub-Tabs Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 text-sm">
              <button
                onClick={() => setAcademicTab("courses")}
                className={`px-4 py-1.5 rounded border transition-all ${academicTab === "courses" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                My Courses
              </button>
              <button
                onClick={() => setAcademicTab("routine")}
                className={`px-4 py-1.5 rounded border transition-all ${academicTab === "routine" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Class Routine
              </button>
              <button
                onClick={() => setAcademicTab("syllabus")}
                className={`px-4 py-1.5 rounded border transition-all ${academicTab === "syllabus" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Syllabus & Materials
              </button>
              <button
                onClick={() => setAcademicTab("teachers")}
                className={`px-4 py-1.5 rounded border transition-all ${academicTab === "teachers" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Course Teachers
              </button>
            </div>
          </div>

          {/* Tab 1: My Courses (With Images & Card Grid View) */}
          {academicTab === "courses" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                <span>📚</span> My Enrolled Courses (Fall 2026)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Course Card 1 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=500&q=80"
                      alt="Al-Quran"
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <span className="text-xs font-mono font-bold bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded">
                        ISL-101
                      </span>
                      <h3 className="font-bold text-gray-800 text-base">
                        Al-Quran Studies & Tafseer
                      </h3>
                      <p className="text-xs text-gray-500">
                        Credit: 3.0 | Type: Core
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold mb-3">
                      Ongoing
                    </span>
                    <button
                      onClick={() =>
                        Swal.fire(
                          "Course Details",
                          "Opening Al-Quran course portal...",
                          "info",
                        )
                      }
                      className="w-full bg-[#004d4d] hover:bg-teal-900 text-white text-xs py-2 rounded-lg font-bold transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Course Card 2 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1584286595398-a79f1cf44329?auto=format&fit=crop&w=500&q=80"
                      alt="Hadith"
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <span className="text-xs font-mono font-bold bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded">
                        ISL-102
                      </span>
                      <h3 className="font-bold text-gray-800 text-base">
                        Hadith Methodology & Sunnah
                      </h3>
                      <p className="text-xs text-gray-500">
                        Credit: 3.0 | Type: Core
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold mb-3">
                      Ongoing
                    </span>
                    <button
                      onClick={() =>
                        Swal.fire(
                          "Course Details",
                          "Opening Hadith course portal...",
                          "info",
                        )
                      }
                      className="w-full bg-[#004d4d] hover:bg-teal-900 text-white text-xs py-2 rounded-lg font-bold transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Course Card 3 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=500&q=80"
                      alt="Arabic"
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <span className="text-xs font-mono font-bold bg-teal-100 text-[#004d4d] px-2 py-0.5 rounded">
                        ARAB-101
                      </span>
                      <h3 className="font-bold text-gray-800 text-base">
                        Classic Arabic Grammar & Syntax
                      </h3>
                      <p className="text-xs text-gray-500">
                        Credit: 4.0 | Type: Core
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold mb-3">
                      Ongoing
                    </span>
                    <button
                      onClick={() =>
                        Swal.fire(
                          "Course Details",
                          "Opening Arabic course portal...",
                          "info",
                        )
                      }
                      className="w-full bg-[#004d4d] hover:bg-teal-900 text-white text-xs py-2 rounded-lg font-bold transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Class Routine */}
          {academicTab === "routine" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                <span>⏰</span> Weekly Class Routine (Online Live Classes)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">Day</th>
                      <th className="p-3">Time (BST)</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Platform / Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-bold text-gray-800">Saturday</td>
                      <td className="p-3">08:00 PM - 09:30 PM</td>
                      <td className="p-3">Al-Quran Studies (ISL-101)</td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            Swal.fire(
                              "Zoom Link",
                              "Joining link active 10 mins before class.",
                              "info",
                            )
                          }
                          className="text-teal-700 font-bold hover:underline"
                        >
                          Join Zoom Class
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-bold text-gray-800">Monday</td>
                      <td className="p-3">08:00 PM - 09:30 PM</td>
                      <td className="p-3">Hadith Methodology (ISL-102)</td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            Swal.fire(
                              "Zoom Link",
                              "Joining link active 10 mins before class.",
                              "info",
                            )
                          }
                          className="text-teal-700 font-bold hover:underline"
                        >
                          Join Zoom Class
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-bold text-gray-800">Wednesday</td>
                      <td className="p-3">08:00 PM - 09:30 PM</td>
                      <td className="p-3">Arabic Grammar (ARAB-101)</td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            Swal.fire(
                              "Zoom Link",
                              "Joining link active 10 mins before class.",
                              "info",
                            )
                          }
                          className="text-teal-700 font-bold hover:underline"
                        >
                          Join Zoom Class
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Syllabus & Materials */}
          {academicTab === "syllabus" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                <span>📁</span> Semester Syllabus & Study Materials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border p-4 rounded-lg space-y-2">
                  <h3 className="font-bold text-gray-800">
                    Al-Quran Syllabus PDF
                  </h3>
                  <p className="text-xs text-gray-500">
                    Detailed lesson plan and reading list for Fall 2026.
                  </p>
                  <button
                    onClick={() =>
                      Swal.fire(
                        "Download",
                        "Downloading syllabus...",
                        "success",
                      )
                    }
                    className="bg-[#004d4d] text-white text-xs px-3 py-1.5 rounded font-bold"
                  >
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 border p-4 rounded-lg space-y-2">
                  <h3 className="font-bold text-gray-800">
                    Hadith Notes & Handouts
                  </h3>
                  <p className="text-xs text-gray-500">
                    Weekly lecture notes uploaded by instructors.
                  </p>
                  <button
                    onClick={() =>
                      Swal.fire("Download", "Downloading notes...", "success")
                    }
                    className="bg-[#004d4d] text-white text-xs px-3 py-1.5 rounded font-bold"
                  >
                    Download Notes
                  </button>
                </div>
                <div className="bg-gray-50 border p-4 rounded-lg space-y-2">
                  <h3 className="font-bold text-gray-800">
                    Arabic Grammar Guide
                  </h3>
                  <p className="text-xs text-gray-500">
                    Reference book and vocabulary sheets.
                  </p>
                  <button
                    onClick={() =>
                      Swal.fire("Download", "Downloading guide...", "success")
                    }
                    className="bg-[#004d4d] text-white text-xs px-3 py-1.5 rounded font-bold"
                  >
                    Download Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Course Teachers */}
          {academicTab === "teachers" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                <span>👨‍🏫</span> Course Instructors & Mentors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border p-4 rounded-lg space-y-1 text-center">
                  <div className="w-12 h-12 bg-teal-100 text-[#004d4d] rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">
                    👨‍⚖️
                  </div>
                  <h3 className="font-bold text-gray-800">
                    Sheikh Dr. Ahmadullah
                  </h3>
                  <p className="text-xs text-[#004d4d] font-semibold">
                    Al-Quran Studies
                  </p>
                  <p className="text-xs text-gray-500">
                    Ph.D in Quranic Sciences, Medina University
                  </p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-lg space-y-1 text-center">
                  <div className="w-12 h-12 bg-teal-100 text-[#004d4d] rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">
                    👨‍⚖️
                  </div>
                  <h3 className="font-bold text-gray-800">
                    Mufti Mahmud Hasan
                  </h3>
                  <p className="text-xs text-[#004d4d] font-semibold">
                    Hadith Methodology
                  </p>
                  <p className="text-xs text-gray-500">
                    Senior Lecturer & Ifta Specialist
                  </p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-lg space-y-1 text-center">
                  <div className="w-12 h-12 bg-teal-100 text-[#004d4d] rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">
                    👨‍⚖️
                  </div>
                  <h3 className="font-bold text-gray-800">
                    Ustadh Ibrahim Khalil
                  </h3>
                  <p className="text-xs text-[#004d4d] font-semibold">
                    Classic Arabic Grammar
                  </p>
                  <p className="text-xs text-gray-500">
                    MA in Arabic Language & Literature
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Student_acedemic;
