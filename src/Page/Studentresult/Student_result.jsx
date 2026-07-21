import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Student_result = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // লোকাল স্টোরেজ বা ডেমো থেকে স্টুডেন্টের তথ্য সংগ্রহ
  const studentEmail =
    localStorage.getItem("studentEmail") ||
    user?.email ||
    "student@tarabiyah.com";

  // সাইডবার মেনু স্টেট
  const [activeMenu, setActiveMenu] = useState("exam");
  // রেজাল্ট সাব-ট্যাব স্টেট (midterm, quiz, final)
  const [resultTab, setResultTab] = useState("midterm");

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
              onClick={() => {
                setActiveMenu("academic");
                navigate("/student-acedemic");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeMenu === "academic" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <span>🏛️</span> Academic
            </button>
            <button
              onClick={() => setActiveMenu("exam")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${activeMenu === "exam" ? "bg-teal-50 text-[#004d4d] font-bold" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <span>📄</span> Regular Exam Result
              </div>
              <span>&rsaquo;</span>
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

        {/* ================= RIGHT MAIN CONTENT AREA (Student Results Portal) ================= */}
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          {/* Top Bar inside Content */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              Student Exam & Quiz Results Portal
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

          {/* Result Sub-Tabs Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 text-sm">
              <button
                onClick={() => setResultTab("midterm")}
                className={`px-4 py-1.5 rounded border transition-all ${resultTab === "midterm" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Mid-Term Results
              </button>
              <button
                onClick={() => setResultTab("quiz")}
                className={`px-4 py-1.5 rounded border transition-all ${resultTab === "quiz" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Quiz Test Results
              </button>
              <button
                onClick={() => setResultTab("final")}
                className={`px-4 py-1.5 rounded border transition-all ${resultTab === "final" ? "bg-teal-50 text-[#004d4d] font-bold border-teal-300" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"}`}
              >
                Semester Final Result
              </button>
            </div>
          </div>

          {/* Tab 1: Mid-Term Results */}
          {resultTab === "midterm" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span>📊</span> Mid-Term Examination Results (Fall 2026)
                </h2>
                <button
                  onClick={() =>
                    Swal.fire(
                      "Download",
                      "Downloading Mid-Term Marksheet PDF...",
                      "success",
                    )
                  }
                  className="bg-[#004d4d] text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-teal-900 transition-all"
                >
                  Download Marksheet
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">Course Code & Name</th>
                      <th className="p-3">Total Marks</th>
                      <th className="p-3">Obtained Marks</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        ISL-101: Al-Quran Studies & Tafseer
                      </td>
                      <td className="p-3">100</td>
                      <td className="p-3 font-semibold">82</td>
                      <td className="p-3 font-bold text-[#004d4d]">A+</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold">
                          Passed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        ISL-102: Hadith Methodology & Sunnah
                      </td>
                      <td className="p-3">100</td>
                      <td className="p-3 font-semibold">75</td>
                      <td className="p-3 font-bold text-[#004d4d]">A</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold">
                          Passed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        ARAB-101: Classic Arabic Grammar
                      </td>
                      <td className="p-3">100</td>
                      <td className="p-3 font-semibold">88</td>
                      <td className="p-3 font-bold text-[#004d4d]">A+</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold">
                          Passed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Quiz Test Results */}
          {resultTab === "quiz" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span>📝</span> Weekly Quiz Test Results & Status
                </h2>
                <span className="text-xs text-gray-500 font-semibold">
                  Total Quizzes Taken: 5
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">Quiz Title</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Full Marks</th>
                      <th className="p-3">Obtained Marks</th>
                      <th className="p-3">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        Quiz 01: Surah Al-Baqarah Ayats 1-20
                      </td>
                      <td className="p-3">Al-Quran</td>
                      <td className="p-3">20</td>
                      <td className="p-3 font-semibold text-green-600">18</td>
                      <td className="p-3">
                        <span className="text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Excellent
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        Quiz 02: Introduction to Sahih Bukhari
                      </td>
                      <td className="p-3">Hadith</td>
                      <td className="p-3">20</td>
                      <td className="p-3 font-semibold text-green-600">16</td>
                      <td className="p-3">
                        <span className="text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Good
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        Quiz 03: Arabic Verb Forms (Fal-Madi)
                      </td>
                      <td className="p-3">Arabic Grammar</td>
                      <td className="p-3">20</td>
                      <td className="p-3 font-semibold text-amber-600">14</td>
                      <td className="p-3">
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Average
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">
                        Quiz 04: Tajweed Rules (Makharijul Huruf)
                      </td>
                      <td className="p-3">Al-Quran</td>
                      <td className="p-3">20</td>
                      <td className="p-3 font-semibold text-green-600">19</td>
                      <td className="p-3">
                        <span className="text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Outstanding
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Semester Final Result */}
          {resultTab === "final" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 text-center">
              <div className="text-4xl mb-2">🎓</div>
              <h2 className="text-xl font-bold text-gray-800">
                Semester Final Result Sheet
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Fall 2026 সেমিস্টারের ফাইনাল পরীক্ষার ফলাফল এখনো প্রকাশিত হয়নি।
                পরীক্ষা শেষ হওয়ার পর মূল গ্রেডশিট ও সার্টিফিকেট এখানে দেখতে
                পাবেন।
              </p>
              <button
                onClick={() =>
                  Swal.fire(
                    "Notice",
                    "Final results will be published soon after semester completion.",
                    "info",
                  )
                }
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold text-sm cursor-not-allowed mt-2"
              >
                Result Not Published Yet
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Student_result;
