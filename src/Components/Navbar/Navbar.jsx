import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import logo from "../../image/logo.jpg";

const Navbar = () => {
  // ল্যাঙ্গুয়েজ স্টেট
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // সব কন্টেন্টের ট্রান্সলেশন
  const translations = {
    en: {
      // টপ বার
      address: "40/1, safa garden, mohammadpur - 1207",
      email: "info@tarbiyahonline.com",
      phone1: "+880 1841-514545",
      phone2: "+880 1841-516565",
      login: "Log In",

      // মেইন নেভিগেশন
      home: "Home",
      about: "About",
      courses: "Courses",
      consultancy: "Consultancy",
      blog: "Blog",
      sponsorship: "Sponsorship",
      portalLogin: "Portal Login",
      joinNow: "Join Now",

      // ড্রপডাউন আইটেম
      management: "Management",
      faculty: "Faculty",
      ourMember: "Our Member",
      liveCourse: "Live Course",
      recordedCourse: "Recorded Course",
      events: "Events",
      gallery: "Gallery",
      teacherLogin: "Teacher Login",
      adminLogin: "Admin Login",
      studentLogin: "Student Login",
    },
    bn: {
      // টপ বার
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭",
      email: "info@tarbiyahonline.com",
      phone1: "+৮৮০ ১৮৪১-৫১৪৫৪৫",
      phone2: "+৮৮০ ১৮৪১-৫১৬৫৬৫",
      login: "লগইন",

      // মেইন নেভিগেশন
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      courses: "কোর্সসমূহ",
      consultancy: "পরামর্শ",
      blog: "ব্লগ",
      sponsorship: "স্পনসরশিপ",
      portalLogin: "পোর্টাল লগইন",
      joinNow: "যুক্ত হোন",

      // ড্রপডাউন আইটেম
      management: "ব্যবস্থাপনা",
      faculty: "শিক্ষকবৃন্দ",
      ourMember: "আমাদের সদস্য",
      liveCourse: "লাইভ কোর্স",
      recordedCourse: "রেকর্ডেড কোর্স",
      events: "ইভেন্টসমূহ",
      gallery: "গ্যালারি",
      teacherLogin: "শিক্ষক লগইন",
      adminLogin: "অ্যাডমিন লগইন",
      studentLogin: "শিক্ষার্থী লগইন",
    },
  };

  // ল্যাঙ্গুয়েজ সেভ করা
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "bn" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  // ল্যাঙ্গুয়েজ টগল
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <nav className="w-full">
      {/* টপ বার */}
      <div className="bg-[#004d4d] text-white py-2 px-6 flex justify-between items-center text-[13px]">
        <div className="flex gap-6 flex-wrap">
          <span>{t.address}</span>
          <span>{t.email}</span>
          <span>{t.phone1}</span>
          <span>{t.phone2}</span>
        </div>
        <div className="flex items-center gap-6">
          {/* ল্যাঙ্গুয়েজ সুইচার */}
          <div
            className="flex items-center gap-2 cursor-pointer bg-[#003d3d] px-3 py-1 rounded-md hover:bg-[#005555] transition"
            onClick={toggleLanguage}
          >
            <span className="font-medium">
              {language === "en" ? "EN" : "বাংলা"}
            </span>
            <span className="text-xs opacity-75">
              {language === "en" ? "বাংলা" : "EN"}
            </span>
          </div>
          <Link to="/login">
            <div className="cursor-pointer font-medium hover:text-teal-200 transition">
              {t.login}
            </div>
          </Link>
        </div>
      </div>

      {/* মেইন নেভবার */}
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        {/* লোগো - ডান পাশে */}
        <div className="flex items-center flex-1">
          <Link to="/" className="group ml-40">
            <img
              src={logo}
              alt="Tarbiyah logo"
              className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* নেভিগেশন আইটেম - বাম পাশে */}
        <div className="flex items-center gap-8 text-[#004d4d] font-bold flex-1 justify-start">
          <Link
            to="/"
            className="hover:text-teal-700 transition whitespace-nowrap"
          >
            {t.home}
          </Link>

          {/* অ্যাবাউট ড্রপডাউন */}
          <div className="relative group cursor-pointer hover:text-teal-700 transition">
            <Link to="/about">
              <span className="flex items-center gap-1 whitespace-nowrap">
                {t.about} ▾
              </span>
            </Link>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/management"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.management}
              </Link>
              <Link
                to="/faculty"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.faculty}
              </Link>
              <Link
                to="/member"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d] transition"
              >
                {t.ourMember}
              </Link>
            </div>
          </div>

          {/* কোর্সেস ড্রপডাউন */}
          <div className="relative group cursor-pointer hover:text-teal-700 transition">
            <span className="flex items-center gap-1 whitespace-nowrap">
              {t.courses} ▾
            </span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/live-course"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.liveCourse}
              </Link>
              <Link
                to="/recorded-course"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d] transition"
              >
                {t.recordedCourse}
              </Link>
            </div>
          </div>

          <Link
            to="/consultancy"
            className="hover:text-teal-700 transition whitespace-nowrap"
          >
            {t.consultancy}
          </Link>

          {/* ব্লগ ড্রপডাউন */}
          <div className="relative group cursor-pointer hover:text-teal-700 transition">
            <span className="flex items-center gap-1 whitespace-nowrap">
              {t.blog} ▾
            </span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/events"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.events}
              </Link>
              <Link
                to="/gallery"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d] transition"
              >
                {t.gallery}
              </Link>
            </div>
          </div>

          <Link
            to="/sponsorship"
            className="hover:text-teal-700 transition whitespace-nowrap"
          >
            {t.sponsorship}
          </Link>

          {/* পোর্টাল লগইন ড্রপডাউন */}
          <div className="relative group cursor-pointer hover:text-teal-700 transition">
            <span className="flex items-center gap-1 whitespace-nowrap">
              {t.portalLogin} ▾
            </span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50">
              <Link
                to="/teacher"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.teacherLogin}
              </Link>
              <Link
                to="/admin"
                className="block px-4 py-3 hover:bg-gray-50 border-b text-[#004d4d] transition"
              >
                {t.adminLogin}
              </Link>
              <Link
                to="/student"
                className="block px-4 py-3 hover:bg-gray-50 text-[#004d4d] transition"
              >
                {t.studentLogin}
              </Link>
            </div>
          </div>

          <Link to="/register">
            <button className="bg-[#004d4d] text-white px-6 py-2 rounded-md hover:bg-teal-900 transition transform hover:scale-105 whitespace-nowrap">
              {t.joinNow}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
