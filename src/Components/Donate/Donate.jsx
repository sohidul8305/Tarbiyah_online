import React, { useState } from "react";
import { useLanguage } from "../../context/useLanguage";

const Donate = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState("");

  const handleCopy = (number, type) => {
    navigator.clipboard.writeText(number);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="bg-blue-50 min-h-screen py-12 px-4 md:px-20 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-blue-100 space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900">
            {t({
              en: "Support Our Cause & Donate",
              bn: "আমাদের কার্যক্রমে সহায়তা করুন এবং দান করুন",
            })}
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t({
              en: "Your generous contribution helps us sustain our educational and academic programs. You can easily send your donations through bKash or Nagad Merchant accounts.",
              bn: "আপনার উদার সহায়তা আমাদের শিক্ষামূলক ও অ্যাকাডেমিক কার্যক্রম সচল রাখতে সাহায্য করে। আপনি খুব সহজেই বিকাশ বা নগদ মার্চেন্ট অ্যাকাউন্টের মাধ্যমে অনুদান পাঠাতে পারেন।",
            })}
          </p>
        </div>

        {/* Media / Video & Picture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100">
          <div className="relative rounded-xl overflow-hidden shadow-md aspect-video bg-gray-200">
            {/* এখানে আপনার ভিডিও এমবেড বা থাম্বনেইল রাখতে পারেন */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/OFXVzYi_lLo"
              title="Tarbiyah Online Madrasah Donation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col justify-center space-y-3 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-blue-900">
              {t({
                en: "Small Donation. Lasting Impact. Ongoing Reward.",
                bn: "ছোট দান। স্থায়ী প্রভাব। চলমান সওয়াব।",
              })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t({
                en: "Your weekly or monthly contribution can make a meaningful difference in the life of a student seeking authentic Islamic knowledge.",
                bn: "আপনার সাপ্তাহিক বা মাসিক অবদান এমন একজন শিক্ষার্থীর জীবনে অর্থবহ পরিবর্তন আনতে পারে যিনি খাঁটি ইসলামিক জ্ঞান অন্বেষণ করছেন।",
              })}
            </p>
          </div>
        </div>

        {/* Merchant Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* bKash Card */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-6 text-center shadow-sm flex flex-col items-center">
            <div className="bg-pink-600 text-white font-bold px-4 py-1 rounded-full text-sm mb-3">
              {t({ en: "bKash Merchant", bn: "বিকাশ মার্চেন্ট" })}
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-wider mb-4">
              01841-412525
            </p>
            <button
              onClick={() => handleCopy("01841412525", "bkash")}
              className="bg-pink-600 hover:bg-pink-700 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg transition shadow"
            >
              {copied === "bkash"
                ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
                : t({ en: "Copy bKash Number", bn: "বিকাশ নম্বর কপি করুন" })}
            </button>
            <span className="text-[11px] text-pink-700 mt-3 font-medium">
              {t({
                en: "Type: Merchant Account (Payment)",
                bn: "ধরণ: মার্চেন্ট অ্যাকাউন্ট (পেমেন্ট)",
              })}
            </span>
          </div>

          {/* Nagad Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 text-center shadow-sm flex flex-col items-center">
            <div className="bg-orange-600 text-white font-bold px-4 py-1 rounded-full text-sm mb-3">
              {t({ en: "Nagad Merchant", bn: "নগদ মার্চেন্ট" })}
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-wider mb-4">
              01841-512525
            </p>
            <button
              onClick={() => handleCopy("01841512525", "nagad")}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg transition shadow"
            >
              {copied === "nagad"
                ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
                : t({ en: "Copy Nagad Number", bn: "নগদ নম্বর কপি করুন" })}
            </button>
            <span className="text-[11px] text-orange-700 mt-3 font-medium">
              {t({
                en: "Type: Merchant Account (Payment)",
                bn: "ধরণ: মার্চেন্ট অ্যাকাউন্ট (পেমেন্ট)",
              })}
            </span>
          </div>
        </div>

        {/* Why Support Tarbiyah Online Madrasah */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-blue-900">
            {t({
              en: "Your support helps Tarbiyah Online Madrasah continue providing:",
              bn: "আপনার সহযোগিতা তারবিয়া অনলাইন মাদরাসাকে অব্যাহত রাখতে সাহায্য করে:",
            })}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "Live and interactive Islamic classes",
                  bn: "লাইভ এবং ইন্টারেক্টিভ ইসলামিক ক্লাস",
                })}
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "Affordable and accessible Islamic education",
                  bn: "সাশ্রয়ী এবং সহজলভ্য ইসলামিক শিক্ষা",
                })}
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "Scholarship opportunities for deserving students",
                  bn: "যোগ্য শিক্ষার্থীদের জন্য স্কলারশিপের সুযোগ",
                })}
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "Global online learning opportunities",
                  bn: "বৈশ্বিক অনলাইন লার্নিং সুযোগ",
                })}
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "Student academic and personal support",
                  bn: "শিক্ষার্থীদের একাডেমিক ও ব্যক্তিগত সহায়তা",
                })}
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t({
                  en: "The spread of authentic Islamic knowledge worldwide",
                  bn: "বিশ্বব্যাপী খাঁটি ইসলামিক জ্ঞানের প্রসার",
                })}
              </span>
            </li>
          </ul>
        </div>

        {/* Turn Your Donation Into Sadaqah Jariyah */}
        <div className="space-y-4 border-l-4 border-blue-900 pl-4 md:pl-6 py-2">
          <h3 className="text-lg md:text-xl font-bold text-blue-900">
            {t({
              en: "Turn Your Donation Into Sadaqah Jariyah",
              bn: "আপনার দানকে সদকায়ে জারিয়ায় রূপান্তর করুন",
            })}
          </h3>
          <p className="text-sm text-gray-600">
            {t({
              en: "One lesson taught. One Qur’anic verse learned. One doubt removed. One heart brought closer to Allah. Every one of these can become a source of ongoing reward for you, by the permission of Allah.",
              bn: "একটি পাঠ দান। একটি কুরআনের আয়াত শিক্ষা। একটি সংশয় দূর করা। একটি হৃদয় আল্লাহর কাছাকাছি আনা। আল্লাহর ইজ্ঞতে এর প্রতিটি আপনার জন্য চলমান সওয়াবের মাধ্যম হতে পারে।",
            })}
          </p>

          {/* Hadith Box */}
          <div className="bg-blue-900 text-white p-5 rounded-xl shadow-inner space-y-2">
            <p className="text-sm md:text-base italic">
              {t({
                en: "“When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.” — Sahih Muslim",
                bn: "“মানুষ যখন মারা যায়, তখন তার আমল বন্ধ হয়ে যায় তবে তিনটি উৎস ছাড়া: সদকায়ে জারিয়া (চলমান দান), এমন জ্ঞান যা দ্বারা উপকার সাধিত হয় এবং এমন নেক সন্তান যে তার জন্য দোয়া করে।” — সহিহ মুসলিম",
              })}
            </p>
          </div>
        </div>

        {/* Instructions Note */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-gray-700 space-y-2">
          <p className="font-semibold text-blue-900">
            {t({
              en: "Important Instructions:",
              bn: "গুরুত্বপূর্ণ নির্দেশাবলী:",
            })}
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
            <li>
              {t({
                en: "Use 'Make Payment' option from your bKash or Nagad app.",
                bn: "আপনার বিকাশ বা নগদ অ্যাপ থেকে 'Make Payment' অপশন ব্যবহার করুন।",
              })}
            </li>
            <li>
              {t({
                en: "Keep the Transaction ID (TrxID) for your records.",
                bn: "আপনার রেকর্ডের জন্য ট্রানজ্যাকশন আইডি (TrxID) সংরক্ষণ করুন।",
              })}
            </li>
          </ul>
        </div>

        {/* Footer closing message */}
        <div className="text-center space-y-2 pt-4 border-t border-gray-100">
          <p className="font-semibold text-blue-900 text-base md:text-lg">
            {t({
              en: "Jazakumullahu Khairan for supporting Islamic education and the spread of beneficial knowledge.",
              bn: "ইসলামিক শিক্ষা এবং উপকারী জ্ঞানের প্রসারে সহায়তা করার জন্য জাযাকুমুল্লাহু খাইরান।",
            })}
          </p>
          <p className="text-xs text-gray-500">
            {t({
              en: "Small Donation. Lasting Impact. Ongoing Reward.",
              bn: "ছোট দান। স্থায়ী প্রভাব। চলমান সওয়াব।",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
