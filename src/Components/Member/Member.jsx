import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Users,
  Star,
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
} from "lucide-react";

const Member = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Member Data
  const members = [
    {
      id: 1,
      name: "Dr. Muhammad Abdullah",
      designation: "Senior Islamic Scholar",
      role: "Advisor",
      image: "",
      bio: "Expert in Islamic jurisprudence and Quranic studies with over 20 years of experience.",
      joinDate: "January 2020",
      courses: 15,
      students: 1200,
      rating: 4.9,
      specialty: "Quran & Tafsir",
    },
    {
      id: 2,
      name: "Prof. Ayesha Rahman",
      designation: "Professor of Islamic Studies",
      role: "Academic Director",
      image: "",
      bio: "Specializes in Islamic history and contemporary Muslim issues.",
      joinDate: "March 2019",
      courses: 12,
      students: 950,
      rating: 4.8,
      specialty: "Islamic History",
    },
    {
      id: 3,
      name: "Ustadh Ahmed Hassan",
      designation: "Senior Teacher",
      role: "Lead Educator",
      image: "",
      bio: "Passionate about teaching Arabic language and Quranic recitation.",
      joinDate: "June 2021",
      courses: 20,
      students: 1500,
      rating: 4.9,
      specialty: "Arabic Language",
    },
    {
      id: 4,
      name: "Dr. Fatima Noor",
      designation: "Child Psychology Expert",
      role: "Advisor",
      image: "",
      bio: "Specializes in Islamic child psychology and family counseling.",
      joinDate: "August 2020",
      courses: 8,
      students: 600,
      rating: 4.7,
      specialty: "Child Psychology",
    },
    {
      id: 5,
      name: "Shaykh Ibrahim Ali",
      designation: "Hadith Scholar",
      role: "Senior Advisor",
      image: "",
      bio: "Expert in Hadith sciences and Islamic law.",
      joinDate: "January 2018",
      courses: 10,
      students: 800,
      rating: 4.9,
      specialty: "Hadith Studies",
    },
    {
      id: 6,
      name: "Ustadha Mariam Khan",
      designation: "Quran Teacher",
      role: "Educator",
      image: "",
      bio: "Specializes in Quranic recitation and memorization techniques.",
      joinDate: "September 2021",
      courses: 14,
      students: 1100,
      rating: 4.8,
      specialty: "Quran Memorization",
    },
    {
      id: 7,
      name: "Dr. Yusuf Malik",
      designation: "Islamic Finance Expert",
      role: "Advisor",
      image: "",
      bio: "Expert in Islamic banking and finance.",
      joinDate: "February 2020",
      courses: 6,
      students: 450,
      rating: 4.6,
      specialty: "Islamic Finance",
    },
    {
      id: 8,
      name: "Prof. Zainab Ahmed",
      designation: "Comparative Religion Scholar",
      role: "Academic Director",
      image: "",
      bio: "Specializes in comparative religion and interfaith dialogue.",
      joinDate: "April 2019",
      courses: 9,
      students: 700,
      rating: 4.7,
      specialty: "Comparative Religion",
    },
  ];

  // Filter members based on search and filter type
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      member.role.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Get unique roles for filter
  const roles = ["all", ...new Set(members.map((m) => m.role.toLowerCase()))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-10 h-10 text-[#004d4d]" />
            <h1 className="text-4xl font-bold text-gray-900">
              Our Team Members
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of Islamic scholars, educators, and advisors
            who are committed to providing quality Islamic education.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, designation or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-transparent bg-white"
              >
                <option value="all">All Members</option>
                <option value="advisor">Advisors</option>
                <option value="educator">Educators</option>
                <option value="academic director">Academic Directors</option>
                <option value="senior advisor">Senior Advisors</option>
                <option value="lead educator">Lead Educators</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#004d4d]">
              {members.length}
            </div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#004d4d]">
              {members.reduce((acc, m) => acc + m.courses, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#004d4d]">
              {members.reduce((acc, m) => acc + m.students, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#004d4d]">
              {(
                members.reduce((acc, m) => acc + m.rating, 0) / members.length
              ).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              No members found
            </h3>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#004d4d]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#004d4d] text-white px-2 py-1 rounded-full text-xs">
                    {member.role}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#004d4d] font-medium">
                    {member.designation}
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{member.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">
                      ({member.students} students)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {member.bio}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                      <BookOpen className="w-3 h-3" />
                      {member.courses} courses
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {member.joinDate}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Specialty: </span>
                    <span className="text-xs font-medium text-[#004d4d]">
                      {member.specialty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#004d4d] hover:text-[#003d3d] font-medium"
          >
            Back to Home
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Member;
