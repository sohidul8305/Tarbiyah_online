import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";

const QuranElders = () => {
  const { language, t } = useLanguage();

  const details = {
    en: {
      title: "Quran for Elders",
      subtitle: "A flexible and patient learning environment to master Quran recitation with correct Tajweed.",
      duration: "8 Months",
      level: "Adults (Ages 45+)",
      features: [
        "Correct Pronunciation of Letters (Makhraj)",
        "Core Tajweed Rules (Mudd, Ghunnah, etc.)",
        "Recitation Practice of Juz 30",
        "Memorization of Selected Surahs for Salah",
        "Basic Quranic Translation & Tafsir",
      ],
      description: "It is never too late to connect with the Book of Allah. Quran for Elders is designed with slow-paced, highly-supportive sessions specifically tailored for older adults. Our patient instructors will guide you letter by letter until you can recite the Quran smoothly and confidently.",
    },
    bn: {
      title: "কুরআন ফর এল্ডার্স",
      subtitle: "সঠিক তাজবীদ সহ কুরআন তিলাওয়াত শেখার জন্য একটি নিরিবিলি ও ধৈর্যশীল শিক্ষার পরিবেশ।",
      duration: "৮ মাস",
      level: "বয়স্কদের জন্য (বয়স ৪৫+)",
      features: [
        "হরফের সঠিক উচ্চারণ ও মাখরাজ শিক্ষা",
        "প্রয়োজনীয় তাজবীদ নিয়মাবলী (মদ্দ, গুন্নাহ ইত্যাদি)",
        "৩০তম পারার তিলাওয়াত অনুশীলন",
        "নামাজের জন্য প্রয়োজনীয় গুরুত্বপূর্ণ সূরা মুখস্থ",
        "নির্বাচিত আয়াতসমূহের সরল অনুবাদ ও তাফসীর",
      ],
      description: "আল্লাহর কিতাবের সাথে যুক্ত হতে কোনো বয়স বাধা নয়। 'কুরআন ফর এল্ডার্স' কোর্সটি বিশেষভাবে বয়স্কদের জন্য ধীরগতিতে এবং অত্যন্ত যত্নসহকারে ডিজাইন করা হয়েছে। আমাদের অভিজ্ঞ ও সহনশীল শিক্ষকরা আপনাকে প্রতিটি হরফ ধরে ধরে তিলাওয়াত শেখাবেন যাতে আপনি আত্মবিশ্বাসের সাথে কুরআন পড়তে পারেন।",
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

export default QuranElders;
