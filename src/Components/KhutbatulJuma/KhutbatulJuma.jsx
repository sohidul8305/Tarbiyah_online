import React from "react";
import { Play } from "lucide-react";

const videos = [
  {
    title: "নির্জনে আল্লাহকে স্মরণ",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "https://img.youtube.com/vi/fSj6hz-j7Ok/hqdefault.jpg", // আপনার দেওয়া সঠিক ভিডিও আইডি এখানে বসানো হয়েছে
  },
  {
    title: "সাওয়াব অর্জনের রহস্য",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "3JZ_D3ELwOQ",
  },
  {
    title: "জুম্মার খুতবাহ গুরুত্ব",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "2Vv-BfVoq4g",
  },
  {
    title: "আল্লাহ তায়ালার কাছে",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "9bZkp7q19f0",
  },
  {
    title: "আপনার দ্বীনদারি পরি",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "kJQP7kiw5Fk",
  },
  {
    title: "মুসলিম হিসেবে আমাদের",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "5qap5aO4i9A",
  },
  {
    title: "ধৈর্য ধারণের মধ্যে রয়েছে",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "jfKfPfyJRdk",
  },
  {
    title: "৪০টি এমন ইবাদাত যা",
    author: "Professor Mokhtar Ahmad",
    youtubeId: "L_LUpnjgPso",
  },
];

const KhutbatulJuma = () => {
  const handleVideoClick = (youtubeId) => {
    // সরাসরি ইউটিউবের সঠিক লিংকে রিডাইরেক্ট করবে
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-teal-800 text-3xl font-bold mb-12">
          KHUTBATUL JUMÁ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => handleVideoClick(video.youtubeId)}
            >
              {/* Video Thumbnail Wrapper (Using YouTube's standard thumbnail url automatically from youtubeId) */}
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
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
                <h3 className="font-bold text-gray-800 text-sm group-hover:text-teal-600 transition-colors">
                  {video.title}
                </h3>
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
