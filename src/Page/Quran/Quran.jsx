import React from "react";

const Quran = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* হেডার সেকশন */}
      <div className="bg-[#004d4d] text-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">কুরআন ফর এল্ডারস</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          প্রবীণদের জন্য বিশেষভাবে ডিজাইন করা কুরআন শিক্ষা প্রোগ্রাম। ধৈর্য ও
          মমতার সাথে আমরা শেখাই কুরআন তিলাওয়াত ও শুদ্ধ উচ্চারণ, যাতে এই বয়সেও
          আপনি কুরআনের নূর অর্জন করতে পারেন।
        </p>
        <button className="mt-6 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">
          এখনই ভর্তি হোন
        </button>
      </div>

      {/* মূল বিস্তারিত */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            আমাদের কোর্সটি কেন আলাদা?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ব্যস্ততা নেই, নেই কোনো দ্রুত এগিয়ে যাওয়ার চাপ। আমরা জানি প্রবীণ বয়সে
            শেখার ধরণ ভিন্ন হয়, তাই আমাদের শিক্ষকগণ অত্যন্ত ধৈর্যের সাথে প্রতিটি
            শব্দ ও মাখরাজ শিখিয়ে থাকেন।
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>কুরআন সহীহভাবে তিলাওয়াত শেখা</li>
            <li>তাজবীদের সহজ ও সাবলীল নিয়মাবলী</li>
            <li>নির্বাচিত কিছু সূরার অর্থ ও শানে নুযূল</li>
            <li>ব্যক্তিগতভাবে (One-on-One) শিক্ষক দ্বারা ক্লাস</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-[#004d4d] mb-4">
            কোর্সের তথ্যাবলী
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>ক্লাসের ধরণ:</strong> ব্যক্তিগত (One-on-One) লাইভ ক্লাস
            </p>
            <p>
              <strong>সময়:</strong> শিক্ষার্থীর সুবিধামতো সময় নির্ধারণ
            </p>
            <p>
              <strong>পদ্ধতি:</strong> অত্যন্ত ধীর ও সাবলীল শিক্ষা পদ্ধতি
            </p>
            <p>
              <strong>যোগাযোগ:</strong> আপনার সুবিধামতো সময়ে আমরা কথা বলে নেব
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quran;
