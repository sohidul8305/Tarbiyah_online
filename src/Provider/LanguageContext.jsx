import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "bn"; // Default to bn (Bangla) as per user preference
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));
  };

  const translations = {
    en: {
      // Navbar & Topbar
      address: "40/1, Safa Garden, Mohammadpur - 1207",
      email: "info@tarbiyahonline.com",
      phone1: "+880 1841-514545",
      phone2: "+880 1841-516565",
      login: "Log In",
      home: "Home",
      about: "About Us",
      courses: "Courses",
      consultancy: "Consultancy",
      blog: "Blog",
      sponsorship: "Sponsorship",
      portalLogin: "Portal Login",
      joinNow: "Join Now",
      support: "Support",
      donation: "Donation",

      // About Dropdown
      management: "Management",
      faculty: "Faculty",
      ourMember: "Our Member",
      studentOpinion: "Student Opinion",
      termsConditions: "Terms & Conditions",

      // Course Dropdown
      liveCourse: "Live Course",
      recordedCourse: "Recorded Course",
      diplomaIslamicStudies: "Diploma in Islamic Studies",
      tarbiyahAlemiyah: "Tarbiyah Alemiyah Program",
      arabiyahKids: "Arabiyah Studies for Kids",
      quranElders: "Quran for Elders",

      // Portal Login Dropdown
      teacherLogin: "Teacher Login",
      adminLogin: "Admin Login",
      studentLogin: "Student Login",

      // Blog Dropdown
      events: "Events",
      gallery: "Gallery",

      // Footer
      footerDesc: "At Tarbiyah Online, we believe that education should be accessible to everyone, regardless of their background or circumstances. That's Why we offer a range of online courses designed to help you learn new skills at any time that suits you.",
      usefulLinks: "Useful Links",
      applyOnline: "Apply Online",
      privacyPolicy: "Privacy Policy",
      myAccount: "My Account",
      refundPolicy: "Refund Policy",
      cart: "Cart",
      career: "Careers",
      contact: "Contact Us",
      getTouch: "Get In Touch",
      addressLabel: "40/1 Safa Garden Satmasjid Housing, Mohammadpur, Dhaka-1207",

      // Course names & general text
      courseTitle: "Our Courses",
      liveHeader: "OUR LIVE COURSES",
      recordedHeader: "OUR RECORDED COURSES",
      instructor: "tarbiyahedu",
      curriculum: "Course Curriculum",
      duration: "Duration",
      level: "Level",
      enrollNow: "Enroll Now",
      studentReviews: "Student Opinions",
      whatStudentsSay: "What Our Students Say About Tarbiyah Online",
      termsTitle: "Terms & Conditions",
      termsSubtitle: "Please read our terms and conditions carefully before enrolling in our courses.",
    },
    bn: {
      // Navbar & Topbar
      address: "৪০/১, সাফা গার্ডেন, মোহাম্মদপুর - ১২০৭",
      email: "info@tarbiyahonline.com",
      phone1: "+৮৮০ ১৮৪১-৫১৪৫৪৫",
      phone2: "+৮৮০ ১৮৪১-৫১৬৫৬৫",
      login: "লগইন",
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      courses: "কোর্সসমূহ",
      consultancy: "পরামর্শ",
      blog: "ব্লগ",
      sponsorship: "স্পনসরশিপ",
      portalLogin: "পোর্টাল লগইন",
      joinNow: "যুক্ত হোন",
      support: "সাপোর্ট",
      donation: "ডোনেশন",

      // About Dropdown
      management: "ব্যবস্থাপনা",
      faculty: "শিক্ষকবৃন্দ",
      ourMember: "আমাদের সদস্য",
      studentOpinion: "শিক্ষার্থীদের মতামত",
      termsConditions: "শর্তাবলী",

      // Course Dropdown
      liveCourse: "লাইভ কোর্স",
      recordedCourse: "রেকর্ডেড কোর্স",
      diplomaIslamicStudies: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      tarbiyahAlemiyah: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
      arabiyahKids: "আরাবিয়াহ স্টাডিজ ফর কিডস",
      quranElders: "কুরআন ফর এল্ডার্স",

      // Portal Login Dropdown
      teacherLogin: "শিক্ষক লগইন",
      adminLogin: "অ্যাডমিন লগইন",
      studentLogin: "শিক্ষার্থী লগইন",

      // Blog Dropdown
      events: "ইভেন্টসমূহ",
      gallery: "গ্যালারি",

      // Footer
      footerDesc: "তারবিয়াহ অনলাইনে আমরা বিশ্বাস করি যে শিক্ষা সবার কাছে পৌঁছানো উচিত, তাদের ব্যাকগ্রাউন্ড বা পরিস্থিতি যাই হোক না কেন। এই কারণেই আমরা বিভিন্ন ধরণের অনলাইন কোর্স অফার করি যা আপনাকে যেকোনো উপযুক্ত সময়ে নতুন দক্ষতা শিখতে সাহায্য করার জন্য ডিজাইন করা হয়েছে।",
      usefulLinks: "প্রয়োজনীয় লিংক",
      applyOnline: "অনলাইন আবেদন",
      privacyPolicy: "গোপনীয়তা নীতি",
      myAccount: "আমার অ্যাকাউন্ট",
      refundPolicy: "রিফান্ড পলিসি",
      cart: "কার্ট",
      career: "ক্যারিয়ার",
      contact: "যোগাযোগ করুন",
      getTouch: "আমাদের সাথে যোগাযোগ",
      addressLabel: "৪০/১ সাফা গার্ডেন, সাত মসজিদ হাউজিং, মোহাম্মদপুর, ঢাকা-১২০৭",

      // Course names & general text
      courseTitle: "আমাদের কোর্সসমূহ",
      liveHeader: "আমাদের লাইভ কোর্সসমূহ",
      recordedHeader: "আমাদের রেকর্ডেড কোর্সসমূহ",
      instructor: "তারবিয়াহ এডু",
      curriculum: "কোর্সের পাঠ্যসূচি",
      duration: "সময়সীমা",
      level: "স্তর",
      enrollNow: "এখনই যুক্ত হোন",
      studentReviews: "শিক্ষার্থীদের মতামত",
      whatStudentsSay: "তারবিয়াহ অনলাইন সম্পর্কে আমাদের শিক্ষার্থীদের অভিজ্ঞতা ও মতামত",
      termsTitle: "শর্তাবলী ও নিয়মাবলী",
      termsSubtitle: "আমাদের কোর্সগুলোতে ভর্তি হওয়ার আগে দয়া করে শর্তাবলী এবং নিয়মাবলী মনোযোগ দিয়ে পড়ুন।",
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
