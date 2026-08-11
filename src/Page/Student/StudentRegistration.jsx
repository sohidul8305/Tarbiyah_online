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
        roll: formData.roll, // রোল নম্বর পাঠানো হচ্ছে
        address: formData.address,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
      });

      console.log("✅ Registration Response:", response.data);

      if (response.data.success) {
        const { user, token } = response.data;

        // Save student info to localStorage
        localStorage.setItem("isStudentLoggedIn", "true");
        localStorage.setItem("studentPhone", formData.phone);
        localStorage.setItem("studentInfo", JSON.stringify(user));
        localStorage.setItem("studentEmail", user.email || "");
        localStorage.setItem("token", token);

        await Swal.fire({
          icon: "success",
          title: "🎉 রেজিস্ট্রেশন সফল!",
          text: `স্বাগতম, ${user.name}! আপনার রোল নম্বর: ${user.roll || "শীঘ্রই দেওয়া হবে"}`,
          timer: 3000,
          showConfirmButton: false,
        });

        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);

      let errorMessage = "আবার চেষ্টা করুন।";
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
      } else if (error.request) {
        errorMessage =
          "সার্ভারে সংযোগ করা যায়নি! ব্যাকএন্ড সার্ভার চালু আছে কিনা চেক করুন।";
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

          {/* Warning Notice in Bengali */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  ⚠️ গুরুত্বপূর্ণ সতর্কতা:
                </p>
                <p className="text-sm text-red-600 mt-1">
                  আপনি যে তথ্য দিয়ে অ্যাডমিশন বা ভর্তি হয়েছেন, ঠিক সেই একই
                  তথ্য দিয়ে রেজিস্ট্রেশন করুন। আপনার ফোন নম্বর, নাম এবং
                  অন্যান্য তথ্য অ্যাডমিশনের সময় দেওয়া তথ্যের সাথে মিল থাকতে
                  হবে।
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Enter email (if available)"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="017XXXXXXXX (Phone number used for admission)"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  ⚠️ Use the same phone number you provided during admission
                </p>
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="e.g., Class 8, Diploma 1st Year"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  ⚠️ Enter the class you were admitted to
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="6+ characters (Choose your password)"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 Remember this password for login
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Your current address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Guardian's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Phone
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Guardian's phone number"
                />
              </div>
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
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/student-login")}
                className="text-[#004d4d] font-bold hover:underline"
              >
                Login Here
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentRegistration;
