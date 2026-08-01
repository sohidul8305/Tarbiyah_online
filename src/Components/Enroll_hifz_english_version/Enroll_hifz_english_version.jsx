import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaCreditCard,
  FaMobileAlt,
  FaWallet,
  FaLock,
  FaSpinner,
  FaShieldAlt,
  FaInfoCircle,
  FaUniversity,
  FaBuilding,
  FaClock,
  FaAward,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaHandshake,
  FaTruck,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaTag,
  FaArrowRight,
  FaUserPlus,
  FaGraduationCap,
  FaMosque,
  FaQuran,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Enroll_hifz_english_version = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showEnrolmentSummaryMobile, setShowEnrolmentSummaryMobile] =
    useState(false);

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
    password: "",
    confirmPassword: "",
    previousEducation: "",
    interestedSubjects: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Course Info - Hifz Course (English Version)
  const courseInfo = {
    name: "Adil Hifz Course",
    price: 8000,
    subtotal: 8000,
    bkashCharge: 0,
    total: 8000,
    recurringSubtotal: "৳ 2,000 / month",
    recurringTotals: "৳ 2,000 / month",
    firstRenewal: "08/30/2026",
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "Please enter a valid phone number";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.streetAddress) errors.streetAddress = "Address is required";
    if (createAccount) {
      if (!formData.password) errors.password = "Password is required";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  // Form Submit Handler
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
        product_name: courseInfo.name,
        product_category: "educational",
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
          alert("Payment initialization failed.");
          setLoading(false);
        }
      } else {
        alert(`${paymentMethod.toUpperCase()} payment processing...`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment process error.");
      setLoading(false);
    }
  };

  const initiateSSLCommerzPayment = async (paymentData) => {
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

  const applyCoupon = () => {
    if (couponCode === "HIFZ50") {
      setCouponApplied(true);
      alert("Coupon applied! Discount is applicable.");
    } else {
      alert("Invalid coupon code.");
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
            className="text-[#004d61] font-medium flex items-center gap-1 hover:underline"
          >
            <span>
              {showEnrolmentSummaryMobile
                ? "Hide Enrolment Summary"
                : "Show Enrolment Summary"}
            </span>
            <span className="text-xs">▲</span>
          </button>
          <span className="font-bold text-[#004d61]">৳ 8,000</span>
        </div>

        {/* Expandable summary box */}
        {showEnrolmentSummaryMobile && (
          <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img
                    src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                    alt="course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#004d61]">
                    Adil Hifz Course × 1
                  </p>
                  <p className="text-xs text-gray-500">
                    ৳ 2,000 / month and a ৳ 6,000 sign-up fee
                  </p>
                </div>
              </div>
              <span className="font-bold text-sm">৳ 8,000</span>
            </div>
            <div className="flex items-center justify-between pt-3 text-xs text-gray-500">
              <span>- 1 +</span>
            </div>
          </div>
        )}

        {/* Returning customer login prompt */}
        <div className="text-sm mb-6 text-gray-600">
          Returning customer?{" "}
          <button className="text-[#004d61] font-semibold hover:underline">
            Click here to login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SHIPPING INFORMATION SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-4 uppercase">
              SHIPPING INFORMATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  FIRST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  LAST NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  +880 PHONE <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 flex items-center gap-1 border-r border-gray-300 text-sm">
                    <span>🇧🇩</span>
                    <span className="text-xs">▼</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                STREET ADDRESS <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="House number and street name"
                className={`w-full px-3 py-2 border ${
                  formErrors.streetAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-[#004d61]`}
              />
              {formErrors.streetAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.streetAddress}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                TOWN / CITY
              </label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  POSTCODE
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
                >
                  <option value="bangladesh">bangladesh</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  state (optional)
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
                >
                  <option value="">Select an option…</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* ORDER SUMMARY SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-2 uppercase">
              ORDER SUMMARY
            </h2>

            <div className="mb-4">
              <button
                type="button"
                className="text-xs text-[#004d61] hover:underline flex items-center gap-1"
              >
                Have a coupon?{" "}
                <span className="font-semibold">
                  Click here to enter your code
                </span>
              </button>
            </div>

            <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 mb-4">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                      alt="course"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-[#004d61]">
                    Adil Hifz Course
                  </p>
                </div>
                <span className="text-xs font-semibold">
                  ৳ 2,000 / month and a ৳ 6,000 sign-up fee
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳ 8,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">bKash Charge</span>
                <span className="font-medium text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-base font-bold text-[#004d61]">
                <span>Total</span>
                <span className="text-[#004d61]">৳ 8,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 text-xs">
                <span className="text-gray-600">Recurring totals</span>
                <span></span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 text-xs">
                <span className="text-gray-600">Subtotal</span>
                <span>৳ 2,000 / month</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-xs font-bold">
                <span className="text-[#004d61]">Recurring totals</span>
                <div className="text-right">
                  <p className="text-[#004d61]">৳ 2,000 / month</p>
                  <p className="text-gray-500 font-normal text-[11px]">
                    First renewal: 08/30/2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* PAYMENT SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider uppercase mb-1">
              PAYMENT
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 flex items-center gap-1 font-medium tracking-wide">
              ALL TRANSACTIONS ARE SECURE AND ENCRYPTED.
            </p>

            <div className="space-y-3 mb-6">
              {/* Option 1: Direct bKash */}
              <label
                className={`flex flex-col p-3 border rounded cursor-pointer transition-all ${
                  paymentMethod === "bkash"
                    ? "border-[#004d61] bg-gray-50"
                    : "border-gray-200"
                }`}
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
                    <span className="text-xs font-bold text-gray-800">
                      Direct bKash Payment Automatic
                    </span>
                  </div>
                  <img
                    src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                    className="w-6 h-6 object-contain"
                    alt="bkash"
                  />
                </div>
                {paymentMethod === "bkash" && (
                  <div className="mt-2 pl-7 text-xs text-gray-600">
                    Pay via bKash Automatic
                  </div>
                )}
              </label>

              {/* Option 2: Online/Card */}
              <label
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${
                  paymentMethod === "sslcommerz"
                    ? "border-[#004d61] bg-gray-50"
                    : "border-gray-200"
                }`}
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
                <div className="bg-[#002f5b] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  SSLCOMMERZ
                </div>
              </label>

              {/* Option 3: Bank Payment */}
              <label
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${
                  paymentMethod === "bank"
                    ? "border-[#004d61] bg-gray-50"
                    : "border-gray-200"
                }`}
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
              <div>
                I've read and accept the{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  terms & conditions
                </button>
                ,{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  privacy policy
                </button>{" "}
                &{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  refund policy
                </button>
                .
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#cccccc] text-gray-800 font-bold py-3.5 rounded text-sm hover:bg-[#b3b3b3] transition-colors flex items-center justify-center gap-2 ${
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
                  <FaLock className="text-xs" />
                  <span>Enroll Now ৳ 8,000</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-500">
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

export default Enroll_hifz_english_version;
