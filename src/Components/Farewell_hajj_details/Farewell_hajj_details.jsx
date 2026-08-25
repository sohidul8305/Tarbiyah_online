import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/useLanguage"; // Adjust path as needed
import { CalendarDays, UserCircle, Clock3, Tag } from "lucide-react";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const FarewellHajjDetails = () => {
  const { t, language } = useLanguage();

  // --- Content Translation Data ---
  const content = {
    metaTitle: {
      en: "The Conquest Of Mecca And The Lessons Of The Farewell Hajj | Tarbiyah Education",
      bn: "মক্কা বিজয় এবং বিদায় হজের শিক্ষা | তারবিয়াহ এডুকেশন",
    },
    metaDesc: {
      en: "Discover the profound historical and spiritual lessons from the Conquest of Mecca and the Farewell Hajj regarding human rights, morality, and Islamic principles.",
      bn: "মানবাধিকার, নৈতিকতা এবং ইসলামের মূলনীতি সম্পর্কে মক্কা বিজয় এবং বিদায় হজের গভীর ঐতিহাসিক ও আধ্যাত্মিক শিক্ষাগুলো আবিষ্কার করুন।",
    },
    category: { en: "Islamic History", bn: "ইসলামিক ইতিহাস" },
    title: {
      en: "The Conquest Of Mecca And The Lessons Of The Farewell Hajj",
      bn: "মক্কা বিজয় এবং বিদায় হজের শিক্ষা",
    },
    author: "tarbiyahedu",
    date: "August 19, 2024",
    dateText: { en: "Date", bn: "তারিখ" },
    byText: { en: "By", bn: "লিখেছেন" },
    readTime: { en: "1 min read", bn: "১ মিনিট পঠন" },

    // Main Article Content
    introTitle: {
      en: "Pivotal Moments in Islamic History",
      bn: "ইসলামের ইতিহাসের টার্নিং পয়েন্ট",
    },
    introText: {
      en: (
        <>
          <p className="mb-5">
            The conquest of Mecca and the Farewell Hajj are two extremely
            important events in Islamic history. These two milestones mark the
            consolidation of Islam in the Arabian Peninsula and outline a
            comprehensive code of conduct for humanity for generations to come.
          </p>
          <p className="mb-5">
            While the Conquest of Mecca (Fath Makkah) demonstrated unmatched
            mercy, forgiveness, and justice, the Farewell Hajj (Hajjat al-Wida)
            provided the final, timeless blueprint of human rights, equality,
            and ethical living delivered by Prophet Muhammad (PBUH) in his
            historic sermon.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            ইসলামের ইতিহাসে মক্কা বিজয় এবং বিদায় হজ দুটি অত্যন্ত গুরুত্বপূর্ণ
            ঘটনা। এই দুটি মাইলফলক আরব উপদ্বীপে ইসলামের সুদৃঢ় অবস্থান এবং আগামী
            প্রজন্মের জন্য মানবজাতির একটি আদর্শ জীবনব্যবস্থার রূপরেখা তুলে ধরে।
          </p>
          <p className="mb-5">
            মক্কা বিজয় (ফতেহ মক্কা) যেমন অতুলনীয় দয়া, ক্ষমা ও ন্যায়পরায়ণতার
            দৃষ্টান্ত স্থাপন করেছিল, তেমনি বিদায় হজ (হজ্জাতুল বিদায়) মহানবী
            (সা.)-এর ঐতিহাসিক ভাষণের মাধ্যমে মানবাধিকার, সমতা এবং নৈতিক জীবনের
            চূড়ান্ত ও চিরন্তন দিকনির্দেশনা প্রদান করেছিল।
          </p>
        </>
      ),
    },

    meccaTitle: {
      en: "The Conquest of Mecca: Mercy Over Vengeance",
      bn: "মক্কা বিজয়: প্রতিশোধের বদলে ক্ষমা ও উদারতা",
    },
    meccaText: {
      en: (
        <p>
          In the 8th year of Hijri, Muslims re-entered Mecca peacefully. Despite
          years of persecution, torture, and battles waged against them by the
          Quraysh, Prophet Muhammad (PBUH) declared a general amnesty. Instead
          of seeking revenge, he echoed the noble words of Prophet Yusuf (AS):
          "No blame on you today." This historic act of supreme forgiveness won
          the hearts of the people, leading them to embrace Islam in masses.
        </p>
      ),
      bn: (
        <p>
          হিজরি অষ্টম বর্ষে মুসলমানরা শান্তিপূর্ণভাবে মক্কায় প্রবেশ করেন।
          কুরাইশদের পক্ষ থেকে বছরের পর বছর ধরে নির্যাতন, নিপীড়ন এবং যুদ্ধের
          শিকার হওয়া সত্ত্বেও মহানবী (সা.) সাধারণ ক্ষমার ঘোষণা দেন। প্রতিশোধ
          নেওয়ার পরিবর্তে তিনি হযরত ইউসুফ (আ.)-এর সেই মহান বাণী উচ্চারণ করেন:
          "আজ তোমাদের বিরুদ্ধে কোনো ক্ষোভ নেই।" চরম ক্ষমার এই ঐতিহাসিক কাজটি
          মানুষের হৃদয় জয় করে নেয়, যার ফলে তারা দলবদ্ধভাবে ইসলাম গ্রহণ করতে
          শুরু করে।
        </p>
      ),
    },

    hajjTitle: {
      en: "The Farewell Hajj and the Universal Declaration of Human Rights",
      bn: "বিদায় হজ এবং সর্বজনীন মানবাধিকার ঘোষণা",
    },
    hajjText: {
      en: (
        <>
          <p className="mb-5">
            In the 10th year of Hijri, the Prophet (PBUH) performed his final
            pilgrimage and delivered the historic sermon at Mount Arafat.
            Standing before over a hundred thousand believers, he laid down core
            principles that abolished pre-Islamic tribal discrimination and
            racism.
          </p>
          <p className="mb-5">
            He famously proclaimed that an Arab has no superiority over a
            non-Arab, nor a white over a black, except by piety and righteous
            action. It guaranteed the sanctity of life, property, and honor, and
            established equal rights and responsibilities for men and women
            alike.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            হিজরি দশম বর্ষে রাসূল (সা.) তার জীবনের শেষ হজ পালন করেন এবং আরাফাতের
            ময়দানে ঐতিহাসিক ভাষণ প্রদান করেন। লক্ষাধিক বিশ্বাসের মানুষের সামনে
            দাঁড়িয়ে তিনি এমন কিছু মূলনীতি স্থাপন করেছিলেন যা প্রাক-ইসলামী
            গোত্রীয় বৈষম্য ও বর্ণবাদকে চিরতরে দূর করে দিয়েছিল।
          </p>
          <p className="mb-5">
            তিনি ঘোষণা করেছিলেন যে তাকওয়া বা পরহেজগারিতা ছাড়া অনারবের ওপর
            Arab-এর কিংবা কৃষ্ণাঙ্গের ওপর শ্বেতাঙ্গের কোনো শ্রেষ্ঠত্ব নেই। এটি
            জীবন, সম্পত্তি ও সম্মানের পবিত্রতা নিশ্চিত করে এবং নারী-পুরুষ সকলের
            জন্য সমান অধিকার ও দায়িত্ব প্রতিষ্ঠা করে।
          </p>
        </>
      ),
    },

    conclusionTitle: {
      en: "Conclusion: Living by the Prophetic Legacy",
      bn: "উপসংহার: নববী আদর্শ অনুযায়ী জীবনযাপন",
    },
    conclusionText: {
      en: (
        <p>
          The lessons of Mecca's conquest and the Farewell Hajj are timeless
          guides for humanity. They teach us that true strength lies in
          forgiveness, true leadership in serving justice, and true equality in
          human brotherhood under the Creator. As followers of this legacy, we
          must strive to implement these values in our daily personal and social
          lives.
        </p>
      ),
      bn: (
        <p>
          মক্কা বিজয় এবং বিদায় হজের শিক্ষা মানবজাতির জন্য চিরন্তন
          দিকনির্দেশনা। এগুলো আমাদের শেখায় যে প্রকৃত শক্তি নিহিত রয়েছে ক্ষমার
          মধ্যে, প্রকৃত নেতৃত্ব ন্যায়বিচার প্রতিষ্ঠার মধ্যে এবং প্রকৃত সমতা
          সৃষ্টিকর্তার অধীনে মানব ভ্রাতৃত্বে। এই ঐতিহ্যের অনুসারী হিসেবে আমাদের
          দৈনন্দিন ব্যক্তিগত ও সামাজিক জীবনে এই মূল্যবোধগুলো বাস্তবায়ন করার
          চেষ্টা করা উচিত।
        </p>
      ),
    },
  };

  const getFormattedDate = () => {
    if (language === "bn") {
      return "১৯ আগস্ট, ২০২৪";
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

              {/* Conquest of Mecca */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.meccaTitle)}
              </h3>
              {t(content.meccaText)}

              {/* Decorative Quote Block */}
              <blockquote className="border-l-4 border-teal-300 bg-teal-50 pl-6 py-4 my-8 rounded-r-lg">
                <p className="text-xl italic font-medium text-teal-900 m-0">
                  {language === "en"
                    ? "“All mankind is from Adam and Eve, an Arab has no superiority over a non-Arab...”"
                    : "“সমস্ত মানবজাতি আদম ও হাওয়া থেকে এসেছে, একজন অনারবের ওপর কোনো আরব ব্যক্তির শ্রেষ্ঠত্ব নেই...”"}
                </p>
                <footer className="text-sm text-teal-700 mt-2">
                  — Prophet Muhammad (PBUH) [Farewell Sermon]
                </footer>
              </blockquote>

              {/* Farewell Hajj */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.hajjTitle)}
              </h3>
              {t(content.hajjText)}

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

export default FarewellHajjDetails;
