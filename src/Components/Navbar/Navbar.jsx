import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo.jpg";

const Navbar = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  const translations = {
    en: {
      address: "40/1, safa garden, mohammadpur - 1207",
      email: "info@tarbiyahonline.com",
      login: "Log In",
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
      alemiah: "Tarbiyah Alemiah Program",
      kids: "Tarbiyah Studies for Kids",
      quran: "Quran for Elders",
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
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭",
      email: "info@tarbiyahonline.com",
      login: "লগইন",
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
      <div className="bg-[#004d4d] text-white py-2 px-6 flex justify-between items-center text-[13px]">
        <div className="flex gap-6 flex-wrap">
          <span>{t.address}</span>
          <span>{t.email}</span>
        </div>
        <div className="flex items-center gap-4">
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
            className="bg-[#003d3d] px-3 py-1 rounded hover:bg-[#005555] transition-all"
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
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <Link to="/" className="ml-10">
          <img
            src={logo}
            alt="Tarbiyah logo"
            className="h-16 w-auto transition-transform hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-6 text-[#004d4d] font-bold">
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

          {/* Department Dropdown (ডিপ্লোমা, আলেমিয়াহ, কিডস, কুরআন) */}
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

          {/* Courses Dropdown (লাইভ ও রেকর্ডেড কোর্স) */}
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

          {/* Academic Hub Dropdown (স্টুডেন্ট বা কর্নার শব্দ ছাড়া নতুন নাম) */}
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
            <button className="bg-[#004d4d] text-white px-5 py-2 rounded-md hover:bg-teal-900 transition-all hover:scale-105">
              {t.joinNow}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
