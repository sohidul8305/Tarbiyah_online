import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "15,000+", label: "Students" },
    { number: "30+", label: "More Than 30 Countries" },
    { number: "25+", label: "Course Completed" },
    { number: "4+", label: "Four Years Experience" },
  ];

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto shadow-xl rounded-lg border border-gray-100 p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center text-center 
                ${index !== stats.length - 1 ? 'md:border-r border-gray-200' : ''}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#00acc1]">
                {stat.number}
              </h2>
              <p className="text-gray-600 font-medium mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;