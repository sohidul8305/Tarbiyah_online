import React from 'react';

const Appointment = () => {
  const consultants = [
    { name: "Dr. Khaled Hosen", role: "Co-Ordinator, Tarbiyah Academic Researcher" },
    { name: "Hossain Mohammad", role: "Co-Ordinator, Department Of Islamic Studies" },
    { name: "Ustaz Hossain Faiyaz", role: "Co-Ordinator, Alimiyah Program" },
    { name: "Abdullah Al Mamun", role: "Sr. Educator, Alimiyah Program" },
  ];

  const services = [
    "Educational Consultation", "Counseling", "Scholarship Guidance",
    "Admission Preparation", "Study Abroad", "Career Path Planning"
  ];

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4 md:px-20">
      {/* Consultant Section */}
      <div className="text-center mb-12">
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8">BOOK APPOINTMENT</button>
        <div className="flex flex-wrap justify-center gap-8">
          {consultants.map((c, i) => (
            <div key={i} className="flex flex-col items-center w-32">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 mb-3" />
              <h4 className="font-bold text-sm text-gray-800">{c.name}</h4>
              <p className="text-[10px] text-gray-500 text-center">{c.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {services.map((service, i) => (
          <div key={i} className="flex items-center gap-3 bg-white p-4 rounded shadow-sm border">
            <span className="text-blue-500">✔</span>
            <span className="text-sm font-medium text-gray-700">{service}</span>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto mb-12 border shadow-sm">
        <p className="text-lg font-semibold text-gray-800">Ready to Start Your Journey with Our Specialist Consultant</p>
        <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm mt-4 md:mt-0">One to One Consultation</button>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-8">BOOK AN APPOINTMENT</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="FIRST NAME" className="border p-2 rounded w-full" />
            <input type="text" placeholder="LAST NAME" className="border p-2 rounded w-full" />
          </div>
          <input type="text" placeholder="(+880) **********" className="border p-2 rounded w-full" />
          <input type="email" placeholder="EMAIL ADDRESS" className="border p-2 rounded w-full" />
          <select className="border p-2 rounded w-full text-gray-500">
            <option>- Select -</option>
          </select>
          <input type="text" placeholder="SUBJECT" className="border p-2 rounded w-full" />
          <textarea placeholder="YOUR MESSAGE" className="border p-2 rounded w-full h-24" />
          <button className="bg-blue-900 text-white px-8 py-2 rounded font-bold">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;