// src/Page/Student/StudentRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import API from "../../services/api";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    class: "",
    roll: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড মেলে নি!",
        text: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।",
      });
      setLoading(false);
      return;
    }

    // Validate phone number
    if (formData.phone.length < 11) {
      Swal.fire({
        icon: "error",
        title: "ভুল ফোন নম্বর!",
        text: "ফোন নম্বরটি ১১ ডিজিটের হতে হবে।",
      });
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড খুব ছোট!",
        text: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
      });
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Sending Registration Data:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        class: formData.class,
        roll: formData.roll,
      });

      const response = await API.post("/auth/register/student", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        class: formData.class,
        roll: formData.roll,
        address: formData.address,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
      });

      console.log("✅ Registration Response:", response.data);

      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem("isStudentLoggedIn", "true");
        localStorage.setItem("studentPhone", formData.phone);
        localStorage.setItem("studentInfo", JSON.stringify(user));
        localStorage.setItem("token", token);

        await Swal.fire({
          icon: "success",
          title: "🎉 রেজিস্ট্রেশন সফল!",
          text: `স্বাগতম, ${user.name}!`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);

      // Better error handling
      let errorMessage = "আবার চেষ্টা করুন।";
      if (error.response) {
        // Server responded with error
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
        console.log("Server Error Response:", error.response.data);
      } else if (error.request) {
        // Request made but no response
        errorMessage =
          "সার্ভারে সংযোগ করা যায়নি! ব্যাকএন্ড সার্ভার চালু আছে কিনা চেক করুন।";
        console.log("No Response Error:", error.request);
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }

      await Swal.fire({
        icon: "error",
        title: "রেজিস্ট্রেশন ব্যর্থ!",
        text: errorMessage,
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-md:px-4 flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#004d4d] mb-6">
            📝 Student Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="আপনার নাম লিখুন"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ইমেইল
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="ইমেইল (ঐচ্ছিক)"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ফোন নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="০১৭XXXXXXXX"
                  required
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ক্লাস
                </label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="যেমন: Class 8"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="৬+ অক্ষর"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পাসওয়ার্ড নিশ্চিত করুন{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  required
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ঠিকানা
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="আপনার ঠিকানা"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  অভিভাবকের নাম
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="অভিভাবকের নাম"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  অভিভাবকের ফোন
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="অভিভাবকের ফোন"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-4">
              <p className="font-semibold">ℹ️ গুরুত্বপূর্ণ তথ্য:</p>
              <p className="mt-1">
                • রেজিস্ট্রেশনের পর আপনি আপনার ফোন নম্বর ও পাসওয়ার্ড দিয়ে লগইন
                করতে পারবেন।
              </p>
              <p className="mt-1">
                • মাস্টার লগইন: <strong>01700000000</strong> এবং পাসওয়ার্ড:{" "}
                <strong>student123S@</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-[#004d4d] text-white py-2.5 rounded-lg font-bold hover:bg-teal-900 transition-all shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  রেজিস্ট্রেশন হচ্ছে...
                </>
              ) : (
                "রেজিস্ট্রেশন করুন"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentRegistration;
