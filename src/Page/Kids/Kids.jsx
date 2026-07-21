import React from "react";
import KidsImg from "../../image/kids.jpg";

const Kids = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন - বাচ্চাদের জন্য উজ্জ্বল রঙ এবং ব্যানার ইমেজ সহ */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
        {/* ব্যানার ইমেজ ফুল দেখানোর জন্য কন্টেইনার */}
        <div className="w-full md:w-1/2 h-64 md:h-80 relative bg-black/10 flex items-center justify-center p-4">
          <img
            src={KidsImg}
            alt="Kids Program Banner"
            className="w-full h-full object-contain rounded-lg shadow-md"
          />
        </div>

        {/* কন্টেন্ট */}
        <div className="w-full md:w-1/2 p-8 md:p-10 z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            আরবি স্টাডিজ ফর কিডস
          </h1>
          <p className="text-base md:text-lg opacity-95 leading-relaxed">
            ছোট সোনামণিদের জন্য কুরআন ও আরবি শেখার একটি আনন্দদায়ক পাঠশালা।
            হাসিখুশি পরিবেশ আর সহজ পদ্ধতির মাধ্যমে আমরা গড়ি ভবিষ্যতের যোগ্য
            উত্তরসূরি।
          </p>
          <button className="mt-6 bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-all shadow-md">
            ভর্তি চলছে
          </button>
        </div>
      </div>

      {/* কোর্সের বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">
            আমাদের পাঠপদ্ধতি
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            বাচ্চারা খেলার ছলে যেন শিখতে পারে, সেজন্য আমরা মাল্টিমিডিয়া
            প্রেজেন্টেশন এবং ইন্টারেক্টিভ মেথড ব্যবহার করি। আমাদের এই কোর্সে
            বাচ্চাদের আগ্রহ ধরে রাখতে বিশেষ মেন্টরশিপ দেওয়া হয়।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>সহজ পদ্ধতিতে কায়দা ও কুরআন তিলাওয়াত</li>
            <li>আরবি হরফের উচ্চারণ ও সুন্দর ক্যালিগ্রাফি</li>
            <li>প্রিয় নবীজি (সা.)-এর জীবনী ও ছোট ছোট ঘটনা</li>
            <li>দৈনন্দিন আমল ও আদব-কায়দা</li>
          </ul>
        </div>

        <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-teal-800 mb-4">
              কোর্সের তথ্যাবলী
            </h3>
            <div className="space-y-3 text-gray-700 mb-6">
              <p>
                <strong>বয়স সীমা:</strong> ৫ থেকে ১২ বছর
              </p>
              <p>
                <strong>ক্লাসের সময়:</strong> সাপ্তাহিক ৩ দিন (লাইভ)
              </p>
              <p>
                <strong>শিক্ষক:</strong> অভিজ্ঞ মেন্টর ও চাইল্ড কেয়ার এক্সপার্ট
              </p>
              <p>
                <strong>পরিবেশ:</strong> ১০০% নিরাপদ ও বন্ধুত্বপূর্ণ অনলাইন
                ক্লাস
              </p>
            </div>
          </div>

          {/* প্রফেশনাল ট্রাস্ট ও ভেরিফাইড ইনস্টিটিউট ব্যাজ */}
          <div className="bg-white border-2 border-teal-200 p-4 rounded-xl shadow-md flex items-center gap-4 relative overflow-hidden">
            <div className="relative">
              <img
                src={KidsImg}
                alt="Trusted Institute"
                className="w-16 h-16 rounded-full object-cover border-2 border-teal-600 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-teal-900 text-sm">
                  ১০০% বিশ্বস্ত ও ভেরিফাইড ইনস্টিটিউট
                </h4>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                বাচ্চাদের জন্য নিরাপদ পরিবেশ এবং অভিজ্ঞ মেন্টরদের সরাসরি
                তত্ত্বাবধান।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;
