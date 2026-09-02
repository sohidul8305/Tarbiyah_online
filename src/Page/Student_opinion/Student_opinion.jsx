import React from "react";
import { useLanguage } from "../../context/useLanguage";
import { ExternalLink } from "lucide-react";

const Student_opinion = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* --- Header & Description Section --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004d4d] mb-6">
            {t({
              en: "What Our Students & Parents Say",
              bn: "আমাদের ছাত্র-ছাত্রী ও অভিভাবকদের মতামত",
            })}
          </h2>
          <div className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed space-y-4">
            {language === "bn" ? (
              <>
                <p>
                  তারবিয়াহ অনলাইন মাদরাসায়, আমাদের সবচেয়ে বড় প্রেরণা হলো
                  আমাদের শিক্ষার্থী এবং তাদের অভিভাবকদের আস্থা ও সন্তোষ।
                </p>
                <p>
                  এখানে আমরা তারবিয়াহতে তাদের শেখার যাত্রা, একাডেমিক অভিজ্ঞতা
                  এবং সামগ্রিক বৃদ্ধি সম্পর্কে আমাদের শিক্ষার্থী ও অভিভাবকদের
                  প্রকৃত অভিজ্ঞতা এবং প্রতিক্রিয়া শেয়ার করছি।
                </p>
                <p>
                  তারবিয়াহ অনলাইন মাদরাসায় তাদের অভিজ্ঞতা সম্পর্কে আমাদের
                  ছাত্র-ছাত্রী ও অভিভাবকরা যা বলেন তা পড়ে দেখুন।
                </p>
              </>
            ) : (
              <>
                <p>
                  At Tarbiyah Online Madrasah, our greatest motivation is the
                  trust and satisfaction of our students and their parents.
                </p>
                <p>
                  Here, we share genuine experiences and feedback from our
                  students and parents about their learning journey, academic
                  experience, and overall growth at Tarbiyah.
                </p>
                <p>
                  Read what our students and parents have to say about their
                  experience with Tarbiyah Online Madrasah.
                </p>
              </>
            )}
          </div>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- Read All Reviews Button --- */}
        <div className="text-center mt-8">
          <a
            href="https://www.facebook.com/share/p/14ksfgsxzxE/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#004d4d] hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>{t({ en: "Read All Reviews", bn: "সকল রিভিউ পড়ুন" })}</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Student_opinion;
