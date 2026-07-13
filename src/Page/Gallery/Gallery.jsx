import React from 'react';

const Gallery = () => {
  // এখানে আপনার ইমেজের লিঙ্কগুলো বসিয়ে দিন
  const galleryImages = [
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
  ];

  return (
    <div className="bg-white py-16 px-4">
      {/* হেডিং */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Gallery</h2>

      {/* গ্যালারি গ্রিড */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <img 
              src={img} 
              alt={`Gallery item ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;