// src/components/FloatingWhatsApp/FloatingWhatsApp.jsx
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

// ✅ WhatsApp নম্বর — শুরতে 0 বাদ দিয়ে 88 দিয়ে লিখুন, কোনো + বা space নয়
const WHATSAPP_NUMBER = "8801302642468";
const WHATSAPP_MESSAGE =
  "আসসালামু আলাইকুম! Tarbiyah Online Madrasha সম্পর্কে জানতে চাই।";

const FloatingWhatsApp = () => {
  const [open, setOpen] = useState(false);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3">
      {/* ===== Chat popup card ===== */}
      {open && (
        <div className="w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
          <div className="bg-[#00ADD2] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  Tarbiyah Live Support
                </p>
                <p className="text-white/90 text-[11px] flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full inline-block" />
                  সাধারণত দ্রুত উত্তর দেওয়া হয়
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white p-1"
              aria-label="Close chat"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="p-4 bg-[#f0f9fa]">
            <div className="bg-white rounded-xl rounded-tl-none px-3 py-2.5 shadow-sm text-sm text-gray-700 leading-relaxed">
              আসসালামু আলাইকুম 👋
              <br />
              ভর্তি, কোর্স বা পেমেন্ট নিয়ে কোনো প্রশ্ন আছে? WhatsApp-এ আমাদের
              সাথে সরাসরি কথা বলুন।
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold text-sm py-2.5 rounded-full transition-colors"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp-এ চ্যাট শুরু করুন
            </a>
          </div>
        </div>
      )}

      {/* ===== Floating button ===== */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 group"
        aria-label="Live support"
      >
        {!open && (
          <span className="hidden sm:flex bg-white px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 items-center gap-2 group-hover:-translate-y-1 transition-transform duration-300">
            <span className="text-lg">👋</span>
            <span className="text-sm font-medium text-gray-700">
              Live Support
            </span>
          </span>
        )}

        <span className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {!open && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
          )}
          {open ? (
            <FiX className="relative text-white text-2xl" />
          ) : (
            <FaWhatsapp className="relative text-white text-3xl" />
          )}
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
