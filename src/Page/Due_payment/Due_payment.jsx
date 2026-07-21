import React from "react";
import { Link } from "react-router-dom";

const Due_payment = () => {
  // ডেমো বকেয়া ডাটা (ব্যাকএন্ড API থেকে এই ডাটা ফেচ করতে হবে)
  const dueDetails = {
    month: "জুন ২০২৬",
    tuitionFee: 1500,
    examFee: 500,
    libraryFine: 0,
    totalDue: 2000,
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          বকেয়া ফি (Due Payment)
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          আপনার অ্যাকাউন্টের বর্তমান বকেয়া স্ট্যাটাস
        </p>
      </div>

      {/* বকেয়া সামারি কার্ড */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-red-600 font-medium">মোট বকেয়া পরিমাণ</p>
          <h3 className="text-3xl font-bold text-red-700">
            ৳ {dueDetails.totalDue}
          </h3>
        </div>
        <span className="bg-red-200 text-red-800 text-xs font-semibold px-3 py-1 rounded-full uppercase">
          বকেয়া রয়েছে
        </span>
      </div>

      {/* ফি এর বিস্তারিত টেবিল */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 rounded-l-lg">বিবরণ (Description)</th>
              <th className="p-3">মাস / খাত</th>
              <th className="p-3 text-right rounded-r-lg">পরিমাণ (BDT)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
            <tr>
              <td className="p-3 font-medium text-gray-800">মাসিক টিউশন ফি</td>
              <td className="p-3">{dueDetails.month}</td>
              <td className="p-3 text-right">৳ {dueDetails.tuitionFee}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-gray-800">পরীক্ষার ফি</td>
              <td className="p-3">সেমিস্টার ফাইনাল</td>
              <td className="p-3 text-right">৳ {dueDetails.examFee}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-gray-800">লাইব্রেরি ফাইন</td>
              <td className="p-3">প্রযোজ্য নয়</td>
              <td className="p-3 text-right">৳ {dueDetails.libraryFine}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* পেমেন্ট পেজে যাওয়ার বাটন */}
      <div className="flex justify-end">
        <Link
          to="/online-payment"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200 flex items-center gap-2"
        >
          <span>বকেয়া পরিশোধ করুন</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Due_payment;
