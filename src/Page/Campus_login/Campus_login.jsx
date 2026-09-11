// src/Page/Campus/Campus_login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const Campus_login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password.trim(),
        }),
      });

      const data = await response.json();
      console.log("🎯 Login Response:", data);

      if (data.success && data.user) {
        // ✅ localStorage-এ save
        localStorage.setItem("isCampusLoggedIn", "true");
        localStorage.setItem("campusStudentInfo", JSON.stringify(data.user));
        localStorage.setItem("campusStudentToken", data.token || "");
        localStorage.setItem("studentUsername", data.user.username);
        localStorage.setItem("studentInfo", JSON.stringify(data.user));

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome to the Campus Portal, ${data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/campus-dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid Username or Password!",
        });
      }
    } catch (error) {
      console.error("❌ Campus login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Server connection failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden border border-gray-200">
        <div className="bg-[#00a65a] p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-1">Campus Login</h2>
          <p className="text-green-100 text-sm">
            Sign in with your provided credentials
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#00a65a] focus:border-[#00a65a] sm:text-sm outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#00a65a] focus:border-[#00a65a] sm:text-sm outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-[#00a65a] hover:bg-[#008d4c] transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login to Campus"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/student-dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#00a65a]"
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
