import React from "react";
import { Play } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const VideoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      {/* Left Side: Video Thumbnail with Play Button */}
      <div className="w-full md:w-1/2 relative group cursor-pointer">
        <img
          src="https://i.ibb.co.com/v6kR8y3T/Screenshot-2026-08-02-124734.png"
          alt="Video Thumbnail"
          className="w-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-600/80 p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Play size={48} fill="white" className="text-white" />
          </div>
        </div>
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-1/2">
        <h4 className="text-[#00acc1] font-bold tracking-widest uppercase text-sm mb-2">
          {t({
            en: "THE ONLINE EDUCATION PORTAL!",
            bn: "অনলাইন এডুকেশন পোর্টাল!",
          })}
        </h4>
        <h2 className="text-4xl font-extrabold text-[#004d4d] mb-6">
          {t({
            en: "TARBIYAH ONLINE",
            bn: "তারবিয়াহ অনলাইন",
          })}
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          {t({
            en: "Tarbiyah Online has been working tirelessly to inculcate impeccable Islamic character, humane values, patriotism, and age-appropriate academic skills in its students from the primary level through a holistic approach. In order to achieve this goal, lessons are given in the light of the curriculum made by combining Quranic education, worldly education, and religious education.",
            bn: "তারবিয়াহ অনলাইন প্রাথমিক স্তর থেকেই শিক্ষার্থীদের মধ্যে নিখুঁত ইসলামিক চরিত্র, মানবিক মূল্যবোধ, দেশপ্রেম এবং বয়সোপযোগী একাডেমিক দক্ষতা অর্জনে অক্লান্ত পরিশ্রম করে আসছে। এই লক্ষ্য অর্জনের জন্য কুরআনিক শিক্ষা, পার্থিব শিক্ষা এবং ধর্মীয় শিক্ষার সমন্বয়ে তৈরি করা পাঠ্যক্রমের আলোকে পাঠদান করা হয়।",
          })}
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
