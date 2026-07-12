import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Question: Who can enroll in the Alimiyyah for Kids course?",
    answer: "Answer: Any boy or girl between the ages of 6 to 11, whose parents are interested in giving them Islamic education, can enroll in this course."
  },
  {
    question: "Question: How long is the Alimiyyah for Kids course and how is it structured?",
    answer: "Answer: This course is structured over several years with a curriculum designed to build a strong foundation in Islamic studies for children."
  },
  {
    question: "Question: Who can enroll in the Alimiyyah course?",
    answer: "Answer: Students who have completed primary Islamic education and are looking for advanced studies can enroll in this course."
  },
  {
    question: "Question: How long is the Alimiyyah course and how is it structured?",
    answer: "Answer: The Alimiyyah course is a comprehensive program covering various Islamic disciplines, structured to provide in-depth knowledge."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-teal-800 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-[#f9fdfd] border border-gray-100 rounded-lg overflow-hidden">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left text-teal-700 font-bold"
              >
                {item.question}
                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {activeIndex === index && (
                <div className="p-5 pt-0 text-gray-600 border-t border-gray-100">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-teal-900 text-white px-8 py-3 rounded font-bold hover:bg-teal-800 transition">
            Get More FAQ
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;