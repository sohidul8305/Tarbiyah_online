import React from "react";
import { useLanguage } from "../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const SeminarSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#004d4d] py-16 px-6">
      {/* Title */}
      <h2 className="text-center text-white text-3xl font-bold mb-12">
        {t({ en: "NEXT", bn: "আমাদের পরবর্তী" })}{" "}
        <span className="text-[#00acc1]">
          {t({ en: "SEMINARS", bn: "সেমিনার" })}
        </span>{" "}
        {t({ en: "FOR YOU.", bn: "আপনার জন্য।" })}
      </h2>

      {/* Seminar Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Date Box */}
        <div className="bg-[#1a5f7a] text-white p-6 flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-4xl font-bold">16</span>
          <span className="text-lg font-medium">
            {t({ en: "Nov", bn: "নভেম্বর" })}
          </span>
        </div>

        {/* Content Box */}
        <div className="p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1a5f7a] mb-2">
              {t({
                en: "Orientation Program Fall 2024",
                bn: "ওরিয়েন্টেশন প্রোগ্রাম ফল ২০২৪",
              })}
            </h3>
            <p className="text-gray-500 text-sm mb-4 flex items-center">
              🕒 8:00 am - 5:00 pm
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t({
                en: "We are very pleased to announce that the Grand Orientation Program of the Department of Alimiyah, Quranic Studies and Islamic Studies of Tarbiyah Academy will be held on October 5, 2024.",
                bn: "আমরা অত্যন্ত আনন্দের সাথে ঘোষণা করছি যে, তারবিয়াহ একাডেমির আলেমিয়াহ, কুরআনিক স্টাডিজ এবং ইসলামিক স্টাডিজ বিভাগের গ্র্যান্ড ওরিয়েন্টেশন প্রোগ্রামটি অনুষ্ঠিত হতে যাচ্ছে।",
              })}
            </p>
          </div>

          {/* Link */}
          <div className="mt-4 md:mt-0 md:ml-6">
            <a
              href="#"
              className="text-[#00acc1] font-bold text-sm hover:underline whitespace-nowrap"
            >
              {t({ en: "Find out more", bn: "আরও জানুন" })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarSection;
