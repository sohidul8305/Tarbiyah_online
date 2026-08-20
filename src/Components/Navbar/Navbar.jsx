import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/Logo-tarbiyah-Online-Academy.png";

const Navbar = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      address: "40/1, safa garden, satmasjid housing, mohammadpur, Dhaka-1207",
      email: "info@tarbiyahonline.com",
      phone1: "+880 1841-514545",
      phone2: "+880 1841-516565",
      login: "Log In",
      admission: "Admission Now",
      support: "Support",
      donate: "Donate",
      home: "Home",
      about: "About",
      studentOpinion: "Student Opinion",
      terms: "Terms & Conditions",
      management: "Management",
      faculty: "Faculty",
      ourMember: "Our Member",
      department: "Department",
      liveCourse: "Live Course",
      recordedCourse: "Recorded Course",
      courses: "Courses",
      diploma: "Diploma in Islamic Studies",
      alemiah: "Tarbiyah Allimiyah",
      kids: "Tarbiyah Quran Studies",
      quran: "Quran for Elder",
      consultancy: "Consultancy",
      blog: "Blog",
      events: "Events",
      gallery: "Gallery",
      sponsorship: "Sponsorship",
      portalLogin: "Portal Login",
      teacherLogin: "Teacher Login",
      adminLogin: "Admin Login",
      studentLogin: "Student Login",
      joinNow: "Join Now",
      academicHub: "Academic Hub",
      campus: "Campus",
      classRoutine: "Class Routine",
      noticeBoard: "Notice Board",
    },
    bn: {
      address: "৪০/১, সাফা গার্ডেন সাতমসজিদ হাউজিং মোহাম্মদপুর ঢাকা-১২০৭",
      email: "info@tarbiyahonline.com",
      phone1: "+880 1841-514545",
      phone2: "+880 1841-516565",
      login: "লগইন",
      admission: "এডমিশন নাও",
      support: "সাপোর্ট",
      donate: "দান করুন",
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      studentOpinion: "শিক্ষার্থীর মতামত",
      terms: "শর্তাবলী",
      management: "ব্যবস্থাপনা",
      faculty: "শিক্ষকবৃন্দ",
      ourMember: "আমাদের সদস্য",
      department: "বিভাগ",
      liveCourse: "লাইভ কোর্স",
      recordedCourse: "রেকর্ডেড কোর্স",
      courses: "কোর্সসমূহ",
      diploma: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      alemiah: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      kids: "তারবিয়াহ স্টাডিজ ফর কিডস",
      quran: "কুরআন ফর এল্ডারস",
      consultancy: "পরামর্শ",
      blog: "ব্লগ",
      events: "ইভেন্টসমূহ",
      gallery: "গ্যালারি",
      sponsorship: "স্পনসরশিপ",
      portalLogin: "পোর্টাল লগইন",
      teacherLogin: "শিক্ষক লগইন",
      adminLogin: "অ্যাডমিন লগইন",
      studentLogin: "শিক্ষার্থী লগইন",
      joinNow: "যুক্ত হোন",
      academicHub: "একাডেমিক হাব",
      campus: "ক্যাম্পাস",
      classRoutine: "ক্লাস রুটিন",
      noticeBoard: "নোটিশ বোর্ড",
    },
  };

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "bn" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <nav className="w-full">
      {/* টপ বার */}
      <div className="bg-[#004d5a] text-white py-2 px-4 md:px-6 flex flex-col lg:flex-row justify-between items-center text-[13px] gap-2 lg:gap-0">
        <div className="flex gap-4 lg:gap-6 flex-wrap items-center justify-center lg:justify-start text-center">
          <span>{t.address}</span>
          <span>{t.email}</span>
          <span>{t.phone1}</span>
          <span>{t.phone2}</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            to="/admission-now"
            className="bg-gradient-to-r from-[#004d5a] to-[#006b7a] text-white px-4 md:px-5 py-1.5 rounded-md font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md border border-[#006b7a]/30"
          >
            {t.admission}
          </Link>
          <Link to="/support" className="hover:text-teal-200">
            {t.support}
          </Link>
          <Link
            to="/donate"
            className="bg-yellow-500 px-3 py-1 rounded text-black font-bold hover:bg-yellow-400 transition-all"
          >
            {t.donate}
          </Link>
          <button
            className="bg-[#003842] px-3 py-1 rounded hover:bg-[#005f70] transition-all"
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          >
            {language === "en" ? "বাংলা" : "English"}
          </button>
          <Link to="/login" className="hover:text-teal-200">
            {t.login}
          </Link>
        </div>
      </div>

      {/* মেইন নেভবার */}
      <div className="bg-white py-4 px-4 md:px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <Link to="/" className="ml-0 md:ml-10">
          <img
            src={logo}
            alt="Tarbiyah logo"
            className="h-12 md:h-16 w-auto transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-[#004d5a] font-bold">
          <Link to="/" className="hover:text-teal-700">
            {t.home}
          </Link>

          {/* About Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">{t.about} ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md hidden group-hover:block z-50 p-2">
              <Link to="/about" className="block px-4 py-2 hover:bg-gray-100">
                {t.about}
              </Link>
              <Link
                to="/management"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.management}
              </Link>
              <Link to="/faculty" className="block px-4 py-2 hover:bg-gray-100">
                {t.faculty}
              </Link>
              <Link to="/member" className="block px-4 py-2 hover:bg-gray-100">
                {t.ourMember}
              </Link>
              <Link
                to="/student-opinion"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.studentOpinion}
              </Link>
              <Link to="/terms" className="block px-4 py-2 hover:bg-gray-100">
                {t.terms}
              </Link>
            </div>
          </div>

          {/* Department Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">{t.department} ▾</span>
            <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-md hidden group-hover:block z-50 p-2">
              <Link
                to="/course/diploma"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.diploma}
              </Link>
              <Link
                to="/course/alemiah"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.alemiah}
              </Link>
              <Link
                to="/course/kids"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.kids}
              </Link>
              <Link
                to="/course/quran"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.quran}
              </Link>
            </div>
          </div>

          {/* Courses Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">{t.courses} ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md hidden group-hover:block z-50 p-2">
              <Link
                to="/live-course"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.liveCourse}
              </Link>
              <Link
                to="/recorded-course"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.recordedCourse}
              </Link>
            </div>
          </div>

          {/* Academic Hub Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">{t.academicHub} ▾</span>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md hidden group-hover:block z-50 p-2">
              <Link to="/campus" className="block px-4 py-2 hover:bg-gray-100">
                {t.campus}
              </Link>
              <Link
                to="/class-routine"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.classRoutine}
              </Link>
              <Link
                to="/notice-board"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.noticeBoard}
              </Link>
              <Link
                to="/admission-now"
                className="block px-4 py-1.5 rounded-md font-bold bg-gradient-to-r from-[#004d5a] to-[#006b7a] text-white my-1 text-center"
              >
                {t.admission}
              </Link>
              <Link to="/support" className="block px-4 py-2 hover:bg-gray-100">
                {t.support}
              </Link>
            </div>
          </div>

          <Link to="/consultancy" className="hover:text-teal-700">
            {t.consultancy}
          </Link>

          {/* Portal Login Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">{t.portalLogin} ▾</span>
            <div className="absolute top-full left-0 w-40 bg-white shadow-xl rounded-md hidden group-hover:block z-50 p-2">
              <Link
                to="/teacher-login"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.teacherLogin}
              </Link>
              <Link
                to="/admin-login"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.adminLogin}
              </Link>
              <Link
                to="/student-login"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t.studentLogin}
              </Link>
            </div>
          </div>

          <Link to="/register">
            <button className="bg-[#004d5a] text-white px-5 py-2 rounded-md hover:bg-[#003842] transition-all hover:scale-105">
              {t.joinNow}
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#004d5a] focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 text-[#004d5a] font-bold shadow-xl max-h-[80vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-teal-700"
          >
            {t.home}
          </Link>

          <div className="py-1">
            <span className="block text-gray-500 text-xs uppercase mb-1">
              {t.about}
            </span>
            <div className="pl-4 space-y-2 font-normal text-sm">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.about}
              </Link>
              <Link
                to="/management"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.management}
              </Link>
              <Link
                to="/faculty"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.faculty}
              </Link>
              <Link
                to="/member"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.ourMember}
              </Link>
              <Link
                to="/student-opinion"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.studentOpinion}
              </Link>
              <Link
                to="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.terms}
              </Link>
            </div>
          </div>

          <div className="py-1">
            <span className="block text-gray-500 text-xs uppercase mb-1">
              {t.department}
            </span>
            <div className="pl-4 space-y-2 font-normal text-sm">
              <Link
                to="/course/diploma"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.diploma}
              </Link>
              <Link
                to="/course/alemiah"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.alemiah}
              </Link>
              <Link
                to="/course/kids"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.kids}
              </Link>
              <Link
                to="/course/quran"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.quran}
              </Link>
            </div>
          </div>

          <div className="py-1">
            <span className="block text-gray-500 text-xs uppercase mb-1">
              {t.courses}
            </span>
            <div className="pl-4 space-y-2 font-normal text-sm">
              <Link
                to="/live-course"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.liveCourse}
              </Link>
              <Link
                to="/recorded-course"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.recordedCourse}
              </Link>
            </div>
          </div>

          <div className="py-1">
            <span className="block text-gray-500 text-xs uppercase mb-1">
              {t.academicHub}
            </span>
            <div className="pl-4 space-y-2 font-normal text-sm">
              <Link
                to="/campus"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.campus}
              </Link>
              <Link
                to="/class-routine"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.classRoutine}
              </Link>
              <Link
                to="/notice-board"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.noticeBoard}
              </Link>
            </div>
          </div>

          <Link
            to="/consultancy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-teal-700"
          >
            {t.consultancy}
          </Link>

          <div className="py-1">
            <span className="block text-gray-500 text-xs uppercase mb-1">
              {t.portalLogin}
            </span>
            <div className="pl-4 space-y-2 font-normal text-sm">
              <Link
                to="/teacher-login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.teacherLogin}
              </Link>
              <Link
                to="/admin-login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.adminLogin}
              </Link>
              <Link
                to="/student-login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-teal-700"
              >
                {t.studentLogin}
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#004d5a] text-white px-5 py-2 rounded-md hover:bg-[#003842] transition-all text-center">
                {t.joinNow}
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
