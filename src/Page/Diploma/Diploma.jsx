import React from "react";

const Diploma = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন */}
      <div className="bg-[#004d4d] text-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">ডিপ্লোমা ইন ইসলামিক স্টাডিজ</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          ইসলামিক জ্ঞান অর্জনের একটি পূর্ণাঙ্গ এবং পরিকল্পিত কোর্স। কুরআন,
          সুন্নাহ এবং শরীয়াহর মৌলিক জ্ঞান অর্জনের মাধ্যমে নিজেকে গড়ে তুলুন।
        </p>
        <button className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">
          এখনই ভর্তি হোন
        </button>
      </div>

      {/* কোর্সের বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            কোর্স সম্পর্কে
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            আমাদের এই ডিপ্লোমা কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে সেইসব
            ভাই-বোনদের জন্য যারা কর্মব্যস্ততার মাঝেও দ্বীনের মৌলিক জ্ঞান অর্জন
            করতে চান। এখানে অভিজ্ঞ ওলামায়ে কেরামের তত্ত্বাবধানে প্রতিটি বিষয়
            সহজভাবে উপস্থাপিত হয়।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>কুরআন তিলাওয়াত ও তাফসির</li>
            <li>হাদীস শাস্ত্রের পরিচিতি</li>
            <li>ফিকহ বা ইসলামী আইনশাস্ত্র</li>
            <li>আকাইদ ও আমল</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-[#004d4d] mb-4">
            কোর্সের তথ্য
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>সময়কাল:</strong> ১২ মাস
            </p>
            <p>
              <strong>ক্লাসের ধরণ:</strong> লাইভ অনলাইন ক্লাস
            </p>
            <p>
              <strong>কোর্স ফি:</strong> ৫,০০০ টাকা (সম্পূর্ণ)
            </p>
            <p>
              <strong>সার্টিফিকেট:</strong> কোর্স শেষে সার্টিফিকেট প্রদান করা
              হবে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diploma;
