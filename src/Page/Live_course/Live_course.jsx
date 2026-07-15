import React from "react";

const Live_course = () => {
  const courses = [
    {
      title: "MEN'S DIPLOMA IN ISLAMIC STUDIES",
      image: "/images/mens-diploma.jpg",
    },
    {
      title: "WOMEN'S DIPLOMA IN ISLAMIC STUDIES",
      image: "/images/mens-diploma.jpg",
    },
    { title: "ONLINE HIFZ COURSE", image: "/images/mens-diploma.jpg" },

    {
      title: "QAIDA NURANIYAH COURSE",

      image: "/images/mens-diploma.jpg",
    },

    {
      title: "TARBIYAH ALIMIYAH PROGRAM",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "ALIMIYAH FOR KIDS",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "HIFZ FOR ELDERS",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "ONLINE PRE HIFZ",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "NAJERA FOR ELDERS",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "TARBIYAH NAJERA COURSE",

      image: "/images/mens-diploma.jpg",
    },
    {
      title: "QAIDA NURANIYAH FOR ELDERS",

      image: "/images/mens-diploma.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            {/* কোর্স ইমেজ এরিয়া */}
            <div className="h-40 bg-gray-200 relative">
              <span className="absolute top-2 right-2 text-gray-500">🔖</span>
            </div>

            {/* কন্টেন্ট এরিয়া */}
            <div className="p-4">
              <div className="text-yellow-400 text-sm mb-2">☆☆☆☆☆</div>
              <h3 className="text-blue-600 font-bold text-sm mb-4 leading-tight">
                {course.title}
              </h3>

              {/* অথর এবং ক্যাটাগরি */}
              <div className="flex items-center gap-2 text-xs text-gray-600 border-t pt-3">
                <img
                  src="https://i.ibb.co.com/ycd8GqsQ/sir-png.png"
                  alt="author"
                  className="w-6 h-6 rounded-full"
                />
                <p>
                  By{" "}
                  <span className="font-semibold text-gray-800">
                    tarbiyahedu
                  </span>{" "}
                  In{" "}
                  <span className="font-semibold text-gray-800">
                    Live Course
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live_course;
