import React from "react";
import { useLanguage } from "../../../Provider/LanguageContext";
import { ExternalLink } from "lucide-react";

const StudentOpinion = () => {
  const { language, t } = useLanguage();

  const reviews = {
    en: [
      {
        name: "Sajid Rahman",
        course: "Diploma in Islamic Studies",
        rating: 5,
        text: "This course has completely changed my perspective on life. The curriculum is comprehensive and the teachers are highly qualified.",
        date: "June 2026",
      },
      {
        name: "Tasnim Sultana",
        course: "Tarbiyah Alemiyah Program",
        rating: 5,
        text: "The flexible schedules and top-notch learning portal made it very easy for me to balance studies with my family life.",
        date: "May 2026",
      },
      {
        name: "Abdur Rahman",
        course: "Quran for Elders",
        rating: 5,
        text: "I was hesitant to learn Quran recitation at this age, but the teachers are incredibly patient and encouraging.",
        date: "April 2026",
      },
      {
        name: "Fariha Islam",
        course: "Arabiyah Studies for Kids",
        rating: 5,
        text: "My children love the interactive classes. They have already started speaking simple Arabic sentences!",
        date: "March 2026",
      },
    ],
    bn: [
      {
        name: "সাজিদ রহমান",
        course: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
        rating: 5,
        text: "এই কোর্সটি আমার জীবনের দৃষ্টিভঙ্গি সম্পূর্ণ পরিবর্তন করে দিয়েছে। কোর্সের পাঠ্যক্রম এবং শিক্ষকদের পাঠদান পদ্ধতি অত্যন্ত চমৎকার।",
        date: "জুন ২০২৬",
      },
      {
        name: "তাসনিম সুলতানা",
        course: "তারবিয়াহ আলেমিয়াহ প্রোগ্রাম",
        rating: 5,
        text: "কোর্সের সময়সূচী এবং অনলাইন লার্নিং পোর্টালটি অনেক গোছানো। এটি আমাকে পারিবারিক জীবন সামলানোর পাশাপাশি পড়াশোনা চালিয়ে যেতে সাহায্য করেছে।",
        date: "মে ২০২৬",
      },
      {
        name: "আব্দুর রহমান",
        course: "কুরআন ফর এল্ডার্স",
        rating: 5,
        text: "এই বয়সে কুরআন শিখতে পারব কি না তা নিয়ে দ্বিধায় ছিলাম, কিন্তু শিক্ষকদের ধৈর্য ও অনুপ্রেরণাদায়ক কথা আমার ভয় দূর করে দিয়েছে।",
        date: "এপ্রিল ২০২৬",
      },
      {
        name: "ফারিহা ইসলাম",
        course: "আরাবিয়াহ স্টাডিজ ফর কিডস",
        rating: 5,
        text: "আমার বাচ্চারা এই ইন্টারঅ্যাক্টিভ ক্লাসগুলো খুবই উপভোগ করে। তারা ইতিমধ্যেই ছোট ছোট আরবি বাক্য বলতে শুরু করেছে!",
        date: "মার্চ ২০২৬",
      },
    ],
  };

  const list = reviews[language] || reviews.bn;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#004d4d] mb-4">
            {language === "bn"
              ? "আমাদের ছাত্র-ছাত্রী ও অভিভাবকদের মতামত"
              : "What Our Students & Parents Say"}
          </h1>
          <div className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed space-y-2">
            {language === "bn" ? (
              <>
                <p>
                  তারবিয়াহ অনলাইন মাদরাসায়, আমাদের সবচেয়ে বড় প্রেরণা হলো
                  আমাদের শিক্ষার্থী এবং তাদের অভিভাবকদের আস্থা ও সন্তোষ।
                </p>
                <p>
                  এখানে আমরা তারবিয়াহতে তাদের শেখার যাত্রা, একাডেমিক অভিজ্ঞতা
                  এবং সামগ্রিক বৃদ্ধি সম্পর্কে আমাদের শিক্ষার্থী ও অভিভাবকদের
                  প্রকৃত অভিজ্ঞতা এবং প্রতিক্রিয়া শেয়ার করছি।
                </p>
                <p>
                  তারবিয়াহ অনলাইন মাদরাসায় তাদের অভিজ্ঞতা সম্পর্কে আমাদের
                  ছাত্র-ছাত্রী ও অভিভাবকরা কী säger (বলেন) তা পড়ে দেখুন।
                </p>
              </>
            ) : (
              <>
                <p>
                  At Tarbiyah Online Madrasah, our greatest motivation is the
                  trust and satisfaction of our students and their parents.
                </p>
                <p>
                  Here, we share genuine experiences and feedback from our
                  students and parents about their learning journey, academic
                  experience, and overall growth at Tarbiyah.
                </p>
                <p>
                  Read what our students and parents have to say about their
                  experience with Tarbiyah Online Madrasah.
                </p>
              </>
            )}
          </div>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- Reviews Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {list.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-teal-600 text-sm font-semibold">
                      {review.course}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Read All Reviews Button --- */}
        <div className="text-center">
          <a
            href="https://www.facebook.com/share/p/14ksfgsxzxE/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#004d4d] hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>
              {language === "bn" ? "সকল রিভিউ পড়ুন" : "Read All Reviews"}
            </span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentOpinion;
