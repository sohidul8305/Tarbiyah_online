import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const Campus_login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ইনপুট ভ্যালু পরিবর্তন হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // লগইন সাবমিট হ্যান্ডলার
  const handleLogin = (e) => {
    e.preventDefault();

    // নির্দিষ্ট ইমেইল এবং পাসওয়ার্ড চেক করা হচ্ছে
    const hardcodedEmail = "studentcampus@tarbiyah.com";
    const hardcodedPassword = "123456";

    if (
      credentials.email === hardcodedEmail &&
      credentials.password === hardcodedPassword
    ) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to the Campus Portal!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // লগইন সফল হওয়ার পর Campus পেজে রিডাইরেক্ট
        navigate("/campus");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Email or Password! Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden border border-gray-200">
        {/* Header Area */}
        <div className="bg-[#00a65a] p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-1">Campus Login</h2>
          <p className="text-green-100 text-sm">
            Sign in to access your campus resources
          </p>
        </div>

        {/* Form Area */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#00a65a] focus:border-[#00a65a] sm:text-sm transition-colors outline-none"
                  placeholder="student@tarbiyah.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#00a65a] focus:border-[#00a65a] sm:text-sm transition-colors outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00a65a] focus:ring-[#00a65a] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-[#00a65a] hover:text-[#008d4c] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Notice Alert */}
            <div className="bg-[#fff4e5] border-l-4 border-[#f39c12] p-3 text-xs text-gray-700 mt-4 rounded-r-md"></div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#00a65a] hover:bg-[#008d4c] focus:outline-none transition-colors"
            >
              Login to Campus
            </button>
          </form>

          {/* Back to Dashboard Link */}
          <div className="mt-6 text-center">
            <Link
              to="/student-dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#00a65a] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Student Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campus_login;
