import React, { useState } from "react";

const Online_payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  // পেমেন্ট সাবমিট হ্যান্ডলার (এখানে আপনার ব্যাকএন্ড API বা পেমেন্ট গেটওয়ে ইন্টিগ্রেশন করতে হবে)
  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || !studentId) {
      alert("অনুগ্রহ করে স্টুডেন্ট আইডি এবং টাকার পরিমাণ লিখুন।");
      return;
    }

    setLoading(true);

    // ডেমো পেমেন্ট প্রসেসিং (Real Payment Gateway যেমন: SSLCommerz / bKash API এর জন্য এখানে axios কল হবে)
    setTimeout(() => {
      setLoading(false);
      alert(
        `ধন্যবাদ! আপনার ${amount} টাকা পেমেন্টের জন্য ${selectedMethod.toUpperCase()} গেটওয়েতে রিডাইরেক্ট করা হচ্ছে...`,
      );
      // উদাহরণস্বরূপ পেমেন্ট গেটওয়ে URL এ রিডাইরেক্ট করার কোড:
      // window.location.href = response.data.paymentUrl;
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          অনলাইন ফি পরিশোধ (Online Payment)
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          আপনার মাসিক বা কোর্স ফি সহজেই নিরাপদ মাধ্যমে পরিশোধ করুন
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        {/* Student ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            স্টুডেন্ট আইডি / রেজিস্ট্রেশন নম্বর
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="যেমন: STU-123456"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            টাকার পরিমাণ (BDT)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="যেমন: ১০০০"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            পেমেন্ট মাধ্যম নির্বাচন করুন
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* bKash */}
            <div
              onClick={() => setSelectedMethod("bkash")}
              className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                selectedMethod === "bkash"
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-bold text-pink-600 text-lg">bKash</span>
              <span className="text-xs text-gray-500 mt-1">বিকাশ</span>
            </div>

            {/* Nagad */}
            <div
              onClick={() => setSelectedMethod("nagad")}
              className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                selectedMethod === "nagad"
                  ? "border-orange-600 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-bold text-orange-600 text-lg">Nagad</span>
              <span className="text-xs text-gray-500 mt-1">নগদ</span>
            </div>

            {/* Rocket */}
            <div
              onClick={() => setSelectedMethod("rocket")}
              className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                selectedMethod === "rocket"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-bold text-purple-600 text-lg">Rocket</span>
              <span className="text-xs text-gray-500 mt-1">রকেট</span>
            </div>

            {/* Bank Card */}
            <div
              onClick={() => setSelectedMethod("bank")}
              className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                selectedMethod === "bank"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-bold text-blue-600 text-lg">Bank Card</span>
              <span className="text-xs text-gray-500 mt-1">কার্ড / ব্যাংক</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-lg transition duration-200 shadow-md flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
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
                  className="opacity-25"
                  cx="4"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                ></path>
              </svg>
              প্রসেসিং হচ্ছে...
            </span>
          ) : (
            `পেমেন্ট সম্পন্ন করুন (${selectedMethod.toUpperCase()})`
          )}
        </button>
      </form>
    </div>
  );
};

export default Online_payment;
