import React, { useState } from "react";
import professorImg from "../../../image/profile.jpg";
import HossainImg from "../../../image/Hridoy-Ustaz-01.png";
import MamunImg from "../../../image/Abdullahmanun.jpg";
import Mujahudul from "../../../image/Mujahid.png";

const Appointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false); // লোডিং স্টেট

  const consultants = [
    {
      name: "Prof. Mokhtar Ahmad",
      role: "Chairman, Tarbiyah Academic",
      image: professorImg,
    },
    {
      name: "Hossain Mohammad Hidoy",
      role: "Co-Ordinator, Department Of Islamic Studies",
      image: HossainImg,
    },
    {
      name: "Abdullah Al Mamun",
      role: "Co-Ordinator, Alimiyah Program",
      image: MamunImg,
    },
    {
      name: "Mujahudul Islam",
      role: "Senior Teacher, Quran Studies",
      image: Mujahudul,
    },
  ];

  const services = [
    "Educational Consultation",
    "Counseling",
    "Scholarship Guidance",
    "Admission Preparation",
    "Study Abroad",
    "Career Path Planning",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ========== WHATSAPP এ অটো পাঠানোর ফাংশন ==========
  const sendToWhatsApp = () => {
    // 🔴 এখানে আপনার WhatsApp নম্বর দিন (কান্ট্রি কোড সহ)
    const whatsappNumber = "8801712345678";

    // মেসেজ ফরম্যাট
    const textMessage = `New Appointment Request:%0A
Name: ${formData.firstName} ${formData.lastName}%0A
Phone: ${formData.phone}%0A
Email: ${formData.email}%0A
Service: ${formData.service || "Not specified"}%0A
Subject: ${formData.subject || "Not specified"}%0A
Message: ${formData.message || "No message"}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${textMessage}`;

    // নতুন ট্যাবে WhatsApp খোলা
    window.open(whatsappURL, "_blank");
  };

  // ========== EMAIL এ অটো পাঠানোর ফাংশন ==========
  const sendToEmail = () => {
    // 🔴 এখানে আপনার ইমেইল দিন
    const adminEmail = "your-email@gmail.com";

    const emailSubject = encodeURIComponent(
      `New Appointment Request: ${formData.subject || "General"}`,
    );

    const emailBody = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service || "Not specified"}
Subject: ${formData.subject || "Not specified"}
Message: ${formData.message || "No message"}`,
    );

    const mailtoURL = `mailto:${adminEmail}?subject=${emailSubject}&body=${emailBody}`;

    // ইমেইল ক্লায়েন্ট খোলা
    window.location.href = mailtoURL;
  };

  // ========== ফর্ম সাবমিট হ্যান্ডলার ==========
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!formData.firstName || !formData.phone || !formData.email) {
      alert("দয়া করে প্রথম নাম, ফোন নম্বর এবং ইমেইল পূরণ করুন।");
      return;
    }

    // লোডিং শুরু
    setIsSending(true);

    try {
      // ১. প্রথমে WhatsApp খুলুন
      sendToWhatsApp();

      // ২. একটু দেরি করে ইমেইল খুলুন
      setTimeout(() => {
        sendToEmail();
        setIsSending(false);
        setSubmitted(true);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("মেসেজ পাঠাতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      setIsSending(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4 md:px-20">
      {/* Consultant Section */}
      <div className="text-center mb-12">
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow">
          BOOK APPOINTMENT
        </button>
        <div className="flex flex-wrap justify-center gap-8">
          {consultants.map((c, i) => (
            <div key={i} className="flex flex-col items-center w-32">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 mb-3 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-sm text-gray-800">{c.name}</h4>
              <p className="text-[10px] text-gray-500 text-center">{c.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {services.map((service, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white p-4 rounded shadow-sm border"
          >
            <span className="text-blue-500">✔</span>
            <span className="text-sm font-medium text-gray-700">{service}</span>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto mb-12 border shadow-sm">
        <p className="text-lg font-semibold text-gray-800">
          Ready to Start Your Journey with Our Specialist Consultant
        </p>
        <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm mt-4 md:mt-0 hover:bg-blue-800 transition">
          One to One Consultation
        </button>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-8">
          BOOK AN APPOINTMENT
        </h2>

        {!submitted ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="FIRST NAME *"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="LAST NAME"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(+880) ********** *"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS *"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="border p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">- Select Service -</option>
              {services.map((srv, idx) => (
                <option key={idx} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="SUBJECT"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              className="border p-2 rounded w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSending}
              className={`bg-blue-900 text-white px-8 py-2 rounded font-bold transition w-full flex items-center justify-center gap-2 ${
                isSending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800"
              }`}
            >
              {isSending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Proceed to Send"
              )}
            </button>
          </form>
        ) : (
          /* সফলভাবে সাবমিট হওয়ার পর কনফার্মেশন মেসেজ */
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-600">
                Appointment Request Sent Successfully! ✅
              </h3>
              <p className="text-gray-600 mt-2">
                আপনার অ্যাপয়েন্টমেন্ট রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে।
                <br />
                আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে ইনশাআল্লাহ।
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto">
              <h4 className="font-semibold text-gray-700 mb-2">
                📋 Appointment Summary:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {formData.phone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-medium">Service:</span>{" "}
                  {formData.service || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Subject:</span>{" "}
                  {formData.subject || "Not specified"}
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    service: "",
                    subject: "",
                    message: "",
                  });
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
