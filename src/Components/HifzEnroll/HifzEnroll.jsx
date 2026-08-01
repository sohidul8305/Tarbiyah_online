import React, { useState } from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaSpinner, FaLock, FaArrowRight } from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const HifzEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Bangladesh (+880)",
    email: "",
    selectedCourse: "সূরা মূলক হিফয কোর্স",
  });
  const [formErrors, setFormErrors] = useState({});

  const coursesList = [
    "- Select Course -",
    "সূরা মূলক হিফয কোর্স",
    "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    "তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম",
    "আলিমিয়্যাহ ফর কিডস",
    "কুরআন স্টাডিজ ফর জুনিয়রস",
    "কুরআন স্টাডিজ ফর এডাল্টস",
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "পূর্ণ নাম প্রয়োজন";
    if (!formData.phone) errors.phone = "মোবাইল নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক মোবাইল নম্বর দিন";
    if (
      !formData.selectedCourse ||
      formData.selectedCourse === "- Select Course -"
    )
      errors.selectedCourse = "দয়া করে একটি কোর্স সিলেক্ট করুন";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    setFormErrors({});

    try {
      // সাবমিট লজিক
      setTimeout(() => {
        alert("আবেদন সফলভাবে সম্পন্ন হয়েছে!");
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("আবেদনে ত্রুটি হয়েছে।");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/course/kids/hifz"
            className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স ডিটেইলসে ফিরে যান</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-cyan-700/30 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-700">
              অনলাইনে আবেদন করুন
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-cyan-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.fullName ? "border-red-500" : "border-cyan-200"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all uppercase text-sm`}
                placeholder="FULL NAME"
              />
              {formErrors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-cyan-800 mb-2">
                Mobile Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.phone ? "border-red-500" : "border-cyan-200"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm`}
                placeholder="(+880) | *********"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            {/* Country Name */}
            <div>
              <label className="block text-sm font-semibold text-cyan-800 mb-2">
                Country Name <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white text-sm"
              >
                <option value="Bangladesh (+880)">Bangladesh (+880)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-cyan-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all uppercase text-sm"
                placeholder="EMAIL ADDRESS"
              />
            </div>

            {/* Course Name Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-cyan-800 mb-2">
                Course Name <span className="text-red-500">*</span>
              </label>
              <select
                name="selectedCourse"
                value={formData.selectedCourse}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.selectedCourse
                    ? "border-red-500"
                    : "border-cyan-500"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white text-cyan-900 text-sm`}
              >
                {coursesList.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {formErrors.selectedCourse && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.selectedCourse}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    প্রক্রিয়াকরণ...
                  </>
                ) : (
                  <>
                    <span>Apply Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HifzEnroll;
