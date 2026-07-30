import React, { useState } from "react";
import { Link } from "react-router";
import TabriyahBanner from "../../image/arbiyaprogrambabanner.jpg";
import Tarbiyahcourse from "../../image/Tarbiyaprogram.jpg";
import {
  FaArrowLeft,
  FaUsers,
  FaStar,
  FaMosque,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaShare,
  FaBookmark,
  FaInfoCircle,
  FaCommentDots,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaVideo,
  FaCertificate,
  FaGraduationCap,
  FaUserTie,
  FaBook,
  FaPlayCircle,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const AlimiyahProgramDetails = () => {
  const [openSemester, setOpenSemester] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  const toggleSemester = (index) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  // Alimiyah Program এর ইনস্ট্রাক্টর
  const instructors = [
    {
      id: 1,
      name: "Professor Mokhter Ahmad",
      title: "Chairman, Tarbiyah Academy",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Dr. Abu Bakr Muhammad Zakaria",
      title: "Prof. Islamic University, Kushtia",
      subtitle: "Comparative Theology and Aqeedah",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Dr. Zubair Ehsanul Haque",
      title: "Department Head, Dhaka University",
      subtitle: "Subject: Arabic Language",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Dr. Mir Manzoor Mahmud",
      title: "Prof. Manarat Int. University",
      subtitle: "Subject: Seerah and History of Islam",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Dr. Matiul Islam",
      title: "Bangladesh Islamic University",
      subtitle: "Subject: Hadith Studies",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Ustad Hossain Mohammad Hridoy",
      title: "Coordinator",
      subtitle: "Department of Islamic Studies, Tarbiyah Education Network",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 7,
      name: "Ustad Abdullah Al Mamun",
      title: "Faculty",
      subtitle: "Tarbiyah Education Network",
      image: "https://i.pravatar.cc/150?img=9",
    },
  ];

  // Alimiyah Program এর Curriculum Data
  const semestersData = [
    {
      title: "কুর’আনিক স্টাডিজ",
      subjects: [
        "১ম সেমিস্টার: কায়দাহ নুরানিয়াহ",
        "২য় সেমিস্টার: জুয আম্মা নাজেরা ও ছোট ১০ সুরাহ হিফয",
        "৩য় সেমিস্টার: জুয তাবারক নাজেরা ও তাজউইদ-১",
        "৪র্থ সেমিস্টার: জুয আম্মা হিফয ও তাজউইদ-২",
        "৫ম সেমিস্টার: জুয তাবারক হিফয",
        "৬ষ্ঠ সেমিস্টার: ফাযীলাহপূর্ণ সুরাহ হিফয",
        "৭ম সেমিস্টার: উলুমুল কুরআন-১ মৌলিক বিষয়সমূহ",
        "৮ম সেমিস্টার: অনুবাদসহ কুরআন (জুয আম্মা)",
        "৯ম সেমিস্টার: সংক্ষিপ্ত তাফসীর (জুয আম্মা)",
      ],
    },
    {
      title: "হাদিস স্টাডিজ ও আকীদাহ",
      videoLink: "https://youtu.be/K35WK5Td1BY?si=ll7b9_YlDm0QrME8",
      subjects: [
        "১ম সেমিস্টার: হিফযুল হাদিস-১ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-১ ও ২",
        "২য় সেমিস্টার: হিফযুল হাদিস-২ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-৩ ও ৪ ",
        "৩য় সেমিস্টার: হিফযুল হাদিস-৩ (অর্থসহ ৩০টি হাদিস) এবং আরকানুল ইমান-৫ ও ৬",
        "৪র্থ সেমিস্টার: ইমাম নববীর ৪০ হাদিস-১",
        "৫ম সেমিস্টার: ইমাম নববীর ৪০ হাদিস-২",
        "৬ষ্ঠ সেমিস্টার: শামায়িলুন নাবী স.",
        "৭ম সেমিস্টার: উলূমুল হাদীস-১ (হাদিস পরিচিতি, ও বিভিন্ন পরিভাষা)",
        "৮ম সেমিস্টার: উলূমুল হাদীস-২ (হাদিসের প্রামাণ্যতা, সঙ্কলন ও হাদিস বোঝার মূলনীতি)",
        "৯ম সেমিস্টার: উলূমুল হাদীস-৩ (প্রচলিত ভ্রান্ত ও বানোয়াট হাদিস)",
      ],
    },
    {
      title: "এ্যারাবিক রিডিং",
      subjects: [
        "১ম সেমিস্টার: মদিনা এরাবিক-১/এসো আরবি শিখি-১",
        "২য় সেমিস্টার: मদিনা এরাবिक-२/এসো আরবি শিখি-১",
        "৩য় সেমিস্টার: মদিনা এরাবিক-৩/এসো আরবি শিখি-২",
        "৪র্থ সেমিস্টার: মদিনা এরাবিক-৪/এসো আরবি শিখি-২",
        "৫ম সেমিস্টার: মদিনা এরাবিক-৫/এসো আরবি শিখি-৩",
        "৬ষ্ঠ সেমিস্টার: মদিনা এরাবিক-৬/এসো আরবি শিখি-৩",
        "৭ম সেমিস্টার: কাসাসুন নাবিয়্যীন-১",
        "৮ম সেমিস্টার: কাসাসুন নাবিয়্যীন-২",
        "৯ম সেমিস্টার: কাসাসুন নাবিয়্যীন-৩",
      ],
    },
    {
      title: "এ্যারাবিক গ্রামার",
      videoLink: "https://youtu.be/cDNDp0MSNNU?si=FwAPr5PHHzT0XY5N",
      subjects: [
        "১ম সেমিস্টার: সংশ্লিষ্ট কোর্স বুক থেকে শব্দার্থ অনুশীলন ও হস্তলিপি চর্চা",
        "২য় সেমিস্টার: মদিনা এরাবিক-১/এসো আরবি শিখি-১ থেকে গ্রামার ও লিখিত অনুশীলন ",
        "৩য় সেমিস্টার: মদিনা এরাবিক-২/এসো আরবি শিখি-১ থেকে গ্রামার ও লিখিত অনুশীলন",
        "৪র্থ সেমিস্টার: मদিনা এরাবिक-३/এসো আরবি শিখি-২ থেকে গ্রামার ও লিখিত অনুশীলন",
        "৫ম সেমিস্টার: মদিনা এরাবিক-४/এসো আরবি শিখি-২ থেকে গ্রামার ও লিখিত অনুশীলন",
        "৬ষ্ঠ সেমিস্টার: মদিনা এরাবিক-৫/এসো আরবি শিখি-৩ থেকে গ্রামার ও লিখিত অনুশীলন",
        "৭ম সেমিস্টার: মদিনা এরাবিক-৬/এসো আরবি শিখি-৩ থেকে গ্রামার ও লিখিত অনুশীলন",
        "৮ম সেমিস্টার: বেসিক সরফ",
        "৯ম সেমিস্টার: বেসিক নাহু",
      ],
    },
    {
      title: "ফিকহ ও উসুলুল ফিকহ",
      videoLink: "https://youtu.be/Dk_JT5hK2wg?si=dFDBOvH7AJRzVtxr",
      subjects: [
        "১ম সেমিস্টার: ফিকহুত তাহারাহ ও আদাব-মাসনুন দুয়া",
        "২য় সেমিস্টার: ফিকহুস সালাহ",
        "৩য় সেমিস্টার: ফিকহুস সাউম",
        "৪র্থ সেমিস্টার: ফিকহুস যাকাহ ",
        "৫ম সেমিস্টার: ফিকহুল হাজ্জ",
        "৬ষ্ঠ সেমিস্টার: ফিকহুল উদহিয়াহ ওয়াল জানাইয",
        "৭ম সেমিস্টার: ফিকহুন নিকাহ",
        "৮ম সেমিস্টার: উসুলুল ফিকহ-১",
        "৯ম সেমিস্টার: উসুলুল ফিকহ-২",
      ],
    },
    {
      title: "সিরাতুন্নাবী (স.) ও ইসলামি ইতিহাস",
      subjects: [
        "১ম সেমিস্টার: মাক্কী অধ্যায়-১",
        "২য় সেমিস্টার: মাক্কী অধ্যায়-২",
        "৩য় সেমিস্টার: মাদানী অধ্যায়",
        "৪র্থ সেমিস্টার: খুলাফা রাশিদাহ",
        "৫ম সেমিস্টার: উল্লেখযোগ্য সাহাবীদের জীবনী",
        "৬ষ্ঠ সেমিস্টার: উমাইয়া খিলাফাহ",
        "৭ম সেমিস্টার: আব্বাসী খিলাফাহ",
        "৮ম সেমিস্টার: উসমানী ও আন্দালুস শাসনকাল",
        "৯ম সেমিস্টার: ভারত উপমহাদেশে মুসলিম শাসন",
      ],
    },
  ];

  const programStructure = {
    duration: "কুইজ ও মিডটার্ম পরীক্ষা",
    classMethod: "সেমিস্টার ফাইনাল পরীক্ষা",
    time: "৯টি সেমিস্টারে মোট ৩ বছর",
    classesPerWeek: "সার্টিফিকেট ও ইজাযাহ প্রদান",
  };

  // Prospectus PDF link
  const prospectusLink =
    "https://acrobat.adobe.com/id/urn:aaid:sc:ap:6475bc81-d81e-455d-9716-81cdba6bf4f4";

  const handleDownloadPDF = () => {
    window.open(prospectusLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/course/alemiah"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">আলেমিয়াহ পেজে ফিরে যান</span>
          </Link>

          {/* Hero Section - Same Size as Diploma Page */}
          <img
            src={TabriyahBanner}
            alt="Diploma Banner"
            className="w-full max-w-3xl h-15 sm:h-25 md:h-40 object-cover rounded-2xl border border-gray-100 ml-8 mr-72"
          />

          {/* Course Info Section - Below Banner */}
          <div className="ml-8 mr-72">
            {/* Share & Wishlist */}
            <div className="flex items-center gap-4 py-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaShare className="text-lg" />
                <span className="font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#002b2b] transition-colors">
                <FaBookmark className="text-lg" />
                <span className="font-medium">Wishlist</span>
              </button>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-[#007a91] mb-3">
              TARBIYAH ALIMIZAH PROGRAM
            </h1>

            {/* Course Info & Reviews Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all ${
                  activeTab === "info"
                    ? "border-[#002b2b] text-[#002b2b] font-semibold"
                    : "border-transparent text-gray-500 hover:text-[#002b2b]"
                }`}
              >
                <FaInfoCircle />
                <span>Course Info</span>
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-all ${
                  activeTab === "reviews"
                    ? "border-[#002b2b] text-[#002b2b] font-semibold"
                    : "border-transparent text-gray-500 hover:text-[#002b2b]"
                }`}
              >
                <FaCommentDots />
                <span>Reviews</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-center">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>

          {/* Main Content Layout: Left 2 Columns, Right 1 Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* ABOUT COURSE */}
              <div className="p-8 mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ABOUT COURSE
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To nurture Islamic knowledge in the hearts of Muslim children
                  and teenagers, Tarbiyah Education Network proudly presents the
                  *Tarbiyah Alimiyyah Program*. This program is designed to
                  equip each child with the ability to practice Islam in their
                  daily lives, combining the study of Qur'an, Hadith, Arabic
                  language, Aqidah, Fiqh, and Islamic etiquette. To make Islamic
                  knowledge accessible to all, the program is available in both
                  Bengali and English, overcoming language barriers. With a
                  research-based syllabus, well-structured curriculum, and
                  experienced teachers, this two-year-long journey of knowledge
                  has been transforming the lives of Muslim children and
                  teenagers.
                </p>
              </div>

              {/* EARN A CERTIFICATE */}
              <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#00ADD2] mb-2">
                    EARN A CERTIFICATE
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add this certificate to your resume to demonstrate your
                    skills & increase your chances of getting noticed.
                  </p>
                </div>
                <div className="w-48 h-32 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                  Selected template preview
                </div>
              </div>

              {/* WHAT YOU WILL GAIN */}
              <div className="bg-white rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    WHAT YOU WILL GAIN
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  সালাফদের আকিদাহ সম্পর্কিত জ্ঞানলাভ
                </p>
                <p className="text-gray-700 leading-relaxed">
                  দ্বীনের নিত্যপ্রয়োজনীয় মৌলিক ও গভীর জ্ঞানার্জন
                </p>
                <p className="text-gray-700 leading-relaxed">
                  পবিত্রতা, সালাত, সিয়াম, যাকাত ও হজ্জের সঠিক পদ্ধতি জানা
                </p>
                <ul className="text-gray-700 leading-relaxed">
                  <li>আরবি ভাষায় দক্ষতার ফলে মৌলিক উৎস থেকে উপকার লাভ</li>
                  <li>
                    নিজেকে একজন প্রকৃত এবং প্র্যাক্টিসিং মুসলিম হিসেবে
                    প্রতিষ্ঠিত করা
                  </li>
                  <li>
                    বিশুদ্ধ কুরআন তিলাওয়াত, অনুধাবন ও ব্যাখ্যা জেনে নিজেকে শাণিত
                    করা
                  </li>
                  <li>
                    দ্বীনের মৌলিক ও গভীর জ্ঞানার্জন করে দা’ঈ হিসেবে ক্যারিয়ার
                    গড়ার সুযোগ
                  </li>
                  <li>
                    দৈনন্দিন কথোপকথনসহ আরবি ভাষায় লিখন-পাঠ ও শ্রবণের যোগ্যতা
                    অর্জন
                  </li>
                  <li>
                    হাদিস মুখস্থকরণ, অনুধাবন ও পালনের মাধ্যমে সুন্নাহ ভিত্তিক
                    জীবনযাপনের পাঠগ্রহণ
                  </li>
                  <li>
                    সিরাহ ও ইসলামি ইতিহাস জেনে যুগের সকল ফিতনা মুকাবেলায় নিজেকে
                    প্রস্তুত রাখা
                  </li>
                </ul>
              </div>

              {/* Ready To Apply Your Course */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-6 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#002b2b]">
                    Ready To Apply Your Course
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enroll now and start your structured learning journey.
                  </p>
                </div>
                <Link to="/Course-apply-from">
                  <button className="bg-[#002b2b] hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all">
                    Start Now
                  </button>
                </Link>
              </div>

              {/* KEY FEATURES OF THE PROGRAM */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    Target Audience
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    "Designed for those living abroad who lack access to quality Islamic education.",
                    "A professional English version is available specifically for English-medium students.",
                    "Perfect for those who wish to combine general education with a strong foundation in Islamic studies.",
                    "This course is specially designed for students aged 7 to 12 years.",
                    "Ideal for parents who aspire to raise their children as practicing Muslims.",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors"
                    >
                      <span className="text-yellow-500 font-bold text-lg leading-none">
                        »
                      </span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRAM STRUCTURE */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    Materials Included
                  </h2>
                </div>

                {/* Program Structure Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse">
                    <thead></thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          সপ্তাহে ২ দিন ৬টি ক্লাস
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.duration}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          প্রতিটি ক্লাস ৪০ মিনিট
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classMethod}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          প্রতিটি ক্লাসের পিডিএফ নোট
                        </td>
                        <td className="py-3 px-4">{programStructure.time}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          প্রতিটি ক্লাসের রেকর্ডেড ভিডিও
                        </td>
                        <td className="py-3 px-4">
                          {programStructure.classesPerWeek}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-3 px-4">
                          {programStructure.sessionsPerSemester}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          {programStructure.language}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Curriculum Section */}
                <h3 className="text-xl font-bold text-[#00ADD2] mb-4">
                  Curriculum
                </h3>
                <div className="space-y-4">
                  {semestersData.map((sem, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleSemester(index)}
                        className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 text-left font-bold text-[#002b2b] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          {sem.title}
                        </span>
                        {openSemester === index ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {openSemester === index && (
                        <div className="p-5 bg-white border-t border-gray-200 space-y-3">
                          {/* Video Link Section (Only shows if videoLink exists) */}
                          {sem.videoLink && (
                            <div className="mb-3">
                              <a
                                href={sem.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#00ADD2] font-medium hover:text-[#002b2b] transition-colors border-b border-[#00ADD2] hover:border-[#002b2b] pb-1"
                              >
                                <FaPlayCircle className="text-lg" />
                                <span>ভিডিও দেখুন (YouTube)</span>
                              </a>
                            </div>
                          )}

                          {/* Subject Lists */}
                          <div className="space-y-2">
                            {sem.subjects.map((sub, sIndex) => (
                              <div
                                key={sIndex}
                                className="flex items-start gap-2 text-gray-700 text-sm py-1 border-b border-gray-50 last:border-none"
                              >
                                <span className="text-yellow-500 font-bold">
                                  ✔
                                </span>
                                <span>{sub}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ADMISSION REQUIREMENTS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    ADMISSION REQUIREMENTS
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#002b2b]">
                        <th className="py-3 px-4 font-bold">Requirement</th>
                        <th className="py-3 px-4 font-bold">Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold">
                          Minimum Education
                        </td>
                        <td className="py-3 px-4">
                          HSC / Alim / A-Levels / Equivalent
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">
                          Suitable For
                        </td>
                        <td className="py-3 px-4">
                          Students seeking a full-time structured Alimiyah
                          education, working professionals aiming for Deeni
                          knowledge, and those pursuing higher Islamic academia.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FEE STRUCTURE (BDT) - UPDATED EXACTLY LIKE YOUR SS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#00ADD2]">
                    FEE STRUCTURE (BDT)
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#002b2b]">
                        <th className="py-3 px-4 font-bold text-[#00ADD2] text-lg">
                          বাংলা ভার্শন:
                        </th>
                        <th className="py-3 px-4 font-bold text-[#00ADD2] text-lg">
                          ইংলিশ ভার্শন:
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              ভর্তি ফি ২০০০ টাকা
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              ভর্তি ফি ৩০০০ টাকা
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              সেমিস্টার ফি ৪০০০ টাকা
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-[#00ADD2] text-lg" />
                            <span className="font-medium text-[#002b2b]">
                              সেমিস্টার ফি ১২০০০ টাকা
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SCHOLARSHIP OPPORTUNITIES */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-xl font-bold text-[#00ADD2]">
                    * সেমিস্টার ফি মাসিক ইনস্টলমেন্ট এর মাধ্যমে প্রদানের সুযোগ
                    রয়েছে।
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1 Column (Fixed the Error) */}
            <div className="space-y-4 -mt-[305px]">
              {/* Video Thumbnail */}
              <a
                href="https://youtu.be/7gLTq-1fJFk?si=aZ2WOC1ZBRuAJimB"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
              >
                <img
                  src={Tarbiyahcourse} // ✅ FIXED: Replaced 'AlemyahCourse' with 'Tarbiyahcourse'
                  alt="Course Video"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-12 h-12 bg-[#008080] rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                    <svg
                      className="w-6 h-6 fill-current translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Pricing & Enrollment Card (Fixed Nested Div Error) */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-[#007a91]">
                <h1 className="text-2xl font-bold text-[#007a91] mb-5">
                  ENROLL NOW
                </h1>

                {/* Split Button with Links */}
                <div className="flex items-center justify-center mb-6 relative">
                  {/* Left Half - Link */}
                  <Link to="/course/alemiah/kids/enroll" className="w-1/2">
                    <button className="w-full bg-[#007a91] text-white font-bold py-3 rounded-l-md hover:opacity-90 transition">
                      Bangla Version
                    </button>
                  </Link>

                  {/* Middle Or Circle */}
                  <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#002b2b] font-medium shadow-md z-10 text-[10px]">
                    Or
                  </div>

                  {/* Right Half - Link */}
                  <Link to="/enroll/alemiyah/english-version" className="w-1/2">
                    <button className="w-full bg-[#003d3d] text-white font-bold py-3 rounded-r-md hover:opacity-90 transition">
                      English Version
                    </button>
                  </Link>
                </div>

                {/* Info Details */}
                <div className="space-y-3 text-left px-1 text-[#002b2b]">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Course Level:</span>
                    <span className="font-bold">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Enrolled:</span>
                    <span className="font-bold">325</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="font-medium">Last Updated:</span>
                    <span className="font-bold">12/24/2024</span>
                  </div>
                </div>
              </div>

              {/* Instructors List */}
              <div className="bg-white rounded-3xl">
                <h3 className="text-xl font-bold text-[#002b2b] mb-4 border-b pb-2">
                  ফ্যাকাল্টি
                </h3>
                <div className="space-y-4">
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
                    >
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-12 h-12 rounded-full object-cover border border-yellow-500 flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-[#002b2b] truncate">
                          {instructor.name}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {instructor.title}
                        </p>
                        {instructor.subtitle && (
                          <p className="text-[11px] text-gray-500 truncate">
                            {instructor.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlimiyahProgramDetails;
