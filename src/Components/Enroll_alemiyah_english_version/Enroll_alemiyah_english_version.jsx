import React, { useState } from "react";
import { FaLock, FaSpinner } from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Enroll_alemiyah_english_version = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [showEnrolmentSummaryMobile, setShowEnrolmentSummaryMobile] =
    useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    townCity: "",
    postcode: "",
    country: "bangladesh",
    state: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const courseInfo = {
    total: 27000,
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "Please enter a valid phone number";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.streetAddress)
      errors.streetAddress = "Street address is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      const paymentData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.streetAddress,
        city: formData.townCity,
        country: formData.country,
        postcode: formData.postcode,
        amount: courseInfo.total,
        currency: "BDT",
        payment_method: paymentMethod,
      };

      if (
        paymentMethod === "sslcommerz" ||
        paymentMethod === "card" ||
        paymentMethod === "bank"
      ) {
        const response = await initiateSSLCommerzPayment(paymentData);
        if (response && response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          alert("Failed to initiate payment.");
          setLoading(false);
        }
      } else {
        alert(`Processing ${paymentMethod.toUpperCase()} payment...`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred during payment processing.");
      setLoading(false);
    }
  };

  const initiateSSLCommerzPayment = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          redirectUrl: "https://sandbox.sslcommerz.com/gwprocess/v4/index.php",
          transactionId: "TX" + Date.now(),
        });
      }, 1500);
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Top Toggleable Enrolment Summary Bar */}
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-md p-3 mb-6 flex justify-between items-center text-sm">
          <button
            onClick={() =>
              setShowEnrolmentSummaryMobile(!showEnrolmentSummaryMobile)
            }
            className="text-[#004d61] font-medium flex items-center gap-1 hover:underline text-xs"
          >
            <span>
              {showEnrolmentSummaryMobile
                ? "Hide Enrolment Summary"
                : "Show Enrolment Summary"}
            </span>
            <span className="text-[10px]">▲</span>
          </button>
          <span className="font-bold text-[#004d61] text-sm">৳ 27,000</span>
        </div>

        {/* Expandable summary box matching the top dropdown in screenshot */}
        {showEnrolmentSummaryMobile && (
          <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                  <span className="absolute top-0 right-0 bg-gray-700 text-white text-[9px] px-1 rounded-bl">
                    3
                  </span>
                  <img
                    src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                    alt="course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#004d61]">
                    Tarbiyah Alimiyah Program (Bangladeshi) × 3
                  </p>
                  <p className="text-[11px] text-gray-500">
                    ৳ 3,000 / month and a ৳ 6,000 sign-up fee
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-xs">৳ 9,000</span>
                <span className="text-[10px] text-gray-400">⊗</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                  <span className="absolute top-0 right-0 bg-gray-700 text-white text-[9px] px-1 rounded-bl">
                    3
                  </span>
                  <img
                    src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                    alt="course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#004d61]">
                    Tarbiyah Alimiyah Program (Overseas) × 3
                  </p>
                  <p className="text-[11px] text-gray-500">
                    ৳ 9,000 / month and a ৳ 9,000 sign-up fee
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-xs">৳ 18,000</span>
                <span className="text-[10px] text-gray-400">⊗</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500">- 3 +</div>

            <div className="pt-2">
              <button
                type="button"
                className="text-[11px] text-[#004d61] hover:underline"
              >
                Have a coupon?{" "}
                <span className="font-semibold">
                  Click here to enter your code
                </span>
              </button>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-gray-100">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳ 27,000</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">bKash Charge</span>
                <span className="font-medium text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 text-sm font-bold text-[#004d61]">
                <span>Total</span>
                <span>৳ 27,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Returning customer login prompt */}
        <div className="text-xs mb-6 text-gray-600">
          Returning customer?{" "}
          <button className="text-[#004d61] font-semibold hover:underline">
            Click here to login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SHIPPING INFORMATION SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-xs tracking-wider mb-4 uppercase">
              SHIPPING INFORMATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="FIRST NAME *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="LAST NAME *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="bg-gray-50 px-3 py-2.5 flex items-center gap-1 border-r border-gray-300 text-xs">
                  <span>🇧🇩</span>
                  <span>+880</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="PHONE"
                  className="w-full px-3 py-2.5 text-xs placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {formErrors.phone && (
                <p className="text-red-500 text-[10px] mt-1">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="EMAIL *"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-[10px] mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="STREET ADDRESS *"
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.streetAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.streetAddress && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {formErrors.streetAddress}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  placeholder="TOWN / CITY"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="POSTCODE"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#004d61]"
                />
              </div>
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-xs bg-white text-gray-500 focus:outline-none focus:border-[#004d61]"
                >
                  <option value="bangladesh">Country *</option>
                  <option value="bangladesh">bangladesh</option>
                </select>
              </div>
              <div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-xs bg-white text-gray-400 focus:outline-none focus:border-[#004d61]"
                >
                  <option value="">state (optional)</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* ORDER SUMMARY SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-xs tracking-wider mb-3 uppercase">
              ORDER SUMMARY
            </h2>

            <div className="mb-4">
              <button
                type="button"
                className="text-[11px] text-[#004d61] hover:underline"
              >
                Have a coupon?{" "}
                <span className="font-semibold">
                  Click here to enter your code
                </span>
              </button>
            </div>

            <div className="border border-gray-200 rounded p-4 mb-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                    <span className="absolute top-0 right-0 bg-gray-700 text-white text-[9px] px-1 rounded-bl">
                      3
                    </span>
                    <img
                      src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                      alt="course"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-[#004d61]">
                    Tarbiyah Alimiyah Program (Bangladeshi)
                  </p>
                </div>
                <span className="text-[11px] text-gray-600">
                  ৳ 3,000 / month and a ৳ 6,000 sign-up fee
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                    <span className="absolute top-0 right-0 bg-gray-700 text-white text-[9px] px-1 rounded-bl">
                      3
                    </span>
                    <img
                      src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                      alt="course"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-[#004d61]">
                    Tarbiyah Alimiyah Program (Overseas)
                  </p>
                </div>
                <span className="text-[11px] text-gray-600">
                  ৳ 9,000 / month and a ৳ 9,000 sign-up fee
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳ 27,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">bKash Charge</span>
                <span className="font-medium text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-sm font-bold text-[#004d61]">
                <span>Total</span>
                <span>৳ 27,000</span>
              </div>
              <div className="flex justify-between py-2 text-xs">
                <span className="text-gray-600">Recurring totals</span>
                <span></span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 text-xs">
                <span className="text-gray-600">Subtotal</span>
                <span>৳ 12,000 / month</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-xs font-bold">
                <span className="text-[#004d61]">Recurring totals</span>
                <div className="text-right">
                  <p className="text-[#004d61] text-xs">৳ 12,000 / month</p>
                  <p className="text-gray-400 font-normal text-[10px]">
                    First renewal: 08/30/2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* PAYMENT SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-xs tracking-wider uppercase mb-1">
              PAYMENT
            </h2>
            <p className="text-[10px] text-gray-500 mb-4 font-semibold tracking-wide">
              ALL TRANSACTIONS ARE SECURE AND ENCRYPTED.
            </p>

            <div className="space-y-3 mb-6">
              {/* Option 1: Direct bKash */}
              <label
                className={`flex flex-col p-3 border rounded cursor-pointer transition-all ${paymentMethod === "bkash" ? "border-[#004d61] bg-gray-50" : "border-gray-200"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={paymentMethod === "bkash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#004d61]"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      Direct bKash Payment Automatic
                    </span>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/BKash_Logo.png/1200px-BKash_Logo.png"
                    alt="bKash"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                {paymentMethod === "bkash" && (
                  <div className="mt-2 pl-7 text-[11px] text-gray-600">
                    Pay via bKash Automatic
                  </div>
                )}
              </label>

              {/* Option 2: Online/Card */}
              <label
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${paymentMethod === "sslcommerz" ? "border-[#004d61] bg-gray-50" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="sslcommerz"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#004d61]"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    Pay Online(Credit/Debit Card/MobileBanking/NetBanking/bkash)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-500">
                  <span>Verified by</span>
                  <div className="bg-[#002f5b] text-white font-bold px-1 py-0.5 rounded text-[8px]">
                    SSLCOMMERZ
                  </div>
                </div>
              </label>

              {/* Option 3: Bank Payment */}
              <label
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${paymentMethod === "bank" ? "border-[#004d61] bg-gray-50" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#004d61]"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    Bank Payment
                  </span>
                </div>
              </label>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start gap-2 mb-6 text-xs text-gray-600">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 text-[#004d61] rounded border-gray-300"
              />
              <div className="text-[11px]">
                I’ve read and accept the{" "}
                <button type="button" className="text-[#004d61] underline">
                  terms & conditions
                </button>
                ,{" "}
                <button type="button" className="text-[#004d61] underline">
                  privacy policy
                </button>{" "}
                &{" "}
                <button type="button" className="text-[#004d61] underline">
                  refund policy
                </button>
                .
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#cccccc] text-gray-800 font-bold py-3.5 rounded text-xs hover:bg-[#b3b3b3] transition-colors flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaLock className="text-[10px]" />
                  <span>Enroll Now ৳ 27,000</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-gray-500">
              <span className="text-green-600 font-bold">✔</span> 100% Secure
              Payments
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Enroll_alemiyah_english_version;
