// src/Page/Student-acedemic/Student_acedemic.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const StudentAcademic = () => {
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState("fall2026");

  const courses = [
    {
      id: 1,
      name: "Arabic Language",
      code: "AR-101",
      credit: 3,
      grade: "A",
      status: "Completed",
    },
    {
      id: 2,
      name: "Quran Studies",
      code: "QS-201",
      credit: 4,
      grade: "A+",
      status: "Completed",
    },
    {
      id: 3,
      name: "Islamic History",
      code: "IH-101",
      credit: 3,
      grade: "B+",
      status: "Completed",
    },
    {
      id: 4,
      name: "Fiqh & Usul",
      code: "FU-301",
      credit: 4,
      grade: "A-",
      status: "Ongoing",
    },
    {
      id: 5,
      name: "Tafseer",
      code: "TF-201",
      credit: 3,
      grade: "-",
      status: "Ongoing",
    },
    {
      id: 6,
      name: "Hadith Studies",
      code: "HS-101",
      credit: 4,
      grade: "-",
      status: "Upcoming",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Ongoing":
        return "bg-yellow-100 text-yellow-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // সাইডবার মেনু আইটেমসমূহ
  const menuItems = [
    {
      id: "dashboard",
      path: "/student-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/student-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "academic",
      path: "/student-acedemic",
      icon: <FaUniversity className="text-xl" />,
      label: "Academic",
    },
    {
      id: "result",
      path: "/student-result",
      icon: <FaFileAlt className="text-xl" />,
      label: "Exam Result",
    },
    {
      id: "payment",
      path: "/online-payment",
      icon: <FaCreditCard className="text-xl" />,
      label: "Online Payment",
    },
    {
      id: "due",
      path: "/due-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Due & Payments",
    },
  ];

  return (
    <div className="flex gap-6">
      {/* বাম পাশের সাইডবার (Desktop View) */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">Sohidul Islam</p>
              <p className="text-xs opacity-80 truncate">Class 8</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mt-1
                    ${
                      isActive
                        ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* মূল একাডেমিক কন্টেন্ট */}
      <div className="flex-1 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] p-6 text-white">
            <h2 className="text-2xl font-bold">Academic Information</h2>
            <p className="text-sm opacity-80">
              View your courses and academic progress
            </p>
          </div>

          {/* Semester Selector */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2">
            {["fall2026", "spring2026", "all"].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                  selectedSemester === sem
                    ? "bg-[#004d4d] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sem === "fall2026"
                  ? "Fall 2026"
                  : sem === "spring2026"
                    ? "Spring 2026"
                    : "All Semesters"}
              </button>
            ))}
          </div>

          {/* Academic Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-[#004d4d]">6</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Ongoing</p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">CGPA</p>
              <p className="text-2xl font-bold text-[#004d4d]">3.75</p>
            </div>
          </div>

          {/* Course List */}
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-4">Course List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-600">
                      #
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-600">
                      Course Name
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-600">
                      Code
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-600">
                      Credit
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-600">
                      Grade
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-medium">{course.name}</td>
                      <td className="p-3 text-gray-600">{course.code}</td>
                      <td className="p-3">{course.credit}</td>
                      <td className="p-3 font-bold">{course.grade}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            course.status,
                          )}`}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAcademic;
