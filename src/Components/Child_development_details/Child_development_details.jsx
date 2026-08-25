import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/useLanguage"; // Adjust path as needed
import { CalendarDays, UserCircle, Clock3, Tag } from "lucide-react";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ChildDevelopmentDetails = () => {
  const { t, language } = useLanguage();

  // --- Content Translation Data ---
  const content = {
    metaTitle: {
      en: "The Crucial Role of Environment in Child Development | Tarbiyah Education",
      bn: "শিশুর বিকাশ ও গঠনে পরিবেশের গুরুত্ব | তারবিয়াহ এডুকেশন",
    },
    metaDesc: {
      en: "Explore how physical, emotional, and social environments profoundly shape a child's growth, learning, and future success.",
      bn: "শিশুর শারীরিক, মানসিক ও সামাজিক পরিবেশ কীভাবে তাদের বৃদ্ধি, শিক্ষা এবং ভবিষ্যতের সাফল্যকে গভীরভাবে রূপ দেয় তা অন্বেষণ করুন।",
    },
    category: { en: "Learning Islam", bn: "ইসলাম শিক্ষা" },
    title: {
      en: "The Importance Of Environment In Child Development",
      bn: "শিশুর বিকাশ ও গঠনে পরিবেশের গুরুত্ব",
    },
    author: "tarbiyahedu",
    date: "August 20, 2024",
    dateText: { en: "Date", bn: "তারিখ" },
    byText: { en: "By", bn: "লিখেছেন" },
    readTime: { en: "2 min read", bn: "২ মিনিট পঠন" },

    // Main Article Content
    introTitle: {
      en: "The Foundation of a Child's Future",
      bn: "শিশুর ভবিষ্যতের ভিত্তি",
    },
    introText: {
      en: (
        <>
          <p className="mb-5">
            The environment plays an indispensable and profound role in the
            development of a child. From the moment of conception, and
            intensifying after birth, surroundings act as the primary sculptor
            of a child's physical, mental, emotional, and social architecture.
          </p>
          <p className="mb-5">
            While genetics provide the blueprint, the environment provides the
            materials and the construction site. A nurturing, stimulating, and
            safe environment allows a child to thrive, while an adverse one can
            create lasting challenges. In an Islamic context, providing a
            wholesome 'Tarbiyah' environment is crucial for nurturing righteous
            character.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            শিশুর মানসিক ও শারীরিক বৃদ্ধিতে পরিবেশ এক অনন্য ও অপরিহার্য ভূমিকা
            পালন করে। মাতৃগর্ভ থেকে শুরু করে জন্মের পর থেকে পরিবেশই শিশুর
            শারীরিক, মানসিক, আবেগীয় এবং সামাজিক কাঠামোর প্রধান কারিগর হিসেবে
            কাজ করে।
          </p>
          <p className="mb-5">
            যদিও বংশগতি ব্লুপ্রিন্ট প্রদান করে, পরিবেশ উপকরণ এবং নির্মাণের স্থান
            সরবরাহ করে। একটি লালন-পালনকারী, উদ্দীপক এবং নিরাপদ পরিবেশ শিশুকে
            বিকাশ করতে দেয়, যেখানে প্রতিকূল পরিবেশ স্থায়ী চ্যালেঞ্জ তৈরি করতে
            পারে। ইসলামের প্রেক্ষাপটে, একটি সুস্থ 'তারবিয়াহ' বা প্রতিপালন
            পরিবেশ সৎ চরিত্র গঠনের জন্য অত্যন্ত গুরুত্বপূর্ণ।
          </p>
        </>
      ),
    },

    physicalEnvTitle: {
      en: "The Physical Environment: Safety and Stimulation",
      bn: "ভৌত পরিবেশ: নিরাপত্তা এবং উদ্দীপনা",
    },
    physicalEnvText: {
      en: (
        <p>
          This includes the home, the neighborhood, and the school. A safe home
          free from hazards is paramount. However, it goes beyond safety. A
          stimulating physical environment—filled with books, colors, sounds,
          and opportunities for exploration—actively builds neural connections
          in a young child's brain. Cleanliness and organization in surroundings
          also foster a sense of calm and discipline, which is highly valued in
          our faith.
        </p>
      ),
      bn: (
        <p>
          এর মধ্যে রয়েছে বাড়ি, আশেপাশের এলাকা এবং স্কুল। বিপদ থেকে মুক্ত একটি
          নিরাপদ বাড়ি অত্যন্ত গুরুত্বপূর্ণ। তবে এটি কেবল নিরাপত্তার বাইরেও
          যায়। বই, রঙ, শব্দ এবং অন্বেষণের সুযোগে পূর্ণ একটি উদ্দীপক ভৌত পরিবেশ
          সক্রিয়ভাবে একটি ছোট শিশুর মস্তিষ্কে স্নায়বিক সংযোগ তৈরি করে।
          আশেপাশের পরিচ্ছন্নতা এবং শৃঙ্খলাও শান্ত ও শৃঙ্খলার বোধ জাগিয়ে তোলে,
          যা আমাদের ধর্মে অত্যন্ত মূল্যবান।
        </p>
      ),
    },

    emotionalEnvTitle: {
      en: "Emotional and Social Surroundings",
      bn: "মানসিক এবং সামাজিক পরিবেশ",
    },
    emotionalEnvText: {
      en: (
        <>
          <p className="mb-5">
            A child learns how to love, trust, and interact by observing those
            around them. The emotional climate within the family sets the stage
            for their future relationships. Consistent love, secure attachment
            to caregivers, and positive reinforcement build high self-esteem.
          </p>
          <p className="mb-5">
            Conversely, exposure to conflict, neglect, or harshness can lead to
            anxiety and behavioral issues. A child's social environment also
            includes peers and community. Surrounding them with good company
            (Suhbah) is a prophetic teaching, ensuring they adopt positive
            values and behaviors.
          </p>
        </>
      ),
      bn: (
        <>
          <p className="mb-5">
            একটি শিশু তাদের চারপাশের মানুষদের পর্যবেক্ষণ করে ভালোবাসতে, বিশ্বাস
            করতে এবং যোগাযোগ করতে শেখে। পরিবারের মধ্যে মানসিক পরিবেশ তাদের
            ভবিষ্যতের সম্পর্কের ভিত্তি স্থাপন করে। ধ্রুবক ভালোবাসা, যত্নশীলদের
            সাথে নিরাপদ আটকে থাকা এবং ইতিবাচক শক্তিবৃদ্ধি উচ্চ আত্মসম্মান তৈরি
            করে।
          </p>
          <p className="mb-5">
            বিপরীতে, সংঘাত, অবহেলা বা কঠোরতার সংস্পর্শে উদ্বেগ এবং আচরণের সমস্যা
            হতে পারে। শিশুর সামাজিক পরিবেশের মধ্যে সমবয়সী এবং সম্প্রদায়ও
            অন্তর্ভুক্ত। তাদের ভালো সঙ্গ (সুহবাহ) দিয়ে ঘিরে রাখা একটি
            ভবিষ্যদ্বাণীমূলক শিক্ষা, যা নিশ্চিত করে যে তারা ইতিবাচক মূল্যবোধ এবং
            আচরণ গ্রহণ করে।
          </p>
        </>
      ),
    },

    conclusionTitle: {
      en: "Conclusion: A Holistic Approach",
      bn: "উপসংহার: একটি সামগ্রিক দৃষ্টিভঙ্গি",
    },
    conclusionText: {
      en: (
        <p>
          Ultimately, the environment is not just where the child is; it is what
          the child experiences. It is the combination of physical safety,
          emotional warmth, and social guidance. As parents and educators, we
          are responsible for curating an environment that supports the holistic
          growth—spiritual, physical, and intellectual—of the next generation,
          fulfilling our trust (Amanah) towards them.
        </p>
      ),
      bn: (
        <p>
          পরিশেষে, পরিবেশ কেবল শিশু যেখানে থাকে তা নয়; শিশু যা অনুভব করে তা-ই।
          এটি শারীরিক নিরাপত্তা, মানসিক উষ্ণতা এবং সামাজিক নির্দেশনার সংমিশ্রণ।
          পিতামাতা এবং শিক্ষাবিদ হিসাবে, আমরা এমন একটি পরিবেশ তৈরি করার জন্য
          দায়ী যা পরবর্তী প্রজন্মে সামগ্রিক বৃদ্ধি—আধ্যাত্মিক, শারীরিক এবং
          বুদ্ধিবৃত্তিক—সমর্থন করে, তাদের প্রতি আমাদের বিশ্বাস (আমানাহ) পূরণ
          করে।
        </p>
      ),
    },
  };

  const getFormattedDate = () => {
    if (language === "bn") {
      return "২০ আগস্ট, ২০২৪";
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

              {/* Physical Environment */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.physicalEnvTitle)}
              </h3>
              {t(content.physicalEnvText)}

              {/* Decorative Quote Block */}
              <blockquote className="border-l-4 border-teal-300 bg-teal-50 pl-6 py-4 my-8 rounded-r-lg">
                <p className="text-xl italic font-medium text-teal-900 m-0">
                  {language === "en"
                    ? "“Children are not things to be molded, but are people to be unfolded.”"
                    : "“শিশুরা ছাঁচে গড়ার জিনিস নয়, বরং উন্মোচিত হওয়ার মতো মানুষ।”"}
                </p>
                <footer className="text-sm text-teal-700 mt-2">
                  — Jess Lair (Adapted)
                </footer>
              </blockquote>

              {/* Emotional Environment */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {t(content.emotionalEnvTitle)}
              </h3>
              {t(content.emotionalEnvText)}

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

export default ChildDevelopmentDetails;
