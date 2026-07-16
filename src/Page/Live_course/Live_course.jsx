// Live_course.jsx - সার্চ এবং ফিল্টার যুক্ত
import React, { useState } from "react";
import { Link } from "react-router";

const Live_course = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const courses = [];

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
    <div className="bg-gray-50 py-12 px-4 md:px-10 lg:px-20">
      {/* হেডার */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          Live Courses
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive live courses designed for all ages and
          levels
        </p>
      </div>

      {/* সার্চ এবং ফিল্টার */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] bg-white"
        >
          <option value="all">All Categories</option>
          <option value="Live Course">Live Course</option>
          <option value="Recorded Course">Recorded Course</option>
        </select>
      </div>

      {/* কোর্স গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/live-course/${course.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* ... কার্ড কন্টেন্ট */}
          </Link>
        ))}
      </div>

      {/* নো রেজাল্ট */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No courses found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Live_course;
