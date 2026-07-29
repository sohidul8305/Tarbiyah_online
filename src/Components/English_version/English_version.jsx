import React, { useState } from "react";
import {
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

const English_version = () => {
  const [kidsBanglaQty, setKidsBanglaQty] = useState(2);
  const [kidsOverseasQty, setKidsOverseasQty] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Collapsible Enrolment Summary Bar */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center px-4 py-3 cursor-pointer text-xs sm:text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🛒</span>
              <span>Hide Enrolment Summary</span>
              <FaChevronUp className="text-gray-400 text-xs" />
            </div>
            <div className="font-bold text-gray-900">৳ 24,000</div>
          </div>

          <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3 text-xs sm:text-sm">
            {/* Item 1 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://i.ibb.co.com/SzV4rgk/diploma-2-1-jpg.jpg"
                    alt=" Diploma"
                    className="w-10 h-10 object-cover rounded border"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Diploma in Islamic Studies × 1
                  </p>
                </div>
              </div>
              <span className="font-semibold text-gray-800">৳ 12,000</span>
            </div>

            {/* Item 2 */}
            <div className="flex justify-between items-start pt-2 border-t border-gray-50">
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5">
                  <img
                    src="https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg"
                    alt="Alimiyah for Kids"
                    className="w-10 h-10 object-cover rounded border"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Alimiyah for Kids (Bangladeshi) × {kidsBanglaQty}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    ৳ 2,000 / month and a ৳ 4,000 sign-up fee
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-1.5 border border-gray-300 rounded w-max px-1 bg-white">
                    <button
                      onClick={() =>
                        setKidsBanglaQty(Math.max(1, kidsBanglaQty - 1))
                      }
                      className="text-gray-600 px-1.5 py-0.5 hover:bg-gray-100 rounded text-[10px]"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-2 text-xs font-semibold">
                      {kidsBanglaQty}
                    </span>
                    <button
                      onClick={() => setKidsBanglaQty(kidsBanglaQty + 1)}
                      className="text-gray-600 px-1.5 py-0.5 hover:bg-gray-100 rounded text-[10px]"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-800">৳ 6,000</span>
            </div>

            {/* Item 3 */}
            <div className="flex justify-between items-start pt-2 border-t border-gray-50">
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5">
                  <img
                    src="https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg"
                    alt="Alimiyah for Kids Overseas"
                    className="w-10 h-10 object-cover rounded border"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Alimiyah for Kids (Overseas) × {kidsOverseasQty}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    ৳ 3,000 / month and a ৳ 3,000 sign-up fee
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-1.5 border border-gray-300 rounded w-max px-1 bg-white">
                    <button
                      onClick={() =>
                        setKidsOverseasQty(Math.max(1, kidsOverseasQty - 1))
                      }
                      className="text-gray-600 px-1.5 py-0.5 hover:bg-gray-100 rounded text-[10px]"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-2 text-xs font-semibold">
                      {kidsOverseasQty}
                    </span>
                    <button
                      onClick={() => setKidsOverseasQty(kidsOverseasQty + 1)}
                      className="text-gray-600 px-1.5 py-0.5 hover:bg-gray-100 rounded text-[10px]"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-800">৳ 6,000</span>
            </div>

            {/* Coupon text */}
            <div className="pt-2 text-[11px] text-[#0073aa] hover:underline cursor-pointer">
              Have a coupon? Click here to enter your code
            </div>

            {/* Subtotals */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100 text-gray-600 text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">৳ 24,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>bKash Charge</span>
                <span className="text-teal-600 font-bold text-sm">৳ 0</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-sm sm:text-base text-[#0073aa]">
              <span>Total</span>
              <span>৳ 24,000</span>
            </div>
          </div>
        </div>

        {/* Returning Customer notice */}
        <p className="text-xs text-gray-600">
          Returning customer?{" "}
          <span className="text-[#0073aa] cursor-pointer hover:underline">
            Click here to login
          </span>
        </p>

        {/* SHIPPING INFORMATION */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
          <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
            SHIPPING INFORMATION
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                FIRST NAME *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                LAST NAME *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">
              PHONE *
            </label>
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 flex items-center gap-1.5 border-r border-gray-300 text-xs text-gray-700">
                <span>🇧🇩</span>
                <span>+880</span>
                <span className="text-[10px]">▼</span>
              </div>
              <input
                type="text"
                placeholder="PHONE"
                className="w-full px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">
              EMAIL *
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                STREET ADDRESS *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                TOWN / CITY
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                POSTCODE
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                Country *
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]">
                <option>bangladesh</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                state (optional)
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white text-gray-400 focus:outline-none focus:border-[#0073aa]">
                <option value="">Select an option...</option>
              </select>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 text-xs sm:text-sm">
          <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
            ORDER SUMMARY
          </h2>

          <div className="text-[11px] text-[#0073aa] hover:underline cursor-pointer">
            Have a coupon? Click here to enter your code
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/SzV4rgk/diploma-2-1-jpg.jpg"
                  alt=" Diploma"
                  className="w-8 h-8 object-cover rounded border"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <span className="font-medium text-gray-900">
                Diploma in Islamic Studies
              </span>
            </div>
            <span className="font-semibold text-gray-800">৳ 12,000</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg"
                  alt="Alimiyah for Kids"
                  className="w-8 h-8 object-cover rounded border"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </div>
              <span className="font-medium text-gray-900">
                Alimiyah for Kids (Bangladeshi)
              </span>
            </div>
            <span className="text-[11px] text-gray-500">
              ৳ 2,000 / month and a ৳ 4,000 sign-up fee
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg"
                  alt="Alimiyah for Kids Overseas"
                  className="w-8 h-8 object-cover rounded border"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </div>
              <span className="font-medium text-gray-900">
                Alimiyah for Kids (Overseas)
              </span>
            </div>
            <span className="text-[11px] text-gray-500">
              ৳ 3,000 / month and a ৳ 3,000 sign-up fee
            </span>
          </div>

          <div className="space-y-1.5 pt-2 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">৳ 24,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>bKash Charge</span>
              <span className="text-teal-600 font-bold text-sm">৳ 0</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-sm text-[#0073aa]">
            <span>Total</span>
            <span>৳ 24,000</span>
          </div>

          <div className="pt-2 text-gray-500 text-xs">
            <p className="font-medium text-gray-700">Recurring totals</p>
          </div>

          <div className="flex justify-between items-center pt-1 text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">৳ 5,000 / month</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-sm text-[#0073aa]">
            <span>Recurring totals</span>
            <div className="text-right">
              <div>৳ 5,000 / month</div>
              <div className="text-[10px] text-gray-400 font-normal">
                First renewal: 08/29/2026
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
          <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
            PAYMENT
          </h2>
          <p className="text-[11px] text-gray-500 uppercase">
            All transactions are secure and encrypted.
          </p>

          <div className="border border-gray-300 rounded overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 flex items-center gap-2 text-xs font-semibold text-[#0073aa]">
              <input type="radio" defaultChecked className="accent-[#0073aa]" />
              <span>Direct bKash Payment Automatic</span>
            </div>
            <div className="p-4 text-xs text-gray-600 bg-white">
              Pay via bKash Automatic
            </div>
          </div>

          <div className="border border-gray-200 rounded p-3 flex items-center justify-between text-xs bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" className="accent-[#0073aa]" />
              <span className="text-gray-800">
                Pay Online (Credit/Debit Card/MobileBanking/NetBanking/bKash)
              </span>
            </label>
            <span className="bg-blue-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold tracking-tighter">
              SSLCOMMERZ
            </span>
          </div>

          <div className="border border-gray-200 rounded p-3 flex items-center gap-2 text-xs bg-white">
            <input type="radio" name="payment" className="accent-[#0073aa]" />
            <span className="text-gray-800">Bank Payment</span>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start gap-2 pt-2 text-xs text-gray-600">
            <input type="checkbox" className="mt-0.5 accent-[#0073aa]" />
            <span>
              I've read and accept the{" "}
              <span className="text-[#0073aa] cursor-pointer hover:underline">
                terms & conditions
              </span>
              ,{" "}
              <span className="text-[#0073aa] cursor-pointer hover:underline">
                privacy policy
              </span>{" "}
              &{" "}
              <span className="text-[#0073aa] cursor-pointer hover:underline">
                refund policy
              </span>
              .
            </span>
          </div>

          {/* Enroll Now Button */}
          <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3.5 px-6 rounded shadow-inner flex items-center justify-center gap-2 text-sm transition-all cursor-pointer">
            <FaLock className="text-xs" />
            <span>Enroll Now ৳ 24,000</span>
          </button>

          {/* Secure footer */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-2">
            <FaCheckCircle className="text-green-600 text-xs" />
            <span>100% Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default English_version;
