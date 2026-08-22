import React from "react";
import { Globe, BookOpen, GraduationCap, Users } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#1a5f7a] py-20 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* বাম পাশের ফিচার লিস্ট */}
        <div className="grid grid-cols-2 gap-10 w-full md:w-1/2">
          {[
            {
              icon: <Globe size={32} />,
              label: t({ en: "LEARN ANYWHERE", bn: "যেকোনো জায়গায় শিখুন" }),
            },
            {
              icon: <BookOpen size={32} />,
              label: t({ en: "DIPLOMA COURSE", bn: "ডিপ্লোমা কোর্স" }),
            },
            {
              icon: <GraduationCap size={32} />,
              label: t({
                en: "CERTIFICATE COURSES",
                bn: "সার্টিফিকেট কোর্সসমূহ",
              }),
            },
            {
              icon: <Users size={32} />,
              label: t({ en: "SKILLED TEACHERS", bn: "দক্ষ শিক্ষকবৃন্দ" }),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="bg-white/10 p-4 rounded-full">{item.icon}</div>
              <span className="font-bold tracking-wider text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* ডান পাশের আর্চ স্টাইল কন্টাক্ট ফর্ম */}
        <div className="w-full md:w-1/3 relative">
          {/* আর্চ ডিজাইন */}
          <div className="border-t-8 border-l-8 border-r-8 border-white/80 rounded-t-[100px] h-96 p-8 relative">
            {/* ফর্ম ফিল্ড */}
            <div className="space-y-6 mt-10">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  {t({ en: "Your Name", bn: "আপনার নাম" })}
                </label>
                <input
                  type="text"
                  placeholder={t({ en: "FIRST NAME", bn: "প্রথম নাম" })}
                  className="w-full p-2 text-black rounded"
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">
                  {t({ en: "Email *", bn: "ইমেইল *" })}
                </label>
                <input
                  type="email"
                  placeholder={t({ en: "EMAIL ADDRESS", bn: "ইমেইল ঠিকানা" })}
                  className="w-full p-2 text-black rounded"
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">
                  {t({ en: "Mobile Number *", bn: "মোবাইল নম্বর *" })}
                </label>
                <input
                  type="text"
                  placeholder="(+880) 1*********"
                  className="w-full p-2 text-black rounded"
                />
              </div>
              <button className="bg-[#00acc1] hover:bg-[#008ba3] px-6 py-2 rounded font-bold uppercase transition">
                {t({ en: "Submit Form", bn: "ফর্ম জমা দিন" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
