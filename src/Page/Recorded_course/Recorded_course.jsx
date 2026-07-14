import React from 'react';

const Recorded_course = () => {
  const courses = [
    { title: "IMAM NABAWR 40 HADITHS" },
    { title: "SURAH MULK HIFZ COURSE" },
    { title: "HADITH AND TAHARAH COURSE", badge: "2 - COURSE BUNDLE" },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-20 lg:px-40">
      {/* ফিল্টার/সার্চ অপশন */}
      <div className="flex justify-end mb-8">
        <select className="border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 focus:outline-none">
          <option>Release Date (newest first)</option>
          <option>Popularity</option>
          <option>Price (Low to High)</option>
        </select>
      </div>

      {/* কোর্স গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* ইমেজ এরিয়া */}
            <div className="h-40 bg-gray-200 relative">
               {/* এখানে আপনার কোর্স ইমেজ বসবে */}
               <div className="absolute top-2 right-2 text-gray-500">🔖</div>
            </div>
            
            {/* কন্টেন্ট */}
            <div className="p-4">
              <div className="text-yellow-400 text-sm mb-2">☆☆☆☆☆</div>
              
              {/* কোর্স টাইটেল */}
              <h3 className="text-blue-600 font-bold text-sm mb-3 uppercase tracking-tight">
                {course.title}
              </h3>

              {/* ব্যাজ (যদি থাকে) */}
              {course.badge && (
                <div className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded inline-block mb-3">
                  {course.badge}
                </div>
              )}

              {/* অথর ইনফো */}
              <div className="flex items-center gap-2 text-xs text-gray-600 border-t pt-3">
                <img src="https://via.placeholder.com/24" alt="author" className="w-6 h-6 rounded-full" />
                <p>
                  By <span className="font-semibold text-gray-800">tarbiyahedu</span> In <span className="font-semibold text-gray-800">Recorded Course</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recorded_course;