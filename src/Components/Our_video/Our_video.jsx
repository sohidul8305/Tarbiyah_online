import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/useLanguage";

import {
  Globe,
  Send,
  MessageCircle,
  Video,
  Share2,
  ExternalLink,
  Users,
} from "lucide-react";

const OurVideo = () => {
  const { t, language } = useLanguage();

  // YouTube Videos List
  const videoIds = [
    "nI2hkP-e3F0",
    "r0JH4X805mE",
    "W0pHjep1vcw",
    "nXShOypVMyw",
    "_IU75TfdGTM",
    "M-2CAAfpxZQ",
    "HoICwgwGbn0",
    "66DgxQACWd4",
  ];

  // Social Media Links Data (Using reliable safe icon components)
  const socialLinks = [
    {
      name: { en: "Facebook Page", bn: "ফেসবুক পেজ" },
      url: "https://www.facebook.com/share/19cMVX749c/",
      icon: <Users className="text-blue-600" size={24} />,
      bg: "hover:bg-blue-50 border-blue-100",
    },
    {
      name: { en: "YouTube Channel", bn: "ইউটিউব চ্যানেল" },
      url: "https://youtube.com/@tarbiyahonlinemadrasa?si=pb18-SWBf6lzeuME",
      icon: <Video className="text-red-600" size={24} />,
      bg: "hover:bg-red-50 border-red-100",
    },
    {
      name: { en: "Instagram", bn: "ইনস্টাগ্রাম" },
      url: "https://www.instagram.com/tarbiyahonline?igsh=cmxrMnBpNHpyOHlr",
      icon: <Share2 className="text-pink-600" size={24} />,
      bg: "hover:bg-pink-50 border-pink-100",
    },
    {
      name: { en: "Telegram Channel", bn: "টেলিগ্রাম চ্যানেল" },
      url: "https://t.me/tarbiyahofficial",
      icon: <Send className="text-sky-500" size={24} />,
      bg: "hover:bg-sky-50 border-sky-100",
    },
    {
      name: { en: "WhatsApp Channel", bn: "হোয়াটসঅ্যাপ চ্যানেল" },
      url: "https://whatsapp.com/channel/0029VbAxCUiHbFVB1B0Sfn1P",
      icon: <MessageCircle className="text-green-600" size={24} />,
      bg: "hover:bg-green-50 border-green-100",
    },
    {
      name: { en: "WhatsApp Group", bn: "হোয়াটসঅ্যাপ কমিউনিকেশন গ্রুপ" },
      url: "https://chat.whatsapp.com/Lrn2WN1nKyrBrI6B6OjWSm?s=cl&p=a&mlu=4",
      icon: <MessageCircle className="text-emerald-600" size={24} />,
      bg: "hover:bg-emerald-50 border-emerald-100",
    },
    {
      name: { en: "TikTok Channel", bn: "টিকটক চ্যানেল" },
      url: "https://www.tiktok.com/@tarbiyah.online.m?_r=1&_t=ZS-992L9JTAU33",
      icon: <Video className="text-gray-900" size={24} />,
      bg: "hover:bg-gray-100 border-gray-200",
    },
    {
      name: { en: "Twitter (X) Channel", bn: "টুইটার (X) চ্যানেল" },
      url: "https://x.com/tarbiyaX",
      icon: <Share2 className="text-black" size={24} />,
      bg: "hover:bg-gray-100 border-gray-200",
    },
    {
      name: { en: "LinkedIn Company", bn: "লিংকড-ইন পেজ" },
      url: "https://www.linkedin.com/company/tarbiyah-online-madrasah/",
      icon: <Users className="text-blue-700" size={24} />,
      bg: "hover:bg-blue-50 border-blue-100",
    },
    {
      name: { en: "Hikmah Platform", bn: "হিকমাহ প্ল্যাটফর্ম" },
      url: "http://hikmah.net?referrer=tarbiyahonline26",
      icon: <Globe className="text-amber-600" size={24} />,
      bg: "hover:bg-amber-50 border-amber-100",
    },
    {
      name: { en: "Facebook Group", bn: "ফেসবুক গ্রুপ" },
      url: "https://facebook.com/groups/tarbiyahacademyofficial/",
      icon: <Users className="text-blue-500" size={24} />,
      bg: "hover:bg-blue-50 border-blue-100",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t({
            // en: "Our Videos & Gallery | Tarbiyah Education",
            // bn: "আমাদের ভিডিও ও গ্যালারি | তারবিয়াহ এডুকেশন",
          })}
        </title>
        <meta
          name="description"
          content={t({
            en: "Watch official video galleries and connect with Tarbiyah Online Academy across all social media platforms.",
            bn: "তারবিয়াহ অনলাইন একাডেমির অফিসিয়াল ভিডিও গ্যালারি দেখুন এবং সোশ্যাল মিডিয়ায় সংযুক্ত থাকুন।",
          })}
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-grow py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* --- Page Header --- */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {t({ en: "Our Video Gallery", bn: "আমাদের ভিডিও গ্যালারি" })}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              {t({
                en: "Explore our latest lectures, programs, and educational video contents.",
                bn: "আমাদের সর্বশেষ লেকচার, প্রোগ্রাম এবং শিক্ষামূলক ভিডিও কনটেন্টসমূহ উপভোগ করুন।",
              })}
            </p>
          </div>

          {/* --- YouTube Video Grid --- */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {videoIds.map((id, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-gray-900">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${id}`}
                      title={`Tarbiyah Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4 bg-white flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      {t({ en: "Tarbiyah Media", bn: "তারবিয়াহ মিডিয়া" })}
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-teal-600 transition-colors flex items-center gap-1"
                    >
                      {t({ en: "Watch on YouTube", bn: "ইউটিউবে দেখুন" })}{" "}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- Social Media Hub Section --- */}
          <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {t({
                  en: "Connect With Tarbiyah Social Channels",
                  bn: "তারবিয়াহ সোশ্যাল মিডিয়া প্ল্যাটফর্মসমূহ",
                })}
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                {t({
                  en: "Stay updated by following our official channels and community groups.",
                  bn: "আমাদের অফিসিয়াল চ্যানেল এবং কমিউনিটি গ্রুপগুলোতে যুক্ত হয়ে আপডেট থাকুন।",
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${social.bg} shadow-sm group`}
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                      {t(social.name)}
                    </h3>
                    <span className="text-xs text-teal-600 font-medium group-hover:underline">
                      {t({ en: "Visit Channel →", bn: "ভিজিট করুন →" })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default OurVideo;
