import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaCertificate,
  FaChevronDown,
  FaChevronUp,
  FaShareAlt,
  FaRegHeart,
  FaPlay,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import KidsImg from "../../image/kids.jpg";

const HifzRevisionDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const course = {
    title: "হিফজ রিভিশন কোর্স",
    subtitle: "মুখস্থ কুরআন পুনর্বীক্ষণ",
    description: `মুখস্থকৃত কুরআন পাকা ও মজবুত করার জন্য অভিজ্ঞ মাশায়েখদের তত্ত্বাবধানে বিশেষ রিভিশন প্রোগ্রাম। এই কোর্সের মাধ্যমে আপনি আপনার দুর্বল স্থানগুলো চিহ্নিত করে অত্যন্ত সুন্দরভাবে পুরো কুরআন মাজিদ রিভিশন সম্পন্ন করতে পারবেন।`,
    shortDesc: `মুখস্থকৃত কুরআন পাকা ও মজবুত করার জন্য অভিজ্ঞ মাশায়েখদের তত্ত্বাবধানে বিশেষ রিভিশন প্রোগ্রাম...`,
    objectives: [
      "মৌখিক পদ্ধতিতে তেলাওয়াত শিক্ষা",
      "২৯তম পারা থেকে ৩০তম পারা সম্পূর্ণ হিফজ",
      "গুরুত্বপূর্ণ সূরা সমূহ মুখস্থ",
      "প্রতিদিন লাইভ ক্লাসে যোগাযোগ",
      "হযরত সালাতের নিয়মিত অনুশীলন",
      "শেষ ১০টি স্থায়ী সূরা হিফজ",
      "নিয়মিত মাশক ও তাজবীদের সুত্র শিক্ষা",
    ],
    materials: [
      "লাইভ জুম ক্লাস ও ভিডিও রেকর্ডিং (প্রতিটি ক্লাস)",
      "প্রাইভেট টেলিগ্রাম বা জুম গ্রুপ সাপোর্ট",
      "সাপ্তাহিক রিভিশন টেস্ট ও ৪ দিন নিয়মিত প্র্যাকটিস ক্লাস",
      "পরীক্ষক: সিইবিটি এবং ট্রেইনার",
      "প্র্যাকটিক্যাল তাজবীদ এবং মাখরাজ",
      "কোর্স শেষে সার্টিফিকেট প্রদান",
    ],
    curriculum: [
      {
        title: "তাজবীদ বুনিয়াদি আলোচনা",
        desc: "তাজবীদের প্রাথমিক নিয়মকানুন ও মাখরাজ সম্পর্কে বিস্তারিত আলোচনা।",
      },
      {
        title: "সহজ মাসা ও রোজা বর্জন",
        desc: "দৈনন্দিন জীবনের প্রয়োজনীয় মাসআলা-মাসায়েল শিক্ষা।",
      },
      {
        title: "তাজবীদসহ সুনির্দিষ্ট নিয়ম ও প্রয়োগ",
        desc: "কুরআন তেলাওয়াতে তাজবীদ প্রয়োগের সঠিক নিয়ম।",
      },
      {
        title: "কুরআন তেলাওয়াতে ট্রায়ানজিক করা ছোট সূরা-সমূহ",
        desc: "ছোট সূরাগুলো সুন্দর ও শুদ্ধ করে মুখস্থ ও তেলাওয়াত।",
      },
      {
        title: "কুরআন তেলাওয়াতে লিড গান: বড় সূরা ও তাজবীদসহ",
        desc: "বড় সূরাগুলোর তেলাওয়াত ও তাজবীদ চর্চা।",
      },
      {
        title: "হযরত সালাতের প্রশিক্ষণ",
        desc: "নামাজের সঠিক ক্বেরাত ও মাসআলার প্র্যাকটিক্যাল ক্লাস।",
      },
    ],
    targetAudience: [
      "লেভেল এ পড়ুয়া ছাত্র কুরআনের সিরাত ও হিফজ করতে আগ্রহী",
      "রেগুলার শিক্ষক পাশাপাশি ধারা কুরআন শিক্ষা প্রতি আগ্রহ পোষণ করেন",
      "৫-১২ বছরের সকল শিশুটির জন্য এই কোর্সিটি বিশেষভাবে ডিজাইন করা হয়েছে",
      "যারা রিভিশন সহকারে প্রাকৃতিক মুসলিম হতে উৎসাহ দান",
    ],
    feeStructure: {
      bd: {
        title: "বাংলাদেশী ছাত্র",
        admission: "ভর্তি ফি: ১০০০ টাকা",
        monthly: "মাসিক ফি: ২০০০ টাকা",
      },
      overseas: {
        title: "প্রবাসী ছাত্র",
        admission: "ভর্তি ফি: ২০০০ টাকা",
        monthly: "মাসিক ফি: ৩০০০ টাকা",
      },
    },
    rating: "0 (0 Ratings)",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/course/kids"
          className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 mb-4 transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          <span>কোর্স পেজে ফিরে যান</span>
        </Link>

        {/* Main Grid Layout with Sidebar Alignment Correction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Banner Image */}
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md bg-cyan-900 relative">
              <img
                src={KidsImg}
                alt={course.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {course.title}
                </h1>
              </div>
            </div>

            {/* Share, Wishlist, Rating bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
              <div className="flex items-center gap-4 text-cyan-700">
                <button className="flex items-center gap-1.5 hover:underline font-medium">
                  <FaShareAlt /> Share
                </button>
                <button className="flex items-center gap-1.5 hover:underline font-medium">
                  <FaRegHeart /> Wishlist
                </button>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-600 text-xs ml-1">
                  {course.rating}
                </span>
              </div>
            </div>

            {/* ABOUT COURSE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-3 tracking-wide">
                ABOUT COURSE
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {showMore ? course.description : course.shortDesc}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-cyan-600 text-sm font-semibold mt-3 hover:underline flex items-center gap-1"
              >
                {showMore ? "- Show Less" : "+ Show More"}
              </button>
            </div>

            {/* WHAT YOU WILL GAIN */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                WHAT YOU WILL GAIN
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold leading-tight">
                      »
                    </span>
                    <span className="leading-snug">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EARN A CERTIFICATE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-cyan-700 font-bold text-lg mb-2 tracking-wide">
                  EARN A CERTIFICATE
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Add this certificate to your resume to demonstrate your skills
                  & increase your chances of getting noticed.
                </p>
              </div>
              <div className="w-48 bg-cyan-50 border border-cyan-200 rounded-lg p-3 shadow-inner text-center flex-shrink-0">
                <div className="w-full h-28 bg-white border border-cyan-300 rounded flex flex-col items-center justify-center text-cyan-800 text-xs font-bold shadow-sm p-2">
                  <FaCertificate className="text-3xl text-cyan-600 mb-1" />
                  <span className="text-[10px] text-gray-500">
                    কোর্স সার্টিফিকেট
                  </span>
                </div>
              </div>
            </div>

            {/* Ready To Apply Banner */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
              <span className="text-cyan-800 font-bold text-base md:text-lg">
                Ready To Apply Your Course
              </span>
              <Link to="/course/kids/revision/enroll">
                <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition-all">
                  Start Now
                </button>
              </Link>
            </div>

            {/* MATERIALS INCLUDED */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                MATERIALS INCLUDED
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs md:text-sm text-gray-700">
                {course.materials.map((mat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-cyan-600 text-sm flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COURSE CURRICULUM (Accordion) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                COURSE CURRICULUM
              </h2>
              <div className="space-y-3">
                {course.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="border border-cyan-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-3.5 bg-cyan-50/50 hover:bg-cyan-50 text-cyan-800 font-semibold text-sm transition-colors text-left"
                    >
                      <span>- {item.title}</span>
                      {openAccordion === index ? (
                        <FaChevronUp className="text-xs flex-shrink-0 ml-2" />
                      ) : (
                        <FaChevronDown className="text-xs flex-shrink-0 ml-2" />
                      )}
                    </button>
                    {openAccordion === index && (
                      <div className="p-3.5 bg-white text-xs md:text-sm text-gray-600 border-t border-cyan-100">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TARGET AUDIENCE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                TARGET AUDIENCE
              </h2>
              <div className="space-y-2.5 text-xs md:text-sm text-gray-700">
                {course.targetAudience.map((target, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold leading-tight">
                      »
                    </span>
                    <span className="leading-snug">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FEE STRUCTURE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-cyan-700 font-bold text-lg mb-4 tracking-wide">
                FEE STRUCTURE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {course.feeStructure.bd.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.bd.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.bd.monthly}
                  </p>
                </div>
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 text-sm mb-3">
                    {course.feeStructure.overseas.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.overseas.admission}
                  </p>
                  <p className="text-xs text-gray-700 flex items-center gap-1.5">
                    <span className="text-cyan-600 font-bold">»</span>{" "}
                    {course.feeStructure.overseas.monthly}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Video Preview & Apply Card) - Aligned to top with left column */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-md p-4 border border-cyan-100">
              {/* Thumbnail / Video Box */}
              <div className="relative rounded-lg overflow-hidden shadow mb-4 bg-black group cursor-pointer h-40">
                <img
                  src={KidsImg}
                  alt="Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-cyan-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-cyan-600 transition-colors">
                    <FaPlay className="text-xs ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-cyan-800 tracking-wider uppercase block mb-1">
                  Apply This Course
                </span>
              </div>

              <Link to="/course/kids/revision/enroll">
                <button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 rounded-lg shadow transition-all text-sm flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HifzRevisionDetails;
