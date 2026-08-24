import React from "react";
import { useLanguage } from "../../context/useLanguage";

const Student_opinion = () => {
  const { t } = useLanguage();

  const opinions = [
    {
      name: {
        en: "Abdullah Al Mahmud",
        bn: "আব্দুল্লাহ আল মাহমুদ",
      },
      title: {
        en: "Diploma in Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      comment: {
        en: "The courses of Tarbiyah Online are extremely standard and timely. Alhamdulillah, I have learned a lot from here.",
        bn: "তারবিয়াহ অনলাইনের কোর্সগুলো অত্যন্ত মানসম্মত এবং সময়োপযোগী। আলহামদুলিল্লাহ, আমি এখান থেকে অনেক কিছু শিখেছি।",
      },
    },
    {
      name: {
        en: "Fatima Akter",
        bn: "ফাতিমা আক্তার",
      },
      title: {
        en: "Arabic Studies for Kids",
        bn: "আরবি স্টাডিজ ফর কিডস",
      },
      comment: {
        en: "My child is learning Arabic here, and I am extremely satisfied seeing their learning interest and progress rate.",
        bn: "আমার সন্তান এখানে আরবি শিখছে, তার শেখার আগ্রহ এবং উন্নতির হার দেখে আমি অত্যন্ত সন্তুষ্ট।",
      },
    },
    {
      name: {
        en: "Md. Nazmul Hossain",
        bn: "মো. নাজমুল হোসেন",
      },
      title: {
        en: "Quranic Arabic & Tajweed Course",
        bn: "কুরআনিক আরবি ও তাজবীদ কোর্স",
      },
      comment: {
        en: "Learning Quran with correct Tajweed was my long-time wish, and Tarbiyah Online made it so easy for me.",
        bn: "সঠিক তাজবীদসহ কুরআন শেখা আমার দীর্ঘদিনের ইচ্ছা ছিল, এবং তারবিয়াহ অনলাইন আমার জন্য বিষয়টি খুব সহজ করে দিয়েছে।",
      },
    },
    {
      name: {
        en: "Ayesha Siddika",
        bn: "আয়েশা সিদ্দিকা",
      },
      title: {
        en: "Allimiyah Islamic Course",
        bn: "আলিম ও বিশেষ ইসলামিক কোর্স",
      },
      comment: {
        en: "The teachers are extremely knowledgeable and cooperative. The online class environment is very disciplined.",
        bn: "শিক্ষকবৃন্দ অত্যন্ত জ্ঞানী ও সহযোগিতাপূর্ণ। অনলাইন ক্লাসের পরিবেশ অত্যন্ত শৃঙ্খলিত।",
      },
    },
    {
      name: {
        en: "Tanvir Ahmed",
        bn: "তানভীর আহমেদ",
      },
      title: {
        en: "Quran for elder",
        bn: "এল্ডারলি কুরআন",
      },
      comment: {
        en: "A wonderful platform to study authentic Islamic knowledge right from home. Highly recommended!",
        bn: "ঘর বসেই সহীহ ইসলামিক জ্ঞান অর্জনের জন্য একটি চমৎকার প্ল্যাটফর্ম। অত্যন্ত সুপারিশকৃত!",
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-[#004d4d] text-center mb-10">
        {t({ en: "Students' Opinions", bn: "শিক্ষার্থীদের মতামত" })}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opinions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#004d4d]"
          >
            <p className="text-gray-600 mb-4 italic">"{t(item.comment)}"</p>
            <div className="border-t pt-4">
              <h4 className="font-bold text-[#004d4d]">{t(item.name)}</h4>
              <p className="text-sm text-gray-500">{t(item.title)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student_opinion;
