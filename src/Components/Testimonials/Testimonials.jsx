import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "সুমি",
      role: "১ম সেমিস্টার, ডিপ্লোমা ইন ইসলামিক স্টাডিজ কোর্স",
      text: "সিরাহ- স্যার ক্লাসে আলোচনা করেছেন সুন্দরভাবে, আর সব শেষে আমাদেরকে ওমর পড়ার টপিকগুলোর সাজানো বই (নোট দিয়েছেন)। এতে করে এই Courseটির শিক্ষা সময়সাময়িক সময়ে ক্লাস থেকেই বুঝতে পেরেছি আলহামদুলিল্লাহ। পাশাপাশি এক্সাম যেহেতু আমাদের বড় একটা Concern এর জায়গা, সেটার প্রস্তুতি নিতে আমাদের অনেক মেটেরিয়াল ঘাটাঘাটি করতে হচ্ছে না, পরীক্ষার আগে। হাসি- ক্লাসের রেকর্ড অনেক গোছানো, নোট আছে। সিরাহ কোর্সের মতো সময়সাময়িক বিষয়ে হাদিসগুলোর প্রয়োগ বুঝতে পেরেছি। এই কোর্সের বড় একটা ভালো দিক- প্রতিটা লেসনের শেষে Sample Question আছে। এতে করে পরীক্ষা ভীতি দূর হয়েছে। আলহামদুলিল্লাহ।"
    },
    {
      name: "মো: মাইনউদ্দিন",
      role: "১ম সেমিস্টার, ডিপ্লোমা ইন ইসলামিক স্টাডিজ কোর্স",
      text: "ইসলামি শরিয়াহ এর প্রাথমিক শিক্ষা গ্রহণের পর তারবিয়াহ প্ল্যাটফর্ম থেকে আকিদাহ, ফিকহ ও এরাবিক ল্যাঙ্গুয়েজের উপর মাস্টার্স-পিএইচডি করতে চাই।"
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#e0f2f7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-teal-800 mb-2">Testimonial</h2>
        <p className="text-center text-teal-600 mb-12">Nurturing Islamic Excellence from the Comfort of Home</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md relative border border-gray-100">
              <div className="text-yellow-400 mb-4 text-xl">★★★★★</div>
              <p className="text-gray-600 mb-6 leading-relaxed">{review.text}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
                <Quote size={40} className="text-teal-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;