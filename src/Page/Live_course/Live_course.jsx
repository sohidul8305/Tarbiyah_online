import React, { useState } from "react";
import { Link } from "react-router";
import { FaGraduationCap } from "react-icons/fa";
import { useLanguage } from "../../context/useLanguage";

// ইমেজগুলো ইম্পোর্ট করা হলো
import diplomacover from "../../image/diplomacover.png";
import Tarbiyahcourse from "../../image/Tarbiyaprogram.jpg";
import NuraniyahcourseImg from "../../image/nuranicourse.jpg";
import hifzImg from "../../image/adalthifzbanner.jpg";
import AlemiyahKids from "../../image/Alemiyahkids.png";
import Najeraelders from "../../image/Thumb.jpg";

const Live_course = () => {
  // ভাষা কন্টেক্সট নিরাপদ ব্যবহার
  const languageContext = useLanguage();
  const t = languageContext ? languageContext.t : (key) => key;
  const language = languageContext ? languageContext.language : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // রাউটার ফাইলের পাথ অনুযায়ী আপডেট করা কোর্স লিস্ট
  const courses = [
    {
      id: 1,
      title:
        language === "bn"
          ? "ডিপ্লোমা ইন ইসলামিক স্টাডিজ"
          : "Diploma in Islamic Studies",
      slug: "/course/diploma/details", // রাউটার পাথ অনুযায়ী সঠিক করা হয়েছে
      category: "Live Course",
      image: diplomacover,
      instructor: t("instructor"),
    },
    {
      id: 2,
      title: language === "bn" ? "আলিমিয়াহ ফর কিডস" : "Alemiyah for Kids",
      slug: "/course/alemiah/alimiyah-kids",
      category: "Recorded Course",
      image: AlemiyahKids,
      instructor: t("instructor"),
    },
    {
      id: 3,
      title: language === "bn" ? "আলিমিয়াহ প্রোগ্রাম" : "Alemiyah Program",
      slug: "/course/alemiah/alimiyah-program",
      category: "Live Course",
      image: Tarbiyahcourse,
      instructor: t("instructor"),
    },
    {
      id: 4,
      title: language === "bn" ? "কায়দা নুরানী" : "Qaida Nurani",
      slug: "/course/kids/quida-nurani",
      category: "Live Course",
      image: NuraniyahcourseImg,
      instructor: t("instructor"),
    },
    {
      id: 5,
      title: language === "bn" ? "নাজেরা" : "Najera",
      slug: "/course/quran/elders-nazera",
      category: "Live Course",
      image: Najeraelders,
      instructor: t("instructor"),
    },
    {
      id: 6,
      title: language === "bn" ? "হিফজুল কুরআন" : "Hifzul Quran",
      slug: "/course/quran/elders-hifz",
      category: "Live Course",
      image: hifzImg,
      instructor: t("instructor"),
    },
    {
      id: 7,
      title: language === "bn" ? "হিফজ রিভিশন" : "Hifz Revision",
      slug: "/course/kids/hifz-revision",
      category: "Live Course",
      image: hifzImg,
      instructor: t("instructor"),
    },
    {
      id: 8,
      title: language === "bn" ? "কায়দায়ে নূরানিয়্যাহ" : "Qaiday Nuraniyyah",
      slug: "/course/quran/elders-quida",
      category: "Live Course",
      image: NuraniyahcourseImg,
      instructor: t("instructor"),
    },

    {
      id: 10,
      title:
        language === "bn"
          ? "বেসিক তাজউইদ (লেভেল–১)"
          : "Basic Tajweed (Level-1)",
      slug: "/course/quran/elders-tajweed",
      category: "Live Course",
      image: NuraniyahcourseImg,
      instructor: t("instructor"),
    },
  ];

  // ফিল্টার করা কোর্স
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-10 lg:px-20 min-h-screen">
      {/* হেডার */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          {language === "bn" ? "আমাদের" : "OUR"}{" "}
          <span className="text-orange-500">
            {language === "bn" ? "লাইভ" : "LIVE"}
          </span>{" "}
          {language === "bn" ? "কোর্সসমূহ" : "COURSE"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          {language === "bn"
            ? "সকল বয়স এবং স্তরের জন্য ডিজাইন করা আমাদের লাইভ কোর্সসমূহ অন্বেষণ করুন"
            : "Explore our comprehensive live courses designed for all ages and levels"}
        </p>
      </div>

      {/* সার্চ এবং ফিল্টার সেকশন */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={
            language === "bn" ? "কোর্স খুঁজুন..." : "Search courses..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] bg-white text-sm md:text-base"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] bg-white text-sm md:text-base"
        >
          <option value="all">
            {language === "bn" ? "সকল ক্যাটাগরি" : "All Categories"}
          </option>
          <option value="Live Course">
            {language === "bn" ? "লাইভ কোর্স" : "Live Course"}
          </option>
          <option value="Recorded Course">
            {language === "bn" ? "রেকর্ডেড কোর্স" : "Recorded Course"}
          </option>
        </select>
      </div>

      {/* কোর্স গ্রিড (রেসপন্সিভ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={course.slug}
            className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* কোর্সের ছবি */}
            <div className="h-48 w-full overflow-hidden bg-gray-200">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* কার্ডের বিবরণ */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-1">
                {course.title}
              </h3>
              <div className="flex items-center text-teal-700 text-sm gap-1">
                <FaGraduationCap className="text-teal-700 text-base" />
                <span>{course.instructor}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* নো রেজাল্ট মেসেজ */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {language === "bn"
              ? "আপনার অনুসন্ধانের সাথে মিল কোনো কোর্স পাওয়া যায়নি।"
              : "No courses found matching your search."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Live_course;
