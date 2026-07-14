import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#004d4d] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
             {/* লোগো ইমেজ পাথ এখানে বসাবেন */}
             <img src="/logo.png" alt="Tarbiyah Online" className="h-14" />
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            "At Tarbiyah Online We Believe That Education Should Be Accessible To Everyone, Regardless Of Their Background Or Circumstances. That's Why We Offer A Range Of Online Courses That Are Designed To Help You Learn New Skills, At Any Time That Suits You."
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">Useful Links</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <a href="#" className="hover:text-teal-200">Terms & Conditions</a>
            <a href="#" className="hover:text-teal-200">Apply Online</a>
            <a href="#" className="hover:text-teal-200">Privacy Policy</a>
            <a href="#" className="hover:text-teal-200">My account</a>
            <a href="#" className="hover:text-teal-200">Refund Policy</a>
            <a href="#" className="hover:text-teal-200">Cart</a>
            <a href="#" className="hover:text-teal-200">Career</a>
            <a href="#" className="hover:text-teal-200">Contact</a>
          </div>
          {/* Payment Methods */}
          <div className="bg-white p-2 rounded shadow-sm">
            <img src="/payment-gateways.png" alt="Payment Methods" className="w-full" />
          </div>
        </div>

        {/* Column 3: Get Touch With Us */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">Get Touch With Us</h3>
          <div className="space-y-4 text-sm">
            <p className="flex gap-3">
              <span>📍</span> 40/1 Safa Gerden Satmasjid Housing, Mohammadpur Dhaka-1207
            </p>
            <p className="flex gap-3">
              <span>📞</span> 
              <span>(+88) 01841515454 <br/> (+88) 01841513434 <br/> (+88) 01841516565</span>
            </p>
            <p className="flex gap-3">
              <span>✉️</span> info@tarbiyahonline.com
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {['f', 'in', 'in', 'ig'].map((icon, i) => (
              <div key={i} className="w-10 h-10 bg-white text-[#004d4d] rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-teal-100">
                {icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;