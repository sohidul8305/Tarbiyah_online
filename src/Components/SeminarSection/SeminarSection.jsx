import React from 'react';

const SeminarSection = () => {
  return (
    <section className="bg-[#004d4d] py-16 px-6">
      {/* Title */}
      <h2 className="text-center text-white text-3xl font-bold mb-12">
        NEXT <span className="text-[#00acc1]">SEMINARS</span> FOR YOU.
      </h2>

      {/* Seminar Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Date Box */}
        <div className="bg-[#1a5f7a] text-white p-6 flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-4xl font-bold">16</span>
          <span className="text-lg font-medium">Nov</span>
        </div>

        {/* Content Box */}
        <div className="p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1a5f7a] mb-2">Orientation Program Fall 2024</h3>
            <p className="text-gray-500 text-sm mb-4 flex items-center">
              🕒 8:00 am - 5:00 pm
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are very pleased to announce that the Grand Orientation Program of the 
              Department of Alimiyah, Quranic Studies and Islamic Studies of Tarbiyah 
              Academy will be held on October 5, 2024.
            </p>
          </div>
          
          {/* Link */}
          <div className="mt-4 md:mt-0 md:ml-6">
            <a href="#" className="text-[#00acc1] font-bold text-sm hover:underline whitespace-nowrap">
              Find out more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarSection;