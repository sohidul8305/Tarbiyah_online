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
    course: "",
    presentAddress: "",
    permanentAddress: "",
    dobOrNid: "",
    guardianName: "",
    guardianPhone: "",
  });

  const coursesList = [
    "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    "আলিমিয়াহ ফর কিডস",
    "আলিমিয়াহ প্রোগ্রাম",
    "কায়দা নুরানী",
    "নাজেরা",
    "হিফজুল কুরআন",
    "হিফজ রিভিশন",
    "ওয়ান টু ওয়ান",
    "কায়দায়ে নূরানিয়্যাহ",
    "কুরআন নাজেরা",
    "বেসিক তাজউইদ (লেভেল–১)",
    "অ্যাডভান্সড তাজউইদ",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // StudentRegistration.jsx - শুধু এই একটি handleSubmit রাখুন, অন্যটি ডিলিট করুন

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
        course: formData.course,
      });

      const response = await fetch(
        "http://localhost:5000/api/students/register/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            course: formData.course,
            presentAddress: formData.presentAddress || "",
            permanentAddress: formData.permanentAddress || "",
            dobOrNid: formData.dobOrNid || "",
            guardianName: formData.guardianName || "",
            guardianPhone: formData.guardianPhone || "",
          }),
        },
      );

      console.log("📥 Response Status:", response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error("❌ Error Response:", text.substring(0, 200));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📥 Response Data:", data);

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "🎉 রেজিস্ট্রেশন সফল!",
          html: `
          <div style="text-align: left; max-height: 400px; overflow-y: auto;">
            <p><strong>নাম:</strong> ${formData.name}</p>
            <p><strong>ইমেইল:</strong> ${formData.email}</p>
            <p><strong>ফোন:</strong> ${formData.phone}</p>
            <p><strong>কোর্স:</strong> ${formData.course}</p>
            <p><strong>বর্তমান ঠিকানা:</strong> ${formData.presentAddress || "N/A"}</p>
            <p><strong>স্থায়ী ঠিকানা:</strong> ${formData.permanentAddress || "N/A"}</p>
            <p><strong>পরিচয়পত্র:</strong> ${formData.dobOrNid || "N/A"}</p>
            <p><strong>অভিভাবক:</strong> ${formData.guardianName || "N/A"}</p>
            <p><strong>অভিভাবক ফোন:</strong> ${formData.guardianPhone || "N/A"}</p>
            <hr style="margin: 10px 0;">
            <p style="color: #004d4d; font-weight: bold;">
              ⏳ আপনার অ্যাকাউন্ট অ্যাপ্রুভের অপেক্ষায় আছে।
            </p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
              অ্যাডমিন অ্যাপ্রুভ করার পর আপনি লগইন করতে পারবেন।
            </p>
          </div>
        `,
          confirmButtonColor: "#004d4d",
          confirmButtonText: "লগইন পেজে যান",
        });

        navigate("/student-login");
      } else {
        Swal.fire({
          icon: "error",
          title: "রেজিস্ট্রেশন ব্যর্থ!",
          text: data.message || "আবার চেষ্টা করুন।",
          confirmButtonColor: "#004d4d",
        });
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);

      let errorMessage = "আবার চেষ্টা করুন।";
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ECONNREFUSED")
      ) {
        errorMessage =
          "ব্যাকএন্ড সার্ভার চালু নেই! \n\nটার্মিনালে cd backend && node simple-server.js চালান।";
      } else if (error.message.includes("HTTP 404")) {
        errorMessage =
          "API route পাওয়া যায়নি! \n\nব্যাকএন্ড সার্ভার চালু আছে কিনা চেক করুন।";
      } else {
        errorMessage = error.message || "আবার চেষ্টা করুন।";
      }

      Swal.fire({
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
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Enter your email"
                  required
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
                  placeholder="017XXXXXXXX"
                  required
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] bg-white"
                  required
                >
                  <option value="">-- Select your course --</option>
                  {coursesList.map((courseName, index) => (
                    <option key={index} value={courseName}>
                      {courseName}
                    </option>
                  ))}
                </select>
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
                  placeholder="6+ characters"
                  required
                />
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
                  Date of Birth / NID / Birth Certificate No.{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dobOrNid"
                  value={formData.dobOrNid}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="e.g., DD-MM-YYYY"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Present Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Your present address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Your permanent address"
                  required
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
                  Guardian's Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
                  placeholder="Guardian's phone number"
                  required
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
