import React from "react";

const Student_opinion = () => {
  // আপনি চাইলে এখানে একটি array তৈরি করে মতামতগুলো ডাটা থেকে লোড করতে পারেন
  const opinions = [
    {
      name: "আব্দুল্লাহ আল মাহমুদ",
      title: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      comment:
        "তারবিয়াহ অনলাইনের কোর্সগুলো অত্যন্ত মানসম্মত এবং সময়োপযোগী। আলহামদুলিল্লাহ, আমি এখান থেকে অনেক কিছু শিখেছি।",
    },
    {
      name: "ফাতিমা আক্তার",
      title: "আরবি স্টাডিজ ফর কিডস",
      comment:
        "আমার সন্তান এখানে আরবি শিখছে, তার শেখার আগ্রহ এবং উন্নতির হার দেখে আমি অত্যন্ত সন্তুষ্ট।",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-[#004d4d] text-center mb-10">
        শিক্ষার্থীদের মতামত
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opinions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#004d4d]"
          >
            <p className="text-gray-600 mb-4 italic">"{item.comment}"</p>
            <div className="border-t pt-4">
              <h4 className="font-bold text-[#004d4d]">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student_opinion;
