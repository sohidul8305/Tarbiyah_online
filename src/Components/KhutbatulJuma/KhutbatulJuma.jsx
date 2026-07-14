import React from 'react';
import { Play } from 'lucide-react';

const videos = [
  { title: "নির্জনে আল্লাহকে স্মরণ", author: "Professor Mokhtar Ahmad" },
  { title: "সাওয়াব অর্জনের রহস্য", author: "Professor Mokhtar Ahmad" },
  { title: "জুম্মার খুতবাহ গুরুত্ব", author: "Professor Mokhtar Ahmad" },
  { title: "আল্লাহ তায়ালার কাছে", author: "Professor Mokhtar Ahmad" },
  { title: "আপনার দ্বীনদারি পরি", author: "Professor Mokhtar Ahmad" },
  { title: "মুসলিম হিসেবে আমাদের", author: "Professor Mokhtar Ahmad" },
  { title: "ধৈর্য ধারণের মধ্যে রয়েছে", author: "Professor Mokhtar Ahmad" },
  { title: "৪০টি এমন ইবাদাত যা", author: "Professor Mokhtar Ahmad" },
];

const KhutbatulJuma = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-teal-800 text-3xl font-bold mb-12">
          KHUTBATUL JUMÁ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Video Thumbnail Wrapper */}
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1544725176-7c45e5a712c7?q=80&w=400&auto=format&fit=crop" 
                  alt={video.title} 
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <Play size={40} className="text-white fill-white" />
                </div>
              </div>
              {/* Video Info */}
              <div className="mt-3">
                <h3 className="font-bold text-gray-800 text-sm">{video.title}</h3>
                <p className="text-gray-500 text-xs">{video.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KhutbatulJuma;