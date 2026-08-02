import React from "react";

const CourseCard = ({ title, instructor, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center text-teal-600 text-sm mt-auto">
        <span className="mr-2">🎓</span> {instructor}
      </div>
    </div>
  </div>
);

const CourseSection = () => {
  // প্রতিটি লাইভ কোর্সের জন্য আলাদা নাম এবং ইমেজ লিংক
  const liveCourses = [
    {
      title: "Diploma In Islamic Studies",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: "Online Hifz Course",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: "Qaida Nuraniyah Course",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: "Tarbiyah Alimiyah Program",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: "Alimiyah For Kids",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: "Hifz For Elders",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: "Online Pre Hifz",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: "Najera For Elders",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: "Tarbiyah Najera Course",
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: "Qaida Nuraniyah For Elders",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  // প্রতিটি রেকর্ড করা কোর্সের জন্য আলাদা নাম এবং ইমেজ লিংক
  const recordedCourses = [
    {
      title: "Imam Nabawr 40 Hadiths",
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: "Surah Mulk Hifz Course",
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Live Courses */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        OUR <span className="text-orange-500">LIVE</span> COURSE
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {liveCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            instructor="tarbiyahedu"
            image={course.image}
          />
        ))}
      </div>

      {/* Recorded Courses */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        OUR <span className="text-orange-500">RECORDED</span> COURSE
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {recordedCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            instructor="tarbiyahedu"
            image={course.image}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
