import React from "react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

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
  const { t } = useLanguage();

  // প্রতিটি লাইভ কোর্সের জন্য বাংলা এবং ইংরেজি নাম
  const liveCourses = [
    {
      title: t({
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      }),
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: t({
        en: "Online Hifz Course",
        bn: "অনলাইন হিফজ কোর্স",
      }),
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: t({
        en: "Qaida Nuraniyah Course",
        bn: "কায়েদা নূরানিয়াহ কোর্স",
      }),
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: t({
        en: "Tarbiyah Alimiyah Program",
        bn: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      }),
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: t({
        en: "Alimiyah For Kids",
        bn: "আলেমিয়াহ ফর কিডস",
      }),
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: t({
        en: "Hifz For Elders",
        bn: "হিফজ ফর এল্ডার্স",
      }),
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: t({
        en: "Online Pre Hifz",
        bn: "অনলাইন প্রি-হিফজ",
      }),
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: t({
        en: "Najera For Elders",
        bn: "নাজেরা ফর এল্ডার্স",
      }),
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
    {
      title: t({
        en: "Tarbiyah Najera Course",
        bn: "তারবিয়াহ নাজেরা কোর্স",
      }),
      image: "https://i.ibb.co.com/W4Xxdqs9/Najeraadlatsbanner.png",
    },
    {
      title: t({
        en: "Qaida Nuraniyah For Elders",
        bn: "কায়েদা নূরানিয়াহ ফর এল্ডার্স",
      }),
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
  ];

  // প্রতিটি রেকর্ড করা কোর্সের জন্য বাংলা এবং ইংরেজি নাম
  const recordedCourses = [
    {
      title: t({
        en: "Imam Nabawr 40 Hadiths",
        bn: "ইমাম নববীর ৪০ হাদিস",
      }),
      image: "https://i.ibb.co.com/7tWnV1pB/banner.jpg",
    },
    {
      title: t({
        en: "Surah Mulk Hifz Course",
        bn: "সূরা মূলক হিফজ কোর্স",
      }),
      image: "https://i.ibb.co.com/qFM5Lmb2/najerabanner.png",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Live Courses */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {t({ en: "OUR", bn: "আমাদের" })}{" "}
        <span className="text-orange-500">{t({ en: "LIVE", bn: "লাইভ" })}</span>{" "}
        {t({ en: "COURSE", bn: "কোর্সসমূহ" })}
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
        {t({ en: "OUR", bn: "আমাদের" })}{" "}
        <span className="text-orange-500">
          {t({ en: "RECORDED", bn: "রেকর্ডেড" })}
        </span>{" "}
        {t({ en: "COURSE", bn: "কোর্সসমূহ" })}
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
