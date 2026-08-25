import React from "react";
import { Play } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const VideoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      {/* Left Side: Video Thumbnail with Play Button */}
      <div className="w-full md:w-1/2 relative group cursor-pointer">
        <a
          href="https://www.youtube.com/watch?v=Kc4wxdA4g70"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer relative overflow-hidden rounded-lg"
        >
          <img
            src="https://i.ibb.co.com/v6kR8y3T/Screenshot-2026-08-02-124734.png"
            alt="YouTube Video"
            className="w-full rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
          />

          {/* Play Icon Overlay (Interactive on Hover) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="bg-teal-600 p-4 md:p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play size={36} fill="white" className="text-white ml-1" />
            </div>
          </div>
        </a>
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
            en: "Tarbiyah Online Madrasah is a structured online Islamic education platform dedicated to making authentic Islamic learning accessible to Muslims worldwide. Guided by qualified scholars and experienced educators, we offer learning pathways for learners of all ages—from Quran education for children and adults to systematic Islamic Studies programs. Our programs are thoughtfully designed to provide age-appropriate, research-informed, and structured learning, helping learners build Authentic Knowledge, Tarbiyah, and lasting Transformation.",
            bn: "তারবিয়াহ অনলাইন মাদ্রাসা একটি সুবিন্যস্ত অনলাইন ইসলামিক শিক্ষা প্ল্যাটফর্ম, যা বিশ্বজুড়ে মুসলমানদের জন্য সহীহ ইসলামিক শিক্ষা সহজলভ্য করতে নিবেদিত। যোগ্য আলেম ও অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে আমরা সকল বয়সের শিক্ষার্থীর জন্য পাঠদানের ব্যবস্থা করে থাকি—শিশুর কুরআন শিক্ষা থেকে শুরু করে বয়স্কদের জন্য সিস্টেমেটিক ইসলামিক স্টাডিজ প্রোগ্রাম। আমাদের প্রোগ্রামগুলো এমনভাবে সাজানো হয়েছে যা বয়সোপযোগী, গবেষণাভিত্তিক ও সুশৃঙ্খল শিক্ষা নিশ্চিত করে, যা শিক্ষার্থীদের মধ্যে সহীহ ইলম, তারবিয়াহ এবং দীর্ঘস্থায়ী রূপান্তর গঠনে সহায়তা করে।",
          })}
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
