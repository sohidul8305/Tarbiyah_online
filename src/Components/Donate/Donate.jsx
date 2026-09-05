import React, { useState } from "react";
import { useLanguage } from "../../context/useLanguage";

const Donate = () => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState("");

  // ডোনট অ্যামাউন্ট সিলেকশনের জন্য স্টেট (ডিফল্ট ১০০০ টাকা বা যেকোনো সংখ্যা)
  const [amount, setAmount] = useState("1000");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const presetAmounts = ["500", "1000", "2000", "5000", "10000"];

  const handleCopy = (number, type) => {
    navigator.clipboard.writeText(number);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleAmountClick = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(val);
  };

  // ভাষা পরিবর্তনের টগল হ্যান্ডলার (যদি আপনার লোকালস্টোরেজ ও ইভেন্ট ডিসপ্যাচ ব্যবহার করতে চান)
  const toggleLanguage = () => {
    const newLang = language === "en" ? "bn" : "en";
    localStorage.setItem("language", newLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-10 lg:px-16">
      {/* Top Language Toggle Bar */}
      <div className="max-w-7xl mx-auto flex justify-end mb-6"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video, Hadith & Description */}
        <div className="lg:col-span-7 space-y-6">
          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
            <div className="relative rounded-xl overflow-hidden shadow-md aspect-video bg-gray-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/4-VSJrhtVpg"
                title="Tarbiyah Online Madrasah Donation Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Hadith / Quote Box */}
            <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl text-gray-800 text-sm md:text-base italic">
              {t({
                en: "“When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.” — Sahih Muslim",
                bn: "“মানুষ যখন মারা যায়, তখন তার আমল বন্ধ হয়ে যায় তবে তিনটি উৎস ছাড়া: সদকায়ে জারিয়া (চলমান দান), এমন জ্ঞান যা দ্বারা উপকার সাধিত হয় এবং এমন নেক সন্তান যে তার জন্য দোয়া করে।” — সহিহ মুসলিম",
              })}
            </div>
          </div>

          {/* Details & Features Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                {t({
                  en: "Your Small Donation Can Help Many Students",
                  bn: "আপনার ছোট দান অনেক শিক্ষার্থীকে সাহায্য করতে পারে",
                })}
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {t({
                  en: "Your weekly or monthly contribution can make a meaningful difference in the life of a student seeking authentic Islamic knowledge.",
                  bn: "আপনার সাপ্তাহিক বা মাসিক অবদান এমন একজন শিক্ষার্থীর জীবনে অর্থবহ পরিবর্তন আনতে পারে যিনি খাঁটি ইসলামিক জ্ঞান অন্বেষণ করছেন।",
                })}
              </p>
            </div>

            {/* List of services/support */}
            <div className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm md:text-base">
                {t({
                  en: "Your support helps Tarbiyah Online Madrasah continue providing:",
                  bn: "আপনার সহযোগিতা তারবিয়া অনলাইন মাদরাসাকে অব্যাহত রাখতে সাহায্য করে:",
                })}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs md:text-sm text-gray-700">
                {[
                  {
                    en: "Live and interactive Islamic classes",
                    bn: "লাইভ এবং ইন্টারেক্টিভ ইসলামিক ক্লাস",
                  },
                  {
                    en: "Affordable and accessible Islamic education",
                    bn: "সাশ্রয়ী এবং সহজলভ্য ইসলামিক শিক্ষা",
                  },
                  {
                    en: "Scholarship opportunities for deserving students",
                    bn: "যোগ্য শিক্ষার্থীদের জন্য স্কলারশিপের সুযোগ",
                  },
                  {
                    en: "Global online learning opportunities",
                    bn: "বৈশ্বিক অনলাইন লার্নিং সুযোগ",
                  },
                  {
                    en: "Student academic and personal support",
                    bn: "শিক্ষার্থীদের একাডেমিক ও ব্যক্তিগত সহায়তা",
                  },
                  {
                    en: "Teacher and academic operations",
                    bn: "শিক্ষক ও একাডেমিক কার্যক্রম পরিচালনা",
                  },
                  {
                    en: "The spread of authentic Islamic knowledge worldwide",
                    bn: "বিশ্বব্যাপী খাঁটি ইসলামিক জ্ঞানের প্রসার",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sadaqah Jariyah Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-emerald-900">
                {t({
                  en: "Turn Your Donation Into Sadaqah Jariyah",
                  bn: "আপনার দানকে সদকায়ে জারিয়ায় রূপান্তর করুন",
                })}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {t({
                  en: "One lesson taught. One Qur’anic verse learned. One doubt removed. One heart brought closer to Allah. Every one of these can become a source of ongoing reward for you, by the permission of Allah.",
                  bn: "একটি পাঠ দান। একটি কুরআনের আয়াত শিক্ষা। একটি সংশয় দূর করা। একটি হৃদয় আল্লাহর কাছাকাছি আনা। আল্লাহর ইজ্ঞতে এর প্রতিটি আপনার জন্য চলমান সওয়াবের মাধ্যম হতে পারে।",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Form & Bank/Merchant Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Donation Interactive Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 space-y-6">
            <div className="bg-[#004d5a] text-white text-center py-3 rounded-xl font-bold shadow-sm">
              {t({
                en: "Join Our Cause & Support",
                bn: "যুক্ত হোন আমাদের সাথে",
              })}
              <p className="text-xs font-normal opacity-90 mt-0.5">
                {t({
                  en: "Your contribution keeps this noble effort alive.",
                  bn: "উদারতা, উল্লাস ও সৎ দেশটির বিস্তার এই উদ্যোগে সামিল হোন।",
                })}
              </p>
            </div>

            {/* Amount Selection Buttons */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                {t({
                  en: "Select Amount (BDT)",
                  bn: "টাকার পরিমাণ নির্বাচন করুন",
                })}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {presetAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleAmountClick(val)}
                    className={`py-2.5 rounded-lg font-bold text-sm border transition ${
                      amount === val && !customAmount
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-gray-50 hover:bg-emerald-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    ৳ {val}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div>
                <input
                  type="number"
                  placeholder={t({
                    en: "Enter custom amount",
                    bn: "অন্য কোনো পরিমাণ লিখুন",
                  })}
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Personal Info Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700">
                  {t({ en: "Your Name", bn: "আপনার নাম" })}
                </label>
                <input
                  type="text"
                  placeholder={t({
                    en: "e.g. Abdullah",
                    bn: "যেমন: আবদুল্লাহ",
                  })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700">
                  {t({ en: "Mobile Number / Email", bn: "মোবাইল / ইমেইল *" })}
                </label>
                <input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Direct Merchant Info / Quick Copy Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <p className="text-xs font-bold text-gray-800">
                {t({
                  en: "Direct Merchant Numbers:",
                  bn: "সরাসরি মার্চেন্ট নম্বর (পেমেন্ট করুন):",
                })}
              </p>

              {/* bKash */}
              <div className="flex items-center justify-between bg-pink-50 p-2.5 rounded-lg border border-pink-200">
                <div>
                  <span className="text-xs font-bold text-pink-700 block">
                    bKash Merchant
                  </span>
                  <span className="text-sm font-extrabold text-gray-800">
                    01841-412525
                  </span>
                </div>
                <button
                  onClick={() => handleCopy("01841412525", "bkash")}
                  className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-3 py-1.5 rounded font-medium shadow"
                >
                  {copied === "bkash"
                    ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
                    : t({ en: "Copy", bn: "কপি" })}
                </button>
              </div>

              {/* Nagad */}
              <div className="flex items-center justify-between bg-orange-50 p-2.5 rounded-lg border border-orange-200">
                <div>
                  <span className="text-xs font-bold text-orange-700 block">
                    Nagad Merchant
                  </span>
                  <span className="text-sm font-extrabold text-gray-800">
                    01841-512525
                  </span>
                </div>
                <button
                  onClick={() => handleCopy("01841512525", "nagad")}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1.5 rounded font-medium shadow"
                >
                  {copied === "nagad"
                    ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
                    : t({ en: "Copy", bn: "কপি" })}
                </button>
              </div>
            </div>

            {/* Donate Submit Button */}
            <button
              onClick={() =>
                alert(
                  t({
                    en: `Thank you for initiating donation of ৳${amount || 0}`,
                    bn: `৳${amount || 0} অনুদান প্রক্রিয়া শুরু করার জন্য ধন্যবাদ!`,
                  }),
                )
              }
              className="w-full bg-[#004d5a] hover:bg-[#003c46] text-white font-bold py-3 rounded-xl transition shadow-md text-base"
            >
              {t({
                en: `Donate ৳${amount || 0}`,
                bn: `দান করুন (৳${amount || 0})`,
              })}
            </button>
          </div>

          {/* Bank Information Cards */}
          <div className="space-y-4">
            {/* Bank Card 1: Shahjalal Islami Bank */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2 font-bold text-emerald-800 border-b pb-2">
                <span>🏦</span>
                <span>
                  {t({
                    en: "Bank Information (Shahjalal Islami Bank)",
                    bn: "ব্যাংক তথ্য (শাহ্‌জালাল ইসলামী ব্যাংক)",
                  })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 pt-1 text-gray-700">
                <span className="text-gray-500">
                  {t({ en: "Account Name:", bn: "অ্যাকাউন্টের নাম:" })}
                </span>
                <span className="font-semibold">Tarbiyah Academy</span>

                <span className="text-gray-500">
                  {t({ en: "Account Number:", bn: "অ্যাকাউন্ট নম্বর:" })}
                </span>
                <span className="font-semibold text-emerald-700">
                  401211100007923
                </span>

                <span className="text-gray-500">
                  {t({ en: "Bank:", bn: "ব্যাংক:" })}
                </span>
                <span>Shahjalal Islami Bank Limited</span>

                <span className="text-gray-500">
                  {t({ en: "Branch:", bn: "শাখা:" })}
                </span>
                <span>Satmasjid Road Branch</span>

                <span className="text-gray-500">
                  {t({ en: "Branch Code:", bn: "শাখা কোড:" })}
                </span>
                <span>4012</span>

                <span className="text-gray-500">
                  {t({ en: "SWIFT Code:", bn: "সুইফট কোড:" })}
                </span>
                <span>SJBLBDDHSMR</span>

                <span className="text-gray-500">
                  {t({ en: "Routing No:", bn: "রাউটিং নম্বর:" })}
                </span>
                <span>190264035</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
