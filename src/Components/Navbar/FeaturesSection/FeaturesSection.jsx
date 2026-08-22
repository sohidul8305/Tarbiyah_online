import React from "react";
import {
  BookOpen,
  UserCheck,
  Video,
  Smartphone,
  Headset,
  Award,
} from "lucide-react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BookOpen size={40} className="text-teal-600" />,
      title: t({ en: "STUDY MATERIAL", bn: "স্টাডি ম্যাটেরিয়াল" }),
      desc: t({
        en: "Courses have been carefully designed to take students to a level of mastery delivered through engaging video modules, PDFs, short quizzes and final exams.",
        bn: "কোর্সগুলো এমনভাবে ডিজাইন করা হয়েছে যেন শিক্ষার্থীরা আকর্ষণীয় ভিডিও মডিউল, পিডিএফ, ছোট কুইজ এবং ফাইনাল পরীক্ষার মাধ্যমে পূর্ণতা অর্জন করতে পারে।",
      }),
    },
    {
      icon: <UserCheck size={40} className="text-teal-600" />,
      title: t({ en: "CERTIFIED INSTRUCTOR", bn: "সার্টিফাইড ইন্সট্রাক্টর" }),
      desc: t({
        en: "We have qualified and experienced Shari'ah scholars graduated from world renowned universities & certified by the experts in their respective fields.",
        bn: "আমাদের রয়েছে বিশ্বখ্যাত বিশ্ববিদ্যালয় থেকে পাশ করা এবং নিজ নিজ ক্ষেত্রে বিশেষজ্ঞ দ্বারা অনুমোদিত যোগ্য ও অভিজ্ঞ শরিয়াহ স্কলারগণ।",
      }),
    },
    {
      icon: <Video size={40} className="text-teal-600" />,
      title: t({
        en: "LIVE AND INTERACTIVE SESSIONS",
        bn: "লাইভ এবং ইন্টারেক্টিভ সেশন",
      }),
      desc: t({
        en: "Our live interactive sessions will give you an opportunity to communicate with our lecturers, network with your fellow learners and to participate in Q & A sessions.",
        bn: "আমাদের লাইভ ইন্টারেক্টিভ সেশনগুলো আপনাকে লেকচারারদের সাথে যোগাযোগ করার, সহপাঠীদের সাথে নেটওয়ার্কিং করার এবং প্রশ্ন-উত্তর পর্বে অংশ নেওয়ার সুযোগ করে দেবে।",
      }),
    },
    {
      icon: <Smartphone size={40} className="text-orange-500" />,
      title: t({ en: "STUDY ON THE GO", bn: "চলতে-ফিরতে পড়াশোনা" }),
      desc: t({
        en: "Courses are completely on-demand, so that students can learn at their own pace. Courses are designed to give students maximum impact for their limited time.",
        bn: "কোর্সগুলো সম্পূর্ণ অন-ডিমান্ড, যাতে শিক্ষার্থীরা তাদের নিজস্ব গতিতে শিখতে পারে। সীমিত সময়ে শিক্ষার্থীদের সর্বোচ্চ সুফল দেওয়ার জন্যই কোর্সগুলো সাজানো হয়েছে।",
      }),
    },
    {
      icon: <Headset size={40} className="text-teal-600" />,
      title: t({ en: "ONLINE SUPPORT", bn: "অনলাইন সাপোর্ট" }),
      desc: t({
        en: "24/7 online access to the course material including video recordings, presentations, course notes and assessments.",
        bn: "ভিডিও রেকর্ডিং, প্রেজেন্টেশন, কোর্স নোট এবং অ্যাসেসমেন্টসহ কোর্স ম্যাটেরিয়ালে ২৪/৭ অনলাইন অ্যাক্সেস।",
      }),
    },
    {
      icon: <Award size={40} className="text-orange-500" />,
      title: t({ en: "CERTIFICATE", bn: "সার্টিফিকেট" }),
      desc: t({
        en: "Certificates will be awarded upon successful completion of the courses to recognise your achievement.",
        bn: "আপনার অর্জনকে স্বীকৃতি দিতে কোর্স সফলভাবে সম্পন্ন করার পর সার্টিফিকেট প্রদান করা হবে।",
      }),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-8 
                ${index < 3 ? "md:border-b border-gray-100 pb-12" : ""} 
                ${index % 3 !== 2 ? "md:border-r border-gray-100" : ""}`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
