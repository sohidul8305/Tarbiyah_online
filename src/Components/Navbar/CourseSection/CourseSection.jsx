import React from 'react';

const CourseCard = ({ title, instructor }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <img src="https://images.unsplash.com/photo-1544725176-7c45e5a712c7?q=80&w=400&auto=format&fit=crop" alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center text-teal-600 text-sm">
        <span className="mr-2">🎓</span> {instructor}
      </div>
    </div>
  </div>
);

const CourseSection = () => {
  const liveCourses = [
    "Men's Diploma In Islamic Studies", "Women's Diploma In Islamic Studies", 
    "Online Hifz Course", "Qaida Nuraniyah Course", "Tarbiyah Alimiyah Program",
    "Alimiyah For Kids", "Hifz For Elders", "Online Pre Hifz", 
    "Najera For Elders", "Tarbiyah Najera Course", "Qaida Nuraniyah For Elders"
  ];

  const recordedCourses = ["Imam Nabawr 40 Hadiths", "Surah Mulk Hifz Course"];

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Live Courses */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">OUR <span className="text-orange-500">LIVE</span> COURSE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {liveCourses.map((course, index) => (
          <CourseCard key={index} title={course} instructor="tarbiyahedu" />
        ))}
      </div>

      {/* Recorded Courses */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">OUR <span className="text-orange-500">RECORDED</span> COURSE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {recordedCourses.map((course, index) => (
          <CourseCard key={index} title={course} instructor="tarbiyahedu" />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;