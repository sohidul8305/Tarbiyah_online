import React, { useState } from "react";
// আপনার তৈরি করা হুকটি সঠিক পাথ থেকে এখানে ইমপোর্ট করুন (প্রয়োজনে পাথ ঠিক করে নিতে পারেন)
import { useLanguage } from "../../context/useLanguage";

const Class_routine = () => {
  const { language, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState("All");

  // ডট নোটেশন বা স্ট্রিং দিয়ে সহজে টেক্সট রিটার্ন করার জন্য হেল্পার অবজেক্ট
  const content = {
    title: {
      en: "Class Routine",
      bn: "ক্লাস রুটিন",
    },
    subtitle: {
      en: "Check out the schedule for our live classes and programs",
      bn: "আমাদের লাইভ ক্লাস এবং প্রোগ্রামগুলোর সময়সূচি দেখে নিন",
    },
    selectProgram: {
      en: "Select Program:",
      bn: "প্রোগ্রাম নির্বাচন করুন:",
    },
    allPrograms: {
      en: "All Programs",
      bn: "সকল প্রোগ্রাম",
    },
    programs: {
      diploma: {
        en: "Diploma in Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      alemiah: {
        en: "Tarbiyah Alemiah Program",
        bn: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      },
      kids: {
        en: "Tarbiyah Studies for Kids",
        bn: "তারবিয়াহ স্টাডিজ ফর কিডস",
      },
      quran: {
        en: "Quran for Elders",
        bn: "কুরআন ফর এল্ডারস",
      },
    },
    tableHeaders: {
      day: { en: "Day", bn: "বার" },
      program: { en: "Program", bn: "প্রোগ্রাম" },
      subject: { en: "Subject", bn: "বিষয়" },
      time: { en: "Time", bn: "সময়" },
      teacher: { en: "Teacher", bn: "শিক্ষক" },
      status: { en: "Status", bn: "অবস্থা" },
    },
    viewBtn: {
      en: "View",
      bn: "ভিউ",
    },
    downloadBtn: {
      en: "Download",
      bn: "ডাউনলোড",
    },
    noRoutine: {
      en: "No routine found for this program.",
      bn: "এই প্রোগ্রামের জন্য কোনো রুটিন পাওয়া যায়নি।",
    },
  };

  // রুটিন ডেটা (ভাষা অনুযায়ী নাম এবং স্ট্যাটাস পরিবর্তন হবে)
  const routineData = [
    {
      key: "diploma",
      day: { en: "Saturday", bn: "শনিবার" },
      program: {
        en: "Diploma in Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      subject: { en: "Aqeedah & Fiqh", bn: "আকিদাহ ও ফিকহ" },
      time: { en: "08:00 PM - 09:30 PM", bn: "রাত ০৮:০০ - ০৯:৩০" },
      teacher: { en: "Sheikh Ahmed", bn: "শায়খ আহমেদ" },
      status: { en: "Live", bn: "লাইভ" },
    },
    {
      key: "alemiah",
      day: { en: "Sunday", bn: "রবিবার" },
      program: {
        en: "Tarbiyah Alemiah Program",
        bn: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      },
      subject: { en: "Nahw & Sarf", bn: "নাহু ও সরফ" },
      time: { en: "07:30 PM - 09:00 PM", bn: "রাত ০৭:৩০ - ০৯:০০" },
      teacher: { en: "Ustadh Ibrahim", bn: "ওস্তাদ ইব্রাহিম" },
      status: { en: "Live", bn: "লাইভ" },
    },
    {
      key: "kids",
      day: { en: "Monday", bn: "সোমবার" },
      program: {
        en: "Tarbiyah Studies for Kids",
        bn: "তারবিয়াহ স্টাডিজ ফর কিডস",
      },
      subject: { en: "Basic Arabic & Dua", bn: "বেসিক আরবি ও দোয়া" },
      time: { en: "05:00 PM - 06:00 PM", bn: "বিকাল ০৫:০০ - ০৬:০০" },
      teacher: { en: "Ustadha Maryam", bn: "ওস্তাদা মরিয়ম" },
      status: { en: "Live", bn: "লাইভ" },
    },
    {
      key: "quran",
      day: { en: "Tuesday", bn: "মঙ্গলবার" },
      program: {
        en: "Quran for Elders",
        bn: "কুরআন ফর এল্ডারস",
      },
      subject: {
        en: "Qaida Nuraniyah & Tajweed",
        bn: "কায়েদা নূরানিয়া ও তাজবীদ",
      },
      time: { en: "08:00 PM - 09:30 PM", bn: "রাত ০৮:০০ - ০৯:৩০" },
      teacher: {
        en: "Jubayer Ustad & Sumaiya Afrin",
        bn: "জুবায়ের ওস্তাদ ও সুমাইয়া আফরিন",
      },
      status: { en: "Live", bn: "লাইভ" },
      isElders: true,
    },
  ];

  // ফিল্টার লজিক
  const filteredData =
    selectedFilter === "All"
      ? routineData
      : routineData.filter((item) => item.key === selectedFilter);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-16">
      {/* হিরো সেকশন */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          {t(content.title)}
        </h1>
        <p className="text-gray-600 text-lg">{t(content.subtitle)}</p>
      </div>

      {/* ফিল্টার সেকশন */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="font-semibold text-gray-700 text-sm">
            {t(content.selectProgram)}
          </label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#004d4d]"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="All">{t(content.allPrograms)}</option>
            <option value="diploma">{t(content.programs.diploma)}</option>
            <option value="alemiah">{t(content.programs.alemiah)}</option>
            <option value="kids">{t(content.programs.kids)}</option>
            <option value="quran">{t(content.programs.quran)}</option>
          </select>
        </div>
      </div>

      {/* রুটিন টেবিল */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#004d4d] text-white text-sm">
                <th className="py-4 px-6">{t(content.tableHeaders.day)}</th>
                <th className="py-4 px-6">{t(content.tableHeaders.program)}</th>
                <th className="py-4 px-6">{t(content.tableHeaders.subject)}</th>
                <th className="py-4 px-6">{t(content.tableHeaders.time)}</th>
                <th className="py-4 px-6">{t(content.tableHeaders.teacher)}</th>
                <th className="py-4 px-6">{t(content.tableHeaders.status)}</th>
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
                      {t(item.day)}
                    </td>
                    <td className="py-4 px-6">{t(item.program)}</td>
                    <td className="py-4 px-6 font-medium">{t(item.subject)}</td>
                    <td className="py-4 px-6 text-gray-600">{t(item.time)}</td>
                    <td className="py-4 px-6">{t(item.teacher)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* স্ট্যাটাস ব্যাজ */}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status.en === "Live"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {t(item.status)}
                        </span>

                        {/* যদি এটি Quran for Elders হয়, তবেই স্ট্যাটাসের পাশে View ও Download বাটন দেখাবে */}
                        {item.isElders && (
                          <div className="files-btn flex items-center gap-1.5 ml-2">
                            {/* ড্রাইভ ফাইল দেখার জন্য */}
                            <a
                              href="https://drive.google.com/file/d/10z7GLK8JU3mi6JN-PvUeWD1dZdaXsz5n/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-teal-700 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-teal-800 transition-colors"
                            >
                              {t(content.viewBtn)}
                            </a>
                            {/* সরাসরি ডাউনলোড লিংক */}
                            <a
                              href="https://drive.google.com/uc?export=download&id=10z7GLK8JU3mi6JN-PvUeWD1dZdaXsz5n"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#004d4d] text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-teal-900 transition-colors"
                            >
                              {t(content.downloadBtn)}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    {t(content.noRoutine)}
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
