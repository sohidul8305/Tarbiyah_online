import React from "react";
import { useLanguage } from "../../context/useLanguage";

const Management = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* --- Chairman Section --- */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Chairman Image & Badge */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <img
                  src="https://i.ibb.co.com/LDh0Hqs1/profile.jpg"
                  alt="Professor Mokhter Ahmad"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {t({
                    en: "Professor Mokhter Ahmad",
                    bn: "প্রফেসর মুখতার আহমাদ",
                  })}
                </h3>
                <p className="text-teal-600 font-semibold text-sm">
                  {t({
                    en: "Chairman, Tarbiyah Education Network\nFounder & Academic Supervisor, Tarbiyah Online Madrasah",
                    bn: "চেয়ারম্যান, তারবিয়াহ এডুকেশন নেটওয়ার্ক\nপ্রতিষ্ঠাতা ও একাডেমিক সুপারভাইজার, তারবিয়াহ অনলাইন মাদ্রাসা",
                  })}
                </p>
              </div>
            </div>

            {/* Chairman Bio Details */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
                  {t({ en: "Leadership", bn: "নেতৃত্ব" })}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 mb-2">
                  {t({
                    en: "Academician & Islamic Educationist",
                    bn: "শিক্ষাবিদ ও ইসলামী শিক্ষাবিদ",
                  })}
                </h2>
                <p className="text-gray-600 leading-relaxed italic">
                  {t({
                    en: '"As ignorance & innovation in the name of religion spread over the land of Bengal, people from all walks of life were craving for an enlightened soul..."',
                    bn: '"বাংলার জমিনে যখন ধর্মের নামে অজ্ঞতা ও বিদআত ছড়িয়ে পড়েছিল, তখন সর্বস্তরের মানুষ একটি আলোকিত আত্মার জন্য আকুল হয়ে উঠেছিল..."',
                  })}
                </p>
              </div>

              <div className="p-4 bg-teal-50/50 rounded-2xl border-l-4 border-teal-600 text-teal-900 font-medium italic text-sm md:text-base">
                {t({
                  en: "“Our vision is to make quality Islamic education accessible to everyone, everywhere.”",
                  bn: "“আমাদের দৃষ্টিভঙ্গি হলো সকলের জন্য, সর্বত্র মানসম্মত ইসলামী শিক্ষা সহজলভ্য করা।”",
                })}
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  {t({
                    en: "Professor Mokhter Ahmad is an academician, Islamic educationist and educational leader dedicated to making quality Islamic education accessible to learners across the world. Born in the greater Chandpur region of Bangladesh, he completed his Dakhil and Alim education under the Bangladesh Madrasah Education Board, and earned his Bachelor’s and Master’s degrees in Islamic Studies from the University of Dhaka with academic distinction.",
                    bn: "প্রফেসর মুখতার আহমাদ একজন শিক্ষাবিদ, ইসলামী শিক্ষাবিদ এবং শিক্ষামূলক নেতা, যিনি সারা বিশ্বের শিক্ষার্থীদের জন্য মানসম্মত ইসলামী শিক্ষা সহজলভ্য করতে উৎসর্গীকৃত। বাংলাদেশের বৃহত্তর চাঁদপুর অঞ্চলে জন্মগ্রহণকারী তিনি বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ডের অধীনে দাখিল ও আলিম শিক্ষা সম্পন্ন করেন এবং ঢাকা বিশ্ববিদ্যালয় থেকে ইসলামিক স্টাডিজে স্নাতক ও স্নাতকোত্তর ডিগ্রি অর্জন করেন।",
                  })}
                </p>
                <p>
                  {t({
                    en: "He has served in academic and leadership positions at prominent higher-education institutions including Daffodil International University, Islamic University of Technology (IUT), Asian University of Bangladesh (AUB), and International Islamic University Chittagong (IIUC).",
                    bn: "তিনি ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি, ইসলামিক ইউনিভার্সিটি অফ টেকনোলজি (IUT), এশিয়ান ইউনিভার্সিটি অফ বাংলাদেশ (AUB) এবং ইন্টারন্যাশনাল ইসলামিক ইউনিভার্সিটি চট্টগ্রাম (IIUC)-এর মতো বিশিষ্ট উচ্চশিক্ষা প্রতিষ্ঠানে একাডেমিক ও নেতৃত্বমূলক পদে দায়িত্ব পালন করেছেন।",
                  })}
                </p>
                <p>
                  {t({
                    en: "During the COVID-19 pandemic, recognizing the urgent need for structured alternative Islamic learning, he established Tarbiyah Online Madrasah. His broader vision is to build an international learning ecosystem where learners can acquire authentic Islamic knowledge from the comfort of their homes.",
                    bn: "কোভিড-19 মহামারীর সময়, কাঠামোগত বিকল্প ইসলামী শিক্ষার জরুরি প্রয়োজনীয়তা অনুধাবন করে তিনি তারবিয়াহ অনলাইন মাদ্রাসা প্রতিষ্ঠা করেন। তাঁর দূরদর্শী লক্ষ্য হলো একটি আন্তর্জাতিক লার্নিং ইকোসিস্টেম গড়ে তোলা যেখান থেকে শিক্ষার্থীরা ঘরে বসেই খাঁটি ইসলামী জ্ঞান অর্জন করতে পারে।",
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Separator --- */}
        <div className="flex justify-center items-center gap-4 text-teal-600">
          <div className="h-px bg-gray-200 w-24 sm:w-40"></div>
          <span className="text-xl">★</span>
          <div className="h-px bg-gray-200 w-24 sm:w-40"></div>
        </div>

        {/* --- CEO Section --- */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-12">
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-start">
            {/* CEO Image & Badge */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <img
                  src="https://i.ibb.co.com/TX22wvD/Screenshot-2026-08-22-174155.png"
                  alt="Sayed Jihadul Islam"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {t({
                    en: "Sayed Jihadul Islam",
                    bn: "সাইয়েদ জিহাদুল ইসলাম",
                  })}
                </h3>
                <p className="text-teal-600 font-semibold text-sm">
                  {t({
                    en: "Chief Executive Officer (CEO), Tarbiyah Education Network",
                    bn: "চিফ এক্সিকিউটিভ অফিসার (সিইও), তারবিয়াহ এডুকেশন নেটওয়ার্ক",
                  })}
                </p>
              </div>
            </div>

            {/* CEO Bio Details */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
                  {t({ en: "Executive Leadership", bn: "নির্বাহী নেতৃত্ব" })}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 mb-2">
                  {t({
                    en: "JOURNEY TO ALLAH: A COMPASSIONATE MAN BEHIND THE SCENE",
                    bn: "আল্লাহর দিকে যাত্রা: পর্দার পেছনের এক সহানুভূতিশীল মানুষ",
                  })}
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  {t({
                    en: "Sayed Jihadul Islam, Founder CEO at Tarbiyah Education Network & Founder General Secretary at Tarbiyah Foundation, is a pragmatic and goal-oriented media professional, entrepreneur and educational leader with extensive experience in media production, business development and educational initiatives.",
                    bn: "সাইয়েদ জিহাদুল ইসলাম, তারবিয়াহ এডুকেশন নেটওয়ার্কের প্রতিষ্ঠাতা সিইও এবং তারবিয়াহ ফাউন্ডেশনের প্রতিষ্ঠাতা সাধারণ সম্পাদক। তিনি একজন বাস্তবমুখী ও লক্ষ্যভিত্তিক মিডিয়া পেশাদার, উদ্যোক্তা এবং শিক্ষামূলক নেতা, যাঁর মিডিয়া প্রোডাকশন, ব্যবসা উন্নয়ন এবং শিক্ষামূলক উদ্যোগে রয়েছে দীর্ঘ অভিজ্ঞতা।",
                  })}
                </p>
                <p>
                  {t({
                    en: "He has been associated with BanglaVision as an Executive Producer and Maher’s Production as a Director. He has also served in business and organizational leadership roles, including Director of Business Development at Saad Exim International Ltd., Managing Partner at A&J Trade & Co., and Founder Member of Gazipur Mohanagar Club.",
                    bn: "তিনি বাংলাভিশনে এক্সিকিউটিভ প্রডিউসার এবং ম্যাহের্স প্রোডাকশনে ডিরেক্টর হিসেবে যুক্ত ছিলেন। এছাড়া তিনি সাদ এক্সিম ইন্টারন্যাশনাল লিমিটেডের বিজনেস ডেভেলপমেন্ট ডিরেক্টর, এঅ্যান্ডজে ট্রেড অ্যান্ড কো.-এর ম্যানেজিং পার্টনার এবং গাজীপুর মহানগর ক্লাবের প্রতিষ্ঠাতা সদস্য হিসেবে সাংগঠনিক ও ব্যবসায়িক নেতৃত্ব দিয়েছেন।",
                  })}
                </p>
                <p>
                  {t({
                    en: "His academic background includes studies at the University of London, British School of Law and RPSC. Alongside his professional career, he has a deep passion for the Qur’an and serves as the Director of 'Pobitro Qur'aaner Alo' and 'Quranic Geniuses', inspiring a new generation through Qur’anic learning.",
                    bn: "তাঁর একাডেমিক পটভূমির মধ্যে রয়েছে ইউনিভার্সিটি অব লন্ডন, ব্রিটিশ স্কুল অব ল এবং RPSC-তে অধ্যয়ন। পেশাগত জীবনের পাশাপাশি কোরআনের প্রতি তাঁর রয়েছে গভীর অনুরাগ এবং তিনি 'পবিত্র কুরআনের আলো' ও 'কুরআনিক জিনিয়াস'-এর ডিরেক্টর হিসেবে তরুণ প্রজন্মকে কুরআনিক শিক্ষায় উদ্বুদ্ধ করে যাচ্ছেন।",
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Management;
