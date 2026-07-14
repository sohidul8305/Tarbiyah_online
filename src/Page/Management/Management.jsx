import React from 'react';

const Management = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-20 lg:px-40 text-gray-800">
      
      {/* Chairman Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3">
            <img 
              src="https://via.placeholder.com/400x500" // চেয়ারম্যানের ছবি এখানে বসান
              alt="Chairman" 
              className="w-full h-auto rounded shadow-lg"
            />
            <p className="text-center text-blue-500 font-semibold mt-4">Chairman Of Tarbiyah</p>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">OF BENGAL</h2>
            <p className="text-gray-600 leading-relaxed italic mb-6">
              "As ignorance & innovation in the name of religion spread over the land of Bengal, people from all walks of life were craving for an enlightened soul..."
            </p>
            <div className="text-blue-500 text-3xl mb-4">❝</div>
            <p className="font-semibold text-lg text-blue-600 mb-8">An endless journey has begun for the sake of humanity</p>
            <p className="text-gray-700 leading-loose">
              Born in 80s, Professor Mokhtar Ahmad completed his graduation from the most revered institution in Bangladesh, University of Dhaka. He then dedicated himself towards the fulfillment of his dream...
            </p>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex justify-center my-10 text-blue-500 text-2xl">★</div>

      {/* CEO Section */}
      <section>
        <div className="flex flex-col md:flex-row-reverse gap-10 items-start">
          <div className="w-full md:w-1/3">
            <img 
              src="https://via.placeholder.com/400x500" // সিইও-এর ছবি এখানে বসান
              alt="CEO" 
              className="w-full h-auto rounded shadow-lg"
            />
            <p className="text-center text-blue-500 font-semibold mt-4">Ceo Of Tarbiyah</p>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">JOURNEY TO ALLAH: A COMPASSIONATE MAN BEHIND THE SCENE</h2>
            <p className="text-gray-700 leading-loose">
              Syed Jihadul Islam, Founder CEO at Tarbiyah Education Network & Founder General Secretary at Tarbiyah Foundation, is a Pragmatic & Goal-oriented man...
            </p>
            <p className="text-gray-700 leading-loose mt-4">
              Syed Jihadul Islam is a seasoned business strategist. The moment he has arrived in professional life, he has thrived in RMG industries...
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Management;