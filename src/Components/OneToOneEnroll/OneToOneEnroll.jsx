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
  FaWallet,
  FaLock,
  FaSpinner,
  FaShieldAlt,
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
  FaUserTie,
  FaGraduationCap,
  FaCalendarAlt,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const OneToOneEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    postcode: "",
    city: "",
    country: "Bangladesh",
    password: "",
    confirmPassword: "",
    studentName: "",
    preferredTime: "",
    focusArea: "",
    additionalNotes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const courseInfo = {
    name: "ওয়ান টু ওয়ান",
    subtitle: "ব্যক্তিগত কুরআন শিক্ষা",
    price: 6000,
    discount: 5000,
    bkashCharge: 0,
    total: 5000,
    duration: "নিজস্ব সময়",
    classes: "সপ্তাহে ৩-৫ দিন",
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "প্রথম নাম প্রয়োজন";
    if (!formData.lastName) errors.lastName = "শেষ নাম প্রয়োজন";
    if (!formData.phone) errors.phone = "ফোন নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক ফোন নম্বর দিন";
    if (!formData.email) errors.email = "ইমেইল প্রয়োজন";
    if (!formData.streetAddress) errors.streetAddress = "ঠিকানা প্রয়োজন";
    if (!formData.studentName) errors.studentName = "শিক্ষার্থীর নাম প্রয়োজন";
    if (!formData.preferredTime) errors.preferredTime = "পছন্দের সময় প্রয়োজন";
    if (createAccount) {
      if (!formData.password) errors.password = "পাসওয়ার্ড প্রয়োজন";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }
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
        city: formData.city,
        country: formData.country,
        postcode: formData.postcode,
        amount: courseInfo.total,
        currency: "BDT",
        product_name: courseInfo.name,
        product_category: "educational",
        payment_method: paymentMethod,
        studentName: formData.studentName,
        preferredTime: formData.preferredTime,
        focusArea: formData.focusArea,
        additionalNotes: formData.additionalNotes,
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
    if (couponCode === "ONETOONE50") {
      alert("কুপন প্রয়োগ করা হয়েছে! ৫০% ডিসকাউন্ট পাবেন।");
    } else {
      alert("ভুল কুপন কোড।");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            to="/course/kids/one-to-one"
            className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">কোর্স ডিটেইলসে ফিরে যান</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-2xl font-bold text-rose-800 flex items-center gap-2">
                  <FaUserTie className="text-rose-500" />
                  Show Enrolment Summary
                </h1>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <FaUser className="text-rose-500" />
                  Returning customer?
                  <button className="text-rose-600 hover:text-rose-700 font-semibold">
                    Click here to login
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-rose-500" />
                    STUDENT INFORMATION
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        STUDENT NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.studentName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="শিক্ষার্থীর নাম"
                      />
                      {formErrors.studentName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.studentName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PREFERRED TIME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.preferredTime
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="পছন্দের সময় (যেমন: সকাল ৯টা, বিকাল ৫টা)"
                      />
                      {formErrors.preferredTime && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.preferredTime}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Focus Area
                      </label>
                      <input
                        type="text"
                        name="focusArea"
                        value={formData.focusArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        placeholder="যে বিষয়ে ফোকাস করতে চান (যেমন: তাজবিদ, হিফজ)"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        placeholder="অতিরিক্ত কোন তথ্য জানাতে চান?"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information with rose color */}
                <div>
                  <h2 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
                    <FaTruck className="text-rose-500" />
                    SHIPPING INFORMATION
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        FIRST NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="আপনার প্রথম নাম"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LAST NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.lastName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="আপনার শেষ নাম"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FaPhone className="text-rose-500" />
                        +880 PHONE <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="০১XXXXXXXXX"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FaEnvelope className="text-rose-500" />
                        EMAIL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="your@email.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={createAccount}
                        onChange={() => setCreateAccount(!createAccount)}
                        className="w-4 h-4 text-rose-500 rounded"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <FaUserPlus className="text-rose-500" />
                        create an account?
                      </span>
                    </label>

                    {createAccount && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            PASSWORD <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border ${
                              formErrors.password
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                            placeholder="পাসওয়ার্ড দিন"
                          />
                          {formErrors.password && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.password}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CONFIRM PASSWORD{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border ${
                              formErrors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                            placeholder="পাসওয়ার্ড পুনরায় দিন"
                          />
                          {formErrors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-rose-500" />
                        STREET ADDRESS <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.streetAddress
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                        placeholder="আপনার ঠিকানা"
                      />
                      {formErrors.streetAddress && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.streetAddress}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FaCity className="text-rose-500" />
                        CITY
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        placeholder="শহর"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FaGlobe className="text-rose-500" />
                        POSTCODE
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        placeholder="পোস্ট কোড"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-rose-50 p-4 rounded-xl border border-rose-200">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-rose-500 rounded"
                    required
                  />
                  <div>
                    <p className="text-sm text-gray-700">
                      You've read and accept the
                      <button className="text-rose-600 hover:text-rose-700 font-semibold mx-1">
                        terms & conditions
                      </button>
                      ,
                      <button className="text-rose-600 hover:text-rose-700 font-semibold mx-1">
                        privacy policy
                      </button>
                      &
                      <button className="text-rose-600 hover:text-rose-700 font-semibold mx-1">
                        refund policy
                      </button>
                      .
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg ${
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
                      <FaLock className="text-sm" />
                      <span>
                        Email Now: ₹ {courseInfo.total.toLocaleString()}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-bold text-rose-800 flex items-center gap-2">
                  <FaHandshake className="text-rose-500" />
                  ORDER SUMMARY
                </h2>
                <button className="text-sm text-rose-600 hover:text-rose-700 font-semibold mt-1 flex items-center gap-1">
                  <FaTag />
                  Have a coupon? Click here to enter your code
                </button>

                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl mb-6 border border-rose-200">
                <h3 className="font-bold text-rose-800 text-center flex items-center justify-center gap-2">
                  <FaUserTie className="text-rose-500" />
                  Here's One to One
                </h3>
                <p className="text-center text-sm text-gray-600 mt-1">
                  {courseInfo.subtitle}
                </p>
                <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                  <span>⏱ {courseInfo.duration}</span>
                  <span>📚 {courseInfo.classes}</span>
                </div>
              </div>

              <div className="space-y-3 border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₹ {courseInfo.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100 pt-2">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-red-500">
                    - ₹{" "}
                    {(courseInfo.price - courseInfo.discount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100 pt-2">
                  <span className="text-gray-600">bKash Charge</span>
                  <span className="font-semibold">
                    ₹ {courseInfo.bkashCharge}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-rose-600 mt-2">
                  <span className="text-lg font-bold text-rose-800">Total</span>
                  <span className="text-2xl font-bold text-rose-600">
                    ₹ {courseInfo.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-rose-800 mb-3 flex items-center gap-2">
                  <FaCreditCard className="text-rose-500" />
                  PAYMENT
                </h3>
                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                  <FaShieldAlt className="text-green-500" />
                  ALL TRANSACTIONS ARE SECURE AND RECEIPTED.
                </p>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "bkash"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={paymentMethod === "bkash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-pink-500"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/BKash_Logo.png/1200px-BKash_Logo.png"
                      alt="bKash"
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm font-semibold text-gray-700 flex-1">
                      Direct Bkash Payment Automatic
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "sslcommerz"
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="sslcommerz"
                      checked={paymentMethod === "sslcommerz"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-rose-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <FaCreditCard className="text-rose-500 text-xl" />
                      <FaMobileAlt className="text-blue-500 text-xl" />
                      <FaUniversity className="text-green-500 text-xl" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 flex-1">
                      Pay Online/Credit/Debit/Card/Mobile
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "bank"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-500"
                    />
                    <FaBuilding className="text-blue-500 text-xl" />
                    <span className="text-sm font-semibold text-gray-700 flex-1">
                      Bank Payment
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 ${
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
                    <FaLock />
                    <span>
                      Email Now: ₹ {courseInfo.total.toLocaleString()}
                    </span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default OneToOneEnroll;
