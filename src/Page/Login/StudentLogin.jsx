import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // নির্দিষ্ট মাস্টার স্টুডেন্ট অ্যাকাউন্ট চেক (ইমেইল অথবা ফোন নম্বর যেকোনো একটি দিয়ে এবং নির্দিষ্ট পাসওয়ার্ড)
    const isEmailValid =
      email === "student@tarabiyah.com" && password === "student123S@";
    const isPhoneValid = phone === "01700000000" && password === "student123S@"; // এখানে আপনার টেস্ট ফোন নম্বর দিতে পারেন

    if (isEmailValid || isPhoneValid) {
      // লোকালস্টোরেজে তথ্য সেভ করা হচ্ছে
      if (email) {
        localStorage.setItem("studentEmail", email);
      }
      if (phone) {
        localStorage.setItem("studentPhone", phone);
      }
      localStorage.setItem("isStudentLoggedIn", "true");

      await Swal.fire({
        icon: "success",
        title: "Student Portal Login Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/student-dashboard");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "ভুল ইমেইল, ফোন নম্বর বা পাসওয়ার্ড প্রদান করা হয়েছে!",
    });
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
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="Enter phone number "
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
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
              className="w-full mt-6 bg-[#004d4d] text-white py-2.5 rounded-lg font-bold hover:bg-teal-900 transition-all shadow-md"
            >
              Log In Student Portal
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLogin;
