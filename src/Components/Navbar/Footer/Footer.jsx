import React from "react";
import Tarbiyahlogo from "../../../image/Logo-tarbiyah-Online-Academy.png";
import { useLanguage } from "../../../context/useLanguage";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#00313A] text-white pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
        {/* Column 1: Logo & About */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={Tarbiyahlogo}
              alt="Tarbiyah Online"
              className="h-14 sm:h-16 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-200">
            {t({
              en: '"Access Authentic Islamic Education from Renowned Scholars Worldwide. Learn, Grow, and Transform wherever you are, whenever you are ready."',
              bn: '"বিশ্বজুড়ে প্রখ্যাত আলেমদের কাছ থেকে খাঁটি ইসলামী শিক্ষা গ্রহণ করুন। আপনি যেখানেই থাকুন না কেন, যখনই প্রস্তুত থাকবেন, শিখুন, বিকশিত হোন এবং নিজেকে রূপান্তরিত করুন।"',
            })}
          </p>
        </div>

        {/* Column 2: Useful Links & Payment Methods */}
        <div className="w-full">
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider border-b border-teal-700/50 pb-2 inline-block">
            {t({ en: "USEFUL LINKS", bn: "প্রয়োজনীয় লিংক" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8 text-gray-200">
            <a
              href="/terms"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Terms & Conditions", bn: "শর্তাবলী ও শর্তসমূহ" })}
            </a>
            <a
              href="/admission-now"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Online Application", bn: "অনলাইন আবেদন" })}
            </a>
            <a
              href="/about"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "About Us", bn: "আমাদের সম্পর্কে" })}
            </a>
            <a
              href="/course"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "All Courses", bn: "সকল কোর্সসমূহ" })}
            </a>
            <a
              href="/consultancy"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Consultancy", bn: "কনসালটেন্সি" })}
            </a>
            <a
              href="/blog"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Blog", bn: "ব্লগ" })}
            </a>
            <a
              href="/events"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Events", bn: "ইভেন্টস" })}
            </a>
            <a
              href="/gallery"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Gallery", bn: "গ্যালারি" })}
            </a>
            <a
              href="/support"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Support", bn: "সাপোর্ট" })}
            </a>
            <a
              href="/donate"
              className="hover:text-teal-300 transition-colors truncate"
            >
              {t({ en: "Donate", bn: "ডোনেট" })}
            </a>
            <a
              href="/course/diploma/details"
              className="hover:text-teal-300 transition-colors truncate sm:col-span-2"
            >
              {t({ en: "Diploma Details", bn: "ডিপ্লোমা বিস্তারিত" })}
            </a>
          </div>

          {/* Payment Methods */}
        </div>

        {/* Column 3: Get Touch With Us */}
        <div className="w-full">
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider border-b border-teal-700/50 pb-2 inline-block">
            {t({ en: "GET IN TOUCH WITH US", bn: "আমাদের সাথে যোগাযোগ করুন" })}
          </h3>
          <div className="space-y-4 text-sm text-gray-200">
            <p className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-teal-300 mt-1 flex-shrink-0 text-base" />
              <span>
                {t({
                  en: "40/1 Safa Garden, Sat Masjid Housing, Mohammadpur, Dhaka-1207",
                  bn: "৪০/১ সাফা গার্ডেন সাতমসজিদ হাউজিং, মোহাম্মদপুর ঢাকা-১২০৭",
                })}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <FaPhoneAlt className="text-teal-300 mt-1 flex-shrink-0 text-base" />
              <span className="block space-y-2 text-white-700">
                <p>
                  <strong>01841516565</strong> (Diploma In Islamic Studies)
                </p>
                <p>
                  <strong>01841514545</strong> (Tarbiyah Alimiyah Program)
                </p>
                <p>
                  <strong>01841513434</strong> (Tarbiyah Quran Studies)
                </p>
                <p>
                  <strong>01841511515</strong> (Quran For Elders)
                </p>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-teal-300 flex-shrink-0 text-base" />
              <span className="break-all">hello.tarbiyah@gmail.com</span>
            </p>
          </div>

          {/* Social Icons with Colorful Hover Effects */}
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="https://www.facebook.com/share/19cMVX749c/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-[#1877F2] hover:text-white transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com/@tarbiyahonlinemadrasa?si=pb18-SWBf6lzeuME"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-[#FF0000] hover:text-white transition-all duration-300"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/tarbiyah-online-madrasah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/tarbiyahonline?igsh=cmxrMnBpNHpyOHlr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-[#E4405F] hover:text-white transition-all duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto border-t border-teal-800/60 pt-6 text-center text-sm text-gray-300">
        <p>
          {t({
            en: "© 2026 All Rights Reserved | ",
            bn: "© ২০২৬ সর্বস্বত্ব সংরক্ষিত | ",
          })}
          <span className="text-teal-300 font-semibold">
            tarbiyahonline.com
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
