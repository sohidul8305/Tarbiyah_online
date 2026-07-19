import React from "react";

const Kids = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন - বাচ্চাদের জন্য একটু উজ্জ্বল রঙ */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-10 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">আরবি স্টাডিজ ফর কিডস</h1>
        <p className="text-lg opacity-95 max-w-2xl">
          ছোট সোনামণিদের জন্য কুরআন ও আরবি শেখার একটি আনন্দদায়ক পাঠশালা।
          হাসিখুশি পরিবেশ আর সহজ পদ্ধতির মাধ্যমে আমরা গড়ি ভবিষ্যতের যোগ্য
          উত্তরসূরি।
        </p>
        <button className="mt-6 bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-all shadow-md">
          ভর্তি চলছে
        </button>
      </div>

      {/* কোর্সের বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">
            আমাদের পাঠপদ্ধতি
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            বাচ্চারা খেলার ছলে যেন শিখতে পারে, সেজন্য আমরা মাল্টিমিডিয়া
            প্রেজেন্টেশন এবং ইন্টারেক্টিভ মেথড ব্যবহার করি। আমাদের এই কোর্সে
            বাচ্চাদের আগ্রহ ধরে রাখতে বিশেষ মেন্টরশিপ দেওয়া হয়।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>সহজ পদ্ধতিতে কায়দা ও কুরআন তিলাওয়াত</li>
            <li>আরবি হরফের উচ্চারণ ও সুন্দর ক্যালিগ্রাফি</li>
            <li>প্রিয় নবীজি (সা.)-এর জীবনী ও ছোট ছোট ঘটনা</li>
            <li>দৈনন্দিন আমল ও আদব-কায়দা</li>
          </ul>
        </div>

        <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100">
          <h3 className="text-xl font-bold text-teal-800 mb-4">
            কোর্সের তথ্যাবলী
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>বয়স সীমা:</strong> ৫ থেকে ১২ বছর
            </p>
            <p>
              <strong>ক্লাসের সময়:</strong> সাপ্তাহিক ৩ দিন (লাইভ)
            </p>
            <p>
              <strong>শিক্ষক:</strong> অভিজ্ঞ মেন্টর ও চাইল্ড কেয়ার এক্সপার্ট
            </p>
            <p>
              <strong>পরিবেশ:</strong> ১০০% নিরাপদ ও বন্ধুত্বপূর্ণ অনলাইন ক্লাস
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;
