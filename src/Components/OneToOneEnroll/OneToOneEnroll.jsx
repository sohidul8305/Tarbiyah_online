import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCreditCard,
  FaMobileAlt,
  FaLock,
  FaSpinner,
  FaShieldAlt,
  FaUniversity,
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaTag,
  FaArrowRight,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const OneToOneEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showOrderSummaryMobile, setShowOrderSummaryMobile] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    postcode: "",
    country: "Bangladesh",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // কোর্সের তথ্য
  const courseInfo = {
    name: "হিফজ রিভিশন কোর্স",
    subtitle: "বিসমিল্লাহির রহমানির রহীম",
    price: 3000,
    discount: 0,
    bkashCharge: 0,
    total: 3000,
  };

  // ফর্ম ভ্যালিডেশন
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "প্রথম নাম প্রয়োজন";
    if (!formData.lastName) errors.lastName = "শেষ নাম প্রয়োজন";
    if (!formData.phone) errors.phone = "ফোন নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক ফোন নম্বর দিন";
    if (!formData.email) errors.email = "ইমেইল প্রয়োজন";
    if (!formData.streetAddress) errors.streetAddress = "ঠিকানা প্রয়োজন";
    if (createAccount) {
      if (!formData.password) errors.password = "পাসওয়ার্ড প্রয়োজন";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }
    return errors;
  };

  // ফর্ম সাবমিট হ্যান্ডলার
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
        city: formData.city,
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
          alert("পেমেন্ট ইনিশিয়েট করতে সমস্যা হয়েছে।");
          setLoading(false);
        }
      } else {
        alert(`${paymentMethod.toUpperCase()} পেমেন্ট প্রক্রিয়াকরণ...`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("পেমেন্ট প্রক্রিয়ায় ত্রুটি হয়েছে।");
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

  const applyCoupon = () => {
    if (couponCode === "DISCOUNT50") {
      setCouponApplied(true);
      alert("কুপন প্রয়োগ করা হয়েছে!");
    } else {
      alert("ভুল কুপন কোড।");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/course/kids/hifz-revision"
            className="inline-flex items-center gap-2 text-[#002b2b] hover:text-yellow-600 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* Top Collapsible Order Summary Bar */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm bg-white">
          <div
            className="flex justify-between items-center cursor-pointer text-gray-700 font-medium"
            onClick={() => setShowOrderSummaryMobile(!showOrderSummaryMobile)}
          >
            <div className="flex items-center gap-2 text-sm">
              {showOrderSummaryMobile ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
              )}
              <span>
                {showOrderSummaryMobile
                  ? "Hide Enrolment Summary"
                  : "Show Enrolment Summary"}
              </span>
            </div>
            <span className="font-bold text-gray-800">
              ৳ {courseInfo.total.toLocaleString()}
            </span>
          </div>

          {showOrderSummaryMobile && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 p-2 rounded text-xs relative">
                    🎓{" "}
                    <span className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      i
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {courseInfo.name} × 1
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  ৳ {courseInfo.price.toLocaleString()}
                </span>
              </div>
              <div className="py-2 text-xs text-yellow-600 cursor-pointer">
                Have a coupon? Click here to enter your code
              </div>
              <div className="flex justify-between py-1 text-sm text-gray-600">
                <span>Subtotal</span>
                <span>৳ {courseInfo.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 text-sm text-gray-600">
                <span>bKash Charge</span>
                <span className="text-green-600">
                  ৳ {courseInfo.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-base text-gray-900 mt-2">
                <span>Total</span>
                <span>৳ {courseInfo.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Returning Customer Link */}
        <div className="text-sm text-gray-500 mb-6">
          Returning customer?{" "}
          <button className="text-yellow-600 hover:underline font-medium">
            Click here to login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SHIPPING INFORMATION */}
          <div>
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
              Shipping Information
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                PHONE <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden focus-within:border-gray-500">
                <div className="bg-gray-50 px-3 flex items-center gap-1 border-r border-gray-300 text-sm text-gray-700">
                  <span>🇧🇩</span>
                  <span>+880</span>
                  <FaChevronDown className="text-[10px] text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="PHONE"
                  className="w-full px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                EMAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={() => setCreateAccount(!createAccount)}
                  className="w-4 h-4 text-gray-700 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  create an account?
                </span>
              </label>

              {createAccount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-4 bg-gray-50 rounded border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      CONFIRM PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
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
                className={`w-full px-3 py-2.5 border ${
                  formErrors.streetAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                TOWN / CITY
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  COUNTRY <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none"
                >
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  STATE (OPTIONAL)
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none text-gray-400"
                >
                  <option value="">Select an option...</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </select>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SECTION */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
              Order Summary
            </h2>
            <div className="text-xs text-yellow-600 mb-3 cursor-pointer font-medium">
              Have a coupon? Click here to enter your code
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="px-3 py-2 border border-gray-300 rounded text-sm flex-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700"
              >
                Apply
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="bg-white border border-gray-200 p-2 rounded text-xs relative">
                    🎓{" "}
                    <span className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      i
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {courseInfo.name}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  ৳ {courseInfo.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600 mt-2">
                <span>Subtotal</span>
                <span>৳ {courseInfo.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600 border-t border-gray-200">
                <span>bKash Charge</span>
                <span className="text-green-600">
                  ৳ {courseInfo.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between py-3 text-base font-bold text-gray-900 border-t border-gray-300 mt-1">
                <span>Total</span>
                <span>৳ {courseInfo.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-1 uppercase">
              Payment
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 tracking-wide uppercase">
              All transactions are secure and encrypted.
            </p>

            <div className="space-y-2 border border-gray-200 rounded-lg overflow-hidden">
              {/* Option 1 */}
              <label className="flex items-center gap-3 p-3.5 bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-gray-800"
                />
                <span className="text-sm font-medium text-gray-800">
                  Direct Bkash Payment Automatic
                </span>
              </label>

              {/* Option 2 */}
              <label className="flex items-center gap-3 p-3.5 bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bkash_auto"
                  checked={paymentMethod === "bkash_auto"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-gray-800"
                />
                <span className="text-sm font-medium text-gray-800">
                  Pay via Bkash Automatic
                </span>
              </label>

              {/* Option 3 */}
              <label className="flex items-center gap-3 p-3.5 bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50 justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="sslcommerz"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-gray-800"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Pay Online(Credit/Debit Card/MobileBanking/NetBanking/bKash)
                  </span>
                </div>
                <span className="bg-[#1b2a47] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter">
                  SSLCOMMERZ
                </span>
              </label>

              {/* Option 4 */}
              <label className="flex items-center gap-3 p-3.5 bg-white cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-gray-800"
                />
                <span className="text-sm font-medium text-gray-800">
                  Bank Payment
                </span>
              </label>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-gray-800 rounded border-gray-300"
            />
            <p className="text-xs text-gray-600">
              I've read and accept the{" "}
              <span className="text-yellow-600 cursor-pointer underline">
                terms & conditions
              </span>
              ,{" "}
              <span className="text-yellow-600 cursor-pointer underline">
                privacy policy
              </span>{" "}
              &{" "}
              <span className="text-yellow-600 cursor-pointer underline">
                refund policy
              </span>
              .
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#c0c0c0] hover:bg-[#b0b0b0] text-gray-800 font-bold py-3.5 rounded transition-all flex items-center justify-center gap-2 text-sm shadow-sm ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                প্রক্রিয়াকরণ...
              </>
            ) : (
              <>
                <FaLock className="text-xs" />
                <span>Enroll Now ৳ {courseInfo.total.toLocaleString()}</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-gray-600 font-medium">
          <FaCheckCircle className="text-green-600" />
          <span>100% Secure Payments</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OneToOneEnroll;
