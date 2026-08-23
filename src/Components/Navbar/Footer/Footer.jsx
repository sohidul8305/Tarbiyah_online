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
    <footer className="bg-[#00313A] text-white pt-16 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Column 1: Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={Tarbiyahlogo}
              alt="Tarbiyah Online"
              className="h-16 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-200">
            {t({
              en: '"At Tarbiyah Online, we believe that education should be accessible to everyone, regardless of their background or circumstances. Therefore, we offer a range of online courses designed to help you learn new skills whenever it suits you."',
              bn: '"তারবিয়াহ অনলাইনে আমরা বিশ্বাস করি যে শিক্ষা প্রত্যেকের কাছে অ্যাক্সেসযোগ্য হওয়া উচিত, তাদের পটভূমি বা পরিস্থিতি নির্বিশেষে। তাই আমরা অনলাইন কোর্সের একটি পরিসর অফার করি যা আপনাকে নতুন দক্ষতা শিখতে সাহায্য করার জন্য ডিজাইন করা হয়েছে, যে কোনো সময়ে আপনার জন্য উপযুক্ত।"',
            })}
          </p>
        </div>

        {/* Column 2: Useful Links & Payment Methods */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider border-b border-teal-700/50 pb-2 inline-block">
            {t({ en: "USEFUL LINKS", bn: "প্রয়োজনীয় লিংক" })}
          </h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8 text-gray-200">
            <a
              href="https://tarbiyahonline.com/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Terms & Conditions", bn: "শর্তাবলী ও শর্তসমূহ" })}
            </a>
            <a
              href="https://tarbiyahonline.com/admission"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Online Application", bn: "অনলাইন আবেদন" })}
            </a>
            <a
              href="https://tarbiyahonline.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Privacy Policy", bn: "গোপনীয়তা নীতি" })}
            </a>
            <a
              href="https://tarbiyahonline.com/my-account"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "My Account", bn: "আমার একাউন্ট" })}
            </a>
            <a
              href="https://tarbiyahonline.com/refund-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Refund Policy", bn: "রিফান্ড নীতি" })}
            </a>
            <a
              href="https://tarbiyahonline.com/cart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Cart Page", bn: "কার্টপেজ" })}
            </a>
            <a
              href="https://tarbiyahonline.com/career"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Career", bn: "ক্যারিয়ার" })}
            </a>
            <a
              href="https://tarbiyahonline.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              {t({ en: "Contact", bn: "কনটাক্ট" })}
            </a>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-2 rounded-lg shadow-md max-w-sm">
            <img
              src="https://i.ibb.co.com/84Z9Xv5/payment-gateways.png"
              alt="Payment Methods"
              className="w-full object-contain h-10"
            />
          </div>
        </div>

        {/* Column 3: Get Touch With Us */}
        <div>
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
              <span>
                (+88) 01841515454 <br />
                (+88) 01841513434 <br />
                (+88) 01841516565
              </span>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-teal-300 flex-shrink-0 text-base" />
              <span>info@tarbiyahonline.com</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <a
              href="https://facebook.com/tarbiyahonline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-teal-100 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com/@tarbiyahonline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-teal-100 transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com/company/tarbiyahonline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-teal-100 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com/tarbiyahonline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white text-[#00313A] rounded-full flex items-center justify-center font-bold shadow-md hover:bg-teal-100 transition-colors"
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
