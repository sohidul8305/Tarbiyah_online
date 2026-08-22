import React from "react";
import { useLanguage } from "../../context/useLanguage"; // আপনার ফোল্ডার অনুযায়ী পাথ ঠিক করে নিন

const FivePillars = () => {
  const { t } = useLanguage();

  const pillars = [
    { name: t({ en: "Shahadah", bn: "শাহাদাহ" }), icon: "☝️" },
    { name: t({ en: "Salaah", bn: "সালাহ" }), icon: "👥" },
    { name: t({ en: "Sawm", bn: "সাওম" }), icon: "🌙" },
    { name: t({ en: "Zakaat", bn: "যাকাত" }), icon: "🤲" },
    { name: t({ en: "Hajj", bn: "হজ্জ" }), icon: "🕋" },
  ];

  return (
    <section className="bg-[#1a5f7a] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-widest uppercase">
          {t({ en: "FIVE PILLARS OF ISLAM", bn: "ইসলামের পাঁচটি স্তম্ভ" })}
        </h2>

        {/* Pillars Icons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mb-3 shadow-lg border-4 border-teal-700">
                {pillar.icon}
              </div>
              <span className="font-bold text-lg">{pillar.name}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {t({
            en: "Islam Is A Religion That Is Based On A Set Of Core Beliefs And Practices, Known As The Five Pillars Of Islam. These Five Practices Are Considered Essential To The Faith And Form The Foundation For A Muslim’s Spiritual Life. In This Article, We Will Explore Each Of The Five Pillars And What They Represent.",
            bn: "ইসলাম এমন একটি ধর্ম যা মূল বিশ্বাস এবং অনুশীলনের একটি সেটের উপর ভিত্তি করে প্রতিষ্ঠিত, যা ইসলামের পাঁচটি স্তম্ভ নামে পরিচিত। এই পাঁচটি অনুশীলন বিশ্বাসের জন্য অপরিহার্য বলে বিবেচিত হয় এবং একজন মুসলিমের আধ্যাত্মিক জীবনের ভিত্তি তৈরি করে। এই নিবন্ধে, আমরা প্রতিটি স্তম্ভ এবং সেগুলি কী প্রতিনিধিত্ব করে তা অন্বেষণ করব।",
          })}
        </p>
      </div>
    </section>
  );
};

export default FivePillars;
