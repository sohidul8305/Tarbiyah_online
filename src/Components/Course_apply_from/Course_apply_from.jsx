import React, { useState } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";

const Course_apply_from = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    country: "bangladesh (+880)",
    email: "",
    course: "সূরা মূলক হিফয কোর্স",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-teal-700/20 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#003d3d] py-5 px-6 text-center relative">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            READY TO APPLY YOUR COURSE
          </h2>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-teal-900">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="FULL NAME"
              className="w-full px-4 py-3 rounded-xl border border-teal-500/50 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-gray-700 font-medium placeholder-teal-600/60 transition-all bg-white"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-teal-900">
              Mobile Number (WhatsApp) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="(+880) 1*********"
              className="w-full px-4 py-3 rounded-xl border border-teal-500/50 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-gray-700 font-medium placeholder-teal-600/60 transition-all bg-white"
            />
          </div>

          {/* Country Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-teal-900">
              Country Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-teal-500/50 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-teal-800 font-medium appearance-none bg-white cursor-pointer transition-all"
              >
                <option value="bangladesh (+880)">bangladesh (+880)</option>
                <option value="india (+91)">india (+91)</option>
                <option value="pakistan (+92)">pakistan (+92)</option>
                <option value="uk (+44)">uk (+44)</option>
                <option value="usa (+1)">usa (+1)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-600">
                <FaChevronDown className="text-xs" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-teal-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS"
              className="w-full px-4 py-3 rounded-xl border border-teal-500/50 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-gray-700 font-medium placeholder-teal-600/60 transition-all bg-white"
            />
          </div>

          {/* Course Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-teal-900">
              Course Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-teal-500/50 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-teal-800 font-medium appearance-none bg-white cursor-pointer transition-all"
              >
                <option value="">- select course -</option>
                <option value="সূরা মূলক হিফয কোর্স">
                  সূরা মূলক হিফয কোর্স
                </option>
                <option value="ডিপ্লোমা ইন ইসলামিক স্টাডিজ">
                  ডিপ্লোমা ইন ইসলামিক স্টাডিজ
                </option>
                <option value="তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম">
                  তারবিয়াহ আলিমিয়্যাহ প্রোগ্রাম
                </option>
                <option value="আলিমিয়্যাহ ফর কিডস">আলিমিয়্যাহ ফর কিডস</option>
                <option value="কুরআন স্টাডিজ ফর জুনিয়রস">
                  কুরআন স্টাডিজ ফর জুনিয়রস
                </option>
                <option value="কুরআন স্টাডিজ ফর এডভান্সড">
                  কুরআন স্টাডিজ ফর এডভান্সড
                </option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-600">
                <FaChevronDown className="text-xs" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#003d3d] hover:bg-[#002b2b] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Course_apply_from;
