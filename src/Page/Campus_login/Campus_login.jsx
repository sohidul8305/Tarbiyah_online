// src/Page/Campus/Campus_login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft, FaIdCard } from "react-icons/fa";
import Swal from "sweetalert2";

const Campus_login = () => {
  const [credentials, setCredentials] = useState({
    studentId: "",
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
      console.log("📤 Campus login:", {
        studentId: credentials.studentId,
        password: "***",
      });

      // ✅ Campus-specific endpoint use করছি
      const response = await fetch(
        "https://api.tarbiyahonline.com/api/students/campus-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: credentials.studentId.trim(),
            username: credentials.studentId.trim(),
            password: credentials.password.trim(),
          }),
        },
      );

      const data = await response.json();
      console.log(
        "🎯 Campus Login Response:",
        data.success ? "OK" : data.message,
      );

      // ✅ DUE থাকলে BLOCK
      if (data.blocked) {
        await Swal.fire({
          icon: "error",
          title: "🚫 Campus Access Blocked",
          html: `
          <div style="text-align: left; font-size: 14px;">
            <p><strong>Student:</strong> ${data.studentName || "N/A"}</p>
            <p><strong>ID:</strong> ${data.studentId || "N/A"}</p>
            <hr style="margin: 10px 0;">
            <div style="background: #fef2f2; padding: 14px; border-radius: 8px; border: 2px solid #fca5a5;">
              <p style="font-weight: bold; color: #991b1b; font-size: 15px; margin-bottom: 6px;">
                💰 বকেয়া: ৳${data.dueAmount}
              </p>
              <p style="font-size: 13px; color: #7f1d1d;">
                Campus-এ প্রবেশের আগে আপনার <strong>monthly payment</strong> সম্পূর্ণ পরিশোধ করুন।
              </p>
            </div>
            <div style="background: #eff6ff; padding: 12px; border-radius: 8px; margin-top: 12px;">
              <p style="font-weight: bold; color: #1e40af; font-size: 13px; margin-bottom: 6px;">
                📱 কীভাবে Payment করবেন?
              </p>
              <p style="font-size: 12px; color: #1e3a8a;">
                ১. Student Dashboard → Online Payment
              </p>
              <p style="font-size: 12px; color: #1e3a8a;">
                ২. bKash/Nagad Merchant-এ payment
              </p>
              <p style="font-size: 12px; color: #1e3a8a;">
                ৩. Admin verify করলে Campus-এ login করতে পারবেন
              </p>
            </div>
          </div>
        `,
          confirmButtonText: "Payment করব",
          confirmButtonColor: "#00a65a",
          width: 520,
        });

        // ✅ Payment page-এ পাঠান
        navigate("/online-payment");
        return;
      }

      if (data.success && data.user) {
        // ✅ localStorage-এ save
        localStorage.setItem("isCampusLoggedIn", "true");
        localStorage.setItem("campusStudentInfo", JSON.stringify(data.user));
        localStorage.setItem("campusStudentToken", data.token || "");
        localStorage.setItem("studentUsername", data.user.username || "");
        localStorage.setItem("studentId", data.user.studentId || "");
        localStorage.setItem("studentInfo", JSON.stringify(data.user));
        localStorage.setItem(
          "loginSource",
          data.user.loginSource || "students",
        );

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome to the Campus Portal, ${data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/campus");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid ID or Password!",
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
          <p className="text-green-100 text-sm">Login with your Student ID</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="studentId"
                  value={credentials.studentId}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#00a65a] focus:border-[#00a65a] sm:text-sm outline-none font-mono"
                  placeholder="e.g., TAR2648213"
                  required
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                💡 Admin থেকে দেওয়া Student ID ব্যবহার করুন
              </p>
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
                  placeholder="আপনার নিজের password লিখুন"
                  required
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                💡 Admin/Admission form থেকে পাওয়া নিজের Password ব্যবহার করুন
              </p>
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
