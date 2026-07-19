import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";

const ArabiyahKids = () => {
  const { language, t } = useLanguage();

  const details = {
    en: {
      title: "Arabiyah Studies for Kids",
      subtitle: "Making Arabic fun, engaging, and interactive for the younger generation.",
      duration: "6 Months",
      level: "Kids (Ages 6 - 12)",
      features: [
        "Arabic Alphabet Recognition",
        "Vocabulary Building through Games",
        "Simple Conversation Skills",
        "Short Surah Recitation (Tajweed)",
        "Daily Islamic Manners (Adab)",
      ],
      description: "Arabiyah Studies for Kids is designed using modern language teaching methods tailored to children's cognitive styles. Through stories, interactive exercises, and fun activities, kids will learn to speak, read, and write basic Arabic naturally.",
    },
    bn: {
      title: "আরাবিয়াহ স্টাডিজ ফর কিডস",
      subtitle: "নতুন প্রজন্মের জন্য আরবি শিক্ষাকে আনন্দদায়ক, আকর্ষণীয় ও ইন্টারঅ্যাক্টিভ করে তোলা।",
      duration: "৬ মাস",
      level: "শিশু-কিশোর (বয়স ৬ - ১২)",
      features: [
        "আরবি হরফ ও উচ্চারণ পরিচিতি",
        "খেলার ছলে শব্দভাণ্ডার তৈরি",
        "দৈনন্দিন কথোপকথনের দক্ষতা",
        "ছোট সূরা মুখস্থ ও তাজবীদ",
        "দৈনন্দিন ইসলামী আদব ও আখলাক",
      ],
      description: "আরাবিয়াহ স্টাডিজ ফর কিডস কোর্সটি বাচ্চাদের মানসিক বিকাশের সাথে সামঞ্জস্য রেখে আধুনিক ও বিনোদনমূলক পদ্ধতিতে সাজানো হয়েছে। বিভিন্ন গল্প, কুইজ ও মজার মজার কার্যাবলীর মাধ্যমে শিশুরা সহজেই আরবি পড়তে, লিখতে ও বলতে শিখবে।",
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

export default ArabiyahKids;
