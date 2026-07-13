import React from 'react';

const Events = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Events Header */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">EVENTS</h1>
        <p className="text-xl text-blue-600 font-semibold mt-2">NEXT MEETINGS FOR YOU.</p>
        <div className="w-64 h-0.5 bg-gray-300 mx-auto mt-4"></div>
      </div>

      {/* Event Card Section */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">November 2024</h3>
        <div className="flex flex-col md:flex-row gap-6 border-t border-gray-200 pt-6">
          {/* Date Badge */}
          <div className="text-center">
            <p className="text-xs font-bold text-gray-500">NOV</p>
            <p className="text-2xl font-bold text-blue-600">16</p>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-sm text-gray-500">16 November 2024</p>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Orientation Program Fall 2024</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We are very pleased to announce that the Grand Orientation Program of the Department of Alimiyah, Quranic Studies and Islamic Studies of Tarbiyah Academy will be held on October 5, 2024.
            </p>
            <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">Find out more</a>
          </div>

          {/* Event Image */}
          <div className="w-full md:w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">
            [IMAGE]
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#005a6e] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">TARBIYAH ONLINE</h2>
            <p className="text-xs leading-relaxed">At Tarbiyah Online We Believe That Education Should Be Accessible To Everyone, Regardless Of Their Background Or Circumstances.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">USEFUL LINKS</h3>
            <ul className="text-xs space-y-2">
              <li>Terms & Conditions | Apply Online</li>
              <li>Privacy Policy | My account</li>
              <li>Refund Policy | Cart</li>
              <li>Career | Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">GET TOUCH WITH US</h3>
            <p className="text-xs">📍 40/1 Sofa Garden Mohammadpur Dhaka-1207</p>
            <p className="text-xs mt-2">📞 +880 01841515454</p>
            <p className="text-xs mt-2">📧 info@tarbiyahonline.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;