import React, { useState } from "react";
import {
  FaSearch,
  FaEllipsisV,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";

const Campus_dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState("September 2026");

  // কোর্স ডেটা (স্ক্রিনশটের সাথে মিলিয়ে)
  const courses = [
    {
      id: 1,
      code: "DNS 101 (2616)",
      semester: "First Semester",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 2,
      code: "AQD 101 (2616)",
      semester: "First Semester",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 3,
      code: "FQH 101 (2616)",
      semester: "First Semester",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      id: 4,
      code: "ATI 101 (2616)",
      semester: "First Semester",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      id: 5,
      code: "TAJ 101 (2616)",
      semester: "First Semester",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      id: 6,
      code: "Open Course",
      semester: "Allam",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  // সম্প্রতি দেখা কোর্সগুলো (Recently accessed courses)
  const recentCourses = courses.slice(0, 3);

  // ক্যালেন্ডারের দিনগুলো (সেপ্টেম্বর ২০২৬ অনুযায়ী)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDayOffset = 2; // মঙ্গলবার থেকে শুরু (উদাহরণস্বরূপ)

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 md:px-10 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ================= PAGE TITLE ================= */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* ================= 1. COURSE OVERVIEW SECTION ================= */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">
            Course overview
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                <option>All</option>
              </select>
              <div className="relative">
                <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 pr-3 py-1 text-xs bg-white border border-gray-300 rounded focus:outline-none w-40 sm:w-48"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                <option>Sort by last accessed</option>
              </select>
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none">
                <option>Card</option>
              </select>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition flex flex-col justify-between"
              >
                <div className="h-28 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.code}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <h3 className="text-xs font-bold text-[#004d4d] hover:underline cursor-pointer">
                      {course.code}
                    </h3>
                    <p className="text-[10px] text-gray-500">
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

        {/* ================= 2. TARBIYAH ACADEMIC CALENDAR ================= */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-800">
              Tarbiyah Academic Calendar
            </h2>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <button className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
                আজ
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <FaChevronLeft className="text-xs" />
              </button>
              <span>সেপ্টেম্বর ২০২৬</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <FaChevronRight className="text-xs" />
              </button>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                <option>মাস</option>
              </select>
            </div>
          </div>

          {/* Calendar Grid Mockup */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="py-2">সোম</th>
                  <th className="py-2">মঙ্গল</th>
                  <th className="py-2">বুধ</th>
                  <th className="py-2">বৃহস্পতি</th>
                  <th className="py-2">শুক্র</th>
                  <th className="py-2">শনি</th>
                  <th className="py-2">রবি</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-3 text-gray-300">31</td>
                  <td className="py-3">1</td>
                  <td className="py-3">2</td>
                  <td className="py-3">3</td>
                  <td className="py-3 font-bold text-teal-600 bg-teal-50 rounded">
                    4
                  </td>
                  <td className="py-3">5</td>
                  <td className="py-3">6</td>
                </tr>
                <tr>
                  <td className="py-3">7</td>
                  <td className="py-3">8</td>
                  <td className="py-3 font-bold text-white bg-blue-600 rounded-full w-7 h-7 mx-auto flex items-center justify-center">
                    9
                  </td>
                  <td className="py-3">10</td>
                  <td className="py-3">11</td>
                  <td className="py-3">12</td>
                  <td className="py-3">13</td>
                </tr>
                <tr>
                  <td className="py-3">14</td>
                  <td className="py-3">15</td>
                  <td className="py-3">16</td>
                  <td className="py-3">17</td>
                  <td className="py-3">18</td>
                  <td className="py-3">19</td>
                  <td className="py-3">20</td>
                </tr>
                <tr>
                  <td className="py-3">21</td>
                  <td className="py-3">22</td>
                  <td className="py-3">23</td>
                  <td className="py-3">24</td>
                  <td className="py-3">25</td>
                  <td className="py-3">26</td>
                  <td className="py-3">27</td>
                </tr>
                <tr>
                  <td className="py-3">28</td>
                  <td className="py-3">29</td>
                  <td className="py-3">30</td>
                  <td className="py-3 text-gray-300">1</td>
                  <td className="py-3 text-gray-300">2</td>
                  <td className="py-3 text-gray-300">3</td>
                  <td className="py-3 text-gray-300">4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-center text-gray-500 pt-2 border-t border-gray-100">
            রুটিন সম্পর্কিত তারিখগুলো নিশ্চিত হওয়ার জন্য অবশ্যই অফিসিয়াল নোটিশ
            বোর্ডে চোখ রাখুন।
          </p>
        </div>

        {/* ================= 3. RECENTLY ACCESSED COURSES ================= */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-800">
              Recently accessed courses
            </h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs">
                <FaChevronLeft />
              </button>
              <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition flex flex-col justify-between"
              >
                <div className="h-28 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.code}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <h3 className="text-xs font-bold text-[#004d4d]">
                      {course.code}
                    </h3>
                    <p className="text-[10px] text-gray-500">
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

        {/* ================= 4. BOTTOM CALENDAR WIDGET ================= */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-800">Calendar</h2>
            <div className="flex items-center gap-2">
              <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                <option>All courses</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium shadow-sm">
                New event
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-gray-600 px-2">
            <button className="hover:text-blue-600">‹ August</button>
            <span className="text-sm font-bold text-gray-900">
              September 2026
            </span>
            <button className="hover:text-blue-600">October ›</button>
          </div>

          {/* Standard English Calendar Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="py-2">Sat</th>
                  <th className="py-2">Sun</th>
                  <th className="py-2">Mon</th>
                  <th className="py-2">Tue</th>
                  <th className="py-2">Wed</th>
                  <th className="py-2">Thu</th>
                  <th className="py-2">Fri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-4 text-gray-300">29</td>
                  <td className="py-4 text-gray-300">30</td>
                  <td className="py-4 text-gray-300">31</td>
                  <td className="py-4">1</td>
                  <td className="py-4">2</td>
                  <td className="py-4">3</td>
                  <td className="py-4">4</td>
                </tr>
                <tr>
                  <td className="py-4">5</td>
                  <td className="py-4">6</td>
                  <td className="py-4">7</td>
                  <td className="py-4">8</td>
                  <td className="py-4 font-bold text-white bg-blue-600 rounded-full w-7 h-7 mx-auto flex items-center justify-center">
                    9
                  </td>
                  <td className="py-4">10</td>
                  <td className="py-4">11</td>
                </tr>
                <tr>
                  <td className="py-4">12</td>
                  <td className="py-4">13</td>
                  <td className="py-4">14</td>
                  <td className="py-4">15</td>
                  <td className="py-4">16</td>
                  <td className="py-4">17</td>
                  <td className="py-4">18</td>
                </tr>
                <tr>
                  <td className="py-4">19</td>
                  <td className="py-4">20</td>
                  <td className="py-4">21</td>
                  <td className="py-4">22</td>
                  <td className="py-4">23</td>
                  <td className="py-4">24</td>
                  <td className="py-4">25</td>
                </tr>
                <tr>
                  <td className="py-4">26</td>
                  <td className="py-4">27</td>
                  <td className="py-4">28</td>
                  <td className="py-4">29</td>
                  <td className="py-4">30</td>
                  <td className="py-4 text-gray-300">1</td>
                  <td className="py-4 text-gray-300">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campus_dashboard;
