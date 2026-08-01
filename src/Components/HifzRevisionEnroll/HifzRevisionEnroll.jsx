import React, { useState } from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaSpinner, FaCheckCircle } from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const HifzRevisionEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Bangladesh (+880)",
    email: "",
    courseName: "হিফজ রিভিশন",
    studentName: "",
    memorizedJuz: "",
    weakAreas: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const courseList = [
    "হিফজ রিভিশন",
    "সুরা মূলক হিফজ কোর্স",
    "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
    "তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম",
    "আলিমিয়্যাহ ফর কিডস",
    "কুরআন স্টাডিজ ফর জুনিয়রস",
    "কুরআন স্টাডিজ ফর এডাল্টস",
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "পূর্ণ নাম প্রয়োজন";
    if (!formData.phone) errors.phone = "মোবাইল নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক ফোন নম্বর দিন";
    if (!formData.email) errors.email = "ইমেইল প্রয়োজন";
    if (!formData.courseName) errors.courseName = "কোর্সের নাম সিলেক্ট করুন";
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
      // আপনার সাবমিশন বা পেমেন্ট লজিক এখানে যুক্ত করুন
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
            to="/course/kids/hifz-revision"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স ডিটেইলসে ফিরে যান</span>
          </Link>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-700">
            অনলাইনে আবেদন করুন
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-cyan-500/40 p-6 md:p-10 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.fullName ? "border-red-500" : "border-cyan-500/50"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-sm uppercase placeholder:text-gray-400`}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.phone ? "border-red-500" : "border-cyan-500/50"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-sm placeholder:text-gray-400`}
                placeholder="(+880) | *********"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            {/* Country Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Name <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-cyan-500/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-sm bg-white"
              >
                <option value="Bangladesh (+880)">Bangladesh (+880)</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.email ? "border-red-500" : "border-cyan-500/50"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-sm uppercase placeholder:text-gray-400`}
                placeholder="EMAIL ADDRESS"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name <span className="text-red-500">*</span>
              </label>
              <select
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.courseName ? "border-red-500" : "border-cyan-500"
                } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-sm bg-white text-cyan-900 font-medium`}
              >
                <option value="" disabled>
                  - Select Course -
                </option>
                {courseList.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {formErrors.courseName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.courseName}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#00838f] hover:bg-[#006064] text-white font-medium px-8 py-3 rounded-lg shadow transition-all flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    প্রক্রিয়াকরণ...
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default HifzRevisionEnroll;
