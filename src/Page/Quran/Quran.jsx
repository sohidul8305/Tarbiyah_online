import React from "react";
import QuraneldersImg from "../../image/quraneldars.jpg";

const Quran = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন উইথ ব্যানার ইমেজ (ফুল দেখানোর জন্য আপডেট করা) */}
      <div className="relative bg-[#002b2b] text-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center">
        {/* ব্যানার ইমেজ ফুল দেখানোর জন্য কন্টেইনার */}
        <div className="w-full md:w-1/2 h-64 md:h-80 relative bg-black/20 flex items-center justify-center p-4">
          <img
            src={QuraneldersImg}
            alt="Quran for Elders Banner"
            className="w-full h-full object-contain rounded-lg shadow-md"
          />
        </div>

        {/* কন্টেন্ট */}
        <div className="w-full md:w-1/2 p-8 md:p-10 z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            কুরআন ফর এল্ডারস
          </h1>
          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            প্রবীণদের জন্য বিশেষভাবে ডিজাইন করা কুরআন শিক্ষা প্রোগ্রাম। ধৈর্য ও
            মমতার সাথে আমরা শেখাই কুরআন তিলাওয়াত ও শুদ্ধ উচ্চারণ, যাতে এই
            বয়সেও আপনি কুরআনের নূর অর্জন করতে পারেন।
          </p>
          <button className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-md">
            এখনই ভর্তি হোন
          </button>
        </div>
      </div>

      {/* মূল বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            আমাদের কোর্সটি কেন আলাদা?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ব্যস্ততা নেই, নেই কোনো দ্রুত এগিয়ে যাওয়ার চাপ। আমরা জানি প্রবীণ
            বয়সে শেখার ধরণ ভিন্ন হয়, তাই আমাদের শিক্ষকগণ অত্যন্ত ধৈর্যের সাথে
            প্রতিটি শব্দ ও মাখরাজ শিখিয়ে থাকেন।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>কুরআন সহীহভাবে তিলাওয়াত শেখা</li>
            <li>তাজবীদের সহজ ও সাবলীল নিয়মাবলী</li>
            <li>নির্বাচিত কিছু সূরার অর্থ ও শানে নুযূল</li>
            <li>ব্যক্তিগতভাবে (One-on-One) শিক্ষক দ্বারা ক্লাস</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#004d4d] mb-4">
              কোর্সের তথ্যাবলী
            </h3>
            <div className="space-y-3 text-gray-700 mb-6">
              <p>
                <strong>ক্লাসের ধরণ:</strong> ব্যক্তিগত (One-on-One) লাইভ ক্লাস
              </p>
              <p>
                <strong>সময়:</strong> শিক্ষার্থীর সুবিধামতো সময় নির্ধারণ
              </p>
              <p>
                <strong>পদ্ধতি:</strong> অত্যন্ত ধীর ও সাবলীল শিক্ষা পদ্ধতি
              </p>
              <p>
                <strong>যোগাযোগ:</strong> আপনার সুবিধামতো সময়ে আমরা কথা বলে নেব
              </p>
            </div>
          </div>

          {/* প্রফেশনাল ট্রাস্ট ও ভেরিফাইড ইনস্টিটিউট ব্যাজ */}
          <div className="bg-gradient-to-r from-teal-50 to-white border-2 border-teal-200 p-4 rounded-xl shadow-md flex items-center gap-4 relative overflow-hidden">
            <div className="relative">
              <img
                src={QuraneldersImg}
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
                প্রবীণদের জন্য বিশেষ যত্ন ও অভিজ্ঞ শিক্ষকদের সরাসরি তত্ত্বাবধান।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
