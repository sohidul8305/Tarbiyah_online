import React from "react";
import { useLanguage } from "../../context/useLanguage";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Academicampus = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar Section */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Banner - Updated with from-[#004d5a] */}
        <div className="bg-gradient-to-r from-[#004d5a] to-teal-700 rounded-2xl shadow-xl p-8 mb-10 text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t({
              en: "Tarbiyah Academic Campus",
              bn: "তারবিয়াহ একাডেমিক ক্যাম্পাস",
            })}
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">
            {t({
              en: "Empowering students with authentic Islamic knowledge combined with modern academic excellence.",
              bn: "আধুনিক শিক্ষার পাশাপাশি বিশুদ্ধ ইসলামী জ্ঞানে শিক্ষার্থীদের দক্ষ করে গড়ে তোলা।",
            })}
          </p>
        </div>

        {/* Campus Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-[#004d5a] text-3xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t({
                en: "Modern Infrastructure",
                bn: "আধুনিক অবকাঠামো",
              })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t({
                en: "Well-equipped digital classrooms, libraries, and facilities designed for an optimal learning experience.",
                bn: "সুসজ্জিত ডিজিটাল ক্লাসরুম, লাইব্রেরি এবং অনুকূল শিক্ষার পরিবেশ।",
              })}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-[#004d5a] text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t({
                en: "Comprehensive Curriculum",
                bn: "সমৃদ্ধ পাঠ্যক্রম",
              })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t({
                en: "A balanced syllabus integrating Quranic studies, Arabic language, and contemporary education.",
                bn: "কুরআন শিক্ষা, আরবি ভাষা এবং সমসাময়িক শিক্ষার সমন্বয়ে একটি সুষম সিলেবাস।",
              })}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="text-[#004d5a] text-3xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t({
                en: "Expert Instructors",
                bn: "অভিজ্ঞ শিক্ষক মণ্ডলী",
              })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t({
                en: "Guidance from qualified scholars and experienced educators dedicated to student success.",
                bn: "যোগ্য আলেম ও অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে পরিচালিত শিক্ষা কার্যক্রম।",
              })}
            </p>
          </div>
        </div>

        {/* Detailed Info / Activities Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t({
              en: "Campus Activities & Facilities",
              bn: "ক্যাম্পাসের কার্যক্রম ও সুবিধাসমূহ",
            })}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="bg-teal-50 text-[#004d5a] font-bold px-2.5 py-1 rounded-full text-xs border border-teal-100">
                01
              </span>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {t({
                    en: "Regular Study Circles",
                    bn: "নিয়মিত তালিম ও স্টাডি সার্কেল",
                  })}
                </h4>
                <p className="text-sm text-gray-600">
                  {t({
                    en: "Weekly sessions focusing on spiritual development and moral enhancement.",
                    bn: "আধ্যাত্মিক বিকাশ ও নৈতিক উন্নতির জন্য সাপ্তাহিক সেশন।",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="bg-teal-50 text-[#004d5a] font-bold px-2.5 py-1 rounded-full text-xs border border-teal-100">
                02
              </span>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {t({
                    en: "Co-curricular Events",
                    bn: "সহ-শিক্ষা কার্যক্রম ও প্রতিযোগিতা",
                  })}
                </h4>
                <p className="text-sm text-gray-600">
                  {t({
                    en: "Hifz competitions, debate clubs, and Islamic quiz events to boost student confidence.",
                    bn: "হিফজ প্রতিযোগিতা, ডিবেট ক্লাব এবং ইসলামিক কুইজ ইভেন্ট।",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Academicampus;
