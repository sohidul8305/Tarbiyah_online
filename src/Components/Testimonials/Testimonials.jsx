import React from "react";
import { Quote } from "lucide-react";
import {
  FaCheckCircle,
  FaUserTie,
  FaVideo,
  FaHeadset,
  FaCertificate,
  FaGlobe,
} from "react-icons/fa";

const Testimonials = () => {
  const reviews = [];

  // Why Tarbiyah Diploma features
  const whyFeatures = [
    {
      icon: <FaCheckCircle />,
      text: "বিশুদ্ধ আকিদাভিত্তিক পাঠক্রম",
    },
    {
      icon: <FaUserTie />,
      text: "দেশবরেণ্য ইসলামি স্কলার",
    },
    {
      icon: <FaVideo />,
      text: "লাইভ ও রেকর্ডেড ক্লাস",
    },
    {
      icon: <FaHeadset />,
      text: "নিয়মিত একাডেমিক সাপোর্ট",
    },
    {
      icon: <FaCertificate />,
      text: "ইজাযাহ ও সার্টিফিকেট",
    },
    {
      icon: <FaGlobe />,
      text: "বিশ্বের যেকোনো দেশ থেকে অংশগ্রহণ",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#e0f2f7]">
      <div className="max-w-6xl mx-auto">
        {/* কেন তারবিয়াহ ডিপ্লোমা ইন ইসলামিক স্ট্রাডিজ ? */}
        <div className="bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl p-6 md:p-12 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-yellow-400">
              কেন তারবিয়াহ ডিপ্লোমা ইন ইসলামিক স্ট্রাডিজ ?
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-100">
                  {feature.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
