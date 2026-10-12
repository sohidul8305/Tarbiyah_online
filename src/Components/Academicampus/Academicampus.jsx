import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserTie,
  FaMapMarkerAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Campus = ({ onLogin }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  // ল্যাঙ্গুয়েজ চেঞ্জ লিসেনার
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
      platformAccessTitle: "Platform Access:",
      platformAccessDesc: "Available 24/7 via Student Portal Login.",
      loginBtn: "Login to Virtual Campus",
      facilitiesTitle: "Campus Facilities",
      f1: "Modern Digital Classrooms",
      f2: "Dedicated Student Support",
      f3: "Rich Islamic Library & Resources",
      f4: "Experienced Faculty Members",
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
      platformAccessTitle: "প্লাটফর্ম অ্যাক্সেস:",
      platformAccessDesc: "স্টুডেন্ট পোর্টাল লগইন এর মাধ্যমে ২৪/৭ উপলব্ধ।",
      loginBtn: "ভার্চুয়াল ক্যাম্পাসে লগইন করুন",
      facilitiesTitle: "ক্যাম্পাসের সুবিধাসমূহ",
      f1: "আধুনিক ডিজিটাল ক্লাসরুম",
      f2: "ডেডিকেটেড স্টুডেন্ট সাপোর্ট",
      f3: "সমৃদ্ধ ইসলামি লাইব্রেরি ও রিসোর্স",
      f4: "অভিজ্ঞ শিক্ষক মণ্ডলী",
    },
  };

  const t = content[language];

  // লগইন হ্যান্ডলার: onLogin থাকলে সেটা কল করবে, নাহলে /campus-login এ যাবে
  const handleLogin = () => {
    if (typeof onLogin === "function") {
      onLogin();
    } else {
      window.location.href = "/campus-login";
    }
  };

  const facilities = [
    {
      id: "f1",
      icon: <FaChalkboardTeacher className="text-4xl text-[#004d4d]" />,
    },
    { id: "f2", icon: <MdSupportAgent className="text-4xl text-[#004d4d]" /> },
    { id: "f3", icon: <FaBookOpen className="text-4xl text-[#004d4d]" /> },
    { id: "f4", icon: <FaUserTie className="text-4xl text-[#004d4d]" /> },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-6 md:px-16 font-sans overflow-hidden">
      {/* ================= হিরো সেকশন ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="bg-teal-100 text-[#004d4d] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4 inline-block shadow-sm">
          Tarbiyah Education
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      {/* ================= মেইন কার্ড সেকশন ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
        {/* ---------- অফলাইন ক্যাম্পাস কার্ড ---------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100 flex flex-col"
        >
          <div className="h-2 bg-[#004d4d] w-full"></div>
          <div className="p-8 flex flex-col flex-1">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBuilding className="text-2xl text-[#004d4d]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#004d4d] transition-colors">
              {t.offlineTitle}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t.offlineDesc}
            </p>

            <div className="mt-auto bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#004d4d] mt-1 text-xl flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">
                  {t.addressTitle}
                </h4>
                <p className="text-gray-600 text-sm">{t.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- ভার্চুয়াল ক্যাম্পাস কার্ড (Login Button সহ) ---------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group border border-gray-100 flex flex-col"
        >
          <div className="h-2 bg-[#004d4d] w-full"></div>
          <div className="p-8 flex flex-col flex-1">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaLaptopCode className="text-2xl text-[#004d4d]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#004d4d] transition-colors">
              {t.onlineTitle}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{t.onlineDesc}</p>

            <div className="mt-auto space-y-5">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {t.platformAccessTitle}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t.platformAccessDesc}
                  </p>
                </div>
              </div>

              {/* লগইন বাটন — প্রাইমারি কালার #004d4d */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 bg-[#004d4d] hover:bg-[#003333] text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
              >
                <FaSignInAlt className="text-lg" />
                {t.loginBtn}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= সুবিধাসমূহ (Facilities) ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100"
      >
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
      </motion.div>
    </div>
  );
};

export default Campus;
