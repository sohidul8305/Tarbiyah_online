import React from "react";
import { useLanguage } from "../../context/useLanguage";

const Management = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white py-16 px-4 md:px-20 lg:px-40 text-gray-800">
      {/* Chairman Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3">
            <img
              src="https://i.ibb.co.com/LDh0Hqs1/profile.jpg"
              alt="Chairman"
              className="w-full h-auto rounded shadow-lg"
            />
            <p className="text-center text-blue-500 font-semibold mt-4">
              {t({ en: "Chairman Of Tarbiyah", bn: "তারবিয়াহর চেয়ারম্যান" })}
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {t({ en: "OF BENGAL", bn: "বাংলার" })}
            </h2>
            <p className="text-gray-600 leading-relaxed italic mb-6">
              {t({
                en: '"As ignorance & innovation in the name of religion spread over the land of Bengal, people from all walks of life were craving for an enlightened soul..."',
                bn: '"বাংলার জমিনে যখন ধর্মের নামে অজ্ঞতা ও বিদআত ছড়িয়ে পড়েছিল, তখন সর্বস্তরের মানুষ একটি আলোকিত আত্মার জন্য আকুল হয়ে উঠেছিল..."',
              })}
            </p>
            <div className="text-blue-500 text-3xl mb-4">❝</div>
            <p className="font-semibold text-lg text-blue-600 mb-8">
              {t({
                en: "An endless journey has begun for the sake of humanity",
                bn: "মানবতার কল্যাণে শুরু হয়েছে এক অন্তহীন যাত্রা",
              })}
            </p>
            <p className="text-gray-700 leading-loose">
              {t({
                en: "Born in 80s, Professor Mokhtar Ahmad completed his graduation from the most revered institution in Bangladesh, University of Dhaka. He then dedicated himself towards the fulfillment of his dream...",
                bn: "আশির দশকে জন্মগ্রহণকারী অধ্যাপক মুখতার আহমাদ বাংলাদেশের অন্যতম মর্যাদাপূর্ণ প্রতিষ্ঠান ঢাকা বিশ্ববিদ্যালয় থেকে স্নাতক সম্পন্ন করেন। এরপর তিনি তাঁর স্বপ্ন পূরণের জন্য নিজেকে উৎসর্গ করেন...",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex justify-center my-10 text-blue-500 text-2xl">★</div>

      {/* CEO Section */}
      <section>
        <div className="flex flex-col md:flex-row-reverse gap-10 items-start">
          <div className="w-full md:w-1/3">
            <img
              src="https://i.ibb.co.com/TX22wvD/Screenshot-2026-08-22-174155.png" // সিইও-এর ছবি এখানে বসান
              alt="CEO"
              className="w-full h-auto rounded shadow-lg"
            />
            <p className="text-center text-blue-500 font-semibold mt-4">
              {t({ en: "Ceo Of Tarbiyah", bn: "তারবিয়াহর সিইও" })}
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {t({
                en: "JOURNEY TO ALLAH: A COMPASSIONATE MAN BEHIND THE SCENE",
                bn: "আল্লাহর দিকে যাত্রা: পর্দার পেছনের এক সহানুভূতিশীল মানুষ",
              })}
            </h2>
            <p className="text-gray-700 leading-loose">
              {t({
                en: "Syed Jihadul Islam, Founder CEO at Tarbiyah Education Network & Founder General Secretary at Tarbiyah Foundation, is a Pragmatic & Goal-oriented man...",
                bn: "সাইয়েদ জিহাদুল ইসলাম, তারবিয়াহ এডুকেশন নেটওয়ার্কের প্রতিষ্ঠাতা সিইও এবং তারবিয়াহ ফাউন্ডেশনের প্রতিষ্ঠাতা সাধারণ সম্পাদক, একজন বাস্তবমুখী ও লক্ষ্যভিত্তিক মানুষ...",
              })}
            </p>
            <p className="text-gray-700 leading-loose mt-4">
              {t({
                en: "Syed Jihadul Islam is a seasoned business strategist. The moment he has arrived in professional life, he has thrived in RMG industries...",
                bn: "সাইয়েদ জিহাদুল ইসলাম একজন অভিজ্ঞ ব্যবসায়িক কৌশলবিদ। পেশাগত জীবনে পা রাখার পর থেকেই তিনি আরএমজি শিল্পে সফলতার সাথে এগিয়ে গেছেন...",
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Management;
