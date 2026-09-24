import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserTie,
  FaMapMarkerAlt,
  FaHome,
  FaTachometerAlt,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Campus = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  // ট্যাব স্টেট: শুধু "home", "dashboard"
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const content = {
    en: {
      title: "Discover Our Campus",
      subtitle: "Welcome to Tarbiyah Online & Offline Learning Environment",
      offlineTitle: "Physical Campus & Office",
      offlineDesc:
        "Our physical campus provides an interactive and serene environment for students to excel in Islamic and modern education. Experience learning like never before.",
      addressTitle: "Campus Address:",
      address: "40/1, Safa Garden, Mohammadpur - 1207, Dhaka",
      onlineTitle: "Virtual Campus",
      onlineDesc:
        "Experience our state-of-the-art virtual learning management system, live interactive classes, and 24/7 digital resource accessibility from anywhere in the world.",
      facilitiesTitle: "Campus Facilities",
      f1: "Modern Digital Classrooms",
      f2: "Dedicated Student Support",
      f3: "Rich Islamic Library & Resources",
      f4: "Experienced Faculty Members",
      homeTab: "01 Home",
      dashboardTab: "02 Dashboard",
      noticeBoardTitle: "Notice Board",
      academicCalendarTitle: "Academic Calendar",
    },
    bn: {
      title: "আমাদের ক্যাম্পাস",
      subtitle:
        "তারবিয়াহর অনলাইন ও অফলাইন লার্নিং এনভায়রনমেন্টে আপনাকে স্বাগতম",
      offlineTitle: "অফলাইন ক্যাম্পাস ও অফিস",
      offlineDesc:
        "আমাদের শারীরিক ক্যাম্পাস শিক্ষার্থীদের ইসলামি ও আধুনিক শিক্ষায় উৎকর্ষ সাধনের জন্য একটি শান্ত ও উপযোগী পরিবেশ প্রদান করে। আসুন এবং শিক্ষার নতুন অভিজ্ঞতা নিন।",
      addressTitle: "ক্যাম্পাসের ঠিকানা:",
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭, ঢাকা",
      onlineTitle: "ভার্চুয়াল ক্যাম্পাস",
      onlineDesc:
        "বিশ্বের যেকোনো প্রান্ত থেকে আমাদের অত্যাধুনিক ভার্চুয়াল লার্নিং ম্যানেজমেন্ট সিস্টেম, লাইভ ইন্টারেক্টিভ ক্লাস এবং ২৪/৭ ডিজিটাল রিসোর্সের সুবিধা উপভোগ করুন।",
      facilitiesTitle: "ক্যাম্পাসের সুবিধাসমূহ",
      f1: "আধুনিক ডিজিটাল ক্লাসরুম",
      f2: "ডেডিকেটেড স্টুডেন্ট সাপোর্ট",
      f3: "সমৃদ্ধ ইসলামি লাইব্রেরি ও রিসোর্স",
      f4: "অভিজ্ঞ শিক্ষক মণ্ডলী",
      homeTab: "০১ হোম",
      dashboardTab: "০২ ড্যাশবোর্ড",
      noticeBoardTitle: "নোটিশ বোর্ড",
      academicCalendarTitle: "একাডেমিক ক্যালেন্ডার",
    },
  };

  const t = content[language];

  // নোটিশ বোর্ডের ডেটা
  const notices = [
    {
      id: 1,
      date: "August 10, 2026",
      titleEn: "Final Exam Routine Published for Diploma Students.",
      titleBn: "ডিপ্লোমা শিক্ষার্থীদের ফাইনাল পরীক্ষার রুটিন প্রকাশিত হয়েছে।",
    },
    {
      id: 2,
      date: "August 05, 2026",
      titleEn:
        "Online Classes will remain closed on Friday due to maintenance.",
      titleBn:
        "রক্ষণাবেক্ষণের কাজের জন্য আগামী শুক্রবার অনলাইন ক্লাস বন্ধ থাকবে।",
    },
  ];

  const facilities = [
    {
      id: "f1",
      icon: <FaChalkboardTeacher className="text-4xl text-[#004d4d]" />,
    },
    { id: "f2", icon: <MdSupportAgent className="text-4xl text-[#004d4d]" /> },
    { id: "f3", icon: <FaBookOpen className="text-4xl text-[#004d4d]" /> },
    { id: "f4", icon: <FaUserTie className="text-4xl text-[#004d4d]" /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-6 md:px-16 font-sans overflow-hidden">
      {/* টপ ট্যাব ন্যাভবার (01 Home, 02 Dashboard) */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-2 rounded-2xl shadow-md border border-gray-200 flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === "home"
                ? "bg-[#004d4d] text-white shadow-lg scale-105"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaHome /> {t.homeTab}
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === "dashboard"
                ? "bg-[#004d4d] text-white shadow-lg scale-105"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaTachometerAlt /> {t.dashboardTab}
          </button>
        </div>
      </div>

      {/* ট্যাব কন্টেন্ট সেকশন */}
      <AnimatePresence mode="wait">
        {/* ================= 01 HOME TAB ================= */}
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* হিরো সেকশন */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-teal-100 text-[#004d4d] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 inline-block shadow-sm">
                Tarbiyah Education
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {t.title}
              </h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* নোটিশ বোর্ড সেকশন */}
            <div className="max-w-4xl mx-auto mb-16 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <FaBell className="text-2xl text-[#004d4d]" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.noticeBoardTitle}
                </h3>
              </div>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 bg-teal-50/50 border-l-4 border-[#004d4d] rounded-r-xl"
                  >
                    <span className="text-xs font-bold text-[#004d4d] bg-teal-100 px-2.5 py-1 rounded-full">
                      {notice.date}
                    </span>
                    <p className="text-gray-800 font-medium mt-2">
                      {language === "en" ? notice.titleEn : notice.titleBn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* মেইন কার্ড সেকশন */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
              {/* অফলাইন ক্যাম্পাস কার্ড */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100">
                <div className="h-2 bg-[#004d4d] w-full"></div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaBuilding className="text-2xl text-[#004d4d]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#004d4d] transition-colors">
                    {t.offlineTitle}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {t.offlineDesc}
                  </p>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                    <FaMapMarkerAlt className="text-[#004d4d] mt-1 text-xl flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {t.addressTitle}
                      </h4>
                      <p className="text-gray-600 text-sm">{t.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ভার্চুয়াল ক্যাম্পাস কার্ড */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100">
                <div className="h-2 bg-yellow-500 w-full"></div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaLaptopCode className="text-2xl text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                    {t.onlineTitle}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {t.onlineDesc}
                  </p>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {language === "en"
                          ? "Platform Access:"
                          : "প্লাটফর্ম অ্যাক্সেস:"}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {language === "en"
                          ? "Available 24/7 via Student Portal Login."
                          : "স্টুডেন্ট পোর্টাল লগইন এর মাধ্যমে ২৪/৭ উপলব্ধ।"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* সুবিধাসমূহ (Facilities) */}
            <div className="max-w-6xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {t.facilitiesTitle}
                </h3>
                <div className="w-20 h-1.5 bg-[#004d4d] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5 group-hover:bg-[#004d4d] transition-colors duration-300">
                      <div className="group-hover:text-white transition-colors duration-300">
                        {facility.icon}
                      </div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg leading-snug group-hover:text-[#004d4d] transition-colors">
                      {t[facility.id]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= 02 DASHBOARD TAB ================= */}
        {activeTab === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            {/* একাডেমিক ক্যালেন্ডার সেকশন */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <FaCalendarAlt className="text-3xl text-[#004d4d]" />
                <h2 className="text-3xl font-bold text-gray-900">
                  {t.academicCalendarTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                  <span className="text-xs font-bold text-[#004d4d] uppercase">
                    Semester Start
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    September 1, 2026
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    New batch orientation and classes begin.
                  </p>
                </div>
                <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <span className="text-xs font-bold text-yellow-700 uppercase">
                    Mid-Term Exams
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    November 15, 2026
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Online portal assessment test.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-700 uppercase">
                    Vacation
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    December 20, 2026
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Winter break and semester break.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Campus;
