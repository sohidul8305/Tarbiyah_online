import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import API from "../../services/api";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/student/login", {
        username,
        password,
      });

      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem("isStudentLoggedIn", "true");
        localStorage.setItem("studentUsername", username);
        localStorage.setItem("studentInfo", JSON.stringify(user));
        localStorage.setItem("studentEmail", user.email || "");
        localStorage.setItem("token", token);

        await Swal.fire({
          icon: "success",
          title: "✅ Login Successful!",
          text: `Welcome back, ${user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "ভুল ইউজারনেম বা পাসওয়ার্ড!";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      <div className="max-md:px-4 flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#004d4d] mb-6">
            🎓 Student Portal Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="Enter your username"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                💡 আপনার অ্যাডমিন দ্বারা প্রদত্ত ইউজারনেম ব্যবহার করুন
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-[#004d4d] text-white py-2.5 rounded-lg font-bold hover:bg-teal-900 transition-all shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In Student Portal"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/student-registration")}
                className="text-[#004d4d] font-bold hover:underline"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLogin;
