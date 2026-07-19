import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";

const DiplomaIslamicStudies = () => {
  const { language, t } = useLanguage();

  const details = {
    en: {
      title: "Diploma in Islamic Studies",
      subtitle: "A comprehensive program to build a strong foundation in Islamic Knowledge.",
      duration: "1 Year (2 Semesters)",
      level: "Beginner to Intermediate",
      features: [
        "Quranic Tafsir & Tajweed",
        "Hadith Studies (Riyadhu Saliheen)",
        "Islamic Jurisprudence (Fiqh)",
        "Islamic History & Seerah",
        "Arabic Language Basics",
      ],
      description: "This diploma is designed for busy students and professionals who wish to understand the fundamentals of Islamic theology, law, history, and practice. With lessons structured from the ground up, you will build a solid grounding in the teachings of Islam under the guidance of scholars.",
    },
    bn: {
      title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      subtitle: "ইসলামী জ্ঞানের একটি মজবুত ভিত্তি গড়ে তোলার জন্য একটি পূর্ণাঙ্গ প্রোগ্রাম।",
      duration: "১ বছর (২ সেমিস্টার)",
      level: "প্রাথমিক থেকে মধ্যম স্তর",
      features: [
        "কুরআন তাফসীর ও তাজবীদ",
        "হাদিস শিক্ষা (রিয়াদুস সালিহীন)",
        "ইসলামী ফিকহ (Jurisprudence)",
        "ইসলামের ইতিহাস ও সীরাহ",
        "আরবি ভাষার প্রাথমিক জ্ঞান",
      ],
      description: "এই ডিপ্লোমা কোর্সটি মূলত ব্যস্ত শিক্ষার্থী এবং চাকরিজীবীদের জন্য ডিজাইন করা হয়েছে যারা ইসলামি আকীদা, আইন, ইতিহাস এবং জীবনব্যবস্থার মূল ভিত্তি বুঝতে চান। অভিজ্ঞ আলেমদের তত্ত্বাবধানে অত্যন্ত সহজ ভাষায় প্রতিটি বিষয় আলোচনা করা হবে।",
    },
  };

  const active = details[language] || details.bn;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100">
          <span className="bg-teal-50 text-teal-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            {t("courses")}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#004d4d] mt-4 mb-3">
            {active.title}
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            {active.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl mb-8">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t("duration")}</p>
              <p className="text-base font-semibold text-gray-800">{active.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t("level")}</p>
              <p className="text-base font-semibold text-gray-800">{active.level}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t("instructor")}</p>
              <p className="text-base font-semibold text-gray-800">Tarbiyah Online</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t("curriculum")}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.features.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                  <span className="text-teal-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed text-justify">
              {active.description}
            </p>
          </div>

          <button className="w-full md:w-auto bg-[#004d4d] hover:bg-teal-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
            {t("enrollNow")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiplomaIslamicStudies;
