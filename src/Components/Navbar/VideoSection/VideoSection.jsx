<<<<<<< HEAD
import React from "react";
import { Play } from "lucide-react";
=======
import React from 'react';
import { Play } from 'lucide-react'; // ভিডিও প্লে আইকনের জন্য
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2

const VideoSection = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
<<<<<<< HEAD
      {/* Left Side: Video Thumbnail with Play Button */}
      <div className="w-full md:w-1/2 relative group cursor-pointer">
        <img
          src="https://www.youtube.com/watch?v=8Uz2uKEb2NQ"
          alt=" Play Video"
=======
      
      {/* Left Side: Video Thumbnail with Play Button */}
      <div className="w-full md:w-1/2 relative group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1544725176-7c45e5a712c7?q=80&w=800&auto=format&fit=crop" 
          alt="Video Thumbnail" 
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
          className="w-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-600/80 p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Play size={48} fill="white" className="text-white" />
          </div>
        </div>
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-1/2">
        <h4 className="text-[#00acc1] font-bold tracking-widest uppercase text-sm mb-2">
          THE ONLINE EDUCATION PORTAL!
        </h4>
        <h2 className="text-4xl font-extrabold text-[#004d4d] mb-6">
          TARBIYAH ONLINE
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
<<<<<<< HEAD
          Tarbiyah Online has been working tirelessly to inculcate impeccable
          Islamic character, humane values, patriotism, and age-appropriate
          academic skills in its students from the primary level through a
          holistic approach. In order to achieve this goal, lessons are given in
          the light of the curriculum made by combining Quranic education,
          worldly education, and religious education.
        </p>
      </div>
=======
          Tarbiyah Online has been working tirelessly to inculcate impeccable Islamic character, 
          humane values, patriotism, and age-appropriate academic skills in its students from the 
          primary level through a holistic approach. In order to achieve this goal, lessons are 
          given in the light of the curriculum made by combining Quranic education, worldly 
          education, and religious education.
        </p>
      </div>

>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
    </section>
  );
};

<<<<<<< HEAD
export default VideoSection;
=======
export default VideoSection;
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
