import React, { useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

const My_courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // স্ক্রিনশটের সাথে মিল রেখে কোর্স ডেটা
  const courses = [
    {
      id: 1,
      code: "DNS 101 (2616)",
      title: "দাওয়াহ ও সুন্নাহ",
      semester: "First Semester",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 2,
      code: "AQD 101 (2616)",
      title: "আকীদাহ",
      semester: "First Semester",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 3,
      code: "ATI 101 (2616)",
      title: "আদাবু ত্বলিবিউল ইলম",
      semester: "First Semester",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      id: 4,
      code: "FQH 101 (2616)",
      title: "ফিকহ",
      semester: "First Semester",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 5,
      code: "Open Course",
      title: "Open Course",
      semester: "Alim",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 6,
      code: "TAJ 101 (2616)",
      title: "আল-কুরআন লার্নিং/তাজবীদ",
      semester: "First Semester",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 md:px-12 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">Course overview</h1>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
              <option>All</option>
            </select>
            <div className="relative">
              <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
              <option>Sort by course name</option>
            </select>
            <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 focus:outline-none">
              <option>Card</option>
            </select>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition flex flex-col justify-between"
            >
              {/* Course Banner Image */}
              <div className="h-28 w-full bg-gray-100 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.code}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Footer Info */}
              <div className="p-3.5 flex items-start justify-between border-t border-gray-100">
                <div>
                  <h3 className="text-xs font-bold text-[#004d4d] hover:underline cursor-pointer">
                    {course.code}
                  </h3>
                  <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                    {course.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {course.semester}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <FaEllipsisV className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default My_courses;
