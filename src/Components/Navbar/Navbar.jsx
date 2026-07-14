import React from "react";
import { Link } from "react-router";
import logo from "../../image/";
const Navbar = () => {
  return (
    <nav className="w-full">
      {/* Top Bar */}
      <div className="bg-[#004d4d] text-white py-2 px-6 flex justify-between items-center text-[13px]">
        <div className="flex gap-6">
          <span>40/1, safa garden, mohammadpur - 1207</span>
          <span>info@tarbiyahonline.com</span>
          <span>+880 1841-514545</span>
          <span>+880 1841-516565</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>🇧🇩</span> <span>বাংলা</span>
          </div>
          <Link to="/login">
            <div className="cursor-pointer font-medium">Log In</div>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Tarbiyah Online" className="h-12" />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-8 text-[#004d4d] font-bold">
          <Link to="/" className="hover:text-teal-700">
            Home
          </Link>

          {/* About Dropdown */}
          <div className="relative group cursor-pointer hover:text-teal-700">
            <Link to="/about">
              {" "}
              <span className="flex items-center gap-1">About ▾</span>
            </Link>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/management"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d]"
              >
                Management
              </Link>
              <Link
                to="/faculty"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d]"
              >
                Faculty
              </Link>
            </div>
          </div>

          {/* Courses Dropdown */}
          <div className="relative group cursor-pointer hover:text-teal-700">
            <span className="flex items-center gap-1">Courses ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/live-course"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d]"
              >
                Live Course
              </Link>
              <Link
                to="/recorded-course"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d]"
              >
                Recorded Course
              </Link>
            </div>
          </div>

          <Link to="/consultancy" className="hover:text-teal-700">
            Consultancy
          </Link>

          {/* Blog Dropdown */}
          <div className="relative group cursor-pointer hover:text-teal-700">
            <span className="flex items-center gap-1">Blog ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/events"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d]"
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d]"
              >
                Gallery
              </Link>
            </div>
          </div>

          <Link to="/sponsorship" className="hover:text-teal-700">
            Sponsorship
          </Link>

          {/* Portal Login Dropdown */}
          <div className="relative group cursor-pointer hover:text-teal-700">
            <span className="flex items-center gap-1">Portal Login ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/teacher"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d]"
              >
                Teacher Login
              </Link>
              <Link
                to="/admin"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d]"
              >
                Admin Login
              </Link>
              <Link
                to="/student"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d]"
              >
                Student Login
              </Link>
            </div>
          </div>

          <Link to="/register">
            <button className="bg-[#004d4d] text-white px-6 py-2 rounded-md hover:bg-teal-900 transition">
              Join Now
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
