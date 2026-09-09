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
      quranStudies: {
        en: "Department Of Quran Studies",
        bn: "ডিপার্টমেন্ট অব কুরআন স্টাডিজ",
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
  };

  // সাধারণ লিস্ট রুটিন ডেটা (Diploma)
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
  ];

  // ১. Department Of Quran Studies (Matrix Grid Format)
  const quranStudiesMatrix = {
    key: "quranStudies",
    title: {
      en: "Department Of Quran Studies (Edition - September-2026)",
      bn: "ডিপার্টমেন্ট অব কুরআন স্টাডিজ (সংস্করণ - সেপ্টেম্বর ২০২৬)",
    },
    fileUrl: "10z7GLK8JU3mi6JN-PvUeWD1dZdaXsz5n",
    times: [
      "6:00 – 8:00 AM",
      "2:00 – 4:00 PM",
      "6:00 – 8:00 PM",
      "7:00 – 9:00 PM",
      "9:00 – 11:00 PM",
    ],
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    schedule: {
      "6:00 – 8:00 AM": {
        Tuesday: [{ sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" }],
        Wednesday: [
          { sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" },
        ],
        Thursday: [
          { sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" },
        ],
        Friday: [{ sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" }],
        Saturday: [],
        Sunday: [],
      },
      "2:00 – 4:00 PM": {
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [{ sub: "Nurani / Nazeera", teacher: "OVS Batch" }],
        Sunday: [{ sub: "Nurani / Nazeera", teacher: "OVS Batch" }],
      },
      "6:00 – 8:00 PM": {
        Tuesday: [{ sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" }],
        Wednesday: [
          { sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" },
        ],
        Thursday: [
          { sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" },
        ],
        Friday: [{ sub: "Hifz / Nazeera / Nurani", teacher: "Reguler Batch" }],
        Saturday: [],
        Sunday: [],
      },
      "7:00 – 9:00 PM": {
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [{ sub: "Nurani / Nazeera", teacher: "OVS Batch" }],
        Sunday: [{ sub: "Nurani / Nazeera", teacher: "OVS Batch" }],
      },
      "9:00 – 11:00 PM": {
        Tuesday: [{ sub: "Hifz / Nazeera", teacher: "Reguler Batch" }],
        Wednesday: [{ sub: "Hifz / Nazeera", teacher: "Reguler Batch" }],
        Thursday: [{ sub: "Hifz / Nazeera", teacher: "Reguler Batch" }],
        Friday: [{ sub: "Hifz / Nazeera", teacher: "Reguler Batch" }],
        Saturday: [],
        Sunday: [],
      },
    },
  };

  // ২. Tarbiyah Alemiah Program (Matrix Grid Format)
  const alimiyyahMatrix = {
    key: "alemiah",
    title: {
      en: "Tarbiyah Alemiah Program Schedule (September-December 2026)",
      bn: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম রুটিন (সেপ্টেম্বর-ডিসেম্বর ২০২৬)",
    },
    fileUrl: "10z7GLK8JU3mi6JN-PvUeWD1dZdaXsz5n",
    times: ["6:40 – 7:20 PM", "7:21 – 8:00 PM", "8:01 – 8:40 PM"],
    days: ["Thursday", "Friday", "Saturday", "Sunday"],
    schedule: {
      "6:40 – 7:20 PM": {
        Thursday: [
          { sub: "Quran Studies (Basic 4-5)", teacher: "Jubair Hussain" },
          { sub: "Fiqh & Dua (Basic 1)", teacher: "Imam Husain" },
        ],
        Friday: [{ sub: "Seerah (Basic 4-5)", teacher: "Al Amin" }],
        Saturday: [
          { sub: "Reading Arabic (Advanced)", teacher: "Atiqullah Shahid" },
        ],
        Sunday: [],
      },
      "7:21 – 8:00 PM": {
        Thursday: [
          { sub: "Reading Arabic (Basic 4-5)", teacher: "Atiqullah Shahid" },
          { sub: "Hadith (Basic 1)", teacher: "Abdullah Al-Mamun" },
        ],
        Friday: [
          { sub: "Spoken Arabic (Basic 4-5)", teacher: "Atiqullah Shahid" },
        ],
        Saturday: [
          { sub: "Quran Studies (Advanced)", teacher: "Jubair Hussain" },
        ],
        Sunday: [{ sub: "Fiqh (Advanced)", teacher: "Al Amin" }],
      },
      "8:01 – 8:40 PM": {
        Thursday: [
          { sub: "Hadith Studies (Basic 4-5)", teacher: "Al Amin" },
          { sub: "Quran Studies (Basic 1)", teacher: "Jubair Hussain" },
        ],
        Friday: [{ sub: "Fiqh (Basic 4-5)", teacher: "Abdullah Al-Mamun" }],
        Saturday: [
          { sub: "Spoken Arabic (Advanced)", teacher: "Atiqullah Shahid" },
        ],
        Sunday: [
          { sub: "Islamic History (Advanced)", teacher: "Hussain Hidoy" },
        ],
      },
    },
  };

  // ৩. Quran for Elders (Matrix Grid)
  const quranForEldersMatrix = {
    key: "quran",
    title: {
      en: "Quran for Elders (Edition - September-2026)",
      bn: "কুরআন ফর এল্ডারস (সংস্করণ - সেপ্টেম্বর ২০২৬)",
    },
    fileUrl: "10z7GLK8JU3mi6JN-PvUeWD1dZdaXsz5n",
    times: ["6:00 – 7:00 AM", "3:00 – 4:30 PM", "8:00 – 9:00 PM"],
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    schedule: {
      "6:00 – 7:00 AM": {
        Saturday: [
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Jubayer Ustad" },
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Suraiya Afrin" },
        ],
        Sunday: [],
        Monday: [
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Jubayer Ustad" },
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Suraiya Afrin" },
        ],
        Tuesday: [],
        Wednesday: [],
      },
      "3:00 – 4:30 PM": {
        Saturday: [],
        Sunday: [
          { sub: "Basic Tajweed Batch-06", teacher: "Jubayer Ustad" },
          { sub: "Basic Tajweed Batch-06", teacher: "Suraiya Afrin" },
        ],
        Monday: [{ sub: "QAIDA NURANIYAH Batch-03", teacher: "Suraiya Afrin" }],
        Tuesday: [
          { sub: "Basic Tajweed Batch-06", teacher: "Jubayer Ustad" },
          { sub: "Basic Tajweed Batch-06", teacher: "Suraiya Afrin" },
        ],
        Wednesday: [],
      },
      "8:00 – 9:00 PM": {
        Saturday: [
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Jubayer Ustad" },
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Suraiya Afrin" },
          { sub: "Najera Batch-02", teacher: "Jubayer Ustad" },
          { sub: "Najera Batch-02", teacher: "Suraiya Afrin" },
        ],
        Sunday: [{ sub: "Basic Tajweed Batch-06", teacher: "Suraiya Afrin" }],
        Monday: [
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Jubayer Ustad" },
          { sub: "QAIDA NURANIYAH Batch-03", teacher: "Suraiya Afrin" },
          { sub: "Najera Batch-02", teacher: "Jubayer Ustad" },
          { sub: "Najera Batch-02", teacher: "Suraiya Afrin" },
        ],
        Tuesday: [{ sub: "Basic Tajweed Batch-06", teacher: "Suraiya Afrin" }],
        Wednesday: [{ sub: "Najera Batch-02", teacher: "Suraiya Afrin" }],
      },
    },
  };

  // ফিল্টার দৃশ্যমানতা লজিক
  const showStandardTable =
    selectedFilter === "All" || selectedFilter === "diploma";
  const showQuranStudies =
    selectedFilter === "All" || selectedFilter === "quranStudies";
  const showAlimiyyahSchedule =
    selectedFilter === "All" || selectedFilter === "alemiah";
  const showQuranForElders =
    selectedFilter === "All" || selectedFilter === "quran";

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
            <option value="quranStudies">
              {t(content.programs.quranStudies)}
            </option>
            <option value="quran">{t(content.programs.quran)}</option>
          </select>
        </div>
      </div>

      {/* ১. সাধারণ টেবিল (Diploma) */}
      {showStandardTable && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#004d4d] text-white text-sm">
                  <th className="py-4 px-6">{t(content.tableHeaders.day)}</th>
                  <th className="py-4 px-6">
                    {t(content.tableHeaders.program)}
                  </th>
                  <th className="py-4 px-6">
                    {t(content.tableHeaders.subject)}
                  </th>
                  <th className="py-4 px-6">{t(content.tableHeaders.time)}</th>
                  <th className="py-4 px-6">
                    {t(content.tableHeaders.teacher)}
                  </th>
                  <th className="py-4 px-6">
                    {t(content.tableHeaders.status)}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {routineData.map((item, index) => (
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
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        {t(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ২. Tarbiyah Alemiah Program (Matrix Grid) */}
      {showAlimiyyahSchedule && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200">
          <div className="bg-[#004d4d] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold">{t(alimiyyahMatrix.title)}</h2>
            <div className="flex items-center gap-2">
              <a
                href={`https://drive.google.com/file/d/${alimiyyahMatrix.fileUrl}/view?usp=sharing`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-800 transition-colors"
              >
                {t(content.viewBtn)}
              </a>
              <a
                href={`https://drive.google.com/uc?export=download&id=${alimiyyahMatrix.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#004d4d] px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors"
              >
                {t(content.downloadBtn)}
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b">
                  <th className="py-3 px-4 border-r font-bold">
                    {t(content.tableHeaders.time)}
                  </th>
                  {alimiyyahMatrix.days.map((day, dIdx) => (
                    <th key={dIdx} className="py-3 px-4 border-r font-bold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {alimiyyahMatrix.times.map((timeSlot, tIdx) => (
                  <tr key={tIdx} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold bg-gray-50 border-r text-[#004d4d]">
                      {timeSlot}
                    </td>
                    {alimiyyahMatrix.days.map((day, dIdx) => {
                      const classList =
                        alimiyyahMatrix.schedule[timeSlot]?.[day];
                      return (
                        <td
                          key={dIdx}
                          className="py-4 px-4 border-r align-middle"
                        >
                          {classList && classList.length > 0 ? (
                            classList.map((cls, cIdx) => (
                              <div
                                key={cIdx}
                                className="bg-blue-50 border border-blue-100 p-2 rounded-md mb-1 last:mb-0"
                              >
                                <p className="font-bold text-teal-900 text-xs">
                                  {cls.sub}
                                </p>
                                <p className="text-gray-600 text-[11px] mt-0.5">
                                  {cls.teacher}
                                </p>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-300 font-bold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ৩. Department Of Quran Studies (Matrix Grid) */}
      {showQuranStudies && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200">
          <div className="bg-[#004d4d] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold">{t(quranStudiesMatrix.title)}</h2>
            <div className="flex items-center gap-2">
              <a
                href={`https://drive.google.com/file/d/${quranStudiesMatrix.fileUrl}/view?usp=sharing`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-800 transition-colors"
              >
                {t(content.viewBtn)}
              </a>
              <a
                href={`https://drive.google.com/uc?export=download&id=${quranStudiesMatrix.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#004d4d] px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors"
              >
                {t(content.downloadBtn)}
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b">
                  <th className="py-3 px-4 border-r font-bold">
                    {t(content.tableHeaders.time)}
                  </th>
                  {quranStudiesMatrix.days.map((day, dIdx) => (
                    <th key={dIdx} className="py-3 px-4 border-r font-bold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {quranStudiesMatrix.times.map((timeSlot, tIdx) => (
                  <tr key={tIdx} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold bg-gray-50 border-r text-[#004d4d]">
                      {timeSlot}
                    </td>
                    {quranStudiesMatrix.days.map((day, dIdx) => {
                      const classList =
                        quranStudiesMatrix.schedule[timeSlot]?.[day];
                      return (
                        <td
                          key={dIdx}
                          className="py-4 px-4 border-r align-middle"
                        >
                          {classList && classList.length > 0 ? (
                            classList.map((cls, cIdx) => (
                              <div
                                key={cIdx}
                                className="bg-teal-50 border border-teal-100 p-2 rounded-md mb-1 last:mb-0"
                              >
                                <p className="font-bold text-teal-900 text-xs">
                                  {cls.sub}
                                </p>
                                <p className="text-gray-600 text-[11px] mt-0.5">
                                  {cls.teacher}
                                </p>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-300 font-bold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ৪. Quran for Elders Matrix Grid */}
      {showQuranForElders && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200">
          <div className="bg-[#004d4d] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold">
              {t(quranForEldersMatrix.title)}
            </h2>
            <div className="flex items-center gap-2">
              <a
                href={`https://drive.google.com/file/d/${quranForEldersMatrix.fileUrl}/view?usp=sharing`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-800 transition-colors"
              >
                {t(content.viewBtn)}
              </a>
              <a
                href={`https://drive.google.com/uc?export=download&id=${quranForEldersMatrix.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#004d4d] px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors"
              >
                {t(content.downloadBtn)}
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b">
                  <th className="py-3 px-4 border-r font-bold">
                    {t(content.tableHeaders.time)}
                  </th>
                  {quranForEldersMatrix.days.map((day, dIdx) => (
                    <th key={dIdx} className="py-3 px-4 border-r font-bold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {quranForEldersMatrix.times.map((timeSlot, tIdx) => (
                  <tr key={tIdx} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold bg-gray-50 border-r text-[#004d4d]">
                      {timeSlot}
                    </td>
                    {quranForEldersMatrix.days.map((day, dIdx) => {
                      const classList =
                        quranForEldersMatrix.schedule[timeSlot]?.[day];
                      return (
                        <td
                          key={dIdx}
                          className="py-4 px-4 border-r align-middle"
                        >
                          {classList && classList.length > 0 ? (
                            classList.map((cls, cIdx) => (
                              <div
                                key={cIdx}
                                className="bg-blue-50 border border-blue-100 p-2 rounded-md mb-1 last:mb-0"
                              >
                                <p className="font-bold text-teal-900 text-xs">
                                  {cls.sub}
                                </p>
                                <p className="text-gray-600 text-[11px] mt-0.5">
                                  {cls.teacher}
                                </p>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-300 font-bold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Class_routine;
