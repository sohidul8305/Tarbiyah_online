import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const StudentDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar />

      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Welcome Banner Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white text-3xl font-bold">
              🎓
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome, {user?.displayName || "Student"}! 🎉
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                {user?.email || "student@tarabiyah.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Quick Stats / Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/85 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Enrolled Courses
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              View and continue your active learning modules.
            </p>
            <span className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
              View Courses &rarr;
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Assignments & Quizzes
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Check pending tasks and submit your homework.
            </p>
            <span className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
              Check Tasks &rarr;
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Performance & Grades
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Track your progress and report cards.
            </p>
            <span className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
              View Progress &rarr;
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/25">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Announcements
          </h2>
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-gray-700">
            <p className="font-semibold">
              📢 Welcome to Tarabiyah Learning System!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Explore your dashboard to access live classes, resources, and
              updates from your teachers.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
