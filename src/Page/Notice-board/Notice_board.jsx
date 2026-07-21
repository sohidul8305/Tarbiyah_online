import React, { useState, useEffect } from "react";

const Notice_board = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const content = {
    en: {
      title: "Notice Board",
      subtitle: "Stay updated with the latest announcements, updates, and news",
      general: "General",
      exam: "Exam",
      admission: "Admission",
      dateLabel: "Published Date:",
      downloadNotice: "Download Notice",
      notices: [
        {
          id: 1,
          title: "Admission Open for Diploma in Islamic Studies (2026-27)",
          category: "Admission",
          date: "July 20, 2026",
          description:
            "Applications are now open for the new academic session. Interested students can apply online through the student portal or join now button.",
        },
        {
          id: 2,
          title: "Mid-Term Examination Schedule Announced",
          category: "Exam",
          date: "July 15, 2026",
          description:
            "The upcoming mid-term exams for all departments will commence from next month. Detailed routine is available in the class routine section.",
        },
        {
          id: 3,
          title: "Important Notice Regarding Online Class Attendance",
          category: "General",
          date: "July 10, 2026",
          description:
            "All students are requested to maintain at least 80% attendance in live classes to be eligible for final examinations and certificates.",
        },
        {
          id: 4,
          title: "Special Workshop on Quranic Arabic for Beginners",
          category: "General",
          date: "July 05, 2026",
          description:
            "A free special workshop will be held this coming Friday. All enrolled students are encouraged to join via the virtual campus link.",
        },
      ],
    },
    bn: {
      title: "নোটিশ বোর্ড",
      subtitle: "সর্বশেষ ঘোষণা, আপডেট এবং খবরাখবর সম্পর্কে জেনে নিন",
      general: "সাধারণ",
      exam: "পরীক্ষা",
      admission: "ভর্তি",
      dateLabel: "প্রকাশের তারিখ:",
      downloadNotice: "নোটিশ ডাউনলোড",
      notices: [
        {
          id: 1,
          title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ (২০২৬-২৭) সেশনে ভর্তি চলছে",
          category: "Admission",
          date: "২০ জুলাই, ২০২৬",
          description:
            "নতুন শিক্ষাবর্ষের জন্য আবেদন প্রক্রিয়া শুরু হয়েছে। আগ্রহী শিক্ষার্থীরা স্টুডেন্ট পোর্টাল অথবা জয়েন নাও বাটনের মাধ্যমে অনলাইনে আবেদন করতে পারবেন।",
        },
        {
          id: 2,
          title: "মিড-টার্ম পরীক্ষার সময়সূচি ঘোষণা",
          category: "Exam",
          date: "১৫ জুলাই, ২০২৬",
          description:
            "সকল বিভাগের আসন্ন মিড-টার্ম পরীক্ষা আগামী মাস থেকে শুরু হবে। বিস্তারিত রুটিন ক্লাস রুটিন সেকশনে দেওয়া আছে।",
        },
        {
          id: 3,
          title: "অনলাইন ক্লাস উপস্থিতি সংক্রান্ত জরুরি নির্দেশনা",
          category: "General",
          date: "১০ জুলাই, ২০২৬",
          description:
            "চূড়ান্ত পরীক্ষায় অংশগ্রহণ ও সার্টিফিকেটের জন্য লাইভ ক্লাসে অন্তত ৮০% উপস্থিতি নিশ্চিত করার জন্য সকল শিক্ষার্থীকে অনুরোধ করা হচ্ছে।",
        },
        {
          id: 4,
          title:
            "প্রাথমিক স্তরের শিক্ষার্থীদের জন্য কুরআনিক আরবি বিষয়ক বিশেষ ওয়ার্কশপ",
          category: "General",
          date: "০৫ জুলাই, ২০২৬",
          description:
            "আগামী শুক্রবার একটি ফ্রি বিশেষ ওয়ার্কশপ অনুষ্ঠিত হবে। সকল নিবন্ধিত শিক্ষার্থীকে ভার্চুয়াল ক্যাম্পাস লিংকের মাধ্যমে যুক্ত হওয়ার জন্য উৎসাহিত করা হচ্ছে।",
        },
      ],
    },
  };

  const t = content[language];
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredNotices =
    selectedTab === "All"
      ? t.notices
      : t.notices.filter((n) => n.category === selectedTab);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-16">
      {/* হিরো সেকশন */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* ক্যাটাগরি ফিল্টার ট্যাব */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          onClick={() => setSelectedTab("All")}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
            selectedTab === "All"
              ? "bg-[#004d4d] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {language === "en" ? "All Notices" : "সকল নোটিশ"}
        </button>
        <button
          onClick={() => setSelectedTab("Admission")}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
            selectedTab === "Admission"
              ? "bg-[#004d4d] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {t.admission}
        </button>
        <button
          onClick={() => setSelectedTab("Exam")}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
            selectedTab === "Exam"
              ? "bg-[#004d4d] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {t.exam}
        </button>
        <button
          onClick={() => setSelectedTab("General")}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
            selectedTab === "General"
              ? "bg-[#004d4d] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {t.general}
        </button>
      </div>

      {/* নোটিশ লিস্ট সেকশন */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#004d4d] hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <span className="bg-teal-50 text-[#004d4d] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="text-gray-500 text-xs">
                  {t.dateLabel} {notice.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {notice.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {notice.description}
              </p>
              <div className="flex justify-end">
                <button className="text-[#004d4d] font-semibold text-sm hover:text-teal-900 transition-colors flex items-center gap-1">
                  {t.downloadNotice} ↓
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">
              {language === "en"
                ? "No notices found in this category."
                : "এই ক্যাটাগরিতে কোনো নোটিশ পাওয়া যায়নি।"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice_board;
