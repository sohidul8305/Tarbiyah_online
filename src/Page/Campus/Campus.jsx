import React, { useState, useEffect } from "react";

const Campus = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  // ভাষা পরিবর্তনের জন্য লোকালস্টোরেজ বা ইভেন্ট লিসেনার (যদি প্রয়োজন হয়)
  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const content = {
    en: {
      title: "Our Campus",
      subtitle: "Welcome to Tarbiyah Online & Offline Learning Environment",
      offlineTitle: "Offline Campus & Office",
      offlineDesc:
        "Our physical campus provides an interactive and serene environment for students to excel in Islamic and modern education.",
      addressTitle: "Campus Address:",
      address: "40/1, Safa Garden, Mohammadpur - 1207, Dhaka",
      onlineTitle: "Virtual Campus",
      onlineDesc:
        "Experience our state-of-the-art virtual learning management system, live interactive classes, and 24/7 digital resource accessibility from anywhere in the world.",
      facilitiesTitle: "Campus Facilities",
      f1: "Modern Digital Classrooms",
      f2: "Dedicated Student Support",
      f3: "Rich Islamic Library & Resources",
      f4: "Experienced Faculty Members",
    },
    bn: {
      title: "আমাদের ক্যাম্পাস",
      subtitle:
        "তারবিয়াহর অনলাইন ও অফলাইন লার্নিং এনভায়রনমেন্টে আপনাকে স্বাগতম",
      offlineTitle: "অফলাইন ক্যাম্পাস ও অফিস",
      offlineDesc:
        "আমাদের শারীরিক ক্যাম্পাস শিক্ষার্থীদের ইসলামি ও আধুনিক শিক্ষায় উৎকর্ষ সাধনের জন্য একটি শান্ত ও উপযোগী পরিবেশ প্রদান করে।",
      addressTitle: "ক্যাম্পাসের ঠিকানা:",
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭, ঢাকা",
      onlineTitle: "ভার্চুয়াল ক্যাম্পাস",
      onlineDesc:
        "বিশ্বের যেকোনো প্রান্ত থেকে আমাদের অত্যাধুনিক ভার্চুয়াল লার্নিং ম্যানেজমেন্ট সিস্টেম, লাইভ ইন্টারেক্টিভ ক্লাস এবং ২৪/৭ ডিজিটাল রিসোর্সের সুবিধা উপভোগ করুন।",
      facilitiesTitle: "ক্যাম্পাসের সুবিধাসমূহ",
      f1: "আধুনিক ডিজিটাল ক্লাসরুম",
      f2: "ডেডিকেটেড স্টুডেন্ট সাপোর্ট",
      f3: "সমৃদ্ধ ইসলামি লাইব্রেরি ও রিসোর্স",
      f4: "অভিজ্ঞ শিক্ষক মণ্ডলী",
    },
  };

  const t = content[language];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-16">
      {/* হিরো সেকশন */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-4">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* মেইন কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {/* অফলাইন ক্যাম্পাস কার্ড */}
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#004d4d]">
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            {t.offlineTitle}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{t.offlineDesc}</p>
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-bold text-[#004d4d] mb-1">{t.addressTitle}</h4>
            <p className="text-gray-700">{t.address}</p>
          </div>
        </div>

        {/* ভার্চুয়াল ক্যাম্পাস কার্ড */}
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-[#004d4d] mb-4">
            {t.onlineTitle}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{t.onlineDesc}</p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-1">
              {language === "en" ? "Platform Access:" : "প্লাটফর্ম অ্যাক্সেস:"}
            </h4>
            <p className="text-gray-700">
              {language === "en"
                ? "Available 24/7 via Student Portal Login."
                : "স্টুডেন্ট পোর্টাল লগইন এর মাধ্যমে ২৪/৭ উপলব্ধ।"}
            </p>
          </div>
        </div>
      </div>

      {/* সুবিধাসমূহ (Facilities) */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-[#004d4d] text-center mb-8">
          {t.facilitiesTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">{t.f1}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">{t.f2}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">{t.f3}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
            <p className="font-semibold text-gray-800">{t.f4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campus;
