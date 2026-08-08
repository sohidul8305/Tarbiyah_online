// src/Page/Student/StudentLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import API from "../../services/api";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Master credentials check
    const isMasterEmail =
      email === "student@tarabiyah.com" && password === "student123S@";
    const isMasterPhone =
      phone === "01700000000" && password === "student123S@";

    // If master login with email or phone
    if (isMasterEmail || isMasterPhone) {
      try {
        // If phone number is provided, find student by phone
        if (phone) {
          const response = await API.get(`/auth/student/profile/${phone}`);

          if (response.data.success) {
            const student = response.data.user;

            localStorage.setItem("isStudentLoggedIn", "true");
            localStorage.setItem("studentPhone", phone);
            localStorage.setItem("studentInfo", JSON.stringify(student));
            localStorage.setItem("studentEmail", student.email || "");

            await Swal.fire({
              icon: "success",
              title: "Student Portal Login Successful!",
              text: `Welcome back, ${student.name}!`,
              timer: 1500,
              showConfirmButton: false,
            });

            navigate("/student-dashboard");
            setLoading(false);
            return;
          }
        }

        // If only email login (master account)
        if (email === "student@tarabiyah.com") {
          const masterStudent = {
            name: "Master Student",
            email: "student@tarabiyah.com",
            phone: "01700000000",
            class: "Admin",
          };

          localStorage.setItem("isStudentLoggedIn", "true");
          localStorage.setItem("studentEmail", "student@tarabiyah.com");
          localStorage.setItem("studentPhone", "01700000000");
          localStorage.setItem("studentInfo", JSON.stringify(masterStudent));

          await Swal.fire({
            icon: "success",
            title: "Master Login Successful!",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/student-dashboard");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error fetching student:", error);

        if (error.response?.status === 404) {
          const result = await Swal.fire({
            icon: "info",
            title: "Student Not Found",
            text: `"${phone}" এই ফোন নম্বরটি রেজিস্টার করা নেই। আপনি কি রেজিস্টার করতে চান?`,
            showCancelButton: true,
            confirmButtonColor: "#004d4d",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, রেজিস্টার করব",
            cancelButtonText: "না, পরে করব",
          });

          if (result.isConfirmed) {
            navigate("/student-registration");
          }
          setLoading(false);
          return;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Student not found!",
        });
        setLoading(false);
        return;
      }
    }

    // Normal login with phone and password
    try {
      const response = await API.post("/auth/login/student", {
        phone: phone || email,
        password,
      });

      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem("isStudentLoggedIn", "true");
        localStorage.setItem("studentPhone", user.phone);
        localStorage.setItem("studentInfo", JSON.stringify(user));
        localStorage.setItem("studentEmail", user.email || "");
        localStorage.setItem("token", token);

        await Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "ভুল ফোন নম্বর বা পাসওয়ার্ড প্রদান করা হয়েছে!",
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
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="Enter email"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="আপনার রেজিস্টারকৃত ফোন নম্বর দিন"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                ⚠️ যে ফোন নম্বর দিয়ে রেজিস্টার করেছেন সেটি দিন
              </p>
            </div>

            {/* Password Field */}
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
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-[#004d4d] text-white py-2.5 rounded-lg font-bold hover:bg-teal-900 transition-all shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "লগইন হচ্ছে..." : "Log In Student Portal"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <button
                onClick={() => navigate("/student-registration")}
                className="text-[#004d4d] font-bold hover:underline"
              >
                রেজিস্টার করুন
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
