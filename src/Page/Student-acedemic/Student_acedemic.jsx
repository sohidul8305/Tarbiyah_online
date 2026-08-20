// src/Page/Student-acedemic/Student_acedemic.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaBook,
  FaGraduationCap,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const StudentAcademic = () => {
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState("fall2026");
  const [studentInfo, setStudentInfo] = useState({
    name: "Student",
    class: "Not Assigned",
    roll: "N/A",
    course: "",
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setStudentInfo({
        name: parsedInfo.name || "Student",
        class: parsedInfo.class || "Not Assigned",
        roll: parsedInfo.roll || "N/A",
        course: parsedInfo.course || "",
      });
    }
  }, []);

  // Student এর নিজের কোর্স থেকে courses তৈরি করা
  const getCoursesFromStudent = () => {
    const courseName = studentInfo.course || "";
    if (courseName) {
      // যদি একাধিক কোর্স থাকে (কমা দিয়ে আলাদা)
      const courseList = courseName.split(",").map((c) => c.trim());
      return courseList.map((course, index) => ({
        id: index + 1,
        name: course,
        code: `CRS-${String(index + 1).padStart(3, "0")}`,
        credit: 3,
        grade: index % 2 === 0 ? "A" : "B+",
        status:
          index === 0 ? "Completed" : index === 1 ? "Ongoing" : "Upcoming",
      }));
    }
    // Default courses যদি কোনো কোর্স না থাকে
    return [
      {
        id: 1,
        name: "No Course Registered",
        code: "N/A",
        credit: 0,
        grade: "-",
        status: "Upcoming",
      },
    ];
  };

  const courses = getCoursesFromStudent();

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-600" />;
      case "Ongoing":
        return <FaClock className="text-yellow-600" />;
      case "Upcoming":
        return <FaHourglassHalf className="text-blue-600" />;
      default:
        return null;
    }
  };

  // Filter courses based on selected semester
  const filteredCourses =
    selectedSemester === "all"
      ? courses
      : courses.filter((_, index) => {
          if (selectedSemester === "fall2026") return index < 3;
          if (selectedSemester === "spring2026") return index >= 3;
          return true;
        });

  // Statistics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (c) => c.status === "Completed",
  ).length;
  const ongoingCourses = courses.filter((c) => c.status === "Ongoing").length;
  const upcomingCourses = courses.filter((c) => c.status === "Upcoming").length;

  // Calculate CGPA (mock)
  const gradePoints = {
    "A+": 4.0,
    A: 3.75,
    "A-": 3.5,
    "B+": 3.25,
    B: 3.0,
    "B-": 2.75,
    "C+": 2.5,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  const totalPoints = courses
    .filter((c) => c.grade !== "-")
    .reduce((sum, c) => sum + (gradePoints[c.grade] || 0) * c.credit, 0);
  const totalCredits = courses
    .filter((c) => c.grade !== "-")
    .reduce((sum, c) => sum + c.credit, 0);
  const cgpa =
    totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A";

  // Sidebar Menu Items
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
    <div className="flex flex-col md:flex-row gap-6">
      {/* বাম পাশের সাইডবার (Desktop View) */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {studentInfo.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{studentInfo.name}</p>
              <p className="text-xs opacity-80 truncate">{studentInfo.class}</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
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
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaGraduationCap /> Academic Information
                </h2>
                <p className="text-sm opacity-80">
                  {studentInfo.name} • {studentInfo.class} • Roll:{" "}
                  {studentInfo.roll}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <FaCalendarAlt className="text-white" />
                <span className="text-sm font-medium">2026 Academic Year</span>
              </div>
            </div>
          </div>

          {/* Semester Selector */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2 bg-gray-50">
            {[
              { id: "fall2026", label: "Fall 2026" },
              { id: "spring2026", label: "Spring 2026" },
              { id: "all", label: "All Semesters" },
            ].map((sem) => (
              <button
                key={sem.id}
                onClick={() => setSelectedSemester(sem.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${
                  selectedSemester === sem.id
                    ? "bg-[#00ADD2] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <FaBook size={12} />
                {sem.label}
              </button>
            ))}
          </div>

          {/* Academic Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaBook className="text-[#00ADD2]" /> Total Courses
              </p>
              <p className="text-2xl font-bold text-[#00ADD2]">
                {totalCourses}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaCheckCircle className="text-green-600" /> Completed
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedCourses}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaClock className="text-yellow-600" /> Ongoing
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {ongoingCourses}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaGraduationCap className="text-[#00ADD2]" /> CGPA
              </p>
              <p className="text-2xl font-bold text-[#00ADD2]">{cgpa}</p>
            </div>
          </div>

          {/* Course List */}
          <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaBook className="text-[#00ADD2]" /> Course List
                <span className="text-sm font-normal text-gray-500">
                  ({filteredCourses.length} courses)
                </span>
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                  Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>{" "}
                  Ongoing
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>{" "}
                  Upcoming
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#00ADD2]/10 border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">
                      #
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Course Name
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Code
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Credit
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Grade
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <tr
                        key={course.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-500">{index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {course.name}
                        </td>
                        <td className="p-3 text-gray-600 font-mono text-xs">
                          {course.code}
                        </td>
                        <td className="p-3">{course.credit}</td>
                        <td className="p-3 font-bold">
                          {course.grade !== "-" ? (
                            <span className="text-[#00ADD2]">
                              {course.grade}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(
                              course.status,
                            )}`}
                          >
                            {getStatusIcon(course.status)}
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        <FaBook className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p>No courses found for this semester</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Course Progress Bar */}
            {totalCourses > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </span>
                  <span className="text-sm font-bold text-[#00ADD2]">
                    {Math.round((completedCourses / totalCourses) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedCourses / totalCourses) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex flex-wrap justify-between mt-2 text-xs text-gray-500">
                  <span>✅ Completed: {completedCourses}</span>
                  <span>🔄 Ongoing: {ongoingCourses}</span>
                  <span>⏳ Upcoming: {upcomingCourses}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAcademic;
