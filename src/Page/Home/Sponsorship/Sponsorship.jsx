import React, { useState } from 'react';

const Sponsorship = () => {
  const [amount, setAmount] = useState(3000);
  const amounts = [1000, 3000, 5000, 12000, 'Other'];

  const faqs = [
    { q: "What is Tarbiyah Sponsorship Program?", a: "Tarbiyah Sponsorship Program is an initiative to provide scholarships to underprivileged and meritorious students." },
    { q: "How Can I Become A Sponsor?", a: "You can participate in our various sponsorship plans, at any time and for any amount." },
    { q: "How Will My Sponsorship Money Be Used?", a: "Your sponsorship money will be used directly to support the education of meritorious and underprivileged students." },
    { q: "Is The Sponsorship One-Time Or Regular?", a: "Sponsorship can be done on a one-time or regular basis. You can pay monthly, annually or one time." },
    { q: "Can I Sponsor A Specific Student?", a: "Yes, you can sponsor specific students if you want." },
    { q: "Does Sponsorship Count As Sadaqah Zariah?", a: "Yes, your sponsorship will count as Sadaqah Zariah, which will create infinite opportunities for reward." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-blue-900 h-48 flex items-center justify-center text-white text-3xl font-bold">
        Tarbiyah Sponsorship Program
      </div>

      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">An Opportunity To Build The Future Of Talented Students</h2>
            <p className="text-gray-600 leading-relaxed">Assalamu Alaikum! Dear Well-Wisher, Welcome to the special initiative of Tarbiyah Online – the “Sponsorship Program”...</p>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
             [Image PlaceHolder]
          </div>
        </div>

        {/* Amount & Booking Form */}
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-blue-100 mb-16">
          <h3 className="text-center text-xl font-bold text-blue-900 mb-6">Determine Your Sponsorship Amount</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {amounts.map((a) => (
              <button key={a} onClick={() => setAmount(a)} className={`px-6 py-2 border rounded ${amount === a ? 'bg-blue-900 text-white' : 'bg-white'}`}>
                {a} ৳
              </button>
            ))}
          </div>
          <form className="space-y-4">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded" />
            <select className="w-full p-2 border rounded"><option>One Month</option></select>
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Mobile" className="w-full p-2 border rounded" />
            <button className="w-full bg-blue-900 text-white py-3 rounded font-bold">Sponsor Now</button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900">{faq.q}</h4>
              <p className="text-gray-700 text-sm mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;