import React from "react";
import alemiaImg from "../../image/alemiyah.jpg";
import { Link } from "react-router";
import {
  FaCheckCircle,
  FaClock,
  FaLaptop,
  FaAward,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaGraduationCap,
  FaChild,
  FaMosque,
  FaQuran,
  FaHands,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaUserGraduate,
  FaCalendarAlt,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

const Alemiah = () => {
  // কোর্সের তথ্য
  const courses = [
    {
      id: "alimiyah-kids",
      title: "আলিমিয়াহ ফর কিডস",
      subtitle: "বাচ্চাদের জন্য ইসলামিক শিক্ষা",
      description:
        "বাচ্চাদের কুরআন, হাদীস, আরবি ভাষা ও ইসলামি আকিদার মৌলিক শিক্ষা প্রদান করা হয় এই কোর্সে। সহজ ও আনন্দদায়ক পদ্ধতিতে ইসলামি জ্ঞান অর্জন।",
      image:
        "https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg",
      duration: "২ বছর",
      classes: "সপ্তাহে ৩ দিন",
      time: "সকাল ১০:০০ - ১১:৩০",
      totalClasses: "২৪০টি ক্লাস",
      price: "৮,০০০ টাকা",
      discount: "৫,৫০০ টাকা",
      save: "৩১%",
      students: "৫০০+",
      rating: "৪.৮",
      features: [
        "কুরআন তিলাওয়াত ও তাজবিদ",
        "আরবি বর্ণমালা ও শব্দভাণ্ডার",
        "ইসলামি আদব ও আখলাক",
        "নবীদের গল্প ও ইসলামি ইতিহাস",
        "সহজ হাদীস শিক্ষা",
        "ইসলামি গান ও ক্রিয়েটিভ লার্নিং",
      ],
    },
    {
      id: "alimiyah-program",
      title: "আলিমিয়াহ প্রোগ্রাম",
      subtitle: "পূর্ণাঙ্গ ইসলামি উচ্চ শিক্ষা",
      description:
        "গভীর জ্ঞান ও আত্মশুদ্ধির সমন্বয়ে একটি বিশেষায়িত প্রোগ্রাম। ইসলামি জ্ঞান অর্জনের মাধ্যমে নিজেকে ও সমাজকে আলোকিত করুন।",
      image:
        "https://i.ibb.co.com/XZVH4YPP/images-q-tbn-ANd9-Gc-Ri56q-JX-78-BRlii-E9-ZR857-O7r-BIFLMs1-Sc-Uh-A4-EKw-J-AGMGZ1bt-PS1h8c-s-10.jpg",
      duration: "৩ বছর",
      classes: "সপ্তাহে ৫ দিন",
      time: "রাত ৮:০০ - ১০:০০",
      totalClasses: "৪৮০টি ক্লাস",
      price: "১৫,০০০ টাকা",
      discount: "১০,০০০ টাকা",
      save: "৩৩%",
      students: "৮০০+",
      rating: "৪.৯",
      features: [
        "আরবি ব্যাকরণ ও সাহিত্য (নাহু ও সরফ)",
        "তাফসীর ও উলুমুল কুরআন",
        "হাদীস ও ফিকহ শাস্ত্রের উচ্চতর আলোচনা",
        "ব্যক্তিত্ব গঠন ও আত্মশুদ্ধি",
        "ইসলামি আইন ও ফতোয়া",
        "দাওয়াহ ও ইসলামি আন্দোলন",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#002b2b] via-[#003d3d] to-[#004d4d] text-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center p-6 lg:p-12 gap-8">
            {/* Image Container */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-2xl">
                <img
                  src={alemiaImg}
                  alt="Alemiah Program Banner"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ✨ বিশেষ প্রোগ্রাম
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-3">
                <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-500/30">
                  🕌 তারবিয়াহ আলেমিয়াহ
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  আলেমিয়াহ <br />
                  <span className="text-yellow-400 relative">
                    প্রোগ্রাম
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-2"
                      viewBox="0 0 200 10"
                    >
                      <path
                        d="M0 5 Q50 10 100 5 T200 5"
                        stroke="#FBBF24"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>
              </div>

              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                গভীর জ্ঞান ও আত্মশুদ্ধির সমন্বয়ে একটি বিশেষায়িত প্রোগ্রাম।
                ইসলামি জ্ঞান অর্জনের মাধ্যমে নিজেকে ও সমাজকে আলোকিত করতে আমাদের
                এই আলেমিয়াহ প্রোগ্রামে যোগ দিন।
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaClock className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সময়কাল</p>
                  <p className="text-sm font-bold">২-৩ বছর</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaGraduationCap className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">প্রোগ্রাম</p>
                  <p className="text-sm font-bold">২টি</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaAward className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">সার্টিফিকেট</p>
                  <p className="text-sm font-bold">আলেমিয়াহ সনদ</p>
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all">
                  <FaUsers className="text-yellow-400 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-300">ছাত্র</p>
                  <p className="text-sm font-bold">১৩০০+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#002b2b] mb-3">
              আমাদের <span className="text-yellow-500">প্রোগ্রামসমূহ</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আপনার প্রয়োজন অনুযায়ী সঠিক প্রোগ্রামটি বেছে নিন
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Course Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                        জনপ্রিয়
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-sm text-yellow-600 font-semibold mb-2">
                    {course.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <FaClock className="text-yellow-500 mx-auto text-sm" />
                      <p className="text-xs text-gray-500 mt-1">
                        {course.duration}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <FaUsers className="text-yellow-500 mx-auto text-sm" />
                      <p className="text-xs text-gray-500 mt-1">
                        {course.students}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <FaStar className="text-yellow-500 mx-auto text-sm" />
                      <p className="text-xs text-gray-500 mt-1">
                        {course.rating}/৫
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-600 border border-gray-200"
                      >
                        {feature}
                      </span>
                    ))}
                    {course.features.length > 3 && (
                      <span className="text-xs bg-yellow-50 px-2 py-1 rounded-full text-yellow-600 border border-yellow-200">
                        +{course.features.length - 3} আরও
                      </span>
                    )}
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-400 line-through">
                        {course.price}
                      </p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {course.discount}
                      </p>
                      <span className="inline-block bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        সেভ {course.save}
                      </span>
                    </div>
                    <Link to={`/course/alemiah/${course.id}`}>
                      <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 text-sm group-btn">
                        <span>বিস্তারিত</span>
                        <FaArrowRight className="group-btn-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mt-16 bg-gradient-to-br from-[#002b2b] to-[#004d4d] rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">
              কেন <span className="text-yellow-400">আলেমিয়াহ</span> বেছে নেবেন?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              অভিজ্ঞ শিক্ষকমণ্ডলী ও আধুনিক শিক্ষাপদ্ধতিতে তৈরি করা হয়েছে এই
              প্রোগ্রামটি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserGraduate />,
                title: "অভিজ্ঞ শিক্ষক",
                desc: "দক্ষ ওলামায়ে কেরামের ক্লাস",
              },
              {
                icon: <FaLaptop />,
                title: "লাইভ ক্লাস",
                desc: "প্রতিটি ক্লাস লাইভ ও রেকর্ডেড",
              },
              {
                icon: <FaHands />,
                title: "ব্যক্তিগত যত্ন",
                desc: "প্রতিটি শিক্ষার্থীর জন্য বিশেষ মনোযোগ",
              },
              {
                icon: <FaAward />,
                title: "আলেমিয়াহ সনদ",
                desc: "আন্তর্জাতিক মানের সার্টিফিকেট",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-4xl text-yellow-400 mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#002b2b] mb-3">
            আজই আপনার আলেমিয়াহ যাত্রা শুরু করুন
          </h3>
          <p className="text-[#002b2b]/80 mb-6 max-w-2xl mx-auto">
            ইসলামি জ্ঞানের উচ্চতর শিক্ষা অর্জনের সুযোগ হাতছাড়া করবেন না।
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/course/alemiah/alimiyah-kids">
              <button className="bg-[#002b2b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#003d3d] transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <FaChild className="inline mr-2" />
                আলিমিয়াহ ফর কিডস
              </button>
            </Link>
            <Link to="/course/alemiah/alimiyah-program">
              <button className="bg-white text-[#002b2b] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <FaGraduationCap className="inline mr-2" />
                আলিমিয়াহ প্রোগ্রাম
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alemiah;
