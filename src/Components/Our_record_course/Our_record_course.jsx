import React, { useState } from "react";
import { Link } from "react-router";
import { FaGraduationCap } from "react-icons/fa";
import { useLanguage } from "../../context/useLanguage";

// রেকর্ডেড কোর্সের ইমেজগুলো ইম্পোর্ট করা হলো
import chollisCoverImg from "../../image/40radiscover.jpg";
import surahmulkCoverImg from "../../image/mulksurahcover.jpg";

const Our_record_course = () => {
  // ভাষা কন্টেক্সট নিরাপদ ব্যবহার
  const languageContext = useLanguage();
  const t = languageContext ? languageContext.t : (key) => key;
  const language = languageContext ? languageContext.language : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // রেকর্ডেড কোর্সসমূহের লিস্ট (বাংলা ও ইংরেজি সহ)
  const recordedCourses = [
    {
      id: "imam-nabawi-40-hadiths",
      title:
        language === "bn" ? "ইমাম নববীর ৪০ হাদিস" : "Imam Nabawi's 40 Hadiths",
      slug: "/course/recorded/imam-nabawi-40-hadiths",
      category: "Recorded Course",
      image: chollisCoverImg,
      instructor: t("instructor"),
    },
    {
      id: "surah-mulk-hifz",
      title:
        language === "bn" ? "সূরা মূলক হিফজ কোর্স" : "Surah Mulk Hifz Course",
      slug: "/course/recorded/surah-mulk-hifz",
      category: "Recorded Course",
      image: surahmulkCoverImg,
      instructor: t("instructor"),
    },
  ];

  // ফিল্টার করা কোর্স
  const filteredCourses = recordedCourses.filter((course) => {
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
            {language === "bn" ? "রেকর্ডেড" : "RECORDED"}
          </span>{" "}
          {language === "bn" ? "কোর্সসমূহ" : "COURSES"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          {language === "bn"
            ? "আপনার সুবিধাজনক সময়ে যেকোনো স্থান থেকে রেকর্ডেড ক্লাসের মাধ্যমে দ্বীনি ইলম অর্জন করুন"
            : "Explore our recorded courses and learn at your own pace from anywhere"}
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
          <option value="Recorded Course">
            {language === "bn" ? "রেকর্ডেড কোর্স" : "Recorded Course"}
          </option>
        </select>
      </div>

      {/* কোর্স গ্রিড (লাইভ কোর্সের হুবহু লেআউট ও ইমেজ সাইজ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={course.slug}
            className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* লাইভ কোর্সের মতো ফিক্সড হাইট ও অবজেক্ট কভার */}
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
              ? "আপনার অনুসন্ধানের সাথে মিল কোনো কোর্স পাওয়া যায়নি।"
              : "No courses found matching your search."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Our_record_course;
