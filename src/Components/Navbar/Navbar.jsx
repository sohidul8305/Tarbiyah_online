import React from 'react';
import { Link } from 'react-router';

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
          <div className="cursor-pointer font-medium">Log In</div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Tarbiyah Online" className="h-12" /> 
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-8 text-[#004d4d] font-bold">
          <a href="/" className="hover:text-teal-700">Home</a>
          <a href="/about" className="flex items-center gap-1 hover:text-teal-700">About</a>
          <a href="/course" className="flex items-center gap-1 hover:text-teal-700">Courses ▾</a>
          <a href="/consultancy" className="hover:text-teal-700">Consultancy</a>
          <a href="/blog" className="flex items-center gap-1 hover:text-teal-700">Blog ▾</a>
          <a href="/sponsorship" className="hover:text-teal-700">Sponsorship</a>

          {/* Portal Login with Dropdown */}
          <div className="relative group cursor-pointer hover:text-teal-700">
            <span className="flex items-center gap-1">Portal Login ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <a href="/teacher" className="block px-4 py-3 hover:bg-gray-50 border-b">Teacher Login</a>
              <a href="/admin" className="block px-4 py-3 hover:bg-gray-50 border-b">Admin Login</a>
              <a href="/student" className="block px-4 py-3 hover:bg-gray-50">Student Login</a>
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