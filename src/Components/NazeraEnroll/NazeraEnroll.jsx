import React, { useState } from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const NazeraEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Bangladesh (+880)",
    email: "",
    courseName: "- Select Course -",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.phone) errors.phone = "মোবাইল নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক মোবাইল নম্বর দিন";
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
      setTimeout(() => {
        alert("আবেদন সফলভাবে সম্পন্ন হয়েছে!");
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      alert("ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
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
      <Navbar></Navbar>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            to="/course/kids/nazera"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স ডিটেইলসে ফিরে যান</span>
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-md border border-teal-600/30 p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-600">
              অনলাইনে আবেদন করুন
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all uppercase placeholder:text-gray-400 placeholder:text-sm text-sm"
                placeholder="FULL NAME"
              />
            </div>

            {/* Mobile Number (WhatsApp) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-gray-400 text-sm`}
                placeholder="(+880) | *********"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            {/* Country Name with Country Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country Name <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white text-sm text-gray-700"
              >
                <option value="Bangladesh (+880)">Bangladesh (+880)</option>
                <option value="India (+91)">India (+91)</option>
                <option value="Pakistan (+92)">Pakistan (+92)</option>
                <option value="Saudi Arabia (+966)">Saudi Arabia (+966)</option>
                <option value="UAE (+971)">UAE (+971)</option>
                <option value="United Kingdom (+44)">
                  United Kingdom (+44)
                </option>
                <option value="United States (+1)">United States (+1)</option>
                <option value="Canada (+1)">Canada (+1)</option>
                <option value="Australia (+61)">Australia (+61)</option>
                <option value="Malaysia (+60)">Malaysia (+60)</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all uppercase placeholder:text-gray-400 text-sm"
                placeholder="EMAIL ADDRESS"
              />
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Name <span className="text-red-500">*</span>
              </label>
              <select
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white text-sm text-gray-800 font-medium"
              >
                <option value="- Select Course -">- Select Course -</option>
                <option value="সূরা মূলক হিফজ কোর্স">
                  সূরা মূলক হিফজ কোর্স
                </option>
                <option value="ডিপ্লোমা ইন ইসলামিক স্টাডিজ">
                  ডিপ্লোমা ইন ইসলামিক স্টাডিজ
                </option>
                <option value="তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম">
                  তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম
                </option>
                <option value="আলিমিয়্যাহ ফর কিডস">আলিমিয়্যাহ ফর কিডস</option>
                <option value="কুরআন স্টাডিজ ফর জুনিয়রস">
                  কুরআন স্টাডিজ ফর জুনিয়রস
                </option>
                <option value="কুরআন স্টাডিজ ফর এডাল্টস">
                  কুরআন স্টাডিজ ফর এডাল্টস
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-36 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all flex items-center justify-center gap-2 text-sm ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    প্রক্রিয়াকরণ...
                  </>
                ) : (
                  <span>Apply Now</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NazeraEnroll;
