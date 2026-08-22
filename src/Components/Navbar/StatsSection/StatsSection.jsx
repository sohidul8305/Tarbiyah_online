import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const StatsSection = () => {
  const { t } = useLanguage();

  const [stats, setStats] = useState([
    { number: "Loading...", label: "Students" },
    { number: "Loading...", label: "More Than 30 Countries" },
    { number: "Loading...", label: "Course Completed" },
    { number: "Loading...", label: "Four Years Experience" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        // ব্যাকএন্ড থেকে আসা ডেটাকে অ্যারে ফরম্যাটে রূপান্তর করা
        const formattedStats = [
          { number: data.students || "15,000+", label: "Students" },
          { number: data.countries || "30+", label: "More Than 30 Countries" },
          { number: data.courses || "25+", label: "Course Completed" },
          { number: data.experience || "4+", label: "Four Years Experience" },
        ];
        setStats(formattedStats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        // এরর হলে ফলব্যাক বা ডিফল্ট ডেটা সেট করে দেওয়া
        setStats([
          { number: "15,000+", label: "Students" },
          { number: "30+", label: "More Than 30 Countries" },
          { number: "25+", label: "Course Completed" },
          { number: "4+", label: "Four Years Experience" },
        ]);
        setLoading(false);
      });
  }, []);

  // লেবেলগুলোর বাংলা এবং ইংরেজি রূপান্তর ম্যাপিং
  const getTranslatedLabel = (label) => {
    switch (label) {
      case "Students":
        return t({ en: "Students", bn: "শিক্ষার্থী" });
      case "More Than 30 Countries":
        return t({ en: "More Than 30 Countries", bn: "৩০টিরও বেশি দেশ" });
      case "Course Completed":
        return t({ en: "Course Completed", bn: "সম্পন্ন কোর্স" });
      case "Four Years Experience":
        return t({ en: "Four Years Experience", bn: "৪ বছরের অভিজ্ঞতা" });
      default:
        return t({ en: label, bn: label });
    }
  };

  return (
    <div className="bg-white py-10 px-4 mb-20">
      <div className="max-w-6xl mx-auto shadow-xl rounded-lg border border-gray-100 p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center 
                ${index !== stats.length - 1 ? "md:border-r border-gray-200" : ""}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#00acc1]">
                {stat.number}
              </h2>
              <p className="text-gray-600 font-medium mt-2">
                {getTranslatedLabel(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
