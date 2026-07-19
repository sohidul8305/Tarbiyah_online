import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";

const TermsConditions = () => {
  const { language, t } = useLanguage();

  const content = {
    en: {
      sections: [
        {
          title: "1. Acceptance of Terms",
          desc: "By registering for and participating in courses offered by Tarbiyah Online, you agree to comply with and be bound by these terms and conditions. If you do not agree, please do not enroll.",
        },
        {
          title: "2. Admission and Eligibility",
          desc: "Courses are open to all eligible students as defined in the course details. Tarbiyah Online reserves the right to accept or refuse any student's application for admission.",
        },
        {
          title: "3. Fee Payments & Refunds",
          desc: "Course fees must be paid in full or in agreed installments before the start of classes. Refund requests will be processed according to our Refund Policy within the specified duration.",
        },
        {
          title: "4. Student Code of Conduct",
          desc: "All students are expected to maintain respectful behavior towards instructors and fellow students. Any form of harassment, hate speech, or sharing copyrighted course material without permission will lead to suspension.",
        },
      ],
    },
    bn: {
      sections: [
        {
          title: "১. শর্তাবলীর গ্রহণযোগ্যতা",
          desc: "তারবিয়াহ অনলাইন কর্তৃক প্রদত্ত কোর্সে নিবন্ধন করে এবং অংশ নিয়ে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। যদি আপনি এই শর্তাবলীতে সম্মত না হন, তবে ভর্তি না হওয়ার অনুরোধ রইল।",
        },
        {
          title: "২. ভর্তি এবং যোগ্যতা",
          desc: "কোর্সের বিবরণে উল্লেখিত যোগ্যতা অনুযায়ী যে কেউ ভর্তি হতে পারবেন। তবে তারবিয়াহ অনলাইন যেকোনো আবেদন গ্রহণ বা প্রত্যাখ্যান করার সম্পূর্ণ অধিকার সংরক্ষণ করে।",
        },
        {
          title: "৩. ফি পরিশোধ ও রিফান্ড",
          desc: "ক্লাস শুরুর আগে কোর্সের ফি সম্পূর্ণ বা কিস্তিতে পরিশোধ করতে হবে। রিফান্ড সংক্রান্ত কোনো আবেদন আমাদের রিফান্ড পলিসি অনুযায়ী নির্দিষ্ট সময়ের মধ্যে নিষ্পত্তি করা হবে।",
        },
        {
          title: "৪. আচরণবিধি",
          desc: "শিক্ষক ও সহপাঠীদের সাথে সবসময় মার্জিত আচরণ বজায় রাখতে হবে। কোনো প্রকার অপপ্রচার, অশোভন আচরণ বা অনুমতি ব্যতীত কোর্সের প্রোপার্টি শেয়ার করা হলে সদস্যপদ বাতিল হতে পারে।",
        },
      ],
    },
  };

  const activeContent = content[language] || content.bn;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#004d4d] mb-4">
              {t("termsTitle")}
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("termsSubtitle")}
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-8">
            {activeContent.sections.map((sec, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{sec.title}</h3>
                <p className="text-gray-600 leading-relaxed text-justify">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
