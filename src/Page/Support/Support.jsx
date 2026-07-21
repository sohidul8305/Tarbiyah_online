import React, { useState, useEffect } from "react";

const Support = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const content = {
    en: {
      title: "Customer & Student Support",
      subtitle:
        "We are here to help you. Reach out to us through any of the channels below or send us a message.",
      helpCenter: "Help & Support Center",
      phoneLabel: "Phone / Hotline:",
      phone: "+880 1234-567890",
      emailLabel: "Email Support:",
      email: "info@tarbiyahonline.com",
      addressLabel: "Office Address:",
      address: "40/1, Safa Garden, Mohammadpur - 1207, Dhaka",
      hoursLabel: "Working Hours:",
      hours: "Saturday - Thursday: 9:00 AM - 6:00 PM",
      formTitle: "Send Us a Message",
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "Your Email Address",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Write your message or query here...",
      submitBtn: "Submit Message",
      successMsg: "Thank you! Your message has been sent successfully.",
    },
    bn: {
      title: "কাস্টমার ও স্টুডেন্ট সাপোর্ট",
      subtitle:
        "আমরা আপনাকে সহায়তা করতে প্রস্তুত। নিচের যেকোনো মাধ্যমে যোগাযোগ করুন অথবা আমাদের একটি বার্তা পাঠান।",
      helpCenter: "হেল্প ও সাপোর্ট সেন্টার",
      phoneLabel: "ফোন / হটলাইন:",
      phone: "+৮৮০ ১২৩৪-৫৬৭৮৯০",
      emailLabel: "ইমেল সাপোর্ট:",
      email: "info@tarbiyahonline.com",
      addressLabel: "অফিসের ঠিকানা:",
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭, ঢাকা",
      hoursLabel: "কাজের সময়:",
      hours: "শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৬:০০",
      formTitle: "আমাদের একটি বার্তা পাঠান",
      namePlaceholder: "আপনার পূর্ণ নাম",
      emailPlaceholder: "আপনার ইমেল ঠিকানা",
      subjectPlaceholder: "বিষয়",
      messagePlaceholder: "আপনার বার্তা বা প্রশ্ন এখানে লিখুন...",
      submitBtn: "বার্তা পাঠান",
      successMsg: "ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।",
    },
  };

  const t = content[language];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // ফর্ম সাবমিট হওয়ার পর ফর্ম রিসেট বা অন্যান্য লজিক এখানে যুক্ত করতে পারেন
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-16">
      {/* হিরো সেকশন */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004d4d] mb-3">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* কন্টাক্ট ইনফরমেশন */}
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#004d4d]">
          <h2 className="text-2xl font-bold text-[#004d4d] mb-6">
            {t.helpCenter}
          </h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {t.phoneLabel}
              </h4>
              <p className="text-[#004d4d] font-medium">{t.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {t.emailLabel}
              </h4>
              <p className="text-[#004d4d] font-medium">{t.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {t.addressLabel}
              </h4>
              <p className="text-gray-600">{t.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {t.hoursLabel}
              </h4>
              <p className="text-gray-600">{t.hours}</p>
            </div>
          </div>
        </div>

        {/* সাপোর্ট ফর্ম */}
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-[#004d4d] mb-6">
            {t.formTitle}
          </h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-medium">
              {t.successMsg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#004d4d]"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#004d4d]"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder={t.subjectPlaceholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#004d4d]"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  required
                  placeholder={t.messagePlaceholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#004d4d]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#004d4d] text-white py-3 rounded-md font-semibold text-sm hover:bg-teal-900 transition-all shadow-md"
              >
                {t.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
