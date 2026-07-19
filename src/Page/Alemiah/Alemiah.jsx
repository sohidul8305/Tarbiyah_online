import React from "react";

const Alemiah = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন */}
      <div className="bg-[#004d4d] text-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">
          তারবিয়াহ আলেমিয়াহ প্রোগ্রাম
        </h1>
        <p className="text-lg opacity-90 max-w-2xl">
          গভীর জ্ঞান ও আত্মশুদ্ধির সমন্বয়ে একটি বিশেষায়িত প্রোগ্রাম। ইসলামি علوم
          (ইলম) অর্জনের মাধ্যমে নিজেকে ও সমাজকে আলোকিত করতে আমাদের এই আলেমিয়াহ
          প্রোগ্রামে যোগ দিন।
        </p>
        <button className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">
          এখনই ভর্তি হোন
        </button>
      </div>

      {/* কোর্সের বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            প্রোগ্রাম সম্পর্কে
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            তারবিয়াহ আলেমিয়াহ প্রোগ্রামটি এমনভাবে সাজানো হয়েছে যেন একজন
            শিক্ষার্থী মূল ইসলামি পাঠ্যবইগুলোর সাথে সরাসরি পরিচিত হতে পারে।
            এখানে তাত্ত্বিক জ্ঞানের পাশাপাশি আমলি তারবিয়াহর ওপর বিশেষ গুরুত্ব
            দেওয়া হয়।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>আরবি ব্যাকরণ ও সাহিত্য (নাহু ও সরফ)</li>
            <li>তাফসীর ও উলুমুল কুরআন</li>
            <li>হাদীস ও ফিকহ শাস্ত্রের উচ্চতর আলোচনা</li>
            <li>ব্যক্তিত্ব গঠন ও আত্মশুদ্ধি</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-[#004d4d] mb-4">
            প্রোগ্রামের তথ্য
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>সময়কাল:</strong> ৩ বছর (পর্যায়ক্রমিক)
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
      </div>
    </div>
  );
};

export default Alemiah;
