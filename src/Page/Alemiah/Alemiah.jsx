import React from "react";
import alemiaImg from "../../image/alemiyah.jpg";

const Alemiah = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন উইথ ব্যানার ইমেজ (আলেমিয়াহর নিজস্ব ইমেজ সহ) */}
      <div className="relative bg-[#002b2b] text-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center">
        {/* ব্যানার ইমেজ ফুল দেখানোর জন্য কন্টেইনার */}
        <div className="w-full md:w-1/2 h-64 md:h-80 relative bg-black/20 flex items-center justify-center p-4">
          <img
            src={alemiaImg}
            alt="Alemiah Program Banner"
            className="w-full h-full object-contain rounded-lg shadow-md"
          />
        </div>

        {/* কন্টেন্ট */}
        <div className="w-full md:w-1/2 p-8 md:p-10 z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            তারবিয়াহ আলেমিয়াহ প্রোগ্রাম
          </h1>
          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            গভীর জ্ঞান ও আত্মশুদ্ধির সমন্বয়ে একটি বিশেষায়িত প্রোগ্রাম। ইসলামি
            জ্ঞান অর্জনের মাধ্যমে নিজেকে ও সমাজকে আলোকিত করতে আমাদের এই
            আলেমিয়াহ প্রোগ্রামে যোগ দিন।
          </p>
          <button className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-md">
            এখনই ভর্তি হোন
          </button>
        </div>
      </div>

      {/* কোর্সের বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            প্রোগ্রাম সম্পর্কে
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            তারবিয়াহ আলেমিয়াহ প্রোগ্রামটি এমনভাবে সাজানো হয়েছে যেন একজন
            শিক্ষার্থী মূল ইসলামি পাঠ্যবইগুলোর সাথে সরাসরি পরিচিত হতে পারে।
            এখানে তাত্ত্বিক জ্ঞানের পাশাপাশি আমলি তারবিয়াহর ওপর বিশেষ গুরুত্ব
            দেওয়া হয়।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>আরবি ব্যাকরণ ও সাহিত্য (নাহু ও সরফ)</li>
            <li>তাফসীর ও উলুমুল কুরআন</li>
            <li>হাদীস ও ফিকহ শাস্ত্রের উচ্চতর আলোচনা</li>
            <li>ব্যক্তিত্ব গঠন ও আত্মশুদ্ধি</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#004d4d] mb-4">
              প্রোগ্রামের তথ্য
            </h3>
            <div className="space-y-3 text-gray-700 mb-6">
              <p>
                <strong>সময়কাল:</strong> ৩ বছর (পর্যায়ক্রমিক)
              </p>
              <p>
                <strong>শিক্ষাদান পদ্ধতি:</strong> লাইভ অনলাইন ও মেন্টরশিপ
              </p>
              <p>
                <strong>যোগ্যতা:</strong> প্রাথমিক ইসলামি জ্ঞান
              </p>
              <p>
                <strong>সার্টিফিকেট:</strong> কোর্স সম্পন্নকারীদের আলেমিয়াহ সনদ
                প্রদান
              </p>
            </div>
          </div>

          {/* প্রফেশনাল ট্রাস্ট ও ভেরিফাইড ইনস্টিটিউট ব্যাজ */}
          <div className="bg-gradient-to-r from-teal-50 to-white border-2 border-teal-200 p-4 rounded-xl shadow-md flex items-center gap-4 relative overflow-hidden">
            <div className="relative">
              <img
                src={alemiaImg}
                alt="Trusted Institute"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#004d4d] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-[#004d4d] text-sm">
                  ১০০% বিশ্বস্ত ও ভেরিফাইড ইনস্টিটিউট
                </h4>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                অভিজ্ঞ ওলামায়ে কেরামের সরাসরি তত্ত্বাবধান ও মানসম্মত শিক্ষা
                ব্যবস্থার নিশ্চয়তা।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alemiah;
