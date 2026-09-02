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
    <div className="bg-blue-50 min-h-screen py-12 px-4 md:px-20 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-blue-100">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">
            {t({
              en: "Support Our Cause & Donate",
              bn: "আমাদের কার্যক্রমে সহায়তা করুন এবং দান করুন",
            })}
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            {t({
              en: "Your generous contribution helps us sustain our educational and academic programs. You can easily send your donations through bKash or Nagad Merchant accounts.",
              bn: "আপনার উদার সহায়তা আমাদের শিক্ষামূলক ও অ্যাকাডেমিক কার্যক্রম সচল রাখতে সাহায্য করে। আপনি খুব সহজেই বিকাশ বা নগদ মার্চেন্ট অ্যাকাউন্টের মাধ্যমে অনুদান পাঠাতে পারেন।",
            })}
          </p>
        </div>

        {/* Merchant Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
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
                ? t({ en: "Copied!", bn: "কপি হয়েছে!" })
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

        {/* Instructions Note */}
        <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-r-lg text-sm text-gray-700 space-y-2">
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
      </div>
    </div>
  );
};

export default Donate;
