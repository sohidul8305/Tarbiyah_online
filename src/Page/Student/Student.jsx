import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { Link } from "react-router-dom";

const Student = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar - উপরে */}
      <Navbar />

      {/* Main Content - মাঝখানে */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
          {/* লোগো বা হেডার */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl font-bold">📚</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Student Login</h2>
            <p className="text-gray-500 mt-2">
              Log in to access your courses and dashboard.
            </p>
          </div>

          {/* লগইন ফর্ম */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID / Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">📧</span>
                <input
                  type="text"
                  placeholder="Enter your Student ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 text-blue-600 rounded"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            New student?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - নিচে */}
      <Footer />
    </div>
  );
};

export default Student;
