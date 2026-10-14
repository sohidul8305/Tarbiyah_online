import React, { useState } from "react";
import MadrashaImg from "../../image/madrasha.png";
import ChairmanImg from "../../image/profile.jpg";
// আপনার তৈরি করা হুকটি সঠিক পাথ থেকে এখানে ইমপোর্ট করুন
import { useLanguage } from "../../context/useLanguage";

const Safe_residence = () => {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    size: "",
    paymentPlan: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // ================= ALL TRANSLATIONS =================
  const content = {
    hero: {
      badge: {
        en: "Tarbiyah Residence Project",
        bn: "তারবিয়াহ আবাসন প্রকল্প",
      },
      title1: {
        en: "Where home, mosque, madrasa & playground —",
        bn: "যেখানে ঘর, মসজিদ, মাদ্রাসা ও খেলার মাঠ —",
      },
      title2: { en: "in the same community", bn: "একই কমিউনিটিতে" },
      subtitle: {
        en: "For those who dream of living in a religious environment with family, Tarbiyah Residence Project is for them. Your dream address in a safe and peaceful community.",
        bn: "পরিবার নিয়ে দ্বীনি পরিবেশে বসবাসের স্বপ্ন যাদের, তাদের জন্য তারবিয়াহ আবাসন প্রকল্প। একটি নিরাপদ ও শান্তিপূর্ণ কমিউনিটিতে আপনার স্বপ্নের ঠিকানা।",
      },
      btnRegister: { en: "Register Now", bn: "রেজিষ্ট্রেশন করুন" },
      btnDetails: { en: "See Details", bn: "বিস্তারিত দেখুন" },
      floatTitle: { en: "Safe & Peaceful", bn: "নিরাপদ ও শান্তিপূর্ণ" },
      floatSub: { en: "Religious Environment", bn: "দ্বীনি পরিবেশ" },
    },
    chairman: {
      quote: {
        en: '"Tarbiyah Residence is not just a housing project, it is a dream of building an ideal Islamic community. We want our children to grow up in an environment where religious education, prayer, sports, and family peace are found together. Through this project, we are moving forward on the path of realizing that dream."',
        bn: '"তারবিয়াহ আবাসন শুধু একটি আবাসন প্রকল্প নয়, এটি একটি আদর্শ ইসলামিক কমিউনিটি গড়ার স্বপ্ন। আমরা চাই আমাদের সন্তানরা এমন একটি পরিবেশে বেড়ে উঠুক, যেখানে দ্বীনি শিক্ষা, নামাজ, খেলাধুলা এবং পারিবারিক শান্তি একসাথে পাওয়া যায়। এই প্রকল্পের মাধ্যমে আমরা সেই স্বপ্ন বাস্তবায়নের পথে এগিয়ে যাচ্ছি।"',
      },
      name: { en: "Professor Mokhtar Ahmad", bn: "প্রফেসর মোখতার আহমদ" },
      designation: {
        en: "Chairman, Tarbiyah Education Network",
        bn: "চেয়ারম্যান, তারবিয়াহ এডুকেশন নেটওয়ার্ক",
      },
    },
    about: {
      title: { en: "What is Tarbiyah Residence?", bn: "তারবিয়াহ আবাসন কী?" },
      desc: {
        en: "Tarbiyah Residence is a community-based project, where one can live with family in a safe and religious environment. There will be a mosque, madrasa, playground, and community center here.",
        bn: "তারবিয়াহ আবাসন একটি কমিউনিটি ভিত্তিক প্রকল্প, যেখানে একটি নিরাপদ ও দ্বীনি পরিবেশে পরিবার নিয়ে বসবাস করা যায়। এখানে থাকবে মসজিদ, মাদ্রাসা, খেলার মাঠ ও কমিউনিটি সেন্টার।",
      },
      card1Title: {
        en: "Safe & Peaceful Environment",
        bn: "নিরাপদ ও শান্তিপূর্ণ পরিবেশ",
      },
      card1Desc: {
        en: "Your family's safety will be ensured through CCTV cameras, security guards, and restricted access.",
        bn: "সিসিটিভি ক্যামেরা, নিরাপত্তা প্রহরী এবং সীমিত প্রবেশাধিকারের মাধ্যমে আপনার পরিবারের নিরাপত্তা নিশ্চিত করা হবে।",
      },
      card2Title: {
        en: "Mosque & Madrasa Facility",
        bn: "মসজিদ ও মাদ্রাসা সুবিধা",
      },
      card2Desc: {
        en: "A mosque for five daily prayers and a madrasa for children's religious education in the same community.",
        bn: "পাঁচ ওয়াক্ত নামাজের জন্য মসজিদ এবং সন্তানদের দ্বীনি শিক্ষার জন্য মাদ্রাসা একই কমিউনিটিতে।",
      },
    },
    facilities: {
      title: { en: "Community Facilities", bn: "কমিউনিটির যা থাকবে" },
      subtitle: {
        en: "All facilities of a complete Islamic community in one place.",
        bn: "একটি পূর্ণাঙ্গ ইসলামিক কমিউনিটির সকল সুবিধা একই জায়গায়।",
      },
      items: [
        {
          title: { en: "Mosque", bn: "মসজিদ" },
          desc: {
            en: "Arrangement for five daily prayers and Jumu'ah prayer",
            bn: "পাঁচ ওয়াক্ত নামাজ ও জুমার নামাজের ব্যবস্থা",
          },
          icon: "🕌",
        },
        {
          title: { en: "Madrasa", bn: "মাদ্রাসা" },
          desc: {
            en: "Combination of religious and modern education for children",
            bn: "সন্তানদের জন্য দ্বীনি ও আধুনিক শিক্ষার সমন্বয়",
          },
          icon: "📚",
        },
        {
          title: { en: "Playground", bn: "খেলার মাঠ" },
          desc: {
            en: "Playground for children's physical and mental development",
            bn: "শিশুদের শারীরিক ও মানসিক বিকাশের জন্য খেলার মাঠ",
          },
          icon: "⚽",
        },
        {
          title: { en: "Community Center", bn: "কমিউনিটি সেন্টার" },
          desc: {
            en: "Community hall for social and religious events",
            bn: "সামাজিক ও ধর্মীয় অনুষ্ঠানের জন্য কমিউনিটি হল",
          },
          icon: "🏢",
        },
      ],
    },
    payment: {
      title: { en: "Payment Structure", bn: "পেমেন্টের কাঠামো" },
      subtitle: {
        en: "Opportunity to pay according to your convenience.",
        bn: "আপনার সুবিধা অনুযায়ী পেমেন্ট করার সুযোগ।",
      },
      card1Title: { en: "One-time Payment", bn: "এককালীন পেমেন্ট" },
      card1Desc: {
        en: "Special discount if the full amount is paid at once",
        bn: "সম্পূর্ণ টাকা একবারে পরিশোধ করলে বিশেষ ছাড়",
      },
      card1Badge: { en: "5% Discount", bn: "৫% ছাড়" },
      card2Title: { en: "Installment Payment", bn: "কিস্তিতে পেমেন্ট" },
      card2Desc: {
        en: "Opportunity to pay in convenient monthly installments",
        bn: "সুবিধাজনক মাসিক কিস্তিতে পরিশোধের সুযোগ",
      },
      card2Badge: { en: "Up to 36 Months", bn: "৩৬ মাস পর্যন্ত" },
      card2Popular: { en: "Most Popular", bn: "সবচেয়ে জনপ্রিয়" },
      card3Title: { en: "Flat/Land", bn: "ফ্লাট/জমি" },
      card3Desc: {
        en: "Opportunity to buy flat or land according to your choice",
        bn: "আপনার পছন্দ অনুযায়ী ফ্লাট অথবা জমি কেনার সুযোগ",
      },
      card3Badge: { en: "Both Options", bn: "উভয় অপশন" },
    },
    priority: {
      title: { en: "Priority Facilities", bn: "প্রিয়ারিটি সুবিধাসমূহ" },
      items: [
        {
          en: "Shariah-compliant environment and transactions",
          bn: "শরীয়াহ সম্মত পরিবেশ ও লেনদেন",
        },
        { en: "24/7 Security & CCTV", bn: "২৪/৭ নিরাপত্তা ও সিসিটিভি" },
        {
          en: "Assurance of electricity, water & gas",
          bn: "বিদ্যুৎ, পানি ও গ্যাসের নিশ্চয়তা",
        },
        {
          en: "Clean and green environment",
          bn: "পরিচ্ছন্ন ও সবুজ পরিবেশ",
        },
      ],
      boxTitle: {
        en: "Why Tarbiyah Residence for everyone?",
        bn: "কেন তারবিয়াহ আবাসন সবার জন্য?",
      },
      boxItems: [
        {
          en: "Opportunity to live in a religious environment at an affordable price.",
          bn: "সাশ্রয়ী মূল্যে দ্বীনি পরিবেশে বসবাসের সুযোগ।",
        },
        {
          en: "Assurance of children's religious education and growing up in an ideal environment.",
          bn: "সন্তানদের দ্বীনি শিক্ষা ও আদর্শ পরিবেশে বেড়ে ওঠার নিশ্চয়তা।",
        },
        {
          en: "A well-organized Muslim community.",
          bn: "একটি সুসংগঠিত মুসলিম কমিউনিটি।",
        },
      ],
    },
    faq: {
      title: {
        en: "Frequently Asked Questions (FAQ)",
        bn: "সাধারণ জিজ্ঞাসা (FAQ)",
      },
      items: [
        {
          q: { en: "What is Tarbiyah Residence?", bn: "তারবিয়াহ আবাসন কী?" },
          a: {
            en: "Tarbiyah Residence is a community-based project, where one can live with family in a safe and religious environment. There will be a mosque, madrasa, playground, and community center here.",
            bn: "তারবিয়াহ আবাসন একটি কমিউনিটি ভিত্তিক প্রকল্প, যেখানে একটি নিরাপদ ও দ্বীনি পরিবেশে পরিবার নিয়ে বসবাস করা যায়। এখানে থাকবে মসজিদ, মাদ্রাসা, খেলার মাঠ ও কমিউনিটি সেন্টার।",
          },
        },
        {
          q: {
            en: "What facilities will be in the community?",
            bn: "কমিউনিটিতে কী কী সুবিধা থাকবে?",
          },
          a: {
            en: "There will be a mosque, madrasa, playground, community center, 24/7 security, electricity, water, and gas facilities.",
            bn: "মসজিদ, মাদ্রাসা, খেলার মাঠ, কমিউনিটি সেন্টার, ২৪/৭ নিরাপত্তা, বিদ্যুৎ, পানি ও গ্যাসের সুবিধা থাকবে।",
          },
        },
        {
          q: {
            en: "How can I register?",
            bn: "কিভাবে রেজিষ্ট্রেশন করা যাবে?",
          },
          a: {
            en: "You can easily register by filling out the registration form at the bottom of this page. Or you can call our hotline number.",
            bn: "আপনি এই পেজের নিচে থাকা রেজিষ্ট্রেশন ফর্মটি পূরণ করে সহজেই রেজিষ্ট্রেশন করতে পারবেন। অথবা আমাদের হটলাইন নাম্বারে কল করতে পারেন।",
          },
        },
        {
          q: {
            en: "How to make the payment?",
            bn: "পেমেন্ট কীভাবে করতে হবে?",
          },
          a: {
            en: "You can make payments through one-time payment, installment payment, or by purchasing a flat/land. Contact us for more details.",
            bn: "আপনি এককালীন পেমেন্ট, কিস্তিতে পেমেন্ট অথবা ফ্লাট/জমি কেনার মাধ্যমে পেমেন্ট করতে পারবেন। বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।",
          },
        },
        {
          q: {
            en: "Is there an opportunity to buy land and build a flat?",
            bn: "জমি কেনা এবং ফ্লাট তোলার সুযোগ আছে কি?",
          },
          a: {
            en: "Yes, in this project, you can buy land according to your choice or get the opportunity to build a flat.",
            bn: "হ্যাঁ, আমাদের এই প্রকল্পে আপনি আপনার পছন্দ অনুযায়ী জমি কিনতে পারবেন অথবা ফ্লাট তোলার সুযোগ পাবেন।",
          },
        },
      ],
    },
    form: {
      title: { en: "Registration Form", bn: "রেজিষ্ট্রেশন ফর্ম" },
      subtitle: {
        en: "Complete your registration by providing your information. We will contact you soon.",
        bn: "আপনার তথ্য দিয়ে রেজিষ্ট্রেশন সম্পন্ন করুন। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      },
      success: {
        en: "Your registration has been successfully submitted! We will contact you soon.",
        bn: "আপনার রেজিষ্ট্রেশন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।",
      },
      name: { en: "Full Name *", bn: "পূর্ণ নাম *" },
      namePl: { en: "Enter your name", bn: "আপনার নাম লিখুন" },
      mobile: { en: "Mobile Number *", bn: "মোবাইল নাম্বার *" },
      mobilePl: { en: "017XXXXXXXX", bn: "০১৭XXXXXXXX" },
      email: { en: "Email", bn: "ইমেইল" },
      emailPl: { en: "example@email.com", bn: "example@email.com" },
      size: { en: "Preferred Size *", bn: "পছন্দের সাইজ *" },
      sizeSelect: { en: "Select", bn: "সিলেক্ট করুন" },
      size5: { en: "5 Katha", bn: "৫ কাঠা" },
      size10: { en: "10 Katha", bn: "১০ কাঠা" },
      sizeFlat1200: { en: "Flat (1200 sqft)", bn: "ফ্লাট (১২০০ বর্গফুট)" },
      sizeFlat1500: { en: "Flat (1500 sqft)", bn: "ফ্লাট (১৫০০ বর্গফুট)" },
      plan: { en: "Payment Plan *", bn: "পেমেন্ট প্ল্যান *" },
      planSelect: { en: "Select", bn: "সিলেক্ট করুন" },
      planOneTime: { en: "One-time Payment", bn: "এককালীন পেমেন্ট" },
      planInstallment: { en: "Installment Payment", bn: "কিস্তিতে পেমেন্ট" },
      planLand: { en: "Land Only", bn: "শুধু জমি" },
      planFlat: { en: "Flat Only", bn: "শুধু ফ্লাট" },
      message: { en: "Your Message (Optional)", bn: "আপনার বার্তা (ঐচ্ছিক)" },
      messagePl: {
        en: "Write your question or comment here...",
        bn: "আপনার কোনো প্রশ্ন বা মন্তব্য থাকলে লিখুন...",
      },
      submit: { en: "Submit", bn: "সাবমিট করুন" },
    },
    footer: {
      title: { en: "Tarbiyah Residence", bn: "তারবিয়াহ আবাসন" },
      desc: {
        en: "Safe Islamic residence, playground, mosque and madrasa enriched community.",
        bn: "নিরাপদ দ্বীনি আবাসন, খেলার মাঠ, মসজিদ ও মাদ্রাসা সমৃদ্ধ কমিউনিটি।",
      },
      privacy: { en: "Privacy Policy", bn: "প্রাইভেসি পলিসি" },
      terms: { en: "Terms & Conditions", bn: "শর্তাবলী" },
      contact: { en: "Contact", bn: "যোগাযোগ" },
      copyright: {
        en: `© ${new Date().getFullYear()} Tarbiyah Residence. All rights reserved.`,
        bn: `© ${new Date().getFullYear()} তারবিয়াহ আবাসন। সর্বস্বত্ব সংরক্ষিত।`,
      },
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 selection:bg-teal-200">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20 lg:py-32 px-4 md:px-10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-amber-100/40 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-teal-800 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm border border-teal-100">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
              {t(content.hero.badge)}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004d5a] leading-tight tracking-tight">
              {t(content.hero.title1)}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                {t(content.hero.title2)}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(content.hero.subtitle)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#registration"
                className="bg-[#004d5a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#003842] transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(0,77,90,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(0,77,90,0.7)] hover:-translate-y-1 text-center"
              >
                {t(content.hero.btnRegister)}
              </a>
              <a
                href="#facilities"
                className="bg-white/80 backdrop-blur-md text-[#004d5a] border border-teal-200 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition-all duration-300 text-center shadow-sm"
              >
                {t(content.hero.btnDetails)}
              </a>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center relative">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600 to-amber-400 rounded-[2rem] transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              {/* মাদ্রাসা ইমেজ এখানে ব্যবহার করা হয়েছে */}
              <img
                src={MadrashaImg}
                alt="Tarbiyah Residence Community"
                className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[400px] lg:h-[520px] border-[6px] border-white"
              />
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-4 animate-bounce-slow">
                <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-slate-800">
                    {t(content.hero.floatTitle)}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t(content.hero.floatSub)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHAIRMAN MESSAGE SECTION ================= */}
      <section className="py-24 px-4 md:px-10 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Chairman Image */}
          <div className="lg:w-1/3 w-full flex justify-center lg:justify-start relative">
            <div className="relative w-72 h-80 md:w-96 md:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800 rounded-[2rem] transform -rotate-6 scale-105 opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-amber-400 to-amber-600 rounded-[2rem] transform rotate-3 scale-105 opacity-10"></div>
              {/* চেয়ারম্যান ইমেজ এখানে ব্যবহার করা হয়েছে */}
              <img
                src={ChairmanImg}
                alt={t(content.chairman.name)}
                className="relative rounded-[2rem] shadow-2xl w-full h-full object-cover border-4 border-white z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20">
                <p className="text-3xl">🏛️</p>
              </div>
            </div>
          </div>

          {/* Chairman Message */}
          <div className="lg:w-2/3 w-full space-y-8">
            <svg
              className="w-16 h-16 text-teal-100"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl italic text-slate-700 leading-relaxed font-serif">
              {t(content.chairman.quote)}
            </p>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-2xl font-bold text-[#004d5a]">
                {t(content.chairman.name)}
              </h4>
              <p className="text-teal-600 font-semibold text-lg mt-1">
                {t(content.chairman.designation)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-24 px-4 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a] mb-4">
              {t(content.about.title)}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t(content.about.desc)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
              <div className="bg-gradient-to-br from-[#004d5a] to-[#006b7a] p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#004d5a] mb-3">
                  {t(content.about.card1Title)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(content.about.card1Desc)}
                </p>
              </div>
            </div>
            <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#004d5a] mb-3">
                  {t(content.about.card2Title)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(content.about.card2Desc)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FACILITIES SECTION ================= */}
      <section id="facilities" className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a] mb-4">
              {t(content.facilities.title)}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t(content.facilities.subtitle)}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.facilities.items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d5a] mb-3">
                  {t(item.title)}
                </h3>
                <p className="text-slate-500 leading-relaxed">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAYMENT SECTION ================= */}
      <section className="py-24 px-4 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a] mb-4">
              {t(content.payment.title)}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t(content.payment.subtitle)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center hover:border-[#004d5a] hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#004d5a] mb-4">
                {t(content.payment.card1Title)}
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                {t(content.payment.card1Desc)}
              </p>
              <span className="inline-block bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-base font-bold shadow-sm">
                {t(content.payment.card1Badge)}
              </span>
            </div>
            <div className="bg-gradient-to-b from-[#004d5a] to-[#003842] border-2 border-teal-500 rounded-[2rem] p-12 text-center relative shadow-2xl transform md:-translate-y-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-wider shadow-lg">
                {t(content.payment.card2Popular)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t(content.payment.card2Title)}
              </h3>
              <p className="text-teal-100 mb-8 text-lg">
                {t(content.payment.card2Desc)}
              </p>
              <span className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-full text-base font-bold">
                {t(content.payment.card2Badge)}
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center hover:border-[#004d5a] hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#004d5a] mb-4">
                {t(content.payment.card3Title)}
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                {t(content.payment.card3Desc)}
              </p>
              <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-base font-bold shadow-sm">
                {t(content.payment.card3Badge)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRIORITY SECTION ================= */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a]">
              {t(content.priority.title)}
            </h2>
            <ul className="space-y-4">
              {content.priority.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-5 text-slate-700 text-lg bg-slate-50 p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xl shadow-inner">
                    ✓
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-gradient-to-br from-[#004d5a] to-[#002b33] p-12 rounded-[2rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl opacity-20"></div>
              <h3 className="text-2xl font-bold mb-8 relative z-10">
                {t(content.priority.boxTitle)}
              </h3>
              <div className="space-y-6 relative z-10">
                {content.priority.boxItems.map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-start">
                    <span className="text-amber-400 text-2xl font-bold mt-1">
                      ✓
                    </span>
                    <p className="text-teal-50 leading-relaxed text-lg">
                      {t(item)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 px-4 md:px-10 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a] mb-12 text-center">
            {t(content.faq.title)}
          </h2>
          <div className="space-y-5">
            {content.faq.items.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                  openFaq === index
                    ? "border-teal-500 shadow-lg bg-white"
                    : "border-slate-200 bg-white hover:border-teal-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full text-left px-8 py-6 flex justify-between items-center font-bold text-lg transition-colors ${
                    openFaq === index ? "text-[#004d5a]" : "text-slate-700"
                  }`}
                >
                  {t(faq.q)}
                  <span
                    className={`text-3xl font-light transform transition-transform duration-500 ${
                      openFaq === index
                        ? "rotate-45 text-teal-600"
                        : "text-slate-400"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === index
                      ? "max-h-60 py-6 opacity-100 border-t border-slate-100"
                      : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {t(faq.a)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REGISTRATION FORM ================= */}
      <section
        id="registration"
        className="py-24 px-4 md:px-10 bg-gradient-to-b from-white to-teal-50"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,77,90,0.15)] p-8 md:p-16 border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-teal-500 via-amber-400 to-teal-500"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004d5a] mb-4">
              {t(content.form.title)}
            </h2>
            <p className="text-slate-600 text-lg">{t(content.form.subtitle)}</p>
          </div>

          {isSubmitted && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-8 py-5 rounded-2xl mb-10 flex items-center gap-4 shadow-sm relative z-10">
              <svg
                className="w-8 h-8 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="font-semibold text-lg">
                {t(content.form.success)}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  {t(content.form.name)}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg"
                  placeholder={t(content.form.namePl)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  {t(content.form.mobile)}
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg"
                  placeholder={t(content.form.mobilePl)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  {t(content.form.email)}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg"
                  placeholder={t(content.form.emailPl)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  {t(content.form.size)}
                </label>
                <select
                  name="size"
                  required
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg appearance-none cursor-pointer"
                >
                  <option value="">{t(content.form.sizeSelect)}</option>
                  <option value="5 katha">{t(content.form.size5)}</option>
                  <option value="10 katha">{t(content.form.size10)}</option>
                  <option value="flat 1200 sqft">
                    {t(content.form.sizeFlat1200)}
                  </option>
                  <option value="flat 1500 sqft">
                    {t(content.form.sizeFlat1500)}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                {t(content.form.plan)}
              </label>
              <select
                name="paymentPlan"
                required
                value={formData.paymentPlan}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg appearance-none cursor-pointer"
              >
                <option value="">{t(content.form.planSelect)}</option>
                <option value="one-time">{t(content.form.planOneTime)}</option>
                <option value="installment">
                  {t(content.form.planInstallment)}
                </option>
                <option value="land">{t(content.form.planLand)}</option>
                <option value="flat">{t(content.form.planFlat)}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                {t(content.form.message)}
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#004d5a] focus:bg-white transition-all duration-300 text-lg resize-none"
                placeholder={t(content.form.messagePl)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#004d5a] to-[#006b7a] text-white font-bold py-5 rounded-2xl hover:from-[#003842] hover:to-[#004d5a] transition-all duration-300 text-xl shadow-[0_10px_20px_-10px_rgba(0,77,90,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(0,77,90,0.7)] hover:-translate-y-1 flex justify-center items-center gap-3"
            >
              <span>{t(content.form.submit)}</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#002b33] text-white py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-teal-400 mb-3">
              {t(content.footer.title)}
            </h3>
            <p className="text-teal-100/70 text-lg max-w-md">
              {t(content.footer.desc)}
            </p>
          </div>
          <div className="flex gap-10 text-lg text-teal-100/80">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              {t(content.footer.privacy)}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              {t(content.footer.terms)}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              {t(content.footer.contact)}
            </a>
          </div>
          <p className="text-teal-100/60 text-center md:text-right">
            {t(content.footer.copyright)}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Safe_residence;
