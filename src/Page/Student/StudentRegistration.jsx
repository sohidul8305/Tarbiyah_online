import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import API, { testConnection } from "../../services/api";

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

  // ✅ Check server connection first
  const checkServer = async () => {
    try {
      await testConnection();
      return true;
    } catch (error) {
      console.error("❌ Server not reachable");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Validate passwords
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "পাসওয়ার্ড মেলে নি!",
        text: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।",
      });
      setLoading(false);
      return;
    }

    // ✅ Validate phone number
    if (formData.phone.length < 11) {
      Swal.fire({
        icon: "error",
        title: "ভুল ফোন নম্বর!",
        text: "ফোন নম্বরটি ১১ ডিজিটের হতে হবে।",
      });
      setLoading(false);
      return;
    }

    // ✅ Validate password length
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
      // ✅ Check server connection first
      const isServerRunning = await checkServer();
      if (!isServerRunning) {
        throw new Error(
          "সার্ভারে সংযোগ করা যায়নি! ব্যাকএন্ড সার্ভার চালু আছে কিনা চেক করুন।",
        );
      }

      console.log("📤 Sending Registration Data:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        class: formData.class,
      });

      const response = await API.post("/auth/register/student", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        class: formData.class,
        address: formData.address,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
      });

      console.log("✅ Registration Response:", response.data);

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "🎉 রেজিস্ট্রেশন সফল!",
          html: `
            <div style="text-align: left;">
              <p><strong>নাম:</strong> ${formData.name}</p>
              <p><strong>ক্লাস:</strong> ${formData.class}</p>
              <p><strong>ফোন:</strong> ${formData.phone}</p>
              <hr style="margin: 10px 0;">
              <p style="color: #004d4d; font-weight: bold;">
                ⏳ আপনার অ্যাকাউন্ট অ্যাপ্রুভের অপেক্ষায় আছে।<br/>
                অ্যাডমিন আপনাকে ইউজারনেম এবং পাসওয়ার্ড দিবে।
              </p>
            </div>
          `,
          confirmButtonColor: "#004d4d",
          confirmButtonText: "লগইন পেজে যান",
        });

        navigate("/student-login");
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);

      let errorMessage = "আবার চেষ্টা করুন।";

      if (error.response) {
        // Server responded with error
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server Error: ${error.response.status}`;
        console.error("📦 Server Response:", error.response.data);
      } else if (error.request) {
        // No response from server
        errorMessage =
          "সার্ভারে সংযোগ করা যায়নি! ব্যাকএন্ড সার্ভার চালু আছে কিনা চেক করুন।";
        console.error("📤 No response from server");
        console.error("💡 Check:");
        console.error("1. Backend running: cd backend && node index.js");
        console.error("2. Port: http://localhost:5000");
        console.error("3. Test: http://localhost:5000/api/auth/test");
      } else {
        // Other errors
        errorMessage = error.message || errorMessage;
      }

      await Swal.fire({
        icon: "error",
        title: "রেজিস্ট্রেশন ব্যর্থ!",
        text: errorMessage,
        confirmButtonColor: "#004d4d",
        confirmButtonText: "আবার চেষ্টা করুন",
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

          {/* ✅ Server Status */}
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg mb-4">
            <p className="text-sm text-green-700">
              ✅ Backend:{" "}
              <span className="font-bold">http://localhost:5000</span>
            </p>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-medium">
                  📌 রেজিস্ট্রেশন সম্পূর্ণ হলে:
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  অ্যাডমিন আপনার অ্যাকাউন্ট অ্যাপ্রুভ করবে এবং ইউজারনেম ও
                  পাসওয়ার্ড দিবে।
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="e.g., Class 8"
                  required
                />
              </div>

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
                  placeholder="Your address"
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
                  placeholder="Guardian's name"
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
                  placeholder="Guardian's phone"
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
