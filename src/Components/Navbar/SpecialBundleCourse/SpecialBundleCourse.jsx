import React from "react";
import { Link } from "react-router";

const SpecialBundleCourse = () => {
  return (
    <section
      className="relative py-16 px-6"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/arabesque.png')", // এটি একটি সুন্দর অ্যারাবিক স্টাইল প্যাটার্ন
        backgroundColor: "#e0f2f1",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          Special <span className="text-orange-500">Bundle</span> Course
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-white/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white">
          {/* Left: Image Card */}
          <Link to="/enroll" className="w-full md:w-1/2 group">
            <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src="https://i.ibb.co.com/ycd8GqsQ/sir-png.png"
                alt="Hadith and Taharah"
                className="w-[150px] h-auto mr-10"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Hadith And Taharah Course
                </h3>
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <span className="mr-2 text-teal-700 font-bold">●</span>{" "}
                  tarbiyahedu
                </p>
              </div>
            </div>
          </Link>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-snug">
              Hadith And Taharah: United On The Journey Of Self-Purification
            </h3>
            <p className="text-gray-600 leading-relaxed text-justify">
              To Move Forward On The Path Of Self-Purification And Attaining The
              Pleasure Of Allah, One Needs Correct Knowledge And Proper
              Guidance. In This Bundle Course, You Will Learn The 40 Selected
              Hadith Compiled By Imam An-Nawawi (Rahimahullah), Which Lay The
              Foundation For A Muslim’s Character, Faith, Worship, And Morals.
              At The Same Time, You Will Master The Rulings Of Purity In
              Islam—Wudu, Ghusl, Tayammum, And The Proper Rules Of Maintaining
              Cleanliness In Daily Life, Which Are Prerequisites For Every Act
              Of Worship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialBundleCourse;
