import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";

const TarbiyahAlemiyah = () => {
  const { language, t } = useLanguage();

  const details = {
    en: {
      title: "Tarbiyah Alemiyah Program",
      subtitle: "An advanced academic path to produce scholars of outstanding character and competence.",
      duration: "5 Years",
      level: "Advanced (Alim equivalent)",
      features: [
        "Classical Arabic Grammer & Rhetoric",
        "Advanced Quranic Exegesis (Tafsir)",
        "Hadith Textual Criticism & Principles (Usool)",
        "Islamic Law & Legal Maxims (Usul al-Fiqh)",
        "Comparative Religion & Contemporary Philosophy",
      ],
      description: "The Tarbiyah Alemiyah Program is designed for students seeking a deeper, more academic study of classical Islamic sciences. The program merges traditional textual reading with contemporary context, enabling graduates to serve as guides and leaders in the global Muslim community.",
    },
    bn: {
      title: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      subtitle: "উচ্চশিক্ষিত ও যোগ্য আলেম তৈরির লক্ষ্যে একটি অগ্রসর অ্যাকাডেমিক প্রোগ্রাম।",
      duration: "৫ বছর",
      level: "উচ্চতর স্তর (আলিম সমমান)",
      features: [
        "ক্লাসিক্যাল আরবি ব্যাকরণ ও অলঙ্কারশাস্ত্র",
        "উচ্চতর কুরআন তাফসীর (বিশ্লেষণ)",
        "হাদিস ও হাদিসের মূলনীতি (উসুল)",
        "ইসলামী আইন ও আইনশাস্ত্রের নীতি (উসুলুল ফিকহ)",
        "তুলনামূলক ধর্মতত্ত্ব ও সমকালীন দর্শন",
      ],
      description: "তারবিয়াহ আলেমিয়াহ প্রোগ্রামটি মূলত তাদের জন্য ডিজাইন করা হয়েছে যারা ধ্রুপদী ইসলামী বিজ্ঞানগুলোতে গভীর এবং প্রাতিষ্ঠানিক জ্ঞান অর্জন করতে চান। ঐতিহ্যবাহী গ্রন্থপাঠ এবং সমকালীন প্রেক্ষাপটের সমন্বয়ে কোর্সটি সাজানো হয়েছে যাতে আমাদের গ্র্যাজুয়েটরা সমাজের সঠিক পথপ্রদর্শক হতে পারেন।",
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

export default TarbiyahAlemiyah;
