import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 'login' এর পরিবর্তে সঠিক ফাংশন নাম 'signInUser' ডিস্ট্রাকচার করা হলো
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ফায়ারবেস থেকে লগইন করা হচ্ছে
      await signInUser(email, password);

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      // লগইন সফল হওয়ার পর সরাসরি স্টুডেন্ট ড্যাশবোর্ডে রিডায়রেক্ট হবে
      navigate("/student-dashboard");
    } catch (err) {
      console.error("Student Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      <div className="max-md:px-4 flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#004d4d] mb-6">
            🎓 Student Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                placeholder="Enter your email"
              />
            </div>
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
                placeholder="Enter your password"
              />
            </div>
            <Link to="/student-dashboard">
              <button
                type="submit"
                className="w-full bg-[#004d4d] text-white py-2.5 rounded-lg font-bold hover:bg-teal-900 transition-all shadow-md"
              >
                Log In
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLogin;
