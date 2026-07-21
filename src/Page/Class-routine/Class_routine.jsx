import React, { useState, useEffect } from "react";

const Class_routine = () => {
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
      title: "Class Routine",
      subtitle: "Check out the schedule for our live classes and programs",
      selectProgram: "Select Program:",
      allPrograms: "All Programs",
      diploma: "Diploma in Islamic Studies",
      alemiah: "Tarbiyah Alemiah Program",
      kids: "Tarbiyah Studies for Kids",
      quran: "Quran for Elders",
      tableHeaders: {
        day: "Day",
        program: "Program",
        subject: "Subject",
        time: "Time",
        teacher: "Teacher",
        status: "Status",
      },
      routineData: [
        {
          day: "Saturday",
          program: "Diploma in Islamic Studies",
          subject: "Aqeedah & Fiqh",
          time: "08:00 PM - 09:30 PM",
          teacher: "Sheikh Ahmed",
          status: "Live",
        },
        {
          day: "Sunday",
          program: "Tarbiyah Alemiah Program",
          subject: "Nahw & Sarf",
          time: "07:30 PM - 09:00 PM",
          teacher: "Ustadh Ibrahim",
          status: "Upcoming",
        },
        {
          day: "Monday",
          program: "Tarbiyah Studies for Kids",
          subject: "Basic Arabic & Dua",
          time: "05:00 PM - 06:00 PM",
          teacher: "Ustadha Maryam",
          status: "Live",
        },
        {
          day: "Tuesday",
          program: "Quran for Elders",
          subject: "Tajweed & Recitation",
          time: "09:00 PM - 10:00 PM",
          teacher: "Qari Abdullah",
          status: "Upcoming",
        },
      ],
      downloadBtn: "Download Routine (PDF)",
    },
    bn: {
      title: "ক্লাস রুটিন",
      subtitle: "আমাদের লাইভ ক্লাস এবং প্রোগ্রামগুলোর সময়সূচি দেখে নিন",
      selectProgram: "প্রোগ্রাম নির্বাচন করুন:",
      allPrograms: "সকল প্রোগ্রাম",
      diploma: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      alemiah: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      kids: "তারবিয়াহ স্টাডিজ ফর কিডস",
      quran: "কুরআন ফর এল্ডারস",
      tableHeaders: {
        day: "বার",
        program: "প্রোগ্রাম",
        subject: "বিষয়",
        time: "সময়",
        teacher: "শিক্ষক",
        status: "অবস্থা",
      },
      routineData: [
        {
          day: "শনিবার",
          program: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
          subject: "আকিদাহ ও ফিকহ",
          time: "রাত ০৮:০০ - ০৯:৩০",
          teacher: "শায়খ আহমেদ",
          status: "লাইভ",
        },
        {
          day: "রবিবার",
          program: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
          subject: "নাহু ও সরফ",
          time: "রাত ০৭:৩০ - ০৯:০০",
          teacher: "ওস্তাদ ইব্রাহিম",
          status: "আসন্ন",
        },
        {
          day: "সোমবার",
          program: "তারবিয়াহ স্টাডিজ ফর কিডস",
          subject: "বেসিক আরবি ও দোয়া",
          time: "বিকাল ০৫:০০ - ০৬:০০",
          teacher: "ওস্তাদা মরিয়ম",
          status: "লাইভ",
        },
        {
          day: "মঙ্গলবার",
          program: "কুরআন ফর এল্ডারস",
          subject: "তাজবীদ ও তিলাওয়াত",
          time: "রাত ০৯:০০ - ১০:০০",
          teacher: "কারী আব্দুল্লাহ",
          status: "আসন্ন",
        },
      ],
      downloadBtn: "রুটিন ডাউনলোড করুন (PDF)",
    },
  };

  const t = content[language];
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredData =
    selectedFilter === "All"
      ? t.routineData
      : t.routineData.filter((item) => item.program === selectedFilter);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-16">
      {/* হিরো সেকশন */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* ফিল্টার এবং ডাউনলোড বাটন */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="font-semibold text-gray-700 text-sm">
            {t.selectProgram}
          </label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#004d4d]"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="All">{t.allPrograms}</option>
            <option value={t.diploma}>{t.diploma}</option>
            <option value={t.alemiah}>{t.alemiah}</option>
            <option value={t.kids}>{t.kids}</option>
            <option value={t.quran}>{t.quran}</option>
          </select>
        </div>

        <button className="bg-[#004d4d] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-teal-900 transition-all shadow-sm">
          {t.downloadBtn}
        </button>
      </div>

      {/* রুটিন টেবিল */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#004d4d] text-white text-sm">
                <th className="py-4 px-6">{t.tableHeaders.day}</th>
                <th className="py-4 px-6">{t.tableHeaders.program}</th>
                <th className="py-4 px-6">{t.tableHeaders.subject}</th>
                <th className="py-4 px-6">{t.tableHeaders.time}</th>
                <th className="py-4 px-6">{t.tableHeaders.teacher}</th>
                <th className="py-4 px-6">{t.tableHeaders.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-[#004d4d]">
                      {item.day}
                    </td>
                    <td className="py-4 px-6">{item.program}</td>
                    <td className="py-4 px-6 font-medium">{item.subject}</td>
                    <td className="py-4 px-6 text-gray-600">{item.time}</td>
                    <td className="py-4 px-6">{item.teacher}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Live" || item.status === "লাইভ"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    {language === "en"
                      ? "No routine found for this program."
                      : "এই প্রোগ্রামের জন্য কোনো রুটিন পাওয়া যায়নি।"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Class_routine;
