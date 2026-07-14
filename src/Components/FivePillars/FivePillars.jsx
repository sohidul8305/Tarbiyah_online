import React from 'react';

// আইকনের পরিবর্তে আমরা ইমেজ বা লুসাইড আইকন ব্যবহার করতে পারি
const pillars = [
  { name: "Shahadah", icon: "☝️" },
  { name: "Salaah", icon: "👥" },
  { name: "Sawm", icon: "🌙" },
  { name: "Zakaat", icon: "🤲" },
  { name: "Hajj", icon: "🕋" },
];

const FivePillars = () => {
  return (
    <section className="bg-[#1a5f7a] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-widest uppercase">
          FIVE PILLARS OF ISLAM
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
          Islam Is A Religion That Is Based On A Set Of Core Beliefs And Practices, 
          Known As The Five Pillars Of Islam. These Five Practices Are Considered 
          Essential To The Faith And Form The Foundation For A Muslim’s Spiritual Life. 
          In This Article, We Will Explore Each Of The Five Pillars And What They Represent.
        </p>
      </div>
    </section>
  );
};

export default FivePillars;