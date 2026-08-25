import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/useLanguage"; // Adjust path as needed
import { CalendarDays, UserCircle, Clock3, Tag } from "lucide-react";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const AgeBarriersDetails = () => {
  const { t, language } = useLanguage();

  // --- Content Translation Data ---
  const content = {
    metaTitle: {
      en: "Accomplished Thinkers Transcend Age Barriers In Attaining Knowledge | Tarbiyah Education",
      bn: "জ্ঞান অর্জনে বয়স কোনো বাধা নয় | তারবিয়াহ এডুকেশন",
    },
    metaDesc: {
      en: "Explore how age is never a barrier to acquiring knowledge in Islam, looking at historical examples of companions who sought learning in their mature years.",
      bn: "ইসলামে জ্ঞান অর্জনের ক্ষেত্রে বয়স যে কখনোই কোনো বাধা হতে পারে না, তা সাহাবিগণের ঐতিহাসিক উদাহরণের মাধ্যমে অন্বেষণ করুন।",
    },
    category: { en: "Learning Islam", bn: "ইসলাম শিক্ষা" },
    title: {
      en: "Accomplished Thinkers Transcend Age Barriers In Attaining Knowledge",
      bn: "জ্ঞান অর্জনে বয়স কোনো বাধা নয়",
    },
    author: "tarbiyahedu",
    date: "August 17, 2024",
    dateText: { en: "Date", bn: "তারিখ" },
    byText: { en: "By", bn: "লিখেছেন" },
    readTime: { en: "7 min read", bn: "৭ মিনিট পঠন" },

    // Main Article Content
    introTitle: {
      en: "Knowledge Knows No Age Limit",
      bn: "জ্ঞানের কোনো বয়সের সীমানা নেই",
    },
    introText: {
      en: (
        <>
          <p className="mb-5">
            Achieving knowledge at a mature age is a testament to human
            determination and the lifelong duty placed upon every believer.
            Peace be upon the Companions who accepted Islam and dedicated their
            lives to learning. Not all of them were young; rather, many of them
            embraced faith and sought knowledge later in their lives.
          </p>
          <p className="mb-5">
            In modern society, people often fall into the trap of believing that
            learning is restricted to youth or formal schooling years. However,
            Islamic tradition heavily emphasizes that seeking knowledge is a
            lifelong pursuit from the cradle to the grave.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            প্রৌঢ় বা পরিপক্ব বয়সে জ্ঞান অর্জন করা মানুষের দৃঢ় সংকল্প এবং
            প্রতিটি বিশ্ববাসীর ওপর অর্পিত আজীবন দায়িত্বের এক অনন্য প্রমাণ।
            সাহাবিগণের যুগে অনেকেই বয়সের পরে ইসলাম গ্রহণ করেছিলেন এবং জ্ঞান
            অর্জনে নিজেদের জীবন উৎসর্গ করেছিলেন। তাদের সবাই যে ছোট ছিলেন তা নয়;
            বরং তাদের অনেকেই বয়সে প্রৌঢ় বা পরিপক্ব হওয়ার পর ইসলাম গ্রহণ ও
            জ্ঞান অর্জনে ব্রতী হন।
          </p>
          <p className="mb-5">
            আধুনিক সমাজে মানুষ প্রায়ই এই ধারণার শিকার হয় যে শিক্ষা কেবল যুবকাল
            বা আনুষ্ঠানিক স্কুল জীবনের মধ্যেই সীমাবদ্ধ। অথচ ইসলামিক ঐতিহ্য
            জোরালোভাবে শিক্ষা দেয় যে জ্ঞান অন্বেষণ হলো দোলনা থেকে কবর পর্যন্ত
            একটি আজীবন যাত্রা।
          </p>
        </>
      ),
    },

    historicalContextTitle: {
      en: "Inspirations from the Era of the Companions",
      bn: "সাহাবিগণের যুগ থেকে অনুপ্রেরণা",
    },
    historicalContextText: {
      en: (
        <p>
          Many revered figures among the Sahabah (Companions) acquired profound
          Islamic knowledge, memorized the Quran, and narrated thousands of
          Hadiths despite entering Islam or starting serious learning at an
          advanced age. Their passion proves that a sincere heart, strong
          intention, and dedication can easily transcend physical limitations
          like aging. Age is never a barrier when the desire to learn for the
          sake of Allah is genuine.
        </p>
      ),
      bn: (
        <p>
          সাহাবিগণের মধ্যে বহু শ্রদ্ধেয় ব্যক্তিত্ব বার্ধক্যে বা পরিপক্ব বয়সে
          ইসলাম গ্রহণ বা গুরুতর শিক্ষা শুরু করা সত্ত্বেও গভীর ইসলামিক জ্ঞান
          অর্জন করেছিলেন, কুরআন মুখস্থ করেছিলেন এবং হাজার হাজার হাদিস বর্ণনা
          করেছিলেন। তাদের এই আবেগ প্রমাণ করে যে একটি আন্তরিক মন, শক্তিশালী নিয়ত
          এবং নিষ্ঠা সহজেই বার্ধক্যের মতো শারীরিক সীমাবদ্ধতাগুলোকে অতিক্রম করতে
          পারে। আল্লাহর সন্তুষ্টির জন্য শেখার ইচ্ছা থাকলে বয়স কখনোই বাধা হতে
          পারে না।
        </p>
      ),
    },

    lifelongLearningTitle: {
      en: "The Lifelong Obligation of Self-Improvement",
      bn: "আত্ম-উন্নতির আজীবন বাধ্যবাধকতা",
    },
    lifelongLearningText: {
      en: (
        <>
          <p className="mb-5">
            In Islamic teachings, learning is an act of worship. Whether it is
            understanding the Quran, mastering life skills, or understanding the
            world around us, the mind remains capable of growth at any stage of
            life. Neuroscience today backs this up, showing that the brain
            retains neuroplasticity and can build new pathways throughout life.
          </p>
          <p className="mb-5">
            Therefore, parents, elders, and young adults alike should never feel
            that it is "too late" to start learning something new, whether it is
            a new language, religious science, or personal development craft.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            ইসলামিক শিক্ষায় জ্ঞান অর্জন একটি ইবাদত। তা কুরআন বোঝা হোক, জীবনমুখী
            দক্ষতা অর্জন হোক, কিংবা চারপাশের বিশ্বকে অনুধাবন করা হোক—জীবনের
            যেকোনো পর্যায়েই মন বৃদ্ধির ক্ষমতা রাখে। আধুনিক স্নায়ুবিজ্ঞানও আজ
            এটিকে সমর্থন করে, দেখায় যে মস্তিষ্ক তার প্লাস্টিসিটি বজায় রাখে এবং
            সারা জীবন ধরে নতুন স্নায়বিক পথ তৈরি করতে পারে।
          </p>
          <p className="mb-5">
            অতএব, পিতা-মাতা, প্রবীণ বা তরুণ সকলকেই কখনো এটি মনে করা উচিত নয় যে
            নতুন কিছু শেখা শুরু করার জন্য সময় "অতিরিক্ত বেশি" হয়ে গেছে—তা হোক
            কোনো নতুন ভাষা, ধর্মীয় জ্ঞান বা ব্যক্তিগত উন্নয়নের দক্ষতা।
          </p>
        </>
      ),
    },

    conclusionTitle: {
      en: "Conclusion: Start Your Journey Today",
      bn: "উপসংহার: আজই আপনার যাত্রা শুরু করুন",
    },
    conclusionText: {
      en: (
        <p>
          Age is merely a number, while knowledge is an infinite treasure. Let
          us break free from mental barriers and embrace the pursuit of wisdom
          at every single stage of life. True success belongs to those who never
          stop growing, learning, and seeking closeness to their Creator through
          knowledge.
        </p>
      ),
      bn: (
        <p>
          বয়স কেবল একটি সংখ্যা, আর জ্ঞান একটি অসীম ধনভাণ্ডার। আসুন আমরা মানসিক
          বাধাগুলো ভেঙে ফেলি এবং জীবনের প্রতিটি ধাপে জ্ঞান অর্জনের যাত্রাকে
          বাঙময় করে তুলি। প্রকৃত সাফল্য তাদেরই যারা কখনো বৃদ্ধি পাওয়া, শেখা এবং
          জ্ঞানের মাধ্যমে সৃষ্টিকর্তার সান্নিধ্য খোঁজা বন্ধ করে না।
        </p>
      ),
    },
  };

  const getFormattedDate = () => {
    if (language === "bn") {
      return "১৭ আগস্ট, ২০২৪";
    }
    return content.date;
  };

  return (
    <>
      {/* Dynamic SEO/Meta Tags */}
      <Helmet>
        <title>{t(content.metaTitle)}</title>
        <meta name="description" content={t(content.metaDesc)} />
      </Helmet>

      {/* Full Page Layout Container */}
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Navbar placed at the very top */}
        <Navbar />

        {/* Main Content Area with top/bottom spacing */}
        <main className="flex-grow py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          {/* Article Wrapper */}
          <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* --- Hero Section (Header Area) --- */}
            <header className="p-8 md:p-12 border-b border-gray-100 bg-white">
              {/* Category Tag */}
              <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-sm px-3 py-1.5 rounded-full font-medium mb-6">
                <Tag size={16} />
                {t(content.category)}
              </span>

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {t(content.title)}
              </h1>

              {/* Author, Date, Read Time Bar */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600 text-sm border-t border-gray-100 pt-6 mt-2">
                <div className="flex items-center gap-2.5">
                  <UserCircle size={20} className="text-teal-600" />
                  <span>
                    <span className="font-medium text-gray-800">
                      {t(content.byText)}:{" "}
                    </span>
                    {content.author}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={20} className="text-teal-600" />
                  <span>
                    <span className="font-medium text-gray-800">
                      {t(content.dateText)}:{" "}
                    </span>
                    {getFormattedDate()}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock3 size={20} className="text-teal-600" />
                  <span className="font-medium text-gray-800">
                    {t(content.readTime)}
                  </span>
                </div>
              </div>
            </header>

            {/* --- Main Article Body --- */}
            <div className="p-8 md:p-12 prose prose-lg prose-teal max-w-none text-gray-700 leading-relaxed">
              {/* Introduction */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-0 mb-6">
                {t(content.introTitle)}
              </h2>
              <div className="text-lg">{t(content.introText)}</div>

              <hr className="my-10 border-gray-100" />

              {/* Historical Context */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.historicalContextTitle)}
              </h3>
              {t(content.historicalContextText)}

              {/* Decorative Quote Block */}
              <blockquote className="border-l-4 border-teal-300 bg-teal-50 pl-6 py-4 my-8 rounded-r-lg">
                <p className="text-xl italic font-medium text-teal-900 m-0">
                  {language === "en"
                    ? "“Seek knowledge from the cradle to the grave.”"
                    : "“দোলনা থেকে কবর পর্যন্ত জ্ঞান অর্জন করো।”"}
                </p>
                <footer className="text-sm text-teal-700 mt-2">
                  — Islamic Proverb / Tradition
                </footer>
              </blockquote>

              {/* Lifelong Learning */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.lifelongLearningTitle)}
              </h3>
              {t(content.lifelongLearningText)}

              {/* Conclusion */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {t(content.conclusionTitle)}
              </h3>
              {t(content.conclusionText)}
            </div>

            {/* --- Footer Section of Article --- */}
            <footer className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Tarbiyah Education
              </div>
            </footer>
          </article>
        </main>

        {/* Footer placed at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default AgeBarriersDetails;
